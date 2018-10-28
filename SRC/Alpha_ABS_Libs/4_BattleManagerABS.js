/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleMangerABS.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
  var LOG = new PLATFORM.DevLog("BattleManagerABS");
  LOG.applyLibraryColors();

  window.__selected = null;

  function BattleManagerABS() {
    throw new Error('This is a static class');
  }

  AlphaABS.register(BattleManagerABS);

  var SMouse = AlphaABS.UTILS.SMouse;
  var Consts = AlphaABS.SYSTEM;
  var ABSUtils = AlphaABS.UTILS;

  BattleManagerABS.init = function () {
    BattleManagerABS.timer = new Game_TimerABS();
    BattleManagerABS._ready = false;
    BattleManagerABS._plTargets = [];
    BattleManagerABS.clearABS();
    BattleManagerABS._prepareResources();

    Input.loadSchemeABS();
    AlphaABS.LIBS.ABSPathfinding.init();
  };

  BattleManagerABS.clearABS = function () {
    this._isABSMap = false;
    this._absMapId = -1;
  };

  BattleManagerABS._prepareResources = function () {};


  BattleManagerABS.connectProcess = function () {
    this._process = new AlphaABS.LIBS.Game_BattleProcessABS();
  };

  BattleManagerABS.battleProcess = function () {
    return this._process;
  };

  BattleManagerABS.onMapLoaded = function () {
    if (this._isABSMap && $gameMap.isABS()) { //Если переход между АБС картами, то не делаем StopABS, а только prepare Заного
      if (this._absMapId != $gameMap.mapId()) {
        $gameTroop.deactivateABS();
        $gameTroop.initABS(); //Need restart
        this._absMapId = $gameMap.mapId();
      }
      BattleManagerABS.updateABSSession();
      LOG.p("Manager : Go to ABS map from ABS map, Prepare new ABS session");
      return;
    }

    if (this._isABSMap && !$gameMap.isABS()) { //Если переход от AБС карты на обычную, то надо всё остановить
      BattleManagerABS.stopABS();
      LOG.p("Manager : Go to map from ABS map, stop ABS session");
      try {
        $gamePlayer.followers().initialize();
        $gamePlayer.followers().refresh();
        if(SceneManager._scene instanceof Scene_Map)
          SceneManager._scene._spriteset.refreshAfterABS();
        $gamePlayer.followers().synchronize($gamePlayer.x, $gamePlayer.y, $gamePlayer.direction());
      } catch (error) {
        console.error(error);
      }
      return;
    }

    if (!this._isABSMap && $gameMap.isABS()) {
      BattleManagerABS.initABS();
      LOG.p("Manager : Go to ABS map from map, start new ABS session");
    }
  };

  BattleManagerABS.updateABSSession = function () {
    if (!AlphaABS.isABS()) return;
    if ($gamePlayer.battler() != $gameParty.leader())
      $gamePlayer.initABS();
    $gamePlayer.prepareABS();
    AlphaABS.BattleUI.initNewSession();
  };

  BattleManagerABS.stopABS = function () {
    LOG.p("Manager : ABS Map destroy");
    BattleManagerABS.clearABS();
    $gameTroop.deactivateABS();
    SMouse.setTrack(false);
    $gamePlayer.stopABS();
    SlowUpdateManager.clearAll();
  };

  BattleManagerABS.initABS = function () {
    $gamePlayer.initABS();
    $gameTroop.initABS();
    $gameParty.initABS();
    this.timer.start(BattleManagerABS.TURN);
    this._ready = true;
    SMouse.setTrack(true);

    AlphaABS.BattleUI.initNewSession();

    $gamePlayer.prepareABS();

    LOG.p("Manager : ABS Map loaded");
    this._isABSMap = true;
    this._absMapId = $gameMap.mapId();
  };

  BattleManagerABS.setPlayerTarget = function (target) {
    window.__selected = target;
    try {
      if (target && target.inActive()) {
        $gamePlayer.setTarget(target);
        $gameTroop.selectOnMap(target);
        $gameParty.selectOnMap(target);
        AlphaABS.BattleUI.showTarget(target);
      } else {
        $gamePlayer.setTarget(null);
        $gameTroop.selectOnMap(null);
        $gameParty.selectOnMap(null);
        AlphaABS.BattleUI.showTarget(null);
      }
    } catch (e) {
      console.error(e);
      AlphaABS.BattleUI.showTarget(null);
    }
  };

  BattleManagerABS.getPlayerTarget = function () {
    return $gamePlayer.target();
  };

  BattleManagerABS.updateABS = function () {
    if (!this._ready) return;
    this.timer.update();
    if (this.timer.isReady()) {
      this.timer.reset();
      $gamePlayer.onTurnEnd();
      $gameTroop.onTurnEnd();
    }
  };

  BattleManagerABS.alertNoInBattle = function () {
    BattleManagerABS.alertOnUI(AlphaABS.SYSTEM.STRING_ALERT_NOINBATTLE);
  };

  BattleManagerABS.alertOnUI = function (string) {
    AlphaABS.BattleUI.alert(string);
  };

  BattleManagerABS.playSe = function (se, point) {
    if (BattleManagerABS.isABSAudio()) {
      AudioManager.playSeAt(se, point);
    } else {
      AudioManager.playSe(se);
    }
  };

  BattleManagerABS.isABSAudio = function () {
    return AlphaABS.SYSTEM.EXTENSIONS.AUDIO;
  };

  BattleManagerABS.isABSParticleSystem = function () {
    return (AlphaABS.SYSTEM.EXTENSIONS.ABSPE !== undefined) && (AlphaABS.SYSTEM.EXTENSIONS.ABSPE != false);
  };

  BattleManagerABS.isABSLightingExt = function () {
    return AlphaABS.SYSTEM.EXTENSIONS.LIGHT;
  };

  BattleManagerABS.alertOnUIbySym = function (alertSymbol) {
    switch (alertSymbol) {
      case 'noUse':
        BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NOUSE);
        break;
      case 'toFar':
        BattleManagerABS.alertOnUI(Consts.STRING_ALERT_TOFAR);
        break;
      case 'noTarget':
        BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NEEDTARGET);
        break;
      case 'noAmmo':
        BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NOCHARGES);
        break;
      case 'recharge':
        BattleManagerABS.alertOnUI(Consts.STRING_ALERT_RECHARGE);
        break;
    }
  };

  BattleManagerABS.nextPlayerTarget = function () {
    try {
      var t = ABSUtils.inRadius($gamePlayer, 12, $gameTroop.membersABS());
      if (t.count() == 0) {
        return null;
      }

      var tt = this._plTargets;
      var t2 = t.filter(function (i) {
        return tt.indexOf(i) < 0;
      });

      if (t2.count() == 0) {
        this._plTargets = [];
        return this.nextPlayerTarget();
      } else {
        this._plTargets.push(t2.first());
      }
      return t2.first();
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  //HELPERS
  BattleManagerABS.canUseSkillByTimer = function (skill) {
    return skill ? skill.isReady() : false;
  };

  BattleManagerABS.playerABSSkillById = function (skillId) {
    return $gamePlayer.battler().skillABS_byId(skillId);
  };

  BattleManagerABS.canUseSkillByTarget = function (who, target, skill) {
    try {
      if (!skill) return false;
      if (skill.isRadiusType()) return true;
      if (skill.isNeedTarget()) {
        if (target)
          return true;
        else
          return false;

      } else
        return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  BattleManagerABS.checkLineOfSight = function (point1, point2) {
    try {
      var line = AlphaABS.UTILS.createLineBetweenPoints(point1, point2);
      for (var i = 0; i < line.length; i++) {
        if (BattleManagerABS.checkMapZone(line[i]) == false)
          return false;
      }
      return true;
    } catch (e) {
      console.error(e);
      return true;
    }
  };

  BattleManagerABS.checkMapZone = function (point) {
    try {
      if (AlphaABS.Parameters.isLoaded()) {
        var regionId = $gameMap.regionId(point.x, point.y);
        var zones = AlphaABS.Parameters.get_MapSolidRegions();
        if (zones.includes(regionId))
          return false;
      }
      return true;
    } catch (e) {
      console.error(e);
      return true;
    }
  };

  BattleManagerABS.canUseSkillByRange = function (who, target, skill) {
    try {
      var byRange = BattleManagerABS.checkSkillRange(who, target, skill);
      if (byRange == true) {
        if (skill.range == 0 || target == null || who == null || skill.isIgnoreObstacles())
          return true;
        else {
          if (ABSUtils.inFront(who, target)) {
            return true;
          }
          var isLineOfSight = BattleManagerABS.checkLineOfSight(who.toPoint(), target.toPoint());
          return isLineOfSight;
        }
      } else
        return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  BattleManagerABS.checkSkillRange = function (who, target, skill) {
    try {
      if (!skill) return false;
      if (skill.isZoneType()) return true;
      if (skill.isRadiusType()) return true;
      if (skill.range == 0 && !skill.isNeedTarget()) return true;
      if (skill.range == 0) {
        return ABSUtils.inFront(who, target);
      } else {
        var t = ABSUtils.distanceTo(who, target);
        if (skill.range >= t) {
          if (skill.isDirectionFix()) {
            LOG.p("SPELL: Dirction FIXed");
            return ABSUtils.inDirectionHard(who, target);
          } else
            return true;
        } else
          return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  BattleManagerABS.canUseSkillByAmmo = function (skill) {
    try {
      if(skill.isFirearm()) {
        return !skill.isNeedReloadStack();
      }
      if(skill.isNeedAmmo()) {
        return $gameParty.numItems($dataItems[skill.ammo]) > 0;
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  BattleManagerABS.canUseABSSkillNow = function (who, target, skill) {
    try {
      if (!skill) return false;
      if(skill.isNoTarget()) {
        return this.canUseSkillByTimer(skill) && this.canUseSkillByAmmo(skill);
      }
      return this.canUseSkillByTarget(who, target, skill) &&
        this.canUseSkillByRange(who, target, skill) &&
        this.canUseSkillByTimer(skill) && this.canUseSkillByAmmo(skill);
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  BattleManagerABS.canUseABSSkillUI = function (skill) {
    try {
      if (!$gamePlayer.inActive()) return false;
      var t = $gamePlayer.battler();
      return t.canUse(skill.skill()) &&
        this.canUseABSSkillNow($gamePlayer, $gamePlayer.target(), skill) && t.canMove();
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  BattleManagerABS.whoTargetOnMe = function (me, members) {
    var x = members.filter(function (t) {
      return (t.target() == me);
    });
    return x.first();
  };

  BattleManagerABS.isValidTarget = function (target) {
    try {
      return target && target.inActive() && (target.battler().tgr != 0);
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  BattleManagerABS.warning = function (index) {
    switch (index) {
      case 1:
        LOGW.p(Consts.STRING_WARNING_COMMON2);
        break;
      case 2:
        LOGW.p(Consts.STRING_WARNING_COMMON3);
        break;
      case 129:
        LOGW.p(Consts.STRING_WARNING_COMMAND129);
        break;
      case 321:
        LOGW.p(Consts.STRING_WARNING_COMMAND321);
        break;
      default:
        LOGW.p(Consts.STRING_WARNING_COMMON);
        break;
    }
  };

  BattleManagerABS.getAllBotsOnMap = function () {
    if (AlphaABS.isABS()) {
      var all = $gameTroop.membersABS().concat($gameParty.membersABS());
      return all;
    } else
      return [];
  };

  SDK.setConstant(BattleManagerABS, 'TURN', AlphaABS.SYSTEM.FRAMES_PER_SECOND);
  AlphaABS.BattleManagerABS = BattleManagerABS;
  AlphaABS.register(BattleManagerABS);
})();

// ■ END BattleMangerABS.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////