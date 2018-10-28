(function () {
  "use strict";

  var LOG = new PLATFORM.DevLog("BattleProcessABS");
  LOG.applyLibraryColors();

  var PointX = AlphaABS.UTILS.PointX;
  var ABSUtils = AlphaABS.UTILS;

  //BattleProcessABS
  //------------------------------------------------------------------------------
  class Game_BattleProcessABS {
    constructor() {
      this._postProcesses = [];
      this._skill = null;
      this._centerPoint = null;
    }

    performBattleAction(subject, target) {
      this._processAction(subject, target, subject.battler().currentAction());
    }

    performBattleActionZone(subject, action) {
      LOG.p("Battle : Start Zone Action");
      this._processAction(subject, null, action);
    }

    performBattleActionRadius(subject, point, action, skill) {
      LOG.p("Battle : Start Radius Action");
      this._centerPoint = point;
      this._processAction(subject, null, action);
    }

    startPostBattleAction(subject, target, action, skill) {
      LOG.p("Battle : Start post Action");
      action._forcing = true; //Because subject use MP and other on action start
      var postProcess = {};
      postProcess.subject = subject;
      postProcess.target = target;
      postProcess.action = action;
      postProcess.skill = skill;
      var t = new AlphaABS.LIBS.Game_SVector(postProcess);
      this._postProcesses.push(t);
      $gameMap.addSVector(t);
      if (subject == $gamePlayer) {
        if (!$gamePlayer.inBattle())
          $gamePlayer.onBattleStart();
      }
    }

    performPostBattleAction(sVector) {
      try {
        var t = sVector.data();
        if (t.skill.isVectorTypeR()) {
          LOG.p("Battle : Start Radius Action by Vector");
          this._centerPoint = t.target;
          this._processAction(t.subject, null, t.action);
        } else {
          if(t.skill.isNoTarget()) {
            if(sVector._target != null) {
              this._processAction(t.subject, sVector._target, t.action);
            } else {
              this._centerPoint = t.target;
              this._processAction(t.subject, null, t.action);
            }
          } else {
            this._processAction(t.subject, t.target, t.action);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        this._postProcesses.delete(sVector);
      }
    }

    isPostProcessExists() {
      return (this._postProcesses.length != 0);
    }

    //PRIVATE
    _processAction(subject, target, action) {
      if (subject == null) {
        return;
      }
      if (!subject.battler()) {
        return;
      }
      if (action) {
        action.prepare(); //???
        if (action.isValid()) {
          this._start_action(subject, target, action);
          this._end_action(subject);
        }
      }
    }

    _start_action(subject, target, action) {
      //subject.requestEffect('whiten'); TODO
      try {
        this._skill = subject.battler().skillABS_byAction(action);
        action.applyGlobal();
        var targets = this._makeTargets(subject, target);
        targets.delete(null);
        this._showAnimation(subject, targets, action);
        targets.forEach(function (item) {
          if (item && item.inActive()) {
            this._invokeAction(subject, item, action);
          }
        }.bind(this));

      } catch (e) {
        console.error(e);
      }
    }

    _end_action(subject) {
      if (subject && subject.battler()) {
        subject.battler().performActionEnd(); //???
        subject.battler().onAllActionsEnd();
      }
      this._skill = null;
      this._centerPoint = null;
    }

    _invokeAction(subject, target, action) {
      if (action.numRepeats() > 1) {
        var time = 120;
        if (this._skill && this._skill.repeatDelay > 0) {
          time = this._skill.repeatDelay;
        }
        for (var i = 0; i < action.numRepeats(); i++) {
          setTimeout(function () {
            this._invokeNormalAction(subject, target, action);
          }.bind(this), time * i);
        }
      } else
        this._invokeNormalAction(subject, target, action);
    }

    _invokeNormalAction(subject, target, action) {
      //var realTarget = this.applySubstitute(target);
      try {
        action.apply(target.battler());
        var _skill = subject.battler().skillABS_byAction(action);
        if (_skill && _skill.cEonUse > 0) {
          if (target instanceof Game_AIBot) {
            target.startCommonEvent(_skill.cEonUse);
          }
        }
        if (_skill && _skill.isHasImpulse()) {
          if (target.battler().result().used)
            this._processImpulseAction(subject, target, _skill);
        }
        this._onActionResult(subject, target);
      } catch (e) {
        console.error(e);
      }
    }

    _processImpulseAction(subject, target, absSkill) {
      if (target != $gamePlayer) {
        if (target.behaviorModel().heavy)
          return;
      }
      var d = subject.direction();
      var dx = 0;
      var dy = 0;
      var dd = d;
      if (absSkill.isRandomImpulseDirecton()) {
        dx = KDCore.SDK.rand(0, 1);
        dy = KDCore.SDK.rand(0, 1);
      } else {
        if (target.x == subject.x && target.y == subject.y) { //ON SELF

          if (d == 4 || d == 6) { //X
            if (d == 4) {
              dx = -1;
            } else
              dx = 1;

          } else if (d == 2 || d == 8) { //Y
            if (d == 2) {
              dy = 1;
            } else {
              dy = -1;
            }
          }
        } else {
          if (target.x < subject.x) {
            dx = -1;
            dd = 4;
          }

          if (target.y < subject.y) {
            dy = -1;
            dd = 8;
          }

          if (target.x > subject.x) {
            dx = 1;
            dd = 6;
          }

          if (target.y > subject.y) {
            dy = 1;
            dd = 2;
          }
        }
      }
      target.onApplyImpulseForce(dx * absSkill.impulse, dy * absSkill.impulse, dd);
    }

    _makeTargets(subject, target) {
      try {
        var targets = [];
        if (this._skill.isZoneType()) {
          var zone = this._generateZone(subject, !this._skill.isIgnoreObstacles());
          var points = zone.points;
          this._centerPoint = zone.center;
          var candidates = [];
          if (subject == $gamePlayer) {
            candidates = $gameTroop.membersABS();
          } else {
            candidates = [$gamePlayer];
          }
          for (var i = 0; i < points.length; i++) {
            candidates.forEach(function (item) {
              if (ABSUtils.inPoint(item, points[i])) {
                targets.push(item);
              }
            });
          }
          return targets;
        } else
        if (this._skill.isRadiusType() || this._skill.isVectorTypeR()) {
          if (subject == $gamePlayer) {
            targets = ABSUtils.inRadius(this._centerPoint, this._skill.radius, $gameTroop.membersABS());
          } else {
            targets = ABSUtils.inRadius(this._centerPoint, this._skill.radius, [$gamePlayer]);
          }
        } else {
          targets.push(target);
        }

        return targets;
      } catch (e) {
        console.error(e);
        return [];
      }
    }

    _showAnimation(subject, targets, action) {
      try {
        if (action.isSkill() && action.item().id == subject.battler().attackSkillId()) {
          this._requestAnimation(targets, subject.battler().attackAnimationId1());
        } else {
          var animId = action.item().animationId;
          /*if(this._skill.isVectorType() && this._skill.isNoTarget()) {
            if(targets.length == 0) {
              this._requestMapAnimation(animId);
              return;
            }
          }*/
          if (this._skill.isZoneType() || this._skill.isRadiusType() || this._skill.isVectorTypeR()) {
            this._requestMapAnimation(animId);
          } else {
            this._requestAnimation(targets, animId);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    _requestAnimation(objects, animationId) {
      objects.forEach(function (item) {
        if (item)
          item.requestAnimationABS(animationId);
      });
    }

    _requestMapAnimation(animationId) {
      try {
        var sprite = new Sprite_Base();
        sprite.anchor.x = -0.5;
        sprite.anchor.y = -0.5;
        var point = this._centerPoint.mapPointOnScreen();
        sprite.x = point.x;
        sprite.y = point.y;
        LOG.p("Request Map animation on " + point);

        $gameMap.requestAnimationABS({
          sprite: sprite,
          id: animationId
        });
      } catch (e) {
        console.error(e);
      }
    }

    _onActionResult(subject, target) {
      try {
        if (target.battler().result().used) {
          this._resultOnDamage(target.battler());
          target.battler().startDamagePopup();
          subject.battler().startDamagePopup();
          target.onActionOnMe(subject);
        }
      } catch (e) {
        console.error(e);
      }
    }

    _resultOnDamage(target) {
      try {
        if (target.result().missed) {
          if (target.result().physical) {
            target.performMiss();
          } else {
            this._resultOnFailure(target);
          }

        } else if (target.result().evaded) {
          if (target.result().physical) {
            target.performEvasion();
          } else {
            target.performMagicEvasion();
          }
        } else {
          //HP
          if (target.result().hpAffected) {
            if (target.result().hpDamage > 0 && !target.result().drain) {
              target.performDamage();
            }
            if (target.result().hpDamage < 0) {
              target.performRecovery();
            }
          }
          //MP
          if (target.isAlive() && target.result().mpDamage !== 0) {
            if (target.result().mpDamage < 0) {
              target.performRecovery();
            }
          }
          //TP
          if (target.isAlive() && target.result().tpDamage !== 0) {
            if (target.result().tpDamage < 0) {
              target.performRecovery();
            }
          }
        }
        target.performActionUsed();
      } catch (e) {
        console.error(e);
      }
    }

    _resultOnFailure(target) {
      //Empty
    }

    _resultOnAffectedStatus(target) {
      try {
        var states = target.result().addedStateObjects();
        states.forEach(function (state) {
          var state_msg = target.isActor() ? state.message1 : state.message2;
        }.bind(this));
      } catch (e) {
        console.error(e);
      }
    }

    _generateZone(subject, withZoneCheck) {
      try {
        var d = ABSUtils.getDirKey(subject);
        var points = [];
        var point = subject.toPoint();

        /*
            **
        SUBJECT ***
            **
        */

        var centerPoint = null;

        switch (d) {
          case 'r':
            centerPoint = new PointX(point.x + 2, point.y);
            points.push(new PointX(point.x + 1, point.y + 1));
            points.push(new PointX(point.x + 1, point.y - 1));
            break;
          case 'l':
            centerPoint = new PointX(point.x - 2, point.y);
            points.push(new PointX(point.x - 1, point.y + 1));
            points.push(new PointX(point.x - 1, point.y - 1));
            break;
          case 'u':
            centerPoint = new PointX(point.x, point.y - 2);
            points.push(new PointX(point.x + 1, point.y - 1));
            points.push(new PointX(point.x - 1, point.y - 1));
            break;
          default: //d
            centerPoint = new PointX(point.x, point.y + 2);
            points.push(new PointX(point.x + 1, point.y + 1));
            points.push(new PointX(point.x - 1, point.y + 1));
            break;
        }

        points.push(centerPoint);
        points.push(new PointX(centerPoint.x - 1, centerPoint.y));
        points.push(new PointX(centerPoint.x + 1, centerPoint.y));
        points.push(new PointX(centerPoint.x, centerPoint.y - 1));
        points.push(new PointX(centerPoint.x, centerPoint.y + 1));

        if (withZoneCheck == true) {
          for (var i = 0; i < points.length; i++) {
            if (!AlphaABS.BattleManagerABS.checkLineOfSight(point, points[i])) {
              points.delete(points[i]);
            }
          }
        }

        /*
         *
         * CenterPoint *
         *
         */

        return {
          center: centerPoint,
          points: points
        };
      } catch (e) {
        console.error(e);
        return {
          center: AlphaABS.UTILS.PointX.Empty,
          points: []
        };
      }
    }
  }

  AlphaABS.register(Game_BattleProcessABS);
  AlphaABS.BattleManagerABS.connectProcess();

  //END BattleProcessABS
  //------------------------------------------------------------------------------



})();