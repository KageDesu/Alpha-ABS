//@[CODE STANDARD X1]

/* jshint -W097 */
/* jshint -W117 */

"use strict";

var Imported = Imported || {};
Imported.AlphaABS = true;

var AlphaABS = {};
AlphaABS.Version = '1.2';
AlphaABS.Build = 944;

AlphaABS.Versions = {
  'Alpha ABS': AlphaABS.Version + ' : ' + AlphaABS.Build,
  'PLATFORM' : '1.5L',
  'KD Core' : '1.1A',
  'CoffeeScript CLI': '2.3.1'
};

AlphaABS.LIBS = {};

AlphaABS.register = function (library) {
  this.LIBS[library.name] = library;
};

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
