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
    if(this.img != 0 && this.img != null && this.img != 'null') {
      try {
        ImageManager.loadPicture(this.img);
      } catch (error) {
        AlphaABS.error(error, ' load ABS skill <IMG> parameter');
      }
    }
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
      } catch (error) {
        AlphaABS.error(error, ' info');
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
    this._playSoundAt(this.startSound, point);
  };

  Game_SkillABS.prototype.playReloadSound = function (point) {
    this._playSoundAt(this.reloadSound, point);
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

  Game_SkillABS.prototype.reloadFirearm = function (count) {
    if (!this.isFirearm()) return;
    this._currentStack = count;
    if (this._currentStack > 0) {
      this.resetCast();
      LOG.p("Firearm reload " + this.skill().name + " reload time " + this.stackTime);
      this.timer.start(this.stackTime);
      this.playReloadSound();
      this._stackNeedReload = false;
    } else {
      this._stackNeedReload = true;
    }
    if(this._currentStack == null)
      this._currentStack = 0;
  };

  Game_SkillABS.prototype.onUse = function () {
    if (this.isFirearm()) {
      this._onUseFirearm();
    } else if (this.isStackType()) {
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

    if (this.isNeedAmmo() && !this.isFirearm()) {
      $gameParty.loseItem($dataItems[this.ammo], 1, true);
    }

    if (this.getCastTime() == 0 && this.reloadTimeA == 0) {
      LOG.p("Skill " + this.skill().name + " use PostUse");
      this.timer.start(20); //Post Use
    }
  };

  Game_SkillABS.prototype.postUse = function () { //Delay between skill activation (called when another skill is start)
    if (this.isReady() && this.skillId != 1) { //Attack not need postUse
      this.timer.start(20);
      LOG.p("Skill " + this.skill().name + " use PostUse");
    }
  };

  //PRIVATE

  Game_SkillABS.prototype._checkParams = function () {

    ABSSkillLoader.checkParams(this);

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