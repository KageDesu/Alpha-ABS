(function () {

  var ABSUtils = AlphaABS.UTILS;
  var LOG = new PLATFORM.DevLog("Game_SVector");
  var BattleManagerABS = AlphaABS.BattleManagerABS;

  //Game_SVector
  //------------------------------------------------------------------------------
  class Game_SVector {
    constructor(data) {
      this._data = data;
      this._disposed = false;
      this._started = false;
      this._setImage(data.skill.img); 
      this._emit = null;
      if (data.skill.vSpeed > 0) {
        this._speed = data.skill.vSpeed / 32;
      } else
        this._speed = Game_SVector.SPEED;
      this._isNoTargetMode = data.skill.isNoTarget();
      this._isPiercing = data.skill.isPierce();
      if(this._isPiercing == true) {
        this._pierceCountMax = data.skill.pierce;
        this._pierced = 0;
      }
    }

    update() {
      try {
        if (!this.sprite) return;
        if (!this._started) return;

        var ep = this._endPoint();
        if (!this._myPoint) {
          LOG.p("SVector : Point MISS : Target Reached!");
          this.dispose();
          return;
        }

        if (BattleManagerABS.isABSLightingExt()) {
          $gameMap.deleteLight(this._myPoint.x, this._myPoint.y);
        }

        this._myPoint = ABSUtils.SMath.moveTo(this._myPoint, ep, this._speed);

        if (BattleManagerABS.isABSLightingExt()) {
          $gameMap.setLight(this._myPoint.x, this._myPoint.y, this._data.skill.lightSize, this._data.skill.light, 0, true);
        }

        this._imageToPoint();

        //Emitter move
        if (this._emit) {
          this._emit.move(this.sprite.x, this.sprite.y);
        }

        //Rotation
        var angle = Math.atan2(ep.screenY() - this.sprite.y, ep.screenX() - this.sprite.x);
        this.sprite.rotation = angle;

        if(this._isNoTargetMode == true) {
          if(this._isAnyOnMyPosition()) {
            if(this._isPiercing == true) {
              if(this._target != this._lastPiercedTarget) {
                this._lastPiercedTarget = this._target;
                  BattleManagerABS.battleProcess()._processAction(this._data.subject, this._target, this._data.action);
                  // * Если _pierceCount = 1, то всех
                  if (this._pierceCountMax > 1) {
                    this._pierced += 1;
                      if (this._pierced == this._pierceCountMax) {
                        this._target = null;
                        // * Уничтожаем вектор без поражения
                        this.dispose();
                      }
                  }

                  return;
              }
            } else {
                this._data.target = this._target;
                this.dispose();
                return;
            }

          }
        } 
        var t = new Rectangle(ep.x - 0.5, ep.y - 0.5, 1.5, 1.5);
        if (ABSUtils.SMath.inRect(this._myPoint, t)) {
          LOG.p("SVector : Target Reached!");
          this.dispose();
        }
      } catch (e) {
        console.error(e);
        this.dispose();
      }
    }

    _isAnyOnMyPosition() {
      var all = BattleManagerABS.getAllBotsOnMap().concat($gamePlayer);
      var inRadius = AlphaABS.UTILS.inRadius(this._myPoint, 2, all);
      this._target = null;
      var candidate = null;
      for(var i = 0; i<inRadius.length; i++) {
        candidate = inRadius[i];
        if(candidate != this._data.subject &&
          candidate.isAlive() && candidate.teamId() != this._data.subject.teamId())
          {
            var checkPoint = candidate.toPoint();
            var t = new Rectangle(checkPoint.x - 0.5, checkPoint.y - 0.5, 1.5, 1.5);
            if (ABSUtils.SMath.inRect(this._myPoint, t)) {
              this._target = candidate;
              break;
            }
          }
      }
      if (this._target != null) {
        return true;
      }
      return false;
    }

    start() {
      if (ABSUtils.inFront(this._data.subject, this._data.target)) {
        this._started = true;
        this._disposed = true;
        LOG.p("SVector : Target in Front!");
        return;
      }
      this._myPoint = this._startPoint();
      this._started = true;
      LOG.p("SVector : Start at " + this._myPoint.toString());
      LOG.p("SVector : To " + this._endPoint().toString());

      try {
        if (BattleManagerABS.isABSParticleSystem() && this.data().skill.hasParticle()) {
          var generator = this.data().skill.initGenerator();
          if (generator != null) {
            this._emit = AlphaABS.SYSTEM.EXTENSIONS.ABSPE.initEmitter(this.sprite.x, this.sprite.y, this.data().skill.pCount, generator);
            this._emit.setOuterData(this.data().skill.particleData);
          } else {
            LOGW.p(this._data.skill.name() + " particle data is missing, check ABSDataUser.json");
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    hasEmitter() {
      return (this._emit != null);
    }

    emitter() {
      return this._emit;
    }

    data() {
      return this._data;
    }

    isStarted() {
      return (this._started == true);
    }

    isAlive() {
      return (this._disposed == false);
    }

    dispose() {
      try {
        LOG.p("SVector : Disposed ");
        var t = this.sprite.parent;
        if (t) {
          t.removeChild(this.sprite);
        }
        if (this._emit) {
          this._emit.stop();
          this._emit.clear();
        }

        if (BattleManagerABS.isABSLightingExt() && this._myPoint) {
          $gameMap.deleteLight(this._myPoint.x, this._myPoint.y);
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.sprite = null;
        this._disposed = true;
      }
    }

    //PRIVATE
    _startPoint() {
      var point = this._data.subject.toPoint();
      try {
        var direction = this._data.subject.direction();
        this._applyAnchorByDirection(direction);
      } catch (e) {
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
      }
      return point;
    }

    _applyAnchorByDirection(direction) {
      var dx = 0.5;
      var dy = 0.5;
      if (direction == 6) {
        dy = 1;
        dx = 0;
      }
      if (direction == 4) {
        dy = 0;
        dx = 0;
      }
      if (direction == 2) {
        dy = 0.5;
        dx = 0.5;
      }
      if (direction == 8) {
        dy = 0.5;
        dx = -0.5;
      }
      this.sprite.anchor.x = dx;
      this.sprite.anchor.y = dy;
    }

    //TODO: Надо разделить точку поиска и координаты спрайта!
    _imageToPoint() {
      if(this._myPoint == null)
        return;
      var x = this._myPoint.screenX();
      var y = this._myPoint.screenY();
      //console.log(this.sprite.rotation);
      //3var rot = Math.floor(this.sprite.rotation);
      this.sprite.x = x;
      this.sprite.y = y;
    }

    _endPoint() {
      return this._data.target.toPoint();
    }

    _setImage(name) {
      if (name) {
        if (name == 'null')
          this.sprite = new Sprite(AlphaABS.DATA.IMG.Vector.bitmap);
        else {
          this.sprite = new AlphaABS.LIBS.Sprite_Vector(name);
        }
      } else {
        this.sprite = new Sprite(new Bitmap(76, 38));
      }
    }
  }

  SDK.setConstant(Game_SVector, 'SPEED', 0.15);
  //END Game_SVector
  //------------------------------------------------------------------------------

  AlphaABS.register(Game_SVector);

})();