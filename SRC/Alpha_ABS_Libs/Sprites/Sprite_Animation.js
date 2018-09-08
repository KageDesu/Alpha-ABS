(function () {
  var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;
  //Sprite_Animation
  //------------------------------------------------------------------------------
  //NEW
  Sprite_Animation.prototype.setABSMode = function () {
    this._absMode = true;
  };

  Sprite_Animation.prototype.setABSModeMap = function () {
    this._absMode = true;
    this._absModeMap = true;
    this._mapPoint = null;
  };

  var pkd_SpriteAnimation_updatePosition = Sprite_Animation.prototype.updatePosition;
  Sprite_Animation.prototype.updatePosition = function () {
    try {
      if (this._absMode && !this._absModeMap) {
        if (this._animation.position === 3) {
          this.x = this.parent.width / 2;
          this.y = this.parent.height / 2;
        } else {
          var parent = this._target.parent;
          var grandparent = parent ? parent.parent : null;
          this.x = this._target.x;
          this.y = this._target.y;
          if (this.parent === grandparent) {
            this.x += parent.x;
            this.y += parent.y;
          }
          if (this._animation.position === 0) {
            this.y -= this._target.height;
            //this.y -= this._target.height / 2;
          }
        }
        if (this._animation.position === 2) { //FEET
          this.y -= 32;
        }
      } else if (this._absMode && this._absModeMap) {
        if (this._animation.position == 3) {
          this.x = this.parent.width / 2;
          this.y = this.parent.height / 2;
        } else {
          if (!this._mapPoint) {
            this._mapPoint = new AlphaABS.UTILS.PointX(this._target.x, this._target.y);
            this._mapPoint.convertToMap();
          }

          var mapPoint = this._mapPoint.mapPointOnScreen();
          this.x = mapPoint.x + 24;
          this.y = mapPoint.y + 24;
        }
      } else {
        pkd_SpriteAnimation_updatePosition.call(this);
      }
    } catch (e) {
      console.error(e);
    }
  };

  var pkd_SpriteAnimation_updateCellSprite = Sprite_Animation.prototype.updateCellSprite;
  Sprite_Animation.prototype.updateCellSprite = function (sprite, cell) {
    pkd_SpriteAnimation_updateCellSprite.call(this, sprite, cell);
    if (this._absMode) {
      var pattern = cell[0];
      if (pattern >= 0) {
        sprite.x = 0;
        sprite.y = 0;
        var t = 4;
        if (this._absModeMap) {
          t = 2;
        }
        if (this._animation.position != 3) {
          sprite.scale.x = (sprite.scale.x / t);
          sprite.scale.y = (sprite.scale.y / t);
        }
      }
    }
  };

  var _Sprite_Animation_initMembers = Sprite_Animation.prototype.initMembers;
  Sprite_Animation.prototype.initMembers = function () {
    _Sprite_Animation_initMembers.call(this);
    this._lightDuration = null;
    this._lightPoint = null;
  };

  var _Sprite_Animation_startFlash = Sprite_Animation.prototype.startFlash;
  Sprite_Animation.prototype.startFlash = function (color, duration) {
    _Sprite_Animation_startFlash.call(this, color, duration);

    try {
      if (!BattleManagerABS.isABSLightingExt() || !this._absMode) return;
      if (this._lightPoint != null) {
        this._deleteLight();
      }
      this._lightDuration = duration;
      if (this._absModeMap)
        this._lightPoint = new AlphaABS.UTILS.PointX(this.x - 48, this.y - 48);
      else
        this._lightPoint = new AlphaABS.UTILS.PointX(this.x, this.y);
      this._lightPoint.convertToMap();
      var lightColor = new PLATFORM.Color(color[0], color[1], color[2]);
      $gameMap.setLight(this._lightPoint.x, this._lightPoint.y, 150, lightColor.toHex(), 0, true);
    } catch (e) {
      console.error(e);
    }
  };

  var _Sprite_Animation_updateFlash = Sprite_Animation.prototype.updateFlash;
  Sprite_Animation.prototype.updateFlash = function () {
    _Sprite_Animation_updateFlash.call(this);

    if (this._lightDuration == null) return;
    this._lightDuration--;
    if (this._lightDuration <= 1) {
      this._deleteLight();
    }
  };

  var _Sprite_Animation_remove = Sprite_Animation.prototype.remove;
  Sprite_Animation.prototype.remove = function () {
    _Sprite_Animation_remove.call(this);
    if (this._lightDuration || this._lightPoint) {
      this._deleteLight();
    }
  };

  //NEW
  Sprite_Animation.prototype._deleteLight = function () {
    if (this._lightPoint) {
      $gameMap.deleteLight(this._lightPoint.x, this._lightPoint.y);
      this._lightPoint = null;
    }
    this._lightDuration = null;
  };
  //END Sprite_Animation
  //------------------------------------------------------------------------------

})();