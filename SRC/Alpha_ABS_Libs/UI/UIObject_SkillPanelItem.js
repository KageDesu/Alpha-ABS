(function () {

  var PointX = AlphaABS.UTILS.PointX;

  class UIObject_SkillPanelItem extends Sprite {
    constructor(index) {
      super(new Bitmap(40, 40));
      this.index = index;
      this.item = null;
      this._thread = setInterval(function () {
        this._updateABS();
      }.bind(this), 10);
      this.bitmap.fontSize = 18;
      this.bitmap.outlineWidth = 3;
      this.bitmap.outlineColor = Color.BLACK.CSS;
      this._pulsed = true;
      this._createOverlay();
      this._createHover();
      this._createHelp();
      this._createRecharge();
      this._createMask();
      this._updateABS();
    }

    setEditMode() {
      this.removeChild(this._hover);
      this.removeChild(this._help);
      this._help.visible = false;
    }

    pulse() {
      this._spriteMask.setParams(120, Color.BLUE);
      this._spriteMask.showMaskOne(15);
    }

    pulseReady() {
      if (!this._pulsed) {
        this._spriteMask.setParams(120, Color.GREEN);
        this._spriteMask.showMaskOne(15);
        this._pulsed = true;
      }
    }

    isTouched() {
      return AlphaABS.UTILS.SMath.inRect(new PointX(TouchInput.x, TouchInput.y), this._getRectangle());
    }

    terminate() {
      if (this.parent)
        this.parent.removeChild(this);
      clearInterval(this._thread);
      this._help.terminate();
    }

    //PRIVATE
    _getRectangle() {
      return new Rectangle(AlphaABS.UTILS.toGlobalCoord(this, 'x'), AlphaABS.UTILS.toGlobalCoord(this, 'y'), this.width, this.height);
    }

    _updateABS() {
      if (!this.bitmap) return;
      this.bitmap.clear();
      if (this.spriteRecharge)
        this.spriteRecharge.bitmap.clear();
      this.item = $gamePlayer.battler().uiPanelSkills()[this.index];
      if (this.item !== null) {
        this._hover.update();
        this._help.update();
        this._hover.visible = true;
        var object = this.item.skill();
        this.bitmap.drawIcon(6, 7, object.iconIndex, 32);
        if (AlphaABS.BattleManagerABS.canUseABSSkillUI(this.item)) {
          this.bitmap.textColor = Color.WHITE.CSS;
          //this.spriteOverlay.visible = false;
          this.pulseReady();

        } else {
          this.bitmap.textColor = Color.RED.CSS;
          if (AlphaABS.BattleManagerABS.canUseSkillByTimer(this.item)) {
            //this.spriteOverlay.visible = true;
            if (!Utils.isMobileDevice())
              this._drawKeySymbol();
          } else {
            //this.bitmap.drawText(this._framesToTime(t.timer.getMaxValue() - t.timer.getValue()), 6,6, 32, 24, 'right');
            this._pulsed = false;
            this._drawRecharge(this.item);
          }
        }

        if (!Utils.isMobileDevice())
          this._drawKeySymbol();
        if (this.item.isItem()) {
          var count = $gameParty.numItems(object);
          var c = this.bitmap.textColor;
          if (count > 0) {
            this.bitmap.textColor = Color.WHITE.CSS;
          } else
            this.bitmap.textColor = Color.RED.CSS;

          var c2 = this.bitmap.fontSize;
          this.bitmap.fontSize = 14;
          this.bitmap.drawText(count, 8, 22, 32, 24, 'left');

          this.bitmap.textColor = c;
          this.bitmap.fontSize = c2;
        }

        if (this.item.isNeedAmmo()) {
          var count = $gameParty.numItems($dataItems[this.item.ammo]);
          var c = this.bitmap.textColor;
          if (count > 0) {
            this.bitmap.textColor = Color.WHITE.CSS;
          } else
            this.bitmap.textColor = Color.RED.CSS;

          var c2 = this.bitmap.fontSize;
          this.bitmap.fontSize = 14;
          this.bitmap.drawText(count, 8, 2, 32, 24, 'left');

          this.bitmap.textColor = c;
          this.bitmap.fontSize = c2;
        }
      } else {
        this._hover.visible = false;
      }
      if (this._spriteMask)
        this._spriteMask.update();
    }

    _drawKeySymbol() {
      var x = AlphaABS.LIBS.IKey;
      var symb = x['SP_' + (this.index + 1)]();
      symb = x.convertIKeyToLetter(symb);
      this.bitmap.drawText(symb.toUpperCase(), 6, 6, 32, 24, 'right');
    }

    _calc_px_percent(current, max) {
      var c_inp = (100 * current) / max;
      return Math.floor((32 * c_inp) / 100);
    }

    _createMask() {
      this._spriteMask = new AlphaABS.LIBS.Sprite_Mask(AlphaABS.DATA.IMG.ItemMask.bitmap);
      this._spriteMask.x = -1;
      this._spriteMask.y = 1;
      this.addChild(this._spriteMask);
    }

    _drawRecharge(skill) {
      var height = this._calc_px_percent(skill.timer.getValue(), skill.timer.getMaxValue());
      var color = (height < 32) ? ((height < 16) ? Color.RED : Color.YELLOW) : Color.GREEN;
      this.spriteRecharge.bitmap.fillRect(0, 32 - height, 32, height, color.CSS);
    }

    _createRecharge() {
      this.spriteRecharge = new Sprite(new Bitmap(32, 32));
      this.spriteRecharge.x = 6;
      this.spriteRecharge.y = 7;
      this.spriteRecharge.opacity = 100;
      this.addChild(this.spriteRecharge);
    }

    _createHover() {
      this._hover = new AlphaABS.LIBS.Sprite_Hover(32, 32);
      this._hover.x = 6;
      this._hover.y = 7;
      this.addChild(this._hover);
    }

    _createHelp() {
      if(this._help)
        this.removeChild(this._help);
      this._help = new AlphaABS.LIBS.UIObject_HelpHover(32, 32);
      this._help.move(6, 7);
      this._help.setHover(this._hover);
      this._help.setSkillIndex(this.index);
      this.addChild(this._help);
    }

    _createOverlay() {
      //EMPTY
    }

  }

  AlphaABS.register(UIObject_SkillPanelItem);

})();