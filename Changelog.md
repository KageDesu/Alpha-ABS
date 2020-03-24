## Builds:  

**1174** - (23.03.2020)  
> - Fixed critical bug: AI not works after save game, then go to the Title screen and load game  
> - Fixed glitch when Gamepad UI may shown when Gamepad is not connected
>> See new Plugin Parameter `Gamepad Support`
> - New: Visual looting (like [Visual Chest](https://github.com/KageDesu/Alpha-ABS/wiki/Visual-Chests-System)) for enemies  
>> See new Plugin Parameter `Visual loot`
> - New: improved `Solid Regions` system
>> - `<noTarget:1>`,`<ABS:1> (Vector)` skills _don't ignore_ obstacles anymore  
> - New: added new keyboar shortcut <kbd>t</kbd> for `Take All` button in chests and player storage  
>> - You can change key code in `KeyBinding.json`  
> - New: Improved **Absorb Barriers** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Absorb-Barriers)
>> - Now, player can use absorb barriers
> - New feature: **Teleport Ability** for enemies [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Teleport-Ability)  
>> - Enemies can performs teleports for battle movements  
> - New feature: **Support Ally Ability** for enemies [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Support-Ally-Ability)
>> - Enemies know how support (heal) their allies in battle  
> - New uAPI script calls: [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Script--Calls-API) for more information  
>> - uAPI.addWeaponInPlayerStorage(id, count)
>> - uAPI.addItemInPlayerStorage(id, count)
>> - uAPI.addArmorInPlayerStorage(id, count)
>> - uAPI.moveEquipedItemsToStorage()
>> - uAPI.moveAllItemsToStorage()
>> - uAPI.clearPlayerStorage()
>> - uAPI.aliveEnemiesCount
>> - uAPI.deadEnemiesCount
>> - uAPI.inBattleEnemiesCount
> - other many small changes and bug fixes  


**1170** - (21.02.2020)  

> - New: improved **Visual Equipment**, now works on NON-ABS maps  
> - New: plugin parameter `Show Items Notify on NON ABS maps?`
>> If this parameter is ON:   
>>  - item (or gold) notify will be displayed on NON ABS maps  
>>  - uAPI commands `putLine` and `putLineWithIcon` will be works on NON ABS maps
> - New: ABS parameter for skills (weapons) `<stopCast:1>`  
>> Skill with that parameter will completely break the target spell casting   
> - improved **Enemy Level System** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Enemy-Level-System)  
>> - now, you can create `Grow Tables` and raise the characteristics of enemies with each of their level  
> - Menu key (<kbd>ESC</kbd> _(by default)_) now first close `Map Inventory` (if opened) then open Game Menu  
> - fixed bug: `Visual Chest` and `User Storage` don't save their new positions after dragging  
> - fixed bug: `Visual Chest` and `User Storage` glitch (wrong item), when you try taking items from not first page  
> - other small changes  

```diff
+ Only for PRO version
```

> - **New feature: Enemy Vision** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Enemy-Vision)

**1166** - (14.02.2020)  

> - New: added UI Button for open(close) map inventory  
> - New: map inventory and player storage chest now closing by right mouse click  
> - New: plugin parameter `Piercing Damage for Absorb Barriers?` [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Absorb-Barriers)
> - fixed critical bug: AI not works after save game loaded  
> - fixed bug: `<escapeOnBattle>` ABS parameters works wrong  
> - improvements in work `<escapeOnBattle>` and `<agressive>` ABS commands  
> - fixed bug: keyword `level` in skill Damage Formula not works in Non-ABS Battle system
> - fixed bug: returning items from player storage to inventory works sometimes wrong  
> - fixed bug: inventory (chest, storage) page count glitch
> - fixed bug: bush depth
> - fixed bug: FPS drops when player in `Follow mode`  
> - fixed bug: `Shield` UI button don't hides when UI is hidden  
> - fixed bug: Items Notify glitch when UI is hidden  
> - fixed bug: `Guard` state remains after Non-ABS Battle  
> - improved `<speed:X>` ABS parameter for States
> - fixed grammar errors in `Locale.json`  
> - improved equipment's sorting in map inventory  
> - fixed glich with `Favorite weapons` circle and Visual Chests
> - fixed bug: player can moving when player storage is open
  >> - now, event will paused and wait until storage is closed
> - improved **Enemy Level System** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Enemy-Level-System)
 >> - now `<runAwayIfLvlBelow>` and `<noFightIfLvlBelow>` works together  
> - some small ABS UI performance improvements
> - many small bugs fixes and improvements


**1164** - (30.01.2020)  

> - **New feature: Absorb Barriers** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Absorb-Barriers)
> - Improved **Enemy Level System** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Enemy-Level-System)
>> now you can use enemy **level** in Damage Formula  
>> new plugin parameter `Show Level`
> - Added `<motionWait:X>` ABS parameters for enemies [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Motion-System-2)
> - fixed critical bug: After Revive, enemies might not be activated (not attack player, not see player)  
> - fixed bug: You can't open inventory on the NON-ABS map if the visual chest was opened  
> - other small bugs fixes and improvements

```diff
+ Only for PRO version
```
> - **New feature: Player Chest** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Player-Storage-(Player-Chest))  
> - **New feature: Stored Chests**, Visual Chests [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Visual-Chests-System) that can keep items after closing  


**1158** - (31.12.2019)  

> - New: plugin parameter `Sort Items?` (for Map Inventory)
> - New: plugin parameter `Sort Equipments?` (for Map Inventory)
> - New: plugin parameter `Use skill info with extended description?`
> - New: You can set special item type for certain items (for Map Inventory)  
> - Added items and equipments sorting (for Map inventory)  
> - New: Now you can set items to Spell Panel from map inventory  
> - New: Now you can set weapons to Favorite Circle from map inventory
> - New: Extended description for Skill information window. [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Skill-Information-Window-JSON-Configuration)
> - fixed bug: `ABS Activate` plugin command fix
> - fixed bug: Favorite weapons circle and Map Inventory glitch  
> - fixed bug: You can set same weapon in all favorite weapon circle slots
> - other small bugs fixes and improvements

```diff
+ Only for PRO version
```
> - **New feature: Visual Chest** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Visual-Chests-System)  



**1155** - (25.12.2019)  


> - New: plugin parameter `Random TP at start`
> - New: Skill ABS parameter `<noCastingDelay>` - if 1, then casting time will not grow by damage _(default 0)_  
> - `HIME_PreTitleEvents` plugin support  
> - `FROG_Health` plugin support  
> - `GALV_CharacterAnimations` plugin support  
> - `GALV_CharacterFrames` plugin support
> - fixed bug: firearm ammo not loaded when you go from ABS map to another ABS map  
> - fixed bug: enemies spawned (with Encounters)  outside the game map    
> - fixed bug: ABS parameter `<motionWait>` not works with `SAN_AnalogMove` plugin  
> - fixed bug: with `YEP_ItemCore` items could be duplicated (item notify panel)     
> - other small bugs fixes and improvements


```diff
+ Only for PRO version
```
> - **New feature: Map Inventory** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Map-Inventory)  


**1142** - (22.11.2019)  

> - New: plugin parameter `Enemy HP value in %`  
> - New: plugin parameter `After Death Common Event`  
> - New: Now enemies can use Zone skills `<ABS:3>`  
> - New: If `Game Over Common Event` > 0, but NON ABS map not specified in `Game Over Map ID`, game not go to the GameOver screen  
> - `GALV_MessageStyles` plugin support  
> - `MOG_LMBS` plugin support  
> - `YEP_BattleEngineCore` plugin support
> - fixed bug: player sprite restore normal state (after death) before transfer to `Game Over Map`  
> - fixed bug: Enemies `Vector` skill shooting and solid regions  
> - fixed bug: Enemies casting animation repeating  
> - other small bugs fixes and improvements  

```diff
+ Only for PRO version
```
> - **New feature: Second Battle System** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Second-Battle-System)  


**1132** - (07.11.2019)  

> - **New feature: Map Encounters** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Map-Encounters)
> - New: Enemies can shoot Vector skills `<ABS:1>` in all directions (use ABS parameters `<noTarget:1>` and `<directionFix:0>`)
> - New: Enemies can use Circle skills `<ABS:2>`  
> - Improved pathfinding for ABS events, now enemies can move through corpses (and all `below` or `above` character priority events)  
> - Improved algorithm of selecting the spawn position for ABS events  
> - fixed bug: `Blood Splatter` effect and game load  
> - other small bugs fixes and improvements  

**1128** - (21.10.2019)  

> - **New feature: Defense Towers** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Defense-Towers)  
> - fixed game crush on Non-Abs map when you use gamepad  
> - fixed bug: gamepad key binding not working on Non-Abs map   
> - fixed `uAPI` commands: `hideControls`, `hideUI`  
> - fixed bug: AOE skills animation on map  
> - fixed game crush when <kbd>CTRL</kbd> pressed  
> - other small bugs fixes and overall improvements

**1125** - (09.10.2019)  
> - **New feature: Monster Leveling System** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Enemy-Level-System)
> - improved monster spawn system, added spawn and revive block opportunity [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Enemy-Spawning#3-block-spawning-and-revive)  
> - added support for 8-way pixel diagonal movement plugin `SAN Analog Move`  
> - plugin performance improvements  
> - many other fixes and changes  

```diff
+ Only for PRO version
```
> - **Gamepad support** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Gamepad)  


**1110** - (17.09.2019)  
> - **New feature: Outer ABS Settings** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Outer-Settings)
> - **New feature: Blood Splatter Effect** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/BloodSplatter-Effect-(Low-HP))
> - improvements for **Landmines**: now, after detonation the self switch A turns off automatically
> - fixed bug with monster spell cast audio endless looping  
> - fixed bug with `<reloadParam>` and `<reloadTime>` for <ABS:2> and <ABS:3> skills  
> - improvements for **Solid Regions**: new algorithm, fixed bug when enemy can't see player on same horizontal or vertical line  
> - fixed bug with party ability `Gold Double`    
> - added embedded improved Terrax Lighting support  
> - Some other fixes and changes  


```diff
+ Only for PRO version
```

> - **New feature: Fog of War** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Fog-of-War-on-Map)  
> - **New feature: Extended Damage PopUps** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Custom-Map-Damage-PopUp's)



**1090** - (03.08.2019)  
> - fixed issue with plugin `GALV_MessageStyles`  
> - **New feature: Landmines and Traps** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Landmines-and-Traps)  
> - some other small fixes  

**1086** - (23.07.2019)

> - fixed bug: issue with open menu by <kbd>ESC</kbd> and **Hints for Events**  
> - **Hints for Events** system optimization for more performance on big maps  
> - improvements for **Summon System** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Summon-System)
>> - new parameters `<sBattleMode>`, `<sChangeModeAllowed>` - see wiki for more information  
> - some other fixes and small changes  

```diff
+ Only for PRO version
```
> - **New feature: Mini messages for Events** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Events-Mini-Messages)  


**1082** - (17.07.2019)  
> - **New feature: Improved Interpreter for ABS events** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/ABS-Events-Commands)
> - improved **Visual Equipment** - now player can equip more than one equipment with <visual> parameter
> - added ability to set summon and dismiss animations for **Summon Monster** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Summon-System)  
>> `<summonStartAnimId:X>`  
>> `<summonEndAnimId:X>`  
>> This parameters for summon **state** Note!, not monster  
> - Now, if you forgot to copy (update) `ABS JSON files` (data/AABS), the game will tell you about it  
> - fixed bug: `<cEonEnd>` not working  
> - fixed bug: `visible` parameter for UI Buttons not working  
> - some other fixes and small changes  


```diff
+ Only for PRO version
```
> - **New feature: Hints for Events** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Hints-for-Events)
> - new plugin parameter `AI Think Interval` - The lower the value, the AI thinks faster and less game performance

**1076** - (29.06.2019)  
> - **New feature: Summon System** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Summon-System)
> - new plugin parameter `Show player PopUps` - for enable/disable states messages on player portrait  
> - new ABS parameter `<motionWait>` - for weapons with Motion System 2.  
>> If `<motionWait:1>` - player can't move and perform next attack while attack animation is playing  (default 0)
> - New default key for `Defense Stance` activate - <kbd>v</kbd>
> - fixed bug with Party members and enemies rage calculations - can cause FPS drop in battles  
> - fixed wrong animation frames sequence in Motions System 2 weapon animation
> - fixed bug when sometimes AI turned off after change map (or call menu)  
> - fixed some issues with `Defense Stance` shield state  
> - fixed bug with Auto attack mode and `Defense Stance`  
> - fixed bug with `<speed>` states (no acceleration)
> - fixed bug with map grass and `Visual Equipment`  (wrong sprite order)
> - some other fixes and small changes  

**1058** - (07.06.2019)  
> - **New feature: Defense Stance** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Defense-Stance-(Shield-Block))  
> - fixed bug: sometimes enemies not attack (not see) player after reborn or exit from menu   
> - fixed compatibility issue: `Visual Equipment` not works with `YEP_ItemCore`  
> - some other fixes and small changes  

**1055** - (30.05.2019)  
> - fixed bug: Motion System 2 (MS2) - last frame was not played in idle weapon animation
> - fixed bug: game crush when select follower with mini HP bar option  
> - fixed bug: uAPI.hide not work correctly  
> - Now, uAPI.showControls and uAPI.hideControls show\hide UI Buttons
> - fixed bug: Spell Panel displayed at half in menu with YEP_ItemCore plugin
> - fixed bug: glitch with MS2 between ABS and not ABS map transferring
> - fixed bug: ABS parameter for enemies <agressive:X> don't work properly
> - fixed bug: change favorite weapon when main weapon is still recharging
> - fixed bug: when you change favorite weapon from `firearm` to basic, UI Firearm panel is not gone
> - improved MS2: now works with followers
> - some other fixes and small changes

```diff
+ Only for PRO version
```
> - **New feature: Visual Equipment** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Visual-Equipment)


**1050** - (26.05.2019)  
> - **fixed critical bug**: memory leak when transferring between maps
> - plugin .js file size optimization (removed unused graphic data)
> - improved memory using. Now Alpha ABS uses 2-3 times less memory
> - fixed bug: select 'Optimize' equipment in menu cause error in console and show console  
> - fixed bug: player rotate to target or mouse when you cast `noTarget` skill
> - fixed glitch: message window appear below UI Buttons
> - Now, console not will appears automatically when no critical error occurs
> - fixed bug: weapon icon overlap previous in favorite weapon settings menu
> - fixed bug: sometimes enemy could be spawned the dead at start
> - **New feature: Motion System 2** [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Motion-System-2)
> - some other fixes and small changes

**1044** - (09.05.2019)  
> - all UI elements settings are transferred from plugin parameters to JSON files  
> - Now, Firearm panel can be modified, see `FirearmPanel.json`  
> - New _API commands_ for UI Spell Panel [See Wiki](https://github.com/KageDesu/Alpha-ABS/wiki/Script--Calls-API )
> - new plugin parameter `Shake screen when player get damage?`  
> - New feature: **Auto rotate player to mouse**, when <kbd>CTRL</kbd> is pressed. (To change key, see `KeyBinding.json`)

![](https://c10.patreonusercontent.com/3/eyJwIjoxfQ%3D%3D/patreon-media/p/post/26730747/a54bca1c2c904a7b859c889795f02827/1.gif?token-time=1559088000&token-hash=1nhxrhiWlafgms9GhgwaMlUZCAx73f44wsWnP2aliKU%3D)

> - some fixes and small changes  
> - improved mouse tracking and mouse position determination  
> - new ABS parameter `<explosive:1>` - sllow create explosive effect, when the spell reach target **(Only for < ABS:1> skills)**

![](https://c10.patreonusercontent.com/3/eyJwIjoxfQ%3D%3D/patreon-media/p/post/26730747/d0291130fac046719c37b3e9e04dd04b/1.gif?token-time=1559088000&token-hash=K3qnkRPoGlHWpocZAnOXvwvfs2sizCCS1PDYZBFJf6g%3D)

![](https://c10.patreonusercontent.com/3/eyJwIjoxfQ%3D%3D/patreon-media/p/post/26730747/2b5db43cbb2a448bbe27d07df2b274c4/1.png?token-time=1559088000&token-hash=8-5Vq7-kxOrZ6XtGm9kFNQyBGpLN7CzIcHkG4GctiR4%3D)

> - New feature: Extended error messages (like Yanfly's Engine plugin)  and error logs in file

```diff
+ Only for PRO version
```
> - New ABS Parameter for enemies `<HPBarStyle: StyleID>` - allow create custom HP bars on map for each enemy.

![](https://c10.patreonusercontent.com/3/eyJwIjoxfQ%3D%3D/patreon-media/p/post/26730747/8a6fbc848dd34be28da0e2c2e19f8e6a/1.png?token-time=1559088000&token-hash=RJ6BQsN2FmwkL3JMt1F1Pb5PuWptJFEzTvmmx9YFlEo%3D)



**1036** - (15.03.2019)
> - fixed bug : black rain
> - fixed bug: Skills with `<noTarget>` and `<castTime>` caused an error _Target too far_
> - new plugin command `ABS spawnV [Id] [varID] [varID]` - spawn Enemy with Id in X and Y from Variables
> - new plugin parameter `Use advanced pathfinding?`
> - new plugin parameter `Auto bind new items to the Skill panel?`
> - many small changes

```diff
+ Only for PRO version
```

> - new UI element - Skill information window  
[Check Wiki for information](https://github.com/KageDesu/Alpha-ABS/wiki/Skill-Information-Window-JSON-Configuration)
> - new plugin parameter `Use old style skill info window?`

**1030** [Test only] - (21.02.2019)
> - new UI element - Notifications
> - new UI element - Enemy Cast Bar
> - new UI element - Weapon cool down timer
> - many small changes

**1024** [Test only] - (9.02.2019)
> - new UI element - Spells panel

**1018** [Test only] - (21.01.2019)
> - new UI element - Actor Cast progress bars
> - improved pathfinding algorithm  
> - some fixes and small changes  

**1015** [Test only] - (15.01.2019)  
> - new UI element - Target panel
> - new UI element - Target states panel
> - fixed bug in default UI Buttons settings
> - new .JSON configuration file: `EnemyStatusPanelSettings.json`
> - new parameters for .JSON file StatesPanelSettings: `maxLines`, `textVisible`
> - new parameters for Enemies: `faceName`, `faceIndex` - used for image *(optional)*
> - many fixes and small changes  

**1010** [Test only] - (9.01.2019)  
> - new UI element - Actor Panel  
> - fixed bug with target selection keys  
> - many fixes and small changes

**998** - (01.12.2018)  
> - new UI elements - UI Status Panel  [Check Wiki for information](https://github.com/KageDesu/Alpha-ABS/wiki/Status-Panel-JSON-Configuration)

```diff
+ Only for PRO version
```

> - Custom UI styles for states  


**996** - (24.11.2018)  
> - fixed bug: Items Notify `stayTime` JSON parameter not works  
> - add new Items Notify JSON parameter `margin` - space between lines  
> - new UI elements - UI Buttons [Check Wiki for information](https://github.com/KageDesu/Alpha-ABS/wiki/UI-Buttons-JSON-Configuration)
> - added many new `uAPI Script calls` [Check WiKi](https://github.com/KageDesu/Alpha-ABS/wiki/Script--Calls-API)  

```diff
+ Only for PRO version
```

> - Custom UI Buttons


**990** - (18.11.2018)
> - fixed small issues
> - new UI elements customization system through JSON files
>> - now it works only with a new `Items Notify panel`, in the future it will be expanded for all UI elements
> - updated UI element `Items Notify panel`
>> - supports any items name length
>> - supports different styles (through JSON customization)
> - new feature: select nearest enemy as target (default key  `F`)  
> - fixed: select next target (`Q` key by default) now select targets by distance from nearest to farther

```diff
+ Only for PRO version
```
> - Text Font loader. `.ttf` fonts files in `fonts/` folder will be load in game automatically and can be used to customize UI elements with new customization system. **(Works only on PC or MAC)**

**980** - (28.10.2018)  
> - fixed many small issues
> - added API for script calls. [Check WiKi](https://github.com/KageDesu/Alpha-ABS/wiki/Script--Calls-API)  
> - updated feature **No Target System** - [Check Wiki for information](https://github.com/KageDesu/Alpha-ABS/wiki/No-Target-Weapons)
>> - `<noTarget>` works with  <ABS:1> weapons  
>> - `<pierce:X>` - X - limits of pierced enemies in a row  
>> - `<noTarget>` works with <ABS:1> skill types  
>> - now enemies can use too `<ABS:1> <noTarget>` skills
> - <ABS:1> skill type graphic now can be animated (use sprite sheet format image file) [Check WiKi](https://github.com/KageDesu/Alpha-ABS/wiki/How-set-animated--ABS:1--type-skill)


**965** - (17.10.2018)
> - fixed small issues
> - fixed bug: enemy no longer active after returning to spawn point (lost player)
> - fixed glitch: player can reload firearm when it is full loaded
> - new feature **Motion System** - [Check Wiki for information](https://github.com/KageDesu/Alpha-ABS/wiki/Motion-System)
> - updated feature **No Target System** - [Check Wiki for information](https://github.com/KageDesu/Alpha-ABS/wiki/No-Target-Weapons)


**955**  - (9.10.2018)
> - fixed issues with save and load game
> - fixed bug: repeated firearm reloading
> - fixed bug: firearm can be reloaded on non ABS map
> - fixed bug: control panel functions (like rotate, jump) work on non ABS map
> - fixed: game followers transparent glitch on ABS map
> - added firearm panel settings to plugin parameters  
> - new feature **No Target System** (_beta_) - you can create melee weapons that do not require a selected target to perform attack. Attacks perform on Attack button press (or on left mouse click on enemy)  
>> - new ABS parameter (only for weapons) `<noTarget:1>`  activate no target weapon mode when player equip this weapon  
![](https://github.com/KageDesu/TestRepo/blob/master/2018-10-09_19-37-11.png)

```diff
+ Only for PRO version
```
> - new feature `Mini HP bars` - display HP bars above enemies and allies on ABS map  
![](https://github.com/KageDesu/TestRepo/blob/master/2018-10-09_19-24-57.png)
>> - new plugin parameter `Show Mini HP Bars` - mini HP bar show mode
![](https://github.com/KageDesu/TestRepo/blob/master/2018-10-09_19-14-35.png)
>> - new plugin parameter `Mini Bars Settings` - for configurate mini HP bars
>> - new enemy ABS parameter `<showHP:1>` - for always display HP bar above enemy



**950** - (25.09.2018)
> - fixed major bug with AI and multithreading
> - fixed bug: invisible enemies will appears after transfer from ABS to ABS map
> - fixed bug: activated by command enemy don't fighting
> - fixed bug: in rare cases, the save game file did not want to load with erased ABS enemies on map
> - fixed bug: some skills and items sounds not playing
> - new feature `Firearms system` (https://youtu.be/ncW4RAWWggs)
>> - new ABS parameter (only for weapons) `<firearm:1>` - activate firearm system when player equip this weapon
>> - new plugin parameter for change keyboard key for firearm weapon magazine reload


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
