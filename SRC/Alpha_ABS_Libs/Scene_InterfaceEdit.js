(function () {
  //Scene_InterfaceEdit
  //------------------------------------------------------------------------------
  function Scene_InterfaceEdit() {
    this.initialize.apply(this, arguments);
  }

  Scene_InterfaceEdit.prototype = Object.create(Scene_Base.prototype);
  Scene_InterfaceEdit.prototype.constructor = Scene_InterfaceEdit;

  Scene_InterfaceEdit.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this._draw_background();
    this.createWindowLayer();

    AlphaABS.BattleUI.requestFreeMode();
    this._spritesetUI = new AlphaABS.LIBS.Spriteset_InterfaceABS();
    this.addChild(this._spritesetUI);
    this._spritesetUI.initABS();
    this._spritesetUI.setEditMode();
  };

  Scene_InterfaceEdit.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    //EXIT
    if (this.isExit()) {
      this._spritesetUI.terminate();
      this.popScene();
    }
  };

  Scene_InterfaceEdit.prototype.isExit = function () {
    return (Input.isTriggered('cancel') || TouchInput.isCancelled());
  };

  //RPIVATE
  Scene_InterfaceEdit.prototype._draw_background = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this._backgroundSprite.setBlendColor([16, 16, 16, 128]);
    this.addChild(this._backgroundSprite);
  };
  //END Scene_InterfaceEdit
  //------------------------------------------------------------------------------

  AlphaABS.register(Scene_InterfaceEdit);

})();