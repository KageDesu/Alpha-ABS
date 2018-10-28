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
        t[i].z = 10;
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
        selectedBitmap = AlphaABS.DATA.IMG.TargetCircle.bitmap;
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
    if(this._character.inABSMotion()) {
      this._absParams.spriteSelect.y -= this._absMotionOffset();
    }
  
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
        if (BattleManagerABS.isABSAudio())
          this._animationCastAudio = AudioManager.playSeLoopAt(se, point.mapPointOnScreen());
        else
          this._animationCastAudio = AudioManager.playSeLoop(se);
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

  //?[NEW]
  Sprite_CharacterABS.prototype.getStartPointToVector = function () {
      return this._getCenterPoint().convertToMap();
  };

  //END Sprite_CharacterABS
  //------------------------------------------------------------------------------

  AlphaABS.register(Sprite_CharacterABS);

})();