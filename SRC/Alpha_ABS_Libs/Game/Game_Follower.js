/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Follower.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Game_Follower_refresh = Game_Follower.prototype.refresh;
    Game_Follower.prototype.refresh = function () {
        _alias_Game_Follower_refresh.call(this);
        this.refreshABSMotion();
    };

    //?[NEW]
    Game_Follower.prototype.refreshABSMotion = function () {
        if (this._absParams.absMotion != null) {
            this._absParams.absMotion.clearMotion();
            this._absParams.absMotion = null;
        }
        if(this.isHasABSMotion()) {
            this._absParams.absMotion = new AlphaABS.LIBS.ABSMotion();
            var skill = this.actor()._firstBattleABSSkill();
            this._absParams.absMotion.setMotion(skill.motion, skill.motionOffset, this);
            this._absParams.absMotion.applyMotionIdle();
        }
    };

    //?[NEW]
    Game_Follower.prototype.isHasABSMotion = function () {
        if(this.actor()) {
            if (this.actor().isHasABSMotion()) {
                return true;
            }
        }
        return false;
    };

    //?[NEW]
    Game_Follower.prototype.inABSMotion = function () {
        if (this.ABSParams() == null)
            return false;
        return this.ABSParams().absMotion != null;
    };
})();
// ■ END Game_Follower.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////