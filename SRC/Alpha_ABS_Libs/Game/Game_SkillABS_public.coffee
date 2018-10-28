#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_SkillABS_public.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    #@[CLASS PART]

    #@[DEFINES]
    _S = Game_SkillABS

    _S::hasError = -> @_hasError is true
    _S::hasParticle = -> @isVectorType() and @pType isnt null
    _S::hasLight = -> @isVectorType() and @light isnt null

    _S::isItem = -> @_isItem is true
    _S::isReady = -> @timer.isReady()
    _S::isNeedReloadParam = -> @reloadParam isnt null
    _S::isDirectionFix = -> @directionFix is true
    _S::isNeedTarget = -> @needTarget is true
    _S::isNeedCast = -> @castTime isnt 0 || @castTimeFormula isnt null
    _S::isVectorType = -> @type is 1
    _S::isVectorTypeR = -> @isVectorType() and @radius > 0 and !@isNeedTarget()
    _S::isZoneType = -> @type is 3
    _S::isRadiusType = -> @type is 2
    _S::isCasting = -> @_startCast is true
    _S::isNeedAmmo = -> @ammo > 0
    _S::isHasImpulse = -> @impulse isnt 0
    _S::isRandomImpulseDirecton = -> @impulseRandom isnt 0
    _S::isIgnoreObstacles = -> @ignoreObstacles isnt 0
    _S::isNoTarget = -> @noTarget is 1
    _S::isHasMotion = -> @motion isnt null and @motion isnt "" and @motion isnt 0
    _S::isSimpleNoTarget = -> @isNoTarget() and !@isSwing() and !@isPierce()
    _S::isSwing = -> @swing > 0 and @isNoTarget()
    _S::isPierce = -> @pierce > 0 and @isNoTarget()

    _S::isFirearm = -> @firearm is 1
    _S::isStackType = -> @stackTime > 0
    _S::isAutoReloadStack = -> @isStackType() and !@isFirearm()
    _S::isNeedReloadStack = -> @isStackType() and @_stackNeedReload is true

    _S::getReloadTime = -> @reloadTimeA
    _S::skill = -> if @isItem() then $dataItems[@skillId] else $dataSkills[@skillId]
    _S::name = -> @skill().name

    return
# ■ END Game_SkillABS_public.coffee
#---------------------------------------------------------------------------