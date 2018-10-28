#╒═════════════════════════════════════════════════════════════════════════╛
# ■ ABSSkillLoader2.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    #@[CLASS PART]
    #@[CLASS IMPL ONLY]

    ABSSkillLoader.PARAMS = [
        'reloadParam',
        'pType',
        'img',
        'light',
        'castTimeFormula',
        'startSound',
        'motion',
        'reloadSound', # * LAST STRING PARAMETER, add above it new string parameters
        'vSpeed',
        'range',
        'reloadTime',
        'castTime',
        'needTarget',
        'radius',
        'castAnim',
        'lightSize'
        'stack',
        'stackTime',
        'directionFix',
        'ammo',
        'cEonUse',
        'cEonStart',
        'noDescription',
        'impulse',
        'ignoreObstacles',
        'impulseRandom',
        'repeatDelay',
        'firearm',
        'noTarget',
        'motionOffset',
        'swing',
        'pierce'
    ]

    ABSSkillLoader.PARTICLES = [
        'pData',
        'pMinSize',
        'pMaxSize',
        'pPower',
        'pLife',
        'pAlpha',
        'pCount'
    ]

    ABSSkillLoader.TEMPLATES = [
        { # * 0 -  INSTANCE
            range: 0,
            needTarget: true,
            castTime: 0,
            reloadTime: 0,
            reloadParam: null,
            directionFix: 0,
            noTarget: 0
        },
        { # * 1 - VECTOR
            range: 6,
            needTarget: true,
            castTime: 120,
            reloadTime: 0,
            reloadParam: null,
            pType: null,
            img: 'null',
            light: null,
            lightSize: 100,
            directionFix: 0,
            noTarget: 0
        },
        { # * 2 - RADIUS
            range: 6,
            needTarget: true,
            radius: 3,
            castTime: 0,
            reloadTime: 120,
            reloadParam: null,
            directionFix: 0,
            noTarget: 0
        },
        {   # * 3 - ZONE
            castTime: 0,
            needTarget: false,
            reloadTime: 120,
            reloadParam: null,
            directionFix: 0,
            noTarget: 0
        }
    ]
    return
# ■ END ABSSkillLoader2.coffee
#---------------------------------------------------------------------------