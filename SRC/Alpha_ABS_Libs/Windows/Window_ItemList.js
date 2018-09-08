(function () {

  var Consts = AlphaABS.SYSTEM;

  //Window_ItemList
  //------------------------------------------------------------------------------
  var _Window_ItemList_isEnabled = Window_ItemList.prototype.isEnabled;
  Window_ItemList.prototype.isEnabled = function (item) {
    try {
      if (item && item.occasion == 1 && item.meta.ABS) {
        return false;
      } else
        return _Window_ItemList_isEnabled.call(this, item);
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  var _Window_ItemList_update = Window_ItemList.prototype.update;
  Window_ItemList.prototype.update = function () {
    _Window_ItemList_update.call(this);
    if (this.active) {
      this._absItemToPanel();
    }
  };

  Window_ItemList.prototype._absItemToPanel = function () {
    try {
      for (var i = 1; i < 9; i++) {
        if (Input.isTriggered("" + i)) {
          if (this.item() && this.item().occasion == 1 && this.item().meta.ABS) {
            //LOG.p("Item " + this.item().name + " set to slot " + i);
            $gameParty.leader().setItemOnPanel(this.item().id, i - 1);
            SoundManager.playEquip();
            this.refresh();
          } else {
            LOGW.p(Consts.STRING_WARNING_SKILLOC);
            SoundManager.playBuzzer();
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  var _Window_ItemList_drawItemNumber = Window_ItemList.prototype.drawItemNumber;
  Window_ItemList.prototype.drawItemNumber = function (item, x, y, width) {
    _Window_ItemList_drawItemNumber.call(this, item, x, y, width);
    try {
      if (this._category != 'item') return;
      var index = $gameParty.leader().skillIndexOnUI(item.id, true);
      if (index >= 0) {
        this.changeTextColor(Color.ORANGE.CSS);
        this.drawText("[" + (index + 1) + "]", x + width - 60 - this.numberWidth(), y, 40, 'left');
      }
    } catch (e) {
      console.error(e);
    }
  };

  var _Window_ItemList_initialize = Window_ItemList.prototype.initialize;
  Window_ItemList.prototype.initialize = function (x, y, width, height) {
    _Window_ItemList_initialize.call(this, x, y, width, height);

    this._absPanel = new AlphaABS.LIBS.Sprite_SkillPanelABS_L();
    this._absPanel.x = (this.width / 2) - this._absPanel.width / 2;
    this._absPanel.y = this.height - this._absPanel.height - 10;
    if ($gameParty.leader()) {
      this._absPanel.refresh($gameParty.leader());
    }
    this._absPanel.visible = false;
    this.addChild(this._absPanel);
  };

  var _Window_ItemList_setCategory = Window_ItemList.prototype.setCategory;
  Window_ItemList.prototype.setCategory = function (category) {
    _Window_ItemList_setCategory.call(this, category);
    if (this._category == 'item') {
      this._absPanel.visible = true;
    } else
      this._absPanel.visible = false;
  };

  var _Window_ItemList_update_9090 = Window_ItemList.prototype.update;
  Window_ItemList.prototype.update = function () {
    _Window_ItemList_update_9090.call(this);
    try {
      if (this.active && this._absPanel.visible) {
        if (TouchInput.isTriggered()) {
          var tI = this._absPanel.checkTouch();
          if (tI != null) {
            if (this.item() && this.item().occasion == 1 && this.item().meta.ABS) {
              this._absPanel.touchSkillAt(tI);
              //LOG.p("Item " + this.item().name + " set to slot " + tI);
              $gameParty.leader().setItemOnPanel(this.item().id, tI - 1);
              SoundManager.playEquip();
              this.refresh();
            } else {
              LOGW.p(Consts.STRING_WARNING_SKILLOC);
              SoundManager.playBuzzer();
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  //END Window_ItemList
  //------------------------------------------------------------------------------

})();