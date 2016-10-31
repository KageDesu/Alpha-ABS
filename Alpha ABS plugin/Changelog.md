#Version 1.1  
##Builds:  
**500** - (31.10.2016)  
> - new plugin parameter: `Dash on ABS map`  
> - fixed bug: the description of the attack skill was blocked by a description of the weapon
> - fixed bug: Z and X key not working  
> - *test* support `YEP_SaveCore` plugin  
> - *test* support Yanfly `KeyboardConfig` plugin
> - added script call for bind weapon to slot `$gamePlayer.setFavWeapForce(weaponId, position)`  
![image](https://github.com/KageDesu/TestRepo/blob/master/build500_bind_weap_script.png)


**484** - (23.10.2016)
> - support `YEP_EquipCore` plugin *
> - support `YEP_ItemCore` plugin
> - the weapon slot is now visible on equipped weapon
![image](https://github.com/KageDesu/TestRepo/blob/master/build484_favWeapEquip.png)

**YEP plugins must be below Alpha_ABS plugin in Plugin Manager*

**458** - initial build (21.10.2016)  
> - supports deployment for web browsers  
> - new UI editing scene
> - UI: You can disable visibility for any UI element
> - UI: You can change orientation (horizontal or vertical) for the control panel element
> - new system "Favorite weapons". You can set up to 4 weapons in the quick access slots and change weapons during battle
> - added automatic smart description generator for all skills and weapons. If the skill (or weapon) using `b` in *damage formula*, final damage value will be calculate automatically when you select the target.
> - now you can change control keys
> - now player level is visible on UI
> - pathfinding algorithm optimization
> - fixed bug: it was impossible to use skills that have added by equipment
> - support `YEP_SmartJump` plugin
> - *a lot of small changes and fixes...*

 ***

#Version 1
##Builds:  
**300** - (19.09.2016)
> - minor improvements and fixes  
> - added ammo count indicator for weapons and skills    
> - new plugin parameter: `Gold icon index`  
> - new ABS params for skills: `<cEonStart:X>`, `<cEonUse:X>`  
> - new ABS params for enemies: `<cEonStart:X>`, `<cEonEnd:X>`, `<cEonDeath:X>`,`<noMove:Z>`, `<noEmote:Z>`  
> - *test* support `YEP_ClassChangeCore` plugin  
> - *test* support `YEP_EnhancedTP` plugin

**test support* - mean that plugin work, but not full tested out.  
Check [Build 300 features](https://github.com/KageDesu/Alpha-ABS/blob/master/Alpha%20ABS%20plugin/Build%20300%20features.md) file for more info about new notetags.  

**208** - (16.09.2016)  
> fixed bug: crush when open 'Options' menu on Title screen  
> fixed bug: crush when add empty skill or item to the skills panel  
> new: `reloadParam` now supports calculation (hp, mp, tp, mhp, mmp, atk, def, mat, mdf, agi, luk, attackSpeed)  

**142** - (14.09.2016)  
> fixed bug: crush when you put non ABS item to the skills panel by mouse  
> added some sounds effects of assign items and skills to the skills panel  

**100** - (13.09.2016)
> fixed bug: enemy AI not approach player when wait attack  
> fixed bug: enemy AI with `escapeOnBattle:0` loosing player when it been out from `viewRadius`

**94** - initial build (10.09.2016)  
