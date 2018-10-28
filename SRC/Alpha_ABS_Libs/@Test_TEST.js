//?[TEST]
//@[ALIAS]
var _alias_Scene_Map_start334324 = Scene_Map.prototype.start;
Scene_Map.prototype.start = function () {
    _alias_Scene_Map_start334324.call(this);
    "ABS TEST".p();
    //console.groupCollapsed('tt');
    //myLoad("$testX", "Test2.json");
    //var x = UrlExists("Test2.json");
    //console.log("URL EXISTS: " + x);
};

function myLoad(name, src) {
    var xhr = new XMLHttpRequest();
    var url = 'data/' + src;
    try {
        xhr.open('GET', url);
    } catch (error) {
        
    }
    xhr.overrideMimeType('application/json');
    xhr.onload = function () {
        if (xhr.status < 400) {
            window[name] = JSON.parse(xhr.responseText);
            //DataManager.onLoad(window[name]);
        }
    };
    xhr.onloadend = function () {
        if (xhr.status == 404)
            //throw new Error(url + ' replied 404');
            console.log('404');
        //console.error = m;
    };
    xhr.onerror = function () {
        //DataManager._errorUrl = DataManager._errorUrl || url;
        "ON ERRROR".p();
    };
    window[name] = null;
    try {
        xhr.send();
    } catch (e) {
    
    }
}

