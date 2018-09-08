#╒═════════════════════════════════════════════════════════════════════════╛
# ■ ABSSkillLoader3.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    #@[CLASS PART]
    #@[CLASS IMPL ONLY]

    ABSSkillLoader._strParamsCount = -> ABSSkillLoader.PARAMS.indexOf('reloadSound') + 1

    ABSSkillLoader._checkByType = (_) ->
        ABSSkillLoader._checkVector _ if _.type is 1
        ABSSkillLoader._checkRadius _ if _.type is 2

    ABSSkillLoader._checkVector = (_) ->
        _.img = 'null' if !_.img? or _.img is ""
        _.pType = null if !_.pType? or _.pType is '0' or _.pType is 'null' or _.pType is ""
        _.light = null if !_.light? or _.light is '0' or _.light is 'null' or _.light is ""
        
        _.range = ABSSkillLoader.TEMPLATES[1].range if _.range is 0
        if _.radius > 0
            _.needTarget = no
            if _.radius > 5
                _.radius = 5
                LOGW.p(_.skill().name + " spell Radius must be <= 5. Changed to 5!")
        else
            _.needTarget = ABSSkillLoader.TEMPLATES[1].needTarget
        return

    ABSSkillLoader._checkRadius = (_) ->
        _.radius = ABSSkillLoader.TEMPLATES[2].radius if _.radius is 0
        if _.radius > 5
            _.radius = 5
            LOGW.p(_.skill().name + " spell Radius must be <= 5. Changed to 5!")
        if _.needTarget
            _.range = ABSSkillLoader.TEMPLATES[2].range if _.range is 0
        return

    ABSSkillLoader._checkStack = (_) ->

    ABSSkillLoader._convertParams = (_) ->
        _.directionFix = true if _.directionFix > 0
        _.noDescription = true if _.noDescription > 0
        _.startSound = ABSSkillLoader._convertSound(_.startSound) if _.startSound
        _.reloadSound = ABSSkillLoader._convertSound(_.reloadSound) if _.reloadSound
        return

    ABSSkillLoader._convertSound = (sound) ->
        {
            name: sound,
            pan: 0,
            pitch: 100,
            valume: 100
        }

    ABSSkillLoader._checkFormulas = (_) ->

    ABSSkillLoader._convertFormula = (_f) ->
        formula = _f.replace(/attackSpeed/i, 'this.attackSpeed()')
        formula = formula.replace(/hp/i, 'this.hp')
        formula = formula.replace(/mp/i, 'this.mp')
        formula = formula.replace(/tp/i, 'this.tp')
        formula = formula.replace(/mhp/i, 'this.mhp')
        formula = formula.replace(/mmp/i, 'this.mmp')
        formula = formula.replace(/atk/i, 'this.atk')
        formula = formula.replace(/def/i, 'this.def')
        formula = formula.replace(/mat/i, 'this.mat')
        formula = formula.replace(/mdf/i, 'this.mdf')
        formula = formula.replace(/agi/i, 'this.agi')
        formula = formula.replace(/luk/i, 'this.luk')
        formula

    return
# ■ END ABSSkillLoader3.coffee
#---------------------------------------------------------------------------