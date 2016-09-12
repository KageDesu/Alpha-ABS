//=============================================================================
// OuterSelfSwitch.js
//=============================================================================

/*:
 * @plugindesc Changes a self switch for other events.
 * @author Yoji Ojima
 *
 * @help
 *
 * Plugin Command:
 *   OuterSelfSwitch on 3 A     # Turns on the switch A for the event #3
 *   OuterSelfSwitch on 4 B     # Turns on the switch B for the event #4
 *   OuterSelfSwitch off 5 C    # Turns off the switch C for the event #5
 *   OuterSelfSwitch off 6 D    # Turns off the switch D for the event #6
 *   OuterSelfSwitch off all A  # Turns off the switch A for all the events
 */

/*:ja
 * @plugindesc 他のイベントのセルフスイッチを操作します。
 * @author Yoji Ojima
 *
 * @help
 *
 * プラグインコマンド:
 *   OuterSelfSwitch on 3 A     # イベント３番のセルフスイッチＡをオン
 *   OuterSelfSwitch on 4 B     # イベント４番のセルフスイッチＢをオン
 *   OuterSelfSwitch off 5 C    # イベント５番のセルフスイッチＣをオフ
 *   OuterSelfSwitch off 6 D    # イベント６番のセルフスイッチＤをオフ
 *   OuterSelfSwitch off all A  # 全イベントのセルフスイッチＡをオフ
 */

 /*:ru
 * @plugindesc Внешнее переключение самост.операторов (self switch) для событий 
 * @author Yoji Ojima
 *
 * @help
 *
 * Команды: (В событии "Команда доп. модуля", 3 страница)
 *   OuterSelfSwitch on 3 A     # Включить самост.оператор A для события номер 3
 *   OuterSelfSwitch on 4 B     # Включить самост.оператор B для события номер 4
 *   OuterSelfSwitch off 5 C    # Выключить самост.оператор C для события номер 5
 *   OuterSelfSwitch off 6 D    # Выключить самост.оператор D для события номер 6
 *   OuterSelfSwitch off all A  # Выключить самост.оператор A для событий на карте
 */
 
(function() {

    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'OuterSelfSwitch') {
            var operation = args[0];
            if (operation === 'on' || operation === 'off') {
                var target = args[1];
                var character = String(args[2]);
                var value = (operation === 'on');
                changeSelfSwitch(this._mapId, target, character, value);
            }
        }
    };

    function changeSelfSwitch(mapId, target, character, value) {
        if (character.match(/^[A-D]$/)) {
            if (target === 'all') {
                for (var i = 1; i < $dataMap.events.length; i++) {
                    changeSelfSwitch(mapId, i, character, value);
                }
            } else {
                var eventId = Number(target);
                if (eventId > 0) {
                    var key = [mapId, eventId, character];
                    $gameSelfSwitches.setValue(key, value);
                }
            }
        }
    }

})();
