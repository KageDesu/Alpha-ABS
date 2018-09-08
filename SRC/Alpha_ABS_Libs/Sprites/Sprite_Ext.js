/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Ext.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    var LOG = new PLATFORM.DevLog("Sprite_Ext");
    var ABSUtils = AlphaABS.UTILS;

    function Sprite_Ext() {
        this.initialize.apply(this, arguments);
    }

    Sprite_Ext.prototype = Object.create(Sprite_Base.prototype);
    Sprite_Ext.prototype.constructor = Sprite_Ext;

    Sprite_Ext.prototype.initialize = function () {
        Sprite_Base.prototype.initialize.call(this);
        this._free = false; //Can be moved

        this._lastMousePoint = null; //Prev Mouse x,y (PointX)
        this._newMousePoint = null; //New Mouse x,y (PointX)
        this._touched = false; //Mouse pressed on this Sprite
    };

    Sprite_Ext.prototype.update = function () {
        Sprite_Base.prototype.update.call(this);
        this._updateMove();
    };

    //NEW
    Sprite_Ext.prototype.free = function () {
        this._free = true;
        this.onFree();
    };

    Sprite_Ext.prototype.onFree = function () {

    };

    Sprite_Ext.prototype.onFreeze = function () {

    };

    Sprite_Ext.prototype.onStartMove = function () {

    };

    Sprite_Ext.prototype.onEndMove = function () {

    };

    Sprite_Ext.prototype.canMove = function () {
        return (this._free == true);
    };

    Sprite_Ext.prototype.freeze = function () {
        this._free = false;
        if (this._touched) {
            this._endMove();
        }
        this.onFreeze();
    };

    //PRIVATE
    Sprite_Ext.prototype._updateMove = function () {
        if (this.canMove()) {
            this._updateTouch();
            if (this._touched) {
                this._updateMovePlace();
            } else
                this._newMousePoint = null;
        }
    };

    Sprite_Ext.prototype._updateTouch = function () {
        if (TouchInput.isTriggered()) {
            if (this._touched) {
                this._endMove();
            } else {
                LOG.p("Mouse at " + new ABSUtils.PointX(TouchInput.x, TouchInput.y));
                if (ABSUtils.SMath.inRect(new ABSUtils.PointX(TouchInput.x, TouchInput.y), this._myRectangle())) {
                    this._startMove();
                }
            }
        }
    };

    Sprite_Ext.prototype._updateMovePlace = function () {
        this._lastMousePoint = this._newMousePoint;

        LOG.p("Update placement");
        var mp = ABSUtils.SMouse.getMousePosition();
        var mx = mp.x;
        var my = mp.y;

        if (mx == 0 && my == 0) {
            mx = TouchInput.x;
            my = TouchInput.y;
        }

        this._newMousePoint = new ABSUtils.PointX(mx, my);

        if (this._lastMousePoint != null) {
            var dx = mx - this._lastMousePoint.x;
            var dy = my - this._lastMousePoint.y;
            this.move(this.x + dx, this.y + dy);
        }
    };

    Sprite_Ext.prototype._myRectangle = function () {
        var x = ABSUtils.toGlobalCoord(this, 'x');
        var y = ABSUtils.toGlobalCoord(this, 'y');
        return new Rectangle(x, y, this.width, this.height);
    };

    Sprite_Ext.prototype._startMove = function () {
        LOG.p("Start moving");
        this._touched = true;
        this.onStartMove();
        if (!ABSUtils.SMouse.isTracked())
            ABSUtils.SMouse.setTrack(true);
    };

    Sprite_Ext.prototype._endMove = function () {
        LOG.p("End moving");
        this._touched = false;
        this.onEndMove();
    };

    AlphaABS.register(Sprite_Ext);
})();

// ■ END Sprite_Ext.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////