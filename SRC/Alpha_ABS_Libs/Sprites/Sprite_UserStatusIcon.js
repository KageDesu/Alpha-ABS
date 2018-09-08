(function(){
  class Sprite_UserStatusIcon extends Sprite {
    constructor() {
      super(new Bitmap(32, 54));
      this._spriteTime = new Sprite(new Bitmap(32, 20));
      this._spriteTime.y = 36;
      this._spriteTime.bitmap.textColor = Sprite_UserStatusIcon.TIMECOLOR.CSS;
      this._spriteTime.bitmap.fontSize = 18;

      this._index = null;
      this.addChild(this._spriteTime);

      this._thread = setInterval(function() { this._updateABS(); }.bind(this), 100);
    }

    setIndex(index) {
      this._index = index;
      this._drawItem();
      this.refresh();
    }

    refresh() {
      this._spriteTime.bitmap.clear();
      if(this._index != null) {
        var items = $gamePlayer.battler().states();
        if(this._index >= items.length) {
          var index2 = this._index - items.length;
          items = $gamePlayer.battler()._buffTurns;
          if(items[index2] == 0) {
            this._index = null;
            this.bitmap.clear();
            return;
          } else
            this._drawBuffTime(index2, items);
        } else {
          this._drawStateTime(this._index, items);
        }
      }
    }

    terminate() {
      clearInterval(this._thread);
      this.visible = false;
      this.bitmap.clear();
      this._spriteTime.bitmap.clear();
      if(this.parent)
        this.parent.removeChild(this);
    }

    //PRIVATE

    _drawItem() {
      this.bitmap.clear();
      if(this._index != null) {
        var icon = $gamePlayer.battler().allIcons()[this._index];
        this.bitmap.drawIcon(0, 0, icon, 32);
      }
    }

    _updateABS() {
      if(this._index != null)
        this.refresh();
    }

    _drawStateTime(index, items) {
      var stateTimes = $gamePlayer.battler()._stateTurns;
      var state = items[index];
      var time = stateTimes[state.id];
      var stringToDraw = '';
      if(state.autoRemovalTiming == 1) {
        stringToDraw = 'A';
      } else {
        if(state.autoRemovalTiming == 0) {
          stringToDraw = '';
        } else
          stringToDraw = AlphaABS.UTILS.framesToTimeA(time);
      }
      //this._spriteTime.textColor = Sprite_UserStatusIcon.TIMECOLOR.CSS;
      this._spriteTime.bitmap.drawText(stringToDraw, 0, 0, this._spriteTime.bitmap.width, this._spriteTime.bitmap.height, 'center');
    }

    _drawBuffTime(index, items) {
      var time = items[index];
      if(time) {
        var stringToDraw = AlphaABS.UTILS.framesToTimeA(time);
        this._spriteTime.bitmap.drawText(stringToDraw, 0, 0, this._spriteTime.bitmap.width, this._spriteTime.bitmap.height, 'center');
      }
    }
  }

  Sprite_UserStatusIcon.TIMECOLOR = Color.FromHex('#CECE00');

  AlphaABS.register(Sprite_UserStatusIcon);

})();
