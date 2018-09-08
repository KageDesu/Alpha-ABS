(function () {
    /////////////////////////////////////////////////////////////////////////////
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ ABSKey.js
    //╒═════════════════════════════════════════════════════════════════════════╛
    /////////////////////////////////////////////////////////////////////////////
    function ABSKey() {
        throw new Error('This is a static class');
    }

    ABSKey.setKeyToChange = function (symbol, windw) {
        this._changeSymbol = symbol;
        this._changeWindow = windw;
    };

    ABSKey.onKeyPress = function (event) {
        if (!ABSKey._changeSymbol) return;

        try {
            var x = AlphaABS.LIBS.IKey;
            var index = parseInt(ABSKey._changeSymbol);
            if (Input.KeyMapperPKD[event.charCode] !== undefined) {
                x.changeRawKey(index, Input.KeyMapperPKD[event.charCode]);
                ABSKey._changeSymbol = null;
                if (ABSKey._changeWindow) {
                    ABSKey._changeWindow.onKeyOk(true);
                    ABSKey._changeWindow = null;
                }
            } else {
                if (ABSKey._changeWindow)
                    ABSKey._changeWindow.onKeyOk(false);
            }
        } catch (e) {
            console.error(e);
            if (ABSKey._changeWindow)
                ABSKey._changeWindow.onKeyOk(false);
        }
    };

    AlphaABS.Key = ABSKey;
    // ■ END ABSKey.js
    //---------------------------------------------------------------------------
    /////////////////////////////////////////////////////////////////////////////
})();