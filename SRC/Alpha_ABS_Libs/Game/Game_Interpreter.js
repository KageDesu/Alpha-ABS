(function () {
  //Game_Interpreter
  //------------------------------------------------------------------------------
  //OVER
  Game_Interpreter.prototype.character = function (param) {
    if (param < 0) {
      return $gamePlayer;
    } else if (this.isOnCurrentMap()) {
      return $gameMap.event(param > 0 ? param : this._eventId);
    } else {
      return null;
    }
  };

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'ABS') {
      switch (args[0]) {
        case 'revive':
          var revive = 5;
          if (args[1])
            revive = parseInt(args[1]);
          if (args[2]) {
            var x = $gameMap.events().filter(function (ev) {
              return (ev.event().name == args[2]);
            });
            if (x.length > 0) {
              x.first().setRevive(revive);
            }
          } else
            this.character(this._eventId).setRevive(revive);
          break;
        case 'loot':
          this.character(this._eventId).loot();
          break;
        case 'showUI':
          AlphaABS.BattleUI.showUI();
          break;
        case 'hideUI':
          AlphaABS.BattleUI.hideUI();
          break;
        case 'activate':
          this._activateABSEnemy(args[1] || null);
          break;
        case 'deactivate':
          this._deactivateABSEnemy(args[1] || null);
          break;
        case 'param':
          this._onABSEnemyParam(args[1] || null, args[2] || null, args[3] || null);
          break;
        case 'spawn': //spawn EventId (x y | regionId)
          if (AlphaABS.Parameters.get_SpawnMapId() > 0)
            this._onABSSpawn(args[1], args[2], args[3] || null);
          break;

      }
    }
  };

  //NEW
  Game_Interpreter.prototype._activateABSEnemy = function (name) {
    var enemy = this._getAbsAI(name);
    if (enemy)
      enemy.activate();
  };

  //NEW
  Game_Interpreter.prototype._getAbsAI = function (name) {
    if (name == null) {
      try {
        name = $dataMap.events[this.eventId()].name;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
    if (name) {
      var x = $gameMap.events().filter(function (ev) {
        return (ev.event().name == name);
      });
      if (x.length > 0) {
        return x.first();
      }
    }
    return null;
  };

  //NEW
  Game_Interpreter.prototype._deactivateABSEnemy = function (name) {
    var enemy = this._getAbsAI(name);
    if (enemy)
      enemy.deactivate();
  };

  //NEW
  Game_Interpreter.prototype._onABSEnemyParam = function (paramName, paramValue, aiEventName) {
     if (!paramName) return;
     if (!paramValue) {
       paramValue = 0;
     }
     var event = this._getAbsAI(aiEventName);
     if (event == null) {
       event = $dataMap.events[this.eventId()];
     }
     if(event instanceof Game_AIBot) {
       var index = AlphaABS.LIBS.Game_AIBehavior.PARAMS.indexOf(paramName);
       if(index >= 0) {
         event.behaviorModel()[paramName] = paramValue;
         event.LOG.p("New value " + paramValue + " of " + paramName);
         if(event.inBattle())
            event.refreshBehavior();
       }
     }
  };

  //?[NEW]
  Game_Interpreter.prototype._onABSSpawn = function (eventId, xOrRegion, y) {
     if(!AlphaABS.isABS()) return;
     try {
          if (y == null) {
            var point = $gameMap.getRandomSpawnPointOnRegionABS(xOrRegion);
            if(point) {
              $gameMap.spawnABSBot(eventId, point.x, point.y);
            }
          } else {
            var x = Number(xOrRegion);
            var y2 = Number(y);
            if ($gameMap.canSpawnABSOn(x, y2)) {
              $gameMap.spawnABSBot(eventId, x, y2);
            }
          }
     } catch (e) {
      console.error(e);
     }
  };

  // Change Party Member

  var _Game_Interpreter_command129 = Game_Interpreter.prototype.command129;
  Game_Interpreter.prototype.command129 = function () {
    if ($gameMap.isABS()) {
      if (_Game_Interpreter_command129.call(this)) {
        AlphaABS.BattleManagerABS.updateABSSession();
        return true;
      }
    }
    return _Game_Interpreter_command129.call(this);
  };

  // Transfer Player
  var _Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
  Game_Interpreter.prototype.command201 = function () {
    if (AlphaABS.Parameters.get_AllowTransferState() == true) {
      if(AlphaABS.isABS())
        $gamePlayer.stopABS();
      return _Game_Interpreter_command201.call(this);
    } else {
      if ($gameParty.inBattle()) {
        AlphaABS.BattleManagerABS.alertNoInBattle();
        AlphaABS.BattleManagerABS.warning(1);
        return true;
      } else {
        return _Game_Interpreter_command201.call(this);
      }
    }
  };

  // Scroll Map
  var _Game_Interpreter_command204 = Game_Interpreter.prototype.command204;
  Game_Interpreter.prototype.command204 = function () {
    if ($gameParty.inBattle()) {
      AlphaABS.BattleManagerABS.alertNoInBattle();
      AlphaABS.BattleManagerABS.warning(1);
      return true;
    }
    return _Game_Interpreter_command204.call(this);
  };

  // Getting On and Off Vehicles
  var _Game_Interpreter_command206 = Game_Interpreter.prototype.command206;
  Game_Interpreter.prototype.command206 = function () {
    if ($gameMap.isABS()) {
      AlphaABS.BattleManagerABS.warning(0);
      return true;
    } else
      return _Game_Interpreter_command206.call(this);
  };

  // Change Player Followers
  var _Game_Interpreter_command216 = Game_Interpreter.prototype.command216;
  Game_Interpreter.prototype.command216 = function () {
    if ($gameMap.isABS()) {
      AlphaABS.BattleManagerABS.warning(0);
      return true;
    }
    return _Game_Interpreter_command216.call(this);
  };

  // Gather Followers
  var _Game_Interpreter_command217 = Game_Interpreter.prototype.command217;
  Game_Interpreter.prototype.command217 = function () {
    if ($gameMap.isABS()) {
      AlphaABS.BattleManagerABS.warning(0);
      return true;
    }
    return _Game_Interpreter_command217.call(this);
  };

  // Set Weather Effect
  //OVER
  Game_Interpreter.prototype.command236 = function () {
    //if (!$gameParty.inBattle()) {
    $gameScreen.changeWeather(this._params[0], this._params[1], this._params[2]);
    if (this._params[3] && !$gameParty.inBattle()) {
      this.wait(this._params[2]);
    }
    //}
    return true;
  };

  // Battle Processing
  //OVER
  Game_Interpreter.prototype.command301 = function () {
    //EMPTY
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  // Shop Processing
  var _Game_Interpreter_command302 = Game_Interpreter.prototype.command302;
  Game_Interpreter.prototype.command302 = function () {
    if ($gameParty.inBattle()) {
      AlphaABS.BattleManagerABS.alertNoInBattle();
      AlphaABS.BattleManagerABS.warning(1);
      return true;
    } else
      return _Game_Interpreter_command302.call(this);
  };

  // Name Input Processing
  var _Game_Interpreter_command303 = Game_Interpreter.prototype.command303;
  Game_Interpreter.prototype.command303 = function () {
    if ($gameParty.inBattle()) {
      AlphaABS.BattleManagerABS.alertNoInBattle();
      AlphaABS.BattleManagerABS.warning(1);
      return true;
    } else
      return _Game_Interpreter_command303.call(this);
  };

  // Change Class
  var _Game_Interpreter_command321 = Game_Interpreter.prototype.command321;
  Game_Interpreter.prototype.command321 = function () {
    if ($gameMap.isABS()) {
      AlphaABS.BattleManagerABS.warning(321);
      return true;
    } else
      return _Game_Interpreter_command321.call(this);
  };

  // Change Actor Images
  var _Game_Interpreter_command322 = Game_Interpreter.prototype.command322;
  Game_Interpreter.prototype.command322 = function () {
    if ($gameMap.isABS()) {
      _Game_Interpreter_command322.call(this);
      AlphaABS.BattleUI.refreshPlayerFace();
      return true;
    } else
      return _Game_Interpreter_command322.call(this);
  };

  Game_Interpreter.prototype.command331 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  Game_Interpreter.prototype.command332 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  Game_Interpreter.prototype.command333 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  Game_Interpreter.prototype.command334 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  Game_Interpreter.prototype.command335 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  Game_Interpreter.prototype.command336 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  Game_Interpreter.prototype.command337 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  Game_Interpreter.prototype.command338 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  Game_Interpreter.prototype.command339 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  Game_Interpreter.prototype.command340 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  // Open Menu Screen
  var _Game_Interpreter_command351 = Game_Interpreter.prototype.command351;
  Game_Interpreter.prototype.command351 = function () {
    if ($gameParty.inBattle()) {
      AlphaABS.BattleManagerABS.alertNoInBattle();
      AlphaABS.BattleManagerABS.warning(1);
      return true;
    } else
      return _Game_Interpreter_command351.call(this);
  };

  // Open Save Screen
  var _Game_Interpreter_command352 = Game_Interpreter.prototype.command352;
  Game_Interpreter.prototype.command352 = function () {
    if ($gameParty.inBattle()) {
      AlphaABS.BattleManagerABS.alertNoInBattle();
      AlphaABS.BattleManagerABS.warning(1);
      return true;
    } else
      return _Game_Interpreter_command352.call(this);
  };

  //END Game_Interpreter
  //------------------------------------------------------------------------------

})();