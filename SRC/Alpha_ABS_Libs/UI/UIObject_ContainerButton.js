(function(){

  //UIObject_ContainerButton
  //------------------------------------------------------------------------------
    class UIObject_ContainerButton extends Sprite_Button
    {
      constructor(iconBitmap) {
        super();
        this.image = iconBitmap;
        this.refresh();
      }

      refresh() {
        this.bitmap = new Bitmap(this.image.width, this.image.height);
        //this.bitmap.fillRect(0,0,this.image.width, this.image.height, Color.BLACK.CSS); //getLightestColor(250)
        this.bitmap.blt(this.image, 0, 0, this.image.width, this.image.height, 0, 0);
      }
    }

    //END UIObject_ContainerButton
  //------------------------------------------------------------------------------

  AlphaABS.register(UIObject_ContainerButton);


})();
