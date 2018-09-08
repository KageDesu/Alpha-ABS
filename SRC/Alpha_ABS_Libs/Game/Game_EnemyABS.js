function Game_EnemyABS() {
    this.initialize.apply(this, arguments);
}
(function () {
    //Game_EnemyABS
    //------------------------------------------------------------------------------
    Game_EnemyABS.prototype = Object.create(Game_Enemy.prototype);
    Game_EnemyABS.prototype.constructor = Game_EnemyABS;

    //OVER
    Game_EnemyABS.prototype.initialize = function (enemyId) {
        Game_Enemy.prototype.initialize.call(this, enemyId, 0, 0);
    };

    //OVER
    Game_EnemyABS.prototype.initMembers = function () {
        Game_Enemy.prototype.initMembers.call(this);
        this._absParams.myTurnCount = 0; //Количество секунд, проведённых в сессии боя
        this._absParams.rageContainer = null;
    };

    //NEW
    Game_EnemyABS.prototype.regenerateAllonFree = function () {
        if (this.isAlive()) {
            if (this._hp != this.mhp) {
                var value = Math.floor(this.mhp * 0.05);
                value = Math.max(value, -this.maxSlipDamage());
                if (value !== 0) {
                    this.gainHp(value);
                }
            }
            if (this._mp != this.mmp) {
                var value = Math.floor(this.mmp * 0.05);
                if (value !== 0) {
                    this.gainMp(value);
                }
            }
        }
    };

    //OVER
    Game_EnemyABS.prototype.isActionValid = function (action) {
        var t = this.skillABS_byId(action.skillId);
        return Game_Enemy.prototype.isActionValid.call(this, action) && t.isReady();
    };

    //OVER
    Game_EnemyABS.prototype.meetsTurnCondition = function (param1, param2) {
        var n = this._absParams.myTurnCount;
        if (param2 === 0) {
            return n === param1;
        } else {
            return n > 0 && n >= param1 && n % param2 === param1 % param2;
        }
    };

    Game_EnemyABS.prototype.clearStates = function () {
        Game_Enemy.prototype.clearStates.call(this);
        this._stateSteps = {};
    };

    Game_EnemyABS.prototype.eraseState = function (stateId) {
        Game_Enemy.prototype.eraseState.call(this, stateId);
        delete this._stateSteps[stateId];
    };

    Game_EnemyABS.prototype.resetStateCounts = function (stateId) {
        Game_Enemy.prototype.resetStateCounts.call(this, stateId);
        this._stateSteps[stateId] = $dataStates[stateId].stepsToRemove;
    };

    Game_EnemyABS.prototype.initABS = function () {
        Game_Enemy.prototype.initABS.call(this);
        if (this._absParams.battleSkillsABS.all().length == 0)
            this._createBattleSkills();
    };

    //NEW (вынести на бота)
    Game_EnemyABS.prototype.onWalk = function () {
        this.clearResult();
        this.states().forEach(function (state) {
            this.updateStateSteps(state);
        }, this);
    };

    //NEW
    Game_EnemyABS.prototype.executeFloorDamage = function () {
        var damage = Math.floor(this.basicFloorDamage() * this.fdr);
        damage = Math.min(damage, this.maxFloorDamage());
        this.gainHp(-damage);
        if (damage > 0) {
            this.startDamagePopup();
        }
    };

    //NEW
    Game_EnemyABS.prototype.updateStateSteps = function (state) {
        if (state.removeByWalking) {
            if (this._stateSteps[state.id] > 0) {
                if (--this._stateSteps[state.id] === 0) {
                    this.removeState(state.id);
                }
            }
        }
    };

    //NEW
    Game_EnemyABS.prototype.onTurnEnd = function () {
        Game_Enemy.prototype.onTurnEnd.call(this);
        this._absParams.myTurnCount += 1;
    };

    //NEW
    Game_EnemyABS.prototype.attackAnimationId1 = function () {
        return 6;
    };

    Game_EnemyABS.prototype.onBattleEnd = function () {
        Game_Enemy.prototype.onBattleEnd.call(this);
        this._absParams.myTurnCount = 0;
        this.removeBattleStates();
        this.removeAllBuffs();
    };

    Game_EnemyABS.prototype.onDamage = function (value) {
        Game_Enemy.prototype.onDamage.call(this, value);
        if (this._absParams.rageContainer) {

        }
    };

    //PRIVATE
    Game_EnemyABS.prototype._initBattleSkills = function () {
        Game_Enemy.prototype._initBattleSkills.call(this);
    };

    Game_EnemyABS.prototype._createBattleSkills = function () {
        $dataEnemies[this._enemyId].actions.forEach(function (t) {
            var skill = $dataSkills[t.skillId];
            if (skill.meta.ABS && skill.meta.ABS <= 2) //Can't use radius and zones skills
                this._absParams.battleSkillsABS.push(t.skillId, false);
        }.bind(this));
    };
    //END Game_EnemyABS
    //------------------------------------------------------------------------------

})();