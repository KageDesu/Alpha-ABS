// ----------------------------------------------------------------
// Event Distance Sensor.js
// With Camera Scroll EX Compatibility
// ----------------------------------------------------------------
/*:
* @plugindesc v1.0 Creates event actions based on their distance to the character.
* @author: Soulpour777
* @help
* Event Distance Sensor Documentation
* 
Q: How do I set up an event that can do sensor abilities?
A: You have to place the <action> on the event's first page
as a comment. Make sure that it is a comment and make sure
you are in the first page. You have to place what is the
range of the sensor as well or else it won't work.

For example, you want an event to sense you if you
are near the event, you can use:

<action>
<sensor: 4>

This means that when you're 4 blocks away the event,
the event would detect you right away, and move to
where it wants to.

If you place the sensor at 2, you need to get near
the event so much before it works.

Q: So after I set it up as a sensor event, how can I make
it do what I want?
A: You have to create a second page of your event. The 
next thing you need to do now is make sure the condition
for the event to work is that Self Switch A is turned on.
After doing that, you can make everything in the second
page as parallel process or custom movement, to do whatever
you want it to.
*/

/*:ru
* @plugindesc v1.0 Event Sensor. Действия событий, основанные от расстояния от игрока.
* @author: Soulpour777
* @help
* Инструкция
* 
Q: Как настроить Event (событие) для определения расстояния?
A: Создаём событие без каких-либо условий и на первой его странице добавляем
следующий комментарий: 
<action>
<sensor: 4>

4 - это расстояние от игрока. Когда игрок будет
в 4 блоках (тайлах) от события, оно сработает. 
(Включится локальный переключатель A).

Заместо 4, можно ставить необходимое Вам расстояние.


Q: Как настроить поведение события?
A: Создаём вторую страницу и ставим условия, чтобы локальный переключатель А был активирован.
Затем добавляем на эту страницу любые необходимые действия. 
Условие запуска - параллельно (или автозапуск).
*/

var Soulpour777 = Soulpour777 || {};
Soulpour777.Sensor = {
  structAlias: {
    Game_Event: {
      initialize: Game_Event.prototype.initialize,
      update: Game_Event.prototype.update
    }
  }
};
 
Game_Event.prototype.initialize = function()
{
    Soulpour777.Sensor.structAlias.Game_Event.initialize.apply(this, arguments);
    this.setSensorAndShift();
};

Game_Event.prototype.update = function()
{
    Soulpour777.Sensor.structAlias.Game_Event.update.apply(this, arguments);
    this.checkEventDistanceSensor();
};
 
Game_Event.prototype.checkEventDistanceSensor = function() {
    if (this._action) {
         if (Math.abs($gamePlayer.x - this._x) <= this._sensorRange && Math.abs($gamePlayer.y - this._y) <= this._sensorRange) {
             $gameSelfSwitches.setValue([$gameMap._mapId, this.event().id, 'A'], true);
         }
    }
}
 
Game_Event.prototype.setSensorAndShift = function()
{
    var comment = "";
    this._shifts = false;
    this._action = false;
    this._sensorRange = 0;
    if (this.page())
    {
        var pagelist = this.page().list;
        for (cmd of pagelist) if(cmd.code === 108 || cmd.code === 408) comment += cmd.parameters[0] + "\n";
        var sensor = comment.match(/<\s*sensor\s*:\s*(\d+)\s*>/im);
        this._action = (comment.match(/<\s*action\s*>/im) !== null);
        if(sensor) this._sensorRange = Number(sensor[1]);
    }
}