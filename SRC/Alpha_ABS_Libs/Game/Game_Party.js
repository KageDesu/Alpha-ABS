(function () {
  var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;
  //Game_Party
  //------------------------------------------------------------------------------
  //NEW
  Game_Party.prototype.initABS = function () {
    this._membersABS = null;
    this.members().forEach(function (member) {
      member.initABS();
    });
    this._inBattle = false;
    this._noNotifyABS = false;
  };

  Game_Party.prototype.membersABS = function () {
    if (!this._membersABS) {
      this._membersABS = [];
      var bots = $gamePlayer.followers();
      bots.forEach(function (item) {
        if (item instanceof Game_AI2Bot) {
          if (item.battler() != null)
            this._membersABS.push(item);
        }
      }, this);
    }
    return this._membersABS;
  };

  //?[NEW]
  Game_Party.prototype.getAIBotByBattler = function (battler) {
    try {
      if (battler == $gamePlayer.battler())
        return $gamePlayer;
      var members = this.membersABS();
      for (var i = 0; i < members.length; i++) {
        if (members[i].battler() == battler)
          return members[i];
      }
    } catch (error) {
      console.error(error);
      return null;
    }
    return null;
  };


  //?[NEW]
  Game_Party.prototype.terminateABSSession = function () {
    this.membersABS().forEach(function (e) {
      e.onGameSave();
    });
  };

  //?[NEW]
  Game_Party.prototype.stopABS = function () {
    this.selectOnMap(null);
    this.membersABS().forEach(function (e) {
      e.stopABS();
    });
    this._membersABS = null;
  };

  //?[NEW]
  Game_Party.prototype.refreshABS = function () {
    this._membersABS = null;
    this.membersABS().forEach(function (e) {
      e.refreshABS();
    });
    $gamePlayer.refreshABS();
  };

  Game_Party.prototype.selectOnMap = function (who) {
    this.membersABS().forEach(function (e) {
      e.selectOnMap(false);
    });
    if (who) who.selectOnMap(true);
  };

  Game_Party.prototype.gainExpForAllABS = function (exp, shared) {
    if (shared == true) {
      exp = Math.round(exp / (this.membersABS().length + 1));
    }
    $gamePlayer.battler().gainExp(exp);
    this.membersABS().forEach(function (member) {
      member.battler().gainExp(exp);
    });
  };


  var _Game_Party_gainGold = Game_Party.prototype.gainGold;
  Game_Party.prototype.gainGold = function (amount) {
    _Game_Party_gainGold.call(this, amount);
    if ($gameMap.isABS()) {
      if (amount > 0) {
        AudioManager.playSe({
          name: 'Coin',
          pan: 0,
          pitch: 100,
          volume: 90
        });
        AlphaABS.BattleUI.pushGoldOnPanel(amount);
      }
    }
  };

  var _Game_Party_gainItem = Game_Party.prototype.gainItem;
  Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
    _Game_Party_gainItem.call(this, item, amount, includeEquip);
    try {
      if ($gameMap.isABS()) {
        if (amount > 0 && !this._noNotifyABS) {
          AudioManager.playSe({
            name: 'Equip2',
            pan: 0,
            pitch: 140,
            volume: 90
          });
        }
        if (amount > 0) {
          AlphaABS.BattleUI.pushItemOnPanel(item);
          AlphaABS.BattleUI.refresh();
          if (!$gamePlayer.inBattle()) {
            $gamePlayer.battler().checkAutoReloadFirearm(item);
          }
        }

        if (DataManager.isWeapon(item)) {
          AlphaABS.BattleUI.refreshWeaponCircle();
        }
      }
    } catch (error) {
      AlphaABS.error(error, ' gain item to party');
    }
  };

  Game_Party.prototype.inBattle = function () {
    return $gamePlayer.inBattle();
  };

  //? А нужна ли возможность добавлять в группу на ABS карте?
  var _alias_Game_Party_addActor = Game_Party.prototype.addActor;
  Game_Party.prototype.addActor = function (actorId) {
    _alias_Game_Party_addActor.call(this, actorId);
    if (!AlphaABS.isABS()) return;
    try {
      var bots = $gamePlayer.followers();
      var ls = $gameParty.members().length - 1;
      bots._data[ls - 1].reInitABS(ls);
      bots._data[ls - 1].initABS();
      this._membersABS = undefined;
      this.membersABS();
      $gamePlayer.refresh();
      $gameMap.requestRefresh();
      AlphaABS.BattleManagerABS.updateABSSession();
    } catch (e) {
      console.error(e);
    }
  };

  //TODO: Это работает с косяком
  var _alias_Game_Party_removeActor = Game_Party.prototype.removeActor;
  Game_Party.prototype.removeActor = function (actorId) {
    var index = this._actors.indexOf(actorId);
    _alias_Game_Party_removeActor.call(this, actorId);
    if (!AlphaABS.isABS()) return;
    $gamePlayer.followers().initializeABS();
    this._membersABS = undefined;
    this.membersABS();
    $gamePlayer.followers().forEach(function (f) {
      f.initABS();
    }, this);
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
    AlphaABS.BattleManagerABS.updateABSSession();
  };

  //END Game_Party
  //------------------------------------------------------------------------------

})();