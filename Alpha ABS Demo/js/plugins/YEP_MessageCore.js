//=============================================================================
// Yanfly Engine Plugins - Message Core
// YEP_MessageCore.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MessageCore = true;

var Yanfly = Yanfly || {};
Yanfly.Message = Yanfly.Message || {};

//=============================================================================
 /*:
 * @plugindesc Adds more features to the Message Window to customized the
 * way your messages appear and functions.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Default Rows
 * @desc This is default amount of rows the message box will have.
 * Default: 4
 * @default 4
 *
 * @param Default Width
 * @desc This is default width for the message box in pixels.
 * Default: Graphics.boxWidth
 * @default Graphics.boxWidth
 *
 * @param Face Indent
 * @desc If using a face graphic, this is how much text indents by.
 * Default: Window_Base._faceWidth + 24
 * @default Window_Base._faceWidth + 24
 *
 * @param Fast Forward
 * @desc Using this will enable a fast forward button to skip forward
 * quickly. If you don't wish to use this, use 'false' instead.
 * @default Input.isPressed('pagedown')
 *
 * @param Word Wrapping
 * @desc Use this to enable or disable word wrapping by default.
 * OFF - false     ONE - true
 * @default false
 *
 * @param ---Font---
 * @default
 *
 * @param Font Name
 * @desc This is the default font used for the Message Window.
 * Default: GameFont
 * @default GameFont
 *
 * @param Font Size
 * @desc This is the default font size used for the Message Window.
 * Default: 28
 * @default 28
 *
 * @param Font Size Change
 * @desc Whenever \{ and \} are used, they adjust by this value.
 * Default: 12
 * @default 12
 *
 * @param Font Changed Max
 * @desc This is the maximum size achieved by \{.
 * Default: 96
 * @default 96
 *
 * @param Font Changed Min
 * @desc This is the minimum size achieved by \{.
 * Default: 12
 * @default 12
 *
 * @param ---Name Box---
 * @default
 *
 * @param Name Box Buffer X
 * @desc This is the buffer for the x location of the Name Box.
 * @default -28
 *
 * @param Name Box Buffer Y
 * @desc This is the buffer for the y location of the Name Box.
 * @default 0
 *
 * @param Name Box Padding
 * @desc This is the value for the padding of the Name Box.
 * @default this.standardPadding() * 4
 *
 * @param Name Box Color
 * @desc This is the text color used for the Name Box.
 * @default 0
 *
 * @param Name Box Clear
 * @desc Do you wish for the Name Box window to be clear?
 * NO - false     YES - true
 * @default false
 *
 * @param Name Box Added Text
 * @desc This text is always added whenever the name box is used.
 * This can be used to automatically set up colors.
 * @default \c[6]
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * While RPG Maker MV Ace certainly improved the message system a whole lot, it
 * wouldn't hurt to add in a few more features, such as name windows,
 * converting textcodes to write out the icons and/or names of items, weapons,
 * armours, and* more in quicker fashion. This script also gives the developer
 * the ability to adjust the size of the message window during the game, give
 * it a separate font, and to give the player a text fast-forward feature.
 *
 * ============================================================================
 * Word Wrapping
 * ============================================================================
 *
 * Word wrapping is now possible through the message system. You can enable and
 * disable Word wrap using Plugin Commands. While using word wrap, if the word
 * is to extend past the message window's area, it will automatically go to the
 * following line. That said, word wrap will disable the editor's line breaks
 * and will require you to use the ones provided by the plugin:
 *
 * <br> or <line break> is text code to apply a line break. Use this before or
 * after a part in which you wish to start a new line.
 *
 * Keep in mind word wrapping is mostly for message windows. However, in other
 * places that you'd like to see word wrapping, such as item descriptions,
 * insert <WordWrap> at the beginning of the text to enable it.
 *
 * ============================================================================
 * Text Codes
 * ============================================================================
 *
 * By using certain text codes in your messages, you can have the game replace
 * them with the following:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * Text Code   Function
 *   \V[n]       Replaced by the value of the nth variable.
 *   \N[n]       Replaced by the name of the nth actor.
 *   \P[n]       Replaced by the name of the nth party member.
 *   \G          Replaced by the currency unit.
 *   \C[n]       Draw the subsequent text in the nth color.
 *   \I[n]       Draw the nth icon.
 *   \{          Increases the text size by one step.
 *   \}          Decreases the text size by one step.
 *   \\          Replaced with the backslash character.
 *   \$          Opens the gold window.
 *   \.          Waits 1/4th seconds.
 *   \|          Waits 1 second.
 *   \!          Waits for button input.
 *   \>          Display remaining text on same line all at once.
 *   \<          Cancel the effect that displays text all at once.
 *   \^          Do not wait for input after displaying text.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Wait:       Effect:
 *    \w[x]     - Waits x frames (60 frames = 1 second). Message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  NameWindow: Effect:
 *    \n<x>     - Creates a name box with x string. Left side. *Note
 *    \nc<x>    - Creates a name box with x string. Centered. *Note
 *    \nr<x>    - Creates a name box with x string. Right side. *Note
 *
 *              *Note: Works for message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Line Break  Effect:
 *    <br>      - If using word wrap mode, this will cause a line break.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Position:   Effect:
 *    \px[x]    - Sets x position of text to x.
 *    \py[x]    - Sets y position of text to y.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Outline:    Effect:
 *   \oc[x]    - Sets outline colour to x.
 *   \ow[x]    - Sets outline width to x.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Font:       Effect:
 *    \fr       - Resets all font changes.
 *    \fs[x]    - Changes font size to x.
 *    \fn<x>    - Changes font name to x.
 *    \fb       - Toggles font boldness.
 *    \fi       - Toggles font italic.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Actor:      Effect:
 *    \af[x]    - Shows face of actor x. *Note
 *    \ac[x]    - Writes out actor's class name.
 *    \an[x]    - Writes out actor's nickname.
 *
 *              *Note: Works for message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Party:      Effect:
 *    \pf[x]    - Shows face of party member x. *Note
 *    \pc[x]    - Writes out party member x's class name.
 *    \pn[x]    - Writes out party member x's nickname.
 *
 *              *Note: Works for message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Names:      Effect:
 *    \nc[x]    - Writes out class x's name.
 *    \ni[x]    - Writes out item x's name.
 *    \nw[x]    - Writes out weapon x's name.
 *    \na[x]    - Writes out armour x's name.
 *    \ns[x]    - Writes out skill x's name.
 *    \nt[x]    - Writes out state x's name.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Icon Names: Effect:
 *    \ii[x]    - Writes out item x's name including icon.
 *    \iw[x]    - Writes out weapon x's name including icon.
 *    \ia[x]    - Writes out armour x's name including icon.
 *    \is[x]    - Writes out skill x's name including icon.
 *    \it[x]    - Writes out state x's name including icon.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * And those are the text codes added with this script. Keep in mind that some
 * of these text codes only work for the Message Window. Otherwise, they'll
 * work for help descriptions, actor biographies, and others.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are some plugin commands you can use through the Event Editor
 * to change various aspects about the Message system.
 *
 * Plugin Comand
 *   MessageRows 6          = Changes the Message Rows displayed to 6. If you
 *                            are using continuous Show Text events, this will
 *                            continue displaying the following lines's texts
 *                            until it hits the row limit. Anything after that
 *                            is cut off until the next message starts to avoid
 *                            accidental overlap.
 *
 *   MessageWidth 400       = Changes the Message Window Width to 400 pixels.
 *                            This will cut off any words that are shown too
 *                            far to the right so adjust accordingly!
 *
 *   EnableWordWrap         = Enables wordwrapping. If a word extends past the
 *                            window size, it will automatically move onto the
 *                            next line. Keep in mind, you will need to use
 *                            \br to perform line breaks.
 *
 *   DisableWordWrap        = This disables wordwrapping. Line breaks will be
 *                            automatic at points where a new line is started
 *                            in the editor.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_MessageCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MSGDefaultRows = String(Yanfly.Parameters['Default Rows']);
Yanfly.Param.MSGDefaultWidth = String(Yanfly.Parameters['Default Width']);
Yanfly.Param.MSGFaceIndent = String(Yanfly.Parameters['Face Indent']);
Yanfly.Param.MSGFastForward = String(Yanfly.Parameters['Fast Forward']);
Yanfly.Param.MSGWordWrap = String(Yanfly.Parameters['Word Wrapping']);
Yanfly.Param.MSGFontName = String(Yanfly.Parameters['Font Name']);
Yanfly.Param.MSGFontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.MSGFontSizeChange = String(Yanfly.Parameters['Font Size Change']);
Yanfly.Param.MSGFontChangeMax = String(Yanfly.Parameters['Font Changed Max']);
Yanfly.Param.MSGFontChangeMin = String(Yanfly.Parameters['Font Changed Min']);
Yanfly.Param.MSGNameBoxBufferX = String(Yanfly.Parameters['Name Box Buffer X']);
Yanfly.Param.MSGNameBoxBufferY = String(Yanfly.Parameters['Name Box Buffer Y']);
Yanfly.Param.MSGNameBoxPadding = String(Yanfly.Parameters['Name Box Padding']);
Yanfly.Param.MSGNameBoxColor = Number(Yanfly.Parameters['Name Box Color']);
Yanfly.Param.MSGNameBoxClear = String(Yanfly.Parameters['Name Box Clear']);
Yanfly.Param.MSGNameBoxText = String(Yanfly.Parameters['Name Box Added Text']);

//=============================================================================
// Bitmap
//=============================================================================

Yanfly.Message.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
		Yanfly.Message.Bitmap_initialize.call(this, width, height);
		this.fontBold = false;
};

Yanfly.Message.Bitmap_makeFontNameText = Bitmap.prototype._makeFontNameText;
Bitmap.prototype._makeFontNameText = function() {
    if (this.fontBold) return 'Bold ' + this.fontSize + 'px ' + this.fontFace;
		return Yanfly.Message.Bitmap_makeFontNameText.call(this);
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Message.Game_System_initialize =	Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
		Yanfly.Message.Game_System_initialize.call(this);
		this.initMessageSystem();
};

Game_System.prototype.initMessageSystem = function() {
		this._wordWrap = eval(Yanfly.Param.MSGWordWrap);
};

Game_System.prototype.messageRows = function() {
		var rows = eval(this._messageRows) || eval(Yanfly.Param.MSGDefaultRows);
		return Math.max(1, parseInt(rows));
};

Game_System.prototype.messageWidth = function() {
		return eval(this._messageWidth) || eval(Yanfly.Param.MSGDefaultWidth);
};

Game_System.prototype.wordWrap = function() {
		if (this._wordWrap === undefined) this.initMessageSystem();
		return this._wordWrap;
};

Game_System.prototype.setWordWrap = function(state) {
		if (this._wordWrap === undefined) this.initMessageSystem();
		this._wordWrap = state;
};

//=============================================================================
// Game_Message
//=============================================================================

Game_Message.prototype.addText = function(text) {
		if ($gameSystem.wordWrap()) text = '<WordWrap>' + text;
		this.add(text);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Message.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Message.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'MessageRows') $gameSystem._messageRows = args[0];
		if (command === 'MessageWidth') $gameSystem._messageWidth = args[0];
		if (command === 'EnableWordWrap') $gameSystem.setWordWrap(true);
		if (command === 'DisableWordWrap') $gameSystem.setWordWrap(false);
};

Game_Interpreter.prototype.command101 = function() {
    if (!$gameMessage.isBusy()) {
      $gameMessage.setFaceImage(this._params[0], this._params[1]);
      $gameMessage.setBackground(this._params[2]);
      $gameMessage.setPositionType(this._params[3]);
			while (this.isContinueMessageString()) {
        this._index++;
				if (this._list[this._index].code === 401) {
					$gameMessage.addText(this.currentCommand().parameters[0]);
				}
				if ($gameMessage._texts.length >= $gameSystem.messageRows()) break;
      }
      switch (this.nextEventCode()) {
      case 102:
        this._index++;
        this.setupChoices(this.currentCommand().parameters);
        break;
      case 103:
        this._index++;
        this.setupNumInput(this.currentCommand().parameters);
        break;
      case 104:
        this._index++;
        this.setupItemChoice(this.currentCommand().parameters);
        break;
      }
      this._index++;
      this.setWaitMode('message');
    }
    return false;
};

Game_Interpreter.prototype.isContinueMessageString = function() {
		if (this.nextEventCode() === 101 && $gameSystem.messageRows() > 4) {
			return true;
		} else {
			return this.nextEventCode() === 401;
		}
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.Message.Window_Base_resetFontSettings =
		Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
    Yanfly.Message.Window_Base_resetFontSettings.call(this);
		this.contents.fontBold = false;
		this.contents.fontItalic = false;
		this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
		this.contents.outlineWidth = 4;
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Yanfly.Message.Window_Base_convertEscapeCharacters =
		Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
		text = this.setWordWrap(text);
		text = Yanfly.Message.Window_Base_convertEscapeCharacters.call(this, text);
		text = this.convertExtraEscapeCharacters(text);
		return text;
};

Window_Base.prototype.setWordWrap = function(text) {
		this._wordWrap = false;
		if (text.match(/<(?:WordWrap)>/i)) {
			this._wordWrap = true;
			text = text.replace(/<(?:WordWrap)>/gi, '\n');
		}
		if (this._messageWindow && this._wordWrap) {
			text = text.replace(/[\n\r]+/g, '');
			text = text.replace(/<(?:BR|line break)>/gi, '\n');
		}
		return text;
};

Window_Base.prototype.convertExtraEscapeCharacters = function(text) {
		// \AC[n]
		text = text.replace(/\x1bAC\[(\d+)\]/gi, function() {
				return this.actorClassName(parseInt(arguments[1]));
		}.bind(this));
		// \AN[n]
		text = text.replace(/\x1bAN\[(\d+)\]/gi, function() {
				return this.actorNickname(parseInt(arguments[1]));
		}.bind(this));
		// \PC[n]
		text = text.replace(/\x1bPC\[(\d+)\]/gi, function() {
				return this.partyClassName(parseInt(arguments[1]));
		}.bind(this));
		// \PN[n]
		text = text.replace(/\x1bPN\[(\d+)\]/gi, function() {
				return this.partyNickname(parseInt(arguments[1]));
		}.bind(this));
		// \NC[n]
		text = text.replace(/\x1bNC\[(\d+)\]/gi, function() {
				return $dataClasses[parseInt(arguments[1])].name;
		}.bind(this));
		// \NI[n]
		text = text.replace(/\x1bNI\[(\d+)\]/gi, function() {
				return $dataItems[parseInt(arguments[1])].name;
		}.bind(this));
		// \NW[n]
		text = text.replace(/\x1bNW\[(\d+)\]/gi, function() {
				return $dataWeapons[parseInt(arguments[1])].name;
		}.bind(this));
		// \NA[n]
		text = text.replace(/\x1bNA\[(\d+)\]/gi, function() {
				return $dataArmors[parseInt(arguments[1])].name;
		}.bind(this));
		// \NE[n]
		text = text.replace(/\x1bNE\[(\d+)\]/gi, function() {
				return $dataEnemies[parseInt(arguments[1])].name;
		}.bind(this));
		// \NS[n]
		text = text.replace(/\x1bNS\[(\d+)\]/gi, function() {
				return $dataSkills[parseInt(arguments[1])].name;
		}.bind(this));
		// \NT[n]
		text = text.replace(/\x1bNT\[(\d+)\]/gi, function() {
				return $dataStates[parseInt(arguments[1])].name;
		}.bind(this));
		// \II[n]
		text = text.replace(/\x1bII\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataItems);
		}.bind(this));
		// \IW[n]
		text = text.replace(/\x1bIW\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataWeapons);
		}.bind(this));
		// \IA[n]
		text = text.replace(/\x1bIA\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataArmors);
		}.bind(this));
		// \IS[n]
		text = text.replace(/\x1bIS\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataSkills);
		}.bind(this));
		// \IT[n]
		text = text.replace(/\x1bIT\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataStates);
		}.bind(this));
		// Finish
    return text;
};

Window_Base.prototype.actorClassName = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.currentClass().name : '';
};

Window_Base.prototype.actorNickname = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.nickname() : '';
};

Window_Base.prototype.partyClassName = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.currentClass().name : '';
};

Window_Base.prototype.partyNickname = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.nickname() : '';
};

Window_Base.prototype.escapeIconItem = function(n, database) {
		return '\x1bI[' + database[n].iconIndex + ']' + database[n].name;
};

Window_Base.prototype.obtainEscapeString = function(textState) {
    var arr = /^\<(.*)\>/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return String(arr[0].slice(1, arr[0].length - 1));
    } else {
        return '';
    }
};

Yanfly.Message.Window_Base_processEscapeCharacter =
		Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
		switch (code) {
		case 'FR':
        this.resetFontSettings();
        break;
		case 'FS':
        this.contents.fontSize = this.obtainEscapeParam(textState);
        break;
    case 'FN':
				var name = this.obtainEscapeString(textState);
				this.contents.fontFace = name;
        break;
		case 'FB':
				this.contents.fontBold = !this.contents.fontBold;
				break;
		case 'FI':
				this.contents.fontItalic = !this.contents.fontItalic;
				break;
		case 'OC':
				var id = this.obtainEscapeParam(textState);
        this.contents.outlineColor = this.textColor(id);
        break;
		case 'OW':
				this.contents.outlineWidth = this.obtainEscapeParam(textState);
        break;
    case 'PX':
        textState.x = this.obtainEscapeParam(textState);
        break;
    case 'PY':
        textState.y = this.obtainEscapeParam(textState);
        break;
        break;
		default:
      Yanfly.Message.Window_Base_processEscapeCharacter.call(this,
				code, textState);
      break;
    }
};

Window_Base.prototype.makeFontBigger = function() {
		var size = this.contents.fontSize + eval(Yanfly.Param.MSGFontSizeChange);
		this.contents.fontSize = Math.min(size, Yanfly.Param.MSGFontChangeMax);
};

Window_Base.prototype.makeFontSmaller = function() {
	var size = this.contents.fontSize - eval(Yanfly.Param.MSGFontSizeChange);
	this.contents.fontSize = Math.max(size, Yanfly.Param.MSGFontChangeMin);
};

Yanfly.Message.Window_Base_processNormalCharacter =
		Window_Base.prototype.processNormalCharacter;
Window_Base.prototype.processNormalCharacter = function(textState) {
		if (this.checkWordWrap(textState)) return this.processNewLine(textState);
		Yanfly.Message.Window_Base_processNormalCharacter.call(this, textState);
};

Window_Base.prototype.checkWordWrap = function(textState) {
		if (!textState) return false;
		if (!this._messageWindow) return false;
		if (!this._wordWrap) return false;
		if (textState.text[textState.index] === ' ') {
			var nextSpace = textState.text.indexOf(' ', textState.index + 1);
			var nextBreak = textState.text.indexOf('\n', textState.index + 1);
			if (nextSpace < 0) nextSpace = textState.text.length + 1;
			if (nextBreak > 0) nextSpace = Math.min(nextSpace, nextBreak);
			var word = textState.text.substring(textState.index, nextSpace);
			var size = this.textWidth(word);
		}
		return (size + textState.x > this.contents.width);
};

Window_Base.prototype.saveCurrentWindowSettings = function(){
		this._saveFontFace = this.contents.fontFace;
		this._saveFontSize = this.contents.fontSize;
		this._savetextColor = this.contents.textColor;
		this._saveFontBold = this.contents.fontBold;
		this._saveFontItalic = this.contents.fontItalic;
		this._saveOutlineColor = this.contents.outlineColor;
		this._saveOutlineWidth = this.contents.outlineWidth;
};

Window_Base.prototype.restoreCurrentWindowSettings = function(){
		this.contents.fontFace = this._saveFontFace;
		this.contents.fontSize = this._saveFontSize;
		this.contents.textColor = this._savetextColor;
		this.contents.fontBold = this._saveFontBold;
		this.contents.fontItalic = this._saveFontItalic;
		this.contents.outlineColor = this._saveOutlineColor;
		this.contents.outlineWidth = this._saveOutlineWidth;
};

Window_Base.prototype.clearCurrentWindowSettings = function(){
		this._saveFontFace = undefined;
		this._saveFontSize = undefined;
		this._savetextColor = undefined;
		this._saveFontBold = undefined;
		this._saveFontItalic = undefined;
		this._saveOutlineColor = undefined;
		this._saveOutlineWidth = undefined;
};

Window_Base.prototype.textWidthExCheck = function(text) {
		var setting = this._wordWrap;
		this._wordWrap = false;
		this.saveCurrentWindowSettings();
		this._checkWordWrapMode = true;
		var value = this.drawTextEx(text, 0, this.contents.height);
		this._checkWordWrapMode = false;
		this.restoreCurrentWindowSettings();
		this.clearCurrentWindowSettings();
		this._wordWrap = setting;
		return value;
};

//=============================================================================
// Window_ChoiceList
//=============================================================================

Window_ChoiceList.prototype.standardFontFace = function() {
    return Yanfly.Param.MSGFontName;
};

Window_ChoiceList.prototype.standardFontSize = function() {
    return Yanfly.Param.MSGFontSize;
};

//=============================================================================
// Window_ScrollText
//=============================================================================

Window_ScrollText.prototype.standardFontFace = function() {
    return Yanfly.Param.MSGFontName;
};

Window_ScrollText.prototype.standardFontSize = function() {
    return Yanfly.Param.MSGFontSize;
};

//=============================================================================
// Window_NameBox
//=============================================================================

function Window_NameBox() {
    this.initialize.apply(this, arguments);
}

Window_NameBox.prototype = Object.create(Window_Base.prototype);
Window_NameBox.prototype.constructor = Window_NameBox;

Window_NameBox.prototype.initialize = function(parentWindow) {
    this._parentWindow = parentWindow;
    Window_Base.prototype.initialize.call(this, 0, 0, 240, this.windowHeight());
		this._text = '';
		this._openness = 0;
		this._closeCounter = 0;
		this.deactivate();
		if (eval(Yanfly.Param.MSGNameBoxClear)) {
			this.backOpacity = 0;
			this.opacity = 0;
		}
};

Window_NameBox.prototype.windowWidth = function() {
		this.resetFontSettings();
    var dw = this.textWidthEx(this._text);
		dw += this.padding * 2;
		return dw + eval(Yanfly.Param.MSGNameBoxPadding);
};

Window_NameBox.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_NameBox.prototype.calcNormalCharacter = function(textState) {
    return this.textWidth(textState.text[textState.index++]);
};

Window_NameBox.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_NameBox.prototype.standardFontFace = function() {
    return Yanfly.Param.MSGFontName;
};

Window_NameBox.prototype.standardFontSize = function() {
    return Yanfly.Param.MSGFontSize;
};

Window_NameBox.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this.active) return;
		if (this.isClosed()) return;
		if (this.isClosing()) return;
		if (this._closeCounter-- > 0) return;
		this.close();
};

Window_NameBox.prototype.refresh = function(text, position) {
		this._text = Yanfly.Param.MSGNameBoxText + text;
		this._position = position;
		this.width = this.windowWidth();
		this.createContents();
		this.contents.clear();
		this.resetFontSettings();
		this.changeTextColor(this.textColor(Yanfly.Param.MSGNameBoxColor));
		var padding = eval(Yanfly.Param.MSGNameBoxPadding) / 2;
		this.drawTextEx(this._text, padding, 0, this.contents.width);
		this._parentWindow.adjustWindowSettings();
		this._parentWindow.updatePlacement();
		this.adjustPositionX();
		this.adjustPositionY();
		this.open();
		this.activate();
		this._closeCounter = 4;
		return '';
};

Window_NameBox.prototype.adjustPositionX = function() {
    if (this._position === 1) {
			this.x = this._parentWindow.x;
			this.x += eval(Yanfly.Param.MSGNameBoxBufferX);
		} else if (this._position === 2) {
			this.x = this._parentWindow.x;
			this.x += this._parentWindow.width * 3 / 10;
			this.x -= this.width / 2;
		} else if (this._position === 3) {
			this.x = this._parentWindow.x;
			this.x += this._parentWindow.width / 2;
			this.x -= this.width / 2;
		} else if (this._position === 4) {
			this.x = this._parentWindow.x;
			this.x += this._parentWindow.width * 7 / 10;
			this.x -= this.width / 2;
		} else {
			this.x = this._parentWindow.x + this._parentWindow.width;
			this.x -= this.width;
			this.x -= eval(Yanfly.Param.MSGNameBoxBufferX);
		}
		this.x = this.x.clamp(0, Graphics.boxWidth - this.width);
};

Window_NameBox.prototype.adjustPositionY = function() {
		if ($gameMessage.positionType() === 0) {
			this.y = this._parentWindow.y + this._parentWindow.height;
			this.y -= eval(Yanfly.Param.MSGNameBoxBufferY);
		} else {
			this.y = this._parentWindow.y;
			this.y -= this.height;
			this.y += eval(Yanfly.Param.MSGNameBoxBufferY);
		}
};

//=============================================================================
// Window_Message
//=============================================================================

Yanfly.Message.Window_Message_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function() {
		Yanfly.Message.Window_Message_initialize.call(this);
		this._messageWindow = true;
};

Yanfly.Message.Window_Message_subWindows = Window_Message.prototype.subWindows;
Window_Message.prototype.subWindows = function() {
    var subWindows = Yanfly.Message.Window_Message_subWindows.call(this);
		subWindows = subWindows.concat([this._nameWindow]);
		return subWindows;
};

Yanfly.Message.Window_Message_createSubWindows =
		Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function() {
    Yanfly.Message.Window_Message_createSubWindows.call(this);
		this._nameWindow = new Window_NameBox(this);
		Yanfly.nameWindow = this._nameWindow;
};

Window_Message.prototype.numVisibleRows = function() {
		return $gameSystem.messageRows();
};

Window_Message.prototype.windowWidth = function() {
    return $gameSystem.messageWidth();
};

Window_Message.prototype.adjustWindowSettings = function() {
		this.width = this.windowWidth();
		this.height = Math.min(this.windowHeight(), Graphics.boxHeight);
		if (Math.abs(Graphics.boxHeight - this.height) < this.lineHeight()) {
			this.height = Graphics.boxHeight;
		}
		this.createContents();
		this.x = (Graphics.boxWidth - this.width) / 2;
};

Yanfly.Message.Window_Message_startMessage =
		Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    this._nameWindow.deactivate();
		Yanfly.Message.Window_Message_startMessage.call(this);
};

Yanfly.Message.Window_Message_terminateMessage =
		Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    this._nameWindow.deactivate();
		Yanfly.Message.Window_Message_terminateMessage.call(this);
};

Yanfly.Message.Window_Message_newPage =
		Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function(textState) {
    this.adjustWindowSettings();
		Yanfly.Message.Window_Message_newPage.call(this, textState);
};

Window_Message.prototype.standardFontFace = function() {
    return Yanfly.Param.MSGFontName;
};

Window_Message.prototype.standardFontSize = function() {
    return Yanfly.Param.MSGFontSize;
};

Window_Message.prototype.newLineX = function() {
    if ($gameMessage.faceName() === '') {
			return 0;
		} else {
			return eval(Yanfly.Param.MSGFaceIndent);
		}
};

Window_Message.prototype.isFastForward = function() {
		return eval(Yanfly.Param.MSGFastForward);
};

Yanfly.Message.Window_Message_updateInput =
		Window_Message.prototype.updateInput;
Window_Message.prototype.updateInput = function() {
    if (this.pause && this.isFastForward()) {
			if (!this._textState) {
				this.pause = false;
				this.terminateMessage();
			}
		}
		return Yanfly.Message.Window_Message_updateInput.call(this);
};

Yanfly.Message.Window_Message_updateShowFast =
		Window_Message.prototype.updateShowFast;
Window_Message.prototype.updateShowFast = function() {
    if (this.isFastForward()) this._showFast = true;
		Yanfly.Message.Window_Message_updateShowFast.call(this);
};

Yanfly.Message.Window_Message_updateWait =
		Window_Message.prototype.updateWait;
Window_Message.prototype.updateWait = function() {
    if (this.isFastForward()) return false;
		return Yanfly.Message.Window_Message_updateWait.call(this);
};

Yanfly.Message.Window_Message_startWait =
		Window_Message.prototype.startWait;
Window_Message.prototype.startWait = function(count) {
		if (this._checkWordWrapMode) return;
		Yanfly.Message.Window_Message_startWait.call(this, count);
		if (this.isFastForward()) this._waitCount = 0;
};

Yanfly.Message.Window_Message_startPause =
		Window_Message.prototype.startPause;
Window_Message.prototype.startPause = function() {
		if (this._checkWordWrapMode) return;
		Yanfly.Message.Window_Message_startPause.call(this);
};

Window_Message.prototype.convertEscapeCharacters = function(text) {
    text = Window_Base.prototype.convertEscapeCharacters.call(this, text);
		text = this.convertNameBox(text);
		text = this.convertMessageCharacters(text);
    return text;
};

Window_Message.prototype.convertNameBox = function(text) {
		text = text.replace(/\x1bN\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 1);
		}, this);
		text = text.replace(/\x1bN1\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 1);
		}, this);
		text = text.replace(/\x1bN2\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 2);
		}, this);
		text = text.replace(/\x1bN3\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 3);
		}, this);
		text = text.replace(/\x1bNC\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 3);
		}, this);
		text = text.replace(/\x1bN4\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 4);
		}, this);
		text = text.replace(/\x1bN5\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 5);
		}, this);
		text = text.replace(/\x1bNR\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 5);
		}, this);
    return text;
};

Window_Message.prototype.convertMessageCharacters = function(text) {
		text = text.replace(/\x1bAF\[(\d+)\]/gi, function() {
				var i = parseInt(arguments[1])
				return this.convertActorFace($gameActors.actor(i));
		}.bind(this));
		text = text.replace(/\x1bPF\[(\d+)\]/gi, function() {
				var i = parseInt(arguments[1])
				return this.convertActorFace($gameParty.members()[i - 1]);
		}.bind(this));
    return text;
};

Window_Message.prototype.convertActorFace = function(actor) {
		$gameMessage.setFaceImage(actor.faceName(), actor.faceIndex());
    return '';
};

Yanfly.Message.Window_Message_processEscapeCharacter =
		Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case '!':
			if (!this.isFastForward()) this.startPause();
      break;
		case 'W':
			this.startWait(this.obtainEscapeParam(textState));
    default:
      Yanfly.Message.Window_Message_processEscapeCharacter.call(this,
				code, textState);
      break;
    }
};

//=============================================================================
// End of File
//=============================================================================
