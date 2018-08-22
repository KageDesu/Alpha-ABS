# Version 1.2  
## Builds:  

**924** - (22.08.2018)
> - new feature : `Solid Regions System` ![video](https://youtu.be/5gGV6htF4Kg)
> - new plugin parameter `Solid Regions` - id's map regions for obstacles for enemy and spells
> - new abs parameter `<ignoreObstacles:X>` for skills (items) - allowing ignore solid regions on Map
> - new abs parameter `<ignoreObstacles:X>` for enemies - allowing enemies see through solid regions
> - new abs parameter `<impulseRandom:X>` for skills (items) - combined with `<impulse: X>`, allowing make impulse in random direction  
> new abs parameter `<heavy:X>` for enemies - if this parameter = 1, the enemy will be ignoring impulse effect
> - fixed: HP and MP regeneration PopUp always been displayed
> - fixed bug: dead enemy lost they position on map and can be looted many times when player transfering on the map

**915** - (14.08.2018)
> - fixed issues with images loading from plugin parameters
> - fixed bug: enemy looting not working after calling common event on enemy
> - fixed bug: players not gains EXP after enemy killing
> - fixed bug: enemy full HP regeneration after battle
> - fixed bug: enemy with <noMove:1> not changes direction
> - no more ballon popUp 'Zzz' when enemy in stun (not moving or sleep)
> - new abs param `<cEonStart:X>` for States. Call common event Id (x) when stated applies to the target  
![image](https://github.com/KageDesu/TestRepo/blob/master/915_event.png)
> - new parameters for player transfering after death:  
>> `Game Over Map Position`  
>> `Game Over Common Event` - Common event will called after Player death  
>> `Transfer character direction`   
![image](https://github.com/KageDesu/TestRepo/blob/master/915_deadMapParams.png)


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
