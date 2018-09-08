(function () {
  class Sprite_UserUI extends Sprite {
    constructor(backgroundImage) {
      super(backgroundImage || AlphaABS.DATA.IMG.UserFaceBack.bitmap);

      this.faceSize = 86;
      this.faceX = 2;
      this.faceY = 2;
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
        this._inBattleBitmap = AlphaABS.DATA.IMG.IconInBattle.bitmap;
        this._maskBitmap = AlphaABS.DATA.IMG.InBattleMask.bitmap;
      }
      this.faceSize = this._isShowFace ? 86 : 4;
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

          this.spriteInfo_Level = new Sprite(AlphaABS.DATA.IMG.LevelBar.bitmap);
          this.spriteInfo_Level.opacity = 200;
          this.spriteInfo_Level.anchor.y = 0.5;
          this.spriteInfo_Level.x = 1;
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
          this.spriteInfo_Battle.x = 1;
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