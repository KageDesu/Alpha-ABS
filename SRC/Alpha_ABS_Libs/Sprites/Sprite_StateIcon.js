(function(){

  //Sprite_StateIcon
  //------------------------------------------------------------------------------
    //NEW
    Sprite_StateIcon.prototype.setPriority = function(value) {
      this._priority = value;
    };

    //OVER
    Sprite_StateIcon.prototype.updateIcon = function() {
        var icons = [];
        if (this._battler && this._battler.isAlive()) {
          if(!this._priority)
              icons = this._battler.allIcons();
            else {
              icons = this._battler.allIconsWithPriority(this._priority);
            }
        }
        if (icons.length > 0) {
            this._animationIndex++;
            if (this._animationIndex >= icons.length) {
                this._animationIndex = 0;
            }
            this._iconIndex = icons[this._animationIndex];
        } else {
            this._animationIndex = 0;
            this._iconIndex = 0;
        }
    };

    //END Sprite_Sprite_StateIcon
  //------------------------------------------------------------------------------

})();
