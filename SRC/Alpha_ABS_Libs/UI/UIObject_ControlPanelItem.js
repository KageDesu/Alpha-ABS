(function () {

  var ABSUtils = AlphaABS.UTILS;

  class UIObject_ControlPanelItem extends Sprite {
    constructor() {
      super(new Bitmap(40, 40));
      this._iconIndex = null; //No icon

      this._createBorder();
      this._createMask();
      this._createOverlay();
      this._createHover();

      this._help = null;
      this._symbol = null;
      this._absSkill = null;

      this._thread = setInterval(function () {
        this._updateABS();
      }.bind(this), 10);
    }

    setEditMode() {
      this._hover.visible = false;
      if (this._help) {
        this._help.visible = false;
      }
    }

    setIcon(index) {
      this._iconIndex = index;
      this._drawIcon();
    }

    setKey(symbol) {
      this._symbol = symbol;
      this._drawSymbol();
    }

    setSkill(absSkill) {
      this._absSkill = absSkill;
      if (!this.spriteAmmoCount) {
        this.spriteAmmoCount = new Sprite(new Bitmap(this.bitmap.width, this.bitmap.height));
        this.addChild(this.spriteAmmoCount);
      } else {
        if (this._absSkill == null) this.spriteAmmoCount.bitmap.clear();
      }

      if (absSkill != null && this._help == null) {
        this._createHelp();
      }
    }

    refresh() {
      this._drawSymbol();
    }

    pulse() {
      this._spriteMask.setParams(140, Color.BLUE);
      this._spriteMask.showMaskOne(15);
    }

    isEmpty() {
      return (this._iconIndex == null);
    }

    setSelected(isSelect) {
      if (isSelect) {
        this.spriteOverlay.bitmap.fillRect(0, 0, this.spriteOverlay.bitmap.width, this.spriteOverlay.bitmap.height, Color.RED.CSS);
      } else {
        this.spriteOverlay.bitmap.clear();
      }
    }

    setDisabled(isDisabled) {
      if (isDisabled) {
        this.spriteOverlay.bitmap.fillRect(0, 0, this.spriteOverlay.bitmap.width, this.spriteOverlay.bitmap.height, Color.BLACK.CSS);
      } else {
        this.spriteOverlay.bitmap.clear();
      }
    }

    isTouched() {
      return ABSUtils.SMath.inRect(new ABSUtils.PointX(TouchInput.x, TouchInput.y), this._getRectangle());
    }

    terminate() {
      clearInterval(this._thread);
    }

    //PRIVATE
    _getRectangle() {
      return new Rectangle(ABSUtils.toGlobalCoord(this, 'x'), ABSUtils.toGlobalCoord(this, 'y'), this.width, this.height);
    }

    _updateABS() {
      this._spriteMask.update();
      this._drawAmmoCount();

      this._hover.update();
      if (this._help)
        this._help.update();
    }

    _drawSymbol() {
      if (!this.spriteText) {
        this.spriteText = new Sprite(new Bitmap(this.bitmap.width, this.bitmap.height));
        this.spriteText.bitmap.fontSize = 16;
        this.addChild(this.spriteText);
      }
      this.spriteText.bitmap.clear();
      if (this._symbol != null && !Utils.isMobileDevice()) {
        var x = AlphaABS.LIBS.IKey;
        var symb = x.convertIKeyToLetter(this._symbol);
        this.spriteText.bitmap.drawText(symb.toUpperCase(), 0, 0, this.spriteText.bitmap.width - 6, 24, 'right');
      }
    }

    _drawAmmoCount() {
      if (this._absSkill == null) return;
      this.spriteAmmoCount.bitmap.clear();
      if (this._absSkill.isNeedAmmo()) {
        var b = this.spriteAmmoCount.bitmap;
        var count = $gameParty.numItems($dataItems[this._absSkill.ammo]);
        var c = b.textColor;
        if (count > 0) {
          b.textColor = Color.WHITE.CSS;
        } else
          b.textColor = Color.RED.CSS;

        var c2 = b.fontSize;
        b.fontSize = 14;
        b.drawText(count, 8, 2, 32, 24, 'left');

        b.textColor = c;
        b.fontSize = c2;
      }
    }

    _drawIcon() {
      this.bitmap.clear();
      if (this._iconIndex != null) {
        this.bitmap.drawIcon(4, 5, this._iconIndex, 30);
      }
    }

    _createBorder() {
      this.spriteBorder = new Sprite(AlphaABS.DATA.IMG.ControlPanelItem.bitmap);
      this.spriteBorder.x = 2;
      this.spriteBorder.y = 3;
      //this.spriteBorder.opacity = 150;
      this.addChild(this.spriteBorder);
    }

    _createOverlay() {
      this.spriteOverlay = new Sprite(new Bitmap(30, 30));
      this.spriteOverlay.x = 4;
      this.spriteOverlay.y = 5;
      this.spriteOverlay.opacity = 100;
      this.addChild(this.spriteOverlay);
    }

    _createMask() {
      this._spriteMask = new AlphaABS.LIBS.Sprite_Mask(AlphaABS.DATA.IMG.ItemMask.bitmap);
      this._spriteMask.x = 1;
      this._spriteMask.y = 2;
      this._spriteMask.scale.x = 0.85;
      this._spriteMask.scale.y = this._spriteMask.scale.x;
      this.addChild(this._spriteMask);
    }

    _createHover() {
      this._hover = new AlphaABS.LIBS.Sprite_Hover(30, 30);
      this._hover.x = 4;
      this._hover.y = 5;
      this.addChild(this._hover);
    }

    _createHelp() {
      this._help = new AlphaABS.LIBS.UIObject_HelpHover(30, 30);
      this._help.move(4, 5);
      this._help.setHover(this._hover);
      this._help.setSkillABS(this._absSkill);
      this._help.setWeaponMode();
      this.addChild(this._help);
    }
  }

  AlphaABS.register(UIObject_ControlPanelItem);
})();