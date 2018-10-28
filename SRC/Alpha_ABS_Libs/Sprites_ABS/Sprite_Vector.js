/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Vector.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    function Sprite_Vector() {
        this.initialize.apply(this, arguments);
    }

    AlphaABS.register(Sprite_Vector);

    Sprite_Vector.prototype = Object.create(Sprite.prototype);
    Sprite_Vector.prototype.constructor = Sprite_Vector;

    Sprite_Vector.prototype.initialize = function (imageName) {
        Sprite.prototype.initialize.call(this);
        this.bitmap = ImageManager.loadPicture(imageName);
        this._frameCount = 1;
        this._animIndex = -1;
        this._wait = 0;
        this._parseAnimatedVectorName(imageName);
        if (this.isAnimated()) {
            this._maxWait = 6;
            this._animIndex = 0;
            this._calculateFrameSize();
            this.setIdleFrame(0);
            //TODO: Скорость анимации
        }
    };

    var _ = Sprite_Vector.prototype;

    _._parseAnimatedVectorName = function (name) {
        if(name.contains("_")){
            var last = name.split("_").last();
            var number = Number(last);
            if(!isNaN(number)) {
                this._frameCount = number;
                //"IS ANIMATED".p();
                return true;
            }
        }
        return false;
    };

    _.isAnimated = function () {
        return this._frameCount > 1;
    };

    _._calculateFrameSize = function () {
        this._frameW = Math.round(this.bitmap.width / this._frameCount);
        this._frameH = this.bitmap.height;
    };

    _.setIdleFrame = function (frameNumber) {
        var frame = this._createFrame(frameNumber, 0);
        this.setFrame(frame[0], frame[1], frame[2], frame[3]);
    };

    _._createFrame = function (i, j) {
        return [i * this._frameW, j * this._frameH, this._frameW, this._frameH];
    };

    _.update = function() {
        Sprite.prototype.update.call(this);
        this._updateFrame();
        this._updateWait();
    };

    _._updateFrame = function () {
        if (this._animIndex >= 0 && this._wait == 0) {
            this.setIdleFrame(this._animIndex);
            //console.log(this._animIndex);
            this._animIndex += 1;
            this._wait = 1;
        }
        if(this._animIndex == this._frameCount) {
            this._animIndex = 0;
        }
    };

    _._updateWait = function() {
        if (this._wait > 0) {
            this._wait++;
            if (this._wait > this._maxWait)
                this._wait = 0;
        }
    };
})();
// ■ END Sprite_Vector.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////