(function () {

  class Sprite_EnemyStatusBar extends Sprite {
    constructor(width, height) {
      super(new Bitmap(width, height));
      this._createSprites();
      this.setTarget(null);
      this._limit = 0;
      this._iconSize = 20;

      this._thread = setInterval(function () {
        this._updateABS();
      }.bind(this), 200);
    }

    refresh() {
      this.bitmap.clear();
      this._drawItems();
    }

    terminate() {
      clearInterval(this._thread);
    }

    setLimit(limit) {
      this._limit = limit;
    }

    setTarget(target) {
      this.target = target;
      if (target) {
        this.refresh();
      } else {
        this.visible = false;
      }
    }

    //PRIVATE
    _createSprites() {}

    _drawItems() {
      try {
        var icons = this.target.battler().allIcons();
        if (icons.length == 0) {
          this.visible = false;
          return;
        } else {
          this.visible = true;
        }

        var size = (this._limit == 0) ? icons.length : this._limit;
        size = this._limit > icons.length ? icons.length : this._limit;
        for (var i = 0; i < size; i++) {
          this.bitmap.drawIcon(this._xVal(i), 0, icons[i], this._iconSize);
        }
      } catch (e) {
        console.error(e);
      }
    }

    _xVal(index) {
      return index * (this._iconSize + 2);
    }

    _updateABS() {
      if (this.target) {
        this.refresh();
      }
    }
  }

  AlphaABS.register(Sprite_EnemyStatusBar);

})();