/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Damage.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//@[ALIAS]
var _alias_Sprite_Damage_setup = Sprite_Damage.prototype.setup;
Sprite_Damage.prototype.setup = function (target) {
    this._absDigitsSprites = [];
    _alias_Sprite_Damage_setup.call(this, target);
    if (target && target.isPlayer()) {
        var result = target.result();
        if (result.hpAffected) {
            if (this._absDigitsSprites) {
                this._applyABSColor();
            }
        }
    }
};

//?[NEW]
Sprite_Damage.prototype._applyABSColor = function () {
    var color = KDCore.Color.BLACK.ARR;
    if (AlphaABS.Parameters.isLoaded()) {
        color = AlphaABS.Parameters.get_UI_PlayerDamageColor();
    }

    this._absDigitsSprites.forEach(function (sprite) {
        sprite.setColorTone(color);
    });
};

//@[ALIAS]
var _alias_Sprite_Damage_createChildSprite = Sprite_Damage.prototype.createChildSprite;
Sprite_Damage.prototype.createChildSprite = function () {
    var sprite = _alias_Sprite_Damage_createChildSprite.call(this);
    this._absDigitsSprites.push(sprite);
    return sprite;
};
// ■ END Sprite_Damage.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////