/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ParametersManagerABS.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    class ParametersManagerABS extends KDCore.ParametersManager {
        constructor() {
            super('Alpha ABS');
        }

        get_UIE_PlayerGauge(gaugeSymbol) {
            var object = this.getObject('UIE_Player_' + gaugeSymbol + '_Bar');
            this._convertGaugeElements(object);
            return object;
        }
        _convertGaugeElements(object) {
            this.convertField(object, 'Color');
            this.convertField(object, 'Visible');
            this.convertField(object, 'Show value');
            return object;
        }
        get_UIE_PlayerStatus() {
            var name = 'UIE_Player_Status_Settings';
            return this.getFromCacheOrInit(name, function () {
                var object = this.getObject(name);
                this._convertBasicElements(object);
                this.convertField(object, 'Portrait');
                this.convertField(object, 'Level');
                this.convertImageWithDefault(object, 'In battle Icon', AlphaABS.DATA.IMG.IconInBattle.bitmap);
                this.convertImageWithDefault(object, 'Mask', AlphaABS.DATA.IMG.InBattleMask.bitmap);
                this.convertImageWithDefault(object, 'Background', AlphaABS.DATA.IMG.UserFaceBack.bitmap);
                return object;
            });
        }

        convertImageWithDefault(object, paramName, defaultImgBitmap) {
            try {
                var img = object[paramName];
                if (typeof (img) == "string") {
                    if (img == "" && defaultImgBitmap) {
                        object[paramName] = defaultImgBitmap;
                    } else {
                        this.convertImage(object, paramName);
                    }
                } else { //Bitmap
                    if (img._image == null && defaultImgBitmap) {
                        object[paramName] = defaultImgBitmap;
                    } else {
                        this.convertImage(object, paramName);
                    }
                }
            } catch (e) {
                console.error(e);
                this.convertImage(object, paramName);
            }
        }

        _convertBasicElements(object) {
            this.convertField(object, 'Position');
            this.convertField(object.Position, 'X');
            this.convertField(object.Position, 'Y');
            this.convertField(object, 'Visible');
            return object;
        }
        get_UIE_PlayerTarget() {
            var name = 'UIE_Player_Target';
            return this.getFromCacheOrInit(name, function () {
                var object = this.getObject(name);
                this._convertBasicElements(object);
                this.convertField(object, 'Name');
                this.convertField(object, 'HP Bar');
                this._convertGaugeElements(object['HP Bar']);
                this.convertImageWithDefault(object, 'Mask', AlphaABS.DATA.IMG.TargetBattleMask.bitmap);
                this.convertImageWithDefault(object, 'Selected_Image', AlphaABS.DATA.IMG.TargetCircle.bitmap);
                return object;
            });
        }
        get_UIE_SpellSelectZoneImage() {
            var name = 'UIE_SpellSelectZoneImage';
            return this.getFromCacheOrInit(name, function () {
                var img = this.getString(name);
                var bitmap = this.loadImage(img);
                if (bitmap._image == null) {
                    return AlphaABS.DATA.IMG.TargetCircle.bitmap;
                } else {
                    return bitmap;
                }
            });
        }
        get_UIE_PlayerSpellsPanel() {
            var name = 'UIE_Player_Skills';
            return this.getFromCacheOrInit(name, function () {
                var object = this.getObject(name);
                this._convertBasicElements(object);
                this.convertImage(object, 'Image');
                this.convertImageWithDefault(object, 'Image', AlphaABS.DATA.IMG.SkillPanel.bitmap);
                this.convertField(object, 'AutoHide');
                return object;
            });
        }
        get_UIE_PlayerHotBar() {
            var name = 'UIE_Player_HotBar';
            return this.getFromCacheOrInit(name, function () {
                var object = this.getObject(name);
                this._convertBasicElements(object);
                for (var i = 1; i < 6; i++)
                    this.convertField(object, 'Item' + i);
                return object;
            });
        }
        get_UIE_PlayerMessageBar() {
            return this._get_UIE_BasicElement('UIE_Message_Bar');
        }
        _get_UIE_BasicElement(name) {
            return this.getFromCacheOrInit(name, function () {
                var object = this.getObject(name);
                this._convertBasicElements(object);
                return object;
            });
        }
        get_UIE_PlayerStates() {
            return this._get_UIE_BasicElement('UIE_Player_States');
        }
        get_UIE_ItemList() {
            return this._get_UIE_BasicElement('UIE_ItemList');
        }
        get_UIE_PlayerCastBar() {
            return this._get_UIE_BasicElement('UIE_Player_Cast');
        }
        get_UI_PlayerDamageColor() {
            var name = "UI_PlayerDamageColor";
            return this.getFromCacheOrInit(name, function () {
                var color = this.getString(name);
                if (color != null && color != "") {
                    return KDCore.Color.FromHex(color).ARR;
                } else {
                    return KDCore.Color.BLACK.ARR;
                }
            });
        }
        loadAllStrings() {
            var loader = new KDCore.StringsLoader(this._parameters);
            loader.loadAllStringsToObject(AlphaABS.SYSTEM);
        }
        get_EnemyDeadSwitch() {
            var name = "Enemy Dead Switch";
            return this.getFromCacheOrInit(name, function () {
                var deadSwitch = this.getString(name);
                if (SDK.checkSwitch(deadSwitch))
                    return deadSwitch;
                else
                    return 'B';
            });
        }
        get_EnemyReviveAnimationId() {
            return this._get_NumberFromCache("Revive Animation") || 45;
        }
        _get_NumberFromCache(name) {
            return this.getFromCacheOrInit(name, function () {
                var value = this.getNumber(name);
                return value;
            });
        }
        get_CastAnimation() {
            var animId = this._get_NumberFromCache("Cast Animation");
            if (animId > 0) {
                return $dataAnimations[animId];
            } else {
                return AlphaABS.DATA.DefaultCastAnimation;
            }
        }
        get_LevelUpAnimationId() {
            return this._get_NumberFromCache("Level Up Animation") || 49;
        }
        get_AutoLootEnemiesState() {
            return this._get_BooleanFromCache('Auto loot');
        }
        _get_BooleanFromCache(name) {
            return this.getFromCacheOrInit(name, function () {
                var object = this.getBoolean(name);
                return object;
            });
        }
        get_CastAnimationSE() {
            var name = 'Cast Animation SE';
            return this.getFromCacheOrInit(name, function () {
                if (this.isHasParameter(name)) {
                    var object = this.getBoolean(name);
                    if (object == true) {
                        object = AlphaABS.DATA.DefaltCastSE;
                    } else {
                        object = null;
                    }
                    return object;
                } else {
                    return AlphaABS.DATA.DefaltCastSE;
                }
            });
        }
        get_DeadMapId() {
            return this._get_NumberFromCache("Game Over Map ID");
        }
        get_DeadMapCommonEventId() {
            return this._get_NumberFromCache("Game Over Common Event");
        }
        get_DeadMapPosition() {
            var name = "Game Over Map Position";
            return this.getFromCacheOrInit(name, function () {
                var object = this.getObject(name);
                this.convertField(object, "X");
                this.convertField(object, "Y");
                return object;
            });
        }
        get_DeadMapDirection() {
            var name = "Game Over Map Direction";
            return this.getFromCacheOrInit(name, function () {
                var resultDir = 2;
                var object = this.getString(name);
                switch (object) {
                    case "top":
                        resultDir = 8;
                        break;
                    case "right":
                        resultDir = 6;
                        break;
                    case "left":
                        resultDir = 4;
                        break;
                    default:
                        resultDir = 2;
                        break;
                }
                return resultDir;
            });
        }
        get_PartyExpMode() {
            var name = "Party experience";
            return this.getFromCacheOrInit(name, function () {
                var result = 0;
                var object = this.getString(name);
                switch (object) {
                    case "For each member":
                        result = 0;
                        break;
                    case "For party":
                        result = 1;
                        break;
                    case "Share at all":
                        result = 2;
                        break;
                    default:
                        result = 0;
                        break;
                }
                return result;
            });
        }
        get_SpawnMapId() {
            var name = "Enemy Spawn Map Id";
            return this.getFromCacheOrInit(name, function () {
                return this.getNumber(name);
            });
        }
        get_MapSolidRegions() {
            var name = "Solid Regions";
            return this.getFromCacheOrInit(name, function () {
                var regions = [];
                var object = this.getString(name);
                try {
                    regions = object.split(',').map(Number);
                    regions.delete(0);
                } catch (error) {
                    console.error(error);
                    regions = [];
                }
                return regions;
            });
        }
        get_GoldIconIndex() {
            var name = "UIE_ItemListGoldIconIndex";
            if (this.isHasParameter(name))
                return this._get_NumberFromCache(name);
            else
                return 314;
        }
        get_AllowTransferState() {
            return this._get_BooleanFromCache("Allow Transfrer");
        }
        isUIVisible() {
            return this._get_BooleanFromCacheWithDefault("UI_Visible", true);
        }
        _get_BooleanFromCacheWithDefault(name, defaultValue) {
            if (this.isHasParameter(name))
                return this._get_BooleanFromCache(name);
            else
                return defaultValue;
        }
        isUIEditorAllowed() {
            return this._get_BooleanFromCacheWithDefault("UI_Editor", true);
        }
        isUIInOptionsAllowed() {
            return this._get_BooleanFromCacheWithDefault("UI_Options", true);
        }
        //?[DEPRECATED]
        isKeyBindingAllowed() {
            return this._get_BooleanFromCacheWithDefault("Key_binding", true);
        }
        loadBindingScheme() {
            if (this.isLoaded())
                this._loadStandartBindingKeys();
        }
        _loadStandartBindingKeys() {
            var keys = [];
            keys[0] = this.getString('Controls_Key_cpW');
            keys[1] = this.getString('Controls_Key_cpD');
            keys[2] = this.getString('Controls_Key_cpS');
            keys[3] = this.getString('Controls_Key_cpA');

            keys[4] = this.getString('Controls_Key_cpE');
            keys[5] = this.getString('Controls_Key_tS');

            keys[6] = this.getString('Controls_Key_scW');
            keys[7] = this.getString('Controls_Key_scD');
            keys[8] = this.getString('Controls_Key_scS');
            keys[9] = this.getString('Controls_Key_scA');

            for (var i = 0; i < 8; i++) {
                keys[i + 10] = this.getString('Controls_Key_sp' + (i + 1));
            }
            AlphaABS.LIBS.IKey.loadKeyConfig(keys);
        }
        isFollowAllowed() {
            return this._get_BooleanFromCacheWithDefault("Controls_KeyAllowed_Follow", true);
        }
        isJumpAllowed() {
            return this._get_BooleanFromCacheWithDefault("Controls_KeyAllowed_Jump", true);
        }
        isRotateAllowed() {
            return this._get_BooleanFromCacheWithDefault("Controls_KeyAllowed_Rotate", true);
        }
        isWeaponsAllowed() {
            return this._get_BooleanFromCacheWithDefault("Controls_KeyAllowed_Weapons", true);
        }
    }

    AlphaABS.Parameters = new ParametersManagerABS();
    AlphaABS.register(ParametersManagerABS);
})();
// ■ END ParametersManagerABS.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////