(function () {

  "use strict";

  //ABSObject_PopUpMachine
  //------------------------------------------------------------------------------
  /* jshint -W104 */
  class ABSObject_PopUpMachine {
    constructor(x, y, width, stack_size, parent) {
      this._x = x;
      this._y = y;
      this._width = width;
      this._stack_size = stack_size;
      this._parent = parent;
      this._effectType = null;
      this._upMode = false;

      this._items = [];
      this._timers = [];

      this._init_items();
    }

    setUpMode() {
      this._upMode = true;
    }

    setEffectSettings(effect) {
      this._effectType = effect;
    }

    setSingleMode() {
      //this._singleMode = true;
    }

    move(x, y) {
      this._x = x;
      this._y = y;
      this._step();
    }

    push(popUpItem) {
      if (this._effectType != null)
        popUpItem.setEffectSettings(this._effectType);

      popUpItem.setup(this._x, this._y, this._width, this._parent);

      var item = this._items.shift();
      if (item != null) item.dispose();

      this._items.push(popUpItem);
      this._step();
      this._timers.shift();
      this._timers.push(0);
    }

    clear() {
      this._items.forEach(function (item) {
        if (item != null) item.dispose();
      });
      this._items = [];
      this._timers = [];
      this._init_items();
    }

    update() {
      this._update_timers();
      this._items.forEach(function (item) {
        if (item != null) item.update();
      });
    }

    //PRIVATE
    _init_items() {
      SDK.times(this._stack_size, function () {
        this._items.push(null);
        this._timers.push(null);
      }.bind(this));
    }

    _update_timers() {
      SDK.times(this._stack_size, function (i) {
        var index = (this._timers.length - 1) - i; //Reverse
        var timer = this._timers[index];
        if (timer == null)
          return;
        else {
          if (timer < ABSObject_PopUpMachine.MAX_TIME)
            this._timers[index] = this._timers[index] + 1;
          if (timer == ABSObject_PopUpMachine.MAX_TIME) {
            if (this._items[index] != null) {
              this._items[index].dispose();
            }
            this._items[index] = null;
            this._timers[index] = null;
          }
        }
      }.bind(this));
    }

    _step() {
      SDK.times(this._items.length, function (i) {
        var index = (this._items.length - 1) - i; //Reverse
        var item = this._items[index];
        if (item == null)
          return;

        var y = 0;
        if (this._upMode)
          y = this._y - (ABSObject_PopUpMachine.Y_STEP * i);
        else
          y = this._y + (ABSObject_PopUpMachine.Y_STEP * i);

        this._items[index].setX(this._x);
        this._items[index].setY(y);
      }.bind(this));
    }
  }

  SDK.setConstant(ABSObject_PopUpMachine, 'Y_STEP', 24);
  SDK.setConstant(ABSObject_PopUpMachine, 'MAX_TIME', 60);
  SDK.setConstant(ABSObject_PopUpMachine, 'SETTINGS', [1, false, 12]); //zoom, isUpdateZoom, +toTextSize
  //END ABSObject_PopUpMachine
  //------------------------------------------------------------------------------


  AlphaABS.ABSObject_PopUpMachine = ABSObject_PopUpMachine;
  AlphaABS.register(ABSObject_PopUpMachine);
})();