(function () {
    //UIObject_OpacitySwing
    //------------------------------------------------------------------------------
    class UIObject_OpacitySwing {
        constructor(object, time) { //object with opacity, timer = Game_TimerABS
            this._main = object;
            this.mode = 1;
            this.repeat = false;
            this.ready = false;
            this._start = false;
            this.config = {};
            this.config.start = object.opacity;
            this.config.step = Math.round(object.opacity / time); //timer.getMaxValue()
            this._refreshConfig();
        }

        start() {
            this.ready = false;
            this._start = true;
        }

        reset() {
            this.ready = true;
            this._main.opacity = this.config.start;
        }

        stop() {
            this._start = false;
        }

        isStarted() {
            return (this._start == true);
        }

        isReady() {
            return (this.ready == true);
        }

        setToUp() {
            //LOG.p("toUP");
            this.mode = 0;
            this._start = false;
            this._refreshConfig();
        }

        setToDown() {
            //LOG.p("toDWN");
            this.mode = 1;
            this._start = false;
            this._refreshConfig();
        }

        setRepeat() {
            this.repeat = true;
        }

        isUp() {
            return (this.mode == 0);
        }

        update() {
            if (this._start == false) return;

            if (this.isUp())
                this._updateUp();
            else
                this._updateDown();

            if (this.isReady() && this.repeat == true) {
                if (this.isUp()) {
                    this.setToDown();
                    this.start();
                } else {
                    this.setToUp();
                    this.start();
                }
            }
        }

        //PRIVATE
        _refreshConfig() {
            if (this.isUp()) {
                this.config.toV = this.config.start;
                this.config.from = 0;
            } else {
                this.config.toV = 0;
                this.config.from = this.config.start;
            }
            this._main.opacity = this.config.from;
        }

        _updateUp() {
            if (this.ready) return;

            if (this._main.opacity < (this.config.toV - this.config.step)) {
                this._main.opacity += this.config.step;
            } else {
                this._main.opacity = this.config.toV;
                this.ready = true;
            }
        }

        _updateDown() {
            if (this.ready) return;

            if (this._main.opacity > (this.config.toV + this.config.step)) {
                this._main.opacity -= this.config.step;
            } else {
                this._main.opacity = this.config.toV;
                this.ready = true;
            }
        }
    }
    AlphaABS.register(UIObject_OpacitySwing);
    //END UIObject_OpacitySwing
    //------------------------------------------------------------------------------

})();