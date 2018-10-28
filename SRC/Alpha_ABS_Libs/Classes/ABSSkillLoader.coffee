#╒═════════════════════════════════════════════════════════════════════════╛
# ■ ABSSkillLoader.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

#@[GLOBAL DEFINITION]
ABSSkillLoader = -> new Error('Static class')

do ->
    #@[CLASS HEADER PART]
    
    # * Определяет стандартные значения из шаблонов
    ABSSkillLoader.loadBaseParams = (_) ->
        template = ABSSkillLoader.TEMPLATES[_.type]
        ABSSkillLoader.PARAMS.forEach (p) ->
            if template[p]? then _[p] = template[p] else _[p] = 0
        _.reloadParam = null
        _.castTimeFormula = null
        return

    # * Параметры из редактора MV
    ABSSkillLoader.loadUserParams = (_) ->
        try
            item = _.skill()
            _.castTime = item.speed
            _.range = 0 if _.range is 1
            _.needTarget = no
            _.needTarget = yes if [1, 3, 4, 5, 6].contains item.scope
        catch e
            AlphaABS.error e, 'load user parameters for ABS skill'
        return

    # * Параметры из Note
    ABSSkillLoader.loadSelfMetaParams = (_) -> ABSSkillLoader.loadMetaParams _, _.skill().meta

    ABSSkillLoader.loadMetaParams = (_, metaData) ->
        i = 0
        strings = ABSSkillLoader._strParamsCount()
        while i < ABSSkillLoader.PARAMS.length
            try
                p = ABSSkillLoader.PARAMS[i]
                continue unless metaData[p]?
                if i < strings
                    _[p] = metaData[p]
                else
                    _[p] = parseInt metaData[p]
            catch e
                AlphaABS.error e, 'loading ABS parameter from Note'
            finally
                i++
        ABSSkillLoader.loadParticleParams(_, metaData) if _.isVectorType()
        return

    # * Параметры из Note системы частиц
    ABSSkillLoader.loadParticleParams = (_, metaData) ->
        particleParamsUser = {}
        count = 0
        ABSSkillLoader.PARTICLES.forEach (p) ->
            return unless metaData[p]?
            count++
            try
                if p == ABSSkillLoader.PARTICLES[0] # * pData is the String
                    particleParamsUser[p] = metaData[p]
                else
                    particleParamsUser[p] = parseInt metaData[p]
            catch e
                AlphaABS.error e, 'while loading particle data from skill Note'

        _._particleParamsUser = particleParamsUser if count isnt 0
        return

    # * Проверяет и преобразует параметры
    ABSSkillLoader.checkParams = (_) ->
        ABSSkillLoader._checkByType _
        ABSSkillLoader._checkNoTarget _
        ABSSkillLoader._checkFirearm _
        ABSSkillLoader._checkStack _
        ABSSkillLoader._convertParams _
        ABSSkillLoader._checkFormulas _
        return

    AlphaABS.register ABSSkillLoader
    return
# ■ END ABSSkillLoader.coffee
#---------------------------------------------------------------------------