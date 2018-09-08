(function(){
  class Sprite_ObjectWithMask extends Sprite {
    constructor(image, maskImage) {
      super(image);
      this._spriteMask = new AlphaABS.LIBS.Sprite_Mask(maskImage);
      this.addChild(this._spriteMask);
    }

    setParams(opacity, color) {
      this._spriteMask.setParams(opacity, color);
    }

    isReady() {
      return this._spriteMask.isReady();
    }

    pulse(time) {
      this._spriteMask.showMaskOne(time);
    }

    update() {
      //super();
      this._spriteMask.update();
    }
  }

  AlphaABS.register(Sprite_ObjectWithMask);

})();
