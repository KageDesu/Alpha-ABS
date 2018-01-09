//=============================================================================
// Alpha_ABS.js
//=============================================================================
//Version 1.1 (21.10.2016)

/*:
 * @plugindesc ABS "Alpha"
 * @author Pheonix KageDesu.
 *
 *
 * @param Enemy Dead Switch
 * @desc Event self switch to turn ON when enemy die
 * @default B
 *
 * @param After Dead Map
 * @desc Map where you transfer if your character die (0 - GameOver screen)
 * @default 0
 *
 * @param Cast Animation
 * @desc Standart cast animation ID (0 - default)
 * @default 0
 *
 * @param Level Up Animation
 * @desc ID from database (0 - no animation)
 * @default 49
 *
 * @param Revive Animation
 * @desc ID from database (0 - no animation)
 * @default 45
 *
 * @param Use default cast SE
 * @desc If you use own cast animation with SE change to false (or if you just not like this sound)
 * @default true
 *
 * @param Auto loot enemies
 * @desc If this parameter true - enemies will looting automatically when die, if false use 'ABS loot' plugin command in event for loot enemy
 * @default false
 *
 * @param UI visibility control
 * @desc Allow user change UI visibility from Options menu in game
 * @default true
 *
 * @param UI position control
 * @desc Allow user change UI elements positions from Options menu in game
 * @default true
 *
 * @param Gold icon index
 * @desc Icon index for Gold alert (when you pick up gold from enemies)
 * @default 314
 *
 * @param Key binding
 * @desc Allow user change control keys from Option menu
 * @default true
 *
 * @param Show XP bar
 * @desc Show (true) or hide (false) XP bar on interface
 * @default false
 *
 * @param Dash on ABS map
 * @desc Allows dashing on ABS maps. If 'true' you also can change option 'Always Dash' in option menu.
 * @default false
 *
 * @param Allow Transfrer
 * @desc Allows the transition between locations during the battle (on you risk)
 * @default false
 *
 * @param Force English
 * @desc Use english language (if not work automatically)
 * @default false
 *
 * @param ---Control Panel Settings---
 * @desc
 * @default
 *
 * @param Follow allowed
 * @desc Enable or disable follow mode for player and icon on the control panel
 * @default true
 *
 * @param Jump allowed
 * @desc Enable or disable jumps for palyer and icon on the control panel
 * @default true
 *
 * @param Rotate allowed
 * @desc Enable or disable player rotate and icon on the control panel
 * @default true
 *
 * @param Favorite weapons allowed
 * @desc Enable or disable favorite weapon system and icon on the control panel
 * @default true
 *
 * @help
 * ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-
 * User manual see in file 'Alpha ABS.pdf'
 *
 * X - integer
 * Z - 0 or 1 (boolean)
 * Y - string
 *
 *
 * Plugin Commands:
 *  ABS loot       # Looting enemy (if enemy is dead and 'Auto loot enemies'
 *  turn off). Work on dead enemy map event.
 *
 *  ABS revive X   # Set enemy resurection time is secs. (exmpl. ABS revive 5)
 *   Work on dead enemy map event.
 *
 *  ABS revive X Y # Set enemy with name Y (event name) resurection time is
 *  secs. (exmpl. ABS revive 5 Bat)
 *
 *  ABS activate Y # Activate enemy with name Y (event name).
 *   (if enemy been deactivated on start)
 *    If Y not specified, then the current enemy
 *
 *
 *  For UI control use plugin commands:
 *   ABS showUI     Show user interface on ABS map
 *   ABS hideUI     Hide user interface on ABS map
 *   ABS saveUI     Save user interface (positions of elements) to file
 *    (Data folder). Work on ABS map.
 *   ABS loadUI     Load saved user interface (positions of elements) from
 *    file. (If exists)
 *
 *   <reviveTime:X> - # of seconds before an enemy auto-revives.
 *
 * ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-
 *  Location of commands: \/(Updated 9/10/16 by DG)\/
 * ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-
 *   Maps Notetags:
 *    <ABS> - Enables the Alpha ABS system on this map
 *
 *
 * ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-
 *   Actor Notetags:
 *
 * ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-
 *   Enemy Event Notetags:
 *    <ABS: 1> - Makes this event inherit the parameters stored in Enemy #0001.
 *    Change the 1 to the # of the enemy you want this event to be.
 *
 *    Use self switch B (by default) when an enemy event should be dead.
 *
 *
 * ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-
 *   Enemy Notetags: (by defult)
 *  <viewRadius: X> - how long (map cells) enemy will see you (5)
 *  <returnRadius : X> - how many cells maximum enemy can escape from the last position where he fought  (12)
 *  <escapeOnBattle: Z> - whether to escape from player during a battle when there is no available actions or waiting for attack cool down (0)
 *  <canSearch: Z> - can enemy hear everything happening around him (the reaction to the battle near (in the area of viewRadius param)) (1)
 *  <noFight: Z> - no fight at all (0) (like dummy in demo game)
 *  <reviveTime: X> - time (in seconds) to reborn after death (0) (0 – not reborn after death)
 *  <regen: Z> - health regeneration (not in battle mode) (1)
 *  <slow: Z>  - not accelerating in pursuit (0)
 *  <returnType: X>  - 0 - fast, 1 - normal, 2 - stay (not return at all)
 *  <agressive: Z> - is agressive? (always approach the palyer) (1)
 *  <noMove: Z> - can't moving during battle (0)
 *  <noEmote: Z> - no ballon animation (0)
 *  <cEonStart: X> - call common Event with ID (X) when start battle (see player)
 *  <cEonEnd: X> - call common Event with ID (X) when stop battle (after start)
 *  <cEonDeath: X> - call Common Event with ID (X) on Death
 *
 * ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-
 *   Skill Notetags:
 *    <ABS:0> “Instant” – performed on target.
 *      Scope: The User or One Enemy.
 *      Additional Tags: <directionFix:0> or <directionFix:1> - Restrict to line.
 *
 *    <ABS:1> “Vector” – It creates an object (a vector), which will
 *     follow to the target and perform when hitting the target.
 *      Scope: One Enemy.
 *      Additional Tags: <img:w> (w = pictureName.png) - Picture assigned.
 *        <vSpeed:x> - Flight velocity. <radius:x> - (Max 5).
 *        <directionFix:0> or <directionFix:1> - Restrict to line.
 *     Particle effects:
 *      <pType:W>
 *      <pData:W>
 *      <pMinSize:X>
 *      <pMaxSize:X>
 *      <pPower:X>
 *      <pLife:X>
 *      <pAlpha:X>
 *      <pCount:X>
 *     Lighting System:
 *      <light:W>
 *      <lightSize:X>
 *
 *    <ABS:2> “Circle” – creates the rounded area (circle), performed
 *     on all the objects that are in area.
 *      Scope: One Enemy or All Enemies. <radius:x> - (Max 5).
 *
 *    <ABS:3> “Zone” – creates a certain zone in the direction of use,
 *     performed on all the objects that be in area..
 *      Scope: All Enemies.
 *
 *     --All--
 *    <range:x> Range. (In map cells)
 *    <castTime:x> Casting time. (In frames)
 *    <reloadTime:x> Cool down time (In frames)
 *    <reloadParam:w> Cool down attribute. (Param/60 wait)
 *    <startSound:w> Sound when used.
 *    <castAnim:x> Animation when casting. (ID# of animation from in database)
 *    <ammo:X> - X is # of item that is the ammo.
 *    <cEonStart:X> - call CommonEvent with id X when trigger the skill.
 *    <cEonUse:X> - call CommonEvent with id X when using the skill.
 *    <noDescription:1> - hide description on popup info on ABS map.
 *
 * ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-
 *  Weapon Notetags:
 *   <ABS: 0>
 *   <ABS: 1>
 *    ( <castTime:X> and <radius:X> are not supported for weapon <ABS: 1>
 *       You can't use area of attack melee weapons. )
 *
 *   <ammo:X> - X is # of item that is the ammo.
 *
 *   <stack:X> - Charges count, minimum is 2. (For making items with charges.)
 *   <stackTime:X> - All charges reload time (in frames), cannot be 0.
 *   * also includes skill notetags
 * ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-
 *  State Notetags:
 *    <speed:X> - change current movement speed (if X < 0, value will be substracted)
 * ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-
 *
 *
 * @requiredAssets img/ABS/vector
 * @requiredAssets img/ABS/Bar
 * @requiredAssets img/ABS/BarMask
 * @requiredAssets img/ABS/BarSmall
 * @requiredAssets img/ABS/BarSmallMask
 * @requiredAssets img/ABS/Target
 * @requiredAssets img/ABS/InBattleIcon
 * @requiredAssets img/ABS/InBattleMask
 * @requiredAssets img/ABS/ItemMask
 * @requiredAssets img/ABS/SkillPanel
 * @requiredAssets img/ABS/Target
 * @requiredAssets img/ABS/User
 * @requiredAssets img/ABS/EnemyUIMask
 * @requiredAssets img/ABS/ControlPanelItem
 * @requiredAssets img/ABS/RadiusSelect
 * @requiredAssets img/ABS/levelBar
 * @requiredAssets img/ABS/CircleSegment_small
 * @requiredAssets img/ABS/CircleSegment_small_down
 * @requiredAssets img/ABS/CircleSegment_small_L
 * @requiredAssets img/ABS/CircleSegment_small_R
 * @requiredAssets img/ABS/icon_follow
 * @requiredAssets img/ABS/icon_gold
 * @requiredAssets img/ABS/icon_jump
 * @requiredAssets img/ABS/icon_noWeapon
 * @requiredAssets img/ABS/icon_toMouse
 * @requiredAssets img/ABS/icon_toTarget
 * @requiredAssets img/ABS/icon_eyeOn
 * @requiredAssets img/ABS/icon_eyeOff
 * @requiredAssets img/ABS/icon_transfer
 * @requiredAssets img/ABS/icon_switchWeapon
 * @requiredAssets audio/se/Equip2
 * @requiredAssets audio/se/Coin
 * @requiredAssets audio/se/Magic3
 * @requiredAssets img/animations/StateDown1
 */

/*:ru
 * @plugindesc ABS "Alpha"
 * @author Pheonix KageDesu.
 *
 *
 * @param Enemy Dead Switch
 * @desc Локальный переключатель, который будет активирован (ON) когда враг умрёт
 * @default B
 *
 * @param After Dead Map
 * @desc ID карты куда будет перенесён игрок если погибнет (0 - Конец игры)
 * @default 0
 *
 * @param Cast Animation
 * @desc ID анимации для чтения заклинаний (0 - стандартная)
 * @default 0
 *
 * @param Level Up Animation
 * @desc ID анимации при новом уровне (0 - анимация не нужна)
 * @default 49
 *
 * @param Revive Animation
 * @desc ID анимации воскрешения противника (0 - анимация не нужна)
 * @default 45
 *
 * @param Use default cast SE
 * @desc Проигрывать ли стандартный звук анимации чтения заклинания. (true - да, false - нет)
 * @default true
 *
 * @param Auto loot enemies
 * @desc Собирать добычу с убитых врагов автоматически (если нет, то используйте команду ABS loot) (true - да, false - нет)
 * @default false
 *
 * @param UI visibility control
 * @desc Может ли игрок включать или выключать отображение интерфейса через меню настроек игры? (true - да, false - нет)
 * @default true
 *
 * @param UI position control
 * @desc Может ли игрок менять положение элементов интерфейса во время игры? (true - да, false - нет)
 * @default true
 *
 * @param Gold icon index
 * @desc Номер иконки для строки с золотом (когда вы подбираете золото у врагов)
 * @default 314
 *
 * @param Key binding
 * @desc Можно ли менять настройки управления (назначение клавишь)
 * @default true
 *
 * @param Show XP bar
 * @desc Показывать (true) или спрятать (false) полосу опыта на интерфейсе
 * @default false
 *
 * @param Dash on ABS map
 * @desc Можно ли ускорятся при помощи клавиши Shift (мыши) на ABS картах.
 * @default false
 *
 * @param Allow Transfrer
 * @desc Можно ли переходить между локациями во время боя? (на ваш риск)
 * @default false
 *
 * @param Force English
 * @desc Использовать английский язык? (true - да, false - нет)
 * @default false
 *
 * @param ---Настройка панели управления---
 * @desc
 * @default
 *
 * @param Follow allowed
 * @desc Включить (true) или выключить (false) режим следования для игрока
 * @default true
 *
 * @param Jump allowed
 * @desc Включить (true) или выключить (false) возможность прыгать для игрока
 * @default true
 *
 * @param Rotate allowed
 * @desc Включить (true) или выключить (false) поворот к цели (мыши)
 * @default true
 *
 * @param Favorite weapons allowed
 * @desc Включить (true) или выключить (false) систему любимого оружия
 * @default true
 *
 * @help
 * Инструкцию к боевой системе смотрите в файле 'Alpha ABS RUS.pdf'
 *
 * Plugin Commands: (Команды доп. модуля)
 *  ABS loot        # Собрать добычу с врага (если параметр 'Auto loot enemies' выключен). Работает только на мёртвых врагах.
 *  ABS revive X    # Указать время для воскрешения (в секундах) (пример: ABS revive 5). Работает только на мёртвых врагах.
 *  ABS revive X Y  # Указать время для воскрешения (в секундах) врагу с именем Y (имя события на карте) (пример: ABS revive 5 Bat).
 *  ABS activate Y  # Активировать врага с именем Y (имя события на карте). (Если имя не указать, то текущее событие)
 *  ABS showUI      # Показать интерфейс боевой системы
 *  ABS hideUI      # Скрыть интерфейс боевой системы
 *  ABS saveUI      # Сохранить интерфейс боевой системы (позиции элементов) в файл. Работает только на ABS карте.
 *  ABS loadUI      # Загрузить ранее сохранённый интерфейс (позиции элементов) боевой системы.
 *
 * @requiredAssets img/ABS/vector
 * @requiredAssets img/ABS/Bar
 * @requiredAssets img/ABS/BarMask
 * @requiredAssets img/ABS/BarSmall
 * @requiredAssets img/ABS/BarSmallMask
 * @requiredAssets img/ABS/Target
 * @requiredAssets img/ABS/InBattleIcon
 * @requiredAssets img/ABS/InBattleMask
 * @requiredAssets img/ABS/ItemMask
 * @requiredAssets img/ABS/SkillPanel
 * @requiredAssets img/ABS/Target
 * @requiredAssets img/ABS/User
 * @requiredAssets img/ABS/EnemyUIMask
 * @requiredAssets img/ABS/ControlPanelItem
 * @requiredAssets img/ABS/RadiusSelect
 * @requiredAssets img/ABS/levelBar
 * @requiredAssets img/ABS/CircleSegment_small
 * @requiredAssets img/ABS/CircleSegment_small_down
 * @requiredAssets img/ABS/CircleSegment_small_L
 * @requiredAssets img/ABS/CircleSegment_small_R
 * @requiredAssets img/ABS/icon_follow
 * @requiredAssets img/ABS/icon_gold
 * @requiredAssets img/ABS/icon_jump
 * @requiredAssets img/ABS/icon_noWeapon
 * @requiredAssets img/ABS/icon_toMouse
 * @requiredAssets img/ABS/icon_toTarget
 * @requiredAssets img/ABS/icon_eyeOn
 * @requiredAssets img/ABS/icon_eyeOff
 * @requiredAssets img/ABS/icon_transfer
 * @requiredAssets img/ABS/icon_switchWeapon
 * @requiredAssets audio/se/Equip2
 * @requiredAssets audio/se/Coin
 * @requiredAssets audio/se/Magic3
 * @requiredAssets img/animations/StateDown1
 */

"use strict"



var Imported = Imported || {};
Imported.AlphaABS = true;

var AlphaABS = {};
AlphaABS.version = 110;
AlphaABS.build = 756; //(9.01.2018)

AlphaABS.LIBS = {};

AlphaABS.register = function(library) {
  this.LIBS[library.name] = library;
};

//var DEV = DEV || {}; //For detailed console log


//==========================================================================================================================================================
// JSPlatform
//==========================================================================================================================================================
var PLATFORM = PLATFORM || {};

  if(!PLATFORM.Version) {
  (function($) {
  $.Version = 141;

  //==============================================================================
  //Расширение стандартных классов JS
  //==============================================================================

  //Array
  //------------------------------------------------------------------------------
    Array.prototype.delete = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    Array.prototype.include = function(value) {
      return (this.indexOf(value) != -1);
    }

    Array.prototype.max = function() {
      return Math.max.apply(null, this);
    };

    Array.prototype.min = function() {
      return Math.min.apply(null, this);
    };

    //1.1
    Array.prototype.sample = function() {
      if(this.length == 0) {
        return null;
      } else {
        return this[SDK.rand(0,this.length-1)];
      }
    }

    Array.prototype.first = function() {
      return this[0];
    }

    Array.prototype.last = function() {
      return this[this.length - 1];
    }

    Array.prototype.shuffle = function() {
      var n = this.length;
      while(n > 1) {
        n--;
        var k = SDK.rand(0,n+1);
        var v = this[k];
        this[k] = this[n];
        this[n] = v;
      }
    }


    Array.prototype.count = function() {
      return this.length;
    }

    Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
    };
    //END Array
  //------------------------------------------------------------------------------

  //==============================================================================
  //Расширение стандартных классов MV
  //==============================================================================

  //Rectangle
  //------------------------------------------------------------------------------
    Rectangle.prototype.toArr = function() {
      return [this.x, this.y, this.width, this.height];
    }
    //END Rectangle
  //------------------------------------------------------------------------------

  //Bitmap
  //------------------------------------------------------------------------------
    Object.defineProperty(Bitmap.prototype, 'paintOpacity', {
        get: function() {
            return this._paintOpacity;
        },
        set: function(value) {
          this._paintOpacity = value;
          this._context.globalAlpha = this._paintOpacity / 255;
        },
        configurable: true
    });

    Bitmap.prototype.fillAll = function(color) {
        this.fillRect(0,0,this.width,this.height, color);
      }
    //END Bitmap
  //------------------------------------------------------------------------------

  //Sprite
  //------------------------------------------------------------------------------
    var pkd_Sprite_setBlendColor_98978 = Sprite.prototype.setBlendColor;
    Sprite.prototype.setBlendColor = function(color) {
      if(color instanceof PLATFORM.Color) {
        pkd_Sprite_setBlendColor_98978.call(this, color.ARR);
      }
      else  {
        pkd_Sprite_setBlendColor_98978.call(this, color);
      }
    };

    Sprite.prototype.setStaticAnchor = function(valueX, valueY) {
        this.x -= Math.round(this.width * valueX);
        this.y -= Math.round(this.height * valueY);
    }
    //END Sprite
  //------------------------------------------------------------------------------

  //Sprite_Button
  //------------------------------------------------------------------------------
    //NEW
    Sprite_Button.prototype.isHoverByMouse = function() {
          var x = this.canvasToLocalX(TouchInput.mX);
          var y = this.canvasToLocalY(TouchInput.mY);
          return x >= 0 && y >= 0 && x < this.width && y < this.height;
      };
    //END Sprite_Button
  //------------------------------------------------------------------------------

  //TouchInput
  //------------------------------------------------------------------------------
    var _JSPlatform_3442_TouchInput_onMouseMove = TouchInput._onMouseMove;
      TouchInput._onMouseMove = function(event) {
          _JSPlatform_3442_TouchInput_onMouseMove.call(this, event);
          if (!this._mousePressed) {
            this.mX = Graphics.pageToCanvasX(event.pageX);
            this.mY = Graphics.pageToCanvasY(event.pageY);
          } else {
            this.mX = this._x;
            this.mY = this._y;
          }
      };
    //END TouchInput
  //------------------------------------------------------------------------------

  //Input
  //------------------------------------------------------------------------------
    var pkd_Input_onKeyDown_9323 = Input._onKeyDown;
    Input._onKeyDown = function(event) {
      //console.log(event.keyCode + ' down');
      //TODO Temp solution
      if(event.keyCode == 87) {
        this._currentState['w'] = true;
        return;
      }
      //TODO Temp solution
      if(event.keyCode == 81) {
        this._currentState['q'] = true;
        return;
      }
      var buttonName = this.keyMapper[event.keyCode];
      if(buttonName)
        pkd_Input_onKeyDown_9323.call(this, event);
      else {
        var bn = this.KeyMapperPKD[event.keyCode];
        if(bn) {
          this._currentState[bn] = true;
        }
      }
    }

    var pkd_Input_onKeyUp_9090 = Input._onKeyUp;
    Input._onKeyUp = function(event) {
      //console.log(event.keyCode + ' up');
      //TODO Temp solution
      if(event.keyCode == 87) {
        this._currentState['w'] = false;
        return;
      }
      //TODO Temp solution
      if(event.keyCode == 81) {
        this._currentState['q'] = false;
        return;
      }
      var buttonName = this.keyMapper[event.keyCode];
      if(buttonName)
        pkd_Input_onKeyUp_9090.call(this, event);
      else {
          var bn = this.KeyMapperPKD[event.keyCode];
          if (bn) {
              this._currentState[bn] = false;
          }
      }
    };

    Input._isGamepad = undefined; //Don't use this
    Input.isGamepad = function()
    {
      if(this._isGamepad !== undefined) { return this._isGamepad; }

      this._isGamepad = false;
      if(navigator.getGamepads) {
         var gamepads = navigator.getGamepads();
         if(gamepads) {
          for(var i = 0; i<gamepads.length; i++) {
            if(gamepads[i] !== undefined) {
              this._isGamepad = true;
              break;
            }
          }
         }
      }
      return this._isGamepad;
    }

    Input.IsCancel = function() {
      if(Input.isGamepad()) {
        return Input.isTriggered('pageup'); //GP LB
      } else {
        return (Input.isTriggered('cancel') || TouchInput.isCancelled());
      }
    }

    //Settings
      Input.KeyMapperPKD = {};
      Input.KeyMapperPKD[9] = 'tab';
      Input.KeyMapperPKD[32] = 'space';
      for(var i = 48; i<127; i++) {
          Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
      }
    //END Input
  //------------------------------------------------------------------------------

  //ImageManager
  //------------------------------------------------------------------------------
    ImageManager.ICON_PATH = 'img/icons/';
    ImageManager._iconCache = {};

    ImageManager.loadIcon = function(path, filename) {
        return this.loadBitmap(path, filename, 0, false);
    }

    //path - (string) папка где хранится иконка (напрмер 'img/icons/')
    //iconSymbol - (string/int) символ (либо имя файла (строка), либо номер в IconSet (цифра))
    //size - (int) размер в пикселях (стандартные 24 (ACE) и 32 (MV))
    //forceCopy - (bool) отдельная копия, даже если такая иконка уже была загружена ранее в буфер _iconCache
    //  RETURN (Bitmap) Возвращяет Bitmap (если forceCopy == false, то ссылку на Bitmap из буфера _iconCache)
    ImageManager.getIcon = function(path, iconSymbol, size, forceCopy) {
      if(iconSymbol == null)
        iconSymbol = 'null';
      var key = iconSymbol + ':' + size;
      if(!this._iconCache[key])
        {
        if(typeof iconSymbol == 'string')
        {
          var bitmap = this.loadIcon(path, 'icon_' + iconSymbol);
          var icon_bitmap = new Bitmap(size, size);
          bitmap.addLoadListener(function() {
            icon_bitmap.blt(bitmap, 0,0,bitmap.width, bitmap.height,0,0,size,size);
          });
          this._iconCache[key] = icon_bitmap;
        }
        else
        {
          var bitmap = ImageManager.loadSystem('IconSet');
            var pw = Window_Base._iconWidth;
            var ph = Window_Base._iconHeight;
            var sx = iconSymbol % 16 * pw;
            var sy = Math.floor(iconSymbol / 16) * ph;
            var icon_bitmap = new Bitmap(size, size);
            icon_bitmap.addLoadListener(function() {
              icon_bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0, size, size);
            });
            if(forceCopy) //Force new bitmap
              return icon_bitmap;
            this._iconCache[key] = icon_bitmap;
        }
      }
      return this._iconCache[key];
    }

    ImageManager.getIcon24 = function(iconSymbol) {
      return ImageManager.getIcon(ImageManager.ICON_PATH, iconSymbol, 24, false);
    }

    ImageManager.getIcon32 = function(iconSymbol) {
      return ImageManager.getIcon(ImageManager.ICON_PATH, iconSymbol, 32, false);
    }
    //END ImageManager
  //------------------------------------------------------------------------------

  //==============================================================================
  //Новые классы
  //==============================================================================

  //SDK
  //------------------------------------------------------------------------------
    function SDK() {
      throw new Error('This is a static class, you baka...');
    }

    SDK.times = function(n, method) {
      for(var i = 0; i<n; i++) {
        method(i);
      }
    }

    SDK._isRu = null; //Don't use this
    SDK.isRU = function()
    {
      if(this._isRu == null)
      {
        this._isRu = 0;
        var language = window.navigator.userLanguage || window.navigator.language;
        if(language){
          if(language == 'ru')
            this._isRu = 1;
        }
      }
      return this._isRu;
    }

    SDK.check = function(value, base)
    {
      if(base === undefined)
        base = true;

      if(value === undefined)
        return base;
      else
        return value;
    }

    SDK.rand = function(min, max)
    {
      return Math.round(Math.random() * (max - min)) + min;
    }

    SDK.smartRand = function(n,s,r) { //1.2
        n = SDK.check(n,1);
        s = SDK.check(s,0);
        r = SDK.check(r,true);
        if(r)
         return Math.round((Math.random() * n) - s);
        else
         return (Math.random() * n) - s;
    }

    SDK.drawIcon = function(x, y, iconSymbol, bitmap, size)
    {
      size = SDK.check(size, 24);
      var icon = ImageManager.getIcon(ImageManager.ICON_PATH, iconSymbol, size);
      icon.addLoadListener(function(){
        bitmap.blt(icon, 0, 0, size, size, x, y);
      });
    }

    SDK.checkSwitch = function(value) {
      if(value == 'A' || value == 'B' || value == 'C' || value == 'D') {
        return true;
      } else
        return false;
    }

    SDK.toCX = function(width, sourceWidth)
    {
      sourceWidth = SDK.check(sourceWidth, Graphics.width);
      return ((sourceWidth / 2) - (width / 2));
    }

    SDK.getSpriteRect = function(sprite) {
          var x = SDK.toGlobalCoord(sprite, 'x');
          var y = SDK.toGlobalCoord(sprite, 'y');
          return new Rectangle(x,y,sprite.width, sprite.height);
      }

    SDK.toGlobalCoord = function(layer, coordSymbol) {
      var t = layer[coordSymbol];
      var node = layer;
      while(node) {
        t -= node[coordSymbol];
        node = node.parent;
      }
      return (t * (-1)) + layer[coordSymbol];
    }

    SDK._pkd_time = null;
    SDK.setTime = function()
    {
      this._pkd_time = new Date();
    }

    SDK.stampTime = function()
    {
      var end = new Date();
      var time = 'Time ' + (end.getTime()-this._pkd_time.getTime()) + ' мс';
      console.log(time);
      return time;
    }

    SDK.isPC = function() {
      if (Utils.isMobileDevice()) return false;
      if (Utils.isMobileSafari()) return false;
      if (Utils.isAndroidChrome()) return false;
      return true;
    }

    SDK.isInt = function(n) {
      return Number(n) === n && n % 1 === 0;
    }

    SDK.isFloat = function(n) {
      return n === Number(n) && n % 1 !== 0;
    }

    //Процент P от числа N
    SDK.percent = function(n, p) {
      return Math.round((n/100) * p);
    }

     /**
     * Корректировка округления десятичных дробей.
     * (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
     *
     * @param {String}  type  Тип корректировки.
     * @param {Number}  value Число.
     * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
     * @returns {Number} Скорректированное значение.
     */
    SDK.decimalAdjust = function(type, value, exp) {
        // Если степень не определена, либо равна нулю...
        if (typeof exp === 'undefined' || +exp === 0) {
          return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // Если значение не является числом, либо степень не является целым числом...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
          return NaN;
        }
        // Сдвиг разрядов
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Обратный сдвиг
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }


    //File work
    SDK._fs = null;
    SDK._path = null;
    SDK._lastPath = null;
    SDK._filePrepare = function() {
      if(SDK._fs == null) {
        SDK._fs = require('fs');
      }
      if(SDK._path == null) {
        SDK._path = require('path');
      }
    }

    SDK.isFile = function(filename) { //Существует ли файл?
      SDK._filePrepare();
      return SDK._fs.existsSync(SDK.filePath(filename));
    }

    SDK.readFile = function(filename) { //Прочитать файл
      if(SDK.isFile(filename)) {
        return JSON.parse(LZString.decompressFromBase64(SDK._fs.readFileSync(SDK._lastPath, { encoding: 'utf8' })));
      } else {
        console.log("SDK file " + filename + " not found!");
        return null;
      }
    }

    SDK.writeFile = function(filename, data) { //Сохранить в файл
      SDK._filePrepare();
      var t = LZString.compressToBase64(JsonEx.stringify(data));
      SDK._fs.writeFileSync(SDK.filePath(filename), t);
    }

    SDK.filePath = function(filename) { //Создать путь path к файлу
      SDK._filePrepare();
      var base = SDK._path.dirname(process.mainModule.filename);
      var dir = SDK._path.join(base, 'data/');
      var filePath = dir + filename;
      SDK._lastPath = filePath;
      return filePath;
    }

    SDK.loadDataFileWeb = function(filename, onLoad, onErr) {
      var xhr = new XMLHttpRequest();
        var url = 'data/' + filename;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = function() {
            if (xhr.status < 400) {
                onLoad(JSON.parse(LZString.decompressFromBase64(xhr.responseText)));
            }
        };
        xhr.onerror = function() {
            if(onErr)
              onErr();
        };
        xhr.send();
    }

    SDK.readFileWeb = function(filename) {
      var data = localStorage.getItem(filename);
      var jData = {};
      try {
        jData = JSON.parse(LZString.decompressFromBase64(data));
      } catch(ex) {
        console.log(ex);
        jData = {};
      }
      return jData;
    }

    SDK.writeFileWeb = function(filename, data) {
      localStorage.setItem(filename, LZString.compressToBase64(JsonEx.stringify(data)));
    }

    //Определить константу у Объекта
    SDK.setConstant = function(object, name, value) {
      object[name] = value;
      if(typeof(object[name]) == "object")
        Object.freeze(object[name]); //freeze - замораживает все поля объекта (но не ссылку на объект)
      Object.defineProperty(object, name, {writable: false}); //ссылка на объект теперь тоже заморожена
    }
    //END SDK
  //------------------------------------------------------------------------------

  //Color
  //------------------------------------------------------------------------------
    class Color {
      constructor(r, g, b, a) {
        if(r === undefined) r = 255;
        if(g === undefined) g = 255;
        if(b === undefined) b = 255;
        if(a === undefined) a = 255;
        this._color = [r,g,b,a];
        this._css = "rgba("+Math.round(r)+","+Math.round(g)+","+Math.round(b)+","+(a/255)+")";
      }

      getLightestColor(lightLevel) //Получить цвет на оттенок lightLevel светлее из текущего (новый Color объект)
      {
        var bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        var p = 0;
        var newColor = [0,0,0,0];
        if ((bf - lightLevel) >= 0) {
          if (bf >= 0)
            p = Math.abs(bf - lightLevel)/lightLevel;
          newColor = this._color.map(function(c){ return (c - p * c);  });
        }
        else
        {
          if(bf >= 0)
            p = (lightLevel - bf)/(255 - bf);
          newColor = this._color.map(function(c){ return [(255 - c)*p+c,255].min();  });
        }

        return new Color(newColor[0],newColor[1],newColor[2],newColor[3]);
      }

      clone() { //Возвращяет копию цвета (новый Color объект)
        return reAlpha(this.A);
      }

      reAlpha(a) { //Изменить значение Aplha (новый Color объект)
        return new Color(this.R, this.G, this.B, a);
      }

      hex() {
        var r = Math.floor(this.R).toString(16).padZero(2);
            var g = Math.floor(this.G).toString(16).padZero(2);
            var b = Math.floor(this.B).toString(16).padZero(2);
            return '#' + r + g + b;
      }

      //Добавить статический цвет (его нельзя изменить)
      static AssignStaticColor(name, color) {
        SDK.setConstant(Color, name, color);
      }

      //Создать Color из HEX строки. exmpl. '#FFFFFF'
      static FromHex(hexString) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
          var color = result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          } : null;
          if(color) {
            return new Color(color.r,color.g,color.b, 255);
          }
          return Color.NONE; //NULL Color
      }

      static RAND() {
        return Color.FromHex(Color._makeRandomHexColor());
      }

      static _makeRandomHexColor() {
        var colR = Color._makeRandomHexCode();
        var colG = Color._makeRandomHexCode();
        var colB = Color._makeRandomHexCode();

        return "#" + colR + colG + colB;
      }

      static _makeRandomHexCode() {
        var randVal = Math.floor( Math.random() * 10 ) + 4;
        switch( randVal ) {
          case 0: return "00";
          case 1: return "11";
          case 2: return "22";
          case 3: return "33";
          case 4: return "44";
          case 5: return "55";
          case 6: return "66";
          case 7: return "77";
          case 8: return "88";
          case 9: return "99";
          case 10: return "AA";
          case 11: return "BB";
          case 12: return "CC";
          case 13: return "DD";
          case 14: return "EE";
          case 15: return "FF";
        }
      }
    }

    Object.defineProperties(Color.prototype, {
      R: {get: function() {return this._color[0]; }, configurable: true },
      G: {get: function() {return this._color[1]; }, configurable: true },
      B: {get: function() {return this._color[2]; }, configurable: true },
      A: {get: function() {return this._color[3]; }, configurable: true },
      ARR: {get: function() {return this._color; }, configurable: true },
      CSS: {get: function() {return this._css; }, configurable: true }
    });

    //Создание стандартной палитры
    Color.AssignStaticColor('NONE', new Color(0,0,0,0));
    Color.AssignStaticColor('BLACK', new Color(0,0,0,255));
    Color.AssignStaticColor('WHITE', new Color(255,255,255,255));
    Color.AssignStaticColor('RED', new Color(255,0,0,255));
    Color.AssignStaticColor('GREEN', new Color(0,255,0,255));
    Color.AssignStaticColor('BLUE', new Color(0,0,255,255));

    Color.AssignStaticColor('AQUA', new Color(128,255,255,255));
    Color.AssignStaticColor('MAGENTA', new Color(128,0,128,255));
    Color.AssignStaticColor('YELLOW', new Color(255,255,0,255));
    Color.AssignStaticColor('ORANGE', new Color(255,128,0,255));
    //END Color
  //------------------------------------------------------------------------------

  //DevLog
  //------------------------------------------------------------------------------
    class DevLog {
      constructor(prefix) {
        this._prefix = prefix;
        this._extended = false;
        this._canUseColor = this._canUseColors();
        if (typeof DEV === 'undefined') {
          this._show = false;
        } else
          this._show = true;
      }

      setColors(color, backColor) {
        this._extend();
        color = SDK.check(color, '#000000');
        backColor = SDK.check(backColor, '#FFFFFF');
        this._args[1] = 'color: ' +color + '; background: ' + backColor +';';
      }
      p(text) {
        if(this._show) {
          if(text === undefined) {
            console.log("");
          } else {
            if(this._extended && this._canUseColor) {
              this._args[0] = '%c' + this._prefix + ": " + text;
              window.console.log.apply(console, this._args);
            } else
              console.log(this._prefix + ": " + text);
          }
        }
      }

      applyPresetLib() {
        this.setColors(new Color(22,120,138,0).hex(), Color.WHITE.hex());
      }

      on() {
        this._show = true;
      }

      off() {
        this._show = false;
      }

      _extend() {
        this._extended = true;
        this._args = this._args || [null,'color: #000000; background: #FFFFFF;'];
      }

      _canUseColors() {
        return (navigator.userAgent.toLowerCase().indexOf('chrome') > -1);
      }
    }
    //END DevLog
  //------------------------------------------------------------------------------

  //==============================================================================
  //Общие настройки
  //==============================================================================
  //Настройка версий
  $.Versions = {};

  //Расширение
  $.extendMe = function(obj) {
    obj.Color = Color;
    obj.SDK = SDK;
    obj.DevLog = DevLog;
  }

  $.extendMe($);

  })(PLATFORM);
//------------------------------------------------------------------------------

}

var SDK = PLATFORM.SDK;
var Color = PLATFORM.Color;

//==========================================================================================================================================================
// Alpha ABS Main
//==========================================================================================================================================================
AlphaABS.SYSTEM = {};
var LOGW = new PLATFORM.DevLog("Alpha ABS");

(function($) {
  var SDK = PLATFORM.SDK;
  var Color = PLATFORM.Color;

  $.LOGW = LOGW;
  $.LOGW.on();
  $.LOGW.setColors(Color.ORANGE.hex(), Color.BLACK.getLightestColor(100).hex());

  //Перейти на этот параметр заместо BattleManagerABS.TURN
  SDK.setConstant($, 'FRAMES_PER_SECOND', 60); //Frame rate (don't chagne)

  $.STRING_ALERT_NEEDTARGET     = ['Need target','Нужна цель'];
  $.STRING_ALERT_TOFAR          = ['Target too far','Цель слишком далеко'];
  $.STRING_ALERT_INTERRUPT        = ['Action interrupt','Действие прервано'];
  $.STRING_ALERT_INBATTLE         = ['Battle start','Бой начинается']; //@Deprecated
  $.STRING_ALERT_OUTBATTLE        = ['Battle end','Выход из боя']; //@Deprecated
  $.STRING_ALERT_NOAUTOA      = ["Can't use attack now", 'Нельзя атакавать сейчас'];
  $.STRING_ALERT_NOUSE      = ["Can't use action now",'Нельзя использовать сейчас'];
  $.STRING_ALERT_NOCHARGES    = ["Can't use, no charges",'Нельзя использовать, нет зарядов'];
  $.STRING_ALERT_RECHARGE     = ['Action is not ready','Ещё не готово'];
  $.STRING_ALERT_CASTMOVE     = ["Can't use while moving", 'Нельзя выполнить в движении'];
  $.STRING_ALERT_NOINBATTLE   = ["Need get out of the battle", 'Необходимо выйти из боя'];
  $.STRING_ALERT_NEWLEVEL       = ["Level up!", 'Новый уровень!'];

  $.STRING_POPUP_EVADE   = ['Evade', 'Evade'];
  $.STRING_POPUP_MISS    = ['Miss', 'Мимо'];
  $.STRING_POPUP_FAIL    = ['Fail', 'Fail'];
  $.STRING_POPUP_ABSORB  = ['Absorb', 'Поглощено'];
  $.STRING_POPUP_IMMUNE  = ['Immune', 'Иммунитет'];
  $.STRING_POPUP_WEAK    = ['Weak', 'Уязвимость'];
  $.STRING_POPUP_SKILL   = ['Ready!', 'Готов!'];

  $.STRING_MENU_UIVIS   = ['Show UI', 'Показывать UI'];
  $.STRING_MENU_UIPOS   = ['Edit UI', 'Изменить UI'];
  $.STRING_MENU_KEYBIND = ['Controls', 'Управление'];

  $.STRING_MENU_KB_KEY        = ['Press any key', 'Нажмите кнопку'];
  $.STRING_MENU_KB_TAB        = ['Target select', 'Выбор цели'];
  $.STRING_MENU_KB_SKILLS     = ['Skills panel', 'Панель навыков'];
  $.STRING_MENU_KB_CONTRL     = ['Сontrol panel', 'Панель управления'];
  $.STRING_MENU_KB_WEAPON     = ['Weapon circle', 'Оружие'];
  $.STRING_MENU_KB_DEF      = ['Reset to default', 'Сбросить'];
  $.STRING_MENU_KB_BACK       = ['Back', 'Назад'];
  $.STRING_MENU_KB_SLOT       = ['Item', 'Слот'];
  $.STRING_MENU_KB_ATTACK     = ['Attack', 'Атака'];
  $.STRING_MENU_KB_FOLLOW     = ['Follow', 'Следовать'];
  $.STRING_MENU_KB_JUMP       = ['Jump', 'Прыжок'];
  $.STRING_MENU_KB_ROTATE     = ['Rotate', 'Поворот'];
  $.STRING_MENU_KB_LEFT       = ['Left', 'Левый'];
  $.STRING_MENU_KB_RIGHT      = ['Right', 'Правый'];
  $.STRING_MENU_KB_BOTTOM     = ['Bottom', 'Нижний'];
  $.STRING_MENU_KB_TOP      = ['Top', 'Верхний'];
  $.STRING_MENU_KB_WEAP       = ['Weapons', 'Оружие'];

  $.STRING_SKILL_INFO_RADIUS    = ['Radius: ','Радиус: '];
  $.STRING_SKILL_INFO_RANGE   = ['Range: ','Дальность: '];
  $.STRING_SKILL_INFO_RANGE2    = ['Range: ','Дал-сть: '];
  $.STRING_SKILL_INFO_CAST    = ['Cast: ','Подготовка: '];
  $.STRING_SKILL_INFO_COOLDOWN  = ['Cooldown: ','Перезарядка: '];
  $.STRING_SKILL_INFO_DESCRIPTION = ['Description','Описание'];
  $.STRING_SKILL_INFO_HAS     = ['Has: ','Есть: '];
  $.STRING_SKILL_INFO_USE     = ['Use: ','Исп.: '];
  $.STRING_SKILL_INFO_CHARGES   = ['Charges: ','Заряды: '];
  $.STRING_SKILL_INFO_RELOADCHR = ['Reload charges: ','Полная перез-ка: '];
  $.STRING_SKILL_INFO_ONTARGET  = ['Need target', 'Нужна цель'];
  $.STRING_SKILL_INFO_ONUSER    = ['On user', 'На себя'];
  $.STRING_SKILL_INFO_AREA    = ['Area select', 'Выбор области'];
  $.STRING_SKILL_INFO_CIRCLE    = ['Around user', 'Вокруг себя'];
  $.STRING_SKILL_INFO_ZONE    = ['Zone', 'Зона'];
  $.STRING_SKILL_INFO_SEC     = [' sec.', ' сек.'];
  $.STRING_SKILL_INFO_TARGET    = ['<target>', '<цель>'];
  $.STRING_SKILL_INFO_DAMAGE    = ['Damage ', 'Урон '];
  $.STRING_SKILL_INFO_RECOVER   = ['Recover ', 'Восст. '];
  $.STRING_SKILL_INFO_DRAIN   = ['Drain ', 'Поглщ. '];
  $.STRING_SKILL_INFO_MELEE   = ['Melee ', 'Ближ. бой '];


  $.STRING_WARNING_COMMON       =
  ["This command can't be executed on ABS map",'Нельзя выполнить эту команду события на ABS карте'];
  $.STRING_WARNING_COMMON2      =
  ["This command can't be executed while fight",'Нельзя выполнить эту команду во время боя'];
  $.STRING_WARNING_COMMON3      =
  ["This command not suported with ABS",'Эта команда не поддерживается с ABS'];
  $.STRING_WARNING_COMMAND129   =
  ["You can't remove party leader from party on ABS map",'Нельзя убрать лидера партии из группы на ABS карте'];
  $.STRING_WARNING_COMMAND321   =
  ["You can't change actor class on ABS map",'Нельзя поменять класс персонажа на ABS карте'];

  $.STRING_WARNING_SKILLWC =
  ["Weapon can't support casting",'castTime не поддерживается для оружия'];
  $.STRING_WARNING_SKILLOC =
  ["Support only 'Battle Screen' items",'Не поддерживается для ABS'];
  $.STRING_WARNING_SKILLWVR =
  ["Weapon can't support Vector with radius",'Vector с radius не поддерживается для оружия'];


  $.STRING_ERROR_VERSION =
  ["ABS: Support only RPG Maker MV 1.3.1 and above",'ABS: Обновите версию RPG Maker MV до 1.3.1 или выше'];
  $.STRING_ERROR_SKILLNAN =
  ["You need config you project for ABS first!",'Необходимо настроить проект под ABS!'];
  $.STRING_ERROR_OLDDATA =
  ["Your project use old RPG Maker MV core (js/), update files to 1.3.1 or above","Необходимо обновить основные файлы проекта (папка js/) до версии 1.3.1 или выше"];

  $.EXTENSIONS = {};

  var PARAMS = {};
  //Read Params
  (function($) {
    var parameters = PluginManager.parameters('Alpha_ABS');

    var pDeadSwith = String(parameters['Enemy Dead Switch'] || 'B');
    if(pDeadSwith == 'A' || pDeadSwith == 'B' || pDeadSwith == 'C' || pDeadSwith == 'D') {
      $.DEAD_SWITCH = pDeadSwith;
    } else {
      LOGW.p("Enemy Dead Switch " + pDeadSwith + " this is not SelfSwitch (A,B,C,D)");
      $.DEAD_SWITCH = 'B';
    }

    var pDeadMapId = parameters['After Dead Map'] || 0;
    if(pDeadMapId > 0) {
      $.DEAD_MAPID = pDeadMapId;
    } else
      $.DEAD_MAPID = 0;

    var pCastAnimId = parameters['Cast Animation'] || 0;
    if(pCastAnimId > 0) {
        $.CAST_ANIMATION_ID = pCastAnimId;
    } else
      $.CAST_ANIMATION_ID = 0; //Standart ( 0 - if ABS standart)

    var pLevelUpAnimId = parameters['Level Up Animation'] || 49;
    if(pLevelUpAnimId > 0) {
        $.LEVELUP_ANIMATION_ID = pLevelUpAnimId;
    } else
      $.LEVELUP_ANIMATION_ID = 0; //None

    var pReviveAnimId = parameters['Revive Animation'] || 45;
    if(pReviveAnimId > 0) {
        $.REVIVE_ANIMATION_ID = pReviveAnimId;
    } else
      $.REVIVE_ANIMATION_ID = 0; //None

    var pCastSe = String(parameters['Use default cast SE'] || 'true');
    if(eval(pCastSe)) {
      $.CAST_SE = {name:'Magic3',pan:0,pitch:100,volume:90}; //null if Standart animation has own SE
    } else {
      $.CAST_SE = null;
    }

    var pAutoLoot = String(parameters['Auto loot enemies'] || 'false');
    if(eval(pAutoLoot)) {
      $.AUTO_LOOT = true;
    } else
      $.AUTO_LOOT = false;

    var pAllowUI = String(parameters['UI visibility control'] || 'true');
    if(eval(pAllowUI)) {
      $.ALLOW_UI_VIS = true;
    } else
      $.ALLOW_UI_VIS = false;

    var pAllowUI2 = String(parameters['UI position control'] || 'true');
    if(eval(pAllowUI2)) {
      $.ALLOW_UI_POS = true;
    } else
      $.ALLOW_UI_POS = false;

    var forceEnglish = String(parameters['Force English'] || 'false');
    if(eval(forceEnglish)) {
      SDK._isRu = 0;
    }

    $.GOLD_ICON = parseInt(parameters['Gold icon index']) || 314;

    var pAllowKB = String(parameters['Key binding'] || 'true');
    if(eval(pAllowKB)) {
      $.ALLOW_KB = true;
    } else
      $.ALLOW_KB = false;

    var pAllowDashOption = String(parameters['Dash on ABS map'] || 'false');
    if(eval(pAllowDashOption)) {
      $.ALLOW_DASH = true;
    } else
      $.ALLOW_DASH = false;

    var pAllowTR = String(parameters['Allow Transfrer'] || 'false');
    if(eval(pAllowTR)) {
      $.ALLOW_TRANSFER = true;
    } else
      $.ALLOW_TRANSFER = false;

    var temp = String(parameters['Follow allowed'] || 'true');
    $.CONTROL_PANEL_ALLOW_FOLLOW = eval(temp);

    temp = String(parameters['Jump allowed'] || 'true');
    $.CONTROL_PANEL_ALLOW_JUMP = eval(temp);

    temp = String(parameters['Rotate allowed'] || 'true');
    $.CONTROL_PANEL_ALLOW_ROTATE = eval(temp);

    temp = String(parameters['Favorite weapons allowed'] || 'true');
    $.CONTROL_PANEL_ALLOW_FAVWEAP = eval(temp);

    temp = String(parameters['Show XP bar'] || 'false');
    $.ALLOW_XPBAR = eval(temp);

  })(PARAMS);

  $.PARAMS = PARAMS;

  $.SaveUI = function(values) {
    var data = LZString.compressToBase64(JsonEx.stringify(values));
    var fs = require('fs');
    fs.writeFileSync(this._filePath(), data);
  }

  $.LoadUI = function() {
    var data = null;
    var fs = require('fs');
    var fp = this._filePath();
    if(fs.existsSync(fp)) {
      data = fs.readFileSync(fp, { encoding: 'utf8' });
    } else {
      this.LOGW.p("UI save file not exists");
    }
    if(data) {
      $gameVariables._uiPositions = JSON.parse(LZString.decompressFromBase64(data));
    }
  }

    $.GetDataObject = function(type, id) {
      var dataObj = null;
      type = SDK.check(type, "");
      id = type + '_' + id;
      for(var i = 0; i<$ABS_DataObjects.length; i++) {
        if($ABS_DataObjects[i].id == id) {
          dataObj = $ABS_DataObjects[i];
          break;
        }
      }

      if(dataObj == null) {
        if($ABS_DataUser !== undefined) {
          for(var i = 0; i<$ABS_DataUser.length; i++) {
            if($ABS_DataUser[i].id == id) {
              dataObj = $ABS_DataUser[i];
              break;
            }
          }
        }
      }

      return dataObj;
    }

    $._filePath = function() {
      var path = require('path');
    var base = path.dirname(process.mainModule.filename);
    var dir = path.join(base, 'data/');
    var filePath = dir + 'ABSUI.rpgsave';
    return filePath;
    }

    


//DataManager
//------------------------------------------------------------------------------
  var _DataManager_loadDatabase_903284 = DataManager.loadDatabase;
  DataManager.loadDatabase  = function() {
    _DataManager_loadDatabase_903284.call(this);
    DataManager.loadDataFile('$ABS_DataObjects','ABSData.json');
    if(Utils.isNwjs()) {
      var fs = require('fs');
      var path = require('path');
      var base = path.dirname(process.mainModule.filename);
      var dir = path.join(base, 'data/');
      var filePath = dir + 'ABSDataUser.json';
      if(fs.existsSync(filePath)) {
        DataManager.loadDataFile('$ABS_DataUser','ABSDataUser.json');
      } else {
        window['$ABS_DataUser'] = {};
      }
    } else {
      //Brwser
      try {
        DataManager.loadDataFile('$ABS_DataUser','ABSDataUser.json');
      } catch(ex) {
        LOGW.p("ABSDataUser.json not found, skipped");
      }
    }
  }
  //END DataManager
//------------------------------------------------------------------------------

//SceneManager
//------------------------------------------------------------------------------
  var _SceneManager_catchException_ABS = SceneManager.catchException;
  SceneManager.catchException = function(e) {
    SceneManager._printABSInfo();
      _SceneManager_catchException_ABS.call(this, e);
  };

  var _SceneManager_onError_ABS = SceneManager.onError;
  SceneManager.onError = function(e) {
    SceneManager._printABSInfo();
    _SceneManager_onError_ABS.call(this, e);
  }

  SceneManager._printABSInfo = function() {
    console.error("Using AlphaABS [Version: " + AlphaABS.version + " ; Build: " + AlphaABS.build + " ; on MV  " + Utils.RPGMAKER_VERSION +"]");
  }
  //END SceneManager
//------------------------------------------------------------------------------

//ImageManager
//------------------------------------------------------------------------------
  ImageManager.loadPictureABS = function(filename) {
    return this.loadBitmap('img/ABS/', filename, 0, true);
  }

  ImageManager.loadIconABS = function(iconSymbol /*, size*/) {
    if(SDK.isInt(iconSymbol)) {
      var size = SDK.check(size, 32);
      return ImageManager.getIcon(ImageManager.ICON_PATH, iconSymbol, size)
    } else {
      return ImageManager.getIconABS(iconSymbol);
    }
  }

  ImageManager.getIconABS = function(iconName) {
    var icon = this.loadPictureABS('icon_' + iconName);
    return icon;
  }

  ImageManager.drawIconABS = function(x,y, iconSymbol, bitmap, size) {
    if(SDK.isInt(iconSymbol)) {
      size = SDK.check(size, 32);
      SDK.drawIcon(x,y,iconSymbol,bitmap, size);
    } else {
      var icon = this.getIconABS(iconSymbol);
      icon.addLoadListener(function() {
        bitmap.blt(icon, 0, 0, icon.width, icon.height, x, y);
      });
    }
  }

  //END ImageManager
//------------------------------------------------------------------------------

//ABSKey
//------------------------------------------------------------------------------
  function ABSKey() {
        throw new Error('This is a static class');
    }

    ABSKey.FNAME = 'ABSKeys.rpgsave';
    ABSKey.symbol = {};


    ABSKey.indexSchemeA = {
        sp1 : 1,
        sp2 : 2,
        sp3 : 3,
        sp4 : 4,
        sp5 : 5,
        sp6 : 6,
        sp7 : 7,
        sp8 : 8
    }

    ABSKey.indexSchemeB = {
        cpA : 0,
        cpW : 1,
        cpS : 2,
        cpD : 3
    }

    ABSKey.indexSchemeC = {
        scW: 0,
        scA: 3,
        scS: 2,
        scD: 1
    }

    ABSKey.checkTabPress = function() {
        if(Input.isTriggered('tab')) {
            var event = {charCode:9};
            ABSKey.onKeyPress(event);
        }
    }

    ABSKey.isTriggeredSP = function() {
        for(var key in ABSKey.indexSchemeA) {
            if(Input.isTriggered(ABSKey.symbol[key])) {
                return ABSKey.indexSchemeA[key];
            }
        }
        return null;
    }

    ABSKey.isTriggeredWS = function() {
        for(var key in ABSKey.indexSchemeC) {
            if(Input.isTriggered(ABSKey.symbol[key])) {
                return ABSKey.indexSchemeC[key];
            }
        }
        return null;
    }

    ABSKey.setKeyToChange = function(symbol, windw) {
        this._changeSymbol = symbol;
        this._changeWindow = windw;
    }

    ABSKey.onKeyPress = function(event) {
        if(!ABSKey._changeSymbol) return;

        if(Input.KeyMapperPKD[event.charCode] !== undefined) {
            ABSKey.symbol[ABSKey._changeSymbol] = Input.KeyMapperPKD[event.charCode];
            ABSKey._changeSymbol = null;
            if(ABSKey._changeWindow) {
                ABSKey._changeWindow.onKeyOk(true);
                ABSKey._changeWindow = null;
            }
        } else {
            if(ABSKey._changeWindow)
                ABSKey._changeWindow.onKeyOk(false);
        }
    }

    Input.toDefaultABS = function() {
        AlphaABS.Key.symbol = {
            cpW:"w",
            cpA:"a",
            cpD:"d",
            cpS:"s",
            sp1:"1",
            sp2:"2",
            sp3:"3",
            sp4:"4",
            sp5:"5",
            sp6:"6",
            sp7:"7",
            sp8:"8",
            tS:"tab",
            pC:"q",
            wC:"e",
            scW:"w",
            scS:"s",
            scD:"d",
            scA:"a"
        };
    }

    AlphaABS.Key = ABSKey;
  //END ABSKey
//------------------------------------------------------------------------------

//ABSPathfinding
//------------------------------------------------------------------------------
  function ABSPathfinding() {
    throw new Error('This is a static class');
  }

  ABSPathfinding.init = function() {
    this.worldWidth = 0;
        this.worldHeight = 0;
        this.worldSize = 0;
        this.char = null;
        this.goalX = 0;
        this.goalY = 0;
  }

  ABSPathfinding.setup = function() {
    this.worldWidth = $gameMap.width();
        this.worldHeight = $gameMap.height();
        this.worldSize = this.worldWidth * this.worldHeight;
  }

  ABSPathfinding.findPath = function(char, goalX, goalY) {
    this.char = char;
    this.goalX = goalX;
    this.goalY = goalY;
    var path = ABSPathfinding.calculatePath();
    if(path.length > 0) {

            if(path.length > 1) {
                var stepX = path[1][0];
                var stepY = path[1][1];

                var deltaX1 = $gameMap.deltaX(stepX, char.x);
                var deltaY1 = $gameMap.deltaY(stepY, char.y);

                if (deltaY1 > 0) {
                    return 2;
                } else if (deltaX1 < 0) {
                    return 4;
                } else if (deltaX1 > 0) {
                    return 6;
                } else if (deltaY1 < 0) {
                    return 8;
                }
            }

        }

        return 0;
  }

  //PRIVATE
  ABSPathfinding.canWalkHere = function(x,y) {
    if(x == this.char.x && y == this.char.y) {
            return true;
        }

        if (!$gameMap.isValid(x, y)) {
            return false;
        }

        if (this.char.isThrough() || this.char.isDebugThrough()) {
            return true;
        }

        if(x == this.goalX && y == this.goalY) {
            return true;
        }

        if (this.char.isCollidedWithCharacters(x, y)) {
            return false;
        }

        if(!this.char.isMapPassable(x,y,1)) {
           return false;
        }

        return true;
  }

  ABSPathfinding.Node = function(Parent, Point) {
    var newNode = {
            // pointer to another Node object
            Parent:Parent,
            // array index of this Node in the world linear array
            value:Point.x + (Point.y * this.worldWidth),
            // the location coordinates of this Node
            x:Point.x,
            y:Point.y,
            // the distanceFunction cost to get
            // TO this Node from the START
            f:0,
            // the distanceFunction cost to get
            // from this Node to the GOAL
            g:0
        };

        return newNode;
  }

  ABSPathfinding.Neighbours = function(x,y) {
    var N = y - 1,
        S = y + 1,
        E = x + 1,
        W = x - 1,
        myN = N > -1 && this.canWalkHere(x, N),
        myS = S < this.worldHeight && this.canWalkHere(x, S),
        myE = E < this.worldWidth && this.canWalkHere(E, y),
        myW = W > -1 && this.canWalkHere(W, y),
        result = [];
        if(myN)
            result.push({x:x, y:N});
        if(myE)
            result.push({x:E, y:y});
        if(myS)
            result.push({x:x, y:S});
        if(myW)
            result.push({x:W, y:y});
        this.findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
        return result;
  }

  ABSPathfinding.findNeighbours = function() {};

  ABSPathfinding.DiagonalNeighbours = function(myN, myS, myE, myW, N, S, E, W, result) {
    if(myN)
        {
            if(myE && this.canWalkHere(E, N))
                result.push({x:E, y:N});
            if(myW && this.canWalkHere(W, N))
                result.push({x:W, y:N});
        }
        if(myS)
        {
            if(myE && this.canWalkHere(E, S))
                result.push({x:E, y:S});
            if(myW && this.canWalkHere(W, S))
                result.push({x:W, y:S});
        }
  }

  ABSPathfinding.DiagonalNeighboursFree = function(myN, myS, myE, myW, N, S, E, W, result)
  {
    myN = N > -1;
        myS = S < worldHeight;
        myE = E < worldWidth;
        myW = W > -1;
        if(myE)
        {
            if(myN && this.canWalkHere(E, N))
                result.push({x:E, y:N});
            if(myS && this.canWalkHere(E, S))
                result.push({x:E, y:S});
        }
        if(myW)
        {
            if(myN && this.canWalkHere(W, N))
                result.push({x:W, y:N});
            if(myS && this.canWalkHere(W, S))
                result.push({x:W, y:S});
        }
  }

  ABSPathfinding.ManhattanDistance = function(Point, Goal) {
    // linear movement - no diagonals - just cardinal directions (NSEW)
    return Math.abs(Point.x - Goal.x) + Math.abs(Point.y - Goal.y);
  }

  ABSPathfinding.calculatePath = function() {
    var distanceFunction = ABSPathfinding.ManhattanDistance;
    // create Nodes from the Start and End x,y coordinates
        var mypathStart = this.Node(null, {x:this.char.x, y:this.char.y});
        var mypathEnd = this.Node(null, {x:this.goalX, y:this.goalY});
        // create an array that will contain all world cells
        var AStar = new Array(this.worldSize);
        // list of currently open Nodes
        var Open = [mypathStart];
        // list of closed Nodes
        var Closed = [];
        // list of the final output array
        var result = [];
        // reference to a Node (that is nearby)
        var myNeighbours;
        // reference to a Node (that we are considering now)
        var myNode;
        // reference to a Node (that starts a path in question)
        var myPath;
        // temp integer variables used in the calculations
        var length, max, min, i, j;
        // iterate through the open list until none are left
        while(length = Open.length)
        {
            max = this.worldSize;
            min = -1;
            for(i = 0; i < length; i++)
            {
                if(Open[i].f < max)
                {
                    max = Open[i].f;
                    min = i;
                }
            }
            // grab the next node and remove it from Open array
            myNode = Open.splice(min, 1)[0];
            // is it the destination node?
            if(myNode.value === mypathEnd.value)
            {
                myPath = Closed[Closed.push(myNode) - 1];
                do
                {
                    result.push([myPath.x, myPath.y]);
                }
                while (myPath = myPath.Parent);
                // clear the working arrays
                AStar = Closed = Open = [];
                // we want to return start to finish
                result.reverse();
            }
            else // not the destination
            {
                // find which nearby nodes are walkable
                myNeighbours = this.Neighbours(myNode.x, myNode.y);
                // test each one that hasn't been tried already
                for(i = 0, j = myNeighbours.length; i < j; i++)
                {
                    myPath = this.Node(myNode, myNeighbours[i]);
                    if (!AStar[myPath.value])
                    {
                        // estimated cost of this particular route so far
                        myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
                        // estimated cost of entire guessed route to the destination
                        myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
                        // remember this new path for testing above
                        Open.push(myPath);
                        // mark this node in the world graph as visited
                        AStar[myPath.value] = true;
                    }
                }
                // remember this route as having no more untested options
                Closed.push(myNode);
            }
        } // keep iterating until the Open list is empty
        return result;
  }
  AlphaABS.ABSPathfinding = ABSPathfinding;
  //END ABSPathfinding
//------------------------------------------------------------------------------

//Input
//------------------------------------------------------------------------------
  Input.loadSchemeABS = function() {
        if(Utils.isNwjs()) {
          if(SDK.isFile(AlphaABS.Key.FNAME)) {
              AlphaABS.Key.symbol = SDK.readFile(AlphaABS.Key.FNAME);
          } else {
            Input.toDefaultABS();
          }
        } else {
          if(localStorage.getItem(AlphaABS.Key.FNAME)) {
            AlphaABS.Key.symbol = SDK.readFileWeb(AlphaABS.Key.FNAME);
          } else {
            Input.toDefaultABS();
            /*SDK.loadDataFileWeb(AlphaABS.Key.FNAME, function(data) {
              AlphaABS.Key.symbol = data;
            }, function() {
          Input.toDefaultABS();
            });*/
          }
        }
    }

    Input.saveSchemeABS = function() {
      if(Utils.isNwjs()) {
          SDK.writeFile(AlphaABS.Key.FNAME,AlphaABS.Key.symbol);
        } else {
          SDK.writeFileWeb(AlphaABS.Key.FNAME, AlphaABS.Key.symbol);
        }
    }
  //END Input
//------------------------------------------------------------------------------

SDK.setConstant($, 'FONT', 'VL-Gothic-Regular');

})(AlphaABS.SYSTEM);

Object.freeze(AlphaABS.SYSTEM);
Object.defineProperty(AlphaABS, 'SYSTEM', {writable: false});

///////////////////////////////////////////////////////////////////////////////


//==========================================================================================================================================================
// Alpha ABS Utils
//==========================================================================================================================================================
AlphaABS.UTILS = {};

(function($) {

  

  var SDK = PLATFORM.SDK;

  $.printPoint = function(x,y) {
    return "[" + x + " ; " + y + "]";
  }

  $.distanceTo = function(a, b) {
    if(a === undefined || b === undefined) {
      return 0; //This is very very bad!
    }
    if(a === null || b === null) {
      return 0;
    }
    return $gameMap.distance(a.x,a.y, b.x,b.y);
  }

  $.inFront = function(charA, charB) {
    var d = charA.direction();
    var x2 = $gameMap.roundXWithDirection(charA.x, d);
    var y2 = $gameMap.roundYWithDirection(charA.y, d);
    return this.inPoint(charB, new Point(x2,y2));
  }

  $.inDirection = function(charA, charB) {
    var d = charA.direction();
    switch(d) {
      case 8: return (charB.y <= charA.y);
      case 4: return (charB.x <= charA.x);
      case 6: return (charB.x >= charA.x);
      case 2: return (charB.y >= charA.y);
      default : return false;
    }
  }

  $.inDirectionHard = function(charA, charB) {
    var inD = this.inDirection(charA,charB);
    if(!inD) {
      return false;
    }
    var d = charA.direction();
    switch(d) {
      case 8: return (charB.x == charA.x);
      case 4: return (charB.y == charA.y);
      case 6: return (charB.y == charA.y);
      case 2: return (charB.x == charA.x);
      default : return false;
    }
  }

  $.inPoint = function(a , b) {
    if(!a) return false;
    if(!b) return false;
    return (a.x == b.x && a.y == b.y);
  }

  $.inRadius = function(charA, radius, members) {
    var t = [];
    members.forEach(function(item) {
      if(AlphaABS.UTILS.distanceTo(charA, item) < radius) {
        t.push(item);
      }
    });
    return t;
  }

  $.toGlobalCoord = function(layer, coordSymbol) {
    return SDK.toGlobalCoord(layer, coordSymbol);
  }

  $.framesToTimeA = function(frames, oneSecond) {
    if(oneSecond === undefined) oneSecond = 60;
    var secs = Math.floor((frames + oneSecond) / oneSecond);
    var string = '';
    if(secs > 59) {
      var min = Math.floor(secs/60);
      string = min + "m";
    } else {
      string = secs + "s";
    }
    return string;
  }

  $.framesToTimeB = function(frames, oneSecond) {
    if(oneSecond === undefined) oneSecond = 60;
    var secs = Math.floor((frames + oneSecond) / oneSecond);
    var string = '';
    if(secs > 59) {
      var min = Math.floor(secs/60);
      var minm = (min < 10) ? ('0' + min) : min;
      var secx = secs - (min * 60);
      secx = (secx < 10) ? ('0' + secx) : secx;
      string = min + ":" + secx;
      } else {
      string = '0:' + ((secs < 10) ? ('0' + secs) : secs);
    }
    return string;
  }

  /*$.isColidePoint = function(char, point) {
    return char.isCollidedWithEvents(point.x, point.y);
  }*/

  $.getDirKey = function(char) {
    var t = char.direction();
    switch(t) {
      case 8: return 'u';
      case 4: return 'l';
      case 6: return 'r';
      case 2: return 'd';
      default : return 'r';
    }
  }

  $.linkSprite = function(sprite1, sprite2) {
      var _r = 0; //right (from right)
        var _u = 0; //up

        if(SDK.toGlobalCoord(sprite1, 'x') < Graphics.width / 2) {
            _r = 1; //Left (From left)
        }

        if(SDK.toGlobalCoord(sprite1,'y') < Graphics.height / 2) {
            _u = 1; //Down
        }

        if(_r == 1) {
            sprite2.x = sprite1.x + sprite1.width + 1;
        } else {
            sprite2.x = sprite1.x - sprite2.width - 1;
        }

        if(_u == 1) {
            sprite2.y = sprite1.y + sprite1.height + 1;
        } else {
            sprite2.y = sprite1.y - sprite2.height - 1;
        }
  }

//Point
//------------------------------------------------------------------------------
  class Point {
    constructor(mapX, mapY) {
      mapX = SDK.check(mapX, 0);
      mapY = SDK.check(mapY, 0);
      this._x = mapX;
      this._y = mapY;
    }

    convertToScreen() {
      this._x = this.screenX();
      this._y = this.screenY();
      return this;
    }

    convertToScreen2() {
      this._x = this._x * $gameMap.tileWidth();
      this._y = this._y * $gameMap.tileHeight();
    }

    mapPointOnScreen() {
      var nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
      var ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
      return new Point(nx,ny);
    }

    static ScreenXYOnScreen(x,y) {
      var p = new Point(x,y);
      p.convertToMap();
      return p.mapPointOnScreen();
    }

    convertToMap() {
      this._x = this.mapX();
      this._y = this.mapY();
      return this;
    }

    applyFloor() {
      this._x = Math.floor(this._x);
      this._y = Math.floor(this._y);
      return this;
    }

    applyRound() {
      this._x = Math.ceil(this._x);
      this._y = Math.ceil(this._y);
      return this;
    }

    screenX() {
      var t = $gameMap.adjustX(this._x);
      var tw = $gameMap.tileWidth();
      return Math.round(t * tw + tw / 2);
    }

    screenY() {
      var t = $gameMap.adjustY(this._y);
      var th = $gameMap.tileHeight();
      return Math.round(t * th + th);
    }

    convertToCanvas() {
      //if(this._x > Graphics.width) {
        //var rect = Graphics._canvas.getBoundingClientRect();
        //this._x = Math.round((this._x - rect.left)/(rect.right - rect.left)*Graphics.width);
      //}

      //if(this._y > Graphics.height) {
        //var rect = Graphics._canvas.getBoundingClientRect();
        //this._y = Math.round((this._y - rect.top)/(rect.bottom - rect.top)*Graphics.height);
      //}

      if(Graphics._realScale != 1) {
        this._x = Graphics.pageToCanvasX(this._x);
        this._y = Graphics.pageToCanvasY(this._y);
      }
    }

    mapX() {
      return $gameMap.canvasToMapX(this._x);
    }

    mapY() {
      return $gameMap.canvasToMapY(this._y);
    }

    clone() {
      return new Point(this._x, this._y);
    }

    toString() {
      return AlphaABS.UTILS.printPoint(this._x, this._y);
    }

    toPoint() {
      return this;
    }

  }

  Object.defineProperties(Point.prototype, {
      x: { get: function() { return this._x; }, configurable: true },
      y: { get: function() { return this._y; }, configurable: true }
  });

  Array.prototype.toPoint = function() {
    return new Point(this[0],this[1]);
  }

  Game_CharacterBase.prototype.toPoint = function() {
    return new Point(this.x, this.y);
  }
  //END Point
//------------------------------------------------------------------------------

//SMouse
//------------------------------------------------------------------------------
  var __SmouseNeedTrack = false;
  var __SmousePosition = null;

  function SMouse() {
    throw new Error('This is a static class');
  }

  SMouse.initMouseTrack = function() {
    document.onmousemove = SMouse.handleMouseMove;
        __SmouseNeedTrack = false;
        __SmousePosition = new Point(0,0);
  }

  SMouse.setTrack = function(isSet) {
      //console.log("Track is " + isSet);
      __SmouseNeedTrack = isSet;
      if(isSet) this.handleMouseMove(null);
    }

    SMouse.isTracked = function() {
      return (__SmouseNeedTrack == true);
    }

  SMouse.handleMouseMoveCanvas = function(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        __SmousePosition = new Point(evt.clientX - rect.left, evt.clientY - rect.top);
        console.log("Mouse " + __SmousePosition);
      }

    SMouse.handleMouseMove = function(event) {
        if(!__SmouseNeedTrack) return;

        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism
        if(!event) return;

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

           event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

       __SmousePosition = new Point(event.pageX, event.pageY);
       __SmousePosition.convertToCanvas();
    }

    SMouse.getMousePosition = function() {
        return __SmousePosition;
    }
  //END SMouse
//------------------------------------------------------------------------------

//SMath
//------------------------------------------------------------------------------
  function SMath() {
    throw new Error('This is a static class');
  }

  SMath.distance = function(point1, point2) {
    return Math.sqrt(Math.pow(point1.x - point2.x,2) + Math.pow(point1.y - point2.y,2));
  }

  SMath.angle = function(point1, point2) {
    var cl = SMath.distance(point1, point2);
    var al = Math.abs(point2.x - point1.x);
    var bl = Math.abs(point2.y - point1.y);

    if(al == 0 || cl == 0 || bl == 0)
      return 0;
    else {
      var angle = Math.acos((bl*bl + cl*cl - al*al)/(2 * bl * cl));
      return angle;
    }
  }

  SMath.rotateTo = function(point1, angle) {
    var nx = point1.x * Math.cos(angle) - point1.y * Math.sin(angle);
        var ny = point1.y * Math.cos(angle) + point1.x * Math.sin(angle);
        return new Point(nx,ny);
  }

  SMath.moveTo = function(point1, point2, step) {
    var rotated = SMath.rotateTo(new Point(0, step), SMath.angle(point1, point2));
    var fx = 0;
    var fy = 0;
    if(point2.y < point1.y) { fy = point1.y  - rotated.y; } else { fy = point1.y + rotated.y; }
    if(point2.x < point1.x) { fx = point1.x  + rotated.x; } else { fx = point1.x - rotated.x; }
    return new Point(fx,fy);
  }

  SMath.inRect = function(point, rectangle) {
    var x2 = rectangle.x + rectangle.width;
    var y2 = rectangle.y + rectangle.height;
    if(point.x > rectangle.x && point.x < x2 && point.y < y2 && point.y > rectangle.y) {
      return true;
    }
    return false;
  }

  //END SMath
//------------------------------------------------------------------------------

  //Расширение
  $.extendMe = function(obj) {
    obj.SMath = SMath;
    obj.Point = Point;
    obj.SMouse = SMouse;
  }

  $.extendMe($);

})(AlphaABS.UTILS);

Object.freeze(AlphaABS.UTILS);
Object.defineProperty(AlphaABS, 'UTILS', {writable: false});

(function() {

  

  //ABSObject_PopUp
  //------------------------------------------------------------------------------
    class ABSObject_PopUp {
      constructor(text, color, iconIndex, fontSettings)
      {
        this._text = text || null;
        this._color = color;
        this._iconIndex = iconIndex || null;
        this._fontSettings = fontSettings || ABSObject_PopUp.FONT_DEFAULT();
        this._effectType = ABSObject_PopUp.EFFECT_DEFAULT;
        this._sprite = null;
      }

      clone() {
        var tempObj = new ABSObject_PopUp(this._text, this._color, this._iconIndex, this._fontSettings.clone());
        tempObj.setEffectSettings(this._effectType);
        return tempObj;
      }

      getText() {
        return this._text;
      }

      getFontSettings() {
        return this._fontSettings;
      }

      setX(x) {
        this.x = x;
        this._sprite.x = x;
      }

      setY(y) {
        this.y = y;
        this._sprite.y = y;
      }

      setNumered() //This is number value in this PopUp
      {
        this._numered = true;
      }

      isNumered()
      {
        return (this._numered === true);
      }

      hasIcon() {
        return (this._iconIndex != null);
      }

      setExtraText(text) {
        this._text = (text + " " + this._text);
      }

      setEffectSettings(settings) {
        this._effectType = settings;
      }

      setup(x, y, width, layer)
      {
        this._layer = layer;
        this._width = width;
        this.x = x;
        this.y = y;
        this._refresh();
      }

      dispose()
      {
        if(!this._sprite) return;
        this._sprite.bitmap.clear();
        this._layer.removeChild(this._sprite);
        this._sprite = null;
      }

      update()
      {
        if(this._sprite != null) {
          this._update_zoom();
          this._sprite.update();
        }
      }

      static FONT_DEFAULT() {
        return ['Skratch Punk',30, false, 3, Color.BLACK]; //FontFace, size, outline widht, outline color
      }

      //PRIVATE
      _refresh()
      {
        let h = 72;
        let bitmap = new Bitmap(this._width, h);
        bitmap.addLoadListener(function()
        {
          if(this._fontSettings[0] != null)
            bitmap.fontFace = this._fontSettings[0];
          bitmap.fontSize = this._fontSettings[1];
          bitmap.fontItalic = this._fontSettings[2];
          if(this._color)
          {
            bitmap.textColor = this._color.CSS;
          }
          else
            bitmap.textColor = Color.WHITE.CSS;


          var dx = 0;
          var dw = 0;
          var tw = (this._text != null) ?  bitmap.measureTextWidth(this._text) : 0;

          while(tw > this._width){
            bitmap.fontSize = bitmap.fontSize - 4;
            tw = bitmap.measureTextWidth(this._text);
          }

          if(this._iconIndex) {
            dx += 24;
            dw += 24;
            SDK.drawIcon((dx + ((this._width - tw)/2) - 36), (h - 24)/2, this._iconIndex, bitmap, 24);
          }

          if(this._text) {
            bitmap.outlineWidth = this._fontSettings[3] || 0;
            if(this._fontSettings[4])
              bitmap.outlineColor = this._fontSettings[4].CSS;
            bitmap.outlineColor = Color.BLACK.CSS;
            bitmap.drawText(this._text, dx + 2, 0, this._width - dw, h, 'center');
          }
        }.bind(this));

        this._sprite = new Sprite(bitmap);
        this._sprite.x = this.x;
        this._sprite.y = this.y;
        this._sprite.scale.x = this._effectType[0];
        this._sprite.scale.y = this._effectType[0];

        this._layer.addChild(this._sprite);
      }

      _update_zoom()
      {
        if(this._effectType[1]) {
          this._sprite.scale.x = Math.max(this._sprite.scale.x - 0.075, 1.0);
          this._sprite.scale.y = this._sprite.scale.x;
        }
        this._sprite.opacity = Math.max(this._sprite.opacity - 2, 0);
        if(this._sprite.opacity == 0) {
          this._layer.removeChild(this._sprite);
          this._sprite = null;
        }
      }
    }

    SDK.setConstant(ABSObject_PopUp, 'EFFECT_DEFAULT', [1.5, true, 0]); //zoom, isUpdateZoom, +toTextSize
    //END ABSObject_PopUp
  //------------------------------------------------------------------------------

  AlphaABS.ABSObject_PopUp = ABSObject_PopUp;

})();

(function() {

  

  //ABSObject_PopUpMachine
  //------------------------------------------------------------------------------

    class ABSObject_PopUpMachine {
      constructor(x, y, width, stack_size, parent)
      {
        this._x = x;
        this._y = y;
        this._width = width;
        this._stack_size = stack_size;
        this._parent = parent;
        this._effectType = null;
        this._upMode = false;

        this._items = [];
        this._timers = [];

        this._init_items();
      }

      setUpMode() {
        this._upMode = true;
      }

      setEffectSettings(effect) {
        this._effectType = effect;
      }

      setSingleMode() {
        //this._singleMode = true;
      }

      move(x,y) {
        this._x = x;
        this._y = y;
        this._step();
      }

      push(popUpItem)
      {
        if(this._effectType != null)
          popUpItem.setEffectSettings(this._effectType);

        popUpItem.setup(this._x, this._y, this._width, this._parent);

        let item = this._items.shift();
        if(item != null) item.dispose();

        this._items.push(popUpItem);
        this._step();
        this._timers.shift();
        this._timers.push(0);
      }

      clear()
      {
        this._items.forEach(function(item){
          if(item != null) item.dispose();
        });
        this._items = [];
        this._timers = [];
        this._init_items();
      }

      update()
      {
        this._update_timers();
        this._items.forEach(function(item){
          if(item != null) item.update();
        });
      }

      //PRIVATE
      _init_items()
      {
        SDK.times(this._stack_size, function() {
          this._items.push(null);
          this._timers.push(null);
        }.bind(this));
      }

      _update_timers()
      {
        SDK.times(this._stack_size, function(i) {
          var index = (this._timers.length - 1) - i; //Reverse
          var timer = this._timers[index];
          if(timer == null)
            return;
          else
          {
            if(timer < ABSObject_PopUpMachine.MAX_TIME)
              this._timers[index] = this._timers[index] + 1;
            if(timer == ABSObject_PopUpMachine.MAX_TIME) {
              if(this._items[index] != null)
              {
                this._items[index].dispose();
              }
              this._items[index] = null;
              this._timers[index] = null;
            }
          }
        }.bind(this));
      }

      _step()
      {
        SDK.times(this._items.length, function(i) {
          var index = (this._items.length - 1) - i; //Reverse
          var item = this._items[index];
          if(item == null)
            return;

          var y = 0;
          if(this._upMode)
            y = this._y - (ABSObject_PopUpMachine.Y_STEP * i);
          else
            y = this._y + (ABSObject_PopUpMachine.Y_STEP * i);

          this._items[index].setX(this._x);
          this._items[index].setY(y);
        }.bind(this));
      }
    }

    SDK.setConstant(ABSObject_PopUpMachine, 'Y_STEP',   24);
    SDK.setConstant(ABSObject_PopUpMachine, 'MAX_TIME', 60);
    SDK.setConstant(ABSObject_PopUpMachine, 'SETTINGS', [1, false, 12]); //zoom, isUpdateZoom, +toTextSize
    //END ABSObject_PopUpMachine
  //------------------------------------------------------------------------------


  AlphaABS.ABSObject_PopUpMachine = ABSObject_PopUpMachine;
})();

var XPLATFORM = XPLATFORM || {};

//==========================================================================================================================================================
// Alpha ABS EXTENSION Particle Engine
//==========================================================================================================================================================
AlphaABS.SYSTEM.EXTENSIONS.ABSPE = {};
(function() {



  var ABSPE = function() {};

    class Particle {
        constructor(x, y, w, h, rotation, xVel, yVel, lifeTime, sizeChange, color, imageName, startOpacity) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.rotation = rotation;
            this.xVel = xVel;
            this.yVel = yVel;
            this.lifeTime = lifeTime;
            this.sizeChange = sizeChange;
            this.color = color;
            this.sOpacity = startOpacity;

            this.image = null;
            if(imageName) {
                this.image = ImageManager.loadPicture(imageName);
            }

            this.maxLife = lifeTime;
        }

        setDrawAtCenter() {
            this.centerDraw = true;
        }

        isAlive() {
            return (this.lifeTime > 0);
        }

        update() {
            this.lifeTime--;
        }

        advance() {
            this.x += this.xVel;
            this.y += this.yVel;
        }

        calcSize() {
            var w = this.width;
            var h = this.height;

            switch(this.sizeChange) {
                case -1 : //Decrease
                    var t = (this.lifeTime / this.maxLife);
                    w = t * this.width;
                    h = t * this.height;
                break;
                case 0 : //No change
                break;
                case 1 : //Increase
                    var t = (1 - (this.lifeTime / this.maxLife));
                    w = t * this.width;
                    h = t * this.height;
                break;
            }
            return {width: w, height: h};
        }
    }

    class Emitter {
        constructor(x,y,limit,genericParticle) {
            this.x = x;
            this.y = y;
            this.limit = limit || 500;
            this.particles = [];
            this.work = false;
            this.generate = genericParticle;
            this.arg = null;
        }

        setOuterData(data) {
          this.arg = data;
        }

        update() {
            if(this.particles.length == this.limit)
                return;
            if(this.isWork()) {
                var d = this.limit - this.particles.length;
                var need = Math.ceil(d * 0.01);
                if(need > 0) {
                    var t = 0;
                    while(t < need) {
                        this.particles.push(this.generate(this.arg));
                        t++;
                    }
                }
            }
        }

        move(x,y) {
            if(x instanceof AlphaABS.UTILS.Point) {
                this.move(x.x, x.y);
            } else {
                this.x = x;
                this.y = y;
            }
        }

        start() {
            this.work = true;
        }

        stop() {
            this.work = false;
        }

        clear() {
            this.particles = [];
        }

        isWork() {
            return (this.work == true);
        }
    }

    class ParticleEngine {

        constructor(bitmap) {
            this.bitmap = bitmap;
            this.context = bitmap.context;
            this.emitters = [];

            this.thread = setInterval( function() { this._update(); }.bind(this), (1000.0 / 60) );
        }

        addEmitter(emit, start) {
            start = SDK.check(start, false);
            if(start) {
                emit.start();
            }
            this.emitters.push(emit);
        }

        renderParticle(particle, width, height) {
            var ctx = this.context;
            ctx.globalAlpha = particle.sOpacity;
            if(particle.rotation !== 0) {
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                if(particle.image) {
                    ctx.drawImage(particle.image._canvas, -width / 2, -height / 2, width, height);
                } else {
                    ctx.fillRect(-width / 2, -height / 2, width, height);
                }
                ctx.restore();
            } else {
                if(particle.image) {
                    ctx.globalAlpha = 0.5;
                    if(!particle.centerDraw)
                        ctx.drawImage(particle.image._canvas, particle.x, particle.y, width, height);
                    else {
                          ctx.translate(particle.x, particle.y);
                          ctx.drawImage(particle.image._canvas, width / 2 * (-1), height / 2 * (-1), width, height);
                          ctx.translate((particle.x) * (-1), (particle.y) * (-1));
                    }
                    ctx.globalAlpha = 1;
                } else {
                    ctx.fillRect(particle.x, particle.y, width, height);
                }
            }
        }

        terminate() {
            this.bitmap.clear();
            clearInterval(this.thread);
        }

        //PRIVATE
        _update() {
            this.bitmap.clear();
            var count = this.emitters.length;
            var e = this.emitters;
            var w = 0;
            var h = 0;

            for(var i = count - 1; i>=0; i--) {
               e[i].update();
               //Draw particles
               var j = e[i].particles.length;
               while(j--) {
                var p = e[i].particles[j];
                if(p.isAlive()) {
                    var size = p.calcSize();
                    w = size.width;
                    h = size.height;
                    if(p.image) {
                        this.context.globalAlpha = p.sOpacity * (p.lifeTime / p.maxLife);
                        this.renderParticle(p,w,h);
                    } else {
                        this.context.fillStyle = 'rgba(' + p.color.R + ',' + p.color.G + ',' + p.color.B + ', 1)';
                        this.context.globalAlpha = p.sOpacity * (p.lifeTime / p.maxLife);
                        this.renderParticle(p,w,h);
                    }
                    p.advance();
                    p.update();
                } else { //DEAD
                    e[i].particles.splice(j,1);
                }
               }
            }

            //this.bitmap._setDirty();
        }
    }

    ABSPE.init = function(bitmap) {
        return new ParticleEngine(bitmap);
    }

    ABSPE.initParticle = function(x, y, w, h, rotation, xVel, yVel, lifeTime, sizeChange, color, imageName, startOpacity) {
        return new Particle(x, y, w, h, rotation, xVel, yVel, lifeTime, sizeChange, color, imageName, startOpacity);
    }

    ABSPE.initEmitter = function(x,y,limit,genericParticle) {
        return new Emitter(x,y,limit,genericParticle);
    }
    AlphaABS.SYSTEM.EXTENSIONS.ABSPE = ABSPE;

})();


//DEV
//var __selected = null;

(function() {

  

  var LOG = new PLATFORM.DevLog("BattleManagerABS");
  LOG.applyPresetLib();

  function isDevMode() {
    //return (DEV !== undefined);
    return false;
  }

  //BattleManagerABS
  //------------------------------------------------------------------------------
    function BattleManagerABS() {
      throw new Error('This is a static class');
    }

    AlphaABS.register(BattleManagerABS);

    var SMouse = AlphaABS.UTILS.SMouse;
    var Consts = AlphaABS.SYSTEM;

    BattleManagerABS.init = function() {
      this._setupPlugins();
      this.timer = new Game_TimerABS();
      this._ready = false;
      this._ui = null;
      this._plTargets = [];
      BattleManagerABS.clearABS();
      this._prepareResources();
      Input.loadSchemeABS();
      AlphaABS.ABSPathfinding.init();
    }

    BattleManagerABS.connectProcess = function() {
        this._process = new AlphaABS.LIBS["Game_BattleProcessABS"]();
    }

    BattleManagerABS.battleProcess = function() {
      return this._process;
    }

    BattleManagerABS.onMapLoaded = function() {
      if(this._isABSMap && $gameMap.isABS()) { //Если переход между АБС картами, то не делаем StopABS, а только prepare Заного
        if(this._absMapId != $gameMap.mapId()) {
          $gameTroop.initABS(); //Need restart
          this._absMapId = $gameMap.mapId();
        }
        this._ui.initABS();
        $gamePlayer.prepareABS();
        LOG.p("Manager : Go to ABS map from ABS map, Prepare new ABS session");
        return;
      }

      if(this._isABSMap && !$gameMap.isABS()) { //Если переход от AБС карты на обычную, то надо всё остановить
        this.stopABS();
        LOG.p("Manager : Go to map from ABS map, stop ABS session");
        return;
      }

      if(!this._isABSMap && $gameMap.isABS()) {
        this.initABS();
        LOG.p("Manager : Go to ABS map from map, start new ABS session");
      }
    }

    BattleManagerABS.initABS = function() { //Инициализация боевой карты и ABS системы
      $gamePlayer.initABS();
      $gameTroop.initABS();
      $gameParty.initABS();
      this.timer.start(BattleManagerABS.TURN);
      this._ready = true;
      SMouse.setTrack(true);

      this._ui.initABS();

      $gamePlayer.prepareABS();

      LOG.p("Manager : ABS Map loaded");
      this._isABSMap = true;
      this._absMapId = $gameMap.mapId();
      AlphaABS.ABSPathfinding.setup();
    }

    BattleManagerABS.stopABS = function() {
      LOG.p("Manager : ABS Map destroy");
      BattleManagerABS.clearABS();
      SMouse.setTrack(false);
      $gamePlayer.stopABS();
    }

    BattleManagerABS.clearABS = function() {
      this._isABSMap = false;
      this._absMapId = -1;
    }

    BattleManagerABS.setPlayerTarget = function(target) {
      if(target && target.inActive()) {
        $gamePlayer.setTarget(target);
        $gameTroop.selectOnMap(target);
        this.UI().showTarget(target);
        if(isDevMode()) {__selected = target;}
      } else {
        $gamePlayer.setTarget(null);
        $gameTroop.selectOnMap(null);
        this.UI().showTarget(null);
      }
    }

    BattleManagerABS.getPlayerTarget = function() {
      return $gamePlayer.target();
    }

    BattleManagerABS.updateABS = function() {
      if(!this._ready) return;
      this.timer.update();
      if(this.timer.isReady()) {
        this.timer.reset();
        $gamePlayer.onTurnEnd();
        $gameTroop.onTurnEnd();
      }
    }

    BattleManagerABS.setUI = function(spritesetUI) {
      this._ui = spritesetUI;
    }

    BattleManagerABS.UI = function() {
      return this._ui;
    }

    BattleManagerABS.alertOnUI = function(string) {
      this.UI().addPopUp(AlphaABS.PopInfoManagerABS.ALERT(string));
    }

    BattleManagerABS.alertNoInBattle = function() {
      BattleManagerABS.alertOnUI(AlphaABS.SYSTEM.STRING_ALERT_NOINBATTLE[SDK.isRU()]);
    }

    BattleManagerABS.playSe = function(se, point) {
      if(BattleManagerABS.isABSAudio()) {
        AudioManager.playSeAt(se, point);
      } else {
        AudioManager.playSe(se);
      }
    }

    BattleManagerABS.isABSAudio = function() {
      return AlphaABS.SYSTEM.EXTENSIONS.AUDIO;
    }

    BattleManagerABS.isABSParticleSystem = function() {
      return (AlphaABS.SYSTEM.EXTENSIONS.ABSPE !== undefined) && (AlphaABS.SYSTEM.EXTENSIONS.ABSPE != false);
    }

    BattleManagerABS.isABSLightingExt = function() {
      return AlphaABS.SYSTEM.EXTENSIONS.LIGHT;
    }

    BattleManagerABS.alertOnUIbySym = function(alertSymbol) {
      switch(alertSymbol) {
        case 'noUse':
          BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NOUSE[SDK.isRU()]);
        break;
        case 'toFar':
          BattleManagerABS.alertOnUI(Consts.STRING_ALERT_TOFAR[SDK.isRU()]);
        break;
        case 'noTarget':
          BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NEEDTARGET[SDK.isRU()]);
        break;
        case 'noAmmo':
          BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NOCHARGES[SDK.isRU()]);
        break;
        case 'recharge':
          BattleManagerABS.alertOnUI(Consts.STRING_ALERT_RECHARGE[SDK.isRU()]);
        break;
      }
    }

    BattleManagerABS.nextPlayerTarget = function() {
      var t = ABSUtils.inRadius($gamePlayer, 12, $gameTroop.membersABS());
      if(t.count() == 0) {
        return null;
      }

      var t2 = t.diff(this._plTargets);

      if(t2.count() == 0) {
        this._plTargets = [];
        return this.nextPlayerTarget();
      } else {
        this._plTargets.push(t2.first());
      }
      return t2.first();
    }

    //HELPERS
    BattleManagerABS.canUseSkillByTimer = function(skill) {
      return skill ? skill.isReady() : false;
    }

    BattleManagerABS.playerABSSkillById = function(skillId) {
      return $gamePlayer.battler().skillABS_byId(skillId);
    }

    BattleManagerABS.canUseSkillByTarget = function(who, target, skill) {
      if(!skill) return false;
      if(skill.isRadiusType()) return true;
      if(skill.isNeedTarget()) {
        if(target)
          return true;
        else
          return false;

      } else
        return true;
    }

    BattleManagerABS.canUseSkillByRange = function(who, target, skill) {
      if(!skill) return false;
      if(skill.isZoneType()) return true;
      if(skill.isRadiusType()) return true;
      if(skill.range == 0 && !skill.isNeedTarget()) return true;
      if(skill.range == 0) {
        return ABSUtils.inFront(who, target);
      } else {
        var t = ABSUtils.distanceTo(who,target);
        if(skill.range >= t) {
          if(skill.isDirectionFix()) {
            LOG.p("SPELL: Dirction FIXed");
            return ABSUtils.inDirectionHard(who, target);
          }
          else
            return true;
        } else
          return false;
      }
    }

    BattleManagerABS.canUseSkillByAmmo = function(skill) {
      var result = true;
      if(skill.isStackType() && !skill.isAutoReloadStack()) {
        result = !skill.isNeedReloadStack();
      }
      if(!skill.isStackType() && skill.isNeedAmmo()) {
        result = $gameParty.numItems($dataItems[skill.ammo]) > 0;
      }
      return result;
    }

    BattleManagerABS.canUseABSSkillNow = function(who, target, skill) {
      if(!skill) return false;
      return this.canUseSkillByTarget(who, target, skill) &&
      this.canUseSkillByRange(who, target, skill) &&
      this.canUseSkillByTimer(skill) && this.canUseSkillByAmmo(skill);
    }

    BattleManagerABS.canUseABSSkillUI = function(skill) {
      if(!$gamePlayer.inActive()) return false;
      var t = $gamePlayer.battler();
      return t.canUse(skill.skill()) && this.canUseABSSkillNow($gamePlayer, $gamePlayer.target(), skill) && t.canMove();
    }

    BattleManagerABS.whoTargetOnMe = function(me, members) {
      var x = members.filter(function(t) {
        return (t.target() == me);
      });
      return x.first();
    }

    BattleManagerABS.isValidTarget = function(target) {
      return target && target.inActive() && (target.battler().tgr != 0);
    }

    BattleManagerABS.warning = function(index) {
      switch(index) {
        case 1: LOGW.p(Consts.STRING_WARNING_COMMON2[SDK.isRU()]); break;
        case 2: LOGW.p(Consts.STRING_WARNING_COMMON3[SDK.isRU()]); break;
        case 129: LOGW.p(Consts.STRING_WARNING_COMMAND129[SDK.isRU()]); break;
        case 321: LOGW.p(Consts.STRING_WARNING_COMMAND321[SDK.isRU()]); break;
        default: LOGW.p(Consts.STRING_WARNING_COMMON[SDK.isRU()]); break;
      }
    }

    BattleManagerABS._prepareResources = function() {
      //Load images to memory
      ImageManager.loadPictureABS('CircleSegment_small')
        ImageManager.loadPictureABS('CircleSegment_small_down');
        ImageManager.loadPictureABS('CircleSegment_small_L');
        ImageManager.loadPictureABS('CircleSegment_small_R');
    }

    BattleManagerABS._setupPlugins = function() {
      if(Imported.YEP_ItemCore == true) {
        var _Game_Party_gainIndependentItem_YEP = Game_Party.prototype.gainIndependentItem;
        Game_Party.prototype.gainIndependentItem = function(item, amount, includeEquip) {
          _Game_Party_gainIndependentItem_YEP.call(this, item, amount, includeEquip);
          if($gameMap.isABS()) {
            if(amount > 0 && !this._noNotifyABS) {
              AudioManager.playSe({name:'Equip2',pan:0,pitch:140,volume:90});
              BattleManagerABS.UI().pushOnItemPanel('item', item);
            }

            if(DataManager.isWeapon(item)) {
                    if(AlphaABS.BattleManagerABS.UI()) {
                        AlphaABS.BattleManagerABS.UI().weapCircleRefresh();
                    }
                }
              }
        }
      }

      if(Imported.YEP_EquipCore == true) {
        var _Window_EquipSlot_drawItem_YEP = Window_EquipSlot.prototype.drawItem;
        Window_EquipSlot.prototype.drawItem = function(index) {
          _Window_EquipSlot_drawItem_YEP.call(this, index);
          this._drawFavWeapSymbol(index);
        }
      }

      if(Imported.YEP_SaveCore == true) {
        var _Scene_File_performActionLoad_YEP = Scene_File.prototype.performActionLoad;
        Scene_File.prototype.performActionLoad = function() {
          if(BattleManagerABS._isABSMap == true) {
            BattleManagerABS.stopABS();
          }
            _Scene_File_performActionLoad_YEP.call(this);
        };
      }
    }

    SDK.setConstant(BattleManagerABS, 'TURN', AlphaABS.SYSTEM.FRAMES_PER_SECOND);
  //END BattleManagerABS
  //------------------------------------------------------------------------------

  AlphaABS.BattleManagerABS = BattleManagerABS;

})();

//Class extension (for savefile compability)
function Game_AIBot()        { this.initialize.apply(this, arguments);}
(function(){

  

  var LOG = new PLATFORM.DevLog("AIBot");
  LOG.applyPresetLib();

  var BattleManagerABS = {};
  var Consts = AlphaABS.SYSTEM;

//Game_AIBot
//------------------------------------------------------------------------------
  Game_AIBot.prototype = Object.create(Game_Event.prototype);
  Game_AIBot.prototype.constructor = Game_AIBot;
  AlphaABS.register(Game_AIBot);

  Game_AIBot.prototype.initialize = function(mapId, eventId, enemyId) {
      Game_Event.prototype.initialize.call(this, mapId, eventId);
      LOG.p("AI inited " + $dataEnemies[enemyId].name + " at " + this.toPoint().toString());

      BattleManagerABS = AlphaABS.BattleManagerABS;
      this._absParams.enemyId = enemyId;
      this._absParams.battler = null;
      this._absParams.target = null;

      //States
      this._absParams.inBattle = false;
      this._absParams.active = true; //Со мной можно взаимодействовать
      this._absParams.selected = false; //Я выбран на карте игроком?
      this._absParams.casting = false; //Читаю заклинание
      this._absParams.state = "free";
      this._absParams.actionState = "stay";

      //Variables
      this._absParams.allyToSearch = null; //Кого мне искать
      this._absParams.reviveTimer = null; //Таймер для возраждения
      this._absParams.regenTimer = null; //Таймер для восстановления параметров
      this._absParams.myStartPosition = this.toPoint();
      this._absParams.myHomePosition = null;
      this._absParams.looted = false;
      this._absParams.activateSwitch = null; //Used if enemy not been active at start

      //Behavior
      var b = new AlphaABS.LIBS["Game_AIBehavior"](this);
      this._absParams.behavior = b;
      //I know, this is terrible, but this is still BETA
      this._absParams.viewRadius = b.viewRadius;
      this._absParams.returnRadius = b.returnRadius;
      this._absParams.escapeOnBattle = b.escapeOnBattle; //Убегает во время битвы
      this._absParams.canSearch = b.canSearch; //Могу ля я искать противника, если мой сосед атакован
      this._absParams.noFight = b.noFight; //Не будет сражаться
      this._absParams.reviveTime = b.reviveTime; //Время возрождения (минуты)
      this._absParams.regenOnFree = b.regen;
      this._absParams.slow = b.slow; //Медленный враг
      this._absParams.agressive = b.agressive; //Агрессивный враг (будет догонять)
      this._absParams.returnType = b.returnType; //Тип возвращения 0 - быстрое, 1 - обычное, 2 - остановка

    this.setRevive(this._absParams.reviveTime);

    if(Imported.Quasi_Movement)
      this._absParams.useAStar = true;
    else
      this._absParams.useAStar = false;

      this._storeMoveData();
  };

  Game_AIBot.prototype.changeReturnType = function(newReturnType) {
        this._absParams.returnType = newReturnType;
        LOG.p("ReturnType: " + this._absParams.returnType);
  }

  Game_AIBot.prototype.isFastReturn = function() {
    return this._absParams.returnType == 0;
  }

  Game_AIBot.prototype.isSlowReturn = function() {
    return this._absParams.returnType == 1;
  }

  Game_AIBot.prototype.isNotReturn = function() {
    return this._absParams.returnType == 2;
  }

  //NEW
  Game_AIBot.prototype.battler = function() {
    return this._absParams.battler;
  }

  //NEW
  Game_AIBot.prototype.target = function() {
    return this._absParams.target;
  }

  //NEW
  Game_AIBot.prototype.initABS = function() {
    if(!this._absParams.battler) {
      this._absParams.battler = new Game_EnemyABS(this._absParams.enemyId);
      this._absParams.battler.initABS();
    }
    if(this._checkActiveState()) {
      this._absParams.active = true;
      this._checkDieSwitch();

      if(this._absParams.battler.enemy().actions.length == 0) {
        LOG.p("AI: Not actions");
        this._absParams.noFight = true;
      }
    } else {
      LOG.p("AI: Deactivated from start");
      this._deactivate();
    }
  }

  //NEW
  Game_AIBot.prototype.activate = function() {
    if(!this._absParams.activateSwitch) return;
    LOG.p("AI: Activate");
    var key = [$gameMap.mapId(), this.eventId(), this._absParams.activateSwitch];
    $gameSelfSwitches.setValue(key, true);
    this.refresh();
    this._absParams.activateSwitch = null;
    this.initABS();
  }

  //NEW
  Game_AIBot.prototype.inBattle = function() {
    return this._absParams.inBattle;
  }

  //NEW
  Game_AIBot.prototype.inActive = function() {
    return this._absParams.active;
  }

  //NEW
  Game_AIBot.prototype.onTurnEnd = function() {
    if(this.inBattle()) {
      this.battler().onTurnEnd();
    }
  }

  Game_AIBot.prototype.hasLoot = function() {
    return !this._absParams.looted;
  }

  //NEW
  Game_AIBot.prototype.loot = function() {
    if(!this._absParams.looted) {
      this._absParams.looted = true;
      //TODO Можно звук соответствующий
      //'coin'
      var gold = this.battler().gold();
      if(gold > 0) {
        $gameParty.gainGold(gold);
      }
      var t = this.battler().makeDropItems();
      if(t.length > 0) {
        t.forEach(function(i) {
          $gameParty.gainItem(i,1);
        });
      }
      LOG.p("AI : Looted!");
    } else {
      LOG.p("AI : Already looted!");
    }
  }

  //NEW
  Game_AIBot.prototype.onActionOnMe = function(who) {
    if(!this.inBattle() && !this._absParams.noFight) {
      LOG.p("AI : I'am attacked!!!");
      this._absParams.target = who;
      this._changeState('battle');
    }

    if(!this.battler().isAlive() && this.inActive()) {
      var t = this.battler().exp();
      $gameParty.gainExp(t);
      if(Consts.PARAMS.AUTO_LOOT)
        this.loot();
      if(this._absParams.behavior.cEonDeath > 0) {
        LOG.p("AI : Common Event (on Death): " + this._absParams.behavior.cEonDeath);
        $gameTemp.reserveCommonEvent(this._absParams.behavior.cEonDeath);
      }
      //$gamePlayer.requestExpPopup(t); //ABUNAI, honto ni 'who' ga 'Player' ka
    }
  }

  //NEW
  Game_AIBot.prototype.selectOnMap = function(isSelect) {
    this._absParams.selected = isSelect;
  }

  //NEW
  Game_AIBot.prototype.isAlly = function() {
    return false;
  }

  //NEW
  Game_AIBot.prototype.setRevive = function(time) {
    if(time == 0) {
      this._absParams.reviveTimer = null;
      return;
    }
    var t = time * AlphaABS.SYSTEM.FRAMES_PER_SECOND;
    LOG.p("AI : Set revive " + time + " secs.");
    if(time) {
      this._absParams.reviveTimer = new Game_TimerABS();
      this._absParams.reviveTimer.start(t);
    }
  }

  //NEW Load from save file
  Game_AIBot.prototype.onGameLoad = function() {
    LOG.p("AI : On Game Load");
    this.battler().onGameLoad();
    //if(this._paused) {
    //  this._paused = false;
    //  this.pause(true);
    //} This not work
    /*var t = 0;
    if(this._absParams.reviveTimer)
      t = this._absParams.reviveTimer._value;
    this.setRevive(this._absParams.reviveTime);
    if(this._absParams.reviveTimer && t > 0) //Continue
    {
      LOG.p("AI : Continue revive from " + t);
      this._absParams.reviveTimer.start(t);
    }*/
  }

  //OVER
  Game_AIBot.prototype.start = function() {
    if(this.inActive()) { //Select by Enter
      if(this != BattleManagerABS.getPlayerTarget()) {
        BattleManagerABS.setPlayerTarget(this);
        LOG.p("Selected " + this.event().name);
      }
    }
    Game_Event.prototype.start.call(this);
  };

  //Pause function work but if you pause enemy then save game and load, enemy not be paused
  /*Game_AIBot.prototype.pause = function(isPause) {
    if(isPause) {
      if(this.inActive() && this.battler().isAlive()) {
        this._deactivate();
        this._paused = true;
        LOG.p("AI: Paused");
      }
    } else {
      if(this._paused) {
        LOG.p("AI: Resumed");
        this._paused = false;
        this.initABS();
      }
    }

  }*/

  //OVER
  Game_AIBot.prototype.update = function() {
    var isMoving = this.isMoving();
    Game_Event.prototype.update.call(this);
    if(!this.isMoving()){
      this._updateNonmoving(isMoving);
    }
    this._updateABS();
    this._updateRevive();
  }

  //NEW
  Game_AIBot.prototype.interruptCast = function() {
    var t = this._absParams.currentAction;
    if(t && t.isCasting()){
      LOG.p("AI : Cast intterupt");
      t.resetCast();
      this._absParams.casting = false;
    }
  }

  //NEW
  Game_AIBot.prototype._checkActiveState = function() {
    var t = this.list();
    for (var i =0; i < t.length; i++) {
          var item = t[i];
          if (item.code == 108) {
                var comment = item.parameters[0];
                if(comment.indexOf("<noActive") >= 0) {
                  var t2 = /<noActive\s?:\s?(.+?)>/;
                  var match = t2.exec(comment);
                  if(match) {
                    if(SDK.checkSwitch(match[1])) {
                      this._absParams.activateSwitch = match[1];
                      return false;
                    }
                  }
                }
          }
      }
      return true;
  }

  //PRIVATE
  Game_AIBot.prototype._storeMoveData = function() {
    var t = this._absParams;
    t.moveData = {};
    t = t.moveData;
    t.moveSpeed = this._moveSpeed;
    t.moveType = this._moveType;
    t.moveFrequency = this._moveFrequency;
  }

  Game_AIBot.prototype._restoreMoveData = function() {
    var t = this._absParams.moveData;
    this._moveSpeed = t.moveSpeed;
    this._moveType = t.moveType;
    this._moveFrequency = t.moveFrequency;
  }

  Game_AIBot.prototype._resetMoveData = function() {
    this._moveSpeed = this._absParams.moveData.moveSpeed;
    this._moveType = 0;
    this._moveFrequency = this._absParams.moveData.moveFrequency;
  }

  Game_AIBot.prototype._checkDieSwitch = function() {
    var key = [$gameMap.mapId(), this.eventId(), Consts.PARAMS.DEAD_SWITCH];
    if($gameSelfSwitches.value(key) === true) {
      if(this._absParams.reviveTime == 0) {
        this._deactivate();
      } else {
        $gameSelfSwitches.setValue(key, false);
      }
    }
  }

  Game_AIBot.prototype._makeActions = function() {
    if(this._absParams.casting) return;

    this._absParams.battler.makeActions();

    var actions = this._absParams.battler._actions.filter(function(action) {
      var skill = this.battler().skillABS_byAction(action);
      var target = this.target();
      if(skill)
        target = skill.isNeedTarget() ? this.target() : self;
      return BattleManagerABS.canUseABSSkillNow(this, target, skill) && this._isUsableABSSkill(skill);
    }.bind(this));

    //Выбрали действия, которые можно использовать в данный момент
    if(actions.length > 0) {
      this._setForceAction(actions.first());
    }
    else {
      this._setCurrentAction(this.battler().action(0)); //Устанавливаю
    }
  }

  Game_AIBot.prototype._isUsableABSSkill = function(absSkill) { //SOME TYPES NOT SUPPORTED YET
    var result = true;
    if(absSkill.isZoneType()) return false;
    if(absSkill.isRadiusType()) return false;
    if(absSkill.isNeedAmmo()) return false;
    if(absSkill.isVectorTypeR()) return false;
    if(absSkill.isStackType() && !absSkill.isAutoReloadStack()) return false;
    return result;
  }

  Game_AIBot.prototype._setForceAction = function(action) {
    this._absParams.currentAction = this.battler().skillABS_byAction(action);
    this._changeActionState('action');
  }

  Game_AIBot.prototype._setCurrentAction = function(action) {
    var t = this.battler().skillABS_byAction(action);
    if(this._absParams.currentAction != t) {
      this._absParams.currentAction = t;
      if(this._absParams.currentAction)
        this._changeActionState('prepareAction');
      else {
        if(this._absParams.escapeOnBattle)
          this._changeActionState('escape');
        else
          this._changeWaitActionState('prepareAction', 'wait', null);
      }
    }
  }

  Game_AIBot.prototype._performAction = function() {
    LOG.p("AI : Perform! " + this._absParams.currentAction.skill().name);
    if(this._absParams.currentAction.isVectorType()) {
      BattleManagerABS.battleProcess().startPostBattleAction(this, this.target(), this.battler().action(0), this._absParams.currentAction);
    } else {
      if(this._absParams.currentAction.isNeedTarget())
        BattleManagerABS.battleProcess().performBattleAction(this, this.target());
      else
        BattleManagerABS.battleProcess().performBattleAction(this, this);
    }
    this.battler().performCurrentAction();
    this._absParams.currentAction.playStartSound(this.toPoint());
    this._changeActionState('prepareAction');
  }

  Game_AIBot.prototype._updateABS = function() {

    if(this._absParams.active && !this._erased)
    {
      this.battler().updateABS();

      if(!this.battler().isAlive()) {
        this._changeState('dead');
        return;
      }

      if(!this.battler().canMove() && this._absParams.state != 'stun') {
        this._changeState('stun');
      }

      switch(this._absParams.state){
        case 'free': this._update_on_free(); break;
        case 'battle': this._update_on_battle(); break;
        case 'search' : this._update_on_search(); break;
        case 'return': this._update_on_return(); break;
        case 'stun' : this._update_on_stun(); break;
      }
    } else {
      if(this._absParams.state == 'return') {
        this._update_on_return();
      }
    }

    if(this._absParams.active == true && this._erased == true) {
      this._deactivate();
    }
  }

  Game_AIBot.prototype._updateRevive = function() {
    if(this._absParams.reviveTimer == null || this.battler().isAlive()) {
      return;
    }

    this._absParams.reviveTimer.update();
    if(this._absParams.reviveTimer.isReady()) {
      //TODO Colide with test
      //if(this.isCollidedWithEvents(this._absParams.myStartPosition.x, this._absParams.myStartPosition.y).length == 0) {
        this._revive();
      //} else {
      //  LOG.p("Can't revive, place is busy, wait");
      //  this._absParams.reviveTimer.start(720);
      //}

    }
  }

  Game_AIBot.prototype._revive = function() {
    if(this._erased == true) {
      this._absParams.reviveTimer = null;
      return;
    }

    this.locate(this._absParams.myStartPosition.x, this._absParams.myStartPosition.y);
    var key = [$gameMap.mapId(), this.eventId(), Consts.PARAMS.DEAD_SWITCH];
    $gameSelfSwitches.setValue(key, false);
    this._absParams.battler = null;
    this._absParams.reviveTimer = null;
    this.refresh();
    this.initABS();
    this.setRevive(this._absParams.reviveTime);
    this._absParams.active = true;
    this._absParams.looted = false;
    if(Consts.PARAMS.REVIVE_ANIMATION_ID > 0)
      this.requestAnimationABS(Consts.PARAMS.REVIVE_ANIMATION_ID); //TODO If in visible screen
    this._absParams.myHomePosition = null;
    this._changeState('free');
  }

  Game_AIBot.prototype._changeState = function(newState) {
    this._absParams.state = newState;
    switch(newState) {
      case 'free' :
        this._absParams.target = null;
        this._restoreMoveData();
        this._moveSpeed += this.battler().ABSParams().moveSpeedUpKoef;
      break;
      case 'battle' :
      if(this._absParams.regenTimer) {
        this._absParams.regenTimer.reset();
      }
      this._onBattleStart();
      this._changeActionState('approach');  //преследую цель!
      break;
      case 'return' :
        this._deactivate();
        LOG.p("AI : Return to " + this._absParams.myHomePosition.toString());
      break;
      case 'search':
        this._restoreMoveData();
        LOG.p("AI : Curious! I'am searching...");
        if(!this._absParams.behavior.noEmote) this.requestBalloon(2);
      break;
      case 'dead' :
        this._moveType = 0;
        var key = [$gameMap.mapId(), this.eventId(), Consts.PARAMS.DEAD_SWITCH];
        $gameSelfSwitches.setValue(key, true);
        this._originalDirection = -1;
        this._originalPattern = -1;
        this.refresh();
        this._deactivate();
      break;
      case 'stun':
        //this.interruptCast();
        this._resetTarget();
        this._moveType = 0; //Stop
        this._moveFrequency = this._absParams.moveData.moveFrequency;
        LOG.p("AI : I'am stunned!");
        if(!this._absParams.behavior.noEmote) this.requestBalloon(10);
      break;
    }
  }

  Game_AIBot.prototype._changeActionState = function(newActionState) {
    this._resetMoveData();
    this._absParams.actionState = newActionState;
    switch(newActionState) {
      case 'approach' :
        //LOG.p("AI : approach apply");
        if(this._absParams.behavior.noMove == true) {
          this._moveType = 0; //Stay
          this.turnTowardPlayer();
        } else {
          this._applyAproachSpeed();
          this._moveType = 2;
        }
        break;
      case 'prepareAction' :
        break;
      case 'cast':
        this._moveType = 0; //Stay
        this._moveFrequency = this._absParams.moveData.moveFrequency;
        this.turnTowardPlayer();
        break;
      case 'action' :
        this._moveType = 0; //Stay
        this._moveFrequency = this._absParams.moveData.moveFrequency;
        this._absParams.myHomePosition = new Point(this.x,this.y); //Reset position
        this.turnTowardPlayer();
        break;
      case 'escape':
        this._applyAproachSpeed();
        this._moveType = 0;
        break;
      case 'wait' :
        this._moveType = 0; //Stay
        this._moveFrequency = this._absParams.moveData.moveFrequency;
        break;
    }
  }

  Game_AIBot.prototype._applyAproachSpeed = function() {
    if(this._absParams.slow != true) {
      //LOG.p("AI : Apply acceleration");
      this._moveFrequency = this._absParams.moveData.moveFrequency + 2;
    }
  }

  Game_AIBot.prototype._changeWaitActionState = function(oldActionState, waitType, waitTimer) {
    this._absParams.oldActionState = oldActionState;
    this._absParams.waitType = waitType;
    this._absParams.waitTimer = waitTimer;
    this._changeActionState('wait');
  }

  Game_AIBot.prototype._checkReturn = function() {
    if(this._absParams.myHomePosition) {
      var t = ABSUtils.distanceTo(this, this._absParams.myHomePosition);
      if(t > this._absParams.returnRadius) {
        LOG.p("AI : I'am to far from my home!");
        //IDEA Можно включать прозрачность, чтобы быстрее вернулся домой
        this._changeState('return');
      }
    }
  }

  Game_AIBot.prototype._setTarget = function(t) {
    if(BattleManagerABS.isValidTarget(t)) {
      this._absParams.target = t;
      //if(t == $gamePlayer) //TODO Target to ally
        $gamePlayer.refreshBattleState();
    }
    if(t == null)
      this._resetTarget();
  }

  Game_AIBot.prototype._resetTarget = function() {
    this._absParams.target = null;
    this._absParams.inBattle = false;
    this.interruptCast();
  }


  Game_AIBot.prototype.moveTypeTowardPlayer = function() {
      if (this.isNearThePlayerX()) {
          //Nothing
      } else {
          this.moveToPoint($gamePlayer);
      }
  };

  Game_AIBot.prototype.isNearThePlayerX = function() {
      var sx = Math.abs(this.deltaXFrom($gamePlayer.x));
      var sy = Math.abs(this.deltaYFrom($gamePlayer.y));
      return sx + sy < 1;
  };

  Game_AIBot.prototype._update_on_free = function() {
    if(this._absParams.noFight) {
      var t = this._checkVision($gamePlayer);
      if(!t) {
        this._regenerateValues();
      } else {
        if(this._absParams.escapeOnBattle == true) {
          LOG.p("AI : Run away from Player");
          this._runAwayFromTarget();
        }
      }
      return;
    }

    if(this._absParams.myHomePosition != null) {
      if(this._absParams.active == true)
        this.returnSlow();
    }

    this._regenerateValues();
    var t = this._checkVision($gamePlayer);
    if(t) {
      this._setTarget($gamePlayer);
      if(this._absParams.target) {
        LOG.p("AI : Player Detected!");
        this._changeState('battle');
      }
    } else {
      if(this._absParams.canSearch) {
        this._checkVisionAlly();
        if(this._absParams.allyToSearch) {
          this._changeState('search');
        }
      }
    }
  }

  Game_AIBot.prototype._update_on_stun = function() {
    if(this.battler().canMove()) {
      this._changeState('free');
    } else {

    }
  }

  Game_AIBot.prototype._update_on_battle = function() {
    if(!this.target().inActive()) {
      this._changeState('free');
    }

    if(!this._checkVision(this.target())) {
      if(this._absParams.behavior.noMove) {
        this._changeState('free');
        return;
      }
    }

    this._makeActions();
    //LOG.p("AI : Make Actions Done");
    switch(this._absParams.actionState) {
    case 'approach':
      this._checkReturn();
      //LOG.p("AI : Check return Done");
    break;

    case 'prepareAction':
      LOG.p('prepareAction');
      var t = this._absParams.currentAction;
      if(t.cEonStart != 0) {
        LOG.p("AI : Common Event " + t.cEonStart);
        $gameTemp.reserveCommonEvent(t.cEonStart);
      }
      if(BattleManagerABS.canUseSkillByTimer(t)) {
        if(BattleManagerABS.canUseSkillByRange(this, this.target(), t)) {
          this._changeActionState('action');
        } else {
          LOG.p("AI : Player to away!");
          if(!this._absParams.behavior.noMove)
            //if(this._absParams.currentAction != 'approach')
              this._changeActionState('approach');
          else {
            this.turnTowardPlayer();
          }
        }
      } else {
        LOG.p("AI : Wait my attack");
        if(this._absParams.escapeOnBattle)
          this._changeWaitActionState('prepareAction', 'escape', t);
        else
          this._changeWaitActionState('prepareAction', 'wait', t);
      }
    break;

    case 'action':
      LOG.p("AI : Execute Action!");
      var t = this._absParams.currentAction;
      if(t.isNeedCast()) {
        if(t.isCasting()){
          if(t.isReady()) {
            this._performAction();
            this._absParams.casting = false;
          }
        } else {
          LOG.p("AI : Start cast!");
          this._absParams.casting = true;
          t.startCast();
          //this.requestAnimationABS(120); //TODO 130 анимация подлагивает при первом срабатывании!!! временно 120 поставил
          this._changeActionState('cast');
        }
      } else {
        this._performAction();
      }
    break;

    case 'cast':
      this.turnTowardPlayer();
      var t = this._absParams.currentAction;
      if(t.isCasting()) {
        if(!BattleManagerABS.canUseSkillByRange(this,this.target(),t)) {
          LOG.p("AI : Cast intterupt, target too far");
          t.resetCast();
          this._absParams.casting = false;
          this._changeActionState('prepareAction');
        } else {
          if(t.isReady()) {
            LOG.p("AI : Cast END");
            this._changeActionState('action');
          }
        }
      } else {
        this._absParams.casting = false;
        this._changeActionState('prepareAction');
      }
    break;

    case 'escape':
      this._escapeFromTarget();
      this._checkReturn();
    break;

    case 'wait':
      if(this._absParams.waitType == 'escape') {
        this._escapeFromTarget();
        if(this._absParams.agressive) return;
      }
      if(this._absParams.waitTimer && this._absParams.waitTimer.isReady()){
        this._changeActionState(this._absParams.oldActionState);
        if(this._absParams.agressive) return;
      }

      if(this._absParams.agressive)
        this._changeActionState('approach');
      else {
        if(!this._checkVision($gamePlayer)) {
          this._resetTarget();
          this._changeState('free');
        }
      }
    break;
    }
  }

  Game_AIBot.prototype._update_on_return = function() {
    if(!this._absParams.myHomePosition) {
      this.returnNot();
      return;
    }

    if(this.isNotReturn()) {
      this.returnNot();
    } else if(this.isSlowReturn()) {
      this._absParams.active = true;
      this._onBattleEnd();
      this.returnSlow();
    } else {
      this.returnFast();
    }
  }

  Game_AIBot.prototype.returnNot = function() {
    this._absParams.active = true;
    this._onBattleEnd();
  };

  Game_AIBot.prototype.returnSlow = function() {
    var t = this._absParams.myHomePosition;
    var direction = this.findDirectionTo(t.x,t.y);
    if(direction > 0) {
      if (!this.isMoving())
        this.moveStraight(direction);
    } else {
      LOG.p("AI : I'am return to Home!");
      this._absParams.myHomePosition = null;
      this._restoreMoveData();
    }
  };

  Game_AIBot.prototype.returnFast = function() {
    var t = this._absParams.myHomePosition;
    var direction = this.findDirectionTo(t.x,t.y);
    if(direction > 0) {
      this.moveStraight(direction);
    } else {
      LOG.p("AI : I'am return to Home!");
      this._absParams.myHomePosition = null;
      this._absParams.active = true;
      this._onBattleEnd();
    }
  }

  Game_AIBot.prototype._update_on_search = function() {
    if(this._absParams.allyToSearch &&
      this._absParams.allyToSearch.inActive()) {

      var t = this._checkVision($gamePlayer);
      if(t) {
        this._absParams.allyToSearch = null;
        this._setTarget($gamePlayer);
        if(this._absParams.target) {
          LOG.p("AI : Player Detected!");
          this._changeState('battle');
        }
      } else {
        if(!this.isMoving() && !this._absParams.behavior.noMove) {
          //this.moveTowardCharacter(this._absParams.allyToSearch);
          this.moveToPoint(this._absParams.allyToSearch);
        }
      }

    } else {
      this._changeState('free');
    }
  }

  Game_AIBot.prototype._checkVision = function(who) {
    if(!who || !who.inActive()) {
      return false;
    }
    var t = ABSUtils.distanceTo(this, who);
    if(t < this._absParams.viewRadius) {
      return true;
    } else
      return false;
  }

  Game_AIBot.prototype._checkVisionAlly = function() {
    var ally = ABSUtils.inRadius(this, this._absParams.viewRadius, $gameTroop.membersABS());
    this._absParams.allyToSearch = null;
    if(ally.length > 0) {
      ally.forEach(function(t) {
        if(t.inBattle()) {
          this._absParams.allyToSearch = t;
        }
      }.bind(this));
    }
  }

  Game_AIBot.prototype._escapeFromTarget = function() {
    var escapeRange = 2;
    if(!this._absParams.target) return;
    var t = ABSUtils.distanceTo(this, this._absParams.target);
    if(!this.isMoving()) {
      if(t < escapeRange) {
          this.moveFromPoint($gamePlayer);
          this.turnTowardPlayer();
      } else if(t > escapeRange + 1) {
        this.moveTowardCharacter($gamePlayer);
      } else
        this.turnTowardPlayer();
    }
  }

  Game_AIBot.prototype._runAwayFromTarget = function() {
    var realRange = this._absParams.viewRadius / 2;
    var escapeRange = (realRange >= 2) ? realRange : 2;
    var t = ABSUtils.distanceTo(this, $gamePlayer);
    if(!this.isMoving()) {
      if(t < escapeRange) {
        this._applyAproachSpeed();
        this.moveFromPoint($gamePlayer);
      } else {
        this._changeState('free');
      }
    }
  }

  Game_AIBot.prototype._deactivate = function() {
    if(BattleManagerABS.getPlayerTarget() == this) {
      BattleManagerABS.setPlayerTarget(null);
    }
    this._absParams.active = false;
    this._resetTarget();
  }

  Game_AIBot.prototype._onBattleStart = function() {
    if(!this._absParams.behavior.noEmote) this.requestBalloon(1);
    this.battler().onBattleStart();
    this._absParams.inBattle = true;
    this._absParams.myHomePosition = new Point(this.x, this.y);
    LOG.p("AI : Store home position: " + this._absParams.myHomePosition.toString());
    if(this._absParams.behavior.cEonStart > 0) {
      LOG.p("AI : Common Event (on Battle Start): " + this._absParams.behavior.cEonStart);
      $gameTemp.reserveCommonEvent(this._absParams.behavior.cEonStart);
    }
  }

  Game_AIBot.prototype._onBattleEnd = function() {
    this._absParams.inBattle = false;
    this._absParams.allyToSearch = null;
    this.battler().onBattleEnd();
    if(this._absParams.behavior.cEonEnd > 0) {
      LOG.p("AI : Common Event (on Battle End): " + this._absParams.behavior.cEonEnd);
      $gameTemp.reserveCommonEvent(this._absParams.behavior.cEonEnd);
    }
    this._changeState('free');
  }

  Game_AIBot.prototype._updateNonmoving = function(wasMoving) { //from Player
    if (!$gameMap.isEventRunning()) {
          if (wasMoving && !this.isMoveRouteForcing()) {
              this.battler().onWalk();
          }
      }
  }

  Game_AIBot.prototype._checkFloorEffect = function() {
      if ($gameMap.isDamageFloor(this.x, this.y)) {
          this.battler().executeFloorDamage();
      }
  };

  Game_AIBot.prototype._regenerateValues = function() {
    if(this._absParams.regenOnFree) {
      if(!this._absParams.regenTimer){
        this._absParams.regenTimer = new Game_TimerABS();
        this._absParams.regenTimer.start(60);
      }
      this._absParams.regenTimer.update();
      if(this._absParams.regenTimer.isReady()) {
        this._absParams.regenTimer.reset();
        this.battler().regenerateAllonFree();
      }
    }
  }
  //END Game_AIBot
//------------------------------------------------------------------------------

})();

(function() {

  

  var LOG = new PLATFORM.DevLog("BattleProcessABS");
  LOG.applyPresetLib();

  var Point = AlphaABS.UTILS.Point;

  //BattleProcessABS
  //------------------------------------------------------------------------------
    class Game_BattleProcessABS {
      constructor() {
        this._postProcesses = [];
        this._skill = null;
        this._centerPoint = null;
      }

      performBattleAction(subject, target) {
        this._processAction(subject, target, subject.battler().currentAction());
      }

      performBattleActionZone(subject, action) {
        LOG.p("Battle : Start Zone Action");
        this._processAction(subject, null, action);
      }

      performBattleActionRadius(subject, point, action, skill) {
        LOG.p("Battle : Start Radius Action");
        this._centerPoint = point;
        this._processAction(subject, null, action);
      }

      startPostBattleAction(subject, target, action, skill) {
        LOG.p("Battle : Start post Action");
        action._forcing = true; //Because subject use MP and other on action start
        var postProcess = {};
        postProcess.subject = subject;
        postProcess.target = target;
        postProcess.action = action;
        postProcess.skill = skill;
        var t = new AlphaABS.LIBS["Game_SVector"](postProcess);
        this._postProcesses.push(t);
        $gameMap.addSVector(t);
        if(subject == $gamePlayer) {
          if(!$gamePlayer.inBattle())
            $gamePlayer.onBattleStart();
        }
      }

      performPostBattleAction(sVector) {
        var t = sVector.data();
        if(t.skill.isVectorTypeR()) {
          LOG.p("Battle : Start Radius Action by Vector");
          this._centerPoint = t.target;
          this._processAction(t.subject, null, t.action);
        } else
          this._processAction(t.subject,t.target,t.action);
        this._postProcesses.delete(sVector);
      }

      isPostProcessExists() {
        return (this._postProcesses.length != 0);
      }

      //PRIVATE
      _processAction(subject, target, action) {
        if(subject == null) {
          return;
        }
        if(!subject.battler()) {
          return;
        }
        if(action) {
          action.prepare(); //???
          if(action.isValid()) {
            this._start_action(subject, target, action);
            this._end_action(subject);
          }
        }
      }

      _start_action(subject, target, action) {
        //subject.requestEffect('whiten'); TODO
        this._skill = subject.battler().skillABS_byAction(action);
        action.applyGlobal();
        var targets = this._makeTargets(subject, target);
        this._showAnimation(subject, targets, action);
        targets.forEach(function(item){
          if(item && item.inActive()) {
            this._invokeAction(subject, item, action);
          }
        }.bind(this));
      }

      _end_action(subject) {
        subject.battler().performActionEnd(); //???
        subject.battler().onAllActionsEnd();
        this._skill = null;
        this._centerPoint = null;
      }

      _invokeAction(subject, target, action) {
        /*if (Math.random() < action.itemCnt(target)) {
              this.invokeCounterAttack(this._subject, target);
          } else if (Math.random() < action.itemMrf(target)) {
              this.invokeMagicReflection(this._subject, target);
          } else {
              this.invokeNormalAction(this._subject, target);
          }*/
          this._invokeNormalAction(subject, target, action);
      }

      _invokeNormalAction(subject, target, action) {
        //var realTarget = this.applySubstitute(target);
        action.apply(target.battler());
        this._onActionResult(subject, target);
      }

      _makeTargets(subject, target) {
        var targets = [];
        if(this._skill.isZoneType()) {
          var zone = this._generateZone(subject);
          var points = zone.points;
          this._centerPoint = zone.center;
          var candidates = [];
          if(subject == $gamePlayer) {
            candidates = $gameTroop.membersABS();
          } else {
            candidates = [$gamePlayer];
          }
          for(var i = 0; i<points.length; i++) {
            candidates.forEach(function(item){
              if(ABSUtils.inPoint(item, points[i])) {
                targets.push(item);
              }
            });
          }
          return targets;
        } else
          if(this._skill.isRadiusType() || this._skill.isVectorTypeR()) {
            if(subject == $gamePlayer) {
              targets = ABSUtils.inRadius(this._centerPoint, this._skill.radius, $gameTroop.membersABS());
            } else {
              targets = ABSUtils.inRadius(this._centerPoint, this._skill.radius, [$gamePlayer]);
            }
          } else {
            targets.push(target);
          }

        return targets;
      }

      _showAnimation(subject, targets, action) {
        if(action.isSkill() && action.item().id == subject.battler().attackSkillId()) {
          this._requestAnimation(targets, subject.battler().attackAnimationId1());
        } else {
          var animId = action.item().animationId;
          if(this._skill.isZoneType() || this._skill.isRadiusType() || this._skill.isVectorTypeR()) {
            this._requestMapAnimation(animId);
          } else {
            this._requestAnimation(targets, animId);
          }
        }
      }

      _requestAnimation(objects, animationId) {
        objects.forEach(function(item) {
          if(item)
            item.requestAnimationABS(animationId);
        });
      }

      _requestMapAnimation(animationId) {
        /*var t = null;
        if(this._skill.isZoneType()) {
          t = new Bitmap(96,96);
        } else {
          t = new Bitmap(this._skill.radius * 2 * 32, this._skill.radius * 2 * 32);
        }
        var sprite = new Sprite_Base(t);*/
        var sprite = new Sprite_Base();
        sprite.anchor.x = -0.5;
        sprite.anchor.y = -0.5;
        var point = this._centerPoint.mapPointOnScreen();
        sprite.x = point.x;
        sprite.y = point.y;
        LOG.p("Request Map animation on " + point);

        $gameMap.requestAnimationABS({sprite: sprite, id : animationId});
      }

      _onActionResult(subject, target) {
        if(target.battler().result().used) {
          this._resultOnDamage(target.battler());
          //this._resultOnFailure(target.battler());
          //if (target.battler().result().isStatusAffected())
          //    this._resultOnAffectedStatus(target.battler());
          target.battler().startDamagePopup();
          subject.battler().startDamagePopup();
          target.onActionOnMe(subject);
        }
      }

      _resultOnDamage(target) {
        if(target.result().missed) {
          if(target.result().physical) {
            target.performMiss();
          } else {
            this._resultOnFailure(target);
          }

        } else if (target.result().evaded) {
           if (target.result().physical) {
            target.performEvasion();
           }
           else {
            target.performMagicEvasion();
           }
        } else {
           //HP
           if (target.result().hpAffected) {
                if (target.result().hpDamage > 0 && !target.result().drain) {
                    target.performDamage();
                }
                if (target.result().hpDamage < 0) {
                    target.performRecovery();
                }
            }
            //MP
            if (target.isAlive() && target.result().mpDamage !== 0) {
                if (target.result().mpDamage < 0) {
                    target.performRecovery();
                }
            }
            //TP
            if (target.isAlive() && target.result().tpDamage !== 0) {
                if (target.result().tpDamage < 0) {
                    target.performRecovery();
                }
            }
        }
        target.performActionUsed();
      }

      _resultOnFailure(target) {
        //Empty
      }

      _resultOnAffectedStatus(target) {
        let states = target.result().addedStateObjects();
        states.forEach(function(state) {
          var state_msg = target.isActor() ? state.message1 : state.message2;
          //if(state.id === target.deathStateId())
          //  target.performCollapse();
          //this._add_state_info(target, state_msg); (not used)
        }.bind(this));
      }

      _generateZone(subject) {
        var d = ABSUtils.getDirKey(subject);
        var points = [];
        var point = subject.toPoint();

        /*
            **
        SUBJECT ***
            **
        */

        var centerPoint = null;

        switch(d) {
          case 'r' :
            centerPoint = new Point(point.x + 2,point.y);
            points.push(new Point(point.x + 1, point.y + 1));
            points.push(new Point(point.x + 1, point.y - 1));
          break;
          case 'l' :
            centerPoint = new Point(point.x - 2, point.y);
            points.push(new Point(point.x - 1, point.y + 1));
            points.push(new Point(point.x - 1, point.y - 1));
          break;
          case 'u' :
            centerPoint = new Point(point.x, point.y - 2);
            points.push(new Point(point.x + 1, point.y - 1));
            points.push(new Point(point.x - 1, point.y - 1));
          break;
          default: //d
            centerPoint = new Point(point.x, point.y + 2);
            points.push(new Point(point.x + 1, point.y + 1));
            points.push(new Point(point.x - 1, point.y + 1));
          break;
        }

        points.push(centerPoint);
        points.push(new Point(centerPoint.x - 1, centerPoint.y));
        points.push(new Point(centerPoint.x + 1, centerPoint.y));
        points.push(new Point(centerPoint.x, centerPoint.y - 1));
        points.push(new Point(centerPoint.x, centerPoint.y + 1));

        /*
               *
          * CenterPoint *
               *
        */

        return {center: centerPoint, points: points};
      }
    }

    AlphaABS.register(Game_BattleProcessABS);
    AlphaABS.BattleManagerABS.connectProcess();

    //END BattleProcessABS
  //------------------------------------------------------------------------------



})();

(function() {

  

  var ABSObject_PopUp = AlphaABS.ABSObject_PopUp;
  var ABSObject_PopUpMachine = AlphaABS.ABSObject_PopUpMachine;

  //PopInfoManagerABS
  //------------------------------------------------------------------------------
    function PopInfoManagerABS() {
      throw new Error('This is a static class');
    }

    PopInfoManagerABS.makeDamagePopUp = function(user) {
      let result = user.result();

      if(result.hpDamage != 0) {
        let value = PopInfoManagerABS.HP(result.hpDamage, result.critical);
          this._apply_pop_up(user, value);
      }

      if(result.mpDamage != 0) {
        let value = PopInfoManagerABS.MP(result.mpDamage, result.critical);
        this._apply_pop_up(user, value);
      }

      if(result.tpDamage != 0) {
        let value = PopInfoManagerABS.TP(result.tpDamage, result.critical);
        this._apply_pop_up(user, value);
      }
    }

    PopInfoManagerABS.makeZeroDamagePopUp = function(user) {
      let result = user.result();
      let value = PopInfoManagerABS.HP(0, result.critical);
      this._apply_pop_up(user, value);
    }

    PopInfoManagerABS.makeDrainPopUp = function(user) { //user - who get drained HP
      let result = user.result();
        if(result.hpDamage != 0) {
          let value = PopInfoManagerABS.HP(result.hpDamage, result.critical);
          value.getFontSettings()[2] = true;
          this._apply_pop_up(user, value);
        }

        if(result.mpDamage != 0) {
          let value = PopInfoManagerABS.MP(result.mpDamage, result.critical);
          value.getFontSettings()[2] = true;
          this._apply_pop_up(user, value);
        }
    }

    PopInfoManagerABS.makeStatePopUp = function(user, stateId, isErase) {
      let state = $dataStates[stateId];
      if(state.iconIndex == 0)
        return;
      if(state.id == user.deathStateId())
        return;
      let value = PopInfoManagerABS.STATE((user.isEnemy() ? "" : state.name), state.iconIndex, isErase);
      this._apply_pop_up(user, value);
    }

    PopInfoManagerABS.makeItemPopUp = function(user) {
      let result = user.result();
      if(!user.isAlive()) return;
      if(result.missed) {
        this._apply_pop_up(user, PopInfoManagerABS.TEXT(AlphaABS.SYSTEM.STRING_POPUP_MISS[SDK.isRU()]));
        return;
      }

      if(result.evaded) {
        this._apply_pop_up(user, PopInfoManagerABS.TEXT(AlphaABS.SYSTEM.STRING_POPUP_EVADE[SDK.isRU()]));
        return;
      }

      if(result.isHit() && !result.success) {
        this._apply_pop_up(user, PopInfoManagerABS.TEXT(AlphaABS.SYSTEM.STRING_POPUP_FAIL[SDK.isRU()]));
        return;
      }
    }

    PopInfoManagerABS.makeBuffPopUp = function(user, paramId, isPositive) {
      //if(!BattleManagerRTBS.isBattle()) return;
      if(!user.isAlive()) return;
      let paramName = user.isEnemy() ? "" : TextManager.param(paramId);
      var temp = isPositive ? 1 : -1;
      let iconIndex = user.buffIconIndex(temp, paramId);
      let value = PopInfoManagerABS.BUFF(paramName, iconIndex, isPositive);
      if(!user.getInfoPops().include(value)) {
        this._apply_pop_up(user, value);
      }
    }

    PopInfoManagerABS.makeSkillRechargePopUp = function(user, skillId) {
      //if(!BattleManagerRTBS.isBattle()) return;
      if(!user.isAlive()) return;
      if(user.isEnemy()) return; //This is for ActorEnemy, in version 1 not develop yet
      let skill = $dataSkills[skillId];
      let value = PopInfoManagerABS.SKILL(skill.name, skill.iconIndex);
      if(!user.getInfoPops().include(value)) {
        this._apply_pop_up(user, value);
      }
    }

    PopInfoManagerABS.calcRate = function(rate) {
      this.text = "";
      /*if(rate > 1) {
        this.text = AlphaABS.SYSTEM.STRING_POPUP_WEAK[SDK.isRU()];
      } else if(rate === 0) {
        this.text = AlphaABS.SYSTEM.STRING_POPUP_IMMUNE[SDK.isRU()];
      } else if(rate < 1) {
        this.text = AlphaABS.SYSTEM.STRING_POPUP_ABSORB[SDK.isRU()];
      } else {
        this.text = "Resist"; //What a hell?
      }*/ //Not yet, my friend...
    }

    //STATIC
    PopInfoManagerABS.HP = function(value, critical) {
      var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
      var color = Color.YELLOW;
      if(value < 0) {
        color = Color.GREEN;
        value = Math.abs(value);
      } else if(critical) {
        color = Color.RED;
        fontSettings[1] = 34;
      }

      let x = new ABSObject_PopUp(value, color, null, fontSettings);
      x.setNumered();
      return x;
    }

    PopInfoManagerABS.TP = function(value, critical) {
      var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
      var color = Color.ORANGE;
      if(value < 0) {
        color = Color.GREEN;
        value = Math.abs(value);
      } else if(critical) {
        color = Color.RED;
        fontSettings[1] = 34;
      }

      value = value + " " +TextManager.tpA;
      let x = new ABSObject_PopUp(value, color, null, fontSettings);
      x.setNumered();
      return x;
    }

    PopInfoManagerABS.MP = function(value, critical) {
      var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
      var color = Color.MAGENTA;
      if(value < 0) {
        color = Color.BLUE;
        value = Math.abs(value);
      } else if(critical) {
        color = Color.MAGENTA;
        fontSettings[1] = 34;
      }

      let x = new ABSObject_PopUp(value, color, null, fontSettings);
      x.setNumered();
      return x;
    }

    PopInfoManagerABS.STATE = function(name, iconIndex, isErase) {
      var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
      fontSettings[2] = true;

      var temp = isErase ? "- " : "+ ";
      fontSettings[0] = AlphaABS.SYSTEM.FONT;
      return new ABSObject_PopUp(temp + name, null, iconIndex, fontSettings);
    }

    PopInfoManagerABS.BUFF = function(name, iconIndex, isPositive) {
      var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
      fontSettings[2] = true;

      var color = isPositive ? Color.GREEN : Color.RED;
      fontSettings[0] = AlphaABS.SYSTEM.FONT;
      return new ABSObject_PopUp(name, color, iconIndex, fontSettings);
    }

    PopInfoManagerABS.TEXT = function(text) {
      return new ABSObject_PopUp(text);
    }

    PopInfoManagerABS.TEXT_WITH_COLOR = function(text, color) {
      return new ABSObject_PopUp(text, color);
    }

    PopInfoManagerABS.ALERT = function(text) {
      return new ABSObject_PopUp(text, Color.RED, null, [null, 22, false, 2, Color.BLACK]);
    }

    PopInfoManagerABS.EXP = function(value) {
      var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
      fontSettings[1] = 32;
      let x = new ABSObject_PopUp(value, Color.MAGENTA, null, fontSettings);
      x.setNumered();
      return x;
    }

    PopInfoManagerABS.SKILL = function(name, iconIndex) {
      var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
      fontSettings[2] = true;
      return new ABSObject_PopUp(AlphaABS.SYSTEM.STRING_POPUP_SKILL[SDK.isRU()], Color.GREEN, iconIndex, fontSettings);
    }

    //PRIVATE
    PopInfoManagerABS._apply_pop_up = function(user, value) {
      /*if(this.text === undefined)
        this.text = "";
      if(this.text != "") {
        if(value.isNumered()) value.setExtraText(this.text);
        this.text = "";
      }*/
      user.addInfoPop(value);
    }

    //END PopInfoManagerABS
  //------------------------------------------------------------------------------

    AlphaABS.PopInfoManagerABS = PopInfoManagerABS;

})();



var PLATFORM = PLATFORM || {};

//==========================================================================================================================================================
// ABS Library
//==========================================================================================================================================================
(function() {
	AlphaABS.LIB = {}; //Подключаем библиотеку
	AlphaABS.LIB.EXT = {}; //Временные расширения для области видимости
	//Object.freeze(AlphaABS.LIB);
	//Object.defineProperty(AlphaABS, 'LIB', {writable: false});
})();


//==========================================================================================================================================================
// Alpha ABS MAIN
//==========================================================================================================================================================
//Class extension (for savefile compability)
function Game_EnemyABS()		 { this.initialize.apply(this, arguments);}
function Game_SkillABS()		 { this.initialize.apply(this, arguments);}
function Game_SkillManagerABS()  { this.initialize.apply(this, arguments);}
function Game_TimerABS()		 { this.initialize.apply(this, arguments);}

//TEMP
var ABSUtils = AlphaABS.UTILS;

(function() {

	//PLATFORM
	var SDK = PLATFORM.SDK;
	var Color = PLATFORM.Color;

	var LOG = new PLATFORM.DevLog("ABS");
	LOG.setColors(new Color(164,66,161,0).hex(), Color.WHITE.hex());

	//ABS
	var SMouse = AlphaABS.UTILS.SMouse;
	var Point = AlphaABS.UTILS.Point;
	SMouse.initMouseTrack();

	var PopInfoManagerABS = AlphaABS.PopInfoManagerABS;
	var Consts = AlphaABS.SYSTEM;
	var ABSPE = AlphaABS.SYSTEM.EXTENSIONS.ABSPE;

	var LOGW = AlphaABS.SYSTEM.LOGW;

	//EXTEND for DEV
	var ABSUtils = AlphaABS.UTILS;
	var ABSPathfinding = AlphaABS.ABSPathfinding;

	//LOAD LIBS
	var Game_AIBot = AlphaABS.LIBS["Game_AIBot"];
	var BattleManagerABS = AlphaABS.LIBS["BattleManagerABS"];
	var BattleProcessABS = BattleManagerABS.battleProcess();

//Game_SkillABS
//------------------------------------------------------------------------------
	Game_SkillABS.prototype.initialize = function(skillId, isItem) {
	    this.skillId = skillId;
	    this._isItem = SDK.check(isItem, false);
		this.timer = new Game_TimerABS();
		this.timer.start(0);

		this.type = parseInt(this.skill().meta.ABS);

		this._loadParamsBase();
		this._loadParamsUser();
		this._loadParamsExt();
		this._checkParams();
	};

	Game_SkillABS.prototype.isItem = function() {
		return (this._isItem == true);
	}

	Game_SkillABS.prototype.update = function() {
			this.timer.update();
	}

	Game_SkillABS.prototype.getReloadTime = function() {
		return this.reloadTimeA;
	}

	Game_SkillABS.prototype.isReady = function() {
		return this.timer.isReady();
	}

	Game_SkillABS.prototype.preUse = function(param) {
		this.reloadTimeA = param + this.reloadTime;
	}

	Game_SkillABS.prototype.isNeedReloadParam = function() {
		return (this.reloadParam != null);
	}

	Game_SkillABS.prototype.isDirectionFix = function() {
		return (this.directionFix == true);
	}

	Game_SkillABS.prototype.isNeedTarget = function() {
		return (this.needTarget == true);
	}

	Game_SkillABS.prototype.isNeedCast = function() {
		return (this.castTime != 0);
	}

	Game_SkillABS.prototype.isStackType = function() {
		return (this.stackTime > 0);
	}

	Game_SkillABS.prototype.isAutoReloadStack = function() {
		return !this.isNeedAmmo();
	}

	Game_SkillABS.prototype.isNeedReloadStack = function() {
		return (this.isStackType() && this._stackNeedReload == true);
	}

	Game_SkillABS.prototype.isVectorType = function() {
		return (this.type == 1);
	}

	Game_SkillABS.prototype.isVectorTypeR = function() {
		return (this.isVectorType() && this.radius > 0 && !this.isNeedTarget());
	}

	Game_SkillABS.prototype.isZoneType = function() {
		return (this.type == 3);
	}

	Game_SkillABS.prototype.isRadiusType = function() {
		return (this.type == 2);
	}

	Game_SkillABS.prototype.isCasting = function() {
		return (this._startCast == true);
	}

	Game_SkillABS.prototype.isNeedAmmo = function() {
		return (this.ammo > 0);
	}

	Game_SkillABS.prototype.playStartSound = function(point) {
		if(this.startSound) {
			if(point != null)
				AudioManager.playSeAt(this.startSound, point);
			else
				AudioManager.playSe(this.startSound);
		}
	}

	Game_SkillABS.prototype.startCast = function() {
		this._castDelay = 0;
		this._startCast = true;
		this.timer.start(this.castTime);
	}

	Game_SkillABS.prototype.onCastDelay = function(delay) {
		this._castDelay += delay;
		//LOG.p("Cast delay " + this._castDelay);
		//var p = (this.castTime + this._castDelay);
		//LOG.p("Max time is " + p);
		this.timer.setMaxTime(this.castTime + this._castDelay);
	}

	Game_SkillABS.prototype.resetCast = function() {
		this._startCast = false;
		this.timer.start(0);
	}

	Game_SkillABS.prototype.loadExternal = function(params, type) {
		if(type !== undefined) {
			this.type = type;
			var t = this.reloadParam;
			this._loadParamsBase();
			this.reloadParam = t;
		}
		this.castTime = 0;
		this._loadParamsExt(params);
		this._checkParams();
		if(this.castTime > 0) {
			this.castTime = 0;
			LOGW.p(Consts.STRING_WARNING_SKILLWC[SDK.isRU()]);
		}
		if(this.isVectorTypeR()) {
			LOGW.p(Consts.STRING_WARNING_SKILLWVR[SDK.isRU()]);
			this.radius = 0;
			this.needTarget = true;
		}
		LOG.p("Skill " + this.name() + " loaded external params");
	}

	Game_SkillABS.prototype.chargeStack = function(size) {
		if(size === undefined) {
			this._currentStack = this.stack;
			return 0;
		} else {

			if(this._currentStack === undefined) {
				this._currentStack = 0;
			}

			var d = 0;

			if(size > 0) {
				var n = Math.abs(this._currentStack - this.stack);
				d = size - n;
				if(d < 0) {
					this._currentStack = this.stack - Math.abs(d);
				} else {
					this._currentStack = this.stack;
					return d;
				}
			} else {
				this._currentStack -= Math.abs(size);
			}


			LOG.p("Skill: Current stack " + this._currentStack);
			if(this._currentStack <= 0) {
				this._stackNeedReload = true;
				this._currentStack = 0;
				LOG.p("Skill: Stack need reload all");
			}
			if(d >= 0)
				return d; //Остаток
			else
				return 0;
		}
	}

	Game_SkillABS.prototype.reloadStack = function() {
		if(!this.isStackType()) return;
		this.resetCast();
		LOG.p("Stack reload manual " + this.skill().name + " reload time " + this.stackTime);
		this.timer.start(this.stackTime);
		this._stackNeedReload = false;
		//Don't need post use because stackTime > 0
	}

	Game_SkillABS.prototype.onUse = function() {
		if(this.cEonUse != 0) {
			LOG.p("Skill ABS: Common Event on USE " + this.cEonUse);
			$gameTemp.reserveCommonEvent(this.cEonUse);
		}
		if(this.isStackType()) {
			this._onUseStackType();
		} else
			this._onUseNormal();
	}

	Game_SkillABS.prototype._onUseStackType = function() {
		this.chargeStack(-1);
		if(this.isAutoReloadStack() && this.isNeedReloadStack()) {
			LOG.p("Skill: Reload stack auto");
			this.preUse(this.stackTime);
			this._stackNeedReload = false;
			this._currentStack = this.stack;
		}
		this._onUseNormal();

		if(this.isAutoReloadStack() && !this.isNeedReloadStack()) {
			this.preUse(0);
		}
	}

	Game_SkillABS.prototype._onUseNormal = function() {
		this.resetCast();
		LOG.p("On use " + this.skill().name + " reload time " + this.reloadTimeA);
		this.timer.start(this.reloadTimeA);

		if(this.isNeedAmmo()) {
			$gameParty.loseItem($dataItems[this.ammo], 1, true);
		}

		if(this.castTime == 0 && this.reloadTimeA == 0) {
			LOG.p("Skill " + this.skill().name + " use PostUse");
			this.timer.start(60); //Post Use
		}
	}

	Game_SkillABS.prototype.postUse = function() { //Delay between skill activation (called when another skill is start)
		if(this.isReady() && this.skillId != 1) { //Attack not need postUse
			this.timer.start(60);
			LOG.p("Skill " + this.skill().name + " use PostUse");
		}
	}

	Game_SkillABS.prototype.skill = function() {
		if(this.isItem())
			return $dataItems[this.skillId];
		else
			return $dataSkills[this.skillId];
	}

	Game_SkillABS.prototype.name = function() {
		return this.skill().name;
	}

	//PRIVATE
	Game_SkillABS.prototype._loadParamsBase = function() {
		var template = Game_SkillABS.TEMPLATES[this.type];
		Game_SkillABS.PARAMS.forEach(function(p){
			if(template[p])
				this[p] = template[p];
			else
				this[p] = 0;
		}.bind(this));

		this.reloadParam = null;
	}

	Game_SkillABS.prototype._loadParamsUser = function() {
		var item = this.skill();
		this.castTime = item.speed;
		this.range = item.repeats;
		if(this.range == 1)
			this.range = 0;
		if([1,3,4,5,6].contains(item.scope)) {
			this.needTarget = true;
		} else
			this.needTarget = false;
	}

	Game_SkillABS.prototype._loadParamsExt = function(innerData) {
		var paramsData = this.skill().meta;
		if(innerData !== undefined) {
			paramsData = innerData;
		}

		for(var i = 0; i<Game_SkillABS.PARAMS.length; i++) {
			var p = Game_SkillABS.PARAMS[i];
			if(paramsData[p]) {
				if(i < 6) { //String params
					this[p] = paramsData[p];
				} else {
					this[p] = parseInt(paramsData[p]);
				}
			}
		}
		if(this.isVectorType()) {
			this._particleParamsUser = {};
			var count = 0;
			Game_SkillABS.PARAMS2.forEach(function(p){
			if(paramsData[p]) {
				if(p == Game_SkillABS.PARAMS2[0]) { //pData is String
					this._particleParamsUser[p] = paramsData[p];
					count++;
				}
				else {
					this._particleParamsUser[p] = parseInt(paramsData[p]);
					count++;
				}
			}
			}.bind(this));
			if(count == 0)
				this._particleParamsUser = null; //None
		}
	}

	Game_SkillABS.prototype._checkParams = function() {
		switch(this.type){
			case 0:
			break;
			case 1:
				if(!this.img || this.img == "") {
					this.img = 'null';
				}
				if(!this.pType || this.pType == '0' || this.pType == 'null' || this.pType == "") {
					this.pType = null;
				}
				if(!this.light || this.light == '0' || this.light == 'null' || this.light == "") {
					this.light = null;
				}
				if(this.range == 0) this.range = Game_SkillABS.TEMPLATES[1].range;
				if(this.radius > 0) {
					this.needTarget = false;
					if(this.radius > 5) {
						this.radius = 5;
						LOGW.p(this.skill().name + " spell radius must be <= 5. Changed to 5!");
					}
				} else {
					this.needTarget = Game_SkillABS.TEMPLATES[1].needTarget;
				}
			break;
			case 2:
				if(this.radius == 0) this.radius = Game_SkillABS.TEMPLATES[2].radius;
				if(this.radius > 5) {
					this.radius = 5;
					LOGW.p(this.skill().name + " spell radius must be <= 5. Changed to 5!");
				}
				if(this.needTarget) {
					if(this.range == 0)
						this.range = Game_SkillABS.TEMPLATES[2].range;
				}
			break;
			case 3:

			break;
		}

		if(this.directionFix > 0)
			this.directionFix = true;

		if(this.noDescription > 0) {
			this.noDescription = true;
		}

		if(this.stack == 1) {
			this.stack = 2;
			LOGW.p("Skill " + this.name() + " stack minimum 2!");
		}

		if(this.stackTime <= 0) {
			if(this.stack > 1) {
				this.stackTime = this.reloadTime * this.stack * 2;
				LOGW.p("Skill " + this.name() + " You use stack withou stackTime param, stackTime set automaticaly = " + this.stackTime);
			}
		}

		if(this.stackTime > 0) {
			if(this.stack == 0) {
				LOGW.p("Skill " + this.name() + " if you use stackTime param, you need stack param too, param not active!");
				this.stackTime = 0;
			} else {
				if(this.ammo > 0) { //ID of item
					this._currentStack = 0;
					this._stackNeedReload = true;
				} else {
					this._currentStack = this.stack;
					this._stackNeedReload = false;
				}
			}
		}

		if(this.startSound) {
			this.startSound = {name:this.startSound,pan:0,pitch:100,volume:100};
		}

		if(this.reloadSound) { //Not used yet
			this.reloadSound = {name:this.reloadSound,pan:0,pitch:100,volume:100};
		}

		if(this.reloadParam != null) {
			//If i can use 'with' keyword in strict mode, this is not happened :(
			if(!this.reloadParam.contains('this')) {
				if(this.reloadParam.trim() == 'attackSpeed') { //for performance
					this.reloadParam = this.reloadParam.replace(/attackSpeed/i, 'this.attackSpeed()');
				} else {
					this.reloadParam = this.reloadParam.replace(/attackSpeed/i, 'this.attackSpeed()');
					this.reloadParam = this.reloadParam.replace(/hp/i, 'this.hp');
					this.reloadParam = this.reloadParam.replace(/mp/i, 'this.mp');
					this.reloadParam = this.reloadParam.replace(/tp/i, 'this.tp');
					this.reloadParam = this.reloadParam.replace(/mhp/i, 'this.mhp');
					this.reloadParam = this.reloadParam.replace(/mmp/i, 'this.mmp');
					this.reloadParam = this.reloadParam.replace(/atk/i, 'this.atk');
					this.reloadParam = this.reloadParam.replace(/def/i, 'this.def');
					this.reloadParam = this.reloadParam.replace(/mat/i, 'this.mat');
					this.reloadParam = this.reloadParam.replace(/mdf/i, 'this.mdf');
					this.reloadParam = this.reloadParam.replace(/agi/i, 'this.agi');
					this.reloadParam = this.reloadParam.replace(/luk/i, 'this.luk');
				}
			}
		}

		this.reloadTimeA = this.reloadTime;
	}

	Game_SkillABS.prototype.hasParticle = function() {
		return (this.isVectorType() && this.pType != null);
	}

	Game_SkillABS.prototype.hasLight = function() {
		return (this.isVectorType() && this.light != null);
	}

	Game_SkillABS.prototype.initGenerator = function() {
		if(this.isVectorType()) {
			var particleData = Consts.GetDataObject('particle',this.pType);
			if(particleData === null) return null;

			this.particleData = {};
			for(var p in particleData) { //Clone
				this.particleData[p] = particleData[p];
			}
			if(this._particleParamsUser) {
				for(var p in this._particleParamsUser) {
					this.particleData[p] = this._particleParamsUser[p];
				}
			}

			var particleData2 = Consts.GetDataObject('particle',this.pType);

			var generator = function(particleData) {
				var size = SDK.rand(particleData.pMinSize,particleData.pMaxSize);
		        var color = Color.NONE;
		        var image = undefined;
		        if(particleData.pData.indexOf('#') == 0) {
		        	color = Color.FromHex(particleData.pData);
		        } else
		        	image = particleData.pData;

		        return ABSPE.initParticle(
		            this.x, //x (emitter x)
		            this.y, //y (emitter y)
		            size, //width
		            size, //height
		            0, //rotation
		            SDK.smartRand(particleData.pPower, particleData.pPower / 2, true), //xVelocity
		            SDK.smartRand(particleData.pPower, particleData.pPower / 2, true), //yVelocity
		            particleData.pLife, //life
		            -1, //size change (0 - noChange, 1 - larger with age, -1 - smaller with age)
		            color, //color
		            image, //imageName
		            particleData.pAlpha //startOpacity
		        );
			}
			return generator;
		} else
			return null;
	}

	SDK.setConstant(Game_SkillABS, 'TEMPLATES', //DON'T CHANGE THIS (will crush all)
		[
			{range: 0, needTarget: true, castTime: 0, reloadTime: 0, reloadParam : null, directionFix: 0}, //0 - Instante (attack)
			{range: 6, needTarget: true, castTime: 120, reloadTime: 0, reloadParam : null, pType : null, img : 'null', light: null, lightSize: 100, directionFix: 0}, //1 - Vector
			{range: 6, needTarget: true, radius: 3, castTime: 0, reloadTime: 120, reloadParam: null, directionFix: 0}, //2 - Radius
			{castTime: 0, needTarget: false, reloadTime: 120, reloadParam: null, directionFix: 0}  //3 - Zone
		]
	);

	SDK.setConstant(Game_SkillABS, 'PARAMS', ['reloadParam','pType', 'img','light','startSound','reloadSound', 'vSpeed', 'range','reloadTime','castTime', 'needTarget', 'radius', 'castAnim', 'lightSize','stack','stackTime','directionFix','ammo','cEonUse','cEonStart','noDescription']);
	SDK.setConstant(Game_SkillABS, 'PARAMS2', ['pData','pMinSize','pMaxSize','pPower','pLife', 'pAlpha','pCount']); //PARTICLES params

	//END Game_SkillABS
//------------------------------------------------------------------------------

//Game_SkillManagerABS
//------------------------------------------------------------------------------

	Game_SkillManagerABS.prototype.initialize = function() {
		this._skillsABS = [];
		this._requestRefresh();
	}

	Game_SkillManagerABS.prototype.all = function() {
		return this._skillsABS;
	}

	Game_SkillManagerABS.prototype.remove = function(objId, isItem) {
		for(var i = 0; i<this._skillsABS.length; i++) {
			var item = this._skillsABS[i];
			if(isItem) {
				if(item.skillId == objId && item.isItem()) {
					this._skillsABS.splice(i,1);
					this._requestRefresh();
					break;
				}
			} else {
				if(item.skillId == objId && !item.isItem()) {
					this._skillsABS.splice(i,1);
					this._requestRefresh();
					break;
				}
			}
		}
	}

	Game_SkillManagerABS.prototype.push = function(objId, isItem) {
		var item = new Game_SkillABS(objId, isItem);
		this._skillsABS.push(item);
		this._requestRefresh();
	}

	Game_SkillManagerABS.prototype.update = function() {
		this._skillsABS.forEach(function(item) {item.update()});
	}

	Game_SkillManagerABS.prototype.skills = function() {
		if(this._needRefreshSkills) {
			this._skills = [];
			for(var i=0; i<this._skillsABS.length; i++) {
				var item = this._skillsABS[i];
				if(!item.isItem()) {
					this._skills.push(item);
				}
			}
			this._needRefreshSkills = false;
		}
		return this._skills;
	}

	Game_SkillManagerABS.prototype.items = function() {
		if(this._needRefreshItems) {
			this._items = [];
			for(var i=0; i<this._skillsABS.length; i++) {
				var item = this._skillsABS[i];
				if(item.isItem()) {
					this._items.push(item);
				}
			}
			this._needRefreshItems = false;
		}
		return this._items;
	}

	Game_SkillManagerABS.prototype.skillById = function(id) {
		for(var i=0; i<this._skillsABS.length; i++) {
			var item = this._skillsABS[i];
			if(item.skillId == id && !item.isItem()) {
				return item;
			}
		}
		return null;
	}

	Game_SkillManagerABS.prototype.itemById = function(id) {
		for(var i=0; i<this._skillsABS.length; i++) {
			var item = this._skillsABS[i];
			if(item.skillId == id && item.isItem()) {
				return item;
			}
		}
		return null;
	}

	//PRIVATE

	Game_SkillManagerABS.prototype._requestRefresh = function() {
		this._needRefreshSkills = true;
		this._needRefreshItems = true;
	}

	//END Game_SkillManagerABS
//------------------------------------------------------------------------------

//Game_SVector
//------------------------------------------------------------------------------
	class Game_SVector {
		constructor(data) {
			this._data = data;
			this._disposed = false;
			this._started = false;
			this._setImage(data.skill.img);
			this._emit = null;
			if(data.skill.vSpeed > 0) {
				this._speed = data.skill.vSpeed / 32;
			} else
				this._speed = Game_SVector.SPEED;
		}

		update() {
			if(!this.sprite) return;
			if(!this._started) return;

			var ep = this._endPoint();
			if(!this._myPoint) {
				LOG.p("SVector : Point MISS : Target Reached!");
				this.dispose();
				return;
			}

			if(BattleManagerABS.isABSLightingExt()) {
				$gameMap.deleteLight(this._myPoint.x, this._myPoint.y);
			}

			this._myPoint = ABSUtils.SMath.moveTo(this._myPoint, ep, this._speed);

			if(BattleManagerABS.isABSLightingExt()) {
				$gameMap.setLight(this._myPoint.x, this._myPoint.y, this._data.skill.lightSize, this._data.skill.light, 0, true);
			}

			this.sprite.x = this._myPoint.screenX();
			this.sprite.y = this._myPoint.screenY();

			//Emitter move
			if(this._emit) {
				this._emit.move(this.sprite.x,this.sprite.y);
			}

			//Rotation
			var angle = Math.atan2(ep.screenY() - this.sprite.y, ep.screenX() - this.sprite.x);
			this.sprite.rotation = angle;

			//Target
			//LOG.p("SVector : POINT " + this._myPoint.toString());
			//var t = this._myPoint.clone().applyFloor();
			//var t2 = this._myPoint.clone().applyRound();

			var t = new Rectangle(ep.x - 0.5, ep.y - 0.5, 1.5, 1.5);
			if(ABSUtils.SMath.inRect(this._myPoint, t)) {
				LOG.p("SVector : Target Reached!");
				this.dispose();
			}

			/*if (ABSUtils.inPoint(t, ep) || ABSUtils.inPoint(t2, ep)) {
				LOG.p("SVector : Target Reached!");
				this.dispose();
			}*/
		}

		start() {
			if(ABSUtils.inFront(this._data.subject, this._data.target)){
				this._started = true;
				this._disposed = true;
				LOG.p("SVector : Target in Front!");
				return;
			}
			this._myPoint = this._startPoint();
			this._started = true;
			LOG.p("SVector : Start at " + this._myPoint.toString());
			LOG.p("SVector : To " + this._endPoint().toString());

			if(BattleManagerABS.isABSParticleSystem() && this.data().skill.hasParticle()) {
				var generator = this.data().skill.initGenerator();
				if(generator != null) {
					this._emit = ABSPE.initEmitter(this.sprite.x,this.sprite.y,this.data().skill.pCount,generator);
					this._emit.setOuterData(this.data().skill.particleData);
				} else {
					LOGW.p(this._data.skill.name() + " particle data is missing, check ABSDataUser.json");
				}
			}
		}

		hasEmitter() {
			return (this._emit != null);
		}

		emitter() {
			return this._emit;
		}

		data() {
			return this._data;
		}

		isStarted() {
			return (this._started == true);
		}

		isAlive() {
			return (this._disposed == false);
		}

		dispose() {
			LOG.p("SVector : Disposed ");
			var t = this.sprite.parent;
			if(t) {
				t.removeChild(this.sprite);
			}
			if(this._emit) {
				this._emit.stop();
				this._emit.clear();
			}

			if(BattleManagerABS.isABSLightingExt() && this._myPoint) {
				$gameMap.deleteLight(this._myPoint.x, this._myPoint.y);
			}

			this.sprite = null;
			this._disposed = true;
		}

		//PRIVATE
		_startPoint() {
			return this._data.subject.toPoint();
		}

		_endPoint() {
			return this._data.target.toPoint();
		}

		_setImage(name) {
			if(name) {
				if(name == 'null')
					this.sprite = new Sprite(ImageManager.loadPictureABS('vector'));
				else
					this.sprite = new Sprite(ImageManager.loadPicture(name));
			}
			else {
				this.sprite = new Sprite(new Bitmap(76,38));
			}
			this.sprite.anchor.x = 0.5;
			this.sprite.anchor.y = 0.5;
		}
	}


	SDK.setConstant(Game_SVector, 'SPEED', 0.15);
	//END Game_SVector
//------------------------------------------------------------------------------

AlphaABS.register(Game_SVector);

//Game_AIBehavior
//------------------------------------------------------------------------------
	class Game_AIBehavior {
		constructor(ai) {
			this.id = 0;
			var t =  $dataEnemies[ai._absParams.enemyId];
			if(t.meta.ABS) {
				var t2 = parseInt(t.meta.ABS);
				if(t2 > 0)
					this.id = t2;
			}
			this._loadParamsBase();
			this._readEnemyData(ai._absParams.enemyId);
			this._readEventData(ai);
			this._checkParams();
		}

		//PRIVATE

		_readEnemyData(enemyId) {
			var t =  $dataEnemies[enemyId];
			Game_AIBehavior.PARAMS.forEach(function(p){
				if(t.meta[p]) {
					this[p] = parseInt(t.meta[p]);
					LOG.p("AI override Enemy param : " + p + " new value " + this[p]);
				}
			}.bind(this));
		}

		_readEventData(gameEvent) {
			var t = gameEvent.page().list;
		    for (var i =0; i < t.length; i++) {
	         	var item = t[i];
	         	if (item.code == 108) {
	              	var comment = item.parameters[0];
	              	Game_AIBehavior.PARAMS.forEach(function(p){
	              		if(comment.indexOf("<"+p) >= 0) {
	              			var t2 = new RegExp("<"+p+"\\s?:\\s?(.+?)>", "i");
	              			var match = t2.exec(comment);
	              			if(match) {
	              				this[p] = parseInt(match[1]);
	              				LOG.p("AI override Event param : " + p + " new value " + this[p]);
	              			}
	              		}

	              	}.bind(this));
	         	}
	     	}
		}

		_loadParamsBase() {
			if(this.id >= Game_AIBehavior.TEMPLATES.length) {
				this.id = 0;
			}
			var template = Game_AIBehavior.TEMPLATES[this.id];
			Game_AIBehavior.PARAMS.forEach(function(p){
				if(template[p])
					this[p] = template[p];
				else
					this[p] = 0;
			}.bind(this));
		}

		_checkParams() {
			if(this.slow == 1)
				this.slow = true;
		}
	}

	AlphaABS.register(Game_AIBehavior);

	SDK.setConstant(Game_AIBehavior, 'TEMPLATES', //YOU CAN ADD YOU OWN TEMPLATE, but DON'T MODIFY EXIST ZERO TEMPLATE!!!
		[
			{ //Zero template
				viewRadius: 5, //Насколько клеток игровой карты видит АИ
				returnRadius : 12, //На сколько клеток может макисимум убежать от последней позиции, где сражался
				escapeOnBattle: false, //Будет ли убегать во время битвы когда нет доступных действий
				canSearch: true, //Слышит ли что происходит вокруг (реакция на битву рядом (в зоне viewRadius))
				noFight: false, //Не будет сражаться вообще
				reviveTime: 0, //Через сколько возродится (секунды)
				regen: true, //Регенерация
				slow: false,  //Медленный в бою
				agressive: true, //Агрессивный (всегда догоняет)
				noMove: false, //Не может двигаться в бою
				noEmote: false, //Не показывает эмоции
				cEonStart: 0, //Common Event ID when start battle (see player)
				cEonEnd: 0, //Common Event ID when stop battle (after start)
				cEonDeath: 0, //Common Event ID when Death
				returnType: 0 //Тип возвращения (0 - быстрый, 1 - обычный, 2 - стоит на месте)
			} //END Zero template
		]
	);

	SDK.setConstant(Game_AIBehavior, 'PARAMS', ['viewRadius', 'returnRadius', 'escapeOnBattle',
		'canSearch', 'noFight','reviveTime','regen','slow','agressive',
		'noMove','noEmote','cEonStart','cEonDeath','cEonEnd', 'returnType']);

	//END Game_AIBehavior
//------------------------------------------------------------------------------

//Game_TimerABS
//------------------------------------------------------------------------------
	Game_TimerABS.prototype.initialize = function() {
		this._paused = false;
		this._mValue = 0;
		this._value = 0;
		this._delta = 0;
		this._lastTick = Date.now();
 	}

	Game_TimerABS.prototype.getMaxValue = function()
	{
		return this._mValue;
	}

	Game_TimerABS.prototype.getValue = function()
	{
		return this._value;
	}

	Game_TimerABS.prototype.setMaxTime = function(frameCount)
	{
		frameCount = Math.abs(Math.round(frameCount));
		this._mValue = frameCount;
		if(this._value > this._mValue)
			this._value = this._mValue;
	}

	Game_TimerABS.prototype.reset = function()
	{
		this._value = 0;
	}

	Game_TimerABS.prototype.isReady = function()
	{
		return (this._value >= this._mValue);
	}

	Game_TimerABS.prototype.start = function(frameCount)
	{
		this._value = 0;
		this._mValue = Math.abs(Math.round(frameCount));
		this._paused = false;
	}

	Game_TimerABS.prototype.stop = function()
	{
		this.start(0);
	}

	Game_TimerABS.prototype.pause = function()
	{
		if(this._paused)
			return;
		if(this._mValue == 0)
			return;
		this._paused = true;
	}

	Game_TimerABS.prototype.resume = function()
	{
		this._paused = false;
	}

	Game_TimerABS.prototype.update = function()
	{
		this.updateDelta();
		if(!this.isReady())
		{
			if(!this._paused)
			{
				if(this._value < this._mValue)
					this._value += (AlphaABS.SYSTEM.FRAMES_PER_SECOND * this._delta);
			}
		}
	}

	Game_TimerABS.prototype.updateDelta = function() {
			var now = Date.now();
			this._delta = (now - this._lastTick)/1000.0;
			this._lastTick = now;
	};
	//END Game_TimerABS
//------------------------------------------------------------------------------


//Game_EnemyABS
//------------------------------------------------------------------------------
	Game_EnemyABS.prototype = Object.create(Game_Enemy.prototype);
	Game_EnemyABS.prototype.constructor = Game_EnemyABS;

	//OVER
	Game_EnemyABS.prototype.initialize = function(enemyId) {
	    Game_Enemy.prototype.initialize.call(this, enemyId, 0, 0);
	};

	//OVER
	Game_EnemyABS.prototype.initMembers = function() {
		Game_Enemy.prototype.initMembers.call(this);
		this._absParams.myTurnCount = 0; //Количество секунд, проведённых в сессии боя
	}

	//NEW
	Game_EnemyABS.prototype.regenerateAllonFree = function() {
		if(this.isAlive()) {
			var value = Math.floor(this.mhp * 0.05);
			value = Math.max(value, -this.maxSlipDamage());
		    if (value !== 0) {
		        this.gainHp(value);
		    }
		    value =  Math.floor(this.mmp * 0.05);
		    if (value !== 0) {
		        this.gainMp(value);
		    }
		}
	}

	//OVER
	Game_EnemyABS.prototype.isActionValid = function(action) {
		var t = this.skillABS_byId(action.skillId);
		return Game_Enemy.prototype.isActionValid.call(this, action) && t.isReady();
	};

	//OVER
	Game_EnemyABS.prototype.meetsTurnCondition = function(param1, param2) {
		var n = this._absParams.myTurnCount;
	    if (param2 === 0) {
	        return n === param1;
	    } else {
	        return n > 0 && n >= param1 && n % param2 === param1 % param2;
	    }
	};

	Game_EnemyABS.prototype.clearStates = function() {
	    Game_Enemy.prototype.clearStates.call(this);
	    this._stateSteps = {};
	};

	Game_EnemyABS.prototype.eraseState = function(stateId) {
	    Game_Enemy.prototype.eraseState.call(this, stateId);
	    delete this._stateSteps[stateId];
	};

	Game_EnemyABS.prototype.resetStateCounts = function(stateId) {
	    Game_Enemy.prototype.resetStateCounts.call(this, stateId);
	    this._stateSteps[stateId] = $dataStates[stateId].stepsToRemove;
	};

	Game_EnemyABS.prototype.initABS = function() {
		Game_Enemy.prototype.initABS.call(this);
		if(this._absParams.battleSkillsABS.all().length == 0)
			this._createBattleSkills();
	}

	//NEW (вынести на бота)
	Game_EnemyABS.prototype.onWalk = function() {
		this.clearResult();
		this.states().forEach(function(state) {
	            this.updateStateSteps(state);
	    }, this);
	}

	//NEW
	Game_EnemyABS.prototype.executeFloorDamage = function() {
	    var damage = Math.floor(this.basicFloorDamage() * this.fdr);
	    damage = Math.min(damage, this.maxFloorDamage());
	    this.gainHp(-damage);
	    if (damage > 0) {
	        this.startDamagePopup();
	    }
	};

	//NEW
	Game_EnemyABS.prototype.updateStateSteps = function(state) {
	    if (state.removeByWalking) {
	        if (this._stateSteps[state.id] > 0) {
	            if (--this._stateSteps[state.id] === 0) {
	                this.removeState(state.id);
	            }
	        }
	    }
	};

	//NEW
	Game_EnemyABS.prototype.onTurnEnd = function() {
		Game_Enemy.prototype.onTurnEnd.call(this);
		this._absParams.myTurnCount += 1;
	}

	//NEW
	Game_EnemyABS.prototype.attackAnimationId1 = function() {
	    return 6;
	};

	Game_EnemyABS.prototype.onBattleEnd = function() {
		Game_Enemy.prototype.onBattleEnd.call(this);
		this._absParams.myTurnCount = 0;
		this.removeBattleStates();
	    this.removeAllBuffs();
		this.recoverAll();
	}

	//PRIVATE
	Game_EnemyABS.prototype._initBattleSkills = function() {
		Game_Enemy.prototype._initBattleSkills.call(this);
	}

	Game_EnemyABS.prototype._createBattleSkills = function() {
		$dataEnemies[this._enemyId].actions.forEach(function(t) {
			var skill = $dataSkills[t.skillId];
			if(skill.meta.ABS && skill.meta.ABS <= 2) //Can't use radius and zones skills
				this._absParams.battleSkillsABS.push(t.skillId, false);
		}.bind(this));
	}
	//END Game_EnemyABS
//------------------------------------------------------------------------------

//Sprite_CharacterABS
//------------------------------------------------------------------------------
	function Sprite_CharacterABS() {
    	this.initialize.apply(this, arguments);
	}

	Sprite_CharacterABS.prototype = Object.create(Sprite_Character.prototype);
	Sprite_CharacterABS.prototype.constructor = Sprite_CharacterABS;

	Sprite_CharacterABS.MOTIONS = {
	    none:     { index: 0,  loop: true  },
	    sleep:    { index: 17, loop: true  }
	};

	Sprite_CharacterABS.prototype.initialize = function(character, type) {
	    Sprite_Character.prototype.initialize.call(this, character);
	    this._absParams = {};
	    this._absParams.type = type;
	    this._absParams.damages = [];
	};

	Sprite_CharacterABS.prototype.isPlayer = function() {
		return this._absParams.type == 1;
	}



	Sprite_CharacterABS.prototype.ABSParams = function() {
		return this._absParams;
	}

	Sprite_CharacterABS.prototype.update = function() {
		Sprite_Character.prototype.update.call(this);
		this._updateABS();
	}

	Sprite_CharacterABS.prototype.toPoint = function() {
		return new Point(this.x, this.y);
	}

	Sprite_CharacterABS.prototype.isTouched = function() {
		return ABSUtils.SMath.inRect(new Point(TouchInput.x, TouchInput.y), this._getRectangle());
	}

	Sprite_CharacterABS.prototype.character = function() {
		return this._character;
	}

	Sprite_CharacterABS.prototype.initABS = function() {
		this._isABS = true;

		this._stateIconSprite = new Sprite_StateIcon();
    	this.addChild(this._stateIconSprite);
    	this._stateIconSprite.setup(this._character.battler());
    	this._stateIconSprite.scale.x = 0.7;
    	this._stateIconSprite.scale.y = 0.7;

    	this._animationCast = null;
    	this._animationCastAudio = null;

    	this._stateSpriteOverlay = new Sprite_StateOverlay();
    	this._stateSpriteOverlay.setup(this._character.battler());
    	this.addChild(this._stateSpriteOverlay);
    	this._stateSpriteOverlay.scale.x = 0.7;
    	this._stateSpriteOverlay.scale.y = 0.7;

		if(!this.isPlayer()) {
			this._effectType = null;
	    	this._effectDuration = 0;
	    	this._shake = 0;
    	} else {
    		this._stateIconSprite.setPriority(90);
    	}
	}

	//PRIVATE
	Sprite_CharacterABS.prototype._updateABS = function() {
		if(!this._isABS) return;

		if(!this.isPlayer()) {
			this._setupSelection();
		} else {
			this._setupWeaponAnimation();
			this._setupMotion();
			this._updateMotion();
		}

		this._updateStateSprite();
		this._setupAnimationABS();
		this._updateDamagePopup();
		this._setupAnimationCastABS();
		this._setupPopUp();
	}

	Sprite_CharacterABS.prototype._updateEffect = function() {
		var t = this._character.battler();

		if(t.isEffectRequested()) { //setupEffect
			this._startEffect(t.effectType());
			t.clearEffect();
		}

		if (this._effectDuration > 0) {
	        this._effectDuration--;
	        switch (this._effectType) {
	        case 'whiten':
	            var alpha = 128 - (16 - this._effectDuration) * 10;
   				this.setBlendColor([255, 255, 255, alpha]);
	            break;
	        case 'blink':
	            this.opacity = (this._effectDuration % 10 < 5) ? 255 : 0;
	            break;
	        case 'collapse':
	        	 this.blendMode = Graphics.BLEND_ADD;
				 this.setBlendColor([255, 128, 128, 128]);
				 this.opacity *= this._effectDuration / (this._effectDuration + 1);
	        	break;
	        }
	        if (this._effectDuration === 0) {
	            this._effectType = null;
	        }
		 }
	}

	Sprite_CharacterABS.prototype._startEffect = function(effectType) {
		this._effectType = effectType;
		switch (this._effectType) {
			case 'whiten':
		     	this._effectDuration = 16;
		    break;
		    case 'blink':
		        this._effectDuration = 20;
		    break;
		    case 'collapse':
        		this._effectDuration = 32;
        	break;
		}

		this._shake = 0;
	    this.blendMode = 0;
	    this.opacity = 255;
	    this.setBlendColor([0, 0, 0, 0]);
	}

	Sprite_CharacterABS.prototype._updateStateSprite = function() {
		this._stateIconSprite.y = -Math.round((this.patternHeight() + 40) * 0.9);
	    if (this._stateIconSprite.y < 20 - this.y) {
	        this._stateIconSprite.y = 20 - this.y;
	    }

	    this._stateIconSprite.visible = this._character.inActive();
	}

	Sprite_CharacterABS.prototype._updateDamagePopup = function() {
	    this._setupDamagePopup();
	    var t = this._absParams.damages;
	    if (t.length > 0) {
	        for (var i = 0; i < t.length; i++) {
	            t[i].update();
	        }
	        if (!t[0].isPlaying()) {
	            this.parent.removeChild(t[0]);
	            t.shift();
	        }
	    }
	};

	Sprite_CharacterABS.prototype._setupSelection = function() {
		if(!this._absParams.spriteSelect) {
			this._absParams.spriteSelect = new Sprite(ImageManager.loadPictureABS('Target'));
			var t = this._absParams.spriteSelect;
			t.visible = false;
			t.anchor.x = 0.5;
			t.anchor.y = 0.5;
			t.setBlendColor(Color.RED.ARR);
			t.opacity = 200;
			t.z = 0;
			this.parent.addChild(t);
		}

		this._absParams.spriteSelect.visible = this._character.ABSParams().selected;
		this._absParams.spriteSelect.x = this.x;
		this._absParams.spriteSelect.y = this.y;
	}

	Sprite_CharacterABS.prototype._setupDebugInfo = function() {
		if(!this._absParams.spriteDebug1) {
			var t = this._character.ABSParams();

			var bitmap = new Bitmap(t.viewRadius*64,t.viewRadius*64);
			bitmap.drawCircle(bitmap.width/2, bitmap.height/2, bitmap.width/2, Color.BLUE.CSS);

			this._absParams.spriteDebug1 = new Sprite(bitmap);
			this._absParams.spriteDebug1.z = 0;
			this._absParams.spriteDebug1.opacity = 64;
			this._absParams.spriteDebug1.anchor.x = 0.5;
			this._absParams.spriteDebug1.anchor.y = 0.5;
			this.parent.addChild(this._absParams.spriteDebug1);

			bitmap = new Bitmap(t.returnRadius*64,t.returnRadius*64);
			bitmap.drawCircle(bitmap.width/2, bitmap.height/2, bitmap.width/2, Color.RED.CSS);

			this._absParams.spriteDebug2 = new Sprite(bitmap);
			this._absParams.spriteDebug2.z = 0;
			this._absParams.spriteDebug2.opacity = 120;
			this._absParams.spriteDebug2.anchor.x = 0.5;
			this._absParams.spriteDebug2.anchor.y = 0.5;
			this.parent.addChild(this._absParams.spriteDebug2);
		}

		this._absParams.spriteDebug1.visible = this._character.ABSParams().selected;
		this._absParams.spriteDebug2.visible = this._absParams.spriteDebug1.visible;

		this._absParams.spriteDebug1.x = this.x;
		this._absParams.spriteDebug1.y = this.y;

		var t = this._character.ABSParams();
		if(t.myHomePosition) {
			this._absParams.spriteDebug2.x = t.myHomePosition.screenX();
			this._absParams.spriteDebug2.y = t.myHomePosition.screenY();
		} else {
			this._absParams.spriteDebug2.x = this.x;
			this._absParams.spriteDebug2.y = this.y;
		}
	}

	Sprite_CharacterABS.prototype._setupMotion = function() {
		if(this._character.isMotionRequested()) {
			if(!this._motionSprite) {
				this._motionSprite = new Sprite();
				this._motionSprite.anchor.x = 0.5;
    			this._motionSprite.anchor.y = 1;
    			this._motionSprite.bitmap = ImageManager.loadSvActor(this._character.battler().battlerName());
    			this._motionSprite.visible = false;
    			this._motionSprite.scale.x = 0.8;
    			this._motionSprite.scale.y = 0.8;

    			this.parent.addChild(this._motionSprite);
			}
			this.startMotion(this._character.motionType());
			this._character.clearMotion();
		}
	}

	Sprite_CharacterABS.prototype.startMotion = function(motionType) {
	    var newMotion = Sprite_CharacterABS.MOTIONS[motionType];
	    if(newMotion.index == 0) {
	    	this._motion = null;
	    	this._motionSprite.visible = false;
	    	this._character.setTransparent(false);
	    	return;
	    }

	    if (this._motion !== newMotion) {
	        this._motion = newMotion;
	        this._motionCount = 0;
	        this._pattern = 0;
	        this._motionSprite.x = this.x;
	        this._motionSprite.y = this.y;
	        this._character.setTransparent(true);
	        this._motionSprite.visible = true;
	    }
	};

	Sprite_CharacterABS.prototype._updateMotion = function() {
		if(this._motion) {
			var bitmap = this._motionSprite.bitmap;
			var motionIndex = this._motion ? this._motion.index : 0;
	        var pattern = this._pattern < 3 ? this._pattern : 1;
	        var cw = bitmap.width / 9;
	        var ch = bitmap.height / 6;
	        var cx = Math.floor(motionIndex / 6) * 3 + pattern;
	        var cy = motionIndex % 6;
	        this._motionSprite.setFrame(cx * cw, cy * ch, cw, ch);
		}
	};


	//TODO Объекты POPUP и машины устарели!!!
	Sprite_CharacterABS.prototype._setupPopUpExp = function() {
		if(!this._absParams.popUpMachineExp) {
			this._absParams.popUpMachineExp = new ABS.ABSObject_PopUpMachine(0,0, this.patternWidth(), 4, this.parent);
			this._absParams.popUpMachineExp.setUpMode();
		}

		this._absParams.popUpMachineExp.update();

		if(this._character.isExpPopupRequested()) {
			var t = this._character.getExpPopup();
			this._absParams.popUpMachineExp.push(ABS.PopInfoManagerABS.EXP(t));
			let point = this._getCornerPoint();
			this._absParams.popUpMachineExp.move(point.x,point.y - 32);
			this._character.clearExpPopup();
		}
	}

	Sprite_CharacterABS.prototype._setupPopUp = function() {
		let items = this._character.battler().getInfoPops();
		if(items.length != 0) {
			for(let j = 0; j<items.length; j++)
			{
				let item = items[j];
				this._pushPopOnUI(item);
			}
		}
		this._character.battler().clearInfoPops();
	}

	Sprite_CharacterABS.prototype._pushPopOnUI = function(item) {
		var t = BattleManagerABS.UI();
		if(this.isPlayer()) {
			t.addPopUpUser(item);
		} else {
			t.addPopUpTarget(this.character(), item);
		}
	}

	Sprite_CharacterABS.prototype._setupAnimationABS = function() {
		if(this._character.ABSParams().animationABS > 0) {
			var anim = $dataAnimations[this._character.ABSParams().animationABS];
			this._character.ABSParams().animationABS = 0;
			this._startAnimationABS(anim, false, 0);
		}
	}

	Sprite_CharacterABS.prototype._setupAnimationCastABS = function() {
		if(this._character.ABSParams().casting == true) {
			if(!this._animationCast) {
				 this._createAnimataionCast();
			} else {
				if(!this._animationCast.isPlaying()) {
					this._animationCast.remove();
					this._createAnimataionCast();
				}
			}

		} else {
			if(this._animationCast) {
				this._animationCast.remove();
				this._animationCast = null;
				if(this._animationCastAudio) {
					this._animationCastAudio.stop();
					this._animationCastAudio = null;
				}
			}
		}
	}

	Sprite_CharacterABS.prototype._createAnimataionCast = function() {
		this._animationCast = new Sprite_Animation();

		var anim = null;
		var own = false;

		if(this._character.ABSParams().currentAction.castAnim > 0) {
			anim = $dataAnimations[this._character.ABSParams().currentAction.castAnim];
			own = true;
		} else {
			if(Consts.PARAMS.CAST_ANIMATION_ID > 0) {
				anim = $dataAnimations[Consts.PARAMS.CAST_ANIMATION_ID];
			} else
				anim = Consts.GetDataObject('anim','cast');
		}

		this._animationCast.setup(this._effectTarget, anim, false, 0);
		this._animationCast.setABSMode();
		this.parent.addChild(this._animationCast);
		if(!this._animationCastAudio) {
			var se = Consts.PARAMS.CAST_SE;
			if(se != null && own == false) {
				var point = this._character.toPoint();
				this._animationCastAudio = AudioManager.playSeLoopAt(se,point.mapPointOnScreen());
			}
		}
	}

	Sprite_CharacterABS.prototype._setupDamagePopup = function() {
		var t = this._character.battler();
	    if (t && t.isDamagePopupRequested()) {
	    	//if(t.isAlive()) {
		        var sprite = new Sprite_Damage();
		        sprite.x = this.x;
		        sprite.y = this.y - this.patternHeight() - 10;
		        sprite.setup(t);
		        sprite.scale.x = 0.6;
		        sprite.scale.y = 0.6;
		        this._absParams.damages.push(sprite);
		        this.parent.addChild(sprite);
		    //}
	        t.clearDamagePopup();
	        t.clearResult();
	    }
	};

	Sprite_CharacterABS.prototype._setupWeaponAnimation = function() {
		if(!this._absParams.spriteWeapon) {
			this._absParams.spriteWeapon = new Sprite_Weapon();
			this.addChild(this._absParams.spriteWeapon);
		}

		var t = this.character().battler();
		if(t && t.isWeaponAnimationRequested()) {
			this._absParams.spriteWeapon.setup(t.weaponImageId());
			this._absParams.spriteWeapon.setDirectionABS(ABSUtils.getDirKey(this.character()));
			t.clearWeaponAnimation();
		}
	}

	Sprite_CharacterABS.prototype._startAnimationABS = function(animation, mirror, delay) {
		var sprite = new Sprite_Animation();
	    sprite.setup(this._effectTarget, animation, mirror, delay);
	    sprite.setABSMode();
	    this.parent.addChild(sprite);
	    this._animationSprites.push(sprite);
	}

	Sprite_CharacterABS.prototype._getCornerPoint = function() { //Левый верхний угол спрайта
		var p1 = this.x - (this.patternWidth()/2);
		var p2 = this.y - this.patternHeight();
		return new Point(p1,p2);
	}

	Sprite_CharacterABS.prototype._getRectangle = function() { //Прямоугольник, содержащий спрайт
		var p = this._getCornerPoint();
		return new Rectangle(p.x,p.y,this.patternWidth(),this.patternHeight());
	}

	Sprite_CharacterABS.prototype._getCenterPoint = function() { //Центральная точка
		return new Point(this.x, this.y - this.patternHeight()/2);
	}

	//END Sprite_CharacterABS
//------------------------------------------------------------------------------

//==========================================================================================================================================================
//MV GAME OBJECTS
//==========================================================================================================================================================

//Game_Map
//------------------------------------------------------------------------------
	var _Game_Map_setupEvents = Game_Map.prototype.setupEvents;
	Game_Map.prototype.setupEvents = function() {
		_Game_Map_setupEvents.call(this);
		this._isABSMap = false;
		if(!$dataMap.meta) return;
		if($dataMap.meta.ABS) {
			this._absParams = {};

			this._isABSMap = true;
			this._absParams.sVectors = [];
			this._absParams.animationABS = null;
			this._absParams.targetCircle = null;
			this._absParams.targetCircleNeedLock = false;
			this._absParams.needCast = null;
			this._absParams.menuClickCount = 1;

			this.setupEventsABS();
			//$gamePlayer.hideFollowers();
		}
	}

	//NEW
	Game_Map.prototype.ABSParams = function() {
		return this._absParams;
	}

	//NEW
	Game_Map.prototype.isABS = function() {
		return this._isABSMap;
	}

	//NEW
	Game_Map.prototype.stopABS = function() {
		this._isABSMap = false;
	}

	//NEW
	Game_Map.prototype.characterABS = function(battler) {
		//TODO Возвращает Game_AIBot по battler
	}

	//NEW
	Game_Map.prototype.addSVector = function(item) {
		this._absParams.sVectors.push(item);
	}

	//NEW
	Game_Map.prototype.requestCast = function(who) {
		LOG.p("Map : Cast requested");
		this._absParams.needCast = who;
	}

	//NEW
	Game_Map.prototype.requestAnimationABS = function(animationData) { //{sprite, id}
		LOG.p("Map : Animation requested");
		this._absParams.animationABS = animationData;
	}

	//NEW
	Game_Map.prototype.requestPlayerTargetCircle = function(skill) {
		LOG.p("Map : Target Circle requested");
		this._absParams.menuClickCount = 0;
		this._absParams.targetCircle = skill;
	}

	//NEW
	Game_Map.prototype.lockPlayerTargetCircle = function() {
		LOG.p("Map : Target Circle locked");
		this._absParams.targetCircleNeedLock = true;
	}

	//NEW
	Game_Map.prototype.stopPlayerTargetCircle = function() {
		LOG.p("Map : Target Circle stop!");
 		this._absParams.targetCircle = null;
		this._absParams.targetCircleNeedLock = false;
	}

	//NEW
	/*Game_Map.prototype.setupEventsABS = function() {
	    this._events = [];
	    for (var i = 0; i < $dataMap.events.length; i++) {
	        if ($dataMap.events[i]) {
	        	var ev = $dataMap.events[i];
	        	if(ev.meta.ABS) {
	        		var enemyId = parseInt(ev.meta.ABS);
	        		if(enemyId > 0) {
	        			this._events[i] = new Game_AIBot(this._mapId, i,  enemyId);
	        			continue;
	        		}
	        	}

	            this._events[i] = new Game_Event(this._mapId, i);
	        }
	    }
	    this._commonEvents = this.parallelCommonEvents().map(function(commonEvent) {
	        return new Game_CommonEvent(commonEvent.id);
	    });
	    this.refreshTileEvents();
	}*/

	//NEW
	Game_Map.prototype.setupEventsABS = function() {
		LOG.p("setupEventsABS");
		for (var i = 0; i < this._events.length; i++) {
			if(!this._events[i]) continue;
			var ev = this._events[i].event();
			if(ev.meta.ABS) {
				var enemyId = parseInt(ev.meta.ABS);
				if(enemyId > 0) {
	        		this._events[i] = new Game_AIBot(this._mapId, i,  enemyId);
	        	}
			}
		}
	}


//END Game_Map
//------------------------------------------------------------------------------

//Game_Character
//------------------------------------------------------------------------------
	var _Game_Character_initMembers = Game_Character.prototype.initMembers;
	Game_Character.prototype.initMembers = function() {
    	_Game_Character_initMembers.call(this);
    	this._absParams = {};
    	this._absParams.animationABS = 0;
    	this._absParams.useAStar = false;
    }

    //NEW
	Game_Character.prototype.ABSParams = function() {
		return this._absParams;
	}

	//NEW
	Game_Character.prototype.requestAnimationABS = function(animationId) {
		this._absParams.animationABS = animationId;
	}

	//NEW
	Game_Character.prototype.moveToPoint = function(point) {
        var dir = this.findDirectionTo(point.x,point.y);
        if(dir > 0) {
            this.moveStraight(dir);
        }
    }

    //NEW
    Game_Character.prototype.moveFromPoint = function(point) {
        var points = [];
        for (var j = 0; j < 4; j++) {
            var direction = 2 + j * 2;
            if(this.canPass(this.x,this.y, direction)) {
                var x2 = $gameMap.roundXWithDirection(this.x, direction);
                var y2 = $gameMap.roundYWithDirection(this.y, direction);
                //if(x2 != point.x && y2 != point.y)
                points.push([x2,y2]);
            }
        }

        if(points.length > 0) {
        	//LOG.p("POINTS " + points.length);
        	var p;
        	if(points.length > 1)
        		p = points.sample();
        	else
        		p = points[0];
            var point = {x:p[0], y:p[1]};
            this.moveToPoint(point);
        }
    }

    var _Game_Character_findDirectionTo = Game_Character.prototype.findDirectionTo;
    Game_Character.prototype.findDirectionTo = function(goalX, goalY) {
        if(this._absParams.useAStar == false) {
            return _Game_Character_findDirectionTo.call(this, goalX, goalY);
        }
        else {
            var t = ABSPathfinding.findPath(this, goalX, goalY);
            if(t == 0) t = _Game_Character_findDirectionTo.call(this, goalX, goalY);
            return t;
        }
    }

//END Game_Character
//------------------------------------------------------------------------------

//Game_Player
//------------------------------------------------------------------------------
	var _Game_Player_initMembers = Game_Player.prototype.initMembers;
	Game_Player.prototype.initMembers = function() {
	    _Game_Player_initMembers.call(this);

	    this._absParams.battler = null;
	    this._absParams.active = true; //Со мной можно взаимодействовать (я под управлением)
	    this._absParams.inBattle = false;
	    this._absParams.control = true; //Отвечат на управление
	    this._absParams.dead = false;

	    this._absParams.inputMode = 0; //0 - ControllPanel, 1 - Weapons

	    this._absParams.state = 'free'; //Состояние
	    this._absParams.target = null; //Моя цель
	    this._absParams.autoAttackMode = false; //Режим автоматической атаки
	    this._absParams.targetFollowMode = false; //Следовать к цели

	    this._absParams.currentAction = null;
	    this._absParams.expPopup = null;
	    this._absParams.motion = null;

	    this._absParams.isWeapRecharge = false;
	    this._absParams.casting = false;
	    this._absParams.castingSkill = null;

	    this._absParams.inBattleTimer = null;
	};

	//OVER
	Game_Player.prototype.executeMove = function(direction) {
		if(!this.inActive()) return;

		this.stopFollowMode();
		this.interruptCast();
		if(this._absParams.state != 'targetCircle') {
	    	this.moveStraight(direction);
	    }
	};

	//NEW
    Game_Player.prototype.changeInputMode = function(mode) {
        if(mode == 0){
            if(BattleManagerABS.UI().weapCircle().isOpen()) {
                BattleManagerABS.UI().weapCircle().close();
                this._absParams.inputMode = mode;
                 BattleManagerABS.UI().controlPanel().selectItemAt(4, false);
            }
        }
        else {
            if(!BattleManagerABS.UI().weapCircle().isOpen()) {
                BattleManagerABS.UI().weapCircle().open();
                this._absParams.inputMode = mode;
                BattleManagerABS.UI().controlPanel().selectItemAt(4, true);
            }
        }

    }

	//NEW
	Game_Player.prototype.onGameLoad = function() {
		LOG.p("PL : On Game Load");
		this.battler().onGameLoad();
	}

	//NEW
	Game_Player.prototype.setTarget = function(target) {
		this._absParams.target = target;
		if(!target) {
			this._resetTarget();
		} else {
			BattleManagerABS.UI().controlPanel().setIconAt(3, 'toTarget');
			BattleManagerABS.UI().controlPanel().disableItemAt(0, false);
			BattleManagerABS.UI().controlPanel().disableItemAt(1, false);
		}
	}

	//NEW
	Game_Player.prototype.target = function() {
		return this._absParams.target;
	}

	//NEW
	Game_Player.prototype.stopFollowMode = function() {
		if(this._absParams.targetFollowMode)
			BattleManagerABS.UI().controlPanel().selectItemAt(1, false);
		this._absParams.targetFollowMode = false;
	}

	//NEW
	Game_Player.prototype.battler = function() {
		return this._absParams.battler;
	}

	//NEW
	Game_Player.prototype.initABS = function() {
		LOG.p("Player inited");
		this._absParams.battler = $gameParty.leader();
		if(!Imported.Quasi_Movement)
			this._absParams.useAStar = true;
	}

	//NEW
	Game_Player.prototype.stopABS = function() {
		this._resetTarget();
		this.controlOn();
		this._absParams.inBattle = false;
		this._absParams.battler.stopABS();
		this._absParams.active = true;
		this._absParams.dead = false;
		this._absParams.useAStar = false;
	}

	//NEW
	Game_Player.prototype.prepareABS = function() {
		this.battler().clearInfoPops();
		this.battler().clearActions();
		this.clearExpPopup();
		this._resetTarget();
		this.battler().refreshABSSkills();
		this.changeInputMode(0);
	}

	//NEW
	Game_Player.prototype.clearExpPopup = function() {
		this._absParams.expPopup = null;
	}

	//NEW
	Game_Player.prototype.isExpPopupRequested = function() {
		return (this._absParams.expPopup != null);
	}

	//NEW
	Game_Player.prototype.isMotionRequested = function() {
		return (this._absParams.motion != null);
	}

	//NEW
	Game_Player.prototype.requestMotion = function(motion) {
		this._absParams.motion = motion;
	}

	//NEW
	Game_Player.prototype.motionType = function() {
		return this._absParams.motion;
	}

	//NEW
	Game_Player.prototype.clearMotion = function() {
		this._absParams.motion = null;
	}

	//NEW
	Game_Player.prototype.requestExpPopup = function(value) {
		this._absParams.expPopup = value;
	}

	//NEW
	Game_Player.prototype.getExpPopup = function() {
		return this._absParams.expPopup;
	}

	//NEW
	Game_Player.prototype.inBattle = function() {
		return this._absParams.inBattle;
	}

	//NEW
	Game_Player.prototype.canControl = function() {
		return this.inActive() && this.battler().canMove() && this._absParams.control;
	}

	//NEW
	Game_Player.prototype.refreshBattleState = function() {
		if(!this.inBattle()) {
			this.onBattleStart();
		}
	}

	//NEW
	Game_Player.prototype.onBattleStart = function() {
		LOG.p("PL : Battle start");
		//BattleManagerABS.alertOnUI(Consts.STRING_ALERT_INBATTLE[SDK.isRU()]);
		this._absParams.inBattle = true;
		this._absParams.inBattleTimer = new Game_TimerABS();
		this._absParams.inBattleTimer.start(120);
	}

	//NEW
	Game_Player.prototype.onBattleEnd = function() {
		LOG.p("PL : Battle end");
		//BattleManagerABS.alertOnUI(Consts.STRING_ALERT_OUTBATTLE[SDK.isRU()]);
		this._absParams.inBattle = false;
		this._absParams.inBattleTimer = null;
	}

	//NEW
	Game_Player.prototype.inActive = function() {
		return this._absParams.active;
	}

	//NEW
	Game_Player.prototype.controlOff = function() {
		$gameTemp.clearDestination();
		this._absParams.control = false;
		LOG.p("Control OFF");
	}

	//NEW
	Game_Player.prototype.controlOn = function() {
		this._absParams.control = true;
		LOG.p("Control ON");
	}

	//NEW
	Game_Player.prototype.onTurnEnd = function() {
		this.battler().onTurnEnd();
	}

	//NEW
	Game_Player.prototype.touchSkillAt = function(index) {
		if(!this.canControl()) return;
		var skillABS = this.battler().skillByKeyIndex(index);
		if(skillABS) {
			if(this._absParams.currentAction != skillABS) {
				BattleManagerABS.UI().touchSkillAt(index);
				this._onNewSkillActivate();
				this._absParams.currentAction = skillABS;
				this._changeState('prepare');
			}
		}
	}

	//NEW
	Game_Player.prototype.touchControlAt = function(index) {
		if(!this.canControl()) return;
		if(index > 4) {
			return;
		}

		switch(index) {
			case 0:
				if(this._absParams.autoAttackMode) {
					this.turnTowardCharacter(this.target());
				}
				else {
					if(this._turnAutoAttack()) {
						BattleManagerABS.UI().controlPanel().touchItemAt(index);
						BattleManagerABS.UI().controlPanel().selectItemAt(index, true);
					} else {
						BattleManagerABS.UI().controlPanel().selectItemAt(index, false);
						if(this.target() == null)
							BattleManagerABS.UI().controlPanel().disableItemAt(index, true);
					}
				}
			break;
			case 1: //Follow Mode
				if(this.target() && AlphaABS.SYSTEM.PARAMS.CONTROL_PANEL_ALLOW_FOLLOW == true) {
					if(!this._absParams.autoAttackMode)
						this._onNewSkillActivate();
					this._absParams.targetFollowMode = !this._absParams.targetFollowMode;
					if(this._absParams.targetFollowMode) {
						BattleManagerABS.UI().controlPanel().selectItemAt(index, true);
					} else {
						BattleManagerABS.UI().controlPanel().selectItemAt(index, false);
					}
					BattleManagerABS.UI().controlPanel().touchItemAt(index);
				}
			break;
			case 2:
				if(AlphaABS.SYSTEM.PARAMS.CONTROL_PANEL_ALLOW_JUMP == true) {
					if(this.canMove()){
						if(Imported.YEP_SmartJump == true) {
							if(this._absParams.state == 'free' && !this.isJumping())
								$gamePlayer.smartJump(1);
						} else {
							if(this._absParams.state == 'free' && !this.isJumping() && this.canPass(this.x, this.y, this.direction())) {
								switch(ABSUtils.getDirKey(this)){
									case 'u' : this.jump(0,-1); break;
									case 'd' : this.jump(0, 1); break;
									case 'l' : this.jump(-1,0); break;
									case 'r' : this.jump( 1,0); break;
								}
							}
						}
						BattleManagerABS.UI().controlPanel().touchItemAt(index);
					}
				}
			break;
			case 3:
				if(AlphaABS.SYSTEM.PARAMS.CONTROL_PANEL_ALLOW_ROTATE == true) {
					if(this.canMove()){
						if(this._absParams.state == 'free' && !this._absParams.targetFollowMode) {
							if(this.target()) {
								this.turnTowardCharacter(this.target());
							} else
								this.turnTowardCharacter(SMouse.getMousePosition().convertToMap());
						}
						BattleManagerABS.UI().controlPanel().touchItemAt(index);
					}
				}
			break;
			case 4:
				if(AlphaABS.SYSTEM.PARAMS.CONTROL_PANEL_ALLOW_FAVWEAP == true) {
					if(this.canMove()){
						if(!this.battler().isFavWeapExists()) return;
			            BattleManagerABS.UI().controlPanel().touchItemAt(index);
			            if(this._absParams.inputMode == 0) {
			                this.changeInputMode(1);
			            }
			            else {
			                this.changeInputMode(0);
			            }
		            }
	          }
			break;
		}

	}

	//NEW
    Game_Player.prototype.touchWeaponAt = function(index) {
        BattleManagerABS.UI().weapCircle().click(index);
        if(this.battler().changeFavWeap(index)) {
            SoundManager.playEquip();
            this.changeInputMode(0);
        } else
            SoundManager.playBuzzer();

        BattleManagerABS.UI().weapCircleRefresh();
    }

	//NEW
	Game_Player.prototype.onActionOnMe = function(who) {
		if(who && who.target() == this) {
			this.refreshBattleState();
			if(!this.target()) {
				BattleManagerABS.setPlayerTarget(who);
			}
		}
	}

	var _Game_Player_update = Game_Player.prototype.update;
	Game_Player.prototype.update = function(sceneActive) {
		_Game_Player_update.call(this, sceneActive);
		this._updateABS(sceneActive);
	}

	var _Game_Player_updateDashing = Game_Player.prototype.updateDashing;
	Game_Player.prototype.updateDashing = function() {
		if(AlphaABS.SYSTEM.PARAMS.ALLOW_DASH == false) {
			if($gameMap.isABS()) {
				this._dashing = false;
				return;
			}
		}
		_Game_Player_updateDashing.call(this);
	}

	//NEW
	Game_Player.prototype.interruptCast = function() {
		var t = this._absParams.currentAction;
		if(t && t.isCasting()){
			LOG.p("PL : Cast intterupt");
			//BattleManagerABS.UI().stopSkillCast();
			BattleManagerABS.alertOnUI(Consts.STRING_ALERT_INTERRUPT[SDK.isRU()]);
			t.resetCast();
			this._absParams.casting = false;
			this._absParams.castingError = true;

			/*if(this._absParams.autoAttackMode == true) {
				this._absParams.autoAttackMode = false;
				BattleManagerABS.UI().controlPanel().selectItemAt(0, false);
			}*/

			this._changeState('free');
		}
	}

	Game_Player.prototype.setFavWeapForce = function(itemId, segmentSymbol) {
		var index = 0;
		segmentSymbol = SDK.check(segmentSymbol, 'top');
		switch(segmentSymbol) {
			case 'left':
				index = 3;
				break;
			case 'top':
				index = 0;
				break;
			case 'bottom':
				index = 2;
				break;
			case 'right':
				index = 1;
				break;
		}
		var item = $dataWeapons[itemId];
		var owner = this.battler();
		if(owner == null) {
			owner = $gameParty.leader();
		}
		owner.setFavWeap(item, index);
		if (BattleManagerABS.UI())
	        BattleManagerABS.UI().weapCircleRefresh();
	};
	//RPIVATE

	Game_Player.prototype._deactivate = function() {
		BattleManagerABS.setPlayerTarget(null);
		$gameMap.stopPlayerTargetCircle();
		this._stopTargetSelect();
		this._absParams.active = false;
		if(!this.battler().isAlive()) {
			this._dead();
		}
	}

	Game_Player.prototype._dead = function() {
		AudioManager.playMe($gameSystem.defeatMe());
		this._absParams.dead = true;
		this._absParams.deadTimer = new Game_TimerABS();
		this._absParams.deadTimer.start(90);
		//$gameScreen.startFadeOut(60);
		this.requestMotion('sleep');
	}

	Game_Player.prototype._resetTarget = function() {
		this.stopFollowMode();
		this.interruptCast();
		this._absParams.autoAttackMode = false;
		BattleManagerABS.UI().controlPanel().disableItemAt(0, true);
		BattleManagerABS.UI().controlPanel().disableItemAt(1, true);
		BattleManagerABS.UI().controlPanel().setIconAt(3, 'toMouse');
		this._changeState('free');
	}

	Game_Player.prototype._changeState = function(newState) {
		this._absParams.state = newState;

		switch(newState){
			case 'free':
				this._stopTargetSelect();
				this._absParams.currentAction = null;
			break;
			case 'cast':
				if((this._absParams.currentAction.isRadiusType() &&
					this._absParams.currentAction.isNeedTarget()) || this._absParams.currentAction.isVectorTypeR())
					$gameMap.lockPlayerTargetCircle();
				$gameTemp.clearDestination();
				this.stopFollowMode();
			break;
			case 'targetCircle':
				$gameTemp.clearDestination();
				$gameMap.requestPlayerTargetCircle(this._absParams.currentAction);
				this.stopFollowMode();
			break;
		}
	}

	Game_Player.prototype._performAction = function() {
		this.battler().makeActions();
		if(this._absParams.currentAction.isItem()) {
			this.battler().action(0).setItem(this._absParams.currentAction.skillId);
		} else
			this.battler().action(0).setSkill(this._absParams.currentAction.skillId);

		LOG.p("PL : Perform! " + this._absParams.currentAction.name());
		var selfAction = false;
		if(this._absParams.currentAction.isVectorType()) {
			if(this._absParams.currentAction.isVectorTypeR())
				BattleProcessABS.startPostBattleAction(this, new Point(TouchInput.x, TouchInput.y).convertToMap(), this.battler().action(0), this._absParams.currentAction);
			else
				BattleProcessABS.startPostBattleAction(this, this.target(), this.battler().action(0), this._absParams.currentAction);
		} else {
			if(this._absParams.currentAction.isRadiusType()) {
				if(this._absParams.currentAction.isNeedTarget()) {
					BattleProcessABS.performBattleActionRadius(this, new Point(TouchInput.x, TouchInput.y).convertToMap(), this.battler().action(0), this._absParams.currentAction);
				}
				else
					BattleProcessABS.performBattleActionRadius(this, this.toPoint(), this.battler().action(0), this._absParams.currentAction);
			} else {
				if(this._absParams.currentAction.isZoneType()) {
					BattleProcessABS.performBattleActionZone(this, this.battler().action(0));
				} else {
					if(this._absParams.currentAction.isNeedTarget())
						BattleProcessABS.performBattleAction(this, this.target());
					else {
						this.battler().performCurrentAction();
						this.battler().action(0)._forcing = true;
						BattleProcessABS.performBattleAction(this, this); //On self
						selfAction = true;
					}
				}
			}
		}

		if(!selfAction) {
			this.battler().performCurrentAction();
		}

		this._absParams.currentAction.playStartSound(null);

		if(this._absParams.currentAction == this.battler().skillABS_attack()) {
			this.battler().performAttack();
		}

		if(!this.inBattle() && this.target() != this && selfAction == false) {
			this.onBattleStart();
		}
		if(this._absParams.autoAttackModeLast) {
			if(this._turnAutoAttack()) {
				this._absParams.autoAttackModeLast = false;
			}
		}
		this.refreshBattleState();
		this._changeState('free');
	}

	Game_Player.prototype._onNewSkillActivate = function() {
		if(this._absParams.autoAttackMode == true) {
			this._absParams.autoAttackModeLast = true;
			this._absParams.autoAttackMode = false;
		}
		this._stopTargetSelect();
		this.interruptCast();
	}

	Game_Player.prototype._updateABS = function(sceneActive) {
		if(!sceneActive) return;
		if(!this.battler()) return;

		if(this._absParams.dead === true) {
			this._absParams.deadTimer.update();
			if(this._absParams.deadTimer.isReady()) {
				//$gameScreen.startFadeIn(30);
				if(Consts.PARAMS.DEAD_MAPID > 0) {
				 	this.reserveTransfer(Consts.PARAMS.DEAD_MAPID, 1, 1, 0, 0);
				 	this.battler().gainHp(1);
				 	this._absParams.deadTimer = null;
				} else {
					SceneManager.goto(Scene_Gameover);
				}
			}
		}

		if(!this.inActive()) return;

		if(!this.battler().isAlive() && this.inActive()) {
			this._deactivate();
		}

		if(!this.battler().canMove() && this._absParams.control) {
			this.controlOff();
			this._resetTarget();
			LOG.p("PL: Battle cannot move");
		}

		if(this.battler().canMove() && !this._absParams.control && !BattleManagerABS.UI().isFree()) {
			this.controlOn();
			LOG.p("PL: Battle can move alredy");
		}

		if(this._absParams.inBattleTimer) {
			this._absParams.inBattleTimer.update();
			if(this._absParams.inBattleTimer.isReady()) {
				if(this._checkInBattleStatus()) {
					this._absParams.inBattleTimer.reset();
				} else {
					this.onBattleEnd();
				}
			}
		}

		this.battler().updateABS();
		this._update_attackReload();
		if(!this.inActive()) return;
		if(!this.canControl()) return;

		this._update_input();
		if(this._absParams.autoAttackMode) {
			this._update_on_autoAttackMode();
		} else {
			switch(this._absParams.state) {
				case 'free':
				//this._checkInBattleStatus(); //@opt Можно выделить в процесс
				break;
				case 'prepare':
				this._update_on_prepare();
				break;
				case 'action':
				this._update_on_action();
				case 'cast':
				this._update_on_cast();
				case 'targetCircle':
				this._update_on_targetCircle();
				break;
			}
		}

		if(this._absParams.targetFollowMode == true) {
			if(!this.isMoving()) {
				//this.moveTowardCharacter(this.target());
				/*var dir = this.findDirectionTo(this.target().x, this.target().y);
				if(dir > 0) {
					this.moveStraight(dir);
				}*/
				this.moveToPoint(this.target());
			}
		}

		this._moveSpeed = 4 + this.battler().ABSParams().moveSpeedUpKoef;
	}

	Game_Player.prototype._update_on_autoAttackMode = function() {
		var t = this.battler();
		t.makeActions();
		t.action(0).setAttack();
		var skill = t.skillABS_attack();
		this._absParams.currentAction = skill;
		/*if(this._absParams.state == 'cast') {
			this._update_on_cast();
			return;
		}*/

		if(ABSUtils.distanceTo(this,this.target()) <= 1) {
			this.turnTowardCharacter(this.target());
		}
		if(this.battler().canUse(skill.skill())) {
			if(BattleManagerABS.canUseSkillByTimer(skill)) {
				if(BattleManagerABS.canUseSkillByRange(this, this.target(), skill)) {
					if(BattleManagerABS.canUseSkillByAmmo(skill)) {
						if(skill.isVectorType()) {
							if(!this.isMoving()) {
								this.turnTowardCharacter(this.target());
								BattleProcessABS.startPostBattleAction(this, this.target(), this.battler().action(0), skill);
							} else {
								return;
							}
						} else
							BattleProcessABS.performBattleAction(this, this.target());

						t.performCurrentAction();
						skill.playStartSound(null);
						t.performAttack();
						this.refreshBattleState();
						//this._changeState('action');
						//this._update_on_action();
					} else {
						LOG.p("PL : Skill need ammo!");
						BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NOCHARGES[SDK.isRU()]);
					}
					///BattleManagerABS.UI().showAttackReload();
				} else {
					//LOG.p("PL : Can't use, target too far");
					//BattleManagerABS.alertOnUIbySym('toFar');
				}
			}
		} else {
			LOG.p("PL : Can't use auto attack");
			BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NOAUTOA[SDK.isRU()]);
			this._absParams.autoAttackMode = false;
		}
	}

	Game_Player.prototype._update_input = function() {
		if(Input.isTriggered(AlphaABS.Key.symbol.wC)) {
				    if($gameMap.isABS()) {this.touchControlAt(4);}
            return;
        }

		if(this._absParams.inputMode == 0) {
			if(Input.isTriggered(AlphaABS.Key.symbol.cpW)) {
	            this.touchControlAt(AlphaABS.Key.indexSchemeB.cpW);
	            return;
	        }

	        var isSp = AlphaABS.Key.isTriggeredSP();
	        if(isSp != null) {
	            this.touchSkillAt(isSp);
	        }

	        if(Input.isTriggered(AlphaABS.Key.symbol.cpA)) {
	            this.touchControlAt(AlphaABS.Key.indexSchemeB.cpA);
	            return;
	        }

	        if(Input.isTriggered(AlphaABS.Key.symbol.cpD)) {
	            this.touchControlAt(AlphaABS.Key.indexSchemeB.cpD);
	            return;
	        }

	        if(Input.isTriggered(AlphaABS.Key.symbol.tS)) {
	            var t = BattleManagerABS.nextPlayerTarget();
	            if(t) BattleManagerABS.setPlayerTarget(t);

	        }

	        if(Input.isTriggered(AlphaABS.Key.symbol.cpS)) {
	            this.touchControlAt(AlphaABS.Key.indexSchemeB.cpS);
	            return;
	        }
    	} else {
    		var index = AlphaABS.Key.isTriggeredWS();
            if(index != null) {
                this.touchWeaponAt(index);
                return;
            }
    	}

	}

	Game_Player.prototype._update_on_targetCircle = function() {
		var t = this._absParams.currentAction;
		if(t) {
			if(this.battler().canUse(t.skill())) {
				if(TouchInput.isTriggered()) {
					var p = SMouse.getMousePosition().convertToMap();
					var d = ABSUtils.distanceTo(this, p);
					if(d <= t.range) {
						if(BattleManagerABS.canUseSkillByAmmo(t)) {
							this._changeState('action');
							return;
						} else {
							BattleManagerABS.alertOnUIbySym('noAmmo');
						}
					} else {
						LOG.p("PL : Can't use, too far!");
						BattleManagerABS.alertOnUIbySym('toFar');
						return;
					}
				}
				return;
			} else {
				LOG.p("PL : Can't use, not resources or restricted!");
				BattleManagerABS.alertOnUIbySym('noUse');
			}
		} else {
			LOG.p("PL : Can't use, NULL");
		}

		this._changeState('free');
	}

	Game_Player.prototype._update_on_prepare = function() {
		var t = this._absParams.currentAction;
		if(t) {
			LOG.p("PL : Prepare action " + t.skill().name);
			if(t.cEonStart != 0) {
				LOG.p("PL : Common Event " + t.cEonStart);
				$gameTemp.reserveCommonEvent(t.cEonStart);
			}
			if(this.battler().canUse(t.skill())) {
				if(BattleManagerABS.canUseSkillByAmmo(t)) {
					if(t.isRadiusType()) {
						LOG.p("PL : Radius type ");
						if(BattleManagerABS.canUseSkillByTimer(t)) {
							if(t.isNeedTarget()) {
								this._changeState('targetCircle');
								return;
							} else
								this._changeState('action');
								return;
						} else {
							LOG.p("PL : Can't use, recharge now");
							BattleManagerABS.alertOnUIbySym('recharge');
						}
					} else {
						if(t.isVectorTypeR()) {
							if(BattleManagerABS.canUseSkillByTimer(t)) {
								this._changeState('targetCircle');
								return;
							} else {
								LOG.p("PL : Can't use, recharge now");
								BattleManagerABS.alertOnUIbySym('recharge');
							}
						} else {
							this._prepareNormal();
							return;
						}
					}
				} else {
					BattleManagerABS.alertOnUIbySym('noAmmo');
				}
			} else {
				LOG.p("PL : Can't use, not resources or restricted!");
				BattleManagerABS.alertOnUIbySym('noUse');
			}
		} else {
			LOG.p("PL : Can't use, NULL");
		}

		this._changeState('free');
	}

	Game_Player.prototype._prepareNormal = function() {
		var t = this._absParams.currentAction;
		if(BattleManagerABS.canUseSkillByTimer(t)) {
			if(t.isNeedTarget()) {
				if(this.target()) {
					if(BattleManagerABS.canUseSkillByRange(this, this.target(), t)) {
						this._changeState('action');
						return;
					} else {
						LOG.p("PL : Can't use, target too far");
						BattleManagerABS.alertOnUIbySym('toFar');

					}
				} else {
					LOG.p("PL : Can't use, need target");
					BattleManagerABS.alertOnUIbySym('noTarget');
				}
			} else {
				this._changeState('action');
				return;
			}
		} else {
			LOG.p("PL : Can't use, recharge now");
			BattleManagerABS.alertOnUIbySym('recharge');
		}
		this._changeState('free');
	}

	Game_Player.prototype._update_on_action = function() {
		var t = this._absParams.currentAction;
		if(t) {
			if(t.isNeedCast()) {
				if(t.isCasting()){
					if(t.isReady()) {
						this._performAction();
						this._absParams.casting = false;
					}
				} else {
					if(!this.isMoving()) {
						LOG.p("PL : Start cast!");
						this._absParams.casting = true;
						this._absParams.castingError = false;
						this.executeMove(0);
						t.startCast();
						//BattleManagerABS.UI().showSkillCast(t);
						this._absParams.castingSkill = t;
						//this.requestAnimationABS(120); //130
						//$gameMap.requestCast(this);
						this._changeState('cast');
					} else {
						LOG.p("PL : Can't start cast, i'am moving!");
						BattleManagerABS.alertOnUI(Consts.STRING_ALERT_CASTMOVE[SDK.isRU()]);
						this._changeState('free');
					}
				}
			} else {
				this._performAction();
			}
		} else {
			this._changeState('free');
		}
	}

	Game_Player.prototype._update_on_cast = function() {
		var t = this._absParams.currentAction;
		if(this.target())
			this.turnTowardCharacter(this.target());
		else {
			if(t) {
				if(!t.isZoneType()) {
					this.turnTowardCharacter(new Point(TouchInput.x, TouchInput.y).convertToMap());
				}
			}
		}
		if(t && t.isCasting()) {
			if(t.isRadiusType()) {
				if(this.battler().canUse(t.skill())) {
					if(t.isReady()) {
						LOG.p("PL : Cast END");
						this._changeState('action');
					}
				} else {
					this.interruptCast();
					LOG.p("PL : Can't cast, not resources or restricted!");
					BattleManagerABS.alertOnUIbySym('noUse');
				}
			} else {
				if(t.isNeedTarget() && !BattleManagerABS.canUseSkillByRange(this,this.target(),t)) {
					this.interruptCast();
					LOG.p("PL : Target too far");
					BattleManagerABS.alertOnUIbySym('toFar');
				} else {
					if(this.battler().canUse(t.skill())) {
						if(t.isReady()) {
							LOG.p("PL : Cast END");
							this._changeState('action');
						}
					} else {
						this.interruptCast();
						LOG.p("PL : Can't cast, not resources or restricted!");
						BattleManagerABS.alertOnUIbySym('noUse');
					}
				}
			}
		} else {
			this._absParams.casting = false;
			this._changeState('free');
		}
	}

	Game_Player.prototype._checkInBattleStatus = function() {
		var t = BattleManagerABS.whoTargetOnMe(this, $gameTroop.membersABS());
		if(t) { //Если игрок чья-то цель (врага)
			return true;
		}
		if(BattleProcessABS.isPostProcessExists()) {
			return true; //Если есть действия PostProcess
		}
		return false;
	}

	Game_Player.prototype._turnAutoAttack = function() {
		if(this.target()) {
			this._onNewSkillActivate();
			this.turnTowardCharacter(this.target());
			this._absParams.currentAction = this.battler().skillABS_attack();
			this._absParams.autoAttackMode = true;
			return true;
		}
		return false;
	}

	Game_Player.prototype._update_attackReload = function() {
		var t = this.battler().skillABS_attack();
		this._absParams.isWeapRecharge = !t.isReady();
	}

	Game_Player.prototype._stopTargetSelect = function() {
		$gameMap.stopPlayerTargetCircle();
	}

//END Game_Player
//------------------------------------------------------------------------------

//Game_Action
//------------------------------------------------------------------------------
	//OVER
	Game_Action.prototype.setSubject = function(subject) {
		this._subject = subject;
	}

	//OVER
	Game_Action.prototype.subject = function() {
		return this._subject;
	}

	//OVER
	Game_Action.prototype.testApply = function(target) {
	    return (this.isForDeadFriend() === target.isDead() &&
	            (this.isForOpponent() ||
	            (this.isHpRecover() && target.hp < target.mhp) ||
	            (this.isMpRecover() && target.mp < target.mmp) ||
	            (this.hasItemAnyValidEffects(target))));
	};

	let pkd_GameAction_executeDamage = Game_Action.prototype.executeDamage;
	Game_Action.prototype.executeDamage = function(target, value) {
		pkd_GameAction_executeDamage.call(this, target, value);
		PopInfoManagerABS.makeDamagePopUp(target);
		if (this.isDrain()) {
			PopInfoManagerABS.makeDrainPopUp(this.subject());
		}
	}

	let pkd_GameAction_itemEffectRecoverHp = Game_Action.prototype.itemEffectRecoverHp;
	Game_Action.prototype.itemEffectRecoverHp = function(target, effect) {
		pkd_GameAction_itemEffectRecoverHp.call(this, target, effect);
		PopInfoManagerABS.makeDamagePopUp(target);
	}

	let pkd_GameAction_itemEffectRecoverMp = Game_Action.prototype.itemEffectRecoverMp;
	Game_Action.prototype.itemEffectRecoverMp = function(target, effect) {
		pkd_GameAction_itemEffectRecoverMp.call(this, target, effect);
		PopInfoManagerABS.makeDamagePopUp(target);
	}

	let pkd_GameAction_itemEffectGainTp = Game_Action.prototype.itemEffectGainTp;
	Game_Action.prototype.itemEffectGainTp = function(target, effect) {
		pkd_GameAction_itemEffectGainTp.call(this, target, effect);
		PopInfoManagerABS.makeDamagePopUp(target);
	}

	let pkd_GameAction_executeHpDamage = Game_Action.prototype.executeHpDamage;
	Game_Action.prototype.executeHpDamage = function(target, value) {
		pkd_GameAction_executeHpDamage.call(this, target, value);
		if(value == 0) {
			PopInfoManagerABS.makeZeroDamagePopUp(target);
		}
	}

	//END Game_Action
//------------------------------------------------------------------------------

//Game_Troop
//------------------------------------------------------------------------------
	//OVER
	Game_Troop.prototype.setup = function(troopId) {
		this.clear();
		this._enemies = [];
		this._enemiesABS = [];

		$gameMap.events().forEach(function(e) {
			if(e instanceof Game_AIBot) {
				this._enemiesABS.push(e);
			}
		}.bind(this));
	}

	Game_Troop.prototype.membersABS = function() {
		return this._enemiesABS;
	}

	//OVER
	Game_Troop.prototype.initABS = function() {
		this.setup();
		this.membersABS().forEach(function(member) {
	        member.initABS();
	        this._enemies.push(member.battler());
	    }.bind(this));
	    this._inBattle = true;
	}

	//NEW
	Game_Troop.prototype.onTurnEnd = function() {
		this._enemiesABS.forEach(function(e){e.onTurnEnd();});
	}

	Game_Troop.prototype.aliveMembersABS = function() {
	    return this.membersABS().filter(function(member) {
	        return member.battler().isAlive();
	    });
	};

	Game_Troop.prototype.deadMembersABS = function() {
	    return this.membersABS().filter(function(member) {
	        return member.battler().isDead();
	    });
	};

	//NEW
	Game_Troop.prototype.selectOnMap = function(who) {
		this.membersABS().forEach(function(e) { e.selectOnMap(false); });
		if(who) who.selectOnMap(true);
	}
	//END Game_Troop
//------------------------------------------------------------------------------

//Game_Party
//------------------------------------------------------------------------------
	//NEW
	Game_Party.prototype.initABS = function() {
		this.members().forEach(function(member) {
	        member.initABS();
	    });
		this._inBattle = false;
		this._noNotifyABS = false;
	}

	//NEW
	Game_Party.prototype.gainExp = function(exp) {
		//$gameParty.allMembers().forEach(function(actor) {
	        $gamePlayer.battler().gainExp(exp);
	    //});
	}

	var _Game_Party_gainGold = Game_Party.prototype.gainGold;
	Game_Party.prototype.gainGold = function(amount) {
		_Game_Party_gainGold.call(this, amount);
		if($gameMap.isABS()) {
			if(amount > 0) {
				AudioManager.playSe({name:'Coin',pan:0,pitch:100,volume:90});
				BattleManagerABS.UI().pushOnItemPanel('gold', amount);
			}
		}
	}

	var _Game_Party_gainItem = Game_Party.prototype.gainItem;
	Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
		_Game_Party_gainItem.call(this, item, amount, includeEquip);
		if($gameMap.isABS()) {
			if(amount > 0 && !this._noNotifyABS) {
				AudioManager.playSe({name:'Equip2',pan:0,pitch:140,volume:90});
				BattleManagerABS.UI().pushOnItemPanel('item', item);
			}

			if(DataManager.isWeapon(item)) {
	            if(AlphaABS.BattleManagerABS.UI()) {
	                AlphaABS.BattleManagerABS.UI().weapCircleRefresh();
	            }
        	}
		}
	}

	Game_Party.prototype.inBattle = function() {
		return $gamePlayer.inBattle();
	}
	//END Game_Party
//------------------------------------------------------------------------------

//Game_BattlerBase
//------------------------------------------------------------------------------
	let pkd_GameBattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
 	Game_BattlerBase.prototype.initMembers = function() {
 		pkd_GameBattlerBase_initMembers.call(this);
 		this._absParams = {};
 		this._absParams.popups = [];
 		this._absParams.moveSpeedUpKoef = 0;
 	}

 	let pkd_GameBattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
 	Game_BattlerBase.prototype.eraseState = function(stateId) {
 		if(this._states.include(stateId)) {
 			PopInfoManagerABS.makeStatePopUp(this, stateId, true);
 			this.onSpeedUpState(stateId, false);
 			this.onMotionState(stateId, false);
 		}
 		pkd_GameBattlerBase_eraseState.call(this, stateId);
 	}

 	let pkd_GameBattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
 	Game_BattlerBase.prototype.addNewState = function(stateId) {
 		var state = $dataStates[stateId];
 		if(state.restriction == 0 || state.restriction == 4) {
 			pkd_GameBattlerBase_addNewState.call(this, stateId);
 			this.onSpeedUpState(stateId, true);
 			this.onMotionState(stateId, true);
 		} else {
 			LOG.p("State " + state.name + " not supported in ABS ver. " + PLATFORM.Versions['ABS_SYSTEM']);
 		}
 	}

 	//NEW
 	Game_BattlerBase.prototype.onSpeedUpState = function(stateId, up) {
 		var state = $dataStates[stateId];
 		if(state.meta.speed) {
 			if(up) {
 				LOG.p("Speed UP State been added");
 				this._absParams.moveSpeedUpKoef += parseInt(state.meta.speed);
 			} else {
 				LOG.p("Speed UP State been removed");
 				this._absParams.moveSpeedUpKoef -= parseInt(state.meta.speed);
 			}
 		}
 	}

 	//NEW
 	Game_BattlerBase.prototype.onMotionState = function(stateId, up) {
 		var state = $dataStates[stateId];
 		if(state.restriction == 4 && this.isPlayer()) {
 			if(state.motion >= 2) {
 				if(up) {
 					//LOG.p("Sleep motion requested");
 					$gamePlayer.requestMotion('sleep');
 				} else {
 					//LOG.p("Sleep motion removed");
 					$gamePlayer.requestMotion('none');
 				}
 			}
 		}
 	}

 	//OVER
 	Game_BattlerBase.prototype.isOccasionOk = function(item) {
 		if($gameParty.inBattle()) {
 			return item.occasion === 0 || item.occasion === 1;
 		} else {
 			return item.occasion === 0 || item.occasion === 1 || item.occasion === 2;
 		}
	};

 	//NEW
	Game_BattlerBase.prototype.ABSParams = function() {
		return this._absParams;
	}

	//NEW
	Game_BattlerBase.prototype.allIconsWithPriority = function(value) {
		var stateIcons = this.states().map(function(state) {
			if(state.priority >= value)
	        	return state.iconIndex;
	        else return 0;
	    }).filter(function(iconIndex) {
	        return iconIndex > 0;
	    });
		return stateIcons;
	}

 	//NEW
 	Game_BattlerBase.prototype.getInfoPops = function() {
 		return this._absParams.popups;
 	}

 	//NEW
 	Game_BattlerBase.prototype.performActionUsed = function() {
 		PopInfoManagerABS.makeItemPopUp(this);
 	}

 	Game_BattlerBase.prototype.addInfoPop = function(info) {
 		this._absParams.popups.push(info);
 	}

 	Game_BattlerBase.prototype.clearInfoPops = function() {
 		this._absParams.popups = [];
 	}

	Game_BattlerBase.prototype.isPlayer = function() {
		return (this == $gamePlayer.battler());
	}
 	//END Game_BattlerBase
//------------------------------------------------------------------------------

//Game_Battler
//------------------------------------------------------------------------------
	var _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
	Game_Battler.prototype.initMembers = function() {
		_Game_Battler_initMembers.call(this);
		this._initBattleSkills();
}


	var _GameBattler_attackSpeed = Game_Battler.prototype.attackSpeed;
	Game_Battler.prototype.attackSpeed = function() {
		var t = _GameBattler_attackSpeed.call(this);
		if(t == 0) {
			return 120;
		} else
			return t;
	}

	//NEW
	Game_Battler.prototype.initABS = function() {
		this.appear();
		if (!this.isPreserveTp()) {
	        this.initTp();
	    }
	    this._absParams.battleSkillsABS.all().forEach(function(item) {
	    	this._prepareABSSkill(item);
	    }.bind(this));
	}

	//NEW
	Game_Battler.prototype.onGameLoad = function() {
		/*var skills = [];
		this._initBattleSkills();
		for(var i = 0; i<this._absParams.battleSkillsABS.length; i++) {
			var t = new Game_SkillABS(this._absParams.battleSkillsABS[i].skillId);
			t.loadStaticData(this._absParams.battleSkillsABS[i]);
			skills.push(t);
		}
		this._absParams.battleSkillsABS = skills;*/
	}

	//NEW
	Game_Battler.prototype.updateABS = function() {
		this._absParams.battleSkillsABS.update();

		this.updateStateTurns();
	 	this.updateBuffTurns();
	 	this.removeStatesAuto(2);
	 	this.removeBuffsAuto();
	}

	//OVER
	Game_Battler.prototype.onTurnEnd = function() {
		this.regenerateAll();
	}

	let pkd_GameBattler_regenerateAll = Game_Battler.prototype.regenerateAll;
	Game_Battler.prototype.regenerateAll = function() {
		this.clearResult();
		pkd_GameBattler_regenerateAll.call(this);
		if(this.isAlive())
			PopInfoManagerABS.makeDamagePopUp(this);
	}

	//OVER
	Game_Battler.prototype.onAllActionsEnd = function() {
		this.clearResult();
		this.removeStatesAuto(1);
	};

	//OVER
	Game_Battler.prototype.onBattleEnd = function() {
	    this.onAllActionsEnd();
	    this.clearActions();
	    if (!this.isPreserveTp()) {
	        this.clearTp();
	    }
	};

	//OVER
	Game_Battler.prototype.resetStateCounts = function(stateId) {
	    var state = $dataStates[stateId];
	    var variance = 0;
	    if(state.autoRemovalTiming != 1) {
	    	 //For now, turns calcs in a seconds
	    	variance += Math.max(state.maxTurns - state.minTurns, 0);
	    	this._stateTurns[stateId] = (state.minTurns + Math.randomInt(1 + variance)) * BattleManagerABS.TURN;
	    } else {
	    	this._stateTurns[stateId] = 1; //After Action
	    }
	};

	//OVER
	Game_Battler.prototype.overwriteBuffTurns = function(paramId, turns) {
		var t = turns * BattleManagerABS.TURN;
	    if(this._buffTurns[paramId] < t) {
	        this._buffTurns[paramId] = t;
	    }
	};

	//NEW
	Game_Battler.prototype.stopABS = function() {
		this.onBattleEnd();
		this.removeBattleStates();
	    this.removeAllBuffs();
	}

	//NEW
	Game_Battler.prototype.skillABS_byId = function(skillId, isItem) {
		isItem = SDK.check(isItem, false);
		if(isItem) {
			return this._absParams.battleSkillsABS.itemById(skillId);
		} else {
			return this._absParams.battleSkillsABS.skillById(skillId);
		}
	}

	//NEW
	Game_Battler.prototype.skillABS_byAction = function(action) {
		if(action.item())
			return this.skillABS_byId(action.item().id, action.isItem());
		else
			return null;
	}

	//NEW
	Game_Battler.prototype.skillABS_attack = function() {
		return this.skillABS_byId(this.attackSkillId(), false);
	}

	Game_Battler.prototype.performCurrentAction = function() {
		var action = this.action(0);
		var skill = this.skillABS_byAction(action);
		if(skill.isNeedReloadParam()) {
			skill.preUse(this._calculateABSSkillReloadParam(skill.reloadParam));
		}
		this.useItem(action.item());
		skill.onUse();
		if(skill.skillId != this.attackSkillId() && !skill.isNeedCast()) {
			//Атака не вызывает postUse
			//Навык, который необходимо кастовать, тоже не вызывает postUse
			this._absParams.battleSkillsABS.all().forEach(function(skill){
				skill.postUse();
			});
		}

		this.removeStatesAuto(1);
    	this.removeBuffsAuto();
	}

	Game_Battler.prototype._calculateABSSkillReloadParam = function(reloadParam) {
		var reloadVar = 10;
		try {
			reloadVar = Math.round(parseInt(eval(reloadParam)));
		} catch(err) {
			LOGW.p("Can't calculate" + skill.name() + " <reloadParam> " + err);
			reloadVar = 10;
		}
		return reloadVar;
	}

	var _Game_Battler_onDamage = Game_Battler.prototype.onDamage;
	Game_Battler.prototype.onDamage = function(value) {
	    _Game_Battler_onDamage.call(this, value);
	    this._absParams.battleSkillsABS.all().forEach(function(s) {
	    	if(s.isCasting()) {
	    		s.onCastDelay(30); //TODO Подучать как лучше (в %), сколько урон от макс.HP в процентах, столько и в процентах от castMaxTime (начиная с порога)
	    	}
	    });
	};

	//NEW
	Game_Battler.prototype._prepareABSSkill = function(absSkill) {

	}

	//OVER
	Game_Battler.prototype.onBattleStart = function() {
		//EMPTY
	}

	//OVER
	Game_Battler.prototype.addNewState = function(stateId) {
		Game_BattlerBase.prototype.addNewState.call(this, stateId);
		if(this._states.include(stateId))
			PopInfoManagerABS.makeStatePopUp(this, stateId, false);
	}

	let pkd_GameBattler_addBuff = Game_Battler.prototype.addBuff;
	Game_Battler.prototype.addBuff = function(paramId, turns) {
		PopInfoManagerABS.makeBuffPopUp(this, paramId, true);
		pkd_GameBattler_addBuff.call(this, paramId, turns);
	}

	let pkd_GameBattler_addDebuff = Game_Battler.prototype.addDebuff;
	Game_Battler.prototype.addDebuff = function(paramId, turns) {
		PopInfoManagerABS.makeBuffPopUp(this, paramId, false);
		pkd_GameBattler_addDebuff.call(this, paramId, turns);
	}

	//PRIVATE
	Game_Battler.prototype._initBattleSkills = function() {
		this._absParams.battleSkillsABS = new Game_SkillManagerABS();
	}

	//END Game_Battler
//------------------------------------------------------------------------------

//Game_Actor
//------------------------------------------------------------------------------
	var _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
	Game_Actor.prototype.initMembers = function() {
		_Game_Actor_initMembers.call(this);
		this._absParams.panelSkills = [null,null,null,null,null,null,null,null]; //[id,type]
		this._absParams.favoriteWeapons = [null,null,null,null];
	}

	//NEW
	Game_Actor.prototype.getFavWeapIcons = function() {
        return this._absParams.favoriteWeapons.map(function(argument) {
            if(argument) {
                return $dataWeapons[argument].iconIndex;
            }
            return null;
        });
    };

		/*var _Game_Actor_prototype_isFormationChangeOk = Game_Actor.prototype.isFormationChangeOk;
    Game_Actor.prototype.isFormationChangeOk = function() {
    		this.changeFormationABS();
        return _Game_Actor_prototype_isFormationChangeOk.call(this);
    };*/

    Game_Actor.prototype.changeFormationABS = function() {
    		//$gamePlayer.refresh();
    		//$gamePlayer.initABS();
    };

    //NEW
    Game_Actor.prototype.setFavWeap = function(item, index) {
        if(index > 3) return;
        if(item == null) {
            this.removeFavWeap(index);
            return;
        }
        if(this._absParams.favoriteWeapons[index] &&
            item.id == this._absParams.favoriteWeapons[index]) {
            this.removeFavWeap(index);
        }
        else {
            this._absParams.favoriteWeapons[index] = item.id;
        }
    };

    //NEW
    Game_Actor.prototype.isFavWeapExists = function() {
        return this._absParams.favoriteWeapons.some(function(elem){return (elem !== null);});
    };

    //NEW
    Game_Actor.prototype.getFavWeapIndex = function(item) {
        var index = 0;
        if(item == null)
            return null;

        var finded = null; //This is not good at all
        this._absParams.favoriteWeapons.forEach(function(i){
            if(i && i == item.id) {
                finded = index;
            }
            index++;
        }.bind(this));

        return finded;
    };

    //NEW
    Game_Actor.prototype.getFavWeapSymbol = function(item) {
    	if(!DataManager.isWeapon(item)) return null;
    	var index = this.getFavWeapIndex(item);
        if(index !== null) {
        	var symbol = null;
            for(var key in AlphaABS.Key.indexSchemeC) {
                if(AlphaABS.Key.indexSchemeC[key] == index) {
                    symbol =  key;
                    break;
                }
            }
            if(symbol != null) {
                symbol = AlphaABS.Key.symbol[symbol];
                return symbol;
            }
        }
        return null;
    };

    //NEW
    Game_Actor.prototype.removeFavWeap = function(index) {
        this._absParams.favoriteWeapons[index] = null;
    };

    //NEW
    Game_Actor.prototype.changeFavWeap = function(index) {
        var fvItem = this._absParams.favoriteWeapons[index];
        if(fvItem != null) {
            var fvItemX = $dataWeapons[fvItem];
            if(fvItemX != null) {
                if(this.hasWeapon(fvItemX)) {
                    return false;
                }
                if($gameParty.hasItem(fvItemX, false)) {
                	if(Imported.YEP_ItemCore == true) {
                		var slotId = fvItemX.etypeId - 1;
                		this.changeEquip(slotId, fvItemX);
                		return true;
                	}
                	else {
                    	this.changeEquipById(fvItemX.etypeId, fvItemX.id);
                    	return true;
                    }
                }
            }
        }

        return false;
    };

	//OVER
	Game_Actor.prototype.performAttack = function() {
	    var weapons = this.weapons();
	    var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
	    var attackMotion = $dataSystem.attackMotions[wtypeId];
	    if (attackMotion) {
	        this.startWeaponAnimation(attackMotion.weaponImageId);
	    }
	};

	var pkd_GameActor_learnSkill = Game_Actor.prototype.learnSkill;
	Game_Actor.prototype.learnSkill = function(skillId) {
		var skill = $dataSkills[skillId];
		if(!skill.meta.ABS) {
			LOGW.p("Skill " + skill.name + " not learned, not ABS type");
			return; //Not allow learn not ABS skills
		}
		var isLearning = this.isLearnedSkill(skillId);
		pkd_GameActor_learnSkill.call(this, skillId);
		if(skill.occasion == 1 && !isLearning) {
			this._absParams.battleSkillsABS.push(skillId, false);
			this.setSkillOnPanel(skillId, undefined);
		}
	}

	//NEW
	Game_Actor.prototype.uiPanelReset = function() {
		for(var i = 0; i<8; i++) {
			this.setSkillOnPanel(null, i);
		}
	}

	Game_Actor.prototype.uiPanelSkills = function() {
		return this._absParams.panelSkills;
	}

	Game_Actor.prototype.skillByKeyIndex = function(index) {
		index = index - 1; //Keyboard from 1, but array from 0
		if(index < 0 || index > 7) {
			return null;
		}
		var skillABS = this._absParams.panelSkills[index];
		return skillABS;
	}

	Game_Actor.prototype.uiPanelObjectsCount = function() {
		var count = 0;
		this._absParams.panelSkills.forEach(function(i) {
			if(i !== null) count++;
		});
		return count;
	}

    Game_Actor.prototype.setItemOnPanel = function(itemId, position) {
    	if(this._absParams.battleSkillsABS.itemById(itemId) === null)
    		this._absParams.battleSkillsABS.push(itemId, true);
    	this._setObjectOnPanel(itemId, 1, position);
    }

    Game_Actor.prototype.setSkillOnPanel = function(skillId, position) {
    	this._setObjectOnPanel(skillId, 0, position);
    }

    Game_Actor.prototype._uiPanelFreeSlot = function() {
    	for(var i = 0; i<8; i++) {
    		if(this._absParams.panelSkills[i] === null) {
    			return i;
    		}
    	}
    	return null; //Not empty slots
    }

    Game_Actor.prototype._setOnPosition = function(id, type, position) {
    	if(id == null) {
    		this._absParams.panelSkills[position] = null;
    		return;
    	}
    	if(type == 1) {
    		this._absParams.panelSkills[position] = this._absParams.battleSkillsABS.itemById(id);
    	} else {
    		this._absParams.panelSkills[position] = this._absParams.battleSkillsABS.skillById(id);
    	}
    }

    Game_Actor.prototype._setObjectOnPanel = function(skillId, type, position) {
        if(position === undefined) {
            var slot = this._uiPanelFreeSlot();
            if(slot >= 0) {
            	this._setObjectOnPanel(skillId, type,  slot);
            } else {
            	return;
            }
        } else {
        	if(skillId == null) {
        		this._setOnPosition(null, type, position);
        	} else {
        		if(this._compareObjectOnPosition(skillId,type,position)) { //Remove if on self position
        			this._setObjectOnPanel(null,type,position);
        		} else {
        			var index = this.skillIndexOnUI(skillId,type);
        			if(index >= 0) { //Remove from other position if exists
        				this._setOnPosition(null,type,index);
        			}
        			this._setOnPosition(skillId, type, position);
        		}
        	}

        }

        if (BattleManagerABS.UI())
            BattleManagerABS.UI().refresh();
    }

    Game_Actor.prototype._compareObjectOnPosition = function(id, type, position) {
    	if(this._absParams.panelSkills[position]) {
    		var item = this._absParams.panelSkills[position];
    		if(item.skillId == id) {
    			if(type == 1) {
    				if(item.isItem()) return true;
    			} else {
    				if(!item.isItem()) return true;
    			}
    		}
    	}

    	return false;
    }

    //Возвращяет номер этого навыка на панели или -1, если навыка нет на панели
    Game_Actor.prototype.skillIndexOnUI = function(skillId, isItem) {
    	for(var i = 0; i<this._absParams.panelSkills.length; i++) {
    		var item = this._absParams.panelSkills[i];
    		if(item === null) continue;
    		if(item.skillId == skillId) {
    			if(isItem) {
    				if(item.isItem()) return i;
    			} else
    				if(!item.isItem()) return i;
    		}
    	}

        return -1;
    }

	//OVER
	Game_Actor.prototype.performMapDamage = function() {
	    $gameScreen.startFlashForDamage();
	};

	//OVER
	Game_Actor.prototype.turnEndOnMap = function() {
	    //EMPTY
	};

	Game_Actor.prototype.stopABS = function() {
		Game_Battler.prototype.stopABS.call(this);
		if(this._absParams.stackSkillExists) {
			this._absParams.stackSkillExists = false;
			this._absParams.battleSkillsABS.all().forEach(function(skill) {
				if(skill.isStackType() && !skill.isAutoReloadStack()) {
					if(!skill.isNeedReloadStack()) {
						var item = $dataItems[skill.ammo];
						$gameParty.gainItem(item, skill._currentStack);
						skill.chargeStack(-skill.stack);
					}
				}
			}.bind(this));
		}
	}

	Game_Actor.prototype._prepareABSSkill = function(absSkill) {
		Game_Battler.prototype._prepareABSSkill.call(this,absSkill);
		if(absSkill.isNeedAmmo()) {
			this._absParams.stackSkillExists = true;
			LOG.p("Skill " + absSkill.name() + " need Ammo " + $dataItems[absSkill.ammo].name);
			this._reloadABSSkill(absSkill);
		}
	}

	//NEW
	Game_Actor.prototype.refreshABSSkills = function() {
		if(this._absParams.stackSkillExists) {
			this._absParams.battleSkillsABS.all().forEach(function(skill) {
				if(skill.isStackType() && !skill.isAutoReloadStack()) {
					if(skill.isNeedReloadStack()) {
						this._reloadABSSkill(skill);
					}
				}
			}.bind(this));
		}

		var skillsAll = this._absParams.battleSkillsABS.all();
		for(var i = skillsAll.length - 1; i>0; i--) {
			var item = skillsAll[i];
			if(item.isItem()) {
				if(item.isReady()) {
					if($gameParty.numItems(item.skill()) == 0) {
						if(!this._absParams.panelSkills.include(item)) {
							LOG.p("Remove ITEM ABS from memory " + item.name());
							skillsAll.splice(i, 0);
						}
					}
				}
			}
		}
	}

	//TODO Тогда надо и возвращять снаряды, когда ABS закончился
	Game_Actor.prototype._reloadABSSkill = function(absSkill) {
		LOG.p("Start reload " + absSkill.name());
		var item = $dataItems[absSkill.ammo];
		if($gameParty.hasItem(item)) {
			var count = $gameParty.numItems(item);
			LOG.p("Party has item " + count + ", need to reload " + absSkill.stack);
			var d = absSkill.chargeStack(count);
			LOG.p("Stack charged, item used " + (d>0) ? (count - d) : count);
			if(d > 0) count = count - d;
			$gameParty.loseItem(item,count);
			absSkill.reloadStack();
		} else {
			LOG.p("Party has not items");
		}
	}

	Game_Actor.prototype.performCurrentAction = function() {
		Game_Battler.prototype.performCurrentAction.call(this);
		var skill = this.skillABS_byAction(this.action(0));
		if(skill.isStackType() && !skill.isAutoReloadStack()) {
			if(skill.isNeedReloadStack()) {
				LOG.p("Stack reload manual start");
				this._reloadABSSkill(skill);
			}
		}
	}

	var _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
	Game_Actor.prototype.displayLevelUp = function(newSkills) {
		if($gameMap.isABS()) {
			//var myChar = $gameMap.characterABS(this);
			BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NEWLEVEL[SDK.isRU()]);
			if(Consts.PARAMS.LEVELUP_ANIMATION_ID > 0)
				$gamePlayer.requestAnimationABS(Consts.PARAMS.LEVELUP_ANIMATION_ID); //If Party, need char selector

		} else
			_Game_Actor_displayLevelUp.call(this, newSkills);
	};

	var _Game_Actor_tradeItemWithParty = Game_Actor.prototype.tradeItemWithParty;
	Game_Actor.prototype.tradeItemWithParty = function(newItem, oldItem) {
		$gameParty._noNotifyABS = true;
		var r = _Game_Actor_tradeItemWithParty.call(this, newItem, oldItem);
		$gameParty._noNotifyABS = false;
		return r;
	}

	var _Game_Actor_gainExp = Game_Actor.prototype.gainExp;
	Game_Actor.prototype.gainExp = function(exp) {
	    if($gameMap.isABS() && exp > 0) {
	    	var nExp = Math.round(exp * this.finalExpRate());
	    	if(this.isPlayer())
					BattleManagerABS.UI().pushOnItemPanel('exp', nExp);
		}
	    _Game_Actor_gainExp.call(this, exp);
	};

	let pkd_GameActor_forgetSkill = Game_Actor.prototype.forgetSkill;
	Game_Actor.prototype.forgetSkill = function(skillId) {
		pkd_GameActor_forgetSkill.call(this, skillId);
		var index = this.skillIndexOnUI(skillId, false);
		if(index >= 0)
			this.setSkillOnPanel(null, index); //Delete from UI
		this._absParams.battleSkillsABS.remove(skillId, false);

	}

	var _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
	Game_Actor.prototype.changeEquip = function(slotId, item) {
		this._absParams.needWeaponCheck = true;
	    _Game_Actor_changeEquip.call(this, slotId, item);
	};

	var _Game_Actor_discardEquip = Game_Actor.prototype.discardEquip;
	Game_Actor.prototype.discardEquip = function(item) {
		this._absParams.needWeaponCheck = true;
	    _Game_Actor_discardEquip.call(this, item);
	};

	var _Game_Actor_refresh = Game_Actor.prototype.refresh;
	Game_Actor.prototype.refresh = function() {
		_Game_Actor_refresh.call(this);
		if(this._absParams.needWeaponCheck) {
			this._checkAdditionSkills();
			if($gameMap.isABS()) {
				LOG.p("PL : Check weapon skill");
				if(this.weapons().length > 0) {
					var w = this.weapons()[0];
					if(w.meta.ABS) {
						if(w.meta.ABS == 0) {
							this._absParams.battleSkillsABS.all()[0].loadExternal(w.meta);
						}
						if(w.meta.ABS == 1) {
							this._absParams.battleSkillsABS.all()[0].loadExternal(w.meta,1);
						}
					} else {
						this._absParams.battleSkillsABS.all()[0] = new Game_SkillABS(this.attackSkillId());
					}
				} else {
					this._absParams.battleSkillsABS.all()[0] = new Game_SkillABS(this.attackSkillId());
				}
				this._absParams.needWeaponCheck = false;
				if(BattleManagerABS.UI() && BattleManagerABS.UI().controlPanel()) //NOT GOOD THIS, UI need to be rewrite
					BattleManagerABS.UI().controlPanel().refreshWeaponIconAt(0);
			}
		}
	}

	//NEW
	Game_Actor.prototype._checkAdditionSkills = function() {
		LOG.p("Check addition skills");
		this.addedSkills().forEach(function(i){
			if(this._absParams.battleSkillsABS.skillById(i) == null) {
				this._absParams.battleSkillsABS.push(i, false);
				this.setSkillOnPanel(i, undefined);
			}
		}.bind(this));

		//CHECK ALL
		var d = this._skills.concat(this.addedSkills());
		this._absParams.battleSkillsABS.all().forEach(function(i){
			if(!d.include(i.skillId)) {
				if(i.skillId != this.attackSkillId()) {
					this._absParams.battleSkillsABS.remove(i.skillId, false);
					var index = this.skillIndexOnUI(i.skillId, false);
					if(index != -1) {
						this.setSkillOnPanel(null, index);
					}
				}
			}
		}.bind(this));
	};

	//1
	var _Game_Actor_isEquipTypeLocked = Game_Actor.prototype.isEquipTypeLocked;
	Game_Actor.prototype.isEquipTypeLocked = function(etypeId) {
		if(etypeId == 1) {
		    if($gameMap.isABS()) {
		    	var timer = this._absParams.battleSkillsABS.all()[0].isReady();
		    	if(timer) {
		    		return _Game_Actor_isEquipTypeLocked.call(this, etypeId);
		    	} else {
		    		return true;
		    	}
		    } else {
		    	return _Game_Actor_isEquipTypeLocked.call(this, etypeId);
		    }
		} else {
			return _Game_Actor_isEquipTypeLocked.call(this, etypeId);
		}
	};


	Game_Actor.prototype._initBattleSkills = function() {
		Game_Battler.prototype._initBattleSkills.call(this);
		this._absParams.battleSkillsABS.push(this.attackSkillId(), false);
		this._absParams.needWeaponCheck = true;
	}

	//END Game_Actor
//------------------------------------------------------------------------------

//Game_Screen
//------------------------------------------------------------------------------
	//OVER
	Game_Screen.prototype.realPictureId = function(pictureId) {
	    return pictureId;
	};
	//END Game_Screen
//------------------------------------------------------------------------------

//Game_Interpreter
//------------------------------------------------------------------------------
	//OVER
	Game_Interpreter.prototype.character = function(param) {
		if (param < 0) {
			return $gamePlayer;
		} else if (this.isOnCurrentMap()) {
	        return $gameMap.event(param > 0 ? param : this._eventId);
	    } else {
	        return null;
	    }
	};

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'ABS') {
            switch (args[0]) {
            case 'revive':
            	var revive = 5;
            	if(args[1])
            		revive = parseInt(args[1]);
            	if(args[2]) {
            		var x = $gameMap.events().filter(function(ev) {
            			return (ev.event().name == args[2]);
            		});
            		if(x.length > 0) {
            			x.first().setRevive(revive);
            		}
            	} else
            		this.character(this._eventId).setRevive(revive);
            	break;
            case 'loot':
            	this.character(this._eventId).loot();
            	break;
            case 'showUI':
            	if(BattleManagerABS.UI()) {
            		BattleManagerABS.UI().setShowUI(true);
            		BattleManagerABS.UI().show();
            	}
            	break;
            case 'hideUI':
            	if(BattleManagerABS.UI()) {
            		BattleManagerABS.UI().setShowUI(false);
            		BattleManagerABS.UI().hide();
            	}
            	break;
            case 'activate':
            	var name = args[1] || null;
            	//if no name was supplied by the user, automatically grab the name of the event that runs it
            	//by blurymind (https://github.com/blurymind)
            	if (name == null)  {
            	 		name = $dataMap.events[this.eventId()].name
            	}
            	if(name) {
            		var x = $gameMap.events().filter(function(ev) {
            			return (ev.event().name == name);
            		});
            		if(x.length > 0) {
            			x.first().activate();
            		}
            	}
            break;
            case 'saveUI':
            	if(Utils.isNwjs()) {
	            	if(BattleManagerABS.UI() && $gameMap.isABS()) {
	            		BattleManagerABS.UI().saveUIPattern();
	            	}
            	} else {
            		LOGW.p("Not supported in browser");
            	}
            break;
            case 'loadUI':
            	if(Utils.isNwjs()) {
            		AlphaABS.SYSTEM.LoadUI();
	            	if(BattleManagerABS.UI() && $gameMap.isABS()) {
	            		BattleManagerABS.UI()._refreshPlacement();
	            	}
            	} else {
            		SDK.loadDataFileWeb('ABSUI.rpgsave', function(data) {
            			$gameVariables._uiPositions = data;
            			if(BattleManagerABS.UI() && $gameMap.isABS()) {
		            		BattleManagerABS.UI()._refreshPlacement();
		            	}
            		},
            		function() {
            			LOGW.p("UI save file not exists");
            		});
            	}
            break;
        	}
        }
    };

    // Change Party Member

	var _Game_Interpreter_command129 = Game_Interpreter.prototype.command129;
	Game_Interpreter.prototype.command129 = function() {
		if($gameMap.isABS()) {
			 var actor = $gameActors.actor(this._params[0]);
			 if (this._params[1] !== 0) {  //REMOVE
			 	if($gameParty.leader() == actor) {
			 		BattleManagerABS.warning(129);
			 	} else {
			 		$gameParty.removeActor(this._params[0]);
			 	}
			 } else
			 	return _Game_Interpreter_command129.call(this);
			 return true;
		} else {
			return _Game_Interpreter_command129.call(this);
		}
	};

    // Transfer Player
    var _Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
	Game_Interpreter.prototype.command201 = function() {
		if(AlphaABS.SYSTEM.PARAMS.ALLOW_TRANSFER == true) {
			$gamePlayer.stopABS();
			return _Game_Interpreter_command201.call(this);
		} else {
			if($gameParty.inBattle()) {
				BattleManagerABS.alertNoInBattle();
				BattleManagerABS.warning(1);
				return true;
			} else {
				return _Game_Interpreter_command201.call(this);
			}
		}
	};

	// Scroll Map
	var _Game_Interpreter_command204 = Game_Interpreter.prototype.command204;
	Game_Interpreter.prototype.command204 = function() {
	    if ($gameParty.inBattle()) {
	       BattleManagerABS.alertNoInBattle();
	       BattleManagerABS.warning(1);
		   return true;
	    }
	    return _Game_Interpreter_command204.call(this);
	};

	// Getting On and Off Vehicles
	var _Game_Interpreter_command206 = Game_Interpreter.prototype.command206;
	Game_Interpreter.prototype.command206 = function() {
		if($gameMap.isABS()) {
			BattleManagerABS.warning(0);
			return true;
		} else
			return _Game_Interpreter_command206.call(this);
	}

	// Change Player Followers
	var _Game_Interpreter_command216 = Game_Interpreter.prototype.command216;
	Game_Interpreter.prototype.command216 = function() {
		if($gameMap.isABS()) {
			BattleManagerABS.warning(0);
			return true;
		}
	    return _Game_Interpreter_command216.call(this);
	};

	// Gather Followers
	var _Game_Interpreter_command217 = Game_Interpreter.prototype.command217;
	Game_Interpreter.prototype.command217 = function() {
	    if ($gameMap.isABS()) {
	    	BattleManagerABS.warning(0);
	        return true;
	    }
	    return _Game_Interpreter_command217.call(this);
	};

	// Set Weather Effect
	//OVER
	Game_Interpreter.prototype.command236 = function() {
	    //if (!$gameParty.inBattle()) {
	        $gameScreen.changeWeather(this._params[0], this._params[1], this._params[2]);
	        if (this._params[3] && !$gameParty.inBattle()) {
	            this.wait(this._params[2]);
	        }
	    //}
	    return true;
	};

	// Battle Processing
	//OVER
	Game_Interpreter.prototype.command301 = function() {
		//EMPTY
		BattleManagerABS.warning(2);
    	return true;
    }

    // Shop Processing
    var _Game_Interpreter_command302 = Game_Interpreter.prototype.command302;
	Game_Interpreter.prototype.command302 = function() {
	    if ($gameParty.inBattle()) {
	       	BattleManagerABS.alertNoInBattle();
	       	BattleManagerABS.warning(1);
	        return true;
	    } else
	    	return _Game_Interpreter_command302.call(this);
	};

	// Name Input Processing
	var _Game_Interpreter_command303 = Game_Interpreter.prototype.command303;
	Game_Interpreter.prototype.command303 = function() {
	    if ($gameParty.inBattle()) {
	        BattleManagerABS.alertNoInBattle();
	        BattleManagerABS.warning(1);
	        return true;
	    } else
	    	return _Game_Interpreter_command303.call(this);
	};

	// Change Class
	var _Game_Interpreter_command321 = Game_Interpreter.prototype.command321;
	Game_Interpreter.prototype.command321 = function() {
		if($gameMap.isABS()) {
			BattleManagerABS.warning(321);
			return true;
		} else
			return _Game_Interpreter_command321.call(this);
	}

	// Change Actor Images
	var _Game_Interpreter_command322 = Game_Interpreter.prototype.command322;
	Game_Interpreter.prototype.command322 = function() {
		if($gameMap.isABS()) {
			_Game_Interpreter_command322.call(this);
			if(BattleManagerABS.UI()) {
				BattleManagerABS.UI().refreshFace();
			}
			return true;
		} else
			return _Game_Interpreter_command322.call(this);
	}

	Game_Interpreter.prototype.command331 = function() {
		BattleManagerABS.warning(2);
		return true;
	}

	Game_Interpreter.prototype.command332 = function() {
		BattleManagerABS.warning(2);
		return true;
	}

	Game_Interpreter.prototype.command333 = function() {
		BattleManagerABS.warning(2);
		return true;
	}

	Game_Interpreter.prototype.command334 = function() {
		BattleManagerABS.warning(2);
		return true;
	}

	Game_Interpreter.prototype.command335 = function() {
		BattleManagerABS.warning(2);
		return true;
	}

	Game_Interpreter.prototype.command336 = function() {
		BattleManagerABS.warning(2);
		return true;
	}

	Game_Interpreter.prototype.command337 = function() {
		BattleManagerABS.warning(2);
		return true;
	}

	Game_Interpreter.prototype.command338 = function() {
		BattleManagerABS.warning(2);
		return true;
	}

	Game_Interpreter.prototype.command339 = function() {
		BattleManagerABS.warning(2);
		return true;
	}

	Game_Interpreter.prototype.command340 = function() {
		BattleManagerABS.warning(2);
		return true;
	}

	// Open Menu Screen
	var _Game_Interpreter_command351 = Game_Interpreter.prototype.command351;
	Game_Interpreter.prototype.command351 = function() {
	    if ($gameParty.inBattle()) {
	        BattleManagerABS.alertNoInBattle();
	        BattleManagerABS.warning(1);
	        return true;
	    } else
	    	return _Game_Interpreter_command351.call(this);
	};

	// Open Save Screen
	var _Game_Interpreter_command352 = Game_Interpreter.prototype.command352;
	Game_Interpreter.prototype.command352 = function() {
	    if ($gameParty.inBattle()) {
	         BattleManagerABS.alertNoInBattle();
	         BattleManagerABS.warning(1);
	         return true;
	    } else
	    	return _Game_Interpreter_command352.call(this);
	};

	//END Game_Interpreter
//------------------------------------------------------------------------------

//==========================================================================================================================================================
//MV SPRITES
//==========================================================================================================================================================

//Spriteset_Map
//------------------------------------------------------------------------------
	//OVER
	Spriteset_Map.prototype.createCharacters = function() {
			LOG.p("createCharacters");
	    this._characterSprites = [];
	    this._characterSpritesABS = [];
	    this._spritePlayerABS = null;

	    $gameMap.events().forEach(function(event) {
	    	if(event instanceof Game_AIBot) {
	    		var t = new Sprite_CharacterABS(event, 0);
	        	this._characterSprites.push(t);
	        	this._characterSpritesABS.push(t);
	        }
	        else
	        	this._characterSprites.push(new Sprite_Character(event));
	    }, this);
	    $gameMap.vehicles().forEach(function(vehicle) {
	        this._characterSprites.push(new Sprite_Character(vehicle));
	    }, this);

	    $gamePlayer.followers().reverseEach(function(follower) {
	        this._characterSprites.push(new Sprite_Character(follower));
	    }, this);

	    //$gameParty.members().forEach(function(member) {

	    //}, this);

	    var t = new Sprite_CharacterABS($gamePlayer, 1);
	    this._characterSprites.push(t);
	    this._spritePlayerABS = t;
	    /*this._mapLowerSprite = new Sprite();
	    this._mapLowerSprite.setFrame(0,0,this.width,this.height);
	    this._mapCharsSprite = new Sprite();
	    this._mapCharsSprite.setFrame(0,0,this.width,this.height);
	    this._mapCharsSprite.z = 1;
	    this._mapUpperSprite = new Sprite();
	    this._mapUpperSprite.setFrame(0,0,this.width,this.height);
	    this._mapUpperSprite.z = 2;

	    this._tilemap.addChild(this._mapLowerSprite);
	    this._tilemap.addChild(this._mapCharsSprite);
	    this._tilemap.addChild(this._mapUpperSprite);*/

	    for (var i = 0; i < this._characterSprites.length; i++) {
	        this._tilemap.addChild(this._characterSprites[i]);
	        //this._mapCharsSprite.addChild(this._characterSprites[i]);
	    }
	};

	var _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
	Spriteset_Map.prototype.initialize = function() {
		_Spriteset_Map_initialize.call(this);
		this._absParams = {};
		this._absParams.animationSprites = [];
		this._absParams.targetConfig = false;
	}

	//NEW
	Spriteset_Map.prototype.spritesABS = function() {
		return this._characterSpritesABS;
	}

	//NEW
	Spriteset_Map.prototype.initABS = function() {
		this.spritesABS().forEach(function(item) {item.initABS();});
		this._spritePlayerABS.initABS();
	}

	//NEW
	Spriteset_Map.prototype.spritePlayerABS = function() {
		return this._spritePlayerABS;
	}

	var _Spriteset_Map_update = Spriteset_Map.prototype.update;
	Spriteset_Map.prototype.update = function() {
		_Spriteset_Map_update.call(this);
		if($gameMap.isABS()) {
			this._setupAnimationABS();
			this._updateAnimationABS();
			this._setupPlayerTargetCircle();
		}
	}

	//PRIVATE
	Spriteset_Map.prototype._setupAnimationABS = function() {
		if($gameMap.ABSParams().animationABS != null) {
			var anim = $dataAnimations[$gameMap.ABSParams().animationABS.id];
			this._startAnimationABS($gameMap.ABSParams().animationABS.sprite, anim, false, 0);
			$gameMap.ABSParams().animationABS = null;
		}
	}



	Spriteset_Map.prototype._setupPlayerTargetCircle = function() {
		if(!$gameMap.isABS()) return;
		if(!this._absParams) return;
		if(!this._absParams.spriteTargetCircle) {
			//LOG.p("MAP : Target sprite created!");
			this._absParams.spriteTargetCircle = new Sprite(ImageManager.loadPictureABS('RadiusSelect'));
			//this._absParams.spriteTargetCircle.z = 1;
			//this._tilemap._lowerLayer.addChild(this._absParams.spriteTargetCircle);
			this.addChildAtLayer(this._absParams.spriteTargetCircle,-1);
			this._absParams.spriteTargetCircle.anchor.x = 0.5;
			this._absParams.spriteTargetCircle.anchor.y = 0.5;
			this._absParams.spriteTargetCircle.visible = false;
		}
		if($gameMap.ABSParams().targetCircle != null) {
			if(!this._absParams.targetConfig) {

				var r = $gameMap.ABSParams().targetCircle.radius;

				this._absParams.spriteTargetCircle.scale.x = 0.4 * r;
				if(r > 3)
					this._absParams.spriteTargetCircle.scale.x += (r - 3) * 0.2;
				this._absParams.spriteTargetCircle.scale.y = this._absParams.spriteTargetCircle.scale.x;

				var t3 = SMouse.getMousePosition();
				this._absParams.spriteTargetCircle.x = t3.x;
				this._absParams.spriteTargetCircle.y = t3.y;
				this._absParams.targetConfig = true;
			}

			var t = this._absParams.spriteTargetCircle;
			var t2 = SMouse.getMousePosition();
			if($gameMap.ABSParams().targetCircleNeedLock) {
				t2 = new Point(TouchInput.x, TouchInput.y);
			}
			//LOG.p("Map : Mouse pos " + t2.toString());

			var color = Color.GREEN;
			if(ABSUtils.distanceTo($gamePlayer, t2.clone().convertToMap()) > $gameMap.ABSParams().targetCircle.range) {
				color = Color.RED;
			}

			t.x = t2.x;
			t.y = t2.y;
			t.setBlendColor(color.ARR);
			t.visible = true;
		} else {
			this._absParams.spriteTargetCircle.visible = false;
			this._absParams.targetConfig = false;
		}
	}

	Spriteset_Map.prototype.addChildAtLayer = function(sprite, layerIndex) {
		 switch(layerIndex) {
	    	case 0: //HEAD
	    		this._tilemap.addChild(sprite);
	    	break;
	    	case 1: //CENTER
	    		if(this._tilemap._upperLayer)
	    			this._tilemap._upperLayer.addChild(sprite);
	    		else
	    			this._tilemap.addChild(sprite);
	    		//else
	    		//	this._tilemap.upperLayer.children[0].addChild(sprite);
	    	break;
	    	case 2: //FEET
	    		sprite.z = 1;
	    		if(this._tilemap._lowerLayer)
	    			this._tilemap._lowerLayer.addChild(sprite);
	    		else
	    			this._tilemap.addChild(sprite);
	    		//else
	    		//	this._tilemap.lowerLayer.children[0].addChild(sprite);
	    	break;
	    	default: //SCREEN
	    		this.addChild(sprite);
	    	break;
	    }
	}

	Spriteset_Map.prototype._startAnimationABS = function(target, animation, mirror, delay) {
		var sprite = new Sprite_Animation();
	    sprite.setup(target, animation, mirror, delay);
	    sprite.setABSModeMap();
	    if(animation)
	    	this.addChildAtLayer(sprite, animation.position);
	    this._absParams.animationSprites.push(sprite);
	}

	Spriteset_Map.prototype._updateAnimationABS = function() {
		if(!this._absParams) return;
		if(this._absParams.animationSprites.length > 0) {
	        var sprites = this._absParams.animationSprites.clone();
	        this._absParams.animationSprites = [];
	        for (var i = 0; i < sprites.length; i++) {
	            var sprite = sprites[i];
	            if (sprite.isPlaying()) {
	                this._absParams.animationSprites.push(sprite);
	            } else {
	                sprite.remove();
	            }
	        }
	    }
	}

	//END Spriteset_Map
//------------------------------------------------------------------------------

//Sprite_Animation
//------------------------------------------------------------------------------
	//NEW
	Sprite_Animation.prototype.setABSMode = function() {
		this._absMode = true;
	}

	Sprite_Animation.prototype.setABSModeMap = function() {
		this._absMode = true;
		this._absModeMap = true;
		this._mapPoint = null;
	}

	let pkd_SpriteAnimation_updatePosition = Sprite_Animation.prototype.updatePosition;
	Sprite_Animation.prototype.updatePosition = function() {
		if(this._absMode && !this._absModeMap)
		{
			if (this._animation.position === 3) {
		        this.x = this.parent.width / 2;
		        this.y = this.parent.height / 2;
		    } else {
		        var parent = this._target.parent;
		        var grandparent = parent ? parent.parent : null;
		        this.x = this._target.x;
		        this.y = this._target.y;
		        if (this.parent === grandparent) {
		            this.x += parent.x;
		            this.y += parent.y;
		        }
		        if (this._animation.position === 0) {
		            this.y -= this._target.height;
 		            //this.y -= this._target.height / 2;
		        }
		    }
		    if(this._animation.position === 2) { //FEET
		    	this.y -= 32;
		    }
		}
		else if (this._absMode && this._absModeMap) {
			if(this._animation.position == 3) {
				this.x = this.parent.width / 2;
		        this.y = this.parent.height / 2;
			} else {
				if(!this._mapPoint) {
		    		this._mapPoint = new Point(this._target.x,this._target.y);
		    		this._mapPoint.convertToMap();
			    }

			    var mapPoint = this._mapPoint.mapPointOnScreen();
		    	this.x = mapPoint.x + 24; //Why, I don't find!
		    	this.y = mapPoint.y + 24;
			}
		}
		else {
			pkd_SpriteAnimation_updatePosition.call(this);
		}
	};

	let pkd_SpriteAnimation_updateCellSprite = Sprite_Animation.prototype.updateCellSprite;
	Sprite_Animation.prototype.updateCellSprite = function(sprite, cell) {
		pkd_SpriteAnimation_updateCellSprite.call(this, sprite, cell);
		if(this._absMode) {
			var pattern = cell[0];
			if (pattern >= 0) {
				sprite.x = 0;
    			sprite.y = 0;
    			var t = 4;
    			if(this._absModeMap) {
					t = 2;
				}
				if(this._animation.position != 3) {
					sprite.scale.x = (sprite.scale.x / t);
					sprite.scale.y = (sprite.scale.y / t);
				}
			}
		}
	};

	var _Sprite_Animation_initMembers = Sprite_Animation.prototype.initMembers;
	Sprite_Animation.prototype.initMembers = function() {
		_Sprite_Animation_initMembers.call(this);
		this._lightDuration = null;
		this._lightPoint = null;
		//this._lightColor = '#FFFFFF';
	}

	var _Sprite_Animation_startFlash = Sprite_Animation.prototype.startFlash;
	Sprite_Animation.prototype.startFlash = function(color, duration) {
		_Sprite_Animation_startFlash.call(this, color, duration);

		if(!BattleManagerABS.isABSLightingExt() || !this._absMode) return;
		if(this._lightPoint != null) {
			this._deleteLight();
		}
		this._lightDuration = duration;
		if(this._absModeMap)
			this._lightPoint = new ABSUtils.Point(this.x - 48,this.y - 48);
		else
			this._lightPoint = new ABSUtils.Point(this.x,this.y);
    	this._lightPoint.convertToMap();
    	var lightColor = new PLATFORM.Color(color[0],color[1],color[2]);
    	$gameMap.setLight(this._lightPoint.x, this._lightPoint.y, 150, lightColor.hex(), 0, true);
	}

	var _Sprite_Animation_updateFlash = Sprite_Animation.prototype.updateFlash;
	Sprite_Animation.prototype.updateFlash = function() {
		_Sprite_Animation_updateFlash.call(this);

		if(this._lightDuration == null) return;
		this._lightDuration--;
		if(this._lightDuration <= 1) {
			this._deleteLight();
		}
	}

	var _Sprite_Animation_remove = Sprite_Animation.prototype.remove;
	Sprite_Animation.prototype.remove = function() {
		_Sprite_Animation_remove.call(this);
		if(this._lightDuration || this._lightPoint) {
			this._deleteLight();
		}
	}

	//NEW
	Sprite_Animation.prototype._deleteLight = function() {
		if(this._lightPoint) {
			$gameMap.deleteLight(this._lightPoint.x, this._lightPoint.y);
			this._lightPoint = null;
		}
		this._lightDuration = null;
	}
	//END Sprite_Animation
//------------------------------------------------------------------------------

//Sprite_StateIcon
//------------------------------------------------------------------------------
	//NEW
	Sprite_StateIcon.prototype.setPriority = function(value) {
		this._priority = value;
	}

	//OVER
	Sprite_StateIcon.prototype.updateIcon = function() {
	    var icons = [];
	    if (this._battler && this._battler.isAlive()) {
	    	if(!this._priority)
	        	icons = this._battler.allIcons();
	        else {
	        	icons = this._battler.allIconsWithPriority(this._priority);
	        }
	    }
	    if (icons.length > 0) {
	        this._animationIndex++;
	        if (this._animationIndex >= icons.length) {
	            this._animationIndex = 0;
	        }
	        this._iconIndex = icons[this._animationIndex];
	    } else {
	        this._animationIndex = 0;
	        this._iconIndex = 0;
	    }
	};

	//END Sprite_Sprite_StateIcon
//------------------------------------------------------------------------------

//Sprite_Weapon
//------------------------------------------------------------------------------
	//OVER
	Sprite_Weapon.prototype.animationWait = function() {
	    return 6;
	};

	//NEW
	Sprite_Weapon.prototype.setDirectionABS = function(directionKey) {
		if(this._weaponImageId <= 0) return;

		this.scale.x = 0.7;
		this.scale.y = 0.7;
		this.y = 0;
		this.x = 0;
		this.opacity = 255;

		switch(directionKey) {
    		case 'r' :
    			this.x = 8;
    			this.scale.x *= -1;
    		break;
    		case 'l' :
    			this.x = -8;
    		break;
    		case 'u':
    			this.opacity = 0;
    		break;
    		case 'd':
    			this.y = 5;
    		break;
		}
	}
	//END Sprite_Weapon
//------------------------------------------------------------------------------

//==========================================================================================================================================================
//MV SCENES
//==========================================================================================================================================================

//Scene_Title
//------------------------------------------------------------------------------
	var _Scene_Title_start = Scene_Title.prototype.start;
	Scene_Title.prototype.start = function() {
		BattleManagerABS.clearABS();
	    _Scene_Title_start.call(this);
	};
	//END Scene_Title
//------------------------------------------------------------------------------

//Scene_Map
//------------------------------------------------------------------------------
	var _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
	Scene_Map.prototype.onMapLoaded = function() {
		_Scene_Map_onMapLoaded.call(this);
		BattleManagerABS.onMapLoaded();
		if($gameMap.isABS()){
			this._sVectors = []; //Vectors to delete from $gameMap
			this._spriteset.initABS();
			//Particle system
			if(BattleManagerABS.isABSParticleSystem()) {
				var sprite = new Sprite(new Bitmap(Graphics.width,Graphics.height));
				this._spriteset.addChildAtLayer(sprite, 1);
				this._pEngine = ABSPE.init(sprite.bitmap);
			} else {
				this._pEngine = null;
			}
		}
	}

	var _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
		_Scene_Map_update.call(this);
		if($gameMap.isABS()) {
			BattleManagerABS.updateABS();
			this._updateABS();
			if(BattleManagerABS.UI()) {
                var p = this._spriteset._spritePlayerABS;
                BattleManagerABS.UI().weapCircle().move(p.x,p.y - 24);
            }
		}
	}

	var _Scene_Map_checkGameover = Scene_Map.prototype.checkGameover;
	Scene_Map.prototype.checkGameover = function() {
		if($gameMap.isABS()) {
			 //NOTHING! see Game_Player
		} else
			_Scene_Map_checkGameover.call(this);
	};

	var _Scene_Map_terminate = Scene_Map.prototype.terminate;
	Scene_Map.prototype.terminate = function() {
		if($gameMap.isABS()) {
			BattleManagerABS.UI().terminate();
			if(this._pEngine)
				this._pEngine.terminate();
		}
	    _Scene_Map_terminate.call(this);
	};

	var _Scene_Map_stop = Scene_Map.prototype.stop;
	Scene_Map.prototype.stop = function() {
		if($gameMap.isABS()) {
			BattleManagerABS.setPlayerTarget(null);
			$gamePlayer.prepareABS();
			BattleManagerABS.UI().hide();
		}
		_Scene_Map_stop.call(this);
	}

	//NEW
	Scene_Map.prototype._updateABS = function() {
		$gameMap.ABSParams().sVectors.forEach(function(item){
			if(item) {
				if(item.isStarted()) {
					if(!item.isAlive()) {
						BattleProcessABS.performPostBattleAction(item);
						LOG.p("Delete SVector from Map");
						this._sVectors.push(item);
					}
				} else {
					this._spriteset.addChild(item.sprite);
				    item.start();
				    if(item.hasEmitter())
				   		this._pEngine.addEmitter(item.emitter(), true);
				}
				item.update();
			}
		}.bind(this));

		if(this._sVectors.length > 0) {
			this._sVectors.forEach(function(item) {
				$gameMap.ABSParams().sVectors.delete(item);
			});
			this._sVectors = [];
		}
	}

	//OVER
	var _Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
	Scene_Map.prototype.processMapTouch = function() {

		if(!$gameMap.isABS()) {
			_Scene_Map_processMapTouch.call(this);
			return;
		}

		/*if(Input.isTriggered('1')) {
			BattleManagerABS.UI().freezeElements();
		}

		if(Input.isTriggered('2')) {
			BattleManagerABS.UI().freeElements();
		}*/

		if(!$gamePlayer.inActive()) {
			return;
		}

		if(!$gamePlayer.canControl()) {
			return;
		}

		if(TouchInput.isCancelled()) {
			BattleManagerABS.setPlayerTarget(null);
			$gameMap.ABSParams().menuClickCount++;
		}

	    if (TouchInput.isTriggered() || this._touchCount > 0) {
	        if (TouchInput.isPressed()) {
	            if (this._touchCount === 0 || this._touchCount >= 15) {

                    if(BattleManagerABS.UI().weapCircle().isTouchedAny()) {
                        return;
                    }

	            	var indexT = BattleManagerABS.UI().isTouched();
	            	if(indexT != null && indexT[1] != null) {
	            		if(indexT[0] == 'skill')
	            			$gamePlayer.touchSkillAt(indexT[1]);
	            		if(indexT[0] == 'panel')
	            			$gamePlayer.touchControlAt(indexT[1]);
	            	} else {
		            	var selected = null;
		            	var t = this._spriteset.spritesABS();
		            	for(var i = 0; i<t.length; i++) {
		            		if(t[i].isTouched()) {
		            			selected = t[i];
		            			break;
		            		}
		            	}

		            	var x = $gameMap.canvasToMapX(TouchInput.x);
		                var y = $gameMap.canvasToMapY(TouchInput.y);

		            	if(selected && selected.character().inActive())
		            	{
		            		if(selected.character() != BattleManagerABS.getPlayerTarget()) {
		            			BattleManagerABS.setPlayerTarget(selected.character());

		            			if(!selected.character().isAlly())
		            				LOG.p("Selected " + selected.character().event().name);
		            			else
		            				LOG.p("Selected ally " + selected.character().battler().name());

		            			$gameMap.ABSParams().menuClickCount = 0;
		            		} else {
		            			$gamePlayer.stopFollowMode();
		            			$gameTemp.setDestination(x, y);
		            		}
		            	} else {
		            		$gamePlayer.stopFollowMode();
		            		$gameTemp.setDestination(x, y);
		            	}
	            	}
	            }
	            this._touchCount++;
	        } else {
	            this._touchCount = 0;
	        }
	    }
	};

	var _Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled;
	Scene_Map.prototype.isMenuCalled = function() {
		if($gameMap.isABS())
			if(BattleManagerABS.getPlayerTarget() == null &&
				$gameMap.ABSParams().menuClickCount > 1) {
				return TouchInput.isCancelled() || Input.isTriggered('menu');
			} else
	   			return Input.isTriggered('menu');
	   		//return Input.isTriggered('menu');
	   	else
	   	 	return _Scene_Map_isMenuCalled.call(this);
	};

	//OVER
	Scene_Map.prototype.updateCallMenu = function() {
	    if (this.isMenuEnabled()) {
	        if (this.isMenuCalled()) {
	            this.menuCalling = true;
	        }
	        if (this.menuCalling && !$gamePlayer.isMoving()) {
	        	if($gamePlayer.inBattle()) {
	        		BattleManagerABS.alertNoInBattle();
	        		this.menuCalling = false;
	        	} else
	            	this.callMenu();
	        }
	    } else {
	        this.menuCalling = false;
	    }
	};


	//END Scene_Map
//------------------------------------------------------------------------------

//Scene_Gameover
//------------------------------------------------------------------------------
	var _Scene_Gameover_create = Scene_Gameover.prototype.create
	Scene_Gameover.prototype.create = function() {
		$gameMap.stopABS();
		_Scene_Gameover_create.call(this);
	}
	//END Scene_Gameover
//------------------------------------------------------------------------------

//Scene_Title
//------------------------------------------------------------------------------
	var _Scene_Title_create = Scene_Title.prototype.create
	Scene_Title.prototype.create = function() {
		$gameMap.stopABS();
		_Scene_Title_create.call(this);
	}
	//END Scene_Title
//------------------------------------------------------------------------------

//Scene_Boot
//------------------------------------------------------------------------------
	let pkd_SceneBoot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function() {
		pkd_SceneBoot_start.call(this);
		LOGW.p("Inited v." + AlphaABS.version + " build " + AlphaABS.build + " on MV " + Utils.RPGMAKER_VERSION);
		BattleManagerABS.init();
	}
	//END Scene_Boot
//------------------------------------------------------------------------------

//==========================================================================================================================================================
//MV WINDOWS
//==========================================================================================================================================================

//Window_MenuCommand
//------------------------------------------------------------------------------
	var _Window_MenuCommand_isFormationEnabled = Window_MenuCommand.prototype.isFormationEnabled;
	Window_MenuCommand.prototype.isFormationEnabled = function() {
	    return _Window_MenuCommand_isFormationEnabled.call(this) && !$gameMap.isABS();
	};
	//END Window_MenuCommand
//------------------------------------------------------------------------------

//Window_SkillList
//------------------------------------------------------------------------------
    var _Window_SkillList_update = Window_SkillList.prototype.update;
    Window_SkillList.prototype.update = function() {
        _Window_SkillList_update.call(this);
        if(this.active) {
            this._absSkillToPanel();
        }
    }

    Window_SkillList.prototype._absSkillToPanel = function() {
        for(var i = 1; i<9; i++) {
            if(Input.isTriggered("" + i)) {
            	if(this.checkABSItem(this.item())) {
                	LOG.p("Skill " + this.item().name + " set to slot " + i);
                	this._actor.setSkillOnPanel(this.item().id,i-1);
                	SoundManager.playEquip();
                	this.refresh();
                } else {
                	LOGW.p(Consts.STRING_WARNING_SKILLOC[SDK.isRU()]);
                	SoundManager.playBuzzer();
                }
            }
        }
    }

    var _Window_SkillList_isEnabled = Window_SkillList.prototype.isEnabled;
    Window_SkillList.prototype.isEnabled = function(item) {
    	if(this.checkABSItem(item)) {
    		return false;
    	} else
    		return _Window_SkillList_isEnabled.call(this, item);
	};

	//NEW
	Window_SkillList.prototype.checkABSItem = function(item) {
		return (item && item.occasion == 1 && item.meta.ABS);
	}

    var _Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
    Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
        _Window_SkillList_drawSkillCost.call(this, skill, x, y, width);
        //Draw panel number of skill
        var index = this._actor.skillIndexOnUI(skill.id) ;
        if(index >= 0) {
        	this.changeTextColor(Color.ORANGE.CSS);
        	this.drawText("["+(index+1)+"]", x + width - 60 - this.costWidth(), y, 40, 'left');
        }
    };

    //END Window_SkillList
//------------------------------------------------------------------------------

//Window_ItemList
//------------------------------------------------------------------------------
	var _Window_ItemList_isEnabled = Window_ItemList.prototype.isEnabled;
	Window_ItemList.prototype.isEnabled = function(item) {
		if(item.occasion == 1 && item.meta.ABS) {
			return false;
		} else
	    	return _Window_ItemList_isEnabled.call(this, item);
	};

	var _Window_ItemList_update = Window_ItemList.prototype.update;
    Window_ItemList.prototype.update = function() {
        _Window_ItemList_update.call(this);
        if(this.active) {
            this._absItemToPanel();
        }
    }

    Window_ItemList.prototype._absItemToPanel = function() {
        for(var i = 1; i<9; i++) {
            if(Input.isTriggered("" + i)) {
            	if(this.item() && this.item().occasion == 1 && this.item().meta.ABS) {
	            	LOG.p("Item " + this.item().name + " set to slot " + i);
	            	$gameParty.leader().setItemOnPanel(this.item().id,i-1);
	            	SoundManager.playEquip();
	            	this.refresh();
                } else {
                	LOGW.p(Consts.STRING_WARNING_SKILLOC[SDK.isRU()]);
                	SoundManager.playBuzzer();
                }
            }
        }
    }

    var _Window_ItemList_drawItemNumber = Window_ItemList.prototype.drawItemNumber;
    Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
	    _Window_ItemList_drawItemNumber.call(this, item, x, y, width);
	    if(this._category != 'item') return;
	    var index = $gameParty.leader().skillIndexOnUI(item.id, true);
        if(index >= 0) {
        	this.changeTextColor(Color.ORANGE.CSS);
        	this.drawText("["+(index+1)+"]", x + width - 60 - this.numberWidth(), y, 40, 'left');
        }
	};
    //END Window_ItemList
//------------------------------------------------------------------------------

//==========================================================================================================================================================
//MV OTHER
//==========================================================================================================================================================

//DataManager
//------------------------------------------------------------------------------
	var _DataManager_extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = function(contents) {
	   	_DataManager_extractSaveContents.call(this, contents);

	    if($gameMap.isABS()) {
	    	var t = $gameMap.events();
	    	t.forEach(function(ev) {
				if(ev instanceof Game_AIBot) {
			    	ev.onGameLoad();
			    }
	    	});
	    	$gamePlayer.onGameLoad();
	    }
	};

	var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
	DataManager.isDatabaseLoaded = function() {
		if(_DataManager_isDatabaseLoaded.call(this) == true) {
			if(!$dataSkills[1].meta.ABS) {
				throw new Error(Consts.STRING_ERROR_SKILLNAN[SDK.isRU()]);
			}
			if(!Utils.RPGMAKER_VERSION) {
				//throw new Error(Consts.STRING_ERROR_OLDDATA[SDK.isRU()]);
				LOGW.p(Consts.STRING_ERROR_OLDDATA[SDK.isRU()]);
			}
			var v = Utils.RPGMAKER_VERSION.split('.');
			if(v[0] < 1) {
				//throw new Error(Consts.STRING_ERROR_VERSION[SDK.isRU()]);
				LOGW.p(Consts.STRING_ERROR_OLDDATA[SDK.isRU()]);
			} else {
				if(v[1] < 3) {
					//throw new Error(Consts.STRING_ERROR_VERSION[SDK.isRU()]);
					LOGW.p(Consts.STRING_ERROR_OLDDATA[SDK.isRU()]);
				} else {
					if(v[1] == 3 && v[2] < 1)
						//throw new Error(Consts.STRING_ERROR_VERSION[SDK.isRU()]);
					  LOGW.p(Consts.STRING_ERROR_OLDDATA[SDK.isRU()]);
				}
			}
			return true;
		} else
			return false;
	}
	//END DataManager
//------------------------------------------------------------------------------

})();


//==========================================================================================================================================================
// Alpha ABS UI
//==========================================================================================================================================================

(function() {

	var LOG = new PLATFORM.DevLog("UI");
	var SDK = PLATFORM.SDK;
	var Color = PLATFORM.Color;
	var ABSUtils = AlphaABS.UTILS;
	var Point = ABSUtils.Point;
	var ABSObject_PopUpMachine = AlphaABS.ABSObject_PopUpMachine;
	var PopInfoManagerABS = AlphaABS.PopInfoManagerABS;

	var CONST_UI_DOWN_SIZE = 80;
	var CONST_UI_UPLEFT_SIZE = 300;
	var CONST_UI_UPRIGHT_SIZE = 180;
	var CONST_UI_LEFTPAN_SIZE = 200;

	var Consts = AlphaABS.SYSTEM;
	var LOGW = Consts.LOGW;
	var BattleManagerABS = AlphaABS.BattleManagerABS;

//Game_Variables
//------------------------------------------------------------------------------
	Game_Variables.prototype.setUIParam = function(param, value) {
		if(!this._uiParams) {
			this._uiParams = {};
		}
		this._uiParams[param] = value;
	}

	Game_Variables.prototype.getUIParam = function(param) {
		if(this._uiParams) {
			return this._uiParams[param];
		}
		return null;
	}

	Game_Variables.prototype.setUIPosition = function(id, x, y, vis, extra) {
		if(!this._uiPositions)
			this._uiPositions = {};
		vis = SDK.check(vis,null);
		extra = SDK.check(extra, null);
		this._uiPositions[id] = [x,y,vis,extra];
	}

	Game_Variables.prototype.getUIPosition = function(id) {
		if(this._uiPositions) {
			var p = this._uiPositions[id];
			if(p) {
				return {x:p[0], y:p[1], vis:SDK.check(p[2],null), extra:SDK.check(p[3],null)};
			}
		}
		return null;
	}
	//END Game_Variables
//------------------------------------------------------------------------------

//Sprite_Ext
//------------------------------------------------------------------------------
    function Sprite_Ext() {
        this.initialize.apply(this, arguments);
    }

    Sprite_Ext.prototype = Object.create(Sprite_Base.prototype);
    Sprite_Ext.prototype.constructor = Sprite_Ext;

    Sprite_Ext.prototype.initialize = function() {
        Sprite_Base.prototype.initialize.call(this);
        this._free = false; //Can be moved

        this._lastMousePoint = null; //Prev Mouse x,y (Point)
        this._newMousePoint = null; //New Mouse x,y (Point)
        this._touched = false; //Mouse pressed on this Sprite
    };

    Sprite_Ext.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);
        this._updateMove();
    };

    //NEW
    Sprite_Ext.prototype.free = function() {
        this._free = true;
        this.onFree();
    }

    Sprite_Ext.prototype.onFree = function() {

    }

    Sprite_Ext.prototype.onFreeze = function() {

    }

    Sprite_Ext.prototype.onStartMove = function() {

    }

    Sprite_Ext.prototype.onEndMove = function() {

    }

    Sprite_Ext.prototype.canMove = function() {
        return (this._free == true);
    }

    Sprite_Ext.prototype.freeze = function() {
        this._free = false;
        if(this._touched) {
            this._endMove();
        }
        this.onFreeze();
    }

    //PRIVATE
    Sprite_Ext.prototype._updateMove = function() {
        if(this.canMove()) {
            this._updateTouch();
            if(this._touched) {
                this._updateMovePlace();
            } else
                this._newMousePoint = null;
        }
    }

    Sprite_Ext.prototype._updateTouch = function() {
        if(TouchInput.isTriggered()) {
            //LOG.p("Mouse isTriggered");
            if(this._touched) {
                this._endMove();
            } else {
                //LOG.p("Mouse at " + new ABSUtils.Point(TouchInput.x,TouchInput.y));
                if(ABSUtils.SMath.inRect(new ABSUtils.Point(TouchInput.x,TouchInput.y), this._myRectangle())) {
                    this._startMove();
                }
            }
        }
            /*
            if(TouchInput.isLongPressed()) {
                LOG.p("Mouse isLongPressed");
                LOG.p("Mouse at " + new ABSUtils.Point(TouchInput.x,TouchInput.y));
                if(ABSUtils.SMath.inRect(new ABSUtils.Point(TouchInput.x,TouchInput.y), this._myRectangle())) {
                    if(!this._touched) {
                        this._startMove();
                    }
                }
            } else {
                if(this._touched) {
                    this._endMove();
                }
            }*/
    }

    Sprite_Ext.prototype._updateMovePlace = function() {
        this._lastMousePoint = this._newMousePoint;

        //LOG.p("Update placement");
        var mp = ABSUtils.SMouse.getMousePosition();
        var mx = mp.x;
        var my = mp.y;

        if(mx == 0 && my == 0) {
            mx = TouchInput.x;
            my = TouchInput.y;
        }

        this._newMousePoint = new ABSUtils.Point(mx,my);

        if(this._lastMousePoint != null) {
            var dx = mx - this._lastMousePoint.x;
            var dy = my - this._lastMousePoint.y;
            //LOG.p("Move at " + new ABSUtils.Point(dx,dy));
            this.move(this.x + dx,this.y + dy);
        }
    }

    Sprite_Ext.prototype._myRectangle = function() {
        var x = ABSUtils.toGlobalCoord(this, 'x');
        var y = ABSUtils.toGlobalCoord(this, 'y');
        return new Rectangle(x,y,this.width, this.height);
    }

    Sprite_Ext.prototype._startMove = function() {
    	LOG.p("Start moving");
        this._touched = true;
        this.onStartMove();
        if(!ABSUtils.SMouse.isTracked())
            ABSUtils.SMouse.setTrack(true);
        //LOG.p("Touched!");
    }

    Sprite_Ext.prototype._endMove = function() {
        //LOG.p("Touched OFF!");
        LOG.p("End moving");
        this._touched = false;
        this.onEndMove();
        //ABSUtils.SMouse.setTrack(false);
    }
    AlphaABS.LIB.Sprite_Ext = Sprite_Ext;
	//END Sprite_Ext
//------------------------------------------------------------------------------

//Sprite_Ext2
//------------------------------------------------------------------------------
    function Sprite_Ext2 () {
        this.initialize.apply(this, arguments);
    }

    Sprite_Ext2.prototype = Object.create(AlphaABS.LIB.Sprite_Ext.prototype);
    Sprite_Ext2.prototype.constructor = Sprite_Ext2;

    Sprite_Ext2.prototype.initialize = function(frames) {
        AlphaABS.LIB.Sprite_Ext.prototype.initialize.call(this);

        this._mouseIn = false;
        this._ready  = false;
        this._readyHandler = null;
        this._outHandler = null;
        this._readyCalled = false;
        this._frames = frames;
        this.timerA = new Game_TimerABS();
        this.thread = setInterval( function() { this._checkMouseIn(); }.bind(this), (1000.0 / 60) );
    };

    Sprite_Ext2.prototype.setReadyHandler = function(func) {
        this._readyHandler = func;
    }

    Sprite_Ext2.prototype.setOutHandler = function(func) {
        this._outHandler = func;
    }

    Sprite_Ext2.prototype.update = function() {
        AlphaABS.LIB.Sprite_Ext.prototype.update.call(this);
        if(this._mouseIn) {
            this.timerA.update();
            if(this.timerA.isReady()) {
                this._ready = true;
                this._onReady();
            }
        }
    };

    Sprite_Ext2.prototype.isReady = function() {
        return (this._ready == true);
    }

    Sprite_Ext2.prototype.terminate = function() {
        clearInterval(this.thread);
    }


    //PRIVATE
    Sprite_Ext2.prototype._checkMouseIn = function() {
        var mp = ABSUtils.SMouse.getMousePosition();
        if(ABSUtils.SMath.inRect(mp, this._myRectangle())) {
            this._mouseInF();
        } else {
            this._mouseOutF();
        }
    }

    Sprite_Ext2.prototype._mouseOutF = function() {
        if(this._mouseIn == true) {
            //LOG.p("Mouse OUT");
            this._mouseIn = false;
            this.timerA.reset();
            if(this.isReady()) {
                this._onOut();
            }
        }
    }

    Sprite_Ext2.prototype._mouseInF = function() {
        if(this._mouseIn == false) {
            //LOG.p("Mouse IN");
            this._mouseIn = true;
            this.timerA.start(this._frames);
        }
    }

    Sprite_Ext2.prototype._onOut = function() {
        //LOG.p("on OUT");
        this.ready = false;
        if(this._outHandler) {
            this._outHandler.call();
        }
        this._readyCalled = false;
    }

    Sprite_Ext2.prototype._onReady = function() {
        if(this._readyCalled == true) return;
        if(this._readyHandler) {
            this._readyHandler.call();
        }
        this._readyCalled = true;
    }
    AlphaABS.LIB.Sprite_Ext2 = Sprite_Ext2;
    //END Sprite_Ext2
//------------------------------------------------------------------------------


//Sprite_Hover
//------------------------------------------------------------------------------
	function Sprite_Hover() {
    	this.initialize.apply(this, arguments);
	}

	Sprite_Hover.prototype = Object.create(Sprite_Button.prototype);
	Sprite_Hover.prototype.constructor = Sprite_Hover;

	Sprite_Hover.prototype.initialize = function(w,h) {
	    Sprite_Button.prototype.initialize.call(this);
	    this._step = 0;
	    this._free = true;
	    this._createHover(w,h);
	};

    Sprite_Hover.prototype.update = function() {
    	Sprite_Button.prototype.update.call(this);
    	if(this._free) {
			if(this.isHoverByMouse()) {
					this._step++;
					this._onHover();
			} else {
				this._reset();
			}
		}
    }

    Sprite_Hover.prototype.freeze = function() {
    	this._free = false;
    	this.alpha = 1;
    }

    Sprite_Hover.prototype.free = function() {
    	this._free = true;
    	this._reset();
    }

    Sprite_Hover.prototype.standardFrameWidth = function() {
    	return 2;
    }

	//PRIVATE
	Sprite_Hover.prototype._createHover = function(w,h) {
        this.bitmap = new Bitmap(w, h);
        var color1 = Sprite_Hover.CWHITE.CSS;
        var color2 = Sprite_Hover.CWHITE2.CSS;
        this._drawFrame(color1, color2, this.standardFrameWidth());
        this.alpha = 0;
    }

    Sprite_Hover.prototype._reset = function() {
    	this._step = 0;
    	this.alpha = 0;
    }

    Sprite_Hover.prototype._drawFrame = function(color1,color2, w) {
    	this.bitmap.clear();
    	this.bitmap.gradientFillRect(0, 0, w, this.height, color1, color2);
        this.bitmap.gradientFillRect(this.width-w, 0, w, this.height, color2, color1);
        this.bitmap.gradientFillRect(0, 0, this.width, w, color1, color2, true);
        this.bitmap.gradientFillRect(0, this.height-w, this.width, w, color2, color1, true);
    }

    Sprite_Hover.prototype._onHover = function() {
        this.alpha = 0.6 - Math.abs((this._step * 0.01) % 0.5);
    }

    SDK.setConstant(Sprite_Hover, 'CWHITE',  (Color.WHITE.reAlpha(220)));
    SDK.setConstant(Sprite_Hover, 'CWHITE2', (Color.WHITE.reAlpha(60)));

    AlphaABS.LIB.Sprite_Hover = Sprite_Hover;
	//END Sprite_Hover
//------------------------------------------------------------------------------

//PKD_Object_Bar
//------------------------------------------------------------------------------
 	class PKD_Object_Bar
 	{
 		constructor(bitmap)
 		{
 			this._bitmap = bitmap;
 			this._rect = undefined;
 			this._bColor = Color.BLACK;
 			this._color = Color.WHITE;
 			this._isGradient = true;
 			this._mValue = 0;
 			this._text_l = null;
 			this._text_r = null;
 			this._text_c = null;
 			this._lValue = -1; //Last value
 			this._value = 0;

 			this._calculate_gradient();
 		}

 		setPosition(x, y, w, h)
 		{
 			this._rect = new Rectangle(x,y,w,h);
 		}

 		setValue(value)
 		{
 			if(value <= 0)
 				value = 0;
 			if(value > this._mValue)
 				value = this._mValue;
 			this._value = value;
 		}

 		getValue()
 		{
 			return this._value;
 		}

        refresh() // 1.1
        {
            if(this._rect === undefined)
                return;
            this._draw_back_bar();
            if(this._mValue != 0)
                this._draw_main_bar();
        }

 		//PARAMS
 		//color , bColor, maxValue, value
 		config(params)
 		{
 			this._color = params.color || Color.WHITE;
 			this._bColor = params.bColor || Color.BLACK;
 			this._mValue = params.maxValue || 0;
 			this.setValue(params.value || 0);
 		}

 		setText(text, position)
 		{
 			switch(position)
 			{
 				case 'center':
 					this._text_c = text;
 					break;
 				case 'left':
 					this._text_l = text;
 					break;
 				case 'right':
 					this._text_r = text;
 					break;
 			}
 		}

 		allowGradient(isAllowed)
 		{
 			isAllowed = SDK.check(isAllowed, true);
 			this._isGradient = isAllowed;
 			if(this._isGradient)
 				this._calculate_gradient();
 		}

 		update()
 		{
 			if(this._lValue == this._value)
 				return; //No drawing if not changes
 			this.refresh() ;
 			this._lValue = this._value;
 		}


 		//PRIVATE
 		_draw_back_bar()
 		{
 			this._bitmap.fillRect(this._rect.x, this._rect.y, this._rect.width, this._rect.height, this._bColor.CSS);
 		}

 		_draw_main_bar()
 		{
 			let width = Math.floor((100 * this._value / this._mValue) * (this._rect.width - 2)/100);

 			if(this._isGradient) {
 				this._bitmap.gradientFillRect(this._rect.x + 1, this._rect.y + 1, width, this._rect.height - 2,
 												 this._color.CSS, this._gColor.CSS, false);
 			}
 			else {
 				this._bitmap.fillRect(this._rect.x + 1, this._rect.y + 1, width, this._rect.height - 2, this._color.CSS);
 			}

 			let size = this._bitmap.fontSize;
 			this._bitmap.fontFace = AlphaABS.SYSTEM.FONT;
 			this._bitmap.fontSize = this._rect.height - 4;

 			if(this._text_c != null)
 				this._bitmap.drawText(this._text_c, this._rect.x + 2, this._rect.y, this._rect.width - 4, this._rect.height,'center');
 			if(this._text_l != null)
 				this._bitmap.drawText(this._text_l, this._rect.x + 4, this._rect.y, this._rect.width - 8, this._rect.height,'left');
 			if(this._text_r != null)
 				this._bitmap.drawText(this._text_r, this._rect.x + 2, this._rect.y, this._rect.width - 6, this._rect.height,'right');
 			this._bitmap.fontSize = size;
 		}

 		_calculate_gradient()
 		{
 			this._gColor = this._color.getLightestColor(230);
 		}
 	}
 	AlphaABS.LIB.Bar = PKD_Object_Bar;
	//END PKD_Object_Bar
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//NotifyMachine
    class NotifyMachine extends Sprite {
        constructor(x,y, w, h, lines) {
            super();
            this.x = x;
            this.y = y;
            this._maxItems = lines;
            this._items = [];
            this._timers = [];
            this._lineH = h + 4;
            this._newItem = null;
            //this.setFrame(w,this._lineH * lines);
            this._setupMode();
            this._initItems();
            this._newItemTimer = new Game_TimerABS();
            this.bitmap = new Bitmap(w,this._lineH*lines);
            //this.bitmap.fillRect(0,0,w,this._lineH*lines,Color.RED.CSS);
        }

        maxHeight() {
            return this._lineH * this._maxItems;
        }

        update() {
            this._update_new_item();
            this._update_items_fade();
            this._update_timers();
        }

        refresh() {
            this._setupMode();
        }

        push(item) {
            var lastItem = this._items.shift();
            if(lastItem != null)
                this.removeChild(lastItem);

            this._items.push(item);
            if(this._newItem) {
                this._newItem.opacity = 255;
                this._newItem.x = 0;
            }
            this._newItem = item;
            this._newItemTimer.start(NotifyMachine.TIME + 60);
            this._configNewItem();
            this._timers.shift();
            this._timers.push(new Game_TimerABS());
            this.addChild(this._newItem);
            this._step();
        }

        clear() {
            this._items.forEach(function(item){
                if(item) this.removeChild(item);
            });
            this._timers = [];
            this._items = [];
            this._newItem = null;
            this._initItems();
        }

        //PRIVATE
        _setupMode() {
            this._mode = 'right'; //Apper from right of Screen
            if(SDK.toGlobalCoord(this, 'x') < Graphics.width / 2) {
                this._mode = 'left'; //Apper from left of Screen
            }
        }

        _update_new_item() {
            if(this._newItem == null) return;
            this._fadeOut(this._newItem);
            if(this._mode == 'right') {
                if(this._newItem.x > 2)
                    this._newItem.x -= 4;
            } else {
                if(this._newItem.x < 0)
                    this._newItem.x += 4;
            }
        }

        _update_items_fade() {
            for(var i = 0; i<this._items.length; i++) {
                if(!this._timers[i]) continue;
                if(this._timers[i].isReady()) {
                    if(this._items[i] != this._newItem)
                        this._fadeIn(this._items[i]);
                }
            }
        }

        _update_timers() {
            this._timers.forEach(function(timer) {
                if(timer) {
                    timer.update();
                }
            });

            this._newItemTimer.update();
            if(this._newItemTimer.isReady() && this._newItem) {
                this._timers[this._maxItems - 1].start(1);
                this._newItem = null;
            }
        }

        _step() {
            SDK.times(this._items.length, function(i) {
                var index = (this._items.length - 1) - i; //Reverse
                var item = this._items[index];
                if(item == null) return;
                var newY = this.height - (this._lineH * (i + 1));
                if(index != (this._items.length - 1)) { //New Item
                    item.x = 0;
                    if(this._timers[index].isReady())
                        this._timers[index].start(NotifyMachine.TIME);
                }
                item.y = newY;

            }.bind(this));
        }

        _initItems() {
            SDK.times(this._maxItems, function() {
                this._items.push(null);
                this._timers.push(null);
            }.bind(this));
        }

        _configNewItem() {
            this._newItem.opacity = 0;
            if(this._mode == 'right') {
                this._newItem.x += (this.width + 2);
            } else
                this._newItem.x -= (this.width + 2);
        }

        _fadeIn(item) {
            if(item.opacity > 2) {
                item.opacity -= 2;
            }
        }

        _fadeOut(item) {
            if(item.opacity < (251)) {
                item.opacity += 4;
            }
        }

    }

    SDK.setConstant(NotifyMachine, 'TIME', 240);
    AlphaABS.LIB.NotifyMachine = NotifyMachine;
    //END NotifyMachine
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//ItemLineSprite
    class ItemLineSprite extends Sprite {
        constructor(text, iconSymbol, textColor) {
            super();
            this._text = text || '';
            this._textColor = textColor || Color.WHITE;
            this._iconSymbol = iconSymbol || null;
            this._create();
            this._draw();
        }

        width() {
            return 120;
        }

        height() {
            return 24;
        }

        static Item(name, iconIndex) {
            return new ItemLineSprite(name, iconIndex);
        }

        static Gold(count) {
            return new ItemLineSprite(count, AlphaABS.SYSTEM.PARAMS.GOLD_ICON, ItemLineSprite.COLOR_GOLD);
        }

        static Exp(count) {
            return new ItemLineSprite(TextManager.exp + ' '+ count, null, ItemLineSprite.COLOR_EXP);
        }

        //PRIVATE

        _create() {
            var w = this.width();
            var h = this.height();
            this._backSurface = new Sprite();
            this._backSurface.bitmap = new Bitmap(w,h);
            var color1 = Color.BLACK.CSS;
            var color2 = Color.BLACK.getLightestColor(128).CSS;
            this._backSurface.bitmap.gradientFillRect(0,0,w,h, color1, color2, false);
            this._backSurface.opacity = 180;
            this.addChild(this._backSurface);
        }

        _draw() {
            this._drawSurface = new Sprite();
            this._drawSurface.bitmap = new Bitmap(this.width(),this.height());
            this.addChild(this._drawSurface);
            if(this._iconSymbol != null)
                this._drawIcon();
            if(this._text != '')
                this._drawText();
        }

        _drawText() {
            var startX = this._iconSymbol != null ? 26 : 0;
            this._drawSurface.bitmap.textColor = this._textColor.CSS;
            this._drawSurface.bitmap.fontSize = 18;
            this._drawSurface.bitmap.outlineWidth = 2;
            this._drawSurface.bitmap.drawText(this._text, startX + 2, this.height()/2, this.width() - startX, 1, 'left');
        }

        _drawIcon() {
            SDK.drawIcon(0,0,this._iconSymbol,this._drawSurface.bitmap);
        }

    }

    SDK.setConstant(ItemLineSprite, 'COLOR_GOLD', Color.YELLOW);
    SDK.setConstant(ItemLineSprite, 'COLOR_EXP', Color.MAGENTA.getLightestColor(128));

    AlphaABS.LIB.ItemLineSprite = ItemLineSprite;
    //END ItemLineSprite
//------------------------------------------------------------------------------

//Spriteset_InterfaceABS
//------------------------------------------------------------------------------
	class Spriteset_InterfaceABS extends Sprite {
		constructor() {
			super();
			this.setFrame(0, 0, Graphics.width, Graphics.height);
			this._moveElements = [];
			this._free = false; //Can be edited
			this._isABS = false;
			this._needFree = $gameVariables.getUIParam('free') || false;
			this._showUI = $gameVariables.getUIParam('show');
			if(this._showUI == null) this._showUI = true;
			this.z = 10;
			this.update();
		}

		initABS() {
			LOG.p("Init ABS!");
			this._isABS = true;
			this._createElements();
			this._createUIContainers();
			this._refreshPlacement();
			if(!this._showUI) {
				this.hide();
			} else {
				if(this._needFree) {
					this.freeElements();
					this._needFree = false;
				} else
					this.show();
			}
		}

		setEditMode() {
			//Чтобы заблокировать некоторые способновсти элементов, например Hover когда мышь наведина
			if(!this._isABS) return;
			this.spriteSkillPanel.setEditMode();
			this.spriteControlPanel.setEditMode();
		}

		hide() {
			this.freezeElements();
			this._isABS = false;
			this.visible = false;
			this.hideControl();
		}

		show() {
			this._isABS = true;
			this.visible = true;
			this.showControl();
		}

		isVisible() {
			return (this._showUI == true);
		}

		isFree() {
			return (this._free == true);
		}

		needFree() {
			$gameVariables.setUIParam('free', true);
			this._needFree = true;
		}

		setShowUI(value) {
			$gameVariables.setUIParam('show', value);
			this._showUI = value;
		}

		freeElements() {
			if(this._free) return;
			if(this.visible == false)
				this.show();
			$gamePlayer.controlOff();
			this._moveElements.forEach(function(item) {
				item[1].free();
			});
			this._free = true;
		}

		freezeElements() {
			if(!this._free) return;
			$gameVariables.setUIParam('free', false);
			this._moveElements.forEach(function(item) {
				item[1].freeze();
				$gameVariables.setUIPosition(item[0],
					item[1].x,
					item[1].y,
					item[1].visibleMode(),
					item[1].specialMode());
			});
			this._free = false;
			$gamePlayer.controlOn();
		}

		hideControl() {
			this.hideSkillPanel();
			this.hideControlPanel();
		}

		showControl() {
			if($gamePlayer.battler().uiPanelObjectsCount() > 0)
				this.showSkillPanel();
			this.showControlPanel();
		}

		showTarget(target) {
			this.popUpMachineTarget.clear();
			this.spriteTarget.setTarget(target);
			this.spriteTargetStatuses.setTarget(target);
		}

		controlPanel() {
			return this.spriteControlPanel;
		}

		pushOnItemPanel(type, value) {
			switch(type) {
				case 'item':
					this.itemsBar.push(ItemLineSprite.Item(value.name, value.iconIndex));
				break;
				case 'exp':
					this.itemsBar.push(ItemLineSprite.Exp(value));
				break;
				case 'gold':
					this.itemsBar.push(ItemLineSprite.Gold(value));
				break;
				default:
					this.itemsBar.push(new ItemLineSprite(value));
				break;
			}
		}

		isTouched() {
			var y = TouchInput.y;
			if(this._checkLayerTouch(this._layerSkillPanel)) {
				//LOG.p("Mouse in interface");
				return ['skill', this.spriteSkillPanel.checkTouch()];
			}
			if(this._checkLayerTouch(this._layerControlPanel)) {
				return ['panel', this.spriteControlPanel.checkTouch()];
			}
			return null;
		}

		addPopUp(popObject) {
			this.popUpMachine.push(popObject);
		}

		addPopUpUser(popObject) {
			if(popObject.hasIcon())
				this.popUpMachineUser2.push(popObject);
			else
				this.popUpMachineUser.push(popObject);
		}

		addPopUpTarget(target, popObject) {
			if(target == this.spriteTarget.target) {
				if(popObject.hasIcon())
					this.popUpMachineTarget2.push(popObject);
				else
					this.popUpMachineTarget.push(popObject);
			}
		}

		touchSkillAt(index) {
			this.spriteSkillPanel.touchSkillAt(index);
		}

		terminate() {
			this.freezeElements();
			this.spriteUserUI.terminate();
			this.spriteSkillPanel.terminate();
			this.spriteControlPanel.terminate();
			this.spriteTarget.terminate();
			this.spriteTargetStatuses.terminate();
			this.userStatusPanel.terminate();
			this.spriteCastBar.terminate();
			this.spriteAttackBar.terminate();
			this._moveElements = [];
			this._isABS = false;
			LOG.p("Terminate!");
		}

		update() {
			this._updatePosition();
			if(this._isABS) {
				this.popUpMachine.update();
				this.popUpMachineUser.update();
				this.popUpMachineUser2.update();
				this.popUpMachineTarget.update();
				this.popUpMachineTarget2.update();
				this.userStatusPanel.update();

				if(this._free) {
					this._moveElements.forEach(function(item) {
						item[1].update();
					});
				} else {
					this.itemsBar.update();
				}

				if(this._sCircle)
                	this._sCircle.update();
			}
		}

		refresh() {
			if($gamePlayer.battler() == null) return;
			if($gamePlayer.battler().uiPanelObjectsCount() > 0)
				this.showSkillPanel();
			else
				this.hideSkillPanel();
		}

		refreshFace() {
			this.spriteUserUI.refresh();
		}

		showSkillPanel() {
			if(this.spriteSkillPanel)
				this.spriteSkillPanel.visible = true;
		}

		hideSkillPanel() {
			if(this.spriteSkillPanel)
				this.spriteSkillPanel.visible = false;
 		}

 		showControlPanel() {
 			this.spriteControlPanel.visible = true;
 		}

 		hideControlPanel() {
 			this.spriteControlPanel.visible = false;
 		}

 		saveUIPattern() {
 			var _items = {};
 			this._moveElements.forEach(function(item) {
 				_items[item[0]] = [item[1].x, item[1].y, item[1].visibleMode(), item[1].specialMode()];
 			});
 			AlphaABS.SYSTEM.SaveUI(_items);
 			LOG.p("UI Saved");
 		}

 		weapCircle() {
 			return this._sCircle;
 		}

 		weapCircleRefresh() {
 			if(this.weapCircle())
                this.weapCircle().refresh();

            if(this.controlPanel()) {
                if($gamePlayer.battler().isFavWeapExists()) {
                    this.controlPanel().disableItemAt(4, false);
                } else {
                    this.controlPanel().disableItemAt(4, true);
                }
            }
 		}

		//PRIVATE
		_refreshPlacement() {
			this._moveElements.forEach(function(item) {
				var p = $gameVariables.getUIPosition(item[0]);
				if(p) {
					item[1].move(p.x,p.y);

					if(p.vis !== null) {
						item[1].setElementVisibility(p.vis);
					}

					if(p.extra!= null) {
						item[1].setSpecialMode(p.extra);
					}

				} //else {
					//$gameVariables.setUIPosition(item[0], item[1].x, item[1].y);
				//}
			});
			this.itemsBar.refresh();
		}

		_createElements() {
			this._createSkillPanel();
			this._createUserUI();
			this._createTargetUI();
			this._createControlPanel();
			this._createUserStatusBar();
			this._createAlertBar();
			this._createItemsBar();
			this._createFavWeapCircle();
		}

		_createUIContainers() {
			var skillCtn = new UIObject_Container(0,0,342,48);
			skillCtn.addUI(this.spriteSkillPanel);
			skillCtn.setText(' UI Skill Panel ', false);
			skillCtn.x = SDK.toCX(skillCtn.width);
			skillCtn.y = Graphics.height - skillCtn.height - 10;
			skillCtn.addVisButtton();
			this.addChild(skillCtn);
			this._moveElements.push(['skillPanel',skillCtn]);
			this._layerSkillPanel = skillCtn; //For touch

			var userCtn = new UIObject_Container(0,0,242,98);
			userCtn.addUI(this.spriteUserUI);
			userCtn.setText(' UI Player ', false);
			userCtn.x = 6;
			userCtn.y = 4;
			userCtn.addVisButtton();
			this.addChild(userCtn);
			this._moveElements.push(['userPanel',userCtn]);

			var userCastBars = new UIObject_Container(0,0,150,80);
			userCastBars.addChild(this.spriteCastBar);
			userCastBars.addUI(this.spriteAttackBar);
			userCastBars.setText(' UI Cast bar ', false);
			userCastBars.x = userCtn.x + 10;
			userCastBars.y = userCtn.height + 24;
			userCastBars.addVisButtton();
			this.addChild(userCastBars);
			this._moveElements.push(['userCastBars',userCastBars]);

			var targetUI = new UIObject_Container(0,0,180,100);
			targetUI.addChild(this.spriteTarget );
			targetUI.addUI(this.spriteTargetStatuses);
			targetUI.setText('UI Target', false);
			targetUI.x = 250;
			targetUI.y = 50;
			targetUI.addVisButtton();
			this.addChild(targetUI);
			this._moveElements.push(['targetUI',targetUI]);

			var controlPanel = new UIObject_Container(0,0,this.spriteControlPanel.width,this.spriteControlPanel.height);
			controlPanel.addUI(this.spriteControlPanel);
			controlPanel.setText('CP', false);
			controlPanel.x = 4;
			controlPanel.y = SDK.toCX(controlPanel.height, Graphics.height);
			controlPanel.addVisButtton();
			controlPanel.addSpecialButton({image:'icon_transfer',func:(function(){
					this._uiElement.transfer();
					this.width = this._uiElement.width;
					this.height = this._uiElement.height;
					if(this.backSprite) {
						this.removeChild(this.backSprite);
						this.removeChild(this._hover);
						this.backSprite = null;
						this.onFree();
						this.update();
					}
					this._specMode = !this._specMode;
					this._updateButtonsPlacement();
				}.bind(controlPanel))});
			this.addChild(controlPanel);
			this._moveElements.push(['controlPanel',controlPanel]);
			this._layerControlPanel = controlPanel; //For touch

			var alertBar = new UIObject_Container(0,0,this.spriteAlertLayer.width,this.spriteAlertLayer.height);
			alertBar.addUI(this.spriteAlertLayer);
			alertBar.setText(" UI System messages ", true);
			alertBar.x = SDK.toCX(alertBar.width);
			alertBar.y = Graphics.height - alertBar.height - this._layerSkillPanel.height - 4;
			alertBar.addVisButtton();
			this.addChild(alertBar);
			this._moveElements.push(['alertBar',alertBar]);

			var statusBar = new UIObject_Container(0,0,180,100);
			statusBar.addUI(this.userStatusPanel);
			statusBar.setText(" UI Player Statuses ", true);
			statusBar.x = Graphics.width - statusBar.width - 4;
			statusBar.y = 4;
			statusBar.addVisButtton();
			this.addChild(statusBar);
			this._moveElements.push(['statusBar',statusBar]);

			var h = this.itemsBar.maxHeight();
			var itemsBarC = new UIObject_Container(Graphics.width - 124, (Graphics.height/2) - h/2, this.itemsBar.width, h);
			itemsBarC.addUI(this.itemsBar);
			itemsBarC.setText(' UI Items ', true);
			itemsBarC.addVisButtton();
			this.addChild(itemsBarC);
			this.itemsBar.refresh();
			this._moveElements.push(['itemsBar', itemsBarC]);
		}

		_createItemsBar() {
			this.itemsBar = new NotifyMachine(0,0,120,24,5);
		}

		_createSkillPanel() {
			this.spriteSkillPanel = new Sprite_SkillPanelABS();
			if($gamePlayer.battler().uiPanelObjectsCount() > 0)
				this.showSkillPanel();
			else
				this.hideSkillPanel();
		}

		_createControlPanel() {
			this.spriteControlPanel = new UIObject_ControlPanel();
			this.spriteControlPanel.createBaseItems();
		}

		_checkLayerTouch(layer) {
			var rect = new Rectangle(layer.x, layer.y, layer.width, layer.height);
			return ABSUtils.SMath.inRect(new Point(TouchInput.x, TouchInput.y), rect);
		}

		_createTargetUI() {
			this.spriteTarget = new Sprite_EnemyUI();

			this.spriteTargetStatuses = new Sprite_EnemyStatusBar(this.spriteTarget.width, 24);
			this.spriteTargetStatuses.y = this.spriteTarget.height + 2;
			this.spriteTargetStatuses.setLimit(6);

			this.popUpMachineTarget = new ABSObject_PopUpMachine(0, 0, this.spriteTarget.width - 60, 1, this.spriteTarget);
			this.popUpMachineTarget2 = new ABSObject_PopUpMachine(0, -20, this.spriteTarget.width - 60, 1, this.spriteTarget);
			this.popUpMachineTarget.setEffectSettings(ABSObject_PopUpMachine.SETTINGS);
		}

		_createUserUI() {
			this.spriteUserUI = new Sprite_UserUI();
			this.popUpMachineUser = new ABSObject_PopUpMachine(6, 12, this.spriteUserUI.faceSize, 1, this.spriteUserUI);
			this.popUpMachineUser2 = new ABSObject_PopUpMachine(6, 12, 200, 1, this.spriteUserUI);
			this.popUpMachineUser.setEffectSettings(ABSObject_PopUpMachine.SETTINGS);

			this.spriteAttackBar = new UIObject_BarAttackReload(140,40);
			this.spriteCastBar = new UIObject_BarUserCast(150,36);
		}

		_createUserStatusBar() {
			this.userStatusPanel = new UIObject_UserStatusBar(4);
		}

		_createAlertBar() {
			this.spriteAlertLayer = new Sprite();
			this.spriteAlertLayer.setFrame(0,0,Graphics.width/2,60);
			this.popUpMachine = new ABSObject_PopUpMachine(0, 0, this.spriteAlertLayer.width, 3, this.spriteAlertLayer);
			this.popUpMachine.setEffectSettings([1.0, false, 0]);
			this.popUpMachine.setUpMode();
		}

		_createFavWeapCircle() {
			this._sCircle = new UIObject_InputCircle_FW($gamePlayer.battler(), function(index) {$gamePlayer.touchWeaponAt(index);});
			this.addChild(this._sCircle);
			this.weapCircleRefresh();
		}

		_updatePosition() {
			var screen = $gameScreen;
		    var scale = screen.zoomScale();
		    this.scale.x = scale;
		    this.scale.y = scale;
		    this.x = Math.round(-screen.zoomX() * (scale - 1));
		    this.y = Math.round(-screen.zoomY() * (scale - 1));
		    this.x += Math.round(screen.shake());

		    if(this._isABS) {
			    if(this.spriteAttackBar.visible) {
			    	this.spriteCastBar.y = this.spriteAttackBar.y + this.spriteAttackBar.height;
			    } else {
			    	this.spriteCastBar.y = this.spriteAttackBar.y - 2;
			    }
			}
		}
	}

	AlphaABS.LIB.Spriteset_InterfaceABS = Spriteset_InterfaceABS;

	//END Spriteset_InterfaceABS
//------------------------------------------------------------------------------

//Scene_InterfaceEdit
//------------------------------------------------------------------------------
	function Scene_InterfaceEdit() {
	    this.initialize.apply(this, arguments);
	}

	Scene_InterfaceEdit.prototype = Object.create(Scene_Base.prototype);
	Scene_InterfaceEdit.prototype.constructor = Scene_InterfaceEdit;

	Scene_InterfaceEdit.prototype.create = function() {
		Scene_Base.prototype.create.call(this);
		this._draw_background();
		this.createWindowLayer();

		AlphaABS.BattleManagerABS.UI().needFree();
		this._spritesetUI = new Spriteset_InterfaceABS();
    	this.addChild(this._spritesetUI);
    	this._spritesetUI.initABS();
    	this._spritesetUI.setEditMode();
	}

	Scene_InterfaceEdit.prototype.update = function() {
		Scene_Base.prototype.update.call(this);
		//EXIT
		if(this.isExit()) {
			this._spritesetUI.terminate();
			this.popScene();
		}
	}

	Scene_InterfaceEdit.prototype.isExit = function() {
		return (Input.isTriggered('cancel') || TouchInput.isCancelled());
	}

	//RPIVATE
	Scene_InterfaceEdit.prototype._draw_background = function() {
		this._backgroundSprite = new Sprite();
    	this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    	this._backgroundSprite.setBlendColor([16, 16, 16, 128]);
    	this.addChild(this._backgroundSprite);
	}
	//END Scene_InterfaceEdit
//------------------------------------------------------------------------------

//UIObject_Container
//------------------------------------------------------------------------------
	function UIObject_Container() {
	    this.initialize.apply(this, arguments);
	}

	UIObject_Container.prototype = Object.create(Sprite_Ext.prototype);
	UIObject_Container.prototype.constructor = UIObject_Container;

	UIObject_Container.prototype.initialize = function(x,y,w,h) {
	    Sprite_Ext.prototype.initialize.call(this);
	    this.setFrame(0,0,w,h);
		this.x = x;
		this.y = y;
		this.backSprite = null;
		this.text = null;
		this.text_vis_always = false;
		this._uiElement = null;
		this._uiElementVisMode = true;
		this._specButton = null;
		this._specMode = false;
	};

	UIObject_Container.prototype.setText = function(text, always) {
			this.text = text;
			this.text_vis_always = always || false;
		}

	UIObject_Container.prototype.addUI = function(element) {
		this._uiElement = element;
		this.addChild(element);
	}

	UIObject_Container.prototype.onStartMove = function() {
		if(this._hover) this._hover.freeze();
	}

	UIObject_Container.prototype.onEndMove = function() {
		if(this._hover) this._hover.free();
		this._updateButtonsPlacement();
	}

	UIObject_Container.prototype.onFree = function() {
		if(this.backSprite) {
			this.backSprite.visible = true;
		} else {
			this.backSprite = new Sprite();
			this.backSprite.bitmap = new Bitmap(this.width, this.height);
			this.backSprite.bitmap.fillRect(0,0,this.width,this.height, Color.BLACK.CSS);
			this.backSprite.opacity = 100;
			this.addChild(this.backSprite);
			if(this.text) {
				if(this.text_vis_always)
					this.backSprite.bitmap.drawText(this.text, 0, this.height/2, this.width, 0, 'center');
				else {
					if(this._uiElement && this._uiElement.visible == false) {
						this.backSprite.bitmap.drawText(this.text, 0, this.height/2, this.width, 0, 'center');
					}
				}
			}
		}
		this.visible = true;
		this.refreshVisButtons();
		this._hover = new Sprite_Hover(this.width,this.height);
		this.addChild(this._hover);
	}

	UIObject_Container.prototype.onFreeze = function() {
		if(this.backSprite) {
			this.backSprite.visible = false;
		}
		if(this._uiElementVisMode == false)
			this.visible = false;

		if(this._visibleButton) {
			this._visibleButton.visible = false;
			this._visibleButton2.visible = false;
		}
	}

	UIObject_Container.prototype.setElementVisibility = function(isVis) {
		this._uiElementVisMode = isVis;
		if(this._uiElementVisMode == false && this._free == false) {
			this.visible = false;
		}
		this.refreshVisButtons();
	}

	UIObject_Container.prototype.setSpecialMode = function(value) {
		if(value == true) {
			this._specButton.callClickHandler();
		}

		this._specMode = value;
	}

	UIObject_Container.prototype.visibleMode = function() {
		return this._uiElementVisMode;
	}

	UIObject_Container.prototype.specialMode = function() {
		return this._specMode;
	}

	UIObject_Container.prototype.addSpecialButton = function(button_config) {
		this._specButton = new UIObject_ContainerButton(button_config.image);
		this._specButton.setClickHandler(function(){
			button_config.func();
			this.removeChild(this._hover);
			this._hover = new Sprite_Hover(this.width, this.height);
			this.addChild(this._hover);
		}.bind(this));
		this._updateButtonsPlacement();
		this.addChild(this._specButton);
		this._specButton.visible = false;
	}

	//TODO Надо создать отдельную кнопку (класс) от Sprite_Button
	UIObject_Container.prototype.addVisButtton = function() {
		//LOG.p("Visible buttons created");
		this._visibleButton =  new UIObject_ContainerButton('icon_eyeOn');
		this._visibleButton2 = new UIObject_ContainerButton('icon_eyeOff');
		this.refreshVisButtons();

		this._visibleButton.setClickHandler(function(){this._visClickHandler()}.bind(this));
		this._visibleButton2.setClickHandler(function(){this._visClickHandler()}.bind(this));
		this._updateButtonsPlacement();

		this.addChild(this._visibleButton);
		this.addChild(this._visibleButton2);
	}

	UIObject_Container.prototype._updateButtonsPlacement = function() {
		if(!this._visibleButton) return;

		var _r = 0;
		var _u = 0;
		if(SDK.toGlobalCoord(this, 'x') < Graphics.width / 2) {
			_r = 1;
		}

		if(SDK.toGlobalCoord(this,'y') < Graphics.height / 2) {
			_u = 1;
		}

		if(_r == 1) {
			this._visibleButton.x = this.width;
			if(this._specButton)
				this._specButton.x = this._visibleButton.x + 24;
		} else {
			this._visibleButton.x = -24;
			if(this._specButton)
				this._specButton.x = this._visibleButton.x - 24;
		}

		if(_u == 1) {
			this._visibleButton.y = this.height;
			if(this._specButton)
				this._specButton.y = this._visibleButton.y;
		} else {
			this._visibleButton.y = - 24;
			if(this._specButton)
				this._specButton.y = this._visibleButton.y;
		}


		this._visibleButton2.x = this._visibleButton.x;
		this._visibleButton2.y = this._visibleButton.y;
	}



	UIObject_Container.prototype.refreshVisButtons = function() {
		//LOG.p("Refresh visible buttons");
		if(!this._visibleButton) return;
		if(this._uiElementVisMode == false) {
			this._visibleButton.visible = false;
			this._visibleButton2.visible = true;
		} else {
			this._visibleButton.visible = true;
			this._visibleButton2.visible = false;
		}

		if(this._specButton)
			this._specButton.visible = true;

		if(!this._free) {
			if(this._visibleButton) {
				this._visibleButton.visible = false;
				this._visibleButton2.visible = false;
			}
			if(this._specButton)
				this._specButton.visible = false;
		}
	}


	UIObject_Container.prototype._visClickHandler = function() {
		//LOG.p("Visible button clicked");
		this.setElementVisibility(!this._uiElementVisMode);
		$gameVariables.setUIParam('visX', this._uiElementVisMode);
		this.refreshVisButtons();
	}

	AlphaABS.LIB.UIObject_Container = UIObject_Container;
	//END UIObject_Container
//------------------------------------------------------------------------------

//UIObject_ContainerButton
//------------------------------------------------------------------------------
	class UIObject_ContainerButton extends Sprite_Button
	{
		constructor(imageName) {
			super();
			var b = ImageManager.loadPictureABS(imageName);
			this.image = b;
			b.addLoadListener(function() {
				this.refresh();
			}.bind(this));
		}

		refresh() {
			this.bitmap = new Bitmap(this.image.width, this.image.height);
			//this.bitmap.fillRect(0,0,this.image.width, this.image.height, Color.BLACK.CSS); //getLightestColor(250)
			this.bitmap.blt(this.image, 0, 0, this.image.width, this.image.height, 0, 0);
		}
	}

	//END UIObject_ContainerButton
//------------------------------------------------------------------------------

//UIObject_OpacitySwing
//------------------------------------------------------------------------------
    class UIObject_OpacitySwing {
        constructor(object, time) { //object with opacity, timer = Game_TimerABS
            this._main = object;
            this.mode = 1;
            this.repeat = false;
            this.ready = false;
            this._start = false;
            this.config = {};
            this.config.start = object.opacity;
            this.config.step = Math.round(object.opacity/time); //timer.getMaxValue()
            this._refreshConfig();
        }

        start() {
            this.ready = false;
            this._start = true;
        }

        reset() {
            this.ready = true;
            this._main.opacity = this.config.start;
        }

        stop() {
            this._start = false;
        }

        isStarted() {
            return (this._start == true);
        }

        isReady() {
            return (this.ready == true);
        }

        setToUp() {
            //LOG.p("toUP");
            this.mode = 0;
            this._start = false;
            this._refreshConfig();
        }

        setToDown() {
            //LOG.p("toDWN");
            this.mode = 1;
            this._start = false;
            this._refreshConfig();
        }

        setRepeat() {
            this.repeat = true;
        }

        isUp() {
            return (this.mode == 0);
        }

        update() {
            if(this._start == false) return;

            if(this.isUp())
                this._updateUp();
            else
                this._updateDown();

            if(this.isReady() && this.repeat == true) {
                if(this.isUp()) {
                    this.setToDown();
                    this.start();
                } else {
                    this.setToUp();
                    this.start();
                }
            }
        }

        //PRIVATE
        _refreshConfig() {
            if(this.isUp()) {
                this.config.toV = this.config.start;
                this.config.from = 0;
            } else {
                this.config.toV = 0;
                this.config.from = this.config.start;
            }
            this._main.opacity = this.config.from;
        }

        _updateUp() {
            if(this.ready) return;

            if(this._main.opacity < (this.config.toV - this.config.step)) {
                this._main.opacity += this.config.step;
            } else {
                this._main.opacity = this.config.toV;
                this.ready = true;
            }
        }

        _updateDown() {
            if(this.ready) return;

            if(this._main.opacity > (this.config.toV + this.config.step)) {
                this._main.opacity -= this.config.step;
            } else {
                this._main.opacity = this.config.toV;
                this.ready = true;
            }
        }
    }
    AlphaABS.LIB.UIObject_OpacitySwing = UIObject_OpacitySwing;
    //END UIObject_OpacitySwing
//------------------------------------------------------------------------------

//UIObject_ABSSkillInfo
//------------------------------------------------------------------------------
    function UIObject_ABSSkillInfo() {
        this.initialize.apply(this, arguments);
    }

    UIObject_ABSSkillInfo.prototype = Object.create(Sprite.prototype);
    UIObject_ABSSkillInfo.prototype.constructor = UIObject_ABSSkillInfo;

    UIObject_ABSSkillInfo.prototype.initialize = function(absSkill, isWeaponMode) {
        Sprite.prototype.initialize.call(this);

        this.width = 200;
        this.height = 600;
        this._skill = absSkill;
        this.bitmap = new Bitmap(this.width, this.height);
        this._descriptionText = null;
        isWeaponMode = SDK.check(isWeaponMode, false);
        this._weaponMode = isWeaponMode;

        this.refresh();
    };

    UIObject_ABSSkillInfo.prototype.refresh = function() {
        this.bitmap.clear();

        if(this._descriptionText) {
            this.removeChild(this._descriptionText);
            this._descriptionText.destroy();
            this._descriptionText = null;
        }

        if(this._weaponMode)
        	this._skill = $gamePlayer.battler().skillABS_attack();

        this._deltaY = 0;
        this._deltaX = 0;
        this._textPosition = 'center';
        if(this._skill == null) return;
        this._createBackground();
        this._drawInfo();
        this.height = this._deltaY + 8;
    }

    UIObject_ABSSkillInfo.prototype._createBackground = function() {
        this.bitmap.fillAll(UIObject_ABSSkillInfo.COLOR_BACKGROUND.CSS);
    };

    UIObject_ABSSkillInfo.prototype._drawInfo = function() {
        this._nextLine(4);
        this._drawName();
        this._drawLine(4,4);
        this._setFontSize(16);
        this._deltaX = 8;
        this._drawCost();
        this._nextLine(4);
        this._drawTargetType();
        this._nextLine(10);
        this._drawABSInfo();
        this._drawDescription();
        this._drawRecharge();
        this._drawDamageFormula();
    };

    UIObject_ABSSkillInfo.prototype._drawName = function() {
        this._setFontSize(24);
        this._setColor(Color.WHITE);
        this.bitmap.outlineWidth = 2;
        this.bitmap.outlineColor = Color.BLACK.CSS;
        var name = this._skill.name();
        if(this._weaponMode) {
        	if($gamePlayer.battler().weapons().length > 0) {
        		name = $gamePlayer.battler().weapons()[0].name;
        	}
        }
        this._drawText(name, this.width, 32);
        this._nextLine(28);
        this.bitmap.outlineWidth = 1;
    };

    UIObject_ABSSkillInfo.prototype._drawCost = function() {
        if(this._skill.isItem()) return;
        var mvSkill = this._skill.skill();
        if(mvSkill.mpCost > 0) {
            this._drawPair(UIObject_ABSSkillInfo.COLOR_TEXT, TextManager.mpA + " ", UIObject_ABSSkillInfo.COLOR_VALUE, mvSkill.mpCost, 'left');
            this._nextLine();
        }
        if(mvSkill.tpCost > 0) {
            this._drawPair(UIObject_ABSSkillInfo.COLOR_TEXT, TextManager.tpA + " ", UIObject_ABSSkillInfo.COLOR_VALUE, mvSkill.tpCost, 'left');
            this._nextLine();
        }
    }

    UIObject_ABSSkillInfo.prototype._drawTargetType = function() {
        var targetText = this._extractTargetMode();
        if(targetText != "") {
            var offset = 10;
            this._deltaX += offset;
            this._drawRectInner(this.width - (offset * 2), 30);
            this._textPosition = 'center';
            this._setColor(UIObject_ABSSkillInfo.COLOR_TEXT);
            this._drawText(targetText, this.width - (offset * 2) - this._deltaX, 24);
            this._nextLine();
        }
    }

    UIObject_ABSSkillInfo.prototype._drawABSInfo = function() {
        var text_color = new Color(128 , 128 , 255);
        var value_color = UIObject_ABSSkillInfo.COLOR_VALUE.reAlpha(220);

        if(this._skill.isRadiusType() && !this._skill.isNeedTarget()) {
            this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RADIUS[SDK.isRU()], value_color, this._skill.radius, 'left');
            this._nextLine();
        } else {
            if(this._skill.range > 0) {
                if(this._skill.radius > 0) {
                    this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RANGE2[SDK.isRU()], value_color, this._skill.range, 'left');
                    this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RADIUS[SDK.isRU()], value_color, this._skill.radius, 'right');
                } else {
                    this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RANGE[SDK.isRU()], value_color, this._skill.range, 'left');
                }
                this._nextLine();
            } else {
            	if(this._skill.range == 0 && this._skill.isNeedTarget()) {
            		this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RANGE2[SDK.isRU()], value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_MELEE[SDK.isRU()], 'left');
            		this._nextLine();
            	}
            }
        }

        if(this._skill.isNeedCast()) {
            this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_CAST[SDK.isRU()], value_color,
                SDK.decimalAdjust('round',this._skill.castTime/AlphaABS.BattleManagerABS.TURN, -1) +
                AlphaABS.SYSTEM.STRING_SKILL_INFO_SEC[SDK.isRU()], 'left');
            this._nextLine();
        }

        if(this._skill.getReloadTime() > 0 || this._skill.isNeedReloadParam()) {
            var reloadTime = this._skill.getReloadTime();
            if(this._skill.isNeedReloadParam()) {
                reloadTime += $gamePlayer.battler()._calculateABSSkillReloadParam(this._skill.reloadParam);
            }
            reloadTime = SDK.decimalAdjust('round',reloadTime/AlphaABS.BattleManagerABS.TURN, -1);
            this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_COOLDOWN[SDK.isRU()], value_color, reloadTime +
                AlphaABS.SYSTEM.STRING_SKILL_INFO_SEC[SDK.isRU()], 'left');
            this._nextLine();
        }
    };

    UIObject_ABSSkillInfo.prototype._drawDescription = function() {
        var descriptionText = this._skill.skill().description;
        if(this._skill.skillId == $gamePlayer.battler().attackSkillId() && descriptionText =="") {
            if($gamePlayer.battler().weapons().length > 0){
            	  var playerWeapon = $gamePlayer.battler().weapons()[0];
                descriptionText = playerWeapon.description;
            if(playerWeapon.meta.noDescription && playerWeapon.meta.noDescription == "1") {
            	descriptionText = ""; //used weapon instead
            }
          }
        }

        if(descriptionText == "") return;
        if(this._skill.noDescription == true) return;

        this._deltaX = 0;
        this._drawLine(4,2);
        this._deltaX = 4;

        this._setColor(UIObject_ABSSkillInfo.COLOR_TEXT);
        this._textPosition = 'center';
        this._drawText(AlphaABS.SYSTEM.STRING_SKILL_INFO_DESCRIPTION[SDK.isRU()], this.width - this._deltaX, 24);
        this._nextLine(26);

        this._descriptionTextWidth = this.width - (this._deltaX * 4);

        var style = this._getDescriptionStyle(this._descriptionTextWidth);

        this._descriptionText = new PIXI.Text(descriptionText, style);
        this._descriptionText.x = this._deltaX + 2;
        this._descriptionText.y = this._deltaY + 2;
        this.addChild(this._descriptionText);

        this._drawRectInner(this.width - this._deltaX, this._descriptionText.height + 8);

        this._nextLine(this._descriptionText.height + 12);
    }

    UIObject_ABSSkillInfo.prototype._drawDamageFormula = function() {
        var mvSkill = this._skill.skill();
        var damage = mvSkill.damage;
        if(damage.type == 0) return;

        this._deltaX = 0;
        this._drawLine(4,2);
        this._deltaX = 12;

        var damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_DAMAGE[SDK.isRU()];
        switch(damage.type) {
            case 1:
                damageTypeText += TextManager.hpA;
                break;
            case 2:
                damageTypeText += TextManager.mpA;
                break;
            case 3:
                damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_RECOVER[SDK.isRU()] + TextManager.hpA;
                break;
            case 4:
                damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_RECOVER[SDK.isRU()] + TextManager.mpA;
                break;
            case 5:
                damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_DRAIN[SDK.isRU()] + TextManager.hpA;
                break;
            case 6:
                damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_DRAIN[SDK.isRU()] + TextManager.mpA;
                break;
        }

        var damageValueText = '';

        var isForUser = (this._skill.type == 0 && !this._skill.isNeedTarget());
        var isNeedTarget = damage.formula.contains('b');
        var tempTarget = null;

        if(isNeedTarget) {
            if(isForUser)
                tempTarget = $gamePlayer.battler();
            else
                tempTarget = AlphaABS.BattleManagerABS.getPlayerTarget();

            if(tempTarget == null) {
                damageValueText = AlphaABS.SYSTEM.STRING_SKILL_INFO_TARGET[SDK.isRU()];
            } else
                damageValueText = this._getPotentialDamage(tempTarget.battler());

        } else {
            damageValueText = this._getPotentialDamage($gamePlayer.battler());
        }

        this._drawPair(UIObject_ABSSkillInfo.COLOR_TEXT, damageTypeText + " ", UIObject_ABSSkillInfo.COLOR_VALUE, damageValueText, 'center');
        this._nextLine();
    }

    UIObject_ABSSkillInfo.prototype._drawRecharge = function() {
        if(this._skill.isNeedAmmo() || this._skill.isStackType()) {
            this._deltaX = 0;
            this._drawLine(4,2);
            this._deltaX = 12;
        }

        this._setFontSize(14);
        var value_color = new Color(252 , 157 , 101);
        if(this._skill.isNeedAmmo()) {
            var ammoName = $dataItems[this._skill.ammo].name;
            this._drawPair(value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_USE[SDK.isRU()], UIObject_ABSSkillInfo.COLOR_VALUE, ammoName, 'left');
            this._drawPair(value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_HAS[SDK.isRU()], UIObject_ABSSkillInfo.COLOR_VALUE, $gameParty.numItems($dataItems[this._skill.ammo]), 'right');
            this._nextLine();
        }
        if(this._skill.isStackType()) {
            var stackText = this._skill._currentStack + '/' + this._skill.stack;
            this._drawPair(value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_CHARGES[SDK.isRU()], UIObject_ABSSkillInfo.COLOR_VALUE, stackText, 'left');
            this._nextLine();
            var reloadStack = SDK.decimalAdjust('round',this._skill.stackTime/AlphaABS.BattleManagerABS.TURN, -1) + AlphaABS.SYSTEM.STRING_SKILL_INFO_SEC[SDK.isRU()];
            this._drawPair(value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RELOADCHR[SDK.isRU()], UIObject_ABSSkillInfo.COLOR_VALUE, reloadStack, 'left');
            this._nextLine();
        }
        this._setFontSize(18);
    }

    UIObject_ABSSkillInfo.prototype._setFontSize = function(size) {
        this.bitmap.fontSize = size;
    }

    UIObject_ABSSkillInfo.prototype._setColor = function(color) {
        this.bitmap.textColor = color.CSS;
    }

    UIObject_ABSSkillInfo.prototype._drawLine = function(offsetTop, offsetBottom) {
        var offsetTop = SDK.check(offsetTop, 0);
        var offsetBottom = SDK.check(offsetBottom, 0);
        this._deltaY += offsetTop;
        this._deltaX += this._lineOffsetX();
        this._drawRect(this.width - (this._deltaX + this._lineOffsetX()), 1, Color.WHITE.reAlpha(50));
        this._deltaX -= this._lineOffsetX();
        this._deltaY += offsetBottom;
    }

    UIObject_ABSSkillInfo.prototype._drawPair = function(color1, text1, color2, text2, position) {
        var textOffset = 6;
        var offset = 0;
        var dx = this._deltaX;
        var width = this.width - (this._deltaX * 2);
        if(position != 'center') {
            width = this.bitmap.measureTextWidth(text1) + this.bitmap.measureTextWidth(text2) + textOffset;
        }

        if(position == 'right') {
            this._deltaX = this.width - width - this._deltaX;
        } else {
            offset = this._deltaX - textOffset;
        }

        var oldColor = this.bitmap.textColor;
        this._textPosition = 'left';
        this._setColor(color1);
        this._drawText(text1, width - offset);
        this._textPosition = 'right';
        this._setColor(color2);
        this._drawText(text2, width - offset);

        this.bitmap.textColor = oldColor;
        this._textPosition = 'center';

        if(position == 'right')
            this._deltaX = dx;
    }

    UIObject_ABSSkillInfo.prototype._drawRect = function(width, height, color) {
        this.bitmap.fillRect(this._deltaX, this._deltaY, width, height, color.CSS);
    }

    UIObject_ABSSkillInfo.prototype._drawRectInner = function(width, height) {
        this._deltaX -= 1;
        this._deltaY -= 1;
        this._drawRect(width - this._deltaX, 1, UIObject_ABSSkillInfo.COLOR_BACKGROUND);
        this._drawRect(1, height + 1, UIObject_ABSSkillInfo.COLOR_BACKGROUND);
        this._deltaX += 1;
        this._deltaY += 1;
        this._drawRect(width - this._deltaX, height, UIObject_ABSSkillInfo.COLOR_BACKGROUND.getLightestColor(30));
    }

    UIObject_ABSSkillInfo.prototype._drawText = function(text, width, height) {
        var height = SDK.check(height, 24);
        var width = SDK.check(width, this.width);
        this.bitmap.drawText(text, this._deltaX, this._deltaY, width, height, this._textPosition);
    }

    UIObject_ABSSkillInfo.prototype._nextLine = function(offset) {
        var offset = SDK.check(offset, 24);
        this._deltaY += offset;
    }

    UIObject_ABSSkillInfo.prototype._lineOffsetX = function() {
        return 18;
    }

    UIObject_ABSSkillInfo.prototype._getDescriptionStyle = function(width) {
        var style = {
            fontStyle: 'italic',
            fontFamily:'Arial',
            fontSize: '12px',
            fill : '#FFFFFF',
            stroke : '#000000',
            strokeThickness : 1,
            dropShadow : true,
            dropShadowColor : '#000000',
            dropShadowAngle : Math.PI / 6,
            dropShadowDistance : 2,
            wordWrap : true,
            wordWrapWidth : width
        };
        return style;
    };

    UIObject_ABSSkillInfo.prototype._extractTargetMode = function() {
        var targetText = "";
        switch(this._skill.type) {
            case 0:
                if(this._skill.isNeedTarget()) {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_ONTARGET[SDK.isRU()];
                } else {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_ONUSER[SDK.isRU()];
                }
                break;
            case 1:
                if(this._skill.isVectorTypeR()) {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_AREA[SDK.isRU()];
                } else {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_ONTARGET[SDK.isRU()];
                }
                break;
            case 2:
                if(this._skill.isNeedTarget()) {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_AREA[SDK.isRU()];
                } else {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_CIRCLE[SDK.isRU()];
                }
                break;
            case 3:
                targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_ZONE[SDK.isRU()];
                break;
            default:
        }
        return targetText;
    };

    UIObject_ABSSkillInfo.prototype._getPotentialDamage = function(target) {
        var damageValueText = '';
        var action = new Game_Action($gamePlayer.battler());
        if(this._skill.isItem()) {
            action.setItem(this._skill.skill().id);
        } else {
            action.setSkill(this._skill.skill().id);
        }
        var damageValue = Math.abs(action.evalDamageFormula(target));
        if(damageValue > 0 && this._skill.skill().damage.variance > 0) {
            var percent = SDK.percent(damageValue, this._skill.skill().damage.variance);
            var min = damageValue - percent;
            var max = damageValue + percent;
            damageValueText = min + '-' + max;
        } else {
            damageValueText = damageValue;
        }
        return damageValueText;
    };

    SDK.setConstant(UIObject_ABSSkillInfo, 'COLOR_TEXT', Color.AQUA.reAlpha(200));
    SDK.setConstant(UIObject_ABSSkillInfo, 'COLOR_VALUE', Color.ORANGE.reAlpha(200));
    SDK.setConstant(UIObject_ABSSkillInfo, 'COLOR_BACKGROUND', Color.BLACK.reAlpha(200));

    AlphaABS.LIB.UIObject_ABSSkillInfo = UIObject_ABSSkillInfo;
    //END UIObject_ABSSkillInfo
//------------------------------------------------------------------------------

//UIObject_HelpHover
//------------------------------------------------------------------------------
	function UIObject_HelpHover() {
	    this.initialize.apply(this, arguments);
	}

	UIObject_HelpHover.prototype = Object.create(Sprite.prototype);
	UIObject_HelpHover.prototype.constructor = UIObject_HelpHover;

	UIObject_HelpHover.prototype.initialize = function(width, height) {
	    Sprite.prototype.initialize.call(this);

	    this.setFrame(0,0,width, height);
	    this._hoverHelp = new Sprite_Ext2(120);
	    this._hoverHelp.bitmap = new Bitmap(width, height);

	    this._skillInfo = null;
	    this._swing = null;
	    this._skillABS = null;
	    this._infoVisible = false;
	    this._updateTimer = new Game_TimerABS();
	    this._updateTimer.start(60);
	    this._weaponMode = false;

	    this.addChild(this._hoverHelp);

	    this._setup();
	};

	UIObject_HelpHover.prototype.terminate = function() {
		this._hoverHelp.terminate();
	};

	UIObject_HelpHover.prototype.update = function() {
		Sprite.prototype.update.call(this);
		this._hoverHelp.update();
		if(this._swing)
			this._swing.update();

		if(this._infoVisible === true) {
			this._updateTimer.update();
			if(this._updateTimer.isReady()) {
				this._skillInfo.refresh();
				this._updateTimer.reset();
			}
		}
	};

	UIObject_HelpHover.prototype.setHover = function(hover) {
		this._hover = hover;
	};

	UIObject_HelpHover.prototype.setSkillIndex = function(index) {
		this._skillABS = $gamePlayer.battler().uiPanelSkills()[index];
	};

	UIObject_HelpHover.prototype.setSkillABS = function(skillABS) {
		this._skillABS = skillABS;
	};

	UIObject_HelpHover.prototype.setWeaponMode = function() {
		this._weaponMode = true;
	}

	//PRIVATE
	UIObject_HelpHover.prototype._setup = function() {
		this._hoverHelp.setReadyHandler(function(){
			if(!this._isSkillExist()) return;

			this._createSkillInfo();
			this._createSwing();
			this._swing.start();

			if(this._hover)
            	this._hover.freeze();

            this._infoVisible = true;
        }.bind(this));

        this._hoverHelp.setOutHandler(function(){
        	if(!this._isSkillExist()) return;

        	if(this._skillInfo) {
	            this._skillInfo.visible = false;
	            this.removeChild(this._skillInfo);
	            this._skillInfo = null;
        	}
            this._swing.stop();
            if(this._hover)
            	this._hover.free();

            this._infoVisible = false;
        }.bind(this));
	};

	UIObject_HelpHover.prototype._createSkillInfo = function() {
		if(this._weaponMode) {
			this._skillABS = $gamePlayer.battler().skillABS_attack();
		}
		this._skillInfo = new AlphaABS.LIB.UIObject_ABSSkillInfo(this._skillABS, this._weaponMode);
		ABSUtils.linkSprite(this._hoverHelp, this._skillInfo);
		this.addChild(this._skillInfo);
	};

	UIObject_HelpHover.prototype._createSwing = function() {
		this._swing = new AlphaABS.LIB.UIObject_OpacitySwing(this._skillInfo, 30);
        this._swing.setToUp();
	};

	UIObject_HelpHover.prototype._isSkillExist = function() {
		return (this._skillABS != null);
	};
	AlphaABS.LIB.UIObject_HelpHover = UIObject_HelpHover;
	//END UIObject_HelpHover
//------------------------------------------------------------------------------

//UIObject_InputCircle
//------------------------------------------------------------------------------
    function UIObject_InputCircle() {
        this.initialize.apply(this, arguments);
    }

    UIObject_InputCircle.prototype = Object.create(Sprite.prototype);
    UIObject_InputCircle.prototype.constructor = UIObject_InputCircle;

    UIObject_InputCircle.prototype.initialize = function(x,y, isOpen) {
        Sprite.prototype.initialize.call(this);
        this.x = x;
        this.y = y;

        //Circle
        this._isOpen = SDK.check(isOpen, true);
        this.isClicked = false;
        this.isSelected = false;
        this.icons = [];
        this.segments = [];
        this.helps = [];
        this._helpsSprites = [];
        this.optionLightTimer = 0;
        this._moveSpeedX = 1;

        this.helpShowIn = false;
        this._helpIsHidden = true;

        var radius = this._radius_max()
        if(!this._isOpen) {
            this._set_opacity(0)
            radius = this._radius_min()
        }

        //Funcs
        this._create_segments();
        this._create_icons(this._get_standart_icon_pack());
        this._move_segments(radius);
    };

    UIObject_InputCircle.prototype.setIcons = function(arrayOfIndexes)
    {
        this._create_icons(arrayOfIndexes);
        if(!this._isOpen) this._set_opacity(0);
    }

    UIObject_InputCircle.prototype.setSpeed = function(speed) {
        this._moveSpeedX = speed;
    }

    UIObject_InputCircle.prototype.setHelps = function(arrayOfHelps)
    {
        this.helps[0] = arrayOfHelps[0] || null;
        this.helps[1] = arrayOfHelps[1] || null;
        this.helps[2] = arrayOfHelps[2] || null;
        this.helps[3] = arrayOfHelps[3] || null;
        if(this.helpShowIn) {
            this._helpIsHidden = true;
        }
        this._create_helps();
    }

    UIObject_InputCircle.prototype.isOpen = function() { return this._isOpen;}

    UIObject_InputCircle.prototype.open = function()
    {
        if(this._isOpen) return;
        if(this.isAnimate) return;
        this.r = this._radius_min();
        this._set_opacity(0);
        this.isAnimate = true;
    }

    UIObject_InputCircle.prototype.close = function()
    {
        if(!this._isOpen) return;
        if(this.isAnimate) return;
        this.r = this._radius_max();
        this._set_opacity(255);
        this.isAnimate = true;
        this._hide_help();
    }

    UIObject_InputCircle.prototype.hideAll = function()
    {
        SDK.times(4, function(i) { this.hideSegment(i); }.bind(this));
    }

    UIObject_InputCircle.prototype.enableAllIcons = function()
    {
        SDK.times(4, function(i) { this.disableIcon(i, false);}.bind(this));
    }

    UIObject_InputCircle.prototype.diselectAllIcons = function()
    {
        this._reset_colors();
        this.isSelected = false;
    }

    UIObject_InputCircle.prototype.unHideSegments = function()
    {
        SDK.times(4, function(i) { this.hideSegment(i, false); }.bind(this));
    }

    UIObject_InputCircle.prototype.reset = function()
    {
        this.unHideSegments();
        this.diselectAllIcons();
        this.enableAllIcons();
    }

    UIObject_InputCircle.prototype.showHelp = function()
    {
        this.helpShowIn = true;
    }

    UIObject_InputCircle.prototype.hideHelp = function()
    {
        this.helpShowIn = false;
    }

    UIObject_InputCircle.prototype.addListener = function(index, func)
    {
        this.segments[index].setClickHandler(func);
    }

    UIObject_InputCircle.prototype.click = function(index)
    {
        this.diselectAllIcons();
        this.optionLightTimer = 0;
        this.isClicked = true;
        this.segments[index].setBlendColor(UIObject_InputCircle.COLOR_CLICK);
    }

    UIObject_InputCircle.prototype.select = function(index)
	{
		this.diselectAllIcons();
		this.segments[index].setBlendColor(UIObject_InputCircle.COLOR_SELECTED);
		this.isSelected = true;
	}

	UIObject_InputCircle.prototype.hideSegment = function(index, isHided)
	{
		if(isHided === undefined)
			isHided = true;
		this.segments[index].visible = !isHided;
		if(this.icons[index])
			this.icons[index].visible = !isHided;

		if(this._helpsSprites[index])
		{
			if(isHided == true) {
				this._helpsSprites[index].visible = false;
			} else {
				if(this.helpAllwaysShow || this.helpShowIn)
					this._helpsSprites[index].visible = true;
			}
		}
	}

    UIObject_InputCircle.prototype.disableIcon = function(index, isDisabled)
	{
		if(isDisabled === undefined)
			isDisabled = true;
		if(!this.icons[index])
			return;
		else
		{
			if(isDisabled) {
				this.icons[index].setBlendColor(UIObject_InputCircle.COLOR_DISABLED);
			}
			else {
				this.icons[index].setBlendColor(Color.NONE);
			}
		}
	}

    UIObject_InputCircle.prototype.diselectAllIcons = function()
    {
        this._reset_colors();
        this.isSelected = false;
    }

    UIObject_InputCircle.prototype.update = function()
    {
        this._update_animation();
        this._update_click();
        this.segments.forEach(function(i){
            i.update();
        });
        this._update_help();
    }

    //PRIVATE

    UIObject_InputCircle.prototype._create_segments = function() {
        var csT = new Sprite_Button();
        csT.bitmap = ImageManager.loadPictureABS('CircleSegment_small');
        var csD = new Sprite_Button();
        csD.bitmap = ImageManager.loadPictureABS('CircleSegment_small_down');
        var csL = new Sprite_Button();
        csL.bitmap = ImageManager.loadPictureABS('CircleSegment_small_L');
        var csR = new Sprite_Button();
        csR.bitmap = ImageManager.loadPictureABS('CircleSegment_small_R');
        this.segments = [csT, csR, csD, csL];
        this.segments.forEach(function(x) { this.addChild(x); }.bind(this));
    }

    UIObject_InputCircle.prototype._create_icons = function(arrayOfIndexes) {
        this.icons.forEach(function(x){
            this.removeChild(x);
            x.visible = false;
        }.bind(this));

        this.icons = [];

        for(var i = 0; i<4; i++) {
            if(arrayOfIndexes[i] !== undefined)
            {
                this.icons[i] = new Sprite(this._get_icon_bitmap(arrayOfIndexes[i]));
                //this.icons[i].anchor = this.segments[i].anchor;
                this._config_icon(i, this.icons[i]);
                this.segments[i].addChild(this.icons[i]);
            }
            else {
                this.icons[i] = undefined;
            }
        }
    }

    UIObject_InputCircle.prototype._move_segments = function(radius) {
        radius = SDK.check(radius, this._radius_max());

        //TOP
        //this.segments[0].anchor.x = 0.5;
        this.segments[0].x = -this._segment_HW()/2;
        this.segments[0].y = -radius;

        //DOWN
        //this.segments[2].anchor.x = 0.5;
        //this.segments[2].anchor.y = 1;
        this.segments[2].x = this.segments[0].x;
        this.segments[2].y = radius - this._segment_HH();

        //LEFT
        //this.segments[3].anchor.y = 0.5;
        this.segments[3].x = -radius;
        this.segments[3].y = -this._segment_HW()/2;

        //RIGHT
        //this.segments[1].anchor.x = 1;
        //this.segments[1].anchor.y = 0.5;
        this.segments[1].x = radius - this._segment_HH();
        this.segments[1].y = this.segments[3].y;
    }

    UIObject_InputCircle.prototype._config_icon = function(index, icon) {
        switch(index) {
            case 0:
                icon.anchor.x = 0.5;
                icon.x = this._segment_HW()/2;
                break;
            case 1:  //RIGHT
                icon.anchor.x = 1;
                icon.anchor.y = 0.5;
                icon.x = this._segment_HH();
                icon.y = this._segment_HW()/2;
                break;
            case 2:  //DOWN
                icon.anchor.x = 0.5;
                icon.anchor.y = 1;
                icon.x = this._segment_HW()/2;
                icon.y = this._segment_HH();
                break;
            case 3:
                icon.anchor.y = 0.5;
                icon.y = this._segment_HW()/2;
                break;
        }
    }

    UIObject_InputCircle.prototype._create_helps = function()
    {
        this._helpsSprites.forEach(function(item){
            if(item!=null) {
                item.parent.removeChild(item);
            }
        }.bind(this));
        this._helpsSprites = [];

        //UP
        if(this.helps[0] != null) {
            var bitmap = new Bitmap(this._segment_HW(), this._segment_HH());
            bitmap.addLoadListener(function() {
                //bitmap.fillAll(Color.RED);
                bitmap.drawText(this.helps[0], 0, 0, bitmap.width, bitmap.height, 'center');
            }.bind(this));
            var sprite = new Sprite(bitmap);
            sprite.visible = false;
            sprite.y = -this._segment_HH();
            this.segments[0].addChild(sprite);
            this._helpsSprites[0] = sprite;
        }
        else {
            this._helpsSprites[0] = null;
        }
        //LEFT
        if(this.helps[3] != null) {
            var bitmap = new Bitmap(this._segment_HW(), this._segment_HH());
            bitmap.addLoadListener(function() {
                //bitmap.fillAll(Color.RED);
                bitmap.drawText(this.helps[3], 0, 0, bitmap.width, bitmap.height, 'right');
            }.bind(this));
            var sprite = new Sprite(bitmap);
            sprite.visible = false;
            sprite.y = this._segment_HW()/2;
            sprite.x = -4;
            sprite.anchor.y = 0.5;
            sprite.anchor.x = 1;
            this.segments[3].addChild(sprite);
            this._helpsSprites[3] = sprite;
        }
        else {
            this._helpsSprites[3] = null;
        }
        //DOWN
        if(this.helps[2] != null) {
            var bitmap = new Bitmap(this._segment_HW(), this._segment_HH());
            bitmap.addLoadListener(function() {
                //bitmap.fillAll(Color.RED);
                bitmap.drawText(this.helps[2], 0, 0, bitmap.width, bitmap.height, 'center');
            }.bind(this));
            var sprite = new Sprite(bitmap);
            sprite.visible = false;
            sprite.y = this._segment_HH();
            this.segments[2].addChild(sprite);
            this._helpsSprites[2] = sprite;
        }
        else {
            this._helpsSprites[2] = null;
        }
        //RIGHT
        if(this.helps[1] != null) {
            var bitmap = new Bitmap(this._segment_HW(), this._segment_HH());
            bitmap.addLoadListener(function() {
                //bitmap.fillAll(Color.RED);
                bitmap.drawText(this.helps[1], 0, 0, bitmap.width, bitmap.height, 'left');
            }.bind(this));
            var sprite = new Sprite(bitmap);
            sprite.anchor.y = 0.5;
            sprite.y = this._segment_HW()/2;
            sprite.x = this._segment_HH() + 4;
            sprite.visible = false;
            this.segments[1].addChild(sprite);
            this._helpsSprites[1] = sprite;
        }
        else {
            this._helpsSprites[1] = null;
        }

    }

    UIObject_InputCircle.prototype._update_animation = function()
    {
        if(!this.isAnimate) return;
        if(this.isClicked) return;

        this._move_segments(this.r);
        if(!this._isOpen)
        {
            if(this.opacity <= 250) this._change_opacity(5);
            if (this.r < this._radius_max()) this.r += this._moveSpeedX;
            if (this.r >= this._radius_max()) {
                this._isOpen = true;
                this.isAnimate = false;
                this._set_opacity(255);
            }
        }
        else
        {
            if(this.opacity > 5) this._change_opacity(5, false);
            if (this.r > this._radius_min()) this.r -= this._moveSpeedX;
            if (this.r <= this._radius_min()) {
                this._isOpen = false;
                this.isAnimate = false;
                this._set_opacity(0);
            }
        }
    }

    UIObject_InputCircle.prototype._update_click = function()
    {
        if (this.optionLightTimer < UIObject_InputCircle.CLICK_TIME)
            this.optionLightTimer += 1;

        if(this.optionLightTimer == UIObject_InputCircle.CLICK_TIME)
        {
            if(!this.isSelected)
                this._reset_colors();
            this.isClicked = false;
        }
    }

    UIObject_InputCircle.prototype._change_opacity = function(value, isAdd)
    {
        isAdd = SDK.check(isAdd, true);
        var op = this.opacity;
        if(isAdd) {
            op += value;
        } else {
            op -= value;
        }
        this._set_opacity(op);
    }

    UIObject_InputCircle.prototype._update_help = function()
    {
        if(this.isAnimate)
        {
            this._hide_help();
        }
        else {
            if(this._isOpen)
                if(this.helpShowIn)
                    this._show_help();
                else
                    this._hide_help();
            else
                this._hide_help();
        }
    }

    UIObject_InputCircle.prototype._show_help = function()
    {
        if(this._helpIsHidden == false)
            return;

        for(var i = 0; i<4; i++) {
            let sprite = this._helpsSprites[i] || null;
            if(sprite !=null) {
                sprite.visible = (this.segments[i].visible == true);
            }
        }

        this._helpIsHidden = false;
    }

    UIObject_InputCircle.prototype._hide_help = function()
    {
        if(this._helpIsHidden == true)
            return;
        for(var i = 0; i<4; i++) {
            let sprite = this._helpsSprites[i] || null;
            if(sprite !=null) {
                sprite.visible = false;
            }
        }
        this._helpIsHidden = true;
    }

    UIObject_InputCircle.prototype._set_opacity = function(value)
    {
        this.opacity = value;
        if(value == 0)
        	this.visible = false;
        else
        	this.visible = true;
    }

    UIObject_InputCircle.prototype._get_standart_icon_pack = function() {
        return [null,null,null,null];
    }

    UIObject_InputCircle.prototype._get_icon_bitmap = function(index)
    {
        if(index == null)
            return ImageManager.loadEmptyBitmap();
        else
            return ImageManager.getIcon('img/ABS/', index, this._icon_size());
    }

    UIObject_InputCircle.prototype._reset_colors = function()
    {
        this.segments.forEach(function(x) { x.setBlendColor(Color.NONE); });
    }

    //VALUES

    UIObject_InputCircle.prototype._segment_HW = function()
    {
        return 78;
    }

    UIObject_InputCircle.prototype._segment_HH = function()
    {
        return 34;
    }

    UIObject_InputCircle.prototype._segment_VW = function()
    {
        return this._segment_HH();
    }

    UIObject_InputCircle.prototype._segment_VH = function()
    {
        return this._segment_HW();
    }

    UIObject_InputCircle.prototype._radius_max = function()
    {
        return 66;
    }

    UIObject_InputCircle.prototype._radius_min = function()
    {
        return 58;
    }

    UIObject_InputCircle.prototype._icon_size = function()
    {
        return 24;
    }

    SDK.setConstant(UIObject_InputCircle, 'CLICK_TIME', 5);                               //Время анимции клика (в кадрах)
    SDK.setConstant(UIObject_InputCircle, 'COLOR_CLICK', new Color(98,225,236,220));      //Цвет при клике на сегмент
    SDK.setConstant(UIObject_InputCircle, 'COLOR_SELECTED', new Color(164,255,164,220));  //Цвет выбраного сегмента
    SDK.setConstant(UIObject_InputCircle, 'COLOR_DISABLED', new Color(89,89,89,120));     //Цвет отключённого сегмента

    AlphaABS.LIB.UIObject_InputCircle = UIObject_InputCircle;

    //END UIObject_InputCircle
//------------------------------------------------------------------------------

	class Sprite_UserUI extends Sprite
	{
		constructor() {
			super(ImageManager.loadPictureABS("User")); //ImageManager.loadPicture("User")

			this.faceSize = 90;
			this.faceX = 8;
			this.faceY = 8;
			this._oldLevel = 1;

			this._init();
			this._updateABS();

			this._thread = setInterval(function() { this._updateABS(); }.bind(this), 10);
		}

		refresh() { //Этот метод вызывается вручную
			this._drawPlayerFace();
		}


		terminate() {
			clearInterval(this._thread);
		}

		//PRIVATE
		_init() {
			this._createPlayerFace();
			this._createInBattleInfo();
			this._createPlayerInfo();
			this._createPlayerParams();
		}

		_updateABS() {

			 //@opt Эту часть можно вызывать только когда начинается и заканчивается битва
			if($gamePlayer.inBattle()) {
				this.spriteBattleMask.showMaskOne(30);
				this.spriteInfo_Battle.visible = true;
				this.spriteInfo_LevelText.visible = false;
			} else {
				this.spriteInfo_Battle.visible = false;
				this.spriteInfo_LevelText.visible = true;

				if(this._oldLevel != $gamePlayer.battler().level) {
					this._drawPlayerLevel();
				}
			}
			this.spriteBattleMask.update();

			if(this.hpBar) {
				this.hpBar.update();
				this.mpBar.update();
				if(this.tpBar) {
					this.tpBar.update();
				}
				if(this.xpBar)
					this.xpBar.update();
			}

			//@opt Можно проверять, вызван ли был показ, а не постоянно обновлять
			//this.spriteAttackBar.update();
		}

		_createPlayerFace() {
			this.spriteFace = new Sprite(new Bitmap(this.faceSize,this.faceSize));
			this._drawPlayerFace();
			this.spriteFace.x = this.faceX + this.faceSize;
			this.spriteFace.scale.x *= - 1;
		    this.addChild(this.spriteFace);
		}

		_drawPlayerFace() {
			this.spriteFace.bitmap.clear();
			var faceName = $gamePlayer.battler().faceName();
			var faceIndex = $gamePlayer.battler().faceIndex();
			var bitmap = ImageManager.loadFace(faceName);
			bitmap.addLoadListener(function(){
				var pw = Window_Base._faceWidth;
			    var ph = Window_Base._faceHeight;
			    var sx = faceIndex % 4 * pw;
			    var sy = Math.floor(faceIndex / 4) * ph;
			    this.spriteFace.bitmap.blt(bitmap, sx, sy, pw, ph, this.faceX, this.faceY, this.faceSize, this.faceSize);
			}.bind(this));
		}

		_drawPlayerLevel() {
			this._oldLevel = $gamePlayer.battler().level;
			this.spriteInfo_LevelText.bitmap.clear();
			this.spriteInfo_LevelText.bitmap.drawText(this._oldLevel, 0, 0, 24, 24, 'center');
		}

		_createPlayerInfo() {
			this.spriteInfo = new Sprite(new Bitmap(45,48));
			this.spriteInfo.anchor.y = 0.5;
			this.spriteInfo.x = 0;
			this.spriteInfo.y = this.faceSize;

			this.spriteInfo_Level = new Sprite(ImageManager.loadPictureABS('levelBar')); //new Sprite(new Bitmap(24,24));
			this.spriteInfo_Level.opacity = 200;
			this.spriteInfo_Level.anchor.y = 0.5;
			this.spriteInfo_Level.x = 7;
			this.spriteInfo_Level.y = -10;

			this.spriteInfo_LevelText = new Sprite(new Bitmap(24,24));
			this.spriteInfo_LevelText.bitmap.fontSize = 18;
			this.spriteInfo_LevelText.anchor.y = 0.5;
			this.spriteInfo_Level.addChild(this.spriteInfo_LevelText);
			this._drawPlayerLevel();


			this.spriteInfo_Battle = new Sprite(ImageManager.loadPictureABS('InBattleIcon'));
			this.spriteInfo_Battle.anchor.y = 0.5;
			this.spriteInfo_Battle.x = 7;
			this.spriteInfo_Battle.y = -10;
			this.spriteInfo_Battle.visible = false;


			this.spriteInfo.addChild(this.spriteInfo_Level);
			this.spriteInfo.addChild(this.spriteInfo_Battle);

			this.addChild(this.spriteInfo);
		}

		_createPlayerParams() {
			var bitmap = new Bitmap(160,90);
			this.hpBar = null;
			bitmap.addLoadListener(function()
			{
				var barsCount = 2; //HP and MP
				if($dataSystem.optDisplayTp) barsCount += 1;
				if(AlphaABS.SYSTEM.PARAMS.ALLOW_XPBAR == true) barsCount += 1;

				if(barsCount == 4) {
					this._createSmallBars(bitmap);
				} else {
					//LOG.p("NORMAL BARS");
					this.hpBar = new UIObject_BarHP(bitmap, $gamePlayer.battler());
					this.hpBar.setPosition(4, 8, 120, 24);
					this.hpBar.refresh();

					this.mpBar = new UIObject_BarMP(bitmap, $gamePlayer.battler());
					this.mpBar.setPosition(4, 34, 120, 22);
					this.mpBar.refresh();

					if($dataSystem.optDisplayTp) {
						this.tpBar = new UIObject_BarTP(bitmap, $gamePlayer.battler());
						this.tpBar.setPosition(4, 58, 120, 22);
						this.tpBar.refresh();
					}
					//OR
					if(AlphaABS.SYSTEM.PARAMS.ALLOW_XPBAR == true) {
						this.xpBar = new UIObject_BarXP(bitmap, $gamePlayer.battler());
						this.xpBar.setPosition(4, 70, 120, 18);
						this.xpBar.refresh();
					}
				}
			}.bind(this));
			this.spriteParams = new Sprite(bitmap);
			this.spriteParams.x = this.x + this.faceSize;
			this.spriteParams.y = this.y;
			this.spriteParams.opacity = 200;
			this.addChild(this.spriteParams);
		}

		_createSmallBars(bitmap) {
			//LOG.p("SMALL BARS");

			this.hpBar = new UIObject_BarHP(bitmap, $gamePlayer.battler());
			this.hpBar.setPosition(4, 6, 120, 20);
			this.hpBar.refresh();

			this.mpBar = new UIObject_BarMP(bitmap, $gamePlayer.battler());
			this.mpBar.setPosition(4, 28, 120, 20);
			this.mpBar.refresh();

			this.tpBar = new UIObject_BarTP(bitmap, $gamePlayer.battler());
			this.tpBar.setPosition(4, 50, 120, 18);
			this.tpBar.refresh();

			this.xpBar = new UIObject_BarXP(bitmap, $gamePlayer.battler());
			this.xpBar.setPosition(4, 72, 120, 16);
			this.xpBar.refresh();
		}

		_createInBattleInfo() {
			this.spriteBattleMask = new Sprite_Mask(ImageManager.loadPictureABS('InBattleMask'));
			this.spriteBattleMask.x = -6;
			this.spriteBattleMask.y = -6;
			this.spriteBattleMask.setParams(255);
			this.addChild(this.spriteBattleMask);
		}
	}
	AlphaABS.LIB.Sprite_UserUI = Sprite_UserUI;

	class Sprite_SkillPanelABS extends Sprite
	{
		constructor() {
			super(ImageManager.loadPictureABS("SkillPanel"));
			//super(new Bitmap(341, 48));
			this._initSkills();
		}

		checkTouch() {
			for(var i = 0; i<this.items.count(); i++) {
				if(this.items[i].isTouched()) {
					return i + 1;
				}
			}
			return null;
		}

		setEditMode() {
			this.items.forEach(function(item) {
				item.setEditMode();
			});
		}

		terminate() {
			this.items.forEach(function(item) {
				item.terminate();
			});
		}

		touchSkillAt(index) {
			if(index != null)
				this.items[index - 1].pulse();
		}

		//PRIVATE
		_initSkills() {
			this.items = [];
			/*for(var i = 1; i<5; i++) { //LEFT
				var item = new UIObject_SkillPanelItem(i);
				item.x = this.x - ((5 - i) * 42);
				item.y = 0;
				this.items.push(item);
				this.addChild(item);
			}
			for(var i = 5; i<9; i++) { //RIGHT
				var item = new UIObject_SkillPanelItem(i);
				item.x = ((i - 5) * 42);
				item.y = 0;
				this.items.push(item);
				this.addChild(item);
			}*/

			for(var i = 1; i<9; i++) { //ALL
				var item = new UIObject_SkillPanelItem(i - 1);
				item.x = ((i - 1) * 42);
				item.y = 0;
				this.items.push(item);
				this.addChild(item);
			}
		}
	}

	AlphaABS.LIB.Sprite_SkillPanelABS = Sprite_SkillPanelABS;

	class UIObject_SkillPanelItem extends Sprite {
		constructor(index) {
			super(new Bitmap(40,40));
			this.index = index;
			this.item = null;
			this._thread = setInterval(function() { this._updateABS(); }.bind(this), 10);
			this.bitmap.fontSize = 18;
			this.bitmap.outlineWidth = 3;
			this.bitmap.outlineColor = Color.BLACK.CSS;
			this._pulsed = true;
			this._createOverlay();
			this._createHover();
			this._createHelp();
			this._createRecharge();
			this._createMask();
			this._updateABS();
		}

		setEditMode() {
			this.removeChild(this._hover);
			this.removeChild(this._help);
			this._help.visible = false;
		}

		pulse() {
			this._spriteMask.setParams(120, Color.BLUE);
			this._spriteMask.showMaskOne(15);
		}

		pulseReady() {
			if(!this._pulsed) {
				this._spriteMask.setParams(120, Color.GREEN);
				this._spriteMask.showMaskOne(15);
				this._pulsed = true;
			}
		}

		isTouched() {
			return ABSUtils.SMath.inRect(new Point(TouchInput.x, TouchInput.y), this._getRectangle());
		}

		terminate() {
			if(this.parent)
				this.parent.removeChild(this);
			clearInterval(this._thread);
			this._help.terminate();
		}

		//PRIVATE
		_getRectangle() {
			return new Rectangle(ABSUtils.toGlobalCoord(this, 'x'), ABSUtils.toGlobalCoord(this, 'y'), this.width, this.height);
		}

		_updateABS() {
            if(!this.bitmap) return;
            this.bitmap.clear();
            this.spriteRecharge.bitmap.clear();
            this.item = $gamePlayer.battler().uiPanelSkills()[this.index];
            if(this.item !== null) {
            	this._hover.update();
				this._help.update();
            	this._hover.visible = true;
                var object = this.item.skill();
                SDK.drawIcon(6,7,object.iconIndex,this.bitmap,32);
                if(AlphaABS.BattleManagerABS.canUseABSSkillUI(this.item)) {
                     this.bitmap.textColor = Color.WHITE.CSS;
                     //this.spriteOverlay.visible = false;
                     this.pulseReady();

                } else {
                    this.bitmap.textColor = Color.RED.CSS;
                    if(AlphaABS.BattleManagerABS.canUseSkillByTimer(this.item)) {
                        //this.spriteOverlay.visible = true;
                        this.bitmap.drawText(AlphaABS.Key.symbol['sp' + (this.index + 1)].toUpperCase(), 6,6, 32, 24, 'right');
                    } else {
                        //this.bitmap.drawText(this._framesToTime(t.timer.getMaxValue() - t.timer.getValue()), 6,6, 32, 24, 'right');
                        this._pulsed = false;
                        this._drawRecharge(this.item);
                    }
                }

                this.bitmap.drawText(AlphaABS.Key.symbol['sp' + (this.index + 1)].toUpperCase(), 6,6, 32, 24, 'right');

                if(this.item.isItem()) {
                    var count = $gameParty.numItems(object);
                    var c = this.bitmap.textColor;
                    if(count > 0) {
                        this.bitmap.textColor = Color.WHITE.CSS;
                    } else
                        this.bitmap.textColor = Color.RED.CSS;

                    var c2 = this.bitmap.fontSize;
                    this.bitmap.fontSize = 14;
                    this.bitmap.drawText(count, 8,22, 32, 24, 'left');

                    this.bitmap.textColor = c;
                    this.bitmap.fontSize = c2;
                }

                if(this.item.isNeedAmmo()) {
                    var count = $gameParty.numItems($dataItems[this.item.ammo]);
                    var c = this.bitmap.textColor;
                    if(count > 0) {
                        this.bitmap.textColor = Color.WHITE.CSS;
                    } else
                        this.bitmap.textColor = Color.RED.CSS;

                    var c2 = this.bitmap.fontSize;
                    this.bitmap.fontSize = 14;
                    this.bitmap.drawText(count, 8,2, 32, 24, 'left');

                    this.bitmap.textColor = c;
                    this.bitmap.fontSize = c2;
                }
            } else {
            	this._hover.visible = false;
            }
            this._spriteMask.update();
        }

		_calc_px_percent(current, max) {
			var c_inp = (100* current) / max;
	 		return Math.floor((32 * c_inp) / 100);
		}

		_createMask() {
			this._spriteMask = new Sprite_Mask(ImageManager.loadPictureABS('ItemMask'));
			this._spriteMask.x = -1;
			this._spriteMask.y = 1;
			this.addChild(this._spriteMask);
		}

		_drawRecharge(skill) {
			var height = this._calc_px_percent(skill.timer.getValue(), skill.timer.getMaxValue());
			var color = (height < 32) ? ((height < 16) ? Color.RED : Color.YELLOW ) : Color.GREEN;
			this.spriteRecharge.bitmap.fillRect(0,32-height,32,height,color.CSS);
		}

		_createRecharge() {
			this.spriteRecharge = new Sprite(new Bitmap(32,32));
			this.spriteRecharge.x = 6;
			this.spriteRecharge.y = 7;
			this.spriteRecharge.opacity = 100;
			this.addChild(this.spriteRecharge);
		}

		_createHover() {
			this._hover = new AlphaABS.LIB.Sprite_Hover(32,32);
			this._hover.x = 6;
			this._hover.y = 7;
			this.addChild(this._hover);
		}

		_createHelp() {
			this._help = new AlphaABS.LIB.UIObject_HelpHover(32,32);
			this._help.move(6,7);
			this._help.setHover(this._hover);
			this._help.setSkillIndex(this.index);
			this.addChild(this._help);
		}

		_createOverlay() {
			//EMPTY
		}

	}

	AlphaABS.LIB.UIObject_SkillPanelItem = UIObject_SkillPanelItem;

	class Sprite_SkillPanelABS_L extends Sprite_SkillPanelABS {
		constructor() {
			super();
		}

		refresh(actor) {
			this.terminate();
			this.actor = actor;
			this._initSkills2();
		}

		_initSkills() {
			this.items = [];
		}

		_initSkills2() {
			this.items = [];
			for(var i = 1; i<9; i++) { //ALL
				var item = new UIObject_SkillPanelItem_L(i - 1, this.actor);
				item.x = ((i - 1) * 42);
				item.y = 0;
				this.items.push(item);
				this.addChild(item);
			}
		}

	}
	AlphaABS.LIB.Sprite_SkillPanelABS_L = Sprite_SkillPanelABS_L;

	class UIObject_SkillPanelItem_L extends Sprite {
		constructor(index, actor) {
			super(new Bitmap(40,40));
			this.actor = actor;
			this.index = index;
			this.item = null;
			this.bitmap.fontSize = 18;
			this.bitmap.outlineWidth = 3;
			this.bitmap.outlineColor = Color.BLACK.CSS;
			this._pulsed = true;
			this._createMask();
			this._update();
		}

		pulse() {
			this._spriteMask.setParams(120, Color.BLUE);
			this._spriteMask.showMaskOne(15);
		}

		pulseReady() {
			if(!this._pulsed) {
				this._spriteMask.setParams(120, Color.GREEN);
				this._spriteMask.showMaskOne(15);
				this._pulsed = true;
			}
		}

		isTouched() {
			return ABSUtils.SMath.inRect(new Point(TouchInput.x, TouchInput.y), this._getRectangle());
		}

		update() {
			//super();
			this._update();
		}

		terminate() {
			if(this.parent)
				this.parent.removeChild(this);
		}

		//PRIVATE
		_getRectangle() {
			return new Rectangle(ABSUtils.toGlobalCoord(this, 'x'), ABSUtils.toGlobalCoord(this, 'y'), this.width, this.height);
		}

		_update() {
			 if(!this.bitmap) return;
            this.bitmap.clear();
            if(this.actor && this.actor.uiPanelSkills()) {
                this.item = this.actor.uiPanelSkills()[this.index];
                if(this.item !== null) {
                    var object = this.item.skill();
                    SDK.drawIcon(6,7,object.iconIndex,this.bitmap,32);
                    if(this.item.isItem()) {
                        var count = $gameParty.numItems(object);
                        var c = this.bitmap.textColor;
                        if(count > 0) {
                            this.bitmap.textColor = Color.WHITE.CSS;
                        } else
                            this.bitmap.textColor = Color.RED.CSS;

                        var c2 = this.bitmap.fontSize;
                        this.bitmap.fontSize = 14;
                        this.bitmap.drawText(count, 8,22, 32, 24, 'left');

                        this.bitmap.textColor = c;
                        this.bitmap.fontSize = c2;
                    }
                }
                this.bitmap.textColor = Color.WHITE.CSS;
                this.bitmap.drawText(AlphaABS.Key.symbol['sp' + (this.index + 1)].toUpperCase(), 6,6, 32, 24, 'right');
                this._spriteMask.update();
            } else {
                this.bitmap.textColor = Color.WHITE.CSS;
                this.bitmap.drawText(AlphaABS.Key.symbol['sp' + (this.index + 1)].toUpperCase(), 6,6, 32, 24, 'right');
            }
		}

		_createMask() {
			this._spriteMask = new Sprite_Mask(ImageManager.loadPictureABS('ItemMask'));
			this._spriteMask.x = -1;
			this._spriteMask.y = 1;
			this.addChild(this._spriteMask);
		}
	}

	AlphaABS.LIB.UIObject_SkillPanelItem_L = UIObject_SkillPanelItem_L;


//UIObject_ControlPanelItem
//------------------------------------------------------------------------------
	class UIObject_ControlPanelItem extends Sprite {
		constructor() {
			super(new Bitmap(40,40));
			this._iconIndex = null; //No icon

			this._createBorder();
			this._createMask();
			this._createOverlay();
			this._createHover();

			this._help = null;
			this._symbol = null;
			this._absSkill = null;

			this._thread = setInterval(function() { this._updateABS(); }.bind(this), 10);
		}

		setEditMode() {
			this._hover.visible = false;
			if(this._help) {
				this._help.visible = false;
			}
		}

		setIcon(index) {
			this._iconIndex = index;
			this._drawIcon();
		}

		setKey(symbol) {
			this._symbol = symbol;
			this._drawSymbol();
		}

		setSkill(absSkill) {
			this._absSkill = absSkill;
			if(!this.spriteAmmoCount) {
				this.spriteAmmoCount = new Sprite(new Bitmap(this.bitmap.width, this.bitmap.height));
				this.addChild(this.spriteAmmoCount);
			} else {
				if(this._absSkill == null) this.spriteAmmoCount.bitmap.clear();
			}

			if(absSkill != null && this._help == null) {
				this._createHelp();
			}
		}

		refresh() {
			this._drawSymbol();
		}

		pulse() {
			this._spriteMask.setParams(140, Color.BLUE);
			this._spriteMask.showMaskOne(15);
		}

		isEmpty() {
			return (this._iconIndex == null);
		}

		setSelected(isSelect) {
			if(isSelect) {
				this.spriteOverlay.bitmap.fillRect(0,0,this.spriteOverlay.bitmap.width,this.spriteOverlay.bitmap.height, Color.RED.CSS);
			} else {
				this.spriteOverlay.bitmap.clear();
			}
		}

		setDisabled(isDisabled) {
			if(isDisabled) {
				this.spriteOverlay.bitmap.fillRect(0,0,this.spriteOverlay.bitmap.width,this.spriteOverlay.bitmap.height, Color.BLACK.CSS);
			} else {
				this.spriteOverlay.bitmap.clear();
			}
		}

		isTouched() {
			return ABSUtils.SMath.inRect(new Point(TouchInput.x, TouchInput.y), this._getRectangle());
		}

		terminate() {
			clearInterval(this._thread);
		}

		//PRIVATE
		_getRectangle() {
			return new Rectangle(ABSUtils.toGlobalCoord(this, 'x'), ABSUtils.toGlobalCoord(this, 'y'), this.width, this.height);
		}

		_updateABS() {
			this._spriteMask.update();
			this._drawAmmoCount();

			this._hover.update();
			if(this._help)
				this._help.update();
		}

		_drawSymbol() {
			if(!this.spriteText) {
                this.spriteText = new Sprite(new Bitmap(this.bitmap.width, this.bitmap.height));
                this.spriteText.bitmap.fontSize = 16;
                this.addChild(this.spriteText);
            }
            this.spriteText.bitmap.clear();
            if(this._symbol != null) {
                this.spriteText.bitmap.drawText(AlphaABS.Key.symbol[this._symbol].toUpperCase(), 0, 0, this.spriteText.bitmap.width - 6, 24, 'right');
            }
		}

		_drawAmmoCount() {
			if(this._absSkill == null) return;
			this.spriteAmmoCount.bitmap.clear();
			if(this._absSkill.isNeedAmmo()) {
				var b = this.spriteAmmoCount.bitmap;
				var count = $gameParty.numItems($dataItems[this._absSkill.ammo]);
				var c = b.textColor;
				if(count > 0) {
					b.textColor = Color.WHITE.CSS;
				} else
					b.textColor = Color.RED.CSS;

				var c2 = b.fontSize;
				b.fontSize = 14;
				b.drawText(count, 8,2, 32, 24, 'left');

				b.textColor = c;
				b.fontSize = c2;
			}
		}

		_drawIcon() {
			this.bitmap.clear();
			if(this._iconIndex != null) {
				//SDK.drawIcon(4,5,this._iconIndex,this.bitmap,30);
				ImageManager.drawIconABS(4,5,this._iconIndex, this.bitmap);
			}
		}

		_createBorder() {
			this.spriteBorder = new Sprite(ImageManager.loadPictureABS("ControlPanelItem"));
			this.spriteBorder.x = 2;
			this.spriteBorder.y = 3;
			//this.spriteBorder.opacity = 150;
			this.addChild(this.spriteBorder);
		}

		_createOverlay() {
			this.spriteOverlay = new Sprite(new Bitmap(30, 30));
			this.spriteOverlay.x = 4;
			this.spriteOverlay.y = 5;
			this.spriteOverlay.opacity = 100;
			this.addChild(this.spriteOverlay);
		}

		_createMask() {
			this._spriteMask = new Sprite_Mask(ImageManager.loadPictureABS('ItemMask'));
			this._spriteMask.x = 1;
			this._spriteMask.y = 2;
			this._spriteMask.scale.x = 0.85;
			this._spriteMask.scale.y = this._spriteMask.scale.x;
			this.addChild(this._spriteMask);
		}

		_createHover() {
			this._hover = new AlphaABS.LIB.Sprite_Hover(30,30);
			this._hover.x = 4;
			this._hover.y = 5;
			this.addChild(this._hover);
		}

		_createHelp() {
			this._help = new AlphaABS.LIB.UIObject_HelpHover(30,30);
			this._help.move(4,5);
			this._help.setHover(this._hover);
			this._help.setSkillABS(this._absSkill);
			this._help.setWeaponMode();
			this.addChild(this._help);
		}
	}
	AlphaABS.LIB.UIObject_ControlPanelItem = UIObject_ControlPanelItem;
	//END UIObject_ControlPanelItem
//------------------------------------------------------------------------------

//UIObject_ControlPanelItemDummy
//------------------------------------------------------------------------------
	function UIObject_ControlPanelItemDummy() {
    	this.initialize.apply(this, arguments);
	}

	UIObject_ControlPanelItemDummy.prototype = Object.create(UIObject_ControlPanelItem.prototype);
	UIObject_ControlPanelItemDummy.prototype.constructor = UIObject_ControlPanelItemDummy;

	UIObject_ControlPanelItemDummy.prototype.initialize = function() {
	    Sprite.prototype.initialize.call(this);

	};

	UIObject_ControlPanelItemDummy.prototype.setEditMode = function() {
		//EMPTY
	};

	UIObject_ControlPanelItemDummy.prototype.setIcon = function(index) {
		//EMPTY
	};

	UIObject_ControlPanelItemDummy.prototype.setKey = function(symbol) {
		//EMPTY
	};

	UIObject_ControlPanelItemDummy.prototype.setSkill = function(absSkill) {
		//EMPTY
	};

	UIObject_ControlPanelItemDummy.prototype.refresh = function() {
		//EMPTY
	};

	UIObject_ControlPanelItemDummy.prototype.pulse = function() {
		//EMPTY
	};

	UIObject_ControlPanelItemDummy.prototype.isEmpty = function() {
		return true;
	};

	UIObject_ControlPanelItemDummy.prototype.setSelected = function(isSelect) {
		//EMPTY
	};

	UIObject_ControlPanelItemDummy.prototype.setDisabled = function(isDisabled) {
		//EMPTY
	}

	UIObject_ControlPanelItemDummy.prototype.isTouched = function() {
		return false;
	};

	UIObject_ControlPanelItemDummy.prototype.terminate = function() {
		//EMPTY
	};
	//END UIObject_ControlPanelItemDummy
//------------------------------------------------------------------------------

//UIObject_ControlPanel
//------------------------------------------------------------------------------
	function UIObject_ControlPanel() {
	    this.initialize.apply(this, arguments);
	}

	UIObject_ControlPanel.prototype = Object.create(Sprite.prototype);
	UIObject_ControlPanel.prototype.constructor = UIObject_ControlPanel;

	UIObject_ControlPanel.prototype.initialize = function() {
	    Sprite.prototype.initialize.call(this);
		this.items = [];
		this._transfered = false;
		this.setFrame(0,0,this._getY(1),this._getY(4));
	};

	UIObject_ControlPanel.prototype.terminate = function() {
		this.items.forEach(function(item) {
			item.terminate();
		});
	}

	UIObject_ControlPanel.prototype.checkTouch = function() {
		if(!this.visible) return null;
		if(this.parent) {
			if(this.parent.visible == false)
				return null;
		}
		for(var i = 0; i<this.items.count(); i++) {
			if(this.items[i].isTouched()) {
				return i;
			}
		}
		return null;
	}

	UIObject_ControlPanel.prototype.setEditMode = function() {
		this.items.forEach(function(item) {
			item.setEditMode();
		});
	};

	UIObject_ControlPanel.prototype.touchItemAt = function(index) {
		this.items[index].pulse();
	}

	UIObject_ControlPanel.prototype.selectItemAt = function(index, isSelect) {
		this.items[index].setSelected(isSelect);
	}

	UIObject_ControlPanel.prototype.disableItemAt = function(index, isDisable) {
		this.items[index].setDisabled(isDisable);
	}

	UIObject_ControlPanel.prototype.setIconAt = function(index, iconIndex) {
		this.items[index].setIcon(iconIndex);
	}

	UIObject_ControlPanel.prototype.setKeyAt = function(index, symbol) {
		this.items[index].setKey(symbol);
	}

	UIObject_ControlPanel.prototype.addItem = function() {
		this.items.push(new UIObject_ControlPanelItem());
		var item = this.items.last();
		item.y = this._getY(this.items.count() - 1);
		this.addChild(item);
		return item;
	}

	UIObject_ControlPanel.prototype.addEmptyItem = function() {
		this.items.push(new UIObject_ControlPanelItemDummy());
		var item = this.items.last();
		if(this.items.length > 1) {
			var prevItem = this.getPrevItem();
			item.y = this.getPrevItem().y;
		}
		this._emptyItems += 1;
		this.addChild(item);
		return item;
	}

	UIObject_ControlPanel.prototype.refreshWeaponIconAt = function(index) {
		if(!$gamePlayer.battler()) {
            this.setIconAt(index, 'noWeapon');
            return;
        }
        var t = $gamePlayer.battler().weapons().first();
        if(t && (t.iconIndex > 0)) {
            this.setIconAt(index, t.iconIndex);
        } else {
            this.setIconAt(index, 'noWeapon');
        }
        this.items[index].setSkill($gamePlayer.battler().skillABS_attack());
	}

	UIObject_ControlPanel.prototype.getLastItemIndex = function() {
		return this.items.count() - 1;
	}

	UIObject_ControlPanel.prototype.createBaseItems = function() {
		this._emptyItems = 0;
		var params = AlphaABS.SYSTEM.PARAMS;

		//Attack
		var item = this.addItem();
		var index = this.getLastItemIndex();
		this.refreshWeaponIconAt(index);
		item.setKey('cpA');
		//Follow
		item = (params.CONTROL_PANEL_ALLOW_FOLLOW == true) ? this.addItem() : this.addEmptyItem();
		item.setIcon('follow');
		item.setKey('cpW');
		//Jump
		item = (params.CONTROL_PANEL_ALLOW_JUMP == true) ? this.addItem() : this.addEmptyItem();
		item.setIcon('jump');
		item.setKey('cpS');
		//Rotate
		item = (params.CONTROL_PANEL_ALLOW_ROTATE == true) ? this.addItem() : this.addEmptyItem();
		item.setIcon('toMouse');
		item.setKey('cpD');

		//SwitchWeapon
	    item = (params.CONTROL_PANEL_ALLOW_FAVWEAP == true) ? this.addItem() : this.addEmptyItem();
	    item.setIcon('switchWeapon');
	    item.setKey('wC');

		this._setFrame();
		this._rearangeInVertical();
	}

	UIObject_ControlPanel.prototype.refresh = function() {
		for(var i = 0; i<this.items.length; i++) {
            this.items[i].refresh();
        }
	};

	UIObject_ControlPanel.prototype.transfer = function() {
		if(this._transfered) {
			this._transferOut();
		} else {
			this._transferIn();
		}
	}

	UIObject_ControlPanel.prototype.isHorizontal = function() {
		return (this._transfered == true);
	}

	UIObject_ControlPanel.prototype.getRealCount = function() {
		return (this.items.length - this._emptyItems);
	};


	UIObject_ControlPanel.prototype.getPrevItem = function() {
		return this.items[this.items.length - 2];
	};

	//PRIVATE
	UIObject_ControlPanel.prototype._getY = function(index) {
		return 38 * index;
	}

	UIObject_ControlPanel.prototype._setFrame = function() {
		this.width = this._getY(1);
		this.height = this._getY(1) * this.getRealCount();
		this.setFrame(this.x,this.y,this.width,this.height);
	};

	UIObject_ControlPanel.prototype._transferIn = function() {
		//LOG.p("Transfer IN");
		this._transfered = true;

		this._oldWidth = this.width;
		this._oldHeigth = this.height;

		this.width = this._getY(1) * this.getRealCount();
		this.height = this._getY(1);

		this.setFrame(this.x,this.y,this.width,this.height);
		this._rearangeInHorizontal();
	}

	UIObject_ControlPanel.prototype._transferOut = function() {
		//LOG.p("Transfer OUT");
		this._transfered = false;

		this.width = this._oldWidth;
		this.height = this._oldHeigth;

		this.setFrame(this.x,this.y,this.width, this.height);
		this._rearangeInVertical();
	}

	UIObject_ControlPanel.prototype._rearangeInHorizontal = function() {
		for(var i = 0; i<this.items.length; i++) {
			var item = this.items[i];
			item.y = 0;
			if(i > 0) {
				if(item.isEmpty()) {
					item.x = this.items[i-1].x;
				} else
					item.x = this.items[i-1].x + this._getY(1);
			} else {
				item.x = 0;
			}
		}
	};

	UIObject_ControlPanel.prototype._rearangeInVertical = function() {
		for(var i = 0; i<this.items.length; i++) {
			var item = this.items[i];
			item.x = 0;
			if(i > 0) {
				if(item.isEmpty()) {
					item.y = this.items[i-1].y;
				} else
					item.y = this.items[i-1].y + this._getY(1);
			} else {
				item.y = 0;
			}
		}
	};

	AlphaABS.LIB.UIObject_ControlPanel = UIObject_ControlPanel;
	//END UIObject_ControlPanel
//------------------------------------------------------------------------------

	class Sprite_EnemyUI extends Sprite {
		constructor() {
			super(new Bitmap(180,70));
			//this.bitmap.fillRect(0,0,this.bitmap.width,this.bitmap.height,Color.RED.CSS);
			this._createSprites();
			this.setTarget(null);

			this._thread = setInterval(function() { this._updateABS(); }.bind(this), 10);
		}

		infoWidth() {
			return 120;
		}

		refresh() {
			this.spriteBarHp.bitmap.clear();
			this.barHp = new UIObject_BarHPE(this.spriteBarHp.bitmap, this.target.battler());
			this.barHp.setPosition(0,0,this.spriteBarHp.bitmap.width,this.spriteBarHp.bitmap.height);
			this.barHp.refresh();

			this.spriteInfo.bitmap.clear();
			//this.bitmap.drawText(this.index, 6,6, 32, 24, 'right');
			this.spriteInfo.bitmap.fontSize = 18;
			this.spriteInfo.bitmap.drawText(this.target.battler().name(), 0,0, this.spriteInfo.bitmap.width, 20, 'left');

			//this.spriteCircleText.bitmap.clear();
			//this.spriteCircleText.bitmap.fontSize = 16;
			//this.spriteCircleText.bitmap.drawText(1, 0,0, this.spriteCircle.bitmap.width, 20, 'center');

			//Enemy Face
			/*if(this.target.battler().battlerName() != "") {
				var name = this.target.battler().battlerName();
				var hue = this.target.battler().battlerHue();
				if(!this.spriteEnemyFace) {
					this.spriteEnemyFace = new Sprite(new Bitmap(this.bitmap.width - this.infoWidth(), this.bitmap.height));
					this.spriteEnemyFace.x = this.infoWidth();
					this.addChild(this.spriteEnemyFace);
				}
				this.spriteEnemyFace.bitmap.clear();
				var enemyBitmap = ImageManager.loadEnemy(name, hue);
				enemyBitmap.addLoadListener(function() {
					this.spriteEnemyFace.bitmap.blt(enemyBitmap, 0, 0, enemyBitmap.width,
						enemyBitmap.height, 2, 2,
						this.spriteEnemyFace.bitmap.width - 2, this.bitmap.height - 2);
				}.bind(this));

				this.spriteBackground.bitmap.clear();
				this.spriteBackground.bitmap.fillRect(0,0,this.bitmap.width, this.bitmap.height, Color.BLACK.CSS);

			} else {
				if(this.spriteEnemyFace) {
					this.spriteEnemyFace.bitmap.clear();
					this.spriteBackground.bitmap.clear();
					this.spriteBackground.bitmap.fillRect(0,0,this.infoWidth(), this.bitmap.height, Color.BLACK.CSS);
				}
			}*/
		}

		terminate() {
			this.castBar.terminate();
			clearInterval(this._thread);
		}


		setTarget(target) {
			this.target = target;
			if(target) {
				this.spriteMask.stopMask();
				this.refresh();
				this.visible = true;
			} else {
				this.spriteMask.stopMask();
				this.castBar.cancel();
				this.castBar.visible = false;
				this.visible = false;
			}
		}

		//PRIVATE
		_createSprites() {
			this.spriteBackground = new Sprite(new Bitmap(this.bitmap.width,this.bitmap.height));
			this.spriteBackground.bitmap.fillRect(0,0,this.infoWidth(), this.bitmap.height, Color.BLACK.CSS);
			this.spriteBackground.opacity = 120;

			this.spriteInfo = new Sprite(new Bitmap(this.infoWidth() - 40, 22));
			this.spriteInfo.x = 10;
			this.spriteInfo.y = 5;

			this.spriteBarHp = new Sprite(new Bitmap(this.infoWidth() - 20, 18));
			this.spriteBarHp.x = 10;
			this.spriteBarHp.y = 28;

			this.spriteInfo_Battle = new Sprite(ImageManager.loadPictureABS('InBattleIcon'));
			this.spriteInfo_Battle.anchor.y = 0.5;
			this.spriteInfo_Battle.x = this.infoWidth() - 24;
			this.spriteInfo_Battle.y = 12;
			this.spriteInfo_Battle.visible = false;

			this.castBar = new Sprite_CastProgress(this.infoWidth() - 20, 14);
			this.castBar.x = 10;
			this.castBar.y = 48;

			this.spriteMask = new Sprite_Mask(ImageManager.loadPictureABS('EnemyUIMask'));
			this.spriteMask.x = -3;
			this.spriteMask.y = -3;
			this.spriteMask.setParams(220);

			this.addChild(this.spriteMask);
			this.addChild(this.spriteBackground);
			this.addChild(this.spriteInfo);
			this.addChild(this.spriteBarHp);
			//this.addChild(this.spriteCircle);
			this.addChild(this.spriteInfo_Battle);
			this.addChild(this.castBar);
		}

		_updateABS() {
			if(this.target) {
				this.barHp.update();
				this.castBar.update();
				this.spriteMask.update();

				if(this.target.inBattle()) {
					this.spriteMask.showMaskOne(20);
					this.spriteInfo_Battle.visible = true;
				} else {
					this.spriteInfo_Battle.visible = false;
				}

				if(this.target.ABSParams().casting) {
					if(!this.castBar._timer)
						this.castBar.visible = true;
						this.castBar.start(this.target.ABSParams().currentAction.timer);
				} else {
					this.castBar.cancel();
					this.castBar.visible = false;
				}
			}
		}
	}

	class Sprite_EnemyStatusBar extends Sprite {
		constructor(width, height) {
			super(new Bitmap(width, height));
			this._createSprites();
			this.setTarget(null);
			this._limit = 0;
			this._iconSize = 20;

			this._thread = setInterval(function() { this._updateABS(); }.bind(this), 200);
		}

		refresh() {
			//this.spriteBackground.bitmap.clear();
			//this.spriteBackground.bitmap.fillRect(0,0,this.bitmap.width, this.bitmap.height, Color.BLACK.CSS);
			this.bitmap.clear();
			this._drawItems();
		}

		terminate() {
			clearInterval(this._thread);
		}

		setLimit(limit) {
			this._limit = limit;
		}

		setTarget(target) {
			this.target = target;
			if(target) {
				this.refresh();
			} else {
				this.visible = false;
			}
		}

		//PRIVATE
		_createSprites() {
			//this.spriteBackground = new Sprite(new Bitmap(this.bitmap.width,this.bitmap.height));
			//this.spriteBackground.opacity = 180;
			//this.addChild(this.spriteBackground);
		}

		_drawItems() {
			let icons = this.target.battler().allIcons();
			if(icons.length == 0) {
				this.visible = false;
				return;
			} else {
				this.visible = true;
			}

			var size = (this._limit == 0) ? icons.length : this._limit;
			size = this._limit > icons.length ? icons.length : this._limit;
			for(let i = 0; i<size; i++) {
	 			SDK.drawIcon(this._xVal(i), 0, icons[i], this.bitmap, this._iconSize);
	 		}
		}

		_xVal(index) {
			return index * (this._iconSize + 2); //this.spriteBackground.width - ((this._iconSize) * (index + 1));
		}

		_updateABS() {
			if(this.target) {
				this.refresh();
			}
		}
	}

	class Sprite_CastProgress extends Sprite {
		constructor(width, height) {
			super(new Bitmap(width, height));
			this._timer = null;
			this._bar = new PKD_Object_Bar(this.bitmap);
			this._bar.setPosition(0,0,width,height);
			this._needText = false;
			//this._thread = setInterval(function() { this._update_bar(); }.bind(this), 10);
		}

		setText() {
			this._needText = true;
		}

		setColor(color) {
			this._bar._color = color;
		}

		start(timer) {
			//this.visible = true;
			this._timer = timer;
		}

		cancel() {
			//this.visible = false;
			this._timer = null;
		}

		bar() {
			return this._bar;
		}

		update() {
			//super();
			this._update_bar();
		}

		terminate() {
			clearInterval(this._thread);
		}

		//PRIVATE
		_update_bar() {
			if(!this.bitmap) return;
			if(!this._timer) return;

			var t = this._timer.getMaxValue();
			var t2 = this._timer.getValue();
			this._bar._mValue = t;
			this._bar.setValue(t2);
			if(this._needText)
				this._bar.setText(ABSUtils.framesToTimeA(t - t2), 'center');
			this._bar.update();

			if(this._timer.isReady()) {
				this.cancel();
			}
		}
	}

	class Sprite_ObjectWithMask extends Sprite {
		constructor(image, maskImage) {
			super(ImageManager.loadPictureABS(image));
			this._spriteMask = new Sprite_Mask(ImageManager.loadPictureABS(maskImage));
			this.addChild(this._spriteMask);
		}

		setParams(opacity, color) {
			this._spriteMask.setParams(opacity, color);
		}

		isReady() {
			return this._spriteMask.isReady();
		}

		pulse(time) {
			this._spriteMask.showMaskOne(time);
		}

		update() {
			//super();
			this._spriteMask.update();
		}

		//PRIVATE
	}

	class Sprite_UserStatusIcon extends Sprite {
		constructor() {
			super(new Bitmap(32, 54));
			this._spriteTime = new Sprite(new Bitmap(32, 20));
			this._spriteTime.y = 36;
			this._spriteTime.bitmap.textColor = Sprite_UserStatusIcon.TIMECOLOR.CSS;
			this._spriteTime.bitmap.fontSize = 18;

			this._index = null;
			this.addChild(this._spriteTime);

			this._thread = setInterval(function() { this._updateABS(); }.bind(this), 100);
		}

		setIndex(index) {
			this._index = index;
			this._drawItem();
			this.refresh();
		}

		refresh() {
			this._spriteTime.bitmap.clear();
			if(this._index != null) {
				var items = $gamePlayer.battler().states();
				if(this._index >= items.length) {
					var index2 = this._index - items.length;
					items = $gamePlayer.battler()._buffTurns;
					if(items[index2] == 0) {
						this._index = null;
						this.bitmap.clear();
						return;
					} else
						this._drawBuffTime(index2, items);
				} else {
					this._drawStateTime(this._index, items);
				}
			}
		}

		terminate() {
			clearInterval(this._thread);
			this.visible = false;
			this.bitmap.clear();
			this._spriteTime.bitmap.clear();
			if(this.parent)
				this.parent.removeChild(this);
		}

		//PRIVATE

		_drawItem() {
			this.bitmap.clear();
			if(this._index != null) {
				let icon = $gamePlayer.battler().allIcons()[this._index];
				SDK.drawIcon(0,0,icon,this.bitmap,32);
			}
		}

		_updateABS() {
			if(this._index != null)
				this.refresh();
		}

		_drawStateTime(index, items) {
	 		let stateTimes = $gamePlayer.battler()._stateTurns;
	 		let state = items[index];
	 		let time = stateTimes[state.id];
	 		var stringToDraw = '';
	 		if(state.autoRemovalTiming == 1) {
	 			stringToDraw = 'A';
	 		} else {
	 			if(state.autoRemovalTiming == 0) {
	 				stringToDraw = '';
	 			} else
	 				stringToDraw = ABSUtils.framesToTimeA(time);
	 		}
	 		//this._spriteTime.textColor = Sprite_UserStatusIcon.TIMECOLOR.CSS;
	 		this._spriteTime.bitmap.drawText(stringToDraw, 0, 0, this._spriteTime.bitmap.width, this._spriteTime.bitmap.height, 'center');
		}

		_drawBuffTime(index, items) {
	 		let time = items[index];
	 		if(time) {
	 			var stringToDraw = ABSUtils.framesToTimeA(time);
	 			this._spriteTime.bitmap.drawText(stringToDraw, 0, 0, this._spriteTime.bitmap.width, this._spriteTime.bitmap.height, 'center');
	 		}
		}
	}

	SDK.setConstant(Sprite_UserStatusIcon,'TIMECOLOR',Color.FromHex('#CECE00'));

	class UIObject_UserStatusBar extends Sprite {
		constructor(rowCount) {
			super();
			this._rowCount = rowCount;
			this._lastXPos = 0;
			this._lastYPos = 0;
			this._items = [];
			this._lastCount = 0;

			this._firstItemX = 34 * rowCount;
		}

		update() {
			//super();
			this._updateABS();
		}

		terminate() {
			this._items.forEach(function(item) {
				item.forEach(function(i) {
					if(i) i.terminate();
				});
			});
		}

		//PRIVATE
		_updateABS() {
			var items = $gamePlayer.battler().allIcons();
			if(this._lastCount == items.length) return;

			this._lastCount = items.length;
			for(let i = 0; i<items.length; i++) {
				var index = this._getIJForItem(i);
				var item = null;
				if(this._items[index.x]) {
					if(this._items[index.y]) {
						item = this._items[index.x][index.y];
					}
				}
				if(item) {
					item.setIndex(i);
				} else {
					if(!this._items[index.x]) {
						this._items[index.x] = [];
					}
					this._items[index.x][index.y] = new Sprite_UserStatusIcon();
					item = this._items[index.x][index.y];
					item.setIndex(i);
					var position = this._getXYForIJ(index.x, index.y);
					item.x = position.x;
					item.y = position.y;
					this.addChild(item);
				}
			}
		}

		_getIJForItem(index) {
			var i = 0;
			var j = 0;

			i = this._rowCount - (this._rowCount - index);
			while(i >= this._rowCount) {
				j++;
				i = i - this._rowCount;
			}

			return new ABSUtils.Point(i,j);
		}

		_getXYForIJ(i,j) {
			return new ABSUtils.Point(this._firstItemX - (i * 34), j * 64);
		}

	}

//UIObject_InputCircle_FW
//------------------------------------------------------------------------------
    function UIObject_InputCircle_FW() {
        this.initialize.apply(this, arguments);
    }

    UIObject_InputCircle_FW.prototype = Object.create(AlphaABS.LIB.UIObject_InputCircle.prototype);
    UIObject_InputCircle_FW.prototype.constructor = UIObject_InputCircle_FW;

    UIObject_InputCircle_FW.prototype.initialize = function(battler, func) {
        AlphaABS.LIB.UIObject_InputCircle.prototype.initialize.call(this, 0, 0, false);
        this._battler = battler;
        this._callHandler = func;
        this.refresh();

        SDK.times(4, function(i){
            this.addListener(i, function() {
                this._callHandler(i);
            }.bind(this))
        }.bind(this));
    };

    UIObject_InputCircle_FW.prototype.showHelp = function() {
        var t = AlphaABS.Key.symbol;
        var data = [t.scW,t.scD,t.scS,t.scA];
        this.setHelps(data.map(function(argument) {
          return argument.toUpperCase();
        }));
        AlphaABS.LIB.UIObject_InputCircle.prototype.showHelp.call(this);
    }

    UIObject_InputCircle_FW.prototype.isTouchedAny = function() {
        if(this.visible)
            return this.segments.some(function(i){return i.isButtonTouched()});
        else
            return false;
    };

    UIObject_InputCircle_FW.prototype.refresh = function() {
        this.setIcons(this._battler.getFavWeapIcons());
        var index = 0;
        this._battler.ABSParams().favoriteWeapons.forEach(function(i){
            var obj = $dataWeapons[i];
            if(!$gameParty.hasItem(obj,true)){
                this.disableIcon(index);
            }
            if(this._battler.hasWeapon(obj)) {
                //LOG.p("I equip this weapon " + obj.name + " icon disabled " + i);
                this.disableIcon(index);
            }
            index++;
        }.bind(this));
    };
    //END UIObject_InputCircle_FW
//------------------------------------------------------------------------------

//Sprite_HoverIcon
//------------------------------------------------------------------------------
    function Sprite_HoverIcon() {
        this.initialize.apply(this, arguments);
    }

    Sprite_HoverIcon.prototype = Object.create(AlphaABS.LIB.Sprite_Hover.prototype);
    Sprite_HoverIcon.prototype.constructor = Sprite_HoverIcon;

    Sprite_HoverIcon.prototype.initialize = function(w,h,fw) {
        this._fwidth = fw || 2;
        AlphaABS.LIB.Sprite_Hover.prototype.initialize.call(this, w, h);
    };

    Sprite_HoverIcon.prototype.standardFrameWidth = function() {
        return this._fwidth;
    };
    //END Sprite_HoverIcon
//------------------------------------------------------------------------------

//UIObject_ClickIcon
//------------------------------------------------------------------------------
    function UIObject_ClickIcon() {
        this.initialize.apply(this, arguments);
    }

    UIObject_ClickIcon.prototype = Object.create(Sprite_Button.prototype);
    UIObject_ClickIcon.prototype.constructor = UIObject_ClickIcon;

    UIObject_ClickIcon.prototype.initialize = function(iconSymbol) {
        Sprite_Button.prototype.initialize.call(this);
        this.bitmap = ImageManager.loadIconABS(iconSymbol);
        this._hover = null;
        this.bitmap.addLoadListener(function() {
                this._hover = new Sprite_HoverIcon(this.width, this.height, 18);
                this.addChild(this._hover);
        }.bind(this));

        this._clicked = false;
        this._keySymbol = null;
    };

    UIObject_ClickIcon.prototype.setClickHandler = function(handler) {
        this._handlerX = handler;
        Sprite_Button.prototype.setClickHandler.call(this, function(){
            //LOG.p("Clicked");
            if(this.isClicked()) {
                this._clicked = false;
                this._hover.free();
                this._handlerX();
            }
            else {
                this._clicked = true;
                this._hover.freeze();
                this._handlerX();
            }
        });
    };

    UIObject_ClickIcon.prototype.update = function() {
        Sprite_Button.prototype.update.call(this);
        if(this._keySymbol != null) {
            if(this.visible && Input.isTriggered(this._keySymbol)) {
                this.callClickHandler();
            }
        }
    }

    UIObject_ClickIcon.prototype.drawIconText = function(text) {
        var spr = new Sprite();
        spr.bitmap = new Bitmap(this.width, this.height);
        spr.bitmap.fontSize = 22;
        spr.bitmap.drawText(text,0,0,this.width - 2,this.height,'right');
        this.addChild(spr);
    };

    UIObject_ClickIcon.prototype.setKeyHandler = function(symbol) {
        this._keySymbol = symbol;
        this.drawIconText(symbol.toUpperCase());
    };

    UIObject_ClickIcon.prototype.isClicked = function() {
        return (this._clicked == true);
    };
    //END UIObject_ClickIcon
//------------------------------------------------------------------------------

	class Sprite_Mask extends Sprite {
		constructor(args) {
			super(args);
			this._maxOpacity = 255;
			this._reset();
		}

		setParams(opacity, color) {
			if(color)
				this.setBlendColor(color.ARR);
			this._maxOpacity = opacity;
			this.opacity = opacity;
		}

		showMask(time) {
			this.visible = true;
			this._show = true;
			this._time = 60 / time;
		}

		isReady() {
			return (this._show == false);
		}

		showMaskOne(time) {
			if(!this._show) {
				this.showMask(time);
				this._oneTime = true;
			}
		}

		stopMask() {
			this._reset();
		}

		update() {
			//super();
			if(this._show) {
				if(!this._toD) {
					this.opacity += this._time;
					if(this.opacity >= (this._maxOpacity - this._time)) {
						this.opacity = this._maxOpacity;
						this._toD = true;
					}
				} else {
					this.opacity -= this._time;
					if(this.opacity <= this._time) {
						this.opacity = 0;
						this._toD = false;
						if(this._oneTime) {
							this._reset();
						}
					}
				}

			}
		}

		//PRIVATE
		_reset() {
			this._show = false;
			this.visible = false;
			this.opacity = 0;
			this._time = 0;
			this._toD = false;
			this._oneTime = false;
		}
	}

	class UIObject_BarUserCast extends Sprite {
		constructor(width, height) {
			super(new Bitmap(width, height));
			//this._drawItem = new Sprite_ObjectWithMask('UserCastBar','UserCastBarMask');
			this._drawItem = new Sprite_ObjectWithMask('Bar','BarMask');
			//TODO Надо больше (или другой бар)

			//this._progressBar =  new Sprite_CastProgress(186, 16);
			this._progressBar =  new Sprite_CastProgress(125, 18);
			this._progressBar.setText();
			this._progressBar.setColor(Color.MAGENTA);

			this._drawItem.z = 10;
			//this._progressBar.x = 40;
			//this._progressBar.y = 16;

			this._drawItem.x = 28;
			this._progressBar.x = this._drawItem.x + 9;
			this._progressBar.y = 6;

			this.addChild(this._progressBar);
			this.addChild(this._drawItem);

			this.visible = false;
			this._timer = null;

			this._thread = setInterval(function() { this._update(); }.bind(this), 10);
		}

		start(skill) {
			if(skill && !skill.isReady() && skill.isCasting()) {
				this.visible = true;
				var iconIndex = skill.skill().iconIndex;
				if(iconIndex > 0)
					//SDK.drawIcon(12,12,iconIndex,this.bitmap, 24);
					SDK.drawIcon(0,2,iconIndex,this.bitmap, 26);
				else
					this.bitmap.clear();
				this._timer = skill.timer;
				this._progressBar.start(skill.timer);
			}
		}

		stop() { //interrupt
			this._drawItem.setParams(150, Color.RED);
			this._waitPulse = true;
			this._drawItem.pulse(10);
			this.finish();
		}

		finish() {
			this._timer = null;
		}

		pulse() {
			this._drawItem.setParams(150, Color.MAGENTA);
			this._waitPulse = true;
			this._drawItem.pulse(10);
		}

		terminate() {
			this._progressBar.terminate();
			clearInterval(this._thread);
		}
		//PRIVATE
		_update() {
			this._start(); //Auto
			this._drawItem.update();
			this._progressBar.update();
			if(this._timer){
				if(this._isChottoReady()) {
					this.pulse();
				}
				if(this._timer.isReady()) {
					this.finish();
				}
			}
			if(this._waitPulse) {
				if(this._drawItem.isReady()) {
					//LOG.p("Pulse ready");
					this._waitPulse = false;
					if(this._timer == null || this._timer.isReady())
						this.visible = false;
				}
			}
		}

		_start() {
			if($gamePlayer.ABSParams().casting) {
				var skill = $gamePlayer.ABSParams().castingSkill;
				if(skill && !skill.isReady() && skill.isCasting()) {
					this.visible = true;
					var iconIndex = skill.skill().iconIndex;
					if(iconIndex > 0)
						//SDK.drawIcon(12,12,iconIndex,this.bitmap, 24);
						SDK.drawIcon(0,2,iconIndex,this.bitmap, 26);
					else
						this.bitmap.clear();
					this._timer = skill.timer;
					this._progressBar.start(skill.timer);
				}
			} else {
				if($gamePlayer.ABSParams().castingError) {
					$gamePlayer.ABSParams().castingError = false;
					this.stop();
				}
				if(!this._waitPulse)
					this.visible = false;
			}
		}

		_isChottoReady() {
			var t = this._timer.getValue();
			var t2 = this._timer.getMaxValue();
			t = Math.abs(t2 - t);
			return (t == 1);
		}
	}

	class UIObject_BarAttackReload extends Sprite {
		constructor(width, height) {
			super(new Bitmap(width, height));
			this._drawItem = new Sprite_ObjectWithMask('BarSmall','BarSmallMask');
			this._drawItem.setParams(150, Color.AQUA);

			this._progressBar =  new Sprite_CastProgress(110, 10);
			this._progressBar.setColor(Color.AQUA);

			this._drawItem.z = 10;
			this._drawItem.x = 28;
			this._progressBar.x = this._drawItem.x + 4;
			this._progressBar.y = 4;

			this.addChild(this._progressBar);
			this.addChild(this._drawItem);

			this.visible = false;
			this._timer = null;

			this._thread = setInterval(function() { this._update(); }.bind(this), 10);
		}

		start() {
			if($gamePlayer.ABSParams().isWeapRecharge){
				var skill = $gamePlayer.battler().skillABS_attack();
				if(skill && !skill.isReady() && skill.getReloadTime() > 30) {
					this.visible = true;
					var t = $gamePlayer.battler().weapons().first();
					if(t && t.iconIndex > 0) {
						ImageManager.drawIconABS(0,0,t.iconIndex,this.bitmap, 24);
					} else {
						ImageManager.drawIconABS(0,0,'noWeapon',this.bitmap, 24);
						//this.bitmap.clear();
					}
					this._timer = skill.timer;
					this._progressBar.start(skill.timer);
				}
			} else {
				if(!this._waitPulse) {
					this.visible = false;
				}
			}
		}

		finish() {
			this._timer = null;
		}

		pulse() {
			this._waitPulse = true;
			this._drawItem.pulse(10);
		}

		terminate() {
			this._progressBar.terminate();
			clearInterval(this._thread);
		}
		//PRIVATE
		_update() {
			this.start(); //Auto
			this._drawItem.update();
			this._progressBar.update();
			if(this._timer){
				if(this._isChottoReady()) {
					this.pulse();
				}
				if(this._timer.isReady()) {
					this.finish();
				}
			}
			if(this._waitPulse) {
				if(this._drawItem.isReady()) {
					//LOG.p("Pulse ready");
					this._waitPulse = false;
					if(this._timer == null)
						this.visible = false;
				}
			}
		}

		_isChottoReady() {
			var t = this._timer.getValue();
			var t2 = this._timer.getMaxValue();
			t = Math.abs(t2 - t);
			return (t == 1);
		}
	}

	class UIObject_BarHP extends PKD_Object_Bar
 	{
 		constructor(bitmap, battler)
 		{
 			super(bitmap);
 			this._battler = battler;
 			this._color = Color.RED;
 			this._mValue = this._battler.mhp;
 			this._value = this._battler.hp;

 			this._text_l = TextManager.hpA;
 			this._text_r = this._value;
 		}

 		update()
 		{
 			if(this._mValue != this._battler.mhp)
 			{
 				this._lValue = -1;
 				this._mValue = this._battler.mhp;
 			}
 			this._value = this._battler.hp;
 			this._text_r = this._value;
 			PKD_Object_Bar.prototype.update.call(this);
 		}
 	}

	class UIObject_BarMP extends PKD_Object_Bar {
		constructor(bitmap, battler)
 		{
 			super(bitmap);
 			this._battler = battler;
 			this._color = Color.BLUE;
 			this._mValue = this._battler.mmp;
 			this._value = this._battler.mp;

 			this._text_l = TextManager.mpA;
 			this._text_r = this._value;
 		}

 		update()
 		{
 			if(this._mValue != this._battler.mmp)
 			{
 				this._lValue = -1;
 				this._mValue = this._battler.mmp;
 			}
 			this._value = this._battler.mp;
 			this._text_r = this._value;
 			PKD_Object_Bar.prototype.update.call(this);
 		}
	}

	class UIObject_BarTP extends PKD_Object_Bar {
		constructor(bitmap, battler)
 		{
 			super(bitmap);
 			this._battler = battler;
 			this._color = Color.GREEN;
 			this._mValue = this._battler.maxTp();
 			this._value = this._battler.tp;

 			this._text_l = TextManager.tpA;
 			this._text_r = this._value;
 		}

 		update()
 		{
 			this._value = this._battler.tp;
 			this._text_r = this._value;
 			PKD_Object_Bar.prototype.update.call(this);
 		}
	}

 	class UIObject_BarHPE extends PKD_Object_Bar {
 		constructor(bitmap, battler)
 		{
 			super(bitmap);
 			this._battler = battler;
 			this._color = Color.RED;
 			this._mValue = this._battler.mhp;
 			this._value = this._battler.hp;
 			this._text_c = this._get_value();
 		}

 		update()
 		{
 			if(this._mValue != this._battler.mhp)
 			{
 				this._lValue = -1;
 				this._mValue = this._battler.mhp;
 			}
 			this._value = this._battler.hp;
 			if(this._value != this._lValue)
 			{
 				this._text_c = this._get_value();
 			}
 			PKD_Object_Bar.prototype.update.call(this);
 		}

 		//PRIVATE
 		_get_value()
 		{
 			let temp = Math.floor((this._value * 100)/this._mValue);
 			if(temp <= 0) temp = 1;
 			return (temp + '%');
 		}
 	}

 	class UIObject_BarXP extends AlphaABS.LIB.Bar
	{
		constructor(bitmap, battler)
		{
			super(bitmap);
			this._battler = battler;
			this._color = Color.YELLOW;
			this._text_l = TextManager.expA;

			this._oldLevel = -1;
			this.update();
		}

		update()
		{
			if(this._oldLevel != this._battler.level)
			{
				this._lValue = -1;
				this._oldLevel = this._battler.level;
				this._mValue = this._battler.nextLevelExp();
			}

			this._value = this._battler.currentExp();
			this._text_r = this._get_value();
			AlphaABS.LIB.Bar.prototype.update.call(this);
		}

		//PRIVATE
		_get_value()
		{
			var temp = Math.floor((this._value * 100)/this._mValue);
			if(temp <= 0) temp = 0;
			return (temp + '%');
		}
	}

	var _Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
	Scene_Map.prototype.createSpriteset = function() {
	    _Scene_Map_createSpriteset.call(this);
	    if($gameMap.isABS()) {
	    	//LOG.p("UI ABS Inited");
	    	this._spritesetUI = new Spriteset_InterfaceABS();
	    	this.addChild(this._spritesetUI);
	    	AlphaABS.BattleManagerABS.setUI(this._spritesetUI);
	    }
	};

//Window_SkillList
//------------------------------------------------------------------------------
	var _Window_SkillList_initialize = Window_SkillList.prototype.initialize;
	Window_SkillList.prototype.initialize = function(x, y, width, height) {
		_Window_SkillList_initialize.call(this, x, y, width, height);

		this._absPanel = new Sprite_SkillPanelABS_L();
		this._absPanel.x = (this.width / 2) - this._absPanel.width/2;
		this._absPanel.y = this.height - this._absPanel.height - 10;
		this.addChild(this._absPanel);
	}

	var _Window_SkillList_setActor = Window_SkillList.prototype.setActor;
	Window_SkillList.prototype.setActor = function(actor) {
		if (this._actor !== actor) {
			this._absPanel.refresh(actor);
		}
		_Window_SkillList_setActor.call(this, actor);
	}

	var _Window_SkillList_update_432 = Window_SkillList.prototype.update;
    Window_SkillList.prototype.update = function() {
        _Window_SkillList_update_432.call(this);
        if(this.active) {
        	if(TouchInput.isTriggered()) {
	        	var tI = this._absPanel.checkTouch();
	            if(tI != null) {
	            	if(this.checkABSItem(this.item())) {
		            	this._absPanel.touchSkillAt(tI);
		            	LOG.p("Skill " + this.item().name + " set to slot " + tI);
		                this._actor.setSkillOnPanel(this.item().id,tI-1);
		                SoundManager.playEquip();
		                this.refresh();
		            } else {
		            	SoundManager.playBuzzer();
		            	LOGW.p(Consts.STRING_WARNING_SKILLOC[SDK.isRU()]);
		            }
	            }
	        }
        }
    }

	//END Window_SkillList
//------------------------------------------------------------------------------

//Window_ItemList
//------------------------------------------------------------------------------
    var _Window_ItemList_initialize = Window_ItemList.prototype.initialize;
	Window_ItemList.prototype.initialize = function(x, y, width, height) {
		_Window_ItemList_initialize.call(this, x, y, width, height);

		this._absPanel = new Sprite_SkillPanelABS_L();
		this._absPanel.x = (this.width / 2) - this._absPanel.width/2;
		this._absPanel.y = this.height - this._absPanel.height - 10;
		this._absPanel.refresh($gameParty.leader());
		this._absPanel.visible = false;
		this.addChild(this._absPanel);
	}

	var _Window_ItemList_setCategory = Window_ItemList.prototype.setCategory;
	Window_ItemList.prototype.setCategory = function(category) {
	    _Window_ItemList_setCategory.call(this, category);
	    if(this._category == 'item') {
	    	this._absPanel.visible = true;
	    } else
	    	this._absPanel.visible = false;
	};

	var _Window_ItemList_update_9090 = Window_ItemList.prototype.update;
    Window_ItemList.prototype.update = function() {
        _Window_ItemList_update_9090.call(this);
        if(this.active && this._absPanel.visible) {
            if(TouchInput.isTriggered()) {
	        	var tI = this._absPanel.checkTouch();
	            if(tI != null) {
	            	if(this.item() && this.item().occasion == 1 && this.item().meta.ABS) {
		            	this._absPanel.touchSkillAt(tI);
		            	LOG.p("Item " + this.item().name + " set to slot " + tI);
		                $gameParty.leader().setItemOnPanel(this.item().id,tI-1);
		                SoundManager.playEquip();
		                this.refresh();
		            } else {
		            	LOGW.p(Consts.STRING_WARNING_SKILLOC[SDK.isRU()]);
		            	SoundManager.playBuzzer();
		            }
	            }
	        }
        }
    }

   //END Window_ItemList
//------------------------------------------------------------------------------

//Window_Options
//------------------------------------------------------------------------------
	var _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
	Window_Options.prototype.makeCommandList = function() {
	    _Window_Options_makeCommandList.call(this);
	    this._addUIOptions();
	    if(AlphaABS.SYSTEM.PARAMS.ALLOW_KB)
	    	this._addBindingOptions();
	};

	Window_Options.prototype._addUIOptions = function() {
		if($gameMap.isABS()) {
			//LOG.p("CONFIG!");
			var p = AlphaABS.SYSTEM.PARAMS;
			if(p.ALLOW_UI_VIS == true) this.addCommand(AlphaABS.SYSTEM.STRING_MENU_UIVIS[SDK.isRU()], 'absUI');
			if(p.ALLOW_UI_POS == true) this.addCommand(AlphaABS.SYSTEM.STRING_MENU_UIPOS[SDK.isRU()], 'absEditUI');
		}
	}

	Window_Options.prototype._addBindingOptions = function() {
		this.addCommand(AlphaABS.SYSTEM.STRING_MENU_KEYBIND[SDK.isRU()], 'absEditKeys');
	}

	Window_Options.prototype._isABSSymbol = function(symbol) {
		return symbol.contains('abs');
	}

	Window_Options.prototype._isABSSymbol2 = function(symbol) {
		return symbol.contains('absEdit');
	}

	var _Window_Options_statusText = Window_Options.prototype.statusText;
	Window_Options.prototype.statusText = function(index) {
	    var symbol = this.commandSymbol(index);
	    if(this._isABSSymbol2(symbol)) {
	    	return '';
	    } else {
	    	return _Window_Options_statusText.call(this, index);
	    }
	};

	var _Window_Options_changeValue = Window_Options.prototype.changeValue;
	Window_Options.prototype.changeValue = function(symbol, value) {
		if(this._isABSSymbol(symbol)) {
			if(this._isABSSymbol2(symbol)) {
				SoundManager.playCursor();
				if(symbol.contains('UI')) {
					if(!AlphaABS.BattleManagerABS.UI().isVisible()){
						SoundManager.playBuzzer();
					} else
						SceneManager.push(Scene_InterfaceEdit);
					return;
				}
				if(symbol.contains('Keys')) {
            		SceneManager.push(AlphaABS.LIB.EXT.Scene_KeyBinder);
            		return;
				}
			} else {
				var lastValue = this.getConfigValue(symbol);
				if (lastValue !== value) {
					AlphaABS.BattleManagerABS.UI().setShowUI(value);
					this.redrawItem(this.findSymbol(symbol));
	        		SoundManager.playCursor();
				}
			}
		} else {
			_Window_Options_changeValue.call(this, symbol, value);
		}
	};

	var _Window_Options_getConfigValue = Window_Options.prototype.getConfigValue;
	Window_Options.prototype.getConfigValue = function(symbol) {
	    if(this._isABSSymbol(symbol)) {
	    	if(this._isABSSymbol2(symbol)) {
	    		return true;
	    	} else {
	    		return AlphaABS.BattleManagerABS.UI().isVisible();
	    	}
	    } else {
	    	return _Window_Options_getConfigValue.call(this, symbol);
	    }
	};
	//END Window_Options
//------------------------------------------------------------------------------

//Window_EquipItem
//------------------------------------------------------------------------------
    Window_EquipItem.prototype.onTouch = function(triggered) {
        if(this._sCircle) {
            if(this._sCircle.isOpen() && this._sCircle.isTouchedAny()) {
                return;
            }
        }
        Window_ItemList.prototype.onTouch.call(this, triggered);
    };

    var _Window_EquipItem_setActor = Window_EquipItem.prototype.setActor;
    Window_EquipItem.prototype.setActor = function(actor) {
        _Window_EquipItem_setActor.call(this, actor);
        if(this._actor != null && AlphaABS.SYSTEM.PARAMS.CONTROL_PANEL_ALLOW_FAVWEAP == true) {
            this._createFavWeapCircle();
            this._createFavWeapButton();
        }
    }

    Window_EquipItem.prototype.update = function() {
        Window_ItemList.prototype.update.call(this);
        if(this._sCircle && this._sCircle.isOpen()) {
            var index = AlphaABS.Key.isTriggeredWS();
            if(index != null) {
                this.touchWeaponAt(index);
                this.refresh();
                return;
            }
        }
    };

    Window_EquipItem.prototype.drawItemNumber = function(item, x, y, width) {
        Window_ItemList.prototype.drawItemNumber.call(this, item, x, y ,width);
        if(!this._actor) {
            return;
        }
        if(!DataManager.isWeapon(item))
            return;

        var symbol = this._actor.getFavWeapSymbol(item);
        if(symbol != null) {
        	this.changeTextColor(Color.ORANGE.CSS);
        	var spacer = '0000';
        	if(Imported.YEP_ItemCore == true) {
        		spacer += '00';
        	}
        	this.drawText('[' + symbol.toUpperCase() +']', x, y, width - this.textWidth(spacer), 'right');
        }
    };

    //NEW
    Window_EquipItem.prototype.touchWeaponAt = function(index) {
        if(this._sCircle) {
            if(DataManager.isWeapon(this.item())) {
                this._sCircle.click(index);
                this._actor.setFavWeap(this.item(), index);
                SoundManager.playEquip();
                this._sCircle.refresh();
                this.refresh();
            } else
                SoundManager.playBuzzer();
        }
    };


    Window_EquipItem.prototype.refresh = function() {
        Window_ItemList.prototype.refresh.call(this);

    };

    Window_EquipItem.prototype.activate = function() {
        Window_ItemList.prototype.activate.call(this);
        if(this._sCircleButton) {
            this._sCircleButton.visible = true;
        }
    }

    Window_EquipItem.prototype.deactivate = function() {
        Window_ItemList.prototype.deactivate.call(this);
        if(this._sCircleButton) {
            this._sCircleButton.visible = false;
            if(this._sCircle.isOpen())
                this._sCircleButton.callClickHandler();
        }
    }

    Window_EquipItem.prototype._createFavWeapCircle = function() {
        this._sCircleBackSprite = new Sprite(new Bitmap((this.width/2) - 4,this.height - 8));
        this._sCircleBackSprite.bitmap.addLoadListener(function(){
            this._sCircleBackSprite.bitmap.fillAll(Color.BLACK.reAlpha(200).CSS);
        }.bind(this));
        this._sCircleBackSprite.visible = false;
        this.addChild(this._sCircleBackSprite);
        this._sCircle = new UIObject_InputCircle_FW(this._actor, function(index){this.touchWeaponAt(index)}.bind(this));
        this._sCircle.move(this._sCircleBackSprite.width/2,this._sCircleBackSprite.height/2);
        this._sCircle.showHelp();
        this._sCircleBackSprite.addChild(this._sCircle);
    };

    Window_EquipItem.prototype._createFavWeapButton = function() {
        this._sCircleButton = new UIObject_ClickIcon('switchWeapon');
        this._sCircleButton.move(this.width - 36, this.height - 36);
        this._sCircleButton.visible = false;
        this._sCircleButton.setClickHandler(function() {
            if(this._sCircleButton.isClicked()) {
                this._onEquipMode();
            } else {
                this._offEquipMode();
            }
        }.bind(this));
        this._sCircleButton.setKeyHandler(AlphaABS.Key.symbol.wC);
        this.addChild(this._sCircleButton);
    };

    Window_EquipItem.prototype.select = function(index) {
        Window_ItemList.prototype.select.call(this, index);
        if(!this._sCircle) return;
        if(this.maxCols() > 1) {
            this._placeFavWeapCircle(index % this.maxCols());
        } else {
            this._placeFavWeapCircle(0);
        }

        if(this._sCircleButton) {
            this._sCircleButton.visible = DataManager.isWeapon(this.item());

        }
    }

    Window_EquipItem.prototype._onEquipMode = function() {
        this._sCircle.open();
        this._sCircleBackSprite.visible = true;
    };

    Window_EquipItem.prototype._offEquipMode = function() {
        this._sCircle.close();
        this._sCircleBackSprite.visible = false;
    }

    Window_EquipItem.prototype._placeFavWeapCircle = function(place) {
        if(place <= 0) { //RIGHT
            this._sCircleBackSprite.move(this.width - 6, this.height - 4);
            this._sCircleBackSprite.setStaticAnchor(1,1);
        } else { //LEFT
            this._sCircleBackSprite.move(6,this.height - 4);
            this._sCircleBackSprite.setStaticAnchor(0,1);
        }
    };
    //END Window_EquipItem
//------------------------------------------------------------------------------

//Window_EquipSlot
//------------------------------------------------------------------------------
	var _Window_EquipSlot_drawItem = Window_EquipSlot.prototype.drawItem;
	Window_EquipSlot.prototype.drawItem = function(index) {
	    _Window_EquipSlot_drawItem.call(this, index);
	    this._drawFavWeapSymbol(index);
	};

	//NEW
	Window_EquipSlot.prototype._drawFavWeapSymbol = function(index) {
		if(this._actor) {
	    	var item = this._actor.equips()[index];
	    	if(item) {
	    		var symbol = this._actor.getFavWeapSymbol(item);
		        if(symbol != null) {
		        	this.changeTextColor(Color.ORANGE.CSS);
			        var rect = this.itemRectForText(index);
			        if(Imported.YEP_EquipCore == true) {
			        	this.contents.drawText('[' + symbol.toUpperCase() +']', rect.x + this._nameWidth, rect.y, rect.width - this._nameWidth, this.lineHeight(), 'right');
			        } else {
		    			var iconBowWidth = Window_Base._iconWidth + 8;
		    			this.contents.drawText('[' + symbol.toUpperCase() +']', rect.x + 138 + iconBowWidth, rect.y, 312 - iconBowWidth, this.lineHeight(), 'right');
		        	}
		        }
	    	}
	    }
	};
	//END Window_EquipSlot
//------------------------------------------------------------------------------

})();

//==========================================================================================================================================================
// Alpha ABS EXTENSION Audio
//==========================================================================================================================================================

//------------------------------------------------------------------------------
	(function() {

		AlphaABS.SYSTEM.EXTENSIONS.AUDIO = true;

		var LOG = new PLATFORM.DevLog("AAudio");
		var Point = AlphaABS.UTILS.Point;


	//WebAudio
	//------------------------------------------------------------------------------
		WebAudio._contextABS = null;

		WebAudio.updateListenerPosition = function(point) {
			//LOG.p("Update audio position " + point.toString());
			WebAudio._contextABS.listener.setPosition(point.x,point.y,0);
		}

		var _WebAudio_clear = WebAudio.prototype.clear;
		WebAudio.prototype.clear = function() {
	    	_WebAudio_clear.call(this);
	    	this._positionABS = null;
		}

		var _WebAudio_createContext = WebAudio._createContext;
		WebAudio._createContext = function() {
			WebAudio._contextABS = new (window.AudioContext || window.webkitAudioContext)();
		    _WebAudio_createContext.call(this);
		};

		//NEW
		WebAudio.prototype.setPosition = function(point) {
			this._positionABS = point;
		}

		var _WebAudio_createNodes = WebAudio.prototype._createNodes;
		WebAudio.prototype._createNodes = function() {
			if(this._positionABS) {
		    	var context = WebAudio._contextABS;
			    this._sourceNode = context.createBufferSource();
			    this._sourceNode.buffer = this._buffer;
			    this._sourceNode.loopStart = this._loopStart;
			    this._sourceNode.loopEnd = this._loopStart + this._loopLength;
			    this._sourceNode.playbackRate.value = this._pitch;
			    this._gainNode = context.createGain();
			    this._gainNode.gain.value = this._volume;
			    this._pannerNode = context.createPanner();
				this._pannerNode = context.createPanner();
				this._pannerNode.refDistance = 20;
				this._pannerNode.maxDistance = 400;
				this._pannerNode.rolloffFactor = 0.2;
				this._pannerNode.setPosition(this._positionABS.x, this._positionABS.y, 0);
				this._sourceNode.connect(this._gainNode);
	    		this._gainNode.connect(this._pannerNode);
				this._pannerNode.connect(context.destination);
		    } else {
		    	_WebAudio_createNodes.call(this);
		    }
		};

		var _WebAudio_connectNodes = WebAudio.prototype._connectNodes;
		WebAudio.prototype._connectNodes = function() {
		    if(!this._positionABS) {
		    	_WebAudio_connectNodes.call(this);
		    }
		};
		//END WebAudio
	//------------------------------------------------------------------------------

	//AudioManager
	//------------------------------------------------------------------------------
		//NEW
		AudioManager.playSeAt = function(se, point) {
			//LOG.p("Play SE at pos " + point.toString());
		    if (se.name) {
		        this._seBuffers = this._seBuffers.filter(function(audio) {
		            return audio.isPlaying();
		        });
		        var buffer = this.createBuffer('se', se.name);
		        this.updateSeParameters(buffer, se);
		        buffer.setPosition(point);
		        buffer.play(false);
		        this._seBuffers.push(buffer);
		    }
		};

		//NEW
		AudioManager.playSeLoopAt = function(se, point) {
			if(se.name) {
				 this._seBuffers = this._seBuffers.filter(function(audio) {
		            return audio.isPlaying();
		        });
				var buffer = this.createBuffer('se', se.name);
		        this.updateSeParameters(buffer, se);
		        buffer.setPosition(point);
		        buffer.play(true);
		        this._seBuffers.push(buffer);
		        return buffer;
			}

			return null;
		}
		//END AudioManager
	//------------------------------------------------------------------------------

	//SoundManager
	//------------------------------------------------------------------------------
		//OVER
		SoundManager.playSystemSound = function(n,point) {
		    if ($dataSystem) {
		    	if(point === undefined)
		        	AudioManager.playStaticSe($dataSystem.sounds[n]);
		        else {
		        	if(point != null) {
		        		//LOG.p("System sound " + n);
		        		AudioManager.playSeAt($dataSystem.sounds[n],point);
		        	}
		        }
		    }
		};

		SoundManager.playEnemyAttackAt = function(point) {
			this.playSystemSound(9,point);
		};

		SoundManager.playEnemyDamageAt = function(point) {
		    this.playSystemSound(10,point);
		};

		SoundManager.playEnemyCollapseAt = function(point) {
		    this.playSystemSound(11, point);
		};

		SoundManager.playBossCollapse1At = function(point) {
		    this.playSystemSound(12, point);
		};

		SoundManager.playBossCollapse2At = function(point) {
		    this.playSystemSound(13, point);
		};

		SoundManager.playActorDamageAt = function(point) {
		    this.playSystemSound(14, point);
		};

		SoundManager.playActorCollapseAt = function(point) {
		    this.playSystemSound(15, point);
		};

		SoundManager.playRecoveryAt = function(point) {
		    this.playSystemSound(16, point);
		};

		SoundManager.playMissAt = function(point) {
		    this.playSystemSound(17, point);
		};

		SoundManager.playEvasionAt = function(point) {
		    this.playSystemSound(18, point);
		};

		//END SoundManager
	//------------------------------------------------------------------------------

	//Game_Player
	//------------------------------------------------------------------------------
		Game_Player.prototype.updateMove = function() {
		    Game_Character.prototype.updateMove.call(this);
		    if (!this.isMoving()) {
		    	this._updateAudioABS();
		    }
		};

		var _Game_Player_refresh = Game_Player.prototype.refresh;
		Game_Player.prototype.refresh = function() {
			_Game_Player_refresh.call(this);
			this._updateAudioABS();
		}

		//NEW
		Game_Player.prototype._updateAudioABS = function() {
			var t = new Point(this._realX, this._realY).mapPointOnScreen();
		    WebAudio.updateListenerPosition(t);
		}
		//END Game_Player
	//------------------------------------------------------------------------------

	//Sprite_Animation
	//------------------------------------------------------------------------------
		//OVER
		Sprite_Animation.prototype.processTimingData = function(timing) {
		    var duration = timing.flashDuration * this._rate;
		    switch (timing.flashScope) {
		    case 1:
		        this.startFlash(timing.flashColor, duration);
		        break;
		    case 2:
		        this.startScreenFlash(timing.flashColor, duration);
		        break;
		    case 3:
		        this.startHiding(duration);
		        break;
		    }
		    if (!this._duplicated && timing.se) {
		        //AudioManager.playSe(timing.se);
		        var p = new Point(this.x,this.y);
		        p.convertToMap();
		        AudioManager.playSeAt(timing.se, p.mapPointOnScreen());
		    }
		};
		//END Sprite_Animation
	//------------------------------------------------------------------------------

	})();
//------------------------------------------------------------------------------

//==========================================================================================================================================================
// Alpha ABS EXTENSION Lighting
//==========================================================================================================================================================

//------------------------------------------------------------------------------
	(function() {

		if(Imported.TerraxLighting)
	 		AlphaABS.SYSTEM.EXTENSIONS.LIGHT = true;

		var xyLightArray = [];

		var _setLightAt = function(tiletype, x, y, radius, color, isOn, bright, isFlicker) {
			bright = PLATFORM.SDK.check(bright, 0.0);
			var isValidColor  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
			if (!isValidColor) {
	 			color = '#FFFFFF';
			}

			var tilefound = false;
			for (var i = 0; i < xyLightArray.length; i++) {
				var tilestr = xyLightArray[i];
				var tileargs = tilestr.split(";");
				if (tileargs[0] == tiletype && tileargs[1] == x && tileargs[2] == y) {
					tilefound = true;
					if(isOn)
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
		}

		var _updateABS = function() {

			var canvas = this._maskBitmap.canvas;
			var ctx = canvas.getContext("2d");
			ctx.globalCompositeOperation = 'lighter';

			var pw = $gameMap.tileWidth()
		    var ph = $gameMap.tileHeight();
			var dx = $gameMap.displayX();
			var dy = $gameMap.displayY();

			for(var i = 0; i<xyLightArray.length; i++) {
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

				if(tile_type == 700 && isOn) {
		 			var x1 =(pw/2)+(x-dx)*pw;
					var y1 =(ph/2)+(y-dy)*ph;

					if ($dataMap.scrollType === 2 || $dataMap.scrollType === 3) {
					if (dx-5>x) {
							var lxjump = $gameMap.width() - (dx-x);
							x1 = (pw/2)+(lxjump*pw);
						}
					}
					if ($dataMap.scrollType === 1 || $dataMap.scrollType === 3) {
						if (dy-5>y) {
							var lyjump = $gameMap.height() -(dy-y);
							y1 = (ph/2)+(lyjump*ph);
						}
					}
					this._maskBitmap.radialgradientFillRect(x1,y1, 0, radius , color, 'black', isFlicker, bright);
				}
			}
			ctx.globalCompositeOperation =  'source-over';
		}

		var _Spriteset_Map_createLightmask_Terrax = Spriteset_Map.prototype.createLightmask;
		Spriteset_Map.prototype.createLightmask = function() {
		    _Spriteset_Map_createLightmask_Terrax.call(this);
		    var temp = this._lightmask.__proto__.update;
		    this._lightmask.__proto__.update = function() {
		    	temp.call(this);
		    	_updateABS.call(this);
		    };
		};

		/*Game_Map.prototype.setFireAt = function(x, y, radius, color, isOn, bright) {
			_setLightAt(700, x, y, radius, color, isOn, bright, true);
		}

		Game_Map.prototype.setLightAt = function(x, y, radius, color, isOn, bright) {
			_setLightAt(700, x, y, radius, color, isOn, bright, false);
		}*/

		Game_Map.prototype.setLight = function(x,y, radius, color, bright, isFlicker) {
			bright = PLATFORM.SDK.check(bright, 0.0);
			isFlicker = PLATFORM.SDK.check(isFlicker, false);
			_setLightAt(700, x, y, radius, color, true, bright, isFlicker);
		}

		Game_Map.prototype.deleteLight = function(x,y) {
			_setLightAt(700, x, y, 0, '#FFFFFF', false, 0.0, false);
		}

		Game_Variables.prototype.valueXYArrayABS = function() {
		   	var default_TA = [];
	    	return this._xyArrayABS || default_TA;
		};

		Game_Variables.prototype.setXYArrayABS = function(value) {
	    	this._xyArrayABS = value;
		};

		function SaveLightingVariablesABS() {
			xyLightArray = $gameVariables.valueXYArrayABS();
		}

		var _Scene_load_onSavefileOk = Scene_Load.prototype.onSavefileOk;
		Scene_Load.prototype.onSavefileOk = function() {
			_Scene_load_onSavefileOk.call(this);
		    if(AlphaABS.SYSTEM.EXTENSIONS.LIGHT) {
		    	if(this._loadSuccess) {
		    		SaveLightingVariablesABS();
		    	}
		    }
		}
	})();
//------------------------------------------------------------------------------

//==========================================================================================================================================================
// Alpha ABS EXTENSION KeyBinding
//==========================================================================================================================================================

//------------------------------------------------------------------------------
	(function() {
	AlphaABS.SYSTEM.EXTENSIONS.KEY_BINDING = true;

	var ABSKey = AlphaABS.Key;
	var ABSUtils = AlphaABS.UTILS;
	var Point = ABSUtils.Point;
	var Consts = AlphaABS.SYSTEM;

	//Scene_KeyBinder
	//------------------------------------------------------------------------------
	    function Scene_KeyBinder() {
	        this.initialize.apply(this, arguments);
	    }

	    Scene_KeyBinder.prototype = Object.create(Scene_MenuBase.prototype);
	    Scene_KeyBinder.prototype.constructor = Scene_KeyBinder;

	    Scene_KeyBinder.prototype.initialize = function() {
	        Scene_MenuBase.prototype.initialize.call(this);
	    };

	    Scene_KeyBinder.prototype.create = function() {
	        Scene_MenuBase.prototype.create.call(this);
	        this.createOptionsWindow();
	    };

	    Scene_KeyBinder.prototype.terminate = function() {
	        Scene_MenuBase.prototype.terminate.call(this);
	        Input.saveSchemeABS();
	    };

	    Scene_KeyBinder.prototype.createOptionsWindow = function() {
	        this._optionsWindow = new Window_KeyBinderMain();
	        this._optionsWindow.setHandler('cancel', this.popScene.bind(this));
	        this.addWindow(this._optionsWindow);

	        this._helpWindowB = new Window_KeyBinderHelp(this._optionsWindow.x,this._optionsWindow.y + this._optionsWindow.height,this._optionsWindow.width,60);
	        this.addWindow(this._helpWindowB);
	        this._optionsWindow.setHelpWindow(this._helpWindowB);
	    };

	    AlphaABS.LIB.EXT.Scene_KeyBinder = Scene_KeyBinder;
	    //END Scene_KeyBinder
	//------------------------------------------------------------------------------

	//Scene_KeyBinderComplex
	//------------------------------------------------------------------------------
	    function Scene_KeyBinderComplex() {
	        this.initialize.apply(this, arguments);
	    }

	    Scene_KeyBinderComplex.prototype = Object.create(Scene_MenuBase.prototype);
	    Scene_KeyBinderComplex.prototype.constructor = Scene_KeyBinderComplex;

	    Scene_KeyBinderComplex.prototype.initialize = function() {
	        Scene_MenuBase.prototype.initialize.call(this);
	    };

	    Scene_KeyBinderComplex.prototype.bindMode = function() {
	        return 'controlPanel';
	    }

	    Scene_KeyBinderComplex.prototype.create = function() {
	        Scene_MenuBase.prototype.create.call(this);
	        this.createOptionsWindow();
	    };

	    Scene_KeyBinderComplex.prototype.createOptionsWindow = function() {
	        this._optionsWindow = new Window_KeyBinderComplex(this.bindMode());
	        this._optionsWindow.setHandler('cancel', this.popScene.bind(this));
	        this.addWindow(this._optionsWindow);

	        var h = 120;
	        this._viewWindow = new Window_KeyBinderView(this._optionsWindow.x, this._optionsWindow.y - h, this._optionsWindow.width, h, this.bindMode());
	        this.addWindow(this._viewWindow);

	        this._optionsWindow.setViewWindow(this._viewWindow);

	        this._helpWindowB = new Window_KeyBinderHelp(this._optionsWindow.x,this._optionsWindow.y + this._optionsWindow.height,this._optionsWindow.width,60);
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


	    Scene_KeyBinderComplexSkills.prototype.bindMode = function() {
	        return 'skillsPanel';
	    }
	    //END Scene_KeyBinderComplexSkills
	//------------------------------------------------------------------------------

	//Scene_KeyBinderComplexWeapons
	//------------------------------------------------------------------------------
	    function Scene_KeyBinderComplexWeapons() {
	        this.initialize.apply(this, arguments);
	    }

	    Scene_KeyBinderComplexWeapons.prototype = Object.create(Scene_KeyBinderComplex.prototype);
	    Scene_KeyBinderComplexWeapons.prototype.constructor = Scene_KeyBinderComplexWeapons;

	    Scene_KeyBinderComplexWeapons.prototype.bindMode = function() {
	        return 'weaponCircle';
	    }
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
	    Window_KeyBinderMain.prototype.makeCommandList = function() {
	        this.addGeneralBind();
	        this.addComplexBind();
	        this.addDefalutCommand();
	    }

	    //OVER
	    Window_KeyBinderMain.prototype.update = function() {
	        Window_Options.prototype.update.call(this);
	        if(this._keyChangeMode == true) {
	            ABSKey.checkTabPress();
	        }
	    }

	    //NEW
	    Window_KeyBinderMain.prototype.addGeneralBind = function() {
	         this.addCommand(Consts.STRING_MENU_KB_TAB[SDK.isRU()], 'tS');
	    }

	    //NEW
	    Window_KeyBinderMain.prototype.addComplexBind = function() {
	        this.addCommand(Consts.STRING_MENU_KB_SKILLS[SDK.isRU()], 'complex_bind_1');
	        this.addCommand(Consts.STRING_MENU_KB_CONTRL[SDK.isRU()], 'complex_bind_2');
	        if(AlphaABS.SYSTEM.PARAMS.CONTROL_PANEL_ALLOW_FAVWEAP == true)
	        	this.addCommand(Consts.STRING_MENU_KB_WEAPON[SDK.isRU()], 'complex_bind_3');
	    }

	    //NEW
	    Window_KeyBinderMain.prototype.addDefalutCommand = function() {
	        this.addCommand(Consts.STRING_MENU_KB_DEF[SDK.isRU()], 'complex_default');
	        this.addCommand(Consts.STRING_MENU_KB_BACK[SDK.isRU()],'complex_back');
	    }

	    Window_KeyBinderMain.prototype.commandName = function(index) {
	        var name = Window_Command.prototype.commandName.call(this, index);
	        var symbol = this.commandSymbol(index);
	        if(symbol == 'complex_default')
	            this.changeTextColor(Color.YELLOW.CSS);
	        return name;
	    };

	    //OVER
	    Window_KeyBinderMain.prototype.statusText = function(index) {
	        this.resetTextColor();
	        var symbol = this.commandSymbol(index);
	        if(this.isComplexCommand(symbol)) {
	            if(this.isComplexBind(symbol)) {
	                this.changeTextColor(Color.GREEN.CSS);
	                return '[...]';
	            } else
	                return '';
	        } else {
	           this.changeTextColor(Color.ORANGE.CSS);
	           return ABSKey.symbol[symbol].toUpperCase();
	        }
	    };

	    //OVER
	    Window_KeyBinderMain.prototype.processOk = function() {
	        SoundManager.playCursor();
	        var index = this.index();
	        var symbol = this.commandSymbol(index);
	        if(this.isComplexCommand(symbol)) {
	            if(this.isComplexBind(symbol)) {
	                if(symbol.contains("2")) {
	                    SceneManager.push(Scene_KeyBinderComplex);
	                }
	                if(symbol.contains("1")) {
	                    SceneManager.push(Scene_KeyBinderComplexSkills);
	                }

	                if(symbol.contains("3")) {
	                    SceneManager.push(Scene_KeyBinderComplexWeapons);
	                }
	            } else {
	                if(symbol.contains("_back")){
	                    this.processCancel();
	                } else {
	                    SoundManager.playOk();
	                    Input.toDefaultABS();
	                    this.refresh();
	                    LOGW.p("Keys binding reset to DEFAULT");
	                }
	            }
	        } else {
	            ABSKey.setKeyToChange(symbol, this);
	            this._keyChangeMode = true;
	            document.addEventListener('keypress', ABSKey.onKeyPress);
	            this.activateHelp();
	            this.deactivate();
	        }
	    }

	    //NEW
	    Window_KeyBinderMain.prototype.onKeyOk = function(isKey) {
	        if(isKey) {
	            this._keyChangeMode = false;
	            SoundManager.playOk();
	            document.removeEventListener('keypress', ABSKey.onKeyPress);
	            this.activate();
	            this.refresh();
	            this.deactivateHelp();
	        } else {
	            SoundManager.playBuzzer();
	        }
	    }

	    //NEW
	    Window_KeyBinderMain.prototype.isComplexCommand = function(symbol) {
	        return symbol.contains('complex');
	    }

	    //NEW
	    Window_KeyBinderMain.prototype.isComplexBind = function(symbol) {
	        return this.isComplexCommand(symbol) && symbol.contains('bind');
	    }

	    //NEW
	    Window_KeyBinderMain.prototype.activateHelp = function() {
	        if (this._helpWindow) {
	            this._helpWindow.show();
	            this._helpWindow.open();
	        }
	    }

	    //NEW
	    Window_KeyBinderMain.prototype.deactivateHelp = function() {
	        if (this._helpWindow) {
	            this._helpWindow.close();
	        }
	    }
	    //END Window_KeyBinderMain
	//------------------------------------------------------------------------------

	//Window_KeyBinderComplex
	//------------------------------------------------------------------------------
	    function Window_KeyBinderComplex() {
	        this.initialize.apply(this, arguments);
	    }

	    Window_KeyBinderComplex.prototype = Object.create(Window_KeyBinderMain.prototype);
	    Window_KeyBinderComplex.prototype.constructor = Window_KeyBinderComplex;

	    Window_KeyBinderComplex.prototype.initialize = function(mode) {
	        this._mode = mode;
	        Window_KeyBinderMain.prototype.initialize.call(this);
	    };

	    Window_KeyBinderComplex.prototype.setViewWindow = function(viewWindow) {
	        this._viewWindow = viewWindow;
	    }

	    //NEW
	    Window_KeyBinderComplex.prototype.addGeneralBind = function() {
	        switch(this._mode) {
	            case 'controlPanel':
	                this.addCommand(Consts.STRING_MENU_KB_ATTACK[SDK.isRU()], 'cpA');
	                var params = AlphaABS.SYSTEM.PARAMS;
	                if(params.CONTROL_PANEL_ALLOW_FOLLOW == true)
	                	this.addCommand(Consts.STRING_MENU_KB_FOLLOW[SDK.isRU()], 'cpW');
	                if(params.CONTROL_PANEL_ALLOW_JUMP == true)
	                	this.addCommand(Consts.STRING_MENU_KB_JUMP[SDK.isRU()], 'cpS');
	                if(params.CONTROL_PANEL_ALLOW_ROTATE == true)
	                	this.addCommand(Consts.STRING_MENU_KB_ROTATE[SDK.isRU()], 'cpD');
	                if(params.CONTROL_PANEL_ALLOW_FAVWEAP == true)
	                	this.addCommand(Consts.STRING_MENU_KB_WEAP[SDK.isRU()], 'wC');
	                break;
	            case 'skillsPanel':
	            	var t = Consts.STRING_MENU_KB_SLOT[SDK.isRU()];
	                this.addCommand(t + ' 1', 'sp1');
	                this.addCommand(t + ' 2', 'sp2');
	                this.addCommand(t + ' 3', 'sp3');
	                this.addCommand(t + ' 4', 'sp4');
	                this.addCommand(t + ' 5', 'sp5');
	                this.addCommand(t + ' 6', 'sp6');
	                this.addCommand(t + ' 7', 'sp7');
	                this.addCommand(t + ' 8', 'sp8');
	                break;
	            case 'weaponCircle':
	                this.addCommand(Consts.STRING_MENU_KB_TOP[SDK.isRU()],'scW');
	                this.addCommand(Consts.STRING_MENU_KB_RIGHT[SDK.isRU()],'scD');
	                this.addCommand(Consts.STRING_MENU_KB_BOTTOM[SDK.isRU()], 'scS');
	                this.addCommand(Consts.STRING_MENU_KB_LEFT[SDK.isRU()],'scA');
	                break;
	        }
	    }

	    //OVER
	    Window_KeyBinderComplex.prototype.refresh = function() {
	        Window_KeyBinderMain.prototype.refresh.call(this);
	        if(this._viewWindow) this._viewWindow.refresh();
	    }

	    //NEW
	    Window_KeyBinderComplex.prototype.addComplexBind = function() {
	        //EMPTY
	    }

	    //NEW
	    Window_KeyBinderComplex.prototype.addDefalutCommand = function() {
	        this.addCommand(Consts.STRING_MENU_KB_BACK[SDK.isRU()],'complex_back');
	    }

	    //END Window_KeyBinderComplex
	//------------------------------------------------------------------------------

	//Window_KeyBinderHelp
	//------------------------------------------------------------------------------
	    function Window_KeyBinderHelp() {
	         this.initialize.apply(this, arguments);
	    }

	    Window_KeyBinderHelp.prototype = Object.create(Window_Base.prototype);
	    Window_KeyBinderHelp.prototype.constructor = Window_KeyBinderHelp;

	    Window_KeyBinderHelp.prototype.initialize = function(x, y, width, height) {
	        Window_Base.prototype.initialize.call(this, x, y, width, height);
	        this._timer = new Game_TimerABS();
	        this._tSprite = new Sprite(new Bitmap(width - 6,height - 6));
	        this._tSprite.y = 0;//this._tSprite.height/2;
	        //this._tSprite.opacity = 0;
	        //this._tSprite.bitmap.fillRect(0,0,this._tSprite.bitmap.width,this._tSprite.bitmap.height, Color.RED.CSS);
	        this._tSprite.bitmap.textColor = Color.RED.getLightestColor(200).CSS;
	        this._tSprite.bitmap.drawText(Consts.STRING_MENU_KB_KEY[SDK.isRU()],0,
	        	this._tSprite.bitmap.height/2,
	        	this._tSprite.bitmap.width, 1, 'center');
	        this.addChild(this._tSprite);

	        this.swing = new AlphaABS.LIB.UIObject_OpacitySwing(this._tSprite, 70);
	        this.swing.setRepeat();

	        this.hide();
	        this.close();
	    }

	    Window_KeyBinderHelp.prototype.close = function() {
	        this.swing.stop();
	        this.swing.reset();
	        this._tSprite.visible = false;
	        Window_Base.prototype.close.call(this);
	    }

	    Window_KeyBinderHelp.prototype.update = function() {
	        Window_Base.prototype.update.call(this);
	        this.refresh();
	    }

	    Window_KeyBinderHelp.prototype.refresh = function() {
	        if(this.isOpen()) {
	            if(!this.swing.isStarted()) {
	                this._tSprite.visible = true;
	                this.swing.start();
	            }
	            this.swing.update();
	        }
	    }

	    Window_KeyBinderHelp.prototype.clear = function() {
	    }
	//------------------------------------------------------------------------------

	//Window_KeyBinderView
	//------------------------------------------------------------------------------
	    function Window_KeyBinderView() {
	        this.initialize.apply(this, arguments);
	    }

	    Window_KeyBinderView.prototype = Object.create(Window_Base.prototype);
	    Window_KeyBinderView.prototype.constructor = Window_KeyBinderView;

	    Window_KeyBinderView.prototype.initialize = function(x, y, width, height, mode) {
	        this._mode = mode;
	        Window_Base.prototype.initialize.call(this, x, y, width, height);
	        this._configMode();
	    }

	    Window_KeyBinderView.prototype.setViewNode = function(viewNode) {
	        this._viewNode = viewNode;
	        if(this._mode != 'weaponCircle') {
	            this._viewNode.x = SDK.toCX(viewNode.width || 341, this.width);
	            this._viewNode.y = SDK.toCX(viewNode.height || 48, this.height);
	        } else {
	            this._viewNode.x = SDK.toCX(viewNode._radius_max() * 0.15, this.width);
	            this._viewNode.y = SDK.toCX(viewNode._radius_max() * 0.06, this.height);
	        }
	        this.addChild(this._viewNode);
	    }

	    Window_KeyBinderView.prototype.refresh = function() {
	        if(this._viewNode) {
	            this._viewNode.refresh();
	        }
	    }

	    Window_KeyBinderView.prototype._configMode = function() {
	        switch(this._mode) {
	            case 'controlPanel':
	                var t = new AlphaABS.LIB.UIObject_ControlPanel(46,160);
	                t.createBaseItems();
	                t.transfer();
	                t.setEditMode();
	                this.setViewNode(t); //SHIT НЕ нужно размеры задавать, их надо считать
	             break;
	            case 'skillsPanel':
	                var tt = new AlphaABS.LIB.Sprite_SkillPanelABS_L();
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
	    }
	    //END Window_KeyBinderView
	//------------------------------------------------------------------------------

	//UIObject_InputCircleConfig
	//------------------------------------------------------------------------------
	    function UIObject_InputCircleConfig() {
	        this.initialize.apply(this, arguments);
	    }

	    UIObject_InputCircleConfig.prototype = Object.create(AlphaABS.LIB.UIObject_InputCircle.prototype);
	    UIObject_InputCircleConfig.prototype.constructor = UIObject_InputCircleConfig;

	    UIObject_InputCircleConfig.prototype.refresh = function() {
	        var t = AlphaABS.Key.symbol;
	        var data = [t.scW,t.scD,t.scS,t.scA];
	        this.setHelps(data.map(function(argument) {
	          return argument.toUpperCase();
	        }));
	        this.showHelp();
	    }
	    AlphaABS.LIB.UIObject_InputCircleConfig = UIObject_InputCircleConfig;
	    //END UIObject_InputCircleConfig
	//------------------------------------------------------------------------------

	})();
//------------------------------------------------------------------------------

//Plugin Alpha_ABS automatic build by MVPluginBuilder. 09.01.2018
