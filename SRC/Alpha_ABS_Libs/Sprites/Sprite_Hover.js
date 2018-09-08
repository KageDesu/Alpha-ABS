(function () {
  //Sprite_Hover
  //------------------------------------------------------------------------------
  function Sprite_Hover() {
    this.initialize.apply(this, arguments);
  }

  Sprite_Hover.prototype = Object.create(Sprite_Button.prototype);
  Sprite_Hover.prototype.constructor = Sprite_Hover;

  Sprite_Hover.CWHITE = Color.WHITE.reAlpha(220);
  Sprite_Hover.CWHITE2 = Color.WHITE.reAlpha(60);


  Sprite_Hover.prototype.initialize = function (w, h) {
    Sprite_Button.prototype.initialize.call(this);
    this._step = 0;
    this._free = true;
    this._createHover(w, h);
  };

  Sprite_Hover.prototype.isFree = function () {
    return (this._free == true);
  };

  Sprite_Hover.prototype.update = function () {
    Sprite_Button.prototype.update.call(this);
    if (this._free) {
      if (this.isHoverByMouse()) {
        this._step++;
        this._onHover();
      } else {
        this._reset();
      }
    }
  };

  Sprite_Hover.prototype.freeze = function () {
    this._free = false;
    this.alpha = 1;
  };

  Sprite_Hover.prototype.free = function () {
    this._free = true;
    this._reset();
  };

  Sprite_Hover.prototype.standardFrameWidth = function () {
    return 2;
  };

  Sprite_Hover.prototype._createHover = function (w, h) {
    this.bitmap = new Bitmap(w, h);
    var color1 = Sprite_Hover.CWHITE.CSS;
    var color2 = Sprite_Hover.CWHITE2.CSS;
    this._drawFrame(color1, color2, this.standardFrameWidth());
    this.alpha = 0;
  };

  Sprite_Hover.prototype._reset = function () {
    this._step = 0;
    this.alpha = 0;
  };

  Sprite_Hover.prototype._drawFrame = function (color1, color2, w) {
    this.bitmap.clear();
    this.bitmap.gradientFillRect(0, 0, w, this.height, color1, color2);
    this.bitmap.gradientFillRect(this.width - w, 0, w, this.height, color2, color1);
    this.bitmap.gradientFillRect(0, 0, this.width, w, color1, color2, true);
    this.bitmap.gradientFillRect(0, this.height - w, this.width, w, color2, color1, true);
  };

  Sprite_Hover.prototype._onHover = function () {
    this.alpha = 0.6 - Math.abs((this._step * 0.01) % 0.5);
  };

  AlphaABS.register(Sprite_Hover);
  //END Sprite_Hover
  //------------------------------------------------------------------------------

})();