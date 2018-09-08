(function(){

  var PopInfoManagerABS = AlphaABS.LIBS.PopInfoManagerABS;

  //Game_Action
  //------------------------------------------------------------------------------
    //OVER
    Game_Action.prototype.setSubject = function(subject) {
      this._subject = subject;
    };

    //OVER
    Game_Action.prototype.subject = function() {
      return this._subject;
    };

    //OVER
    Game_Action.prototype.testApply = function(target) {
        return (this.isForDeadFriend() === target.isDead() &&
                (this.isForOpponent() ||
                (this.isHpRecover() && target.hp < target.mhp) ||
                (this.isMpRecover() && target.mp < target.mmp) ||
                (this.hasItemAnyValidEffects(target))));
    };

    var pkd_GameAction_executeDamage = Game_Action.prototype.executeDamage;
    Game_Action.prototype.executeDamage = function(target, value) {
      pkd_GameAction_executeDamage.call(this, target, value);
      PopInfoManagerABS.makeDamagePopUp(target);
      if (this.isDrain()) {
        PopInfoManagerABS.makeDrainPopUp(this.subject());
      }
    };

    var pkd_GameAction_itemEffectRecoverHp = Game_Action.prototype.itemEffectRecoverHp;
    Game_Action.prototype.itemEffectRecoverHp = function(target, effect) {
      pkd_GameAction_itemEffectRecoverHp.call(this, target, effect);
      PopInfoManagerABS.makeDamagePopUp(target);
    };

    var pkd_GameAction_itemEffectRecoverMp = Game_Action.prototype.itemEffectRecoverMp;
    Game_Action.prototype.itemEffectRecoverMp = function(target, effect) {
      pkd_GameAction_itemEffectRecoverMp.call(this, target, effect);
      PopInfoManagerABS.makeDamagePopUp(target);
    };

    var pkd_GameAction_itemEffectGainTp = Game_Action.prototype.itemEffectGainTp;
    Game_Action.prototype.itemEffectGainTp = function(target, effect) {
      pkd_GameAction_itemEffectGainTp.call(this, target, effect);
      PopInfoManagerABS.makeDamagePopUp(target);
    };

    var pkd_GameAction_executeHpDamage = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target, value) {
      pkd_GameAction_executeHpDamage.call(this, target, value);
      if(value == 0) {
        PopInfoManagerABS.makeZeroDamagePopUp(target);
      }
    };
    //END Game_Action
  //------------------------------------------------------------------------------

})();
