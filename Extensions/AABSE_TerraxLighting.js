/*
 * Official Web Page
 * <https://kagedesuworkshop.blogspot.ru/p/alpha-abs.html>
 */

 //=============================================================================
 // Alpha_ABS_Extension_TerraxLightingSupport
 //=============================================================================
 //Version 1.2 (03.08.2018)

 /*:
  * @author Pheonix KageDesu
  * @plugindesc TerraxLighting support for Alpha ABS
  * @help Extension for Alpha ABS. 
  * Require plugin Alpha ABS version 1.2 (900) and above
*/

(function () {

    let MIN_ABS_BUILD = 900;

    if (!Imported || !Imported.AlphaABS) {
        console.log("TerraxLighting extension : Alpha ABS plugin not found!");
        return;
    }

    if (!Imported.TerraxLighting) {
        console.log("TerraxLighting extension : TerraxLighting plugin not found!");
        return;
    }

    if (AlphaABS.Build < MIN_ABS_BUILD) {
        console.log("TerraxLighting extension : update Alpha ABS for this extension!");
        return;
    }

    AlphaABS.SYSTEM.EXTENSIONS.LIGHT = true;

    var LOG = new KDCore.DevLog("Lighting");
    LOG.applyExtensionColors();
    LOG.p("Inited");

    var xyLightArray = [];

    var _setLightAt = function (tiletype, x, y, radius, color, isOn, bright, isFlicker) {
        bright = KDCore.SDK.check(bright, 0.0);
        var isValidColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
        if (!isValidColor) {
            color = '#FFFFFF';
        }

        var tilefound = false;
        for (var i = 0; i < xyLightArray.length; i++) {
            var tilestr = xyLightArray[i];
            var tileargs = tilestr.split(";");
            if (tileargs[0] == tiletype && tileargs[1] == x && tileargs[2] == y) {
                tilefound = true;
                if (isOn)
                    xyLightArray[i] = tiletype + ";" + x + ";" + y + ";" + radius + ";" + color + ";" + isOn + ";" + bright + ";" + isFlicker;
                else
                    xyLightArray.delete(tilestr);
                break;
            }
        }

        if (tilefound === false) {
            var tiletag = tiletype + ";" + x + ";" + y + ";" + radius + ";" + color + ";" + isOn + ";" + bright + ";" + isFlicker;
            xyLightArray.push(tiletag);
        }

        $gameVariables.setXYArrayABS(xyLightArray);
    };

    var _updateABS = function () {

        var canvas = this._maskBitmap.canvas;
        var ctx = canvas.getContext("2d");
        ctx.globalCompositeOperation = 'lighter';

        var pw = $gameMap.tileWidth();
        var ph = $gameMap.tileHeight();
        var dx = $gameMap.displayX();
        var dy = $gameMap.displayY();

        for (var i = 0; i < xyLightArray.length; i++) {
            var tilestr = xyLightArray[i];
            var tileargs = tilestr.split(";");
            var tile_type = tileargs[0];
            var x = tileargs[1];
            var y = tileargs[2];
            var radius = parseInt(tileargs[3]);
            var color = tileargs[4];
            var isOn = (tileargs[5] === 'true');
            var bright = Number(tileargs[6]);
            var isFlicker = (tileargs[7] === 'true');

            if (tile_type == 700 && isOn) {
                var x1 = (pw / 2) + (x - dx) * pw;
                var y1 = (ph / 2) + (y - dy) * ph;

                if ($dataMap.scrollType === 2 || $dataMap.scrollType === 3) {
                    if (dx - 5 > x) {
                        var lxjump = $gameMap.width() - (dx - x);
                        x1 = (pw / 2) + (lxjump * pw);
                    }
                }
                if ($dataMap.scrollType === 1 || $dataMap.scrollType === 3) {
                    if (dy - 5 > y) {
                        var lyjump = $gameMap.height() - (dy - y);
                        y1 = (ph / 2) + (lyjump * ph);
                    }
                }
                this._maskBitmap.radialgradientFillRect(x1, y1, 0, radius, color, 'black', isFlicker, bright);
            }
        }
        ctx.globalCompositeOperation = 'source-over';
    };

    var _Spriteset_Map_createLightmask_Terrax = Spriteset_Map.prototype.createLightmask;
    Spriteset_Map.prototype.createLightmask = function () {
        _Spriteset_Map_createLightmask_Terrax.call(this);
        var temp = this._lightmask.__proto__.update;
        this._lightmask.__proto__.update = function () {
            temp.call(this);
            try {
                _updateABS.call(this);
            } catch (e) {
                console.error(e);
            }
        };
    };

    Game_Map.prototype.setLight = function (x, y, radius, color, bright, isFlicker) {
        try {
            bright = KDCore.SDK.check(bright, 0.0);
            isFlicker = KDCore.SDK.check(isFlicker, false);
            _setLightAt(700, x, y, radius, color, true, bright, isFlicker);
        } catch (e) {
            console.error(e);
        }
    };

    Game_Map.prototype.deleteLight = function (x, y) {
        try {
            _setLightAt(700, x, y, 0, '#FFFFFF', false, 0.0, false);
        } catch (e) {
            console.error(e);
        }
    };

    Game_Variables.prototype.valueXYArrayABS = function () {
        var default_TA = [];
        return this._xyArrayABS || default_TA;
    };

    Game_Variables.prototype.setXYArrayABS = function (value) {
        this._xyArrayABS = value;
    };

    function SaveLightingVariablesABS() {
        try {
            xyLightArray = $gameVariables.valueXYArrayABS();
        } catch (e) {
            console.error(e);
            xyLightArray = [];
        }
    }

    var _Scene_load_onSavefileOk = Scene_Load.prototype.onSavefileOk;
    Scene_Load.prototype.onSavefileOk = function () {
        _Scene_load_onSavefileOk.call(this);
        if (AlphaABS.SYSTEM.EXTENSIONS.LIGHT) {
            if (this._loadSuccess) {
                SaveLightingVariablesABS();
            }
        }
    };
})();