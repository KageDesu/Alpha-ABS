//==========================================================================================================================================================
// JSPlatform
//==========================================================================================================================================================
var PLATFORM = PLATFORM || {};

if (!PLATFORM.Version) {
  (function ($) {
    $.Version = 150;
    $.VersionString = '1.5L';

    "use strict";

    //==============================================================================
    //Расширение стандартных классов MV
    //==============================================================================

    //TouchInput
    //------------------------------------------------------------------------------
    var _JSPlatform_3442_TouchInput_onMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function (event) {
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

    //SDK EXTENSIONS
    //------------------------------------------------------------------------------

    KDCore.SDK.smartRand = function (n, s, r) { //1.2
      n = SDK.check(n, 1);
      s = SDK.check(s, 0);
      r = SDK.check(r, true);
      if (r)
        return Math.round((Math.random() * n) - s);
      else
        return (Math.random() * n) - s;
    };

    KDCore.SDK.toCX = function (width, sourceWidth) {
      sourceWidth = SDK.check(sourceWidth, Graphics.width);
      return ((sourceWidth / 2) - (width / 2));
    };

    /**
     * Корректировка округления десятичных дробей.
     * (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
     *
     * @param {String}  type  Тип корректировки.
     * @param {Number}  value Число.
     * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
     * @returns {Number} Скорректированное значение.
     */
    KDCore.SDK.decimalAdjust = function (type, value, exp) {
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
    };

    KDCore.SDK.applyInterface = function (targetClass, interfacex) {
      for (var i in interfacex) {
        if (interfacex.hasOwnProperty(i)) {
          targetClass.prototype[i] = interfacex[i];
        }
      }
    };
    //END SDK
    //------------------------------------------------------------------------------



    //==============================================================================
    //Общие настройки
    //==============================================================================
    //Настройка версий
    $.Versions = {};

    //Расширение
    $.extendMe = function (obj) {
      obj.Color = KDCore.Color;
      obj.SDK = KDCore.SDK;
      obj.DevLog = KDCore.DevLog;
    }

    $.extendMe($);

  })(PLATFORM);
  //------------------------------------------------------------------------------

}

var SDK = KDCore.SDK;
var Color = KDCore.Color;