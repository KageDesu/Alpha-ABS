# Version 1.2  
## Builds:  

**910** - (7.08.2018)
> - fixed small Issues
> - fixed bug:  the game could lose fps in auto-attack mode by the player
> - new plugin parameter `Player Damage Outline`  
![image](https://github.com/KageDesu/TestRepo/blob/master/Build910Params.png)   
![image](https://github.com/KageDesu/TestRepo/blob/master/Build910Param2.png)  
> - new plugin parameter `Spell zone image`   
![image](https://github.com/KageDesu/TestRepo/blob/master/Build910Param1.png)
> - new ABS parameter for skills and items `<impulse: X>` - you can set impulse force to skill for knockback enemy or to bring them closer
> - **Multi hit** - now skill can hit enemy multi times (RPG Maker MV parameter `Repeat` is now come back like it do in original MV)



**903** - (3.08.2018)
> - fixed small Issues
> - fixed bug with AI parameter `escapeOnBattle:1`

**902** - (31.07.2018)

> - fixed small issues

**901** - (23.07.2018)

> - fixed small issues  

**900** - (23.07.2018)

> - fixed bug: game crush after load ABS map with enemy in revive state
> - fixed bug: some items and skills are not installed in the slots from menu
> - added support MV 1.5.1 and above
> - new plugin parameter: `Auto Hide` for the Spell panel. If false, spell panel will always be visible, even when there is no single skill
> - many small changes and fixes

This build based on new Core scripts. In this regard, many changes have been made. The most interesting of them:
  - Now all standard image files are built into the code. Folder img\ABS is no longer needed. Only .js file.
  - *Settings.js file also no longer needed*. All the plugin parameters in plugin .js file
  - New controls key binding system (more compatible with other plugins)
  - Some parts of the plugin have been moved into the another .js files (extensions). They can be optionally connected with the plugin (below main plugin file)

**800** - initial build (26.05.2018)  