(function () {
    var ABSUtils = AlphaABS.UTILS;
    //Sprite_Ext2
    //------------------------------------------------------------------------------
    function Sprite_Ext2() {
        this.initialize.apply(this, arguments);
    }

    Sprite_Ext2.prototype = Object.create(AlphaABS.LIBS.Sprite_Ext.prototype);
    Sprite_Ext2.prototype.constructor = Sprite_Ext2;

    Sprite_Ext2.prototype.initialize = function (frames) {
        AlphaABS.LIBS.Sprite_Ext.prototype.initialize.call(this);

        this._mouseIn = false;
        this._ready = false;
        this._readyHandler = null;
        this._outHandler = null;
        this._readyCalled = false;
        this._frames = frames;
        this.timerA = new Game_TimerABS();
        this.thread = setInterval(function () {
            this._checkMouseIn();
        }.bind(this), (16.666));
    };

    Sprite_Ext2.prototype.setReadyHandler = function (func) {
        this._readyHandler = func;
    };

    Sprite_Ext2.prototype.setOutHandler = function (func) {
        this._outHandler = func;
    };

    Sprite_Ext2.prototype.update = function () {
        AlphaABS.LIBS.Sprite_Ext.prototype.update.call(this);
        if (this._mouseIn) {
            this.timerA.update();
            if (this.timerA.isReady()) {
                this._ready = true;
                this._onReady();
            }
        }
    };

    Sprite_Ext2.prototype.isReady = function () {
        return (this._ready == true);
    };

    Sprite_Ext2.prototype.terminate = function () {
        clearInterval(this.thread);
    };


    //PRIVATE
    Sprite_Ext2.prototype._checkMouseIn = function () {
        var mp = ABSUtils.SMouse.getMousePosition();
        if (ABSUtils.SMath.inRect(mp, this._myRectangle())) {
            this._mouseInF();
        } else {
            this._mouseOutF();
        }
    };

    Sprite_Ext2.prototype._mouseOutF = function () {
        if (this._mouseIn == true) {
            //LOG.p("Mouse OUT");
            this._mouseIn = false;
            this.timerA.reset();
            if (this.isReady()) {
                this._onOut();
            }
        }
    };

    Sprite_Ext2.prototype._mouseInF = function () {
        if (this._mouseIn == false) {
            //LOG.p("Mouse IN");
            this._mouseIn = true;
            this.timerA.start(this._frames);
        }
    };

    Sprite_Ext2.prototype._onOut = function () {
        //LOG.p("on OUT");
        this.ready = false;
        if (this._outHandler) {
            this._outHandler.call();
        }
        this._readyCalled = false;
    };

    Sprite_Ext2.prototype._onReady = function () {
        if (this._readyCalled == true) return;
        if (this._readyHandler) {
            this._readyHandler.call();
        }
        this._readyCalled = true;
    };

    AlphaABS.register(Sprite_Ext2);
    //END Sprite_Ext2
    //------------------------------------------------------------------------------

})();