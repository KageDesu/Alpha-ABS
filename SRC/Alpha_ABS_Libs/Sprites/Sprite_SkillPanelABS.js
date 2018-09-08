(function(){
  class Sprite_SkillPanelABS extends Sprite
  {
    constructor() {
      super();

      this._isVisible = true;
      if(AlphaABS.Parameters.isLoaded()) {
        var parameters = AlphaABS.Parameters.get_UIE_PlayerSpellsPanel();
        this.bitmap = parameters.Image;
        this._isVisible = parameters.Visible;
      } else {
        this.bitmap = AlphaABS.DATA.IMG.SkillPanel.bitmap;
      }
      this._initSkills();
    }

    showPanel() {
      this.visible = this._isVisible;
    }

    hidePanel() {
      this.visible = false;
    }

    refresh() {
      this.items.forEach(function(item){
        if(item)
          item._createHelp();
      });
    }

    checkTouch() {
      for(var i = 0; i<this.items.count(); i++) {
        if(this.items[i].isTouched()) {
          return i + 1;
        }
      }
      return null;
    }

    setEditMode() {
      this.items.forEach(function(item) {
        item.setEditMode();
      });
    }

    terminate() {
      this.items.forEach(function(item) {
        item.terminate();
      });
    }

    touchSkillAt(index) {
      if(index != null)
        this.items[index - 1].pulse();
    }

    //PRIVATE
    _initSkills() {
      this.items = [];

      for(var i = 1; i<9; i++) { //ALL
        var item = new AlphaABS.LIBS.UIObject_SkillPanelItem(i - 1);
        item.x = ((i - 1) * 42);
        item.y = 0;
        this.items.push(item);
        this.addChild(item);
      }
    }
  }

  AlphaABS.register(Sprite_SkillPanelABS);
})();
