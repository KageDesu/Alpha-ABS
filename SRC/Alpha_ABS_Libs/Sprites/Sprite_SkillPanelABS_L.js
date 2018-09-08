(function(){
  class Sprite_SkillPanelABS_L extends AlphaABS.LIBS.Sprite_SkillPanelABS {
    constructor() {
      super();
    }

    refresh(actor) {
      this.terminate();
      this.actor = actor;
      this._initSkills2();
    }

    _initSkills() {
      this.items = [];
    }

    _initSkills2() {
      this.items = [];
      for(var i = 1; i<9; i++) { //ALL
        var item = new AlphaABS.LIBS.UIObject_SkillPanelItem_L(i - 1, this.actor);
        item.x = ((i - 1) * 42);
        item.y = 0;
        this.items.push(item);
        this.addChild(item);
      }
    }

  }

  AlphaABS.register(Sprite_SkillPanelABS_L);

})();
