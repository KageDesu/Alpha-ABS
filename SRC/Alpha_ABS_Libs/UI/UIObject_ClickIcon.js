(function () {
    //UIObject_ClickIcon
    //------------------------------------------------------------------------------
    function UIObject_ClickIcon() {
        this.initialize.apply(this, arguments);
    }

    UIObject_ClickIcon.prototype = Object.create(Sprite_Button.prototype);
    UIObject_ClickIcon.prototype.constructor = UIObject_ClickIcon;

    UIObject_ClickIcon.prototype.initialize = function (iconSymbol) {
        Sprite_Button.prototype.initialize.call(this);
        this.bitmap = new Bitmap(30, 30);
        this._hover = null;
        this.bitmap.addLoadListener(function () {
            this.bitmap.drawIcon(0, 0, iconSymbol);
            this._hover = new AlphaABS.LIBS.Sprite_HoverIcon(this.width, this.height, 18);
            this.addChild(this._hover);
        }.bind(this));

        this._clicked = false;
        this._keySymbol = null;
    };

    UIObject_ClickIcon.prototype.setClickHandler = function (handler) {
        this._handlerX = handler;
        Sprite_Button.prototype.setClickHandler.call(this, function () {
            //LOG.p("Clicked");
            if (this.isClicked()) {
                this._clicked = false;
                this._hover.free();
                this._handlerX();
            } else {
                this._clicked = true;
                this._hover.freeze();
                this._handlerX();
            }
        });
    };

    UIObject_ClickIcon.prototype.update = function () {
        Sprite_Button.prototype.update.call(this);
        if (this._keySymbol != null) {
            if (this.visible && Input.isTriggered(this._keySymbol)) {
                this.callClickHandler();
            }
        }
    };

    UIObject_ClickIcon.prototype.drawIconText = function (text) {
        var spr = new Sprite();
        spr.bitmap = new Bitmap(this.width, this.height);
        spr.bitmap.fontSize = 22;
        spr.bitmap.drawText(text, 0, 0, this.width - 2, this.height, 'right');
        this.addChild(spr);
    };

    UIObject_ClickIcon.prototype.setKeyHandler = function (symbol) {
        this._keySymbol = symbol;
        if (!Utils.isMobileDevice())
            this.drawIconText(AlphaABS.LIBS.IKey.convertIKeyToLetter(this._keySymbol).toUpperCase());
    };

    UIObject_ClickIcon.prototype.isClicked = function () {
        return (this._clicked == true);
    };
    //END UIObject_ClickIcon
    //------------------------------------------------------------------------------

    AlphaABS.register(UIObject_ClickIcon);

})();