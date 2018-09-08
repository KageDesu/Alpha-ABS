(function(){

  var PopInfoManagerABS = AlphaABS.LIBS.PopInfoManagerABS;
  var LOG = new PLATFORM.DevLog("Game_BattlerBase");

  //Game_BattlerBase
  //------------------------------------------------------------------------------
    var pkd_GameBattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
    Game_BattlerBase.prototype.initMembers = function() {
      pkd_GameBattlerBase_initMembers.call(this);
      this._absParams = {};
      this._absParams.popups = [];
      this._absParams.moveSpeedUpKoef = 0;
    };

    var pkd_GameBattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
    Game_BattlerBase.prototype.eraseState = function(stateId) {
      if(this._states.include(stateId)) {
        PopInfoManagerABS.makeStatePopUp(this, stateId, true);
        this.onSpeedUpState(stateId, false);
        this.onMotionState(stateId, false);
      }
      pkd_GameBattlerBase_eraseState.call(this, stateId);
    };

    var pkd_GameBattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
    Game_BattlerBase.prototype.addNewState = function(stateId) {
      var state = $dataStates[stateId];
      if(state.restriction == 0 || state.restriction == 4) {
        pkd_GameBattlerBase_addNewState.call(this, stateId);
        this.onSpeedUpState(stateId, true);
        this.onMotionState(stateId, true);
      } else {
        LOGW.p("State " + state.name + " not supported in Alpha ABS");
      }
    };

    //NEW
    Game_BattlerBase.prototype.onSpeedUpState = function(stateId, up) {
      var state = $dataStates[stateId];
      if(state.meta.speed) {
        if(up) {
          LOG.p("Speed UP State been added");
          this._absParams.moveSpeedUpKoef += parseInt(state.meta.speed);
        } else {
          LOG.p("Speed UP State been removed");
          this._absParams.moveSpeedUpKoef -= parseInt(state.meta.speed);
        }
      }
    };

    //NEW
    Game_BattlerBase.prototype.onMotionState = function(stateId, up) {
      var state = $dataStates[stateId];
      if(state.restriction == 4 && this.isPlayer()) {
        if(state.motion >= 2) {
          if(up) {
            //LOG.p("Sleep motion requested");
            $gamePlayer.requestMotion('sleep');
          } else {
            //LOG.p("Sleep motion removed");
            $gamePlayer.requestMotion('none');
          }
        }
      }
    };

    //OVER
    Game_BattlerBase.prototype.isOccasionOk = function(item) {
      if($gameParty.inBattle()) {
        return item.occasion === 0 || item.occasion === 1;
      } else {
        return item.occasion === 0 || item.occasion === 1 || item.occasion === 2;
      }
    };

    //NEW
    Game_BattlerBase.prototype.ABSParams = function() {
      return this._absParams;
    };

    //NEW
    Game_BattlerBase.prototype.allIconsWithPriority = function(value) {
      var stateIcons = this.states().map(function(state) {
        if(state.priority >= value)
              return state.iconIndex;
            else return 0;
        }).filter(function(iconIndex) {
            return iconIndex > 0;
        });
      return stateIcons;
    };

    //NEW
    Game_BattlerBase.prototype.getInfoPops = function() {
      return this._absParams.popups;
    };

    //NEW
    Game_BattlerBase.prototype.performActionUsed = function() {
      PopInfoManagerABS.makeItemPopUp(this);
    };

    Game_BattlerBase.prototype.addInfoPop = function(info) {
      this._absParams.popups.push(info);
    };

    Game_BattlerBase.prototype.clearInfoPops = function() {
      this._absParams.popups = [];
    };

    Game_BattlerBase.prototype.isPlayer = function() {
      return (this == $gamePlayer.battler());
    };
    //END Game_BattlerBase
  //------------------------------------------------------------------------------

})();
