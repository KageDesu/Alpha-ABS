(function () {
    var _Game_Character_initMembers = Game_Character.prototype.initMembers;
    Game_Character.prototype.initMembers = function () {
        _Game_Character_initMembers.call(this);
        this._absParams = {};
        this._absParams.animationABS = 0;
        this._absParams.useAStar = false;
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
    
})();