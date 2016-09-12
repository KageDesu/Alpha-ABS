//=============================================================================
// EventTuning.js
//=============================================================================

/*:
 * @plugindesc Event tuning
 * @author Caveman
 * @version 1.2
 * @license use as you wish
 * 
 *
 * @param BBoxDestination
 * @desc Big destination for big events.
 * @default 0
 * 
 * @help
 * Event Comments:
 *  write down following settings at event comments (each tuning in new comment)
 *  
 *  [es|xs|ys|zs]     
 *      use this comment for setting event graphic shifts in px. by x, y, z axis 
 *      xs > 0 => right, else => left
 *      ys > 0 => down, else => up
 *      use zs for setting event priority above/below others
 *
 *  [bbox|bbTurn|x_sub|x_add|y_sub|y_add]
 *      use this comment for setting bounding box of event as shifts from event pos
 *      (all params in tiles)
 * 
 *                  y_sub
 *          x_sub     X      x_add    
 *                  y_add
 *
 *      set bbTurn = 1 if your big event should react for turn
 * 
 *  [rot|angle|speed]
 *      use this comment if you want to rotate or twist event
 *      angle - angle in degree (clockwise)
 *      speed - rotate speed in degree on frame (clockwise) 
 *
 *  [zoom|x|y]
 *      use this comment if you want to zoom event
 *      x - x-zooming
 *      y - y-zooming
 * 
 *  [add|pic|type|x|y|sx|sy|sz]
 *      use this comment if you want to add new graphics to event
 *      pic - name of tileset or charset (depends of type)
 *      type - t = tileset, c = charset, a = charset animation
 *      x,y - graphic position in charset or tileset (in tile sizes)
 *      sx, sy, sz - shifts as it is in tage 'es'
 */
 (function() {
   
  var parameters = PluginManager.parameters('EventTuning');
  var bboxDestination = Number(parameters['BBoxDestination'] || 0);
  //---------------------------------------------------------------------------
  // AddGraphic class
  //---------------------------------------------------------------------------
  function AddGraphic() {
    this.initialize.apply(this, arguments);
  }
  
  Object.defineProperties(AddGraphic.prototype, {
      xs: { get: function() { return this._xs; }, configurable: true },
      ys: { get: function() { return this._ys; }, configurable: true },
      zs: { get: function() { return this._zs; }, configurable: true },
      rangle: { get: function() { return this._rangle; }, configurable: true },
      tileX: { get: function() { return this._tileX; }, configurable: true },
      tileY: { get: function() { return this._tileY; }, configurable: true },
      tileset: { get: function() { return this._tileset; }, configurable: true },
      mode: { get: function() { return this._mode; }, configurable: true },
  });

  AddGraphic.prototype.initialize = function(tileset, mode, tile_x, tile_y, xs, ys, zs) {
      this._xs = xs;
      this._ys = ys;
      this._zs = zs;
      this._tileset = tileset;
      this._mode = mode;
      this._tileX = tile_x;
      this._tileY = tile_y;
      this._rangle = 0;
  };
  
  //---------------------------------------------------------------------------
  // Sprite_Add class
  //---------------------------------------------------------------------------
  function Sprite_Add() {
      this.initialize.apply(this, arguments);
  }
  
  Sprite_Add.prototype = Object.create(Sprite_Base.prototype);
  Sprite_Add.prototype.constructor = Sprite_Add;
  
  Sprite_Add.prototype.initialize = function(character, add) {
      Sprite_Base.prototype.initialize.call(this);
      this._add = add;
      if (this._add.mode > 0) {
          this._curX = this._add.tileX;
      }
      this._aniCount = 0;
      this._character = character;
  };

  Sprite_Add.prototype.update = function() {
      Sprite_Base.prototype.update.call(this);
      if (!this._isLoaded) {
          this.updateBitmap();
          this._isLoaded = true;
      }
      this.updateAni();
      this.updateFrame();
      this.updatePosition();
      this.updateOther();
  };
  
  Sprite_Add.prototype.updateBitmap = function() {
      if (this._add.mode === 0) {
         this.setTileBitmap();
      } else {
         this.setCharacterBitmap();
      }
  }; 
  
  Sprite_Add.prototype.setCharacterBitmap = function() {
      this.bitmap = ImageManager.loadCharacter(this._add.tileset);
      this._isBigCharacter = ImageManager.isBigCharacter(this._add.tileset);
  };
  
  Sprite_Add.prototype.setTileBitmap = function() {    
      this.bitmap = ImageManager.loadTileset(this._add.tileset);
  }

  Sprite_Add.prototype.updateFrame = function() {
      if (this._add.mode === 0) {
          this.updateTileFrame();
      } else {
          this.updateCharacterFrame();
      }
  };

  Sprite_Add.prototype.updateTileFrame = function() {
      var pw = this.patternWidth();
      var ph = this.patternHeight();
      var sx = this._add.tileX * pw;
      var sy = this._add.tileY * ph;
      this.setFrame(sx, sy, pw, ph);
  };
  
  Sprite_Add.prototype.updateCharacterFrame = function() {
      var pw = this.patternWidth();
      var ph = this.patternHeight();
      var sx = this._curX * pw;
      var sy = this._add.tileY * ph;
      this.setFrame(sx, sy, pw, ph);
  };
  
  Sprite_Add.prototype.updateAni = function() {
      if (this._add.mode === 2) { // animation 
          this._aniCount += 1;
          if (this._aniCount > 18 - this._character._moveFrequency * 2) {
              this._aniCount = 0;
              this._curX += 1;
              if (this._curX > 2) this._curX = 0;
          }
      }
  };
  
  Sprite_Add.prototype.updatePosition = function() {
      this.x = this._character.screenX() - $gameMap.tileWidth() / 2 + this._add.xs;
      this.y = this._character.screenY() - $gameMap.tileHeight() + this._add.ys;
      this.z = this._character.screenZ() + this._add.zs;
  };
  
  Sprite_Add.prototype.updateOther = function() {
      this.opacity = this._character._opacity;
      this.visible = !this._character.isTransparent();
      this.blendMode = this._character.blendMode();
      this.angle = this._add.rangle;
  };

  Sprite_Add.prototype.patternWidth = function() {
      if (this._add.mode === 0) {
          return $gameMap.tileWidth();
      } else if (this._isBigCharacter) {
          return this.bitmap.width / 3;
      } else {
          return this.bitmap.width / 12;
      }
  };
  
  Sprite_Add.prototype.patternHeight = function() {
      if (this._add.mode === 0) {
          return $gameMap.tileHeight();
      } else if (this._isBigCharacter) {
          return this.bitmap.height / 4;
      } else {
          return this.bitmap.height / 8;
      }
  };
  
  
  //---------------------------------------------------------------------------
  // Game_Event class additions
  //---------------------------------------------------------------------------
  var _Game_Event_initialize = Game_Event.prototype.initialize;
  Game_Event.prototype.initialize = function(mapId, eventId) {    
      this.initEventTuning(); 
      _Game_Event_initialize.call(this, mapId, eventId);      
  };

  // init all additional params
  Game_Event.prototype.initEventTuning = function(){
      // shifts
      this._xs = 0;
      this._ys = 0;
      this._zs = 0;
      // big event
      this._xSub = 0;
      this._xAdd = 0;
      this._ySub = 0;
      this._yAdd = 0;
      this._bbTurn = false; // check turns of Big Event
      // rotate
      this._rAngle = 0;
      this._rSpeed = 0;
      // zoom
      this._zoomX = 100;
      this._zoomY = 100;
      // counter
      this._counter = false;
 
  };
  
  var _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
  Game_Event.prototype.setupPageSettings = function() {
    _Game_Event_setupPageSettings.call(this);
    this.setupEventTuning();
  };
  
  // read page comments
  Game_Event.prototype.setupEventTuning = function(){
    this.initEventTuning();
         // add graphic
     this._addGraphic = [];
    if (this.list != null) {
       var lst = this.page().list;
       if (this._eventId != null) {
          SceneManager._scene.deleteAddGraphic(this._eventId);
       }
           
       for (var i =0; i < lst.length; i++) {
         var element = lst[i];
         if (element.code == 108) {
              var comment = element.parameters[0];
              if (comment.indexOf("[es") >= 0) {
                  var re = /\[[Ee][Ss]\|(.+?)\|(.+?)\|(.+?)\]/;
                  var match = re.exec(comment);
                  if (match) {
                      this._xs = Number(match[1]);
                      this._ys = Number(match[2]);
                      this._zs = Number(match[3]);
                  }
              }        
              if (comment.indexOf("[bbox") >= 0) {
                  var re = /\[[Bb][Bb][Oo][Xx]\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\]/;
                  var match = re.exec(comment);
                  if (match) {
                      this._bbTurn = Number(match[1]) != 0;
                      this._xSub = Number(match[2]);
                      this._xAdd = Number(match[3]);
                      this._ySub = Number(match[4]);
                      this._yAdd = Number(match[5]);
                  }
              }        
              if (comment.indexOf("[rot") >= 0) {
                  var re = /\[[Rr][Oo][Tt]\|(.+?)\|(.+?)\]/;
                  var match = re.exec(comment);
                  if (match) {
                      this._rAngle = Number(match[1]);
                      this._rSpeed = Number(match[2]);
                  }
              }     
              if (comment.indexOf("[zoom") >= 0) {
                  var re = /\[[Zz][Oo][Oo][Mm]\|(.+?)\|(.+?)\]/;
                  var match = re.exec(comment);
                  if (match) {
                      this._zoomX = Number(match[1]);
                      this._zoomY = Number(match[2]);
                  }
              }   
              if (comment.indexOf("[add") >= 0) {
                  var re = /\[[Aa][Dd][Dd]\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\]/;
                  var match = re.exec(comment);
                  if (match) {
                      var mode = 0;
                      if (match[2] == "t") mode = 0;
                      if (match[2] == "c") mode = 1;
                      if (match[2] == "a") mode = 2;
                 
                      this._addGraphic.push( new AddGraphic(match[1], mode, Number(match[3]), Number(match[4]), Number(match[5]), Number(match[6]), Number(match[7])));
                  }
              }    
          }
       } 
       
       if (this._addGraphic.length > 0) {
          SceneManager._scene.pushAddGraphic(this);
       }
    }
  };

  // for event shift 
  var _Sprite_Character_updatePosition = Sprite_Character.prototype.updatePosition;
  Sprite_Character.prototype.updatePosition = function() {
      _Sprite_Character_updatePosition.call(this);
      if (this._character instanceof Game_Event) {
          this.x = this._character.screenX() + this._character._xs;
          this.y = this._character.screenY() + this._character._ys;
          this.z = this._character.screenZ() + this._character._zs;
          this.updateRotate();
          this.updateZoom();
      }
  };
  
  Sprite_Character.prototype.updateRotate = function() {
      if (this._character._rSpeed == 0) {
          this.rotation = this._character._rAngle / 360;
      } else {
          this.anchor = new Point(0.5,0.5)
          this.rotation += this._character._rSpeed / 360;
      }
  };
  
  Sprite_Character.prototype.updateZoom = function() {
      this.scale = new Point(this._character._zoomX / 100,this._character._zoomY / 100);
  };
  
  
  // for bounding box
  Game_CharacterBase.prototype.isCollidedWithEvents = function(x, y) {
    var events = $gameMap.eventsXyNt(x, y);
    return events.some(function(event) {
        return event.eventId != this.eventId && (event.isNormalPriority() || this instanceof Game_Event);
    });
  };
  
  Game_CharacterBase.prototype.pos = function(x, y) {
    if  (this instanceof Game_Event) {
        var x_s = 0;
        var x_a = 0;
        var y_s = 0;
        var y_a = 0;
        if (this._bbTurn) {
            switch (this._direction) {
                case 2 :
                    x_s = this._xSub;
                    x_a = this._xAdd;
                    y_s = this._ySub;
                    y_a = this._yAdd;
                    break;
                case 4 :
                    x_s = this._yAdd;
                    x_a = this._ySub;
                    y_s = this._xSub;
                    y_a = this._xAdd;
                    break;
                case 6 :
                    x_s = this._ySub;
                    x_a = this._yAdd;
                    y_s = this._xAdd;
                    y_a = this._xSub;
                    break;
                case 8 :
                    x_s = this._xAdd;
                    x_a = this._xSub;
                    y_s = this._yAdd;
                    y_a = this._ySub;
                    break;
            }
        } else {
            x_s = this._xSub;
            x_a = this._xAdd;
            y_s = this._ySub;
            y_a = this._yAdd;
        }
        
        for (var i = this._x - x_s; i <= this._x + x_a; i++) {
             for (var j = this._y - y_s; j <= this._y + y_a; j++) {
                  if (x == i && y == j) return true;
             }
        }
        return false;
    }
    return this._x === x && this._y === y;
  };
  
  
  //---------------------------------------------------------------------------
  // Spriteset_Map class overrides
  //---------------------------------------------------------------------------  
  var _Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
  Spriteset_Map.prototype.createCharacters = function() {
      _Spriteset_Map_createCharacters.call(this);
      
      this._addSprites = [];          
      $gameMap.events().forEach(function(event) {
          if(!event._addGraphic) return;
          event._addGraphic.forEach(function(add) {
              this._addSprites.push(new Sprite_Add(event, add));
          }, this);
      }, this);

      for (var i = 0; i < this._addSprites.length; i++) {
          this._tilemap.addChild(this._addSprites[i]);
      }
  }; 
  
  Spriteset_Map.prototype.pushAddGraphic = function(event) {
      this._addSprites = [];
      event._addGraphic.forEach(function(add) {
          this._addSprites.push(new Sprite_Add(event, add));
      }, this);
    
      for (var i = 0; i < this._addSprites.length; i++) {
          this._tilemap.addChild(this._addSprites[i]);
      }
  };
  
  Spriteset_Map.prototype.deleteAddGraphic = function(_eventId) {
      var toDel = [];
      this._tilemap.children.forEach(function(child) {
          if (child instanceof Sprite_Add) {
              if (child._character._eventId === _eventId) {
                  toDel.push(child);
              }
          }
      });
    
      for (var i = 0; i < toDel.length; i++) {
          this._tilemap.removeChild(toDel[i]);
      }
  };

  Scene_Map.prototype.deleteAddGraphic = function(event_id) {
      if (this._spriteset != null) {
          this._spriteset.deleteAddGraphic(event_id);
      }
  };
  
  Scene_Map.prototype.pushAddGraphic = function(event) {
      if (this._spriteset != null) {
          this._spriteset.pushAddGraphic(event);
      }
  };

  //---------------------------------------------------------------------------
  // Sprite_Destination class overrides
  //---------------------------------------------------------------------------  
  Sprite_Destination.prototype.updatePosition = function() {
      var tileWidth = $gameMap.tileWidth();
      var tileHeight = $gameMap.tileHeight();
      var x = $gameTemp.destinationX();
      var y = $gameTemp.destinationY();
      var events = $gameMap.eventsXyNt(x, y);
      var scX = 1;
      var scY = 1;
      if (bboxDestination > 0) {
        events.some(function(event) {
            x = event.x;
            y = event.y;
            scX += event._xAdd + event._xSub;
            scY += event._yAdd + event._ySub;
            x += (event._xAdd - event._xSub) / 2;
            y += (event._yAdd - event._ySub) / 2;
        });
      }
      this.x = ($gameMap.adjustX(x) + 0.5) * tileWidth;
      this.y = ($gameMap.adjustY(y) + 0.5) * tileHeight;
      this.sc_x = scX;
      this.sc_y = scY;
  };

  Sprite_Destination.prototype.updateAnimation = function() {
      this._frameCount++;
      this._frameCount %= 20;
      this.opacity = (20 - this._frameCount) * 6;
      this.scale.x = (1 + this._frameCount / 20) * this.sc_x;
      this.scale.y = (1 + this._frameCount / 20) * this.sc_y;
  };
  
})();