(function () {
  class Sprite_CastProgress extends Sprite {
    constructor(width, height) {
      super(new Bitmap(width, height));
      this._timer = null;
      this._bar = new AlphaABS.LIBS.PKD_Object_Bar(this.bitmap);
      this._bar.setPosition(0, 0, width, height);
      this._needText = false;
      //this._thread = setInterval(function() { this._update_bar(); }.bind(this), 10);
    }

    setText() {
      this._needText = true;
    }

    setColor(color) {
      this._bar._color = color;
    }

    start(timer) {
      //this.visible = true;
      this._timer = timer;
    }

    cancel() {
      //this.visible = false;
      this._timer = null;
    }

    bar() {
      return this._bar;
    }

    update() {
      //super();
      this._update_bar();
    }

    terminate() {
      clearInterval(this._thread);
    }

    //PRIVATE
    _update_bar() {
      if (!this.bitmap) return;
      if (!this._timer) return;

      var t = this._timer.getMaxValue();
      var t2 = this._timer.getValue();
      this._bar._mValue = t;
      this._bar.setValue(t2);
      if (this._needText)
        this._bar.setText(AlphaABS.UTILS.framesToTimeA(t - t2), 'center');
      this._bar.update();

      if (this._timer.isReady()) {
        this.cancel();
      }
    }
  }

  AlphaABS.register(Sprite_CastProgress);

})();