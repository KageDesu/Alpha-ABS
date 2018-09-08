(function () {
  class UIObject_UserStatusBar extends Sprite {
    constructor(rowCount) {
      super();
      this._rowCount = rowCount;
      this._lastXPos = 0;
      this._lastYPos = 0;
      this._items = [];
      this._lastCount = 0;

      this._firstItemX = 34 * rowCount;
    }

    update() {
      //super();
      this._updateABS();
    }

    terminate() {
      this._items.forEach(function (item) {
        item.forEach(function (i) {
          if (i) i.terminate();
        });
      });
    }

    //PRIVATE
    _updateABS() {
      var items;
      try {
        items = $gamePlayer.battler().allIcons();
      } catch (e) {
        console.error(e);
        items = [];
      }
      if (this._lastCount == items.length) return;

      this._lastCount = items.length;
      for (var i = 0; i < items.length; i++) {
        var index = this._getIJForItem(i);
        var item = null;
        if (this._items[index.x]) {
          if (this._items[index.y]) {
            item = this._items[index.x][index.y];
          }
        }
        if (item) {
          item.setIndex(i);
        } else {
          if (!this._items[index.x]) {
            this._items[index.x] = [];
          }
          this._items[index.x][index.y] = new AlphaABS.LIBS.Sprite_UserStatusIcon();
          item = this._items[index.x][index.y];
          item.setIndex(i);
          var position = this._getXYForIJ(index.x, index.y);
          item.x = position.x;
          item.y = position.y;
          this.addChild(item);
        }
      }
    }

    _getIJForItem(index) {
      var i = 0;
      var j = 0;

      i = this._rowCount - (this._rowCount - index);
      while (i >= this._rowCount) {
        j++;
        i = i - this._rowCount;
      }

      return new AlphaABS.UTILS.PointX(i, j);
    }

    _getXYForIJ(i, j) {
      return new AlphaABS.UTILS.PointX(this._firstItemX - (i * 34), j * 64);
    }

  }

  AlphaABS.register(UIObject_UserStatusBar);

})();