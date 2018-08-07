/*
 * Official Web Page
 * <https://kagedesuworkshop.blogspot.ru/p/alpha-abs.html>
 */

 //=============================================================================
 // Alpha_ABS_Extension_ParticleSystem
 //=============================================================================
 //Version 1.0 (22.07.2018)

 /*:
  * @author Pheonix KageDesu
  * @plugindesc Particle System for Alpha ABS
  * @help Extension for Alpha ABS. 
  * Require plugin Alpha ABS version 1.2 (900) and above
*/

(function () {
    "use strict";

    let MIN_ABS_BUILD = 900;

    if (!Imported || !Imported.AlphaABS) {
        console.log("Particle System : Alpha ABS plugin not found!");
        return;
    }

    if (AlphaABS.Build < MIN_ABS_BUILD) {
        console.log("Particle System : update Alpha ABS for this extension!");
        return;
    }

    AlphaABS.SYSTEM.EXTENSIONS.ABSPE = {};

    var LOG = new KDCore.DevLog("EX_ParticleSys");
    LOG.applyExtensionColors();
    LOG.p("Inited");

    var ABSPE = function () {};

    class Particle {
        constructor(x, y, w, h, rotation, xVel, yVel, lifeTime, sizeChange, color, imageName, startOpacity) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.rotation = rotation;
            this.xVel = xVel;
            this.yVel = yVel;
            this.lifeTime = lifeTime;
            this.sizeChange = sizeChange;
            this.color = color;
            this.sOpacity = startOpacity;

            this.image = null;
            if (imageName) {
                try {
                    this.image = ImageManager.loadPicture(imageName);
                } catch (e) {
                    console.error(e);
                    this.image = null;
                }
            }

            this.maxLife = lifeTime;
        }

        setDrawAtCenter() {
            this.centerDraw = true;
        }

        isAlive() {
            return (this.lifeTime > 0);
        }

        update() {
            this.lifeTime--;
        }

        advance() {
            this.x += this.xVel;
            this.y += this.yVel;
        }

        calcSize() {
            var w = this.width;
            var h = this.height;
            var t;

            switch (this.sizeChange) {
                case -1: //Decrease
                    t = (this.lifeTime / this.maxLife);
                    w = t * this.width;
                    h = t * this.height;
                    break;
                case 0: //No change
                    break;
                case 1: //Increase
                    t = (1 - (this.lifeTime / this.maxLife));
                    w = t * this.width;
                    h = t * this.height;
                    break;
            }
            return {
                width: w,
                height: h
            };
        }
    }

    class Emitter {
        constructor(x, y, limit, genericParticle) {
            this.x = x;
            this.y = y;
            this.limit = limit || 500;
            this.particles = [];
            this.work = false;
            this.generate = genericParticle;
            this.arg = null;
        }

        setOuterData(data) {
            this.arg = data;
        }

        update() {
            if (this.particles.length == this.limit)
                return;
            if (this.isWork()) {
                var d = this.limit - this.particles.length;
                var need = Math.ceil(d * 0.01);
                if (need > 0) {
                    var t = 0;
                    while (t < need) {
                        this.particles.push(this.generate(this.arg));
                        t++;
                    }
                }
            }
        }

        move(x, y) {
            if (x instanceof AlphaABS.UTILS.PointX) {
                this.move(x.x, x.y);
            } else {
                this.x = x;
                this.y = y;
            }
        }

        start() {
            this.work = true;
        }

        stop() {
            this.work = false;
        }

        clear() {
            this.particles = [];
        }

        isWork() {
            return (this.work == true);
        }
    }

    class ParticleEngine {
        constructor(bitmap) {
            this.bitmap = bitmap;
            this.context = bitmap.context;
            this.emitters = [];

            this.thread = setInterval(function () {
                this._update();
            }.bind(this), (16.666)); //1000 / 60
        }

        addEmitter(emit, start) {
            start = SDK.check(start, false);
            if (start) {
                emit.start();
            }
            this.emitters.push(emit);
        }

        renderParticle(particle, width, height) {
            try {
                var ctx = this.context;
                ctx.globalAlpha = particle.sOpacity;
                if (particle.rotation !== 0) {
                    ctx.save();
                    ctx.translate(particle.x, particle.y);
                    ctx.rotate(particle.rotation);
                    if (particle.image) {
                        ctx.drawImage(particle.image._canvas, -width / 2, -height / 2, width, height);
                    } else {
                        ctx.fillRect(-width / 2, -height / 2, width, height);
                    }
                    ctx.restore();
                } else {
                    if (particle.image) {
                        ctx.globalAlpha = 0.5;
                        if (!particle.centerDraw)
                            ctx.drawImage(particle.image._canvas, particle.x, particle.y, width, height);
                        else {
                            ctx.translate(particle.x, particle.y);
                            ctx.drawImage(particle.image._canvas, width / 2 * (-1), height / 2 * (-1), width, height);
                            ctx.translate((particle.x) * (-1), (particle.y) * (-1));
                        }
                        ctx.globalAlpha = 1;
                    } else {
                        ctx.fillRect(particle.x, particle.y, width, height);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }

        terminate() {
            this.bitmap.clear();
            clearInterval(this.thread);
        }

        //PRIVATE
        _update() {
            this.bitmap.clear();
            var count = this.emitters.length;
            var e = this.emitters;
            var w = 0;
            var h = 0;

            for (var i = count - 1; i >= 0; i--) {
                try {
                    e[i].update();
                    //Draw particles
                    var j = e[i].particles.length;
                    while (j--) {
                        var p = e[i].particles[j];
                        if (p.isAlive()) {
                            var size = p.calcSize();
                            w = size.width;
                            h = size.height;
                            if (p.image) {
                                this.context.globalAlpha = p.sOpacity * (p.lifeTime / p.maxLife);
                                this.renderParticle(p, w, h);
                            } else {
                                this.context.fillStyle = 'rgba(' + p.color.R + ',' + p.color.G + ',' + p.color.B + ', 1)';
                                this.context.globalAlpha = p.sOpacity * (p.lifeTime / p.maxLife);
                                this.renderParticle(p, w, h);
                            }
                            p.advance();
                            p.update();
                        } else { //DEAD
                            e[i].particles.splice(j, 1);
                        }
                    }
                } catch (er) {
                    console.error(er);
                }
            }
        }
    }

    ABSPE.init = function (bitmap) {
        return new ParticleEngine(bitmap);
    };

    ABSPE.initParticle = function (x, y, w, h, rotation, xVel, yVel, lifeTime, sizeChange, color, imageName, startOpacity) {
        return new Particle(x, y, w, h, rotation, xVel, yVel, lifeTime, sizeChange, color, imageName, startOpacity);
    };

    ABSPE.initEmitter = function (x, y, limit, genericParticle) {
        return new Emitter(x, y, limit, genericParticle);
    };

    var _Scene_Map_onMapLoaded_ABSPE = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function () {
        _Scene_Map_onMapLoaded_ABSPE.call(this);
        if ($gameMap.isABS()) {
            //Particle system
            try {
                if (AlphaABS.LIBS.BattleManagerABS.isABSParticleSystem()) {
                    var sprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
                    this._spriteset.addChildAtLayer(sprite, 1);
                    this._pEngine = ABSPE.init(sprite.bitmap);
                } else {
                    this._pEngine = null;
                }
            } catch (e) {
                console.error(e);
                this._pEngine = null;
            }
        }
    };

    //?[NEW]
    Game_SkillABS.prototype.initGenerator = function () {
        if (this.isVectorType()) {
            this.particleData = {};
            //TODO: Тут надо что-то додумать с частицами
            var particleStateBase = {
                "id": "particle_fire",
                "pData": "FireParticle",
                "pMinSize": 8,
                "pMaxSize": 24,
                "pPower": 3,
                "pLife": 64,
                "pAlpha": 1.0,
                "pCount": 200
            };

            for (var p in particleStateBase) { //Clone
                this.particleData[p] = particleStateBase[p];
            }
            if (this._particleParamsUser) {
                for (var p1 in this._particleParamsUser) {
                    this.particleData[p1] = this._particleParamsUser[p1];
                }
            }

            var generator = function (particleData) {
                var size = SDK.rand(particleData.pMinSize, particleData.pMaxSize);
                var color = Color.NONE;
                var image;
                if (particleData.pData.indexOf('#') == 0) {
                    color = Color.FromHex(particleData.pData);
                } else
                    image = particleData.pData;

                return ABSPE.initParticle(
                    this.x, //x (emitter x)
                    this.y, //y (emitter y)
                    size, //width
                    size, //height
                    0, //rotation
                    SDK.smartRand(particleData.pPower, particleData.pPower / 2, true), //xVelocity
                    SDK.smartRand(particleData.pPower, particleData.pPower / 2, true), //yVelocity
                    particleData.pLife, //life
                    -1, //size change (0 - noChange, 1 - larger with age, -1 - smaller with age)
                    color, //color
                    image, //imageName
                    particleData.pAlpha //startOpacity
                );
            };
            return generator;
        } else
            return null;
    };


    AlphaABS.SYSTEM.EXTENSIONS.ABSPE = ABSPE;
    AlphaABS.register(ABSPE);
})();
