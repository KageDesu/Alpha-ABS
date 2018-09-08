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

        this.sprite.x = this._myPoint.screenX();
        this.sprite.y = this._myPoint.screenY();

        //Emitter move
        if (this._emit) {
          this._emit.move(this.sprite.x, this.sprite.y);
        }

        //Rotation
        var angle = Math.atan2(ep.screenY() - this.sprite.y, ep.screenX() - this.sprite.x);
        this.sprite.rotation = angle;

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
      return this._data.subject.toPoint();
    }

    _endPoint() {
      return this._data.target.toPoint();
    }

    _setImage(name) {
      if (name) {
        if (name == 'null')
          this.sprite = new Sprite(AlphaABS.DATA.IMG.Vector.bitmap);
        else
          this.sprite = new Sprite(ImageManager.loadPicture(name));
      } else {
        this.sprite = new Sprite(new Bitmap(76, 38));
      }
      this.sprite.anchor.x = 0.5;
      this.sprite.anchor.y = 0.5;
    }
  }

  SDK.setConstant(Game_SVector, 'SPEED', 0.15);
  //END Game_SVector
  //------------------------------------------------------------------------------

  AlphaABS.register(Game_SVector);

})();