/*
 * Official Web Page
 * <https://kagedesuworkshop.blogspot.ru/p/alpha-abs.html>
 */

//=============================================================================
// Alpha_ABS_Extension_KeyBinding
//=============================================================================
//Version 1.0 (22.07.2018)

/*:
 * @author Pheonix KageDesu
 * @plugindesc Key binding menu for Alpha ABS
 * @help Extension for Alpha ABS. 
 * Require plugin Alpha ABS version 1.2 (900) and above
 * Add in game Key binding menu for all standard Alpha ABS keys to Option menu
 */


(function () {

    let MIN_ABS_BUILD = 900;

    if (!Imported || !Imported.AlphaABS) {
        console.log("KeyBinding extension : Alpha ABS plugin not found!");
        return;
    }

    if (AlphaABS.Build < MIN_ABS_BUILD) {
        console.log("KeyBinding extension : update Alpha ABS for this extension!");
        return;
    }

    AlphaABS.SYSTEM.EXTENSIONS.KEY_BINDING = true;

    var ABSKey = AlphaABS.Key;
    var Consts = AlphaABS.SYSTEM;

    var LOG = new KDCore.DevLog("EX_KeyBinding");
    LOG.applyExtensionColors();
    LOG.p("Inited");

    //Scene_KeyBinder
    //------------------------------------------------------------------------------
    function Scene_KeyBinder() {
        this.initialize.apply(this, arguments);
    }

    Scene_KeyBinder.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_KeyBinder.prototype.constructor = Scene_KeyBinder;

    Scene_KeyBinder.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_KeyBinder.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createOptionsWindow();
    };

    Scene_KeyBinder.prototype.terminate = function () {
        $gameVariables._absUserKeys = AlphaABS.LIBS.IKey.getGameRawKeys;
        Scene_MenuBase.prototype.terminate.call(this);
    };

    Scene_KeyBinder.prototype.createOptionsWindow = function () {
        this._optionsWindow = new Window_KeyBinderMain();
        this._optionsWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._optionsWindow);

        this._helpWindowB = new Window_KeyBinderHelp(this._optionsWindow.x, this._optionsWindow.y + this._optionsWindow.height, this._optionsWindow.width, 60);
        this.addWindow(this._helpWindowB);
        this._optionsWindow.setHelpWindow(this._helpWindowB);
    };

    AlphaABS.register(Scene_KeyBinder);
    //END Scene_KeyBinder
    //------------------------------------------------------------------------------

    //Scene_KeyBinderComplex
    //------------------------------------------------------------------------------
    function Scene_KeyBinderComplex() {
        this.initialize.apply(this, arguments);
    }

    Scene_KeyBinderComplex.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_KeyBinderComplex.prototype.constructor = Scene_KeyBinderComplex;

    Scene_KeyBinderComplex.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_KeyBinderComplex.prototype.bindMode = function () {
        return 'controlPanel';
    };

    Scene_KeyBinderComplex.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createOptionsWindow();
    };

    Scene_KeyBinderComplex.prototype.createOptionsWindow = function () {
        this._optionsWindow = new Window_KeyBinderComplex(this.bindMode());
        this._optionsWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._optionsWindow);

        var h = 120;
        this._viewWindow = new Window_KeyBinderView(this._optionsWindow.x, this._optionsWindow.y - h, this._optionsWindow.width, h, this.bindMode());
        this.addWindow(this._viewWindow);

        this._optionsWindow.setViewWindow(this._viewWindow);

        this._helpWindowB = new Window_KeyBinderHelp(this._optionsWindow.x, this._optionsWindow.y + this._optionsWindow.height, this._optionsWindow.width, 60);
        this.addWindow(this._helpWindowB);
        this._optionsWindow.setHelpWindow(this._helpWindowB);
    };
    //END Scene_KeyBinderComplex
    //------------------------------------------------------------------------------

    //Scene_KeyBinderComplexSkills
    //------------------------------------------------------------------------------
    function Scene_KeyBinderComplexSkills() {
        this.initialize.apply(this, arguments);
    }

    Scene_KeyBinderComplexSkills.prototype = Object.create(Scene_KeyBinderComplex.prototype);
    Scene_KeyBinderComplexSkills.prototype.constructor = Scene_KeyBinderComplexSkills;


    Scene_KeyBinderComplexSkills.prototype.bindMode = function () {
        return 'skillsPanel';
    };
    //END Scene_KeyBinderComplexSkills
    //------------------------------------------------------------------------------

    //Scene_KeyBinderComplexWeapons
    //------------------------------------------------------------------------------
    function Scene_KeyBinderComplexWeapons() {
        this.initialize.apply(this, arguments);
    }

    Scene_KeyBinderComplexWeapons.prototype = Object.create(Scene_KeyBinderComplex.prototype);
    Scene_KeyBinderComplexWeapons.prototype.constructor = Scene_KeyBinderComplexWeapons;

    Scene_KeyBinderComplexWeapons.prototype.bindMode = function () {
        return 'weaponCircle';
    };
    //END Scene_KeyBinderComplexWeapons
    //------------------------------------------------------------------------------

    //Window_KeyBinderMain
    //------------------------------------------------------------------------------
    function Window_KeyBinderMain() {
        this.initialize.apply(this, arguments);
    }

    Window_KeyBinderMain.prototype = Object.create(Window_Options.prototype);
    Window_KeyBinderMain.prototype.constructor = Window_KeyBinderMain;

    //OVER
    Window_KeyBinderMain.prototype.makeCommandList = function () {
        this.addGeneralBind();
        this.addComplexBind();
        this.addDefalutCommand();
    };

    //OVER
    Window_KeyBinderMain.prototype.update = function () {
        Window_Options.prototype.update.call(this);
        //if (this._keyChangeMode == true) {}
    };

    //NEW
    Window_KeyBinderMain.prototype.addGeneralBind = function () {
        this.addCommand(Consts.STRING_MENU_KB_TAB, '5');
    };

    //NEW
    Window_KeyBinderMain.prototype.addComplexBind = function () {
        this.addCommand(Consts.STRING_MENU_KB_SKILLS, 'complex_bind_1');
        this.addCommand(Consts.STRING_MENU_KB_CONTRL, 'complex_bind_2');
        if (AlphaABS.Parameters.isWeaponsAllowed() == true)
            this.addCommand(Consts.STRING_MENU_KB_WEAPON, 'complex_bind_3');
    };

    //NEW
    Window_KeyBinderMain.prototype.addDefalutCommand = function () {
        this.addCommand(Consts.STRING_MENU_KB_DEF, 'complex_default');
        this.addCommand(Consts.STRING_MENU_KB_BACK, 'complex_back');
    };

    Window_KeyBinderMain.prototype.commandName = function (index) {
        var name = Window_Command.prototype.commandName.call(this, index);
        var symbol = this.commandSymbol(index);
        if (symbol == 'complex_default')
            this.changeTextColor(Color.YELLOW.CSS);
        return name;
    };

    //OVER
    Window_KeyBinderMain.prototype.statusText = function (index) {
        this.resetTextColor();
        var symbol = this.commandSymbol(index);
        if (this.isComplexCommand(symbol)) {
            if (this.isComplexBind(symbol)) {
                this.changeTextColor(Color.GREEN.CSS);
                return '[...]';
            } else
                return '';
        } else {
            this.changeTextColor(Color.ORANGE.CSS);
            var x = AlphaABS.LIBS.IKey;
            var keyS = x.getGameKeyByIndex(parseInt(symbol));
            return x.convertIKeyToLetter(keyS).toUpperCase();
        }
    };

    //OVER
    Window_KeyBinderMain.prototype.processOk = function () {
        SoundManager.playCursor();
        var index = this.index();
        var symbol = this.commandSymbol(index);
        if (this.isComplexCommand(symbol)) {
            if (this.isComplexBind(symbol)) {
                if (symbol.contains("2")) {
                    SceneManager.push(Scene_KeyBinderComplex);
                }
                if (symbol.contains("1")) {
                    SceneManager.push(Scene_KeyBinderComplexSkills);
                }

                if (symbol.contains("3")) {
                    SceneManager.push(Scene_KeyBinderComplexWeapons);
                }
            } else {
                if (symbol.contains("_back")) {
                    this.processCancel();
                } else {
                    SoundManager.playOk();
                    Input.loadSchemeABS();
                    this.refresh();
                    LOG.p("Keys binding reset to DEFAULT");
                }
            }
        } else {
            ABSKey.setKeyToChange(symbol, this);
            this._keyChangeMode = true;
            document.addEventListener('keypress', ABSKey.onKeyPress);
            this.activateHelp();
            this.deactivate();
        }
    };

    //NEW
    Window_KeyBinderMain.prototype.onKeyOk = function (isKey) {
        if (isKey) {
            this._keyChangeMode = false;
            SoundManager.playOk();
            document.removeEventListener('keypress', ABSKey.onKeyPress);
            this.activate();
            this.refresh();
            this.deactivateHelp();
        } else {
            SoundManager.playBuzzer();
        }
    };

    //NEW
    Window_KeyBinderMain.prototype.isComplexCommand = function (symbol) {
        return symbol.contains('complex');
    };

    //NEW
    Window_KeyBinderMain.prototype.isComplexBind = function (symbol) {
        return this.isComplexCommand(symbol) && symbol.contains('bind');
    };

    //NEW
    Window_KeyBinderMain.prototype.activateHelp = function () {
        if (this._helpWindow) {
            this._helpWindow.show();
            this._helpWindow.open();
        }
    };

    //NEW
    Window_KeyBinderMain.prototype.deactivateHelp = function () {
        if (this._helpWindow) {
            this._helpWindow.close();
        }
    };
    //END Window_KeyBinderMain
    //------------------------------------------------------------------------------

    //Window_KeyBinderComplex
    //------------------------------------------------------------------------------
    function Window_KeyBinderComplex() {
        this.initialize.apply(this, arguments);
    }

    Window_KeyBinderComplex.prototype = Object.create(Window_KeyBinderMain.prototype);
    Window_KeyBinderComplex.prototype.constructor = Window_KeyBinderComplex;

    Window_KeyBinderComplex.prototype.initialize = function (mode) {
        this._mode = mode;
        Window_KeyBinderMain.prototype.initialize.call(this);
    };

    Window_KeyBinderComplex.prototype.setViewWindow = function (viewWindow) {
        this._viewWindow = viewWindow;
    };

    //NEW
    Window_KeyBinderComplex.prototype.addGeneralBind = function () {
        switch (this._mode) {
            case 'controlPanel':
                this.addCommand(Consts.STRING_MENU_KB_ATTACK, '3');
                if (AlphaABS.Parameters.isFollowAllowed() == true)
                    this.addCommand(Consts.STRING_MENU_KB_FOLLOW, '0');
                if (AlphaABS.Parameters.isJumpAllowed() == true)
                    this.addCommand(Consts.STRING_MENU_KB_JUMP, '2');
                if (AlphaABS.Parameters.isRotateAllowed() == true)
                    this.addCommand(Consts.STRING_MENU_KB_ROTATE, '1');
                if (AlphaABS.Parameters.isWeaponsAllowed() == true)
                    this.addCommand(Consts.STRING_MENU_KB_WEAP, '4');
                break;
            case 'skillsPanel':
                var t = Consts.STRING_MENU_KB_SLOT;
                this.addCommand(t + ' 1', '10');
                this.addCommand(t + ' 2', '11');
                this.addCommand(t + ' 3', '12');
                this.addCommand(t + ' 4', '13');
                this.addCommand(t + ' 5', '14');
                this.addCommand(t + ' 6', '15');
                this.addCommand(t + ' 7', '16');
                this.addCommand(t + ' 8', '17');
                break;
            case 'weaponCircle':
                this.addCommand(Consts.STRING_MENU_KB_TOP, '6');
                this.addCommand(Consts.STRING_MENU_KB_RIGHT, '7');
                this.addCommand(Consts.STRING_MENU_KB_BOTTOM, '8');
                this.addCommand(Consts.STRING_MENU_KB_LEFT, '9');
                break;
        }
    };

    //OVER
    Window_KeyBinderComplex.prototype.refresh = function () {
        Window_KeyBinderMain.prototype.refresh.call(this);
        if (this._viewWindow) this._viewWindow.refresh();
    };

    //NEW
    Window_KeyBinderComplex.prototype.addComplexBind = function () {
        //EMPTY
    };

    //NEW
    Window_KeyBinderComplex.prototype.addDefalutCommand = function () {
        this.addCommand(Consts.STRING_MENU_KB_BACK, 'complex_back');
    };

    //END Window_KeyBinderComplex
    //------------------------------------------------------------------------------

    //Window_KeyBinderHelp
    //------------------------------------------------------------------------------
    function Window_KeyBinderHelp() {
        this.initialize.apply(this, arguments);
    }

    Window_KeyBinderHelp.prototype = Object.create(Window_Base.prototype);
    Window_KeyBinderHelp.prototype.constructor = Window_KeyBinderHelp;

    Window_KeyBinderHelp.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._timer = new Game_TimerABS();
        this._tSprite = new Sprite(new Bitmap(width - 6, height - 6));
        this._tSprite.y = 0;
        this._tSprite.bitmap.textColor = Color.RED.getLightestColor(200).CSS;
        this._tSprite.bitmap.drawText(Consts.STRING_MENU_KB_KEY, 0,
            this._tSprite.bitmap.height / 2,
            this._tSprite.bitmap.width, 1, 'center');
        this.addChild(this._tSprite);

        this.swing = new AlphaABS.LIBS.UIObject_OpacitySwing(this._tSprite, 70);
        this.swing.setRepeat();

        this.hide();
        this.close();
    };

    Window_KeyBinderHelp.prototype.close = function () {
        this.swing.stop();
        this.swing.reset();
        this._tSprite.visible = false;
        Window_Base.prototype.close.call(this);
    };

    Window_KeyBinderHelp.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        this.refresh();
    };

    Window_KeyBinderHelp.prototype.refresh = function () {
        if (this.isOpen()) {
            if (!this.swing.isStarted()) {
                this._tSprite.visible = true;
                this.swing.start();
            }
            this.swing.update();
        }
    };

    Window_KeyBinderHelp.prototype.clear = function () {};
    //------------------------------------------------------------------------------

    //Window_KeyBinderView
    //------------------------------------------------------------------------------
    function Window_KeyBinderView() {
        this.initialize.apply(this, arguments);
    }

    Window_KeyBinderView.prototype = Object.create(Window_Base.prototype);
    Window_KeyBinderView.prototype.constructor = Window_KeyBinderView;

    Window_KeyBinderView.prototype.initialize = function (x, y, width, height, mode) {
        this._mode = mode;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._configMode();
    };

    Window_KeyBinderView.prototype.setViewNode = function (viewNode) {
        this._viewNode = viewNode;
        if (this._mode != 'weaponCircle') {
            this._viewNode.x = SDK.toCX(viewNode.width || 341, this.width);
            this._viewNode.y = SDK.toCX(viewNode.height || 48, this.height);
        } else {
            this._viewNode.x = SDK.toCX(viewNode._maxRadius() * 0.15, this.width);
            this._viewNode.y = SDK.toCX(viewNode._minRadius() * 0.06, this.height);
        }
        this.addChild(this._viewNode);
    };

    Window_KeyBinderView.prototype.refresh = function () {
        if (this._viewNode) {
            this._viewNode.refresh();
        }
    };

    Window_KeyBinderView.prototype._configMode = function () {
        switch (this._mode) {
            case 'controlPanel':
                var t = new AlphaABS.LIBS.UIObject_ControlPanel(46, 160);
                t.createBaseItems();
                t.transfer();
                t.setEditMode();
                this.setViewNode(t); //SHIT НЕ нужно размеры задавать, их надо считать
                break;
            case 'skillsPanel':
                var tt = new AlphaABS.LIBS.Sprite_SkillPanelABS_L();
                tt.refresh(null);
                this.setViewNode(tt);
                break;
            case 'weaponCircle':
                var tt = new UIObject_InputCircleConfig();
                tt.refresh();
                tt.scale.x = 0.8;
                tt.scale.y = 0.8;
                this.height = this.height + 50;
                this.y = this.y - 50;
                this.setViewNode(tt);
                break;
        }
    };
    //END Window_KeyBinderView
    //------------------------------------------------------------------------------
    //UIObject_InputCircleConfig
    //------------------------------------------------------------------------------
    class UIObject_InputCircleConfig extends AlphaABS.LIBS.UI_SelectCircle {
        constructor() {
            super(AlphaABS.DATA.IMG.circleSegment.bitmap, true, 24);
        }
        refresh() {
            var x = AlphaABS.LIBS.IKey;
            this.setHelper(x.convertIKeyToLetter(x.CP_W()).toUpperCase(), 0);
            this.setHelper(x.convertIKeyToLetter(x.CP_D()).toUpperCase(), 1);
            this.setHelper(x.convertIKeyToLetter(x.CP_S()).toUpperCase(), 2);
            this.setHelper(x.convertIKeyToLetter(x.CP_A()).toUpperCase(), 3);
            this.showHelpers();
        }
    }

    //END UIObject_InputCircleConfig
    //------------------------------------------------------------------------------

})();