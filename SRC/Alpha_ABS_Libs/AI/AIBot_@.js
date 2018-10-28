//Class extension (for savefile compability)
function Game_AIBot() {
  this.initialize.apply(this, arguments);
}

(function () {

  "use strict";


  //Game_AIBot
  //------------------------------------------------------------------------------
  Game_AIBot.prototype = Object.create(Game_Event.prototype);
  Game_AIBot.prototype.constructor = Game_AIBot;
  PLATFORM.SDK.applyInterface(Game_AIBot, AlphaABS.LIBS.Interface_AIBot);
  PLATFORM.SDK.applyInterface(Game_AIBot, AlphaABS.LIBS.Interface_AIBotABS);
  PLATFORM.SDK.applyInterface(Game_AIBot, AlphaABS.LIBS.Interface_AIBotABSEvents);
  PLATFORM.SDK.applyInterface(Game_AIBot, AlphaABS.LIBS.Interface_AIBotActions);
  PLATFORM.SDK.applyInterface(Game_AIBot, AlphaABS.LIBS.Interface_AIBotABSMoving);
  AlphaABS.register(Game_AIBot);

  Game_AIBot.prototype.initialize = function (mapId, eventId, enemyId) {
    Game_Event.prototype.initialize.call(this, mapId, eventId);
    this.initializeABS();
    this._stateMachine = new AlphaABS.LIBS.AIStateMachine(eventId);
    this.LOG.p("AI inited " + $dataEnemies[enemyId].name + " at " + this.toPoint().toString());
    this.aiName = $dataEnemies[enemyId].name;
    this._absParams.enemyId = enemyId;

    //Variables
    this._absParams.allyToSearch = null; //Кого мне искать
    this._absParams.reviveTimer = null; //Таймер для возраждения
    this._absParams.regenTimer = null; //Таймер для восстановления параметров
    this._absParams.myStartPosition = this.toPoint();
    this._absParams.looted = false;
    this._absParams.activateSwitch = null; //Used if enemy not been active at start
    this._absParams.reservedCommonEvent = null;

    this._absParams.behavior.loadEnemy(this);

    //For compability with Sprite_CharacterABS
    this._absParams.viewRadius = this._absParams.behavior.viewRadius;
    this._absParams.returnRadius = this._absParams.behavior.returnRadius;

    this.setRevive(this._absParams.behavior.reviveTime);

    if (Imported.Quasi_Movement)
      this._absParams.useAStar = true;
    else
      this._absParams.useAStar = false;

    if(this.canRage())
      this._absParams.rageContainer = new AlphaABS.LIBS.RageContainer();

    this._storeMoveData();
  };

  Game_AIBot.prototype.changeReturnType = function (newReturnType) {
    this.behaviorModel().returnType = newReturnType;
    this.LOG.p("ReturnType: " + this.behaviorModel().returnType);
  };

  Game_AIBot.prototype.hasLoot = function () {
    return !this._absParams.looted;
  };
})();