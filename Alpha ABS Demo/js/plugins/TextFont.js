//=============================================================================
// TextFont.js
//=============================================================================
//Version 1.1

/*:
 * @plugindesc Change font for game messages.
 * @author Pheonix KageDesu
 *
 * @help 
 *
 * Plugin commands:
 * 	Font Arial # All messages after this command will be printed in Arial font.
 * 	Font # All messages after this command wiil be printed in standart font.
 *
 * Custom fonts must be installed in OS or take place in a fonts folder.
 */

/*:ru
 * @plugindesc Установка шрифта для сообщений.
 * @author Pheonix KageDesu
 *
 * @help 
 *
 * Команды: (В событии "Команда доп. модуля", 3 страница)
 * 	Font Arial - все сообщения после команды будут со шрифтом Arial.
 * 	Font - все сообщения после команды будут со стандартным шрифтом.
 *
 * Шрифты должны быть установлены в системе или находится в папке fonts.
 */


(function() {

	var msgFont = null;
    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'Font') {
        	msgFont = args[0] || null;
        }
    };

    var PKD_structAlias = {
         Scene_Boot: {
            loadSystemImages: Scene_Boot.prototype.loadSystemImages,
            isGameFontLoaded: Scene_Boot.prototype.isGameFontLoaded
         },
         Window_Base: {
            processNormalCharacter: Window_Base.prototype.processNormalCharacter
         }
     };

    //------------------------------------------------------------------------------
        //Scene_Boot
        Scene_Boot.prototype.loadSystemImages = function() {
            PKD_structAlias.Scene_Boot.loadSystemImages.apply(this);
            FontLoadManager.init();
            FontLoadManager.loadAll();
         };

         Scene_Boot.prototype.isGameFontLoaded = function() {
            var result = (PKD_structAlias.Scene_Boot.isGameFontLoaded.apply(this) && FontLoadManager.isReady());
            return result;
        };
        //END Scene_Boot
     //------------------------------------------------------------------------------

    //------------------------------------------------------------------------------
        //Window_Base
	Window_Base.prototype.processNormalCharacter = function(textState) {
		if(msgFont != null) {
			console.log(msgFont);
    		this.contents.fontFace = msgFont;
    	}
        PKD_structAlias.Window_Base.processNormalCharacter.apply(this, arguments);
	};

        //END Window_Base
    //------------------------------------------------------------------------------

    //------------------------------------------------------------------------------
        //FontLoadManager
        FontLoadManager = function() {
            throw new Error('This is a static class');
        }

        FontLoadManager.init = function() {
            var fs = require('fs');
            this._files = fs.readdirSync(this.localFileDirectoryPath());
            this._ready = false;
        }

        FontLoadManager.isReady = function() {
            return (this._ready == true);
        }

        FontLoadManager.loadAll = function() {
            for(var i = 0; i<this._files.length; i++) {
                if(this._files[i].includes('.ttf') || this._files[i].includes('.TTF')) {
                    console.log("Load font " + this._files[i]);
                    Graphics.loadFont(this._files[i].substring(0, this._files[i].length - 4), this.localFileDirectoryPath() + this._files[i]);
                }
            }
            this._ready = true;
        }

        FontLoadManager._localFileDirectoryPath = null;
        FontLoadManager.localFileDirectoryPath = function()
        {
            if(this._localFileDirectoryPath == null)
            {
                var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/fonts/');
                if (path.match(/^\/([A-Z]\:)/)) {
                    path = path.slice(1);
                }
                this._localFileDirectoryPath = decodeURIComponent(path);
            }
            return this._localFileDirectoryPath;
        }
        //END FontLoadManager
    //------------------------------------------------------------------------------

})();