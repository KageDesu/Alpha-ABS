(function () {
  class UIObject_BarAttackReload extends Sprite {
    constructor(width, height) {
      super(new Bitmap(width, height));
      this._drawItem = new AlphaABS.LIBS.Sprite_ObjectWithMask(AlphaABS.DATA.IMG.BarSmall.bitmap, AlphaABS.DATA.IMG.BarSmallMask.bitmap);
      this._drawItem.setParams(150, Color.AQUA);

      this._progressBar = new AlphaABS.LIBS.Sprite_CastProgress(110, 10);
      this._progressBar.setColor(Color.AQUA);

      this._drawItem.z = 10;
      this._drawItem.x = 28;
      this._progressBar.x = this._drawItem.x + 4;
      this._progressBar.y = 4;

      this.addChild(this._progressBar);
      this.addChild(this._drawItem);

      this.visible = false;
      this._timer = null;

      this._thread = setInterval(function () {
        this._update();
      }.bind(this), 10);
    }

    start() {
      if ($gamePlayer.ABSParams().isWeapRecharge) {
        var skill = $gamePlayer.battler().skillABS_attack();
        if (skill && !skill.isReady() && skill.getReloadTime() > 30) {
          this.visible = true;
          var t = $gamePlayer.battler().weapons().first();
          if (t && t.iconIndex > 0) {
            this.bitmap.drawIcon(0, 0, t.iconIndex, 24);
          } else {
            this.bitmap.drawIcon(0, 0, AlphaABS.DATA.IMG.IconNoWeapon.bitmap, 24);
          }
          this._timer = skill.timer;
          this._progressBar.start(skill.timer);
        }
      } else {
        if (!this._waitPulse) {
          this.visible = false;
        }
      }
    }

    finish() {
      this._timer = null;
    }

    pulse() {
      this._waitPulse = true;
      this._drawItem.pulse(10);
    }

    terminate() {
      this._progressBar.terminate();
      clearInterval(this._thread);
    }
    //PRIVATE
    _update() {
      this.start(); //Auto
      this._drawItem.update();
      this._progressBar.update();
      if (this._timer) {
        if (this._isChottoReady()) {
          this.pulse();
        }
        if (this._timer.isReady()) {
          this.finish();
        }
      }
      if (this._waitPulse) {
        if (this._drawItem.isReady()) {
          //LOG.p("Pulse ready");
          this._waitPulse = false;
          if (this._timer == null)
            this.visible = false;
        }
      }
    }

    _isChottoReady() {
      var t = this._timer.getValue();
      var t2 = this._timer.getMaxValue();
      t = Math.abs(t2 - t);
      return (t == 1);
    }
  }

  AlphaABS.register(UIObject_BarAttackReload);

})();