//?[TEST]
//@[ALIAS]
//BUILDER_COMPRESS_ME
var _alias_Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function () {
    _alias_Scene_Map_start.call(this);

    /*var c = AlphaABS.AXUI.Container;

    var size = 32;

    var cc = new c(size);
    this.addChild(cc);

    cc.setItemsCount(4);
    cc.setSpacing(2);
    //cc.setPivotToLeft();
    //cc.setVertical();

    var b = new Bitmap(size, size);
    b.fillAll(KDCore.Color.BLUE);
    var cb = new Sprite(b);
    cc.addChild(cb);

    var b2 = new Bitmap(size, size);
    b2.fillAll(KDCore.Color.GREEN);
    var cb2 = new Sprite(b2);

    cc.addChild(cb2);

    var b3 = new Bitmap(size, size);
    b3.fillAll(KDCore.Color.YELLOW);
    var cb3 = new Sprite(b3);

    cc.addChild(cb3);

    var b4 = new Bitmap(size, size);
    b4.fillAll(KDCore.Color.WHITE);
    var cb4 = new Sprite(b4);

    //cc.addChild(cb4);

    console.log('123');*/
};