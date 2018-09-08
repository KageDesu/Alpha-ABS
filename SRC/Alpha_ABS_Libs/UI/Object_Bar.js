(function () {
  //PKD_Object_Bar
  //------------------------------------------------------------------------------
  class PKD_Object_Bar {
    constructor(bitmap) {
      this._bitmap = bitmap;
      this._rect = undefined;
      this._bColor = Color.BLACK;
      this._color = Color.WHITE;
      this._isGradient = true;
      this._mValue = 0;
      this._text_l = null;
      this._text_r = null;
      this._text_c = null;
      this._lValue = -1; //Last value
      this._value = 0;

      this._calculate_gradient();
    }

    setPosition(x, y, w, h) {
      this._rect = new Rectangle(x, y, w, h);
    }

    setValue(value) {
      if (value <= 0)
        value = 0;
      if (value > this._mValue)
        value = this._mValue;
      this._value = value;
    }

    getValue() {
      return this._value;
    }

    refresh() // 1.1
    {
      if (this._rect === undefined)
        return;
      this._draw_back_bar();
      if (this._mValue != 0)
        this._draw_main_bar();
    }

    //PARAMS
    //color , bColor, maxValue, value
    config(params) {
      this._color = params.color || Color.WHITE;
      this._bColor = params.bColor || Color.BLACK;
      this._mValue = params.maxValue || 0;
      this.setValue(params.value || 0);
    }

    setText(text, position) {
      switch (position) {
        case 'center':
          this._text_c = text;
          break;
        case 'left':
          this._text_l = text;
          break;
        case 'right':
          this._text_r = text;
          break;
      }
    }

    allowGradient(isAllowed) {
      isAllowed = SDK.check(isAllowed, true);
      this._isGradient = isAllowed;
      if (this._isGradient)
        this._calculate_gradient();
    }

    update() {
      if (this._lValue == this._value)
        return; //No drawing if not changes
      this.refresh();
      this._lValue = this._value;
    }


    //PRIVATE
    _draw_back_bar() {
      this._bitmap.fillRect(this._rect.x, this._rect.y, this._rect.width, this._rect.height, this._bColor.CSS);
    }

    _draw_main_bar() {
      var width = Math.floor((100 * this._value / this._mValue) * (this._rect.width - 2) / 100);

      if (this._isGradient) {
        this._bitmap.gradientFillRect(this._rect.x + 1, this._rect.y + 1, width, this._rect.height - 2,
          this._color.CSS, this._gColor.CSS, false);
      } else {
        this._bitmap.fillRect(this._rect.x + 1, this._rect.y + 1, width, this._rect.height - 2, this._color.CSS);
      }

      var size = this._bitmap.fontSize;
      this._bitmap.fontFace = AlphaABS.SYSTEM.FONT;
      this._bitmap.fontSize = this._rect.height - 4;

      if (this._text_c != null)
        this._bitmap.drawText(this._text_c, this._rect.x + 2, this._rect.y, this._rect.width - 4, this._rect.height, 'center');
      if (this._text_l != null)
        this._bitmap.drawText(this._text_l, this._rect.x + 4, this._rect.y, this._rect.width - 8, this._rect.height, 'left');
      if (this._text_r != null)
        this._bitmap.drawText(this._text_r, this._rect.x + 2, this._rect.y, this._rect.width - 6, this._rect.height, 'right');
      this._bitmap.fontSize = size;
    }

    _calculate_gradient() {
      this._gColor = this._color.getLightestColor(230);
    }
  }
  //END PKD_Object_Bar
  //------------------------------------------------------------------------------

  AlphaABS.register(PKD_Object_Bar);

})();