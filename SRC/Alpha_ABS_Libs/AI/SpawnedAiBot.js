/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SpawnedAiBot.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
function Game_SpawnedAiBot() {
    this.initialize.apply(this, arguments);
}

(function(){
    Game_SpawnedAiBot.prototype = Object.create(Game_AIBot.prototype);
    Game_SpawnedAiBot.prototype.constructor = Game_SpawnedAiBot;

    Game_SpawnedAiBot.prototype.initialize = function (mapId, eventId, enemyId, x, y, spawnEventId) {
        this._spawnX = x;
        this._spawnY = y;
        this._spawnEventId = spawnEventId;
        Game_AIBot.prototype.initialize.call(this, mapId, eventId, enemyId);
        DataManager.extractMetadata(this.event());
    };
    Game_SpawnedAiBot.prototype.event = function () {
        return $dataSpawnMapAI.events[this._spawnEventId];
    };
    Game_SpawnedAiBot.prototype.locate = function () {
        var x = this._spawnX;
        var y = this._spawnY;
        Game_AIBot.prototype.locate.call(this, x, y);
    };
})();

// ■ END SpawnedAiBot.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////