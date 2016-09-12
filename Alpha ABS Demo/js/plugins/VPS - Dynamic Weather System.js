// ----------------------------------------------------------------------------------------
// VPS (Valhalla Engine Plugins System) - Dynamic Weather System
// Author: Soulpour777
// ----------------------------------------------------------------------------------------
/*:
* @plugindesc v1.0 An extended weather system for RMMV with different effects and behaviors.
* @author Soulpour777
*
@help
DYNAMIC WEATHER SYSTEM DOCUMENTATION SIMPLE
Author: Soulpour777

First of all, thanks for using this script. This is a 
simple documentation I could think of making for you to
use my plugin. First, let me teach you how to use the
plugin to work.

HOW TO CREATE AND CALL A WEATHER
To call the weather that you want, you need to use
the plugin command:

startWeather name power duration

where name stands for the type of the weather,
the power for its intensity and the duration for
the duration of the weather when shown.

I will give you an example:
startWeather light 1 1

This command will show up the "Light" weather,
under the power of 1 and the duration of 1. As
you may have already seen, it behaves very much
likely like the original Weather System that the
engine is using. But this is where it gets exciting,
because there's not only 3, but over 30+ variations with
30+ different behaviors as well. 

Here is the list of all the weather types you can do:

snowball
blowingsnowball
swirlingsnowball
blizzard
glitter
fire
ice
light
upwardlight
wing
meteor
fairydust
pollen
leaf
leafblade
greenrain
redrain
yellowrain
underwater
water
realisticstorm
fallingautumnleaves
blowingspringleaves
swirlspringleaves
fallingspringleaves
blowingautumnleaves
autumnleaf
flake
blowingflake
clover
blowingclover
sakura
blowingsakura

How to use them exactly? Just do call
them in a plugin command, for example:

startWeather realisticstorm 4 1

Make sure that the images needed is under the
img / weathers
file folder, or else everything will not work.

HOW TO STOP WEATHER

You can not stop the weather by the event
command from the Change Weather. You
have to use a plugin command:

stopWeather

for you to stop the weather.

The dimmer is an old feature from the
weather that let's the screen dim out
when a weather is strong. Normally,
all of them are disabled except in a realistic
storm weather. If you want them to be forcefully
active during the weather, use the plugin commands:

useDimmer
to use the Dimmer and
stopDimmer
to stop using the Dimmer.

HOW TO DO THE LIGHTNING TIMING PROPERLY

The lightning timing comes within duration and counter.
The duration allows you to determine the time before another
thunderclap and lightning is shown into your screen.
The counter is the Speed, while Duration is the whole
Max value reached, after that, resets itself and counts
again.

It is measured by:

value ---> milliseconds

So the lower the duration, the faster the thunder comes,
and vice versa.

SUPPORT

Q: I placed the plugin under my js / plugin folder,
I also placed the right images, but the plugin
does not work and gives me error. What happened?

A: you probably renamed my plugin. Please use:
VPS - Dynamic Weather System as the name of the
file.

Q: Some of the weathers are not showing, what 
could have went wrong?

A: You probably used "" on the type. Always
use no "" when calling types of weathers.

Q: I did, but it does not still work.
A: Go to Problem #1. If solved and plugin
error persists, consult me at my site
so we can work it out.

TERMS OF USE:

You are free to use this plugin for your NON-COMMERCIAL
GAMES. For Commercial and IGMC uses, please do contact
me.

Please credit me, Soulpour777 as the author of this 
plugin.

Please don't claim this plugin as your own. You are
free to distribute this to any site that I don't
know of, as long as I am still credit as the plugin
writer.

For more content, follow my site:
https://soulxregalia.wordpress.com/

* @param - WEATHER CUSTOMIZATION -
*
* @param AutumnLeafSpeedX
* @desc Autumn Leaf Speed Movement Ax value. (Horizontal Movement)
* @default 0
*
* @param AutumnLeafSpeedY
* @desc Autumn Leaf Speed Movement Ay value. (Vertical Movement)
* @default 1
*
* @param AutumnLeafOpacity
* @desc Autumn Leaf Opacity when created. (Created / Deleted)
* @default 1
*
* @param SakuraSpeedX
* @desc Sakura Speed Movement Ax value. (Horizontal Movement)
* @default 0
*
* @param SakuraSpeedY
* @desc Sakura Speed Movement Ay value. (Vertical Movement)
* @default 1
*
* @param SakuraOpacity
* @desc Sakura Opacity when created. (Created / Deleted)
* @default 1
*
* @param BlowingSakuraSpeedX
* @desc Blowing sakura speed (Horz Movement)
* @default 3
*
* @param BlowingSakuraSpeedY
* @desc Blowing sakura speed (Vert Movement)
* @default 3
*
* @param BlowingSakuraOpacity
* @desc Blowing sakura Opacity
* @default 1
*
* @param CloverSpeedX
* @desc Clover Speed Movement Ax value. (Horizontal Movement)
* @default 0
*
* @param CloverSpeedY
* @desc Clover Speed Movement Ay value. (Vert Movement)
* @default 1
*
* @param CloverOpacity
* @desc Clover Opacity
* @default 1
*
*
* @param BlowingCloverSpeedX
* @desc Blowing Clover Speed Movement Ax value. (Horizontal Movement)
* @default 3
*
* @param BlowingCloverSpeedY
* @desc Blowing Clover Speed Movement Ay value. (Vert Movement)
* @default 0
*
* @param BlowingCloverOpacity
* @desc Blowing Clover Opacity.
* @default 1
*
* @param BlowingAutumnSpeedX
* @desc Blowing Autumn Speed Movement Ax value. (Horizontal Movement)
* @default 10
*
* @param BlowingAutumnSpeedY
* @desc Blowing Autumn Speed Movement Ay value. (Vert Movement)
* @default 0
*
* @param BlowingAutumnOpacity
* @desc Blowing Autumn Opacity.
* @default 1
*
* @param -STORM CONTROL-
* 
* @param LightningDuration
* @desc The duration before another lightning flashes. (Value by numbers).
* @default 300000
* 
* @param LightningCounter
* @desc The speed of counting for another lightning flash. (Value by numbers).
* @default 10
* 
* @param ThunderclapAudio
* @desc The audio name of the SE you are going to use when you are using Realistic Storm.
* @default Thunder1
*
* @param ThunderclapVolume
* @desc The volume of the SE you are going to use when you are using Realistic Storm.
* @default 100
*
* @param ThunderclapPitch
* @desc The pitch of the SE you are going to use when you are using Realistic Storm.
* @default 100
*
* @param ThunderclapPan
* @desc The sound panning of the SE you are going to use when you are using Realistic Storm.
* @default 0
*
* @param -WEATHER RESOURCES-
*
* @param SnowballImage
* @desc Image name of your snowball weather image.
* @default snowball
*
* @param FlakeImage
* @desc Image name of your flake weather image.
* @default flake
*
* @param BlizzardImage
* @desc Image name of your realistic blizzard weather image.
* @default blizzard
*
* @param IceImage
* @desc Image name of your ice weather image.
* @default ice
*
* @param GlitterImage
* @desc Image name of your ice weather image.
* @default glitter
*
* @param FireImage
* @desc Image name of your fire weather image.
* @default fire
*
* @param LightImage
* @desc Image name of your light weather image.
* @default light
*
* @param MeteorImage
* @desc Image name of your meteor weather image.
* @default meteor
*
* @param LeafBladeImage
* @desc Image name of your leafblade weather image.
* @default leafblade
*
* @param PollenImage
* @desc Image name of your pollen weather image.
* @default pollen
*
* @param FairydustImage
* @desc Image name of your fairydust weather image.
* @default fairydust
*
* @param LeafImage
* @desc Image name of your leaf weather image.
* @default leaf
*
* @param AutumnLeafImage
* @desc Image name of your autumnleaf weather image.
* @default autumnleaf
*
* @param SpringLeafImage
* @desc Image name of your springleaf weather image.
* @default springleaf
*
* @param CloverImage
* @desc Image name of your clover weather image.
* @default clover
*
* @param SakuraImage
* @desc Image name of your sakura weather image.
* @default sakura
*
* @param FlakeImage
* @desc Image name of your flake weather image.
* @default flake
*
* @param BubbleImage
* @desc Image name of your underwater weather image.
* @default bubble
*
* @param WingImage
* @desc Image name of your wing weather image.
* @default wing
*
* @param WaterImage
* @desc Image name of your water weather image.
* @default water
*
*/

function VPS_DynamicWeatherSystem() {
        this.initialize.apply(this, arguments);
    }

(function(){
    var Soulpour777 = Soulpour777 || {};
    Soulpour777.params = PluginManager.parameters('VPS - Dynamic Weather System');

    Soulpour777.WeatherEffectsSystem = {
        structAction: {
            Game_Screen: {
                update: Game_Screen.prototype.update,
                clear: Game_Screen.prototype.clear,
            },
            Spriteset_Map:{
                createLowerLayer: Spriteset_Map.prototype.createLowerLayer,
                update: Spriteset_Map.prototype.update,
            },
            Game_System: {
                initialize: Game_System.prototype.initialize,
            }
        },

    };
    
    Soulpour777.WeatherEffectsSystem.flasduration = Number(Soulpour777.params['LightningDuration'] || 300000);
    Soulpour777.WeatherEffectsSystem.flashcounter = Number(Soulpour777.params['LightningCounter'] || 10);
    
    // custom
    Soulpour777.WeatherEffectsSystem.snowball = String(Soulpour777.params['SnowballImage'] || "snowball");
    Soulpour777.WeatherEffectsSystem.flake = String(Soulpour777.params['FlakeImage'] || "flake");
    Soulpour777.WeatherEffectsSystem.blizzard = String(Soulpour777.params['BlizzardImage'] || "blizzard");
    Soulpour777.WeatherEffectsSystem.ice = String(Soulpour777.params['IceImage'] || "ice");
    Soulpour777.WeatherEffectsSystem.glitter = String(Soulpour777.params['GlitterImage'] || "glitter");
    Soulpour777.WeatherEffectsSystem.fire = String(Soulpour777.params['FireImage'] || "fire");
    Soulpour777.WeatherEffectsSystem.light = String(Soulpour777.params['LightImage'] || "light");
    Soulpour777.WeatherEffectsSystem.meteor = String(Soulpour777.params['MeteorImage'] || "meteor");
    Soulpour777.WeatherEffectsSystem.leafblade = String(Soulpour777.params['LeafBladeImage'] || "leafblade");
    Soulpour777.WeatherEffectsSystem.pollen = String(Soulpour777.params['PollenImage'] || "pollen");
    Soulpour777.WeatherEffectsSystem.fairydust = String(Soulpour777.params['FairydustImage'] || "fairydust");
    Soulpour777.WeatherEffectsSystem.leaf = String(Soulpour777.params['LeafImage'] || "leaf");
    Soulpour777.WeatherEffectsSystem.autumnleaf = String(Soulpour777.params['AutumnLeafImage'] || "autumnleaf");
    Soulpour777.WeatherEffectsSystem.springleaf = String(Soulpour777.params['SpringLeafImage'] || "springleaf");
    Soulpour777.WeatherEffectsSystem.clover = String(Soulpour777.params['CloverImage'] || "clover");
    Soulpour777.WeatherEffectsSystem.sakura = String(Soulpour777.params['SakuraImage'] || "sakura");
    Soulpour777.WeatherEffectsSystem.flake = String(Soulpour777.params['FlakeImage'] || "flake");
    Soulpour777.WeatherEffectsSystem.bubble = String(Soulpour777.params['BubbleImage'] || "bubble");
    Soulpour777.WeatherEffectsSystem.wing = String(Soulpour777.params['WingImage'] || "wing");
    Soulpour777.WeatherEffectsSystem.water = String(Soulpour777.params['WaterImage'] || "water");
    // sakura config
    Soulpour777.WeatherEffectsSystem.sakuraMovementAx = Number(Soulpour777.params['SakuraSpeedX'] || 0);
    Soulpour777.WeatherEffectsSystem.sakuraMovementAy = Number(Soulpour777.params['SakuraSpeedY'] || 1);
    Soulpour777.WeatherEffectsSystem.sakuraMovementOpacity = Number(Soulpour777.params['SakuraSpeedOpacity'] || 1);
    // autumn leaf config
    Soulpour777.WeatherEffectsSystem.autumnLeafSpeedX = Number(Soulpour777.params['AutumnLeafSpeedX'] || 0);
    Soulpour777.WeatherEffectsSystem.autumnLeafSpeedY = Number(Soulpour777.params['AutumnLeafSpeedY'] || 1);
    Soulpour777.WeatherEffectsSystem.autumnLeafSpeedOpacity = Number(Soulpour777.params['AutumnLeafOpacity'] || 1);
    // blowing sakura config
    Soulpour777.WeatherEffectsSystem.BlowingSakuraSpeedX = Number(Soulpour777.params['BlowingSakuraSpeedX'] || 3);
    Soulpour777.WeatherEffectsSystem.BlowingSakuraSpeedY = Number(Soulpour777.params['BlowingSakuraSpeedY'] || 3);
    Soulpour777.WeatherEffectsSystem.BlowingSakuraSpeedOpacity = Number(Soulpour777.params['BlowingSakuraSpeedOpacity'] || 1);    
    // clover
    Soulpour777.WeatherEffectsSystem.cloverSpeedX = Number(Soulpour777.params['CloverSpeedX'] || 0);
    Soulpour777.WeatherEffectsSystem.cloverSpeedY = Number(Soulpour777.params['CloverSpeedY'] || 1);
    Soulpour777.WeatherEffectsSystem.cloverSpeedOpacity = Number(Soulpour777.params['CloverOpacity'] || 1);
    //
    
    Soulpour777.WeatherEffectsSystem.blowingCloverX = Number(Soulpour777.params['BlowingCloverSpeedX'] || 3);
    Soulpour777.WeatherEffectsSystem.blowingCloverY = Number(Soulpour777.params['BlowingCloverSpeedY'] || 0);
    Soulpour777.WeatherEffectsSystem.blowingCloverOpacity = Number(Soulpour777.params['BlowingCloverOpacity'] || 1);    
    // blowing autumn
    Soulpour777.WeatherEffectsSystem.blowingAutumnX = Number(Soulpour777.params['BlowingAutumnSpeedX'] || 10);
    Soulpour777.WeatherEffectsSystem.blowingAutumnY = Number(Soulpour777.params['BlowingAutumnSpeedY'] || 0);
    Soulpour777.WeatherEffectsSystem.blowingAutumnOpacity = Number(Soulpour777.params['BlowingAutumnOpacity'] || 1);
    //
    Soulpour777.WeatherEffectsSystem.thunderclapName = String(Soulpour777.params['ThunderclapAudio'] || "Thunder1");
    Soulpour777.WeatherEffectsSystem.thunderclapVolume = Number(Soulpour777.params['ThunderclapVolume'] || 100);
    Soulpour777.WeatherEffectsSystem.thunderclapPitch = Number(Soulpour777.params['ThunderclapPitch'] || 100);
    Soulpour777.WeatherEffectsSystem.thunderclapPan = Number(Soulpour777.params['ThunderclapPan'] || 0);
    
    Game_System.prototype.initialize = function() {
        Soulpour777.WeatherEffectsSystem.structAction.Game_System.initialize.call(this);
        this._weatherplusType = '';
        this._useDimmer = false;
    }
    

    ImageManager.loadDWSWeathers = function(filename, hue) {
        return this.loadBitmap('img/weathers/', filename, hue, true);
    };

	var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "startWeather") {
            $gameScreen.changeWeatherPlus(args[0], args[1], args[2]);
        }
        if (command === "stopWeather"){
            $gameScreen.changeWeatherPlus(null, 0,0);
            $gameSystem._useDimmer = false;
        }
        if (command === "useDimmer"){
            $gameSystem._useDimmer = true;
        }
        if (command === "stopDimmer") {
            $gameSystem._useDimmer = false;
        }
    };
    
    //function VPS_DynamicWeatherSystem() {
    //    this.initialize.apply(this, arguments);
    //}

    VPS_DynamicWeatherSystem.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    VPS_DynamicWeatherSystem.prototype.constructor = VPS_DynamicWeatherSystem;

    VPS_DynamicWeatherSystem.prototype.initialize = function() {
        PIXI.DisplayObjectContainer.call(this);

        this._width = Graphics.width;
        this._height = Graphics.height;
        this._sprites = [];
        this._flashCounter = 0;
        this._createBitmaps();
        this._createDimmer();

        this.type = 'none';

        this.power = 0;

        this.origin = new Point();
    };

    VPS_DynamicWeatherSystem.prototype.update = function() {
        if($gameSystem._useDimmer)this._updateDimmer();
        this._updateAllSprites();
    };

    VPS_DynamicWeatherSystem.prototype._createBitmaps = function() {
        // custom weather
        this._snowballBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.snowball);
        this._blizzardBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.blizzard);
        this._glitterBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.glitter);
        this._fireBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.fire);
        this._iceBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.ice);
        this._lightBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.light);
        this._meteorBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.meteor);
        this._fairydustBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.fairydust);
        this._pollenBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.pollen);
        this._leafBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.leaf);
        this._leafbladeBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.leafblade);
        // all about rain
        this._greenRainBitmap = new Bitmap(1, 60);
        this._greenRainBitmap.fillAll('green');   
        this._redRainBitmap = new Bitmap(1, 60);
        this._redRainBitmap.fillAll('red'); 
        this._yellowRainBitmap = new Bitmap(1, 60);
        this._yellowRainBitmap.fillAll('yellow');    
        this._realisticstormBitmap = new Bitmap(2, 100);
        this._realisticstormBitmap.fillAll('white');     
        // all about leaves
        this._fallingAutumnBitmap = new Bitmap(9, 9);
        this._fallingAutumnBitmap.drawCircle(4, 4, 4, 'orange');
        this._springleavesBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.springleaf);
        this._swirlingspringleavesBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.springleaf);
        this._fallingSpringLeavesBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.springleaf);
        this._autumnLeafSpriteBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.autumnleaf);
        this._cloverBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.clover);
        this._sakura = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.sakura);
        // custom snow
        this._flakeSpriteBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.flake);
        // underwater
        this._bubbleBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.bubble);
        // wing
        this._wingBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.wing);
        //
        this._waterBitmap = ImageManager.loadDWSWeathers(Soulpour777.WeatherEffectsSystem.water);
    };

    VPS_DynamicWeatherSystem.prototype._createDimmer = function() {
        this._dimmerSprite = new ScreenSprite();
        this._dimmerSprite.setColor(80, 80, 80);
        this.addChild(this._dimmerSprite);
    };

    VPS_DynamicWeatherSystem.prototype._updateDimmer = function() {
        this._dimmerSprite.opacity = Math.floor(this.power * 6);
    };

    VPS_DynamicWeatherSystem.prototype._updateAllSprites = function() {
        var maxSprites = Math.floor(this.power * 10);
        while (this._sprites.length < maxSprites) {
            this._addSprite();
        }
        while (this._sprites.length > maxSprites) {
            this._removeSprite();
        }
        this._sprites.forEach(function(sprite) {
            this._updateSprite(sprite);
            sprite.x = sprite.ax - this.origin.x;
            sprite.y = sprite.ay - this.origin.y;
        }, this);
    };


    VPS_DynamicWeatherSystem.prototype._addSprite = function() {
        var sprite = new Sprite(this.viewport);
        sprite.opacity = 0;
        this._sprites.push(sprite);
        this.addChild(sprite);
    };


    VPS_DynamicWeatherSystem.prototype._removeSprite = function() {
        this.removeChild(this._sprites.pop());
    };


    VPS_DynamicWeatherSystem.prototype._updateSprite = function(sprite) {
        switch (this.type) {
            case 'snowball':
                $gameSystem._useDimmer = false;
                this._updateSnowballSprite(sprite);
                break;
            case 'blowingsnowball':
                $gameSystem._useDimmer = false;
                this._updateblowingSnowballSprite(sprite);
                break; 
            case 'swirlingsnowball':
                $gameSystem._useDimmer = false;
                this._updateswirlingSnowballSprite(sprite);
                break;                  
            case 'blizzard':
                $gameSystem._useDimmer = false;
                this._updateBlizzardSprite(sprite);
                break;                  
            case 'glitter':
                $gameSystem._useDimmer = false;
                this._updateGlitterSprite(sprite);
                break;
            case 'fire':
                $gameSystem._useDimmer = false;
                this._updateFireSprite(sprite);
                break;
            case 'ice':
                $gameSystem._useDimmer = false;
                this._updateIceSprite(sprite);
                break;         
            case 'light':
                this._updateLightSprite(sprite);
                break; 
            case 'upwardlight':
                $gameSystem._useDimmer = false;
                this._updateUpwardLightSprite(sprite);
                break;     
            case 'wing':
                $gameSystem._useDimmer = false;
                this.updateWingSprite(sprite);
                break;                 
            case 'meteor':
                $gameSystem._useDimmer = false;
                this._updateMeteorSprite(sprite);
                break;     
            case 'fairydust':
                $gameSystem._useDimmer = false;
                this._updateDustSprite(sprite);
                break;      
            case 'pollen':
                $gameSystem._useDimmer = false;
                this._updatePollenSprite(sprite);
                break;          
            case 'leaf':
                $gameSystem._useDimmer = false;
                this._updateLeafSprite(sprite);
                break;    
            case 'leafblade':
                $gameSystem._useDimmer = false;
                this._updateLeafBladeSprite(sprite);
                break;   
            case 'greenrain':
                $gameSystem._useDimmer = true;
                this._updateGreenRainSprite(sprite);
                break;         
            case 'redrain':
                $gameSystem._useDimmer = true;
                this._updateRedRainSprite(sprite);
                break;   
            case 'underwater':
                this._updateBubble(sprite);
                break;     
            case 'water':
                this._updateWater(sprite);
                break;                  
            case 'yellowrain':
                $gameSystem._useDimmer = true;
                this._updateYellowRainSprite(sprite);
                break;
            case 'realisticstorm':
                $gameSystem._useDimmer = true;
                this._updateRealisticStormSprite(sprite);
                break;      
            case 'fallingautumnleaves':
                $gameSystem._useDimmer = false;
                this._updateAutumnLeavesSprite(sprite);
                break;                  
            case 'blowingspringleaves':
                $gameSystem._useDimmer = false;
                this._blowingSpringLeavesSprite(sprite);
                break;     
            case 'swirlspringleaves':
                $gameSystem._useDimmer = false;
                this.updateSwirl(sprite);
                break;    
            case 'fallingspringleaves':
                $gameSystem._useDimmer = false;
                this.updateFall(sprite);
                break;
            case 'blowingautumnleaves':
                $gameSystem._useDimmer = false;
                this.updateblowingautumn(sprite);
                break;                
            case 'autumnleaf':
                $gameSystem._useDimmer = false;
                this.updateAutumnLeaf(sprite);
                break;  
            case 'flake':
                $gameSystem._useDimmer = false;
                this._updateFlakeSprite(sprite);
                break; 
            case 'blowingflake':
                $gameSystem._useDimmer = false;
                this._updateblowingFlakeSprite(sprite);
                break;                 
            case 'clover':
                $gameSystem._useDimmer = false;
                this._updateCloverSprite(sprite);
                break;       
            case 'blowingclover':
                $gameSystem._useDimmer = false;
                this._updateblowingCloverSprite(sprite);
                break;                 
            case 'sakura':
                $gameSystem._useDimmer = false;
                this._updateSakuraSprite(sprite);
                break;            
            case 'blowingsakura':
                $gameSystem._useDimmer = false;
                this._updateBlowingSakuraSprite(sprite);
                break;                  
        }        
        if (sprite.opacity < 40) {
            this._rebornSprite(sprite);
        }
    };
    
    
    VPS_DynamicWeatherSystem.prototype.updateAutumnLeaf = function(sprite) {
        sprite.bitmap = this._autumnLeafSpriteBitmap;
        sprite.rotation = Math.PI / 13;
        sprite.ax -= Soulpour777.WeatherEffectsSystem.autumnLeafSpeedX;
        sprite.ay += Soulpour777.WeatherEffectsSystem.autumnLeafSpeedY;
        sprite.opacity -= Soulpour777.WeatherEffectsSystem.autumnLeafSpeedOpacity;
    };    
    
    VPS_DynamicWeatherSystem.prototype.updateWingSprite = function(sprite) {
        sprite.bitmap = this._wingBitmap;
        sprite.rotation = Math.PI / 13;
        sprite.ax -= Math.random() * (10 - 1) + 1;
        sprite.ay += Math.random() * (10 - 1) + 1;
        sprite.opacity -= 1;
    };     
    
    

    
    VPS_DynamicWeatherSystem.prototype._updateSakuraSprite = function(sprite) {
        sprite.bitmap = this._sakura;
        sprite.rotation = Math.PI / 13;
        sprite.ax -= Soulpour777.WeatherEffectsSystem.sakuraMovementAx;
        sprite.ay += Soulpour777.WeatherEffectsSystem.sakuraMovementAy;
        sprite.opacity -= Soulpour777.WeatherEffectsSystem.sakuraMovementOpacity;
    };   
    

    VPS_DynamicWeatherSystem.prototype._updateBlowingSakuraSprite = function(sprite) {
        sprite.bitmap = this._sakura;
        sprite.rotation = Math.PI / 13;
        sprite.ax -= Soulpour777.WeatherEffectsSystem.BlowingSakuraSpeedX;
        sprite.ay += Soulpour777.WeatherEffectsSystem.BlowingSakuraSpeedY;
        sprite.opacity -= Soulpour777.WeatherEffectsSystem.BlowingSakuraSpeedOpacity;
    };       
    

    
    VPS_DynamicWeatherSystem.prototype._updateCloverSprite = function(sprite) {
        sprite.bitmap = this._cloverBitmap;
        sprite.rotation = Math.PI / 13;
        sprite.ax -= Soulpour777.WeatherEffectsSystem.cloverSpeedX;
        sprite.ay += Soulpour777.WeatherEffectsSystem.cloverSpeedY;
        sprite.opacity -= Soulpour777.WeatherEffectsSystem.cloverSpeedOpacity;
    };      
    
    VPS_DynamicWeatherSystem.prototype._updateblowingCloverSprite = function(sprite) {
        sprite.bitmap = this._cloverBitmap;
        sprite.rotation = Math.PI / 13;
        sprite.ax -= Soulpour777.WeatherEffectsSystem.blowingCloverX;
        sprite.ay += Soulpour777.WeatherEffectsSystem.blowingCloverY;
        sprite.opacity -= Soulpour777.WeatherEffectsSystem.blowingCloverOpacity;
    };     
    
    

    
    VPS_DynamicWeatherSystem.prototype.updateblowingautumn = function(sprite) {
        sprite.bitmap = this._autumnLeafSpriteBitmap;
        sprite.rotation = Math.PI / 13;
        sprite.ax -= Soulpour777.WeatherEffectsSystem.blowingAutumnX;
        sprite.ay += Soulpour777.WeatherEffectsSystem.blowingAutumnY;
        sprite.opacity -= Soulpour777.WeatherEffectsSystem.blowingAutumnOpacity;
    };      

    VPS_DynamicWeatherSystem.prototype.updateSwirl = function(sprite) {
        sprite.bitmap = this._swirlingspringleavesBitmap;
        sprite.rotation = Math.PI / 13;
        sprite.ax -= Math.random() * (5 - 1) + 1;
        sprite.ay += Math.random() * (10 - 1) + 1;
        sprite.opacity -= 3;
    };  
    
    VPS_DynamicWeatherSystem.prototype._updateswirlingSnowballSprite = function(sprite) {
        sprite.bitmap = this._snowballBitmap;
        sprite.rotation = Math.PI / 13;
        sprite.ax -= Math.random() * (5 - 1) + 1;
        sprite.ay += Math.random() * (10 - 1) + 1;
        sprite.opacity -= 3;
    };      
    
    
    VPS_DynamicWeatherSystem.prototype.updateFall = function(sprite) {
        sprite.bitmap = this._fallingSpringLeavesBitmap;
        sprite.rotation = Math.PI / 13;
        sprite.ax -= 0;
        sprite.ay += Math.random() * (20 - 10) + 2;
        sprite.opacity -= 3;
    };     
    
    VPS_DynamicWeatherSystem.prototype._updateAutumnLeavesSprite = function(sprite) {
        sprite.bitmap = this._fallingAutumnBitmap;
        sprite.rotation = Math.PI / 13;
        sprite.ax -= 3 * Math.sin(sprite.rotation);
        sprite.ay += 3 * Math.cos(sprite.rotation);
        sprite.opacity -= 3;
    };    
    
    VPS_DynamicWeatherSystem.prototype._blowingSpringLeavesSprite = function(sprite) {
        sprite.bitmap = this._springleavesBitmap;
        sprite.ax -= 3;
        sprite.ay += 0;
        sprite.opacity -= 3;
    };        

    VPS_DynamicWeatherSystem.prototype._updateRealisticStormSprite = function(sprite) {
        sprite.bitmap = this._realisticstormBitmap;
        sprite.rotation = Math.PI / 8;
        sprite.ax -= 8 * Math.sin(sprite.rotation);
        sprite.ay += 8 * Math.cos(sprite.rotation);
        sprite.opacity -= 8;
        
        this.startflashCounter();
        
    };    
    
    
    // Green Rain 
    VPS_DynamicWeatherSystem.prototype._updateGreenRainSprite = function(sprite) {
        sprite.bitmap = this._greenRainBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 6 * Math.sin(sprite.rotation);
        sprite.ay += 6 * Math.cos(sprite.rotation);
        sprite.opacity -= 6;
        

        
    };
    
    VPS_DynamicWeatherSystem.prototype.startflashCounter = function() {
        if (this._flashCounter != Soulpour777.WeatherEffectsSystem.flasduration) {
            this._flashCounter += Soulpour777.WeatherEffectsSystem.flashcounter;
            console.log(this._flashCounter);
            if (this._flashCounter === Soulpour777.WeatherEffectsSystem.flasduration) {
                
                $gameScreen.startFlash([255, 255, 255, 150], 3);
                this.playThunderAdapter();
                this._flashCounter = 0;
            }
        } 
    }
    
    VPS_DynamicWeatherSystem.prototype.playThunderAdapter = function() {
        var sound = {
            name: Soulpour777.WeatherEffectsSystem.thunderclapName,
            volume: Soulpour777.WeatherEffectsSystem.thunderclapVolume,
            pitch: Soulpour777.WeatherEffectsSystem.thunderclapPitch,
            pan: Soulpour777.WeatherEffectsSystem.thunderclapPan
        }
        
        AudioManager.playSe(sound);
    }
    
    // Red Rain 
    VPS_DynamicWeatherSystem.prototype._updateRedRainSprite = function(sprite) {
        sprite.bitmap = this._redRainBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 6 * Math.sin(sprite.rotation);
        sprite.ay += 6 * Math.cos(sprite.rotation);
        sprite.opacity -= 6;
    };    
    
    // Green Rain 
    VPS_DynamicWeatherSystem.prototype._updateYellowRainSprite = function(sprite) {
        sprite.bitmap = this._yellowRainBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 6 * Math.sin(sprite.rotation);
        sprite.ay += 6 * Math.cos(sprite.rotation);
        sprite.opacity -= 6;
    };    
    
    // this weather allows you to do the same snow, but this, is more about the image more than its whole behavior.
    // if you are using this part, this means that you like snow being drawn pefectly rather than the ugly fill
    // that the default is using.
    VPS_DynamicWeatherSystem.prototype._updateSnowballSprite = function(sprite) {
        sprite.bitmap = this._snowballBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 6 * Math.sin(sprite.rotation);
        sprite.ay += 6 * Math.cos(sprite.rotation);
        sprite.opacity -= 6;
    };
    
    VPS_DynamicWeatherSystem.prototype._updateBubble = function(sprite) {
        sprite.bitmap = this._bubbleBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 0;
        sprite.ay -= 1;
        sprite.opacity -= 1;
    };  
    
    VPS_DynamicWeatherSystem.prototype._updateWater = function(sprite) {
        sprite.bitmap = this._waterBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 0;
        sprite.ay -= 1;
        sprite.opacity -= 1;
    };     
    
    VPS_DynamicWeatherSystem.prototype._updateFlakeSprite = function(sprite) {
        sprite.bitmap = this._flakeSpriteBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 6 * Math.sin(sprite.rotation);
        sprite.ay += 6 * Math.cos(sprite.rotation);
        sprite.opacity -= 6;
    };    
    VPS_DynamicWeatherSystem.prototype._updateblowingFlakeSprite = function(sprite) {
        sprite.bitmap = this._flakeSpriteBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 4;
        sprite.ay += 0;
        sprite.opacity -= 2;
    }; 
    VPS_DynamicWeatherSystem.prototype._updateblowingSnowballSprite = function(sprite) {
        sprite.bitmap = this._snowballBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 10;
        sprite.ay += 0;
        sprite.opacity -= 6;
    };    
    
    VPS_DynamicWeatherSystem.prototype._updateBlizzardSprite = function(sprite) {
        sprite.bitmap = this._blizzardBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 10;
        sprite.ay += 0;
        sprite.opacity -= 6;
    };    
    
    // who doesn't love glitters? this behavior allows you to do glitter weather effect.
    VPS_DynamicWeatherSystem.prototype._updateGlitterSprite = function(sprite) {
        sprite.bitmap = this._glitterBitmap;
        sprite.rotation = Math.PI / 16;
        var x = new Date().getTime()/1000;
        sprite.x = Math.sin(parseFloat(x)) * 100;
        sprite.y -= 1;
        
        sprite.opacity -= 1;
    };  
    
    // Creates fire for fire dungeons. If you like to make lava effects, this is the best sprite
    // effect
    VPS_DynamicWeatherSystem.prototype._updateFireSprite = function(sprite) {
        sprite.bitmap = this._fireBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 3 * Math.sin(sprite.rotation);
        sprite.ay += 3 * Math.cos(sprite.rotation);
        sprite.opacity -= 3;
    };
    
    /*
    * Perfect for Ice dungeons. 
    * Ya know, you perhaps like the snowy effect. Using this sprite, you can do just that.
    */
    VPS_DynamicWeatherSystem.prototype._updateIceSprite = function(sprite) {
        sprite.bitmap = this._iceBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 6 * Math.sin(sprite.rotation);
        sprite.ay += 6 * Math.cos(sprite.rotation);
        sprite.opacity -= 6;
    };
    
    /*
    * Light
    * For the bright places in Towns / dungeons.
    */
    VPS_DynamicWeatherSystem.prototype._updateLightSprite = function(sprite) {
        sprite.bitmap = this._lightBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 6 * Math.sin(sprite.rotation);
        sprite.ay += 6 * Math.cos(sprite.rotation);
        sprite.opacity -= 6;
    };
    
    VPS_DynamicWeatherSystem.prototype._updateUpwardLightSprite = function(sprite) {
        sprite.bitmap = this._lightBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 0;
        sprite.ay -= 2;
        sprite.opacity -= 1;
    };    
    
    /*
    * Meteor
    * For the end of the world.
    */
    VPS_DynamicWeatherSystem.prototype._updateMeteorSprite = function(sprite) {
        sprite.bitmap = this._meteorBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 4;
        sprite.ay += 2;
        sprite.opacity -= 6;
    };
    
    /*
    * Leafblade
    * More leaf style.
    */
    VPS_DynamicWeatherSystem.prototype._updateLeafBladeSprite = function(sprite) {
        sprite.bitmap = this._leafbladeBitmap;
        sprite.anchor.x = sprite.anchor.y = 0.05;
        sprite.rotation += 0.010 ;
        sprite.ax -= 6 * Math.sin(sprite.rotation);
        sprite.ay += 6 * Math.cos(sprite.rotation);
        sprite.opacity -= 6;
    };
    
    // Leaf
    VPS_DynamicWeatherSystem.prototype._updateLeafSprite = function(sprite) {
        sprite.bitmap = this._leafBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 6 * Math.sin(sprite.rotation);
        sprite.ay += 6 * Math.cos(sprite.rotation);
        sprite.opacity -= 6;
    };
    
    // Pollen
    VPS_DynamicWeatherSystem.prototype._updatePollenSprite = function(sprite) {
        sprite.bitmap = this._pollenBitmap;
        sprite.rotation = Math.PI / 20;
        sprite.ax -= 2 * Math.sin(sprite.rotation);
        sprite.ay += 2 * Math.cos(sprite.rotation);
        sprite.opacity -= 2;
    };    
    
    // Dust
    VPS_DynamicWeatherSystem.prototype._updateDustSprite = function(sprite) {
        sprite.bitmap = this._fairydustBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 3 * Math.sin(sprite.rotation);
        sprite.ay += 3 * Math.cos(sprite.rotation);
        sprite.opacity -= 3;
    };
    
    VPS_DynamicWeatherSystem.prototype._rebornSprite = function(sprite) {
        sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x;
        sprite.ay = Math.randomInt(Graphics.height + 200) - 200 + this.origin.y;
        sprite.opacity = 160 + Math.randomInt(60);
    };

    Spriteset_Map.prototype.createVPSWeatherEffectsSystem = function() {
        this._weatherPlus = new VPS_DynamicWeatherSystem();
        this.addChild(this._weatherPlus);
    };
    
    //aliased
    Spriteset_Map.prototype.update = function() {
        Soulpour777.WeatherEffectsSystem.structAction.Spriteset_Map.update.apply(this);
        this.updateVPSWeatherEffectsSystem();
    };
    
    //aliased
    Spriteset_Map.prototype.createLowerLayer = function() {
        Soulpour777.WeatherEffectsSystem.structAction.Spriteset_Map.createLowerLayer.apply(this);
        this.createVPSWeatherEffectsSystem();
    };

    Spriteset_Map.prototype.updateVPSWeatherEffectsSystem = function() {
        this._weatherPlus.type = $gameScreen.weatherTypePlus();
        this._weatherPlus.power = $gameScreen.weatherPowerPlus();
        this._weatherPlus.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
        this._weatherPlus.origin.y = $gameMap.displayY() * $gameMap.tileHeight();
    };

    Game_Screen.prototype.weatherTypePlus = function() {
        return this._weatherTypePlus;
    };

    Game_Screen.prototype.weatherPowerPlus = function() {
        return this._weatherPowerPlus;
    };

    Game_Screen.prototype.clearWeatherPlus = function() {
        this._weatherTypePlus = 'none';
        this._weatherPowerPlus = 0;
        this._weatherPowerTargetPlus = 0;
        this._weatherDurationPlus = 0;
    };

    Game_Screen.prototype.changeWeatherPlus = function(type, power, duration) {
        if (type !== 'none' || duration === 0) {
            this._weatherTypePlus = type;
        }
        this._weatherPowerTargetPlus = type === 'none' ? 0 : power;
        this._weatherDurationPlus = duration;
        if (duration === 0) {
            this._weatherPowerPlus = this._weatherPowerTargetPlus;
        }
    };

    // aliased
    Game_Screen.prototype.update = function() {
        Soulpour777.WeatherEffectsSystem.structAction.Game_Screen.update.call(this);
        this.updateWeatherPlus();
    };
    // aliased
    Game_Screen.prototype.clear = function() {
        Soulpour777.WeatherEffectsSystem.structAction.Game_Screen.clear.call(this);
        this.clearWeatherPlus();
    };    

    Game_Screen.prototype.updateWeatherPlus = function() {
        if (this._weatherDurationPlus > 0) {
            var d = this._weatherDurationPlus;
            var t = this._weatherPowerTargetPlus;
            this._weatherPowerPlus = (this._weatherPowerPlus * (d - 1) + t) / d;
            this._weatherDurationPlus--;
            if (this._weatherDurationPlus === 0 && this._weatherPowerTargetPlus === 0) {
                this._weatherTypePlus = 'none';
            }
        }
    };

})();