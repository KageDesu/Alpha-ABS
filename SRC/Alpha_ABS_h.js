/*
 * Official Web Page
 * <https://kagedesuworkshop.blogspot.ru/p/alpha-abs.html>
 *
 * License
 * Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * <https://creativecommons.org/licenses/by-nc-sa/4.0/>
 *
 * Copyright (c) 2018 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kagedesuworkshop.blogspot.ru/>
 *
 */

//=============================================================================
// Alpha_ABS
//=============================================================================
//Version 1.2 (26.05.2018)

/*:
 * @author Pheonix KageDesu
 * @plugindesc v1.2.944 The real-time action battle system
 * 
 * @help
 * Plugin supporters:
 *  - Donald Derrick
 *  - Ilya Chkoliar (https: //elushisgaming.club/)
 *  - Elindos Phar
 * 
 * @requiredAssets audio/se/Equip2
 * @requiredAssets audio/se/Coin
 * @requiredAssets audio/se/Magic3
 * @requiredAssets img/animations/StateDown1
 * 
 * @param Alpha ABS
 *
 *
 * @param Interface
 * @default --------------------
 *
 * @param UI_Visible
 * @text Show UI in game?
 * @parent Interface
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @param UI_Editor
 * @text Allow UI editor?
 * @parent Interface
 * @type boolean
 * @on Yes
 * @off No
 * @desc Allow UI edit in the game Options section?
 * @default true
 *
 * @param UI_Elements
 * @text Elements
 * @default --------------------
 * @parent Interface
 *
 * @param UIE_Player_Status
 * @parent UI_Elements
 * @default --------------------
 * @text Player status
 *
 * @param UIE_Player_Status_Settings
 * @parent UIE_Player_Status
 * @text Settings
 * @type struct<UIEPlayerStatus>
 * @default {"Position":"{\"X\":\"\",\"Y\":\"\"}","Visible":"true","Portrait":"true","In battle Icon":"","Mask":"","Level":"true","Background":""}
 *
 * @param UIE_Player_HP_Bar
 * @text HP Bar
 * @parent UIE_Player_Status
 * @type struct<UIEBar>
 * @default {"Font Name":"","Color":"{\"Color 1\":\"#FF0000\",\"Color 2\":\"#FFC1C1\"}","Background Color":"#000000","Visible":"true","Show value":"true"}
 *
 * @param UIE_Player_MP_Bar
 * @text MP Bar
 * @parent UIE_Player_Status
 * @type struct<UIEBar>
 * @default {"Font Name":"","Color":"{\"Color 1\":\"#8080FF\",\"Color 2\":\"\"}","Background Color":"#000000","Visible":"true","Show value":"true"}
 *
 * @param UIE_Player_TP_Bar
 * @text TP Bar
 * @parent UIE_Player_Status
 * @type struct<UIEBar>
 * @default {"Font Name":"","Color":"{\"Color 1\":\"#008040\",\"Color 2\":\"\"}","Background Color":"#000000","Visible":"true","Show value":"true"}
 *
 * @param UIE_Player_Target
 * @parent UI_Elements
 * @text Player Target
 * @type struct<UIEEnemyTarget>
 * @default {"Font Name":"","Visible":"true","Position":"{\"X\":\"250\",\"Y\":\"50\"}","Name":"true","HP_text":"%","HP Bar":"{\"Font Name\":\"\",\"Color\":\"{\\\"Color 1\\\":\\\"#FF0000\\\",\\\"Color 2\\\":\\\"\\\"}\",\"Background Color\":\"#000000\",\"Visible\":\"true\",\"Show value\":\"true\"}","Back_color":"#000000","Mask":"","Selected_Image":"","Selected_Color":"#FF0000"}
 *
 * @param UIE_Player_Skills
 * @parent UI_Elements
 * @text Spells panel
 * @type struct<UIEPlayerSpellPanel>
 * @default {"Visible":"true","Position":"{\"X\":\"\",\"Y\":\"\"}","Image":"","AutoHide":"true"}
 *
 * @param UIE_Player_HotBar
 * @parent UI_Elements
 * @text Control panel
 * @type struct<UIEPlayerHotBar>
 * @default {"Visible":"true","Position":"{\"X\":\"\",\"Y\":\"\"}","Orientation":"Vertical","Item1":"true","Item2":"true","Item3":"true","Item4":"true","Item5":"true"}
 *
 * @param UIE_Message_Bar
 * @parent UI_Elements
 * @text Messages panel
 * @type struct<UIEMessagePanel>
 * @default {"Visible":"true","Position":"{\"X\":\"\",\"Y\":\"\"}","Font Name":"","Text Color":"#FF0000"}
 *
 * @param UIE_Player_States
 * @parent UI_Elements
 * @text Player states
 * @type struct<UIEBasicElement>
 * @default {"Visible":"true","Position":"{\"X\":\"\",\"Y\":\"\"}"}
 *
 * @param UIE_ItemList
 * @parent UI_Elements
 * @text Items alerts
 * @type struct<UIEBasicElement>
 * @default {"Visible":"true","Position":"{\"X\":\"\",\"Y\":\"\"}"}
 *
 * @param UIE_Player_Cast
 * @parent UI_Elements
 * @text Player Cast bar
 * @type struct<UIEBasicElement>
 * @default {"Visible":"true","Position":"{\"X\":\"\",\"Y\":\"\"}"}
 *
 * @param UIE_ItemListGoldIconIndex
 * @parent UIE_ItemList
 * @text Items alerts gold icon
 * @type number
 * @default 314
 * @desc Icon index for Gold alert (when you pick up gold from enemies) (-1 - no icon)
 *
 * @param UIE_SpellSelectZoneImage
 * @parent UI_Elements
 * @text Spell zone image
 * @type file
 * @dir img/
 * @require 1
 * @desc image when you select spell hit zone on ground, 96 x 96 px, empty for default image
 *
 * @param UI_PlayerDamageColor
 * @parent UI_Elements
 * @text Player Damage Outline
 * @type string
 * @default #FF0000
 * @desc HEX value or empty
 *
 * @param Strings
 * @default --------------------
 *
 * @param Strings_Alerts
 * @parent Strings
 * @default --------------------
 * @text Alerts
 *
 * @param STRING_ALERT_NEEDTARGET
 * @parent Strings_Alerts
 * @type String
 * @text Need Target
 * @default Need target
 *
 * @param STRING_ALERT_TOFAR
 * @parent Strings_Alerts
 * @type String
 * @text Target too far
 * @default Target too far
 *
 * @param STRING_ALERT_INTERRUPT
 * @parent Strings_Alerts
 * @type String
 * @text Action interrupt
 * @default Action interrupt
 *
 * @param STRING_ALERT_NOAUTOA
 * @parent Strings_Alerts
 * @type String
 * @text Can't use attack
 * @default Can't use attack now
 *
 * @param STRING_ALERT_NOUSE
 * @parent Strings_Alerts
 * @type String
 * @text Can't use action
 * @default Can't use action now
 *
 * @param STRING_ALERT_NOCHARGES
 * @parent Strings_Alerts
 * @type String
 * @text No charges
 * @default Can't use, no charges
 *
 * @param STRING_ALERT_RECHARGE
 * @parent Strings_Alerts
 * @type String
 * @text Not ready
 * @default Action is not ready
 *
 * @param STRING_ALERT_CASTMOVE
 * @parent Strings_Alerts
 * @type String
 * @text On moving
 * @default Can't use while moving
 *
 * @param STRING_ALERT_NOINBATTLE
 * @parent Strings_Alerts
 * @type String
 * @text In battle
 * @default Need get out of the battle
 *
 * @param STRING_ALERT_NEWLEVEL
 * @parent Strings_Alerts
 * @type String
 * @text New level
 * @default Level up!
 *
 *
 *
 * @param Strings_Popup
 * @parent Strings
 * @default --------------------
 * @text Popup
 *
 * @param STRING_POPUP_EVADE
 * @parent Strings_Popup
 * @type String
 * @text Evade
 * @default Evade
 *
 * @param STRING_POPUP_MISS
 * @parent Strings_Popup
 * @type String
 * @text Miss
 * @default Miss
 *
 * @param STRING_POPUP_FAIL
 * @parent Strings_Popup
 * @type String
 * @text Fail
 * @default Fail
 *
 * @param STRING_POPUP_ABSORB
 * @parent Strings_Popup
 * @type String
 * @text Absorb
 * @default Absorb
 *
 * @param STRING_POPUP_IMMUNE
 * @parent Strings_Popup
 * @type String
 * @text Immune
 * @default Immune
 *
 * @param STRING_POPUP_WEAK
 * @parent Strings_Popup
 * @type String
 * @text Weak
 * @default Weak
 *
 * @param STRING_POPUP_SKILL
 * @parent Strings_Popup
 * @type String
 * @text Skill ready
 * @default Ready!
 *
 *
 *
 * @param Strings_Menu
 * @parent Strings
 * @default --------------------
 * @text Options menu
 *
 * @param STRING_MENU_UIVIS
 * @parent Strings_Menu
 * @type String
 * @text Show UI
 * @default Show UI
 *
 * @param STRING_MENU_UIPOS
 * @parent Strings_Menu
 * @type String
 * @text Edit UI
 * @default Edit UI
 *
 * @param STRING_MENU_KEYBIND
 * @parent Strings_Menu
 * @type String
 * @text Controls
 * @default Controls
 *
 *
 *
 * @param Strings_Keys
 * @parent Strings
 * @default --------------------
 * @text Key binding
 *
 * @param STRING_MENU_KB_KEY
 * @parent Strings_Keys
 * @type String
 * @text Press any key
 * @default Press any key
 *
 * @param STRING_MENU_KB_TAB
 * @parent Strings_Keys
 * @type String
 * @text Target select
 * @default Target select
 *
 * @param STRING_MENU_KB_SKILLS
 * @parent Strings_Keys
 * @type String
 * @text Skills panel
 * @default Skills panel
 *
 * @param STRING_MENU_KB_CONTRL
 * @parent Strings_Keys
 * @type String
 * @text Сontrol panel
 * @default Сontrol panel
 *
 * @param STRING_MENU_KB_WEAPON
 * @parent Strings_Keys
 * @type String
 * @text Weapon circle
 * @default Weapon circle
 *
 * @param STRING_MENU_KB_DEF
 * @parent Strings_Keys
 * @type String
 * @text Reset to default
 * @default Reset to default
 *
 * @param STRING_MENU_KB_BACK
 * @parent Strings_Keys
 * @type String
 * @text Back
 * @default Back
 *
 * @param STRING_MENU_KB_SLOT
 * @parent Strings_Keys
 * @type String
 * @text Item
 * @default Item
 *
 * @param STRING_MENU_KB_ATTACK
 * @parent Strings_Keys
 * @type String
 * @text Attack
 * @default Attack
 *
 * @param STRING_MENU_KB_FOLLOW
 * @parent Strings_Keys
 * @type String
 * @text Follow
 * @default Follow
 *
 * @param STRING_MENU_KB_JUMP
 * @parent Strings_Keys
 * @type String
 * @text Jump
 * @default Jump
 *
 * @param STRING_MENU_KB_ROTATE
 * @parent Strings_Keys
 * @type String
 * @text Rotate
 * @default Rotate
 *
 * @param STRING_MENU_KB_LEFT
 * @parent Strings_Keys
 * @type String
 * @text Left
 * @default Left
 *
 * @param STRING_MENU_KB_RIGHT
 * @parent Strings_Keys
 * @type String
 * @text Right
 * @default Right
 *
 * @param STRING_MENU_KB_BOTTOM
 * @parent Strings_Keys
 * @type String
 * @text Bottom
 * @default Bottom
 *
 * @param STRING_MENU_KB_TOP
 * @parent Strings_Keys
 * @type String
 * @text Top
 * @default Top
 *
 * @param STRING_MENU_KB_WEAP
 * @parent Strings_Keys
 * @type String
 * @text Weapons
 * @default Weapons
 *
 *
 *
 * @param Strings_SpellInfo
 * @parent Strings
 * @default --------------------
 * @text Spells
 *
 * @param STRING_SKILL_INFO_RADIUS
 * @parent Strings_SpellInfo
 * @type String
 * @text Radius
 * @default Radius:
 *
 * @param STRING_SKILL_INFO_RANGE
 * @parent Strings_SpellInfo
 * @type String
 * @text Range
 * @default Range:
 *
 * @param STRING_SKILL_INFO_RANGE2
 * @parent Strings_SpellInfo
 * @type String
 * @text Range
 * @default Range:
 *
 * @param STRING_SKILL_INFO_CAST
 * @parent Strings_SpellInfo
 * @type String
 * @text Cast
 * @default Cast:

 * @param STRING_SKILL_INFO_COOLDOWN
 * @parent Strings_SpellInfo
 * @type String
 * @text Cooldown
 * @default Cooldown:

 * @param STRING_SKILL_INFO_DESCRIPTION
 * @parent Strings_SpellInfo
 * @type String
 * @text Description
 * @default Description

 * @param STRING_SKILL_INFO_HAS
 * @parent Strings_SpellInfo
 * @type String
 * @text Has
 * @default Has:

 * @param STRING_SKILL_INFO_USE
 * @parent Strings_SpellInfo
 * @type String
 * @text Use
 * @default Use:

 * @param STRING_SKILL_INFO_CHARGES
 * @parent Strings_SpellInfo
 * @type String
 * @text Charges
 * @default Charges:

 * @param STRING_SKILL_INFO_RELOADCHR
 * @parent Strings_SpellInfo
 * @type String
 * @text Reload charges
 * @default Reload charges:

 * @param STRING_SKILL_INFO_ONTARGET
 * @parent Strings_SpellInfo
 * @type String
 * @text Need target
 * @default Need target

 * @param STRING_SKILL_INFO_ONUSER
 * @parent Strings_SpellInfo
 * @type String
 * @text On user
 * @default On user

 * @param STRING_SKILL_INFO_AREA
 * @parent Strings_SpellInfo
 * @type String
 * @text Area select
 * @default Area select

 * @param STRING_SKILL_INFO_CIRCLE
 * @parent Strings_SpellInfo
 * @type String
 * @text Around user
 * @default Around user

 * @param STRING_SKILL_INFO_ZONE
 * @parent Strings_SpellInfo
 * @type String
 * @text Zone
 * @default Zone

 * @param STRING_SKILL_INFO_SEC
 * @parent Strings_SpellInfo
 * @type String
 * @text In seconds
 * @default  sec.

 * @param STRING_SKILL_INFO_TARGET
 * @parent Strings_SpellInfo
 * @type String
 * @text Need target
 * @default <target>

 * @param STRING_SKILL_INFO_DAMAGE
 * @parent Strings_SpellInfo
 * @type String
 * @text Damage
 * @default Damage

 * @param STRING_SKILL_INFO_RECOVER
 * @parent Strings_SpellInfo
 * @type String
 * @text Recover
 * @default Recover

 * @param STRING_SKILL_INFO_DRAIN
 * @parent Strings_SpellInfo
 * @type String
 * @text Drain
 * @default Drain
 *
 * @param STRING_SKILL_INFO_MELEE
 * @parent Strings_SpellInfo
 * @type String
 * @text Melee
 * @default Melee
 *
 *
 *
 *
 *
 *
 * @param Enemies
 * @default --------------------
 *
 * @param Enemy Dead Switch
 * @parent Enemies
 * @type combo
 * @option A
 * @option B
 * @option C
 * @option D
 * @default B
 * @desc Event self switch to turn ON when enemy die
 *
 * @param Auto loot
 * @desc If this parameter true - enemies will looting automatically when die
 * @parent Enemies
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 *
 *
 *
 *
 *
 *
 * @param Animations
 * @default --------------------
 *
 * @param Revive Animation
 * @parent Animations
 * @type animation
 * @desc 0 - also default (45), -1 - no animation
 * @default 45
 *
 * @param Cast Animation
 * @parent Animations
 * @type animation
 * @desc 0 - default
 * @default 0
 *
 * @param Cast Animation SE
 * @parent Cast Animation
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 * @desc Use default cast animation SE sound ?
 *
 * @param Level Up Animation
 * @parent Animations
 * @type animation
 * @desc 0 - also default (49), -1 - no animation
 * @default 49
 *
 *
 *
 *
 *
 *
 *
 * @param Commons Settings
 * @default --------------------
 *
 * @param Game Over Map ID
 * @desc Map Id where you transfer if your character die (0 - GameOver screen, any ABS map - GameOver screen)
 * @parent Commons Settings
 * @type number
 * @min 0
 * @default 0
 *
 * @param Game Over Map Direction
 * @text Transfer character direction
 * @parent Game Over Map ID
 * @type select
 * @default down
 * @option top
 * @option left
 * @option right
 * @option down
 * 
 * @param Game Over Map Position
 * @parent Game Over Map ID
 * @type struct<UIEPosition>
 * @default {"X":"0","Y":"0"}
 * 
 * @param Game Over Common Event
 * @parent Game Over Map ID
 * @type number
 * @default 0
 * @min 0
 * @desc This common event will be called after player death (0 - no event)
 * 
 * @param Allow Transfrer
 * @desc Allows the transition between locations during the battle (on you risk)
 * @parent Commons Settings
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 *
 * @param Solid Regions
 * @desc Map region Id's for solid objects (walls, doors, etc), use comma to separate: 1,2,3,4
 * @parent Commons Settings
 * @type string
 * @default 0
 *
 * @param Party experience
 * @parent Commons Settings
 * @type combo
 * @option For each member
 * @option For party 
 * @option Share at all
 * @default For each member
 * @desc How experience will been given after enemy kill
 * 
 * @param Enemy Spawn Map Id
 * @desc The map ID of the map you are using to store spawnable enemy
 * @parent Commons Settings
 * @type number
 * @default 0
 * @min 0
 *
 * @param Controls
 * @default --------------------
 *
 * @param Controls_Key_tS
 * @parent Controls
 * @text Target Select Key
 * @type string
 * @default q
 *
 * @param Controls_Skills_panel
 * @parent Controls
 * @default --------------------
 * @text Skills panel
 *
 * @param Controls_Key_sp1
 * @parent Controls_Skills_panel
 * @text Spell 1
 * @type string
 * @default 1
 *
 * @param Controls_Key_sp2
 * @parent Controls_Skills_panel
 * @text Spell 2
 * @type string
 * @default 2
 *
 * @param Controls_Key_sp3
 * @parent Controls_Skills_panel
 * @text Spell 3
 * @type string
 * @default 3
 *
 * @param Controls_Key_sp4
 * @parent Controls_Skills_panel
 * @text Spell 4
 * @type string
 * @default 4
 *
 * @param Controls_Key_sp5
 * @parent Controls_Skills_panel
 * @text Spell 5
 * @type string
 * @default 5
 *
 * @param Controls_Key_sp6
 * @parent Controls_Skills_panel
 * @text Spell 6
 * @type string
 * @default 6
 *
 * @param Controls_Key_sp7
 * @parent Controls_Skills_panel
 * @text Spell 7
 * @type string
 * @default 7
 *
 * @param Controls_Key_sp8
 * @parent Controls_Skills_panel
 * @text Spell 8
 * @type string
 * @default 8
 *
 * @param Controls_Weapon_circle
 * @parent Controls
 * @default --------------------
 * @text Weapon circle
 *
 * @param Controls_Key_scW
 * @parent Controls_Weapon_circle
 * @text Top slot
 * @type string
 * @default w
 *
 * @param Controls_Key_scS
 * @parent Controls_Weapon_circle
 * @text Bottom slot
 * @type string
 * @default s
 *
 * @param Controls_Key_scD
 * @parent Controls_Weapon_circle
 * @text Right slot
 * @type string
 * @default d
 *
 * @param Controls_Key_scA
 * @parent Controls_Weapon_circle
 * @text Left slot
 * @type string
 * @default a
 *
 * @param Controls_Control_panel
 * @parent Controls
 * @default --------------------
 * @text Сontrol panel
 *
 *
 * @param Controls_Key_cpW
 * @parent Controls_Control_panel
 * @text Follow
 * @type string
 * @default w
 *
 * @param Controls_Key_cpA
 * @parent Controls_Control_panel
 * @text Attack
 * @type string
 * @default a
 *
 * @param Controls_Key_cpS
 * @parent Controls_Control_panel
 * @text Jump
 * @type string
 * @default s
 *
 * @param Controls_Key_cpD
 * @parent Controls_Control_panel
 * @text Rotate
 * @type string
 * @default d
 *
 * @param Controls_Key_cpE
 * @parent Controls_Control_panel
 * @text Weapons
 * @type string
 * @default e
 *
 * @param Controls_KeyAllowed_Follow
 * @text Enabled?
 * @parent Controls_Key_cpW
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @param Controls_KeyAllowed_Jump
 * @text Enabled?
 * @parent Controls_Key_cpS
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @param Controls_KeyAllowed_Rotate
 * @text Enabled?
 * @parent Controls_Key_cpD
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @param Controls_KeyAllowed_Weapons
 * @text Enabled?
 * @parent Controls_Key_cpE
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
*/
/*~struct~UIEPosition:
* @param X
* @type number
*
* @param Y
* @type number
*/
/*~struct~UIEGradient:
* @param Color 1
* @type string
* @desc HEX value
*
* @param Color 2
* @type string
* @desc HEX value
*/
/*~struct~UIEPlayerStatus:
* @param Position
* @type struct<UIEPosition>
*
* @param Visible
* @type boolean
* @on Yes
* @off No
*
* @param Portrait
* @type boolean
* @on Visible
* @off Hidden
*
* @param In battle Icon
* @type file
* @dir img/
* @require 1
* @desc empty for default image
*
* @param Mask
* @type file
* @dir img/
* @require 1
* @desc empty for default image
*
* @param Level
* @type boolean
* @on Visible
* @off Hidden
*
* @param Background
* @type file
* @dir img/
* @require 1
* @desc empty for default image
*
*/
/*~struct~UIEBar:
* @param Font Name
* @type string
*
* @param Color
* @type struct<UIEGradient>
*
* @param Background Color
* @type string
* @desc HEX value
*
* @param Visible
* @type boolean
* @on Yes
* @off No
*
* @param Show value
* @type boolean
* @on Visible
* @off Hidden
*/
/*~struct~UIEEnemyTarget:
* @param Font Name
* @type string
*
* @param Visible
* @type boolean
* @on Yes
* @off No
*
* @param Position
* @type struct<UIEPosition>
*
* @param Name
* @type boolean
* @on Show
* @off Not
* @desc Show name or not?
*
* @param HP_text
* @text Show HP in
* @type select
* @default %
* @option %
* @option Value
*
* @param HP Bar
* @type struct<UIEBar>
*
* @param Back_color
* @text Background Color
* @type string
* @desc HEX value or empty
*
* @param Mask
* @type file
* @dir img/
* @require 1
* @desc empty for default image
*
* @param Selected_Image
* @text Selected
* @type file
* @dir img/
* @require 1
* @desc empty for default image
*
* @param Selected_Color
* @parent Selected_Image
* @text Selected Color
* @type string
* @desc HEX value or empty
*/
/*~struct~UIEPlayerSpellPanel:
* @param Visible
* @type boolean
* @on Yes
* @off No
*
* @param Position
* @type struct<UIEPosition>
*
* @param Image
* @type file
* @dir img/
* @require 1
* @desc File or empty
*
* @param AutoHide
* @type boolean
* @on Yes
* @off No
* @desc Auto hide skill panel when actor has no skills
*/
/*~struct~UIEPlayerHotBar:
* @param Visible
* @type boolean
* @on Yes
* @off No
*
* @param Position
* @type struct<UIEPosition>
*
* @param Orientation
* @type select
* @default Vertical
* @option Vertical
* @option Horizontal
*
* @param Item1
* @text Attack
* @type boolean
* @on Visible
* @off Hidden
*
* @param Item2
* @text Follow
* @type boolean
* @on Visible
* @off Hidden
*
* @param Item3
* @text Jump
* @type boolean
* @on Visible
* @off Hidden
*
* @param Item4
* @text Rotate
* @type boolean
* @on Visible
* @off Hidden
*
* @param Item5
* @text Favorite Weapons
* @type boolean
* @on Visible
* @off Hidden
*/
/*~struct~UIEMessagePanel:
* @param Visible
* @type boolean
* @on Yes
* @off No
*
* @param Position
* @type struct<UIEPosition>
*
* @param Font Name
* @type string
*
* @param Text Color
* @type string
* @desc HEX value
*/
/*~struct~UIEBasicElement:
* @param Visible
* @type boolean
* @on Yes
* @off No
*
* @param Position
* @type struct<UIEPosition>
*/

