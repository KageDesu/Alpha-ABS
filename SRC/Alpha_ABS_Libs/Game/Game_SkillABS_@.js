/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_SkillABS_@.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//@[GLOBAL DEFINITION]
function Game_SkillABS() {
  this.initialize.apply(this, arguments);
}

(function () {
  var Consts = AlphaABS.SYSTEM;
  var LOG = new PLATFORM.DevLog("Game_SkillABS");

  //@[CLASS HEADER PART]

  Game_SkillABS.prototype.initialize = function (skillId, isItem) {
    this.skillId = skillId;
    this._isItem = SDK.check(isItem, false);
    this.timer = new Game_TimerABS();
    this.timer.start(0);

    var metaCode = this.skill().meta.ABS;
    if (metaCode) {
      this.type = parseInt(metaCode);
    } else {
      this.type = 0;
      this._hasError = true;
      LOGW.p("Warning! ABS Skill has no type! " + this.skill().name);
    }

    ABSSkillLoader.loadBaseParams(this);
    ABSSkillLoader.loadUserParams(this);
    ABSSkillLoader.loadSelfMetaParams(this);
    this._checkParams();
  };

  // * Расчитать формулу можно только на Battler
  Game_SkillABS.prototype.getCastTime = function (caster) {
    if (this.castTimeFormula == null)
      return this.castTime;
    else {
      try {
        /* jshint -W061 */
        if (caster && caster instanceof Game_Battler) {
          var time = caster._calculateABSSkillReloadParam(this.castTimeFormula);
          return time;
        }
      } catch(error) {
        AlphaABS.error(error,' info');
      }
      return 120;
    }
  };

  Game_SkillABS.prototype.update = function () {
    this.timer.update();
  };

  Game_SkillABS.prototype.preUse = function (param) {
    this.reloadTimeA = param + this.reloadTime;
  };

  Game_SkillABS.prototype.playStartSound = function (point) {
    if (this.startSound) {
      if (point != null && AlphaABS.LIBS.BattleManagerABS && AlphaABS.LIBS.BattleManagerABS.isABSAudio())
        AudioManager.playSeAt(this.startSound, point);
      else
        AudioManager.playSe(this.startSound);
    }
  };

  Game_SkillABS.prototype.startCast = function (caster) {
    this._castDelay = 0;
    this._startCast = true;
    this.timer.start(this.getCastTime(caster));
  };

  Game_SkillABS.prototype.onCastDelay = function (delay) {
    this._castDelay += delay;
    this.timer.setMaxTime(this.getCastTime() + this._castDelay);
  };

  Game_SkillABS.prototype.resetCast = function () {
    this._startCast = false;
    this.timer.start(0);
  };

  Game_SkillABS.prototype.loadExternal = function (params, type) {
    if (type !== undefined) {
      this.type = type;
      var t = this.reloadParam;
      ABSSkillLoader.loadBaseParams(this);
      this.reloadParam = t;
    }
    this.castTime = 0;
    ABSSkillLoader.loadMetaParams(this, params);
    this._checkParams();
    if (this.castTime > 0 || this.castTimeFormula != null) {
      this.castTime = 0;
      this.castTimeFormula = null;
      LOGW.p(Consts.STRING_WARNING_SKILLWC);
    }
    if (this.isVectorTypeR()) {
      LOGW.p(Consts.STRING_WARNING_SKILLWVR);
      this.radius = 0;
      this.needTarget = true;
    }
    LOG.p("Skill " + this.name() + " loaded external params");
  };

  Game_SkillABS.prototype.chargeStack = function (size) {
    if (size === undefined) {
      this._currentStack = this.stack;
      return 0;
    } else {

      if (this._currentStack === undefined) {
        this._currentStack = 0;
      }

      var d = 0;

      if (size > 0) {
        var n = Math.abs(this._currentStack - this.stack);
        d = size - n;
        if (d < 0) {
          this._currentStack = this.stack - Math.abs(d);
        } else {
          this._currentStack = this.stack;
          return d;
        }
      } else {
        this._currentStack -= Math.abs(size);
      }


      LOG.p("Skill: Current stack " + this._currentStack);
      if (this._currentStack <= 0) {
        this._stackNeedReload = true;
        this._currentStack = 0;
        LOG.p("Skill: Stack need reload all");
      }
      if (d >= 0)
        return d; //Остаток
      else
        return 0;
    }
  };

  Game_SkillABS.prototype.reloadStack = function () {
    if (!this.isStackType()) return;
    this.resetCast();
    LOG.p("Stack reload manual " + this.skill().name + " reload time " + this.stackTime);
    this.timer.start(this.stackTime);
    this._stackNeedReload = false;
    //Don't need post use because stackTime > 0
  };

  Game_SkillABS.prototype.onUse = function () {
    if (this.isStackType()) {
      this._onUseStackType();
    } else
      this._onUseNormal();
  };

  Game_SkillABS.prototype._onUseStackType = function () {
    this.chargeStack(-1);
    if (this.isAutoReloadStack() && this.isNeedReloadStack()) {
      LOG.p("Skill: Reload stack auto");
      this.preUse(this.stackTime);
      this._stackNeedReload = false;
      this._currentStack = this.stack;
    }
    this._onUseNormal();

    if (this.isAutoReloadStack() && !this.isNeedReloadStack()) {
      this.preUse(0);
    }
  };

  Game_SkillABS.prototype._onUseNormal = function () {
    this.resetCast();
    LOG.p("On use " + this.skill().name + " reload time " + this.reloadTimeA);
    this.timer.start(this.reloadTimeA);

    if (this.isNeedAmmo()) {
      $gameParty.loseItem($dataItems[this.ammo], 1, true);
    }

    if (this.getCastTime() == 0 && this.reloadTimeA == 0) {
      LOG.p("Skill " + this.skill().name + " use PostUse");
      this.timer.start(60); //Post Use
    }
  };

  Game_SkillABS.prototype.postUse = function () { //Delay between skill activation (called when another skill is start)
    if (this.isReady() && this.skillId != 1) { //Attack not need postUse
      this.timer.start(60);
      LOG.p("Skill " + this.skill().name + " use PostUse");
    }
  };

  //PRIVATE

  Game_SkillABS.prototype._checkParams = function () {

    ABSSkillLoader.checkParams(this);

    if (this.stack == 1) {
      this.stack = 2;
      LOGW.p("Skill " + this.name() + " stack minimum 2!");
    }

    if (this.stackTime <= 0) {
      if (this.stack > 1) {
        this.stackTime = this.reloadTime * this.stack * 2;
        LOGW.p("Skill " + this.name() + " You use stack withou stackTime param, stackTime set automaticaly = " + this.stackTime);
      }
    }

    if (this.stackTime > 0) {
      if (this.stack == 0) {
        LOGW.p("Skill " + this.name() + " if you use stackTime param, you need stack param too, param not active!");
        this.stackTime = 0;
      } else {
        if (this.ammo > 0) { //ID of item
          this._currentStack = 0;
          this._stackNeedReload = true;
        } else {
          this._currentStack = this.stack;
          this._stackNeedReload = false;
        }
      }
    }

    if (this.reloadParam != null) {
      //If i can use 'with' keyword in strict mode, this is not happened :(
      if (!this.reloadParam.contains('this')) {
        if (this.reloadParam.trim() == 'attackSpeed') { //for performance
          this.reloadParam = this.reloadParam.replace(/attackSpeed/i, 'this.attackSpeed()');
        } else {
          this.reloadParam = ABSSkillLoader._convertFormula(this.reloadParam);
        }
      }
    }

    if (this.castTimeFormula != null) {
      if (!this.castTimeFormula.contains('this')) {
        this.castTimeFormula = ABSSkillLoader._convertFormula(this.castTimeFormula);
      }
    }

    this.reloadTimeA = this.reloadTime;
  };

})();
// ■ END Game_SkillABS_@.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////