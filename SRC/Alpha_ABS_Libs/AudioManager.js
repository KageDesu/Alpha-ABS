/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AudioManager.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
    //?[NEW]
    AudioManager.playSeLoop = function (se) {
        try {
            if (se.name) {
                this._seBuffers = this._seBuffers.filter(function (audio) {
                    return audio.isPlaying();
                });
                var buffer = this.createBuffer('se', se.name);
                this.updateSeParameters(buffer, se);
                buffer.play(true);
                this._seBuffers.push(buffer);
                return buffer;
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    };
// ■ END AudioManager.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////