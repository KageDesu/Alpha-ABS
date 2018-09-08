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

  $.createLineBetweenPoints = function(point1, point2) {
    var line = [];
    var tempPoint = point1;
    var endRect = new Rectangle(point2.x - 0.5, point2.y - 0.5, 1.5, 1.5);
    var safeCount = 500;
    while(true) {
      safeCount--;
      //"CHECK POINT".p();
      tempPoint = AlphaABS.UTILS.SMath.moveTo(tempPoint, point2, 1);
      //"POINT".p(tempPoint);
      if (AlphaABS.UTILS.SMath.inRect(tempPoint, endRect)) {
          //"POINT END".p();
          break;
      }
      line.push(tempPoint.applyRound());
      if(safeCount <= 0)
        break;
    }
    //"LINE POINTS".p(line.length);
    return line;
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
      //console.error(e);
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

  $.increment = function (value) {
    if (value == 0)
      return value;
    if (value > 0)
      return value + 1;
    if (value < 0)
      return value - 1;
  };

  $.decrement = function (value) {
    if (value == 0)
      return value;
    if (value > 0)
      return value - 1;
    if (value < 0)
      return value + 1;
    return value;
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

    applyCeil() {
      this._x = Math.ceil(this._x);
      this._y = Math.ceil(this._y);
      return this;
    }

    applyRound() {
      this._x = Math.round(this._x);
      this._y = Math.round(this._y);
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
      //if (Graphics._realScale != 1) {
        this._x = Graphics.pageToCanvasX(this._x);
        this._y = Graphics.pageToCanvasY(this._y);
      //}
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