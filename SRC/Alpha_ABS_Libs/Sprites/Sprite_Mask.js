(function(){
  class Sprite_Mask extends Sprite {
    constructor(args) {
      super(args);
      this._maxOpacity = 255;
      this._reset();
    }

    setParams(opacity, color) {
      if(color)
        this.setBlendColor(color.ARR);
      this._maxOpacity = opacity;
      this.opacity = opacity;
    }

    showMask(time) {
      this.visible = true;
      this._show = true;
      this._time = 60 / time;
    }

    isReady() {
      return (this._show == false);
    }

    showMaskOne(time) {
      if(!this._show) {
        this.showMask(time);
        this._oneTime = true;
      }
    }

    stopMask() {
      this._reset();
    }

    update() {
      //super();
      if(this._show) {
        if(!this._toD) {
          this.opacity += this._time;
          if(this.opacity >= (this._maxOpacity - this._time)) {
            this.opacity = this._maxOpacity;
            this._toD = true;
          }
        } else {
          this.opacity -= this._time;
          if(this.opacity <= this._time) {
            this.opacity = 0;
            this._toD = false;
            if(this._oneTime) {
              this._reset();
            }
          }
        }

      }
    }

    //PRIVATE
    _reset() {
      this._show = false;
      this.visible = false;
      this.opacity = 0;
      this._time = 0;
      this._toD = false;
      this._oneTime = false;
    }
  }

  AlphaABS.register(Sprite_Mask);

})();
