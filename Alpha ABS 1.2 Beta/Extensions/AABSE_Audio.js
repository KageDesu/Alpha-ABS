/*
 * Official Web Page
 * <https://kagedesuworkshop.blogspot.ru/p/alpha-abs.html>
 */

 //=============================================================================
 // Alpha_ABS_Extension_Audio
 //=============================================================================
 //Version 1.0 (22.07.2018)

 /*:
  * @author Pheonix KageDesu
  * @plugindesc 3D Audio for Alpha ABS
  * @help Extension for Alpha ABS. 
  * Require plugin Alpha ABS version 1.2 (900) and above
*/

(function () {

    let MIN_ABS_BUILD = 900;

    if (!Imported || !Imported.AlphaABS) {
        console.log("Audio extension : Alpha ABS plugin not found!");
        return;
    }

    if(AlphaABS.Build < MIN_ABS_BUILD) {
        console.log("Audio extension : update Alpha ABS for this extension!");
        return;
    }

    AlphaABS.SYSTEM.EXTENSIONS.AUDIO = true;

    var LOG = new KDCore.DevLog("EX_Audio");
    LOG.applyExtensionColors();
    var PointX = AlphaABS.UTILS.PointX;
    LOG.p("Inited");

    //WebAudio
    //------------------------------------------------------------------------------
    WebAudio._contextABS = null;

    WebAudio.updateListenerPosition = function (point) {
        WebAudio._contextABS.listener.setPosition(point.x, point.y, 0);
    };

    var _WebAudio_clear = WebAudio.prototype.clear;
    WebAudio.prototype.clear = function () {
        _WebAudio_clear.call(this);
        this._positionABS = null;
    };

    var _WebAudio_createContext = WebAudio._createContext;
    WebAudio._createContext = function () {
        WebAudio._contextABS = new(window.AudioContext || window.webkitAudioContext)();
        _WebAudio_createContext.call(this);
    };

    //NEW
    WebAudio.prototype.setPosition = function (point) {
        this._positionABS = point;
    };

    var _WebAudio_createNodes = WebAudio.prototype._createNodes;
    WebAudio.prototype._createNodes = function () {
        if (this._positionABS) {
            var context = WebAudio._contextABS;
            this._sourceNode = context.createBufferSource();
            this._sourceNode.buffer = this._buffer;
            this._sourceNode.loopStart = this._loopStart;
            this._sourceNode.loopEnd = this._loopStart + this._loopLength;
            this._sourceNode.playbackRate.value = this._pitch;
            this._gainNode = context.createGain();
            this._gainNode.gain.value = this._volume;
            this._pannerNode = context.createPanner();
            this._pannerNode = context.createPanner();
            this._pannerNode.refDistance = 20;
            this._pannerNode.maxDistance = 400;
            this._pannerNode.rolloffFactor = 0.2;
            try {
                this._pannerNode.setPosition(this._positionABS.x, this._positionABS.y, 0);
            } catch (e) {

            }
            this._sourceNode.connect(this._gainNode);
            this._gainNode.connect(this._pannerNode);
            this._pannerNode.connect(context.destination);
        } else {
            _WebAudio_createNodes.call(this);
        }
    };

    var _WebAudio_connectNodes = WebAudio.prototype._connectNodes;
    WebAudio.prototype._connectNodes = function () {
        if (!this._positionABS) {
            _WebAudio_connectNodes.call(this);
        }
    };
    //END WebAudio
    //------------------------------------------------------------------------------

    //AudioManager
    //------------------------------------------------------------------------------
    //NEW
    AudioManager.playSeAt = function (se, point) {
        //LOG.p("Play SE at pos " + point.toString());
        try {
            if (se.name && point) {
                this._seBuffers = this._seBuffers.filter(function (audio) {
                    return audio.isPlaying();
                });
                var buffer = this.createBuffer('se', se.name);
                this.updateSeParameters(buffer, se);
                buffer.setPosition(point);
                buffer.play(false);
                this._seBuffers.push(buffer);
            }
        } catch (e) {
            console.error(e);
        }
    };

    //NEW
    AudioManager.playSeLoopAt = function (se, point) {
        //LOG.p("Play LOOP SE at pos " + point.toString());
        try {
            if (se.name && point) {
                this._seBuffers = this._seBuffers.filter(function (audio) {
                    return audio.isPlaying();
                });
                var buffer = this.createBuffer('se', se.name);
                this.updateSeParameters(buffer, se);
                buffer.setPosition(point);
                buffer.play(true);
                this._seBuffers.push(buffer);
                return buffer;
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    };
    //END AudioManager
    //------------------------------------------------------------------------------

    //SoundManager
    //------------------------------------------------------------------------------
    //OVER
    SoundManager.playSystemSound = function (n, point) {
        if ($dataSystem) {
            if (point === undefined)
                AudioManager.playStaticSe($dataSystem.sounds[n]);
            else {
                if (point != null) {
                    AudioManager.playSeAt($dataSystem.sounds[n], point);
                }
            }
        }
    };

    SoundManager.playEnemyAttackAt = function (point) {
        this.playSystemSound(9, point);
    };

    SoundManager.playEnemyDamageAt = function (point) {
        this.playSystemSound(10, point);
    };

    SoundManager.playEnemyCollapseAt = function (point) {
        this.playSystemSound(11, point);
    };

    SoundManager.playBossCollapse1At = function (point) {
        this.playSystemSound(12, point);
    };

    SoundManager.playBossCollapse2At = function (point) {
        this.playSystemSound(13, point);
    };

    SoundManager.playActorDamageAt = function (point) {
        this.playSystemSound(14, point);
    };

    SoundManager.playActorCollapseAt = function (point) {
        this.playSystemSound(15, point);
    };

    SoundManager.playRecoveryAt = function (point) {
        this.playSystemSound(16, point);
    };

    SoundManager.playMissAt = function (point) {
        this.playSystemSound(17, point);
    };

    SoundManager.playEvasionAt = function (point) {
        this.playSystemSound(18, point);
    };

    //END SoundManager
    //------------------------------------------------------------------------------

    //Game_Player
    //------------------------------------------------------------------------------
    var _Game_Player_updateMove_AABSAE = Game_Player.prototype.updateMove;
    Game_Player.prototype.updateMove = function () {
        _Game_Player_updateMove_AABSAE.call(this);
        if (!this.isMoving()) {
            this._updateAudioABS();
        }
    };

    var _Game_Player_refresh = Game_Player.prototype.refresh;
    Game_Player.prototype.refresh = function () {
        _Game_Player_refresh.call(this);
        this._updateAudioABS();
    };

    //NEW
    Game_Player.prototype._updateAudioABS = function () {
        try {
            var t = new PointX(this._realX, this._realY).mapPointOnScreen();
            WebAudio.updateListenerPosition(t);
        } catch (e) {
            console.error(e);

        }
    };
    //END Game_Player
    //------------------------------------------------------------------------------

    //Sprite_Animation
    //------------------------------------------------------------------------------
    //OVER
    Sprite_Animation.prototype.processTimingData = function (timing) {
        var duration = timing.flashDuration * this._rate;
        switch (timing.flashScope) {
            case 1:
                this.startFlash(timing.flashColor, duration);
                break;
            case 2:
                this.startScreenFlash(timing.flashColor, duration);
                break;
            case 3:
                this.startHiding(duration);
                break;
        }
        if (!this._duplicated && timing.se) {
            var p = new PointX(this.x, this.y);
            p.convertToMap();
            AudioManager.playSeAt(timing.se, p.mapPointOnScreen());
        }
    };
    //END Sprite_Animation
    //------------------------------------------------------------------------------
})();