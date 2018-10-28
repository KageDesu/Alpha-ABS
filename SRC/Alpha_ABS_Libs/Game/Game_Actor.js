(function () {
  var LOG = new PLATFORM.DevLog("Game_Actor");
  var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;
  var Consts = AlphaABS.SYSTEM;

  //Game_Actor
  //------------------------------------------------------------------------------
  var _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
  Game_Actor.prototype.initMembers = function () {
    _Game_Actor_initMembers.call(this);
    this._absParams.panelSkills = [null, null, null, null, null, null, null, null]; //[id,type]
    this._absParams.favoriteWeapons = [null, null, null, null];
  };

  //NEW
  Game_Actor.prototype.getFavWeapIcons = function () {
    return this._absParams.favoriteWeapons.map(function (argument) {
      if (argument) {
        return $dataWeapons[argument].iconIndex;
      }
      return null;
    });
  };

  Game_Actor.prototype.changeFormationABS = function () {};

  //NEW
  Game_Actor.prototype.setFavWeap = function (item, index) {
    if (index > 3) return;
    if (item == null) {
      this.removeFavWeap(index);
      return;
    }
    if (this._absParams.favoriteWeapons[index] &&
      item.id == this._absParams.favoriteWeapons[index]) {
      this.removeFavWeap(index);
    } else {
      this._absParams.favoriteWeapons[index] = item.id;
    }
  };

  //NEW
  Game_Actor.prototype.isFavWeapExists = function () {
    return this._absParams.favoriteWeapons.some(function (elem) {
      return (elem !== null);
    });
  };

  //NEW
  Game_Actor.prototype.getFavWeapIndex = function (item) {
    var index = 0;
    if (item == null)
      return null;

    var finded = null; //This is not good at all
    this._absParams.favoriteWeapons.forEach(function (i) {
      if (i && i == item.id) {
        finded = index;
      }
      index++;
    }.bind(this));

    return finded;
  };

  //NEW
  Game_Actor.prototype.getFavWeapSymbol = function (item) {
    if (!DataManager.isWeapon(item)) return null;
    var index = this.getFavWeapIndex(item);
    if (index !== null) {
      var symbol = null;
      switch (index) {
        case 0:
          symbol = AlphaABS.LIBS.IKey.SC_W();
          break;
        case 1:
          symbol = AlphaABS.LIBS.IKey.SC_D();
          break;
        case 2:
          symbol = AlphaABS.LIBS.IKey.SC_S();
          break;
        case 3:
          symbol = AlphaABS.LIBS.IKey.SC_A();
          break;
        default:
          break;
      }
      if (symbol != null) {
        return AlphaABS.LIBS.IKey.convertIKeyToLetter(symbol);
      }
    }
    return null;
  };

  //NEW
  Game_Actor.prototype.removeFavWeap = function (index) {
    this._absParams.favoriteWeapons[index] = null;
  };

  //NEW
  Game_Actor.prototype.changeFavWeap = function (index) {
    var fvItem = this._absParams.favoriteWeapons[index];
    if (fvItem != null) {
      var fvItemX = $dataWeapons[fvItem];
      if (fvItemX != null) {
        if (this.hasWeapon(fvItemX)) {
          return false;
        }
        if ($gameParty.hasItem(fvItemX, false)) {
          if (Imported.YEP_ItemCore == true) {
            var slotId = fvItemX.etypeId - 1;
            this.changeEquip(slotId, fvItemX);
            return true;
          } else {
            this.changeEquipById(fvItemX.etypeId, fvItemX.id);
            return true;
          }
        }
      }
    }

    return false;
  };

  //OVER
  Game_Actor.prototype.performAttack = function () {
    var weapons = this.weapons();
    var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
    if(this.isHasABSMotion()) {
      this.requestABSMotionAction();
    } else {
      var attackMotion = $dataSystem.attackMotions[wtypeId];
      if (attackMotion) {
        this.startWeaponAnimation(attackMotion.weaponImageId);
      }
    }
  };

  var pkd_GameActor_learnSkill = Game_Actor.prototype.learnSkill;
  Game_Actor.prototype.learnSkill = function (skillId) {
    var skill = $dataSkills[skillId];
    if (!skill.meta.ABS) {
      LOGW.p("Skill " + skill.name + " not learned, not ABS type");
      return; //Not allow learn not ABS skills
    }
    if (Utils.isMobileDevice()) {
      if (skill.meta.ABS) {
        var skillType = JSON.parse(skill.meta.ABS);
        if (skillType == 2 && skill.scope != 11) {
          LOGW.p("Skill " + skill.name + " not learned, not support on mobile platform");
          return;
        }
      }
    }
    var isLearning = this.isLearnedSkill(skillId);
    pkd_GameActor_learnSkill.call(this, skillId);
    if (skill.occasion == 1 && !isLearning) {
      this._absParams.battleSkillsABS.push(skillId, false);
      this.setSkillOnPanel(skillId, undefined);
      AlphaABS.BattleUI.refresh();
    }
  };

  //NEW
  Game_Actor.prototype.uiPanelReset = function () {
    for (var i = 0; i < 8; i++) {
      this.setSkillOnPanel(null, i);
    }
  };

  Game_Actor.prototype.uiPanelSkills = function () {
    return this._absParams.panelSkills;
  };

  Game_Actor.prototype.skillByKeyIndex = function (index) {
    index = index - 1; //Keyboard from 1, but array from 0
    if (index < 0 || index > 7) {
      return null;
    }
    var skillABS = this._absParams.panelSkills[index];
    return skillABS;
  };

  Game_Actor.prototype.uiPanelObjectsCount = function () {
    var count = 0;
    this._absParams.panelSkills.forEach(function (i) {
      if (i !== null) count++;
    });
    return count;
  };

  Game_Actor.prototype.setItemOnPanel = function (itemId, position) {
    if (this._absParams.battleSkillsABS.itemById(itemId) === null)
      this._absParams.battleSkillsABS.push(itemId, true);
    this._setObjectOnPanel(itemId, 1, position);
  };

  Game_Actor.prototype.setSkillOnPanel = function (skillId, position) {
    this._setObjectOnPanel(skillId, 0, position);
  };

  Game_Actor.prototype._uiPanelFreeSlot = function () {
    for (var i = 0; i < 8; i++) {
      if (this._absParams.panelSkills[i] === null) {
        return i;
      }
    }
    return null; //Not empty slots
  };

  Game_Actor.prototype._setOnPosition = function (id, type, position) {
    if (id == null) {
      this._absParams.panelSkills[position] = null;
      return;
    }
    if (type == 1) {
      this._absParams.panelSkills[position] = this._absParams.battleSkillsABS.itemById(id);
    } else {
      this._absParams.panelSkills[position] = this._absParams.battleSkillsABS.skillById(id);
    }
  };

  Game_Actor.prototype._setObjectOnPanel = function (skillId, type, position) {
    if (position === undefined) {
      var slot = this._uiPanelFreeSlot();
      if (slot >= 0) {
        this._setObjectOnPanel(skillId, type, slot);
      } else {
        return;
      }
    } else {
      if (skillId == null) {
        this._setOnPosition(null, type, position);
      } else {
        if (this._compareObjectOnPosition(skillId, type, position)) { //Remove if on self position
          this._setObjectOnPanel(null, type, position);
        } else {
          var index = this.skillIndexOnUI(skillId, type);
          if (index >= 0) { //Remove from other position if exists
            this._setOnPosition(null, type, index);
          }
          this._setOnPosition(skillId, type, position);
        }
      }

    }
    AlphaABS.BattleUI.refresh();
  };

  Game_Actor.prototype._compareObjectOnPosition = function (id, type, position) {
    if (this._absParams.panelSkills[position]) {
      var item = this._absParams.panelSkills[position];
      if (item.skillId == id) {
        if (type == 1) {
          if (item.isItem()) return true;
        } else {
          if (!item.isItem()) return true;
        }
      }
    }

    return false;
  };

  //Возвращяет номер этого навыка на панели или -1, если навыка нет на панели
  Game_Actor.prototype.skillIndexOnUI = function (skillId, isItem) {
    for (var i = 0; i < this._absParams.panelSkills.length; i++) {
      var item = this._absParams.panelSkills[i];
      if (item === null) continue;
      if (item.skillId == skillId) {
        if (isItem) {
          if (item.isItem()) return i;
        } else
        if (!item.isItem()) return i;
      }
    }

    return -1;
  };

  //OVER
  Game_Actor.prototype.performMapDamage = function () {
    $gameScreen.startFlashForDamage();
  };

  //OVER
  Game_Actor.prototype.turnEndOnMap = function () {
    //EMPTY
  };

  Game_Actor.prototype.stopABS = function () {
    Game_Battler.prototype.stopABS.call(this);
    this._unloadLastFirearm();
    if (this._absParams.stackSkillExists) {
      this._absParams.stackSkillExists = false;
    }
  };

  Game_Actor.prototype._prepareABSSkill = function (absSkill) {
    Game_Battler.prototype._prepareABSSkill.call(this, absSkill);
  };

  //NEW
  Game_Actor.prototype.refreshABSSkills = function () {
    var skillsAll = this._absParams.battleSkillsABS.all();
    for (var i = skillsAll.length - 1; i > 0; i--) {
      var item = skillsAll[i];
      if (item.isItem()) {
        if (item.isReady()) {
          if ($gameParty.numItems(item.skill()) == 0) {
            if (!this._absParams.panelSkills.include(item)) {
              LOG.p("Remove ITEM ABS from memory " + item.name());
              skillsAll.splice(i, 0);
            }
          }
        }
      }
    }
  };

  Game_Actor.prototype.performCurrentAction = function () {
    Game_Battler.prototype.performCurrentAction.call(this);

  };

  var _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
  Game_Actor.prototype.displayLevelUp = function (newSkills) {
    if ($gameMap.isABS()) {
      this._showLevelupAnimation();
    } else
      _Game_Actor_displayLevelUp.call(this, newSkills);
  };

  Game_Actor.prototype._showLevelupAnimation = function () {
    var levelUpAnimationId = AlphaABS.Parameters.get_LevelUpAnimationId();
    if (levelUpAnimationId > 0) {
      var myChar = $gameParty.getAIBotByBattler(this);
      if (myChar != null)
        myChar.requestAnimationABS(levelUpAnimationId);
    }
  };

  var _Game_Actor_tradeItemWithParty = Game_Actor.prototype.tradeItemWithParty;
  Game_Actor.prototype.tradeItemWithParty = function (newItem, oldItem) {
    $gameParty._noNotifyABS = true;
    var r = _Game_Actor_tradeItemWithParty.call(this, newItem, oldItem);
    $gameParty._noNotifyABS = false;
    return r;
  };

  var _Game_Actor_gainExp = Game_Actor.prototype.gainExp;
  Game_Actor.prototype.gainExp = function (exp) {
    if ($gameMap.isABS() && exp > 0) {
      var nExp = Math.round(exp * this.finalExpRate());
      if (this.isPlayer())
        AlphaABS.BattleUI.pushExpOnPanel(nExp);
    }
    _Game_Actor_gainExp.call(this, exp);
  };

  var pkd_GameActor_forgetSkill = Game_Actor.prototype.forgetSkill;
  Game_Actor.prototype.forgetSkill = function (skillId) {
    pkd_GameActor_forgetSkill.call(this, skillId);
    var index = this.skillIndexOnUI(skillId, false);
    if (index >= 0)
      this.setSkillOnPanel(null, index); //Delete from UI
    this._absParams.battleSkillsABS.remove(skillId, false);

  };

  var _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
  Game_Actor.prototype.changeEquip = function (slotId, item) {
    this._absParams.needWeaponCheck = true;
    _Game_Actor_changeEquip.call(this, slotId, item);
  };

  var _Game_Actor_discardEquip = Game_Actor.prototype.discardEquip;
  Game_Actor.prototype.discardEquip = function (item) {
    this._absParams.needWeaponCheck = true;
    _Game_Actor_discardEquip.call(this, item);
  };

  var _Game_Actor_refresh = Game_Actor.prototype.refresh;
  Game_Actor.prototype.refresh = function () {
    _Game_Actor_refresh.call(this);
    if (this._absParams.needWeaponCheck) {
      this._checkAdditionSkills();
      if ($gameMap.isABS()) {
        this._refreshWeaponABS();
        this._absParams.needWeaponCheck = false;
        AlphaABS.BattleUI.refreshWeaponIconAt(0);
      }
    }
  };

  //?[NEW]
  Game_Actor.prototype.checkAutoReloadFirearm = function (item) {
    var skill = this._firstBattleABSSkill();
    if (!skill.isFirearm()) return;
    if (!skill.isNeedReloadStack()) return;
    if (item.id == skill.ammo) {
      this.reloadFirearm();
    }
  };

  //?[NEW]
  Game_Actor.prototype._refreshWeaponABS = function () {
    this._unloadLastFirearm();
    this._absParams.battleSkillsABS.all()[0] = new Game_SkillABS(this.attackSkillId());
    LOG.p("PL : Check weapon skill");
    if (this.weapons().length > 0) {
      var w = this.weapons()[0];
      if (w.meta.ABS) {
        if (w.meta.ABS == 0) {
          this._firstBattleABSSkill().loadExternal(w.meta);
        }
        if (w.meta.ABS == 1) {
          this._firstBattleABSSkill().loadExternal(w.meta, 1);
        }
        if (w.meta.firearm == 1) {
          LOG.p("Firearm finded!");
          this._changeFirearm();
          AlphaABS.BattleUI.showFirearmPanel();
        }
      } else {
        this._absParams.battleSkillsABS.all()[0] = new Game_SkillABS(this.attackSkillId());
      }
    } else {
      this._absParams.battleSkillsABS.all()[0] = new Game_SkillABS(this.attackSkillId());
    }
    this.refreshABSMotion();
    AlphaABS.BattleUI.refresh();
  };

  //?[NEW]
  Game_Actor.prototype.refreshABSMotion = function () {
      this._absParams._isNeedABSMotionRefresh = true;
  };

  //?[NEW]
  Game_Actor.prototype.isNeedABSMotionRefresh = function () {
      return (this._absParams._isNeedABSMotionRefresh == true);
  };

  //?[NEW]
  Game_Actor.prototype.onABSMotionRefresh = function () {
      this._absParams._isNeedABSMotionRefresh = false;
  };

  //?[NEW]
  Game_Actor.prototype.isHasABSMotion = function () {
      var skill = this._firstBattleABSSkill();
      return skill.isHasMotion();
  };

  //?[NEW]
  Game_Actor.prototype._unloadLastFirearm = function () {
    var lastSkill = this._firstBattleABSSkill();
    if (lastSkill.isFirearm()) {
      this._absParams._lastFirearmWeaponData = [lastSkill._currentStack, lastSkill.ammo];
      this.unloadFirearm();
      lastSkill.reloadFirearm(0);
    }
  };

  //?[NEW]
  Game_Actor.prototype._firstBattleABSSkill = function () {
    return this._absParams.battleSkillsABS.all()[0];
  };

  //?[NEW]
  Game_Actor.prototype._changeFirearm = function () {
    if (!this.isPlayer()) return;
    this.reloadFirearm();
  };

  //?[NEW]
  Game_Actor.prototype.unloadFirearm = function () {
    if (this._absParams._lastFirearmWeaponData != null) {
      var itemsCountFromStack = this._absParams._lastFirearmWeaponData[0];
      if (itemsCountFromStack > 0) {
        var ammoItem = $dataItems[this._absParams._lastFirearmWeaponData[1]];
        $gameParty._noNotifyABS = true;
        $gameParty.gainItem(ammoItem, itemsCountFromStack);
        LOG.p("Firearm unloaded to inventory " + itemsCountFromStack);
        $gameParty._noNotifyABS = false;
      }
      this._absParams._lastFirearmWeaponData = null;
    }
    AlphaABS.BattleUI.refresh();
  };

  //?[NEW]
  Game_Actor.prototype.reloadFirearm = function () {
    var skill = this._firstBattleABSSkill();
    if (!skill.isFirearm()) return;
    if (!skill.isReady()) return;
    if (skill._currentStack == skill.stack) return;
    if (skill._currentStack > 0) {
      this._absParams._lastFirearmWeaponData = [skill._currentStack, skill.ammo];
      this.unloadFirearm();
      skill.reloadFirearm(0);
    }
    var ammoItem = $dataItems[skill.ammo];
    var itemsCount = $gameParty.numItems(ammoItem);
    LOG.p("Try reload firearm " + itemsCount);
    if (itemsCount >= skill.stack) {
      $gameParty.loseItem(ammoItem, skill.stack);
      skill.reloadFirearm(skill.stack);
    } else {
      if (itemsCount > 0) {
        skill.reloadFirearm(itemsCount);
        $gameParty.loseItem(ammoItem, itemsCount);
      } else {
        LOG.p("Try reload firearm : NO AMMO");
        AlphaABS.BattleManagerABS.alertOnUIbySym('noAmmo');
        skill.reloadFirearm(0);
      }
    }
    AlphaABS.BattleUI.refresh();
  };

  //NEW
  Game_Actor.prototype._checkAdditionSkills = function () {
    LOG.p("Check addition skills");
    this.addedSkills().forEach(function (i) {
      if (this._absParams.battleSkillsABS.skillById(i) == null) {
        this._absParams.battleSkillsABS.push(i, false);
        this.setSkillOnPanel(i, undefined);
      }
    }.bind(this));

    //CHECK ALL
    var d = this._skills.concat(this.addedSkills());
    this._absParams.battleSkillsABS.all().forEach(function (i) {
      if (!d.include(i.skillId)) {
        if (i.skillId != this.attackSkillId()) {
          this._absParams.battleSkillsABS.remove(i.skillId, false);
          var index = this.skillIndexOnUI(i.skillId, false);
          if (index != -1) {
            this.setSkillOnPanel(null, index);
          }
        }
      }
    }.bind(this));
  };

  //1
  var _Game_Actor_isEquipTypeLocked = Game_Actor.prototype.isEquipTypeLocked;
  Game_Actor.prototype.isEquipTypeLocked = function (etypeId) {
    if (etypeId == 1) {
      if ($gameMap.isABS()) {
        var timer = this._absParams.battleSkillsABS.all()[0].isReady();
        if (timer) {
          return _Game_Actor_isEquipTypeLocked.call(this, etypeId);
        } else {
          return true;
        }
      } else {
        return _Game_Actor_isEquipTypeLocked.call(this, etypeId);
      }
    } else {
      return _Game_Actor_isEquipTypeLocked.call(this, etypeId);
    }
  };


  Game_Actor.prototype._initBattleSkills = function () {
    Game_Battler.prototype._initBattleSkills.call(this);
    this._absParams.battleSkillsABS.push(this.attackSkillId(), false);
    this._absParams.needWeaponCheck = true;
  };

  Game_Actor.prototype.isPlayer = function () {
    return (this == $gamePlayer.battler());
  };

  //OVER
  Game_Actor.prototype.makeActions = function () {
    Game_Battler.prototype.makeActions.call(this);
    if (this.isConfused())
      this.makeConfusionActions();
    else
      this.makeAutoBattleActions();
  };

  //END Game_Actor
  //------------------------------------------------------------------------------

})();