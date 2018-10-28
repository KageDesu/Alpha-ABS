/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Sprite_Character_updatePosition = Sprite_Character.prototype.updatePosition;
    Sprite_Character.prototype.updatePosition = function () {
        _alias_Sprite_Character_updatePosition.call(this);
        if (this._character.inABSMotion()) {
            this.y += this._absMotionOffset();
        }
    };

    //?[NEW]
    Sprite_Character.prototype._absMotionOffset = function () {
        return this._character.ABSParams().absMotion.getOffset();
    };

    //@[ALIAS]
    var _alias_Sprite_Character_patternWidth = Sprite_Character.prototype.patternWidth;
    Sprite_Character.prototype.patternWidth = function () {
        if (this._character.inABSMotion()) {
            return this.bitmap.width / 3;
        } else {
            return _alias_Sprite_Character_patternWidth.call(this);
        }
    };
})();
// ■ END Sprite_Character.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////