### Build 300 features:
**New plugin parameter** : `Gold icon index` - allow you change icon index for gold when
you looting enemies.

![image](https://dl.dropboxusercontent.com/u/88841876/2016-09-19_22-52-03.png)

**New ABS params (*notetags*) for skills**:
- `<cEonStart:X>` - call CommonEvent with id X when trigger the skill.
- `<cEonUse:X>` - call CommonEvent with id X when using the skill.

**New ABS params (*notetags*) for enemies**:
- `<cEonStart:X>` - call CommonEvent with id X when the enemy start fight (saw you).
- `<cEonEnd:X>` - call CommonEvent with id X when the enemy end fight (lost sight of you).
- `<cEonDeath:X>` - call CommonEvent with id X when the enemy die.
- `<noMove:Z>` - if 1 - the enemy cannot move while in battle. *(default 0)*
- `<noEmote:Z>` - if 1 - emoticons will not appear over the enemy. *(default 0)*

**300** - (19.09.2016)
> - minor improvements and fixes  
> - add ammo count indicator for weapons and skills    
> - new plugin parameter: `Gold icon index`  
> - new ABS params for skills: `<cEonStart:X>`, `<cEonUse:X>`  
> - new ABS params for enemies: `<cEonStart:X>`, `<cEonEnd:X>`, `<cEonDeath:X>`,`<noMove:Z>`, `<noEmote:Z>`  
> - *test* support `YEP_ClassChangeCore` plugin  
> - *test* support `YEP_EnhancedTP` plugin

**test support* - mean that plugin work, but not full tested out.  
Check [Build 300 features]() file for more info about new notetags.
