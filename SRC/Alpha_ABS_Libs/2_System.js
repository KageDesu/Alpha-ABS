/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ System.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

AlphaABS.SYSTEM = {};
var LOGW = new PLATFORM.DevLog("Alpha ABS");
LOGW.on();
LOGW.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));

(function ($) {
  $.EXTENSIONS = {};

  var SDK = PLATFORM.SDK;
  SDK.setConstant($, 'FRAMES_PER_SECOND', 60);
  SDK.setConstant($, 'FONT', 'VL-Gothic-Regular'); //TODO: ЭТО НАДО В ПАРАМЕТРЫ

  $.LOGW = LOGW;

  $.STRING_ALERT_NEEDTARGET = 'Need target';
  $.STRING_ALERT_TOFAR = 'Target too far';
  $.STRING_ALERT_INTERRUPT = 'Action interrupt';
  $.STRING_ALERT_NOAUTOA = "Can't use attack now";
  $.STRING_ALERT_NOUSE = "Can't use action now";
  $.STRING_ALERT_NOCHARGES = "Can't use, no charges";
  $.STRING_ALERT_RECHARGE = 'Action is not ready';
  $.STRING_ALERT_CASTMOVE = "Can't use while moving";
  $.STRING_ALERT_NOINBATTLE = "Need get out of the battle";
  $.STRING_ALERT_NEWLEVEL = "Level up!";

  $.STRING_POPUP_EVADE = 'Evade';
  $.STRING_POPUP_MISS = 'Miss';
  $.STRING_POPUP_FAIL = 'Fail';
  $.STRING_POPUP_ABSORB = 'Absorb';
  $.STRING_POPUP_IMMUNE = 'Immune';
  $.STRING_POPUP_WEAK = 'Weak';
  $.STRING_POPUP_SKILL = 'Ready!';

  $.STRING_MENU_UIVIS = 'Show UI';
  $.STRING_MENU_UIPOS = 'Edit UI';
  $.STRING_MENU_KEYBIND = 'Controls';

  $.STRING_MENU_KB_KEY = 'Press any key';
  $.STRING_MENU_KB_TAB = 'Target select';
  $.STRING_MENU_KB_SKILLS = 'Skills panel';
  $.STRING_MENU_KB_CONTRL = 'Сontrol panel';
  $.STRING_MENU_KB_WEAPON = 'Weapon circle';
  $.STRING_MENU_KB_DEF = 'Reset to default';
  $.STRING_MENU_KB_BACK = 'Back';
  $.STRING_MENU_KB_SLOT = 'Item';
  $.STRING_MENU_KB_ATTACK = 'Attack';
  $.STRING_MENU_KB_FOLLOW = 'Follow';
  $.STRING_MENU_KB_JUMP = 'Jump';
  $.STRING_MENU_KB_ROTATE = 'Rotate';
  $.STRING_MENU_KB_LEFT = 'Left';
  $.STRING_MENU_KB_RIGHT = 'Right';
  $.STRING_MENU_KB_BOTTOM = 'Bottom';
  $.STRING_MENU_KB_TOP = 'Top';
  $.STRING_MENU_KB_WEAP = 'Weapons';

  $.STRING_SKILL_INFO_RADIUS = 'Radius: ';
  $.STRING_SKILL_INFO_RANGE = 'Range: ';
  $.STRING_SKILL_INFO_RANGE2 = 'Range: ';
  $.STRING_SKILL_INFO_CAST = 'Cast: ';
  $.STRING_SKILL_INFO_COOLDOWN = 'Cooldown: ';
  $.STRING_SKILL_INFO_DESCRIPTION = 'Description';
  $.STRING_SKILL_INFO_HAS = 'Has: ';
  $.STRING_SKILL_INFO_USE = 'Use: ';
  $.STRING_SKILL_INFO_CHARGES = 'Charges: ';
  $.STRING_SKILL_INFO_RELOADCHR = 'Reload charges: ';
  $.STRING_SKILL_INFO_ONTARGET = 'Need target';
  $.STRING_SKILL_INFO_ONUSER = 'On user';
  $.STRING_SKILL_INFO_AREA = 'Area select';
  $.STRING_SKILL_INFO_CIRCLE = 'Around user';
  $.STRING_SKILL_INFO_ZONE = 'Zone';
  $.STRING_SKILL_INFO_SEC = ' sec.';
  $.STRING_SKILL_INFO_TARGET = '<target>';
  $.STRING_SKILL_INFO_DAMAGE = 'Damage ';
  $.STRING_SKILL_INFO_RECOVER = 'Recover ';
  $.STRING_SKILL_INFO_DRAIN = 'Drain ';
  $.STRING_SKILL_INFO_MELEE = 'Melee ';


  $.STRING_WARNING_COMMON = "This command can't be executed on ABS map";
  $.STRING_WARNING_COMMON2 = "This command can't be executed while player in battle!";
  $.STRING_WARNING_COMMON3 = "This command not suported with ABS!";

  $.STRING_WARNING_COMMAND129 = "You can't remove party leader from party on ABS map!";
  $.STRING_WARNING_COMMAND321 = "You can't change actor class on ABS map!";

  $.STRING_WARNING_SKILLWC = "Weapon don't support casting";
  $.STRING_WARNING_SKILLOC = "Support only 'Battle Screen' items!";
  $.STRING_WARNING_SKILLWVR = "Weapon can't support Vector with radius";


  $.STRING_ERROR_SKILLNAN = "You need setup you project for Alpha ABS!"; //TODO: Добавить ссылку на инструкцию как это делать
  $.STRING_ERROR_OLDDATA = "Your project use old RPG Maker MV core files (js/), update files to 1.6.0 or above";

})(AlphaABS.SYSTEM);

// ■ END System.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////