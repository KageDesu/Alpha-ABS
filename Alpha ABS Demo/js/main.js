//=============================================================================
// main.js
//=============================================================================

"use strict";


PluginManager.setup($plugins);

window.onload = function() {
    SceneManager.run(Scene_Boot);
};
