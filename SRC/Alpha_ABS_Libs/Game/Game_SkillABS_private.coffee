#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_SkillABS_private.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    #@[CLASS IMPL ONLY]
    #@[CLASS PART]

    #@[DEFINES]
    _S = Game_SkillABS

    _S::_playSoundAt  = (sound, point) ->
        return unless sound?
        _ = AlphaABS.LIBS.BattleManagerABS
        if point? and _ and _.isABSAudio()
            AudioManager.playSeAt sound, point
        else
            AudioManager.playSe sound
    
    _S::_onUseFirearm = ->
        @chargeStack -1
        @_onUseNormal()
        @preUse 0 unless @isNeedReloadStack()

        

    return
# ■ END Game_SkillABS_private.coffee
#---------------------------------------------------------------------------