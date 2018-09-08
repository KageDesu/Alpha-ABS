(function () {
    //------------------------------------------------------------------------------
    //NotifyMachine
    class NotifyMachine extends Sprite {
        constructor(x, y, w, h, lines) {
            super();
            this.x = x;
            this.y = y;
            this._maxItems = lines;
            this._items = [];
            this._timers = [];
            this._lineH = h + 4;
            this._newItem = null;
            //this.setFrame(w,this._lineH * lines);
            this._setupMode();
            this._initItems();
            this._newItemTimer = new Game_TimerABS();
            this.bitmap = new Bitmap(w, this._lineH * lines);
            //this.bitmap.fillRect(0,0,w,this._lineH*lines,Color.RED.CSS);
        }

        maxHeight() {
            return this._lineH * this._maxItems;
        }

        update() {
            this._update_new_item();
            this._update_items_fade();
            this._update_timers();
        }

        refresh() {
            this._setupMode();
        }

        push(item) {
            var lastItem = this._items.shift();
            if (lastItem != null)
                this.removeChild(lastItem);

            this._items.push(item);
            if (this._newItem) {
                this._newItem.opacity = 255;
                this._newItem.x = 0;
            }
            this._newItem = item;
            this._newItemTimer.start(NotifyMachine.TIME + 60);
            this._configNewItem();
            this._timers.shift();
            this._timers.push(new Game_TimerABS());
            this.addChild(this._newItem);
            this._step();
        }

        clear() {
            this._items.forEach(function (item) {
                if (item) this.removeChild(item);
            });
            this._timers = [];
            this._items = [];
            this._newItem = null;
            this._initItems();
        }

        //PRIVATE
        _setupMode() {
            this._mode = 'right'; //Apper from right of Screen
            if (SDK.toGlobalCoord(this, 'x') < Graphics.width / 2) {
                this._mode = 'left'; //Apper from left of Screen
            }
        }

        _update_new_item() {
            if (this._newItem == null) return;
            this._fadeOut(this._newItem);
            if (this._mode == 'right') {
                if (this._newItem.x > 2)
                    this._newItem.x -= 4;
            } else {
                if (this._newItem.x < 0)
                    this._newItem.x += 4;
            }
        }

        _update_items_fade() {
            for (var i = 0; i < this._items.length; i++) {
                if (!this._timers[i]) continue;
                if (this._timers[i].isReady()) {
                    if (this._items[i] != this._newItem)
                        this._fadeIn(this._items[i]);
                }
            }
        }

        _update_timers() {
            this._timers.forEach(function (timer) {
                if (timer) {
                    timer.update();
                }
            });

            this._newItemTimer.update();
            if (this._newItemTimer.isReady() && this._newItem) {
                this._timers[this._maxItems - 1].start(1);
                this._newItem = null;
            }
        }

        _step() {
            SDK.times(this._items.length, function (i) {
                var index = (this._items.length - 1) - i; //Reverse
                var item = this._items[index];
                if (item == null) return;
                var newY = this.height - (this._lineH * (i + 1));
                if (index != (this._items.length - 1)) { //New Item
                    item.x = 0;
                    if (this._timers[index].isReady())
                        this._timers[index].start(NotifyMachine.TIME);
                }
                item.y = newY;

            }.bind(this));
        }

        _initItems() {
            SDK.times(this._maxItems, function () {
                this._items.push(null);
                this._timers.push(null);
            }.bind(this));
        }

        _configNewItem() {
            this._newItem.opacity = 0;
            if (this._mode == 'right') {
                this._newItem.x += (this.width + 2);
            } else
                this._newItem.x -= (this.width + 2);
        }

        _fadeIn(item) {
            if (item.opacity > 2) {
                item.opacity -= 2;
            }
        }

        _fadeOut(item) {
            if (item.opacity < (251)) {
                item.opacity += 4;
            }
        }

    }

    SDK.setConstant(NotifyMachine, 'TIME', 240);
    //END NotifyMachine
    //------------------------------------------------------------------------------
    AlphaABS.register(NotifyMachine);
})();