//=============================================================================
// PKD_Journal.js
//=============================================================================

/*:
 * @plugindesc Simple journal for any notes.
 * @author Pheonix KageDesu.
 *
 * @param Category Help
 * @desc The text for help window when select the category with empty help field.
 * @default Choose the category
 *
 * @param Language
 * @desc Language for notes text (ENG, RUS)
 * @default ENG
 * @help 
 *
 * Plugin Command:
 * 	Journal open # Open the journal screen
 *	Journal add CategoryId NoteId # Add Note (can be read by player)
 *  Journal remove CategoryId NoteId # Remove Note from the journal
 *
 * 	Ex. Journal add 0 TestNote
 *  Notes must be written in Data\Journal.json
 */

 /*:ru
 * @plugindesc Журнал заметок.
 * @author Pheonix KageDesu.
 *
 * @param Category Help
 * @desc Текст окна помощи при выборе категории, у которой поле Help пусто
 * @default Выберите категорию
 *
 * @param Language
 * @desc Язык текста в журнале (ENG, RUS)
 * @default RUS
 *
 * @help 
 *
 * Plugin Command:
 * 	Journal open # Открыть журнал
 *	Journal add CategoryId NoteId # Добавить заметку (будет видна в журнале)
 *  Journal remove CategoryId NoteId # Удалить заметку из журанала 
 *
 * 	Ex. Journal add 0 TestNote
 *  Все заметки нужно описать в файле Data\Journal.json
 */
 
 "use strict";
(function() {
	
	var parameters = PluginManager.parameters('PKD_Journal');
	var pkd_param_JournalHelpHolder = String(parameters['Category Help'] || 'Choose the category');
	var pkd_param_JournalLang = String(parameters['Language'] || 'ENG');

	var JLang = function(){return 0;};

	(function() {
		if(pkd_param_JournalLang == 'RUS') {
			JLang = function() {
				return 1;
			}
		}

		if(pkd_param_JournalLang == 'AUTO') {
			if(PLATFORM) {
				JLang = function() {
					return PLATFORM.SDK.isRU();
				}
			}
		}

	})();

	var translatedText = function(text) {
		if(text.contains('|')) {
			var sentns = text.split('|');
			if(JLang() == 0) {
				return sentns[0];
			} else 
				return sentns[1];
		} 
		return text;
	}

	//------------------------------------------------------------------------------
	 	//Game_Interpreter
	 	 var _Game_Interpreter_pluginCommand =
	            Game_Interpreter.prototype.pluginCommand;
	    Game_Interpreter.prototype.pluginCommand = function(command, args) {
	        _Game_Interpreter_pluginCommand.call(this, command, args);
	        if (command === 'Journal') {
				switch(args[0]) {
					case 'open':
						SceneManager.push(Scene_Journal);
					break;
					case 'add':
						var catId = parseInt(args[1]);
						var noteId = args[2];
						$gameParty.addNote(catId, noteId);
					break;
					case 'remove':
						var catId = parseInt(args[1]);
						var noteId = args[2];
						$gameParty.removeNote(catId, noteId);
					break;
				}
			}
	    };
		//END Game_Interpreter
	//------------------------------------------------------------------------------

	//------------------------------------------------------------------------------
	 	//Scene_Journal
	 	function Journal_Consts() {
	 		throw new Error('This is a static class');
	 	}
	 	Journal_Consts.ANIM_TIME = 20;
	 	Journal_Consts.ANIM_STEP = 36;

		function Scene_Journal() {
			this.initialize.apply(this, arguments);
		}

		Scene_Journal.prototype = Object.create(Scene_Base.prototype);
		Scene_Journal.prototype.constructor = Scene_Journal;

		Scene_Journal.prototype.initialize = function() {
			Scene_Base.prototype.initialize.call(this);
			this._switchTimer = 0;
			this._switchFlag = false;
			this._switchToNoteDataFlag = true;
		}

		Scene_Journal.prototype.create = function() {
			Scene_Base.prototype.create.call(this);
			this._createBackground();
			this.createWindowLayer();
			this._createHelpWindow();
			this._createCatsWindow();
			this._createNotesWindow();
			this._createNoteDataWindow();
		}

		Scene_Journal.prototype.update = function() {
			//Code there
			Scene_Base.prototype.update.call(this);

			var notes = this._catsWindow.currentData().notes;
			this._notesWindow.setNotes(this._catsWindow.currentData());

			if(this._switchFlag) {
				if(this._switchTimer < Journal_Consts.ANIM_TIME) {
					this._switchTimer += 1;
				}

				if(this._switchToNoteDataFlag === true) {
					this._switchToNoteData();
				} else {
					this._switchToCategory();
				}
				
			}
		}

		//PRIVATE

		Scene_Journal.prototype._createBackground = function() {
			this._backgroundSprite = new Sprite();
		    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
		    this._backgroundSprite.setBlendColor([16, 16, 16, 128]);
		    this.addChild(this._backgroundSprite);
		}

		Scene_Journal.prototype._createHelpWindow = function() {
			this._helpWindow = new Window_Help();
			this.addWindow(this._helpWindow);

			this._y = this._helpWindow.height;
		}

		Scene_Journal.prototype._createCatsWindow = function() {
			this._catsWindow = new Window_JournalCategoryList(0,this._y,Graphics.boxWidth/2, Graphics.boxHeight - this._y);
			this._catsWindow.setHelpWindow(this._helpWindow);
			this._catsWindow.setHandler('ok', function(){ 
				this._notesWindow.select(0);
				this._notesWindow.activate();
			 }.bind(this));	
			this._catsWindow.setHandler('cancel', function(){ this.popScene(); }.bind(this));			
			this.addWindow(this._catsWindow);
		}

		Scene_Journal.prototype._createNotesWindow = function() {
			this._notesWindow = new Window_JournalNotesList(Graphics.boxWidth/2, this._y, Graphics.boxWidth/2, Graphics.boxHeight - this._y);
			this._notesWindow.setHandler('cancel', function() { 
					this._notesWindow.deselect(); 
					this._notesWindow.deactivate(); 
					this._catsWindow.activate(); 
				}.bind(this));
			this._notesWindow.setHandler('ok', function() {
				this._switchToNoteDataFlag = true;
				this._switchWindow();
				this._helpWindow.setText(translatedText(this._notesWindow.currentData().title));
			}.bind(this));

			this.addWindow(this._notesWindow);
		}

		Scene_Journal.prototype._createNoteDataWindow = function() {
			this._noteDataWindow = new Window_JournalNoteData(0,this._y, Graphics.boxWidth, Graphics.boxHeight - this._y);
			this._noteDataWindow.setHandler('cancel', function() {
				this._noteDataWindow.hide();
				this._catsWindow.show();
				this._notesWindow.show();
				this._switchToNoteDataFlag = false;
				this._switchWindow();
			}.bind(this));
			this._noteDataWindow.deactivate();
			this._noteDataWindow.hide();
			this.addWindow(this._noteDataWindow);
		}

		Scene_Journal.prototype._switchWindow = function() {
			this._switchFlag = true;
			this._switchTimer = 0;
		}

		Scene_Journal.prototype._switchToNoteData = function() {
			this._catsWindow.x -= Journal_Consts.ANIM_STEP;
			this._notesWindow.x += Journal_Consts.ANIM_STEP;

			if(this._switchTimer == Journal_Consts.ANIM_TIME) {
				this._switchFlag = false;
				this._catsWindow.hide();
				this._notesWindow.hide();
				this._noteDataWindow.showNote(this._notesWindow.currentData());
				this._noteDataWindow.show();
				this._noteDataWindow.activate();
			}
		}

		Scene_Journal.prototype._switchToCategory = function() {
			if(this._catsWindow.x < Journal_Consts.ANIM_STEP)
				this._catsWindow.x += Journal_Consts.ANIM_STEP;

			if(this._notesWindow.x > (Graphics.boxWidth/2) + Journal_Consts.ANIM_STEP)
				this._notesWindow.x -= Journal_Consts.ANIM_STEP;

			if(this._switchTimer == Journal_Consts.ANIM_TIME) {
				this._switchFlag = false;
				this._notesWindow.activate();
				this._catsWindow.x = 0;
				this._notesWindow.x = (Graphics.boxWidth/2);
			}
		}

		//END Scene_Journal
	//------------------------------------------------------------------------------

	//------------------------------------------------------------------------------
	 	//Window_JournalCategoryList
	 	function Window_JournalCategoryList() {
			this.initialize.apply(this, arguments);
		}

		Window_JournalCategoryList.prototype = Object.create(Window_Selectable.prototype);
		Window_JournalCategoryList.prototype.constructor = Window_JournalCategoryList;

		Window_JournalCategoryList.prototype.initialize = function(x, y, width, height) {
			Window_Selectable.prototype.initialize.call(this, x, y, width, height);
			this.refresh();
			this.select(0);
			this.activate();
		}

		Window_JournalCategoryList.prototype.isCurrentItemEnabled = function() {
			return this.isItemEnabled(this.index());
		}

		Window_JournalCategoryList.prototype.isItemEnabled = function(index) {
			if(index == -1) return false;
			return ($gameParty.notesForCategory($dataJournalNotes[index].id).length != 0);
		}

		Window_JournalCategoryList.prototype.currentData = function() {
			return this.index() >= 0 ? $gameParty.notesForCategory($dataJournalNotes[this.index()].id) : null;
		}

		Window_JournalCategoryList.prototype.maxItems = function() { return $dataJournalNotes.length; };

		Window_JournalCategoryList.prototype.drawItem = function(index) {
			var item = $dataJournalNotes[index];
			if(item) {
				var rect = this.itemRectForText(index);
				this.changePaintOpacity(this.isItemEnabled(index));
				this.drawIcon(item.iconSymbol, rect.x, rect.y + 2);
				this.drawText(translatedText(item.Category), rect.x + 36, rect.y, rect.width - 36, 'left');
			}
		};

		Window_JournalCategoryList.prototype.setHelpWindowItem = function(item) {
		    if (this._helpWindow) {
		        this._helpWindow.setText(item);
		    }
		};

		Window_JournalCategoryList.prototype.updateHelp = function() {
		    this._helpWindow.clear();
		    var item = $dataJournalNotes[this.index()];
		    if(item && (item.helpText != "")) {
		    	if(JLang() == 0)
		    		this.setHelpWindowItem(item.helpText);
		    	else {
		    		if(item.helpTextRU)
		    			this.setHelpWindowItem(item.helpTextRU);
		    		else
		    			this.setHelpWindowItem(item.helpText);
		    	}
		    } else
		    	this.setHelpWindowItem(pkd_param_JournalHelpHolder); 
		};
	 	//END Window_JournalCategoryList
	//------------------------------------------------------------------------------

	//------------------------------------------------------------------------------
	 	//Window_JournalNotesList
	 	function Window_JournalNotesList() {
			this.initialize.apply(this, arguments);
		}

		Window_JournalNotesList.prototype = Object.create(Window_Selectable.prototype);
		Window_JournalNotesList.prototype.constructor = Window_JournalNotesList;

		Window_JournalNotesList.prototype.initialize = function(x, y, width, height) {
			this._notes = [];
			Window_Selectable.prototype.initialize.call(this, x, y, width, height);
		}

		Window_JournalNotesList.prototype.setNotes = function(notes) {
			this._notes = notes;
			this.refresh();
		}

		Window_JournalNotesList.prototype.currentData = function() {
			return this.index() >= 0 ? this._notes[this.index()] : null;
		}

		Window_JournalNotesList.prototype.maxItems = function() { return this._notes.length; };

		Window_JournalNotesList.prototype.drawItem = function(index) {
			var item = this._notes[index];
			if(item) {
				var rect = this.itemRectForText(index);
				this.drawIcon(item.iconSymbol, rect.x, rect.y + 2);
				this.drawText(translatedText(item.title), rect.x + 36, rect.y, rect.width - 36, 'left');
			}
		};

		//PRIVATE


		//END Window_JournalNotesList
	//------------------------------------------------------------------------------

	//------------------------------------------------------------------------------
	 	//Window_JournalNoteData
	 		//Thanks to Yami for Word Wrap code
	 	function Window_JournalNoteData() {
			this.initialize.apply(this, arguments);
		}

		Window_JournalNoteData.prototype = Object.create(Window_Base.prototype);
		Window_JournalNoteData.prototype.constructor = Window_JournalNoteData;

		Window_JournalNoteData.prototype.initialize = function(x, y, width, height) {
			this._handlers = {};
			this._backSprite = null;
			Window_Base.prototype.initialize.call(this, x, y, width, height);
		}

		Window_JournalNoteData.prototype.update = function() {
			Window_Base.prototype.update.call(this);
			this.processHandling();
		}

		Window_JournalNoteData.prototype.showNote = function(noteData) {
			this._textState = {};
			this._textState.index = 0;
			if(JLang() == 0)
				this._textState.text = this.convertEscapeCharacters((noteData.text || ""));
			else {
				if(noteData.textRU)
					this._textState.text = this.convertEscapeCharacters((noteData.textRU || ""));
				else
					this._textState.text = this.convertEscapeCharacters((noteData.text || ""));
			}
			this.newPage(this._textState);

			while(!this.isEndOfText(this._textState))
			{
				this.processCharacter(this._textState);
			}

			if(noteData.picture !== undefined) {
				if(this._backSprite) {
					this.removeChild(this._backSprite);
				}
				var img = null;
				if(JLang() == 0) {
					img = ImageManager.loadPicture(noteData.picture);
				} else {
					if(noteData.pictureRU) {
						img = ImageManager.loadPicture(noteData.pictureRU);
					} else {
						img = ImageManager.loadPicture(noteData.picture);
					}
				}
				this._backSprite = new Sprite(img);
				this._backSprite.anchor.x = 0.5;
				this._backSprite.anchor.y = 0.5;
				this._backSprite.x = (this.width / 2);
				this._backSprite.y = (this.height / 2); 
				this.addChild(this._backSprite);
				this.backOpacity = 0;
			}
			else {
				this.backOpacity = 255;
				if(this._backSprite) {
					this.removeChild(this._backSprite);
				}
			}
		}

		Window_JournalNoteData.prototype.newPage = function(textState) {
		    this.contents.clear();
		    this.resetFontSettings();
		    textState.x = 0;
		    textState.y = 0;
		    textState.left = 0;
		    textState.height = this.calcTextHeight(textState, false);
		};

		Window_JournalNoteData.prototype.isEndOfText = function(textState) {
			return textState.index >= textState.text.length;
		}

		Window_JournalNoteData.prototype.convertEscapeCharacters = function(text) {
			text = Window_Base.prototype.convertEscapeCharacters.call(this, text);
			text = text.replace(/[\n\r]+/g, '');
            text = text.replace(/<br>/gi, '\n');
            return text;
		}

		Window_JournalNoteData.prototype.processNormalCharacter = function(textState) {
			if(this.needWrap(textState)){
				return this.processNewLine(textState);
			} 
			Window_Base.prototype.processNormalCharacter.call(this, textState);
		}

		Window_JournalNoteData.prototype.processHandling = function() {

			if(this.isOpenAndActive() && this.isCancelTriggered()) {
				this.processCancel();
			}
		}

		Window_JournalNoteData.prototype.needWrap = function(textState) {
			var c = textState.text[textState.index],
            w = this.textWidth(c),
            nextSpaceIndex = 0,
            nextBreakIndex = 0,
            nextWord = "",
            nextWidth = 0,
            text = textState.text;

	        if (c === " ") {
	            nextSpaceIndex = text.indexOf(" ", textState.index + 1);
	            nextBreakIndex = text.indexOf("\n", textState.index + 1);

	            if (nextSpaceIndex < 0) {
	                nextSpaceIndex = text.length + 1;
	            }

	            if (nextBreakIndex > 0) {
	                nextSpaceIndex = Math.min(nextSpaceIndex, nextBreakIndex);
	            }

	            nextWord = text.substring(textState.index, nextSpaceIndex);

	            nextWidth = this.textWidth(nextWord);

	            if (textState.x + nextWidth >= this.contentsWidth()) {
	                return true;
	            }
	        }

	        return false;
		}

		Window_JournalNoteData.prototype.isCancelTriggered = function() {
			return Input.isRepeated('cancel') || TouchInput.isCancelled();
		}

		Window_JournalNoteData.prototype.processCancel = function() {
		    SoundManager.playCancel();
		    this.deactivate();
		    this.callHandler('cancel');
		};

		Window_JournalNoteData.prototype.setHandler = function(symbol, method) {
		    this._handlers[symbol] = method;
		};

		Window_JournalNoteData.prototype.isHandled = function(symbol) {
		    return !!this._handlers[symbol];
		};

		Window_JournalNoteData.prototype.callHandler = function(symbol) {
		    if (this.isHandled(symbol)) {
		        this._handlers[symbol]();
		    }
		};

		Window_JournalNoteData.prototype.isOpenAndActive = function() {
		    return this.isOpen() && this.active;
		};

	 	//END Window_JournalNoteData
	//------------------------------------------------------------------------------

})();

//=============================================================================
//Window Base 
//=============================================================================
(function($) {
    var alias_drawIcon = $.prototype.drawIcon;
    $.prototype.drawIcon = function(iconIndex, x, y) {
        if(typeof iconIndex == 'string')
        {
            var bitmap = ImageManager.loadPicture(iconIndex);
            bitmap.addLoadListener(function(){
                var pw = Window_Base._iconWidth;
                var ph = Window_Base._iconHeight;
                this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, pw, ph);
            }.bind(this));
        }
        else
            alias_drawIcon.call(this, iconIndex, x , y);
    };
})(Window_Base);

//=============================================================================
//GameParty
//=============================================================================
(function($) {
	var alias_initialize = $.prototype.initialize;
	$.prototype.initialize = function() {
		alias_initialize.call(this);
		this._journal = {}; // catId -> [noteId, noteId, ...]
	}

	//NEW
	$.prototype.addNote = function(catId, noteId) {
		if(catId === undefined)
			return;
		if(noteId === undefined)
			return;

		if(this._journal[catId] === undefined) {
			this._journal[catId] = [];
		}
		this._journal[catId].push(noteId);
	}

	$.prototype.removeNote = function(catId, noteId) {
		if(catId === undefined)
			return;
		if(noteId === undefined)
			return;

		if(this._journal[catId] == undefined) return;
		var notes = this._journal[catId];
		var index = notes.indexOf(noteId);
		if(index > -1) {
			array.splice(index, 1);
		}
	}

	$.prototype.notesForCategory = function(catId) { //[note, note, note, ...]
		var notes = [];

		if(this._journal[catId] !== undefined) {
			var categoryData = null;
			for(var i = 0; i<$dataJournalNotes.length; i++) {
				var item = $dataJournalNotes[i];
				if(item.id == catId)
				{
					categoryData = item.notes;
					break;
				}
			}
			if(categoryData != null)
			for(var i = 0; i<categoryData.length; i++) {
				for(var j = 0; j<this._journal[catId].length; j++) {
					var item = this._journal[catId][j];
					if(categoryData[i].id == item) {
						notes.push(categoryData[i]);
						break;
					}
				}
			}
		}

		return notes;
	}

})(Game_Party);

//=============================================================================
//DataManger
//=============================================================================
(function($) {
	var alias_loadDatabase = $.loadDatabase;
	$.loadDatabase = function() {
		alias_loadDatabase.call(this);
		$.loadDataFile('$dataJournalNotes', 'Journal.json');
	}
})(DataManager);

