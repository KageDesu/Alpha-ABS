(function () {
    //@[INTERFACE]
    var Interface_AIBot = {
        initializeABS: function () {
            this.LOG = new PLATFORM.DevLog(this.constructor.name);
            this.LOG.applyLibraryColors();
            this.aiName = "Unknown";

            this._stateMachine = null;

            this._absParams.battler = null;
            this._absParams.target = null;
            this._absParams.inBattle = false;
            this._absParams.active = true; //Со мной можно взаимодействовать
            this._absParams.selected = false; //Я выбран на карте игроком?
            this._absParams.myHomePosition = null;
            this._absParams.behavior = new AlphaABS.LIBS.Game_AIBehavior();
            this._absParams.allyToSearch = null;
            this._absParams.rageContainer = null; //Цель - урон, для ярости

            //escapeOnBattle; //Убегает во время битвы
            //canSearch; //Могу ля я искать противника, если мой сосед атакован
            //noFight; //Не будет сражаться
            //reviveTime; //Время возрождения (минуты)
            //slow; //Медленный враг
            //agressive; //Агрессивный враг (будет догонять)
            //returnType; //Тип возвращения 0 - быстрое, 1 - обычное, 2 - остановка
            //teamId;
            //rage; //Если 1, то агрится, если 0 , то нет
        },
        ABSParams: function () {
            return this._absParams;
        },
        isAlly: function (who) {
            if (who)
                return (this.teamId() == who.teamId());
            return false;
        },
        teamId: function () {
            return this.behaviorModel().teamId;
        },
        canFight: function () {
            return !this.behaviorModel().noFight;
        },
        behaviorModel: function () {
            return this._absParams.behavior;
        },
        isFastReturn: function () {
            return this.behaviorModel().returnType == 0;
        },
        isSlowReturn: function () {
            return this.behaviorModel().returnType == 1;
        },
        isNotReturn: function () {
            return this.behaviorModel().returnType == 2;
        },
        isCasting: function () {
            var action = this.currentAction();
            return (action && action.isCasting());
        },
        currentAction: function () {
            return this._absParams.currentAction;
        },
        target: function () {
            return this._absParams.target;
        },
        isAlive: function () {
            if (this.battler() != null)
                return this.battler().isAlive();
            else
                return true;
        },
        battler: function () {
            return this._absParams.battler;
        },
        getHomePosition: function () {
            return this._absParams.myHomePosition;
        },
        inBattle: function () {
            return this._absParams.inBattle;
        },
        inActive: function () {
            return this._absParams.active;
        },
        selectOnMap: function (isSelect) {
            this._absParams.selected = isSelect;
        },
        changeStateToBattle: function (target) {
            this.setTarget(target);
            this._stateMachine.switchStateToBattle(this);
        },
        changeStateToFree: function () {
            this._stateMachine.switchStateToFree(this);
        },
        changeStateToReturn: function () {
            this._stateMachine.switchStateToReturn(this);
        },
        changeStateToSearch: function (targetToSearch) {
            this.setAllyTarget(targetToSearch);
            this._stateMachine.switchStateToSearch(this);
        },
        setAllyTarget: function (ally) {
            this._absParams.allyToSearch = ally;
        },
        changeTeamTo: function(id) {
            this.behaviorModel().teamId = id;
        },
        isSelected: function() {
            return this._absParams.selected;
        },
        allyToSearch: function() {
            return this._absParams.allyToSearch;
        },
        canRage: function () {
            return this.behaviorModel().rage == 1;
        },
        rageContainer: function () {
            return this._absParams.rageContainer;
        },
        name: function() {
            return this.aiName;
        }
    };

    AlphaABS.LIBS.Interface_AIBot = Interface_AIBot;
})();