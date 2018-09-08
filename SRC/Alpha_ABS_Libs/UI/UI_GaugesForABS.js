(function(){

  function UI_GaugeABS_HP() {
      this.initialize.apply(this, arguments);
  }

  AlphaABS.register(UI_GaugeABS_HP);
  var UI_GaugeABS = AlphaABS.LIBS.UI_GaugeABS;
  var Color = PLATFORM.Color;

  UI_GaugeABS_HP.prototype = Object.create(UI_GaugeABS.prototype);
  UI_GaugeABS_HP.prototype.constructor = UI_GaugeABS_HP;

  UI_GaugeABS_HP.prototype.initialize = function(width, height) {
    UI_GaugeABS.prototype.initialize.call(this, width, height);
    this.setGaugeColors(this._mainGaugeHexColor());
    this.applyGeneratedGradient();
  };

  UI_GaugeABS_HP.prototype._mainGaugeHexColor = function() {
    return Color.RED.toHex();
  };

  //OVER
  UI_GaugeABS_HP.prototype._configGaugeForBattler = function() {
    UI_GaugeABS.prototype._configGaugeForBattler.call(this);
    this.setLeftText(this._leftGaugeText());
  };

  UI_GaugeABS_HP.prototype._leftGaugeText = function() {
    return TextManager.hpA;
  };

  //OVER
  UI_GaugeABS_HP.prototype._updateValues = function() {
    UI_GaugeABS.prototype._updateValues.call(this);
    if(this._battler) {
      this._updateMaxValue();
      this.setValue(this._currentGaugeValue());
    }
  };

  UI_GaugeABS_HP.prototype._updateMaxValue = function() {
    if(this._maxGaugeValue() != this._maxValue) {
      this.setMaxValue(this._maxGaugeValue());
      this.refresh();
    }
  };

  UI_GaugeABS_HP.prototype._maxGaugeValue = function() {
    return this._battler.mhp;
  };

  UI_GaugeABS_HP.prototype._currentGaugeValue = function() {
    return this._battler.hp;
  };

  //OVER
  UI_GaugeABS_HP.prototype.refresh = function() {
    if(this._isShowValue == true)
      this.setRightText(this._currentValue);
    UI_GaugeABS.prototype.refresh.call(this);
  };



  function UI_GaugeABS_MP() {
      this.initialize.apply(this, arguments);
  }

  AlphaABS.register(UI_GaugeABS_MP);
  var UI_GaugeABS_HP = AlphaABS.LIBS.UI_GaugeABS_HP;

  UI_GaugeABS_MP.prototype = Object.create(UI_GaugeABS_HP.prototype);
  UI_GaugeABS_MP.prototype.constructor = UI_GaugeABS_MP;

  UI_GaugeABS_MP.prototype.initialize = function(width, height) {
    UI_GaugeABS_HP.prototype.initialize.call(this, width, height);
  };

  UI_GaugeABS_MP.prototype._mainGaugeHexColor = function() {
    return Color.BLUE.toHex();
  };

  UI_GaugeABS_MP.prototype._leftGaugeText = function() {
    return TextManager.mpA;
  };

  UI_GaugeABS_MP.prototype._maxGaugeValue = function() {
    return this._battler.mmp;
  };

  UI_GaugeABS_MP.prototype._currentGaugeValue = function() {
    return this._battler.mp;
  };



  function UI_GaugeABS_TP() {
      this.initialize.apply(this, arguments);
  }

  AlphaABS.register(UI_GaugeABS_TP);
  var UI_GaugeABS_HP = AlphaABS.LIBS.UI_GaugeABS_HP;

  UI_GaugeABS_TP.prototype = Object.create(UI_GaugeABS_HP.prototype);
  UI_GaugeABS_TP.prototype.constructor = UI_GaugeABS_TP;

  UI_GaugeABS_TP.prototype.initialize = function(width, height) {
    UI_GaugeABS_HP.prototype.initialize.call(this, width, height);
  };

  UI_GaugeABS_TP.prototype._mainGaugeHexColor = function() {
    return Color.GREEN.toHex();
  };

  UI_GaugeABS_TP.prototype._leftGaugeText = function() {
    return TextManager.tpA;
  };

  UI_GaugeABS_TP.prototype._maxGaugeValue = function() {
    return this._battler.maxTp();
  };

  UI_GaugeABS_TP.prototype._currentGaugeValue = function() {
    return this._battler.tp;
  };



  function UI_GaugeABS_HPE() {
      this.initialize.apply(this, arguments);
  }

  AlphaABS.register(UI_GaugeABS_HPE);
  var UI_GaugeABS_HP = AlphaABS.LIBS.UI_GaugeABS_HP;

  UI_GaugeABS_HPE.prototype = Object.create(UI_GaugeABS_HP.prototype);
  UI_GaugeABS_HPE.prototype.constructor = UI_GaugeABS_HPE;

  UI_GaugeABS_HPE.prototype.initialize = function(width, height) {
    UI_GaugeABS_HP.prototype.initialize.call(this, width, height);
    this._isShowInPercent = true;
  };

  UI_GaugeABS_HPE.prototype.setShowInPercent = function(bool) {
    this._isShowInPercent = bool;
  };

  UI_GaugeABS_HPE.prototype._leftGaugeText = function() {
    return '';
  };

  //OVER
  UI_GaugeABS_HPE.prototype.refresh = function() {
    if(this._isShowValue == true && this._battler)
      this.setCenterText(this._textForValue());
    UI_GaugeABS.prototype.refresh.call(this);
  };

  UI_GaugeABS_HPE.prototype._textForValue = function() {
    if(this._isShowInPercent) {
      return this._getValueInPercent();
    } else {
      return this._currentValue;
    }
  };

  UI_GaugeABS_HPE.prototype._getValueInPercent = function() {
    var percent = Math.floor((this._currentValue * 100) / this._maxGaugeValue());
    if(percent <= 0)
      percent = 1;
    return (percent + '%');
  };

})();

