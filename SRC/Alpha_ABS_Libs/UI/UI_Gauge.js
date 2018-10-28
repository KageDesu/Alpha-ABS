/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_Gauge.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------
(function () {

  function UI_Gauge() {
    this.initialize.apply(this, arguments);
  }

  AlphaABS.register(UI_Gauge);

  UI_Gauge.prototype = Object.create(Sprite.prototype);
  UI_Gauge.prototype.constructor = UI_Gauge;

  UI_Gauge.prototype.initialize = function (width, height) {
    Sprite.prototype.initialize.call(this, new Bitmap(width || 1, height || 1));
    this.reset();
  };

  UI_Gauge.prototype.reset = function () {
    this._backgroundColor = '#000000';
    this._startColor = '#FFFFFF';
    this._endColor = '#FFFFFF';
    this._currentValue = 0;
    this._maxValue = 0;
    this._centerText = null;
    this._leftText = null;
    this._rightText = null;
    this._gaugeWidth = 0;
    this._lastValue = -1;
  };

  UI_Gauge.prototype.applyGeneratedGradient = function () {
    if (window.PLATFORM === undefined) return;
    var color = PLATFORM.Color.FromHex(this._startColor);
    this._endColor = color.getLightestColor(230).CSS;
  };

  UI_Gauge.prototype.setFont = function (fontName) {
    this.bitmap.fontFace = fontName;
  };

  UI_Gauge.prototype.setMaxValue = function (value) {
    this._maxValue = value;
    this._updateGaugeWidth();
  };

  UI_Gauge.prototype._updateGaugeWidth = function () {
    if (this._maxValue > 0 && this._currentValue < this._maxValue)
      this._gaugeWidth = Math.floor(
        (100 * this._currentValue / this._maxValue) * ((this.bitmap.width - 2) / 100));
    else
      this._gaugeWidth = this.bitmap.width - 2;
  };

  UI_Gauge.prototype.setValue = function (value) {
    this._currentValue = value;
    this._updateGaugeWidth();
  };

  UI_Gauge.prototype.setGaugeColors = function (startHexColor, endHexColor) {
    this._startColor = startHexColor;
    this._endColor = endHexColor || this._startColor;
  };

  UI_Gauge.prototype.setBackgroundColor = function (hexColor) {
    this._backgroundColor = hexColor;
  };

  UI_Gauge.prototype.setCenterText = function (text, color) {
    this._centerText = this._makeTextData(text, color);
  };

  UI_Gauge.prototype._makeTextData = function (textValue, colorValue) {
    return {
      text: textValue || '',
      color: colorValue || '#FFFFFF'
    };
  };

  UI_Gauge.prototype.setRightText = function (text, color) {
    this._rightText = this._makeTextData(text, color);
  };

  UI_Gauge.prototype.setLeftText = function (text, color) {
    this._leftText = this._makeTextData(text, color);
  };

  UI_Gauge.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this._updateValues();
    if (this._isValueChanged()) {
      this.refresh();
    }
  };

  UI_Gauge.prototype._updateValues = function () {
    //EMPTY
  };

  UI_Gauge.prototype._isValueChanged = function () {
    return (this._currentValue != this._lastValue);
  };

  UI_Gauge.prototype.refresh = function () {
    this._lastValue = this._currentValue;
    this._drawAll();
  };

  UI_Gauge.prototype._drawAll = function () {
    this._drawBackground();
    this._drawGaugeLine();
    this._drawTexts();
  };

  UI_Gauge.prototype._drawBackground = function () {
    this.bitmap.fillRect(0, 0, this.bitmap.width, this.bitmap.height, this._backgroundColor);
  };

  UI_Gauge.prototype._drawGaugeLine = function () {
    this.bitmap.gradientFillRect(1, 1, this._gaugeWidth, this.bitmap.height - 2,
      this._startColor,
      this._endColor,
      false);

  };

  UI_Gauge.prototype._drawTexts = function () {
    this._setTextFontSize();
    this._drawText(this._leftText, 'left');
    this._drawText(this._centerText, 'center');
    this._drawText(this._rightText, 'right');
  };

  UI_Gauge.prototype._setTextFontSize = function () {
    this.bitmap.fontSize = this.bitmap.height - 4;
  };

  UI_Gauge.prototype._drawText = function (textData, position) {
    if (textData && textData.text != '') {
      var prevtextColor = this.bitmap.textColor;
      this.bitmap.textColor = textData.color;
      this.bitmap.drawText(textData.text, 4, 0, this.bitmap.width - 8, this.bitmap.height, position);
      this.bitmap.textColor = prevtextColor;
    }
  };

})();

//■ END UI_Gauge
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////