(function () {
  var LOG = new PLATFORM.DevLog("Game_Map");
  //Game_Map
  //------------------------------------------------------------------------------
  var _Game_Map_setupEvents = Game_Map.prototype.setupEvents;
  Game_Map.prototype.setupEvents = function () {
    _Game_Map_setupEvents.call(this);
    AlphaABS.ABSPathfinding.init();
    AlphaABS.ABSPathfinding.setup();
    this._isABSMap = false;
    if (!$dataMap.meta) return;
    if ($dataMap.meta.ABS) {
      this._isABSMap = true;
      this._absParams = {};
      this._absParams.sVectors = [];
      this._absParams.animationABS = null;
      this._absParams.targetCircle = null;
      this._absParams.targetCircleNeedLock = false;
      this._absParams.needCast = null;
      this._absParams.menuClickCount = 1;
      this.setupEventsABS();
    }
  };

  //NEW
  Game_Map.prototype.ABSParams = function () {
    return this._absParams;
  };

  //NEW
  Game_Map.prototype.isABS = function () {
    return this._isABSMap;
  };

  //NEW
  Game_Map.prototype.stopABS = function () {
    this._isABSMap = false;
  };

  //NEW
  Game_Map.prototype.characterABS = function (battler) {
    //TODO:Возвращает Game_AIBot по battler
  };

  //NEW
  Game_Map.prototype.addSVector = function (item) {
    this._absParams.sVectors.push(item);
  };

  //NEW
  Game_Map.prototype.requestCast = function (who) {
    LOG.p("Map : Cast requested");
    this._absParams.needCast = who;
  };

  //NEW
  Game_Map.prototype.requestAnimationABS = function (animationData) { //{sprite, id}
    LOG.p("Map : Animation requested");
    this._absParams.animationABS = animationData;
  };

  //NEW
  Game_Map.prototype.requestPlayerTargetCircle = function (skill) {
    LOG.p("Map : Target Circle requested");
    this._absParams.menuClickCount = 0;
    this._absParams.targetCircle = skill;
  };

  //NEW
  Game_Map.prototype.lockPlayerTargetCircle = function () {
    LOG.p("Map : Target Circle locked");
    this._absParams.targetCircleNeedLock = true;
  };

  //NEW
  Game_Map.prototype.stopPlayerTargetCircle = function () {
    LOG.p("Map : Target Circle stop!");
    this._absParams.targetCircle = null;
    this._absParams.targetCircleNeedLock = false;
  };

  //NEW
  Game_Map.prototype.setupEventsABS = function () {
    LOG.p("setupEventsABS");
    for (var i = 0; i < this._events.length; i++) {
      if (!this._events[i]) continue;
      this.addABSEvent(i);
    }
    $gamePlayer.followers().initializeABS();
  };

  //?[NEW]
  Game_Map.prototype.addABSEvent = function (id) {
    var ev = this._events[id].event();
    var enemyId = this._getABSEnemyId(ev);
    if (enemyId > 0) {
      this._events[id] = new Game_AIBot(this._mapId, id, enemyId);
    }
  };

  Game_Map.prototype._getABSEnemyId = function (event) {
    try {
      if (event.meta.ABS) {
        var enemyId = parseInt(event.meta.ABS);
        if (enemyId > 0) {
          return enemyId;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return 0;
  };

  //?[NEW]
  Game_Map.prototype.spawnABSBot = function (id, x, y) {
    try {
      var event = $dataSpawnMapAI.events[id];
      if (event) {
        DataManager.extractMetadata(event);
        var enemyId = this._getABSEnemyId(event);
        if (enemyId > 0) {
          var eId = this._events.length;
          var newAi = new Game_SpawnedAiBot(this._mapId, eId, enemyId, x, y, id);
          this._events.push(newAi);
          newAi.initABS();
          $gameTroop.setup();
          SceneManager._scene._spriteset.createSpawnEventABS(eId);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  //?[NEW]
  Game_Map.prototype.getRandomSpawnPointOnRegionABS = function (regionId) {
    var possiblePoints = [];
    for (var x = 0; x < this.width(); x++) {
      for (var y = 0; y < this.height(); y++) {
        if (this.regionId(x, y) == regionId) {
          if (this.canSpawnABSOn(x, y))
            possiblePoints.push(new AlphaABS.UTILS.PointX(x, y));
        }
      }
    }
    if (possiblePoints.length > 0)
      return possiblePoints.sample();
    return null;
  };

  Game_Map.prototype.canSpawnABSOn = function (x, y) {
    if (this.eventsXy(x, y).length > 0) return false;
    if ($gamePlayer.x == x && $gamePlayer.y == y) return false;
    if (Game_CharacterBase.prototype.isCollidedWithVehicles(x, y)) return false;
    return this.isPassable(x, y);
  };



  //END Game_Map
  //------------------------------------------------------------------------------
})();