(function () {

  var LOG = new PLATFORM.DevLog("Scene_Map");
  var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;

  var _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
  Scene_Map.prototype.onMapLoaded = function () {
    _Scene_Map_onMapLoaded.call(this);
    BattleManagerABS.onMapLoaded();
    if ($gameMap.isABS()) {
      this._sVectors = []; //Vectors to delete from $gameMap
      this._spriteset.initABS();
      if ($gameTemp.transferedByDeathABS == true) {
        SceneManager.goto(Scene_Gameover);
        return;
      }
    }
    $gameTemp.transferedByDeathABS = false;
  };

  var _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _Scene_Map_update.call(this);
    if ($gameMap.isABS()) {
      BattleManagerABS.updateABS();
      this._updateABS();
      if (AlphaABS.BattleUI.isUI()) {
        if (this._spriteset && this._spriteset._spritePlayerABS) {
          var p = this._spriteset._spritePlayerABS;
          AlphaABS.BattleUI.moveWeaponCircle(p.x, p.y - 24);
        }
      }
    }
  };

  var _Scene_Map_checkGameover = Scene_Map.prototype.checkGameover;
  Scene_Map.prototype.checkGameover = function () {
    if ($gameMap.isABS()) {
      //NOTHING! see Game_Player
    } else
      _Scene_Map_checkGameover.call(this);
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function () {
    if ($gameMap.isABS()) {
      AlphaABS.BattleUI.terminate();
      if (this._pEngine)
        this._pEngine.terminate();
    }
    _Scene_Map_terminate.call(this);
  };

  var _Scene_Map_stop = Scene_Map.prototype.stop;
  Scene_Map.prototype.stop = function () {
    if ($gameMap.isABS()) {
      BattleManagerABS.setPlayerTarget(null);
      $gamePlayer.prepareABS();
      if (AlphaABS.BattleUI.isUI())
        AlphaABS.BattleUI.getUI().hide();
    }
    _Scene_Map_stop.call(this);
  };

  //NEW
  Scene_Map.prototype._updateABS = function () {
    $gameMap.ABSParams().sVectors.forEach(function (item) {
      if (item) {
        if (item.isStarted()) {
          if (!item.isAlive()) {
            AlphaABS.BattleManagerABS.battleProcess().performPostBattleAction(item);
            LOG.p("Delete SVector from Map");
            this._sVectors.push(item);
          }
        } else {
          this._spriteset.addChild(item.sprite);
          item.start();
          try {
            if (item.hasEmitter() && this._pEngine)
              this._pEngine.addEmitter(item.emitter(), true);
          } catch (e) {
            console.error(e);
          }
        }
        item.update();
      }
    }.bind(this));

    if (this._sVectors.length > 0) {
      this._sVectors.forEach(function (item) {
        $gameMap.ABSParams().sVectors.delete(item);
      });
      this._sVectors = [];
    }
  };

  //OVER
  var _Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function () {

    if (!$gameMap.isABS()) {
      _Scene_Map_processMapTouch.call(this);
      return;
    }

    if (!$gamePlayer.inActive()) {
      return;
    }

    if (!$gamePlayer.canControl()) {
      return;
    }

    if (TouchInput.isCancelled()) {
      BattleManagerABS.setPlayerTarget(null);
      $gameMap.ABSParams().menuClickCount++;
    }

    if (TouchInput.isTriggered() || this._touchCount > 0) {
      if (TouchInput.isPressed()) {
        if (this._touchCount === 0 || this._touchCount >= 15) {

          if (AlphaABS.BattleUI.isWeaponCircleTouchedAny()) {
            return;
          }

          var indexT = AlphaABS.BattleUI.isTouched();
          if (indexT != null && indexT[1] != null) {
            if (indexT[0] == 'skill')
              $gamePlayer.touchSkillAt(indexT[1]);
            if (indexT[0] == 'panel')
              $gamePlayer.touchControlAt(indexT[1]);
          } else {
            var selected = null;
            var t = this._spriteset.spritesABS();
            for (var i = 0; i < t.length; i++) {
              if (t[i].isTouched()) {
                selected = t[i];
                break;
              }
            }

            var x = $gameMap.canvasToMapX(TouchInput.x);
            var y = $gameMap.canvasToMapY(TouchInput.y);

            if (selected && selected.character().inActive()) {
              if (selected.character() != BattleManagerABS.getPlayerTarget()) {
                BattleManagerABS.setPlayerTarget(selected.character());

                if (!selected.character().isAlly($gamePlayer))
                  LOG.p("Selected " + selected.character().event().name);
                else
                  LOG.p("Selected ally " + selected.character().battler().name());

                $gameMap.ABSParams().menuClickCount = 0;
              } else {
                $gamePlayer.stopFollowMode();
                $gameTemp.setDestination(x, y);
              }
            } else {
              $gamePlayer.stopFollowMode();
              $gameTemp.setDestination(x, y);
            }
          }
        }
        this._touchCount++;
      } else {
        this._touchCount = 0;
      }
    }
  };

  var _Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled;
  Scene_Map.prototype.isMenuCalled = function () {
    if ($gameMap.isABS())
      if (BattleManagerABS.getPlayerTarget() == null &&
        $gameMap.ABSParams().menuClickCount > 1) {
        return TouchInput.isCancelled() || Input.isTriggered('menu');
      } else
        return Input.isTriggered('menu');
    else
      return _Scene_Map_isMenuCalled.call(this);
  };

  //OVER
  Scene_Map.prototype.updateCallMenu = function () {
    if (this.isMenuEnabled()) {
      if (this.isMenuCalled()) {
        this.menuCalling = true;
      }
      if (this.menuCalling && !$gamePlayer.isMoving()) {
        if ($gamePlayer.inBattle()) {
          BattleManagerABS.alertNoInBattle();
          this.menuCalling = false;
        } else
          this.callMenu();
      }
    } else {
      this.menuCalling = false;
    }
  };

  var _Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
  Scene_Map.prototype.createSpriteset = function () {
    _Scene_Map_createSpriteset.call(this);
    if ($gameMap.isABS()) {
      this._spritesetUI = new AlphaABS.LIBS.Spriteset_InterfaceABS();
      this.addChild(this._spritesetUI);
      AlphaABS.BattleUI.setUI(this._spritesetUI);
    }
  };
})();