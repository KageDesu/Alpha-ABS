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
    };

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
