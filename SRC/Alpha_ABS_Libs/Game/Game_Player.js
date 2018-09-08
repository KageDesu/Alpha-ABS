(function () {

  var LOG = new PLATFORM.DevLog("Game_Player");
  var BattleManagerABS = AlphaABS.LIBS.BattleManagerABS;
  var ABSUtils = AlphaABS.UTILS;
  var SMouse = AlphaABS.UTILS.SMouse;
  var Consts = AlphaABS.SYSTEM;
  var PointX = AlphaABS.UTILS.PointX;
  var BattleProcessABS = BattleManagerABS.battleProcess();
  var BattleUI = AlphaABS.BattleUI;

  //Game_Player
  //------------------------------------------------------------------------------
  var _Game_Player_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function () {
    _Game_Player_initMembers.call(this);

    this._absParams.battler = null;
    this._absParams.active = true; //Со мной можно взаимодействовать (я под управлением)
    this._absParams.inBattle = false;
    this._absParams.control = true; //Отвечат на управление
    this._absParams.dead = false;

    this._teamId = 0;

    this._absParams.inputMode = 0; //0 - ControllPanel, 1 - Weapons

    this._absParams.state = 'free'; //Состояние
    this._absParams.target = null; //Моя цель
    this._absParams.autoAttackMode = false; //Режим автоматической атаки
    this._absParams.targetFollowMode = false; //Следовать к цели

    this._absParams.currentAction = null;
    this._absParams.expPopup = null;
    this._absParams.motion = null;

    this._absParams.isWeapRecharge = false;
    this._absParams.casting = false;
    this._absParams.castingSkill = null;

    this._absParams.inBattleTimer = null;
    this._absParams.absMapData = []; //TODO: Создать что-то отдельное
  };

  Game_Player.prototype.teamId = function () {
    return this._teamId;
  };

  Game_Player.prototype.isCasting = function () {
    return this._absParams.casting == true; //TODO: Ugly! У нас есть текущее действие и его свойство isCasting, см. AI_Bot
  };

  Game_Player.prototype.isAlly = function (who) {
    if (who)
      return (this.teamId() == who.teamId());
    return false;
  };


  //OVER
  Game_Player.prototype.executeMove = function (direction) {
    if (!this.inActive()) return;

    this.stopFollowMode();
    this.interruptCast();
    if (this._absParams.state != 'targetCircle') {
      this.moveStraight(direction);
    }
  };

  //NEW
  Game_Player.prototype.changeInputMode = function (mode) {
    if (mode == 0) {
      if (BattleUI.isWeaponCircleOpen()) {
        BattleUI.closeWeaponCircle();
        this._absParams.inputMode = mode;
        BattleUI.selectOnControlPanel(4);
      }
    } else {
      if (!BattleUI.isWeaponCircleOpen()) {
        BattleUI.openWeaponCircle();
        this._absParams.inputMode = mode;
        BattleUI.diselectOnControlPanel(4);
      }
    }
  };

  //NEW
  Game_Player.prototype.onGameLoad = function () {
    LOG.p("PL : On Game Load");
    this.battler().onGameLoad();
  };

  //NEW
  Game_Player.prototype._resetTarget = function () {
    this.stopFollowMode();
    this.interruptCast();
    this._absParams.autoAttackMode = false;
    BattleUI.disableOnControlPanel(0);
    BattleUI.disableOnControlPanel(1);
    BattleUI.changeRotateIconToMouse();
    this._changeState('free');
  };

  //NEW
  Game_Player.prototype.target = function () {
    return this._absParams.target;
  };

  //NEW
  Game_Player.prototype.stopFollowMode = function () {
    if (this._absParams.targetFollowMode)
      BattleUI.diselectOnControlPanel(1);
    this._absParams.targetFollowMode = false;
  };

  //NEW
  Game_Player.prototype.battler = function () {
    return this._absParams.battler;
  };

  //NEW
  Game_Player.prototype.initABS = function () {
    LOG.p("Player inited");
    this._absParams.battler = $gameParty.leader();
    if (!Imported.Quasi_Movement)
      this._absParams.useAStar = true;
    this.followers().forEach(function (f) {
      f.initABS();
    }, this);
  };

  //NEW
  Game_Player.prototype.stopABS = function () {
    this._resetTarget();
    this.controlOn();
    this._absParams.inBattle = false;
    this._absParams.battler.stopABS();
    this._absParams.active = true;
    this._absParams.dead = false;
    this._absParams.useAStar = false;
    $gameParty.stopABS();
  };

  //NEW
  Game_Player.prototype.prepareABS = function () {
    this.battler().clearInfoPops();
    this.battler().clearActions();
    this.clearExpPopup();
    this._resetTarget();
    this.battler().refreshABSSkills();
    this.changeInputMode(0);
  };

  //NEW
  Game_Player.prototype.clearExpPopup = function () {
    this._absParams.expPopup = null;
  };

  //NEW
  Game_Player.prototype.isExpPopupRequested = function () {
    return (this._absParams.expPopup != null);
  };

  //NEW
  Game_Player.prototype.isMotionRequested = function () {
    return (this._absParams.motion != null);
  };

  //NEW
  Game_Player.prototype.requestMotion = function (motion) {
    this._absParams.motion = motion;
  };

  //NEW
  Game_Player.prototype.motionType = function () {
    return this._absParams.motion;
  };

  //NEW
  Game_Player.prototype.clearMotion = function () {
    this._absParams.motion = null;
  };

  //NEW
  Game_Player.prototype.requestExpPopup = function (value) {
    this._absParams.expPopup = value;
  };

  //NEW
  Game_Player.prototype.getExpPopup = function () {
    return this._absParams.expPopup;
  };

  //NEW
  Game_Player.prototype.inBattle = function () {
    return this._absParams.inBattle;
  };

  //NEW
  Game_Player.prototype.canControl = function () {
    return this.inActive() && this.battler().canMove() && this._absParams.control;
  };

  //NEW
  Game_Player.prototype.refreshBattleState = function () {
    if (!this.inBattle()) {
      this.onBattleStart();
      $gameParty.membersABS().forEach(function (member) {
        if (!member.inBattle()) {
          member.changeStateToSearch($gamePlayer);
        }
      });
    }
  };

  //NEW
  Game_Player.prototype.onBattleStart = function () {
    LOG.p("PL : Battle start");
    //BattleManagerABS.alertOnUI(Consts.STRING_ALERT_INBATTLE);
    this._absParams.inBattle = true;
    this._absParams.inBattleTimer = new Game_TimerABS();
    this._absParams.inBattleTimer.start(120);
  };

  //NEW
  Game_Player.prototype.onBattleEnd = function () {
    LOG.p("PL : Battle end");
    //BattleManagerABS.alertOnUI(Consts.STRING_ALERT_OUTBATTLE);
    this._absParams.inBattle = false;
    this._absParams.inBattleTimer = null;
  };

  //NEW
  Game_Player.prototype.inActive = function () {
    return this._absParams.active;
  };

  //NEW
  Game_Player.prototype.controlOff = function () {
    $gameTemp.clearDestination();
    this._absParams.control = false;
    LOG.p("Control OFF");
  };

  //NEW
  Game_Player.prototype.controlOn = function () {
    this._absParams.control = true;
    LOG.p("Control ON");
  };

  //NEW
  Game_Player.prototype.onTurnEnd = function () {
    this.battler().onTurnEnd();
  };

  //NEW
  Game_Player.prototype.touchSkillAt = function (index) {
    if (!this.canControl()) return;
    var skillABS = this.battler().skillByKeyIndex(index);
    if (skillABS) {
      if (this._absParams.currentAction != skillABS) {
        BattleUI.touchOnSkillPanel(index);
        this._onNewSkillActivate();
        this._absParams.currentAction = skillABS;
        this._changeState('prepare');
      }
    }
  };

  //NEW
  Game_Player.prototype.touchControlAt = function (index) {
    if (!this.canControl()) return;
    if (index > 4) {
      return;
    }

    switch (index) {
      case 0:
        if (this._absParams.autoAttackMode) {
          this.turnTowardCharacter(this.target());
        } else {
          if (this._turnAutoAttack()) {
            BattleUI.touchOnControlPanel(index);
            BattleUI.selectOnControlPanel(index);
          } else {
            BattleUI.diselectOnControlPanel(index);
            if (this.target() == null)
              BattleUI.disableOnControlPanel(index);
          }
        }
        break;
      case 1: //Follow Mode
        var followAllowed = AlphaABS.Parameters.isFollowAllowed();
        if (this.target() && followAllowed == true) {
          if (!this._absParams.autoAttackMode)
            this._onNewSkillActivate();
          this._absParams.targetFollowMode = !this._absParams.targetFollowMode;
          if (this._absParams.targetFollowMode) {
            BattleUI.selectOnControlPanel(index);
          } else {
            BattleUI.diselectOnControlPanel(index);
          }
          BattleUI.touchOnControlPanel(index);
        }
        break;
      case 2:
        var jumpAllowed = AlphaABS.Parameters.isJumpAllowed();
        if (jumpAllowed == true) {
          if (this.canMove()) {
            if (Imported.YEP_SmartJump == true) {
              if (this._absParams.state == 'free' && !this.isJumping())
                $gamePlayer.smartJump(1);
            } else {
              if (this._absParams.state == 'free' && !this.isJumping() && this.canPass(this.x, this.y, this.direction())) {
                switch (ABSUtils.getDirKey(this)) {
                  case 'u':
                    this.jump(0, -1);
                    break;
                  case 'd':
                    this.jump(0, 1);
                    break;
                  case 'l':
                    this.jump(-1, 0);
                    break;
                  case 'r':
                    this.jump(1, 0);
                    break;
                }
              }
            }
            BattleUI.touchOnControlPanel(index);
          }
        }
        break;
      case 3:
        var rotateAllowed = AlphaABS.Parameters.isRotateAllowed();
        if (rotateAllowed == true) {
          if (this.canMove()) {
            if (this._absParams.state == 'free' && !this._absParams.targetFollowMode) {
              if (this.target()) {
                this.turnTowardCharacter(this.target());
              } else {
                if (!Utils.isMobileDevice())
                  this.turnTowardCharacter(SMouse.getMousePosition().convertToMap());
              }
            }
            BattleUI.touchOnControlPanel(index);
          }
        }
        break;
      case 4:
        var weapAllowed = AlphaABS.Parameters.isWeaponsAllowed();
        if (weapAllowed == true) {
          if (this.canMove()) {
            if (!this.battler().isFavWeapExists()) return;
            BattleUI.touchOnControlPanel(index);
            if (this._absParams.inputMode == 0) {
              this.changeInputMode(1);
            } else {
              this.changeInputMode(0);
            }
          }
        }
        break;
    }
  };

  //NEW
  Game_Player.prototype.touchWeaponAt = function (index) {
    if (this._absParams.inputMode == 0) return;
    BattleUI.touchOnWeaponCircle(index);
    if (this.battler().changeFavWeap(index)) {
      SoundManager.playEquip();
      this.changeInputMode(0);
    } else
      SoundManager.playBuzzer();

    BattleUI.refreshWeaponCircle();
  };

  //NEW
  Game_Player.prototype.onActionOnMe = function (who) {
    if (who && who.target() == this) {
      this.refreshBattleState();
      if (!this.target()) {
        BattleManagerABS.setPlayerTarget(who);
      }
    }
  };

  var _Game_Player_update = Game_Player.prototype.update;
  Game_Player.prototype.update = function (sceneActive) {
    _Game_Player_update.call(this, sceneActive);
    this._updateABS(sceneActive);
  };

  //NEW
  Game_Player.prototype.interruptCast = function () {
    var t = this._absParams.currentAction;
    if (t && t.isCasting()) {
      LOG.p("PL : Cast intterupt");
      BattleManagerABS.alertOnUI(Consts.STRING_ALERT_INTERRUPT);
      t.resetCast();
      this._absParams.casting = false;
      this._absParams.castingError = true;
      this._changeState('free');
    }
  };

  Game_Player.prototype.setFavWeapForce = function (itemId, segmentSymbol) {
    var index = 0;
    segmentSymbol = SDK.check(segmentSymbol, 'top');
    switch (segmentSymbol) {
      case 'left':
        index = 3;
        break;
      case 'top':
        index = 0;
        break;
      case 'bottom':
        index = 2;
        break;
      case 'right':
        index = 1;
        break;
    }
    var item = $dataWeapons[itemId];
    var owner = this.battler();
    if (owner == null) {
      owner = $gameParty.leader();
    }
    owner.setFavWeap(item, index);
    BattleUI.refreshWeaponCircle();
  };
  //RPIVATE

  Game_Player.prototype._deactivate = function () {
    BattleManagerABS.setPlayerTarget(null);
    $gameMap.stopPlayerTargetCircle();
    this._stopTargetSelect();
    this._absParams.active = false;
    if (!this.battler().isAlive()) {
      this._dead();
    }
  };

  Game_Player.prototype._dead = function () {
    AudioManager.playMe($gameSystem.defeatMe());
    this._absParams.dead = true;
    this._absParams.deadTimer = new Game_TimerABS();
    this._absParams.deadTimer.start(90);
    //$gameScreen.startFadeOut(60);
    this.requestMotion('sleep');
  };

  //NEW
  Game_Player.prototype.setTarget = function (target) {
    this._absParams.target = target;
    if (!target || target.isAlly(this)) {
      this._resetTarget();
    } else {
      BattleUI.changeRotateIconToTarget();
      BattleUI.enableOnControlPanel(0);
      BattleUI.enableOnControlPanel(1);
    }
  };

  Game_Player.prototype._resetTarget = function () {
    this.stopFollowMode();
    this.interruptCast();
    this._absParams.target = null;
    this._absParams.autoAttackMode = false;
    BattleUI.disableOnControlPanel(0);
    BattleUI.disableOnControlPanel(1);
    BattleUI.changeRotateIconToMouse();
    this._changeState('free');
  };

  Game_Player.prototype._changeState = function (newState) {
    this._absParams.state = newState;

    switch (newState) {
      case 'free':
        this._stopTargetSelect();
        this._absParams.currentAction = null;
        break;
      case 'cast':
        if ((this._absParams.currentAction.isRadiusType() &&
            this._absParams.currentAction.isNeedTarget()) || this._absParams.currentAction.isVectorTypeR())
          $gameMap.lockPlayerTargetCircle();
        $gameTemp.clearDestination();
        this.stopFollowMode();
        break;
      case 'targetCircle':
        $gameTemp.clearDestination();
        $gameMap.requestPlayerTargetCircle(this._absParams.currentAction);
        this.stopFollowMode();
        break;
    }
  };

  Game_Player.prototype._performAction = function () {
    this.battler().makeActions();
    if (this._absParams.currentAction.isItem()) {
      this.battler().action(0).setItem(this._absParams.currentAction.skillId);
    } else
      this.battler().action(0).setSkill(this._absParams.currentAction.skillId);

    LOG.p("PL : Perform! " + this._absParams.currentAction.name());
    var selfAction = false;
    if (this._absParams.currentAction.isVectorType()) {
      if (this._absParams.currentAction.isVectorTypeR())
        BattleProcessABS.startPostBattleAction(this, new PointX(TouchInput.x, TouchInput.y).convertToMap(), this.battler().action(0), this._absParams.currentAction);
      else
        BattleProcessABS.startPostBattleAction(this, this.target(), this.battler().action(0), this._absParams.currentAction);
    } else {
      if (this._absParams.currentAction.isRadiusType()) {
        if (this._absParams.currentAction.isNeedTarget()) {
          BattleProcessABS.performBattleActionRadius(this, new PointX(TouchInput.x, TouchInput.y).convertToMap(), this.battler().action(0), this._absParams.currentAction);
        } else
          BattleProcessABS.performBattleActionRadius(this, this.toPoint(), this.battler().action(0), this._absParams.currentAction);
      } else {
        if (this._absParams.currentAction.isZoneType()) {
          BattleProcessABS.performBattleActionZone(this, this.battler().action(0));
        } else {
          if (this._absParams.currentAction.isNeedTarget())
            BattleProcessABS.performBattleAction(this, this.target());
          else {
            this.battler().performCurrentAction();
            this.battler().action(0)._forcing = true;
            BattleProcessABS.performBattleAction(this, this); //On self
            selfAction = true;
          }
        }
      }
    }

    if (!selfAction) {
      this.battler().performCurrentAction();
    }

    this._absParams.currentAction.playStartSound(null);

    if (this._absParams.currentAction == this.battler().skillABS_attack()) {
      this.battler().performAttack();
    }

    if (!this.inBattle() && this.target() != this && selfAction == false) {
      this.onBattleStart();
    }
    if (this._absParams.autoAttackModeLast) {
      if (this._turnAutoAttack()) {
        this._absParams.autoAttackModeLast = false;
      }
    }
    this.refreshBattleState();
    this._changeState('free');
  };

  Game_Player.prototype._onNewSkillActivate = function () {
    if (this._absParams.autoAttackMode == true) {
      this._absParams.autoAttackModeLast = true;
      this._absParams.autoAttackMode = false;
    }
    this._stopTargetSelect();
    this.interruptCast();
  };

  Game_Player.prototype._updateABS = function (sceneActive) {
    if (!sceneActive) return;
    if (!this.battler()) return;

    if (this._absParams.dead === true && this._absParams.deadTimer != null) {
      this._absParams.deadTimer.update();
      if (this._absParams.deadTimer.isReady()) {
        this._processOnPlayerDead();
      }
    }

    if (!this.inActive()) return;

    if (!this.battler().isAlive() && this.inActive()) {
      this._deactivate();
    }

    if (!this.battler().canMove() && this._absParams.control) {
      this.controlOff();
      this._resetTarget();
      LOG.p("PL: Battle cannot move");
    }

    if (this.battler().canMove() && !this._absParams.control && !BattleUI.isUIFree()) {
      this.controlOn();
      LOG.p("PL: Battle can move alredy");
    }

    if (this._absParams.inBattleTimer) {
      this._absParams.inBattleTimer.update();
      if (this._absParams.inBattleTimer.isReady()) {
        if (this._checkInBattleStatus()) {
          this._absParams.inBattleTimer.reset();
        } else {
          this.onBattleEnd();
        }
      }
    }

    this.battler().updateABS();
    this._update_attackReload();
    if (!this.inActive()) return;
    if (!this.canControl()) return;

    this._update_input();
    if (this._absParams.autoAttackMode) {
      this._update_on_autoAttackMode();
    } else {
      switch (this._absParams.state) {
        case 'free':
          //this._checkInBattleStatus(); //@opt Можно выделить в процесс
          break;
        case 'prepare':
          this._update_on_prepare();
          break;
        case 'action':
          this._update_on_action();
          break;
        case 'cast':
          this._update_on_cast();
          break;
        case 'targetCircle':
          this._update_on_targetCircle();
          break;
      }
    }

    if (this._absParams.targetFollowMode == true) {
      if (!this.isMoving()) {
        this.moveToPoint(this.target());
      }
    }

    this._moveSpeed = 4 + this.battler().ABSParams().moveSpeedUpKoef;
  };

  Game_Player.prototype._processOnPlayerDead = function () {
    try {
        var deadEventId = AlphaABS.Parameters.get_DeadMapCommonEventId();
        if(deadEventId > 0) {
          if($dataCommonEvents[deadEventId]) {
            this.startCommonEventABS(deadEventId);
          }
        }
        var deadMapId = AlphaABS.Parameters.get_DeadMapId();
        if (deadMapId > 0) {
          this._processOnPlayerDeadMap(deadMapId);
        } else {
          SceneManager.goto(Scene_Gameover);
        }
    } catch (e) {
      console.error(e);
      SceneManager.goto(Scene_Gameover);
    }
  };

  Game_Player.prototype._processOnPlayerDeadMap = function (deadMapId) {
    var position = AlphaABS.Parameters.get_DeadMapPosition();
    var direction = AlphaABS.Parameters.get_DeadMapDirection();
    $gameTemp.transferedByDeathABS = true;
    this.reserveTransfer(AlphaABS.Parameters.get_DeadMapId(), position.X, position.Y, direction, 0);
    this.battler().gainHp(1);
    this._absParams.deadTimer = null;
    setTimeout(function() {
      try {
        $gamePlayer.requestMotion('none');
      } catch (error) {
        
      }
    }, 1000);
  };

  Game_Player.prototype._update_on_autoAttackMode = function () {
    var t = this.battler();
    var skill = t.skillABS_attack();
    this._absParams.currentAction = skill;
    if (ABSUtils.distanceTo(this, this.target()) <= 1) {
      this.turnTowardCharacter(this.target());
    }
    if (this.battler().canUse(skill.skill())) {
      if (BattleManagerABS.canUseSkillByTimer(skill)) {
        if (BattleManagerABS.canUseSkillByRange(this, this.target(), skill)) {
          this.turnTowardCharacter(this.target());
          if (BattleManagerABS.canUseSkillByAmmo(skill)) {
            if (skill.isVectorType()) {
              if (!this.isMoving()) {
                this.turnTowardCharacter(this.target());
                BattleProcessABS.startPostBattleAction(this, this.target(), this.battler().action(0), skill);
              } else {
                return;
              }
            } else
              BattleProcessABS.performBattleAction(this, this.target());

            t.performCurrentAction();
            skill.playStartSound(null);
            t.performAttack();
            this.refreshBattleState();
          } else {
            LOG.p("PL : Skill need ammo!");
            BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NOCHARGES);
          }
        }
      }
    } else {
      LOG.p("PL : Can't use auto attack");
      BattleManagerABS.alertOnUI(Consts.STRING_ALERT_NOAUTOA);
      this._absParams.autoAttackMode = false;
    }
  };

  Game_Player.prototype._update_input = function () {
    if (Input.isTriggered(AlphaABS.LIBS.IKey.WC())) {
      if ($gameMap.isABS()) {
        this.touchControlAt(4);
      }
      return;
    }

    if (this._absParams.inputMode == 0) {
      if (Input.isTriggered(AlphaABS.LIBS.IKey.CP_W())) {
        this.touchControlAt(1);
        return;
      }

      var isSp = AlphaABS.LIBS.IKey.isTriggeredSkillPanelIndex();
      if (isSp != null) {
        this.touchSkillAt(isSp);
      }

      if (Input.isTriggered(AlphaABS.LIBS.IKey.CP_A())) {
        this.touchControlAt(0);
        return;
      }

      if (Input.isTriggered(AlphaABS.LIBS.IKey.CP_D())) {
        this.touchControlAt(3);
        return;
      }

      if (Input.isTriggered(AlphaABS.LIBS.IKey.CP_S())) {
        this.touchControlAt(2);
        return;
      }

      if (Input.isTriggered(AlphaABS.LIBS.IKey.TS())) {
        var t = BattleManagerABS.nextPlayerTarget();
        if (t) BattleManagerABS.setPlayerTarget(t);
      }

    } else {
      var index = AlphaABS.LIBS.IKey.isTriggeredWeapCircleIndex();
      if (index != null) {
        this.touchWeaponAt(index);
        return;
      }
    }

  };

  Game_Player.prototype._update_on_targetCircle = function () {
    var t = this._absParams.currentAction;
    if (t) {
      if (this.battler().canUse(t.skill())) {
        if (TouchInput.isTriggered()) {
          var p = SMouse.getMousePosition().convertToMap();
          var d = ABSUtils.distanceTo(this, p);
          var lineOfSight = true;
          if (!t.isIgnoreObstacles())
            lineOfSight = BattleManagerABS.checkLineOfSight(this.toPoint(), p);
          if (d <= t.range && lineOfSight) {
            if (BattleManagerABS.canUseSkillByAmmo(t)) {
              this._changeState('action');
              return;
            } else {
              BattleManagerABS.alertOnUIbySym('noAmmo');
            }
          } else {
            LOG.p("PL : Can't use, too far!");
            BattleManagerABS.alertOnUIbySym('toFar');
            return;
          }
        }
        return;
      } else {
        LOG.p("PL : Can't use, not resources or restricted!");
        BattleManagerABS.alertOnUIbySym('noUse');
      }
    } else {
      LOG.p("PL : Can't use, NULL");
    }

    this._changeState('free');
  };

  Game_Player.prototype._update_on_prepare = function () {
    var t = this._absParams.currentAction;
    if (t) {
      LOG.p("PL : Prepare action " + t.skill().name);
      if (t.cEonStart != 0) {
        LOG.p("PL : Common Event " + t.cEonStart);
        this.startCommonEventABS(t.cEonStart);
      }
      if (this.battler().canUse(t.skill())) {
        if (BattleManagerABS.canUseSkillByAmmo(t)) {
          if (t.isRadiusType()) {
            LOG.p("PL : Radius type ");
            if (BattleManagerABS.canUseSkillByTimer(t)) {
              if (t.isNeedTarget()) {
                this._changeState('targetCircle');
                return;
              } else
                this._changeState('action');
              return;
            } else {
              LOG.p("PL : Can't use, recharge now");
              BattleManagerABS.alertOnUIbySym('recharge');
            }
          } else {
            if (t.isVectorTypeR()) {
              if (BattleManagerABS.canUseSkillByTimer(t)) {
                this._changeState('targetCircle');
                return;
              } else {
                LOG.p("PL : Can't use, recharge now");
                BattleManagerABS.alertOnUIbySym('recharge');
              }
            } else {
              this._prepareNormal();
              return;
            }
          }
        } else {
          BattleManagerABS.alertOnUIbySym('noAmmo');
        }
      } else {
        LOG.p("PL : Can't use, not resources or restricted!");
        BattleManagerABS.alertOnUIbySym('noUse');
      }
    } else {
      LOG.p("PL : Can't use, NULL");
    }

    this._changeState('free');
  };

  Game_Player.prototype._prepareNormal = function () {
    var t = this._absParams.currentAction;
    if (BattleManagerABS.canUseSkillByTimer(t)) {
      if (t.isNeedTarget()) {
        if (this.target()) {
          if (BattleManagerABS.canUseSkillByRange(this, this.target(), t)) {
            this._changeState('action');
            return;
          } else {
            LOG.p("PL : Can't use, target too far");
            BattleManagerABS.alertOnUIbySym('toFar');

          }
        } else {
          LOG.p("PL : Can't use, need target");
          BattleManagerABS.alertOnUIbySym('noTarget');
        }
      } else {
        this._changeState('action');
        return;
      }
    } else {
      LOG.p("PL : Can't use, recharge now");
      BattleManagerABS.alertOnUIbySym('recharge');
    }
    this._changeState('free');
  };

  Game_Player.prototype._update_on_action = function () {
    var t = this._absParams.currentAction;
    if (t) {
      if (t.isNeedCast()) {
        if (t.isCasting()) {
          if (t.isReady()) {
            this._performAction();
            this._absParams.casting = false;
          }
        } else {
          if (!this.isMoving()) {
            LOG.p("PL : Start cast!");
            this._absParams.casting = true;
            this._absParams.castingError = false;
            this.executeMove(0);
            t.startCast(this.battler());
            this._absParams.castingSkill = t;
            this._changeState('cast');
          } else {
            LOG.p("PL : Can't start cast, i'am moving!");
            BattleManagerABS.alertOnUI(Consts.STRING_ALERT_CASTMOVE);
            this._changeState('free');
          }
        }
      } else {
        this._performAction();
      }
    } else {
      this._changeState('free');
    }
  };

  Game_Player.prototype._update_on_cast = function () {
    var t = this._absParams.currentAction;
    if (this.target())
      this.turnTowardCharacter(this.target());
    else {
      if (t) {
        if (!t.isZoneType()) {
          this.turnTowardCharacter(new PointX(TouchInput.x, TouchInput.y).convertToMap());
        }
      }
    }
    if (t && t.isCasting()) {
      if (t.isRadiusType()) {
        if (this.battler().canUse(t.skill())) {
          if (t.isReady()) {
            LOG.p("PL : Cast END");
            this._changeState('action');
          }
        } else {
          this.interruptCast();
          LOG.p("PL : Can't cast, not resources or restricted!");
          BattleManagerABS.alertOnUIbySym('noUse');
        }
      } else {
        if (t.isNeedTarget() && !BattleManagerABS.canUseSkillByRange(this, this.target(), t)) {
          this.interruptCast();
          LOG.p("PL : Target too far");
          BattleManagerABS.alertOnUIbySym('toFar');
        } else {
          if (this.battler().canUse(t.skill())) {
            if (t.isReady()) {
              LOG.p("PL : Cast END");
              this._changeState('action');
            }
          } else {
            this.interruptCast();
            LOG.p("PL : Can't cast, not resources or restricted!");
            BattleManagerABS.alertOnUIbySym('noUse');
          }
        }
      }
    } else {
      this._absParams.casting = false;
      this._changeState('free');
    }
  };

  Game_Player.prototype._checkInBattleStatus = function () {
    var t = BattleManagerABS.whoTargetOnMe(this, $gameTroop.membersABS());
    if (t) { //Если игрок чья-то цель (врага)
      return true;
    }
    if (BattleProcessABS.isPostProcessExists()) {
      return true; //Если есть действия PostProcess
    }
    return false;
  };

  Game_Player.prototype._turnAutoAttack = function () {
    if (this.target()) {
      this._onNewSkillActivate();
      this.turnTowardCharacter(this.target());
      this._absParams.currentAction = this.battler().skillABS_attack();
      this._absParams.autoAttackMode = true;
      var t = this.battler();
      t.makeActions();
      t.action(0).setAttack();
      return true;
    }
    return false;
  };

  Game_Player.prototype._update_attackReload = function () {
    var t = this.battler().skillABS_attack();
    this._absParams.isWeapRecharge = !t.isReady();
  };

  Game_Player.prototype._stopTargetSelect = function () {
    $gameMap.stopPlayerTargetCircle();
  };

  //OVER
  Game_Player.prototype.jump = function (xPlus, yPlus) {
    Game_Character.prototype.jump.call(this, xPlus, yPlus);
  };

  //?[NEW]
  Game_Player.prototype.startCommonEventABS = function (commonEventId) {
    if ((typeof commonEventId !== "undefined" && commonEventId !== null) > 0) {
      if ($dataCommonEvents[commonEventId] != null) {
        $gameTemp.reserveCommonEvent(commonEventId);
      }
    }
  };

  //END Game_Player
  //------------------------------------------------------------------------------

})();