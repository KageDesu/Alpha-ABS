//=============================================================================
// TempScripts.js
//=============================================================================

/*:
 * @plugindesc This is temp scripts for DEMO (ONLY!)
 * @author Pheonix KageDesu.
 *
 *
 * @help DONT USE THIS FILE IN YOUR PROJECT!!!!! 
 * WILL BE A LOT OF BUGS!!! 
 * THIS IS ONLY FOR ABS DEMO GAME
 *
 */
 
 /*:ru
 * @plugindesc Свалка быстрых правок и доработок
 * @author Pheonix KageDesu.
 *
 *
 * @help НЕ ИСПОЛЬЗУЙТЕ ЭТО В СВОЁМ ПРОЕКТЕ!!! 
 * БУДЕТ КУЧА ОШИБОК!!! 
 * ЭТО ТОЛЬКО ДЛЯ ДЕМО ИГРЫ!!!
 *
 */

"use strict";

SDK._isRu = null; //Don't use this
SDK.isRU = function () {
    if (this._isRu == null) {
        this._isRu = 0;
        var language = window.navigator.userLanguage || window.navigator.language;
        if (language) {
            if (language.toLowerCase().contains('ru'))
                this._isRu = 1;
        }
    }
    return this._isRu;
};

if(!PLATFORM) throw new Error('Requires JSPlatform ver 1.2 or above');
var SDK = PLATFORM.SDK;
var Color = PLATFORM.Color;
//SDK._isRu = 0;
//==========================================================================================================================================================
//RESOLUTION
//==========================================================================================================================================================
//This plugin not done yet!!! 
(function() {
    SceneManager._screenWidth  = 1280;
    SceneManager._screenHeight = 720;
    SceneManager._boxWidth     = SceneManager._screenWidth;
    SceneManager._boxHeight    = SceneManager._screenHeight; 

    var _resolutionON = false;

    var _SceneManager_run = SceneManager.run;
    SceneManager.run = function(sceneClass) {
        _SceneManager_run.call(this, sceneClass);
        if (Utils.isMobileDevice()) return;
        if (Utils.isMobileSafari()) return;
        if (Utils.isAndroidChrome()) return;
        var resizeWidth = Graphics.boxWidth - window.innerWidth;
        var resizeHeight = Graphics.boxHeight - window.innerHeight;
        window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
        window.resizeBy(resizeWidth, resizeHeight);

        if(SceneManager._screenWidth > (816 + 64) || SceneManager._screenHeight  > (624 + 64)) {
            _resolutionON = true;
            Resolution.setup();
        }
    };

    var Resolution = function() {
        throw new Error('This is a static class');
    }

    Resolution.SW = 816;
    Resolution.SH = 624;

    Resolution.isOn = function() {
        return (_resolutionON == true);
    }

    Resolution.setup = function() {
        this.startX = (Graphics.width - Resolution.SW) / 2;
        this.startY = (Graphics.height - Resolution.SH) / 2;
    }

    Resolution.realX = function(x,w) {
        if(x > Resolution.SW) {
            var z = Graphics.width - (x + w);
            if(z >= 0) {
                var z2 = this.realW() - w;
                return z2 - Math.abs(z);
            }
        } else
            return this.startX + x;
    }

    Resolution.realY = function(y, h) {
        if(y > Resolution.SH) {
            var z = Graphics.height - (y + h);
            if(z >= 0) {
                var z2 = this.realH() - h;
                return z2 - Math.abs(z);
            }
        } else
            return this.startY + y;
    }

    Resolution.realH = function() {
        return (Graphics.height - this.startY);
    }

    Resolution.realW = function() {
        return (Graphics.width - this.startX);
    }


    Resolution.realDimensionW = function(value) {
        if(value == Graphics.width) {
            return Resolution.SW;
        } 

        if(value > Resolution.SW) {
            var z = value - Resolution.SW;
            value = Resolution.SW - z;
            return value;
        }

        return value; 
    }

    Resolution.realDimensionH = function(value) {
        if(value == Graphics.height) {
            return Resolution.SH;
        }

        if(value > Resolution.SH) {
            var z = value - Resolution.SH;
            value = Resolution.SH - z;
            return value;
        }

        return value;
    }

    var _alias4342 = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(x, y, width, height) {
        _alias4342.call(this, x,y,width,height);
        this.needStrongWH = true; //Don't apply realDimension function
    }

	Window_Base.prototype.toCenterR = function() {
        if(!Resolution.isOn()) return;
        var newX = Resolution.realX(this.x, this.width);
        var newY = Resolution.realY(this.y, this.height);
        var newW = this.width;
        var newH = this.height;
        if(this.needStrongWH == false) {
            newW = Resolution.realDimensionW(this.width);
            newH = Resolution.realDimensionH(this.height);

            if((newW + newX) > Resolution.SW) {
                newW = newW - Math.abs((Resolution.SW + Resolution.startX) - (newW + newX));
            }

            if((newH + newY) > Resolution.SH) {
                newH = newH - Math.abs((Resolution.SH + Resolution.startY) - (newH + newY));
            }
        }
        this.move(newX,newY,newW,newH);
    }

    var _aliasSB09888 = Scene_MenuBase.prototype.createHelpWindow;
    Scene_MenuBase.prototype.createHelpWindow = function() {
        _aliasSB09888.call(this);
        this._helpWindow.needStrongWH = false;
        this._helpWindow.toCenterR();
    };

    var _alias5949 = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _alias5949.call(this);
        this._commandWindow.toCenterR();
    }

    var _alias7644 = Scene_Menu.prototype.createGoldWindow;
    Scene_Menu.prototype.createGoldWindow = function() {
        _alias7644.call(this);
        this._goldWindow.toCenterR();
    }

    var _alias76446 = Scene_Menu.prototype.createStatusWindow;
    Scene_Menu.prototype.createStatusWindow = function() {
        _alias76446.call(this);
        this._statusWindow.needStrongWH = false;
        this._statusWindow.toCenterR();
    }

    var _aliasSE_43242 = Scene_Equip.prototype.createStatusWindow;
    Scene_Equip.prototype.createStatusWindow = function() {
        _aliasSE_43242.call(this);
        this._statusWindow.toCenterR();
    }

    var _aliasSE_32122 = Scene_Equip.prototype.createCommandWindow;
    Scene_Equip.prototype.createCommandWindow = function() {
        var x = Graphics.boxWidth; 
        Graphics.boxWidth = Resolution.SW;
        _aliasSE_32122.call(this);
        Graphics.boxWidth = x;
        if(!Resolution.isOn()) return;
        this._commandWindow.needStrongWH = true;
        this._commandWindow.toCenterR();
    }

    var _aliasSE_36555 = Scene_Equip.prototype.createSlotWindow;
    Scene_Equip.prototype.createSlotWindow = function() {
        _aliasSE_36555.call(this);
        if(!Resolution.isOn()) return;
        var wy = this._commandWindow.y + this._commandWindow.height;
        this._slotWindow.needStrongWH = false;
        this._slotWindow.toCenterR();
        this._slotWindow.y = wy;
    }

    var _aliasSE_54333 = Scene_Equip.prototype.createItemWindow;
    Scene_Equip.prototype.createItemWindow = function() {
        _aliasSE_54333.call(this);
        if(!Resolution.isOn()) return;
        this._itemWindow.needStrongWH = false;
        this._itemWindow.toCenterR();
        this._itemWindow.height = this._itemWindow.height + Resolution.startY;
        this._itemWindow.y = this._statusWindow.y + this._statusWindow.height;
    }

    var _aliasSI_54333 = Scene_Item.prototype.createCategoryWindow;
    Scene_Item.prototype.createCategoryWindow = function() {
        var x = Graphics.boxWidth; 
        Graphics.boxWidth = Resolution.SW;
        _aliasSI_54333.call(this);
        Graphics.boxWidth = x;
        this._categoryWindow.needStrongWH = false;
        this._categoryWindow.toCenterR();
    }

    var _aliasSI_65765 = Scene_Item.prototype.createItemWindow;
    Scene_Item.prototype.createItemWindow = function() {
        _aliasSI_65765.call(this);
        if(!Resolution.isOn()) return;
        this._itemWindow.needStrongWH = false;
        this._itemWindow.toCenterR();
        this._itemWindow.height = this._itemWindow.height + Resolution.startY;
        this._itemWindow.y =  this._categoryWindow.y + this._categoryWindow.height;

        if(Imported && Imported.AlphaABS) {
            this._itemWindow._absPanel.x = this._itemWindow.width - Resolution.startX - this._itemWindow._absPanel.width;
            this._itemWindow._absPanel.y = this._itemWindow.height - this._itemWindow._absPanel.height - 10;
            this._itemWindow._absPanel.visible = true;
        }

        this._itemWindow.refresh();

    }

    var _alias432423 = Scene_Skill.prototype.createSkillTypeWindow;
    Scene_Skill.prototype.createSkillTypeWindow = function() {
        _alias432423.call(this);
        this._skillTypeWindow.toCenterR();
    }

    var _alias4324232 = Scene_Skill.prototype.createStatusWindow;
    Scene_Skill.prototype.createStatusWindow = function() {
        _alias4324232.call(this);
        this._statusWindow.needStrongWH = false;
        this._statusWindow.toCenterR();
    }

    var _alias43242322 = Scene_Skill.prototype.createItemWindow;
    Scene_Skill.prototype.createItemWindow = function() {
        _alias43242322.call(this);
        this._itemWindow.needStrongWH = false;
        this._itemWindow.toCenterR();
        if(!Resolution.isOn()) return;
        this._itemWindow.height = this._itemWindow.height + Resolution.startY;
        this._itemWindow.y =  this._statusWindow.y + this._statusWindow.height;

        if(Imported && Imported.AlphaABS) {
            this._itemWindow._absPanel.x = this._itemWindow.width - Resolution.startX - this._itemWindow._absPanel.width;
            this._itemWindow._absPanel.y = this._itemWindow.height - this._itemWindow._absPanel.height - 10;
        }
    }

    var _aliasSS_4324 = Scene_Status.prototype.create;
    Scene_Status.prototype.create = function() {
        _aliasSS_4324.call(this);
        this._statusWindow.needStrongWH = false;
        this._statusWindow.toCenterR();
    }

})();
//==========================================================================================================================================================
//TITLE
//==========================================================================================================================================================

var _alias3443433 = VPS_DynamicWeatherSystem.prototype._updateSprite;
VPS_DynamicWeatherSystem.prototype._updateSprite = function(sprite) {
	if(this.type == 'title') {
		$gameSystem._useDimmer = false;
		 this._updateTitle(sprite);
		 if (sprite.opacity < 40) {
            this._rebornSprite(sprite);
        }
	} else
		_alias3443433.call(this, sprite);

}

var _alias56543 = VPS_DynamicWeatherSystem.prototype._createBitmaps;
VPS_DynamicWeatherSystem.prototype._createBitmaps = function() {
	_alias56543.call(this);
	this._titleBitmap = ImageManager.loadDWSWeathers('title');
}

VPS_DynamicWeatherSystem.prototype._updateTitle = function(sprite) {
	this.updateAutumnLeaf(sprite);
	sprite.bitmap = this._titleBitmap;
}

var _alias90903243 = Window_TitleCommand.prototype.initialize;
Window_TitleCommand.prototype.initialize = function() {
    _alias90903243.call(this);
    this._stepY = 100;
    this.opacity = 0;
};

Window_TitleCommand.prototype.windowWidth = function() {
    return 400;
};

Window_TitleCommand.prototype.updatePlacement = function() {
    //this.x = (Graphics.boxWidth - this.width) / 2;
    this.x = 100;
    this.y = this._stepY + (Graphics.boxHeight - this.height - 96);
    this._stepY -= 1;
};

var _alias4343434 = Window_TitleCommand.prototype.update;
Window_TitleCommand.prototype.update = function() {
	_alias4343434.call(this);
	if(this._stepY > 0)
		this.updatePlacement();
}

Window_TitleCommand.prototype.makeCommandList = function() {
    this.addCommand(['Start','Начать'][SDK.isRU()],   'newGame');
    //this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
    //this.addCommand(TextManager.options,   'options');
};

Window_TitleCommand.prototype.itemRectForText = function(index) {
    //var rect = this.itemRect(index);
    //rect.x += this.textPadding();
    //rect.width -= this.textPadding() * 2;
    var rect = new Rectangle();
    rect.width = this.windowWidth();
    rect.height = 40;
    rect.x = index % this.maxCols() * (rect.width + this.spacing()) - this._scrollX;
    rect.y = Math.floor(index / this.maxCols()) * this.itemHeight() - this._scrollY;
    return rect;
};


Window_TitleCommand.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.contents.fontSize = 32;
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

Window_TitleCommand.prototype.selectLast = function() {
   
};

Window_TitleCommand.prototype._refreshCursor = function() {
	var pad = this._padding;
	var y = this._cursorRect.y + pad - this.origin.y;
	var y2 = y + this._cursorRect.height;
	var w2 = this._cursorRect.width;
	var h2 = 2;
	var bitmap = new Bitmap(w2, h2);
    this._windowCursorSprite.bitmap = bitmap;
    this._windowCursorSprite.setFrame(0, 0, w2, h2);
    this._windowCursorSprite.move(0,y2);
    bitmap.fillRect(0,0,bitmap.width, bitmap.height, new Color(120,120,120).CSS);
}

Scene_Title.prototype.drawGameTitle = function() {
    var x = 40;
    var y = 40;//Graphics.height / 4;
    var maxWidth = Graphics.width - x * 2;
    var text = ["Alpha ABS Demo","Alpha ABS Демо"][SDK.isRU()];
    this._gameTitleSprite.bitmap.outlineColor = 'black';
    this._gameTitleSprite.bitmap.outlineWidth = 8;
    this._gameTitleSprite.bitmap.fontSize = 64;
    this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, 'left');
};

var _alias43443 = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_alias43443.call(this);

	if(this._timer > 0) {
		this._timer -= 1;
		if(this._timer == 0) {
			AudioManager.stopBgm();
			this._weatherPlus.type = 'none';
		}
	}

	this._weatherPlus.type = 'title';
    this._weatherPlus.power = 1;
    this._weatherPlus.origin.x = 100;
    this._weatherPlus.origin.y = 100;
}

Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TitleCommand();
    this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
    this.addWindow(this._commandWindow);

    this._weatherPlus = new VPS_DynamicWeatherSystem();
    this.addChild(this._weatherPlus);

    this._timer = 18 * 60;

};

//==========================================================================================================================================================
//POPUP MESSAGE WINDOW
//==========================================================================================================================================================
(function() {
    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'PKD') {
             switch (args[0]) {
	            case 'test':
					//SceneManager.push(Test_Scene);
	            break;
	            case 'ShowPopMsg':
	            	this._needSmallMsg = true;
	            	this._smallMsgTime = args[1] || 3;
	            	//var time = args[1];
	            	//$gameMessage.add('Some tee please');
	            	//SceneManager._scene.showSmallMsg(12,'some tea please onegai\n demo shiranaku arimasen', 3);
	            break;
	        }
        }
    };

    var _Game_Interpreter_command101 =
            Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function() {
    	if(this._needSmallMsg)
    	{
    		if(this.nextEventCode() === 401) {
    			this._index++;
    			var text = this.currentCommand().parameters[0];
    			SceneManager._scene.showSmallMsg(this._eventId ,text, this._smallMsgTime);
    			this.wait(10 + this._smallMsgTime * 60);
    			this._needSmallMsg = false;
    			return true;
    		}
    		return false;

    	} else
    		return _Game_Interpreter_command101.call(this);
    }


    var xxx = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
    	xxx.call(this);
    	if(this._interpreter != null) {
    		this._interpreter._eventId = this._eventId;
    	}
    }

	//------------------------------------------------------------------------------
	 	//Test Scene
	    /*class Test_Scene extends PKD_Scene_Test
		{
			create_test()
		 	{

		 	}

		 	update_test()
		 	{

		 	}
		}*/
		//END Test Scene
	//------------------------------------------------------------------------------

	//------------------------------------------------------------------------------
	 	//Small message window
		class PKD_Window_Message_Small extends Window_Message
		{
			constructor()
			{
				super();
				this._textX = null;
				this._timeX = null;
				this._textSize = 0;

				this._popSprite = new Sprite(ImageManager.loadPicture('windowPopUp'));
				this._popSprite.anchor.x = 0.5;
				this.addChild(this._popSprite);
			}

			setup(params)
			{
				this._event = $gameMap.event(params.evId);
				if(Imported.YEP_MessageCore) {
					this._textX = '\\fs[18]' + params.text;
				} else
					this._textX = '\\}\\}\\}' + params.text;
				this._timeX = params.time * 60;
				this._terminated = false;
				this.startMessage();
			}

			windowWidth() {
				return 220;
			}

			numVisibleRows() {
				return 1;
			}

			calcMsgTextSize() { //PRIVATE
				var w = 48 + (6 * this._textState.text.length);
				if(w < 48) w = 48;
				this._textSize = 2;
			}

			canStart() {
				return (this._textX != null);
			}

			startMessage() {
				this._textState = {};
			    this._textState.index = 0;
			    this._textState.text = this.convertEscapeCharacters(this._textX);	
			    this.calcMsgTextSize();		
			    this.newPage(this._textState);
			    this.updatePlacement();
			    this.updateBackground();
			    this.open();
			}

			update() {
				if($gameMessage.isBusy()) {
					this.close();
					Window_Base.prototype.update.call(this);
					return;
				}

				 Window_Base.prototype.update.call(this);
				 this.checkToNotClose();
				 this.updatePlacement();
				 while (!this.isOpening() && !this.isClosing())
				 {
			        if (this.updateWait()) {
			            return;
			        } else if (this.updateMessage()) {
			            return;
			        } else if (this.canStart()) {
			            this.startMessage();
			        } else {
			            return;
			        }
			    }
			}

			updateMessage() {
				if (this._textState) {			
			        while (!this.isEndOfText(this._textState)) {
			            this.processCharacter(this._textState);
			            /*if (!this._showFast && !this._lineShowFast) {
			                break;
			            }
			            if (this.pause || this._waitCount > 0) {
			                break;
			            }*/
			        }
			        if (this.isEndOfText(this._textState)) {
			            this.onEndOfText();
			        }
			        return true;
			    } else {
			        return false;
			    }
			}

			updatePlacement() {
				if(this._event) {
					this.x = this._event.screenX() - this.width / 2; 
					this.y = this._event.screenY() - (48 + this.height);
					this._popSprite.x = this.width/2;
					this._popSprite.y = this.height;
				}
			}

			updateBackground() {
				this.setBackgroundType(0);
			}

			onEndOfText() {
				if(this._timeX > 0)
					this._timeX -= 1;

				if(this._timeX <= 0) {
					this._textState = null;
					this.terminateMessage();
				}
			}

			isTerminated() {
				return (this._terminated === true);
			}

			terminateMessage() {
				this.close();
				this._terminated = true;
			}

		}
		//END Small message window
	//------------------------------------------------------------------------------

//Aliasing template 1
	var PKD = {};
	PKD.MessagePopWindow = {
	  structAlias: {
		Scene_Map: {
		  create: Scene_Map.prototype.create,
		  update: Scene_Map.prototype.update
		},
		Window_Base: {
			convertEscapeCharacters: Window_Base.prototype.convertEscapeCharacters
		}
	  }
	};

	Scene_Map.prototype.create = function() {
	    PKD.MessagePopWindow.structAlias.Scene_Map.create.apply(this);
	    this._popMessages = [];
	};

	Scene_Map.prototype.update = function() {
		 PKD.MessagePopWindow.structAlias.Scene_Map.update.apply(this);
		 
		 this._popMessages.forEach(function(ww) {
		 	if (ww==null) return;
		 	if(ww.isTerminated()) {
		 		this._windowLayer.removeChild(ww);
		 		//this._popMessages.delete(ww);
		 	}
		 }.bind(this));
	}


	Scene_Map.prototype.showSmallMsg = function(evId,text,time) {
		var msgWindow = new PKD_Window_Message_Small();
		msgWindow.setup({evId: evId, text:text, time:time});
		this.addWindow(msgWindow);
		this._popMessages.push(msgWindow);
	}

	Window_Base.prototype.convertEscapeCharacters = function(text) {
		text = text.replace(/\\/g, '\x1b');
		if(Imported.YEP_MessageCore) {
			text = text.replace(/\x1bRN\[(\d+)\]/gi, function() {
				var t = this.actorName(parseInt(arguments[1]));
				return '\\>\\n<\\C[2]' + t + '\\C[0]>\\af['+ arguments[1]  +']\\<';
			}.bind(this));
		} else {
			text = text.replace(/\x1bRN\[(\d+)\]/gi, function() {
				var t = this.actorName(parseInt(arguments[1]));
				return '\\>\\C[2]' + t + '\\C[0]\\<';
			}.bind(this));
		}
		return PKD.MessagePopWindow.structAlias.Window_Base.convertEscapeCharacters.call(this, text);
	}

	//------------------------------------------------------------------------------
	 	//Temp
			//code this...
		//END Temp
	//------------------------------------------------------------------------------

//==========================================================================================================================================================
//SYSTEM EVENTS
//==========================================================================================================================================================
var _alias5888888 = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_alias5888888.call(this);
	var image = this.page().image;
	 if (image.tileId <= 0) {
	 	if(image.characterName == "SystemIcons") {
	 		this.setImage('', 0);
	 		this.setThrough(true);
	 	}
	 } 
}

})();

//==========================================================================================================================================================
//OBJECTIVE NOTIFY
//==========================================================================================================================================================

(function() {

	var NotifyMachine = AlphaABS.LIBS.NotifyMachine;
    var ItemLineSprite = AlphaABS.LIBS.ItemLineSprite;

	//ImageManager.getIcon(ImageManager.ICON_PATH, 'mission', 32);

	var _notifyMachine = null;
	var addMission = function(id) {
		var events = $gameMap.events();
		var event = null;
		events.forEach(function(ev) {
			if(ev.event().name == '@Missions') {
				event = ev;
			}
		});
		var text = '';
		if(event) {
			var list = event.event().pages[0].list;
			list.forEach(function(cmd) {
				if(cmd.code == 108) {
					var parts = cmd.parameters[0].split('_');
					if(parts.length > 1) {
						if(parts[0] == id) {
							if(SDK.isRU()) {
								if(parts[2]) {
									text = parts[1];
								}
							} else {
								if(!parts[2])
									text = parts[1];
							}
						}
					}
				}
			});
		}
		var item = new ItemLineSpriteExt(text, 'mission');
		if(_notifyMachine && text != '') {
			_notifyMachine.push(item);
		}
	}

	var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'PKD') {
             switch (args[0]) {
	            case 'mission':
                    addMission(parseInt(args[1]));
	            break;
	        }
        }
    };

    class ItemLineSpriteExt extends ItemLineSprite {
    	width() {
            return 180;
        }

        height() {
            return 32;
        }

    	 _drawText() {
            var startX = this._iconSymbol != null ? 34 : 0;
            this._drawSurface.bitmap.textColor = this._textColor.CSS;
            this._drawSurface.bitmap.fontSize = 20;
            this._drawSurface.bitmap.outlineWidth = 2;
            this._drawSurface.bitmap.drawText(this._text, startX + 2, this.height()/2, this.width() - startX - 4, 1, 'left');
        }

        _drawIcon() {
            this._drawSurface.bitmap.drawIcon(0, 0, this._iconSymbol, 32);
        }
    }

    var _Scene_Map_createSpriteset321 = Scene_Map.prototype.createSpriteset;
	Scene_Map.prototype.createSpriteset = function() {
	    _Scene_Map_createSpriteset321.call(this);
	    var w = 180;
	    var h = 32; 
	    var lines = 3;
	    var xx = Graphics.width - w - 4;
	    var yy = (h + 5) * lines;
	    _notifyMachine = new NotifyMachine(xx,yy, w, h, lines);
	    this.addChild(_notifyMachine);
	};

})();

//==========================================================================================================================================================
//PICTURE PLAYER
//==========================================================================================================================================================


(function() {

	var SDK = PLATFORM.SDK;
	var Color = PLATFORM.Color;
    var LOG = new PLATFORM.DevLog("PP");
    //var Timer = new PLATFORM.LIB.PTimer;

	var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'PP') {
             switch (args[0]) {
	            case 'play':
                    var size = parseInt(args[1]) || 1; 
                    var speed = parseInt(args[2]) || 20;
	            	PicturePlayer.start(size, speed);
	            break;
                case 'stop':
                    PicturePlayer.stop();
                break;
                case 'stopM':
                    _videoSurface.stopVideo();
                break;
	        } 
        } 
    };

    class VideoWindow extends Window_Base {
        constructor() {
            super(0,0,1,1);
            this.visible = false;
        }

        playVideo(src) {
            if(this._surface)
                this.stopVideo();
            this._surface = new PIXI.Sprite(PIXI.Texture.fromVideo(src));
            this._surface._texture.baseTexture.on('loaded', function() {
                this.width = this._surface.width + 20;
                this.height = this._surface.height + 20;
                this.x = (Graphics.width/2) - this.width/2;
                this.y = (Graphics.height/2) - (this.height/2) - 120;
                this._surface._texture.baseTexture.source.loop = true;
            }.bind(this));

            this.addChild(this._surface);
            this._surface.x = 10;
            this._surface.y = 10;
            this.visible = true;
        }

        stopVideo() {
            if(this._surface) {
                this.removeChild(this._surface);
                this._surface = null;
            }
            this.visible = false;
        }
    }

    class PicturePlayerScreen extends Window_Base {
        constructor() {
            super(0,0, 10, 10);
            this._images = [];
            this._timerPP = new Game_TimerABS();
            this.clearImages();
        }

        windowWidth() {
            if(this._images.length > 0) {
                return ((this._images[0].width) * this._images[0].scale.x) + 20;
            } else 
                return 1;
        }

        windowHeight() {
            if(this._images.length > 0) {
                return ((this._images[0].height) * this._images[0].scale.y) + 20;
            } else
                return 1;
        }

        loadImages(pictures) {
            this.clearImages();
            var first = true;
            pictures.forEach(function(item) {
                var sprite = new Sprite(item);
                if(first) {
                    sprite.bitmap.addLoadListener(function(b){
                        this.width = this.windowWidth();
                        this.height = this.windowHeight();
                        if(this._needCenter) {
                            this.x = this._startX - this.windowWidth()/2;
                            this.y = this._startY - this.windowHeight()/2;;
                        }
                    }.bind(this));
                    first = false;
                }
                this._images.push(sprite);
                sprite.visible = false;
                sprite.x = 10;
                sprite.y = 10;
                this.addChild(sprite);
            }.bind(this));
        }

        moveScreen(x,y) {
            this.x = x;
            this.y = y;
        }

        scale(w,h) {
            this._images.forEach(function(item) {
                item.scale.x = w;
                item.scale.y = h;
            });
        }

        setOnCenter() {
            this._needCenter = true;
            this._startX = this.x;
            this._startY = this.y;
        }

        play(speed) {
            this.visible = true;
            this._speed = SDK.check(speed, 20);
            if(this._images.length > 0) {
                this._started = true;
                this._timerPP.start(1);
            }
        }

        clearImages() {
            this.visible = false;
            this._needCenter = false;
            this._started = false;
            this._index = 0;
            this._speed = 20;
            this._images.forEach(function(item) {
                this.removeChild(item);
            }.bind(this));
            this._images = [];
        }

        update() {
            //super();
            if(this._started) {
                /*this.width = this.windowWidth();
                this.height = this.windowHeight();
                if(this._needCenter) {
                    this.x = this._startX - this.windowWidth()/2;
                    this.y = this._startY - this.windowHeight()/2;;
                }*/
                this._updateShow();
            }
        }

        //PRIVATE
        _updateShow() {
            this._timerPP.update();
            this._images.forEach(function(item) {
                item.visible = false;
            });
            this._images[this._index].visible = true;
            if(this._timerPP.isReady()) {
                this._timerPP.start(this._speed);
                this._index++;
                if(this._index == this._images.length) {
                    this._index = 0;
                }
            }

        }
    }


    function PicturePlayer() {
        throw new Error('This is a static class');
    }

    PicturePlayer.show = function(x,y, picture, scaleX, scaleY, origin) {
        this._scale = [scaleX / 100, scaleY / 100];
        this._createSheet(picture);
        this._configSheet(x,y);
        if(origin == 1) {
            this.screen.setOnCenter();
        }
        this.screen.play(this._speed);
    }

    PicturePlayer.isNeedPlay = function() {
        return (this.needPlay == true);
    }

    PicturePlayer.start = function(size, speed) {
        this._size = size;
        this._speed = speed;
        this.needPlay = true;
    }

    PicturePlayer.stop = function() {
        this.screen.clearImages();
        this.needPlay = false;
    }

    PicturePlayer.init = function(screen) {
        this.screen = screen;
        this.stop();
    }

    PicturePlayer._createSheet = function(name) {
        LOG.p("Create sheet")
        var items = ImageManager.loadPPSheet(name, this._size);
        this.screen.loadImages(items);
    }

    PicturePlayer._configSheet = function(x,y) {
        this.screen.moveScreen(x,y);
        this.screen.scale(this._scale[0], this._scale[1]);
    }

    ImageManager.loadPPSheet = function(filename, size) {
        LOG.p("LOAD PP SHEET");
        if(filename) {

            if(!this._ppCache) {
                this._ppCache = {};
            }
            if(this._ppCache[filename]) {
                return this._ppCache[filename];
            }

            var items = [];
            var folder = 'img/pictures/';
            var index = 0;
            var path = folder + encodeURIComponent(filename) + '.png';
            var bitmap = this.loadNormalBitmap(path, 0);
            items.push(bitmap);
            folder = 'img/pictures_stack/'
            while(index < (size - 1)) {
                index++;
                path = folder + encodeURIComponent(filename) + '_' + index + '.png';
                bitmap = this.loadNormalBitmap(path, 0);
                items.push(bitmap);
            }
            this._ppCache[filename] = items;
            return items;
        } else 
            return [this.loadEmptyBitmap()];

        //return this.loadBitmap('img/pictures/', filename, hue, true);
    };

    // Show Picture
    var _GI_cmd231 = Game_Interpreter.prototype.command231;
    Game_Interpreter.prototype.command231 = function() {
        if(PicturePlayer.isNeedPlay()) {
            var x,y;
             if (this._params[3] === 0) {  // Direct designation
                x = this._params[4];
                y = this._params[5];
            } else {  // Designation with variables
                x = $gameVariables.value(this._params[4]);
                y = $gameVariables.value(this._params[5]);
            }
            PicturePlayer.show(x,y,this._params[1],this._params[6], this._params[7], this._params[2]);
            return true;
        } else
            return _GI_cmd231.call(this);
    }

    // Play Movie
    Game_Interpreter.prototype.command261 = function() {
        if (!$gameMessage.isBusy()) {
            var name = this._params[0];
            if (name.length > 0) {
                var ext = this.videoFileExt();
                //Graphics.playVideo('movies/' + name + ext); 
                if(_videoSurface) {
                    _videoSurface.playVideo('movies/' + name + ext);
                }
                //this.setWaitMode('video');
            }
            this._index++;
        }
        return false;
    };

    var _videoSurface = null;
    var _alias93302 = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _alias93302.call(this);
        var _picturePlayerScreen = new PicturePlayerScreen();
        PicturePlayer.init(_picturePlayerScreen);
        this.addWindow(_picturePlayerScreen);

        _videoSurface = new VideoWindow();
        this.addWindow(_videoSurface);
    }

})();


//==========================================================================================================================================================
//LANG EXTENDER
//==========================================================================================================================================================



(function() {

    var SDK = PLATFORM.SDK;
    var Color = PLATFORM.Color;
    var LOG = new PLATFORM.DevLog("LANG");

    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'PKD') {
             switch (args[0]) {
                case 'lang':
                    this._switchLang();
                    LOG.p("Lang mode switched to " + this._langMode);
                break;
            }
        }
    };

    var _Game_Interpreter_clear = Game_Interpreter.prototype.clear;
    Game_Interpreter.prototype.clear = function() {
        _Game_Interpreter_clear.call(this);
        this._langSetup();
    }

    var _Game_Interpreter_initialize = Game_Interpreter.prototype.initialize;
    Game_Interpreter.prototype.initialize = function(depth) {
        //this._langBranches = []; //Это за 102 (работает, но много места занимает)
        //this._langBranches2 = [];
        _Game_Interpreter_initialize.call(this, depth);
        this._langSetup();
    }

    Game_Interpreter.prototype._langSetup = function() {
        this._currentLangID = SDK.isRU(); //English (1 - Russian)
        this._langMode = false;
        this._langSkipNext = false; //Skip next 101 command
        //this._langSkipNextChoise = false; //Skip next 102 command
        //this._langSkipPrev = false; //101 command been skipeed, net to show next
        //this._langSkipNextChoiseByMsg = false; //Skip next 102 in message 101 command
        this._choiseParts = null;
    }

    Game_Interpreter.prototype._returnBranch = function() {
        //LOG.p("Return choises");
        /*this._langBranches.forEach(function(item) {
            this._list.splice(item[1],0,item[0]);
        }.bind(this));*/
        /*this._langBranches2.forEach(function(item) {
            this._list.splice(item[1],0,item[0][0],item[0][1]);
        }.bind(this));*/
        //this._langBranches = [];
        //this._langBranches2 = [];
    }

    Game_Interpreter.prototype._switchLang = function() {
        this._langMode = !this._langMode;
        if(this._langMode == false) {
            this._langSetup();
        } 
    }

    Game_Interpreter.prototype.terminate = function() {
        this._returnBranch();
        this._list = null;
        this._comments = '';
    };

    var _alias43434 = Game_Interpreter.prototype.executeCommand;
    Game_Interpreter.prototype.executeCommand = function() {
        if(this._langMode == true) {
            //LOG.p("Look at command");
            var command = this.currentCommand();
            if (command) {
                //LOG.p("Command code is " + command.code);
                if(command.code == 101) {
                    if(this._skipNextRus) {
                        var x = _alias43434.call(this);
                        this._skipNextRus = false;
                        return x;
                    } else
                        return this._langTextProcess();
                }

                if(command.code == 108) {
                    var text = command.parameters[0];
                    if(text.contains('|')) {
                        if(this._currentLangID > 0) {
                            var parts = text.split('|');
                            this._choiseParts = parts;
                        }
                    }
                }
                //if(command.code == 102) {
                //    return this._langChoiseProcess();
                //}

                return _alias43434.call(this);

            } else {
                return _alias43434.call(this);
            }
        } else
            return _alias43434.call(this);
    };

    Game_Interpreter.prototype._langTextProcess = function() {
        //LOG.p("Text command!");
        if(this._langSkipNext) {
            //LOG.p("But i need skip this text! " + this._list[this._index + 1].parameters[0]);
            this._index++;
            this._langSkipNext = false;
            return this.executeCommand(); //To next command
        }

        if(this._currentLangID > 0) {
            //LOG.p("Need Russian text");
            /*if(this._langSkipPrev == true) {
                this._langSkipPrev = false;
                LOG.p("Show current text " + this._list[this._index + 1].parameters[0]);
                return _alias43434.call(this);
            } else {
                this._langSkipPrev = true;
                //this._index++; //Skip english message, and show russian instead
                this._index += 2;
                if(this._list.length < (this._index + 1))
                    LOG.p("Go to next text " + this._list[this._index + 1].parameters[0]);
                return _alias43434.call(this);
            }*/

            this._index += 2; //To next text

           /* if(this._list[this._index].code == 401) {
                this._index +=2;
                if(this._list[this._index].code == 401) {
                    this._index +=2;
                }
            } */

            this._skipNextRus = true;

            //if(this._list.length > (this._index + 1))
            //       LOG.p("Go to next text " + this._list[this._index + 1].parameters[0]);
            //return _alias43434.call(this);

            return true;

        } else {
            //LOG.p("English text (default) " + this._list[this._index + 1].parameters[0]);
            var _lastIndex = -1;
            var t;
            //LOG.p("INDENT " + this._list[this._index].indent);
            //LOG.p("INDENT NEXT " + this._list[this._index + 4].indent);
            //LOG.p("CODE IS 102 " + (this._list[this._index + 4].code == 102));

            if(this._list[this._index + 4].indent == this._list[this._index].indent && this._list[this._index + 4].code == 102) {
                //LOG.p("Cut next text, choise");
                _lastIndex = this._index + 2;
                t = this._list.splice(_lastIndex, 2);
            }
            _alias43434.call(this);
            if(_lastIndex >= 0) {
                this._list.splice(_lastIndex, 0, t[0],t[1]);
                this._index +=2;
            }
            else {
                this._langSkipNext = true;
                //LOG.p("Skip next text");
            }
            return true;

            //this._langBranches2.push([this._list.splice(this._index+2,2), this._index+2]);
            //return _alias43434.call(this);
        }
    }



    Game_Interpreter.prototype._searchNext102 = function() {
        var code = -1;
        var counter = 100;
        var index = this._index;
        var indent = this._list[this._index].indent;
        while(counter > 0) {
            if(index == this._list.length - 1)
                return null;
            counter--;
            index++;
            var c = this._list[index];
            if(c.code == 102 && c.indent == indent) {
                return index;
            }
        }

        return null;
    }


    var _alias43111 = Game_Interpreter.prototype.setupChoices;
    Game_Interpreter.prototype.setupChoices = function(params) {
        if(this._langMode) {



            //debugger;
            /*LOG.p("Choise command by message");
            if(this._langSkipNextChoiseByMsg) {
                LOG.p("Skipped");
                this._langSkipNextChoiseByMsg = false;
                return;
            }

            var index102 = this._searchNext102();
            if(index102 != null) {
                LOG.p("Next choise finded!");
                if(this._currentLangID > 0) {
                    params[0] = this._list[index102].parameters[0].clone();
                } else {
                    //this._langSkipNextChoiseByMsg = true; 
                }
                this._langBranches.push([this._list.splice(index102,1)[0], index102]);
            }*/

            if(this._choiseParts) {
                params[0] = this._choiseParts;
            }



            /*if(this._currentLangID > 0) {
                 var index102 = this._searchNext102();
                 if(index102 != null) {
                    LOG.p("Next choise finded!");
                    params[0] = this._list[index102].parameters[0].clone();
                    //this._langSkipNextChoiseByMsg = true; //Skip next
                    this._langBranches.push([this._list.splice(index102,1)[0], index102]);

                 } else {
                    LOG.p("Next choise not finded!");
                    //this._langSkipNextChoiseByMsg = false;
                 }
            } else {
                LOG.p("English choise (default)");
                //this._langSkipNextChoiseByMsg = true; //Skip next
                var index102 = this._searchNext102();
                if(index102 != null) {
                    //_t = this._list.splice(index102,1);
                    this._langBranches.push([this._list.splice(index102,1)[0], index102]);
                }
            }*/
            _alias43111.call(this, params);
        } else 
            _alias43111.call(this, params);
    };

    //ITEMS

    /*var _DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase  = function() {
        _DataManager_loadDatabase.call(this);
        if(SDK.isRU()) {
            DataManager.loadDataFile('$Lang_RUS','RUS.json');
        }
    }

    var _alias8893 = Window_Base.prototype.drawText;
    Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
        if(SDK.isRU()) {
            var rusText = $Lang_RUS.text[text];
            if(rusText)
                _alias8893.call(this, rusText, x, y, maxWidth, align);
            else
                _alias8893.call(this, text, x, y, maxWidth, align);
        } else {
            _alias8893.call(this, text, x, y, maxWidth, align);
        }
    }*/

    var _jkjkjkjkj432432 = DataManager.loadDataFile;
    var _langArray = ['Enemies.json','Items.json','Skills.json','System.json','Weapons.json'];
    DataManager.loadDataFile = function(name, src) {

        if(_langArray.include(src)) {
            var p = 'en/';
            if(SDK.isRU()) {
                p = 'ru/';
            }
            src = p + src;
        }


        _jkjkjkjkj432432.call(this, name, src);
    };

})();