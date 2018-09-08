/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Weapon.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
  //OVER
  Sprite_Weapon.prototype.animationWait = function () {
    return 6;
  };

  //NEW
  Sprite_Weapon.prototype.setDirectionABS = function (directionKey) {
    if (this._weaponImageId <= 0) return;

    this.scale.x = 0.7;
    this.scale.y = 0.7;
    this.y = 0;
    this.x = 0;
    this.opacity = 255;

    switch (directionKey) {
      case 'r':
        this.x = 8;
        this.scale.x *= -1;
        break;
      case 'l':
        this.x = -8;
        break;
      case 'u':
        this.opacity = 0;
        break;
      case 'd':
        this.y = 5;
        break;
    }
  };
})();
// ■ END Sprite_Weapon.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////