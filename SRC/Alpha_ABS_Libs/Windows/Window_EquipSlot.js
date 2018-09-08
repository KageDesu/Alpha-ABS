(function () {
  var _Window_EquipSlot_drawItem = Window_EquipSlot.prototype.drawItem;
  Window_EquipSlot.prototype.drawItem = function (index) {
    _Window_EquipSlot_drawItem.call(this, index);
    try {
      if (index !== null || index !== undefined)
        this._drawFavWeapSymbol(index);
    } catch (e) {
      console.error(e);
    }
  };

  //NEW
  Window_EquipSlot.prototype._drawFavWeapSymbol = function (index) {
    if (this._actor) {
      var item = this._actor.equips()[index];
      if (item) {
        var symbol = this._actor.getFavWeapSymbol(item);
        if (symbol != null) {
          this.changeTextColor(Color.ORANGE.CSS);
          var rect = this.itemRectForText(index);
          var drawSymbol = '[' + symbol.toUpperCase() + ']';
          if (Utils.isMobileDevice()) {
            drawSymbol = '■';
          }
          if (Imported.YEP_EquipCore == true) {
            this.contents.drawText(drawSymbol, rect.x + this._nameWidth, rect.y, rect.width - this._nameWidth, this.lineHeight(), 'right');
          } else {
            var iconBowWidth = Window_Base._iconWidth + 8;
            this.contents.drawText(drawSymbol, rect.x + 138 + iconBowWidth, rect.y, 312 - iconBowWidth, this.lineHeight(), 'right');
          }
        }
      }
    }
  };
})();