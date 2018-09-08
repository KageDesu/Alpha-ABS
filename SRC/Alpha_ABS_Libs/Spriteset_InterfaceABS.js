(function(){
  var LOG = new PLATFORM.DevLog("Spriteset_InterfaceABS");

  var ABSObject_PopUpMachine = AlphaABS.LIBS.ABSObject_PopUpMachine;
  var UIObject_Container;
  var ItemLineSprite = AlphaABS.LIBS.ItemLineSprite;
  var PointX = AlphaABS.UTILS.PointX;

  //Spriteset_InterfaceABS
  //------------------------------------------------------------------------------
    class Spriteset_InterfaceABS extends Sprite {
      constructor() {
        super();
        UIObject_Container = AlphaABS.LIBS.UIObject_Container;
        this.setFrame(0, 0, Graphics.width, Graphics.height);
        this._moveElements = [];
        this._free = false; //Can be edited
        this._isABS = false;
        this._needFree = $gameVariables.getUIParam('free') || false;
        this._showUI = $gameVariables.getUIParam('show');
        if(this._showUI == null) this._showUI = true;
        this._showUI = AlphaABS.Parameters.isUIVisible();
        this.z = 10;
        this._autoHideSkillPanel = true;
        this.update();
      }

      initABS() {
        LOG.p("Init ABS!");
        this._isABS = true;
        this._createElements();
        this._createUIContainers();
        this._refreshPlacement();
        if(!this._showUI) {
          this.hide();
        } else {
          if(this._needFree) {
            this.freeElements();
            this._needFree = false;
          } else
            this.show();
        }
      }

      setEditMode() {
        //Чтобы заблокировать некоторые способновсти элементов, например Hover когда мышь наведина
        if(!this._isABS) return;
        this.spriteSkillPanel.setEditMode();
        this.spriteControlPanel.setEditMode();
      }

      hide() {
        this.freezeElements();
        this._isABS = false;
        this.visible = false;
        this.hideControl();
      }

      show() {
        this._isABS = true;
        this.visible = true;
        this.showControl();
      }

      isVisible() {
        return (this._showUI == true);
      }

      isFree() {
        return (this._free == true);
      }

      needFree() {
        $gameVariables.setUIParam('free', true);
        this._needFree = true;
      }

      setShowUI(value) {
        $gameVariables.setUIParam('show', value);
        this._showUI = value;
      }

      freeElements() {
        if(this._free) return;
        if(this.visible == false)
          this.show();
        $gamePlayer.controlOff();
        this._moveElements.forEach(function(item) {
          item[1].free();
        });
        this._free = true;
      }

      freezeElements() {
        if(!this._free) return;
        $gameVariables.setUIParam('free', false);
        this._moveElements.forEach(function(item) {
          item[1].freeze();
          $gameVariables.setUIPosition(item[0],
            item[1].x,
            item[1].y,
            item[1].visibleMode(),
            item[1].specialMode());
        });
        this._free = false;
        $gamePlayer.controlOn();
      }

      hideControl() {
        this.hideSkillPanel();
        this.hideControlPanel();
      }

      showControl() {
        if($gamePlayer.battler().uiPanelObjectsCount() > 0)
          this.showSkillPanel();
        this.showControlPanel();
      }

      showTarget(target) {
        this.popUpMachineTarget.clear();
        this.spriteTarget.setTarget(target);
        this.spriteTargetStatuses.setTarget(target);
      }

      controlPanel() {
        return this.spriteControlPanel;
      }

      pushOnItemPanel(type, value) {
        switch(type) {
          case 'item':
            this.itemsBar.push(ItemLineSprite.Item(value.name, value.iconIndex));
          break;
          case 'exp':
            this.itemsBar.push(ItemLineSprite.Exp(value));
          break;
          case 'gold':
            this.itemsBar.push(ItemLineSprite.Gold(value));
          break;
          default:
            this.itemsBar.push(new ItemLineSprite(value));
          break;
        }
      }

      isTouched() {
        var y = TouchInput.y;
        if(this._checkLayerTouch(this._layerSkillPanel)) {
          //LOG.p("Mouse in interface");
          return ['skill', this.spriteSkillPanel.checkTouch()];
        }
        if(this._checkLayerTouch(this._layerControlPanel)) {
          return ['panel', this.spriteControlPanel.checkTouch()];
        }
        return null;
      }

      addPopUp(popObject) {
        this.popUpMachine.push(popObject);
      }

      addPopUpUser(popObject) {
        if(popObject.hasIcon())
          this.popUpMachineUser2.push(popObject);
        else
          this.popUpMachineUser.push(popObject);
      }

      addPopUpTarget(target, popObject) {
        if(target == this.spriteTarget.target) {
          if(popObject.hasIcon())
            this.popUpMachineTarget2.push(popObject);
          else
            this.popUpMachineTarget.push(popObject);
        }
      }

      touchSkillAt(index) {
        this.spriteSkillPanel.touchSkillAt(index);
      }

      refreshSkillPanel() {
        this.spriteSkillPanel.refresh();
      }

      terminate() {
        this.freezeElements();
        this.spriteUserUI.terminate();
        this.spriteSkillPanel.terminate();
        this.spriteControlPanel.terminate();
        this.spriteTarget.terminate();
        this.spriteTargetStatuses.terminate();
        this.userStatusPanel.terminate();
        this.spriteCastBar.terminate();
        this.spriteAttackBar.terminate();
        this._moveElements = [];
        this._isABS = false;
        LOG.p("Terminate!");
      }

      update() {
        this._updatePosition();
        if(this._isABS) {
          this.popUpMachine.update();
          this.popUpMachineUser.update();
          this.popUpMachineUser2.update();
          this.popUpMachineTarget.update();
          this.popUpMachineTarget2.update();
          this.userStatusPanel.update();

          if(this._free) {
            this._moveElements.forEach(function(item) {
              item[1].update();
            });
          } else {
            this.itemsBar.update();
          }

          if(this._sCircle)
                    this._sCircle.update();
        }
      }

      refresh() {
        if($gamePlayer.battler() == null) return;
        this._refreshSkillPanelVisibility();
        this.refreshSkillPanel();
      }

      _refreshSkillPanelVisibility() {
        if ($gamePlayer.battler().uiPanelObjectsCount() > 0)
          this.showSkillPanel();
        else {
          if (this._autoHideSkillPanel == true)
            this.hideSkillPanel();
          else
            this.showSkillPanel();
        }
      }

      refreshFace() {
        this.spriteUserUI.refresh();
      }

      showSkillPanel() {
        if(this.spriteSkillPanel)
          this.spriteSkillPanel.showPanel();
      }

      hideSkillPanel() {
        if(this.spriteSkillPanel)
          this.spriteSkillPanel.hidePanel();
      }

      showControlPanel() {
        this.spriteControlPanel.showPanel();
      }

      hideControlPanel() {
        this.spriteControlPanel.hidePanel();
      }

      saveUIPattern() {
        var _items = {};
        this._moveElements.forEach(function(item) {
          _items[item[0]] = [item[1].x, item[1].y, item[1].visibleMode(), item[1].specialMode()];
        });
      }

      weapCircle() {
        return this._sCircle;
      }

      weapCircleRefresh() {
        if(this.weapCircle())
                  this.weapCircle().refresh();

              if(this.controlPanel()) {
                  if($gamePlayer.battler().isFavWeapExists()) {
                      this.controlPanel().disableItemAt(4, false);
                  } else {
                      this.controlPanel().disableItemAt(4, true);
                  }
              }
      }

      //PRIVATE
      _refreshPlacement() {
        this._moveElements.forEach(function(item) {
          var p = $gameVariables.getUIPosition(item[0]);
          if(p) {
            item[1].move(p.x,p.y);

            if(p.vis !== null) {
              item[1].setElementVisibility(p.vis);
            }

            if(p.extra!= null) {
              item[1].setSpecialMode(p.extra);
            }

          }
        });
        this.itemsBar.refresh();
      }

      _createElements() {
        this._createSkillPanel();
        this._createUserUI();
        this._createTargetUI();
        this._createControlPanel();
        this._createUserStatusBar();
        this._createAlertBar();
        this._createItemsBar();
        this._createFavWeapCircle();
      }

      _createUIContainers() {
        var parameters;
        var skillCtn = new UIObject_Container(0,0,342,48);
        skillCtn.addUI(this.spriteSkillPanel);
        skillCtn.setText("Skill panel", true);
        skillCtn.x = SDK.toCX(skillCtn.width);
        skillCtn.y = Graphics.height - skillCtn.height - 10;
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerSpellsPanel();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              skillCtn.x = posX;
            if(posY)
              skillCtn.y = posY;
          }
        }
        skillCtn.addVisButtton();
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerSpellsPanel();
          this._autoHideSkillPanel = parameters.AutoHide;
          this._refreshSkillPanelVisibility();
          if(parameters.Visible)
            this.addChild(skillCtn);
        } else
          this.addChild(skillCtn);
        this._moveElements.push(['skillPanel',skillCtn]);
        this._layerSkillPanel = skillCtn; //For touch

        var userCtn = new UIObject_Container(0,0,242,98);
        userCtn.addUI(this.spriteUserUI);
        userCtn.setText("Player", true);
        userCtn.x = 6;
        userCtn.y = 4;
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerStatus();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              userCtn.x = posX;
            if(posY)
              userCtn.y = posY;
          }
        }
        userCtn.addVisButtton();
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerStatus();
          if(parameters.Visible)
            this.addChild(userCtn);
        } else
          this.addChild(userCtn);
        this._moveElements.push(['userPanel',userCtn]);

        var userCastBars = new UIObject_Container(0,0,150,80);
        userCastBars.addChild(this.spriteCastBar);
        userCastBars.addUI(this.spriteAttackBar);
        userCastBars.setText('Cast bar', false);
        userCastBars.x = userCtn.x + 10;
        userCastBars.y = userCtn.height + 24;
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerCastBar();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              userCastBars.x = posX;
            if(posY)
              userCastBars.y = posY;
          }
        }
        userCastBars.addVisButtton();
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerCastBar();
          if(parameters.Visible)
            this.addChild(userCastBars);
        } else
          this.addChild(userCastBars);
        this._moveElements.push(['userCastBars',userCastBars]);

        var targetUI = new UIObject_Container(0,0,180,100);
        targetUI.addChild(this.spriteTarget );
        targetUI.addUI(this.spriteTargetStatuses);
        targetUI.setText('Target', false);
        targetUI.x = 250;
        targetUI.y = 50;
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerTarget();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              targetUI.x = posX;
            if(posY)
              targetUI.y = posY;
          }
        }
        targetUI.addVisButtton();
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerTarget();
          if(parameters.Visible)
            this.addChild(targetUI);
        } else
          this.addChild(targetUI);
        this._moveElements.push(['targetUI',targetUI]);

        var controlPanel = new UIObject_Container(0,0,this.spriteControlPanel.width,this.spriteControlPanel.height);
        controlPanel.addUI(this.spriteControlPanel);
        controlPanel.setText('CP', false);
        controlPanel.x = 4;
        controlPanel.y = SDK.toCX(controlPanel.height, Graphics.height);

        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerHotBar();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              controlPanel.x = posX;
            if(posY)
              controlPanel.y = posY;
          }
        }

        controlPanel.addVisButtton();
        controlPanel.addSpecialButton({
              image: AlphaABS.DATA.IMG.IconTransfer.bitmap,
              func: (function () {
            this._uiElement.transfer();
            this.width = this._uiElement.width;
            this.height = this._uiElement.height;
            if(this.backSprite) {
              this.removeChild(this.backSprite);
              this.removeChild(this._hover);
              this.backSprite = null;
              this.onFree();
              this.update();
            }
            this._specMode = !this._specMode;
            this._updateButtonsPlacement();
          }.bind(controlPanel))});
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerHotBar();
          if(parameters.Visible)
            this.addChild(controlPanel);
        } else
          this.addChild(controlPanel);
        this._moveElements.push(['controlPanel',controlPanel]);
        this._layerControlPanel = controlPanel; //For touch

        var alertBar = new UIObject_Container(0,0,this.spriteAlertLayer.width,this.spriteAlertLayer.height);
        alertBar.addUI(this.spriteAlertLayer);
        alertBar.setText("System messages", true);
        alertBar.x = SDK.toCX(alertBar.width);
        alertBar.y = Graphics.height - alertBar.height - this._layerSkillPanel.height - 4;
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerMessageBar();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              alertBar.x = posX;
            if(posY)
              alertBar.y = posY;
          }
          this.spriteAlertLayer.visible = parameters.Visible;
        }
        alertBar.addVisButtton();
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerMessageBar();
          if(parameters.Visible)
            this.addChild(alertBar);
        } else
          this.addChild(alertBar);
        this._moveElements.push(['alertBar',alertBar]);

        var statusBar = new UIObject_Container(0,0,180,100);
        statusBar.addUI(this.userStatusPanel);
        statusBar.setText("Player Statuses", true);
        statusBar.x = Graphics.width - statusBar.width - 4;
        statusBar.y = 4;
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerStates();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              statusBar.x = posX;
            if(posY)
              statusBar.y = posY;
          }
        }
        statusBar.addVisButtton();
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_PlayerStates();
          if(parameters.Visible)
            this.addChild(statusBar);
        } else
          this.addChild(statusBar);
        this._moveElements.push(['statusBar',statusBar]);

        var h = this.itemsBar.maxHeight();
        var itemsBarC = new UIObject_Container(Graphics.width - this.itemsBar.width, (Graphics.height / 2) - h / 2, this.itemsBar.width, h);
        itemsBarC.addUI(this.itemsBar);
        itemsBarC.setText('Items', true);
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_ItemList();
          if(parameters.Position) {
            var posX = parameters.Position.X;
            var posY = parameters.Position.Y;
            if(posX)
              itemsBarC.x = posX;
            if(posY)
              itemsBarC.y = posY;
          }
        }
        itemsBarC.addVisButtton();
        if(AlphaABS.Parameters.isLoaded()) {
          parameters = AlphaABS.Parameters.get_UIE_ItemList();
          if(parameters.Visible)
            this.addChild(itemsBarC);
        } else
          this.addChild(itemsBarC);
        this.itemsBar.refresh();
        this._moveElements.push(['itemsBar', itemsBarC]);
      }

      _createItemsBar() {
        this.itemsBar = new AlphaABS.LIBS.NotifyMachine(0,0,120,24,5);
      }

      _createSkillPanel() {
        this.spriteSkillPanel = new AlphaABS.LIBS.Sprite_SkillPanelABS();
        this._refreshSkillPanelVisibility();
      }

      _createControlPanel() {
        this.spriteControlPanel = new AlphaABS.LIBS.UIObject_ControlPanel();
        this.spriteControlPanel.createBaseItems();
        if(AlphaABS.Parameters.isLoaded()) {
          var parameters = AlphaABS.Parameters.get_UIE_PlayerHotBar();
          if(parameters.Orientation && parameters.Orientation == 'Horizontal') {
            this.spriteControlPanel.transfer();
          }
        }
      }

      _checkLayerTouch(layer) {
        var rect = new Rectangle(layer.x, layer.y, layer.width, layer.height);
        return AlphaABS.UTILS.SMath.inRect(new PointX(TouchInput.x, TouchInput.y), rect);
      }

      _createTargetUI() {
        this.spriteTarget = new AlphaABS.LIBS.Sprite_EnemyUI();

        this.spriteTargetStatuses = new AlphaABS.LIBS.Sprite_EnemyStatusBar(this.spriteTarget.width, 24);
        this.spriteTargetStatuses.y = this.spriteTarget.height + 2;
        this.spriteTargetStatuses.setLimit(6);

        this.popUpMachineTarget = new ABSObject_PopUpMachine(0, 0, this.spriteTarget.width - 60, 1, this.spriteTarget);
        this.popUpMachineTarget2 = new ABSObject_PopUpMachine(0, -20, this.spriteTarget.width - 60, 1, this.spriteTarget);
        this.popUpMachineTarget.setEffectSettings(ABSObject_PopUpMachine.SETTINGS);
      }

      _createUserUI() {
        var userUiBackground = null;
        if(AlphaABS.Parameters.isLoaded()) {
          var parameters = AlphaABS.Parameters.get_UIE_PlayerStatus();
          userUiBackground = parameters.Background;
        }

        this.spriteUserUI = new AlphaABS.LIBS.Sprite_UserUI(userUiBackground);
        this.popUpMachineUser = new ABSObject_PopUpMachine(6, 12, this.spriteUserUI.faceSize, 1, this.spriteUserUI);
        this.popUpMachineUser2 = new ABSObject_PopUpMachine(6, 12, 200, 1, this.spriteUserUI);
        this.popUpMachineUser.setEffectSettings(ABSObject_PopUpMachine.SETTINGS);

        this.spriteAttackBar = new AlphaABS.LIBS.UIObject_BarAttackReload(140,40);
        this.spriteCastBar = new AlphaABS.LIBS.UIObject_BarUserCast(150,36);
      }

      _createUserStatusBar() {
        this.userStatusPanel = new AlphaABS.LIBS.UIObject_UserStatusBar(4);
      }

      _createAlertBar() {
        this.spriteAlertLayer = new Sprite();
        this.spriteAlertLayer.setFrame(0,0,Graphics.width/2,60);
        this.popUpMachine = new ABSObject_PopUpMachine(0, 0, this.spriteAlertLayer.width, 3, this.spriteAlertLayer);
        this.popUpMachine.setEffectSettings([1.0, false, 0]);
        this.popUpMachine.setUpMode();
      }

      _createFavWeapCircle() {
        this._sCircle = new AlphaABS.LIBS.UI_SelectCircleFW($gamePlayer.battler(), function (index) {
          if(this.isOpen())
            $gamePlayer.touchWeaponAt(index);
        });
        this.addChild(this._sCircle);
        this.weapCircleRefresh();
      }

      _updatePosition() {
        var screen = $gameScreen;
          var scale = screen.zoomScale();
          this.scale.x = scale;
          this.scale.y = scale;
          this.x = Math.round(-screen.zoomX() * (scale - 1));
          this.y = Math.round(-screen.zoomY() * (scale - 1));
          this.x += Math.round(screen.shake());

          if(this._isABS) {
            if(this.spriteAttackBar.visible) {
              this.spriteCastBar.y = this.spriteAttackBar.y + this.spriteAttackBar.height;
            } else {
              this.spriteCastBar.y = this.spriteAttackBar.y - 2;
            }
        }
      }
    }
    //END Spriteset_InterfaceABS
  //------------------------------------------------------------------------------

  AlphaABS.register(Spriteset_InterfaceABS);

})();
