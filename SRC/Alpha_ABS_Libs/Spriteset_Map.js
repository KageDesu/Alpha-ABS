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

  //?[NEW]
  Spriteset_Map.prototype.getSpriteForCharacter = function (character) {
      try {
          if (this._spritePlayerABS.character() == character)
            return this._spritePlayerABS;
          var sprites = this.spritesABS();
          return sprites.find(spr => spr.character() == character);
      } catch (error) {
        
      }
      return null;
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

  //?NEW
  Spriteset_Map.prototype.refreshAfterABS = function () {
    this._characterSprites.forEach(function (char) {
      this._tilemap.removeChild(char);
    }.bind(this));
    this.createCharacters();
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
      var targetCircleSprite;
      if (AlphaABS.Parameters.isLoaded()) {
        targetCircleSprite = AlphaABS.Parameters.get_UIE_SpellSelectZoneImage();
      } else {
        targetCircleSprite = AlphaABS.DATA.IMG.TargetCircle.bitmap;
      }
      this._absParams.spriteTargetCircle = new Sprite(targetCircleSprite);
      this.addChildAtLayer(this._absParams.spriteTargetCircle, -1);
      this._absParams.spriteTargetCircle.anchor.x = 0.5;
      this._absParams.spriteTargetCircle.anchor.y = 0.5;
      this._absParams.spriteTargetCircle.visible = false;
    }
    if ($gameMap.ABSParams().targetCircle != null) {
      if (!this._absParams.targetConfig) {

        var r = $gameMap.ABSParams().targetCircle.radius;

        this._absParams.spriteTargetCircle.scale.x = 0.5 * r;
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
      var point2 = t2.clone().convertToMap();
      var dist = AlphaABS.UTILS.distanceTo($gamePlayer, point2);
      if (dist > $gameMap.ABSParams().targetCircle.range) {
        color = Color.RED;
      }
      if (!$gamePlayer._absParams.currentAction.isIgnoreObstacles())
        if (!AlphaABS.BattleManagerABS.checkLineOfSight($gamePlayer.toPoint(), point2)) {
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

  //?[NEW]
  Spriteset_Map.prototype.createSpawnEventABS = function (id) {
    var event = $gameMap.event(id);
    var newChar = new AlphaABS.LIBS.Sprite_CharacterABS(event, 0);
    this._characterSprites.push(newChar);
    this._characterSpritesABS.push(newChar);
    this._tilemap.addChild(newChar);
    newChar.initABS();
    newChar.update();
  };
})();