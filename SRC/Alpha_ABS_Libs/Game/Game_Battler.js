(function () {

  var PopInfoManagerABS;
  var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;

  var _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function () {
    _Game_Battler_initMembers.call(this);
    PopInfoManagerABS = AlphaABS.LIBS.PopInfoManagerABS;
    this._initBattleSkills();
  };

  var _GameBattler_attackSpeed = Game_Battler.prototype.attackSpeed;
  Game_Battler.prototype.attackSpeed = function () {
    var attackSpeed = _GameBattler_attackSpeed.call(this);
    if (attackSpeed == 0) {
      return 120;
    } else
      return attackSpeed;
  };

  //NEW
  Game_Battler.prototype.initABS = function () {
    this.appear();
    if (!this.isPreserveTp()) {
      this.initTp();
    }
    this._absParams.battleSkillsABS.all().forEach(function (item) {
      this._prepareABSSkill(item);
    }.bind(this));
  };

  //NEW
  Game_Battler.prototype.onGameLoad = function () {
    //EMPTY
  };

  //NEW
  Game_Battler.prototype.updateABS = function () {
    this._absParams.battleSkillsABS.update();
    this.updateStateTurns();
    this.updateBuffTurns();
    this.removeStatesAuto(2);
    this.removeBuffsAuto();
  };

  //OVER
  Game_Battler.prototype.onTurnEnd = function () {
    this.regenerateAll();
  };

  var pkd_GameBattler_regenerateAll = Game_Battler.prototype.regenerateAll;
  Game_Battler.prototype.regenerateAll = function () {
    this.clearResult();
    pkd_GameBattler_regenerateAll.call(this);
    if (this.isAlive()) {
      if(this.hp < this.mhp || this.mp < this.mmp)
        PopInfoManagerABS.makeDamagePopUp(this);
    }
  };

  //OVER
  Game_Battler.prototype.onAllActionsEnd = function () {
    this.clearResult();
    this.removeStatesAuto(1);
  };

  //OVER
  Game_Battler.prototype.onBattleEnd = function () {
    this.onAllActionsEnd();
    this.clearActions();
    if (!this.isPreserveTp()) {
      this.clearTp();
    }
  };

  //OVER
  Game_Battler.prototype.resetStateCounts = function (stateId) {
    var state = $dataStates[stateId];
    var variance = 0;
    if (state.autoRemovalTiming != 1) {
      //For now, turns calcs in a seconds
      variance += Math.max(state.maxTurns - state.minTurns, 0);
      this._stateTurns[stateId] = (state.minTurns + Math.randomInt(1 + variance)) * BattleManagerABS.TURN;
    } else {
      this._stateTurns[stateId] = 1; //TODO: After Action
    }
  };

  //OVER
  Game_Battler.prototype.overwriteBuffTurns = function (paramId, turns) {
    var t = turns * BattleManagerABS.TURN;
    if (this._buffTurns[paramId] < t) {
      this._buffTurns[paramId] = t;
    }
  };

  //NEW
  Game_Battler.prototype.stopABS = function () {
    this.onBattleEnd();
    this.removeBattleStates();
    this.removeAllBuffs();
  };

  //NEW
  Game_Battler.prototype.skillABS_byId = function (skillId, isItem) {
    isItem = SDK.check(isItem, false);
    if (isItem) {
      return this._absParams.battleSkillsABS.itemById(skillId);
    } else {
      return this._absParams.battleSkillsABS.skillById(skillId);
    }
  };

  //NEW
  Game_Battler.prototype.skillABS_byAction = function (action) {
    if (action.item())
      return this.skillABS_byId(action.item().id, action.isItem());
    else
      return null;
  };

  //NEW
  Game_Battler.prototype.skillABS_attack = function () {
    return this.skillABS_byId(this.attackSkillId(), false);
  };

  Game_Battler.prototype.performCurrentAction = function () {
    var action = this.action(0);
    var skill = this.skillABS_byAction(action);
    if (skill.isNeedReloadParam()) {
      skill.preUse(this._calculateABSSkillReloadParam(skill.reloadParam));
    }
    this.useItem(action.item());
    skill.onUse();
    if (skill.skillId != this.attackSkillId() && !skill.isNeedCast()) {
      //Атака не вызывает postUse
      //Навык, который необходимо кастовать, тоже не вызывает postUse
      this._absParams.battleSkillsABS.all().forEach(function (skill) {
        skill.postUse();
      });
    }

    this.removeStatesAuto(1);
    this.removeBuffsAuto();
  };

  Game_Battler.prototype._calculateABSSkillReloadParam = function (reloadParam) {
    var reloadVar = 10;
    try {
      /* jshint -W061 */
      reloadVar = Math.round(parseInt(eval(reloadParam)));
    } catch (err) {
      AlphaABS.error(err, "Can't calculate <reloadParam>");
      reloadVar = 10;
    }
    return reloadVar;
  };

  var _Game_Battler_onDamage = Game_Battler.prototype.onDamage;
  Game_Battler.prototype.onDamage = function (value) {
    _Game_Battler_onDamage.call(this, value);
    this._absParams.battleSkillsABS.all().forEach(function (s) {
      if (s.isCasting()) {
        s.onCastDelay(30); //TODO:: Подучать как лучше (в %), сколько урон от макс.HP в процентах, столько и в процентах от castMaxTime (начиная с порога)
      }
    });
  };

  //NEW
  Game_Battler.prototype._prepareABSSkill = function (absSkill) {
    //EMPTY
  };

  //OVER
  Game_Battler.prototype.onBattleStart = function () {
    //EMPTY
  };

  //OVER
  Game_Battler.prototype.addNewState = function (stateId) {
    Game_BattlerBase.prototype.addNewState.call(this, stateId);
    if (this._states.include(stateId)) {
      PopInfoManagerABS.makeStatePopUp(this, stateId, false);
      if(AlphaABS.isABS())
        this._checkStateCommonEvent(stateId);
    }
  };

  //?[NEW]
  Game_Battler.prototype._checkStateCommonEvent = function (stateId) {
    try {
      var state = $dataStates[stateId];
      if (state) {
        if (state.meta.cEonStart > 0) {
          if (this.isPlayer()) {
            $gamePlayer.startCommonEventABS(state.meta.cEonStart);
          } else {
            this._startCommonEventOnAI(state.meta.cEonStart);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  //?[NEW]
  Game_Battler.prototype._startCommonEventOnAI = function (commonEventId) {
    var all = BattleManagerABS.getAllBotsOnMap();
    for (var i = 0; i < all.length; i++) {
      var bot = all[i];
      if (bot.battler() == this) {
        "BOT FINDED ".p(bot.name());
        bot.startCommonEvent(commonEventId);
        break;
      }
    }
  };

  var pkd_GameBattler_addBuff = Game_Battler.prototype.addBuff;
  Game_Battler.prototype.addBuff = function (paramId, turns) {
    PopInfoManagerABS.makeBuffPopUp(this, paramId, true);
    pkd_GameBattler_addBuff.call(this, paramId, turns);
  };

  var pkd_GameBattler_addDebuff = Game_Battler.prototype.addDebuff;
  Game_Battler.prototype.addDebuff = function (paramId, turns) {
    PopInfoManagerABS.makeBuffPopUp(this, paramId, false);
    pkd_GameBattler_addDebuff.call(this, paramId, turns);
  };

  Game_Battler.prototype._initBattleSkills = function () {
    this._absParams.battleSkillsABS = new Game_SkillManagerABS();
  };
})();