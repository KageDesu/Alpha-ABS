(function(){
  //UIObject_ControlPanel
  //------------------------------------------------------------------------------
    function UIObject_ControlPanel() {
        this.initialize.apply(this, arguments);
    }

    UIObject_ControlPanel.prototype = Object.create(Sprite.prototype);
    UIObject_ControlPanel.prototype.constructor = UIObject_ControlPanel;

    UIObject_ControlPanel.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
      this.items = [];
      this._transfered = false;
      this._isVisible = true;
      this.setFrame(0,0,this._getY(1),this._getY(4));

      this._iconParameters = [];
      if(AlphaABS.Parameters.isLoaded()) {
        var parameters = AlphaABS.Parameters.get_UIE_PlayerHotBar();
        this._isVisible = parameters.Visible;
        for(var i = 1; i<6; i++)
          this._iconParameters[i-1] = parameters['Item'+i];
      } else {
        this._iconParameters = [true,true,true,true,true];
      }
      this.visible = this._isVisible;
    };

    UIObject_ControlPanel.prototype.showPanel = function() {
      this.visible = this._isVisible;
    };

    UIObject_ControlPanel.prototype.hidePanel = function() {
      this.visible = false;
    };

    UIObject_ControlPanel.prototype.terminate = function() {
      this.items.forEach(function(item) {
        item.terminate();
      });
    };

    UIObject_ControlPanel.prototype.checkTouch = function() {
      if(!this.visible) return null;
      if(this.parent) {
        if(this.parent.visible == false)
          return null;
      }
      for(var i = 0; i<this.items.count(); i++) {
        if(this.items[i].isTouched()) {
          return i;
        }
      }
      return null;
    };

    UIObject_ControlPanel.prototype.setEditMode = function() {
      this.items.forEach(function(item) {
        item.setEditMode();
      });
    };

    UIObject_ControlPanel.prototype.touchItemAt = function(index) {
      this.items[index].pulse();
    };

    UIObject_ControlPanel.prototype.selectItemAt = function(index, isSelect) {
      this.items[index].setSelected(isSelect);
    };

    UIObject_ControlPanel.prototype.disableItemAt = function(index, isDisable) {
      this.items[index].setDisabled(isDisable);
    };

    UIObject_ControlPanel.prototype.setIconAt = function(index, iconIndex) {
      this.items[index].setIcon(iconIndex);
    };

    UIObject_ControlPanel.prototype.setKeyAt = function(index, symbol) {
      this.items[index].setKey(symbol);
    };

    UIObject_ControlPanel.prototype.addItem = function() {
      this.items.push(new AlphaABS.LIBS.UIObject_ControlPanelItem());
      var item = this.items.last();
      item.y = this._getY(this.items.count() - 1);
      this.addChild(item);
      return item;
    };

    UIObject_ControlPanel.prototype.addEmptyItem = function() {
      this.items.push(new AlphaABS.LIBS.UIObject_ControlPanelItemDummy());
      var item = this.items.last();
      if(this.items.length > 1) {
        var prevItem = this.getPrevItem();
        item.y = this.getPrevItem().y;
      }
      this._emptyItems += 1;
      this.addChild(item);
      return item;
    };

    UIObject_ControlPanel.prototype.refreshWeaponIconAt = function(index) {
      if(!$gamePlayer.battler()) {
              this.setIconAt(index, AlphaABS.DATA.IMG.IconNoWeapon.bitmap);
              return;
          }
          var t = $gamePlayer.battler().weapons().first();
          if(t && (t.iconIndex > 0)) {
              this.setIconAt(index, t.iconIndex);
          } else {
              this.setIconAt(index, AlphaABS.DATA.IMG.IconNoWeapon.bitmap);
          }
          this.items[index].setSkill($gamePlayer.battler().skillABS_attack());
    };

    UIObject_ControlPanel.prototype.getLastItemIndex = function() {
      return this.items.count() - 1;
    };

    UIObject_ControlPanel.prototype.createBaseItems = function() {
      this._emptyItems = 0;
      //Attack
      var item = (this._iconParameters[0]) ? this.addItem() : this.addEmptyItem();
      var index = this.getLastItemIndex();
      this.refreshWeaponIconAt(index);
      item.setKey(AlphaABS.LIBS.IKey.CP_A());
      //Follow
      item = (this._iconParameters[1]) ? this.addItem() : this.addEmptyItem();
      item.setIcon(AlphaABS.DATA.IMG.IconFollow.bitmap);
      item.setKey(AlphaABS.LIBS.IKey.CP_W());
      //Jump
      item = (this._iconParameters[2]) ? this.addItem() : this.addEmptyItem();
      item.setIcon(AlphaABS.DATA.IMG.IconJump.bitmap);
      item.setKey(AlphaABS.LIBS.IKey.CP_S());
      //Rotate
      item = (this._iconParameters[3]) ? this.addItem() : this.addEmptyItem();
      item.setIcon(AlphaABS.DATA.IMG.IconToMouse.bitmap);
      item.setKey(AlphaABS.LIBS.IKey.CP_D());

      //SwitchWeapon
        item = (this._iconParameters[4]) ? this.addItem() : this.addEmptyItem();
        item.setIcon(AlphaABS.DATA.IMG.IconSwitchWeapon.bitmap);
        item.setKey(AlphaABS.LIBS.IKey.WC());

      this._setFrame();
      this._rearangeInVertical();
    };

    UIObject_ControlPanel.prototype.refresh = function() {
      for(var i = 0; i<this.items.length; i++) {
              this.items[i].refresh();
          }
    };

    UIObject_ControlPanel.prototype.transfer = function() {
      if(this._transfered) {
        this._transferOut();
      } else {
        this._transferIn();
      }
    };

    UIObject_ControlPanel.prototype.isHorizontal = function() {
      return (this._transfered == true);
    };

    UIObject_ControlPanel.prototype.getRealCount = function() {
      return (this.items.length - this._emptyItems);
    };


    UIObject_ControlPanel.prototype.getPrevItem = function() {
      return this.items[this.items.length - 2];
    };

    //PRIVATE
    UIObject_ControlPanel.prototype._getY = function(index) {
      return 38 * index;
    };

    UIObject_ControlPanel.prototype._setFrame = function() {
      this.width = this._getY(1);
      this.height = this._getY(1) * this.getRealCount();
      this.setFrame(this.x,this.y,this.width,this.height);
    };

    UIObject_ControlPanel.prototype._transferIn = function() {
      //LOG.p("Transfer IN");
      this._transfered = true;

      this._oldWidth = this.width;
      this._oldHeigth = this.height;

      this.width = this._getY(1) * this.getRealCount();
      this.height = this._getY(1);

      this.setFrame(this.x,this.y,this.width,this.height);
      this._rearangeInHorizontal();
    };

    UIObject_ControlPanel.prototype._transferOut = function() {
      //LOG.p("Transfer OUT");
      this._transfered = false;

      this.width = this._oldWidth;
      this.height = this._oldHeigth;

      this.setFrame(this.x,this.y,this.width, this.height);
      this._rearangeInVertical();
    };

    UIObject_ControlPanel.prototype._rearangeInHorizontal = function() {
      for(var i = 0; i<this.items.length; i++) {
        var item = this.items[i];
        item.y = 0;
        if(i > 0) {
          if(item.isEmpty()) {
            item.x = this.items[i-1].x;
          } else
            item.x = this.items[i-1].x + this._getY(1);
        } else {
          item.x = 0;
        }
      }
    };

    UIObject_ControlPanel.prototype._rearangeInVertical = function() {
      for(var i = 0; i<this.items.length; i++) {
        var item = this.items[i];
        item.x = 0;
        if(i > 0) {
          if(item.isEmpty()) {
            item.y = this.items[i-1].y;
          } else
            item.y = this.items[i-1].y + this._getY(1);
        } else {
          item.y = 0;
        }
      }
    };

    AlphaABS.register(UIObject_ControlPanel);
    //END UIObject_ControlPanel
  //------------------------------------------------------------------------------
})();
