/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_GaugeABS.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------
(function () {

  function UI_GaugeABS() {
    this.initialize.apply(this, arguments);
  }

  AlphaABS.register(UI_GaugeABS);
  var UI_Gauge = AlphaABS.LIBS.UI_Gauge;

  UI_GaugeABS.prototype = Object.create(UI_Gauge.prototype);
  UI_GaugeABS.prototype.constructor = UI_GaugeABS;

  UI_GaugeABS.prototype.initialize = function (width, height) {
    UI_Gauge.prototype.initialize.call(this, width, height);
    this._battler = null;
    this._isShowValue = true;
  };

  UI_GaugeABS.prototype.setBattler = function (battler) {
    this._battler = battler;
    if (this._battler) {
      this._configGaugeForBattler();
    } else {
      this.reset();
    }
    this.refresh();
  };

  UI_GaugeABS.prototype._configGaugeForBattler = function () {
    //EMPTY
  };

  //{Font Name, Color, Background Color, Visible, Show value}
  UI_GaugeABS.prototype.applyPluginParameters = function (pluginParams) {
    try {
      this._applyFont(pluginParams['Font Name']);
      this._applyColors(pluginParams);

      this._isShowValue = pluginParams['Show value'];
      this.visible = pluginParams.Visible;

    } catch (e) {
      //LOGW(AlphaABS.SYSTEM.) //TODO:: Лог что ошибка при применении
      console.log('ERROR while apply Plugin Parameters on UI_Gauge ' + e.name);
      this.reset();
    } finally {
      this.refresh();
    }
  };

  UI_GaugeABS.prototype._applyFont = function (fontName) {
    if (fontName)
      this.setFont(fontName);
  };

  UI_GaugeABS.prototype._applyColors = function (pluginParams) {
    this.setBackgroundColor(pluginParams['Background Color']);
    this._applyGaugeColors(pluginParams.Color);
  };

  UI_GaugeABS.prototype._applyGaugeColors = function (colors) {
    if (colors) {
      var color1 = colors['Color 1'];
      var color2 = colors['Color 2'];
      this.setGaugeColors(color1, color2);
      if (color2 == '')
        this.applyGeneratedGradient();
    }
  };

})();


//■ END UI_GaugeABS
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////