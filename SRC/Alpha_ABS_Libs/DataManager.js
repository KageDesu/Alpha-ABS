(function () {
  //DataManager
  //------------------------------------------------------------------------------
var _alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
   if ($gameMap.isABS()) {
     var allABSAI = $gameTroop.membersABS().concat($gameParty.membersABS());
     allABSAI.forEach(function (item) {
        item.onGameSave();
     });
   }
   return _alias_DataManager_makeSaveContents.call(this);
};

  var _DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    _DataManager_extractSaveContents.call(this, contents);
    if ($gameMap.isABS()) {
      var t = $gameMap.events();
      t.forEach(function (ev) {
        if (ev instanceof Game_AIBot) {
          ev.onGameLoad();
        }
      });
      $gameParty.membersABS().forEach(function (item) {
        item.onGameLoad();
      });
      $gamePlayer.onGameLoad();
      if ($gameVariables._absUserKeys)
        AlphaABS.LIBS.IKey.loadKeyConfig($gameVariables._absUserKeys);
    }
  };

  var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function () {
    if (_DataManager_isDatabaseLoaded.call(this) == true) {
      if (!$dataSkills[1].meta.ABS) {
        throw new Error(AlphaABS.SYSTEM.STRING_ERROR_SKILLNAN);
      }
      if (DataManager._isOldRPGVersion()) {
        LOGW.p(AlphaABS.SYSTEM.STRING_ERROR_OLDDATA);
      }
      return true;
    } else
      return false;
  };

  DataManager._isOldRPGVersion = function () {
    if (Utils.RPGMAKER_VERSION) {
      var numbers = Utils.RPGMAKER_VERSION.split('.');
      return (numbers[1] < 6);
    } else {
      return true;
    }
  };

  //?[NEW]
  DataManager.loadAISpawnMap = function() {
    var mapId = AlphaABS.Parameters.get_SpawnMapId();
    if (mapId > 0) {
      var filename = 'Map%1.json'.format(mapId.padZero(3));
      this.loadDataFile('$dataSpawnMapAI', filename);
    } 
  };

  DataManager.loadAISpawnMap();

  //END DataManager
  //------------------------------------------------------------------------------

})();