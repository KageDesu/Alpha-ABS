(function(){
  //Sprite_HoverIcon
  //------------------------------------------------------------------------------
      function Sprite_HoverIcon() {
          this.initialize.apply(this, arguments);
      }

      Sprite_HoverIcon.prototype = Object.create(AlphaABS.LIBS.Sprite_Hover.prototype);
      Sprite_HoverIcon.prototype.constructor = Sprite_HoverIcon;

      Sprite_HoverIcon.prototype.initialize = function(w,h,fw) {
          this._fwidth = fw || 2;
          AlphaABS.LIBS.Sprite_Hover.prototype.initialize.call(this, w, h);
      };

      Sprite_HoverIcon.prototype.standardFrameWidth = function() {
          return this._fwidth;
      };
      //END Sprite_HoverIcon
  //------------------------------------------------------------------------------

  AlphaABS.register(Sprite_HoverIcon);

})();
