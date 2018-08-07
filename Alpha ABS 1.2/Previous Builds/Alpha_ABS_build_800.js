/*
 * Official Web Page
 * <https://kagedesuworkshop.blogspot.ru/p/alpha-abs.html>
 *
 * License
 * Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * <https://creativecommons.org/licenses/by-nc-sa/4.0/>
 *
 * Copyright (c) 2018 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kagedesuworkshop.blogspot.ru/>
 *
 */

//=============================================================================
// Alpha_ABS
//=============================================================================
//Version 1.2 (26.05.2018)
//Build 800

/*:
 * @author Pheonix KageDesu
 * @plugindesc The real-time action battle system
 * @help See Alpha_ABS_settings.js to plugin Settings
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


/* jshint -W097 */
/* jshint -W117 */

"use strict";

var Imported = Imported || {};
Imported.AlphaABS = true;

var AlphaABS = {};
AlphaABS.Version = '1.2';
AlphaABS.Build = 800;

AlphaABS.Versions = {
  'Alpha ABS': AlphaABS.Version + ' : ' + AlphaABS.Build,
  'Platform': '1.4.3',
  'CoffeeScript CLI': '2.1.1'
};

AlphaABS.LIBS = {};

AlphaABS.register = function (library) {
  this.LIBS[library.name] = library;
};

//var DEV = DEV || {}; //! Comment this line on release


(function () {
  var _SceneManager_catchException_ABS = SceneManager.catchException;
  SceneManager.catchException = function (e) {
    SceneManager._printABSInfo();
    _SceneManager_catchException_ABS.call(this, e);
  };

  SceneManager._printABSInfo = function () {
    console.error("Using AlphaABS [Version: " + AlphaABS.Version + " ; Build: " + AlphaABS.Build + " ; on MV  " + Utils.RPGMAKER_VERSION + "]");
  };

  var _SceneManager_onError_ABS = SceneManager.onError;
  SceneManager.onError = function (e) {
    SceneManager._printABSInfo();
    _SceneManager_onError_ABS.call(this, e);
  };



  ImageManager.loadPictureABS = function (filename) {
    return this.loadBitmap('img/ABS/', filename, 0, true);
  };

  ImageManager.loadIconABS = function (iconSymbol /*, size*/ ) {
    if (SDK.isInt(iconSymbol)) {
      var size = SDK.check(size, 32);
      return ImageManager.getIcon(ImageManager.ICON_PATH, iconSymbol, size);
    } else {
      return ImageManager.getIconABS(iconSymbol);
    }
  };

  ImageManager.getIconABS = function (iconName) {
    var icon = this.loadPictureABS('icon_' + iconName);
    return icon;
  };

  ImageManager.drawIconABS = function (x, y, iconSymbol, bitmap, size) {
    if (SDK.isInt(iconSymbol)) {
      size = SDK.check(size, 32);
      SDK.drawIcon(x, y, iconSymbol, bitmap, size);
    } else {
      var icon = this.getIconABS(iconSymbol);
      icon.addLoadListener(function () {
        bitmap.blt(icon, 0, 0, icon.width, icon.height, x, y);
      });
    }
  };

  
  var _JsonEx_decode = JsonEx._decode;
  JsonEx._decode = function (value, circular, registry) {
    var type = Object.prototype.toString.call(value);
    if (type === '[object Object]' || type === '[object Array]') {
      if (value['@']) {
        var constructor = AlphaABS.LIBS[value['@']] || PLATFORM[value['@']];
        if (constructor) {
          value = this._resetPrototype(value, constructor.prototype);
          value['@'] = null;
        }
      }
    }
    return _JsonEx_decode.call(this, value, circular, registry);
  };
})();

//==========================================================================================================================================================
// JSPlatform
//==========================================================================================================================================================
var PLATFORM = PLATFORM || {};

  if(!PLATFORM.Version) {
  (function($) {
  $.Version = 143;
  $.VersionString = '1.4.3';

  "use strict";

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
    Rectangle.prototype.toArray = function() {
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
      //TODO: Temp solution
      if(event.keyCode == 87) {
        this._currentState['w'] = true;
        return;
      }
      //TODO: Temp solution
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
      //TODO: Temp solution
      if(event.keyCode == 87) {
        this._currentState['w'] = false;
        return;
      }
      //TODO: Temp solution
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
    };

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

    SDK.isUndefined = function(typeName) {
      return (typeof(window[typeName]) != "undefined");
    };

    SDK.applyInterface = function(targetClass, interfacex){
      for (var i in interfacex) {
        if (interfacex.hasOwnProperty(i)) {
          targetClass.prototype[i] = interfacex[i];
        }
      }
    };

    //Определить константу у Объекта
    SDK.setConstant = function(object, name, value) {
      object[name] = value;
      if(typeof(object[name]) == "object")
        Object.freeze(object[name]); //freeze - замораживает все поля объекта (но не ссылку на объект)
      Object.defineProperty(object, name, {writable: false}); //ссылка на объект теперь тоже заморожена
    };
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

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ParametersManager.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------

//TODO: Это надо в Platform

//NEW
PluginManager.getPluginParametersByRoot = function (rootName) {
    for (var property in this._parameters) {
        if (this._parameters.hasOwnProperty(property)) {
            var pluginParameters = this._parameters[property];
            if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName))
                return pluginParameters;
        }
    }
    return PluginManager.parameters(rootName);
};

//NEW
PluginManager.isPluginParametersContentKey = function (pluginParameters, key) {
    return (pluginParameters[key] !== undefined);
};



function ParametersManager() {
    this.initialize.apply(this, arguments);
}

ParametersManager.prototype.initialize = function (pluginName) {
    this._cache = {};
    this._pluginName = pluginName;
    this._parameters = PluginManager.getPluginParametersByRoot(pluginName);
};

ParametersManager.prototype.isLoaded = function () {
    return this._parameters && (this._parameters.hasOwnProperty(this._pluginName));
};

ParametersManager.prototype.isHasParameter = function (name) {
    return (this._parameters[name] !== undefined);
};

ParametersManager.prototype.getString = function (name) {
    return this._parameters[name];
};

ParametersManager.prototype.convertField = function (object, fieldName) {
    try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
    } catch (e) {
        console.log('Error while convert field ' + e.name);
        object[fieldName] = false;
    }
    return object;
};

ParametersManager.prototype.convertImage = function (object, fieldName) {
    object[fieldName] = this.loadImage(object[fieldName]);
    return object;
};

ParametersManager.prototype.loadImage = function (filename, smooth) {
    if (filename) {
        var path = filename.split('/');
        filename = path.last();
        path = path.first() + '/';
        return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
    } else {
        return ImageManager.loadEmptyBitmap();
    }
};

ParametersManager.prototype.getFromCacheOrInit = function (name, func) {
    if (!this.isInCache(name)) {
        if (func) {
            var object = func.call(this);
            this.putInCache(name, object);
        }
    }
    return this.getFromCache(name);
};

ParametersManager.prototype.isInCache = function (name) {
    return this._cache.hasOwnProperty(name);
};

ParametersManager.prototype.putInCache = function (name, object) {
    this._cache[name] = object;
};

ParametersManager.prototype.getFromCache = function (name) {
    return this._cache[name];
};

ParametersManager.prototype.getNumber = function (name) {
    var number = this.getObject(name);
    if (SDK.isInt(number)) {
        return number;
    } else {
        return 0;
    }
};

ParametersManager.prototype.getObject = function (name) {
    if (this.isHasParameter(name))
        return JSON.parse(this.getString(name) || '{}');
    else
        return {};
};

ParametersManager.prototype.getBoolean = function (name) {
    if (this.isHasParameter(name))
        return JSON.parse(this.getString(name) || false);
    else
        return false;
};

//■ END ParametersManager
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ System.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//SYSTEMATIZATION_LEVEL_1

AlphaABS.SYSTEM = {};
var LOGW = new PLATFORM.DevLog("Alpha ABS");
LOGW.on();
LOGW.setColors(Color.ORANGE.hex(), Color.BLACK.getLightestColor(100).hex());

(function ($) {
  $.EXTENSIONS = {};

  var SDK = PLATFORM.SDK;
  SDK.setConstant($, 'FRAMES_PER_SECOND', 60);
  SDK.setConstant($, 'FONT', 'VL-Gothic-Regular'); //TODO: ЭТО НАДО В ПАРАМЕТРЫ

  $.LOGW = LOGW;

  $.STRING_ALERT_NEEDTARGET = 'Need target';
  $.STRING_ALERT_TOFAR = 'Target too far';
  $.STRING_ALERT_INTERRUPT = 'Action interrupt';
  $.STRING_ALERT_NOAUTOA = "Can't use attack now";
  $.STRING_ALERT_NOUSE = "Can't use action now";
  $.STRING_ALERT_NOCHARGES = "Can't use, no charges";
  $.STRING_ALERT_RECHARGE = 'Action is not ready';
  $.STRING_ALERT_CASTMOVE = "Can't use while moving";
  $.STRING_ALERT_NOINBATTLE = "Need get out of the battle";
  $.STRING_ALERT_NEWLEVEL = "Level up!";

  $.STRING_POPUP_EVADE = 'Evade';
  $.STRING_POPUP_MISS = 'Miss';
  $.STRING_POPUP_FAIL = 'Fail';
  $.STRING_POPUP_ABSORB = 'Absorb';
  $.STRING_POPUP_IMMUNE = 'Immune';
  $.STRING_POPUP_WEAK = 'Weak';
  $.STRING_POPUP_SKILL = 'Ready!';

  $.STRING_MENU_UIVIS = 'Show UI';
  $.STRING_MENU_UIPOS = 'Edit UI';
  $.STRING_MENU_KEYBIND = 'Controls';

  $.STRING_MENU_KB_KEY = 'Press any key';
  $.STRING_MENU_KB_TAB = 'Target select';
  $.STRING_MENU_KB_SKILLS = 'Skills panel';
  $.STRING_MENU_KB_CONTRL = 'Сontrol panel';
  $.STRING_MENU_KB_WEAPON = 'Weapon circle';
  $.STRING_MENU_KB_DEF = 'Reset to default';
  $.STRING_MENU_KB_BACK = 'Back';
  $.STRING_MENU_KB_SLOT = 'Item';
  $.STRING_MENU_KB_ATTACK = 'Attack';
  $.STRING_MENU_KB_FOLLOW = 'Follow';
  $.STRING_MENU_KB_JUMP = 'Jump';
  $.STRING_MENU_KB_ROTATE = 'Rotate';
  $.STRING_MENU_KB_LEFT = 'Left';
  $.STRING_MENU_KB_RIGHT = 'Right';
  $.STRING_MENU_KB_BOTTOM = 'Bottom';
  $.STRING_MENU_KB_TOP = 'Top';
  $.STRING_MENU_KB_WEAP = 'Weapons';

  $.STRING_SKILL_INFO_RADIUS = 'Radius: ';
  $.STRING_SKILL_INFO_RANGE = 'Range: ';
  $.STRING_SKILL_INFO_RANGE2 = 'Range: ';
  $.STRING_SKILL_INFO_CAST = 'Cast: ';
  $.STRING_SKILL_INFO_COOLDOWN = 'Cooldown: ';
  $.STRING_SKILL_INFO_DESCRIPTION = 'Description';
  $.STRING_SKILL_INFO_HAS = 'Has: ';
  $.STRING_SKILL_INFO_USE = 'Use: ';
  $.STRING_SKILL_INFO_CHARGES = 'Charges: ';
  $.STRING_SKILL_INFO_RELOADCHR = 'Reload charges: ';
  $.STRING_SKILL_INFO_ONTARGET = 'Need target';
  $.STRING_SKILL_INFO_ONUSER = 'On user';
  $.STRING_SKILL_INFO_AREA = 'Area select';
  $.STRING_SKILL_INFO_CIRCLE = 'Around user';
  $.STRING_SKILL_INFO_ZONE = 'Zone';
  $.STRING_SKILL_INFO_SEC = ' sec.';
  $.STRING_SKILL_INFO_TARGET = '<target>';
  $.STRING_SKILL_INFO_DAMAGE = 'Damage ';
  $.STRING_SKILL_INFO_RECOVER = 'Recover ';
  $.STRING_SKILL_INFO_DRAIN = 'Drain ';
  $.STRING_SKILL_INFO_MELEE = 'Melee ';


  $.STRING_WARNING_COMMON = "This command can't be executed on ABS map";
  $.STRING_WARNING_COMMON2 = "This command can't be executed while player in battle!";
  $.STRING_WARNING_COMMON3 = "This command not suported with ABS!";

  $.STRING_WARNING_COMMAND129 = "You can't remove party leader from party on ABS map!";
  $.STRING_WARNING_COMMAND321 = "You can't change actor class on ABS map!";

  $.STRING_WARNING_SKILLWC = "Weapon don't support casting";
  $.STRING_WARNING_SKILLOC = "Support only 'Battle Screen' items!";
  $.STRING_WARNING_SKILLWVR = "Weapon can't support Vector with radius";


  $.STRING_ERROR_SKILLNAN = "You need setup you project for Alpha ABS!"; //TODO: Добавить ссылку на инструкцию как это делать
  $.STRING_ERROR_OLDDATA = "Your project use old RPG Maker MV core files (js/), update files to 1.6.0 or above";

})(AlphaABS.SYSTEM);

// ■ END System.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Utils.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
AlphaABS.UTILS = {};

(function ($) {

  "use strict";

  var SDK = PLATFORM.SDK;

  $.printPoint = function (x, y) {
    return "[" + x + " ; " + y + "]";
  };

  $.distanceTo = function (a, b) {
    if (a === undefined || b === undefined) {
      return 0; //This is very very bad!
    }
    if (a === null || b === null) {
      return 0;
    }
    return $gameMap.distance(a.x, a.y, b.x, b.y);
  };

  $.inFront = function (charA, charB) {
    try {
      var d = charA.direction();
      var x2 = $gameMap.roundXWithDirection(charA.x, d);
      var y2 = $gameMap.roundYWithDirection(charA.y, d);
      return this.inPoint(charB, new PointX(x2, y2));
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  $.inDirection = function (charA, charB) {
    try {
      var d = charA.direction();
      switch (d) {
        case 8:
          return (charB.y <= charA.y);
        case 4:
          return (charB.x <= charA.x);
        case 6:
          return (charB.x >= charA.x);
        case 2:
          return (charB.y >= charA.y);
        default:
          return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  $.inDirectionHard = function (charA, charB) {
    try {
      var inD = this.inDirection(charA, charB);
      if (!inD) {
        return false;
      }
      var d = charA.direction();
      switch (d) {
        case 8:
          return (charB.x == charA.x);
        case 4:
          return (charB.y == charA.y);
        case 6:
          return (charB.y == charA.y);
        case 2:
          return (charB.x == charA.x);
        default:
          return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  $.inPoint = function (a, b) {
    try {
      if (!a) return false;
      if (!b) return false;
      return (a.x == b.x && a.y == b.y);
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  $.inRadius = function (charA, radius, members) {
    try {
      var t = [];
      members.forEach(function (item) {
        if (AlphaABS.UTILS.distanceTo(charA, item) < radius) {
          t.push(item);
        }
      });
      return t;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  $.toGlobalCoord = function (layer, coordSymbol) {
    return SDK.toGlobalCoord(layer, coordSymbol);
  };

  $.framesToTimeA = function (frames, oneSecond) {
    try {
      if (oneSecond === undefined) oneSecond = 60;
      var secs = Math.floor((frames + oneSecond) / oneSecond);
      var string = '';
      if (secs > 59) {
        var min = Math.floor(secs / 60);
        string = min + "m";
      } else {
        string = secs + "s";
      }
      return string;
    } catch (e) {
      console.error(e);
      return "!s";
    }
  };

  $.framesToTimeB = function (frames, oneSecond) {
    try {
      if (oneSecond === undefined) oneSecond = 60;
      var secs = Math.floor((frames + oneSecond) / oneSecond);
      var string = '';
      if (secs > 59) {
        var min = Math.floor(secs / 60);
        var minm = (min < 10) ? ('0' + min) : min;
        var secx = secs - (min * 60);
        secx = (secx < 10) ? ('0' + secx) : secx;
        string = min + ":" + secx;
      } else {
        string = '0:' + ((secs < 10) ? ('0' + secs) : secs);
      }
      return string;
    } catch (e) {
      console.error(e);
      return "!:!";
    }
  };

  $.getDirKey = function (char) {
    try {
      var t = char.direction();
      switch (t) {
        case 8:
          return 'u';
        case 4:
          return 'l';
        case 6:
          return 'r';
        case 2:
          return 'd';
        default:
          return 'r';
      }
    } catch (e) {
      console.error(e);
      return 'r';
    }
  };

  $.linkSprite = function (sprite1, sprite2) {
    try {
      var _r = 0; //right (from right)
      var _u = 0; //up

      if (SDK.toGlobalCoord(sprite1, 'x') < Graphics.width / 2) {
        _r = 1; //Left (From left)
      }

      if (SDK.toGlobalCoord(sprite1, 'y') < Graphics.height / 2) {
        _u = 1; //Down
      }

      if (_r == 1) {
        sprite2.x = sprite1.x + sprite1.width + 1;
      } else {
        sprite2.x = sprite1.x - sprite2.width - 1;
      }

      if (_u == 1) {
        sprite2.y = sprite1.y + sprite1.height + 1;
      } else {
        sprite2.y = sprite1.y - sprite2.height - 1;
      }
    } catch (e) {
      console.error(e);
    }
  };

  //PointX
  //------------------------------------------------------------------------------
  /* jshint -W104 */
  class PointX {
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
      return new PointX(nx, ny);
    }

    static ScreenXYOnScreen(x, y) {
      var p = new PointX(x, y);
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
      if (Graphics._realScale != 1) {
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
      return new PointX(this._x, this._y);
    }

    toString() {
      return AlphaABS.UTILS.printPoint(this._x, this._y);
    }

    toPoint() {
      return this;
    }

    static _getEmpty() {
      if (PointX._emptyPoint === undefined) {
        PointX._emptyPoint = new PointX(0, 0);
      }
      return PointX._emptyPoint;
    }
  }

  Object.defineProperties(PointX.prototype, {
    x: {
      get: function () {
        return this._x;
      },
      configurable: true
    },
    y: {
      get: function () {
        return this._y;
      },
      configurable: true
    }
  });

  Object.defineProperties(PointX, {
    Empty: {
      get: function () {
        return PointX._getEmpty();
      },
      configurable: false
    }
  });

  Array.prototype.toPoint = function () {
    return new PointX(this[0], this[1]);
  };

  Game_CharacterBase.prototype.toPoint = function () {
    return new PointX(this.x, this.y);
  };
  //END PointX
  //------------------------------------------------------------------------------

  //SMouse
  //------------------------------------------------------------------------------
  var __SmouseNeedTrack = false;
  var __SmousePosition = null;

  function SMouse() {
    throw new Error('This is a static class');
  }

  SMouse.initMouseTrack = function () {
    document.onmousemove = SMouse.handleMouseMove;
    __SmouseNeedTrack = false;
    __SmousePosition = PointX.Empty;
  };

  SMouse.setTrack = function (isSet) {
    //console.log("Track is " + isSet);
    __SmouseNeedTrack = isSet;
    if (isSet) this.handleMouseMove(null);
  };

  SMouse.isTracked = function () {
    return (__SmouseNeedTrack == true);
  };

  SMouse.handleMouseMoveCanvas = function (canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    __SmousePosition = new PointX(evt.clientX - rect.left, evt.clientY - rect.top);
    console.log("Mouse " + __SmousePosition);
  };

  SMouse.handleMouseMove = function (event) {
    if (!__SmouseNeedTrack) return;

    var dot, eventDoc, doc, body, pageX, pageY;

    event = event || window.event; // IE-ism
    if (!event) return;

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
        (doc && doc.scrollTop || body && body.scrollTop || 0) -
        (doc && doc.clientTop || body && body.clientTop || 0);
    }

    __SmousePosition = new PointX(event.pageX, event.pageY);
    __SmousePosition.convertToCanvas();
  };

  SMouse.getMousePosition = function () {
    if (!Utils.isMobileDevice())
      return __SmousePosition;
    else
      return PointX.Empty;
  };
  //END SMouse
  //------------------------------------------------------------------------------

  //SMath
  //------------------------------------------------------------------------------
  function SMath() {
    throw new Error('This is a static class');
  }

  SMath.distance = function (point1, point2) {
    try {
      return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    } catch (e) {
      console.error(e);
      return 0;
    }
  };

  SMath.angle = function (point1, point2) {
    try {
      var cl = SMath.distance(point1, point2);
      var al = Math.abs(point2.x - point1.x);
      var bl = Math.abs(point2.y - point1.y);

      if (al == 0 || cl == 0 || bl == 0)
        return 0;
      else {
        var angle = Math.acos((bl * bl + cl * cl - al * al) / (2 * bl * cl));
        return angle;
      }
    } catch (e) {
      console.error(e);
      return 0;
    }
  };

  SMath.rotateTo = function (point1, angle) {
    try {
      var nx = point1.x * Math.cos(angle) - point1.y * Math.sin(angle);
      var ny = point1.y * Math.cos(angle) + point1.x * Math.sin(angle);
      return new PointX(nx, ny);
    } catch (e) {
      console.error(e);
      return PointX.Empty;
    }
  };

  SMath.moveTo = function (point1, point2, step) {
    try {
      var rotated = SMath.rotateTo(new PointX(0, step), SMath.angle(point1, point2));
      var fx = 0;
      var fy = 0;
      if (point2.y < point1.y) {
        fy = point1.y - rotated.y;
      } else {
        fy = point1.y + rotated.y;
      }
      if (point2.x < point1.x) {
        fx = point1.x + rotated.x;
      } else {
        fx = point1.x - rotated.x;
      }
      return new PointX(fx, fy);
    } catch (e) {
      console.error(e);
      return PointX.Empty;
    }
  };

  SMath.inRect = function (point, rectangle) {
    try {
      var x2 = rectangle.x + rectangle.width;
      var y2 = rectangle.y + rectangle.height;
      if (point.x > rectangle.x && point.x < x2 && point.y < y2 && point.y > rectangle.y) {
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  //END SMath
  //------------------------------------------------------------------------------

  //Расширение
  $.extendMe = function (obj) {
    obj.SMath = SMath;
    obj.PointX = PointX;
    obj.SMouse = SMouse;
  };

  $.extendMe($);

})(AlphaABS.UTILS);

Object.freeze(AlphaABS.UTILS);
Object.defineProperty(AlphaABS, 'UTILS', {
  writable: false
});
AlphaABS.register(AlphaABS.UTILS.PointX);
// ■ END Utils.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleMangerABS.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
  var LOG = new PLATFORM.DevLog("BattleManagerABS");
  LOG.applyPresetLib();

  window.__selected = null; //! Comment this line on release

  function BattleManagerABS() {
    throw new Error('This is a static class');
  }

  AlphaABS.register(BattleManagerABS);

  var SMouse = AlphaABS.UTILS.SMouse;
  var Consts = AlphaABS.SYSTEM;
  var ABSUtils = AlphaABS.UTILS;

  BattleManagerABS.init = function () {
    BattleManagerABS._setupPlugins();
    BattleManagerABS.timer = new Game_TimerABS();
    BattleManagerABS._ready = false;
    BattleManagerABS._plTargets = [];
    BattleManagerABS.clearABS();
    BattleManagerABS._prepareResources();

    Input.loadSchemeABS();
    AlphaABS.LIBS.ABSPathfinding.init();
  };

  BattleManagerABS._setupPlugins = function () {
    if (Imported.YEP_ItemCore == true) {
      var _Game_Party_gainIndependentItem_YEP = Game_Party.prototype.gainIndependentItem;
      Game_Party.prototype.gainIndependentItem = function (item, amount, includeEquip) {
        _Game_Party_gainIndependentItem_YEP.call(this, item, amount, includeEquip);
        if ($gameMap.isABS()) {
          if (amount > 0 && !this._noNotifyABS) {
            AudioManager.playSe({
              name: 'Equip2',
              pan: 0,
              pitch: 140,
              volume: 90
            });
            AlphaABS.BattleUI.pushItemOnPanel(item);
          }

          if (DataManager.isWeapon(item)) {
            AlphaABS.BattleUI.refreshWeaponCircle();
          }
        }
      };
    }

    if (Imported.YEP_EquipCore == true) {
      var _Window_EquipSlot_drawItem_YEP = Window_EquipSlot.prototype.drawItem;
      Window_EquipSlot.prototype.drawItem = function (index) {
        _Window_EquipSlot_drawItem_YEP.call(this, index);
        this._drawFavWeapSymbol(index);
      };
    }

    if (Imported.YEP_SaveCore == true) {
      var _Scene_File_performActionLoad_YEP = Scene_File.prototype.performActionLoad;
      Scene_File.prototype.performActionLoad = function () {
        if (BattleManagerABS._isABSMap == true) {
          BattleManagerABS.stopABS();
        }
        _Scene_File_performActionLoad_YEP.call(this);
      };
    }
  };

  BattleManagerABS.clearABS = function () {
    this._isABSMap = false;
    this._absMapId = -1;
  };

  BattleManagerABS._prepareResources = function () {
    ImageManager.loadPictureABS('CircleSegment_small');
    ImageManager.loadPictureABS('CircleSegment_small_down');
    ImageManager.loadPictureABS('CircleSegment_small_L');
    ImageManager.loadPictureABS('CircleSegment_small_R');
  };


  BattleManagerABS.connectProcess = function () {
    this._process = new AlphaABS.LIBS.Game_BattleProcessABS();
  };

  BattleManagerABS.battleProcess = function () {
    return this._process;
  };

  BattleManagerABS.onMapLoaded = function () {
    if (this._isABSMap && $gameMap.isABS()) { //Если переход между АБС картами, то не делаем StopABS, а только prepare Заного
      if (this._absMapId != $gameMap.mapId()) {
        $gameTroop.initABS(); //Need restart
        this._absMapId = $gameMap.mapId();
      }
      BattleManagerABS.updateABSSession();
      LOG.p("Manager : Go to ABS map from ABS map, Prepare new ABS session");
      return;
    }

    if (this._isABSMap && !$gameMap.isABS()) { //Если переход от AБС карты на обычную, то надо всё остановить
      BattleManagerABS.stopABS();
      LOG.p("Manager : Go to map from ABS map, stop ABS session");
      return;
    }

    if (!this._isABSMap && $gameMap.isABS()) {
      BattleManagerABS.initABS();
      LOG.p("Manager : Go to ABS map from map, start new ABS session");
    }
  };

  BattleManagerABS.updateABSSession = function() {
    if ($gamePlayer.battler() != $gameParty.leader())
      $gamePlayer.initABS();
    $gamePlayer.prepareABS();
    AlphaABS.BattleUI.initNewSession();
  };

  BattleManagerABS.stopABS = function () {
    LOG.p("Manager : ABS Map destroy");
    BattleManagerABS.clearABS();
    SMouse.setTrack(false);
    $gamePlayer.stopABS();
  };

  BattleManagerABS.initABS = function () {
    $gamePlayer.initABS();
    $gameTroop.initABS();
    $gameParty.initABS();
    this.timer.start(BattleManagerABS.TURN);
    this._ready = true;
    SMouse.setTrack(true);

    AlphaABS.BattleUI.initNewSession();

    $gamePlayer.prepareABS();

    LOG.p("Manager : ABS Map loaded");
    this._isABSMap = true;
    this._absMapId = $gameMap.mapId();
    AlphaABS.ABSPathfinding.setup();
  };

  BattleManagerABS.setPlayerTarget = function (target) {
    window.__selected = target; //TODO: Убрать при релизе
    try {
      if (target && target.inActive()) {
        $gamePlayer.setTarget(target);
        $gameTroop.selectOnMap(target);
        $gameParty.selectOnMap(target);
        AlphaABS.BattleUI.showTarget(target);
      } else {
        $gamePlayer.setTarget(null);
        $gameTroop.selectOnMap(null);
        $gameParty.selectOnMap(null);
        AlphaABS.BattleUI.showTarget(null);
      }
    } catch (e) {
      console.error(e);
      AlphaABS.BattleUI.showTarget(null);
    }
  };

  BattleManagerABS.getPlayerTarget = function () {
    return $gamePlayer.target();
  };

  BattleManagerABS.updateABS = function () {
    if (!this._ready) return;
    this.timer.update();
    if (this.timer.isReady()) {
      this.timer.reset();
      $gamePlayer.onTurnEnd();
      $gameTroop.onTurnEnd();
    }
  };

  BattleManagerABS.alertNoInBattle = function () {
    BattleManagerABS.alertOnUI(AlphaABS.SYSTEM.STRING_ALERT_NOINBATTLE);
  };

  BattleManagerABS.alertOnUI = function (string) {
    AlphaABS.BattleUI.alert(string);
  };

  BattleManagerABS.playSe = function (se, point) {
    if (BattleManagerABS.isABSAudio()) {
      AudioManager.playSeAt(se, point);
    } else {
      AudioManager.playSe(se);
    }
  };

  BattleManagerABS.isABSAudio = function () {
    return AlphaABS.SYSTEM.EXTENSIONS.AUDIO;
  };

  BattleManagerABS.isABSParticleSystem = function () {
    return (AlphaABS.SYSTEM.EXTENSIONS.ABSPE !== undefined) && (AlphaABS.SYSTEM.EXTENSIONS.ABSPE != false);
  };

  BattleManagerABS.isABSLightingExt = function () {
    return AlphaABS.SYSTEM.EXTENSIONS.LIGHT;
  };

  BattleManagerABS.alertOnUIbySym = function (alertSymbol) {
    switch (alertSymbol) {
      case 'noUse':
        BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NOUSE);
        break;
      case 'toFar':
        BattleManagerABS.alertOnUI(Consts.STRING_ALERT_TOFAR);
        break;
      case 'noTarget':
        BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NEEDTARGET);
        break;
      case 'noAmmo':
        BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NOCHARGES);
        break;
      case 'recharge':
        BattleManagerABS.alertOnUI(Consts.STRING_ALERT_RECHARGE);
        break;
    }
  };

  BattleManagerABS.nextPlayerTarget = function () {
    try {
      var t = ABSUtils.inRadius($gamePlayer, 12, $gameTroop.membersABS());
      if (t.count() == 0) {
        return null;
      }

      var t2 = t.diff(this._plTargets);

      if (t2.count() == 0) {
        this._plTargets = [];
        return this.nextPlayerTarget();
      } else {
        this._plTargets.push(t2.first());
      }
      return t2.first();
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  //HELPERS
  BattleManagerABS.canUseSkillByTimer = function (skill) {
    return skill ? skill.isReady() : false;
  };

  BattleManagerABS.playerABSSkillById = function (skillId) {
    return $gamePlayer.battler().skillABS_byId(skillId);
  };

  BattleManagerABS.canUseSkillByTarget = function (who, target, skill) {
    try {
      if (!skill) return false;
      if (skill.isRadiusType()) return true;
      if (skill.isNeedTarget()) {
        if (target)
          return true;
        else
          return false;

      } else
        return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  BattleManagerABS.canUseSkillByRange = function (who, target, skill) {
    try {
      if (!skill) return false;
      if (skill.isZoneType()) return true;
      if (skill.isRadiusType()) return true;
      if (skill.range == 0 && !skill.isNeedTarget()) return true;
      if (skill.range == 0) {
        return ABSUtils.inFront(who, target);
      } else {
        var t = ABSUtils.distanceTo(who, target);
        if (skill.range >= t) {
          if (skill.isDirectionFix()) {
            LOG.p("SPELL: Dirction FIXed");
            return ABSUtils.inDirectionHard(who, target);
          } else
            return true;
        } else
          return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  BattleManagerABS.canUseSkillByAmmo = function (skill) {
    try {
      var result = true;
      if (skill.isStackType() && !skill.isAutoReloadStack()) {
        result = !skill.isNeedReloadStack();
      }
      if (!skill.isStackType() && skill.isNeedAmmo()) {
        result = $gameParty.numItems($dataItems[skill.ammo]) > 0;
      }
      return result;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  BattleManagerABS.canUseABSSkillNow = function (who, target, skill) {
    try {
      if (!skill) return false;
      return this.canUseSkillByTarget(who, target, skill) &&
        this.canUseSkillByRange(who, target, skill) &&
        this.canUseSkillByTimer(skill) && this.canUseSkillByAmmo(skill);
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  BattleManagerABS.canUseABSSkillUI = function (skill) {
    try {
      if (!$gamePlayer.inActive()) return false;
      var t = $gamePlayer.battler();
      return t.canUse(skill.skill()) &&
        this.canUseABSSkillNow($gamePlayer, $gamePlayer.target(), skill) && t.canMove();
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  BattleManagerABS.whoTargetOnMe = function (me, members) {
    var x = members.filter(function (t) {
      return (t.target() == me);
    });
    return x.first();
  };

  BattleManagerABS.isValidTarget = function (target) {
    try {
      return target && target.inActive() && (target.battler().tgr != 0);
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  BattleManagerABS.warning = function (index) {
    switch (index) {
      case 1:
        LOGW.p(Consts.STRING_WARNING_COMMON2);
        break;
      case 2:
        LOGW.p(Consts.STRING_WARNING_COMMON3);
        break;
      case 129:
        LOGW.p(Consts.STRING_WARNING_COMMAND129);
        break;
      case 321:
        LOGW.p(Consts.STRING_WARNING_COMMAND321);
        break;
      default:
        LOGW.p(Consts.STRING_WARNING_COMMON);
        break;
    }
  };

  SDK.setConstant(BattleManagerABS, 'TURN', AlphaABS.SYSTEM.FRAMES_PER_SECOND);
  AlphaABS.BattleManagerABS = BattleManagerABS;
  AlphaABS.register(BattleManagerABS);
})();

// ■ END BattleMangerABS.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.1.1
///////////////////////////////////////////////////////////////////////////////
//╒═══════════════════════════════════════════════════════════════════════════╛
// ■ BattleUI.coffee
//╒═══════════════════════════════════════════════════════════════════════════╛
///////////////////////////////////////////////////////////////////////////////
//SYSTEMATIZATION_LEVEL_1
(function() {
  var BattleUI;
  BattleUI = function() {
    throw new Error("This is a static class");
  };
  AlphaABS.register(BattleUI);
  BattleUI.init = function() {
    this._ui = null;
  };
  BattleUI.setUI = function(ui) {
    this._ui = ui;
  };
  BattleUI.initNewSession = function() {
    var ref;
    return (ref = this._ui) != null ? ref.initABS() : void 0;
  };
  BattleUI.isUI = function() {
    return this._ui != null;
  };
  BattleUI.getUI = function() {
    return this._ui;
  };
  BattleUI.showTarget = function(target) {
    var ref;
    return (ref = this._ui) != null ? ref.showTarget(target) : void 0; //Nullable
  };
  BattleUI.alertNotInDuringBattle = function() {
    return this.alert(AlphaABS.SYSTEM.STRING_ALERT_NOINBATTLE);
  };
  BattleUI.alert = function(message) {
    var ref;
    if (message) {
      return (ref = this._ui) != null ? ref.addPopUp(AlphaABS.PopInfoManagerABS.ALERT(message)) : void 0;
    }
  };
  BattleUI.pushItemOnPanel = function(item) {
    if (item != null) {
      return this._pushOnPanel("item", item);
    }
  };
  BattleUI._pushOnPanel = function(symbol, object) {
    var ref;
    if (object) {
      return (ref = this._ui) != null ? ref.pushOnItemPanel(symbol, object) : void 0;
    }
  };
  BattleUI.refreshWeaponCircle = function() {
    var ref;
    return (ref = this._ui) != null ? ref.weapCircleRefresh() : void 0;
  };
  BattleUI.refresh = function() {
    var ref;
    return (ref = this._ui) != null ? ref.refresh() : void 0;
  };
  BattleUI.pushExpOnPanel = function(expCount) {
    return this._pushOnPanel("exp", expCount);
  };
  BattleUI.refreshWeaponIconAt = function(index) {
    var ref;
    if (index != null) {
      return (ref = this._getControlPanel()) != null ? ref.refreshWeaponIconAt(index) : void 0;
    }
  };
  BattleUI._getControlPanel = function() {
    var ref;
    return (ref = this._ui) != null ? ref.controlPanel() : void 0;
  };
  BattleUI.showUI = function() {
    if (this._ui != null) {
      this._ui.setShowUI(true);
      this._ui.show();
    }
  };
  BattleUI.hideUI = function() {
    if (this._ui != null) {
      this._ui.setShowUI(false);
      this._ui.hide();
    }
  };
  BattleUI.refreshPlayerFace = function() {
    var ref;
    return (ref = this._ui) != null ? ref.refreshFace() : void 0;
  };
  BattleUI.pushGoldOnPanel = function(goldCount) {
    return this._pushOnPanel("gold", goldCount);
  };
  BattleUI.requestFreeMode = function() {
    var ref;
    return (ref = this._ui) != null ? ref.needFree() : void 0;
  };
  BattleUI.moveWeaponCircle = function(x, y) {
    var ref;
    if ((x != null) && (y != null)) {
      return (ref = this._getWeaponCircle()) != null ? ref.move(x, y) : void 0;
    }
  };
  BattleUI._getWeaponCircle = function() {
    var ref;
    return (ref = this._ui) != null ? ref.weapCircle() : void 0;
  };
  BattleUI.terminate = function() {
    var ref;
    return (ref = this._ui) != null ? ref.terminate() : void 0;
  };
  BattleUI.isWeaponCircleTouchedAny = function() {
    var ref;
    return (ref = this._getWeaponCircle()) != null ? ref.isTouchedAny() : void 0;
  };
  BattleUI.isTouched = function() {
    var ref;
    return (ref = this._ui) != null ? ref.isTouched() : void 0;
  };
  BattleUI.addPopUpForPlayer = function(item) {
    var ref;
    if (item) {
      return (ref = this._ui) != null ? ref.addPopUpUser(item) : void 0;
    }
  };
  BattleUI.addPopUpForTarget = function(target, item) {
    var ref;
    if (target && item) {
      return (ref = this._ui) != null ? ref.addPopUpTarget(target, item) : void 0;
    }
  };
  BattleUI.isVisible = function() {
    if (this._ui != null) {
      return this._ui.isVisible();
    }
    return false;
  };
  BattleUI.openWeaponCircle = function() {
    var circle;
    circle = this._getWeaponCircle();
    if (circle != null) {
      if (!circle.isOpen()) {
        circle.open();
      }
    }
  };
  BattleUI.closeWeaponCircle = function() {
    var circle;
    circle = this._getWeaponCircle();
    if (circle != null) {
      if (circle.isOpen()) {
        circle.close();
      }
    }
  };
  BattleUI.isWeaponCircleOpen = function() {
    var ref;
    return (ref = this._getWeaponCircle()) != null ? ref.isOpen() : void 0;
  };
  BattleUI.selectOnControlPanel = function(index) {
    var ref;
    if (index != null) {
      return (ref = this._getControlPanel()) != null ? ref.selectItemAt(index, true) : void 0;
    }
  };
  BattleUI.diselectOnControlPanel = function(index) {
    var ref;
    if (index != null) {
      return (ref = this._getControlPanel()) != null ? ref.selectItemAt(index, false) : void 0;
    }
  };
  BattleUI.disableOnControlPanel = function(index) {
    var ref;
    if (index != null) {
      return (ref = this._getControlPanel()) != null ? ref.disableItemAt(index, true) : void 0;
    }
  };
  BattleUI.enableOnControlPanel = function(index) {
    var ref;
    if (index != null) {
      return (ref = this._getControlPanel()) != null ? ref.disableItemAt(index, false) : void 0;
    }
  };
  BattleUI.changeRotateIconToMouse = function() {
    var ref;
    return (ref = this._getControlPanel()) != null ? ref.setIconAt(3, 'toMouse') : void 0;
  };
  BattleUI.changeRotateIconToTarget = function() {
    var ref;
    return (ref = this._getControlPanel()) != null ? ref.setIconAt(3, 'toTarget') : void 0;
  };
  BattleUI.touchOnSkillPanel = function(index) {
    var ref;
    if (index != null) {
      return (ref = this._ui) != null ? ref.touchSkillAt(index) : void 0;
    }
  };
  BattleUI.touchOnControlPanel = function(index) {
    var ref;
    if (index != null) {
      return (ref = this._getControlPanel()) != null ? ref.touchItemAt(index) : void 0;
    }
  };
  BattleUI.touchOnWeaponCircle = function(index) {
    var ref;
    if (index != null) {
      return (ref = this._getWeaponCircle()) != null ? ref.click(index) : void 0;
    }
  };
  BattleUI.isUIFree = function() {
    var ref;
    return (ref = this._ui) != null ? ref.isFree() : void 0;
  };
  AlphaABS.BattleUI = BattleUI;
})();

// ■ END BattleUI.coffee
//-----------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ParametersManagerABS.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    function ParametersManagerABS() {
        this.initialize.apply(this, arguments);
    }

    ParametersManagerABS.prototype = Object.create(ParametersManager.prototype);
    ParametersManagerABS.prototype.constructor = ParametersManagerABS;

    ParametersManagerABS.prototype.initialize = function () {
        ParametersManager.prototype.initialize.call(this, 'Alpha ABS');
    };

    ParametersManagerABS.prototype.get_UIE_PlayerGauge = function (gaugeSymbol) {
        var object = this.getObject('UIE_Player_' + gaugeSymbol + '_Bar');
        this._convertGaugeElements(object);
        return object;
    };

    ParametersManagerABS.prototype._convertGaugeElements = function (object) {
        this.convertField(object, 'Color');
        this.convertField(object, 'Visible');
        this.convertField(object, 'Show value');
        return object;
    };

    ParametersManagerABS.prototype.get_UIE_PlayerStatus = function () {
        var name = 'UIE_Player_Status_Settings';
        return this.getFromCacheOrInit(name, function () {
            var object = this.getObject(name);
            this._convertBasicElements(object);
            this.convertField(object, 'Portrait');
            this.convertField(object, 'Level');
            this.convertImage(object, 'In battle Icon');
            this.convertImage(object, 'Mask');
            this.convertImage(object, 'Background');
            return object;
        });
    }

    ParametersManagerABS.prototype._convertBasicElements = function (object) {
        this.convertField(object, 'Position');
        this.convertField(object.Position, 'X');
        this.convertField(object.Position, 'Y');
        this.convertField(object, 'Visible');
        return object;
    };

    ParametersManagerABS.prototype.get_UIE_PlayerTarget = function () {
        var name = 'UIE_Player_Target';
        return this.getFromCacheOrInit(name, function () {
            var object = this.getObject(name);
            this._convertBasicElements(object);
            this.convertField(object, 'Name');
            this.convertField(object, 'HP Bar');
            this._convertGaugeElements(object['HP Bar']);
            this.convertImage(object, 'Mask');
            this.convertImage(object, 'Selected_Image');
            return object;
        });
    };

    ParametersManagerABS.prototype.get_UIE_PlayerSpellsPanel = function () {
        var name = 'UIE_Player_Skills';
        return this.getFromCacheOrInit(name, function () {
            var object = this.getObject(name);
            this._convertBasicElements(object);
            this.convertImage(object, 'Image');
            return object;
        });
    };

    ParametersManagerABS.prototype.get_UIE_PlayerHotBar = function () {
        var name = 'UIE_Player_HotBar';
        return this.getFromCacheOrInit(name, function () {
            var object = this.getObject(name);
            this._convertBasicElements(object);
            for (var i = 1; i < 6; i++)
                this.convertField(object, 'Item' + i);
            return object;
        });
    };

    ParametersManagerABS.prototype.get_UIE_PlayerMessageBar = function () {
        return this._get_UIE_BasicElement('UIE_Message_Bar');
    };

    ParametersManagerABS.prototype._get_UIE_BasicElement = function (name) {
        return this.getFromCacheOrInit(name, function () {
            var object = this.getObject(name);
            this._convertBasicElements(object);
            return object;
        });
    };

    ParametersManagerABS.prototype.get_UIE_PlayerStates = function () {
        return this._get_UIE_BasicElement('UIE_Player_States');
    };

    ParametersManagerABS.prototype.get_UIE_ItemList = function () {
        return this._get_UIE_BasicElement('UIE_ItemList');
    };

    ParametersManagerABS.prototype.get_UIE_PlayerCastBar = function () {
        return this._get_UIE_BasicElement('UIE_Player_Cast');
    };

    ParametersManagerABS.prototype.loadAllStrings = function () {
        var loader = new AlphaABS.LIBS.StringsLoader(this._parameters);
        loader.loadAllStrings(AlphaABS.SYSTEM);
    };

    ParametersManagerABS.prototype.get_EnemyDeadSwitch = function () {
        var name = "Enemy Dead Switch";
        return this.getFromCacheOrInit(name, function () {
            var deadSwitch = this.getString(name);
            if (SDK.checkSwitch(deadSwitch))
                return deadSwitch;
            else
                return 'B';
        });
    };

    ParametersManagerABS.prototype.get_EnemyReviveAnimationId = function () {
        return this._get_NumberFromCache("Revive Animation") || 45;
    };

    ParametersManagerABS.prototype._get_NumberFromCache = function (name) {
        return this.getFromCacheOrInit(name, function () {
            var value = this.getNumber(name);
            return value;
        });
    };

    ParametersManagerABS.prototype.get_CastAnimation = function () {
        var animId = this._get_NumberFromCache("Cast Animation");
        if (animId > 0) {
            return $dataAnimations[animId];
        } else {
            return AlphaABS.DATA.DefaultCastAnimation;
        }
    };

    ParametersManagerABS.prototype.get_LevelUpAnimationId = function () {
        return this._get_NumberFromCache("Level Up Animation") || 49;
    };

    ParametersManagerABS.prototype.get_AutoLootEnemiesState = function () {
        return this._get_BooleanFromCache('Auto loot');
    };

    ParametersManagerABS.prototype._get_BooleanFromCache = function (name) {
        return this.getFromCacheOrInit(name, function () {
            var object = this.getBoolean(name);
            return object;
        });
    };

    ParametersManagerABS.prototype.get_CastAnimationSE = function () {
        var name = 'Cast Animation SE';
        return this.getFromCacheOrInit(name, function () {
            if (this.isHasParameter(name)) {
                var object = this.getBoolean(name);
                if (object == true) {
                    object = AlphaABS.DATA.DefaltCastSE;
                } else {
                    object = null;
                }
                return object;
            } else {
                return AlphaABS.DATA.DefaltCastSE;
            }
        });
    };

    ParametersManagerABS.prototype.get_DeadMapId = function () {
        return this._get_NumberFromCache("Game Over Map ID") || 1;
    };

    ParametersManagerABS.prototype.get_GoldIconIndex = function () {
        var name = "UIE_ItemListGoldIconIndex";
        if (this.isHasParameter(name))
            return this._get_NumberFromCache(name);
        else
            return 314;
    };

    ParametersManagerABS.prototype.get_AllowTransferState = function () {
        return this._get_BooleanFromCache("Allow Transfrer");
    };

    ParametersManagerABS.prototype.isUIVisible = function () {
        return this._get_BooleanFromCacheWithDefault("UI_Visible", true);
    };

    ParametersManagerABS.prototype._get_BooleanFromCacheWithDefault = function (name, defaultValue) {
        if (this.isHasParameter(name))
            return this._get_BooleanFromCache(name);
        else
            return defaultValue;
    };

    ParametersManagerABS.prototype.isUIEditorAllowed = function () {
        return this._get_BooleanFromCacheWithDefault("UI_Editor", true);
    };

    ParametersManagerABS.prototype.isUIInOptionsAllowed = function () {
        return this._get_BooleanFromCacheWithDefault("UI_Options", true);
    };

    ParametersManagerABS.prototype.isKeyBindingAllowed = function () {
        return this._get_BooleanFromCacheWithDefault("Key_binding", true);
    };

    ParametersManagerABS.prototype.loadBindingScheme = function () {
        if (this.isLoaded())
            this._loadStandartBindingKeys(this._parameters);
    };

    ParametersManagerABS.prototype._loadStandartBindingKeys = function (keysData) {
        var keys = AlphaABS.Key.symbol;
        for (var key in keys) {
            if (!{}.hasOwnProperty.call(keys, key)) continue;
            var pKey = 'Controls_Key_' + key;
            if (keysData[pKey] !== undefined) {
                keys[key] = keysData[pKey];
            }
        }
    };

    ParametersManagerABS.prototype.isFollowAllowed = function () {
        return this._get_BooleanFromCacheWithDefault("Controls_KeyAllowed_Follow", true);
    };

    ParametersManagerABS.prototype.isJumpAllowed = function () {
        return this._get_BooleanFromCacheWithDefault("Controls_KeyAllowed_Jump", true);
    };

    ParametersManagerABS.prototype.isRotateAllowed = function () {
        return this._get_BooleanFromCacheWithDefault("Controls_KeyAllowed_Rotate", true);
    };

    ParametersManagerABS.prototype.isWeaponsAllowed = function () {
        return this._get_BooleanFromCacheWithDefault("Controls_KeyAllowed_Weapons", true);
    };
    AlphaABS.Parameters = new ParametersManagerABS();
    AlphaABS.register(ParametersManagerABS);
})();
// ■ END ParametersManagerABS.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
(function () {

    var Interface_AIBot = {
        initializeABS: function () {
            this.LOG = new PLATFORM.DevLog(this.constructor.name);
            this.LOG.applyPresetLib();
            this.aiName = "Unknown";

            this._stateMachine = null;

            this._absParams.battler = null;
            this._absParams.target = null;
            this._absParams.inBattle = false;
            this._absParams.active = true; //Со мной можно взаимодействовать
            this._absParams.selected = false; //Я выбран на карте игроком?
            this._absParams.myHomePosition = null;
            this._absParams.behavior = new AlphaABS.LIBS.Game_AIBehavior();
            this._absParams.allyToSearch = null;
            this._absParams.rageContainer = null; //Цель - урон, для ярости

            //escapeOnBattle; //Убегает во время битвы
            //canSearch; //Могу ля я искать противника, если мой сосед атакован
            //noFight; //Не будет сражаться
            //reviveTime; //Время возрождения (минуты)
            //slow; //Медленный враг
            //agressive; //Агрессивный враг (будет догонять)
            //returnType; //Тип возвращения 0 - быстрое, 1 - обычное, 2 - остановка
            //teamId;
            //rage; //Если 1, то агрится, если 0 , то нет
        },
        ABSParams: function () {
            return this._absParams;
        },
        isAlly: function (who) {
            if (who)
                return (this.teamId() == who.teamId());
            return false;
        },
        teamId: function () {
            return this.behaviorModel().teamId;
        },
        canFight: function () {
            return !this.behaviorModel().noFight;
        },
        behaviorModel: function () {
            return this._absParams.behavior;
        },
        isFastReturn: function () {
            return this.behaviorModel().returnType == 0;
        },
        isSlowReturn: function () {
            return this.behaviorModel().returnType == 1;
        },
        isNotReturn: function () {
            return this.behaviorModel().returnType == 2;
        },
        isCasting: function () {
            var action = this.currentAction();
            return (action && action.isCasting());
        },
        currentAction: function () {
            return this._absParams.currentAction;
        },
        target: function () {
            return this._absParams.target;
        },
        isAlive: function () {
            if (this.battler() != null)
                return this.battler().isAlive();
            else
                return true;
        },
        battler: function () {
            return this._absParams.battler;
        },
        getHomePosition: function () {
            return this._absParams.myHomePosition;
        },
        inBattle: function () {
            return this._absParams.inBattle;
        },
        inActive: function () {
            return this._absParams.active;
        },
        selectOnMap: function (isSelect) {
            this._absParams.selected = isSelect;
        },
        changeStateToBattle: function (target) {
            this.setTarget(target);
            this._stateMachine.switchStateToBattle(this);
        },
        changeStateToFree: function () {
            this._stateMachine.switchStateToFree(this);
        },
        changeStateToReturn: function () {
            this._stateMachine.switchStateToReturn(this);
        },
        changeStateToSearch: function (targetToSearch) {
            this.setAllyTarget(targetToSearch);
            this._stateMachine.switchStateToSearch(this);
        },
        setAllyTarget: function (ally) {
            this._absParams.allyToSearch = ally;
        },
        changeTeamTo: function(id) {
            this.behaviorModel().teamId = id;
        },
        isSelected: function() {
            return this._absParams.selected;
        },
        allyToSearch: function() {
            return this._absParams.allyToSearch;
        },
        canRage: function () {
            return this.behaviorModel().rage == 1;
        },
        rageContainer: function () {
            return this._absParams.rageContainer;
        }
    };

    AlphaABS.LIBS.Interface_AIBot = Interface_AIBot;
})();
// Generated by CoffeeScript 2.1.1
(function() {
  var Interface_AIBotABS;
  Interface_AIBotABS = {
    initABS: function() {},
    _deactivate: function() {
      if (AlphaABS.BattleManagerABS.getPlayerTarget() === this) {
        AlphaABS.BattleManagerABS.setPlayerTarget(null);
      }
      this._absParams.active = false;
      this._resetTarget();
    },
    _resetTarget: function() {
      this._absParams.target = null;
      this._absParams.inBattle = false;
      this.interruptCast();
    },
    _updateABS: function() {},
    _checkFloorEffect: function() {
      if ($gameMap.isDamageFloor(this.x, this.y)) {
        this.battler().executeFloorDamage();
      }
    },
    startCommonEvent: function(commonEventId) {},
    clearTarget: function() {
      return this.setTarget(null);
    },
    setTarget: function(target) {
      if (AlphaABS.BattleManagerABS.isValidTarget(target)) {
        this._absParams.target = target;
        if (target === $gamePlayer) {
          $gamePlayer.refreshBattleState();
        }
      } else {
        this._resetTarget();
      }
    },
    createNewHomePoint: function() {
      return this._absParams.myHomePosition = new AlphaABS.UTILS.PointX(this.x, this.y);
    },
    refreshBehavior: function() {
      this.clearTarget();
      return this.changeStateToFree();
    }
  };
  AlphaABS.LIBS.Interface_AIBotABS = Interface_AIBotABS;
})();

// Generated by CoffeeScript 2.1.1
(function() {
  var Interface_AIBotABSEvents;
  Interface_AIBotABSEvents = {
    onTurnEnd: function() {
      if (this.inBattle()) {
        return this.battler().onTurnEnd();
      }
    },
    onActionOnMe: function(who) {
      if (!this.canFight()) {
        return;
      }
      if (!!this.inBattle()) {
        this.LOG.p('I\'am attacked!!!');
        return this.changeStateToBattle(who);
      } else {
        if (this.canRage()) {
          return this._performRageCalculation(who);
        }
      }
    },
    _performRageCalculation: function(who) {
      var result;
      result = this.battler().result();
      if (result.hpAffected && result.hpDamage > 0 && !result.drain) {
        if (who != null) {
          this.rageContainer().makeDamageBy(result.hpDamage, who);
        }
      }
      this._selectNewTargetByRage();
    },
    _selectNewTargetByRage: function() {
      var candidate;
      candidate = this.rageContainer().getHigherDealer();
      if ((candidate != null) && candidate !== this.target()) {
        this.LOG.p('New target ' + candidate.aiName);
        return this.setTarget(candidate); //if in view range?
      }
    },
    //@requestBalloon 1 unless @behaviorModel().noEmote
    onGameLoad: function() {
      this.LOG.p('On Game Load');
      this.battler().onGameLoad();
    },
    onSwitchToBattleState: function() {
      return this._onBattleStart();
    },
    _onBattleStart: function() {
      if (!this.behaviorModel().noEmote) {
        this.requestBalloon(1);
      }
      this.battler().onBattleStart();
      this._absParams.inBattle = true;
      this.createNewHomePoint();
      if (this.getHomePosition() != null) {
        this.LOG.p('Store home position: ' + this.getHomePosition().toString());
      }
      this.startCommonEvent(this.behaviorModel().cEonStart);
      if (this.canRage()) {
        this.rageContainer().addDealer(this.target());
      }
    },
    onReturnEnd: function() {},
    _onBattleEnd: function() {
      this._absParams.inBattle = false;
      this._absParams.allyToSearch = null;
      this.battler().onBattleEnd();
      this.startCommonEvent(this.behaviorModel().cEonEnd);
      if (this.canRage()) {
        this.rageContainer().clear();
      }
      this.changeStateToFree();
    },
    onSwitchToFreeState: function() {
      this.LOG.p('In free state');
      this.clearTarget();
    },
    onSwitchToReturnState: function() {},
    onSwitchToSearchState: function() {},
    onSwitchToDeadState: function() {},
    onSwitchToStunState: function() {
      this.clearTarget();
      this.stay();
      this.LOG.p('AI : I\'am stunned!');
      if (!this.behaviorModel().noEmote) {
        this.requestBalloon(10);
      }
    }
  };
  AlphaABS.LIBS.Interface_AIBotABSEvents = Interface_AIBotABSEvents;
})();

// Generated by CoffeeScript 2.1.1
(function() {
  var Interface_AIBotABSMoving;
  Interface_AIBotABSMoving = {
    stay: function() {},
    moveTypeTowardPlayer: function() {
      if (!this.isNearThePlayerX()) {
        return this.moveToPoint($gamePlayer);
      }
    },
    isNearThePlayerX: function() {
      return this.isNearThePointX($gamePlayer);
    },
    isNearThePointX: function(point) {
      var sx, sy;
      try {
        sx = Math.abs(this.deltaXFrom(point.x));
        sy = Math.abs(this.deltaYFrom(point.y));
        return (sx + sy) < 1;
      } catch (error) {
        return false;
      }
    },
    returnSlow: function() {},
    returnFast: function() {},
    _escapeFromTarget: function(target) {
      if (target == null) {
        return;
      }
      if (!this.isMoving()) {
        this._performEscapeFromTarget(target);
      }
    },
    _performEscapeFromTarget: function(target) {
      var distance, escapeRange;
      escapeRange = 2;
      distance = AlphaABS.UTILS.distanceTo(this, target);
      if (distance < escapeRange) {
        this.moveFromPoint(target);
        this.turnTowardCharacter(target);
      } else if (distance > (escapeRange + 1)) {
        this.moveTowardCharacter(target);
      } else {

      }
      return this.turnTowardCharacter(target);
    },
    runAwayFromTarget: function(target) {
      if (target == null) {
        return;
      }
      if (!this.isMoving()) {
        return this._performRunAwayFromTarget(target);
      }
    },
    _performRunAwayFromTarget: function(target) {
      var distance, escapeRange, realRange;
      realRange = this._absParams.viewRadius / 2;
      escapeRange = realRange >= 2 ? realRange : 2;
      distance = AlphaABS.UTILS.distanceTo(this, target);
      if (distance < escapeRange) {
        this._applyAproachSpeed();
        return this.moveFromPoint(target);
      } else {
        return this.changeStateToFree();
      }
    },
    _applyAproachSpeed: function() {},
    turnTowardTarget: function() {
      var target;
      target = this.target();
      if (target != null) {
        return this.turnTowardCharacter(target);
      }
    },
    startPursuitTarget: function() {},
    moveTypeTowardTarget: function() {
      var target;
      target = this.target();
      if (target != null) {
        if (!this.isNearThePointX(target)) {
          return this.moveToPoint(target);
        }
      }
    },
    moveToAlly: function() {
      if (!this.isMoving() && !this._absParams.behavior.noMove) {
        if (this._absParams.allyToSearch != null) {
          return this.moveToPoint(this._absParams.allyToSearch);
        } else {
          return this.changeStateToFree();
        }
      }
    }
  };
  AlphaABS.LIBS.Interface_AIBotABSMoving = Interface_AIBotABSMoving;
})();

// Generated by CoffeeScript 2.1.1
(function() {
  var Interface_AIBotActions;
  Interface_AIBotActions = {
    interruptCast: function() {
      var action;
      action = this.currentAction();
      if (this.isCasting()) {
        this.LOG.p('Cast intterupt');
        action.resetCast();
      }
    },
    _makeActions: function() {
      var actions;
      if (this.isCasting()) {
        return;
      }
      this.battler().makeActions();
      actions = this.battler()._actions.filter((function(action) {
        var skill, target;
        skill = this.battler().skillABS_byAction(action);
        target = this.target();
        if (skill) {
          target = skill.isNeedTarget() ? this.target() : self;
        }
        return AlphaABS.BattleManagerABS.canUseABSSkillNow(this, target, skill) && AlphaABS.LIBS.AILogicManager.isUsableABSSkill(skill);
      }).bind(this));
      if (actions.length > 0) {
        this._setForceAction(actions.first());
      } else {
        this._setCurrentAction(this.battler().action(0));
      }
    },
    _setForceAction: function(action) {
      this._absParams.currentAction = this.battler().skillABS_byAction(action);
      this._stateMachine.switchActionStateToAction();
    },
    _setCurrentAction: function(action) {
      var skill;
      skill = this.battler().skillABS_byAction(action);
      if (this._absParams.currentAction !== skill) {
        this._absParams.currentAction = skill;
        if (this._absParams.currentAction) {
          this._stateMachine.switchActionStateToPrepare();
        } else {

        }
        if (this.behaviorModel().escapeOnBattle) {
          this._stateMachine.switchActionStateToEscape();
        } else {
          this._stateMachine.switchActionStateToWait();
        }
      }
    },
    _performAction: function() {
      var action, currentAction, process;
      currentAction = this.currentAction();
      this.LOG.p('Perform! ' + currentAction.skill().name);
      process = AlphaABS.BattleManagerABS.battleProcess();
      if (currentAction.isVectorType()) {
        action = this.battler().action(0);
        process.startPostBattleAction(this, this.target(), action, currentAction);
      } else {
        if (currentAction.isNeedTarget()) {
          process.performBattleAction(this, this.target());
        } else {
          process.performBattleAction(this, this);
        }
      }
      this.battler().performCurrentAction();
      this._absParams.currentAction.playStartSound(this.toPoint());
      this._stateMachine.switchActionStateToPrepare();
    },
    checkActionCommonEvent: function() {
      this.startCommonEvent(this.currentAction().cEonStart);
    }
  };
  AlphaABS.LIBS.Interface_AIBotActions = Interface_AIBotActions;
})();

//Compressed by MV Plugin Builder
(function(){AlphaABS.DATA={};AlphaABS.DATA.DefaultCastAnimation={"id":"anim_cast","animation1Hue":50,"animation1Name":"StateDown1","animation2Hue":0,"animation2Name":"","frames":[[[5,0,-133,260,0,0,120,1],[10,0,-217,200,180,0,120,1],[11,-120,-183,100,180,0,120,1],[11,-32,-247,100,180,0,120,1],[11,50,-247,100,180,0,120,1],[-1,112.5,-263,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1]],[[6,0,-133,260,0,0,120,1],[10,0,-233,200,180,0,120,1],[11,-120,-247,100,180,0,120,1],[-1,368,-123,100,0,0,255,1],[11,50,-297,100,180,0,120,1],[11,110,-123,100,180,0,120,1],[11,-64,-123,100,180,0,120,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1]],[[7,0,-133,260,0,0,120,1],[-1,-408,-216,100,0,0,255,1],[-1,-408,-123,100,0,0,255,1],[-1,-408,-123,100,0,0,255,1],[-1,-408,-123,100,0,0,255,1],[11,110,-135,100,180,0,120,1],[11,-64,-183,100,180,0,120,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1]],[[8,0,-133,260,0,0,120,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[11,110,-199,100,180,0,120,1],[11,-64,-247,100,180,0,120,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1]],[[9,0,-133,260,0,0,120,1]],[[4,0,-133,260,0,0,120,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1]],[[6,0,-133,260,0,0,120,1],[10,0,-233,200,180,0,120,1],[11,-120,-247,100,180,0,120,1],[-1,368,-123,100,0,0,255,1],[11,50,-297,100,180,0,120,1],[11,110,-123,100,180,0,120,1],[11,-64,-123,100,180,0,120,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1]],[[7,0,-133,260,0,0,120,1],[-1,-408,-216,100,0,0,255,1],[-1,-408,-123,100,0,0,255,1],[-1,-408,-123,100,0,0,255,1],[-1,-408,-123,100,0,0,255,1],[11,110,-135,100,180,0,120,1],[11,-64,-183,100,180,0,120,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1]],[[8,0,-133,260,0,0,120,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[11,110,-199,100,180,0,120,1],[11,-64,-247,100,180,0,120,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1]],[[9,0,-133,260,0,0,120,1]],[[4,0,-133,260,0,0,120,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1],[-1,0,-135,100,0,0,255,1]]],"name":"Cast4","position":2,"timings":[{"flashColor":[204,204,204,204],"flashDuration":11,"flashScope":1,"frame":3,"se":null}]};AlphaABS.DATA.DefaltCastSE={name:'Magic3',pan:0,pitch:100,volume:90};AlphaABS.DATA.DefaultKeyMap={cpW:"w",cpA:"a",cpD:"d",cpS:"s",sp1:"1",sp2:"2",sp3:"3",sp4:"4",sp5:"5",sp6:"6",sp7:"7",sp8:"8",tS:"q",pC:"q",wC:"e",scW:"w",scS:"s",scD:"d",scA:"a"}})();
(function () {
    /////////////////////////////////////////////////////////////////////////////
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ ABSKey.js
    //╒═════════════════════════════════════════════════════════════════════════╛
    /////////////////////////////////////////////////////////////////////////////
    function ABSKey() {
        throw new Error('This is a static class');
    }

    ABSKey.symbol = {};

    ABSKey.indexSchemeA = {
        sp1: 1,
        sp2: 2,
        sp3: 3,
        sp4: 4,
        sp5: 5,
        sp6: 6,
        sp7: 7,
        sp8: 8
    }

    ABSKey.indexSchemeB = {
        cpA: 0,
        cpW: 1,
        cpS: 2,
        cpD: 3
    }

    ABSKey.indexSchemeC = {
        scW: 0,
        scA: 3,
        scS: 2,
        scD: 1
    }

    ABSKey.checkTabPress = function () {
        if (Input.isTriggered('tab')) {
            var event = {
                charCode: 9
            };
            ABSKey.onKeyPress(event);
        }
    }

    ABSKey.isTriggeredSP = function () {
        for (var key in ABSKey.indexSchemeA) {
            if (Input.isTriggered(ABSKey.symbol[key])) {
                return ABSKey.indexSchemeA[key];
            }
        }
        return null;
    }

    ABSKey.isTriggeredWS = function () {
        for (var key in ABSKey.indexSchemeC) {
            if (Input.isTriggered(ABSKey.symbol[key])) {
                return ABSKey.indexSchemeC[key];
            }
        }
        return null;
    }

    ABSKey.setKeyToChange = function (symbol, windw) {
        this._changeSymbol = symbol;
        this._changeWindow = windw;
    }

    ABSKey.onKeyPress = function (event) {
        if (!ABSKey._changeSymbol) return;

        if (Input.KeyMapperPKD[event.charCode] !== undefined) {
            ABSKey.symbol[ABSKey._changeSymbol] = Input.KeyMapperPKD[event.charCode];
            ABSKey._changeSymbol = null;
            if (ABSKey._changeWindow) {
                ABSKey._changeWindow.onKeyOk(true);
                ABSKey._changeWindow = null;
            }
        } else {
            if (ABSKey._changeWindow)
                ABSKey._changeWindow.onKeyOk(false);
        }
    }

    Input.toDefaultABS = function () {
        AlphaABS.Key.symbol = AlphaABS.DATA.DefaultKeyMap;
    }

    AlphaABS.Key = ABSKey;
    // ■ END ABSKey.js
    //---------------------------------------------------------------------------
    /////////////////////////////////////////////////////////////////////////////
})();
(function () {

  "use strict";

  //ABSObject_PopUp
  //------------------------------------------------------------------------------
  /* jshint -W104 */
  class ABSObject_PopUp {
    constructor(text, color, iconIndex, fontSettings) {
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

    isNumered() {
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

    setup(x, y, width, layer) {
      this._layer = layer;
      this._width = width;
      this.x = x;
      this.y = y;
      this._refresh();
    }

    dispose() {
      if (!this._sprite) return;
      this._sprite.bitmap.clear();
      this._layer.removeChild(this._sprite);
      this._sprite = null;
    }

    update() {
      if (this._sprite != null) {
        this._update_zoom();
        this._sprite.update();
      }
    }

    static FONT_DEFAULT() {
      return ['Skratch Punk', 30, false, 3, Color.BLACK]; //FontFace, size, outline widht, outline color
    }

    //PRIVATE
    _refresh() {
      var h = 72;
      var bitmap = new Bitmap(this._width, h);
      bitmap.addLoadListener(function () {
        if (this._fontSettings[0] != null)
          bitmap.fontFace = this._fontSettings[0];
        bitmap.fontSize = this._fontSettings[1];
        bitmap.fontItalic = this._fontSettings[2];
        if (this._color) {
          bitmap.textColor = this._color.CSS;
        } else
          bitmap.textColor = Color.WHITE.CSS;


        var dx = 0;
        var dw = 0;
        var tw = (this._text != null) ? bitmap.measureTextWidth(this._text) : 0;

        while (tw > this._width) {
          bitmap.fontSize = bitmap.fontSize - 4;
          tw = bitmap.measureTextWidth(this._text);
        }

        if (this._iconIndex) {
          dx += 24;
          dw += 24;
          SDK.drawIcon((dx + ((this._width - tw) / 2) - 36), (h - 24) / 2, this._iconIndex, bitmap, 24);
        }

        if (this._text) {
          bitmap.outlineWidth = this._fontSettings[3] || 0;
          if (this._fontSettings[4])
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

    _update_zoom() {
      if (this._effectType[1]) {
        this._sprite.scale.x = Math.max(this._sprite.scale.x - 0.075, 1.0);
        this._sprite.scale.y = this._sprite.scale.x;
      }
      this._sprite.opacity = Math.max(this._sprite.opacity - 2, 0);
      if (this._sprite.opacity == 0) {
        this._layer.removeChild(this._sprite);
        this._sprite = null;
      }
    }
  }

  SDK.setConstant(ABSObject_PopUp, 'EFFECT_DEFAULT', [1.5, true, 0]); //zoom, isUpdateZoom, +toTextSize
  //END ABSObject_PopUp
  //------------------------------------------------------------------------------

  AlphaABS.ABSObject_PopUp = ABSObject_PopUp;
  AlphaABS.register(ABSObject_PopUp);
})();
(function () {

  "use strict";

  //ABSObject_PopUpMachine
  //------------------------------------------------------------------------------
  /* jshint -W104 */
  class ABSObject_PopUpMachine {
    constructor(x, y, width, stack_size, parent) {
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

    move(x, y) {
      this._x = x;
      this._y = y;
      this._step();
    }

    push(popUpItem) {
      if (this._effectType != null)
        popUpItem.setEffectSettings(this._effectType);

      popUpItem.setup(this._x, this._y, this._width, this._parent);

      var item = this._items.shift();
      if (item != null) item.dispose();

      this._items.push(popUpItem);
      this._step();
      this._timers.shift();
      this._timers.push(0);
    }

    clear() {
      this._items.forEach(function (item) {
        if (item != null) item.dispose();
      });
      this._items = [];
      this._timers = [];
      this._init_items();
    }

    update() {
      this._update_timers();
      this._items.forEach(function (item) {
        if (item != null) item.update();
      });
    }

    //PRIVATE
    _init_items() {
      SDK.times(this._stack_size, function () {
        this._items.push(null);
        this._timers.push(null);
      }.bind(this));
    }

    _update_timers() {
      SDK.times(this._stack_size, function (i) {
        var index = (this._timers.length - 1) - i; //Reverse
        var timer = this._timers[index];
        if (timer == null)
          return;
        else {
          if (timer < ABSObject_PopUpMachine.MAX_TIME)
            this._timers[index] = this._timers[index] + 1;
          if (timer == ABSObject_PopUpMachine.MAX_TIME) {
            if (this._items[index] != null) {
              this._items[index].dispose();
            }
            this._items[index] = null;
            this._timers[index] = null;
          }
        }
      }.bind(this));
    }

    _step() {
      SDK.times(this._items.length, function (i) {
        var index = (this._items.length - 1) - i; //Reverse
        var item = this._items[index];
        if (item == null)
          return;

        var y = 0;
        if (this._upMode)
          y = this._y - (ABSObject_PopUpMachine.Y_STEP * i);
        else
          y = this._y + (ABSObject_PopUpMachine.Y_STEP * i);

        this._items[index].setX(this._x);
        this._items[index].setY(y);
      }.bind(this));
    }
  }

  SDK.setConstant(ABSObject_PopUpMachine, 'Y_STEP', 24);
  SDK.setConstant(ABSObject_PopUpMachine, 'MAX_TIME', 60);
  SDK.setConstant(ABSObject_PopUpMachine, 'SETTINGS', [1, false, 12]); //zoom, isUpdateZoom, +toTextSize
  //END ABSObject_PopUpMachine
  //------------------------------------------------------------------------------


  AlphaABS.ABSObject_PopUpMachine = ABSObject_PopUpMachine;
  AlphaABS.register(ABSObject_PopUpMachine);
})();
(function () {
    //ABSPathfinding
    //------------------------------------------------------------------------------
    function ABSPathfinding() {
        throw new Error('This is a static class');
    }

    ABSPathfinding.init = function () {
        this.worldWidth = 0;
        this.worldHeight = 0;
        this.worldSize = 0;
        this.char = null;
        this.goalX = 0;
        this.goalY = 0;
    };

    ABSPathfinding.setup = function () {
        this.worldWidth = $gameMap.width();
        this.worldHeight = $gameMap.height();
        this.worldSize = this.worldWidth * this.worldHeight;
    };

    ABSPathfinding.findPath = function (char, goalX, goalY) {
        this.char = char;
        this.goalX = goalX;
        this.goalY = goalY;
        var path = ABSPathfinding.calculatePath();
        if (path.length > 0) {

            if (path.length > 1) {
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
    };

    //PRIVATE
    ABSPathfinding.canWalkHere = function (x, y) {
        if (x == this.char.x && y == this.char.y) {
            return true;
        }

        if (!$gameMap.isValid(x, y)) {
            return false;
        }

        if (this.char.isThrough() || this.char.isDebugThrough()) {
            return true;
        }

        if (x == this.goalX && y == this.goalY) {
            return true;
        }

        if (this.char.isCollidedWithCharacters(x, y)) {
            return false;
        }

        if (!this.char.isMapPassable(x, y, 1)) {
            return false;
        }

        return true;
    };

    ABSPathfinding.Node = function (Parent, Point) {
        var newNode = {
            // pointer to another Node object
            Parent: Parent,
            // array index of this Node in the world linear array
            value: Point.x + (Point.y * this.worldWidth),
            // the location coordinates of this Node
            x: Point.x,
            y: Point.y,
            // the distanceFunction cost to get
            // TO this Node from the START
            f: 0,
            // the distanceFunction cost to get
            // from this Node to the GOAL
            g: 0
        };

        return newNode;
    };

    ABSPathfinding.Neighbours = function (x, y) {
        var N = y - 1,
            S = y + 1,
            E = x + 1,
            W = x - 1,
            myN = N > -1 && this.canWalkHere(x, N),
            myS = S < this.worldHeight && this.canWalkHere(x, S),
            myE = E < this.worldWidth && this.canWalkHere(E, y),
            myW = W > -1 && this.canWalkHere(W, y),
            result = [];
        if (myN)
            result.push({
                x: x,
                y: N
            });
        if (myE)
            result.push({
                x: E,
                y: y
            });
        if (myS)
            result.push({
                x: x,
                y: S
            });
        if (myW)
            result.push({
                x: W,
                y: y
            });
        this.findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
        return result;
    };

    ABSPathfinding.findNeighbours = function () {};

    ABSPathfinding.DiagonalNeighbours = function (myN, myS, myE, myW, N, S, E, W, result) {
        if (myN) {
            if (myE && this.canWalkHere(E, N))
                result.push({
                    x: E,
                    y: N
                });
            if (myW && this.canWalkHere(W, N))
                result.push({
                    x: W,
                    y: N
                });
        }
        if (myS) {
            if (myE && this.canWalkHere(E, S))
                result.push({
                    x: E,
                    y: S
                });
            if (myW && this.canWalkHere(W, S))
                result.push({
                    x: W,
                    y: S
                });
        }
    };

    ABSPathfinding.DiagonalNeighboursFree = function (myN, myS, myE, myW, N, S, E, W, result) {
        myN = N > -1;
        myS = S < worldHeight;
        myE = E < worldWidth;
        myW = W > -1;
        if (myE) {
            if (myN && this.canWalkHere(E, N))
                result.push({
                    x: E,
                    y: N
                });
            if (myS && this.canWalkHere(E, S))
                result.push({
                    x: E,
                    y: S
                });
        }
        if (myW) {
            if (myN && this.canWalkHere(W, N))
                result.push({
                    x: W,
                    y: N
                });
            if (myS && this.canWalkHere(W, S))
                result.push({
                    x: W,
                    y: S
                });
        }
    };

    ABSPathfinding.ManhattanDistance = function (Point, Goal) {
        // linear movement - no diagonals - just cardinal directions (NSEW)
        return Math.abs(Point.x - Goal.x) + Math.abs(Point.y - Goal.y);
    };

    ABSPathfinding.calculatePath = function () {
        var distanceFunction = ABSPathfinding.ManhattanDistance;
        // create Nodes from the Start and End x,y coordinates
        var mypathStart = this.Node(null, {
            x: this.char.x,
            y: this.char.y
        });
        var mypathEnd = this.Node(null, {
            x: this.goalX,
            y: this.goalY
        });
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
        while (length = Open.length) {
            max = this.worldSize;
            min = -1;
            for (i = 0; i < length; i++) {
                if (Open[i].f < max) {
                    max = Open[i].f;
                    min = i;
                }
            }
            // grab the next node and remove it from Open array
            myNode = Open.splice(min, 1)[0];
            // is it the destination node?
            if (myNode.value === mypathEnd.value) {
                myPath = Closed[Closed.push(myNode) - 1];
                do {
                    result.push([myPath.x, myPath.y]);
                }
                while (myPath = myPath.Parent);
                // clear the working arrays
                AStar = Closed = Open = [];
                // we want to return start to finish
                result.reverse();
            } else // not the destination
            {
                // find which nearby nodes are walkable
                myNeighbours = this.Neighbours(myNode.x, myNode.y);
                // test each one that hasn't been tried already
                for (i = 0, j = myNeighbours.length; i < j; i++) {
                    myPath = this.Node(myNode, myNeighbours[i]);
                    if (!AStar[myPath.value]) {
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
    };
    AlphaABS.ABSPathfinding = ABSPathfinding;
    AlphaABS.register(ABSPathfinding);
    //END ABSPathfinding
    //------------------------------------------------------------------------------

})();
(function () {

  "use strict";

  var ABSObject_PopUp = AlphaABS.ABSObject_PopUp;
  var ABSObject_PopUpMachine = AlphaABS.ABSObject_PopUpMachine;

  //PopInfoManagerABS
  //------------------------------------------------------------------------------
  function PopInfoManagerABS() {
    throw new Error('This is a static class');
  }

  PopInfoManagerABS.makeDamagePopUp = function (user) {
    var result = user.result();
    var value;

    if (result.hpDamage != 0) {
      value = PopInfoManagerABS.HP(result.hpDamage, result.critical);
      this._apply_pop_up(user, value);
    }

    if (result.mpDamage != 0) {
      value = PopInfoManagerABS.MP(result.mpDamage, result.critical);
      this._apply_pop_up(user, value);
    }

    if (result.tpDamage != 0) {
      value = PopInfoManagerABS.TP(result.tpDamage, result.critical);
      this._apply_pop_up(user, value);
    }
  };

  PopInfoManagerABS.makeZeroDamagePopUp = function (user) {
    var result = user.result();
    var value = PopInfoManagerABS.HP(0, result.critical);
    this._apply_pop_up(user, value);
  };

  PopInfoManagerABS.makeDrainPopUp = function (user) { //user - who get drained HP
    var result = user.result();
    var value;
    if (result.hpDamage != 0) {
      value = PopInfoManagerABS.HP(result.hpDamage, result.critical);
      value.getFontSettings()[2] = true;
      this._apply_pop_up(user, value);
    }

    if (result.mpDamage != 0) {
      value = PopInfoManagerABS.MP(result.mpDamage, result.critical);
      value.getFontSettings()[2] = true;
      this._apply_pop_up(user, value);
    }
  };

  PopInfoManagerABS.makeStatePopUp = function (user, stateId, isErase) {
    var state = $dataStates[stateId];
    if (state.iconIndex == 0)
      return;
    if (state.id == user.deathStateId())
      return;
    var value = PopInfoManagerABS.STATE((user.isEnemy() ? "" : state.name), state.iconIndex, isErase);
    this._apply_pop_up(user, value);
  };

  PopInfoManagerABS.makeItemPopUp = function (user) {
    var result = user.result();
    if (!user.isAlive()) return;
    if (result.missed) {
      this._apply_pop_up(user, PopInfoManagerABS.TEXT(AlphaABS.SYSTEM.STRING_POPUP_MISS));
      return;
    }

    if (result.evaded) {
      this._apply_pop_up(user, PopInfoManagerABS.TEXT(AlphaABS.SYSTEM.STRING_POPUP_EVADE));
      return;
    }

    if (result.isHit() && !result.success) {
      this._apply_pop_up(user, PopInfoManagerABS.TEXT(AlphaABS.SYSTEM.STRING_POPUP_FAIL));
      return;
    }
  };

  PopInfoManagerABS.makeBuffPopUp = function (user, paramId, isPositive) {
    if (!user.isAlive()) return;
    var paramName = user.isEnemy() ? "" : TextManager.param(paramId);
    var temp = isPositive ? 1 : -1;
    var iconIndex = user.buffIconIndex(temp, paramId);
    var value = PopInfoManagerABS.BUFF(paramName, iconIndex, isPositive);
    if (!user.getInfoPops().include(value)) {
      this._apply_pop_up(user, value);
    }
  };

  PopInfoManagerABS.makeSkillRechargePopUp = function (user, skillId) {
    if (!user.isAlive()) return;
    if (user.isEnemy()) return; //This is for ActorEnemy, in version 1 not develop yet
    var skill = $dataSkills[skillId];
    var value = PopInfoManagerABS.SKILL(skill.name, skill.iconIndex);
    if (!user.getInfoPops().include(value)) {
      this._apply_pop_up(user, value);
    }
  }

  PopInfoManagerABS.calcRate = function (rate) {
    this.text = "";
  };

  //STATIC
  PopInfoManagerABS.HP = function (value, critical) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    var color = Color.YELLOW;
    if (value < 0) {
      color = Color.GREEN;
      value = Math.abs(value);
    } else if (critical) {
      color = Color.RED;
      fontSettings[1] = 34;
    }

    var x = new ABSObject_PopUp(value, color, null, fontSettings);
    x.setNumered();
    return x;
  };

  PopInfoManagerABS.TP = function (value, critical) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    var color = Color.ORANGE;
    if (value < 0) {
      color = Color.GREEN;
      value = Math.abs(value);
    } else if (critical) {
      color = Color.RED;
      fontSettings[1] = 34;
    }

    value = value + " " + TextManager.tpA;
    var x = new ABSObject_PopUp(value, color, null, fontSettings);
    x.setNumered();
    return x;
  }

  PopInfoManagerABS.MP = function (value, critical) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    var color = Color.MAGENTA;
    if (value < 0) {
      color = Color.BLUE;
      value = Math.abs(value);
    } else if (critical) {
      color = Color.MAGENTA;
      fontSettings[1] = 34;
    }

    var x = new ABSObject_PopUp(value, color, null, fontSettings);
    x.setNumered();
    return x;
  }

  PopInfoManagerABS.STATE = function (name, iconIndex, isErase) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    fontSettings[2] = true;

    var temp = isErase ? "- " : "+ ";
    fontSettings[0] = AlphaABS.SYSTEM.FONT;
    return new ABSObject_PopUp(temp + name, null, iconIndex, fontSettings);
  }

  PopInfoManagerABS.BUFF = function (name, iconIndex, isPositive) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    fontSettings[2] = true;

    var color = isPositive ? Color.GREEN : Color.RED;
    fontSettings[0] = AlphaABS.SYSTEM.FONT;
    return new ABSObject_PopUp(name, color, iconIndex, fontSettings);
  }

  PopInfoManagerABS.TEXT = function (text) {
    return new ABSObject_PopUp(text);
  }

  PopInfoManagerABS.TEXT_WITH_COLOR = function (text, color) {
    return new ABSObject_PopUp(text, color);
  }

  PopInfoManagerABS.ALERT = function (text) {
    if (AlphaABS.Parameters.isLoaded()) {
      if (!this._alertPopUpConfigurated) {
        this._alertPopUpConfigurated = true;
        var parameters = AlphaABS.Parameters.get_UIE_PlayerMessageBar();
        this._alertPopUp_color = (parameters['Text Color']) ? Color.FromHex(parameters['Text Color']) : Color.RED;
        this._alertPopUp_fontName = (parameters['Font Name']) ? parameters['Font Name'] : null;
      }
      return new ABSObject_PopUp(text, this._alertPopUp_color, null, [this._alertPopUp_fontName, 22, false, 2, Color.BLACK]);
    } else
      return new ABSObject_PopUp(text, Color.RED, null, [null, 22, false, 2, Color.BLACK]);
  }

  PopInfoManagerABS.EXP = function (value) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    fontSettings[1] = 32;
    var x = new ABSObject_PopUp(value, Color.MAGENTA, null, fontSettings);
    x.setNumered();
    return x;
  }

  PopInfoManagerABS.SKILL = function (name, iconIndex) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    fontSettings[2] = true;
    return new ABSObject_PopUp(AlphaABS.SYSTEM.STRING_POPUP_SKILL, Color.GREEN, iconIndex, fontSettings);
  };

  //PRIVATE
  PopInfoManagerABS._apply_pop_up = function (user, value) {
    /*if(this.text === undefined)
      this.text = "";
    if(this.text != "") {
      if(value.isNumered()) value.setExtraText(this.text);
      this.text = "";
    }*/
    user.addInfoPop(value);
  };

  //END PopInfoManagerABS
  //------------------------------------------------------------------------------

  AlphaABS.PopInfoManagerABS = PopInfoManagerABS;
  AlphaABS.register(PopInfoManagerABS);

})();
// Generated by CoffeeScript 2.1.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AILogicManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AILogicManager;
  AILogicManager = function() {
    throw new Error("This is a static class");
  };
  AILogicManager.getTargetsInRange = function(bot) {
    var all, enemy;
    try {
      all = AILogicManager.getAllInRange(bot);
      if (all.length > 0) {
        return ((function() {
          var i, len, results;
          results = [];
          for (i = 0, len = all.length; i < len; i++) {
            enemy = all[i];
            if (!enemy.isAlly(bot)) {
              results.push(enemy);
            }
          }
          return results;
        })()).first();
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  AILogicManager.getAllInRange = function(bot) {
    var all, inRange;
    try {
      all = $gameTroop.membersABS().concat([$gamePlayer]);
      all = all.concat($gameParty.membersABS());
      inRange = AlphaABS.UTILS.inRadius(bot, bot.behaviorModel().viewRadius, all);
      return inRange.filter(function(item) {
        return AlphaABS.BattleManagerABS.isValidTarget(item);
      });
    } catch (error) {
      return [];
    }
  };
  AILogicManager.getAlliesInRange = function(bot) {
    var all, ally;
    try {
      all = AILogicManager.getAllInRange(bot);
      if (all.length > 0) {
        return ((function() {
          var i, len, results;
          results = [];
          for (i = 0, len = all.length; i < len; i++) {
            ally = all[i];
            if (ally.isAlly(bot) && ally.inBattle()) {
              results.push(ally);
            }
          }
          return results;
        })()).first();
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  AILogicManager.targetInVisibleRange = function(bot) {
    var distance, target, view;
    target = bot != null ? bot.target() : void 0;
    if (!(target != null ? target.inActive() : void 0)) {
      return false;
    }
    view = bot.behaviorModel().viewRadius;
    distance = AlphaABS.UTILS.distanceTo(bot, target);
    return distance < view;
  };
  AILogicManager.inOutReturnRange = function(bot) {
    var distance, home, returnDistance;
    home = bot != null ? bot.getHomePosition() : void 0;
    if (home == null) {
      return false;
    }
    returnDistance = bot.behaviorModel().returnRadius;
    distance = AlphaABS.UTILS.distanceTo(bot, home);
    return distance > returnDistance;
  };
  AILogicManager.canUseActionNow = function(bot) {
    var action;
    action = bot != null ? bot.currentAction() : void 0;
    if (action != null) {
      return AlphaABS.BattleManagerABS.canUseSkillByTimer(action);
    } else {
      return false;
    }
  };
  AILogicManager.inActionRange = function(bot) {
    var action, target;
    action = bot != null ? bot.currentAction() : void 0;
    if (action != null) {
      target = bot.target();
      if (target) {
        return AlphaABS.BattleManagerABS.canUseSkillByRange(bot, target, action);
      }
    }
    return false;
  };
  AILogicManager.isUsableABSSkill = function(absSkill) {
    if (absSkill.isZoneType()) {
      return false;
    }
    if (absSkill.isRadiusType()) {
      return false;
    }
    if (absSkill.isNeedAmmo()) {
      return false;
    }
    if (absSkill.isVectorTypeR()) {
      return false;
    }
    if (absSkill.isStackType() && !absSkill.isAutoReloadStack()) {
      return false;
    }
    return true;
  };
  AlphaABS.register(AILogicManager);
})();

// ■ END AILogicManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.1.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AIStateBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AIStateBase;
  AIStateBase = class AIStateBase {
    constructor() {
      this._bot = null;
      this._log = null;
      this._init();
    }

    _init() {} //EMPTY

    update(bot) {
      if (!this._setup(bot)) {
        return;
      }
      this._updateMainLogic();
      return this._bot = null;
    }

    _setup(bot) {
      if (bot == null) {
        return false;
      }
      this._bot = bot;
      return this._setupMain();
    }

    _updateMainLogic() {} //EMPTY

    _setupMain() {
      return true;
    }

    onStateStarted() {} //EMPTY

    log(text) {
      try {
        if (typeof DEV === "undefined" || DEV === null) {
          return;
        }
        if (this._log == null) {
          this._createLog();
        }
        if (this._bot != null) {
          return this._log.p(`${this._bot.aiName} : ${text}`);
        }
      } catch (error) {

      }
    }

    _createLog() {
      try {
        this._log = new PLATFORM.DevLog(this.constructor.name);
        return this._log.setColors('#00BD43');
      } catch (error) {

      }
    }

  };
  AlphaABS.register(AIStateBase);
})();

// ■ END AIStateBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.1.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AIStateBattle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AIStateBattle;
  AIStateBattle = class AIStateBattle extends AlphaABS.LIBS.AIStateBase {
    _init() {
      this._newActionState = null;
      return this._actionState = null;
    }

    _setupMain() {
      this.isStayStill = this._bot.behaviorModel().noMove;
      return true;
    }

    _updateMainLogic() {
      if (!this._checkTarget() || this._checkNoMoveMode()) {
        this._bot.changeStateToFree();
      } else {
        this._bot._makeActions();
        this._updateBattleStates();
      }
    }

    _checkTarget() {
      return AlphaABS.BattleManagerABS.isValidTarget(this._bot.target());
    }

    _checkNoMoveMode() {
      if (!AlphaABS.LIBS.AILogicManager.targetInVisibleRange(this._bot)) {
        if (this.isStayStill) {
          true;
        }
      }
      return false;
    }

    _updateBattleStates() {
      if (this._newActionState != null) {
        this._applyActionState();
      }
      switch (this._actionState) {
        case "approach":
          this._updateApproachState();
          break;
        case "prepareAction":
          this._updatePrepareActionState();
          break;
        case "action":
          this._updateBattleActionState();
          break;
        case "cast":
          this._updateCastState();
          break;
        case "escape":
          this._updateEscapeState();
          break;
        case "wait":
          this._updateWaitState();
      }
    }

    _applyActionState() {
      this._actionState = this._newActionState;
      switch (this._actionState) {
        case "approach":
          this._applyApproachState();
          break;
        case "cast":
          this._applyCastState();
          break;
        case "action":
          this._applyBattleActionState();
          break;
        case "escape":
          this._applyEscapeState();
          break;
        case "wait":
          this._applyWaitState();
      }
      //when "prepareAction" then #EMPTY
      return this._newActionState = null;
    }

    _applyApproachState() {
      this.log("Apply Approach State");
      if (this.isStayStill) {
        return this._stayAndTurn();
      } else {
        return this._bot.startPursuitTarget();
      }
    }

    _stayAndTurn() {
      this._bot.stay();
      return this._bot.turnTowardTarget();
    }

    _applyCastState() {
      return this._stayAndTurn();
    }

    _applyBattleActionState() {
      this._stayAndTurn();
      return this._bot.createNewHomePoint();
    }

    _applyEscapeState() {
      this._bot.stay();
      return this._bot._applyAproachSpeed();
    }

    _applyWaitState() {
      return this._bot.stay();
    }

    _updateApproachState() {
      if (this.isStayStill) {
        if (!AlphaABS.LIBS.AILogicManager.targetInVisibleRange(this._bot)) {
          return this._bot.changeStateToReturn();
        }
      } else {
        if (AlphaABS.LIBS.AILogicManager.inOutReturnRange(this._bot)) {
          return this._bot.changeStateToReturn();
        }
      }
    }

    _updatePrepareActionState() {
      this._bot.checkActionCommonEvent();
      if (AlphaABS.LIBS.AILogicManager.canUseActionNow(this._bot)) {
        return this._prepareActionForNow();
      }
    }

    _prepareActionForNow() {
      if (AlphaABS.LIBS.AILogicManager.inActionRange(this._bot)) {
        return this.changeActionStateTo("action");
      } else {
        this.log("Target away to action, try approach");
        if (this.isStayStill) {
          this.log("Can't approach, (noMove == true)");
          return this._bot.turnTowardTarget();
        } else {
          return this.changeActionStateTo("approach");
        }
      }
    }

    changeActionStateTo(newActionState) {
      return this._newActionState = newActionState;
    }

    _updateBattleActionState() {
      var action;
      this.log("Try Perform Action");
      action = this._bot.currentAction();
      if (action != null ? action.isNeedCast() : void 0) {
        return this._updateOnCastingAction(action);
      } else {
        return this._bot._performAction();
      }
    }

    _updateOnCastingAction(action) {
      if (action.isCasting() && action.isReady()) {
        return this._bot._performAction();
      } else {
        this.log("Start casting");
        action.startCast();
        return this.changeActionStateTo("cast");
      }
    }

    _updateCastState() {
      var action;
      this._bot.turnTowardTarget();
      action = this._bot.currentAction();
      if ((action != null) && action.isCasting()) {
        if (AlphaABS.LIBS.AILogicManager.inActionRange(this._bot)) {
          if (action.isReady()) {
            return this.changeActionStateTo("action");
          }
        } else {
          this.log("Casting intterupt, target too far");
          action.resetCast();
          return this._onCastingComplete();
        }
      } else {
        return this._onCastingComplete();
      }
    }

    _onCastingComplete() {
      return this.changeActionStateTo("prepareAction");
    }

    _updateEscapeState() {
      this._bot._escapeFromTarget(this._bot.target());
      if (AlphaABS.LIBS.AILogicManager.inOutReturnRange(this._bot)) {
        return this._bot.changeStateToReturn();
      }
    }

    _updateWaitState() {
      var isAgressive;
      isAgressive = this._bot.behaviorModel().agressive;
      if (isAgressive) {
        return this.changeActionStateTo("approach");
      } else {
        if (!AlphaABS.LIBS.AILogicManager.targetInVisibleRange(this._bot)) {
          return this._bot.changeStateToFree();
        }
      }
    }

    onStateStarted() {
      return this.changeActionStateTo("approach");
    }

  };
  AlphaABS.register(AIStateBattle);
})();

// ■ END AIStateBattle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.1.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AIStateBattleParty.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AIStateBattleParty;
  AIStateBattleParty = class AIStateBattleParty extends AlphaABS.LIBS.AIStateBattle {
    _setupMain() {
      return true;
    }

    _updateMainLogic() {
      this.log(this._actionState);
      if (!this._checkTarget()) {
        this._bot.changeStateToFree();
      } else {
        this._bot._makeActions();
        this._updateBattleStates();
      }
    }

    _applyBattleActionState() {}

    _updateApproachState() {
      if (AlphaABS.LIBS.AILogicManager.inOutReturnRange(this._bot)) {
        return this._bot.changeStateToReturn();
      }
    }

    _updatePrepareActionState() {
      this._bot.checkActionCommonEvent();
      if (AlphaABS.LIBS.AILogicManager.canUseActionNow(this._bot)) {
        return this._prepareActionForNow();
      } else {
        if (!AlphaABS.LIBS.AILogicManager.inOutReturnRange(this._bot)) {
          return this.changeActionStateTo("approach");
        }
      }
    }

    _prepareActionForNow() {
      if (AlphaABS.LIBS.AILogicManager.inActionRange(this._bot)) {
        return this.changeActionStateTo("action");
      } else {
        this.log("Target away to action, try approach");
        return this.changeActionStateTo("approach");
      }
    }

    _updateWaitState() {
      var isAgressive;
      this.changeActionStateTo("approach");
      isAgressive = this._bot.behaviorModel().agressive;
      if (isAgressive) {
        return this.changeActionStateTo("approach");
      } else {
        if (AlphaABS.LIBS.AILogicManager.targetInVisibleRange(this._bot)) {
          return this._checkPartyLeaderState();
        } else {
          return this._bot.changeStateToFree();
        }
      }
    }

    
    //NEW
    _checkPartyLeaderState() {
      if (!$gamePlayer.inActive()) {
        return;
      }
      if ($gamePlayer.inBattle()) {
        if (this._bot.target() === $gamePlayer.target()) {
          this.changeActionStateTo("approach");
          return;
        }
      }
      return this._bot.changeStateToReturn();
    }

  };
  AlphaABS.register(AIStateBattleParty);
})();

// ■ END AIStateBattleParty.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.1.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AIStateFree.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AIStateFree;
  AIStateFree = class AIStateFree extends AlphaABS.LIBS.AIStateBase {
    _init() {
      return this._regenTimer = null;
    }

    _setupMain() {
      var error, model;
      try {
        model = this._bot.behaviorModel();
        this.canSearchAlly = model.canSearch;
        this.canRegenerateInFreeMode = model.regen;
        this.canEscapeInBattle = model.escapeOnBattle;
        this.active = this._bot.inActive();
        this.battler = this._bot.battler();
        return true;
      } catch (error1) {
        error = error1;
        console.error(error);
        return false;
      }
    }

    _updateMainLogic() {
      if (this._bot.canFight()) {
        return this._updateWithFightLogic();
      } else {
        return this._updateNoFightLogic();
      }
    }

    _updateWithFightLogic() {
      this._updateReturnToHome();
      this._regenerate();
      this._updateVision();
    }

    _updateReturnToHome() {
      if ((this._bot.getHomePosition() != null) && this.active) {
        return this._returnToHome();
      }
    }

    _returnToHome() {
      return this._bot.returnSlow();
    }

    _regenerate() {
      if (this.canRegenerateInFreeMode) {
        if (this._regenTimer == null) {
          this._createRegenTimer();
        }
        if (this._updateAndCheckRegenTimer()) {
          return this.battler.regenerateAllonFree();
        }
      }
    }

    _createRegenTimer() {
      this._regenTimer = new Game_TimerABS();
      return this._regenTimer.start(60);
    }

    _updateAndCheckRegenTimer() {
      this._regenTimer.update();
      if (this._regenTimer.isReady()) {
        this._regenTimer.reset();
        return true;
      } else {
        return false;
      }
    }

    _updateVision() {
      var target;
      target = AlphaABS.LIBS.AILogicManager.getTargetsInRange(this._bot);
      if (target != null) {
        return this._onSeeTarget(target);
      } else {
        return this._updateVisionForAlly();
      }
    }

    _onSeeTarget(target) {
      return this._bot.changeStateToBattle(target);
    }

    _updateVisionForAlly() {
      var ally;
      if (this.canSearchAlly) {
        ally = AlphaABS.LIBS.AILogicManager.getAlliesInRange(this._bot);
        if (ally != null) {
          return this._onSeeAlly(ally);
        }
      }
    }

    _onSeeAlly(ally) {
      return this._bot.changeStateToSearch(ally);
    }

    _updateNoFightLogic() {
      var target;
      target = AlphaABS.LIBS.AILogicManager.getTargetsInRange(this._bot);
      if (target != null) {
        return this._onSeeTargetInNoFightMode(target);
      } else {
        return this._regenerate();
      }
    }

    _onSeeTargetInNoFightMode(target) {
      if (this.canEscapeInBattle) {
        return this._bot.runAwayFromTarget(target);
      }
    }

    onStateStarted() {
      var ref;
      return (ref = this._regenTimer) != null ? ref.reset() : void 0;
    }

  };
  AlphaABS.register(AIStateFree);
})();

// ■ END AIStateFree.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.1.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AIStateFreeParty.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AIStateFreeParty;
  AIStateFreeParty = class AIStateFreeParty extends AlphaABS.LIBS.AIStateFree {
    _init() {} //EMPTY

    _setupMain() {
      var error, model;
      try {
        model = this._bot.behaviorModel();
        this.canSearchAlly = model.canSearch;
        this.canEscapeInBattle = model.escapeOnBattle;
        this.active = this._bot.inActive();
        this.battler = this._bot.battler();
        return true;
      } catch (error1) {
        error = error1;
        console.error(error);
        return false;
      }
    }

    _updateMainLogic() {
      return this._updateWithFightLogic();
    }

    _updateWithFightLogic() {
      this._updateReturnToHome();
      this._updateVision();
    }

    _returnToHome() {
      return this._bot.returnSlow();
    }

    _updateVision() {
      var target;
      target = AlphaABS.LIBS.AILogicManager.getTargetsInRange(this._bot);
      if (target != null) {
        return this._onSeeTarget(target);
      } else {
        return this._updateVisionForAlly();
      }
    }

    _onSeeTarget(target) {
      var playerState;
      if (this._bot.behaviorModel().agressive) {
        return this._bot.changeStateToBattle(target);
      } else {
        playerState = $gamePlayer.inBattle() && $gamePlayer.target() === target;
        if (playerState) {
          return this._bot.changeStateToBattle(target);
        }
      }
    }

    _updateVisionForAlly() {
      var ally;
      if (this.canSearchAlly) {
        ally = AlphaABS.LIBS.AILogicManager.getAlliesInRange(this._bot);
        if (ally != null) {
          return this._onSeeAlly(ally);
        }
      }
    }

    _onSeeAlly(ally) {
      if (ally.inBattle()) {
        return this._bot.changeStateToSearch(ally);
      }
    }

  };
  AlphaABS.register(AIStateFreeParty);
})();

// ■ END AIStateFreeParty.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.1.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AIStateMachine.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AIStateMachine;
  AIStateMachine = class AIStateMachine {
    constructor() {
      this._bot = null;
      this._state = "";
      this._freeStateLogic = new AlphaABS.LIBS.AIStateFree();
      this._searchStateLogic = new AlphaABS.LIBS.AIStateSearch();
      this._returnStateLogic = new AlphaABS.LIBS.AIStateReturn();
      this._battleStateLogic = new AlphaABS.LIBS.AIStateBattle();
    }

    update(bot) {
      if (!this._setup(bot)) {
        return;
      }
      if (this._bot.inActive()) {
        if (!this._checkDeadState()) {
          this._updateInActiveMode();
        }
      } else {
        this._updateInNoActiveMode();
      }
      this._bot = null;
    }

    _setup(bot) {
      this._bot = bot;
      if (bot == null) {
        return false;
      }
      this.battler = this._bot.battler();
      return true;
    }

    _checkDeadState() {
      if (!this.battler.isAlive()) {
        this._changeStateTo("dead");
        return true;
      }
      return false;
    }

    _changeStateTo(stateSymbol) {
      this._state = stateSymbol;
      switch (this._state) {
        case "free":
          return this._onStateFree();
        case "battle":
          return this._onStateBattle();
        case "search":
          return this._onStateSearch();
        case "return":
          return this._onStateReturn();
        case "stun":
          return this._onStateStun();
        case "dead":
          return this._onStateDead();
      }
    }

    _onStateFree() {
      this._bot.onSwitchToFreeState();
      return this._freeStateLogic.onStateStarted();
    }

    _onStateBattle() {
      this._bot.onSwitchToBattleState();
      return this._battleStateLogic.onStateStarted();
    }

    _onStateSearch() {
      return this._bot.onSwitchToSearchState();
    }

    _onStateReturn() {
      return this._bot.onSwitchToReturnState();
    }

    _onStateStun() {
      return this._bot.onSwitchToStunState();
    }

    _onStateDead() {
      return this._bot.onSwitchToDeadState();
    }

    _updateInActiveMode() {
      this._checkStunState();
      return this._updateStates();
    }

    _checkStunState() {
      if (!this.battler.canMove() && !this.inStunState()) {
        return this._changeStateTo("stun");
      }
    }

    inStunState() {
      return this._state === "stun";
    }

    _updateStates() {
      switch (this._state) {
        case "free":
          return this._updateOnFree();
        case "battle":
          return this._updateOnBattle();
        case "search":
          return this._updateOnSearch();
        case "return":
          return this._updateOnReturn();
        case "stun":
          return this._updateOnStun();
      }
    }

    _updateOnFree() {
      return this._freeStateLogic.update(this._bot);
    }

    _updateOnBattle() {
      return this._battleStateLogic.update(this._bot);
    }

    _updateOnSearch() {
      return this._searchStateLogic.update(this._bot);
    }

    _updateOnReturn() {
      return this._returnStateLogic.update(this._bot);
    }

    _updateOnStun() {
      if (this.battler.canMove()) {
        return this._changeStateTo("free");
      }
    }

    _updateInNoActiveMode() {
      if (this.inReturnState()) {
        return this._updateOnReturn();
      }
    }

    inReturnState() {
      return this._state === "return";
    }

    switchStateToFree(bot) {
      if (this._setup(bot)) {
        return this._changeStateTo("free");
      }
    }

    switchStateToBattle(bot) {
      if (this._setup(bot)) {
        return this._changeStateTo("battle");
      }
    }

    switchStateToSearch(bot) {
      if (this._setup(bot)) {
        return this._changeStateTo("search");
      }
    }

    switchStateToReturn(bot) {
      if (this._setup(bot)) {
        return this._changeStateTo("return");
      }
    }

    switchActionStateToAction() {
      return this._battleStateLogic.changeActionStateTo("action");
    }

    switchActionStateToPrepare() {
      return this._battleStateLogic.changeActionStateTo("prepareAction");
    }

    switchActionStateToEscape() {
      return this._battleStateLogic.changeActionStateTo("escape");
    }

    switchActionStateToWait() {
      return this._battleStateLogic.changeActionStateTo("wait");
    }

  };
  AlphaABS.register(AIStateMachine);
})();

// ■ END AIStateMachine.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.1.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AIStateMachineParty.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AIStateMachineParty;
  AIStateMachineParty = class AIStateMachineParty extends AlphaABS.LIBS.AIStateMachine {
    constructor() {
      super();
      this._freeStateLogic = new AlphaABS.LIBS.AIStateFreeParty();
      this._returnStateLogic = new AlphaABS.LIBS.AIStateReturnParty();
      this._battleStateLogic = new AlphaABS.LIBS.AIStateBattleParty();
    }

  };
  AlphaABS.register(AIStateMachineParty);
})();

// ■ END AIStateMachineParty.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.1.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AIStateReturn.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AIStateReturn;
  AIStateReturn = class AIStateReturn extends AlphaABS.LIBS.AIStateBase {
    _updateMainLogic() {
      if (this._bot.getHomePosition() == null) {
        return this._bot.onReturnEnd();
      }
      if (this._bot.isNotReturn()) {
        return this._bot.onReturnEnd();
      }
      return this._updateReturnMode();
    }

    _updateReturnMode() {
      if (this._bot.isSlowReturn()) {
        this._bot.onReturnEnd();
        return this._bot.returnSlow();
      } else {
        return this._bot.returnFast();
      }
    }

  };
  AlphaABS.register(AIStateReturn);
})();

// ■ END AIStateReturn.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.1.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AIStateReturnParty.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AIStateReturnParty;
  AIStateReturnParty = class AIStateReturnParty extends AlphaABS.LIBS.AIStateReturn {
    _updateReturnMode() {
      if (this._bot.isSlowReturn()) {
        return this._bot.returnSlow();
      } else {
        return this._bot.returnFast();
      }
    }

  };
  AlphaABS.register(AIStateReturnParty);
})();

// ■ END AIStateReturnParty.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.1.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AIStateSearch.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AIStateSearch;
  AIStateSearch = class AIStateSearch extends AlphaABS.LIBS.AIStateBase {
    _updateMainLogic() {
      if (this._haveOneToSearch()) {
        this._updateOnSearch();
      } else {
        this._bot.changeStateToFree();
      }
    }

    _haveOneToSearch() {
      var ref;
      return (ref = this._bot.allyToSearch()) != null ? ref.inActive() : void 0;
    }

    _updateOnSearch() {
      var target;
      target = AlphaABS.LIBS.AILogicManager.getTargetsInRange(this._bot);
      if (target != null) {
        return this._onSeeTarget(target);
      } else {
        return this._updateAllySearch();
      }
    }

    _onSeeTarget(target) {
      this._bot.setAllyTarget(null);
      return this._bot.changeStateToBattle(target);
    }

    _updateAllySearch() {
      this._bot.moveToAlly();
      if (this._bot.isNearThePointX(this._bot.allyToSearch())) {
        return this._bot.changeStateToFree();
      }
    }

  };
  AlphaABS.register(AIStateSearch);
})();

// ■ END AIStateSearch.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.1.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AIStateSearchParty.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//! No used!
(function() {
  var AIStateSearchParty;
  AIStateSearchParty = class AIStateSearchParty extends AlphaABS.LIBS.AIStateSearch {
    _updateMainLogic() {
      if (this._haveOneToSearch()) {
        this._updateOnSearch();
      } else {
        this._bot.changeStateToFree();
      }
    }

    _haveOneToSearch() {
      var ref;
      return (ref = this._bot.allyToSearch()) != null ? ref.inActive() : void 0;
    }

    _updateOnSearch() {
      var target;
      target = AlphaABS.LIBS.AILogicManager.getTargetsInRange(this._bot);
      if (target != null) {
        return this._onSeeTarget(target);
      } else {
        return this._updateAllySearch();
      }
    }

    _onSeeTarget(target) {
      this._bot.setAllyTarget(null);
      return this._bot.changeStateToBattle(target);
    }

    _updateAllySearch() {
      this._bot.moveToAlly();
      if (this._bot.isNearThePointX(this._bot.allyToSearch())) {
        return this._bot.changeStateToFree();
      }
    }

  };
  AlphaABS.register(AIStateSearchParty);
})();

// ■ END AIStateSearchParty.coffee
//---------------------------------------------------------------------------

(function () {
  //DataManager
  //------------------------------------------------------------------------------
  var _DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    _DataManager_extractSaveContents.call(this, contents);

    if ($gameMap.isABS()) {
      var t = $gameMap.events();
      t.forEach(function (ev) {
        if (ev instanceof Game_AIBot) {
          ev.onGameLoad();
        }
      });
      $gamePlayer.onGameLoad();
      if ($gameVariables._absUserKeys)
        AlphaABS.Key.symbol = $gameVariables._absUserKeys;
    }
  };

  var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function () {
    if (_DataManager_isDatabaseLoaded.call(this) == true) {
      if (!$dataSkills[1].meta.ABS) {
        throw new Error(AlphaABS.SYSTEM.STRING_ERROR_SKILLNAN);
      }
      if (DataManager._isOldRPGVersion()) {
        LOGW.p(AlphaABS.SYSTEM.STRING_ERROR_OLDDATA);
      }
      return true;
    } else
      return false;
  };

  DataManager._isOldRPGVersion = function () {
    if (Utils.RPGMAKER_VERSION) {
      var numbers = Utils.RPGMAKER_VERSION.split('.');
      return (numbers[1] < 6);
    } else {
      return true;
    }
  };
  //END DataManager
  //------------------------------------------------------------------------------

})();
(function(){

  var PopInfoManagerABS = AlphaABS.LIBS.PopInfoManagerABS;

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

    var pkd_GameAction_executeDamage = Game_Action.prototype.executeDamage;
    Game_Action.prototype.executeDamage = function(target, value) {
      pkd_GameAction_executeDamage.call(this, target, value);
      PopInfoManagerABS.makeDamagePopUp(target);
      if (this.isDrain()) {
        PopInfoManagerABS.makeDrainPopUp(this.subject());
      }
    };

    var pkd_GameAction_itemEffectRecoverHp = Game_Action.prototype.itemEffectRecoverHp;
    Game_Action.prototype.itemEffectRecoverHp = function(target, effect) {
      pkd_GameAction_itemEffectRecoverHp.call(this, target, effect);
      PopInfoManagerABS.makeDamagePopUp(target);
    };

    var pkd_GameAction_itemEffectRecoverMp = Game_Action.prototype.itemEffectRecoverMp;
    Game_Action.prototype.itemEffectRecoverMp = function(target, effect) {
      pkd_GameAction_itemEffectRecoverMp.call(this, target, effect);
      PopInfoManagerABS.makeDamagePopUp(target);
    };

    var pkd_GameAction_itemEffectGainTp = Game_Action.prototype.itemEffectGainTp;
    Game_Action.prototype.itemEffectGainTp = function(target, effect) {
      pkd_GameAction_itemEffectGainTp.call(this, target, effect);
      PopInfoManagerABS.makeDamagePopUp(target);
    };

    var pkd_GameAction_executeHpDamage = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target, value) {
      pkd_GameAction_executeHpDamage.call(this, target, value);
      if(value == 0) {
        PopInfoManagerABS.makeZeroDamagePopUp(target);
      }
    };
    //END Game_Action
  //------------------------------------------------------------------------------

})();

(function () {
  var LOG = new PLATFORM.DevLog("Game_Actor");
  var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;
  var Consts = AlphaABS.SYSTEM;

  //Game_Actor
  //------------------------------------------------------------------------------
  var _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
  Game_Actor.prototype.initMembers = function () {
    _Game_Actor_initMembers.call(this);
    this._absParams.panelSkills = [null, null, null, null, null, null, null, null]; //[id,type]
    this._absParams.favoriteWeapons = [null, null, null, null];
  };

  //NEW
  Game_Actor.prototype.getFavWeapIcons = function () {
    return this._absParams.favoriteWeapons.map(function (argument) {
      if (argument) {
        return $dataWeapons[argument].iconIndex;
      }
      return null;
    });
  };

  Game_Actor.prototype.changeFormationABS = function () {};

  //NEW
  Game_Actor.prototype.setFavWeap = function (item, index) {
    if (index > 3) return;
    if (item == null) {
      this.removeFavWeap(index);
      return;
    }
    if (this._absParams.favoriteWeapons[index] &&
      item.id == this._absParams.favoriteWeapons[index]) {
      this.removeFavWeap(index);
    } else {
      this._absParams.favoriteWeapons[index] = item.id;
    }
  };

  //NEW
  Game_Actor.prototype.isFavWeapExists = function () {
    return this._absParams.favoriteWeapons.some(function (elem) {
      return (elem !== null);
    });
  };

  //NEW
  Game_Actor.prototype.getFavWeapIndex = function (item) {
    var index = 0;
    if (item == null)
      return null;

    var finded = null; //This is not good at all
    this._absParams.favoriteWeapons.forEach(function (i) {
      if (i && i == item.id) {
        finded = index;
      }
      index++;
    }.bind(this));

    return finded;
  };

  //NEW
  Game_Actor.prototype.getFavWeapSymbol = function (item) {
    if (!DataManager.isWeapon(item)) return null;
    var index = this.getFavWeapIndex(item);
    if (index !== null) {
      var symbol = null;
      for (var key in AlphaABS.Key.indexSchemeC) {
        if (AlphaABS.Key.indexSchemeC[key] == index) {
          symbol = key;
          break;
        }
      }
      if (symbol != null) {
        symbol = AlphaABS.Key.symbol[symbol];
        return symbol;
      }
    }
    return null;
  };

  //NEW
  Game_Actor.prototype.removeFavWeap = function (index) {
    this._absParams.favoriteWeapons[index] = null;
  };

  //NEW
  Game_Actor.prototype.changeFavWeap = function (index) {
    var fvItem = this._absParams.favoriteWeapons[index];
    if (fvItem != null) {
      var fvItemX = $dataWeapons[fvItem];
      if (fvItemX != null) {
        if (this.hasWeapon(fvItemX)) {
          return false;
        }
        if ($gameParty.hasItem(fvItemX, false)) {
          if (Imported.YEP_ItemCore == true) {
            var slotId = fvItemX.etypeId - 1;
            this.changeEquip(slotId, fvItemX);
            return true;
          } else {
            this.changeEquipById(fvItemX.etypeId, fvItemX.id);
            return true;
          }
        }
      }
    }

    return false;
  };

  //OVER
  Game_Actor.prototype.performAttack = function () {
    var weapons = this.weapons();
    var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
    var attackMotion = $dataSystem.attackMotions[wtypeId];
    if (attackMotion) {
      this.startWeaponAnimation(attackMotion.weaponImageId);
    }
  };

  var pkd_GameActor_learnSkill = Game_Actor.prototype.learnSkill;
  Game_Actor.prototype.learnSkill = function (skillId) {
    var skill = $dataSkills[skillId];
    if (!skill.meta.ABS) {
      LOGW.p("Skill " + skill.name + " not learned, not ABS type");
      return; //Not allow learn not ABS skills
    }
    if (Utils.isMobileDevice()) {
      if (skill.meta.ABS) {
        var skillType = JSON.parse(skill.meta.ABS);
        if (skillType == 2 && skill.scope != 11) {
          LOGW.p("Skill " + skill.name + " not learned, not support on mobile platform");
          return;
        }
      }
    }
    var isLearning = this.isLearnedSkill(skillId);
    pkd_GameActor_learnSkill.call(this, skillId);
    if (skill.occasion == 1 && !isLearning) {
      this._absParams.battleSkillsABS.push(skillId, false);
      this.setSkillOnPanel(skillId, undefined);
    }
  }

  //NEW
  Game_Actor.prototype.uiPanelReset = function () {
    for (var i = 0; i < 8; i++) {
      this.setSkillOnPanel(null, i);
    }
  }

  Game_Actor.prototype.uiPanelSkills = function () {
    return this._absParams.panelSkills;
  }

  Game_Actor.prototype.skillByKeyIndex = function (index) {
    index = index - 1; //Keyboard from 1, but array from 0
    if (index < 0 || index > 7) {
      return null;
    }
    var skillABS = this._absParams.panelSkills[index];
    return skillABS;
  }

  Game_Actor.prototype.uiPanelObjectsCount = function () {
    var count = 0;
    this._absParams.panelSkills.forEach(function (i) {
      if (i !== null) count++;
    });
    return count;
  }

  Game_Actor.prototype.setItemOnPanel = function (itemId, position) {
    if (this._absParams.battleSkillsABS.itemById(itemId) === null)
      this._absParams.battleSkillsABS.push(itemId, true);
    this._setObjectOnPanel(itemId, 1, position);
  }

  Game_Actor.prototype.setSkillOnPanel = function (skillId, position) {
    this._setObjectOnPanel(skillId, 0, position);
  }

  Game_Actor.prototype._uiPanelFreeSlot = function () {
    for (var i = 0; i < 8; i++) {
      if (this._absParams.panelSkills[i] === null) {
        return i;
      }
    }
    return null; //Not empty slots
  }

  Game_Actor.prototype._setOnPosition = function (id, type, position) {
    if (id == null) {
      this._absParams.panelSkills[position] = null;
      return;
    }
    if (type == 1) {
      this._absParams.panelSkills[position] = this._absParams.battleSkillsABS.itemById(id);
    } else {
      this._absParams.panelSkills[position] = this._absParams.battleSkillsABS.skillById(id);
    }
  }

  Game_Actor.prototype._setObjectOnPanel = function (skillId, type, position) {
    if (position === undefined) {
      var slot = this._uiPanelFreeSlot();
      if (slot >= 0) {
        this._setObjectOnPanel(skillId, type, slot);
      } else {
        return;
      }
    } else {
      if (skillId == null) {
        this._setOnPosition(null, type, position);
      } else {
        if (this._compareObjectOnPosition(skillId, type, position)) { //Remove if on self position
          this._setObjectOnPanel(null, type, position);
        } else {
          var index = this.skillIndexOnUI(skillId, type);
          if (index >= 0) { //Remove from other position if exists
            this._setOnPosition(null, type, index);
          }
          this._setOnPosition(skillId, type, position);
        }
      }

    }
    AlphaABS.BattleUI.refresh();
  }

  Game_Actor.prototype._compareObjectOnPosition = function (id, type, position) {
    if (this._absParams.panelSkills[position]) {
      var item = this._absParams.panelSkills[position];
      if (item.skillId == id) {
        if (type == 1) {
          if (item.isItem()) return true;
        } else {
          if (!item.isItem()) return true;
        }
      }
    }

    return false;
  }

  //Возвращяет номер этого навыка на панели или -1, если навыка нет на панели
  Game_Actor.prototype.skillIndexOnUI = function (skillId, isItem) {
    for (var i = 0; i < this._absParams.panelSkills.length; i++) {
      var item = this._absParams.panelSkills[i];
      if (item === null) continue;
      if (item.skillId == skillId) {
        if (isItem) {
          if (item.isItem()) return i;
        } else
        if (!item.isItem()) return i;
      }
    }

    return -1;
  }

  //OVER
  Game_Actor.prototype.performMapDamage = function () {
    $gameScreen.startFlashForDamage();
  };

  //OVER
  Game_Actor.prototype.turnEndOnMap = function () {
    //EMPTY
  };

  Game_Actor.prototype.stopABS = function () {
    Game_Battler.prototype.stopABS.call(this);
    if (this._absParams.stackSkillExists) {
      this._absParams.stackSkillExists = false;
      this._absParams.battleSkillsABS.all().forEach(function (skill) {
        if (skill.isStackType() && !skill.isAutoReloadStack()) {
          if (!skill.isNeedReloadStack()) {
            var item = $dataItems[skill.ammo];
            $gameParty.gainItem(item, skill._currentStack);
            skill.chargeStack(-skill.stack);
          }
        }
      }.bind(this));
    }
  }

  Game_Actor.prototype._prepareABSSkill = function (absSkill) {
    Game_Battler.prototype._prepareABSSkill.call(this, absSkill);
    if (absSkill.isNeedAmmo()) {
      this._absParams.stackSkillExists = true;
      LOG.p("Skill " + absSkill.name() + " need Ammo " + $dataItems[absSkill.ammo].name);
      this._reloadABSSkill(absSkill);
    }
  }

  //NEW
  Game_Actor.prototype.refreshABSSkills = function () {
    if (this._absParams.stackSkillExists) {
      this._absParams.battleSkillsABS.all().forEach(function (skill) {
        if (skill.isStackType() && !skill.isAutoReloadStack()) {
          if (skill.isNeedReloadStack()) {
            this._reloadABSSkill(skill);
          }
        }
      }.bind(this));
    }

    var skillsAll = this._absParams.battleSkillsABS.all();
    for (var i = skillsAll.length - 1; i > 0; i--) {
      var item = skillsAll[i];
      if (item.isItem()) {
        if (item.isReady()) {
          if ($gameParty.numItems(item.skill()) == 0) {
            if (!this._absParams.panelSkills.include(item)) {
              LOG.p("Remove ITEM ABS from memory " + item.name());
              skillsAll.splice(i, 0);
            }
          }
        }
      }
    }
  }

  //TODO:Тогда надо и возвращять снаряды, когда ABS закончился
  Game_Actor.prototype._reloadABSSkill = function (absSkill) {
    LOG.p("Start reload " + absSkill.name());
    var item = $dataItems[absSkill.ammo];
    if ($gameParty.hasItem(item)) {
      var count = $gameParty.numItems(item);
      LOG.p("Party has item " + count + ", need to reload " + absSkill.stack);
      var d = absSkill.chargeStack(count);
      LOG.p("Stack charged, item used " + (d > 0) ? (count - d) : count);
      if (d > 0) count = count - d;
      $gameParty.loseItem(item, count);
      absSkill.reloadStack();
    } else {
      LOG.p("Party has not items");
    }
  }

  Game_Actor.prototype.performCurrentAction = function () {
    Game_Battler.prototype.performCurrentAction.call(this);
    var skill = this.skillABS_byAction(this.action(0));
    if (skill.isStackType() && !skill.isAutoReloadStack()) {
      if (skill.isNeedReloadStack()) {
        LOG.p("Stack reload manual start");
        this._reloadABSSkill(skill);
      }
    }
  }

  var _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
  Game_Actor.prototype.displayLevelUp = function (newSkills) {
    if ($gameMap.isABS()) {
      BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NEWLEVEL);
      var levelUpAnimationId = AlphaABS.Parameters.get_LevelUpAnimationId();
      if (levelUpAnimationId > 0)
        $gamePlayer.requestAnimationABS(levelUpAnimationId); //TODO: If Party, need char selector
    } else
      _Game_Actor_displayLevelUp.call(this, newSkills);
  };

  var _Game_Actor_tradeItemWithParty = Game_Actor.prototype.tradeItemWithParty;
  Game_Actor.prototype.tradeItemWithParty = function (newItem, oldItem) {
    $gameParty._noNotifyABS = true;
    var r = _Game_Actor_tradeItemWithParty.call(this, newItem, oldItem);
    $gameParty._noNotifyABS = false;
    return r;
  }

  var _Game_Actor_gainExp = Game_Actor.prototype.gainExp;
  Game_Actor.prototype.gainExp = function (exp) {
    if ($gameMap.isABS() && exp > 0) {
      var nExp = Math.round(exp * this.finalExpRate());
      if (this.isPlayer())
        AlphaABS.BattleUI.pushExpOnPanel(nExp);
    }
    _Game_Actor_gainExp.call(this, exp);
  };

  var pkd_GameActor_forgetSkill = Game_Actor.prototype.forgetSkill;
  Game_Actor.prototype.forgetSkill = function (skillId) {
    pkd_GameActor_forgetSkill.call(this, skillId);
    var index = this.skillIndexOnUI(skillId, false);
    if (index >= 0)
      this.setSkillOnPanel(null, index); //Delete from UI
    this._absParams.battleSkillsABS.remove(skillId, false);

  }

  var _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
  Game_Actor.prototype.changeEquip = function (slotId, item) {
    this._absParams.needWeaponCheck = true;
    _Game_Actor_changeEquip.call(this, slotId, item);
  };

  var _Game_Actor_discardEquip = Game_Actor.prototype.discardEquip;
  Game_Actor.prototype.discardEquip = function (item) {
    this._absParams.needWeaponCheck = true;
    _Game_Actor_discardEquip.call(this, item);
  };

  var _Game_Actor_refresh = Game_Actor.prototype.refresh;
  Game_Actor.prototype.refresh = function () {
    _Game_Actor_refresh.call(this);
    if (this._absParams.needWeaponCheck) {
      this._checkAdditionSkills();
      if ($gameMap.isABS()) {
        LOG.p("PL : Check weapon skill");
        if (this.weapons().length > 0) {
          var w = this.weapons()[0];
          if (w.meta.ABS) {
            if (w.meta.ABS == 0) {
              this._absParams.battleSkillsABS.all()[0].loadExternal(w.meta);
            }
            if (w.meta.ABS == 1) {
              this._absParams.battleSkillsABS.all()[0].loadExternal(w.meta, 1);
            }
          } else {
            this._absParams.battleSkillsABS.all()[0] = new Game_SkillABS(this.attackSkillId());
          }
        } else {
          this._absParams.battleSkillsABS.all()[0] = new Game_SkillABS(this.attackSkillId());
        }
        this._absParams.needWeaponCheck = false;
        AlphaABS.BattleUI.refreshWeaponIconAt(0);
      }
    }
  }

  //NEW
  Game_Actor.prototype._checkAdditionSkills = function () {
    LOG.p("Check addition skills");
    this.addedSkills().forEach(function (i) {
      if (this._absParams.battleSkillsABS.skillById(i) == null) {
        this._absParams.battleSkillsABS.push(i, false);
        this.setSkillOnPanel(i, undefined);
      }
    }.bind(this));

    //CHECK ALL
    var d = this._skills.concat(this.addedSkills());
    this._absParams.battleSkillsABS.all().forEach(function (i) {
      if (!d.include(i.skillId)) {
        if (i.skillId != this.attackSkillId()) {
          this._absParams.battleSkillsABS.remove(i.skillId, false);
          var index = this.skillIndexOnUI(i.skillId, false);
          if (index != -1) {
            this.setSkillOnPanel(null, index);
          }
        }
      }
    }.bind(this));
  };

  //1
  var _Game_Actor_isEquipTypeLocked = Game_Actor.prototype.isEquipTypeLocked;
  Game_Actor.prototype.isEquipTypeLocked = function (etypeId) {
    if (etypeId == 1) {
      if ($gameMap.isABS()) {
        var timer = this._absParams.battleSkillsABS.all()[0].isReady();
        if (timer) {
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


  Game_Actor.prototype._initBattleSkills = function () {
    Game_Battler.prototype._initBattleSkills.call(this);
    this._absParams.battleSkillsABS.push(this.attackSkillId(), false);
    this._absParams.needWeaponCheck = true;
  };

  Game_Actor.prototype.isPlayer = function () {
    return (this == $gamePlayer.battler());
  };

  //OVER
  Game_Actor.prototype.makeActions = function() {
    Game_Battler.prototype.makeActions.call(this);
    if (this.isConfused())
      this.makeConfusionActions();
    else
      this.makeAutoBattleActions();
  }

  //END Game_Actor
  //------------------------------------------------------------------------------

})();
(function () {
  var LOG = new PLATFORM.DevLog("Game_AIBehavior");
  //Game_AIBehavior
  //------------------------------------------------------------------------------
  /* jshint -W104 */
  class Game_AIBehavior {
    constructor() {}

    loadEnemy(ai) {
      var templateIndex = 0;
      var enemyObject = $dataEnemies[ai._absParams.enemyId];
      if (enemyObject.meta.ABS) {
        var newTemplateIndex = parseInt(t.meta.ABS);
        if (newTemplateIndex > 0)
          templateIndex = newTemplateIndex;
      }
      this._loadParamsBase(templateIndex);
      this._readEnemyData(ai._absParams.enemyId);
      this._readEventData(ai);
      this._checkParams();
    }

    _loadParamsBase(templateIndex) {
      if (templateIndex >= Game_AIBehavior.TEMPLATES.length) {
        templateIndex = 0;
      }
      var template = Game_AIBehavior.TEMPLATES[templateIndex];
      Game_AIBehavior.PARAMS.forEach(function (p) {
        if (template[p])
          this[p] = template[p];
        else
          this[p] = 0;
      }.bind(this));
    }

    _readEnemyData(enemyId) {
      var t = $dataEnemies[enemyId];
      Game_AIBehavior.PARAMS.forEach(function (p) {
        if (t.meta[p]) {
          this[p] = parseInt(t.meta[p]);
          LOG.p("AI override Enemy param : " + p + " new value " + this[p]);
        }
      }.bind(this));
    }

    _readEventData(gameEvent) {
      var t = gameEvent.page().list;
      for (var i = 0; i < t.length; i++) {
        var item = t[i];
        if (item.code == 108) {
          var comment = item.parameters[0];
          Game_AIBehavior.PARAMS.forEach(function (p) {
            if (comment.indexOf("<" + p) >= 0) {
              var t2 = new RegExp("<" + p + "\\s?:\\s?(.+?)>", "i");
              var match = t2.exec(comment);
              if (match) {
                this[p] = parseInt(match[1]);
                LOG.p("AI override Event param : " + p + " new value " + this[p]);
              }
            }

          }.bind(this));
        }
      }
    }

    _checkParams() {
      if (this.slow == 1)
        this.slow = true;
    }

    loadAlly() {
      this._loadParamsBase(1);
      this._checkParams();
    }
  }

  AlphaABS.register(Game_AIBehavior);

  SDK.setConstant(Game_AIBehavior, 'TEMPLATES', //YOU CAN ADD YOU OWN TEMPLATE, but DON'T MODIFY EXIST ZERO TEMPLATE!!!
    [{ //Zero template
        viewRadius: 5, //Насколько клеток игровой карты видит АИ
        returnRadius: 12, //На сколько клеток может макисимум убежать от последней позиции, где сражался
        escapeOnBattle: false, //Будет ли убегать во время битвы когда нет доступных действий
        canSearch: true, //Слышит ли что происходит вокруг (реакция на битву рядом (в зоне viewRadius))
        noFight: false, //Не будет сражаться вообще
        reviveTime: 0, //Через сколько возродится (секунды)
        regen: true, //Регенерация
        slow: false, //Медленный в бою
        agressive: true, //Агрессивный (всегда догоняет)
        noMove: false, //Не может двигаться в бою
        noEmote: false, //Не показывает эмоции
        cEonStart: 0, //Common Event ID when start battle (see player)
        cEonEnd: 0, //Common Event ID when stop battle (after start)
        cEonDeath: 0, //Common Event ID when Death
        returnType: 0, //Тип возвращения (0 - быстрый, 1 - обычный, 2 - стоит на месте)
        teamId: 1, //Команда
        rage: 1 //Может агрится
      }, //END Zero template
      { //Template for Ally
        viewRadius: 5,
        returnRadius: 12,
        escapeOnBattle: false,
        canSearch: true,
        noFight: false,
        agressive: true,
        noMove: false,
        noEmote: true,
        cEonStart: 0,
        cEonEnd: 0,
        cEonDeath: 0,
        returnType: 1,
        teamId: 0,
        rage: 0
      }
    ]
  );

  SDK.setConstant(Game_AIBehavior, 'PARAMS', ['viewRadius', 'returnRadius', 'escapeOnBattle',
    'canSearch', 'noFight', 'reviveTime', 'regen', 'slow', 'agressive',
    'noMove', 'noEmote', 'cEonStart', 'cEonDeath', 'cEonEnd', 'returnType',
    'teamId', 'rage'
  ]);

  //END Game_AIBehavior
  //------------------------------------------------------------------------------

})();
//Class extension (for savefile compability)
function Game_AIBot() {
  this.initialize.apply(this, arguments);
}

(function () {

  "use strict";


  //Game_AIBot
  //------------------------------------------------------------------------------
  Game_AIBot.prototype = Object.create(Game_Event.prototype);
  Game_AIBot.prototype.constructor = Game_AIBot;
  PLATFORM.SDK.applyInterface(Game_AIBot, AlphaABS.LIBS.Interface_AIBot);
  PLATFORM.SDK.applyInterface(Game_AIBot, AlphaABS.LIBS.Interface_AIBotABS);
  PLATFORM.SDK.applyInterface(Game_AIBot, AlphaABS.LIBS.Interface_AIBotABSEvents);
  PLATFORM.SDK.applyInterface(Game_AIBot, AlphaABS.LIBS.Interface_AIBotActions);
  PLATFORM.SDK.applyInterface(Game_AIBot, AlphaABS.LIBS.Interface_AIBotABSMoving);
  AlphaABS.register(Game_AIBot);

  Game_AIBot.prototype.initialize = function (mapId, eventId, enemyId) {
    Game_Event.prototype.initialize.call(this, mapId, eventId);
    this.initializeABS();
    this._stateMachine = new AlphaABS.LIBS.AIStateMachine();
    this.LOG.p("AI inited " + $dataEnemies[enemyId].name + " at " + this.toPoint().toString());
    this.aiName = $dataEnemies[enemyId].name;
    this._absParams.enemyId = enemyId;

    //Variables
    this._absParams.allyToSearch = null; //Кого мне искать
    this._absParams.reviveTimer = null; //Таймер для возраждения
    this._absParams.regenTimer = null; //Таймер для восстановления параметров
    this._absParams.myStartPosition = this.toPoint();
    this._absParams.looted = false;
    this._absParams.activateSwitch = null; //Used if enemy not been active at start
    this._absParams.reservedCommonEvent = null;

    this._absParams.behavior.loadEnemy(this);

    //For compability with Sprite_CharacterABS
    this._absParams.viewRadius = this._absParams.behavior.viewRadius;
    this._absParams.returnRadius = this._absParams.behavior.returnRadius;

    this.setRevive(this._absParams.behavior.reviveTime);

    if (Imported.Quasi_Movement)
      this._absParams.useAStar = true;
    else
      this._absParams.useAStar = false;

    if(this.canRage())
      this._absParams.rageContainer = new AlphaABS.LIBS.RageContainer();

    this._storeMoveData();
  };

  Game_AIBot.prototype.changeReturnType = function (newReturnType) {
    this.behaviorModel().returnType = newReturnType;
    this.LOG.p("ReturnType: " + this.behaviorModel().returnType);
  };

  Game_AIBot.prototype.hasLoot = function () {
    return !this._absParams.looted;
  };
})();
// Generated by CoffeeScript 2.1.1
(function() {
  Game_AIBot.prototype.activate = function() {
    var key;
    if (!this._absParams.activateSwitch) {
      return;
    }
    if (this._absParams.active === true) {
      return;
    }
    this.LOG.p('Activate');
    key = [$gameMap.mapId(), this.eventId(), this._absParams.activateSwitch];
    $gameSelfSwitches.setValue(key, true);
    this.refresh();
    this.initABS();
  };
  Game_AIBot.prototype.initABS = function() {
    if (!this.battler()) {
      this._absParams.battler = new Game_EnemyABS(this._absParams.enemyId);
      this._absParams.battler.initABS();
      this.changeStateToFree();
    }
    if (this._checkActiveState()) {
      this._absParams.active = true;
      this._checkDieSwitch();
      if (this.battler().enemy().actions.length === 0) {
        this.LOG.p('Not actions');
        this.behaviorModel().noFight = true;
      }
    } else {
      this.LOG.p('Deactivated from start');
      this._deactivate();
    }
  };
  Game_AIBot.prototype.deactivate = function() {
    var key;
    if (!this._absParams.activateSwitch) {
      return;
    }
    if (this._absParams.active === false) {
      return;
    }
    this.LOG.p('Deactivate');
    key = [$gameMap.mapId(), this.eventId(), this._absParams.activateSwitch];
    $gameSelfSwitches.setValue(key, false);
    this.refresh();
    this._onBattleEnd();
    this.battler().stopABS();
    this._deactivate();
  };
  Game_AIBot.prototype.loot = function() {
    var gold, items;
    if (!this._absParams.looted) {
      this._absParams.looted = true;
      gold = this.battler().gold();
      if (gold > 0) {
        $gameParty.gainGold(gold);
      }
      items = this.battler().makeDropItems();
      if (items.length > 0) {
        items.forEach(function(item) {
          $gameParty.gainItem(item, 1);
        });
      }
      this.LOG.p('Looted!');
    } else {
      this.LOG.p('Already looted!');
    }
  };
  Game_AIBot.prototype._updateABS = function() {
    if (this.inActive() && !this.isErased()) {
      this.battler().updateABS();
      this._stateMachine.update(this);
    } else {
      if (this._stateMachine.inReturnState()) {
        this._stateMachine.update(this);
      }
    }
    if (this.inActive() && this.isErased()) {
      this._deactivate();
    }
  };
  Game_AIBot.prototype._updateRevive = function() {
    if (this._absParams.reviveTimer === null || this.battler().isAlive()) {
      return;
    }
    this._absParams.reviveTimer.update();
    if (this._absParams.reviveTimer.isReady()) {
      this._revive();
    }
  };
  Game_AIBot.prototype._revive = function() {
    var key, reviveAnimationId;
    if (this.isErased()) {
      this._absParams.reviveTimer = null;
      return;
    }
    this.locate(this._absParams.myStartPosition.x, this._absParams.myStartPosition.y);
    key = [$gameMap.mapId(), this.eventId(), AlphaABS.Parameters.get_EnemyDeadSwitch()];
    $gameSelfSwitches.setValue(key, false);
    this._absParams.battler = null;
    this._absParams.reviveTimer = null;
    this.refresh();
    this.initABS();
    this.setRevive(this.behaviorModel().reviveTime);
    this._absParams.active = true;
    this._absParams.looted = false;
    reviveAnimationId = AlphaABS.Parameters.get_EnemyReviveAnimationId();
    if (reviveAnimationId > 0) { //TODO:If in visible screen
      this.requestAnimationABS(reviveAnimationId);
    }
    this._absParams.myHomePosition = null;
    this.changeStateToFree();
  };
  Game_AIBot.prototype.setRevive = function(time) {
    var t;
    if (time === 0) {
      this._absParams.reviveTimer = null;
      return;
    }
    t = time * AlphaABS.SYSTEM.FRAMES_PER_SECOND;
    this.LOG.p('Set revive ' + time + ' secs.');
    if (time) {
      this._absParams.reviveTimer = new Game_TimerABS();
      this._absParams.reviveTimer.start(t);
    }
  };
  Game_AIBot.prototype._regenerateValues = function() {
    if (this.behaviorModel().regen) {
      if (!this._absParams.regenTimer) {
        _absParams.regenTimer = new Game_TimerABS();
        this._absParams.regenTimer.start(180);
      }
      this._absParams.regenTimer.update();
      if (this._absParams.regenTimer.isReady()) {
        this._absParams.regenTimer.reset();
        this.battler().regenerateAllonFree();
      }
    }
  };
  Game_AIBot.prototype.startCommonEvent = function(commonEventId) {
    var commonEvent, list;
    if (commonEventId <= 0) {
      return;
    }
    this.LOG.p('Try call outer Common Event ' + commonEventId);
    commonEvent = $dataCommonEvents[commonEventId];
    if (commonEvent) {
      list = commonEvent.list;
      if (list && list.length > 1) {
        this.LOG.p('Start outer Common Event ');
        this._absParams.reservedCommonEvent = [
          {
            code: 117,
            indent: 0,
            parameters: [commonEventId]
          }
        ];
        this._starting = true;
      }
    }
  };
})();

// Generated by CoffeeScript 2.1.1
(function() {
  Game_AIBot.prototype.onActionOnMe = function(who) {
    if (!this.inBattle() && this.canFight()) {
      this.LOG.p('I\'am attacked!!!');
      this.changeStateToBattle(who);
    }
    if (!this.isAlive() && this.inActive()) {
      if (AlphaABS.Parameters.get_AutoLootEnemiesState() === true) {
        //$gameParty.gainExp @battler().exp()
        this.loot();
      }
      this.startCommonEvent(this.behaviorModel().cEonDeath);
    }
    if (this.inBattle() && this.canFight()) {
      if (this.canRage()) {
        this._performRageCalculation(who);
      }
    }
  };
  Game_AIBot.prototype.onReturnEnd = function() {
    this._absParams.active = true;
    this._onBattleEnd();
  };
  Game_AIBot.prototype.onSwitchToFreeState = function() {
    this.LOG.p('In free state');
    this.clearTarget();
    this._restoreMoveData();
    this._moveSpeed += this.battler().ABSParams().moveSpeedUpKoef;
  };
  Game_AIBot.prototype.onSwitchToReturnState = function() {
    this._deactivate();
    this.LOG.p('Return to ' + this.getHomePosition().toString());
  };
  Game_AIBot.prototype.onSwitchToSearchState = function() {
    this._restoreMoveData();
    this.LOG.p('Curious! I\'am searching...');
    if (!this.behaviorModel().noEmote) {
      this.requestBalloon(2);
    }
  };
  Game_AIBot.prototype.onSwitchToDeadState = function() {
    this._absParams.allyToSearch = null;
    this._moveType = 0;
    this._changeEventToDeadState();
    this.refresh();
    this._deactivate();
  };
})();

// Generated by CoffeeScript 2.1.1
(function() {
  var _alias_Game_Event_updateSelfMovement;
  Game_AIBot.prototype.start = function() {
    if (this.inActive() && this !== AlphaABS.BattleManagerABS.getPlayerTarget()) {
      AlphaABS.BattleManagerABS.setPlayerTarget(this);
      this.LOG.p('Selected ' + this.event().name);
    }
    Game_Event.prototype.start.call(this);
  };
  Game_AIBot.prototype.update = function() {
    var isMoving;
    isMoving = this.isMoving();
    Game_Event.prototype.update.call(this);
    if (!this.isMoving()) {
      this._updateNonmoving(isMoving);
    }
    this._updateABS();
    this._updateRevive();
  };
  Game_AIBot.prototype._checkActiveState = function() {
    var comment, i, item, list, match, regex;
    list = this.list();
    i = 0;
    while (i < list.length) {
      item = list[i];
      comment = "";
      if (item.code === 108) {
        comment = item.parameters[0];
      }
      if (comment.indexOf('<noActive') >= 0) {
        regex = /<noActive\s?:\s?(.+?)>/;
        match = regex.exec(comment);
        if (match && SDK.checkSwitch(match[1])) {
          this._absParams.activateSwitch = match[1];
          return false;
        }
      }
      i++;
    }
    return true;
  };
  Game_AIBot.prototype._checkDieSwitch = function() {
    var key;
    key = [$gameMap.mapId(), this.eventId(), AlphaABS.Parameters.get_EnemyDeadSwitch()];
    if ($gameSelfSwitches.value(key) === true) {
      if (this.behaviorModel().reviveTime === 0) {
        this._deactivate();
      } else {
        gameSelfSwitches.setValue(key, false);
      }
    }
  };
  Game_AIBot.prototype.list = function() {
    if (this._absParams.reservedCommonEvent) {
      return this._absParams.reservedCommonEvent;
    } else {
      return Game_Event.prototype.list.call(this);
    }
  };
  _alias_Game_Event_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
  Game_AIBot.prototype.updateSelfMovement = function() {
    if (this.inBattle()) {
      if (!this._locked && this.isNearTheScreen() && this.checkStop(this.stopCountThreshold())) {
        if (this._moveType === 7) {
          this.moveTypeTowardTarget();
          return;
        }
      }
    }
    _alias_Game_Event_updateSelfMovement.call(this, arguments);
  };
  Game_AIBot.prototype.isErased = function() {
    return this._erased === true;
  };
  Game_AIBot.prototype._changeEventToDeadState = function() {
    var key;
    key = [$gameMap.mapId(), this.eventId(), AlphaABS.Parameters.get_EnemyDeadSwitch()];
    $gameSelfSwitches.setValue(key, true);
    this._originalDirection = -1;
    return this._originalPattern = -1;
  };
})();

// Generated by CoffeeScript 2.1.1
(function() {
  Game_AIBot.prototype._storeMoveData = function() {
    this._absParams.moveData = {};
    this._absParams.moveData.moveSpeed = this._moveSpeed;
    this._absParams.moveData.moveType = this._moveType;
    this._absParams.moveData.moveFrequency = this._moveFrequency;
  };
  Game_AIBot.prototype._resetMoveData = function() {
    this._moveSpeed = this._absParams.moveData.moveSpeed;
    this.stay();
  };
  Game_AIBot.prototype.stay = function() {
    this._moveType = 0;
    try {
      return this._moveFrequency = this._absParams.moveData.moveFrequency;
    } catch (error) {

    }
  };
  Game_AIBot.prototype.returnSlow = function() {
    if (!this.isMoving()) {
      return this._performReturnToHome();
    }
  };
  Game_AIBot.prototype._performReturnToHome = function() {
    var direction, home;
    home = this.getHomePosition();
    direction = this.findDirectionTo(home.x, home.y);
    if (direction > 0) {
      this.moveStraight(direction);
    } else {
      this.LOG.p('AI : I\'am return to Home!');
      this._absParams.myHomePosition = null;
      this.onReturnEnd();
      this._restoreMoveData();
    }
  };
  Game_AIBot.prototype._restoreMoveData = function() {
    this._moveSpeed = this._absParams.moveData.moveSpeed;
    this._moveType = this._absParams.moveData.moveType;
    this._moveFrequency = this._absParams.moveData.moveFrequency;
  };
  Game_AIBot.prototype.returnFast = function() {
    return this._performReturnToHome();
  };
  Game_AIBot.prototype._applyAproachSpeed = function() {
    if (this.behaviorModel().slow !== true) {
      this._moveFrequency = this._absParams.moveData.moveFrequency + 2;
    }
  };
  Game_AIBot.prototype._updateNonmoving = function(wasMoving) {
    if (!$gameMap.isEventRunning()) {
      if (wasMoving && !this.isMoveRouteForcing()) {
        this.battler().onWalk();
      }
    }
  };
  Game_AIBot.prototype.startPursuitTarget = function() {
    this._applyAproachSpeed();
    return this._moveType = 7;
  };
  Game_AIBot.prototype.moveTypeTowardTarget = function() {
    var target;
    target = this.target();
    if (target != null) {
      if (!this.isNearThePointX(target)) {
        return this.moveToPoint(target);
      }
    }
  };
  Game_AIBot.prototype.moveToAlly = function() {
    if (!this.isMoving() && !this._absParams.behavior.noMove) {
      if (this._absParams.allyToSearch != null) {
        return this.moveToPoint(this._absParams.allyToSearch);
      } else {
        return this.changeStateToFree();
      }
    }
  };
  Game_AIBot.prototype.turnTowardCharacter = function(character) {
    try {
      return Game_Character.prototype.turnTowardCharacter.call(this, character);
    } catch (error) {

    }
  };
})();

(function () {
  "use strict";

  var LOG = new PLATFORM.DevLog("BattleProcessABS");
  LOG.applyPresetLib();

  var PointX = AlphaABS.UTILS.PointX;
  var ABSUtils = AlphaABS.UTILS;

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
      var t = new AlphaABS.LIBS.Game_SVector(postProcess);
      this._postProcesses.push(t);
      $gameMap.addSVector(t);
      if (subject == $gamePlayer) {
        if (!$gamePlayer.inBattle())
          $gamePlayer.onBattleStart();
      }
    }

    performPostBattleAction(sVector) {
      try {
        var t = sVector.data();
        if (t.skill.isVectorTypeR()) {
          LOG.p("Battle : Start Radius Action by Vector");
          this._centerPoint = t.target;
          this._processAction(t.subject, null, t.action);
        } else
          this._processAction(t.subject, t.target, t.action);
      } catch (e) {
        console.error(e);
      } finally {
        this._postProcesses.delete(sVector);
      }
    }

    isPostProcessExists() {
      return (this._postProcesses.length != 0);
    }

    //PRIVATE
    _processAction(subject, target, action) {
      if (subject == null) {
        return;
      }
      if (!subject.battler()) {
        return;
      }
      if (action) {
        action.prepare(); //???
        if (action.isValid()) {
          this._start_action(subject, target, action);
          this._end_action(subject);
        }
      }
    }

    _start_action(subject, target, action) {
      //subject.requestEffect('whiten'); TODO
      try {
        this._skill = subject.battler().skillABS_byAction(action);
        action.applyGlobal();
        var targets = this._makeTargets(subject, target);
        this._showAnimation(subject, targets, action);
        targets.forEach(function (item) {
          if (item && item.inActive()) {
            this._invokeAction(subject, item, action);
          }
        }.bind(this));
      } catch (e) {
        console.error(e);
      }
    }

    _end_action(subject) {
      if (subject && subject.battler()) {
        subject.battler().performActionEnd(); //???
        subject.battler().onAllActionsEnd();
      }
      this._skill = null;
      this._centerPoint = null;
    }

    _invokeAction(subject, target, action) {
      this._invokeNormalAction(subject, target, action);
    }

    _invokeNormalAction(subject, target, action) {
      //var realTarget = this.applySubstitute(target);
      try {
        action.apply(target.battler());
        var _skill = subject.battler().skillABS_byAction(action);
        if (_skill && _skill.cEonUse > 0) {
          if (target instanceof Game_AIBot) {
            target.startCommonEvent(_skill.cEonUse);
          }
        }
        this._onActionResult(subject, target);
      } catch (e) {
        console.error(e);
      }
    }

    _makeTargets(subject, target) {
      try {
        var targets = [];
        if (this._skill.isZoneType()) {
          var zone = this._generateZone(subject);
          var points = zone.points;
          this._centerPoint = zone.center;
          var candidates = [];
          if (subject == $gamePlayer) {
            candidates = $gameTroop.membersABS();
          } else {
            candidates = [$gamePlayer];
          }
          for (var i = 0; i < points.length; i++) {
            candidates.forEach(function (item) {
              if (ABSUtils.inPoint(item, points[i])) {
                targets.push(item);
              }
            });
          }
          return targets;
        } else
        if (this._skill.isRadiusType() || this._skill.isVectorTypeR()) {
          if (subject == $gamePlayer) {
            targets = ABSUtils.inRadius(this._centerPoint, this._skill.radius, $gameTroop.membersABS());
          } else {
            targets = ABSUtils.inRadius(this._centerPoint, this._skill.radius, [$gamePlayer]);
          }
        } else {
          targets.push(target);
        }

        return targets;
      } catch (e) {
        console.error(e);
        return [];
      }
    }

    _showAnimation(subject, targets, action) {
      try {
        if (action.isSkill() && action.item().id == subject.battler().attackSkillId()) {
          this._requestAnimation(targets, subject.battler().attackAnimationId1());
        } else {
          var animId = action.item().animationId;
          if (this._skill.isZoneType() || this._skill.isRadiusType() || this._skill.isVectorTypeR()) {
            this._requestMapAnimation(animId);
          } else {
            this._requestAnimation(targets, animId);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    _requestAnimation(objects, animationId) {
      objects.forEach(function (item) {
        if (item)
          item.requestAnimationABS(animationId);
      });
    }

    _requestMapAnimation(animationId) {
      try {
        var sprite = new Sprite_Base();
        sprite.anchor.x = -0.5;
        sprite.anchor.y = -0.5;
        var point = this._centerPoint.mapPointOnScreen();
        sprite.x = point.x;
        sprite.y = point.y;
        LOG.p("Request Map animation on " + point);

        $gameMap.requestAnimationABS({
          sprite: sprite,
          id: animationId
        });
      } catch (e) {
        console.error(e);
      }
    }

    _onActionResult(subject, target) {
      try {
        if (target.battler().result().used) {
          this._resultOnDamage(target.battler());
          target.battler().startDamagePopup();
          subject.battler().startDamagePopup();
          target.onActionOnMe(subject);
        }
      } catch (e) {
        console.error(e);
      }
    }

    _resultOnDamage(target) {
      try {
        if (target.result().missed) {
          if (target.result().physical) {
            target.performMiss();
          } else {
            this._resultOnFailure(target);
          }

        } else if (target.result().evaded) {
          if (target.result().physical) {
            target.performEvasion();
          } else {
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
      } catch (e) {
        console.error(e);
      }
    }

    _resultOnFailure(target) {
      //Empty
    }

    _resultOnAffectedStatus(target) {
      try {
        var states = target.result().addedStateObjects();
        states.forEach(function (state) {
          var state_msg = target.isActor() ? state.message1 : state.message2;
        }.bind(this));
      } catch (e) {
        console.error(e);
      }
    }

    _generateZone(subject) {
      try {
        var d = ABSUtils.getDirKey(subject);
        var points = [];
        var point = subject.toPoint();

        /*
            **
        SUBJECT ***
            **
        */

        var centerPoint = null;

        switch (d) {
          case 'r':
            centerPoint = new PointX(point.x + 2, point.y);
            points.push(new PointX(point.x + 1, point.y + 1));
            points.push(new PointX(point.x + 1, point.y - 1));
            break;
          case 'l':
            centerPoint = new PointX(point.x - 2, point.y);
            points.push(new PointX(point.x - 1, point.y + 1));
            points.push(new PointX(point.x - 1, point.y - 1));
            break;
          case 'u':
            centerPoint = new PointX(point.x, point.y - 2);
            points.push(new PointX(point.x + 1, point.y - 1));
            points.push(new PointX(point.x - 1, point.y - 1));
            break;
          default: //d
            centerPoint = new PointX(point.x, point.y + 2);
            points.push(new PointX(point.x + 1, point.y + 1));
            points.push(new PointX(point.x - 1, point.y + 1));
            break;
        }

        points.push(centerPoint);
        points.push(new PointX(centerPoint.x - 1, centerPoint.y));
        points.push(new PointX(centerPoint.x + 1, centerPoint.y));
        points.push(new PointX(centerPoint.x, centerPoint.y - 1));
        points.push(new PointX(centerPoint.x, centerPoint.y + 1));

        /*
         *
         * CenterPoint *
         *
         */

        return {
          center: centerPoint,
          points: points
        };
      } catch (e) {
        console.error(e);
        return {
          center: AlphaABS.UTILS.PointX.Empty,
          points: []
        };
      }
    }
  }

  AlphaABS.register(Game_BattleProcessABS);
  AlphaABS.BattleManagerABS.connectProcess();

  //END BattleProcessABS
  //------------------------------------------------------------------------------



})();
(function () {

  var PopInfoManagerABS;
  var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;

  var _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function () {
    _Game_Battler_initMembers.call(this);
    PopInfoManagerABS = AlphaABS.LIBS.PopInfoManagerABS;
    this._initBattleSkills();
  };

  var _GameBattler_attackSpeed = Game_Battler.prototype.attackSpeed;
  Game_Battler.prototype.attackSpeed = function () {
    var attackSpeed = _GameBattler_attackSpeed.call(this);
    if (attackSpeed == 0) {
      return 120;
    } else
      return attackSpeed;
  };

  //NEW
  Game_Battler.prototype.initABS = function () {
    this.appear();
    if (!this.isPreserveTp()) {
      this.initTp();
    }
    this._absParams.battleSkillsABS.all().forEach(function (item) {
      this._prepareABSSkill(item);
    }.bind(this));
  };

  //NEW
  Game_Battler.prototype.onGameLoad = function () {
    //EMPTY
  };

  //NEW
  Game_Battler.prototype.updateABS = function () {
    this._absParams.battleSkillsABS.update();
    this.updateStateTurns();
    this.updateBuffTurns();
    this.removeStatesAuto(2);
    this.removeBuffsAuto();
  };

  //OVER
  Game_Battler.prototype.onTurnEnd = function () {
    this.regenerateAll();
  };

  var pkd_GameBattler_regenerateAll = Game_Battler.prototype.regenerateAll;
  Game_Battler.prototype.regenerateAll = function () {
    this.clearResult();
    pkd_GameBattler_regenerateAll.call(this);
    if (this.isAlive())
      PopInfoManagerABS.makeDamagePopUp(this);
  };

  //OVER
  Game_Battler.prototype.onAllActionsEnd = function () {
    this.clearResult();
    this.removeStatesAuto(1);
  };

  //OVER
  Game_Battler.prototype.onBattleEnd = function () {
    this.onAllActionsEnd();
    this.clearActions();
    if (!this.isPreserveTp()) {
      this.clearTp();
    }
  };

  //OVER
  Game_Battler.prototype.resetStateCounts = function (stateId) {
    var state = $dataStates[stateId];
    var variance = 0;
    if (state.autoRemovalTiming != 1) {
      //For now, turns calcs in a seconds
      variance += Math.max(state.maxTurns - state.minTurns, 0);
      this._stateTurns[stateId] = (state.minTurns + Math.randomInt(1 + variance)) * BattleManagerABS.TURN;
    } else {
      this._stateTurns[stateId] = 1; //TODO: After Action
    }
  };

  //OVER
  Game_Battler.prototype.overwriteBuffTurns = function (paramId, turns) {
    var t = turns * BattleManagerABS.TURN;
    if (this._buffTurns[paramId] < t) {
      this._buffTurns[paramId] = t;
    }
  };

  //NEW
  Game_Battler.prototype.stopABS = function () {
    this.onBattleEnd();
    this.removeBattleStates();
    this.removeAllBuffs();
  };

  //NEW
  Game_Battler.prototype.skillABS_byId = function (skillId, isItem) {
    isItem = SDK.check(isItem, false);
    if (isItem) {
      return this._absParams.battleSkillsABS.itemById(skillId);
    } else {
      return this._absParams.battleSkillsABS.skillById(skillId);
    }
  };

  //NEW
  Game_Battler.prototype.skillABS_byAction = function (action) {
    if (action.item())
      return this.skillABS_byId(action.item().id, action.isItem());
    else
      return null;
  };

  //NEW
  Game_Battler.prototype.skillABS_attack = function () {
    return this.skillABS_byId(this.attackSkillId(), false);
  };

  Game_Battler.prototype.performCurrentAction = function () {
    var action = this.action(0);
    var skill = this.skillABS_byAction(action);
    if (skill.isNeedReloadParam()) {
      skill.preUse(this._calculateABSSkillReloadParam(skill.reloadParam));
    }
    this.useItem(action.item());
    skill.onUse();
    if (skill.skillId != this.attackSkillId() && !skill.isNeedCast()) {
      //Атака не вызывает postUse
      //Навык, который необходимо кастовать, тоже не вызывает postUse
      this._absParams.battleSkillsABS.all().forEach(function (skill) {
        skill.postUse();
      });
    }

    this.removeStatesAuto(1);
    this.removeBuffsAuto();
  };

  Game_Battler.prototype._calculateABSSkillReloadParam = function (reloadParam) {
    var reloadVar = 10;
    try {
      /* jshint -W061 */
      reloadVar = Math.round(parseInt(eval(reloadParam)));
    } catch (err) {
      LOGW.p("Can't calculate <reloadParam> " + err);
      reloadVar = 10;
    }
    return reloadVar;
  };

  var _Game_Battler_onDamage = Game_Battler.prototype.onDamage;
  Game_Battler.prototype.onDamage = function (value) {
    _Game_Battler_onDamage.call(this, value);
    this._absParams.battleSkillsABS.all().forEach(function (s) {
      if (s.isCasting()) {
        s.onCastDelay(30); //TODO:: Подучать как лучше (в %), сколько урон от макс.HP в процентах, столько и в процентах от castMaxTime (начиная с порога)
      }
    });
  };

  //NEW
  Game_Battler.prototype._prepareABSSkill = function (absSkill) {
    //EMPTY
  };

  //OVER
  Game_Battler.prototype.onBattleStart = function () {
    //EMPTY
  };

  //OVER
  Game_Battler.prototype.addNewState = function (stateId) {
    Game_BattlerBase.prototype.addNewState.call(this, stateId);
    if (this._states.include(stateId))
      PopInfoManagerABS.makeStatePopUp(this, stateId, false);
  };

  var pkd_GameBattler_addBuff = Game_Battler.prototype.addBuff;
  Game_Battler.prototype.addBuff = function (paramId, turns) {
    PopInfoManagerABS.makeBuffPopUp(this, paramId, true);
    pkd_GameBattler_addBuff.call(this, paramId, turns);
  };

  var pkd_GameBattler_addDebuff = Game_Battler.prototype.addDebuff;
  Game_Battler.prototype.addDebuff = function (paramId, turns) {
    PopInfoManagerABS.makeBuffPopUp(this, paramId, false);
    pkd_GameBattler_addDebuff.call(this, paramId, turns);
  };

  Game_Battler.prototype._initBattleSkills = function () {
    this._absParams.battleSkillsABS = new Game_SkillManagerABS();
  };
})();
(function(){

  var PopInfoManagerABS = AlphaABS.LIBS.PopInfoManagerABS;
  var LOG = new PLATFORM.DevLog("Game_BattlerBase");

  //Game_BattlerBase
  //------------------------------------------------------------------------------
    var pkd_GameBattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
    Game_BattlerBase.prototype.initMembers = function() {
      pkd_GameBattlerBase_initMembers.call(this);
      this._absParams = {};
      this._absParams.popups = [];
      this._absParams.moveSpeedUpKoef = 0;
    }

    var pkd_GameBattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
    Game_BattlerBase.prototype.eraseState = function(stateId) {
      if(this._states.include(stateId)) {
        PopInfoManagerABS.makeStatePopUp(this, stateId, true);
        this.onSpeedUpState(stateId, false);
        this.onMotionState(stateId, false);
      }
      pkd_GameBattlerBase_eraseState.call(this, stateId);
    }

    var pkd_GameBattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
    Game_BattlerBase.prototype.addNewState = function(stateId) {
      var state = $dataStates[stateId];
      if(state.restriction == 0 || state.restriction == 4) {
        pkd_GameBattlerBase_addNewState.call(this, stateId);
        this.onSpeedUpState(stateId, true);
        this.onMotionState(stateId, true);
      } else {
        LOGW.p("State " + state.name + " not supported in Alpha ABS");
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

})();

(function () {
    var _Game_Character_initMembers = Game_Character.prototype.initMembers;
    Game_Character.prototype.initMembers = function () {
        _Game_Character_initMembers.call(this);
        this._absParams = {};
        this._absParams.animationABS = 0;
        this._absParams.useAStar = false;
    };

    //NEW
    Game_Character.prototype.ABSParams = function () {
        return this._absParams;
    };

    //NEW
    Game_Character.prototype.requestAnimationABS = function (animationId) {
        this._absParams.animationABS = animationId;
    };

    //NEW
    Game_Character.prototype.moveToPoint = function (point) {
        var dir = this.findDirectionTo(point.x, point.y);
        if (dir > 0) {
            this.moveStraight(dir);
        }
    };

    //NEW
    Game_Character.prototype.moveFromPoint = function (point) {
        var points = [];
        for (var j = 0; j < 4; j++) {
            var direction = 2 + j * 2;
            if (this.canPass(this.x, this.y, direction)) {
                var x2 = $gameMap.roundXWithDirection(this.x, direction);
                var y2 = $gameMap.roundYWithDirection(this.y, direction);
                //if(x2 != point.x && y2 != point.y)
                points.push([x2, y2]);
            }
        }

        if (points.length > 0) {
            //LOG.p("POINTS " + points.length);
            var p;
            if (points.length > 1)
                p = points.sample();
            else
                p = points[0];
            var newPoint = {
                x: p[0],
                y: p[1]
            };
            this.moveToPoint(newPoint);
        }
    };

    var _Game_Character_findDirectionTo = Game_Character.prototype.findDirectionTo;
    Game_Character.prototype.findDirectionTo = function (goalX, goalY) {
        if (this._absParams.useAStar == false) {
            return _Game_Character_findDirectionTo.call(this, goalX, goalY);
        } else {
            var t = AlphaABS.LIBS.ABSPathfinding.findPath(this, goalX, goalY);
            if (t == 0) t = _Game_Character_findDirectionTo.call(this, goalX, goalY);
            return t;
        }
    };
})();
function Game_EnemyABS() {
    this.initialize.apply(this, arguments);
}
(function () {
    //Game_EnemyABS
    //------------------------------------------------------------------------------
    Game_EnemyABS.prototype = Object.create(Game_Enemy.prototype);
    Game_EnemyABS.prototype.constructor = Game_EnemyABS;

    //OVER
    Game_EnemyABS.prototype.initialize = function (enemyId) {
        Game_Enemy.prototype.initialize.call(this, enemyId, 0, 0);
    };

    //OVER
    Game_EnemyABS.prototype.initMembers = function () {
        Game_Enemy.prototype.initMembers.call(this);
        this._absParams.myTurnCount = 0; //Количество секунд, проведённых в сессии боя
        this._absParams.rageContainer = null;
    };

    //NEW
    Game_EnemyABS.prototype.regenerateAllonFree = function () {
        if (this.isAlive()) {
            var value = Math.floor(this.mhp * 0.05);
            value = Math.max(value, -this.maxSlipDamage());
            if (value !== 0) {
                this.gainHp(value);
            }
            value = Math.floor(this.mmp * 0.05);
            if (value !== 0) {
                this.gainMp(value);
            }
        }
    };

    //OVER
    Game_EnemyABS.prototype.isActionValid = function (action) {
        var t = this.skillABS_byId(action.skillId);
        return Game_Enemy.prototype.isActionValid.call(this, action) && t.isReady();
    };

    //OVER
    Game_EnemyABS.prototype.meetsTurnCondition = function (param1, param2) {
        var n = this._absParams.myTurnCount;
        if (param2 === 0) {
            return n === param1;
        } else {
            return n > 0 && n >= param1 && n % param2 === param1 % param2;
        }
    };

    Game_EnemyABS.prototype.clearStates = function () {
        Game_Enemy.prototype.clearStates.call(this);
        this._stateSteps = {};
    };

    Game_EnemyABS.prototype.eraseState = function (stateId) {
        Game_Enemy.prototype.eraseState.call(this, stateId);
        delete this._stateSteps[stateId];
    };

    Game_EnemyABS.prototype.resetStateCounts = function (stateId) {
        Game_Enemy.prototype.resetStateCounts.call(this, stateId);
        this._stateSteps[stateId] = $dataStates[stateId].stepsToRemove;
    };

    Game_EnemyABS.prototype.initABS = function () {
        Game_Enemy.prototype.initABS.call(this);
        if (this._absParams.battleSkillsABS.all().length == 0)
            this._createBattleSkills();
    }

    //NEW (вынести на бота)
    Game_EnemyABS.prototype.onWalk = function () {
        this.clearResult();
        this.states().forEach(function (state) {
            this.updateStateSteps(state);
        }, this);
    }

    //NEW
    Game_EnemyABS.prototype.executeFloorDamage = function () {
        var damage = Math.floor(this.basicFloorDamage() * this.fdr);
        damage = Math.min(damage, this.maxFloorDamage());
        this.gainHp(-damage);
        if (damage > 0) {
            this.startDamagePopup();
        }
    };

    //NEW
    Game_EnemyABS.prototype.updateStateSteps = function (state) {
        if (state.removeByWalking) {
            if (this._stateSteps[state.id] > 0) {
                if (--this._stateSteps[state.id] === 0) {
                    this.removeState(state.id);
                }
            }
        }
    };

    //NEW
    Game_EnemyABS.prototype.onTurnEnd = function () {
        Game_Enemy.prototype.onTurnEnd.call(this);
        this._absParams.myTurnCount += 1;
    }

    //NEW
    Game_EnemyABS.prototype.attackAnimationId1 = function () {
        return 6;
    };

    Game_EnemyABS.prototype.onBattleEnd = function () {
        Game_Enemy.prototype.onBattleEnd.call(this);
        this._absParams.myTurnCount = 0;
        this.removeBattleStates();
        this.removeAllBuffs();
        this.recoverAll();
    };

    Game_EnemyABS.prototype.onDamage = function (value) {
        Game_Enemy.prototype.onDamage.call(this, value);
        if (this._absParams.rageContainer) {

        }
    };

    //PRIVATE
    Game_EnemyABS.prototype._initBattleSkills = function () {
        Game_Enemy.prototype._initBattleSkills.call(this);
    };

    Game_EnemyABS.prototype._createBattleSkills = function () {
        $dataEnemies[this._enemyId].actions.forEach(function (t) {
            var skill = $dataSkills[t.skillId];
            if (skill.meta.ABS && skill.meta.ABS <= 2) //Can't use radius and zones skills
                this._absParams.battleSkillsABS.push(t.skillId, false);
        }.bind(this));
    };
    //END Game_EnemyABS
    //------------------------------------------------------------------------------

})();
// Generated by CoffeeScript 2.1.1
(function() {
  Game_Followers.prototype.initializeABS = function() {
    var i, results;
    this._data = [];
    i = 1;
    results = [];
    while (i < $gameParty.maxBattleMembers()) {
      this._data.push(new Game_AI2Bot(i));
      results.push(i++);
    }
    return results;
  };
})();

(function () {
  //Game_Interpreter
  //------------------------------------------------------------------------------
  //OVER
  Game_Interpreter.prototype.character = function (param) {
    if (param < 0) {
      return $gamePlayer;
    } else if (this.isOnCurrentMap()) {
      return $gameMap.event(param > 0 ? param : this._eventId);
    } else {
      return null;
    }
  };

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'ABS') {
      switch (args[0]) {
        case 'revive':
          var revive = 5;
          if (args[1])
            revive = parseInt(args[1]);
          if (args[2]) {
            var x = $gameMap.events().filter(function (ev) {
              return (ev.event().name == args[2]);
            });
            if (x.length > 0) {
              x.first().setRevive(revive);
            }
          } else
            this.character(this._eventId).setRevive(revive);
          break;
        case 'loot':
          this.character(this._eventId).loot();
          break;
        case 'showUI':
          AlphaABS.BattleUI.showUI();
          break;
        case 'hideUI':
          AlphaABS.BattleUI.hideUI();
          break;
        case 'activate':
          this._activateABSEnemy(args[1] || null);
          break;
        case 'deactivate':
          this._deactivateABSEnemy(args[1] || null);
          break;
        case 'param':
          this._onABSEnemyParam(args[1] || null, args[2] || null, args[3] || null);
          break;
      }
    }
  };

  //NEW
  Game_Interpreter.prototype._activateABSEnemy = function (name) {
    var enemy = this._getAbsAI(name);
    if (enemy)
      enemy.activate();
  };

  //NEW
  Game_Interpreter.prototype._getAbsAI = function (name) {
    if (name == null) {
      try {
        name = $dataMap.events[this.eventId()].name;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
    if (name) {
      var x = $gameMap.events().filter(function (ev) {
        return (ev.event().name == name);
      });
      if (x.length > 0) {
        return x.first();
      }
    }
    return null;
  };

  //NEW
  Game_Interpreter.prototype._deactivateABSEnemy = function (name) {
    var enemy = this._getAbsAI(name);
    if (enemy)
      enemy.deactivate();
  };

  //NEW
  Game_Interpreter.prototype._onABSEnemyParam = function (paramName, paramValue, aiEventName) {
     if (!paramName) return;
     if (!paramValue) {
       paramValue = 0;
     }
     var event = this._getAbsAI(aiEventName);
     if (event == null) {
       event = $dataMap.events[this.eventId()];
     }
     if(event instanceof Game_AIBot) {
       var index = AlphaABS.LIBS.Game_AIBehavior.PARAMS.indexOf(paramName);
       if(index >= 0) {
         event.behaviorModel()[paramName] = paramValue;
         event.LOG.p("New value " + paramValue + " of " + paramName);
         if(event.inBattle())
            event.refreshBehavior();
       }
     }
  };

  // Change Party Member

  var _Game_Interpreter_command129 = Game_Interpreter.prototype.command129;
  Game_Interpreter.prototype.command129 = function () {
    if ($gameMap.isABS()) {
      if (_Game_Interpreter_command129.call(this)) {
        AlphaABS.BattleManagerABS.updateABSSession();
        return true;
      }
    }
    return _Game_Interpreter_command129.call(this);
  };

  // Transfer Player
  var _Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
  Game_Interpreter.prototype.command201 = function () {
    if (AlphaABS.Parameters.get_AllowTransferState() == true) {
      $gamePlayer.stopABS();
      return _Game_Interpreter_command201.call(this);
    } else {
      if ($gameParty.inBattle()) {
        AlphaABS.BattleManagerABS.alertNoInBattle();
        AlphaABS.BattleManagerABS.warning(1);
        return true;
      } else {
        return _Game_Interpreter_command201.call(this);
      }
    }
  };

  // Scroll Map
  var _Game_Interpreter_command204 = Game_Interpreter.prototype.command204;
  Game_Interpreter.prototype.command204 = function () {
    if ($gameParty.inBattle()) {
      AlphaABS.BattleManagerABS.alertNoInBattle();
      AlphaABS.BattleManagerABS.warning(1);
      return true;
    }
    return _Game_Interpreter_command204.call(this);
  };

  // Getting On and Off Vehicles
  var _Game_Interpreter_command206 = Game_Interpreter.prototype.command206;
  Game_Interpreter.prototype.command206 = function () {
    if ($gameMap.isABS()) {
      AlphaABS.BattleManagerABS.warning(0);
      return true;
    } else
      return _Game_Interpreter_command206.call(this);
  }

  // Change Player Followers
  var _Game_Interpreter_command216 = Game_Interpreter.prototype.command216;
  Game_Interpreter.prototype.command216 = function () {
    if ($gameMap.isABS()) {
      AlphaABS.BattleManagerABS.warning(0);
      return true;
    }
    return _Game_Interpreter_command216.call(this);
  };

  // Gather Followers
  var _Game_Interpreter_command217 = Game_Interpreter.prototype.command217;
  Game_Interpreter.prototype.command217 = function () {
    if ($gameMap.isABS()) {
      AlphaABS.BattleManagerABS.warning(0);
      return true;
    }
    return _Game_Interpreter_command217.call(this);
  };

  // Set Weather Effect
  //OVER
  Game_Interpreter.prototype.command236 = function () {
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
  Game_Interpreter.prototype.command301 = function () {
    //EMPTY
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  }

  // Shop Processing
  var _Game_Interpreter_command302 = Game_Interpreter.prototype.command302;
  Game_Interpreter.prototype.command302 = function () {
    if ($gameParty.inBattle()) {
      AlphaABS.BattleManagerABS.alertNoInBattle();
      AlphaABS.BattleManagerABS.warning(1);
      return true;
    } else
      return _Game_Interpreter_command302.call(this);
  };

  // Name Input Processing
  var _Game_Interpreter_command303 = Game_Interpreter.prototype.command303;
  Game_Interpreter.prototype.command303 = function () {
    if ($gameParty.inBattle()) {
      AlphaABS.BattleManagerABS.alertNoInBattle();
      AlphaABS.BattleManagerABS.warning(1);
      return true;
    } else
      return _Game_Interpreter_command303.call(this);
  };

  // Change Class
  var _Game_Interpreter_command321 = Game_Interpreter.prototype.command321;
  Game_Interpreter.prototype.command321 = function () {
    if ($gameMap.isABS()) {
      AlphaABS.BattleManagerABS.warning(321);
      return true;
    } else
      return _Game_Interpreter_command321.call(this);
  }

  // Change Actor Images
  var _Game_Interpreter_command322 = Game_Interpreter.prototype.command322;
  Game_Interpreter.prototype.command322 = function () {
    if ($gameMap.isABS()) {
      _Game_Interpreter_command322.call(this);
      AlphaABS.BattleUI.refreshPlayerFace();
      return true;
    } else
      return _Game_Interpreter_command322.call(this);
  }

  Game_Interpreter.prototype.command331 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  }

  Game_Interpreter.prototype.command332 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  }

  Game_Interpreter.prototype.command333 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  }

  Game_Interpreter.prototype.command334 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  }

  Game_Interpreter.prototype.command335 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  }

  Game_Interpreter.prototype.command336 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  }

  Game_Interpreter.prototype.command337 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  Game_Interpreter.prototype.command338 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  Game_Interpreter.prototype.command339 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  Game_Interpreter.prototype.command340 = function () {
    AlphaABS.BattleManagerABS.warning(2);
    return true;
  };

  // Open Menu Screen
  var _Game_Interpreter_command351 = Game_Interpreter.prototype.command351;
  Game_Interpreter.prototype.command351 = function () {
    if ($gameParty.inBattle()) {
      AlphaABS.BattleManagerABS.alertNoInBattle();
      AlphaABS.BattleManagerABS.warning(1);
      return true;
    } else
      return _Game_Interpreter_command351.call(this);
  };

  // Open Save Screen
  var _Game_Interpreter_command352 = Game_Interpreter.prototype.command352;
  Game_Interpreter.prototype.command352 = function () {
    if ($gameParty.inBattle()) {
      AlphaABS.BattleManagerABS.alertNoInBattle();
      AlphaABS.BattleManagerABS.warning(1);
      return true;
    } else
      return _Game_Interpreter_command352.call(this);
  };

  //END Game_Interpreter
  //------------------------------------------------------------------------------

})();
(function () {
  var LOG = new PLATFORM.DevLog("Game_Map");
  //Game_Map
  //------------------------------------------------------------------------------
  var _Game_Map_setupEvents = Game_Map.prototype.setupEvents;
  Game_Map.prototype.setupEvents = function () {
    _Game_Map_setupEvents.call(this);
    this._isABSMap = false;
    if (!$dataMap.meta) return;
    if ($dataMap.meta.ABS) {
      this._isABSMap = true;
      this._absParams = {};
      this._absParams.sVectors = [];
      this._absParams.animationABS = null;
      this._absParams.targetCircle = null;
      this._absParams.targetCircleNeedLock = false;
      this._absParams.needCast = null;
      this._absParams.menuClickCount = 1;
      this.setupEventsABS();
    }
  };

  //NEW
  Game_Map.prototype.ABSParams = function () {
    return this._absParams;
  };

  //NEW
  Game_Map.prototype.isABS = function () {
    return this._isABSMap;
  };

  //NEW
  Game_Map.prototype.stopABS = function () {
    this._isABSMap = false;
  };

  //NEW
  Game_Map.prototype.characterABS = function (battler) {
    //TODO:Возвращает Game_AIBot по battler
  };

  //NEW
  Game_Map.prototype.addSVector = function (item) {
    this._absParams.sVectors.push(item);
  };

  //NEW
  Game_Map.prototype.requestCast = function (who) {
    LOG.p("Map : Cast requested");
    this._absParams.needCast = who;
  };

  //NEW
  Game_Map.prototype.requestAnimationABS = function (animationData) { //{sprite, id}
    LOG.p("Map : Animation requested");
    this._absParams.animationABS = animationData;
  };

  //NEW
  Game_Map.prototype.requestPlayerTargetCircle = function (skill) {
    LOG.p("Map : Target Circle requested");
    this._absParams.menuClickCount = 0;
    this._absParams.targetCircle = skill;
  };

  //NEW
  Game_Map.prototype.lockPlayerTargetCircle = function () {
    LOG.p("Map : Target Circle locked");
    this._absParams.targetCircleNeedLock = true;
  };

  //NEW
  Game_Map.prototype.stopPlayerTargetCircle = function () {
    LOG.p("Map : Target Circle stop!");
    this._absParams.targetCircle = null;
    this._absParams.targetCircleNeedLock = false;
  };

  //NEW
  Game_Map.prototype.setupEventsABS = function () {
    LOG.p("setupEventsABS");
    for (var i = 0; i < this._events.length; i++) {
      if (!this._events[i]) continue;
      var ev = this._events[i].event();
      if (ev.meta.ABS) {
        var enemyId = parseInt(ev.meta.ABS);
        if (enemyId > 0) {
          this._events[i] = new Game_AIBot(this._mapId, i, enemyId);
        }
      }
    }

    $gamePlayer.followers().initializeABS();
  };

  //END Game_Map
  //------------------------------------------------------------------------------
})();
(function () {
  var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;
  //Game_Party
  //------------------------------------------------------------------------------
  //NEW
  Game_Party.prototype.initABS = function () {
    this.members().forEach(function (member) {
      member.initABS();
    });
    this._inBattle = false;
    this._noNotifyABS = false;
  };

  Game_Party.prototype.membersABS = function () {
    if (this._membersABS == undefined) {
      this._membersABS = [];
      var bots = $gamePlayer.followers();
      bots.forEach(function (item) {
        if (item instanceof Game_AI2Bot) {
          if(item.battler() != null)
            this._membersABS.push(item);
        }
      }, this);
    }
    return this._membersABS;
  };

  Game_Party.prototype.stopABS = function () {
    this.selectOnMap(null);
    this.membersABS().forEach(function (e) { e.stopABS(); });
    this._membersABS = [];
  };

  Game_Party.prototype.selectOnMap = function (who) {
    this.membersABS().forEach(function (e) { e.selectOnMap(false); });
    if (who) who.selectOnMap(true);
  };


  var _Game_Party_gainGold = Game_Party.prototype.gainGold;
  Game_Party.prototype.gainGold = function (amount) {
    _Game_Party_gainGold.call(this, amount);
    if ($gameMap.isABS()) {
      if (amount > 0) {
        AudioManager.playSe({
          name: 'Coin',
          pan: 0,
          pitch: 100,
          volume: 90
        });
        AlphaABS.BattleUI.pushGoldOnPanel(amount);
      }
    }
  };

  var _Game_Party_gainItem = Game_Party.prototype.gainItem;
  Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
    _Game_Party_gainItem.call(this, item, amount, includeEquip);
    if ($gameMap.isABS()) {
      if (amount > 0 && !this._noNotifyABS) {
        AudioManager.playSe({
          name: 'Equip2',
          pan: 0,
          pitch: 140,
          volume: 90
        });
        AlphaABS.BattleUI.pushItemOnPanel(item);
      }

      if (DataManager.isWeapon(item)) {
        AlphaABS.BattleUI.refreshWeaponCircle();
      }
    }
  };

  Game_Party.prototype.inBattle = function () {
    return $gamePlayer.inBattle();
  };

  //? А нужна ли возможность добавлять в группу на ABS карте?
  var _alias_Game_Party_addActor = Game_Party.prototype.addActor;
  Game_Party.prototype.addActor = function (actorId) {
     _alias_Game_Party_addActor.call(this, actorId);
     LOGW.p("Actor Added " + actorId);
     //$gamePlayer.followers().addNewFollower();
     var bots = $gamePlayer.followers();
     var ls = $gameParty.members().length - 1;
     bots._data[ls - 1].reInitABS(ls);
     bots._data[ls - 1].initABS();
     this._membersABS = undefined;
     this.membersABS();
     $gamePlayer.refresh();
     $gameMap.requestRefresh();
  };

  //TODO: Это работает с косяком
  var _alias_Game_Party_removeActor = Game_Party.prototype.removeActor;
  Game_Party.prototype.removeActor = function (actorId) {
    var index = this._actors.indexOf(actorId);
    _alias_Game_Party_removeActor.call(this, actorId);
    /*LOGW.p("INDEX " + index);
    var bots = $gamePlayer.followers();
     bots.forEach(function (item) {
       if (item instanceof Game_AI2Bot) {
         if (item.partyActorIndexId() == actorId) {
           item.stopABS();
           LOGW.p(item.aiName + " stopped");
         }
       }
     }, this);*/
    $gamePlayer.followers().initializeABS();
    this._membersABS = undefined;
    this.membersABS();
    $gamePlayer.followers().forEach(function (f) {
      f.initABS();
    }, this);
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
  };

  //END Game_Party
  //------------------------------------------------------------------------------

})();
// Generated by CoffeeScript 2.1.1
var Game_AI2Bot;

Game_AI2Bot = function() {
  this.initialize.apply(this, arguments);
};

(function() {
  var __interface_method_onSwitchToFreeState, __interface_method_performAction, __interface_method_setTarget;
  Game_AI2Bot.prototype = Object.create(Game_Follower.prototype);
  Game_AI2Bot.prototype.constructor = Game_AI2Bot;
  PLATFORM.SDK.applyInterface(Game_AI2Bot, AlphaABS.LIBS.Interface_AIBot);
  PLATFORM.SDK.applyInterface(Game_AI2Bot, AlphaABS.LIBS.Interface_AIBotABS);
  PLATFORM.SDK.applyInterface(Game_AI2Bot, AlphaABS.LIBS.Interface_AIBotABSEvents);
  PLATFORM.SDK.applyInterface(Game_AI2Bot, AlphaABS.LIBS.Interface_AIBotActions);
  PLATFORM.SDK.applyInterface(Game_AI2Bot, AlphaABS.LIBS.Interface_AIBotABSMoving);
  Game_AI2Bot.prototype.initialize = function(index) {
    Game_Follower.prototype.initialize.call(this, index);
    this.initializeABS();
    return this.reInitABS(index);
  };
  Game_AI2Bot.prototype.reInitABS = function(index) {
    this._absParams.battler = $gameParty.members()[index];
    if (this._absParams.battler != null) {
      this._stateMachine = new AlphaABS.LIBS.AIStateMachineParty();
      this._absParams.partyIndex = index;
      //@_absParams.partyActorId = @_absParams.battler.actorId()
      this.aiName = this._absParams.battler.name();
      this.LOG.setColors(Color.BLUE.hex(), Color.BLACK.getLightestColor(225).hex());
      this.LOG.p("AI inited " + this.aiName);
      this._absParams.motion = null;
      this._absParams.deactivatedByDead = false;
      this._absParams.behavior.loadAlly();
      this.pursuitTarget = false;
      return this.setThrough(false);
    } else {
      return this._deactivate();
    }
  };
  Game_AI2Bot.prototype.stopABS = function() {
    this._deactivate();
    if (this._absParams.battler != null) {
      this._absParams.battler.stopABS();
      return this._absParams.battler = null;
    }
  };
  
  //OVER Super
  Game_AI2Bot.prototype.chaseCharacter = function(character) {}; //*EMPTY
  Game_AI2Bot.prototype.partyActorIndexId = function() {
    if (this.battler() != null) {
      return this.battler().actorId();
    }
  };
  //OVER Super
  Game_AI2Bot.prototype.update = function() {
    Game_Character.prototype.update.call(this);
    //TODO: MoveSpeed и directionFix не должно быть как у Game_Player если в бою
    this._updateABS();
    return this._updateDeadState();
  };
  Game_AI2Bot.prototype.getHomePosition = function() {
    if (!this.isNearThePlayerX()) {
      return $gamePlayer.toPoint();
    } else {
      return null;
    }
  };
  //OVER I
  Game_AI2Bot.prototype._updateABS = function() {
    if (this.inActive()) {
      this.battler().updateABS();
      this._stateMachine.update(this);
      if (this.pursuitTarget) {
        this._performPursuitTarget();
      }
      this.checkCollisionWithPlayer();
      return this.checkCollisionWithParty();
    } else {
      return this._deactivate();
    }
  };
  Game_AI2Bot.prototype._performPursuitTarget = function() {
    this._absParams.useAStar = true;
    if (!this.isMoving()) {
      return this.moveTypeTowardTarget();
    }
  };
  //@turnTowardCharacter @target()

  //NEW
  Game_AI2Bot.prototype.checkCollisionWithPlayer = function() {
    if (!this.inBattle()) {
      return this.checkCollisionWith($gamePlayer);
    }
  };
  //NEW
  Game_AI2Bot.prototype.checkCollisionWith = function(other) {
    var me, pl;
    me = this.toPoint();
    pl = other.toPoint();
    if (me.x === pl.x && me.y === pl.y) {
      if (!this.isMoving()) {
        return this.moveFromPoint(other);
      }
    }
  };
  //NEW
  Game_AI2Bot.prototype.checkCollisionWithParty = function() {
    var i, len, other, ref;
    if (this.inBattle()) {
      ref = $gameParty.membersABS();
      for (i = 0, len = ref.length; i < len; i++) {
        other = ref[i];
        this.checkCollisionWithPartyMember(other);
      }
    }
  };
  //NEW
  Game_AI2Bot.prototype.checkCollisionWithPartyMember = function(member) {
    if (member.inBattle() && member !== this) {
      return this.checkCollisionWith(member);
    }
  };
  //NEW
  Game_AI2Bot.prototype._updateDeadState = function() {
    if (this._absParams.deactivatedByDead && this.isAlive()) {
      this._absParams.deactivatedByDead = false;
      this.requestMotion('none');
      return this.initABS();
    }
  };
  //OVER I
  Game_AI2Bot.prototype.initABS = function() {
    if (this._absParams.battler != null) {
      this.battler().initABS();
      this._absParams.active = true;
      return this.changeStateToFree();
    }
  };
  //OVER I
  Game_AI2Bot.prototype.startCommonEvent = function(commonEventId) {
    if ((commonEventId != null) > 0) {
      return $gameTemp.reserveCommonEvent(commonEventId);
    }
  };
  //OVER I
  Game_AI2Bot.prototype.createNewHomePoint = function() {}; //*EMPTY
  
  //OVER I
  Game_AI2Bot.prototype.onReturnEnd = function() {
    this.LOG.p('return END');
    this._absParams.active = true;
    if (this.inBattle()) {
      return this._onBattleEnd();
    }
  };
  Game_AI2Bot.prototype.onSwitchToReturnState = function() {
    return this.LOG.p('Return');
  };
  Game_AI2Bot.prototype.onSwitchToSearchState = function() {
    this.LOG.p('Curious! I\'am searching...');
    if (!this.behaviorModel().noEmote) {
      return this.requestBalloon(2);
    }
  };
  __interface_method_onSwitchToFreeState = Game_AI2Bot.prototype.onSwitchToFreeState;
  Game_AI2Bot.prototype.onSwitchToFreeState = function() {
    __interface_method_onSwitchToFreeState.call(this);
    this.pursuitTarget = false;
    return this._absParams.useAStar = false;
  };
  //OVER I
  Game_AI2Bot.prototype.startPursuitTarget = function() {
    this.LOG.p('Start pursuit');
    return this.pursuitTarget = true;
  };
  //OVER I
  Game_AI2Bot.prototype.returnSlow = function() {
    this._performReturnToPartyLeader();
    if (this.getHomePosition() == null) {
      return this.onReturnEnd();
    }
  };
  //NEW
  Game_AI2Bot.prototype._performReturnToPartyLeader = function() {
    if (!this.isMoving()) {
      return this.moveTypeTowardPlayer();
    }
  };
  //OVER I
  Game_AI2Bot.prototype.isNearThePointX = function(point) {
    var sx, sy;
    try {
      sx = Math.abs(this.deltaXFrom(point.x));
      sy = Math.abs(this.deltaYFrom(point.y));
      if (this.inBattle()) {
        return (sx + sy) < 1;
      } else {
        return (sx + sy) < (1 + this._absParams.partyIndex);
      }
    } catch (error) {
      return false;
    }
  };
  //OVER I
  Game_AI2Bot.prototype.stay = function() {
    return this.pursuitTarget = false;
  };
  //OVER I
  Game_AI2Bot.prototype.changeStateToFree = function() {
    if ($gamePlayer.inBattle() && ($gamePlayer.target() != null)) {
      return this.changeStateToBattle($gamePlayer.target());
    } else {
      return this._stateMachine.switchStateToFree(this);
    }
  };
  __interface_method_setTarget = Game_AI2Bot.prototype.setTarget;
  Game_AI2Bot.prototype.setTarget = function(target) {
    if (target instanceof Game_AI2Bot) {
      return this._resetTarget();
    } else {
      return __interface_method_setTarget.call(this, target);
    }
  };
  //OVER I
  Game_AI2Bot.prototype.onSwitchToDeadState = function() {
    this._absParams.allyToSearch = null;
    this.stay();
    this._deactivate();
    this.requestMotion('sleep');
    this._absParams.deactivatedByDead = true;
  };
  //NEW
  Game_AI2Bot.prototype.requestMotion = function(motion) {
    return this._absParams.motion = motion;
  };
  //NEW
  Game_AI2Bot.prototype.isMotionRequested = function() {
    return this._absParams.motion != null;
  };
  
  //NEW
  Game_AI2Bot.prototype.motionType = function() {
    return this._absParams.motion;
  };
  //NEW
  Game_AI2Bot.prototype.clearMotion = function() {
    return this._absParams.motion = null;
  };
  __interface_method_performAction = Game_AI2Bot.prototype._performAction;
  Game_AI2Bot.prototype._performAction = function() {
    __interface_method_performAction.call(this);
    if (this.battler().action(0).isAttack()) {
      this.battler().performAttack();
    }
  };
})();

(function () {

  var LOG = new PLATFORM.DevLog("Game_Player");
  var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;
  var ABSUtils = AlphaABS.UTILS;
  var SMouse = AlphaABS.UTILS.SMouse;
  var Consts = AlphaABS.SYSTEM;
  var PointX = AlphaABS.UTILS.PointX;
  var BattleProcessABS = BattleManagerABS.battleProcess();
  var BattleUI = AlphaABS.BattleUI;

  //Game_Player
  //------------------------------------------------------------------------------
  var _Game_Player_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function () {
    _Game_Player_initMembers.call(this);

    this._absParams.battler = null;
    this._absParams.active = true; //Со мной можно взаимодействовать (я под управлением)
    this._absParams.inBattle = false;
    this._absParams.control = true; //Отвечат на управление
    this._absParams.dead = false;

    this._teamId = 0;

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

  Game_Player.prototype.teamId = function () {
    return this._teamId;
  };

  Game_Player.prototype.isCasting = function () {
    return this._absParams.casting == true; //TODO: Ugly! У нас есть текущее действие и его свойство isCasting, см. AI_Bot
  };

  Game_Player.prototype.isAlly = function (who) {
    if (who)
      return (this.teamId() == who.teamId());
    return false;
  };


  //OVER
  Game_Player.prototype.executeMove = function (direction) {
    if (!this.inActive()) return;

    this.stopFollowMode();
    this.interruptCast();
    if (this._absParams.state != 'targetCircle') {
      this.moveStraight(direction);
    }
  };

  //NEW
  Game_Player.prototype.changeInputMode = function (mode) {
    if (mode == 0) {
      if (BattleUI.isWeaponCircleOpen()) {
        BattleUI.closeWeaponCircle();
        this._absParams.inputMode = mode;
        BattleUI.selectOnControlPanel(4);
      }
    } else {
      if (!BattleUI.isWeaponCircleOpen()) {
        BattleUI.openWeaponCircle();
        this._absParams.inputMode = mode;
        BattleUI.diselectOnControlPanel(4);
      }
    }
  };

  //NEW
  Game_Player.prototype.onGameLoad = function () {
    LOG.p("PL : On Game Load");
    this.battler().onGameLoad();
  };

  //NEW
  Game_Player.prototype._resetTarget = function () {
    this.stopFollowMode();
    this.interruptCast();
    this._absParams.autoAttackMode = false;
    BattleUI.disableOnControlPanel(0);
    BattleUI.disableOnControlPanel(1);
    BattleUI.changeRotateIconToMouse();
    this._changeState('free');
  };

  //NEW
  Game_Player.prototype.target = function () {
    return this._absParams.target;
  };

  //NEW
  Game_Player.prototype.stopFollowMode = function () {
    if (this._absParams.targetFollowMode)
      BattleUI.diselectOnControlPanel(1);
    this._absParams.targetFollowMode = false;
  };

  //NEW
  Game_Player.prototype.battler = function () {
    return this._absParams.battler;
  };

  //NEW
  Game_Player.prototype.initABS = function () {
    LOG.p("Player inited");
    this._absParams.battler = $gameParty.leader();
    if (!Imported.Quasi_Movement)
      this._absParams.useAStar = true;
    this.followers().forEach(function (f) { f.initABS(); }, this);
  };

  //NEW
  Game_Player.prototype.stopABS = function () {
    this._resetTarget();
    this.controlOn();
    this._absParams.inBattle = false;
    this._absParams.battler.stopABS();
    this._absParams.active = true;
    this._absParams.dead = false;
    this._absParams.useAStar = false;
    $gameParty.stopABS();
  };

  //NEW
  Game_Player.prototype.prepareABS = function () {
    this.battler().clearInfoPops();
    this.battler().clearActions();
    this.clearExpPopup();
    this._resetTarget();
    this.battler().refreshABSSkills();
    this.changeInputMode(0);
  };

  //NEW
  Game_Player.prototype.clearExpPopup = function () {
    this._absParams.expPopup = null;
  };

  //NEW
  Game_Player.prototype.isExpPopupRequested = function () {
    return (this._absParams.expPopup != null);
  };

  //NEW
  Game_Player.prototype.isMotionRequested = function () {
    return (this._absParams.motion != null);
  };

  //NEW
  Game_Player.prototype.requestMotion = function (motion) {
    this._absParams.motion = motion;
  };

  //NEW
  Game_Player.prototype.motionType = function () {
    return this._absParams.motion;
  };

  //NEW
  Game_Player.prototype.clearMotion = function () {
    this._absParams.motion = null;
  };

  //NEW
  Game_Player.prototype.requestExpPopup = function (value) {
    this._absParams.expPopup = value;
  };

  //NEW
  Game_Player.prototype.getExpPopup = function () {
    return this._absParams.expPopup;
  };

  //NEW
  Game_Player.prototype.inBattle = function () {
    return this._absParams.inBattle;
  };

  //NEW
  Game_Player.prototype.canControl = function () {
    return this.inActive() && this.battler().canMove() && this._absParams.control;
  };

  //NEW
  Game_Player.prototype.refreshBattleState = function () {
    if (!this.inBattle()) {
      this.onBattleStart();
      $gameParty.membersABS().forEach(function(member){
        if (!member.inBattle()) {
          member.changeStateToSearch($gamePlayer);
        }
      });
    }
  };

  //NEW
  Game_Player.prototype.onBattleStart = function () {
    LOG.p("PL : Battle start");
    //BattleManagerABS.alertOnUI(Consts.STRING_ALERT_INBATTLE);
    this._absParams.inBattle = true;
    this._absParams.inBattleTimer = new Game_TimerABS();
    this._absParams.inBattleTimer.start(120);
  };

  //NEW
  Game_Player.prototype.onBattleEnd = function () {
    LOG.p("PL : Battle end");
    //BattleManagerABS.alertOnUI(Consts.STRING_ALERT_OUTBATTLE);
    this._absParams.inBattle = false;
    this._absParams.inBattleTimer = null;
  };

  //NEW
  Game_Player.prototype.inActive = function () {
    return this._absParams.active;
  };

  //NEW
  Game_Player.prototype.controlOff = function () {
    $gameTemp.clearDestination();
    this._absParams.control = false;
    LOG.p("Control OFF");
  };

  //NEW
  Game_Player.prototype.controlOn = function () {
    this._absParams.control = true;
    LOG.p("Control ON");
  };

  //NEW
  Game_Player.prototype.onTurnEnd = function () {
    this.battler().onTurnEnd();
  };

  //NEW
  Game_Player.prototype.touchSkillAt = function (index) {
    if (!this.canControl()) return;
    var skillABS = this.battler().skillByKeyIndex(index);
    if (skillABS) {
      if (this._absParams.currentAction != skillABS) {
        BattleUI.touchOnSkillPanel(index);
        this._onNewSkillActivate();
        this._absParams.currentAction = skillABS;
        this._changeState('prepare');
      }
    }
  };

  //NEW
  Game_Player.prototype.touchControlAt = function (index) {
    if (!this.canControl()) return;
    if (index > 4) {
      return;
    }

    switch (index) {
      case 0:
        if (this._absParams.autoAttackMode) {
          this.turnTowardCharacter(this.target());
        } else {
          if (this._turnAutoAttack()) {
            BattleUI.touchOnControlPanel(index);
            BattleUI.selectOnControlPanel(index);
          } else {
            BattleUI.diselectOnControlPanel(index);
            if (this.target() == null)
              BattleUI.disableOnControlPanel(index);
          }
        }
        break;
      case 1: //Follow Mode
        var followAllowed = AlphaABS.Parameters.isFollowAllowed();
        if (this.target() && followAllowed == true) {
          if (!this._absParams.autoAttackMode)
            this._onNewSkillActivate();
          this._absParams.targetFollowMode = !this._absParams.targetFollowMode;
          if (this._absParams.targetFollowMode) {
            BattleUI.selectOnControlPanel(index);
          } else {
            BattleUI.diselectOnControlPanel(index);
          }
          BattleUI.touchOnControlPanel(index);
        }
        break;
      case 2:
        var jumpAllowed = AlphaABS.Parameters.isJumpAllowed();
        if (jumpAllowed == true) {
          if (this.canMove()) {
            if (Imported.YEP_SmartJump == true) {
              if (this._absParams.state == 'free' && !this.isJumping())
                $gamePlayer.smartJump(1);
            } else {
              if (this._absParams.state == 'free' && !this.isJumping() && this.canPass(this.x, this.y, this.direction())) {
                switch (ABSUtils.getDirKey(this)) {
                  case 'u':
                    this.jump(0, -1);
                    break;
                  case 'd':
                    this.jump(0, 1);
                    break;
                  case 'l':
                    this.jump(-1, 0);
                    break;
                  case 'r':
                    this.jump(1, 0);
                    break;
                }
              }
            }
            BattleUI.touchOnControlPanel(index);
          }
        }
        break;
      case 3:
        var rotateAllowed = AlphaABS.Parameters.isRotateAllowed();
        if (rotateAllowed == true) {
          if (this.canMove()) {
            if (this._absParams.state == 'free' && !this._absParams.targetFollowMode) {
              if (this.target()) {
                this.turnTowardCharacter(this.target());
              } else {
                if (!Utils.isMobileDevice())
                  this.turnTowardCharacter(SMouse.getMousePosition().convertToMap());
              }
            }
            BattleUI.touchOnControlPanel(index);
          }
        }
        break;
      case 4:
        var weapAllowed = AlphaABS.Parameters.isWeaponsAllowed();
        if (weapAllowed == true) {
          if (this.canMove()) {
            if (!this.battler().isFavWeapExists()) return;
            BattleUI.touchOnControlPanel(index);
            if (this._absParams.inputMode == 0) {
              this.changeInputMode(1);
            } else {
              this.changeInputMode(0);
            }
          }
        }
        break;
    }
  };

  //NEW
  Game_Player.prototype.touchWeaponAt = function (index) {
    BattleUI.touchOnWeaponCircle(index);
    if (this.battler().changeFavWeap(index)) {
      SoundManager.playEquip();
      this.changeInputMode(0);
    } else
      SoundManager.playBuzzer();

    BattleUI.refreshWeaponCircle();
  };

  //NEW
  Game_Player.prototype.onActionOnMe = function (who) {
    if (who && who.target() == this) {
      this.refreshBattleState();
      if (!this.target()) {
        BattleManagerABS.setPlayerTarget(who);
      }
    }
  };

  var _Game_Player_update = Game_Player.prototype.update;
  Game_Player.prototype.update = function (sceneActive) {
    _Game_Player_update.call(this, sceneActive);
    this._updateABS(sceneActive);
  };

  //NEW
  Game_Player.prototype.interruptCast = function () {
    var t = this._absParams.currentAction;
    if (t && t.isCasting()) {
      LOG.p("PL : Cast intterupt");
      BattleManagerABS.alertOnUI(Consts.STRING_ALERT_INTERRUPT);
      t.resetCast();
      this._absParams.casting = false;
      this._absParams.castingError = true;
      this._changeState('free');
    }
  };

  Game_Player.prototype.setFavWeapForce = function (itemId, segmentSymbol) {
    var index = 0;
    segmentSymbol = SDK.check(segmentSymbol, 'top');
    switch (segmentSymbol) {
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
    if (owner == null) {
      owner = $gameParty.leader();
    }
    owner.setFavWeap(item, index);
    BattleUI.refreshWeaponCircle();
  };
  //RPIVATE

  Game_Player.prototype._deactivate = function () {
    BattleManagerABS.setPlayerTarget(null);
    $gameMap.stopPlayerTargetCircle();
    this._stopTargetSelect();
    this._absParams.active = false;
    if (!this.battler().isAlive()) {
      this._dead();
    }
  };

  Game_Player.prototype._dead = function () {
    AudioManager.playMe($gameSystem.defeatMe());
    this._absParams.dead = true;
    this._absParams.deadTimer = new Game_TimerABS();
    this._absParams.deadTimer.start(90);
    //$gameScreen.startFadeOut(60);
    this.requestMotion('sleep');
  };

  //NEW
  Game_Player.prototype.setTarget = function (target) {
    this._absParams.target = target;
    if (!target || target.isAlly(this)) {
      this._resetTarget();
    } else {
      BattleUI.changeRotateIconToTarget();
      BattleUI.enableOnControlPanel(0);
      BattleUI.enableOnControlPanel(1);
    }
  };

  Game_Player.prototype._resetTarget = function () {
    this.stopFollowMode();
    this.interruptCast();
    this._absParams.target = null;
    this._absParams.autoAttackMode = false;
    BattleUI.disableOnControlPanel(0);
    BattleUI.disableOnControlPanel(1);
    BattleUI.changeRotateIconToMouse();
    this._changeState('free');
  };

  Game_Player.prototype._changeState = function (newState) {
    this._absParams.state = newState;

    switch (newState) {
      case 'free':
        this._stopTargetSelect();
        this._absParams.currentAction = null;
        break;
      case 'cast':
        if ((this._absParams.currentAction.isRadiusType() &&
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
  };

  Game_Player.prototype._performAction = function () {
    this.battler().makeActions();
    if (this._absParams.currentAction.isItem()) {
      this.battler().action(0).setItem(this._absParams.currentAction.skillId);
    } else
      this.battler().action(0).setSkill(this._absParams.currentAction.skillId);

    LOG.p("PL : Perform! " + this._absParams.currentAction.name());
    var selfAction = false;
    if (this._absParams.currentAction.isVectorType()) {
      if (this._absParams.currentAction.isVectorTypeR())
        BattleProcessABS.startPostBattleAction(this, new PointX(TouchInput.x, TouchInput.y).convertToMap(), this.battler().action(0), this._absParams.currentAction);
      else
        BattleProcessABS.startPostBattleAction(this, this.target(), this.battler().action(0), this._absParams.currentAction);
    } else {
      if (this._absParams.currentAction.isRadiusType()) {
        if (this._absParams.currentAction.isNeedTarget()) {
          BattleProcessABS.performBattleActionRadius(this, new PointX(TouchInput.x, TouchInput.y).convertToMap(), this.battler().action(0), this._absParams.currentAction);
        } else
          BattleProcessABS.performBattleActionRadius(this, this.toPoint(), this.battler().action(0), this._absParams.currentAction);
      } else {
        if (this._absParams.currentAction.isZoneType()) {
          BattleProcessABS.performBattleActionZone(this, this.battler().action(0));
        } else {
          if (this._absParams.currentAction.isNeedTarget())
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

    if (!selfAction) {
      this.battler().performCurrentAction();
    }

    this._absParams.currentAction.playStartSound(null);

    if (this._absParams.currentAction == this.battler().skillABS_attack()) {
      this.battler().performAttack();
    }

    if (!this.inBattle() && this.target() != this && selfAction == false) {
      this.onBattleStart();
    }
    if (this._absParams.autoAttackModeLast) {
      if (this._turnAutoAttack()) {
        this._absParams.autoAttackModeLast = false;
      }
    }
    this.refreshBattleState();
    this._changeState('free');
  };

  Game_Player.prototype._onNewSkillActivate = function () {
    if (this._absParams.autoAttackMode == true) {
      this._absParams.autoAttackModeLast = true;
      this._absParams.autoAttackMode = false;
    }
    this._stopTargetSelect();
    this.interruptCast();
  };

  Game_Player.prototype._updateABS = function (sceneActive) {
    if (!sceneActive) return;
    if (!this.battler()) return;

    if (this._absParams.dead === true && this._absParams.deadTimer!=null) {
      this._absParams.deadTimer.update();
      if (this._absParams.deadTimer.isReady()) {
        if (AlphaABS.Parameters.get_DeadMapId() > 0) {
          $gameTemp.transferedByDeathABS = true;
          this.reserveTransfer(AlphaABS.Parameters.get_DeadMapId(), 1, 1, 0, 0);
          this.battler().gainHp(1);
          this._absParams.deadTimer = null;
        } else {
          SceneManager.goto(Scene_Gameover);
        }
      }
    }

    if (!this.inActive()) return;

    if (!this.battler().isAlive() && this.inActive()) {
      this._deactivate();
    }

    if (!this.battler().canMove() && this._absParams.control) {
      this.controlOff();
      this._resetTarget();
      LOG.p("PL: Battle cannot move");
    }

    if (this.battler().canMove() && !this._absParams.control && !BattleUI.isUIFree()) {
      this.controlOn();
      LOG.p("PL: Battle can move alredy");
    }

    if (this._absParams.inBattleTimer) {
      this._absParams.inBattleTimer.update();
      if (this._absParams.inBattleTimer.isReady()) {
        if (this._checkInBattleStatus()) {
          this._absParams.inBattleTimer.reset();
        } else {
          this.onBattleEnd();
        }
      }
    }

    this.battler().updateABS();
    this._update_attackReload();
    if (!this.inActive()) return;
    if (!this.canControl()) return;

    this._update_input();
    if (this._absParams.autoAttackMode) {
      this._update_on_autoAttackMode();
    } else {
      switch (this._absParams.state) {
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

    if (this._absParams.targetFollowMode == true) {
      if (!this.isMoving()) {
        //this.moveTowardCharacter(this.target());
        /*var dir = this.findDirectionTo(this.target().x, this.target().y);
        if(dir > 0) {
          this.moveStraight(dir);
        }*/
        this.moveToPoint(this.target());
      }
    }

    this._moveSpeed = 4 + this.battler().ABSParams().moveSpeedUpKoef;
  };

  Game_Player.prototype._update_on_autoAttackMode = function () {
    var t = this.battler();
    t.makeActions();
    t.action(0).setAttack();
    var skill = t.skillABS_attack();
    this._absParams.currentAction = skill;
    /*if(this._absParams.state == 'cast') {
      this._update_on_cast();
      return;
    }*/

    if (ABSUtils.distanceTo(this, this.target()) <= 1) {
      this.turnTowardCharacter(this.target());
    }
    if (this.battler().canUse(skill.skill())) {
      if (BattleManagerABS.canUseSkillByTimer(skill)) {
        if (BattleManagerABS.canUseSkillByRange(this, this.target(), skill)) {
          if (BattleManagerABS.canUseSkillByAmmo(skill)) {
            if (skill.isVectorType()) {
              if (!this.isMoving()) {
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
            BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NOCHARGES);
          }
        } else {
          //LOG.p("PL : Can't use, target too far");
          //BattleManagerABS.alertOnUIbySym('toFar');
        }
      }
    } else {
      LOG.p("PL : Can't use auto attack");
      BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NOAUTOA);
      this._absParams.autoAttackMode = false;
    }
  };

  Game_Player.prototype._update_input = function () {
    if (Input.isTriggered(AlphaABS.Key.symbol.wC)) {
      if ($gameMap.isABS()) {
        this.touchControlAt(4);
      }
      return;
    }

    if (this._absParams.inputMode == 0) {
      if (Input.isTriggered(AlphaABS.Key.symbol.cpW)) {
        this.touchControlAt(AlphaABS.Key.indexSchemeB.cpW);
        return;
      }

      var isSp = AlphaABS.Key.isTriggeredSP();
      if (isSp != null) {
        this.touchSkillAt(isSp);
      }

      if (Input.isTriggered(AlphaABS.Key.symbol.cpA)) {
        this.touchControlAt(AlphaABS.Key.indexSchemeB.cpA);
        return;
      }

      if (Input.isTriggered(AlphaABS.Key.symbol.cpD)) {
        this.touchControlAt(AlphaABS.Key.indexSchemeB.cpD);
        return;
      }

      if (Input.isTriggered(AlphaABS.Key.symbol.tS)) {
        var t = BattleManagerABS.nextPlayerTarget();
        if (t) BattleManagerABS.setPlayerTarget(t);

      }

      if (Input.isTriggered(AlphaABS.Key.symbol.cpS)) {
        this.touchControlAt(AlphaABS.Key.indexSchemeB.cpS);
        return;
      }
    } else {
      var index = AlphaABS.Key.isTriggeredWS();
      if (index != null) {
        this.touchWeaponAt(index);
        return;
      }
    }

  };

  Game_Player.prototype._update_on_targetCircle = function () {
    var t = this._absParams.currentAction;
    if (t) {
      if (this.battler().canUse(t.skill())) {
        if (TouchInput.isTriggered()) {
          var p = SMouse.getMousePosition().convertToMap();
          var d = ABSUtils.distanceTo(this, p);
          if (d <= t.range) {
            if (BattleManagerABS.canUseSkillByAmmo(t)) {
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
  };

  Game_Player.prototype._update_on_prepare = function () {
    var t = this._absParams.currentAction;
    if (t) {
      LOG.p("PL : Prepare action " + t.skill().name);
      if (t.cEonStart != 0) {
        LOG.p("PL : Common Event " + t.cEonStart);
        $gameTemp.reserveCommonEvent(t.cEonStart);
      }
      if (this.battler().canUse(t.skill())) {
        if (BattleManagerABS.canUseSkillByAmmo(t)) {
          if (t.isRadiusType()) {
            LOG.p("PL : Radius type ");
            if (BattleManagerABS.canUseSkillByTimer(t)) {
              if (t.isNeedTarget()) {
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
            if (t.isVectorTypeR()) {
              if (BattleManagerABS.canUseSkillByTimer(t)) {
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
  };

  Game_Player.prototype._prepareNormal = function () {
    var t = this._absParams.currentAction;
    if (BattleManagerABS.canUseSkillByTimer(t)) {
      if (t.isNeedTarget()) {
        if (this.target()) {
          if (BattleManagerABS.canUseSkillByRange(this, this.target(), t)) {
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
  };

  Game_Player.prototype._update_on_action = function () {
    var t = this._absParams.currentAction;
    if (t) {
      if (t.isNeedCast()) {
        if (t.isCasting()) {
          if (t.isReady()) {
            this._performAction();
            this._absParams.casting = false;
          }
        } else {
          if (!this.isMoving()) {
            LOG.p("PL : Start cast!");
            this._absParams.casting = true;
            this._absParams.castingError = false;
            this.executeMove(0);
            t.startCast();
            this._absParams.castingSkill = t;
            this._changeState('cast');
          } else {
            LOG.p("PL : Can't start cast, i'am moving!");
            BattleManagerABS.alertOnUI(Consts.STRING_ALERT_CASTMOVE);
            this._changeState('free');
          }
        }
      } else {
        this._performAction();
      }
    } else {
      this._changeState('free');
    }
  };

  Game_Player.prototype._update_on_cast = function () {
    var t = this._absParams.currentAction;
    if (this.target())
      this.turnTowardCharacter(this.target());
    else {
      if (t) {
        if (!t.isZoneType()) {
          this.turnTowardCharacter(new PointX(TouchInput.x, TouchInput.y).convertToMap());
        }
      }
    }
    if (t && t.isCasting()) {
      if (t.isRadiusType()) {
        if (this.battler().canUse(t.skill())) {
          if (t.isReady()) {
            LOG.p("PL : Cast END");
            this._changeState('action');
          }
        } else {
          this.interruptCast();
          LOG.p("PL : Can't cast, not resources or restricted!");
          BattleManagerABS.alertOnUIbySym('noUse');
        }
      } else {
        if (t.isNeedTarget() && !BattleManagerABS.canUseSkillByRange(this, this.target(), t)) {
          this.interruptCast();
          LOG.p("PL : Target too far");
          BattleManagerABS.alertOnUIbySym('toFar');
        } else {
          if (this.battler().canUse(t.skill())) {
            if (t.isReady()) {
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
  };

  Game_Player.prototype._checkInBattleStatus = function () {
    var t = BattleManagerABS.whoTargetOnMe(this, $gameTroop.membersABS());
    if (t) { //Если игрок чья-то цель (врага)
      return true;
    }
    if (BattleProcessABS.isPostProcessExists()) {
      return true; //Если есть действия PostProcess
    }
    return false;
  };

  Game_Player.prototype._turnAutoAttack = function () {
    if (this.target()) {
      this._onNewSkillActivate();
      this.turnTowardCharacter(this.target());
      this._absParams.currentAction = this.battler().skillABS_attack();
      this._absParams.autoAttackMode = true;
      return true;
    }
    return false;
  };

  Game_Player.prototype._update_attackReload = function () {
    var t = this.battler().skillABS_attack();
    this._absParams.isWeapRecharge = !t.isReady();
  };

  Game_Player.prototype._stopTargetSelect = function () {
    $gameMap.stopPlayerTargetCircle();
  };

  //OVER
  Game_Player.prototype.jump = function (xPlus, yPlus) {
    Game_Character.prototype.jump.call(this, xPlus, yPlus);
  };

  //END Game_Player
  //------------------------------------------------------------------------------

})();
// Generated by CoffeeScript 2.1.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_RageContainer.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var RageContainer;
  RageContainer = class RageContainer {
    constructor() {
      this.clear();
    }

    clear() {
      this.rageDict = {};
      return this.targets = [];
    }

    addDealer(who) {
      if (who != null) {
        return this.makeDamageBy(0, who);
      }
    }

    makeDamageBy(damage, byWho) {
      var index;
      index = this.targets.indexOf(byWho);
      if (index > 0) {
        return this.rageDict[index] += damage;
      } else {
        this.targets.push(byWho);
        return this.rageDict[this.targets.length - 1] = damage;
      }
    }

    getHigherDealer() {
      var arr, error, max1, max2;
      try {
        arr = this._getArrayOfDmg();
        if (arr.length > 1) {
          max1 = arr.max();
          max2 = arr.delete(max1).max();
          if (max1 > (max2 * 3)) {
            return this._getDealerByDmg(max1);
          }
        }
      } catch (error1) {
        error = error1;
        console.error(error);
      }
      return null;
    }

    _getArrayOfDmg() {
      return Object.keys(this.rageDict).map((function(v) {
        return this.rageDict[v];
      }).bind(this));
    }

    _getDealerByDmg(dmg) {
      var key, ref, value;
      ref = this.rageDict;
      for (key in ref) {
        value = ref[key];
        if (value === dmg) {
          return this.targets[key];
        }
      }
    }

  };
  AlphaABS.register(RageContainer);
})();

// ■ END Game_RageContainer.coffee
//---------------------------------------------------------------------------

function Game_SkillABS() {
  this.initialize.apply(this, arguments);
}
(function () {

  var Consts = AlphaABS.SYSTEM;
  var LOG = new PLATFORM.DevLog("Game_SkillABS");

  //Game_SkillABS
  //------------------------------------------------------------------------------
  Game_SkillABS.prototype.initialize = function (skillId, isItem) {
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

  Game_SkillABS.prototype.isItem = function () {
    return (this._isItem == true);
  }

  Game_SkillABS.prototype.update = function () {
    this.timer.update();
  }

  Game_SkillABS.prototype.getReloadTime = function () {
    return this.reloadTimeA;
  }

  Game_SkillABS.prototype.isReady = function () {
    return this.timer.isReady();
  }

  Game_SkillABS.prototype.preUse = function (param) {
    this.reloadTimeA = param + this.reloadTime;
  }

  Game_SkillABS.prototype.isNeedReloadParam = function () {
    return (this.reloadParam != null);
  }

  Game_SkillABS.prototype.isDirectionFix = function () {
    return (this.directionFix == true);
  }

  Game_SkillABS.prototype.isNeedTarget = function () {
    return (this.needTarget == true);
  }

  Game_SkillABS.prototype.isNeedCast = function () {
    return (this.castTime != 0);
  }

  Game_SkillABS.prototype.isStackType = function () {
    return (this.stackTime > 0);
  }

  Game_SkillABS.prototype.isAutoReloadStack = function () {
    return !this.isNeedAmmo();
  }

  Game_SkillABS.prototype.isNeedReloadStack = function () {
    return (this.isStackType() && this._stackNeedReload == true);
  }

  Game_SkillABS.prototype.isVectorType = function () {
    return (this.type == 1);
  }

  Game_SkillABS.prototype.isVectorTypeR = function () {
    return (this.isVectorType() && this.radius > 0 && !this.isNeedTarget());
  }

  Game_SkillABS.prototype.isZoneType = function () {
    return (this.type == 3);
  }

  Game_SkillABS.prototype.isRadiusType = function () {
    return (this.type == 2);
  }

  Game_SkillABS.prototype.isCasting = function () {
    return (this._startCast == true);
  }

  Game_SkillABS.prototype.isNeedAmmo = function () {
    return (this.ammo > 0);
  }

  Game_SkillABS.prototype.playStartSound = function (point) {
    if (this.startSound) {
      if (point != null)
        AudioManager.playSeAt(this.startSound, point);
      else
        AudioManager.playSe(this.startSound);
    }
  }

  Game_SkillABS.prototype.startCast = function () {
    this._castDelay = 0;
    this._startCast = true;
    this.timer.start(this.castTime);
  }

  Game_SkillABS.prototype.onCastDelay = function (delay) {
    this._castDelay += delay;
    //LOG.p("Cast delay " + this._castDelay);
    //var p = (this.castTime + this._castDelay);
    //LOG.p("Max time is " + p);
    this.timer.setMaxTime(this.castTime + this._castDelay);
  }

  Game_SkillABS.prototype.resetCast = function () {
    this._startCast = false;
    this.timer.start(0);
  }

  Game_SkillABS.prototype.loadExternal = function (params, type) {
    if (type !== undefined) {
      this.type = type;
      var t = this.reloadParam;
      this._loadParamsBase();
      this.reloadParam = t;
    }
    this.castTime = 0;
    this._loadParamsExt(params);
    this._checkParams();
    if (this.castTime > 0) {
      this.castTime = 0;
      LOGW.p(Consts.STRING_WARNING_SKILLWC);
    }
    if (this.isVectorTypeR()) {
      LOGW.p(Consts.STRING_WARNING_SKILLWVR);
      this.radius = 0;
      this.needTarget = true;
    }
    LOG.p("Skill " + this.name() + " loaded external params");
  }

  Game_SkillABS.prototype.chargeStack = function (size) {
    if (size === undefined) {
      this._currentStack = this.stack;
      return 0;
    } else {

      if (this._currentStack === undefined) {
        this._currentStack = 0;
      }

      var d = 0;

      if (size > 0) {
        var n = Math.abs(this._currentStack - this.stack);
        d = size - n;
        if (d < 0) {
          this._currentStack = this.stack - Math.abs(d);
        } else {
          this._currentStack = this.stack;
          return d;
        }
      } else {
        this._currentStack -= Math.abs(size);
      }


      LOG.p("Skill: Current stack " + this._currentStack);
      if (this._currentStack <= 0) {
        this._stackNeedReload = true;
        this._currentStack = 0;
        LOG.p("Skill: Stack need reload all");
      }
      if (d >= 0)
        return d; //Остаток
      else
        return 0;
    }
  }

  Game_SkillABS.prototype.reloadStack = function () {
    if (!this.isStackType()) return;
    this.resetCast();
    LOG.p("Stack reload manual " + this.skill().name + " reload time " + this.stackTime);
    this.timer.start(this.stackTime);
    this._stackNeedReload = false;
    //Don't need post use because stackTime > 0
  }

  Game_SkillABS.prototype.onUse = function () {
    if (this.isStackType()) {
      this._onUseStackType();
    } else
      this._onUseNormal();
  }

  Game_SkillABS.prototype._onUseStackType = function () {
    this.chargeStack(-1);
    if (this.isAutoReloadStack() && this.isNeedReloadStack()) {
      LOG.p("Skill: Reload stack auto");
      this.preUse(this.stackTime);
      this._stackNeedReload = false;
      this._currentStack = this.stack;
    }
    this._onUseNormal();

    if (this.isAutoReloadStack() && !this.isNeedReloadStack()) {
      this.preUse(0);
    }
  }

  Game_SkillABS.prototype._onUseNormal = function () {
    this.resetCast();
    LOG.p("On use " + this.skill().name + " reload time " + this.reloadTimeA);
    this.timer.start(this.reloadTimeA);

    if (this.isNeedAmmo()) {
      $gameParty.loseItem($dataItems[this.ammo], 1, true);
    }

    if (this.castTime == 0 && this.reloadTimeA == 0) {
      LOG.p("Skill " + this.skill().name + " use PostUse");
      this.timer.start(60); //Post Use
    }
  }

  Game_SkillABS.prototype.postUse = function () { //Delay between skill activation (called when another skill is start)
    if (this.isReady() && this.skillId != 1) { //Attack not need postUse
      this.timer.start(60);
      LOG.p("Skill " + this.skill().name + " use PostUse");
    }
  };

  Game_SkillABS.prototype.skill = function () {
    if (this.isItem())
      return $dataItems[this.skillId];
    else
      return $dataSkills[this.skillId];
  };

  Game_SkillABS.prototype.name = function () {
    return this.skill().name;
  };

  //PRIVATE
  Game_SkillABS.prototype._loadParamsBase = function () {
    var template = Game_SkillABS.TEMPLATES[this.type];
    Game_SkillABS.PARAMS.forEach(function (p) {
      if (template[p])
        this[p] = template[p];
      else
        this[p] = 0;
    }.bind(this));

    this.reloadParam = null;
  };

  Game_SkillABS.prototype._loadParamsUser = function () {
    var item = this.skill();
    this.castTime = item.speed;
    this.range = item.repeats;
    if (this.range == 1)
      this.range = 0;
    if ([1, 3, 4, 5, 6].contains(item.scope)) {
      this.needTarget = true;
    } else
      this.needTarget = false;
  };

  Game_SkillABS.prototype._loadParamsExt = function (innerData) {
    var paramsData = this.skill().meta;
    if (innerData !== undefined) {
      paramsData = innerData;
    }

    for (var i = 0; i < Game_SkillABS.PARAMS.length; i++) {
      var p = Game_SkillABS.PARAMS[i];
      if (paramsData[p]) {
        if (i < 6) { //String params
          this[p] = paramsData[p];
        } else {
          this[p] = parseInt(paramsData[p]);
        }
      }
    }
    if (this.isVectorType()) {
      this._particleParamsUser = {};
      var count = 0;
      Game_SkillABS.PARAMS2.forEach(function (p) {
        if (paramsData[p]) {
          if (p == Game_SkillABS.PARAMS2[0]) { //pData is String
            this._particleParamsUser[p] = paramsData[p];
            count++;
          } else {
            this._particleParamsUser[p] = parseInt(paramsData[p]);
            count++;
          }
        }
      }.bind(this));
      if (count == 0)
        this._particleParamsUser = null; //None
    }
  };

  Game_SkillABS.prototype._checkParams = function () {
    switch (this.type) {
      case 0:
        break;
      case 1:
        if (!this.img || this.img == "") {
          this.img = 'null';
        }
        if (!this.pType || this.pType == '0' || this.pType == 'null' || this.pType == "") {
          this.pType = null;
        }
        if (!this.light || this.light == '0' || this.light == 'null' || this.light == "") {
          this.light = null;
        }
        if (this.range == 0) this.range = Game_SkillABS.TEMPLATES[1].range;
        if (this.radius > 0) {
          this.needTarget = false;
          if (this.radius > 5) {
            this.radius = 5;
            LOGW.p(this.skill().name + " spell radius must be <= 5. Changed to 5!");
          }
        } else {
          this.needTarget = Game_SkillABS.TEMPLATES[1].needTarget;
        }
        break;
      case 2:
        if (this.radius == 0) this.radius = Game_SkillABS.TEMPLATES[2].radius;
        if (this.radius > 5) {
          this.radius = 5;
          LOGW.p(this.skill().name + " spell radius must be <= 5. Changed to 5!");
        }
        if (this.needTarget) {
          if (this.range == 0)
            this.range = Game_SkillABS.TEMPLATES[2].range;
        }
        break;
      case 3:

        break;
    }

    if (this.directionFix > 0)
      this.directionFix = true;

    if (this.noDescription > 0) {
      this.noDescription = true;
    }

    if (this.stack == 1) {
      this.stack = 2;
      LOGW.p("Skill " + this.name() + " stack minimum 2!");
    }

    if (this.stackTime <= 0) {
      if (this.stack > 1) {
        this.stackTime = this.reloadTime * this.stack * 2;
        LOGW.p("Skill " + this.name() + " You use stack withou stackTime param, stackTime set automaticaly = " + this.stackTime);
      }
    }

    if (this.stackTime > 0) {
      if (this.stack == 0) {
        LOGW.p("Skill " + this.name() + " if you use stackTime param, you need stack param too, param not active!");
        this.stackTime = 0;
      } else {
        if (this.ammo > 0) { //ID of item
          this._currentStack = 0;
          this._stackNeedReload = true;
        } else {
          this._currentStack = this.stack;
          this._stackNeedReload = false;
        }
      }
    }

    if (this.startSound) {
      this.startSound = {
        name: this.startSound,
        pan: 0,
        pitch: 100,
        volume: 100
      };
    }

    if (this.reloadSound) { //Not used yet
      this.reloadSound = {
        name: this.reloadSound,
        pan: 0,
        pitch: 100,
        volume: 100
      };
    }

    if (this.reloadParam != null) {
      //If i can use 'with' keyword in strict mode, this is not happened :(
      if (!this.reloadParam.contains('this')) {
        if (this.reloadParam.trim() == 'attackSpeed') { //for performance
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
  };

  Game_SkillABS.prototype.hasParticle = function () {
    return (this.isVectorType() && this.pType != null);
  };

  Game_SkillABS.prototype.hasLight = function () {
    return (this.isVectorType() && this.light != null);
  };

  Game_SkillABS.prototype.initGenerator = function () {
    if (this.isVectorType()) {
      this.particleData = {};
      //TODO: Тут надо что-то додумать с частицами
      var particleStateBase = {
        "id": "particle_fire",
        "pData": "FireParticle",
        "pMinSize": 8,
        "pMaxSize": 24,
        "pPower": 3,
        "pLife": 64,
        "pAlpha": 1.0,
        "pCount": 200
      };

      for (var p in particleStateBase) { //Clone
        this.particleData[p] = particleStateBase[p];
      }
      if (this._particleParamsUser) {
        for (var p in this._particleParamsUser) {
          this.particleData[p] = this._particleParamsUser[p];
        }
      }

      var generator = function (particleData) {
        var size = SDK.rand(particleData.pMinSize, particleData.pMaxSize);
        var color = Color.NONE;
        var image;
        if (particleData.pData.indexOf('#') == 0) {
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
  };

  SDK.setConstant(Game_SkillABS, 'TEMPLATES', //DON'T CHANGE THIS (will crush all)
    [{
        range: 0,
        needTarget: true,
        castTime: 0,
        reloadTime: 0,
        reloadParam: null,
        directionFix: 0
      }, //0 - Instante (attack)
      {
        range: 6,
        needTarget: true,
        castTime: 120,
        reloadTime: 0,
        reloadParam: null,
        pType: null,
        img: 'null',
        light: null,
        lightSize: 100,
        directionFix: 0
      }, //1 - Vector
      {
        range: 6,
        needTarget: true,
        radius: 3,
        castTime: 0,
        reloadTime: 120,
        reloadParam: null,
        directionFix: 0
      }, //2 - Radius
      {
        castTime: 0,
        needTarget: false,
        reloadTime: 120,
        reloadParam: null,
        directionFix: 0
      } //3 - Zone
    ]
  );

  SDK.setConstant(Game_SkillABS, 'PARAMS', ['reloadParam', 'pType', 'img', 'light', 'startSound', 'reloadSound', 'vSpeed', 'range', 'reloadTime', 'castTime', 'needTarget', 'radius', 'castAnim', 'lightSize', 'stack', 'stackTime', 'directionFix', 'ammo', 'cEonUse', 'cEonStart', 'noDescription']);
  SDK.setConstant(Game_SkillABS, 'PARAMS2', ['pData', 'pMinSize', 'pMaxSize', 'pPower', 'pLife', 'pAlpha', 'pCount']); //PARTICLES params

  //END Game_SkillABS
  //------------------------------------------------------------------------------

})();
function Game_SkillManagerABS() {
  this.initialize.apply(this, arguments);
}
(function () {
  //Game_SkillManagerABS
  //------------------------------------------------------------------------------

  Game_SkillManagerABS.prototype.initialize = function () {
    this._skillsABS = [];
    this._requestRefresh();
  };

  Game_SkillManagerABS.prototype.all = function () {
    return this._skillsABS;
  };

  Game_SkillManagerABS.prototype.remove = function (objId, isItem) {
    for (var i = 0; i < this._skillsABS.length; i++) {
      var item = this._skillsABS[i];
      if (isItem) {
        if (item.skillId == objId && item.isItem()) {
          this._skillsABS.splice(i, 1);
          this._requestRefresh();
          break;
        }
      } else {
        if (item.skillId == objId && !item.isItem()) {
          this._skillsABS.splice(i, 1);
          this._requestRefresh();
          break;
        }
      }
    }
  };

  Game_SkillManagerABS.prototype.push = function (objId, isItem) {
    var item = new Game_SkillABS(objId, isItem);
    this._skillsABS.push(item);
    this._requestRefresh();
  };

  Game_SkillManagerABS.prototype.update = function () {
    this._skillsABS.forEach(function (item) {
      item.update();
    });
  };

  Game_SkillManagerABS.prototype.skills = function () {
    if (this._needRefreshSkills) {
      this._skills = [];
      for (var i = 0; i < this._skillsABS.length; i++) {
        var item = this._skillsABS[i];
        if (!item.isItem()) {
          this._skills.push(item);
        }
      }
      this._needRefreshSkills = false;
    }
    return this._skills;
  };

  Game_SkillManagerABS.prototype.items = function () {
    if (this._needRefreshItems) {
      this._items = [];
      for (var i = 0; i < this._skillsABS.length; i++) {
        var item = this._skillsABS[i];
        if (item.isItem()) {
          this._items.push(item);
        }
      }
      this._needRefreshItems = false;
    }
    return this._items;
  };

  Game_SkillManagerABS.prototype.skillById = function (id) {
    for (var i = 0; i < this._skillsABS.length; i++) {
      var item = this._skillsABS[i];
      if (item.skillId == id && !item.isItem()) {
        return item;
      }
    }
    return null;
  };

  Game_SkillManagerABS.prototype.itemById = function (id) {
    for (var i = 0; i < this._skillsABS.length; i++) {
      var item = this._skillsABS[i];
      if (item.skillId == id && item.isItem()) {
        return item;
      }
    }
    return null;
  };

  //PRIVATE

  Game_SkillManagerABS.prototype._requestRefresh = function () {
    this._needRefreshSkills = true;
    this._needRefreshItems = true;
  };

  //END Game_SkillManagerABS
  //------------------------------------------------------------------------------

})();
(function () {

  var ABSUtils = AlphaABS.UTILS;
  var LOG = new PLATFORM.DevLog("Game_SVector");
  var PointX = AlphaABS.UTILS.PointX;
  var BattleManagerABS = AlphaABS.BattleManagerABS;

  //Game_SVector
  //------------------------------------------------------------------------------
  class Game_SVector {
    constructor(data) {
      this._data = data;
      this._disposed = false;
      this._started = false;
      this._setImage(data.skill.img); 
      this._emit = null;
      if (data.skill.vSpeed > 0) {
        this._speed = data.skill.vSpeed / 32;
      } else
        this._speed = Game_SVector.SPEED;
    }

    update() {
      try {
        if (!this.sprite) return;
        if (!this._started) return;

        var ep = this._endPoint();
        if (!this._myPoint) {
          LOG.p("SVector : Point MISS : Target Reached!");
          this.dispose();
          return;
        }

        if (BattleManagerABS.isABSLightingExt()) {
          $gameMap.deleteLight(this._myPoint.x, this._myPoint.y);
        }

        this._myPoint = ABSUtils.SMath.moveTo(this._myPoint, ep, this._speed);

        if (BattleManagerABS.isABSLightingExt()) {
          $gameMap.setLight(this._myPoint.x, this._myPoint.y, this._data.skill.lightSize, this._data.skill.light, 0, true);
        }

        this.sprite.x = this._myPoint.screenX();
        this.sprite.y = this._myPoint.screenY();

        //Emitter move
        if (this._emit) {
          this._emit.move(this.sprite.x, this.sprite.y);
        }

        //Rotation
        var angle = Math.atan2(ep.screenY() - this.sprite.y, ep.screenX() - this.sprite.x);
        this.sprite.rotation = angle;

        var t = new Rectangle(ep.x - 0.5, ep.y - 0.5, 1.5, 1.5);
        if (ABSUtils.SMath.inRect(this._myPoint, t)) {
          LOG.p("SVector : Target Reached!");
          this.dispose();
        }
      } catch (e) {
        console.error(e);
        this.dispose();
      }
    }

    start() {
      if (ABSUtils.inFront(this._data.subject, this._data.target)) {
        this._started = true;
        this._disposed = true;
        LOG.p("SVector : Target in Front!");
        return;
      }
      this._myPoint = this._startPoint();
      this._started = true;
      LOG.p("SVector : Start at " + this._myPoint.toString());
      LOG.p("SVector : To " + this._endPoint().toString());

      try {
        if (BattleManagerABS.isABSParticleSystem() && this.data().skill.hasParticle()) {
          var generator = this.data().skill.initGenerator();
          if (generator != null) {
            this._emit = AlphaABS.SYSTEM.EXTENSIONS.ABSPE.initEmitter(this.sprite.x, this.sprite.y, this.data().skill.pCount, generator);
            this._emit.setOuterData(this.data().skill.particleData);
          } else {
            LOGW.p(this._data.skill.name() + " particle data is missing, check ABSDataUser.json");
          }
        }
      } catch (e) {
        console.error(e);
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
      try {
        LOG.p("SVector : Disposed ");
        var t = this.sprite.parent;
        if (t) {
          t.removeChild(this.sprite);
        }
        if (this._emit) {
          this._emit.stop();
          this._emit.clear();
        }

        if (BattleManagerABS.isABSLightingExt() && this._myPoint) {
          $gameMap.deleteLight(this._myPoint.x, this._myPoint.y);
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.sprite = null;
        this._disposed = true;
      }
    }

    //PRIVATE
    _startPoint() {
      return this._data.subject.toPoint();
    }

    _endPoint() {
      return this._data.target.toPoint();
    }

    _setImage(name) {
      if (name) {
        if (name == 'null')
          this.sprite = new Sprite(ImageManager.loadPictureABS('vector'));
        else
          this.sprite = new Sprite(ImageManager.loadPicture(name));
      } else {
        this.sprite = new Sprite(new Bitmap(76, 38));
      }
      this.sprite.anchor.x = 0.5;
      this.sprite.anchor.y = 0.5;
    }
  }

  SDK.setConstant(Game_SVector, 'SPEED', 0.15);
  //END Game_SVector
  //------------------------------------------------------------------------------

  AlphaABS.register(Game_SVector);

})();
function Game_TimerABS() {
  this.initialize.apply(this, arguments);
}
(function () {
  //Game_TimerABS
  //------------------------------------------------------------------------------
  Game_TimerABS.prototype.initialize = function () {
    this._paused = false;
    this._mValue = 0;
    this._value = 0;
  };

  Game_TimerABS.prototype.getMaxValue = function () {
    return this._mValue;
  };

  Game_TimerABS.prototype.getValue = function () {
    return this._value;
  };

  Game_TimerABS.prototype.setMaxTime = function (frameCount) {
    frameCount = Math.abs(Math.round(frameCount));
    this._mValue = frameCount;
    if (this._value > this._mValue)
      this._value = this._mValue;
  };

  Game_TimerABS.prototype.reset = function () {
    this._value = 0;
  };

  Game_TimerABS.prototype.isReady = function () {
    return (this._value >= this._mValue);
  };

  Game_TimerABS.prototype.start = function (frameCount) {
    this._value = 0;
    this._mValue = Math.abs(Math.round(frameCount));
    this._paused = false;
  };

  Game_TimerABS.prototype.stop = function () {
    this.start(0);
  };

  Game_TimerABS.prototype.pause = function () {
    if (this._paused)
      return;
    if (this._mValue == 0)
      return;
    this._paused = true;
  };

  Game_TimerABS.prototype.resume = function () {
    this._paused = false;
  };

  Game_TimerABS.prototype.update = function () {
    if (!this.isReady()) {
      if (!this._paused) {
        if (this._value < this._mValue)
          this._value += 1;
      }
    }
  };
  //END Game_TimerABS
  //------------------------------------------------------------------------------

})();
(function () {
  //Game_Troop
  //------------------------------------------------------------------------------
  //OVER
  Game_Troop.prototype.setup = function (troopId) {
    this.clear();
    this._enemies = [];
    this._enemiesABS = [];

    $gameMap.events().forEach(function (e) {
      if (e instanceof Game_AIBot) {
        this._enemiesABS.push(e);
      }
    }.bind(this));
  };

  Game_Troop.prototype.membersABS = function () {
    return this._enemiesABS;
  };

  //OVER
  Game_Troop.prototype.initABS = function () {
    this.setup();
    this.membersABS().forEach(function (member) {
      member.initABS();
      this._enemies.push(member.battler());
    }.bind(this));
    this._inBattle = true;
  };

  //NEW
  Game_Troop.prototype.onTurnEnd = function () {
    this._enemiesABS.forEach(function (e) {
      e.onTurnEnd();
    });
  };

  Game_Troop.prototype.aliveMembersABS = function () {
    return this.membersABS().filter(function (member) {
      return member.battler().isAlive();
    });
  };

  Game_Troop.prototype.deadMembersABS = function () {
    return this.membersABS().filter(function (member) {
      return member.battler().isDead();
    });
  };

  //NEW
  Game_Troop.prototype.selectOnMap = function (who) {
    this.membersABS().forEach(function (e) {
      e.selectOnMap(false);
    });
    if (who) who.selectOnMap(true);
  };
  //END Game_Troop
  //------------------------------------------------------------------------------

})();
/*(function () {

    var LOG = new PLATFORM.DevLog("Game_AI2Bot");
    LOG.setColors(Color.BLUE.hex(), Color.BLACK.getLightestColor(225).hex());
    var ABSUtils = AlphaABS.UTILS;
    var BattleManagerABS;

    Game_AI2Bot.prototype.initialize = function (battler) {
        Game_Follower.prototype.initialize.call(this, 1);

        BattleManagerABS = AlphaABS.BattleManagerABS;

        this._absMode = false; //Если true, то бот в AI режиме

        this._absParams.battler = battler;
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

        //Ally Behavior
        this._absParams.behavior = 'normal'; //'normal','agressive','defend','order'

        //Behavior
        /*var b = new Game_AIBehavior(this); //Некоторые параметры будут меняться от behavior
        this._absParams.viewRadius = b.viewRadius;
        this._absParams.returnRadius = b.returnRadius;
        this._absParams.escapeOnBattle = b.escapeOnBattle; //Убегает во время битвы
        this._absParams.canSearch = b.canSearch; //Могу ля я искать противника, если мой сосед атакован
        this._absParams.noFight = b.noFight; //Не будет сражаться
        this._absParams.reviveTime = b.reviveTime; //Время возрождения (минуты)
        this._absParams.regenOnFree = b.regen;
        this._absParams.slow = b.slow; //Медленный враг
        this._absParams.agressive = b.agressive; //Агрессивный враг (будет догонять)*/

        /*this._absParams.viewRadius = 4;

        //Path finding
        this._absParams.useAStar = true;
    };

    Game_AI2Bot.prototype.battler = function () {
        return this._absParams.battler;
    }

    Game_AI2Bot.prototype.target = function () {
        return this._absParams.target;
    }

    Game_AI2Bot.prototype.isAlly = function () {
        return true;
    }

    Game_AI2Bot.prototype.initABS = function () {
        this._absParams.battler.initABS();
        LOG.p("ABS AI inited for " + this.battler().name());

        this._absParams.active = true;
    }

    Game_AI2Bot.prototype.inBattle = function () {
        return this._absParams.inBattle;
    }

    Game_AI2Bot.prototype.inActive = function () {
        return this._absParams.active;
    }

    Game_AI2Bot.prototype.onTurnEnd = function () {
        if (this.inBattle()) {
            this.battler().onTurnEnd();
        }
    }

    Game_AI2Bot.prototype.isSelected = function() {
        return this._absParams.selected;
    }

    Game_AI2Bot.prototype.isCasting = function () {
        return this._absParams.casting;
    }

    Game_AI2Bot.prototype.onActionOnMe = function (who) {}

    Game_AI2Bot.prototype.selectOnMap = function (isSelect) {
        this._absParams.selected = isSelect;
    }

    Game_AI2Bot.prototype.onGameLoad = function () {}

    Game_AI2Bot.prototype.refresh = function () {
        Game_Follower.prototype.refresh.call(this);
    }

    Game_AI2Bot.prototype.update = function () {
        Game_Follower.prototype.update.call(this);
        this._updateABS();
    }

    Game_AI2Bot.prototype.interruptCast = function () {}

    Game_AI2Bot.prototype.chaseCharacter = function (character) {
        if (this.inBattle()) {
            if (this.target())
                this.turnTowardCharacter(this.target());
            //AI Moving
        } else
            Game_Follower.prototype.chaseCharacter.call(this, character);
    };


    //PRIVATE

    Game_AI2Bot.prototype._makeActions = function () {

    }

    Game_AI2Bot.prototype._isUsableABSSkill = function (absSkill) {

    }

    Game_AI2Bot.prototype._setForceAction = function (action) {

    }

    Game_AI2Bot.prototype._setCurrentAction = function (action) {}

    Game_AI2Bot.prototype._performAction = function () {

    }

    Game_AI2Bot.prototype._updateABS = function () {
        if (this._absParams.active) {
            this.battler().updateABS();

            switch (this._absParams.state) {
                case 'free':
                    this._update_on_free();
                    break;
                case 'battle':
                    this._update_on_battle();
                    break;
            }


        }
    }

    Game_AI2Bot.prototype._changeState = function (newState) {
        this._absParams.state = newState;
        switch (newState) {
            case 'free':
                this._absParams.target = null;
                this._absParams.inBattle = false;
                break;
            case 'battle':
                this._onBattleStart();
                LOG.p("Battle state in!");
                break;
        }
    }

    Game_AI2Bot.prototype._changeActionState = function (newActionState) {}

    Game_AI2Bot.prototype._changeWaitActionState = function (oldActionState, waitType, waitTimer) {}

    Game_AI2Bot.prototype._checkReturn = function () {}

    Game_AI2Bot.prototype._setTarget = function (t) {

        if (BattleManagerABS.isValidTarget(t)) {
            this._absParams.target = t;
            $gamePlayer.refreshBattleState();
        }
        if (t == null)
            this._resetTarget();

    }

    Game_AI2Bot.prototype._resetTarget = function () {
        this._absParams.target = null;
        this._absParams.inBattle = false;
        this.interruptCast();
    }

    Game_AI2Bot.prototype.moveTypeTowardPlayer = function () {}

    Game_AI2Bot.prototype._update_on_free = function () {

        this._checkVisionEnemy();
        if (this._absParams.target) {
            LOG.p("Ally see enemy!");
            this._changeState('battle');
        }
    }

    Game_AI2Bot.prototype._checkVisionEnemy = function () {
        var enemies = ABSUtils.inRadius(this, this._absParams.viewRadius, $gameTroop.membersABS());
        if (enemies.length > 0) {
            this._setTarget(enemies.first());
        }
    }

    Game_AI2Bot.prototype._update_on_stun = function () {}

    Game_AI2Bot.prototype._update_on_battle = function () {
        if (!this.target().inActive()) {
            this._changeState('free');
        }

        if (!this._checkVision(this.target())) {
            if (this._absParams.behavior.noMove) {
                this._changeState('free');
                return;
            }
        }
    }

    Game_AI2Bot.prototype._update_on_return = function () {}

    Game_AI2Bot.prototype._update_on_search = function () {}

    Game_AI2Bot.prototype._checkVision = function (who) {
        if (!who || !who.inActive()) {
            return false;
        }
        var t = ABSUtils.distanceTo(this, who);
        if (t < this._absParams.viewRadius) {
            return true;
        } else
            return false;
    }

    Game_AI2Bot.prototype._checkVisionAlly = function () {}

    Game_AI2Bot.prototype._escapeFromTarget = function () {}

    Game_AI2Bot.prototype._deactivate = function () {}

    Game_AI2Bot.prototype._onBattleStart = function () {
        this._absParams.inBattle = true;
    }

    Game_AI2Bot.prototype._onBattleEnd = function () {}

})();*/
(function () {
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
            return new ItemLineSprite(count, AlphaABS.Parameters.get_GoldIconIndex(), ItemLineSprite.COLOR_GOLD);
        }

        static Exp(count) {
            return new ItemLineSprite(TextManager.exp + ' ' + count, null, ItemLineSprite.COLOR_EXP);
        }

        //PRIVATE

        _create() {
            var w = this.width();
            var h = this.height();
            this._backSurface = new Sprite();
            this._backSurface.bitmap = new Bitmap(w, h);
            var color1 = Color.BLACK.CSS;
            var color2 = Color.BLACK.getLightestColor(128).CSS;
            this._backSurface.bitmap.gradientFillRect(0, 0, w, h, color1, color2, false);
            this._backSurface.opacity = 180;
            this.addChild(this._backSurface);
        }

        _draw() {
            this._drawSurface = new Sprite();
            this._drawSurface.bitmap = new Bitmap(this.width(), this.height());
            this.addChild(this._drawSurface);
            if (this._iconSymbol != null)
                this._drawIcon();
            if (this._text != '')
                this._drawText();
        }

        _drawText() {
            var startX = this._iconSymbol != null ? 26 : 0;
            this._drawSurface.bitmap.textColor = this._textColor.CSS;
            this._drawSurface.bitmap.fontSize = 18;
            this._drawSurface.bitmap.outlineWidth = 2;
            this._drawSurface.bitmap.drawText(this._text, startX + 2, this.height() / 2, this.width() - startX, 1, 'left');
        }

        _drawIcon() {
            SDK.drawIcon(0, 0, this._iconSymbol, this._drawSurface.bitmap);
        }

    }

    SDK.setConstant(ItemLineSprite, 'COLOR_GOLD', Color.YELLOW);
    SDK.setConstant(ItemLineSprite, 'COLOR_EXP', Color.MAGENTA.getLightestColor(128));

    AlphaABS.register(ItemLineSprite);
    //END ItemLineSprite
    //------------------------------------------------------------------------------

})();
(function () {
    //------------------------------------------------------------------------------
    //NotifyMachine
    class NotifyMachine extends Sprite {
        constructor(x, y, w, h, lines) {
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
            this.bitmap = new Bitmap(w, this._lineH * lines);
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
            if (lastItem != null)
                this.removeChild(lastItem);

            this._items.push(item);
            if (this._newItem) {
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
            this._items.forEach(function (item) {
                if (item) this.removeChild(item);
            });
            this._timers = [];
            this._items = [];
            this._newItem = null;
            this._initItems();
        }

        //PRIVATE
        _setupMode() {
            this._mode = 'right'; //Apper from right of Screen
            if (SDK.toGlobalCoord(this, 'x') < Graphics.width / 2) {
                this._mode = 'left'; //Apper from left of Screen
            }
        }

        _update_new_item() {
            if (this._newItem == null) return;
            this._fadeOut(this._newItem);
            if (this._mode == 'right') {
                if (this._newItem.x > 2)
                    this._newItem.x -= 4;
            } else {
                if (this._newItem.x < 0)
                    this._newItem.x += 4;
            }
        }

        _update_items_fade() {
            for (var i = 0; i < this._items.length; i++) {
                if (!this._timers[i]) continue;
                if (this._timers[i].isReady()) {
                    if (this._items[i] != this._newItem)
                        this._fadeIn(this._items[i]);
                }
            }
        }

        _update_timers() {
            this._timers.forEach(function (timer) {
                if (timer) {
                    timer.update();
                }
            });

            this._newItemTimer.update();
            if (this._newItemTimer.isReady() && this._newItem) {
                this._timers[this._maxItems - 1].start(1);
                this._newItem = null;
            }
        }

        _step() {
            SDK.times(this._items.length, function (i) {
                var index = (this._items.length - 1) - i; //Reverse
                var item = this._items[index];
                if (item == null) return;
                var newY = this.height - (this._lineH * (i + 1));
                if (index != (this._items.length - 1)) { //New Item
                    item.x = 0;
                    if (this._timers[index].isReady())
                        this._timers[index].start(NotifyMachine.TIME);
                }
                item.y = newY;

            }.bind(this));
        }

        _initItems() {
            SDK.times(this._maxItems, function () {
                this._items.push(null);
                this._timers.push(null);
            }.bind(this));
        }

        _configNewItem() {
            this._newItem.opacity = 0;
            if (this._mode == 'right') {
                this._newItem.x += (this.width + 2);
            } else
                this._newItem.x -= (this.width + 2);
        }

        _fadeIn(item) {
            if (item.opacity > 2) {
                item.opacity -= 2;
            }
        }

        _fadeOut(item) {
            if (item.opacity < (251)) {
                item.opacity += 4;
            }
        }

    }

    SDK.setConstant(NotifyMachine, 'TIME', 240);
    //END NotifyMachine
    //------------------------------------------------------------------------------
    AlphaABS.register(NotifyMachine);
})();
(function () {
  //PKD_Object_Bar
  //------------------------------------------------------------------------------
  class PKD_Object_Bar {
    constructor(bitmap) {
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

    setPosition(x, y, w, h) {
      this._rect = new Rectangle(x, y, w, h);
    }

    setValue(value) {
      if (value <= 0)
        value = 0;
      if (value > this._mValue)
        value = this._mValue;
      this._value = value;
    }

    getValue() {
      return this._value;
    }

    refresh() // 1.1
    {
      if (this._rect === undefined)
        return;
      this._draw_back_bar();
      if (this._mValue != 0)
        this._draw_main_bar();
    }

    //PARAMS
    //color , bColor, maxValue, value
    config(params) {
      this._color = params.color || Color.WHITE;
      this._bColor = params.bColor || Color.BLACK;
      this._mValue = params.maxValue || 0;
      this.setValue(params.value || 0);
    }

    setText(text, position) {
      switch (position) {
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

    allowGradient(isAllowed) {
      isAllowed = SDK.check(isAllowed, true);
      this._isGradient = isAllowed;
      if (this._isGradient)
        this._calculate_gradient();
    }

    update() {
      if (this._lValue == this._value)
        return; //No drawing if not changes
      this.refresh();
      this._lValue = this._value;
    }


    //PRIVATE
    _draw_back_bar() {
      this._bitmap.fillRect(this._rect.x, this._rect.y, this._rect.width, this._rect.height, this._bColor.CSS);
    }

    _draw_main_bar() {
      var width = Math.floor((100 * this._value / this._mValue) * (this._rect.width - 2) / 100);

      if (this._isGradient) {
        this._bitmap.gradientFillRect(this._rect.x + 1, this._rect.y + 1, width, this._rect.height - 2,
          this._color.CSS, this._gColor.CSS, false);
      } else {
        this._bitmap.fillRect(this._rect.x + 1, this._rect.y + 1, width, this._rect.height - 2, this._color.CSS);
      }

      var size = this._bitmap.fontSize;
      this._bitmap.fontFace = AlphaABS.SYSTEM.FONT;
      this._bitmap.fontSize = this._rect.height - 4;

      if (this._text_c != null)
        this._bitmap.drawText(this._text_c, this._rect.x + 2, this._rect.y, this._rect.width - 4, this._rect.height, 'center');
      if (this._text_l != null)
        this._bitmap.drawText(this._text_l, this._rect.x + 4, this._rect.y, this._rect.width - 8, this._rect.height, 'left');
      if (this._text_r != null)
        this._bitmap.drawText(this._text_r, this._rect.x + 2, this._rect.y, this._rect.width - 6, this._rect.height, 'right');
      this._bitmap.fontSize = size;
    }

    _calculate_gradient() {
      this._gColor = this._color.getLightestColor(230);
    }
  }
  //END PKD_Object_Bar
  //------------------------------------------------------------------------------

  AlphaABS.register(PKD_Object_Bar);

})();
(function () {
  //Scene_InterfaceEdit
  //------------------------------------------------------------------------------
  function Scene_InterfaceEdit() {
    this.initialize.apply(this, arguments);
  }

  Scene_InterfaceEdit.prototype = Object.create(Scene_Base.prototype);
  Scene_InterfaceEdit.prototype.constructor = Scene_InterfaceEdit;

  Scene_InterfaceEdit.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this._draw_background();
    this.createWindowLayer();

    AlphaABS.BattleUI.requestFreeMode();
    this._spritesetUI = new AlphaABS.LIBS.Spriteset_InterfaceABS();
    this.addChild(this._spritesetUI);
    this._spritesetUI.initABS();
    this._spritesetUI.setEditMode();
  };

  Scene_InterfaceEdit.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    //EXIT
    if (this.isExit()) {
      this._spritesetUI.terminate();
      this.popScene();
    }
  };

  Scene_InterfaceEdit.prototype.isExit = function () {
    return (Input.isTriggered('cancel') || TouchInput.isCancelled());
  };

  //RPIVATE
  Scene_InterfaceEdit.prototype._draw_background = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this._backgroundSprite.setBlendColor([16, 16, 16, 128]);
    this.addChild(this._backgroundSprite);
  };
  //END Scene_InterfaceEdit
  //------------------------------------------------------------------------------

  AlphaABS.register(Scene_InterfaceEdit);

})();
(function () {

  var LOG = new PLATFORM.DevLog("Scene_Map");
  var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;

  var _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
  Scene_Map.prototype.onMapLoaded = function () {
    _Scene_Map_onMapLoaded.call(this);
    BattleManagerABS.onMapLoaded();
    if ($gameMap.isABS()) {
      this._sVectors = []; //Vectors to delete from $gameMap
      this._spriteset.initABS();
      //Particle system
      try {
        if (BattleManagerABS.isABSParticleSystem()) {
          var sprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
          this._spriteset.addChildAtLayer(sprite, 1);
          this._pEngine = AlphaABS.LIBS.ABSPE.init(sprite.bitmap);
        } else {
          this._pEngine = null;
        }
      } catch (e) {
        console.error(e);
        this._pEngine = null;
      }

      if ($gameTemp.transferedByDeathABS == true) {
        SceneManager.goto(Scene_Gameover);
        return;
      }
    }
    $gameTemp.transferedByDeathABS = false;
  };

  var _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _Scene_Map_update.call(this);
    if ($gameMap.isABS()) {
      BattleManagerABS.updateABS();
      this._updateABS();
      if (AlphaABS.BattleUI.isUI()) {
        if (this._spriteset && this._spriteset._spritePlayerABS) {
          var p = this._spriteset._spritePlayerABS;
          AlphaABS.BattleUI.moveWeaponCircle(p.x, p.y - 24);
        }
      }
    }
  };

  var _Scene_Map_checkGameover = Scene_Map.prototype.checkGameover;
  Scene_Map.prototype.checkGameover = function () {
    if ($gameMap.isABS()) {
      //NOTHING! see Game_Player
    } else
      _Scene_Map_checkGameover.call(this);
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function () {
    if ($gameMap.isABS()) {
      AlphaABS.BattleUI.terminate();
      if (this._pEngine)
        this._pEngine.terminate();
    }
    _Scene_Map_terminate.call(this);
  };

  var _Scene_Map_stop = Scene_Map.prototype.stop;
  Scene_Map.prototype.stop = function () {
    if ($gameMap.isABS()) {
      BattleManagerABS.setPlayerTarget(null);
      $gamePlayer.prepareABS();
      if (AlphaABS.BattleUI.isUI())
        AlphaABS.BattleUI.getUI().hide();
    }
    _Scene_Map_stop.call(this);
  };

  //NEW
  Scene_Map.prototype._updateABS = function () {
    $gameMap.ABSParams().sVectors.forEach(function (item) {
      if (item) {
        if (item.isStarted()) {
          if (!item.isAlive()) {
            AlphaABS.BattleManagerABS.battleProcess().performPostBattleAction(item);
            LOG.p("Delete SVector from Map");
            this._sVectors.push(item);
          }
        } else {
          this._spriteset.addChild(item.sprite);
          item.start();
          try {
            if (item.hasEmitter() && this._pEngine)
              this._pEngine.addEmitter(item.emitter(), true);
          } catch (e) {
            console.error(e);
          }
        }
        item.update();
      }
    }.bind(this));

    if (this._sVectors.length > 0) {
      this._sVectors.forEach(function (item) {
        $gameMap.ABSParams().sVectors.delete(item);
      });
      this._sVectors = [];
    }
  };

  //OVER
  var _Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function () {

    if (!$gameMap.isABS()) {
      _Scene_Map_processMapTouch.call(this);
      return;
    }

    if (!$gamePlayer.inActive()) {
      return;
    }

    if (!$gamePlayer.canControl()) {
      return;
    }

    if (TouchInput.isCancelled()) {
      BattleManagerABS.setPlayerTarget(null);
      $gameMap.ABSParams().menuClickCount++;
    }

    if (TouchInput.isTriggered() || this._touchCount > 0) {
      if (TouchInput.isPressed()) {
        if (this._touchCount === 0 || this._touchCount >= 15) {

          if (AlphaABS.BattleUI.isWeaponCircleTouchedAny()) {
            return;
          }

          var indexT = AlphaABS.BattleUI.isTouched();
          if (indexT != null && indexT[1] != null) {
            if (indexT[0] == 'skill')
              $gamePlayer.touchSkillAt(indexT[1]);
            if (indexT[0] == 'panel')
              $gamePlayer.touchControlAt(indexT[1]);
          } else {
            var selected = null;
            var t = this._spriteset.spritesABS();
            for (var i = 0; i < t.length; i++) {
              if (t[i].isTouched()) {
                selected = t[i];
                break;
              }
            }

            var x = $gameMap.canvasToMapX(TouchInput.x);
            var y = $gameMap.canvasToMapY(TouchInput.y);

            if (selected && selected.character().inActive()) {
              if (selected.character() != BattleManagerABS.getPlayerTarget()) {
                BattleManagerABS.setPlayerTarget(selected.character());

                if (!selected.character().isAlly($gamePlayer))
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
  Scene_Map.prototype.isMenuCalled = function () {
    if ($gameMap.isABS())
      if (BattleManagerABS.getPlayerTarget() == null &&
        $gameMap.ABSParams().menuClickCount > 1) {
        return TouchInput.isCancelled() || Input.isTriggered('menu');
      } else
        return Input.isTriggered('menu');
    else
      return _Scene_Map_isMenuCalled.call(this);
  };

  //OVER
  Scene_Map.prototype.updateCallMenu = function () {
    if (this.isMenuEnabled()) {
      if (this.isMenuCalled()) {
        this.menuCalling = true;
      }
      if (this.menuCalling && !$gamePlayer.isMoving()) {
        if ($gamePlayer.inBattle()) {
          BattleManagerABS.alertNoInBattle();
          this.menuCalling = false;
        } else
          this.callMenu();
      }
    } else {
      this.menuCalling = false;
    }
  };

  var _Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
  Scene_Map.prototype.createSpriteset = function () {
    _Scene_Map_createSpriteset.call(this);
    if ($gameMap.isABS()) {
      this._spritesetUI = new AlphaABS.LIBS.Spriteset_InterfaceABS();
      this.addChild(this._spritesetUI);
      AlphaABS.BattleUI.setUI(this._spritesetUI);
    }
  };
})();
(function(){
  var LOG = new PLATFORM.DevLog("Spriteset_InterfaceABS");

  var ABSObject_PopUpMachine = AlphaABS.LIBS.ABSObject_PopUpMachine;
  var UIObject_Container;
  var ItemLineSprite = AlphaABS.LIBS.ItemLineSprite;
  var PointX = AlphaABS.UTILS.PointX;

  //Spriteset_InterfaceABS
  //------------------------------------------------------------------------------
    class Spriteset_InterfaceABS extends Sprite {
      constructor() {
        super();
        UIObject_Container = AlphaABS.LIBS.UIObject_Container;
        this.setFrame(0, 0, Graphics.width, Graphics.height);
        this._moveElements = [];
        this._free = false; //Can be edited
        this._isABS = false;
        this._needFree = $gameVariables.getUIParam('free') || false;
        this._showUI = $gameVariables.getUIParam('show');
        if(this._showUI == null) this._showUI = true;
        this._showUI = AlphaABS.Parameters.isUIVisible();
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
          this.spriteSkillPanel.showPanel();
      }

      hideSkillPanel() {
        if(this.spriteSkillPanel)
          this.spriteSkillPanel.hidePanel();
      }

      showControlPanel() {
        this.spriteControlPanel.showPanel();
      }

      hideControlPanel() {
        this.spriteControlPanel.hidePanel();
      }

      saveUIPattern() {
        var _items = {};
        this._moveElements.forEach(function(item) {
          _items[item[0]] = [item[1].x, item[1].y, item[1].visibleMode(), item[1].specialMode()];
        });
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

          }
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
        var parameters;
        var skillCtn = new UIObject_Container(0,0,342,48);
        skillCtn.addUI(this.spriteSkillPanel);
        skillCtn.setText("Skill panel", true);
        skillCtn.x = SDK.toCX(skillCtn.width);
        skillCtn.y = Graphics.height - skillCtn.height - 10;
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerSpellsPanel();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              skillCtn.x = posX;
            if(posY)
              skillCtn.y = posY;
          }
        }
        skillCtn.addVisButtton();
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerSpellsPanel();
          if(parameters.Visible)
            this.addChild(skillCtn);
        } else
          this.addChild(skillCtn);
        this._moveElements.push(['skillPanel',skillCtn]);
        this._layerSkillPanel = skillCtn; //For touch

        var userCtn = new UIObject_Container(0,0,242,98);
        userCtn.addUI(this.spriteUserUI);
        userCtn.setText("Player", true);
        userCtn.x = 6;
        userCtn.y = 4;
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerStatus();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              userCtn.x = posX;
            if(posY)
              userCtn.y = posY;
          }
        }
        userCtn.addVisButtton();
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerStatus();
          if(parameters.Visible)
            this.addChild(userCtn);
        } else
          this.addChild(userCtn);
        this._moveElements.push(['userPanel',userCtn]);

        var userCastBars = new UIObject_Container(0,0,150,80);
        userCastBars.addChild(this.spriteCastBar);
        userCastBars.addUI(this.spriteAttackBar);
        userCastBars.setText('Cast bar', false);
        userCastBars.x = userCtn.x + 10;
        userCastBars.y = userCtn.height + 24;
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerCastBar();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              userCastBars.x = posX;
            if(posY)
              userCastBars.y = posY;
          }
        }
        userCastBars.addVisButtton();
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerCastBar();
          if(parameters.Visible)
            this.addChild(userCastBars);
        } else
          this.addChild(userCastBars);
        this._moveElements.push(['userCastBars',userCastBars]);

        var targetUI = new UIObject_Container(0,0,180,100);
        targetUI.addChild(this.spriteTarget );
        targetUI.addUI(this.spriteTargetStatuses);
        targetUI.setText('Target', false);
        targetUI.x = 250;
        targetUI.y = 50;
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerTarget();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              targetUI.x = posX;
            if(posY)
              targetUI.y = posY;
          }
        }
        targetUI.addVisButtton();
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerTarget();
          if(parameters.Visible)
            this.addChild(targetUI);
        } else
          this.addChild(targetUI);
        this._moveElements.push(['targetUI',targetUI]);

        var controlPanel = new UIObject_Container(0,0,this.spriteControlPanel.width,this.spriteControlPanel.height);
        controlPanel.addUI(this.spriteControlPanel);
        controlPanel.setText('CP', false);
        controlPanel.x = 4;
        controlPanel.y = SDK.toCX(controlPanel.height, Graphics.height);

        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerHotBar();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              controlPanel.x = posX;
            if(posY)
              controlPanel.y = posY;
          }
        }

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
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerHotBar();
          if(parameters.Visible)
            this.addChild(controlPanel);
        } else
          this.addChild(controlPanel);
        this._moveElements.push(['controlPanel',controlPanel]);
        this._layerControlPanel = controlPanel; //For touch

        var alertBar = new UIObject_Container(0,0,this.spriteAlertLayer.width,this.spriteAlertLayer.height);
        alertBar.addUI(this.spriteAlertLayer);
        alertBar.setText("System messages", true);
        alertBar.x = SDK.toCX(alertBar.width);
        alertBar.y = Graphics.height - alertBar.height - this._layerSkillPanel.height - 4;
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerMessageBar();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              alertBar.x = posX;
            if(posY)
              alertBar.y = posY;
          }
          this.spriteAlertLayer.visible = parameters.Visible;
        }
        alertBar.addVisButtton();
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerMessageBar();
          if(parameters.Visible)
            this.addChild(alertBar);
        } else
          this.addChild(alertBar);
        this._moveElements.push(['alertBar',alertBar]);

        var statusBar = new UIObject_Container(0,0,180,100);
        statusBar.addUI(this.userStatusPanel);
        statusBar.setText("Player Statuses", true);
        statusBar.x = Graphics.width - statusBar.width - 4;
        statusBar.y = 4;
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerStates();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              statusBar.x = posX;
            if(posY)
              statusBar.y = posY;
          }
        }
        statusBar.addVisButtton();
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerStates();
          if(parameters.Visible)
            this.addChild(statusBar);
        } else
          this.addChild(statusBar);
        this._moveElements.push(['statusBar',statusBar]);

        var h = this.itemsBar.maxHeight();
        var itemsBarC = new UIObject_Container(Graphics.width - 124, (Graphics.height/2) - h/2, this.itemsBar.width, h);
        itemsBarC.addUI(this.itemsBar);
        itemsBarC.setText('Items', true);
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_ItemList();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              itemsBarC.x = posX;
            if(posY)
              itemsBarC.y = posY;
          }
        }
        itemsBarC.addVisButtton();
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_ItemList();
          if(parameters.Visible)
            this.addChild(itemsBarC);
        } else
          this.addChild(itemsBarC);
        this.itemsBar.refresh();
        this._moveElements.push(['itemsBar', itemsBarC]);
      }

      _createItemsBar() {
        this.itemsBar = new AlphaABS.LIBS.NotifyMachine(0,0,120,24,5);
      }

      _createSkillPanel() {
        this.spriteSkillPanel = new AlphaABS.LIBS.Sprite_SkillPanelABS();
        if($gamePlayer.battler().uiPanelObjectsCount() > 0)
          this.showSkillPanel();
        else
          this.hideSkillPanel();
      }

      _createControlPanel() {
        this.spriteControlPanel = new AlphaABS.LIBS.UIObject_ControlPanel();
        this.spriteControlPanel.createBaseItems();
        if(AlphaABS.Parameters.isLoaded()) {
          var parameters = AlphaABS.Parameters.get_UIE_PlayerHotBar();
          if(parameters.Orientation && parameters.Orientation == 'Horizontal') {
            this.spriteControlPanel.transfer();
          }
        }
      }

      _checkLayerTouch(layer) {
        var rect = new Rectangle(layer.x, layer.y, layer.width, layer.height);
        return AlphaABS.UTILS.SMath.inRect(new PointX(TouchInput.x, TouchInput.y), rect);
      }

      _createTargetUI() {
        this.spriteTarget = new AlphaABS.LIBS.Sprite_EnemyUI();

        this.spriteTargetStatuses = new AlphaABS.LIBS.Sprite_EnemyStatusBar(this.spriteTarget.width, 24);
        this.spriteTargetStatuses.y = this.spriteTarget.height + 2;
        this.spriteTargetStatuses.setLimit(6);

        this.popUpMachineTarget = new ABSObject_PopUpMachine(0, 0, this.spriteTarget.width - 60, 1, this.spriteTarget);
        this.popUpMachineTarget2 = new ABSObject_PopUpMachine(0, -20, this.spriteTarget.width - 60, 1, this.spriteTarget);
        this.popUpMachineTarget.setEffectSettings(ABSObject_PopUpMachine.SETTINGS);
      }

      _createUserUI() {
        var userUiBackground = null;
        if(AlphaABS.Parameters.isLoaded()) {
          var parameters = AlphaABS.Parameters.get_UIE_PlayerStatus();
          userUiBackground = parameters.Background;
        }

        this.spriteUserUI = new AlphaABS.LIBS.Sprite_UserUI(userUiBackground);
        this.popUpMachineUser = new ABSObject_PopUpMachine(6, 12, this.spriteUserUI.faceSize, 1, this.spriteUserUI);
        this.popUpMachineUser2 = new ABSObject_PopUpMachine(6, 12, 200, 1, this.spriteUserUI);
        this.popUpMachineUser.setEffectSettings(ABSObject_PopUpMachine.SETTINGS);

        this.spriteAttackBar = new AlphaABS.LIBS.UIObject_BarAttackReload(140,40);
        this.spriteCastBar = new AlphaABS.LIBS.UIObject_BarUserCast(150,36);
      }

      _createUserStatusBar() {
        this.userStatusPanel = new AlphaABS.LIBS.UIObject_UserStatusBar(4);
      }

      _createAlertBar() {
        this.spriteAlertLayer = new Sprite();
        this.spriteAlertLayer.setFrame(0,0,Graphics.width/2,60);
        this.popUpMachine = new ABSObject_PopUpMachine(0, 0, this.spriteAlertLayer.width, 3, this.spriteAlertLayer);
        this.popUpMachine.setEffectSettings([1.0, false, 0]);
        this.popUpMachine.setUpMode();
      }

      _createFavWeapCircle() {
        this._sCircle = new AlphaABS.LIBS.UIObject_InputCircle_FW($gamePlayer.battler(), function(index) {$gamePlayer.touchWeaponAt(index);});
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
    //END Spriteset_InterfaceABS
  //------------------------------------------------------------------------------

  AlphaABS.register(Spriteset_InterfaceABS);

})();

(function () {
  var LOG = new PLATFORM.DevLog("Spriteset_Map");
  //Spriteset_Map
  //------------------------------------------------------------------------------
  var Sprite_CharacterABS;
  var SMouse = AlphaABS.UTILS.SMouse;

  //OVER
  Spriteset_Map.prototype.createCharacters = function () {
    LOG.p("createCharacters");
    Sprite_CharacterABS = AlphaABS.LIBS.Sprite_CharacterABS;

    this._characterSprites = [];
    this._characterSpritesABS = [];
    this._spritePlayerABS = null;

    $gameMap.events().forEach(function (event) {
      if (event instanceof Game_AIBot) {
        var t = new Sprite_CharacterABS(event, 0);
        this._characterSprites.push(t);
        this._characterSpritesABS.push(t);
      } else
        this._characterSprites.push(new Sprite_Character(event));
    }, this);
    $gameMap.vehicles().forEach(function (vehicle) {
      this._characterSprites.push(new Sprite_Character(vehicle));
    }, this);

    if ($gameMap.isABS()) {
      $gamePlayer.followers().forEach(function (f) {
        var t = new Sprite_CharacterABS(f, 2);
        this._characterSprites.push(t);
        this._characterSpritesABS.push(t);
      }, this);
    } else {
      $gamePlayer.followers().reverseEach(function (follower) {
        this._characterSprites.push(new Sprite_Character(follower));
      }, this);
    }

    var t = new Sprite_CharacterABS($gamePlayer, 1);
    this._characterSprites.push(t);
    this._spritePlayerABS = t;

    for (var i = 0; i < this._characterSprites.length; i++) {
      this._tilemap.addChild(this._characterSprites[i]);
    }
  };

  var _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
  Spriteset_Map.prototype.initialize = function () {
    _Spriteset_Map_initialize.call(this);
    this._absParams = {};
    this._absParams.animationSprites = [];
    this._absParams.targetConfig = false;
  };

  //NEW
  Spriteset_Map.prototype.spritesABS = function () {
    return this._characterSpritesABS;
  };

  //NEW
  Spriteset_Map.prototype.initABS = function () {
    this.spritesABS().forEach(function (item) {
      item.initABS();
    });
    this._spritePlayerABS.initABS();
  };

  //NEW
  Spriteset_Map.prototype.spritePlayerABS = function () {
    return this._spritePlayerABS;
  };

  var _Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function () {
    _Spriteset_Map_update.call(this);
    if ($gameMap.isABS()) {
      this._setupAnimationABS();
      this._updateAnimationABS();
      this._setupPlayerTargetCircle();
    }
  };

  //PRIVATE
  Spriteset_Map.prototype._setupAnimationABS = function () {
    if ($gameMap.ABSParams().animationABS != null) {
      var anim = $dataAnimations[$gameMap.ABSParams().animationABS.id];
      this._startAnimationABS($gameMap.ABSParams().animationABS.sprite, anim, false, 0);
      $gameMap.ABSParams().animationABS = null;
    }
  };

  Spriteset_Map.prototype._setupPlayerTargetCircle = function () {
    if (!$gameMap.isABS()) return;
    if (!this._absParams) return;
    if (!this._absParams.spriteTargetCircle) {
      //LOG.p("MAP : Target sprite created!");
      this._absParams.spriteTargetCircle = new Sprite(ImageManager.loadPictureABS('RadiusSelect'));
      this.addChildAtLayer(this._absParams.spriteTargetCircle, -1);
      this._absParams.spriteTargetCircle.anchor.x = 0.5;
      this._absParams.spriteTargetCircle.anchor.y = 0.5;
      this._absParams.spriteTargetCircle.visible = false;
    }
    if ($gameMap.ABSParams().targetCircle != null) {
      if (!this._absParams.targetConfig) {

        var r = $gameMap.ABSParams().targetCircle.radius;

        this._absParams.spriteTargetCircle.scale.x = 0.4 * r;
        if (r > 3)
          this._absParams.spriteTargetCircle.scale.x += (r - 3) * 0.2;
        this._absParams.spriteTargetCircle.scale.y = this._absParams.spriteTargetCircle.scale.x;

        var t3 = SMouse.getMousePosition();
        this._absParams.spriteTargetCircle.x = t3.x;
        this._absParams.spriteTargetCircle.y = t3.y;
        this._absParams.targetConfig = true;
      }

      var t = this._absParams.spriteTargetCircle;
      var t2 = SMouse.getMousePosition();
      if ($gameMap.ABSParams().targetCircleNeedLock) {
        t2 = new AlphaABS.UTILS.PointX(TouchInput.x, TouchInput.y);
      }

      var color = Color.GREEN;
      if (AlphaABS.UTILS.distanceTo($gamePlayer, t2.clone().convertToMap()) > $gameMap.ABSParams().targetCircle.range) {
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
  };

  Spriteset_Map.prototype.addChildAtLayer = function (sprite, layerIndex) {
    switch (layerIndex) {
      case 0: //HEAD
        this._tilemap.addChild(sprite);
        break;
      case 1: //CENTER
        if (this._tilemap._upperLayer)
          this._tilemap._upperLayer.addChild(sprite);
        else
          this._tilemap.addChild(sprite);
        //else
        //  this._tilemap.upperLayer.children[0].addChild(sprite);
        break;
      case 2: //FEET
        sprite.z = 1;
        if (this._tilemap._lowerLayer)
          this._tilemap._lowerLayer.addChild(sprite);
        else
          this._tilemap.addChild(sprite);
        break;
      default: //SCREEN
        this.addChild(sprite);
        break;
    }
  };

  Spriteset_Map.prototype._startAnimationABS = function (target, animation, mirror, delay) {
    var sprite = new Sprite_Animation();
    sprite.setup(target, animation, mirror, delay);
    sprite.setABSModeMap();
    if (animation)
      this.addChildAtLayer(sprite, animation.position);
    this._absParams.animationSprites.push(sprite);
  };

  Spriteset_Map.prototype._updateAnimationABS = function () {
    if (!this._absParams) return;
    if (this._absParams.animationSprites.length > 0) {
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
  };
})();
(function () {
  var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;
  //Sprite_Animation
  //------------------------------------------------------------------------------
  //NEW
  Sprite_Animation.prototype.setABSMode = function () {
    this._absMode = true;
  };

  Sprite_Animation.prototype.setABSModeMap = function () {
    this._absMode = true;
    this._absModeMap = true;
    this._mapPoint = null;
  };

  var pkd_SpriteAnimation_updatePosition = Sprite_Animation.prototype.updatePosition;
  Sprite_Animation.prototype.updatePosition = function () {
    try {
      if (this._absMode && !this._absModeMap) {
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
        if (this._animation.position === 2) { //FEET
          this.y -= 32;
        }
      } else if (this._absMode && this._absModeMap) {
        if (this._animation.position == 3) {
          this.x = this.parent.width / 2;
          this.y = this.parent.height / 2;
        } else {
          if (!this._mapPoint) {
            this._mapPoint = new AlphaABS.UTILS.PointX(this._target.x, this._target.y);
            this._mapPoint.convertToMap();
          }

          var mapPoint = this._mapPoint.mapPointOnScreen();
          this.x = mapPoint.x + 24; //Why, I don't find!
          this.y = mapPoint.y + 24;
        }
      } else {
        pkd_SpriteAnimation_updatePosition.call(this);
      }
    } catch (e) {
      console.error(e);
    }
  };

  var pkd_SpriteAnimation_updateCellSprite = Sprite_Animation.prototype.updateCellSprite;
  Sprite_Animation.prototype.updateCellSprite = function (sprite, cell) {
    pkd_SpriteAnimation_updateCellSprite.call(this, sprite, cell);
    if (this._absMode) {
      var pattern = cell[0];
      if (pattern >= 0) {
        sprite.x = 0;
        sprite.y = 0;
        var t = 4;
        if (this._absModeMap) {
          t = 2;
        }
        if (this._animation.position != 3) {
          sprite.scale.x = (sprite.scale.x / t);
          sprite.scale.y = (sprite.scale.y / t);
        }
      }
    }
  };

  var _Sprite_Animation_initMembers = Sprite_Animation.prototype.initMembers;
  Sprite_Animation.prototype.initMembers = function () {
    _Sprite_Animation_initMembers.call(this);
    this._lightDuration = null;
    this._lightPoint = null;
    //this._lightColor = '#FFFFFF';
  };

  var _Sprite_Animation_startFlash = Sprite_Animation.prototype.startFlash;
  Sprite_Animation.prototype.startFlash = function (color, duration) {
    _Sprite_Animation_startFlash.call(this, color, duration);

    try {
      if (!BattleManagerABS.isABSLightingExt() || !this._absMode) return;
      if (this._lightPoint != null) {
        this._deleteLight();
      }
      this._lightDuration = duration;
      if (this._absModeMap)
        this._lightPoint = new AlphaABS.UTILS.PointX(this.x - 48, this.y - 48);
      else
        this._lightPoint = new AlphaABS.UTILS.PointX(this.x, this.y);
      this._lightPoint.convertToMap();
      var lightColor = new PLATFORM.Color(color[0], color[1], color[2]);
      $gameMap.setLight(this._lightPoint.x, this._lightPoint.y, 150, lightColor.hex(), 0, true);
    } catch (e) {
      console.error(e);
    }
  };

  var _Sprite_Animation_updateFlash = Sprite_Animation.prototype.updateFlash;
  Sprite_Animation.prototype.updateFlash = function () {
    _Sprite_Animation_updateFlash.call(this);

    if (this._lightDuration == null) return;
    this._lightDuration--;
    if (this._lightDuration <= 1) {
      this._deleteLight();
    }
  };

  var _Sprite_Animation_remove = Sprite_Animation.prototype.remove;
  Sprite_Animation.prototype.remove = function () {
    _Sprite_Animation_remove.call(this);
    if (this._lightDuration || this._lightPoint) {
      this._deleteLight();
    }
  };

  //NEW
  Sprite_Animation.prototype._deleteLight = function () {
    if (this._lightPoint) {
      $gameMap.deleteLight(this._lightPoint.x, this._lightPoint.y);
      this._lightPoint = null;
    }
    this._lightDuration = null;
  };
  //END Sprite_Animation
  //------------------------------------------------------------------------------

})();
(function () {
  class Sprite_CastProgress extends Sprite {
    constructor(width, height) {
      super(new Bitmap(width, height));
      this._timer = null;
      this._bar = new AlphaABS.LIBS.PKD_Object_Bar(this.bitmap);
      this._bar.setPosition(0, 0, width, height);
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
      if (!this.bitmap) return;
      if (!this._timer) return;

      var t = this._timer.getMaxValue();
      var t2 = this._timer.getValue();
      this._bar._mValue = t;
      this._bar.setValue(t2);
      if (this._needText)
        this._bar.setText(AlphaABS.UTILS.framesToTimeA(t - t2), 'center');
      this._bar.update();

      if (this._timer.isReady()) {
        this.cancel();
      }
    }
  }

  AlphaABS.register(Sprite_CastProgress);

})();
(function () {

  var Consts = AlphaABS.SYSTEM;

  var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;
  var PointX = AlphaABS.UTILS.PointX;


  //Sprite_CharacterABS
  //------------------------------------------------------------------------------
  function Sprite_CharacterABS() {
    this.initialize.apply(this, arguments);
  }

  Sprite_CharacterABS.prototype = Object.create(Sprite_Character.prototype);
  Sprite_CharacterABS.prototype.constructor = Sprite_CharacterABS;

  Sprite_CharacterABS.MOTIONS = {
    none: {
      index: 0,
      loop: true
    },
    sleep: {
      index: 17,
      loop: true
    }
  };

  Sprite_CharacterABS.prototype.initialize = function (character, type) {
    Sprite_Character.prototype.initialize.call(this, character);
    this._absParams = {};
    this._absParams.type = type;
    this._absParams.damages = [];
  };

  Sprite_CharacterABS.prototype.isAlly = function () {
    return this._absParams.type == 2;
  };

  Sprite_CharacterABS.prototype.isEnemy = function () {
    return this._absParams.type == 0;
  };

  Sprite_CharacterABS.prototype.isPlayer = function () {
    return this._absParams.type == 1;
  };

  Sprite_CharacterABS.prototype.ABSParams = function () {
    return this._absParams;
  };

  Sprite_CharacterABS.prototype.update = function () {
    Sprite_Character.prototype.update.call(this);
    this._updateABS();
      if(this.isAlly()) {
        
      }
  };

  Sprite_CharacterABS.prototype.toPoint = function () {
    return new PointX(this.x, this.y);
  };

  Sprite_CharacterABS.prototype.isTouched = function () {
    return AlphaABS.UTILS.SMath.inRect(new PointX(TouchInput.x, TouchInput.y), this._getRectangle());
  };

  Sprite_CharacterABS.prototype.character = function () {
    return this._character;
  };

  Sprite_CharacterABS.prototype.initABS = function () {
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

    if (!this.isPlayer()) {
      this._effectType = null;
      this._effectDuration = 0;
      this._shake = 0;
    } else {
      this._stateIconSprite.setPriority(90);
    }
  };

  //PRIVATE
  Sprite_CharacterABS.prototype._updateABS = function () {
    if (!this._isABS) return;
    if (this._character.battler() == null) return;

    if (this.isEnemy()) {
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
  };

  Sprite_CharacterABS.prototype._updateEffect = function () {
    var t = this._character.battler();

    if (t.isEffectRequested()) { //setupEffect
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
  };

  Sprite_CharacterABS.prototype._startEffect = function (effectType) {
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
  };

  Sprite_CharacterABS.prototype._updateStateSprite = function () {
    this._stateIconSprite.y = -Math.round((this.patternHeight() + 40) * 0.9);
    if (this._stateIconSprite.y < 20 - this.y) {
      this._stateIconSprite.y = 20 - this.y;
    }

    this._stateIconSprite.visible = this._character.inActive();
  };

  Sprite_CharacterABS.prototype._updateDamagePopup = function () {
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

  Sprite_CharacterABS.prototype._setupSelection = function () {
    if (!this._absParams.spriteSelect) {
      var selectedBitmap = null;
      var blendColor = Color.RED.ARR;
      if (this.isAlly())
        blendColor = Color.BLUE.ARR;
      if (AlphaABS.Parameters.isLoaded()) {
        var parameters = AlphaABS.Parameters.get_UIE_PlayerTarget();
        selectedBitmap = parameters.Selected_Image;
        if (parameters.Selected_Color) {
          var color = parameters.Selected_Color;
          color = PLATFORM.Color.FromHex(color);
          blendColor = color.ARR;
        }
      } else {
        selectedBitmap = ImageManager.loadPictureABS('Target');
      }
      this._absParams.spriteSelect = new Sprite(selectedBitmap);
      var t = this._absParams.spriteSelect;
      t.visible = false;
      t.anchor.x = 0.5;
      t.anchor.y = 0.5;
      t.setBlendColor(blendColor);
      t.opacity = 200;
      t.z = 0;
      this.parent.addChild(t);
    }

    this._absParams.spriteSelect.visible = this._character.ABSParams().selected;
    this._absParams.spriteSelect.x = this.x;
    this._absParams.spriteSelect.y = this.y;
  
    if (this.isAlly()) {
      this._absParams.spriteSelect.visible = this._character.isSelected();
    }
  
  };

  Sprite_CharacterABS.prototype._setupDebugInfo = function () {
    var t;
    if (!this._absParams.spriteDebug1) {
      t = this._character.ABSParams();

      var bitmap = new Bitmap(t.viewRadius * 64, t.viewRadius * 64);
      bitmap.drawCircle(bitmap.width / 2, bitmap.height / 2, bitmap.width / 2, Color.BLUE.CSS);

      this._absParams.spriteDebug1 = new Sprite(bitmap);
      this._absParams.spriteDebug1.z = 0;
      this._absParams.spriteDebug1.opacity = 64;
      this._absParams.spriteDebug1.anchor.x = 0.5;
      this._absParams.spriteDebug1.anchor.y = 0.5;
      this.parent.addChild(this._absParams.spriteDebug1);

      bitmap = new Bitmap(t.returnRadius * 64, t.returnRadius * 64);
      bitmap.drawCircle(bitmap.width / 2, bitmap.height / 2, bitmap.width / 2, Color.RED.CSS);

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

    t = this._character.ABSParams();
    if (t.myHomePosition) {
      this._absParams.spriteDebug2.x = t.myHomePosition.screenX();
      this._absParams.spriteDebug2.y = t.myHomePosition.screenY();
    } else {
      this._absParams.spriteDebug2.x = this.x;
      this._absParams.spriteDebug2.y = this.y;
    }
  };

  Sprite_CharacterABS.prototype._setupMotion = function () {
    if (this._character.isMotionRequested()) {
      if (!this._motionSprite) {
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
  };

  Sprite_CharacterABS.prototype.startMotion = function (motionType) {
    var newMotion = Sprite_CharacterABS.MOTIONS[motionType];
    if (newMotion.index == 0) {
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

  Sprite_CharacterABS.prototype._updateMotion = function () {
    if (this._motion) {
      var bitmap = this._motionSprite.bitmap;
      var motionIndex = this._motion ? this._motion.index : 0;
      var pattern = this._pattern < 3 ? this._pattern : 1;
      var cw = bitmap.width / 9;
      var ch = bitmap.height / 6;
      var cx = Math.floor(motionIndex / 6) * 3 + pattern;
      var cy = motionIndex % 6;
      this._motionSprite.setFrame(cx * cw, cy * ch, cw, ch);
      this._motionSprite.x = this._character.screenX();
      this._motionSprite.y = this._character.screenY();
    }
  };


  //TODO:Объекты POPUP и машины устарели!!!
  Sprite_CharacterABS.prototype._setupPopUpExp = function () {
    if (!this._absParams.popUpMachineExp) {
      this._absParams.popUpMachineExp = new ABS.ABSObject_PopUpMachine(0, 0, this.patternWidth(), 4, this.parent);
      this._absParams.popUpMachineExp.setUpMode();
    }

    this._absParams.popUpMachineExp.update();

    if (this._character.isExpPopupRequested()) {
      var t = this._character.getExpPopup();
      this._absParams.popUpMachineExp.push(ABS.PopInfoManagerABS.EXP(t));
      var point = this._getCornerPoint();
      this._absParams.popUpMachineExp.move(point.x, point.y - 32);
      this._character.clearExpPopup();
    }
  };

  Sprite_CharacterABS.prototype._setupPopUp = function () {
    var items = this._character.battler().getInfoPops();
    if (items.length != 0) {
      for (var j = 0; j < items.length; j++) {
        var item = items[j];
        this._pushPopOnUI(item);
      }
    }
    this._character.battler().clearInfoPops();
  };

  Sprite_CharacterABS.prototype._pushPopOnUI = function (item) {
    if (this.isPlayer()) {
      AlphaABS.BattleUI.addPopUpForPlayer(item);
    } else {
      AlphaABS.BattleUI.addPopUpForTarget(this.character(), item);
    }
  };

  Sprite_CharacterABS.prototype._setupAnimationABS = function () {
    if (this._character.ABSParams().animationABS > 0) {
      var anim = $dataAnimations[this._character.ABSParams().animationABS];
      this._character.ABSParams().animationABS = 0;
      this._startAnimationABS(anim, false, 0);
    }
  };

  Sprite_CharacterABS.prototype._setupAnimationCastABS = function () {
    if (this._character.isCasting()) {
      if (!this._animationCast) {
        this._createAnimataionCast();
      } else {
        if (!this._animationCast.isPlaying()) {
          this._animationCast.remove();
          this._createAnimataionCast();
        }
      }

    } else {
      if (this._animationCast) {
        this._animationCast.remove();
        this._animationCast = null;
        if (this._animationCastAudio) {
          this._animationCastAudio.stop();
          this._animationCastAudio = null;
        }
      }
    }
  };

  Sprite_CharacterABS.prototype._createAnimataionCast = function () {
    this._animationCast = new Sprite_Animation();

    var anim = null;
    var own = false;

    if (this._character.ABSParams().currentAction.castAnim > 0) {
      anim = $dataAnimations[this._character.ABSParams().currentAction.castAnim];
      own = true;
    } else {
      anim = AlphaABS.Parameters.get_CastAnimation();
    }

    this._animationCast.setup(this._effectTarget, anim, false, 0);
    this._animationCast.setABSMode();
    this.parent.addChild(this._animationCast);
    if (!this._animationCastAudio) {
      var se = AlphaABS.Parameters.get_CastAnimationSE();
      if (se != null && own == false) {
        var point = this._character.toPoint();
        this._animationCastAudio = AudioManager.playSeLoopAt(se, point.mapPointOnScreen());
      }
    }
  };

  Sprite_CharacterABS.prototype._setupDamagePopup = function () {
    var t = this._character.battler();
    if (t && t.isDamagePopupRequested()) {
      var sprite = new Sprite_Damage();
      sprite.x = this.x;
      sprite.y = this.y - this.patternHeight() - 10;
      sprite.setup(t);
      sprite.scale.x = 0.6;
      sprite.scale.y = 0.6;
      this._absParams.damages.push(sprite);
      this.parent.addChild(sprite);
      t.clearDamagePopup();
      t.clearResult();
    }
  };

  Sprite_CharacterABS.prototype._setupWeaponAnimation = function () {
    if (!this._absParams.spriteWeapon) {
      this._absParams.spriteWeapon = new Sprite_Weapon();
      this.addChild(this._absParams.spriteWeapon);
    }

    var t = this.character().battler();
    if (t && t.isWeaponAnimationRequested()) {
      this._absParams.spriteWeapon.setup(t.weaponImageId());
      this._absParams.spriteWeapon.setDirectionABS(AlphaABS.UTILS.getDirKey(this.character()));
      t.clearWeaponAnimation();
    }
  };

  Sprite_CharacterABS.prototype._startAnimationABS = function (animation, mirror, delay) {
    var sprite = new Sprite_Animation();
    sprite.setup(this._effectTarget, animation, mirror, delay);
    sprite.setABSMode();
    this.parent.addChild(sprite);
    this._animationSprites.push(sprite);
  };

  Sprite_CharacterABS.prototype._getCornerPoint = function () { //Левый верхний угол спрайта
    var p1 = this.x - (this.patternWidth() / 2);
    var p2 = this.y - this.patternHeight();
    return new PointX(p1, p2);
  };

  Sprite_CharacterABS.prototype._getRectangle = function () { //Прямоугольник, содержащий спрайт
    var p = this._getCornerPoint();
    return new Rectangle(p.x, p.y, this.patternWidth(), this.patternHeight());
  };

  Sprite_CharacterABS.prototype._getCenterPoint = function () { //Центральная точка
    return new PointX(this.x, this.y - this.patternHeight() / 2);
  };

  //END Sprite_CharacterABS
  //------------------------------------------------------------------------------

  AlphaABS.register(Sprite_CharacterABS);

})();
(function () {

  class Sprite_EnemyStatusBar extends Sprite {
    constructor(width, height) {
      super(new Bitmap(width, height));
      this._createSprites();
      this.setTarget(null);
      this._limit = 0;
      this._iconSize = 20;

      this._thread = setInterval(function () {
        this._updateABS();
      }.bind(this), 200);
    }

    refresh() {
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
      if (target) {
        this.refresh();
      } else {
        this.visible = false;
      }
    }

    //PRIVATE
    _createSprites() {}

    _drawItems() {
      try {
        var icons = this.target.battler().allIcons();
        if (icons.length == 0) {
          this.visible = false;
          return;
        } else {
          this.visible = true;
        }

        var size = (this._limit == 0) ? icons.length : this._limit;
        size = this._limit > icons.length ? icons.length : this._limit;
        for (var i = 0; i < size; i++) {
          SDK.drawIcon(this._xVal(i), 0, icons[i], this.bitmap, this._iconSize);
        }
      } catch (e) {
        console.error(e);
      }
    }

    _xVal(index) {
      return index * (this._iconSize + 2);
    }

    _updateABS() {
      if (this.target) {
        this.refresh();
      }
    }
  }

  AlphaABS.register(Sprite_EnemyStatusBar);

})();
(function () {
  class Sprite_EnemyUI extends Sprite {
    constructor() {
      super(new Bitmap(180, 70));
      this._loadParameters();
      this._createSprites();
      this.setTarget(null);

      this._thread = setInterval(function () {
        this._updateABS();
      }.bind(this), 10);
    }

    _loadParameters() {
      this.pluginParameters = null;
      if (AlphaABS.Parameters.isLoaded()) {
        this.pluginParameters = AlphaABS.Parameters.get_UIE_PlayerTarget();
      }
    }

    infoWidth() {
      return 120;
    }

    refresh() {
      if (this.target) {
        this.hpGauge.setBattler(this.target.battler());
      }

      this.spriteInfo.bitmap.clear();
      this.spriteInfo.bitmap.fontSize = 18;
      this.spriteInfo.bitmap.drawText(this.target.battler().name(), 0, 0, this.spriteInfo.bitmap.width, 20, 'left');
    }

    terminate() {
      this.castBar.terminate();
      clearInterval(this._thread);
    }


    setTarget(target) {
      this.target = target;
      if (target) {
        this.spriteMask.stopMask();
        this.refresh();
        if (this.pluginParameters)
          this.visible = this.pluginParameters.Visible;
        else
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
      this.spriteBackground = new Sprite(new Bitmap(this.bitmap.width, this.bitmap.height));
      var backgroundColor = Color.BLACK.CSS;
      if (this.pluginParameters) {
        backgroundColor = this.pluginParameters.Back_color || backgroundColor;
      }
      this.spriteBackground.bitmap.fillRect(0, 0, this.infoWidth(), this.bitmap.height, backgroundColor);
      this.spriteBackground.opacity = 120;

      this.spriteInfo = new Sprite(new Bitmap(this.infoWidth() - 40, 22));
      this.spriteInfo.x = 10;
      this.spriteInfo.y = 5;
      if (this.pluginParameters) {
        if (this.pluginParameters['Font Name'])
          this.spriteInfo.bitmap.fontFace = this.pluginParameters['Font Name'];
        this.spriteInfo.visible = this.pluginParameters.Name;
      }

      this.spriteBarHp = new Sprite(new Bitmap(this.infoWidth() - 20, 18));
      this.spriteBarHp.x = 10;
      this.spriteBarHp.y = 28;

      this.hpGauge = this._createHpGauge();
      this.spriteBarHp.addChild(this.hpGauge);

      this.spriteInfo_Battle = new Sprite(ImageManager.loadPictureABS('InBattleIcon'));
      this.spriteInfo_Battle.anchor.y = 0.5;
      this.spriteInfo_Battle.x = this.infoWidth() - 24;
      this.spriteInfo_Battle.y = 12;
      this.spriteInfo_Battle.visible = false;

      this.castBar = new AlphaABS.LIBS.Sprite_CastProgress(this.infoWidth() - 20, 14);
      this.castBar.x = 10;
      this.castBar.y = 48;

      var maskBitmap = null;
      if (this.pluginParameters) {
        maskBitmap = this.pluginParameters.Mask;
      } else {
        maskBitmap = ImageManager.loadPictureABS('EnemyUIMask');
      }
      this.spriteMask = new AlphaABS.LIBS.Sprite_Mask(ImageManager.loadPictureABS('EnemyUIMask'));
      this.spriteMask.x = -3;
      this.spriteMask.y = -3;
      this.spriteMask.setParams(220);

      this.addChild(this.spriteMask);
      this.addChild(this.spriteBackground);
      this.addChild(this.spriteInfo);
      this.addChild(this.spriteBarHp);
      this.addChild(this.spriteInfo_Battle);
      this.addChild(this.castBar);
    }

    _createHpGauge() {
      var hpGauge = new AlphaABS.LIBS.UI_GaugeABS_HPE(this.spriteBarHp.width, this.spriteBarHp.height);
      if (this.target)
        hpGauge.setBattler(this.target.battler());
      if (this.pluginParameters) {
        hpGauge.applyPluginParameters(this.pluginParameters['HP Bar']);
        hpGauge.setShowInPercent(this.pluginParameters.HP_text == '%');
      }
      return hpGauge;
    }

    _updateABS() {
      if (this.target) {
        this.spriteBarHp.update();
        this.castBar.update();
        this.spriteMask.update();

        if (this.target.inBattle()) {
          this.spriteMask.showMaskOne(20);
          this.spriteInfo_Battle.visible = true;
        } else {
          this.spriteInfo_Battle.visible = false;
        }

        if (this.target.ABSParams().casting) {
          if (!this.castBar._timer)
            this.castBar.visible = true;
          this.castBar.start(this.target.ABSParams().currentAction.timer);
        } else {
          this.castBar.cancel();
          this.castBar.visible = false;
        }
      }
    }
  }

  AlphaABS.register(Sprite_EnemyUI);

})();
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Ext.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    var LOG = new PLATFORM.DevLog("Sprite_Ext");
    var ABSUtils = AlphaABS.UTILS;

    function Sprite_Ext() {
        this.initialize.apply(this, arguments);
    }

    Sprite_Ext.prototype = Object.create(Sprite_Base.prototype);
    Sprite_Ext.prototype.constructor = Sprite_Ext;

    Sprite_Ext.prototype.initialize = function () {
        Sprite_Base.prototype.initialize.call(this);
        this._free = false; //Can be moved

        this._lastMousePoint = null; //Prev Mouse x,y (PointX)
        this._newMousePoint = null; //New Mouse x,y (PointX)
        this._touched = false; //Mouse pressed on this Sprite
    };

    Sprite_Ext.prototype.update = function () {
        Sprite_Base.prototype.update.call(this);
        this._updateMove();
    };

    //NEW
    Sprite_Ext.prototype.free = function () {
        this._free = true;
        this.onFree();
    };

    Sprite_Ext.prototype.onFree = function () {

    };

    Sprite_Ext.prototype.onFreeze = function () {

    };

    Sprite_Ext.prototype.onStartMove = function () {

    };

    Sprite_Ext.prototype.onEndMove = function () {

    };

    Sprite_Ext.prototype.canMove = function () {
        return (this._free == true);
    };

    Sprite_Ext.prototype.freeze = function () {
        this._free = false;
        if (this._touched) {
            this._endMove();
        }
        this.onFreeze();
    };

    //PRIVATE
    Sprite_Ext.prototype._updateMove = function () {
        if (this.canMove()) {
            this._updateTouch();
            if (this._touched) {
                this._updateMovePlace();
            } else
                this._newMousePoint = null;
        }
    };

    Sprite_Ext.prototype._updateTouch = function () {
        if (TouchInput.isTriggered()) {
            if (this._touched) {
                this._endMove();
            } else {
                LOG.p("Mouse at " + new ABSUtils.PointX(TouchInput.x, TouchInput.y));
                if (ABSUtils.SMath.inRect(new ABSUtils.PointX(TouchInput.x, TouchInput.y), this._myRectangle())) {
                    this._startMove();
                }
            }
        }
    };

    Sprite_Ext.prototype._updateMovePlace = function () {
        this._lastMousePoint = this._newMousePoint;

        LOG.p("Update placement");
        var mp = ABSUtils.SMouse.getMousePosition();
        var mx = mp.x;
        var my = mp.y;

        if (mx == 0 && my == 0) {
            mx = TouchInput.x;
            my = TouchInput.y;
        }

        this._newMousePoint = new ABSUtils.PointX(mx, my);

        if (this._lastMousePoint != null) {
            var dx = mx - this._lastMousePoint.x;
            var dy = my - this._lastMousePoint.y;
            this.move(this.x + dx, this.y + dy);
        }
    };

    Sprite_Ext.prototype._myRectangle = function () {
        var x = ABSUtils.toGlobalCoord(this, 'x');
        var y = ABSUtils.toGlobalCoord(this, 'y');
        return new Rectangle(x, y, this.width, this.height);
    };

    Sprite_Ext.prototype._startMove = function () {
        LOG.p("Start moving");
        this._touched = true;
        this.onStartMove();
        if (!ABSUtils.SMouse.isTracked())
            ABSUtils.SMouse.setTrack(true);
    };

    Sprite_Ext.prototype._endMove = function () {
        LOG.p("End moving");
        this._touched = false;
        this.onEndMove();
    };

    AlphaABS.register(Sprite_Ext);
})();

// ■ END Sprite_Ext.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
(function () {
    var ABSUtils = AlphaABS.UTILS;
    //Sprite_Ext2
    //------------------------------------------------------------------------------
    function Sprite_Ext2() {
        this.initialize.apply(this, arguments);
    }

    Sprite_Ext2.prototype = Object.create(AlphaABS.LIBS.Sprite_Ext.prototype);
    Sprite_Ext2.prototype.constructor = Sprite_Ext2;

    Sprite_Ext2.prototype.initialize = function (frames) {
        AlphaABS.LIBS.Sprite_Ext.prototype.initialize.call(this);

        this._mouseIn = false;
        this._ready = false;
        this._readyHandler = null;
        this._outHandler = null;
        this._readyCalled = false;
        this._frames = frames;
        this.timerA = new Game_TimerABS();
        this.thread = setInterval(function () {
            this._checkMouseIn();
        }.bind(this), (16.666));
    };

    Sprite_Ext2.prototype.setReadyHandler = function (func) {
        this._readyHandler = func;
    };

    Sprite_Ext2.prototype.setOutHandler = function (func) {
        this._outHandler = func;
    };

    Sprite_Ext2.prototype.update = function () {
        AlphaABS.LIBS.Sprite_Ext.prototype.update.call(this);
        if (this._mouseIn) {
            this.timerA.update();
            if (this.timerA.isReady()) {
                this._ready = true;
                this._onReady();
            }
        }
    };

    Sprite_Ext2.prototype.isReady = function () {
        return (this._ready == true);
    };

    Sprite_Ext2.prototype.terminate = function () {
        clearInterval(this.thread);
    };


    //PRIVATE
    Sprite_Ext2.prototype._checkMouseIn = function () {
        var mp = ABSUtils.SMouse.getMousePosition();
        if (ABSUtils.SMath.inRect(mp, this._myRectangle())) {
            this._mouseInF();
        } else {
            this._mouseOutF();
        }
    };

    Sprite_Ext2.prototype._mouseOutF = function () {
        if (this._mouseIn == true) {
            //LOG.p("Mouse OUT");
            this._mouseIn = false;
            this.timerA.reset();
            if (this.isReady()) {
                this._onOut();
            }
        }
    };

    Sprite_Ext2.prototype._mouseInF = function () {
        if (this._mouseIn == false) {
            //LOG.p("Mouse IN");
            this._mouseIn = true;
            this.timerA.start(this._frames);
        }
    };

    Sprite_Ext2.prototype._onOut = function () {
        //LOG.p("on OUT");
        this.ready = false;
        if (this._outHandler) {
            this._outHandler.call();
        }
        this._readyCalled = false;
    };

    Sprite_Ext2.prototype._onReady = function () {
        if (this._readyCalled == true) return;
        if (this._readyHandler) {
            this._readyHandler.call();
        }
        this._readyCalled = true;
    };

    AlphaABS.register(Sprite_Ext2);
    //END Sprite_Ext2
    //------------------------------------------------------------------------------

})();
(function () {
  //Sprite_Hover
  //------------------------------------------------------------------------------
  function Sprite_Hover() {
    this.initialize.apply(this, arguments);
  }

  Sprite_Hover.prototype = Object.create(Sprite_Button.prototype);
  Sprite_Hover.prototype.constructor = Sprite_Hover;

  Sprite_Hover.prototype.initialize = function (w, h) {
    Sprite_Button.prototype.initialize.call(this);
    this._step = 0;
    this._free = true;
    this._createHover(w, h);
  };

  Sprite_Hover.prototype.isFree = function () {
    return (this._free == true);
  };

  Sprite_Hover.prototype.update = function () {
    Sprite_Button.prototype.update.call(this);
    if (this._free) {
      if (this.isHoverByMouse()) {
        this._step++;
        this._onHover();
      } else {
        this._reset();
      }
    }
  }

  Sprite_Hover.prototype.freeze = function () {
    this._free = false;
    this.alpha = 1;
  }

  Sprite_Hover.prototype.free = function () {
    this._free = true;
    this._reset();
  }

  Sprite_Hover.prototype.standardFrameWidth = function () {
    return 2;
  }

  Sprite_Hover.prototype._createHover = function (w, h) {
    this.bitmap = new Bitmap(w, h);
    var color1 = Sprite_Hover.CWHITE.CSS;
    var color2 = Sprite_Hover.CWHITE2.CSS;
    this._drawFrame(color1, color2, this.standardFrameWidth());
    this.alpha = 0;
  }

  Sprite_Hover.prototype._reset = function () {
    this._step = 0;
    this.alpha = 0;
  }

  Sprite_Hover.prototype._drawFrame = function (color1, color2, w) {
    this.bitmap.clear();
    this.bitmap.gradientFillRect(0, 0, w, this.height, color1, color2);
    this.bitmap.gradientFillRect(this.width - w, 0, w, this.height, color2, color1);
    this.bitmap.gradientFillRect(0, 0, this.width, w, color1, color2, true);
    this.bitmap.gradientFillRect(0, this.height - w, this.width, w, color2, color1, true);
  }

  Sprite_Hover.prototype._onHover = function () {
    this.alpha = 0.6 - Math.abs((this._step * 0.01) % 0.5);
  }

  SDK.setConstant(Sprite_Hover, 'CWHITE', (Color.WHITE.reAlpha(220)));
  SDK.setConstant(Sprite_Hover, 'CWHITE2', (Color.WHITE.reAlpha(60)));

  AlphaABS.register(Sprite_Hover);
  //END Sprite_Hover
  //------------------------------------------------------------------------------

})();
(function(){
  //Sprite_HoverIcon
  //------------------------------------------------------------------------------
      function Sprite_HoverIcon() {
          this.initialize.apply(this, arguments);
      }

      Sprite_HoverIcon.prototype = Object.create(AlphaABS.LIBS.Sprite_Hover.prototype);
      Sprite_HoverIcon.prototype.constructor = Sprite_HoverIcon;

      Sprite_HoverIcon.prototype.initialize = function(w,h,fw) {
          this._fwidth = fw || 2;
          AlphaABS.LIBS.Sprite_Hover.prototype.initialize.call(this, w, h);
      };

      Sprite_HoverIcon.prototype.standardFrameWidth = function() {
          return this._fwidth;
      };
      //END Sprite_HoverIcon
  //------------------------------------------------------------------------------

  AlphaABS.register(Sprite_HoverIcon);

})();

(function(){
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

  AlphaABS.register(Sprite_Mask);

})();

(function(){
  class Sprite_ObjectWithMask extends Sprite {
    constructor(image, maskImage) {
      super(ImageManager.loadPictureABS(image));
      this._spriteMask = new AlphaABS.LIBS.Sprite_Mask(ImageManager.loadPictureABS(maskImage));
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
  }

  AlphaABS.register(Sprite_ObjectWithMask);

})();

(function(){
  class Sprite_SkillPanelABS extends Sprite
  {
    constructor() {
      super();

      this._isVisible = true;
      if(AlphaABS.Parameters.isLoaded()) {
        var parameters = AlphaABS.Parameters.get_UIE_PlayerSpellsPanel();
        this.bitmap = parameters.Image;
        this._isVisible = parameters.Visible;
      } else {
        this.bitmap = ImageManager.loadPictureABS("SkillPanel");
      }
      this._initSkills();
    }

    showPanel() {
      this.visible = this._isVisible;
    }

    hidePanel() {
      this.visible = false;
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

      for(var i = 1; i<9; i++) { //ALL
        var item = new AlphaABS.LIBS.UIObject_SkillPanelItem(i - 1);
        item.x = ((i - 1) * 42);
        item.y = 0;
        this.items.push(item);
        this.addChild(item);
      }
    }
  }

  AlphaABS.register(Sprite_SkillPanelABS);
})();

(function(){
  class Sprite_SkillPanelABS_L extends AlphaABS.LIBS.Sprite_SkillPanelABS {
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
        var item = new AlphaABS.LIBS.UIObject_SkillPanelItem_L(i - 1, this.actor);
        item.x = ((i - 1) * 42);
        item.y = 0;
        this.items.push(item);
        this.addChild(item);
      }
    }

  }

  AlphaABS.register(Sprite_SkillPanelABS_L);

})();

(function(){

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

})();

(function(){
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
        var icon = $gamePlayer.battler().allIcons()[this._index];
        SDK.drawIcon(0,0,icon,this.bitmap,32);
      }
    }

    _updateABS() {
      if(this._index != null)
        this.refresh();
    }

    _drawStateTime(index, items) {
      var stateTimes = $gamePlayer.battler()._stateTurns;
      var state = items[index];
      var time = stateTimes[state.id];
      var stringToDraw = '';
      if(state.autoRemovalTiming == 1) {
        stringToDraw = 'A';
      } else {
        if(state.autoRemovalTiming == 0) {
          stringToDraw = '';
        } else
          stringToDraw = AlphaABS.UTILS.framesToTimeA(time);
      }
      //this._spriteTime.textColor = Sprite_UserStatusIcon.TIMECOLOR.CSS;
      this._spriteTime.bitmap.drawText(stringToDraw, 0, 0, this._spriteTime.bitmap.width, this._spriteTime.bitmap.height, 'center');
    }

    _drawBuffTime(index, items) {
      var time = items[index];
      if(time) {
        var stringToDraw = AlphaABS.UTILS.framesToTimeA(time);
        this._spriteTime.bitmap.drawText(stringToDraw, 0, 0, this._spriteTime.bitmap.width, this._spriteTime.bitmap.height, 'center');
      }
    }
  }

  SDK.setConstant(Sprite_UserStatusIcon,'TIMECOLOR',Color.FromHex('#CECE00'));

  AlphaABS.register(Sprite_UserStatusIcon);

})();

(function () {
  class Sprite_UserUI extends Sprite {
    constructor(backgroundImage) {
      super(backgroundImage || ImageManager.loadPictureABS("User")); //ImageManager.loadPicture("User")

      this.faceSize = 90;
      this.faceX = 8;
      this.faceY = 8;
      this._oldLevel = 1;

      this._loadParameters();
      this._init();
      this._updateABS();

      this._thread = setInterval(function () {
        this._updateABS();
      }.bind(this), 10);
    }

    _loadParameters() {
      if (AlphaABS.Parameters.isLoaded()) {
        var parameters = AlphaABS.Parameters.get_UIE_PlayerStatus();
        this.visible = parameters.Visible;
        this._isShowLevel = parameters.Level;
        //this._isShowFace = parameters.Portrait; //TODO: Игра зависает! Если false
        this._isShowFace = true;
        this._inBattleBitmap = parameters['In battle Icon'];
        this._maskBitmap = parameters.Mask;
      } else {
        this._isShowLevel = true;
        this._isShowFace = true;
        this._inBattleBitmap = ImageManager.loadPictureABS('InBattleIcon');
        this._maskBitmap = ImageManager.loadPictureABS('InBattleMask');
      }
      this.faceSize = this._isShowFace ? 90 : 4;
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
      this._createPlayerGauges();
    }

    _createPlayerGauges() {
      var gaugesSprite = new Sprite();
      gaugesSprite.setFrame(0, 0, 160, 90);
      gaugesSprite.x = this.x + this.faceSize;
      gaugesSprite.y = this.y;
      gaugesSprite.opacity = 200;

      try {
        var hpGauge = this._createGaugeHP(4, 8, 120, 24);
        gaugesSprite.addChild(hpGauge);

        var mpGauge = this._createGaugeMP(4, 34, 120, 22);
        gaugesSprite.addChild(mpGauge);

        if ($dataSystem.optDisplayTp) {
          var tpGauge = this._createGaugeTP(4, 58, 120, 22);
          gaugesSprite.addChild(tpGauge);
        }
      } catch (e) {
        console.error(e);
      }

      this.gaugesSprite = gaugesSprite;
      this.addChild(this.gaugesSprite);
    }

    _createGaugeHP(x, y, w, h) {
      var gauge = new AlphaABS.LIBS.UI_GaugeABS_HP(w, h);
      gauge.setBattler($gamePlayer.battler());
      gauge.move(x, y);
      gauge = this._applyParametersToGauge(gauge, 'HP');
      return gauge;
    }

    _applyParametersToGauge(gauge, symbol) {
      if (AlphaABS.Parameters.isLoaded()) {
        var params = AlphaABS.Parameters.get_UIE_PlayerGauge(symbol);
        gauge.applyPluginParameters(params);
      }
      return gauge;
    }

    _createGaugeMP(x, y, w, h) {
      var gauge = new AlphaABS.LIBS.UI_GaugeABS_MP(w, h);
      gauge.setBattler($gamePlayer.battler());
      gauge.move(x, y);
      gauge = this._applyParametersToGauge(gauge, 'MP');
      return gauge;
    }

    _createGaugeTP(x, y, w, h) {
      var gauge = new AlphaABS.LIBS.UI_GaugeABS_TP(w, h);
      gauge.setBattler($gamePlayer.battler());
      gauge.move(x, y);
      gauge = this._applyParametersToGauge(gauge, 'TP');
      return gauge;
    }

    _updateABS() {
      try {
        if (this.visible == false)
          return;

        if ($gamePlayer.inBattle()) {
          if (this.spriteBattleMask)
            this.spriteBattleMask.showMaskOne(30);

          if (this.spriteInfo_Battle)
            this.spriteInfo_Battle.visible = true;

          if (this.spriteInfo_LevelText)
            this.spriteInfo_LevelText.visible = false;

        } else {

          if (this.spriteInfo_Battle)
            this.spriteInfo_Battle.visible = false;

          if (this.spriteInfo_LevelText)
            this.spriteInfo_LevelText.visible = true;

          if (this._oldLevel != $gamePlayer.battler().level) {
            this._drawPlayerLevel();
          }

        }

        if (this.spriteBattleMask)
          this.spriteBattleMask.update();

        this.gaugesSprite.update();
      } catch (e) {
        console.error(e);
      }
    }

    _createPlayerFace() {
      this.spriteFace = new Sprite(new Bitmap(this.faceSize, this.faceSize));
      this._drawPlayerFace();
      this.spriteFace.x = this.faceX + this.faceSize;
      this.spriteFace.scale.x *= -1;
      this.addChild(this.spriteFace);
    }

    _drawPlayerFace() {
      this.spriteFace.bitmap.clear();
      if (!this._isShowFace) return;
      var faceName = $gamePlayer.battler().faceName();
      var faceIndex = $gamePlayer.battler().faceIndex();
      var bitmap = ImageManager.loadFace(faceName);
      bitmap.addLoadListener(function () {
        var pw = Window_Base._faceWidth;
        var ph = Window_Base._faceHeight;
        var sx = faceIndex % 4 * pw;
        var sy = Math.floor(faceIndex / 4) * ph;
        this.spriteFace.bitmap.blt(bitmap, sx, sy, pw, ph, this.faceX, this.faceY, this.faceSize, this.faceSize);
      }.bind(this));
    }

    _drawPlayerLevel() {
      if (this._isShowLevel == false) return;
      this._oldLevel = $gamePlayer.battler().level;
      this.spriteInfo_LevelText.bitmap.clear();
      this.spriteInfo_LevelText.bitmap.drawText(this._oldLevel, 0, 0, 24, 24, 'center');
    }

    _createPlayerInfo() {
      this.spriteInfo = new Sprite(new Bitmap(45, 48));
      this.spriteInfo.anchor.y = 0.5;
      this.spriteInfo.x = 0;
      this.spriteInfo.y = this.faceSize;

      if (this._isShowLevel == true) {
        try {
          this.spriteInfo_LevelText = new Sprite(new Bitmap(24, 24));
          this.spriteInfo_LevelText.bitmap.fontSize = 18;
          this.spriteInfo_LevelText.anchor.y = 0.5;
          this._drawPlayerLevel();

          this.spriteInfo_Level = new Sprite(ImageManager.loadPictureABS('levelBar')); //new Sprite(new Bitmap(24,24));
          this.spriteInfo_Level.opacity = 200;
          this.spriteInfo_Level.anchor.y = 0.5;
          this.spriteInfo_Level.x = 7;
          this.spriteInfo_Level.y = -10;

          this.spriteInfo.addChild(this.spriteInfo_Level);
          this.spriteInfo_Level.addChild(this.spriteInfo_LevelText);
        } catch (e) {
          console.error(e);
        }
      }

      if (this._inBattleBitmap.url) {
        try {
          this.spriteInfo_Battle = new Sprite(this._inBattleBitmap);
          this.spriteInfo_Battle.anchor.y = 0.5;
          this.spriteInfo_Battle.x = 7;
          this.spriteInfo_Battle.y = -10;
          this.spriteInfo_Battle.visible = false;
          this.spriteInfo.addChild(this.spriteInfo_Battle);
        } catch (e) {
          console.error(e);
        }
      }


      this.addChild(this.spriteInfo);
    }

    _createInBattleInfo() {
      try {
        if (!this._maskBitmap.url) return;
        this.spriteBattleMask = new AlphaABS.LIBS.Sprite_Mask(this._maskBitmap);
        this.spriteBattleMask.x = -6;
        this.spriteBattleMask.y = -6;
        this.spriteBattleMask.setParams(255);
        this.addChild(this.spriteBattleMask);
      } catch (e) {
        console.error(e);
      }
    }
  }

  AlphaABS.register(Sprite_UserUI);

})();
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Weapon.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
  //OVER
  Sprite_Weapon.prototype.animationWait = function () {
    return 6;
  };

  //NEW
  Sprite_Weapon.prototype.setDirectionABS = function (directionKey) {
    if (this._weaponImageId <= 0) return;

    this.scale.x = 0.7;
    this.scale.y = 0.7;
    this.y = 0;
    this.x = 0;
    this.opacity = 255;

    switch (directionKey) {
      case 'r':
        this.x = 8;
        this.scale.x *= -1;
        break;
      case 'l':
        this.x = -8;
        break;
      case 'u':
        this.opacity = 0;
        break;
      case 'd':
        this.y = 5;
        break;
    }
  };
})();
// ■ END Sprite_Weapon.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.1.1
(function() {
  var StringsLoader;
  StringsLoader = class StringsLoader {
    constructor(_parameters) {
      this._parameters = _parameters;
    }

    loadAllStrings(object) {
      var strings;
      strings = this._collect(object);
      this._writeNewString(object, strings);
    }

    _collect(object) {
      var properties, strings;
      properties = Object.getOwnPropertyNames(object);
      strings = properties.filter(function(item) {
        return item.includes("STRING_");
      });
      return strings;
    }

    _writeNewString(object, strings) {
      var i, len, string;
      for (i = 0, len = strings.length; i < len; i++) {
        string = strings[i];
        this._setStringFromPluginParametersToObject(object, string);
      }
    }

    _setStringFromPluginParametersToObject(object, stringName) {
      var newValue;
      newValue = this._parameters[stringName];
      if (newValue) {
        object[stringName] = newValue;
      }
    }

  };
  AlphaABS.register(StringsLoader);
})();

(function () {
    //UIObject_ABSSkillInfo
    //------------------------------------------------------------------------------
    function UIObject_ABSSkillInfo() {
        this.initialize.apply(this, arguments);
    }

    UIObject_ABSSkillInfo.prototype = Object.create(Sprite.prototype);
    UIObject_ABSSkillInfo.prototype.constructor = UIObject_ABSSkillInfo;

    UIObject_ABSSkillInfo.prototype.initialize = function (absSkill, isWeaponMode) {
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

    UIObject_ABSSkillInfo.prototype.refresh = function () {
        this.bitmap.clear();

        if (this._descriptionText) {
            this.removeChild(this._descriptionText);
            this._descriptionText.destroy();
            this._descriptionText = null;
        }

        if (this._weaponMode)
            this._skill = $gamePlayer.battler().skillABS_attack();

        this._deltaY = 0;
        this._deltaX = 0;
        this._textPosition = 'center';
        if (this._skill == null) return;
        this._createBackground();
        this._drawInfo();
        this.height = this._deltaY + 8;
    };

    UIObject_ABSSkillInfo.prototype._createBackground = function () {
        this.bitmap.fillAll(UIObject_ABSSkillInfo.COLOR_BACKGROUND.CSS);
    };

    UIObject_ABSSkillInfo.prototype._drawInfo = function () {
        this._nextLine(4);
        this._drawName();
        this._drawLine(4, 4);
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

    UIObject_ABSSkillInfo.prototype._drawName = function () {
        try {
            this._setFontSize(24);
            this._setColor(Color.WHITE);
            this.bitmap.outlineWidth = 2;
            this.bitmap.outlineColor = Color.BLACK.CSS;
            var name = this._skill.name();
            if (this._weaponMode) {
                if ($gamePlayer.battler().weapons().length > 0) {
                    name = $gamePlayer.battler().weapons()[0].name;
                }
            }
            this._drawText(name, this.width, 32);
            this._nextLine(28);
            this.bitmap.outlineWidth = 1;
        } catch (e) {
            console.error(e);
        }
    };

    UIObject_ABSSkillInfo.prototype._drawCost = function () {
        try {
            if (this._skill.isItem()) return;
            var mvSkill = this._skill.skill();
            if (mvSkill.mpCost > 0) {
                this._drawPair(UIObject_ABSSkillInfo.COLOR_TEXT, TextManager.mpA + " ", UIObject_ABSSkillInfo.COLOR_VALUE, mvSkill.mpCost, 'left');
                this._nextLine();
            }
            if (mvSkill.tpCost > 0) {
                this._drawPair(UIObject_ABSSkillInfo.COLOR_TEXT, TextManager.tpA + " ", UIObject_ABSSkillInfo.COLOR_VALUE, mvSkill.tpCost, 'left');
                this._nextLine();
            }
        } catch (e) {
            console.error(e);
        }
    }

    UIObject_ABSSkillInfo.prototype._drawTargetType = function () {
        try {
            var targetText = this._extractTargetMode();
            if (targetText != "") {
                var offset = 10;
                this._deltaX += offset;
                this._drawRectInner(this.width - (offset * 2), 30);
                this._textPosition = 'center';
                this._setColor(UIObject_ABSSkillInfo.COLOR_TEXT);
                this._drawText(targetText, this.width - (offset * 2) - this._deltaX, 24);
                this._nextLine();
            }
        } catch (e) {
            console.error(e);
        }
    }

    UIObject_ABSSkillInfo.prototype._drawABSInfo = function () {
        try {
            var text_color = new Color(128, 128, 255);
            var value_color = UIObject_ABSSkillInfo.COLOR_VALUE.reAlpha(220);

            if (this._skill.isRadiusType() && !this._skill.isNeedTarget()) {
                this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RADIUS, value_color, this._skill.radius, 'left');
                this._nextLine();
            } else {
                if (this._skill.range > 0) {
                    if (this._skill.radius > 0) {
                        this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RANGE2, value_color, this._skill.range, 'left');
                        this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RADIUS, value_color, this._skill.radius, 'right');
                    } else {
                        this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RANGE, value_color, this._skill.range, 'left');
                    }
                    this._nextLine();
                } else {
                    if (this._skill.range == 0 && this._skill.isNeedTarget()) {
                        this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RANGE2, value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_MELEE, 'left');
                        this._nextLine();
                    }
                }
            }

            if (this._skill.isNeedCast()) {
                this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_CAST, value_color,
                    SDK.decimalAdjust('round', this._skill.castTime / AlphaABS.BattleManagerABS.TURN, -1) +
                    AlphaABS.SYSTEM.STRING_SKILL_INFO_SEC, 'left');
                this._nextLine();
            }

            if (this._skill.getReloadTime() > 0 || this._skill.isNeedReloadParam()) {
                var reloadTime = this._skill.getReloadTime();
                if (this._skill.isNeedReloadParam()) {
                    reloadTime += $gamePlayer.battler()._calculateABSSkillReloadParam(this._skill.reloadParam);
                }
                reloadTime = SDK.decimalAdjust('round', reloadTime / AlphaABS.BattleManagerABS.TURN, -1);
                this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_COOLDOWN, value_color, reloadTime +
                    AlphaABS.SYSTEM.STRING_SKILL_INFO_SEC, 'left');
                this._nextLine();
            }
        } catch (e) {
            console.error(e);
        }
    };

    UIObject_ABSSkillInfo.prototype._drawDescription = function () {
        try {
            var descriptionText = this._skill.skill().description;
            if (this._skill.skillId == $gamePlayer.battler().attackSkillId() && descriptionText == "") {
                if ($gamePlayer.battler().weapons().length > 0) {
                    var playerWeapon = $gamePlayer.battler().weapons()[0];
                    descriptionText = playerWeapon.description;
                    if (playerWeapon.meta.noDescription && playerWeapon.meta.noDescription == "1") {
                        descriptionText = ""; //used weapon instead
                    }
                }
            }

            if (descriptionText == "") return;
            if (this._skill.noDescription == true) return;

            this._deltaX = 0;
            this._drawLine(4, 2);
            this._deltaX = 4;

            this._setColor(UIObject_ABSSkillInfo.COLOR_TEXT);
            this._textPosition = 'center';
            this._drawText(AlphaABS.SYSTEM.STRING_SKILL_INFO_DESCRIPTION, this.width - this._deltaX, 24);
            this._nextLine(26);

            this._descriptionTextWidth = this.width - (this._deltaX * 4);

            var style = this._getDescriptionStyle(this._descriptionTextWidth);

            this._descriptionText = new PIXI.Text(descriptionText, style);
            this._descriptionText.x = this._deltaX + 2;
            this._descriptionText.y = this._deltaY + 2;
            this.addChild(this._descriptionText);

            this._drawRectInner(this.width - this._deltaX, this._descriptionText.height + 8);

            this._nextLine(this._descriptionText.height + 12);
        } catch (e) {
            console.error(e);
        }
    };

    UIObject_ABSSkillInfo.prototype._drawDamageFormula = function () {
        try {
            var mvSkill = this._skill.skill();
            var damage = mvSkill.damage;
            if (damage.type == 0) return;

            this._deltaX = 0;
            this._drawLine(4, 2);
            this._deltaX = 12;

            var damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_DAMAGE;
            switch (damage.type) {
                case 1:
                    damageTypeText += TextManager.hpA;
                    break;
                case 2:
                    damageTypeText += TextManager.mpA;
                    break;
                case 3:
                    damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_RECOVER + TextManager.hpA;
                    break;
                case 4:
                    damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_RECOVER + TextManager.mpA;
                    break;
                case 5:
                    damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_DRAIN + TextManager.hpA;
                    break;
                case 6:
                    damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_DRAIN + TextManager.mpA;
                    break;
            }

            var damageValueText = '';

            var isForUser = (this._skill.type == 0 && !this._skill.isNeedTarget());
            var isNeedTarget = damage.formula.contains('b');
            var tempTarget = null;

            if (isNeedTarget) {
                if (isForUser)
                    tempTarget = $gamePlayer.battler();
                else
                    tempTarget = AlphaABS.BattleManagerABS.getPlayerTarget();

                if (tempTarget == null) {
                    damageValueText = AlphaABS.SYSTEM.STRING_SKILL_INFO_TARGET;
                } else
                    damageValueText = this._getPotentialDamage(tempTarget.battler());

            } else {
                damageValueText = this._getPotentialDamage($gamePlayer.battler());
            }

            this._drawPair(UIObject_ABSSkillInfo.COLOR_TEXT, damageTypeText + " ", UIObject_ABSSkillInfo.COLOR_VALUE, damageValueText, 'center');
            this._nextLine();
        } catch (e) {
            console.error(e);
        }
    };

    UIObject_ABSSkillInfo.prototype._drawRecharge = function () {
        try {
            if (this._skill.isNeedAmmo() || this._skill.isStackType()) {
                this._deltaX = 0;
                this._drawLine(4, 2);
                this._deltaX = 12;
            }

            this._setFontSize(14);
            var value_color = new Color(252, 157, 101);
            if (this._skill.isNeedAmmo()) {
                var ammoName = $dataItems[this._skill.ammo].name;
                this._drawPair(value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_USE, UIObject_ABSSkillInfo.COLOR_VALUE, ammoName, 'left');
                this._drawPair(value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_HAS, UIObject_ABSSkillInfo.COLOR_VALUE, $gameParty.numItems($dataItems[this._skill.ammo]), 'right');
                this._nextLine();
            }
            if (this._skill.isStackType()) {
                var stackText = this._skill._currentStack + '/' + this._skill.stack;
                this._drawPair(value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_CHARGES, UIObject_ABSSkillInfo.COLOR_VALUE, stackText, 'left');
                this._nextLine();
                var reloadStack = SDK.decimalAdjust('round', this._skill.stackTime / AlphaABS.BattleManagerABS.TURN, -1) + AlphaABS.SYSTEM.STRING_SKILL_INFO_SEC;
                this._drawPair(value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RELOADCHR, UIObject_ABSSkillInfo.COLOR_VALUE, reloadStack, 'left');
                this._nextLine();
            }
            this._setFontSize(18);
        } catch (e) {
            console.error(e);
        }
    };

    UIObject_ABSSkillInfo.prototype._setFontSize = function (size) {
        this.bitmap.fontSize = size;
    }

    UIObject_ABSSkillInfo.prototype._setColor = function (color) {
        this.bitmap.textColor = color.CSS;
    }

    UIObject_ABSSkillInfo.prototype._drawLine = function (offsetTop, offsetBottom) {
        offsetTop = SDK.check(offsetTop, 0);
        offsetBottom = SDK.check(offsetBottom, 0);
        this._deltaY += offsetTop;
        this._deltaX += this._lineOffsetX();
        this._drawRect(this.width - (this._deltaX + this._lineOffsetX()), 1, Color.WHITE.reAlpha(50));
        this._deltaX -= this._lineOffsetX();
        this._deltaY += offsetBottom;
    }

    UIObject_ABSSkillInfo.prototype._drawPair = function (color1, text1, color2, text2, position) {
        var textOffset = 6;
        var offset = 0;
        var dx = this._deltaX;
        var width = this.width - (this._deltaX * 2);
        if (position != 'center') {
            width = this.bitmap.measureTextWidth(text1) + this.bitmap.measureTextWidth(text2) + textOffset;
        }

        if (position == 'right') {
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

        if (position == 'right')
            this._deltaX = dx;
    }

    UIObject_ABSSkillInfo.prototype._drawRect = function (width, height, color) {
        this.bitmap.fillRect(this._deltaX, this._deltaY, width, height, color.CSS);
    }

    UIObject_ABSSkillInfo.prototype._drawRectInner = function (width, height) {
        this._deltaX -= 1;
        this._deltaY -= 1;
        this._drawRect(width - this._deltaX, 1, UIObject_ABSSkillInfo.COLOR_BACKGROUND);
        this._drawRect(1, height + 1, UIObject_ABSSkillInfo.COLOR_BACKGROUND);
        this._deltaX += 1;
        this._deltaY += 1;
        this._drawRect(width - this._deltaX, height, UIObject_ABSSkillInfo.COLOR_BACKGROUND.getLightestColor(30));
    }

    UIObject_ABSSkillInfo.prototype._drawText = function (text, width, height) {
        height = SDK.check(height, 24);
        width = SDK.check(width, this.width);
        this.bitmap.drawText(text, this._deltaX, this._deltaY, width, height, this._textPosition);
    }

    UIObject_ABSSkillInfo.prototype._nextLine = function (offset) {
        offset = SDK.check(offset, 24);
        this._deltaY += offset;
    }

    UIObject_ABSSkillInfo.prototype._lineOffsetX = function () {
        return 18;
    }

    UIObject_ABSSkillInfo.prototype._getDescriptionStyle = function (width) {
        var style = {
            fontStyle: 'italic',
            fontFamily: 'Arial',
            fontSize: '12px',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 1,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 2,
            wordWrap: true,
            wordWrapWidth: width
        };
        return style;
    };

    UIObject_ABSSkillInfo.prototype._extractTargetMode = function () {
        var targetText = "";
        if (!this._skill) return "";
        switch (this._skill.type) {
            case 0:
                if (this._skill.isNeedTarget()) {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_ONTARGET;
                } else {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_ONUSER;
                }
                break;
            case 1:
                if (this._skill.isVectorTypeR()) {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_AREA;
                } else {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_ONTARGET;
                }
                break;
            case 2:
                if (this._skill.isNeedTarget()) {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_AREA;
                } else {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_CIRCLE;
                }
                break;
            case 3:
                targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_ZONE;
                break;
            default:
        }
        return targetText;
    };

    UIObject_ABSSkillInfo.prototype._getPotentialDamage = function (target) {
        try {
            var damageValueText = '';
            var action = new Game_Action($gamePlayer.battler());
            if (this._skill.isItem()) {
                action.setItem(this._skill.skill().id);
            } else {
                action.setSkill(this._skill.skill().id);
            }
            var damageValue = Math.abs(action.evalDamageFormula(target));
            if (damageValue > 0 && this._skill.skill().damage.variance > 0) {
                var percent = SDK.percent(damageValue, this._skill.skill().damage.variance);
                var min = damageValue - percent;
                var max = damageValue + percent;
                damageValueText = min + '-' + max;
            } else {
                damageValueText = damageValue;
            }
            return damageValueText;
        } catch (e) {
            console.error(e);
            return "?";
        }
    };

    SDK.setConstant(UIObject_ABSSkillInfo, 'COLOR_TEXT', Color.AQUA.reAlpha(200));
    SDK.setConstant(UIObject_ABSSkillInfo, 'COLOR_VALUE', Color.ORANGE.reAlpha(200));
    SDK.setConstant(UIObject_ABSSkillInfo, 'COLOR_BACKGROUND', Color.BLACK.reAlpha(200));

    AlphaABS.register(UIObject_ABSSkillInfo);
    //END UIObject_ABSSkillInfo
    //------------------------------------------------------------------------------

})();
(function () {
  class UIObject_BarAttackReload extends Sprite {
    constructor(width, height) {
      super(new Bitmap(width, height));
      this._drawItem = new AlphaABS.LIBS.Sprite_ObjectWithMask('BarSmall', 'BarSmallMask');
      this._drawItem.setParams(150, Color.AQUA);

      this._progressBar = new AlphaABS.LIBS.Sprite_CastProgress(110, 10);
      this._progressBar.setColor(Color.AQUA);

      this._drawItem.z = 10;
      this._drawItem.x = 28;
      this._progressBar.x = this._drawItem.x + 4;
      this._progressBar.y = 4;

      this.addChild(this._progressBar);
      this.addChild(this._drawItem);

      this.visible = false;
      this._timer = null;

      this._thread = setInterval(function () {
        this._update();
      }.bind(this), 10);
    }

    start() {
      if ($gamePlayer.ABSParams().isWeapRecharge) {
        var skill = $gamePlayer.battler().skillABS_attack();
        if (skill && !skill.isReady() && skill.getReloadTime() > 30) {
          this.visible = true;
          var t = $gamePlayer.battler().weapons().first();
          if (t && t.iconIndex > 0) {
            ImageManager.drawIconABS(0, 0, t.iconIndex, this.bitmap, 24);
          } else {
            ImageManager.drawIconABS(0, 0, 'noWeapon', this.bitmap, 24);
            //this.bitmap.clear();
          }
          this._timer = skill.timer;
          this._progressBar.start(skill.timer);
        }
      } else {
        if (!this._waitPulse) {
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
      if (this._timer) {
        if (this._isChottoReady()) {
          this.pulse();
        }
        if (this._timer.isReady()) {
          this.finish();
        }
      }
      if (this._waitPulse) {
        if (this._drawItem.isReady()) {
          //LOG.p("Pulse ready");
          this._waitPulse = false;
          if (this._timer == null)
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

  AlphaABS.register(UIObject_BarAttackReload);

})();
(function(){
  class UIObject_BarUserCast extends Sprite {
    constructor(width, height) {
      super(new Bitmap(width, height));
      //this._drawItem = new Sprite_ObjectWithMask('UserCastBar','UserCastBarMask');
      this._drawItem = new AlphaABS.LIBS.Sprite_ObjectWithMask('Bar','BarMask');
      //TODO: Надо больше (или другой бар)

      //this._progressBar =  new Sprite_CastProgress(186, 16);
      this._progressBar =  new AlphaABS.LIBS.Sprite_CastProgress(125, 18);
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

  AlphaABS.register(UIObject_BarUserCast);

})();

(function () {
    //UIObject_ClickIcon
    //------------------------------------------------------------------------------
    function UIObject_ClickIcon() {
        this.initialize.apply(this, arguments);
    }

    UIObject_ClickIcon.prototype = Object.create(Sprite_Button.prototype);
    UIObject_ClickIcon.prototype.constructor = UIObject_ClickIcon;

    UIObject_ClickIcon.prototype.initialize = function (iconSymbol) {
        Sprite_Button.prototype.initialize.call(this);
        this.bitmap = ImageManager.loadIconABS(iconSymbol);
        this._hover = null;
        this.bitmap.addLoadListener(function () {
            this._hover = new AlphaABS.LIBS.Sprite_HoverIcon(this.width, this.height, 18);
            this.addChild(this._hover);
        }.bind(this));

        this._clicked = false;
        this._keySymbol = null;
    };

    UIObject_ClickIcon.prototype.setClickHandler = function (handler) {
        this._handlerX = handler;
        Sprite_Button.prototype.setClickHandler.call(this, function () {
            //LOG.p("Clicked");
            if (this.isClicked()) {
                this._clicked = false;
                this._hover.free();
                this._handlerX();
            } else {
                this._clicked = true;
                this._hover.freeze();
                this._handlerX();
            }
        });
    };

    UIObject_ClickIcon.prototype.update = function () {
        Sprite_Button.prototype.update.call(this);
        if (this._keySymbol != null) {
            if (this.visible && Input.isTriggered(this._keySymbol)) {
                this.callClickHandler();
            }
        }
    }

    UIObject_ClickIcon.prototype.drawIconText = function (text) {
        var spr = new Sprite();
        spr.bitmap = new Bitmap(this.width, this.height);
        spr.bitmap.fontSize = 22;
        spr.bitmap.drawText(text, 0, 0, this.width - 2, this.height, 'right');
        this.addChild(spr);
    };

    UIObject_ClickIcon.prototype.setKeyHandler = function (symbol) {
        this._keySymbol = symbol;
        if (!Utils.isMobileDevice())
            this.drawIconText(symbol.toUpperCase());
    };

    UIObject_ClickIcon.prototype.isClicked = function () {
        return (this._clicked == true);
    };
    //END UIObject_ClickIcon
    //------------------------------------------------------------------------------

    AlphaABS.register(UIObject_ClickIcon);

})();
(function () {

  var UIObject_ContainerButton;

  //UIObject_Container
  //------------------------------------------------------------------------------
  function UIObject_Container() {
    this.initialize.apply(this, arguments);
  }

  UIObject_Container.prototype = Object.create(AlphaABS.LIBS.Sprite_Ext.prototype);
  UIObject_Container.prototype.constructor = UIObject_Container;

  UIObject_Container.prototype.initialize = function (x, y, w, h) {
    AlphaABS.LIBS.Sprite_Ext.prototype.initialize.call(this);
    UIObject_ContainerButton = AlphaABS.LIBS.UIObject_ContainerButton;
    this.setFrame(0, 0, w, h);
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

  UIObject_Container.prototype.update = function () {
    AlphaABS.LIBS.Sprite_Ext.prototype.update.call(this);
    if(this._hover && !this._hover.isFree()) {
      if (this.backSprite)
        this._checkIsNeedDrawText();
    }
  }

  UIObject_Container.prototype.setText = function (text, always) {
    this.text = text;
    this.text_vis_always = always || false;
  }

  UIObject_Container.prototype.addUI = function (element) {
    this._uiElement = element;
    this.addChild(element);
  }

  UIObject_Container.prototype.onStartMove = function () {
    if (this._hover) this._hover.freeze();
  }

  UIObject_Container.prototype.onEndMove = function () {
    if (this._hover) this._hover.free();
    this._updateButtonsPlacement();
  }

  UIObject_Container.prototype.onFree = function () {
    if (this.backSprite) {
      this.backSprite.visible = true;
    } else {
      this.backSprite = new Sprite();
      this.backSprite.bitmap = new Bitmap(this.width, this.height);
      this.backSprite.bitmap.fillRect(0, 0, this.width, this.height, Color.BLACK.CSS);
      this.backSprite.opacity = 100;
      this.addChild(this.backSprite);
      this._checkIsNeedDrawText();
    }
    this.visible = true;
    this.refreshVisButtons();
    this._hover = new AlphaABS.LIBS.Sprite_Hover(this.width, this.height);
    this.addChild(this._hover);
  }

   UIObject_Container.prototype._checkIsNeedDrawText = function() {
    if (this.text) {
      if (this.text_vis_always)
        this._drawText();
      else {
        if (this._uiElement && this._uiElement.visible == false) {
          this._drawText();
        }
      }
    }
  };

  UIObject_Container.prototype._drawText = function () {
    this.backSprite.bitmap.fillRect(0, 0, this.width, this.height, Color.BLACK.CSS);
    this.backSprite.opacity = 100;
    var text = this.text + ' (' + this.x + ',' + this.y + ')';
    this.backSprite.bitmap.drawText(text, 4, this.height / 2, this.width-8, 0, 'center');
  };

  UIObject_Container.prototype.onFreeze = function () {
    if (this.backSprite) {
      this.backSprite.visible = false;
    }
    if (this._uiElementVisMode == false)
      this.visible = false;

    if (this._visibleButton) {
      this._visibleButton.visible = false;
      this._visibleButton2.visible = false;
    }
  }

  UIObject_Container.prototype.setElementVisibility = function (isVis) {
    this._uiElementVisMode = isVis;
    if (this._uiElementVisMode == false && this._free == false) {
      this.visible = false;
    }
    this.refreshVisButtons();
  }

  UIObject_Container.prototype.setSpecialMode = function (value) {
    if (value == true) {
      this._specButton.callClickHandler();
    }

    this._specMode = value;
  }

  UIObject_Container.prototype.visibleMode = function () {
    return this._uiElementVisMode;
  }

  UIObject_Container.prototype.specialMode = function () {
    return this._specMode;
  }

  UIObject_Container.prototype.addSpecialButton = function (button_config) {
    this._specButton = new UIObject_ContainerButton(button_config.image);
    this._specButton.setClickHandler(function () {
      button_config.func();
      this.removeChild(this._hover);
      this._hover = new AlphaABS.LIBS.Sprite_Hover(this.width, this.height);
      this.addChild(this._hover);
    }.bind(this));
    this._updateButtonsPlacement();
    this.addChild(this._specButton);
    this._specButton.visible = false;
  }

  //TODO: Надо создать отдельную кнопку (класс) от Sprite_Button
  UIObject_Container.prototype.addVisButtton = function () {
    //LOG.p("Visible buttons created");
    this._visibleButton = new UIObject_ContainerButton('icon_eyeOn');
    this._visibleButton2 = new UIObject_ContainerButton('icon_eyeOff');
    this.refreshVisButtons();

    this._visibleButton.setClickHandler(function () {
      this._visClickHandler()
    }.bind(this));
    this._visibleButton2.setClickHandler(function () {
      this._visClickHandler()
    }.bind(this));
    this._updateButtonsPlacement();

    this.addChild(this._visibleButton);
    this.addChild(this._visibleButton2);
  }

  UIObject_Container.prototype._updateButtonsPlacement = function () {
    if (!this._visibleButton) return;

    var _r = 0;
    var _u = 0;
    if (SDK.toGlobalCoord(this, 'x') < Graphics.width / 2) {
      _r = 1;
    }

    if (SDK.toGlobalCoord(this, 'y') < Graphics.height / 2) {
      _u = 1;
    }

    if (_r == 1) {
      this._visibleButton.x = this.width;
      if (this._specButton)
        this._specButton.x = this._visibleButton.x + 24;
    } else {
      this._visibleButton.x = -24;
      if (this._specButton)
        this._specButton.x = this._visibleButton.x - 24;
    }

    if (_u == 1) {
      this._visibleButton.y = this.height;
      if (this._specButton)
        this._specButton.y = this._visibleButton.y;
    } else {
      this._visibleButton.y = -24;
      if (this._specButton)
        this._specButton.y = this._visibleButton.y;
    }


    this._visibleButton2.x = this._visibleButton.x;
    this._visibleButton2.y = this._visibleButton.y;

    if (this.backSprite) {
      this.backSprite.bitmap.clear();
      this.backSprite.bitmap.fillRect(0, 0, this.width, this.height, Color.BLACK.CSS);
      this.backSprite.opacity = 100;
      this._checkIsNeedDrawText();
    }
  }



  UIObject_Container.prototype.refreshVisButtons = function () {
    //LOG.p("Refresh visible buttons");
    if (!this._visibleButton) return;
    if (this._uiElementVisMode == false) {
      this._visibleButton.visible = false;
      this._visibleButton2.visible = true;
    } else {
      this._visibleButton.visible = true;
      this._visibleButton2.visible = false;
    }

    if (this._specButton)
      this._specButton.visible = true;

    if (!this._free) {
      if (this._visibleButton) {
        this._visibleButton.visible = false;
        this._visibleButton2.visible = false;
      }
      if (this._specButton)
        this._specButton.visible = false;
    }
  }


  UIObject_Container.prototype._visClickHandler = function () {
    //LOG.p("Visible button clicked");
    this.setElementVisibility(!this._uiElementVisMode);
    $gameVariables.setUIParam('visX', this._uiElementVisMode);
    this.refreshVisButtons();
  }

  //END UIObject_Container
  //------------------------------------------------------------------------------
  AlphaABS.register(UIObject_Container);
})();
(function(){

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

  AlphaABS.register(UIObject_ContainerButton);


})();

(function(){
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
      this._isVisible = true;
      this.setFrame(0,0,this._getY(1),this._getY(4));

      this._iconParameters = [];
      if(AlphaABS.Parameters.isLoaded()) {
        var parameters = AlphaABS.Parameters.get_UIE_PlayerHotBar();
        this._isVisible = parameters.Visible;
        for(var i = 1; i<6; i++)
          this._iconParameters[i-1] = parameters['Item'+i];
      } else {
        this._iconParameters = [true,true,true,true,true];
      }
      this.visible = this._isVisible;
    };

    UIObject_ControlPanel.prototype.showPanel = function() {
      this.visible = this._isVisible;
    };

    UIObject_ControlPanel.prototype.hidePanel = function() {
      this.visible = false;
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
      this.items.push(new AlphaABS.LIBS.UIObject_ControlPanelItem());
      var item = this.items.last();
      item.y = this._getY(this.items.count() - 1);
      this.addChild(item);
      return item;
    }

    UIObject_ControlPanel.prototype.addEmptyItem = function() {
      this.items.push(new AlphaABS.LIBS.UIObject_ControlPanelItemDummy());
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

      //Attack
      var item = (this._iconParameters[0]) ? this.addItem() : this.addEmptyItem();
      var index = this.getLastItemIndex();
      this.refreshWeaponIconAt(index);
      item.setKey('cpA');
      //Follow
      item = (this._iconParameters[1]) ? this.addItem() : this.addEmptyItem();
      item.setIcon('follow');
      item.setKey('cpW');
      //Jump
      item = (this._iconParameters[2]) ? this.addItem() : this.addEmptyItem();
      item.setIcon('jump');
      item.setKey('cpS');
      //Rotate
      item = (this._iconParameters[3]) ? this.addItem() : this.addEmptyItem();
      item.setIcon('toMouse');
      item.setKey('cpD');

      //SwitchWeapon
        item = (this._iconParameters[4]) ? this.addItem() : this.addEmptyItem();
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

    AlphaABS.register(UIObject_ControlPanel);
    //END UIObject_ControlPanel
  //------------------------------------------------------------------------------
})();

(function () {

  var ABSUtils = AlphaABS.UTILS;

  class UIObject_ControlPanelItem extends Sprite {
    constructor() {
      super(new Bitmap(40, 40));
      this._iconIndex = null; //No icon

      this._createBorder();
      this._createMask();
      this._createOverlay();
      this._createHover();

      this._help = null;
      this._symbol = null;
      this._absSkill = null;

      this._thread = setInterval(function () {
        this._updateABS();
      }.bind(this), 10);
    }

    setEditMode() {
      this._hover.visible = false;
      if (this._help) {
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
      if (!this.spriteAmmoCount) {
        this.spriteAmmoCount = new Sprite(new Bitmap(this.bitmap.width, this.bitmap.height));
        this.addChild(this.spriteAmmoCount);
      } else {
        if (this._absSkill == null) this.spriteAmmoCount.bitmap.clear();
      }

      if (absSkill != null && this._help == null) {
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
      if (isSelect) {
        this.spriteOverlay.bitmap.fillRect(0, 0, this.spriteOverlay.bitmap.width, this.spriteOverlay.bitmap.height, Color.RED.CSS);
      } else {
        this.spriteOverlay.bitmap.clear();
      }
    }

    setDisabled(isDisabled) {
      if (isDisabled) {
        this.spriteOverlay.bitmap.fillRect(0, 0, this.spriteOverlay.bitmap.width, this.spriteOverlay.bitmap.height, Color.BLACK.CSS);
      } else {
        this.spriteOverlay.bitmap.clear();
      }
    }

    isTouched() {
      return ABSUtils.SMath.inRect(new ABSUtils.PointX(TouchInput.x, TouchInput.y), this._getRectangle());
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
      if (this._help)
        this._help.update();
    }

    _drawSymbol() {
      if (!this.spriteText) {
        this.spriteText = new Sprite(new Bitmap(this.bitmap.width, this.bitmap.height));
        this.spriteText.bitmap.fontSize = 16;
        this.addChild(this.spriteText);
      }
      this.spriteText.bitmap.clear();
      if (this._symbol != null && !Utils.isMobileDevice()) {
        this.spriteText.bitmap.drawText(AlphaABS.Key.symbol[this._symbol].toUpperCase(), 0, 0, this.spriteText.bitmap.width - 6, 24, 'right');
      }
    }

    _drawAmmoCount() {
      if (this._absSkill == null) return;
      this.spriteAmmoCount.bitmap.clear();
      if (this._absSkill.isNeedAmmo()) {
        var b = this.spriteAmmoCount.bitmap;
        var count = $gameParty.numItems($dataItems[this._absSkill.ammo]);
        var c = b.textColor;
        if (count > 0) {
          b.textColor = Color.WHITE.CSS;
        } else
          b.textColor = Color.RED.CSS;

        var c2 = b.fontSize;
        b.fontSize = 14;
        b.drawText(count, 8, 2, 32, 24, 'left');

        b.textColor = c;
        b.fontSize = c2;
      }
    }

    _drawIcon() {
      this.bitmap.clear();
      if (this._iconIndex != null) {
        //SDK.drawIcon(4,5,this._iconIndex,this.bitmap,30);
        ImageManager.drawIconABS(4, 5, this._iconIndex, this.bitmap);
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
      this._spriteMask = new AlphaABS.LIBS.Sprite_Mask(ImageManager.loadPictureABS('ItemMask'));
      this._spriteMask.x = 1;
      this._spriteMask.y = 2;
      this._spriteMask.scale.x = 0.85;
      this._spriteMask.scale.y = this._spriteMask.scale.x;
      this.addChild(this._spriteMask);
    }

    _createHover() {
      this._hover = new AlphaABS.LIBS.Sprite_Hover(30, 30);
      this._hover.x = 4;
      this._hover.y = 5;
      this.addChild(this._hover);
    }

    _createHelp() {
      this._help = new AlphaABS.LIBS.UIObject_HelpHover(30, 30);
      this._help.move(4, 5);
      this._help.setHover(this._hover);
      this._help.setSkillABS(this._absSkill);
      this._help.setWeaponMode();
      this.addChild(this._help);
    }
  }

  AlphaABS.register(UIObject_ControlPanelItem);
})();
(function(){
  //UIObject_ControlPanelItemDummy
  //------------------------------------------------------------------------------
    function UIObject_ControlPanelItemDummy() {
        this.initialize.apply(this, arguments);
    }

    UIObject_ControlPanelItemDummy.prototype = Object.create(AlphaABS.LIBS.UIObject_ControlPanelItem.prototype);
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
  AlphaABS.register(UIObject_ControlPanelItemDummy);
})();

(function(){
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
        this._hoverHelp = new AlphaABS.LIBS.Sprite_Ext2(120);
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
      this._skillInfo = new AlphaABS.LIBS.UIObject_ABSSkillInfo(this._skillABS, this._weaponMode);
      AlphaABS.UTILS.linkSprite(this._hoverHelp, this._skillInfo);
      this.addChild(this._skillInfo);
    };

    UIObject_HelpHover.prototype._createSwing = function() {
      this._swing = new AlphaABS.LIBS.UIObject_OpacitySwing(this._skillInfo, 30);
          this._swing.setToUp();
    };

    UIObject_HelpHover.prototype._isSkillExist = function() {
      return (this._skillABS != null);
    };
    //END UIObject_HelpHover
  //------------------------------------------------------------------------------

  AlphaABS.register(UIObject_HelpHover);

})();

(function () {
    //UIObject_InputCircle
    //------------------------------------------------------------------------------
    function UIObject_InputCircle() {
        this.initialize.apply(this, arguments);
    }

    UIObject_InputCircle.prototype = Object.create(Sprite.prototype);
    UIObject_InputCircle.prototype.constructor = UIObject_InputCircle;

    UIObject_InputCircle.prototype.initialize = function (x, y, isOpen) {
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
        if (!this._isOpen) {
            this._set_opacity(0)
            radius = this._radius_min()
        }

        //Funcs
        this._create_segments();
        this._create_icons(this._get_standart_icon_pack());
        this._move_segments(radius);
    };

    UIObject_InputCircle.prototype.setIcons = function (arrayOfIndexes) {
        this._create_icons(arrayOfIndexes);
        if (!this._isOpen) this._set_opacity(0);
    }

    UIObject_InputCircle.prototype.setSpeed = function (speed) {
        this._moveSpeedX = speed;
    }

    UIObject_InputCircle.prototype.setHelps = function (arrayOfHelps) {
        this.helps[0] = arrayOfHelps[0] || null;
        this.helps[1] = arrayOfHelps[1] || null;
        this.helps[2] = arrayOfHelps[2] || null;
        this.helps[3] = arrayOfHelps[3] || null;
        if (this.helpShowIn) {
            this._helpIsHidden = true;
        }
        this._create_helps();
    }

    UIObject_InputCircle.prototype.isOpen = function () {
        return this._isOpen;
    }

    UIObject_InputCircle.prototype.open = function () {
        if (this._isOpen) return;
        if (this.isAnimate) return;
        this.r = this._radius_min();
        this._set_opacity(0);
        this.isAnimate = true;
    }

    UIObject_InputCircle.prototype.close = function () {
        if (!this._isOpen) return;
        if (this.isAnimate) return;
        this.r = this._radius_max();
        this._set_opacity(255);
        this.isAnimate = true;
        this._hide_help();
    }

    UIObject_InputCircle.prototype.hideAll = function () {
        SDK.times(4, function (i) {
            this.hideSegment(i);
        }.bind(this));
    }

    UIObject_InputCircle.prototype.enableAllIcons = function () {
        SDK.times(4, function (i) {
            this.disableIcon(i, false);
        }.bind(this));
    }

    UIObject_InputCircle.prototype.diselectAllIcons = function () {
        this._reset_colors();
        this.isSelected = false;
    }

    UIObject_InputCircle.prototype.unHideSegments = function () {
        SDK.times(4, function (i) {
            this.hideSegment(i, false);
        }.bind(this));
    }

    UIObject_InputCircle.prototype.reset = function () {
        this.unHideSegments();
        this.diselectAllIcons();
        this.enableAllIcons();
    }

    UIObject_InputCircle.prototype.showHelp = function () {
        this.helpShowIn = true;
    }

    UIObject_InputCircle.prototype.hideHelp = function () {
        this.helpShowIn = false;
    }

    UIObject_InputCircle.prototype.addListener = function (index, func) {
        this.segments[index].setClickHandler(func);
    }

    UIObject_InputCircle.prototype.click = function (index) {
        this.diselectAllIcons();
        this.optionLightTimer = 0;
        this.isClicked = true;
        this.segments[index].setBlendColor(UIObject_InputCircle.COLOR_CLICK);
    }

    UIObject_InputCircle.prototype.select = function (index) {
        this.diselectAllIcons();
        this.segments[index].setBlendColor(UIObject_InputCircle.COLOR_SELECTED);
        this.isSelected = true;
    }

    UIObject_InputCircle.prototype.hideSegment = function (index, isHided) {
        if (isHided === undefined)
            isHided = true;
        this.segments[index].visible = !isHided;
        if (this.icons[index])
            this.icons[index].visible = !isHided;

        if (this._helpsSprites[index]) {
            if (isHided == true) {
                this._helpsSprites[index].visible = false;
            } else {
                if (this.helpAllwaysShow || this.helpShowIn)
                    this._helpsSprites[index].visible = true;
            }
        }
    }

    UIObject_InputCircle.prototype.disableIcon = function (index, isDisabled) {
        if (isDisabled === undefined)
            isDisabled = true;
        if (!this.icons[index])
            return;
        else {
            if (isDisabled) {
                this.icons[index].setBlendColor(UIObject_InputCircle.COLOR_DISABLED);
            } else {
                this.icons[index].setBlendColor(Color.NONE);
            }
        }
    }

    UIObject_InputCircle.prototype.diselectAllIcons = function () {
        this._reset_colors();
        this.isSelected = false;
    }

    UIObject_InputCircle.prototype.update = function () {
        this._update_animation();
        this._update_click();
        this.segments.forEach(function (i) {
            i.update();
        });
        this._update_help();
    }

    //PRIVATE

    UIObject_InputCircle.prototype._create_segments = function () {
        var csT = new Sprite_Button();
        csT.bitmap = ImageManager.loadPictureABS('CircleSegment_small');
        var csD = new Sprite_Button();
        csD.bitmap = ImageManager.loadPictureABS('CircleSegment_small_down');
        var csL = new Sprite_Button();
        csL.bitmap = ImageManager.loadPictureABS('CircleSegment_small_L');
        var csR = new Sprite_Button();
        csR.bitmap = ImageManager.loadPictureABS('CircleSegment_small_R');
        this.segments = [csT, csR, csD, csL];
        this.segments.forEach(function (x) {
            this.addChild(x);
        }.bind(this));
    }

    UIObject_InputCircle.prototype._create_icons = function (arrayOfIndexes) {
        this.icons.forEach(function (x) {
            this.removeChild(x);
            x.visible = false;
        }.bind(this));

        this.icons = [];

        for (var i = 0; i < 4; i++) {
            if (arrayOfIndexes[i] !== undefined) {
                this.icons[i] = new Sprite(this._get_icon_bitmap(arrayOfIndexes[i]));
                //this.icons[i].anchor = this.segments[i].anchor;
                this._config_icon(i, this.icons[i]);
                this.segments[i].addChild(this.icons[i]);
            } else {
                this.icons[i] = undefined;
            }
        }
    }

    UIObject_InputCircle.prototype._move_segments = function (radius) {
        radius = SDK.check(radius, this._radius_max());

        //TOP
        //this.segments[0].anchor.x = 0.5;
        this.segments[0].x = -this._segment_HW() / 2;
        this.segments[0].y = -radius;

        //DOWN
        //this.segments[2].anchor.x = 0.5;
        //this.segments[2].anchor.y = 1;
        this.segments[2].x = this.segments[0].x;
        this.segments[2].y = radius - this._segment_HH();

        //LEFT
        //this.segments[3].anchor.y = 0.5;
        this.segments[3].x = -radius;
        this.segments[3].y = -this._segment_HW() / 2;

        //RIGHT
        //this.segments[1].anchor.x = 1;
        //this.segments[1].anchor.y = 0.5;
        this.segments[1].x = radius - this._segment_HH();
        this.segments[1].y = this.segments[3].y;
    }

    UIObject_InputCircle.prototype._config_icon = function (index, icon) {
        switch (index) {
            case 0:
                icon.anchor.x = 0.5;
                icon.x = this._segment_HW() / 2;
                break;
            case 1: //RIGHT
                icon.anchor.x = 1;
                icon.anchor.y = 0.5;
                icon.x = this._segment_HH();
                icon.y = this._segment_HW() / 2;
                break;
            case 2: //DOWN
                icon.anchor.x = 0.5;
                icon.anchor.y = 1;
                icon.x = this._segment_HW() / 2;
                icon.y = this._segment_HH();
                break;
            case 3:
                icon.anchor.y = 0.5;
                icon.y = this._segment_HW() / 2;
                break;
        }
    }

    UIObject_InputCircle.prototype._create_helps = function () {
        this._helpsSprites.forEach(function (item) {
            if (item != null) {
                item.parent.removeChild(item);
            }
        }.bind(this));
        this._helpsSprites = [];

        //UP
        if (this.helps[0] != null) {
            var bitmap = new Bitmap(this._segment_HW(), this._segment_HH());
            bitmap.addLoadListener(function () {
                //bitmap.fillAll(Color.RED);
                bitmap.drawText(this.helps[0], 0, 0, bitmap.width, bitmap.height, 'center');
            }.bind(this));
            var sprite = new Sprite(bitmap);
            sprite.visible = false;
            sprite.y = -this._segment_HH();
            this.segments[0].addChild(sprite);
            this._helpsSprites[0] = sprite;
        } else {
            this._helpsSprites[0] = null;
        }
        //LEFT
        if (this.helps[3] != null) {
            var bitmap = new Bitmap(this._segment_HW(), this._segment_HH());
            bitmap.addLoadListener(function () {
                //bitmap.fillAll(Color.RED);
                bitmap.drawText(this.helps[3], 0, 0, bitmap.width, bitmap.height, 'right');
            }.bind(this));
            var sprite = new Sprite(bitmap);
            sprite.visible = false;
            sprite.y = this._segment_HW() / 2;
            sprite.x = -4;
            sprite.anchor.y = 0.5;
            sprite.anchor.x = 1;
            this.segments[3].addChild(sprite);
            this._helpsSprites[3] = sprite;
        } else {
            this._helpsSprites[3] = null;
        }
        //DOWN
        if (this.helps[2] != null) {
            var bitmap = new Bitmap(this._segment_HW(), this._segment_HH());
            bitmap.addLoadListener(function () {
                //bitmap.fillAll(Color.RED);
                bitmap.drawText(this.helps[2], 0, 0, bitmap.width, bitmap.height, 'center');
            }.bind(this));
            var sprite = new Sprite(bitmap);
            sprite.visible = false;
            sprite.y = this._segment_HH();
            this.segments[2].addChild(sprite);
            this._helpsSprites[2] = sprite;
        } else {
            this._helpsSprites[2] = null;
        }
        //RIGHT
        if (this.helps[1] != null) {
            var bitmap = new Bitmap(this._segment_HW(), this._segment_HH());
            bitmap.addLoadListener(function () {
                //bitmap.fillAll(Color.RED);
                bitmap.drawText(this.helps[1], 0, 0, bitmap.width, bitmap.height, 'left');
            }.bind(this));
            var sprite = new Sprite(bitmap);
            sprite.anchor.y = 0.5;
            sprite.y = this._segment_HW() / 2;
            sprite.x = this._segment_HH() + 4;
            sprite.visible = false;
            this.segments[1].addChild(sprite);
            this._helpsSprites[1] = sprite;
        } else {
            this._helpsSprites[1] = null;
        }

    }

    UIObject_InputCircle.prototype._update_animation = function () {
        if (!this.isAnimate) return;
        if (this.isClicked) return;

        this._move_segments(this.r);
        if (!this._isOpen) {
            if (this.opacity <= 250) this._change_opacity(5);
            if (this.r < this._radius_max()) this.r += this._moveSpeedX;
            if (this.r >= this._radius_max()) {
                this._isOpen = true;
                this.isAnimate = false;
                this._set_opacity(255);
            }
        } else {
            if (this.opacity > 5) this._change_opacity(5, false);
            if (this.r > this._radius_min()) this.r -= this._moveSpeedX;
            if (this.r <= this._radius_min()) {
                this._isOpen = false;
                this.isAnimate = false;
                this._set_opacity(0);
            }
        }
    }

    UIObject_InputCircle.prototype._update_click = function () {
        if (this.optionLightTimer < UIObject_InputCircle.CLICK_TIME)
            this.optionLightTimer += 1;

        if (this.optionLightTimer == UIObject_InputCircle.CLICK_TIME) {
            if (!this.isSelected)
                this._reset_colors();
            this.isClicked = false;
        }
    }

    UIObject_InputCircle.prototype._change_opacity = function (value, isAdd) {
        isAdd = SDK.check(isAdd, true);
        var op = this.opacity;
        if (isAdd) {
            op += value;
        } else {
            op -= value;
        }
        this._set_opacity(op);
    }

    UIObject_InputCircle.prototype._update_help = function () {
        if (this.isAnimate) {
            this._hide_help();
        } else {
            if (this._isOpen)
                if (this.helpShowIn)
                    this._show_help();
                else
                    this._hide_help();
            else
                this._hide_help();
        }
    }

    UIObject_InputCircle.prototype._show_help = function () {
        if (this._helpIsHidden == false)
            return;

        for (var i = 0; i < 4; i++) {
            var sprite = this._helpsSprites[i] || null;
            if (sprite != null) {
                sprite.visible = (this.segments[i].visible == true);
            }
        }

        this._helpIsHidden = false;
    }

    UIObject_InputCircle.prototype._hide_help = function () {
        if (this._helpIsHidden == true)
            return;
        for (var i = 0; i < 4; i++) {
            var sprite = this._helpsSprites[i] || null;
            if (sprite != null) {
                sprite.visible = false;
            }
        }
        this._helpIsHidden = true;
    }

    UIObject_InputCircle.prototype._set_opacity = function (value) {
        this.opacity = value;
        if (value == 0)
            this.visible = false;
        else
            this.visible = true;
    }

    UIObject_InputCircle.prototype._get_standart_icon_pack = function () {
        return [null, null, null, null];
    }

    UIObject_InputCircle.prototype._get_icon_bitmap = function (index) {
        if (index == null)
            return ImageManager.loadEmptyBitmap();
        else
            return ImageManager.getIcon('img/ABS/', index, this._icon_size());
    }

    UIObject_InputCircle.prototype._reset_colors = function () {
        this.segments.forEach(function (x) {
            x.setBlendColor(Color.NONE);
        });
    }

    //VALUES

    UIObject_InputCircle.prototype._segment_HW = function () {
        return 78;
    }

    UIObject_InputCircle.prototype._segment_HH = function () {
        return 34;
    }

    UIObject_InputCircle.prototype._segment_VW = function () {
        return this._segment_HH();
    }

    UIObject_InputCircle.prototype._segment_VH = function () {
        return this._segment_HW();
    }

    UIObject_InputCircle.prototype._radius_max = function () {
        return 66;
    }

    UIObject_InputCircle.prototype._radius_min = function () {
        return 58;
    }

    UIObject_InputCircle.prototype._icon_size = function () {
        return 24;
    }

    SDK.setConstant(UIObject_InputCircle, 'CLICK_TIME', 5); //Время анимции клика (в кадрах)
    SDK.setConstant(UIObject_InputCircle, 'COLOR_CLICK', new Color(98, 225, 236, 220)); //Цвет при клике на сегмент
    SDK.setConstant(UIObject_InputCircle, 'COLOR_SELECTED', new Color(164, 255, 164, 220)); //Цвет выбраного сегмента
    SDK.setConstant(UIObject_InputCircle, 'COLOR_DISABLED', new Color(89, 89, 89, 120)); //Цвет отключённого сегмента

    AlphaABS.register(UIObject_InputCircle);
    //END UIObject_InputCircle
    //------------------------------------------------------------------------------
})();
(function(){
  //UIObject_InputCircle_FW
  //------------------------------------------------------------------------------
      function UIObject_InputCircle_FW() {
          this.initialize.apply(this, arguments);
      }

      UIObject_InputCircle_FW.prototype = Object.create(AlphaABS.LIBS.UIObject_InputCircle.prototype);
      UIObject_InputCircle_FW.prototype.constructor = UIObject_InputCircle_FW;

      UIObject_InputCircle_FW.prototype.initialize = function(battler, func) {
          AlphaABS.LIBS.UIObject_InputCircle.prototype.initialize.call(this, 0, 0, false);
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
          AlphaABS.LIBS.UIObject_InputCircle.prototype.showHelp.call(this);
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

  AlphaABS.register(UIObject_InputCircle_FW);

})();

(function () {
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
            this.config.step = Math.round(object.opacity / time); //timer.getMaxValue()
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
            if (this._start == false) return;

            if (this.isUp())
                this._updateUp();
            else
                this._updateDown();

            if (this.isReady() && this.repeat == true) {
                if (this.isUp()) {
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
            if (this.isUp()) {
                this.config.toV = this.config.start;
                this.config.from = 0;
            } else {
                this.config.toV = 0;
                this.config.from = this.config.start;
            }
            this._main.opacity = this.config.from;
        }

        _updateUp() {
            if (this.ready) return;

            if (this._main.opacity < (this.config.toV - this.config.step)) {
                this._main.opacity += this.config.step;
            } else {
                this._main.opacity = this.config.toV;
                this.ready = true;
            }
        }

        _updateDown() {
            if (this.ready) return;

            if (this._main.opacity > (this.config.toV + this.config.step)) {
                this._main.opacity -= this.config.step;
            } else {
                this._main.opacity = this.config.toV;
                this.ready = true;
            }
        }
    }
    AlphaABS.register(UIObject_OpacitySwing);
    //END UIObject_OpacitySwing
    //------------------------------------------------------------------------------

})();
(function () {

  var PointX = AlphaABS.UTILS.PointX;

  class UIObject_SkillPanelItem extends Sprite {
    constructor(index) {
      super(new Bitmap(40, 40));
      this.index = index;
      this.item = null;
      this._thread = setInterval(function () {
        this._updateABS();
      }.bind(this), 10);
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
      if (!this._pulsed) {
        this._spriteMask.setParams(120, Color.GREEN);
        this._spriteMask.showMaskOne(15);
        this._pulsed = true;
      }
    }

    isTouched() {
      return AlphaABS.UTILS.SMath.inRect(new PointX(TouchInput.x, TouchInput.y), this._getRectangle());
    }

    terminate() {
      if (this.parent)
        this.parent.removeChild(this);
      clearInterval(this._thread);
      this._help.terminate();
    }

    //PRIVATE
    _getRectangle() {
      return new Rectangle(AlphaABS.UTILS.toGlobalCoord(this, 'x'), AlphaABS.UTILS.toGlobalCoord(this, 'y'), this.width, this.height);
    }

    _updateABS() {
      if (!this.bitmap) return;
      this.bitmap.clear();
      if (this.spriteRecharge)
        this.spriteRecharge.bitmap.clear();
      this.item = $gamePlayer.battler().uiPanelSkills()[this.index];
      if (this.item !== null) {
        this._hover.update();
        this._help.update();
        this._hover.visible = true;
        var object = this.item.skill();
        SDK.drawIcon(6, 7, object.iconIndex, this.bitmap, 32);
        if (AlphaABS.BattleManagerABS.canUseABSSkillUI(this.item)) {
          this.bitmap.textColor = Color.WHITE.CSS;
          //this.spriteOverlay.visible = false;
          this.pulseReady();

        } else {
          this.bitmap.textColor = Color.RED.CSS;
          if (AlphaABS.BattleManagerABS.canUseSkillByTimer(this.item)) {
            //this.spriteOverlay.visible = true;
            if (!Utils.isMobileDevice())
              this.bitmap.drawText(AlphaABS.Key.symbol['sp' + (this.index + 1)].toUpperCase(), 6, 6, 32, 24, 'right');
          } else {
            //this.bitmap.drawText(this._framesToTime(t.timer.getMaxValue() - t.timer.getValue()), 6,6, 32, 24, 'right');
            this._pulsed = false;
            this._drawRecharge(this.item);
          }
        }

        if (!Utils.isMobileDevice())
          this.bitmap.drawText(AlphaABS.Key.symbol['sp' + (this.index + 1)].toUpperCase(), 6, 6, 32, 24, 'right');

        if (this.item.isItem()) {
          var count = $gameParty.numItems(object);
          var c = this.bitmap.textColor;
          if (count > 0) {
            this.bitmap.textColor = Color.WHITE.CSS;
          } else
            this.bitmap.textColor = Color.RED.CSS;

          var c2 = this.bitmap.fontSize;
          this.bitmap.fontSize = 14;
          this.bitmap.drawText(count, 8, 22, 32, 24, 'left');

          this.bitmap.textColor = c;
          this.bitmap.fontSize = c2;
        }

        if (this.item.isNeedAmmo()) {
          var count = $gameParty.numItems($dataItems[this.item.ammo]);
          var c = this.bitmap.textColor;
          if (count > 0) {
            this.bitmap.textColor = Color.WHITE.CSS;
          } else
            this.bitmap.textColor = Color.RED.CSS;

          var c2 = this.bitmap.fontSize;
          this.bitmap.fontSize = 14;
          this.bitmap.drawText(count, 8, 2, 32, 24, 'left');

          this.bitmap.textColor = c;
          this.bitmap.fontSize = c2;
        }
      } else {
        this._hover.visible = false;
      }
      if (this._spriteMask)
        this._spriteMask.update();
    }

    _calc_px_percent(current, max) {
      var c_inp = (100 * current) / max;
      return Math.floor((32 * c_inp) / 100);
    }

    _createMask() {
      this._spriteMask = new AlphaABS.LIBS.Sprite_Mask(ImageManager.loadPictureABS('ItemMask'));
      this._spriteMask.x = -1;
      this._spriteMask.y = 1;
      this.addChild(this._spriteMask);
    }

    _drawRecharge(skill) {
      var height = this._calc_px_percent(skill.timer.getValue(), skill.timer.getMaxValue());
      var color = (height < 32) ? ((height < 16) ? Color.RED : Color.YELLOW) : Color.GREEN;
      this.spriteRecharge.bitmap.fillRect(0, 32 - height, 32, height, color.CSS);
    }

    _createRecharge() {
      this.spriteRecharge = new Sprite(new Bitmap(32, 32));
      this.spriteRecharge.x = 6;
      this.spriteRecharge.y = 7;
      this.spriteRecharge.opacity = 100;
      this.addChild(this.spriteRecharge);
    }

    _createHover() {
      this._hover = new AlphaABS.LIBS.Sprite_Hover(32, 32);
      this._hover.x = 6;
      this._hover.y = 7;
      this.addChild(this._hover);
    }

    _createHelp() {
      this._help = new AlphaABS.LIBS.UIObject_HelpHover(32, 32);
      this._help.move(6, 7);
      this._help.setHover(this._hover);
      this._help.setSkillIndex(this.index);
      this.addChild(this._help);
    }

    _createOverlay() {
      //EMPTY
    }

  }

  AlphaABS.register(UIObject_SkillPanelItem);

})();
(function () {
  class UIObject_SkillPanelItem_L extends Sprite {
    constructor(index, actor) {
      super(new Bitmap(40, 40));
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
      if (!this._pulsed) {
        this._spriteMask.setParams(120, Color.GREEN);
        this._spriteMask.showMaskOne(15);
        this._pulsed = true;
      }
    }

    isTouched() {
      return AlphaABS.UTILS.SMath.inRect(new AlphaABS.UTILS.PointX(TouchInput.x, TouchInput.y), this._getRectangle());
    }

    update() {
      //super();
      this._update();
    }

    terminate() {
      if (this.parent)
        this.parent.removeChild(this);
    }

    //PRIVATE
    _getRectangle() {
      return new Rectangle(AlphaABS.UTILS.toGlobalCoord(this, 'x'), AlphaABS.UTILS.toGlobalCoord(this, 'y'), this.width, this.height);
    }

    _update() {
      if (!this.bitmap) return;
      this.bitmap.clear();
      if (this.actor && this.actor.uiPanelSkills()) {
        this.item = this.actor.uiPanelSkills()[this.index];
        if (this.item !== null) {
          var object = this.item.skill();
          SDK.drawIcon(6, 7, object.iconIndex, this.bitmap, 32);
          if (this.item.isItem()) {
            var count = $gameParty.numItems(object);
            var c = this.bitmap.textColor;
            if (count > 0) {
              this.bitmap.textColor = Color.WHITE.CSS;
            } else
              this.bitmap.textColor = Color.RED.CSS;

            var c2 = this.bitmap.fontSize;
            this.bitmap.fontSize = 14;
            this.bitmap.drawText(count, 8, 22, 32, 24, 'left');

            this.bitmap.textColor = c;
            this.bitmap.fontSize = c2;
          }
        }
        this.bitmap.textColor = Color.WHITE.CSS;
        if (!Utils.isMobileDevice())
          this.bitmap.drawText(AlphaABS.Key.symbol['sp' + (this.index + 1)].toUpperCase(), 6, 6, 32, 24, 'right');
        this._spriteMask.update();
      } else {
        this.bitmap.textColor = Color.WHITE.CSS;
        if (!Utils.isMobileDevice())
          this.bitmap.drawText(AlphaABS.Key.symbol['sp' + (this.index + 1)].toUpperCase(), 6, 6, 32, 24, 'right');
      }
    }

    _createMask() {
      this._spriteMask = new AlphaABS.LIBS.Sprite_Mask(ImageManager.loadPictureABS('ItemMask'));
      this._spriteMask.x = -1;
      this._spriteMask.y = 1;
      this.addChild(this._spriteMask);
    }
  }

  AlphaABS.register(UIObject_SkillPanelItem_L);
})();
(function () {
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
      this._items.forEach(function (item) {
        item.forEach(function (i) {
          if (i) i.terminate();
        });
      });
    }

    //PRIVATE
    _updateABS() {
      var items;
      try {
        items = $gamePlayer.battler().allIcons();
      } catch (e) {
        console.error(e);
        items = [];
      }
      if (this._lastCount == items.length) return;

      this._lastCount = items.length;
      for (var i = 0; i < items.length; i++) {
        var index = this._getIJForItem(i);
        var item = null;
        if (this._items[index.x]) {
          if (this._items[index.y]) {
            item = this._items[index.x][index.y];
          }
        }
        if (item) {
          item.setIndex(i);
        } else {
          if (!this._items[index.x]) {
            this._items[index.x] = [];
          }
          this._items[index.x][index.y] = new AlphaABS.LIBS.Sprite_UserStatusIcon();
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
      while (i >= this._rowCount) {
        j++;
        i = i - this._rowCount;
      }

      return new AlphaABS.UTILS.PointX(i, j);
    }

    _getXYForIJ(i, j) {
      return new AlphaABS.UTILS.PointX(this._firstItemX - (i * 34), j * 64);
    }

  }

  AlphaABS.register(UIObject_UserStatusBar);

})();
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_Gauge.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------
(function () {

  function UI_Gauge() {
    this.initialize.apply(this, arguments);
  }

  AlphaABS.register(UI_Gauge);

  UI_Gauge.prototype = Object.create(Sprite.prototype);
  UI_Gauge.prototype.constructor = UI_Gauge;

  UI_Gauge.prototype.initialize = function (width, height) {
    Sprite.prototype.initialize.call(this, new Bitmap(width || 1, height || 1));
    this.reset();
  };

  UI_Gauge.prototype.reset = function () {
    this._backgroundColor = '#000000';
    this._startColor = '#FFFFFF';
    this._endColor = '#FFFFFF';
    this._currentValue = 0;
    this._maxValue = 0;
    this._centerText = null;
    this._leftText = null;
    this._rightText = null;
    this._gaugeWidth = 0;
    this._lastValue = -1;
  };

  UI_Gauge.prototype.applyGeneratedGradient = function () {
    if (window.PLATFORM === undefined) return;
    var color = PLATFORM.Color.FromHex(this._startColor);
    this._endColor = color.getLightestColor(230).CSS;
  };

  UI_Gauge.prototype.setFont = function (fontName) {
    this.bitmap.fontFace = fontName;
  };

  UI_Gauge.prototype.setMaxValue = function (value) {
    this._maxValue = value;
    this._updateGaugeWidth();
  };

  UI_Gauge.prototype._updateGaugeWidth = function () {
    if (this._maxValue > 0 && this._currentValue < this._maxValue)
      this._gaugeWidth = Math.floor(
        (100 * this._currentValue / this._maxValue) * ((this.bitmap.width - 2) / 100));
    else
      this._gaugeWidth = this.bitmap.width;
  };

  UI_Gauge.prototype.setValue = function (value) {
    this._currentValue = value;
    this._updateGaugeWidth();
  };

  UI_Gauge.prototype.setGaugeColors = function (startHexColor, endHexColor) {
    this._startColor = startHexColor;
    this._endColor = endHexColor || this._startColor;
  };

  UI_Gauge.prototype.setBackgroundColor = function (hexColor) {
    this._backgroundColor = hexColor;
  };

  UI_Gauge.prototype.setCenterText = function (text, color) {
    this._centerText = this._makeTextData(text, color);
  };

  UI_Gauge.prototype._makeTextData = function (textValue, colorValue) {
    return {
      text: textValue || '',
      color: colorValue || '#FFFFFF'
    };
  };

  UI_Gauge.prototype.setRightText = function (text, color) {
    this._rightText = this._makeTextData(text, color);
  };

  UI_Gauge.prototype.setLeftText = function (text, color) {
    this._leftText = this._makeTextData(text, color);
  };

  UI_Gauge.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this._updateValues();
    if (this._isValueChanged()) {
      this.refresh();
    }
  };

  UI_Gauge.prototype._updateValues = function () {
    //EMPTY
  };

  UI_Gauge.prototype._isValueChanged = function () {
    return (this._currentValue != this._lastValue);
  };

  UI_Gauge.prototype.refresh = function () {
    this._lastValue = this._currentValue;
    this._drawAll();
  };

  UI_Gauge.prototype._drawAll = function () {
    this._drawBackground();
    this._drawGaugeLine();
    this._drawTexts();
  };

  UI_Gauge.prototype._drawBackground = function () {
    this.bitmap.fillRect(0, 0, this.bitmap.width, this.bitmap.height, this._backgroundColor);
  };

  UI_Gauge.prototype._drawGaugeLine = function () {
    this.bitmap.gradientFillRect(1, 1, this._gaugeWidth, this.bitmap.height - 2,
      this._startColor,
      this._endColor,
      false);

  };

  UI_Gauge.prototype._drawTexts = function () {
    this._setTextFontSize();
    this._drawText(this._leftText, 'left');
    this._drawText(this._centerText, 'center');
    this._drawText(this._rightText, 'right');
  };

  UI_Gauge.prototype._setTextFontSize = function () {
    this.bitmap.fontSize = this.bitmap.height - 4;
  };

  UI_Gauge.prototype._drawText = function (textData, position) {
    if (textData && textData.text != '') {
      var prevtextColor = this.bitmap.textColor;
      this.bitmap.textColor = textData.color;
      this.bitmap.drawText(textData.text, 4, 0, this.bitmap.width - 8, this.bitmap.height, position);
      this.bitmap.textColor = prevtextColor;
    }
  };

})();

//■ END UI_Gauge
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_GaugeABS.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------
(function () {

  function UI_GaugeABS() {
    this.initialize.apply(this, arguments);
  }

  AlphaABS.register(UI_GaugeABS);
  var UI_Gauge = AlphaABS.LIBS.UI_Gauge;

  UI_GaugeABS.prototype = Object.create(UI_Gauge.prototype);
  UI_GaugeABS.prototype.constructor = UI_GaugeABS;

  UI_GaugeABS.prototype.initialize = function (width, height) {
    UI_Gauge.prototype.initialize.call(this, width, height);
    this._battler = null;
    this._isShowValue = true;
  };

  UI_GaugeABS.prototype.setBattler = function (battler) {
    this._battler = battler;
    if (this._battler) {
      this._configGaugeForBattler();
    } else {
      this.reset();
    }
    this.refresh();
  };

  UI_GaugeABS.prototype._configGaugeForBattler = function () {
    //EMPTY
  };

  //{Font Name, Color, Background Color, Visible, Show value}
  UI_GaugeABS.prototype.applyPluginParameters = function (pluginParams) {
    try {
      this._applyFont(pluginParams['Font Name']);
      this._applyColors(pluginParams);

      this._isShowValue = pluginParams['Show value'];
      this.visible = pluginParams.Visible;

    } catch (e) {
      //LOGW(AlphaABS.SYSTEM.) //TODO:: Лог что ошибка при применении
      console.log('ERROR while apply Plugin Parameters on UI_Gauge ' + e.name);
      this.reset();
    } finally {
      this.refresh();
    }
  };

  UI_GaugeABS.prototype._applyFont = function (fontName) {
    if (fontName)
      this.setFont(fontName);
  };

  UI_GaugeABS.prototype._applyColors = function (pluginParams) {
    this.setBackgroundColor(pluginParams['Background Color']);
    this._applyGaugeColors(pluginParams.Color);
  };

  UI_GaugeABS.prototype._applyGaugeColors = function (colors) {
    if (colors) {
      var color1 = colors['Color 1'];
      var color2 = colors['Color 2'];
      this.setGaugeColors(color1, color2);
      if (color2 == '')
        this.applyGeneratedGradient();
    }
  };

})();


//■ END UI_GaugeABS
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
(function(){

  function UI_GaugeABS_HP() {
      this.initialize.apply(this, arguments);
  }

  AlphaABS.register(UI_GaugeABS_HP);
  var UI_GaugeABS = AlphaABS.LIBS.UI_GaugeABS;
  var Color = PLATFORM.Color;

  UI_GaugeABS_HP.prototype = Object.create(UI_GaugeABS.prototype);
  UI_GaugeABS_HP.prototype.constructor = UI_GaugeABS_HP;

  UI_GaugeABS_HP.prototype.initialize = function(width, height) {
    UI_GaugeABS.prototype.initialize.call(this, width, height);
    this.setGaugeColors(this._mainGaugeHexColor());
    this.applyGeneratedGradient();
  };

  UI_GaugeABS_HP.prototype._mainGaugeHexColor = function() {
    return Color.RED.hex();
  };

  //OVER
  UI_GaugeABS_HP.prototype._configGaugeForBattler = function() {
    UI_GaugeABS.prototype._configGaugeForBattler.call(this);
    this.setLeftText(this._leftGaugeText());
  };

  UI_GaugeABS_HP.prototype._leftGaugeText = function() {
    return TextManager.hpA;
  };

  //OVER
  UI_GaugeABS_HP.prototype._updateValues = function() {
    UI_GaugeABS.prototype._updateValues.call(this);
    if(this._battler) {
      this._updateMaxValue();
      this.setValue(this._currentGaugeValue());
    }
  };

  UI_GaugeABS_HP.prototype._updateMaxValue = function() {
    if(this._maxGaugeValue() != this._maxValue) {
      this.setMaxValue(this._maxGaugeValue());
      this.refresh();
    }
  };

  UI_GaugeABS_HP.prototype._maxGaugeValue = function() {
    return this._battler.mhp;
  };

  UI_GaugeABS_HP.prototype._currentGaugeValue = function() {
    return this._battler.hp;
  };

  //OVER
  UI_GaugeABS_HP.prototype.refresh = function() {
    if(this._isShowValue == true)
      this.setRightText(this._currentValue);
    UI_GaugeABS.prototype.refresh.call(this);
  };



  function UI_GaugeABS_MP() {
      this.initialize.apply(this, arguments);
  }

  AlphaABS.register(UI_GaugeABS_MP);
  var UI_GaugeABS_HP = AlphaABS.LIBS.UI_GaugeABS_HP;

  UI_GaugeABS_MP.prototype = Object.create(UI_GaugeABS_HP.prototype);
  UI_GaugeABS_MP.prototype.constructor = UI_GaugeABS_MP;

  UI_GaugeABS_MP.prototype.initialize = function(width, height) {
    UI_GaugeABS_HP.prototype.initialize.call(this, width, height);
  };

  UI_GaugeABS_MP.prototype._mainGaugeHexColor = function() {
    return Color.BLUE.hex();
  };

  UI_GaugeABS_MP.prototype._leftGaugeText = function() {
    return TextManager.mpA;
  };

  UI_GaugeABS_MP.prototype._maxGaugeValue = function() {
    return this._battler.mmp;
  };

  UI_GaugeABS_MP.prototype._currentGaugeValue = function() {
    return this._battler.mp;
  };



  function UI_GaugeABS_TP() {
      this.initialize.apply(this, arguments);
  }

  AlphaABS.register(UI_GaugeABS_TP);
  var UI_GaugeABS_HP = AlphaABS.LIBS.UI_GaugeABS_HP;

  UI_GaugeABS_TP.prototype = Object.create(UI_GaugeABS_HP.prototype);
  UI_GaugeABS_TP.prototype.constructor = UI_GaugeABS_TP;

  UI_GaugeABS_TP.prototype.initialize = function(width, height) {
    UI_GaugeABS_HP.prototype.initialize.call(this, width, height);
  };

  UI_GaugeABS_TP.prototype._mainGaugeHexColor = function() {
    return Color.GREEN.hex();
  };

  UI_GaugeABS_TP.prototype._leftGaugeText = function() {
    return TextManager.tpA;
  };

  UI_GaugeABS_TP.prototype._maxGaugeValue = function() {
    return this._battler.maxTp();
  };

  UI_GaugeABS_TP.prototype._currentGaugeValue = function() {
    return this._battler.tp;
  };



  function UI_GaugeABS_HPE() {
      this.initialize.apply(this, arguments);
  }

  AlphaABS.register(UI_GaugeABS_HPE);
  var UI_GaugeABS_HP = AlphaABS.LIBS.UI_GaugeABS_HP;

  UI_GaugeABS_HPE.prototype = Object.create(UI_GaugeABS_HP.prototype);
  UI_GaugeABS_HPE.prototype.constructor = UI_GaugeABS_HPE;

  UI_GaugeABS_HPE.prototype.initialize = function(width, height) {
    UI_GaugeABS_HP.prototype.initialize.call(this, width, height);
    this._isShowInPercent = true;
  };

  UI_GaugeABS_HPE.prototype.setShowInPercent = function(bool) {
    this._isShowInPercent = bool;
  };

  UI_GaugeABS_HPE.prototype._leftGaugeText = function() {
    return '';
  };

  //OVER
  UI_GaugeABS_HPE.prototype.refresh = function() {
    if(this._isShowValue == true && this._battler)
      this.setCenterText(this._textForValue());
    UI_GaugeABS.prototype.refresh.call(this);
  };

  UI_GaugeABS_HPE.prototype._textForValue = function() {
    if(this._isShowInPercent) {
      return this._getValueInPercent();
    } else {
      return this._currentValue;
    }
  };

  UI_GaugeABS_HPE.prototype._getValueInPercent = function() {
    var percent = Math.floor((this._currentValue * 100) / this._maxGaugeValue());
    if(percent <= 0)
      percent = 1;
    return (percent + '%');
  };

})();


(function () {
    //Window_EquipItem
    //------------------------------------------------------------------------------
    Window_EquipItem.prototype.onTouch = function (triggered) {
        if (this._sCircle) {
            if (this._sCircle.isOpen() && this._sCircle.isTouchedAny()) {
                return;
            }
        }
        Window_ItemList.prototype.onTouch.call(this, triggered);
    };

    var _Window_EquipItem_setActor = Window_EquipItem.prototype.setActor;
    Window_EquipItem.prototype.setActor = function (actor) {
        _Window_EquipItem_setActor.call(this, actor);
        if (this._actor != null && AlphaABS.Parameters.isWeaponsAllowed() == true) {
            this._createFavWeapCircle();
            this._createFavWeapButton();
        }
    };

    Window_EquipItem.prototype.update = function () {
        Window_ItemList.prototype.update.call(this);
        if (this._sCircle && this._sCircle.isOpen()) {
            var index = AlphaABS.Key.isTriggeredWS();
            if (index != null) {
                this.touchWeaponAt(index);
                this.refresh();
                return;
            }
        }
    };

    Window_EquipItem.prototype.drawItemNumber = function (item, x, y, width) {
        Window_ItemList.prototype.drawItemNumber.call(this, item, x, y, width);
        try {
            if (!this._actor) {
                return;
            }
            if (!DataManager.isWeapon(item))
                return;

            var symbol = this._actor.getFavWeapSymbol(item);
            if (symbol != null) {
                this.changeTextColor(Color.ORANGE.CSS);
                var spacer = '0000';
                if (Imported.YEP_ItemCore == true) {
                    spacer += '00';
                }
                if (!Utils.isMobileDevice())
                    this.drawText('[' + symbol.toUpperCase() + ']', x, y, width - this.textWidth(spacer), 'right');
                else
                    this.drawText('■', x, y, width - this.textWidth(spacer), 'right');
            }
        } catch (e) {
            console.error(e);
        }
    };

    //NEW
    Window_EquipItem.prototype.touchWeaponAt = function (index) {
        try {
            if (this._sCircle) {
                if (DataManager.isWeapon(this.item())) {
                    this._sCircle.click(index);
                    this._actor.setFavWeap(this.item(), index);
                    SoundManager.playEquip();
                    this._sCircle.refresh();
                    this.refresh();
                } else
                    SoundManager.playBuzzer();
            }
        } catch (e) {
            console.error(e);
        }
    };


    Window_EquipItem.prototype.refresh = function () {
        Window_ItemList.prototype.refresh.call(this);

    };

    Window_EquipItem.prototype.activate = function () {
        Window_ItemList.prototype.activate.call(this);
        if (this._sCircleButton) {
            this._sCircleButton.visible = true;
        }
    };

    Window_EquipItem.prototype.deactivate = function () {
        Window_ItemList.prototype.deactivate.call(this);
        try {
            if (this._sCircleButton) {
                this._sCircleButton.visible = false;
                if (this._sCircle && this._sCircle.isOpen())
                    this._sCircleButton.callClickHandler();
            }
        } catch (e) {
            console.error(e);
        }
    };

    Window_EquipItem.prototype._createFavWeapCircle = function () {
        try {
            this._sCircleBackSprite = new Sprite(new Bitmap((this.width / 2) - 4, this.height - 8));
            this._sCircleBackSprite.bitmap.addLoadListener(function () {
                this._sCircleBackSprite.bitmap.fillAll(Color.BLACK.reAlpha(200).CSS);
            }.bind(this));
            this._sCircleBackSprite.visible = false;
            this.addChild(this._sCircleBackSprite);
            this._sCircle = new AlphaABS.LIBS.UIObject_InputCircle_FW(this._actor, function (index) {
                this.touchWeaponAt(index);
            }.bind(this));
            this._sCircle.move(this._sCircleBackSprite.width / 2, this._sCircleBackSprite.height / 2);
            if (!Utils.isMobileDevice())
                this._sCircle.showHelp();
            this._sCircleBackSprite.addChild(this._sCircle);
        } catch (e) {
            console.error(e);
            this._sCircle = null;
        }
    };

    Window_EquipItem.prototype._createFavWeapButton = function () {
        this._sCircleButton = new AlphaABS.LIBS.UIObject_ClickIcon('switchWeapon');
        this._sCircleButton.move(this.width - 36, this.height - 36);
        this._sCircleButton.visible = false;
        this._sCircleButton.setClickHandler(function () {
            if (this._sCircleButton.isClicked()) {
                this._onEquipMode();
            } else {
                this._offEquipMode();
            }
        }.bind(this));
        this._sCircleButton.setKeyHandler(AlphaABS.Key.symbol.wC);
        this.addChild(this._sCircleButton);
    };

    Window_EquipItem.prototype.select = function (index) {
        Window_ItemList.prototype.select.call(this, index);
        try {
            if (!this._sCircle) return;
            if (this.maxCols() > 1) {
                this._placeFavWeapCircle(index % this.maxCols());
            } else {
                this._placeFavWeapCircle(0);
            }

            if (this._sCircleButton) {
                this._sCircleButton.visible = DataManager.isWeapon(this.item());

            }
        } catch (e) {
            console.error(e);
        }
    };

    Window_EquipItem.prototype._onEquipMode = function () {
        if (!this._sCircle) return;
        this._sCircle.open();
        this._sCircleBackSprite.visible = true;
    };

    Window_EquipItem.prototype._offEquipMode = function () {
        if (!this._sCircle) return;
        this._sCircle.close();
        this._sCircleBackSprite.visible = false;
    };

    Window_EquipItem.prototype._placeFavWeapCircle = function (place) {
        try {
            if (place <= 0) { //RIGHT
                this._sCircleBackSprite.move(this.width - 6, this.height - 4);
                this._sCircleBackSprite.setStaticAnchor(1, 1);
            } else { //LEFT
                this._sCircleBackSprite.move(6, this.height - 4);
                this._sCircleBackSprite.setStaticAnchor(0, 1);
            }
        } catch (e) {
            console.error(e);
        }
    };
    //END Window_EquipItem
    //------------------------------------------------------------------------------

})();
(function () {
  var _Window_EquipSlot_drawItem = Window_EquipSlot.prototype.drawItem;
  Window_EquipSlot.prototype.drawItem = function (index) {
    _Window_EquipSlot_drawItem.call(this, index);
    try {
      if (index !== null || index !== undefined)
        this._drawFavWeapSymbol(index);
    } catch (e) {
      console.error(e);
    }
  };

  //NEW
  Window_EquipSlot.prototype._drawFavWeapSymbol = function (index) {
    if (this._actor) {
      var item = this._actor.equips()[index];
      if (item) {
        var symbol = this._actor.getFavWeapSymbol(item);
        if (symbol != null) {
          this.changeTextColor(Color.ORANGE.CSS);
          var rect = this.itemRectForText(index);
          var drawSymbol = '[' + symbol.toUpperCase() + ']';
          if (Utils.isMobileDevice()) {
            drawSymbol = '■';
          }
          if (Imported.YEP_EquipCore == true) {
            this.contents.drawText(drawSymbol, rect.x + this._nameWidth, rect.y, rect.width - this._nameWidth, this.lineHeight(), 'right');
          } else {
            var iconBowWidth = Window_Base._iconWidth + 8;
            this.contents.drawText(drawSymbol, rect.x + 138 + iconBowWidth, rect.y, 312 - iconBowWidth, this.lineHeight(), 'right');
          }
        }
      }
    }
  };
})();
(function () {

  var Consts = AlphaABS.SYSTEM;

  //Window_ItemList
  //------------------------------------------------------------------------------
  var _Window_ItemList_isEnabled = Window_ItemList.prototype.isEnabled;
  Window_ItemList.prototype.isEnabled = function (item) {
    try {
      if (item && item.occasion == 1 && item.meta.ABS) {
        return false;
      } else
        return _Window_ItemList_isEnabled.call(this, item);
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  var _Window_ItemList_update = Window_ItemList.prototype.update;
  Window_ItemList.prototype.update = function () {
    _Window_ItemList_update.call(this);
    if (this.active) {
      this._absItemToPanel();
    }
  };

  Window_ItemList.prototype._absItemToPanel = function () {
    try {
      for (var i = 1; i < 9; i++) {
        if (Input.isTriggered("" + i)) {
          if (this.item() && this.item().occasion == 1 && this.item().meta.ABS) {
            LOG.p("Item " + this.item().name + " set to slot " + i);
            $gameParty.leader().setItemOnPanel(this.item().id, i - 1);
            SoundManager.playEquip();
            this.refresh();
          } else {
            LOGW.p(Consts.STRING_WARNING_SKILLOC);
            SoundManager.playBuzzer();
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  var _Window_ItemList_drawItemNumber = Window_ItemList.prototype.drawItemNumber;
  Window_ItemList.prototype.drawItemNumber = function (item, x, y, width) {
    _Window_ItemList_drawItemNumber.call(this, item, x, y, width);
    try {
      if (this._category != 'item') return;
      var index = $gameParty.leader().skillIndexOnUI(item.id, true);
      if (index >= 0) {
        this.changeTextColor(Color.ORANGE.CSS);
        this.drawText("[" + (index + 1) + "]", x + width - 60 - this.numberWidth(), y, 40, 'left');
      }
    } catch (e) {
      console.error(e);
    }
  };

  var _Window_ItemList_initialize = Window_ItemList.prototype.initialize;
  Window_ItemList.prototype.initialize = function (x, y, width, height) {
    _Window_ItemList_initialize.call(this, x, y, width, height);

    this._absPanel = new AlphaABS.LIBS.Sprite_SkillPanelABS_L();
    this._absPanel.x = (this.width / 2) - this._absPanel.width / 2;
    this._absPanel.y = this.height - this._absPanel.height - 10;
    if ($gameParty.leader()) {
      this._absPanel.refresh($gameParty.leader());
    }
    this._absPanel.visible = false;
    this.addChild(this._absPanel);
  };

  var _Window_ItemList_setCategory = Window_ItemList.prototype.setCategory;
  Window_ItemList.prototype.setCategory = function (category) {
    _Window_ItemList_setCategory.call(this, category);
    if (this._category == 'item') {
      this._absPanel.visible = true;
    } else
      this._absPanel.visible = false;
  };

  var _Window_ItemList_update_9090 = Window_ItemList.prototype.update;
  Window_ItemList.prototype.update = function () {
    _Window_ItemList_update_9090.call(this);
    try {
      if (this.active && this._absPanel.visible) {
        if (TouchInput.isTriggered()) {
          var tI = this._absPanel.checkTouch();
          if (tI != null) {
            if (this.item() && this.item().occasion == 1 && this.item().meta.ABS) {
              this._absPanel.touchSkillAt(tI);
              LOG.p("Item " + this.item().name + " set to slot " + tI);
              $gameParty.leader().setItemOnPanel(this.item().id, tI - 1);
              SoundManager.playEquip();
              this.refresh();
            } else {
              LOGW.p(Consts.STRING_WARNING_SKILLOC);
              SoundManager.playBuzzer();
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  //END Window_ItemList
  //------------------------------------------------------------------------------

})();
(function () {
  //Window_Options
  //------------------------------------------------------------------------------
  var _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function () {
    _Window_Options_makeCommandList.call(this);
    this._addUIOptions();
    if (AlphaABS.Parameters.isKeyBindingAllowed() && !Utils.isMobileDevice())
      this._addBindingOptions();
  };

  Window_Options.prototype._addUIOptions = function () {
    if ($gameMap.isABS()) {
      var optionUIEditAllow = AlphaABS.Parameters.isUIEditorAllowed();
      var optionUIVisibleAllow = AlphaABS.Parameters.isUIInOptionsAllowed();
      //if (optionUIVisibleAllow == true) this.addCommand(AlphaABS.SYSTEM.STRING_MENU_UIVIS, 'absUI');
      if (optionUIEditAllow == true && !Utils.isMobileDevice())
        this.addCommand(AlphaABS.SYSTEM.STRING_MENU_UIPOS, 'absEditUI');
    }
  };

  Window_Options.prototype._addBindingOptions = function () {
      this.addCommand(AlphaABS.SYSTEM.STRING_MENU_KEYBIND, 'absEditKeys');
  };

  Window_Options.prototype._isABSSymbol = function (symbol) {
    return symbol.contains('abs');
  };

  Window_Options.prototype._isABSSymbol2 = function (symbol) {
    return symbol.contains('absEdit');
  };

  var _Window_Options_statusText = Window_Options.prototype.statusText;
  Window_Options.prototype.statusText = function (index) {
    var symbol = this.commandSymbol(index);
    if (this._isABSSymbol2(symbol)) {
      return '';
    } else {
      return _Window_Options_statusText.call(this, index);
    }
  };

  var _Window_Options_changeValue = Window_Options.prototype.changeValue;
  Window_Options.prototype.changeValue = function (symbol, value) {
    if (this._isABSSymbol(symbol)) {
      if (this._isABSSymbol2(symbol)) {
        SoundManager.playCursor();
        if (symbol.contains('UI')) {
          if (!AlphaABS.BattleUI.isVisible()) {
            SoundManager.playBuzzer();
          } else
            SceneManager.push(AlphaABS.LIBS.Scene_InterfaceEdit);
          return;
        }
        if (symbol.contains('Keys')) {
          SceneManager.push(AlphaABS.LIBS.Scene_KeyBinder);
          return;
        }
      } else {
        var lastValue = this.getConfigValue(symbol);
        if (lastValue !== value) {
          if(AlphaABS.BattleUI.isUI())
            AlphaABS.BattleUI.getUI().setShowUI(value);
          this.redrawItem(this.findSymbol(symbol));
          SoundManager.playCursor();
        }
      }
    } else {
      _Window_Options_changeValue.call(this, symbol, value);
    }
  };

  var _Window_Options_getConfigValue = Window_Options.prototype.getConfigValue;
  Window_Options.prototype.getConfigValue = function (symbol) {
    if (this._isABSSymbol(symbol)) {
      if (this._isABSSymbol2(symbol)) {
        return true;
      } else {
        return AlphaABS.BattleUI.isVisible();
      }
    } else {
      return _Window_Options_getConfigValue.call(this, symbol);
    }
  };
  //END Window_Options
  //------------------------------------------------------------------------------

})();
(function () {

  var Consts = AlphaABS.SYSTEM;
  var LOG = new PLATFORM.DevLog("Window_SkillList");

  var _Window_SkillList_update = Window_SkillList.prototype.update;
  Window_SkillList.prototype.update = function () {
    _Window_SkillList_update.call(this);
    if (this.active) {
      this._absSkillToPanel();
    }
  };

  Window_SkillList.prototype._absSkillToPanel = function () {
    try {
      for (var i = 1; i < 9; i++) {
        if (Input.isTriggered("" + i)) {
          if (this.checkABSItem(this.item())) {
            LOG.p("Skill " + this.item().name + " set to slot " + i);
            this._actor.setSkillOnPanel(this.item().id, i - 1);
            SoundManager.playEquip();
            this.refresh();
          } else {
            LOGW.p(Consts.STRING_WARNING_SKILLOC);
            SoundManager.playBuzzer();
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  var _Window_SkillList_isEnabled = Window_SkillList.prototype.isEnabled;
  Window_SkillList.prototype.isEnabled = function (item) {
    if (this.checkABSItem(item)) {
      return false;
    } else
      return _Window_SkillList_isEnabled.call(this, item);
  };

  //NEW
  Window_SkillList.prototype.checkABSItem = function (item) {
    try {
      return (item && item.occasion == 1 && item.meta.ABS);
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  var _Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
  Window_SkillList.prototype.drawSkillCost = function (skill, x, y, width) {
    _Window_SkillList_drawSkillCost.call(this, skill, x, y, width);
    //Draw panel number of skill
    try {
      var index = this._actor.skillIndexOnUI(skill.id);
      if (index >= 0) {
        this.changeTextColor(Color.ORANGE.CSS);
        this.drawText("[" + (index + 1) + "]", x + width - 60 - this.costWidth(), y, 40, 'left');
      }
    } catch (e) {
      console.error(e);
    }
  };

  var _Window_SkillList_initialize = Window_SkillList.prototype.initialize;
  Window_SkillList.prototype.initialize = function (x, y, width, height) {
    _Window_SkillList_initialize.call(this, x, y, width, height);

    this._absPanel = new AlphaABS.LIBS.Sprite_SkillPanelABS_L();
    this._absPanel.x = (this.width / 2) - this._absPanel.width / 2;
    this._absPanel.y = this.height - this._absPanel.height - 10;
    this.addChild(this._absPanel);
  };

  var _Window_SkillList_setActor = Window_SkillList.prototype.setActor;
  Window_SkillList.prototype.setActor = function (actor) {
    try {
      if (this._actor !== actor) {
        this._absPanel.refresh(actor);
      }
    } catch (e) {
      console.error(e);
    }
    _Window_SkillList_setActor.call(this, actor);
  };

  var _Window_SkillList_update_432 = Window_SkillList.prototype.update;
  Window_SkillList.prototype.update = function () {
    _Window_SkillList_update_432.call(this);
    if (this.active) {
      if (TouchInput.isTriggered()) {
        try {
          var tI = this._absPanel.checkTouch();
          if (tI != null) {
            if (this.checkABSItem(this.item())) {
              this._absPanel.touchSkillAt(tI);
              LOG.p("Skill " + this.item().name + " set to slot " + tI);
              this._actor.setSkillOnPanel(this.item().id, tI - 1);
              SoundManager.playEquip();
              this.refresh();
            } else {
              SoundManager.playBuzzer();
              LOGW.p(Consts.STRING_WARNING_SKILLOC);
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  };
})();
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Extension_ABSPE.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
AlphaABS.SYSTEM.EXTENSIONS.ABSPE = {};
(function () {
    "use strict";
    var ABSPE = function () {};

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
            if (imageName) {
                try {
                    this.image = ImageManager.loadPicture(imageName);
                } catch (e) {
                    console.error(e);
                    this.image = null;
                }
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
            var t;

            switch (this.sizeChange) {
                case -1: //Decrease
                    t = (this.lifeTime / this.maxLife);
                    w = t * this.width;
                    h = t * this.height;
                    break;
                case 0: //No change
                    break;
                case 1: //Increase
                    t = (1 - (this.lifeTime / this.maxLife));
                    w = t * this.width;
                    h = t * this.height;
                    break;
            }
            return {
                width: w,
                height: h
            };
        }
    }

    class Emitter {
        constructor(x, y, limit, genericParticle) {
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
            if (this.particles.length == this.limit)
                return;
            if (this.isWork()) {
                var d = this.limit - this.particles.length;
                var need = Math.ceil(d * 0.01);
                if (need > 0) {
                    var t = 0;
                    while (t < need) {
                        this.particles.push(this.generate(this.arg));
                        t++;
                    }
                }
            }
        }

        move(x, y) {
            if (x instanceof AlphaABS.UTILS.PointX) {
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

            this.thread = setInterval(function () {
                this._update();
            }.bind(this), (16.666)); //1000 / 60
        }

        addEmitter(emit, start) {
            start = SDK.check(start, false);
            if (start) {
                emit.start();
            }
            this.emitters.push(emit);
        }

        renderParticle(particle, width, height) {
            try {
                var ctx = this.context;
                ctx.globalAlpha = particle.sOpacity;
                if (particle.rotation !== 0) {
                    ctx.save();
                    ctx.translate(particle.x, particle.y);
                    ctx.rotate(particle.rotation);
                    if (particle.image) {
                        ctx.drawImage(particle.image._canvas, -width / 2, -height / 2, width, height);
                    } else {
                        ctx.fillRect(-width / 2, -height / 2, width, height);
                    }
                    ctx.restore();
                } else {
                    if (particle.image) {
                        ctx.globalAlpha = 0.5;
                        if (!particle.centerDraw)
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
            } catch (e) {
                console.error(e);
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

            for (var i = count - 1; i >= 0; i--) {
                try {
                    e[i].update();
                    //Draw particles
                    var j = e[i].particles.length;
                    while (j--) {
                        var p = e[i].particles[j];
                        if (p.isAlive()) {
                            var size = p.calcSize();
                            w = size.width;
                            h = size.height;
                            if (p.image) {
                                this.context.globalAlpha = p.sOpacity * (p.lifeTime / p.maxLife);
                                this.renderParticle(p, w, h);
                            } else {
                                this.context.fillStyle = 'rgba(' + p.color.R + ',' + p.color.G + ',' + p.color.B + ', 1)';
                                this.context.globalAlpha = p.sOpacity * (p.lifeTime / p.maxLife);
                                this.renderParticle(p, w, h);
                            }
                            p.advance();
                            p.update();
                        } else { //DEAD
                            e[i].particles.splice(j, 1);
                        }
                    }
                } catch (er) {
                    console.error(er);
                }
            }
        }
    }

    ABSPE.init = function (bitmap) {
        return new ParticleEngine(bitmap);
    };

    ABSPE.initParticle = function (x, y, w, h, rotation, xVel, yVel, lifeTime, sizeChange, color, imageName, startOpacity) {
        return new Particle(x, y, w, h, rotation, xVel, yVel, lifeTime, sizeChange, color, imageName, startOpacity);
    };

    ABSPE.initEmitter = function (x, y, limit, genericParticle) {
        return new Emitter(x, y, limit, genericParticle);
    };

    AlphaABS.SYSTEM.EXTENSIONS.ABSPE = ABSPE;
    AlphaABS.register(ABSPE);
})();
// ■ END Extension_ABSPE.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Extension_Audio.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

    AlphaABS.SYSTEM.EXTENSIONS.AUDIO = true;

    var LOG = new PLATFORM.DevLog("AAudio");
    var PointX = AlphaABS.UTILS.PointX;

    //WebAudio
    //------------------------------------------------------------------------------
    WebAudio._contextABS = null;

    WebAudio.updateListenerPosition = function (point) {
        //LOG.p("Update audio position " + point.toString());
        WebAudio._contextABS.listener.setPosition(point.x, point.y, 0);
    }

    var _WebAudio_clear = WebAudio.prototype.clear;
    WebAudio.prototype.clear = function () {
        _WebAudio_clear.call(this);
        this._positionABS = null;
    }

    var _WebAudio_createContext = WebAudio._createContext;
    WebAudio._createContext = function () {
        WebAudio._contextABS = new(window.AudioContext || window.webkitAudioContext)();
        _WebAudio_createContext.call(this);
    };

    //NEW
    WebAudio.prototype.setPosition = function (point) {
        this._positionABS = point;
    }

    var _WebAudio_createNodes = WebAudio.prototype._createNodes;
    WebAudio.prototype._createNodes = function () {
        if (this._positionABS) {
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
            try {
                this._pannerNode.setPosition(this._positionABS.x, this._positionABS.y, 0);
            } catch (e) {
                
            }
            this._sourceNode.connect(this._gainNode);
            this._gainNode.connect(this._pannerNode);
            this._pannerNode.connect(context.destination);
        } else {
            _WebAudio_createNodes.call(this);
        }
    };

    var _WebAudio_connectNodes = WebAudio.prototype._connectNodes;
    WebAudio.prototype._connectNodes = function () {
        if (!this._positionABS) {
            _WebAudio_connectNodes.call(this);
        }
    };
    //END WebAudio
    //------------------------------------------------------------------------------

    //AudioManager
    //------------------------------------------------------------------------------
    //NEW
    AudioManager.playSeAt = function (se, point) {
        //LOG.p("Play SE at pos " + point.toString());
        try {
            if (se.name && point) {
                this._seBuffers = this._seBuffers.filter(function (audio) {
                    return audio.isPlaying();
                });
                var buffer = this.createBuffer('se', se.name);
                this.updateSeParameters(buffer, se);
                buffer.setPosition(point);
                buffer.play(false);
                this._seBuffers.push(buffer);
            }
        } catch (e) {
            console.error(e);
        }
    };

    //NEW
    AudioManager.playSeLoopAt = function (se, point) {
        try {
            if (se.name && point) {
                this._seBuffers = this._seBuffers.filter(function (audio) {
                    return audio.isPlaying();
                });
                var buffer = this.createBuffer('se', se.name);
                this.updateSeParameters(buffer, se);
                buffer.setPosition(point);
                buffer.play(true);
                this._seBuffers.push(buffer);
                return buffer;
            }
        } catch (e) {
            console.error(e);
            return null;
        } 
    };
    //END AudioManager
    //------------------------------------------------------------------------------

    //SoundManager
    //------------------------------------------------------------------------------
    //OVER
    SoundManager.playSystemSound = function (n, point) {
        if ($dataSystem) {
            if (point === undefined)
                AudioManager.playStaticSe($dataSystem.sounds[n]);
            else {
                if (point != null) {
                    //LOG.p("System sound " + n);
                    AudioManager.playSeAt($dataSystem.sounds[n], point);
                }
            }
        }
    };

    SoundManager.playEnemyAttackAt = function (point) {
        this.playSystemSound(9, point);
    };

    SoundManager.playEnemyDamageAt = function (point) {
        this.playSystemSound(10, point);
    };

    SoundManager.playEnemyCollapseAt = function (point) {
        this.playSystemSound(11, point);
    };

    SoundManager.playBossCollapse1At = function (point) {
        this.playSystemSound(12, point);
    };

    SoundManager.playBossCollapse2At = function (point) {
        this.playSystemSound(13, point);
    };

    SoundManager.playActorDamageAt = function (point) {
        this.playSystemSound(14, point);
    };

    SoundManager.playActorCollapseAt = function (point) {
        this.playSystemSound(15, point);
    };

    SoundManager.playRecoveryAt = function (point) {
        this.playSystemSound(16, point);
    };

    SoundManager.playMissAt = function (point) {
        this.playSystemSound(17, point);
    };

    SoundManager.playEvasionAt = function (point) {
        this.playSystemSound(18, point);
    };

    //END SoundManager
    //------------------------------------------------------------------------------

    //Game_Player
    //------------------------------------------------------------------------------
    Game_Player.prototype.updateMove = function () {
        Game_Character.prototype.updateMove.call(this);
        if (!this.isMoving()) {
            this._updateAudioABS();
        }
    };

    var _Game_Player_refresh = Game_Player.prototype.refresh;
    Game_Player.prototype.refresh = function () {
        _Game_Player_refresh.call(this);
        this._updateAudioABS();
    }

    //NEW
    Game_Player.prototype._updateAudioABS = function () {
        try {
            var t = new PointX(this._realX, this._realY).mapPointOnScreen();
            WebAudio.updateListenerPosition(t);
        } catch (e) {
            console.error(e);

        }
    }
    //END Game_Player
    //------------------------------------------------------------------------------

    //Sprite_Animation
    //------------------------------------------------------------------------------
    //OVER
    Sprite_Animation.prototype.processTimingData = function (timing) {
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
            var p = new PointX(this.x, this.y);
            p.convertToMap();
            AudioManager.playSeAt(timing.se, p.mapPointOnScreen());
        }
    };
    //END Sprite_Animation
    //------------------------------------------------------------------------------

})();
// ■ END Extension_Audio.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Extension_KeyBinding.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    AlphaABS.SYSTEM.EXTENSIONS.KEY_BINDING = true;

    var ABSKey = AlphaABS.Key;
    var ABSUtils = AlphaABS.UTILS;
    var PointX = ABSUtils.PointX;
    var Consts = AlphaABS.SYSTEM;

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
        $gameVariables._absUserKeys = AlphaABS.Key.symbol;
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
    }

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

    Scene_KeyBinderComplexWeapons.prototype.bindMode = function () {
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
    Window_KeyBinderMain.prototype.makeCommandList = function () {
        this.addGeneralBind();
        this.addComplexBind();
        this.addDefalutCommand();
    }

    //OVER
    Window_KeyBinderMain.prototype.update = function () {
        Window_Options.prototype.update.call(this);
        if (this._keyChangeMode == true) {
            ABSKey.checkTabPress();
        }
    }

    //NEW
    Window_KeyBinderMain.prototype.addGeneralBind = function () {
        this.addCommand(Consts.STRING_MENU_KB_TAB, 'tS');
    }

    //NEW
    Window_KeyBinderMain.prototype.addComplexBind = function () {
        this.addCommand(Consts.STRING_MENU_KB_SKILLS, 'complex_bind_1');
        this.addCommand(Consts.STRING_MENU_KB_CONTRL, 'complex_bind_2');
        if (AlphaABS.Parameters.isWeaponsAllowed() == true)
            this.addCommand(Consts.STRING_MENU_KB_WEAPON, 'complex_bind_3');
    }

    //NEW
    Window_KeyBinderMain.prototype.addDefalutCommand = function () {
        this.addCommand(Consts.STRING_MENU_KB_DEF, 'complex_default');
        this.addCommand(Consts.STRING_MENU_KB_BACK, 'complex_back');
    }

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
            return ABSKey.symbol[symbol].toUpperCase();
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
    }

    //NEW
    Window_KeyBinderMain.prototype.isComplexCommand = function (symbol) {
        return symbol.contains('complex');
    }

    //NEW
    Window_KeyBinderMain.prototype.isComplexBind = function (symbol) {
        return this.isComplexCommand(symbol) && symbol.contains('bind');
    }

    //NEW
    Window_KeyBinderMain.prototype.activateHelp = function () {
        if (this._helpWindow) {
            this._helpWindow.show();
            this._helpWindow.open();
        }
    }

    //NEW
    Window_KeyBinderMain.prototype.deactivateHelp = function () {
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

    Window_KeyBinderComplex.prototype.initialize = function (mode) {
        this._mode = mode;
        Window_KeyBinderMain.prototype.initialize.call(this);
    };

    Window_KeyBinderComplex.prototype.setViewWindow = function (viewWindow) {
        this._viewWindow = viewWindow;
    }

    //NEW
    Window_KeyBinderComplex.prototype.addGeneralBind = function () {
        switch (this._mode) {
            case 'controlPanel':
                this.addCommand(Consts.STRING_MENU_KB_ATTACK, 'cpA');
                if (AlphaABS.Parameters.isFollowAllowed() == true)
                    this.addCommand(Consts.STRING_MENU_KB_FOLLOW, 'cpW');
                if (AlphaABS.Parameters.isJumpAllowed() == true)
                    this.addCommand(Consts.STRING_MENU_KB_JUMP, 'cpS');
                if (AlphaABS.Parameters.isRotateAllowed() == true)
                    this.addCommand(Consts.STRING_MENU_KB_ROTATE, 'cpD');
                if (AlphaABS.Parameters.isWeaponsAllowed() == true)
                    this.addCommand(Consts.STRING_MENU_KB_WEAP, 'wC');
                break;
            case 'skillsPanel':
                var t = Consts.STRING_MENU_KB_SLOT;
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
                this.addCommand(Consts.STRING_MENU_KB_TOP, 'scW');
                this.addCommand(Consts.STRING_MENU_KB_RIGHT, 'scD');
                this.addCommand(Consts.STRING_MENU_KB_BOTTOM, 'scS');
                this.addCommand(Consts.STRING_MENU_KB_LEFT, 'scA');
                break;
        }
    }

    //OVER
    Window_KeyBinderComplex.prototype.refresh = function () {
        Window_KeyBinderMain.prototype.refresh.call(this);
        if (this._viewWindow) this._viewWindow.refresh();
    }

    //NEW
    Window_KeyBinderComplex.prototype.addComplexBind = function () {
        //EMPTY
    }

    //NEW
    Window_KeyBinderComplex.prototype.addDefalutCommand = function () {
        this.addCommand(Consts.STRING_MENU_KB_BACK, 'complex_back');
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

    Window_KeyBinderHelp.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._timer = new Game_TimerABS();
        this._tSprite = new Sprite(new Bitmap(width - 6, height - 6));
        this._tSprite.y = 0; //this._tSprite.height/2;
        //this._tSprite.opacity = 0;
        //this._tSprite.bitmap.fillRect(0,0,this._tSprite.bitmap.width,this._tSprite.bitmap.height, Color.RED.CSS);
        this._tSprite.bitmap.textColor = Color.RED.getLightestColor(200).CSS;
        this._tSprite.bitmap.drawText(Consts.STRING_MENU_KB_KEY, 0,
            this._tSprite.bitmap.height / 2,
            this._tSprite.bitmap.width, 1, 'center');
        this.addChild(this._tSprite);

        this.swing = new AlphaABS.LIBS.UIObject_OpacitySwing(this._tSprite, 70);
        this.swing.setRepeat();

        this.hide();
        this.close();
    }

    Window_KeyBinderHelp.prototype.close = function () {
        this.swing.stop();
        this.swing.reset();
        this._tSprite.visible = false;
        Window_Base.prototype.close.call(this);
    }

    Window_KeyBinderHelp.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        this.refresh();
    }

    Window_KeyBinderHelp.prototype.refresh = function () {
        if (this.isOpen()) {
            if (!this.swing.isStarted()) {
                this._tSprite.visible = true;
                this.swing.start();
            }
            this.swing.update();
        }
    }

    Window_KeyBinderHelp.prototype.clear = function () {}
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
    }

    Window_KeyBinderView.prototype.setViewNode = function (viewNode) {
        this._viewNode = viewNode;
        if (this._mode != 'weaponCircle') {
            this._viewNode.x = SDK.toCX(viewNode.width || 341, this.width);
            this._viewNode.y = SDK.toCX(viewNode.height || 48, this.height);
        } else {
            this._viewNode.x = SDK.toCX(viewNode._radius_max() * 0.15, this.width);
            this._viewNode.y = SDK.toCX(viewNode._radius_max() * 0.06, this.height);
        }
        this.addChild(this._viewNode);
    }

    Window_KeyBinderView.prototype.refresh = function () {
        if (this._viewNode) {
            this._viewNode.refresh();
        }
    }

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
    }
    //END Window_KeyBinderView
    //------------------------------------------------------------------------------

    //UIObject_InputCircleConfig
    //------------------------------------------------------------------------------
    function UIObject_InputCircleConfig() {
        this.initialize.apply(this, arguments);
    }

    UIObject_InputCircleConfig.prototype = Object.create(AlphaABS.LIBS.UIObject_InputCircle.prototype);
    UIObject_InputCircleConfig.prototype.constructor = UIObject_InputCircleConfig;

    UIObject_InputCircleConfig.prototype.refresh = function () {
        var t = AlphaABS.Key.symbol;
        var data = [t.scW, t.scD, t.scS, t.scA];
        this.setHelps(data.map(function (argument) {
            return argument.toUpperCase();
        }));
        this.showHelp();
    }

    //END UIObject_InputCircleConfig
    //------------------------------------------------------------------------------

})();

// ■ END Extension_KeyBinding.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Extension_Lighting.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
  if (Imported.TerraxLighting)
    AlphaABS.SYSTEM.EXTENSIONS.LIGHT = true;

  var xyLightArray = [];

  var _setLightAt = function (tiletype, x, y, radius, color, isOn, bright, isFlicker) {
    bright = PLATFORM.SDK.check(bright, 0.0);
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
      bright = PLATFORM.SDK.check(bright, 0.0);
      isFlicker = PLATFORM.SDK.check(isFlicker, false);
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
// ■ END Extension_Lighting.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
//==========================================================================================================================================================
// Alpha ABS MAIN
//==========================================================================================================================================================
(function () {

	//PLATFORM
	var SDK = PLATFORM.SDK;
	var Color = PLATFORM.Color;

	var LOG = new PLATFORM.DevLog("ABS");
	LOG.setColors("#a442a1", "#ffffff");

	var SMouse = AlphaABS.UTILS.SMouse;
	var LOGW = AlphaABS.SYSTEM.LOGW;
	var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;

	if (!Utils.isMobileDevice())
		SMouse.initMouseTrack();

	//Input
	//------------------------------------------------------------------------------
	Input.loadSchemeABS = function () {
		Input.toDefaultABS();
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
		LOGW.p("Inited v." + AlphaABS.Version + " build " + AlphaABS.Build + " on MV " + Utils.RPGMAKER_VERSION);
		if (!AlphaABS.Parameters.isLoaded()) {
			LOGW.p("Warning! Plugin parameters not finded, used default settings");
		} else {
			AlphaABS.Parameters.loadAllStrings();
		}
		BattleManagerABS.init();
	};
	//END Scene_Boot
	//------------------------------------------------------------------------------

	//==========================================================================================================================================================
	//MV WINDOWS
	//==========================================================================================================================================================

	//Window_MenuCommand
	//------------------------------------------------------------------------------
	//var _Window_MenuCommand_isFormationEnabled = Window_MenuCommand.prototype.isFormationEnabled;
	//Window_MenuCommand.prototype.isFormationEnabled = function () {
	//	return _Window_MenuCommand_isFormationEnabled.call(this) && !$gameMap.isABS();
	//};
	//END Window_MenuCommand
	//------------------------------------------------------------------------------

})();
//Plugin Alpha_ABS automatic build by MVPluginBuilder 1.2 Dev 27.05.2018
