(function () {
  class UIObject_SkillPanelItem_L extends Sprite {
    constructor(index, actor) {
      super(new Bitmap(40, 40));
      this.actor = actor;
      this.index = index;
      this.item = null;
      this.bitmap.fontSize = 18;
      this.bitmap.outlineWidth = 3;
      this.bitmap.outlineColor = Color.BLACK.CSS;
      this._pulsed = true;
      this._createMask();
      this._update();
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
      return AlphaABS.UTILS.SMath.inRect(new AlphaABS.UTILS.PointX(TouchInput.x, TouchInput.y), this._getRectangle());
    }

    update() {
      //super();
      this._update();
    }

    terminate() {
      if (this.parent)
        this.parent.removeChild(this);
    }

    //PRIVATE
    _getRectangle() {
      return new Rectangle(AlphaABS.UTILS.toGlobalCoord(this, 'x'), AlphaABS.UTILS.toGlobalCoord(this, 'y'), this.width, this.height);
    }

    _update() {
      if (!this.bitmap) return;
      this.bitmap.clear();
      if (this.actor && this.actor.uiPanelSkills()) {
        this.item = this.actor.uiPanelSkills()[this.index];
        if (this.item !== null) {
          var object = this.item.skill();
          this.bitmap.drawIcon(6, 7, object.iconIndex, 32);
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
        }
        this.bitmap.textColor = Color.WHITE.CSS;
        if (!Utils.isMobileDevice())
          this._drawKeySymbol();
        this._spriteMask.update();
      } else {
        this.bitmap.textColor = Color.WHITE.CSS;
        if (!Utils.isMobileDevice())
          this._drawKeySymbol();
      }
    }

    _drawKeySymbol() {
      var x = AlphaABS.LIBS.IKey;
      var symb = x['SP_' + (this.index + 1)]();
      symb = x.convertIKeyToLetter(symb);
      this.bitmap.drawText(symb.toUpperCase(), 6, 6, 32, 24, 'right');
    }

    _createMask() {
      this._spriteMask = new AlphaABS.LIBS.Sprite_Mask(AlphaABS.DATA.IMG.ItemMask.bitmap);
      this._spriteMask.x = -1;
      this._spriteMask.y = 1;
      this.addChild(this._spriteMask);
    }
  }

  AlphaABS.register(UIObject_SkillPanelItem_L);
})();