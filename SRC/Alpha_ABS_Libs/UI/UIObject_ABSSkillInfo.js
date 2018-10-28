(function () {
    //UIObject_ABSSkillInfo
    //------------------------------------------------------------------------------
    function UIObject_ABSSkillInfo() {
        this.initialize.apply(this, arguments);
    }

    UIObject_ABSSkillInfo.prototype = Object.create(Sprite.prototype);
    UIObject_ABSSkillInfo.prototype.constructor = UIObject_ABSSkillInfo;

    UIObject_ABSSkillInfo.prototype.initialize = function (absSkill, isWeaponMode) {
        Sprite.prototype.initialize.call(this);

        this.width = 200;
        this.height = 600;
        this._skill = absSkill;
        this.bitmap = new Bitmap(this.width, this.height);
        this._descriptionText = null;
        isWeaponMode = SDK.check(isWeaponMode, false);
        this._weaponMode = isWeaponMode;

        this.refresh();
    };

    UIObject_ABSSkillInfo.prototype.refresh = function () {
        this.bitmap.clear();

        if (this._descriptionText) {
            this.removeChild(this._descriptionText);
            this._descriptionText.destroy();
            this._descriptionText = null;
        }

        if (this._weaponMode)
            this._skill = $gamePlayer.battler().skillABS_attack();

        this._deltaY = 0;
        this._deltaX = 0;
        this._textPosition = 'center';
        if (this._skill == null) return;
        this._createBackground();
        this._drawInfo();
        this.height = this._deltaY + 8;
    };

    UIObject_ABSSkillInfo.prototype._createBackground = function () {
        this.bitmap.fillAll(UIObject_ABSSkillInfo.COLOR_BACKGROUND.CSS);
    };

    UIObject_ABSSkillInfo.prototype._drawInfo = function () {
        this._nextLine(4);
        this._drawName();
        this._drawLine(4, 4);
        this._setFontSize(16);
        this._deltaX = 8;
        this._drawCost();
        this._nextLine(4);
        this._drawTargetType();
        this._nextLine(10);
        this._drawABSInfo();
        this._drawDescription();
        this._drawRecharge();
        this._drawDamageFormula();
    };

    UIObject_ABSSkillInfo.prototype._drawName = function () {
        try {
            this._setFontSize(24);
            this._setColor(Color.WHITE);
            this.bitmap.outlineWidth = 2;
            this.bitmap.outlineColor = Color.BLACK.CSS;
            var name = this._skill.name();
            if (this._weaponMode) {
                if ($gamePlayer.battler().weapons().length > 0) {
                    name = $gamePlayer.battler().weapons()[0].name;
                }
            }
            this._drawText(name, this.width, 32);
            this._nextLine(28);
            this.bitmap.outlineWidth = 1;
        } catch (e) {
            console.error(e);
        }
    };

    UIObject_ABSSkillInfo.prototype._drawCost = function () {
        try {
            if (this._skill.isItem()) return;
            var mvSkill = this._skill.skill();
            if (mvSkill.mpCost > 0) {
                this._drawPair(UIObject_ABSSkillInfo.COLOR_TEXT, TextManager.mpA + " ", UIObject_ABSSkillInfo.COLOR_VALUE, mvSkill.mpCost, 'left');
                this._nextLine();
            }
            if (mvSkill.tpCost > 0) {
                this._drawPair(UIObject_ABSSkillInfo.COLOR_TEXT, TextManager.tpA + " ", UIObject_ABSSkillInfo.COLOR_VALUE, mvSkill.tpCost, 'left');
                this._nextLine();
            }
        } catch (e) {
            console.error(e);
        }
    };

    UIObject_ABSSkillInfo.prototype._drawTargetType = function () {
        try {
            var targetText = this._extractTargetMode();
            if (targetText != "") {
                var offset = 10;
                this._deltaX += offset;
                this._drawRectInner(this.width - (offset * 2), 30);
                this._textPosition = 'center';
                this._setColor(UIObject_ABSSkillInfo.COLOR_TEXT);
                this._drawText(targetText, this.width - (offset * 2) - this._deltaX, 24);
                this._nextLine();
            }
        } catch (e) {
            console.error(e);
        }
    };

    UIObject_ABSSkillInfo.prototype._drawABSInfo = function () {
        try {
            var text_color = new Color(128, 128, 255);
            var value_color = UIObject_ABSSkillInfo.COLOR_VALUE.reAlpha(220);

            if (this._skill.isRadiusType() && !this._skill.isNeedTarget()) {
                this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RADIUS, value_color, this._skill.radius, 'left');
                this._nextLine();
            } else {
                if (this._skill.range > 0) {
                    if (this._skill.radius > 0) {
                        this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RANGE2, value_color, this._skill.range, 'left');
                        this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RADIUS, value_color, this._skill.radius, 'right');
                    } else {
                        this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RANGE, value_color, this._skill.range, 'left');
                    }
                    this._nextLine();
                } else {
                    if (this._skill.range == 0 && this._skill.isNeedTarget()) {
                        this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RANGE2, value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_MELEE, 'left');
                        this._nextLine();
                    }
                }
            }

            var repeats = this._skill.skill().repeats;
            if (repeats > 1) {
                this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_REPEATS, value_color, repeats, 'left');
                this._nextLine();
            }

            if (this._skill.isNeedCast()) {
                this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_CAST, value_color,
                    SDK.decimalAdjust('round', this._skill.getCastTime($gamePlayer.battler()) / AlphaABS.BattleManagerABS.TURN, -1) +
                    AlphaABS.SYSTEM.STRING_SKILL_INFO_SEC, 'left');
                this._nextLine();
            }

            if (this._skill.getReloadTime() > 0 || this._skill.isNeedReloadParam()) {
                var reloadTime = this._skill.getReloadTime();
                if (this._skill.isNeedReloadParam()) {
                    reloadTime += $gamePlayer.battler()._calculateABSSkillReloadParam(this._skill.reloadParam);
                }
                reloadTime = SDK.decimalAdjust('round', reloadTime / AlphaABS.BattleManagerABS.TURN, -1);
                this._drawPair(text_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_COOLDOWN, value_color, reloadTime +
                    AlphaABS.SYSTEM.STRING_SKILL_INFO_SEC, 'left');
                this._nextLine();
            }
        } catch (e) {
            console.error(e);
        }
    };

    UIObject_ABSSkillInfo.prototype._drawDescription = function () {
        try {
            var descriptionText = this._skill.skill().description;
            if (this._skill.skillId == $gamePlayer.battler().attackSkillId() && descriptionText == "") {
                if ($gamePlayer.battler().weapons().length > 0) {
                    var playerWeapon = $gamePlayer.battler().weapons()[0];
                    descriptionText = playerWeapon.description;
                    if (playerWeapon.meta.noDescription && playerWeapon.meta.noDescription == "1") {
                        descriptionText = ""; //used weapon instead
                    }
                }
            }

            if (descriptionText == "") return;
            if (this._skill.noDescription == true) return;

            this._deltaX = 0;
            this._drawLine(4, 2);
            this._deltaX = 4;

            this._setColor(UIObject_ABSSkillInfo.COLOR_TEXT);
            this._textPosition = 'center';
            this._drawText(AlphaABS.SYSTEM.STRING_SKILL_INFO_DESCRIPTION, this.width - this._deltaX, 24);
            this._nextLine(26);

            this._descriptionTextWidth = this.width - (this._deltaX * 4);

            var style = this._getDescriptionStyle(this._descriptionTextWidth);

            this._descriptionText = new PIXI.Text(descriptionText, style);
            this._descriptionText.x = this._deltaX + 2;
            this._descriptionText.y = this._deltaY + 2;
            this.addChild(this._descriptionText);

            this._drawRectInner(this.width - this._deltaX, this._descriptionText.height + 8);

            this._nextLine(this._descriptionText.height + 12);
        } catch (e) {
            console.error(e);
        }
    };

    UIObject_ABSSkillInfo.prototype._drawDamageFormula = function () {
        try {
            var mvSkill = this._skill.skill();
            var damage = mvSkill.damage;
            if (damage.type == 0) return;

            this._deltaX = 0;
            this._drawLine(4, 2);
            this._deltaX = 12;

            var damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_DAMAGE;
            switch (damage.type) {
                case 1:
                    damageTypeText += TextManager.hpA;
                    break;
                case 2:
                    damageTypeText += TextManager.mpA;
                    break;
                case 3:
                    damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_RECOVER + TextManager.hpA;
                    break;
                case 4:
                    damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_RECOVER + TextManager.mpA;
                    break;
                case 5:
                    damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_DRAIN + TextManager.hpA;
                    break;
                case 6:
                    damageTypeText = AlphaABS.SYSTEM.STRING_SKILL_INFO_DRAIN + TextManager.mpA;
                    break;
            }

            var damageValueText = '';

            var isForUser = (this._skill.type == 0 && !this._skill.isNeedTarget());
            var isNeedTarget = damage.formula.contains('b');
            var tempTarget = null;

            if (isNeedTarget) {
                if (isForUser)
                    tempTarget = $gamePlayer.battler();
                else
                    tempTarget = AlphaABS.BattleManagerABS.getPlayerTarget();

                if (tempTarget == null) {
                    damageValueText = AlphaABS.SYSTEM.STRING_SKILL_INFO_TARGET;
                } else
                    damageValueText = this._getPotentialDamage(tempTarget.battler());

            } else {
                damageValueText = this._getPotentialDamage($gamePlayer.battler());
            }

            this._drawPair(UIObject_ABSSkillInfo.COLOR_TEXT, damageTypeText + " ", UIObject_ABSSkillInfo.COLOR_VALUE, damageValueText, 'center');
            this._nextLine();
        } catch (e) {
            console.error(e);
        }
    };

    UIObject_ABSSkillInfo.prototype._drawRecharge = function () {
        try {
            if (this._skill.isNeedAmmo() || this._skill.isStackType()) {
                this._deltaX = 0;
                this._drawLine(4, 2);
                this._deltaX = 12;
            }

            this._setFontSize(14);
            var value_color = new Color(252, 157, 101);
            if (this._skill.isNeedAmmo()) {
                var ammoName = $dataItems[this._skill.ammo].name;
                this._drawPair(value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_USE, UIObject_ABSSkillInfo.COLOR_VALUE, ammoName, 'left');
                this._drawPair(value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_HAS, UIObject_ABSSkillInfo.COLOR_VALUE, $gameParty.numItems($dataItems[this._skill.ammo]), 'right');
                this._nextLine();
            }
            if (this._skill.isStackType()) {
                var stackText = this._skill._currentStack + '/' + this._skill.stack;
                this._drawPair(value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_CHARGES, UIObject_ABSSkillInfo.COLOR_VALUE, stackText, 'left');
                this._nextLine();
                var reloadStack = SDK.decimalAdjust('round', this._skill.stackTime / AlphaABS.BattleManagerABS.TURN, -1) + AlphaABS.SYSTEM.STRING_SKILL_INFO_SEC;
                this._drawPair(value_color, AlphaABS.SYSTEM.STRING_SKILL_INFO_RELOADCHR, UIObject_ABSSkillInfo.COLOR_VALUE, reloadStack, 'left');
                this._nextLine();
            }
            this._setFontSize(18);
        } catch (e) {
            console.error(e);
        }
    };

    UIObject_ABSSkillInfo.prototype._setFontSize = function (size) {
        this.bitmap.fontSize = size;
    };

    UIObject_ABSSkillInfo.prototype._setColor = function (color) {
        this.bitmap.textColor = color.CSS;
    };

    UIObject_ABSSkillInfo.prototype._drawLine = function (offsetTop, offsetBottom) {
        offsetTop = SDK.check(offsetTop, 0);
        offsetBottom = SDK.check(offsetBottom, 0);
        this._deltaY += offsetTop;
        this._deltaX += this._lineOffsetX();
        this._drawRect(this.width - (this._deltaX + this._lineOffsetX()), 1, Color.WHITE.reAlpha(50));
        this._deltaX -= this._lineOffsetX();
        this._deltaY += offsetBottom;
    };

    UIObject_ABSSkillInfo.prototype._drawPair = function (color1, text1, color2, text2, position) {
        var textOffset = 12;
        var offset = 0;
        var dx = this._deltaX;
        var width = this.width - (this._deltaX * 2);
        if (position != 'center') {
            width = this.bitmap.measureTextWidth(text1) + this.bitmap.measureTextWidth(text2) + textOffset;
        }

        if (position == 'right') {
            this._deltaX = this.width - width - this._deltaX;
        } else {
            offset = this._deltaX - textOffset;
        }

        var oldColor = this.bitmap.textColor;
        this._textPosition = 'left';
        this._setColor(color1);
        this._drawText(text1, width - offset);
        this._textPosition = 'right';
        this._setColor(color2);
        this._drawText(text2, width - offset);

        this.bitmap.textColor = oldColor;
        this._textPosition = 'center';

        if (position == 'right')
            this._deltaX = dx;
    };

    UIObject_ABSSkillInfo.prototype._drawRect = function (width, height, color) {
        this.bitmap.fillRect(this._deltaX, this._deltaY, width, height, color.CSS);
    };

    UIObject_ABSSkillInfo.prototype._drawRectInner = function (width, height) {
        this._deltaX -= 1;
        this._deltaY -= 1;
        this._drawRect(width - this._deltaX, 1, UIObject_ABSSkillInfo.COLOR_BACKGROUND);
        this._drawRect(1, height + 1, UIObject_ABSSkillInfo.COLOR_BACKGROUND);
        this._deltaX += 1;
        this._deltaY += 1;
        this._drawRect(width - this._deltaX, height, UIObject_ABSSkillInfo.COLOR_BACKGROUND.getLightestColor(30));
    };

    UIObject_ABSSkillInfo.prototype._drawText = function (text, width, height) {
        height = SDK.check(height, 24);
        width = SDK.check(width, this.width);
        this.bitmap.drawText(text, this._deltaX, this._deltaY, width, height, this._textPosition);
    };

    UIObject_ABSSkillInfo.prototype._nextLine = function (offset) {
        offset = SDK.check(offset, 24);
        this._deltaY += offset;
    };

    UIObject_ABSSkillInfo.prototype._lineOffsetX = function () {
        return 18;
    };

    UIObject_ABSSkillInfo.prototype._getDescriptionStyle = function (width) {
        var style = {
            fontStyle: 'italic',
            fontFamily: 'Arial',
            fontSize: '12px',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 1,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 2,
            wordWrap: true,
            wordWrapWidth: width
        };
        return style;
    };

    UIObject_ABSSkillInfo.prototype._extractTargetMode = function () {
        var targetText = "";
        if (!this._skill) return "";
        switch (this._skill.type) {
            case 0:
                if (this._skill.isNeedTarget()) {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_ONTARGET;
                } else {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_ONUSER;
                }
                break;
            case 1:
                if (this._skill.isVectorTypeR()) {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_AREA;
                } else {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_ONTARGET;
                }
                break;
            case 2:
                if (this._skill.isNeedTarget()) {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_AREA;
                } else {
                    targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_CIRCLE;
                }
                break;
            case 3:
                targetText = AlphaABS.SYSTEM.STRING_SKILL_INFO_ZONE;
                break;
            default:
        }
        return targetText;
    };

    UIObject_ABSSkillInfo.prototype._getPotentialDamage = function (target) {
        try {
            var damageValueText = '';
            var action = new Game_Action($gamePlayer.battler());
            if (this._skill.isItem()) {
                action.setItem(this._skill.skill().id);
            } else {
                action.setSkill(this._skill.skill().id);
            }
            var damageValue = Math.abs(action.evalDamageFormula(target));
            if (damageValue > 0 && this._skill.skill().damage.variance > 0) {
                var dm = this._skill.skill().damage.variance;
                var percent = Math.round((damageValue / 100) * dm);
                var min = damageValue - percent;
                var max = damageValue + percent;
                damageValueText = min + '-' + max;
            } else {
                damageValueText = damageValue;
            }
            return damageValueText;
        } catch (e) {
            console.error(e);
            return "?";
        }
    };

    UIObject_ABSSkillInfo.COLOR_TEXT = Color.AQUA.reAlpha(200);
    UIObject_ABSSkillInfo.COLOR_VALUE = Color.ORANGE.reAlpha(200);
    UIObject_ABSSkillInfo.COLOR_BACKGROUND = Color.BLACK.reAlpha(200);

    AlphaABS.register(UIObject_ABSSkillInfo);
    //END UIObject_ABSSkillInfo
    //------------------------------------------------------------------------------

})();