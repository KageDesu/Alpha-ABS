(function () {
    //------------------------------------------------------------------------------
    //ItemLineSprite
    class ItemLineSprite extends Sprite {
        constructor(text, iconSymbol, textColor) {
            super();
            this._text = text || '';
            this._textColor = textColor || Color.WHITE;
            this._iconSymbol = iconSymbol || null;
            this._create();
            this._draw();
        }

        width() {
            return 120;
        }

        height() {
            return 24;
        }

        static Item(name, iconIndex) {
            return new ItemLineSprite(name, iconIndex);
        }

        static Gold(count) {
            return new ItemLineSprite(count, AlphaABS.Parameters.get_GoldIconIndex(), ItemLineSprite.COLOR_GOLD);
        }

        static Exp(count) {
            return new ItemLineSprite(TextManager.exp + ' ' + count, null, ItemLineSprite.COLOR_EXP);
        }

        //PRIVATE

        _create() {
            var w = this.width();
            var h = this.height();
            this._backSurface = new Sprite();
            this._backSurface.bitmap = new Bitmap(w, h);
            var color1 = Color.BLACK.CSS;
            var color2 = Color.BLACK.getLightestColor(128).CSS;
            this._backSurface.bitmap.gradientFillRect(0, 0, w, h, color1, color2, false);
            this._backSurface.opacity = 180;
            this.addChild(this._backSurface);
        }

        _draw() {
            this._drawSurface = new Sprite();
            this._drawSurface.bitmap = new Bitmap(this.width(), this.height());
            this.addChild(this._drawSurface);
            if (this._iconSymbol != null)
                this._drawIcon();
            if (this._text != '')
                this._drawText();
        }

        _drawText() {
            var startX = this._iconSymbol != null ? 26 : 0;
            this._drawSurface.bitmap.textColor = this._textColor.CSS;
            this._drawSurface.bitmap.fontSize = 18;
            this._drawSurface.bitmap.outlineWidth = 2;
            this._drawSurface.bitmap.drawText(this._text, startX + 2, this.height() / 2, this.width() - startX, 1, 'left');
        }

        _drawIcon() {
            this._drawSurface.bitmap.drawIcon(0, 0, this._iconSymbol, 24);
        }

    }

    ItemLineSprite.COLOR_GOLD = Color.YELLOW;
    ItemLineSprite.COLOR_EXP = Color.MAGENTA.getLightestColor(128);

    AlphaABS.register(ItemLineSprite);
    //END ItemLineSprite
    //------------------------------------------------------------------------------

})();