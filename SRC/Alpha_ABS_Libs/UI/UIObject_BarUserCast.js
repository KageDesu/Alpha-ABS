(function(){
  class UIObject_BarUserCast extends Sprite {
    constructor(width, height) {
      super(new Bitmap(width, height));
      this._drawItem = new AlphaABS.LIBS.Sprite_ObjectWithMask(AlphaABS.DATA.IMG.Bar.bitmap, AlphaABS.DATA.IMG.BarMask.bitmap);
      this._progressBar =  new AlphaABS.LIBS.Sprite_CastProgress(125, 18);
      this._progressBar.setText();
      this._progressBar.setColor(Color.MAGENTA);

      this._drawItem.z = 10;
      this._drawItem.x = 28;
      this._progressBar.x = this._drawItem.x + 9;
      this._progressBar.y = 6;

      this.addChild(this._progressBar);
      this.addChild(this._drawItem);

      this.visible = false;
      this._timer = null;

      this._thread = setInterval(function() { this._update(); }.bind(this), 10);
    }

    start(skill) {
      if(skill && !skill.isReady() && skill.isCasting()) {
        this.visible = true;
        var iconIndex = skill.skill().iconIndex;
        if(iconIndex > 0)
          this.bitmap.drawIcon(0, 2, iconIndex, 26);
        else
          this.bitmap.clear();
        this._timer = skill.timer;
        this._progressBar.start(skill.timer);
      }
    }

    stop() {
      this._drawItem.setParams(150, Color.RED);
      this._waitPulse = true;
      this._drawItem.pulse(10);
      this.finish();
    }

    finish() {
      this._timer = null;
    }

    pulse() {
      this._drawItem.setParams(150, Color.MAGENTA);
      this._waitPulse = true;
      this._drawItem.pulse(10);
    }

    terminate() {
      this._progressBar.terminate();
      clearInterval(this._thread);
    }
    //PRIVATE
    _update() {
      this._start(); //Auto
      this._drawItem.update();
      this._progressBar.update();
      if(this._timer){
        if(this._isChottoReady()) {
          this.pulse();
        }
        if(this._timer.isReady()) {
          this.finish();
        }
      }
      if(this._waitPulse) {
        if(this._drawItem.isReady()) {
          //LOG.p("Pulse ready");
          this._waitPulse = false;
          if(this._timer == null || this._timer.isReady())
            this.visible = false;
        }
      }
    }

    _start() {
      if($gamePlayer.ABSParams().casting) {
        var skill = $gamePlayer.ABSParams().castingSkill;
        if(skill && !skill.isReady() && skill.isCasting()) {
          this.visible = true;
          var iconIndex = skill.skill().iconIndex;
          if(iconIndex > 0)
            this.bitmap.drawIcon(0, 2, iconIndex, 26);
          else
            this.bitmap.clear();
          this._timer = skill.timer;
          this._progressBar.start(skill.timer);
        }
      } else {
        if($gamePlayer.ABSParams().castingError) {
          $gamePlayer.ABSParams().castingError = false;
          this.stop();
        }
        if(!this._waitPulse)
          this.visible = false;
      }
    }

    _isChottoReady() {
      var t = this._timer.getValue();
      var t2 = this._timer.getMaxValue();
      t = Math.abs(t2 - t);
      return (t == 1);
    }
  }

  AlphaABS.register(UIObject_BarUserCast);

})();
