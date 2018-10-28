(function () {
  //Game_Troop
  //------------------------------------------------------------------------------
  //OVER
  Game_Troop.prototype.setup = function (troopId) {
    this.clear();
    this._enemies = [];
    this._enemiesABS = [];

    $gameMap.events().forEach(function (e) {
      if (e instanceof Game_AIBot) {
        this._enemiesABS.push(e);
      }
    }.bind(this));
  };

  Game_Troop.prototype.membersABS = function () {
    return this._enemiesABS;
  };

  //OVER
  Game_Troop.prototype.initABS = function () {
    this.setup();
    this.membersABS().forEach(function (member) {
      member.initABS();
      this._enemies.push(member.battler());
    }.bind(this));
    this._inBattle = true;
  };

  //?[NEW]
  Game_Troop.prototype.deactivateABS = function () {
    try {
      var members = this.membersABS();
      if (members != null) {
        members.forEach(function (member) {
          member._deactivate();
        }.bind(this));
      }
    } catch (error) {
      AlphaABS.error(error, ' deactivateABS');
    }
    this._inBattle = false;
  };

  //NEW
  Game_Troop.prototype.onTurnEnd = function () {
    try {
      this._enemiesABS.forEach(function (e) {
        e.onTurnEnd();
      });
    } catch (error) {
      AlphaABS.error(error, ' onTurnEnd');
    }
  };

  Game_Troop.prototype.aliveMembersABS = function () {
    return this.membersABS().filter(function (member) {
      return member.battler().isAlive();
    });
  };

  Game_Troop.prototype.deadMembersABS = function () {
    return this.membersABS().filter(function (member) {
      return member.battler().isDead();
    });
  };

  //NEW
  Game_Troop.prototype.selectOnMap = function (who) {
    this.membersABS().forEach(function (e) {
      e.selectOnMap(false);
    });
    if (who) who.selectOnMap(true);
  };
  //END Game_Troop
  //------------------------------------------------------------------------------

})();