//=============================================================================
// DEV.js
//=============================================================================
//Version 1.0

/*:
 * @plugindesc DEV funcs for testing and debbung new plugins.
 * @author Pheonix KageDesu.
 *
 * @param Show Console
 * @desc Show Console on game Start?
 * @default true
 *
 * @param Skip Title
 * @desc Skip title screen?
 * @default true
 *
 * @help Use it only on PC. 
 * Allow you use Scene_Test class as a parent for test scenes, methods: update_test, create_test 
 * Allow you create comment with text '[@TextToShow]' on event
 *
 */

 "use strict";

var DEV = DEV || {};

(function($) {

	//Read Params
	var parameters = PluginManager.parameters('DEV');
	var pShowConsole = String(parameters['Show Console'] || 'true');
	var pSkipTitle = String(parameters['Skip Title'] || 'true');

	//Aliasing basic methods
	var Aliases = {
		SceneManager: {
		  run: SceneManager.run
		},
		Scene_Boot : {
			start: Scene_Boot.prototype.start
		}
	};

	//------------------------------------------------------------------------------
	 	//SceneManager
	 	SceneManager.run = function(sceneClass) {
	 		Aliases.SceneManager.run.apply(this, arguments);
	 		if(eval(pShowConsole)) this.showConsole();
	 	}

	 	//NEW
	 	SceneManager.showConsole = function() {
	 		//Thanks to Yanfly
	 		if (Utils.isNwjs() && Utils.isOptionValid('test')) {
	 			var _debugWindow = require('nw.gui').Window.get().showDevTools();
			    _debugWindow.moveTo(0, 0);
			    window.focus();
	 		}
	 	}

	 	//END SceneManager
	//------------------------------------------------------------------------------

	//------------------------------------------------------------------------------
	 	//Scene_Boot
	 	Scene_Boot.prototype.start = function() {
	 		if(eval(pSkipTitle))
	 		{
	 			SoundManager.preloadImportantSounds();
			    if (DataManager.isBattleTest()) {
			        DataManager.setupBattleTest();
			        SceneManager.goto(Scene_Battle);
			    } else if (DataManager.isEventTest()) {
			        DataManager.setupEventTest();
			        SceneManager.goto(Scene_Map);
			    } else {
			        this.checkPlayerLocation();
			        DataManager.setupNewGame();
			        SceneManager.goto(Scene_Map);
			    }
	 		}
	 		else
	 			Aliases.Scene_Boot.start.apply(this, arguments);
	 	}
	 	//END Scene_Boot
	//------------------------------------------------------------------------------

	//------------------------------------------------------------------------------
		//NEW
	 	//Scene_Test
	    class Scene_Test extends Scene_Base
	    {
	    	constructor() {
	    		super();
	    	}

	    	create() {
	    		Scene_Base.prototype.create.call(this);
	    		this._draw_background();
	    		this.createWindowLayer();
	    		this.create_test();
	    	}

	    	update() {
	    		Scene_Base.prototype.update.call(this);
	    		this.update_test();
	    		//EXIT
				if(this.isExit()) {
					this.popScene();
				}
	    	}

	    	isExit() { //CAN BE OVERRIDE
	    		return (Input.isTriggered('cancel') || TouchInput.isCancelled()); 
	    	}

	    	create_test() {
	    		//CUSTOM CODE
	    	}

	    	update_test() {
				//CUSTOM CODE
	    	}

	    	//RPIVATE
	    	_draw_background() {
	    		this._backgroundSprite = new Sprite();
		    	this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
		    	this._backgroundSprite.setBlendColor([16, 16, 16, 128]);
		    	this.addChild(this._backgroundSprite);
	    	}

	    }
		//END Scene_Test
	//------------------------------------------------------------------------------

	//Asign Scene_Test to DEV object
	$.Scene_Test = Scene_Test;

})(DEV);

//=============================================================================
//EVENT MESSAGES
//=============================================================================
(function() {

	var FONT_NAME = 'Arial';
	var FONT_SIZE = 16;

	var EventMessages = {
	  structAlias: {
		Game_CharacterBase: {
		  initialize: Game_CharacterBase.prototype.initialize
		},
		Game_Event: {
			setupPageSettings: Game_Event.prototype.setupPageSettings
		},
		Sprite_Character: {
			initialize: Sprite_Character.prototype.initialize,
			update : Sprite_Character.prototype.update
		}
	  }
	};

	Game_CharacterBase.prototype.initialize = function() {
	    EventMessages.structAlias.Game_CharacterBase.initialize.apply(this);
	    this.eText = null;
	};

	Game_Event.prototype.setupPageSettings = function() {
		EventMessages.structAlias.Game_Event.setupPageSettings.apply(this);
		if (this.list != null) {
			var lst = this.page().list;
			for (var i = 0; i < lst.length; i++) {
				var element = lst[i];
         		if (element.code == 108) {
         			var comment = element.parameters[0];
         			if(comment.indexOf("[@") >= 0) { 
         				var regular = /\[@([^>]*)\]/;
         				var match = regular.exec(comment);
         				if(match) {
         					this.eText = match[1];
         				}
         				break;
         			}
         		}
			}
		}
	}

	Sprite_Character.prototype.initialize = function(character) {
		EventMessages.structAlias.Sprite_Character.initialize.apply(this, arguments);
		this._charText = "";
		this._eventText = null; //Sprite
		this.createEventText();
	}

	Sprite_Character.prototype.update = function() {
		EventMessages.structAlias.Sprite_Character.update.apply(this);
		this.createEventText();
		this.updateEventText();
	}

	//NEW
	Sprite_Character.prototype.createEventText = function() {
		if(!this._character) return;
		if(!this._character.eText) return;
		if(this._character.eText == this._charText) return;

		if(this._eventText != null) {
			this.removeChild(this._eventText);
		}

		this._eventText = new Sprite_Character_Text(this._character, this);
		this._charText = this._character.eText;
		this.addChild(this._eventText);
	}

	//NEW
	Sprite_Character.prototype.updateEventText = function() {
		if(this._eventText == null) return;
		this._eventText.updatePosition(this._character, this);
	}

	//------------------------------------------------------------------------------
	 	//Sprite_Character_Text
		class Sprite_Character_Text extends Sprite_Base
		{
			constructor(character, sprite)
			{
				super();
				var textSize = character.eText || "";
				var w = 48 + ((FONT_SIZE/2) * textSize.length);
				if(w < 48) w = 48;
				this.bitmap = new Bitmap(w, 48);
				this.bitmap.addLoadListener(function()
				{
					this.bitmap.fontFace = FONT_NAME;
					this.bitmap.fontSize = FONT_SIZE;
					this.bitmap.drawText(textSize, 0, 0, this.width, this.height, 'center');
				}.bind(this));
				this.updatePosition(character, sprite);
			}

			updatePosition(character, sprite)
			{
				if(character._erased) {
					this.visible = false;
					return;
				}
				this.x = 0 - this.width / 2;
				this.y = 0 - (sprite.height + this.height);
				this.z = character.screenZ();
				this.visible = character.isTransparent() ? false : true;
				this.opacity = character._opacity;
			}
		}
		//END Sprite_Character_Text
	//------------------------------------------------------------------------------
})();