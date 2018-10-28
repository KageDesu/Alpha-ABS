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
        var candidates = this._absParams.absMapData.filter(function (item) {
            return (item.mapId == mapId && item.enemyId == enemyId);
        });
        if (candidates.length > 0) {
            return candidates[0];
        }
        return null;
    };

    //?[NEW]
    Game_Player.prototype.inABSMotion = function () {
        if (this.ABSParams() == null)
            return false;
        return this.ABSParams().absMotion != null;
    };

    //?[NEW]
    Game_Player.prototype._updateABSMotion = function () {
        if (this.battler() == null) return;
        if (this.battler().isNeedABSMotionRefresh()) {
            this.refreshABSMotion();
            this.battler().onABSMotionRefresh();
        }
        if (this.battler().isNeedABSMotionAction()) {
            this.battler().onABSMotionActionDone();
            var motion = this.ABSParams().absMotion;
            if(motion != null) {
                motion.applyMotionAction();
            }
        }
    };

    //?[NEW]
    Game_Player.prototype.refreshABSMotion = function () {
        if (this._absParams.absMotion != null) {
            this._absParams.absMotion.clearMotion();
            this._absParams.absMotion = null;
        }
        if (this.battler().isHasABSMotion()) {
            this._absParams.absMotion = new AlphaABS.LIBS.ABSMotion();
            var skill = this.battler()._firstBattleABSSkill();
            this._absParams.absMotion.setMotion(skill.motion, skill.motionOffset, this);
            this.refreshABSMotionState(this.inBattle());
        }
    };

    //?[NEW]
    Game_Player.prototype.refreshABSMotionState = function (toState) {
        if (this._absParams.absMotion != null) {
            if (toState == true) {
                this._absParams.absMotion.applyMotionState();
            } else {
                this._absParams.absMotion.applyMotionIdle();
            }
        }
    };

    //?[NEW]
    Game_Player.prototype.refreshABS = function () {
        this.refreshABSMotion();
    };

    //?[NEW]
    Game_Player.prototype.isAlive = function () {
        if(this.battler()) {
            return this.battler().isAlive();
        }
        return false;
    };

})();

// ■ END Game_Player.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////