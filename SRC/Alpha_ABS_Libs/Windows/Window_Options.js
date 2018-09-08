(function () {
  //Window_Options
  //------------------------------------------------------------------------------
  var _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function () {
    _Window_Options_makeCommandList.call(this);
    this._addUIOptions();
    if (AlphaABS.SYSTEM.EXTENSIONS.KEY_BINDING && !Utils.isMobileDevice())
      this._addBindingOptions();
  };

  Window_Options.prototype._addUIOptions = function () {
    if ($gameMap.isABS()) {
      var optionUIEditAllow = AlphaABS.Parameters.isUIEditorAllowed();
      if (optionUIEditAllow == true && !Utils.isMobileDevice())
        this.addCommand(AlphaABS.SYSTEM.STRING_MENU_UIPOS, 'absEditUI');
    }
  };

  Window_Options.prototype._addBindingOptions = function () {
      this.addCommand(AlphaABS.SYSTEM.STRING_MENU_KEYBIND, 'absEditKeys');
  };

  Window_Options.prototype._isABSSymbol = function (symbol) {
    return symbol.contains('abs');
  };

  Window_Options.prototype._isABSSymbol2 = function (symbol) {
    return symbol.contains('absEdit');
  };

  var _Window_Options_statusText = Window_Options.prototype.statusText;
  Window_Options.prototype.statusText = function (index) {
    var symbol = this.commandSymbol(index);
    if (this._isABSSymbol2(symbol)) {
      return '';
    } else {
      return _Window_Options_statusText.call(this, index);
    }
  };

  var _Window_Options_changeValue = Window_Options.prototype.changeValue;
  Window_Options.prototype.changeValue = function (symbol, value) {
    if (this._isABSSymbol(symbol)) {
      if (this._isABSSymbol2(symbol)) {
        SoundManager.playCursor();
        if (symbol.contains('UI')) {
          if (!AlphaABS.BattleUI.isVisible()) {
            SoundManager.playBuzzer();
          } else
            SceneManager.push(AlphaABS.LIBS.Scene_InterfaceEdit);
          return;
        }
        if (symbol.contains('Keys')) {
          SceneManager.push(AlphaABS.LIBS.Scene_KeyBinder);
          return;
        }
      } else {
        var lastValue = this.getConfigValue(symbol);
        if (lastValue !== value) {
          if(AlphaABS.BattleUI.isUI())
            AlphaABS.BattleUI.getUI().setShowUI(value);
          this.redrawItem(this.findSymbol(symbol));
          SoundManager.playCursor();
        }
      }
    } else {
      _Window_Options_changeValue.call(this, symbol, value);
    }
  };

  var _Window_Options_getConfigValue = Window_Options.prototype.getConfigValue;
  Window_Options.prototype.getConfigValue = function (symbol) {
    if (this._isABSSymbol(symbol)) {
      if (this._isABSSymbol2(symbol)) {
        return true;
      } else {
        return AlphaABS.BattleUI.isVisible();
      }
    } else {
      return _Window_Options_getConfigValue.call(this, symbol);
    }
  };
  //END Window_Options
  //------------------------------------------------------------------------------

})();