//=============================================================================
// Cavefog.js
//=============================================================================

/*:
 * @plugindesc display fogs as XP fog
 * @author Caveman
 * 
 * @help  This plugin does not provide plugin commands.
 *
 * 'fog' is like a for from XP
 * put bitmap file at img/pictures.
 *
 * Map Note:
 *  write down following settings at map's note.
 *  <fgName:name>     name is the string, file name of fog (in img/pictures)
 *  <fgLock:number>    if 0 - foregroung is not locked, else - locked (as overlay)
 *  <fgHue:number>    fog's hue from 0 to 360.
 *  <fgOpacity:number>    fog's opacity from 0 to 255, you will not see fog in 0.
 *  <fgTone:string>    fog's tone "red,green,blue"
 *  <fgBlend:number>    fog's blend. 0 for Normal, 1 for Add, 2 for Subtract.
 *  <fgZoom:number>    fog's size (in %). 100 for normal size.
 *  <fgSx:number>     natural number is x scroll speed, by default it'll be 0.
 *  <fgSy:number>     natural number is y scroll speed, by default it'll be 0.
 * 
 * Ex.
 * <fgName:fog><fgSx:1><fgSy:1><fgZoom:200><fgOpacity:120><fgBlend:1>
 *
 */

(function() {

  //---------------------------------------------------------------------------
  // Fog class
  //---------------------------------------------------------------------------
  function CaveFog() {
    this.initialize.apply(this, arguments);
  }
  
  Object.defineProperties(CaveFog.prototype, {
      fogName: { get: function() { return this._fogName; }, configurable: true },
      fogLock: { get: function() { return this._fogLock; }, configurable: true },
      fogHue: { get: function() { return this._fogHue; }, configurable: true },
      fogTone: { get: function() { return this._fogTone; }, configurable: true },
      toned: { get: function() { return this._toned; }, configurable: true },
      fogOpacity: { get: function() { return this._fogOpacity; }, configurable: true },
      fogBlend: { get: function() { return this._fogBlend; }, configurable: true },
      fogZoom: { get: function() { return this._fogZoom; }, configurable: true },
      fogSx: { get: function() { return this._fogSx; }, configurable: true },
      fogSy: { get: function() { return this._fogSy; }, configurable: true },
      fogX: { get: function() { return this._fogX; }, configurable: true },
      fogY: { get: function() { return this._fogY; }, configurable: true },
  });

  CaveFog.prototype.initialize = function() {
    this.initFog();
  };
  
  CaveFog.prototype.initFog = function() {
    this._fogName = '';
    this._fogLock = 0;
    this._fogHue = 0;
    this._fogTone = [0,0,0];
    this._toned = false;
    this._fogOpacity = 255;
    this._fogBlend = 0;
    this._fogZoom = 100;
    this._fogSx = 0;
    this._fogSy = 0;
    this._fogX = 0;
    this._fogY = 0;
  };
  
  // extract for from part note
  CaveFog.prototype.extractNotes = function(text) {
      var re = /<([^<>:]+)(:?)([^>]*)>/g;
      // clear for
      this.initFog();
      var meta = {};
      // parse note
      for (;;) {
          var match = re.exec(text);
          if (match) {
              if (match[2] === ':') {
                  meta[match[1]] = match[3];
              } else {
                  meta[match[1]] = true;
              }
          } else {
              break;
          }
      }
      // setup fog
      this._fogName = meta.fgName || '';
      this._fogLock = Number(meta.fgLock) || 0;
      this._fogHue = Number(meta.fgHue) || 0;   
      if (meta.fgTone != null) {
        toneStr = meta.fgTone.split(',', 3);
        this._fogTone = [Number(toneStr[0]), Number(toneStr[1]), Number(toneStr[2])];
        this._toned = true;
      }
      this._fogOpacity = Number(meta.fgOpacity) || 255;
      this._fogBlend = Number(meta.fgBlend) || 0;
      this._fogZoom = Number(meta.fgZoom) || 100;
      this._fogSx = Number(meta.fgSx) || 0;
      this._fogSy = Number(meta.fgSy) || 0;
      this._fogX = 0;
      this._fogY = 0;
  };
    
    

  var _Game_Map_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function() {
    _Game_Map_initialize.call(this);
    this.initFog();
  };

  Game_Map.prototype.initFog = function() {
    this._fogDefined = true;
    this._fogs = [];
  };

  Game_Map.prototype.guardFog = function(){
    if(!this._fogDefined){
      this.initFog();
    }
  };

  Game_Map.prototype.fog = function(i) {
    this.guardFog();
    return this._fogs[i];
  };
  
  Game_Map.prototype.fogs = function() {
    this.guardFog();
    return this._fogs;
  };

  //
  // set fog by reading map's note.
  //
  var _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this.setupFogs();
  };

  Game_Map.prototype.setupFogs = function() {
     //var re = /<fog:(\d+)>(.*?)<\/fog>/gm; // global regex
     var re = /<fog:(\d+)>((?:.|[\s\n]*)*?)<\/fog>/gm
      // clear for
      this.initFog();
      var meta = {};
      // parse note
      
      for (;;) {
          var match = re.exec($dataMap.note);
          if (match) {
              this._fogs[Number(match[1])] = new CaveFog();
              this._fogs[Number(match[1])].extractNotes(match[2]);
          } else {
              break;
          }
      }
  };

  //
  // to display fog
  //
  var _Game_Map_setDisplayPos = Game_Map.prototype.setDisplayPos;
  Game_Map.prototype.setDisplayPos = function(x, y) {
    _Game_Map_setDisplayPos.call(this, x, y);
    this.guardFog();
    for (var i = 1; i < this._fogs.length; i++) {
        if (this.isLoopHorizontal()) {
            this._fogs[i]._fogX = x;
        } else {
            this._fogs[i]._fogX = this._displayX;
        }
        if (this.isLoopVertical()) {
            this._fogs[i]._fogY = y;
        } else {
            this._fogs[i]._fogY = this._displayY;
        }
    }
   
  };

  Game_Map.prototype.fogOx = function(i) {
      this.guardFog();
      if (this._fogs[i]._fogLock != 0) {
          return -this._fogs[i]._fogX * this.tileWidth();
      } else if (this._fogs[i]._fogSx != 0) {
          return -this._fogs[i]._fogX * this.tileWidth() / 2;
      } else {
          return 0;
      }
  };

  Game_Map.prototype.fogOy = function(i) {
      this.guardFog();
      if (this._fogs[i]._fogLock != 0) {
          return -this._fogs[i]._fogY * this.tileHeight();
      } else if (this._fogs[i]._fogSy != 0) {
          return -this._fogs[i]._fogY * this.tileHeight() / 2;
      } else {
          return 0;
      }
  };


  var _Game_Map_scrollDown = Game_Map.prototype.scrollDown;
  Game_Map.prototype.scrollDown = function(distance) {
    var lastY = this._displayY;
    _Game_Map_scrollDown.call(this, distance);
    this.guardFog();
    
     for (var i = 1; i < this._fogs.length; i++) {
        if (this.isLoopVertical()) {
            if (this._fogs[i]._fogSy != 0) {
              this._fogs[i]._fogY -= distance;
            }
        } else if (this.height() >= this.screenTileY()) {
            var displayY = Math.min(lastY + distance, this.height() - this.screenTileY());
            this._fogs[i]._fogY -= (displayY - lastY);
        }
     }
  };
  
  
  var _Game_Map_scrollUp = Game_Map.prototype.scrollUp;
  Game_Map.prototype.scrollUp = function(distance) {
     var lastY = this._displayY;
     _Game_Map_scrollUp.call(this, distance);
     this.guardFog();
    
     for (var i = 1; i < this._fogs.length; i++) {
        if (this.isLoopVertical()) {
          if (this._fogs[i]._fogSy) {
            this._fogs[i]._fogY += distance;
          }
        } else if (this.height() >= this.screenTileY()) {
          var displayY = Math.max(lastY - distance, 0);
          this._fogs[i]._fogY -= (displayY - lastY);
        }
     }
  };

  var _Game_Map_scrollLeft = Game_Map.prototype.scrollLeft;
  Game_Map.prototype.scrollLeft = function(distance) {
      var lastX = this._displayX;
      _Game_Map_scrollLeft.call(this, distance);
      this.guardFog();
    
      for (var i = 1; i < this._fogs.length; i++) {
          if (this.isLoopHorizontal()) {
            if (this._fogs[i]._fogSx != 0) {
              this._fogs[i]._fogX += distance;
            }
          } else if (this.width() >= this.screenTileX()) {
            var displayX = Math.max(lastX - distance, 0);
            this._fogs[i]._fogX -= (displayX - lastX);
          }
      }
  };

  var _Game_Map_scrollRight = Game_Map.prototype.scrollRight;
  Game_Map.prototype.scrollRight = function(distance) {
      var lastX = this._displayX;
      _Game_Map_scrollRight.call(this, distance);
      this.guardFog();
      
      for (var i = 1; i < this._fogs.length; i++) {
          if (this.isLoopHorizontal()) {
            if (this._fogs[i]._fogSx != 0) {
              this._fogs[i]._fogX -= distance;
            }
          } else if (this.width() >= this.screenTileX()) {
            var displayX = Math.min(lastX + distance,
            this.width() - this.screenTileX());
            this._fogs[i]._fogX -= (displayX - lastX);
          }
      }
  };


  //
  // update fog
  //
  var _Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function(sceneActive) {
    _Game_Map_update.call(this, sceneActive);
    this.updateFog();
  };

  Game_Map.prototype.updateFog = function() {
      this.guardFog();
      for (var i = 1; i < this._fogs.length; i++) {
          if (this._fogs[i]._fogSx != 0) {
              this._fogs[i]._fogX += this._fogs[i]._fogSx / this.tileWidth() / 2;
          }
          if (this._fogs[i]._fogSy) {
              this._fogs[i]._fogY += this._fogs[i]._fogSy / this.tileHeight() / 2;
          }
      } 
  };

  //
  // sprites
  //
  var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
      _Spriteset_Map_createLowerLayer.call(this);
      this.createFog();
  };

  var _Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function() {
      _Spriteset_Map_update.call(this);
      this.updateFog();
  };

  Spriteset_Map.prototype.createFog = function() {
      // in order to display under the weather sprites:
      this._baseSprite.removeChild(this._weather);
      this._fogs = [];
      this._fogNames = [];
      this._fogHues = [];
      for (var i=1; i < $gameMap.fogs().length; i++) {
          this._fogs[i] = new TilingSprite();
          this._fogs[i].move(0, 0, Graphics.width, Graphics.height);
          this._baseSprite.addChild(this._fogs[i]);
      }
      this._baseSprite.addChild(this._weather);
  };

  Spriteset_Map.prototype.updateFog = function() {
      for (var i=1; i < $gameMap.fogs().length; i++) {
          if (this._fogNames[i] !== $gameMap.fog(i).fogName || this._fogHues[i] !== $gameMap.fog(i).fogHue) {
              this._fogNames[i] = $gameMap.fog(i).fogName;
              this._fogHues[i] = $gameMap.fog(i).fogHue;
              this._fogs[i].bitmap = ImageManager.loadPicture(this._fogNames[i], this._fogHues[i]);
          }
      
   
        if (this._fogs[i].bitmap) {
            this._fogs[i].origin.x = $gameMap.fogOx(i);
            this._fogs[i].origin.y = $gameMap.fogOy(i);  
            this._fogs[i].opacity = $gameMap.fog(i).fogOpacity;
            this._fogs[i].scale.x = $gameMap.fog(i).fogZoom/100;
            this._fogs[i].scale.y = $gameMap.fog(i).fogZoom/100;
            this._fogs[i].blendMode = $gameMap.fog(i).fogBlend;  
            
            if ($gameMap.fog(i).toned) {
              tint = $gameMap.fog(i).fogTone
              this._fogs[i].tint =  tint[0] << 16 |  tint[1] << 8 |  tint[2]; 
            }
        }
      }
  };

})();
