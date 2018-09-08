/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player2.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

(function () {
    //?{params : mapId, enemyId, x, y, isLooted}
    Game_Player.prototype.setNewABSMapData = function (params) {
        try {
            var candidate = this.getABSMapData(params.mapId, params.enemyId);
            if (candidate != null) {
                this._absParams.absMapData.delete(candidate);
            }
            this._absParams.absMapData.push(params);
        } catch (error) {
            console.error(error);
        }
    };

    Game_Player.prototype.getABSMapData = function (mapId, enemyId) {
        var candidates = this._absParams.absMapData.filter(item => item.mapId == mapId && item.enemyId == enemyId);
        if (candidates.length > 0) {
            return candidates[0];
        }
        return null;
    };

    //! Experemental
    Game_Player.prototype.setNoTargetMode = function () {
        this._absParams._noTargetMode = true;
    };

    var _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function (sceneActive) {
        _Game_Player_update.call(this, sceneActive);
        if (this._absParams._noTargetMode == true)
            this._updateNEWFUNCS(sceneActive);
    };

    Game_Player.prototype._updateNEWFUNCS = function (sceneActive) {
        if (!sceneActive) return;
        if (!this.battler()) return;

        var SMouse = AlphaABS.UTILS.SMouse;
        //this.turnTowardCharacter(SMouse.getMousePosition());
        //console.log(SMouse.getMousePosition());

        if (TouchInput.isTriggered()) {
            console.log('attack no target');
            var t = this.battler();
            t.makeActions();
            t.action(0).setAttack();
            //THIS IS PROTOTYPE FOR ABS:0 with range 1 (melee weapon)
            var target = null; //THIS IS NOT USED SELECTED TARGET
            //TRY FIND TARGET 
            var inRadius = AlphaABS.UTILS.inRadius(this, 2, $gameTroop.membersABS());
            if (inRadius.length > 0) {
                inRadius.forEach(element => { //WARNING: 1.5.1 not support
                    if (AlphaABS.UTILS.inFront($gamePlayer, element)) {
                        target = element;
                        console.log('target in front!');
                    }
                });
            }
            var BattleProcessABS = AlphaABS.LIBS.BattleManagerABS.battleProcess();
            BattleProcessABS.performBattleAction(this, target);
            t.performCurrentAction();
            t.performAttack();
        }

    };


})();

// ■ END Game_Player.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////