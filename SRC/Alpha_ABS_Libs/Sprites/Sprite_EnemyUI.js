(function () {
  class Sprite_EnemyUI extends Sprite {
    constructor() {
      super(new Bitmap(180, 70));
      this._loadParameters();
      this._createSprites();
      this.setTarget(null);

      this._thread = setInterval(function () {
        this._updateABS();
      }.bind(this), 20);
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

      this.spriteInfo_Battle = new Sprite(AlphaABS.DATA.IMG.IconInBattle.bitmap);
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
        maskBitmap = AlphaABS.DATA.IMG.TargetBattleMask.bitmap;
      }
      this.spriteMask = new AlphaABS.LIBS.Sprite_Mask(maskBitmap);
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