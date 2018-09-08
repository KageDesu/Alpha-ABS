(function () {

  "use strict";

  var ABSObject_PopUp = AlphaABS.ABSObject_PopUp;
  var ABSObject_PopUpMachine = AlphaABS.ABSObject_PopUpMachine;

  //PopInfoManagerABS
  //------------------------------------------------------------------------------
  function PopInfoManagerABS() {
    throw new Error('This is a static class');
  }

  PopInfoManagerABS.makeDamagePopUp = function (user) {
    var result = user.result();
    var value;

    if (result.hpDamage != 0) {
      if(result.hpDamage < 0 && user.hp == user.mhp)
        return;
      value = PopInfoManagerABS.HP(result.hpDamage, result.critical);
      this._apply_pop_up(user, value);
    }

    if (result.mpDamage != 0) {
      if (result.mpDamage < 0 && user.mp == user.mmp)
        return;
      value = PopInfoManagerABS.MP(result.mpDamage, result.critical);
      this._apply_pop_up(user, value);
    }

    if (result.tpDamage != 0) {
      value = PopInfoManagerABS.TP(result.tpDamage, result.critical);
      this._apply_pop_up(user, value);
    }
  };

  PopInfoManagerABS.makeZeroDamagePopUp = function (user) {
    var result = user.result();
    var value = PopInfoManagerABS.HP(0, result.critical);
    this._apply_pop_up(user, value);
  };

  PopInfoManagerABS.makeDrainPopUp = function (user) { //user - who get drained HP
    var result = user.result();
    var value;
    if (result.hpDamage != 0) {
      value = PopInfoManagerABS.HP(result.hpDamage, result.critical);
      value.getFontSettings()[2] = true;
      this._apply_pop_up(user, value);
    }

    if (result.mpDamage != 0) {
      value = PopInfoManagerABS.MP(result.mpDamage, result.critical);
      value.getFontSettings()[2] = true;
      this._apply_pop_up(user, value);
    }
  };

  PopInfoManagerABS.makeStatePopUp = function (user, stateId, isErase) {
    var state = $dataStates[stateId];
    if (state.iconIndex == 0)
      return;
    if (state.id == user.deathStateId())
      return;
    var value = PopInfoManagerABS.STATE((user.isEnemy() ? "" : state.name), state.iconIndex, isErase);
    this._apply_pop_up(user, value);
  };

  PopInfoManagerABS.makeItemPopUp = function (user) {
    var result = user.result();
    if (!user.isAlive()) return;
    if (result.missed) {
      this._apply_pop_up(user, PopInfoManagerABS.TEXT(AlphaABS.SYSTEM.STRING_POPUP_MISS));
      return;
    }

    if (result.evaded) {
      this._apply_pop_up(user, PopInfoManagerABS.TEXT(AlphaABS.SYSTEM.STRING_POPUP_EVADE));
      return;
    }

    if (result.isHit() && !result.success) {
      this._apply_pop_up(user, PopInfoManagerABS.TEXT(AlphaABS.SYSTEM.STRING_POPUP_FAIL));
      return;
    }
  };

  PopInfoManagerABS.makeBuffPopUp = function (user, paramId, isPositive) {
    if (!user.isAlive()) return;
    var paramName = user.isEnemy() ? "" : TextManager.param(paramId);
    var temp = isPositive ? 1 : -1;
    var iconIndex = user.buffIconIndex(temp, paramId);
    var value = PopInfoManagerABS.BUFF(paramName, iconIndex, isPositive);
    if (!user.getInfoPops().include(value)) {
      this._apply_pop_up(user, value);
    }
  };

  PopInfoManagerABS.makeSkillRechargePopUp = function (user, skillId) {
    if (!user.isAlive()) return;
    if (user.isEnemy()) return; //This is for ActorEnemy, in version 1 not develop yet
    var skill = $dataSkills[skillId];
    var value = PopInfoManagerABS.SKILL(skill.name, skill.iconIndex);
    if (!user.getInfoPops().include(value)) {
      this._apply_pop_up(user, value);
    }
  };

  PopInfoManagerABS.calcRate = function (rate) {
    this.text = "";
  };

  //STATIC
  PopInfoManagerABS.HP = function (value, critical) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    var color = Color.YELLOW;
    if (value < 0) {
      color = Color.GREEN;
      value = Math.abs(value);
    } else if (critical) {
      color = Color.RED;
      fontSettings[1] = 34;
    }

    var x = new ABSObject_PopUp(value, color, null, fontSettings);
    x.setNumered();
    return x;
  };

  PopInfoManagerABS.TP = function (value, critical) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    var color = Color.ORANGE;
    if (value < 0) {
      color = Color.GREEN;
      value = Math.abs(value);
    } else if (critical) {
      color = Color.RED;
      fontSettings[1] = 34;
    }

    value = value + " " + TextManager.tpA;
    var x = new ABSObject_PopUp(value, color, null, fontSettings);
    x.setNumered();
    return x;
  };

  PopInfoManagerABS.MP = function (value, critical) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    var color = Color.MAGENTA;
    if (value < 0) {
      color = Color.BLUE;
      value = Math.abs(value);
    } else if (critical) {
      color = Color.MAGENTA;
      fontSettings[1] = 34;
    }

    var x = new ABSObject_PopUp(value, color, null, fontSettings);
    x.setNumered();
    return x;
  };

  PopInfoManagerABS.STATE = function (name, iconIndex, isErase) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    fontSettings[2] = true;

    var temp = isErase ? "- " : "+ ";
    fontSettings[0] = AlphaABS.SYSTEM.FONT;
    return new ABSObject_PopUp(temp + name, null, iconIndex, fontSettings);
  };

  PopInfoManagerABS.BUFF = function (name, iconIndex, isPositive) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    fontSettings[2] = true;

    var color = isPositive ? Color.GREEN : Color.RED;
    fontSettings[0] = AlphaABS.SYSTEM.FONT;
    return new ABSObject_PopUp(name, color, iconIndex, fontSettings);
  };

  PopInfoManagerABS.TEXT = function (text) {
    return new ABSObject_PopUp(text);
  };

  PopInfoManagerABS.TEXT_WITH_COLOR = function (text, color) {
    return new ABSObject_PopUp(text, color);
  };

  PopInfoManagerABS.ALERT = function (text) {
    if (AlphaABS.Parameters.isLoaded()) {
      if (!this._alertPopUpConfigurated) {
        this._alertPopUpConfigurated = true;
        var parameters = AlphaABS.Parameters.get_UIE_PlayerMessageBar();
        this._alertPopUp_color = (parameters['Text Color']) ? Color.FromHex(parameters['Text Color']) : Color.RED;
        this._alertPopUp_fontName = (parameters['Font Name']) ? parameters['Font Name'] : null;
      }
      return new ABSObject_PopUp(text, this._alertPopUp_color, null, [this._alertPopUp_fontName, 22, false, 2, Color.BLACK]);
    } else
      return new ABSObject_PopUp(text, Color.RED, null, [null, 22, false, 2, Color.BLACK]);
  };

  PopInfoManagerABS.EXP = function (value) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    fontSettings[1] = 32;
    var x = new ABSObject_PopUp(value, Color.MAGENTA, null, fontSettings);
    x.setNumered();
    return x;
  };

  PopInfoManagerABS.SKILL = function (name, iconIndex) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    fontSettings[2] = true;
    return new ABSObject_PopUp(AlphaABS.SYSTEM.STRING_POPUP_SKILL, Color.GREEN, iconIndex, fontSettings);
  };

  //PRIVATE
  PopInfoManagerABS._apply_pop_up = function (user, value) {
    /*if(this.text === undefined)
      this.text = "";
    if(this.text != "") {
      if(value.isNumered()) value.setExtraText(this.text);
      this.text = "";
    }*/
    user.addInfoPop(value);
  };

  //END PopInfoManagerABS
  //------------------------------------------------------------------------------

  AlphaABS.PopInfoManagerABS = PopInfoManagerABS;
  AlphaABS.register(PopInfoManagerABS);

})();