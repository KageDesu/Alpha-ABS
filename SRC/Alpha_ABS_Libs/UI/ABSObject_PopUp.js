(function () {

  "use strict";

  //ABSObject_PopUp
  //------------------------------------------------------------------------------
  /* jshint -W104 */
  class ABSObject_PopUp {
    constructor(text, color, iconIndex, fontSettings) {
      this._text = text || null;
      this._color = color;
      this._iconIndex = iconIndex || null;
      this._fontSettings = fontSettings || ABSObject_PopUp.FONT_DEFAULT();
      this._effectType = ABSObject_PopUp.EFFECT_DEFAULT;
      this._sprite = null;
    }

    clone() {
      var tempObj = new ABSObject_PopUp(this._text, this._color, this._iconIndex, this._fontSettings.clone());
      tempObj.setEffectSettings(this._effectType);
      return tempObj;
    }

    getText() {
      return this._text;
    }

    getFontSettings() {
      return this._fontSettings;
    }

    setX(x) {
      this.x = x;
      this._sprite.x = x;
    }

    setY(y) {
      this.y = y;
      this._sprite.y = y;
    }

    setNumered() //This is number value in this PopUp
    {
      this._numered = true;
    }

    isNumered() {
      return (this._numered === true);
    }

    hasIcon() {
      return (this._iconIndex != null);
    }

    setExtraText(text) {
      this._text = (text + " " + this._text);
    }

    setEffectSettings(settings) {
      this._effectType = settings;
    }

    setup(x, y, width, layer) {
      this._layer = layer;
      this._width = width;
      this.x = x;
      this.y = y;
      this._refresh();
    }

    dispose() {
      if (!this._sprite) return;
      this._sprite.bitmap.clear();
      this._layer.removeChild(this._sprite);
      this._sprite = null;
    }

    update() {
      if (this._sprite != null) {
        this._update_zoom();
        this._sprite.update();
      }
    }

    static FONT_DEFAULT() {
      return ['Skratch Punk', 30, false, 3, Color.BLACK]; //FontFace, size, outline widht, outline color
    }

    //PRIVATE
    _refresh() {
      var h = 72;
      var bitmap = new Bitmap(this._width, h);
      bitmap.addLoadListener(function () {
        if (this._fontSettings[0] != null)
          bitmap.fontFace = this._fontSettings[0];
        bitmap.fontSize = this._fontSettings[1];
        bitmap.fontItalic = this._fontSettings[2];
        if (this._color) {
          bitmap.textColor = this._color.CSS;
        } else
          bitmap.textColor = Color.WHITE.CSS;


        var dx = 0;
        var dw = 0;
        var tw = (this._text != null) ? bitmap.measureTextWidth(this._text) : 0;

        while (tw > this._width) {
          bitmap.fontSize = bitmap.fontSize - 4;
          tw = bitmap.measureTextWidth(this._text);
        }

        if (this._iconIndex) {
          dx += 24;
          dw += 24;
          bitmap.drawIcon((dx + ((this._width - tw) / 2) - 36), (h - 24) / 2, this._iconIndex, 24);
        }

        if (this._text) {
          bitmap.outlineWidth = this._fontSettings[3] || 0;
          if (this._fontSettings[4])
            bitmap.outlineColor = this._fontSettings[4].CSS;
          bitmap.outlineColor = Color.BLACK.CSS;
          bitmap.drawText(this._text, dx + 2, 0, this._width - dw, h, 'center');
        }
      }.bind(this));

      this._sprite = new Sprite(bitmap);
      this._sprite.x = this.x;
      this._sprite.y = this.y;
      this._sprite.scale.x = this._effectType[0];
      this._sprite.scale.y = this._effectType[0];

      this._layer.addChild(this._sprite);
    }

    _update_zoom() {
      if (this._effectType[1]) {
        this._sprite.scale.x = Math.max(this._sprite.scale.x - 0.075, 1.0);
        this._sprite.scale.y = this._sprite.scale.x;
      }
      this._sprite.opacity = Math.max(this._sprite.opacity - 2, 0);
      if (this._sprite.opacity == 0) {
        this._layer.removeChild(this._sprite);
        this._sprite = null;
      }
    }
  }

  SDK.setConstant(ABSObject_PopUp, 'EFFECT_DEFAULT', [1.5, true, 0]); //zoom, isUpdateZoom, +toTextSize
  //END ABSObject_PopUp
  //------------------------------------------------------------------------------

  AlphaABS.ABSObject_PopUp = ABSObject_PopUp;
  AlphaABS.register(ABSObject_PopUp);
})();