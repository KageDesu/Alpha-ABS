(function () {
    //Window_EquipItem
    //------------------------------------------------------------------------------
    Window_EquipItem.prototype.onTouch = function (triggered) {
        if (this._sCircle) {
            if (this._sCircle.isOpen() && this._sCircle.isTouchedAny()) {
                return;
            }
        }
        Window_ItemList.prototype.onTouch.call(this, triggered);
    };

    var _Window_EquipItem_setActor = Window_EquipItem.prototype.setActor;
    Window_EquipItem.prototype.setActor = function (actor) {
        _Window_EquipItem_setActor.call(this, actor);
        if (this._actor != null && AlphaABS.Parameters.isWeaponsAllowed() == true) {
            this._createFavWeapCircle();
            this._createFavWeapButton();
        }
    };

    Window_EquipItem.prototype.update = function () {
        Window_ItemList.prototype.update.call(this);
        if (this._sCircle && this._sCircle.isOpen()) {
            var index = AlphaABS.LIBS.IKey.isTriggeredWeapCircleIndex();
            if (index != null) {
                this.touchWeaponAt(index);
                this.refresh();
                return;
            }
        }
    };

    Window_EquipItem.prototype.drawItemNumber = function (item, x, y, width) {
        Window_ItemList.prototype.drawItemNumber.call(this, item, x, y, width);
        try {
            if (!this._actor) {
                return;
            }
            if (!DataManager.isWeapon(item))
                return;

            var symbol = this._actor.getFavWeapSymbol(item);
            if (symbol != null) {
                this.changeTextColor(Color.ORANGE.CSS);
                var spacer = '0000';
                if (Imported.YEP_ItemCore == true) {
                    spacer += '00';
                }
                if (!Utils.isMobileDevice())
                    this.drawText('[' + symbol.toUpperCase() + ']', x, y, width - this.textWidth(spacer), 'right');
                else
                    this.drawText('■', x, y, width - this.textWidth(spacer), 'right');
            }
        } catch (e) {
            console.error(e);
        }
    };

    //NEW
    Window_EquipItem.prototype.touchWeaponAt = function (index) {
        try {
            if (this._sCircle) {
                if (DataManager.isWeapon(this.item())) {
                    this._sCircle.click(index);
                    this._actor.setFavWeap(this.item(), index);
                    SoundManager.playEquip();
                    this._sCircle.refresh();
                    this.refresh();
                } else
                    SoundManager.playBuzzer();
            }
        } catch (e) {
            console.error(e);
        }
    };


    Window_EquipItem.prototype.refresh = function () {
        Window_ItemList.prototype.refresh.call(this);

    };

    Window_EquipItem.prototype.activate = function () {
        Window_ItemList.prototype.activate.call(this);
        if (this._sCircleButton) {
            this._sCircleButton.visible = true;
        }
    };

    Window_EquipItem.prototype.deactivate = function () {
        Window_ItemList.prototype.deactivate.call(this);
        try {
            if (this._sCircleButton) {
                this._sCircleButton.visible = false;
                if (this._sCircle && this._sCircle.isOpen())
                    this._sCircleButton.callClickHandler();
            }
        } catch (e) {
            console.error(e);
        }
    };

    Window_EquipItem.prototype._createFavWeapCircle = function () {
        try {
            this._sCircleBackSprite = new Sprite(new Bitmap((this.width / 2) - 4, this.height - 8));
            this._sCircleBackSprite.bitmap.addLoadListener(function () {
                this._sCircleBackSprite.bitmap.fillAll(Color.BLACK.reAlpha(200).CSS);
            }.bind(this));
            this._sCircleBackSprite.visible = false;
            this.addChild(this._sCircleBackSprite);
            this._sCircle = new AlphaABS.LIBS.UI_SelectCircleFW(this._actor, function (index) {
                this.touchWeaponAt(index);
            }.bind(this));
            this._sCircle.move(this._sCircleBackSprite.width / 2, this._sCircleBackSprite.height / 2);
            if (!Utils.isMobileDevice())
                this._sCircle.showHelpers();
            this._sCircleBackSprite.addChild(this._sCircle);
        } catch (e) {
            console.error(e);
            this._sCircle = null;
        }
    };

    Window_EquipItem.prototype._createFavWeapButton = function () {
        this._sCircleButton = new AlphaABS.LIBS.UIObject_ClickIcon(AlphaABS.DATA.IMG.IconSwitchWeapon.bitmap);
        this._sCircleButton.move(this.width - 36, this.height - 36);
        this._sCircleButton.visible = false;
        this._sCircleButton.setClickHandler(function () {
            if (this._sCircleButton.isClicked()) {
                this._onEquipMode();
            } else {
                this._offEquipMode();
            }
        }.bind(this));
        this._sCircleButton.setKeyHandler(AlphaABS.LIBS.IKey.WC());
        this.addChild(this._sCircleButton);
    };

    Window_EquipItem.prototype.select = function (index) {
        Window_ItemList.prototype.select.call(this, index);
        try {
            if (!this._sCircle) return;
            if (this.maxCols() > 1) {
                this._placeFavWeapCircle(index % this.maxCols());
            } else {
                this._placeFavWeapCircle(0);
            }

            if (this._sCircleButton) {
                this._sCircleButton.visible = DataManager.isWeapon(this.item());

            }
        } catch (e) {
            console.error(e);
        }
    };

    Window_EquipItem.prototype._onEquipMode = function () {
        if (!this._sCircle) return;
        this._sCircle.open();
        this._sCircleBackSprite.visible = true;
    };

    Window_EquipItem.prototype._offEquipMode = function () {
        if (!this._sCircle) return;
        this._sCircle.close();
        this._sCircleBackSprite.visible = false;
    };

    Window_EquipItem.prototype._placeFavWeapCircle = function (place) {
        try {
            if (place <= 0) { //RIGHT
                this._sCircleBackSprite.move(this.width - 6, this.height - 4);
                this._sCircleBackSprite.setStaticAnchor(1, 1);
            } else { //LEFT
                this._sCircleBackSprite.move(6, this.height - 4);
                this._sCircleBackSprite.setStaticAnchor(0, 1);
            }
        } catch (e) {
            console.error(e);
        }
    };
    //END Window_EquipItem
    //------------------------------------------------------------------------------

})();