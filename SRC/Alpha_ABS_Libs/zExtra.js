/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Extra.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
AlphaABS.ApplyExtraPluginsSupport = (function () {

    var ELOG = new KDCore.DevLog("Alpha ABS");
    ELOG.on();
    ELOG.setColors(KDCore.Color.GREEN, KDCore.Color.FromHex('#848400'));

    var printSupport = function (plName) {
        ELOG.p(plName + ' finded - supported');
    };

    //HIME_PartyManager support
    if (Imported.TH_PartyManager == 1) {
        printSupport('HIME_PartyManager');
        try {
            var _alias_Party_switch_ABS = Party.switch;
            Party.switch = function (id) {
                var r = _alias_Party_switch_ABS.call(this, id);
                if (AlphaABS.isABS()) {
                    AlphaABS.BattleManagerABS.updateABSSession();
                }
                return r;
            };
        } catch (error) {
            console.error(error);
        }

    }

    if (Imported.YEP_SmartJump == true) {
        printSupport('YEP_SmartJump');
        //?{EMBEDDED SUPPORT}
    }

    if (Imported.TerraxLighting == true) {
        printSupport('TerraxLighting');
        var _alias_Game_CharacterBase_TerraxL324 = Game_CharacterBase.prototype.setDirection;
        Game_CharacterBase.prototype.setDirection = function (d) {
            if (this._spawnEventId) {
                if (!this.isDirectionFixed() && d) {
                    this._direction = d;
                }
                this.resetStopCount();
            } else
                _alias_Game_CharacterBase_TerraxL324.call(this, d);

        };

        var _alias_Game_CharacterBase_updateMoveTerrax4325 = Game_CharacterBase.prototype.updateMove;
        Game_CharacterBase.prototype.updateMove = function () {
            if (this._spawnEventId) {
                try {
                    if (this._x < this._realX) {
                        this._realX = Math.max(this._realX - this.distancePerFrame(), this._x);
                    }
                    if (this._x > this._realX) {
                        this._realX = Math.min(this._realX + this.distancePerFrame(), this._x);
                    }
                    if (this._y < this._realY) {
                        this._realY = Math.max(this._realY - this.distancePerFrame(), this._y);
                    }
                    if (this._y > this._realY) {
                        this._realY = Math.min(this._realY + this.distancePerFrame(), this._y);
                    }
                    if (!this.isMoving()) {
                        this.refreshBushDepth();
                    }
                } catch (e) {

                }
            } else
                _alias_Game_CharacterBase_updateMoveTerrax4325.call(this);
        };
    }

    if (Imported.YEP_ItemCore == true) {
        printSupport('YEP_ItemCore');
        try {
            var _Game_Party_gainIndependentItem_YEP = Game_Party.prototype.gainIndependentItem;
            Game_Party.prototype.gainIndependentItem = function (item, amount, includeEquip) {
                _Game_Party_gainIndependentItem_YEP.call(this, item, amount, includeEquip);
                if ($gameMap.isABS()) {
                    if (amount > 0 && !this._noNotifyABS) {
                        AudioManager.playSe({
                            name: 'Equip2',
                            pan: 0,
                            pitch: 140,
                            volume: 90
                        });
                        AlphaABS.BattleUI.pushItemOnPanel(item);
                    }

                    if (DataManager.isWeapon(item)) {
                        AlphaABS.BattleUI.refreshWeaponCircle();
                    }
                }
            };
        } catch (error) {
            console.error(error);
        }
    }

    if (Imported.YEP_EquipCore == true) {
        printSupport('YEP_EquipCore');
        try {
            var _Window_EquipSlot_drawItem_YEP = Window_EquipSlot.prototype.drawItem;
            Window_EquipSlot.prototype.drawItem = function (index) {
                _Window_EquipSlot_drawItem_YEP.call(this, index);
                this._drawFavWeapSymbol(index);
            };
        } catch (error) {
            console.error(error);
        }

    }

    if (Imported.YEP_SaveCore == true) {
        printSupport('YEP_SaveCore');
        try {
            var _Scene_File_performActionLoad_YEP = Scene_File.prototype.performActionLoad;
            Scene_File.prototype.performActionLoad = function () {
                if (AlphaABS.LIBS.BattleManagerABS._isABSMap == true) {
                    AlphaABS.LIBS.BattleManagerABS.stopABS();
                }
                _Scene_File_performActionLoad_YEP.call(this);
            };
        } catch (error) {
            console.error(error);
        }
    }
});

// ■ END Extra.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////