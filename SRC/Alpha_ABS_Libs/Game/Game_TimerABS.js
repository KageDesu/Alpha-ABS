function Game_TimerABS() {
  this.initialize.apply(this, arguments);
}
(function () {
  //Game_TimerABS
  //------------------------------------------------------------------------------
  Game_TimerABS.prototype.initialize = function () {
    this._paused = false;
    this._mValue = 0;
    this._value = 0;
  };

  Game_TimerABS.prototype.getMaxValue = function () {
    return this._mValue;
  };

  Game_TimerABS.prototype.getValue = function () {
    return this._value;
  };

  Game_TimerABS.prototype.setMaxTime = function (frameCount) {
    frameCount = Math.abs(Math.round(frameCount));
    this._mValue = frameCount;
    if (this._value > this._mValue)
      this._value = this._mValue;
  };

  Game_TimerABS.prototype.reset = function () {
    this._value = 0;
  };

  Game_TimerABS.prototype.update = function () {
    if (!this.isReady()) {
      if (!this._paused) {
        if (this._value < this._mValue)
          this._value += 1;
      }
    }
  };

  Game_TimerABS.prototype.isReady = function () {
    return (this._value >= this._mValue);
  };

  Game_TimerABS.prototype.stop = function () {
    this.start(0);
  };

  Game_TimerABS.prototype.start = function (frameCount) {
    this._value = 0;
    this._mValue = Math.abs(Math.round(frameCount));
    this._paused = false;
  };

  Game_TimerABS.prototype.pause = function () {
    if (this._paused)
      return;
    if (this._mValue == 0)
      return;
    this._paused = true;
  };

  Game_TimerABS.prototype.resume = function () {
    this._paused = false;
  };

  //END Game_TimerABS
  //------------------------------------------------------------------------------

})();