//==========================================================================================================================================================
// Alpha ABS MAIN
//==========================================================================================================================================================
(function () {
	
	//PLATFORM
	var SDK = PLATFORM.SDK;

	var SMouse = AlphaABS.UTILS.SMouse;
	var LOGW = AlphaABS.SYSTEM.LOGW;
	var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;

	if (!Utils.isMobileDevice())
		SMouse.initMouseTrack();

	//Input
	//------------------------------------------------------------------------------
	Input.loadSchemeABS = function () {
		AlphaABS.LIBS.IKey.loadDefaultKeyConfig();
		AlphaABS.Parameters.loadBindingScheme();
	};
	//END Input
	//------------------------------------------------------------------------------

	//==========================================================================================================================================================
	//MV GAME OBJECTS
	//==========================================================================================================================================================

	//Game_Screen
	//------------------------------------------------------------------------------
	//OVER
	Game_Screen.prototype.realPictureId = function (pictureId) {
		return pictureId;
	};
	//END Game_Screen
	//------------------------------------------------------------------------------

	//Game_Variables
	//------------------------------------------------------------------------------
	Game_Variables.prototype.setUIParam = function (param, value) {
		if (!this._uiParams) {
			this._uiParams = {};
		}
		this._uiParams[param] = value;
	};

	Game_Variables.prototype.getUIParam = function (param) {
		if (this._uiParams) {
			return this._uiParams[param];
		}
		return null;
	};

	Game_Variables.prototype.setUIPosition = function (id, x, y, vis, extra) {
		if (!this._uiPositions)
			this._uiPositions = {};
		vis = SDK.check(vis, null);
		extra = SDK.check(extra, null);
		this._uiPositions[id] = [x, y, vis, extra];
	};

	Game_Variables.prototype.getUIPosition = function (id) {
		try {
			if (this._uiPositions) {
				var p = this._uiPositions[id];
				if (p) {
					return {
						x: p[0],
						y: p[1],
						vis: SDK.check(p[2], null),
						extra: SDK.check(p[3], null)
					};
				}
			}
		} catch (e) {
			console.error(e);
			return null;
		}
		return null;
	};
	//END Game_Variables
	//------------------------------------------------------------------------------

	//==========================================================================================================================================================
	//MV SCENES
	//==========================================================================================================================================================

	//Scene_Title
	//------------------------------------------------------------------------------
	var _Scene_Title_start = Scene_Title.prototype.start;
	Scene_Title.prototype.start = function () {
		BattleManagerABS.clearABS();
		_Scene_Title_start.call(this);
	};
	//END Scene_Title
	//------------------------------------------------------------------------------

	//Scene_Gameover
	//------------------------------------------------------------------------------
	var _Scene_Gameover_create = Scene_Gameover.prototype.create;
	Scene_Gameover.prototype.create = function () {
		$gameMap.stopABS();
		_Scene_Gameover_create.call(this);
	};
	//END Scene_Gameover
	//------------------------------------------------------------------------------

	//Scene_Title
	//------------------------------------------------------------------------------
	var _Scene_Title_create = Scene_Title.prototype.create;
	Scene_Title.prototype.create = function () {
		$gameMap.stopABS();
		_Scene_Title_create.call(this);
	};
	//END Scene_Title
	//------------------------------------------------------------------------------

	//Scene_Boot
	//------------------------------------------------------------------------------
	var pkd_SceneBoot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function () {
		pkd_SceneBoot_start.call(this);
		AlphaABS.printVersionInfo();
		if (!AlphaABS.Parameters.isLoaded()) {
			LOGW.p("Warning! Plugin parameters not finded, used default settings");
		} else {
			AlphaABS.Parameters.loadAllStrings();
		}
		AlphaABS.ApplyExtraPluginsSupport();
		BattleManagerABS.init();
		SlowUpdateManager.init();
	};
	//END Scene_Boot
	//------------------------------------------------------------------------------

	AlphaABS.isABS = function() {
		var i1 = SceneManager._scene;
		if(i1)
			i1 = i1 instanceof Scene_Map;
		var i2 = $gameMap.isABS();
		return i1 && i2;
	};

	AlphaABS.error = function (error, message) {
		if(AlphaABS._errorLog == undefined) {
			AlphaABS._errorLog = new KDCore.DevLog('Alpha ABS Error');
			AlphaABS._errorLog.setColors(KDCore.Color.RED, KDCore.Color.BLACK.getLightestColor(225));
			AlphaABS._errorLog.on();
		}
		if (message)
			AlphaABS._errorLog.p(message);
		console.error(error);
		if (!Utils.isNwjs()) return;
		require('nw.gui').Window.get().showDevTools();
	};

	AlphaABS.warning = function (error, message) {
		LOGW.p("Warning! " + message);
		console.warn(error);
	};

})();