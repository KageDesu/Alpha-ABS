(function () {

  var Consts = AlphaABS.SYSTEM;
  var LOG = new PLATFORM.DevLog("Window_SkillList");

  var _Window_SkillList_update = Window_SkillList.prototype.update;
  Window_SkillList.prototype.update = function () {
    _Window_SkillList_update.call(this);
    if (this.active) {
      this._absSkillToPanel();
    }
  };

  Window_SkillList.prototype._absSkillToPanel = function () {
    try {
      for (var i = 1; i < 9; i++) {
        if (Input.isTriggered("" + i)) {
          if (this.checkABSItem(this.item())) {
            LOG.p("Skill " + this.item().name + " set to slot " + i);
            this._actor.setSkillOnPanel(this.item().id, i - 1);
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

  var _Window_SkillList_isEnabled = Window_SkillList.prototype.isEnabled;
  Window_SkillList.prototype.isEnabled = function (item) {
    if (this.checkABSItem(item)) {
      return false;
    } else
      return _Window_SkillList_isEnabled.call(this, item);
  };

  //NEW
  Window_SkillList.prototype.checkABSItem = function (item) {
    try {
      return (item && item.occasion == 1 && item.meta.ABS);
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  var _Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
  Window_SkillList.prototype.drawSkillCost = function (skill, x, y, width) {
    _Window_SkillList_drawSkillCost.call(this, skill, x, y, width);
    //Draw panel number of skill
    try {
      var index = this._actor.skillIndexOnUI(skill.id);
      if (index >= 0) {
        this.changeTextColor(Color.ORANGE.CSS);
        this.drawText("[" + (index + 1) + "]", x + width - 60 - this.costWidth(), y, 40, 'left');
      }
    } catch (e) {
      console.error(e);
    }
  };

  var _Window_SkillList_initialize = Window_SkillList.prototype.initialize;
  Window_SkillList.prototype.initialize = function (x, y, width, height) {
    _Window_SkillList_initialize.call(this, x, y, width, height);

    this._absPanel = new AlphaABS.LIBS.Sprite_SkillPanelABS_L();
    this._absPanel.x = (this.width / 2) - this._absPanel.width / 2;
    this._absPanel.y = this.height - this._absPanel.height - 10;
    this.addChild(this._absPanel);
  };

  var _Window_SkillList_setActor = Window_SkillList.prototype.setActor;
  Window_SkillList.prototype.setActor = function (actor) {
    try {
      if (this._actor !== actor) {
        this._absPanel.refresh(actor);
      }
    } catch (e) {
      console.error(e);
    }
    _Window_SkillList_setActor.call(this, actor);
  };

  var _Window_SkillList_update_432 = Window_SkillList.prototype.update;
  Window_SkillList.prototype.update = function () {
    _Window_SkillList_update_432.call(this);
    if (this.active) {
      if (TouchInput.isTriggered()) {
        try {
          var tI = this._absPanel.checkTouch();
          if (tI != null) {
            if (this.checkABSItem(this.item())) {
              this._absPanel.touchSkillAt(tI);
              LOG.p("Skill " + this.item().name + " set to slot " + tI);
              this._actor.setSkillOnPanel(this.item().id, tI - 1);
              SoundManager.playEquip();
              this.refresh();
            } else {
              SoundManager.playBuzzer();
              LOGW.p(Consts.STRING_WARNING_SKILLOC);
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  };
})();