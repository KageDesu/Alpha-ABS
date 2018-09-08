(function(){
  //UIObject_ControlPanelItemDummy
  //------------------------------------------------------------------------------
    function UIObject_ControlPanelItemDummy() {
        this.initialize.apply(this, arguments);
    }

    UIObject_ControlPanelItemDummy.prototype = Object.create(AlphaABS.LIBS.UIObject_ControlPanelItem.prototype);
    UIObject_ControlPanelItemDummy.prototype.constructor = UIObject_ControlPanelItemDummy;

    UIObject_ControlPanelItemDummy.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);

    };

    UIObject_ControlPanelItemDummy.prototype.setEditMode = function() {
      //EMPTY
    };

    UIObject_ControlPanelItemDummy.prototype.setIcon = function(index) {
      //EMPTY
    };

    UIObject_ControlPanelItemDummy.prototype.setKey = function(symbol) {
      //EMPTY
    };

    UIObject_ControlPanelItemDummy.prototype.setSkill = function(absSkill) {
      //EMPTY
    };

    UIObject_ControlPanelItemDummy.prototype.refresh = function() {
      //EMPTY
    };

    UIObject_ControlPanelItemDummy.prototype.pulse = function() {
      //EMPTY
    };

    UIObject_ControlPanelItemDummy.prototype.isEmpty = function() {
      return true;
    };

    UIObject_ControlPanelItemDummy.prototype.setSelected = function(isSelect) {
      //EMPTY
    };

    UIObject_ControlPanelItemDummy.prototype.setDisabled = function(isDisabled) {
      //EMPTY
    };

    UIObject_ControlPanelItemDummy.prototype.isTouched = function() {
      return false;
    };

    UIObject_ControlPanelItemDummy.prototype.terminate = function() {
      //EMPTY
    };
    //END UIObject_ControlPanelItemDummy
  //------------------------------------------------------------------------------
  AlphaABS.register(UIObject_ControlPanelItemDummy);
})();
