# Version 1.2  
## Builds:  

**946** - (17.09.2018)
> - fixed bug: followers not follow the player after transfer from ABS to ABS map
> - fixed bug: player and party got experience when monsters killed each other
> - fixed bug: `<stack>` parameter not working with `<ammo>`
> - fixed bug: game crush with YEP_SaveCore plugin
> - fixed bug: images for some UI elements not loading from plugin parameters
> - new abs param `<cEonEnd:X>` for States. Call common event Id (x) when the state ends
> - added line for `multi hit` skills in popup description window
> - Starting with this build skills or weapons with multi charges create allowed only without consuming ammo. To do this, a new parameter will be introduced


**944** - (8.09.2018)
> - AI optimization
> - new abs parameter `<repeatDelay:X>` allows set delay for skill (item) that use repeat option between multi hits in millisecond (default 120)
> - new abs parameter `<castTimeFormula>` allows set formula for calculate casting time of skill (item). Formula format like `reloadParam` for weapons (see User Manual)
> - fixed bug: party members did not follow the player after change map from ABS to normal
> - fixed bug: after transfering between different sizes ABS maps pathfinding did not work properly
> - fixed bug: player image did not disappeared when player get in transport
> - fixed bug: some skills animations did not work if player has not target
> - fixed bug: skills information not updated when player learn new skills
> - fixed small Issues

**936** - (30.08.2018)
> - fixed bug: ABS parameters not changed when player change weapons
> - fixed bug: Wrong Level Up animation when someone in Party is leveling up
> - fixed bug: After death player can be still invisible on other Map
> - new plugin parameter `Party experience` - now you can change how will the experience be shared in the group
> - new feature: `Enemy Spawning`  - you can spawn enemies on Map with plugin command
>> - new plugin parameter `Enemy Spawn Map Id` - The map ID of the map you are using to store spawnable enemy
>> - new plugin command `ABS spawn [Id] [x] [y]` - spawn Enemy with Id in X and Y
>> - new plugin command `ABS spawn [Id] [region Id]` - spawn Enemy with Id in random place in Region  
![image](https://github.com/KageDesu/TestRepo/blob/master/936_spawn.png)

**924** - (22.08.2018)
> - new feature : `Solid Regions System` (https://youtu.be/5gGV6htF4Kg)
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
