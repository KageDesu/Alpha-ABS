/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _Game_Character_initMembers = Game_Character.prototype.initMembers;
    Game_Character.prototype.initMembers = function () {
        _Game_Character_initMembers.call(this);
        this._absParams = {};
        this._absParams.animationABS = 0;
        this._absParams.useAStar = false;
        this._needShowABSHpBar = false;
    };

    //NEW
    Game_Character.prototype.ABSParams = function () {
        return this._absParams;
    };

    //NEW
    Game_Character.prototype.requestAnimationABS = function (animationId) {
        this._absParams.animationABS = animationId;
    };

    //NEW
    Game_Character.prototype.moveToPoint = function (point) {
        var dir = this.findDirectionTo(point.x, point.y);
        if (dir > 0) {
            this.moveStraight(dir);
        }
    };

    //NEW
    Game_Character.prototype.moveFromPoint = function (point) {
        var points = [];
        for (var j = 0; j < 4; j++) {
            var direction = 2 + j * 2;
            if (this.canPass(this.x, this.y, direction)) {
                var x2 = $gameMap.roundXWithDirection(this.x, direction);
                var y2 = $gameMap.roundYWithDirection(this.y, direction);
                //if(x2 != point.x && y2 != point.y)
                points.push([x2, y2]);
            }
        }

        if (points.length > 0) {
            //LOG.p("POINTS " + points.length);
            var p;
            if (points.length > 1)
                p = points.sample();
            else
                p = points[0];
            var newPoint = {
                x: p[0],
                y: p[1]
            };
            this.moveToPoint(newPoint);
        }
    };

    var _Game_Character_findDirectionTo = Game_Character.prototype.findDirectionTo;
    Game_Character.prototype.findDirectionTo = function (goalX, goalY) {
        if (this._absParams.useAStar == false) {
            return _Game_Character_findDirectionTo.call(this, goalX, goalY);
        } else {
            var t = AlphaABS.LIBS.ABSPathfinding.findPath(this, goalX, goalY);
            if (t == 0) t = _Game_Character_findDirectionTo.call(this, goalX, goalY);
            return t;
        }
    };

    //?NEW
    Game_Character.prototype.onApplyImpulseForce = function (x, y, d) {
        if ((x === 1 || x === -1 || x === 0) && (y === 1 || y === -1 || y === 0)) {
            if (this.canPass(this.x, this.y, d)) {
                var ld = this.direction();
                this.jump(x, y);
                this.setDirection(ld);
            }
        } else {
            this._onComplexImpulse(x, y, d);
        }
    };

    //?NEW
    Game_Character.prototype._onComplexImpulse = function (x, y, d) {
        var ld, safe;
        ld = this.direction();
        safe = 20;
        while (!this.canPass(this.x - 1 + x, this.y - 1 + y, d)) {
            x = AlphaABS.UTILS.decrement(x);
            y = AlphaABS.UTILS.decrement(y);
            if (x === 0 && y === 0) {
                break;
            }
            safe--;
            if (safe === 0) {
                return;
            }
        }
        this.jump(x, y);
        this.setDirection(ld);
    };

    //?[NEW]
    Game_Character.prototype.hideHpBarABS = function () {
        this._needShowABSHpBar = false;
    };

    //?[NEW]
    Game_Character.prototype.showHpBarABS = function () {
        this._needShowABSHpBar = true;
    };

    //?[NEW]
    Game_Character.prototype.isHpBarVisible = function () {
        return (this._needShowABSHpBar == true);
    };

    //?[NEW]
    Game_Character.prototype.inABSMotion = function () {
        return false;
    };

    //@[ALIAS]
    var _alias_Game_Character_updatePattern = Game_Character.prototype.updatePattern;
    Game_Character.prototype.updatePattern = function () {
        try {
            if (this.inABSMotion()) {
                var motion = this.ABSParams().absMotion;
                if (motion.inAction()) {
                    this._pattern = motion.motionPattern(this._pattern);
                    motion.onActionDone();
                } else {
                    _alias_Game_Character_updatePattern.call(this);
                    if (!this.hasStepAnime() && this._stopCount > 0) {   
                    } else
                        this._pattern = motion.motionPattern(this._pattern);
                }
            } else
                _alias_Game_Character_updatePattern.call(this);
        } catch (error) {
            AlphaABS.warning(error, ' when try play ABS motion');
            _alias_Game_Character_updatePattern.call(this);
        }
    };

    //@[ALIAS]
    var _alias_Game_Character_update = Game_Character.prototype.update;
    Game_Character.prototype.update = function () {
        _alias_Game_Character_update.call(this);
        this._updateABSMotion();
    };

    //?[NEW]
    Game_Character.prototype._updateABSMotion = function () {
        // * EMPTY
    };

    //?[NEW]
    Game_Character.prototype.findMySprite = function () {
        if (SceneManager.isCurrentSceneIsMap()) {
            try {
                var spriteset = SceneManager._scene._spriteset;
                if(spriteset != null) {
                    return spriteset.getSpriteForCharacter(this);
                }
                
            } catch (error) {
                AlphaABS.waring('Cant find sprite of battler');
            }

        }
        return null;
    };

    //?[NEW]
    Game_Character.prototype.getStartPointToVector = function () {
        var mySprite = this.findMySprite();
        if (mySprite == null) {
            return this.toPoint();
        } else {
            return mySprite.getStartPointToVector();
        }
    };

})();
// ■ END Game_Character.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////