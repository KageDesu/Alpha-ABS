(function () {

  var UIObject_ContainerButton;

  //UIObject_Container
  //------------------------------------------------------------------------------
  function UIObject_Container() {
    this.initialize.apply(this, arguments);
  }

  UIObject_Container.prototype = Object.create(AlphaABS.LIBS.Sprite_Ext.prototype);
  UIObject_Container.prototype.constructor = UIObject_Container;

  UIObject_Container.prototype.initialize = function (x, y, w, h) {
    AlphaABS.LIBS.Sprite_Ext.prototype.initialize.call(this);
    UIObject_ContainerButton = AlphaABS.LIBS.UIObject_ContainerButton;
    this.setFrame(0, 0, w, h);
    this.x = x;
    this.y = y;
    this.backSprite = null;
    this.text = null;
    this.text_vis_always = false;
    this._uiElement = null;
    this._uiElementVisMode = true;
    this._specButton = null;
    this._specMode = false;
  };

  UIObject_Container.prototype.update = function () {
    AlphaABS.LIBS.Sprite_Ext.prototype.update.call(this);
    if(this._hover && !this._hover.isFree()) {
      if (this.backSprite)
        this._checkIsNeedDrawText();
    }
  };

  UIObject_Container.prototype.setText = function (text, always) {
    this.text = text;
    this.text_vis_always = always || false;
  };

  UIObject_Container.prototype.addUI = function (element) {
    this._uiElement = element;
    this.addChild(element);
  };

  UIObject_Container.prototype.onStartMove = function () {
    if (this._hover) this._hover.freeze();
  };

  UIObject_Container.prototype.onEndMove = function () {
    if (this._hover) this._hover.free();
    this._updateButtonsPlacement();
  };

  UIObject_Container.prototype.onFree = function () {
    if (this.backSprite) {
      this.backSprite.visible = true;
    } else {
      this.backSprite = new Sprite();
      this.backSprite.bitmap = new Bitmap(this.width, this.height);
      this.backSprite.bitmap.fillRect(0, 0, this.width, this.height, Color.BLACK.CSS);
      this.backSprite.opacity = 100;
      this.addChild(this.backSprite);
      this._checkIsNeedDrawText();
    }
    this.visible = true;
    this.refreshVisButtons();
    this._hover = new AlphaABS.LIBS.Sprite_Hover(this.width, this.height);
    this.addChild(this._hover);
  };

   UIObject_Container.prototype._checkIsNeedDrawText = function() {
    if (this.text) {
      if (this.text_vis_always)
        this._drawText();
      else {
        if (this._uiElement && this._uiElement.visible == false) {
          this._drawText();
        }
      }
    }
  };

  UIObject_Container.prototype._drawText = function () {
    this.backSprite.bitmap.fillRect(0, 0, this.width, this.height, Color.BLACK.CSS);
    this.backSprite.opacity = 100;
    var text = this.text + ' (' + this.x + ',' + this.y + ')';
    this.backSprite.bitmap.drawText(text, 4, this.height / 2, this.width-8, 0, 'center');
  };

  UIObject_Container.prototype.onFreeze = function () {
    if (this.backSprite) {
      this.backSprite.visible = false;
    }
    if (this._uiElementVisMode == false)
      this.visible = false;

    if (this._visibleButton) {
      this._visibleButton.visible = false;
      this._visibleButton2.visible = false;
    }
  };

  UIObject_Container.prototype.setElementVisibility = function (isVis) {
    this._uiElementVisMode = isVis;
    if (this._uiElementVisMode == false && this._free == false) {
      this.visible = false;
    }
    this.refreshVisButtons();
  };

  UIObject_Container.prototype.setSpecialMode = function (value) {
    if (value == true) {
      this._specButton.callClickHandler();
    }

    this._specMode = value;
  };

  UIObject_Container.prototype.visibleMode = function () {
    return this._uiElementVisMode;
  };

  UIObject_Container.prototype.specialMode = function () {
    return this._specMode;
  };

  UIObject_Container.prototype.addSpecialButton = function (button_config) {
    this._specButton = new UIObject_ContainerButton(button_config.image);
    this._specButton.setClickHandler(function () {
      button_config.func();
      this.removeChild(this._hover);
      this._hover = new AlphaABS.LIBS.Sprite_Hover(this.width, this.height);
      this.addChild(this._hover);
    }.bind(this));
    this._updateButtonsPlacement();
    this.addChild(this._specButton);
    this._specButton.visible = false;
  };

  //TODO: Надо создать отдельную кнопку (класс) от Sprite_Button
  UIObject_Container.prototype.addVisButtton = function () {
    //LOG.p("Visible buttons created");
    this._visibleButton = new UIObject_ContainerButton(AlphaABS.DATA.IMG.IconEyeOn.bitmap);
    this._visibleButton2 = new UIObject_ContainerButton(AlphaABS.DATA.IMG.IconEyeOff.bitmap);
    this.refreshVisButtons();

    this._visibleButton.setClickHandler(function () {
      this._visClickHandler();
    }.bind(this));
    this._visibleButton2.setClickHandler(function () {
      this._visClickHandler();
    }.bind(this));
    this._updateButtonsPlacement();

    this.addChild(this._visibleButton);
    this.addChild(this._visibleButton2);
  };

  UIObject_Container.prototype._updateButtonsPlacement = function () {
    if (!this._visibleButton) return;

    var _r = 0;
    var _u = 0;
    if (SDK.toGlobalCoord(this, 'x') < Graphics.width / 2) {
      _r = 1;
    }

    if (SDK.toGlobalCoord(this, 'y') < Graphics.height / 2) {
      _u = 1;
    }

    if (_r == 1) {
      this._visibleButton.x = this.width;
      if (this._specButton)
        this._specButton.x = this._visibleButton.x + 24;
    } else {
      this._visibleButton.x = -24;
      if (this._specButton)
        this._specButton.x = this._visibleButton.x - 24;
    }

    if (_u == 1) {
      this._visibleButton.y = this.height;
      if (this._specButton)
        this._specButton.y = this._visibleButton.y;
    } else {
      this._visibleButton.y = -24;
      if (this._specButton)
        this._specButton.y = this._visibleButton.y;
    }


    this._visibleButton2.x = this._visibleButton.x;
    this._visibleButton2.y = this._visibleButton.y;

    if (this.backSprite) {
      this.backSprite.bitmap.clear();
      this.backSprite.bitmap.fillRect(0, 0, this.width, this.height, Color.BLACK.CSS);
      this.backSprite.opacity = 100;
      this._checkIsNeedDrawText();
    }
  };



  UIObject_Container.prototype.refreshVisButtons = function () {
    //LOG.p("Refresh visible buttons");
    if (!this._visibleButton) return;
    if (this._uiElementVisMode == false) {
      this._visibleButton.visible = false;
      this._visibleButton2.visible = true;
    } else {
      this._visibleButton.visible = true;
      this._visibleButton2.visible = false;
    }

    if (this._specButton)
      this._specButton.visible = true;

    if (!this._free) {
      if (this._visibleButton) {
        this._visibleButton.visible = false;
        this._visibleButton2.visible = false;
      }
      if (this._specButton)
        this._specButton.visible = false;
    }
  };


  UIObject_Container.prototype._visClickHandler = function () {
    //LOG.p("Visible button clicked");
    this.setElementVisibility(!this._uiElementVisMode);
    $gameVariables.setUIParam('visX', this._uiElementVisMode);
    this.refreshVisButtons();
  };

  //END UIObject_Container
  //------------------------------------------------------------------------------
  AlphaABS.register(UIObject_Container);
})();