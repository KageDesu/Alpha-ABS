#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AIStateFree.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class AIStateFree extends AlphaABS.LIBS.AIStateBase

        _init: -> @_regenTimer = null

        _setupMain: ->
            try
                model = @_bot.behaviorModel()
                @canSearchAlly = model.canSearch
                @canRegenerateInFreeMode = model.regen
                @canEscapeInBattle = model.escapeOnBattle
                @active = @_bot.inActive()
                @battler = @_bot.battler()
                return true
            catch error
                console.error error
                return false

        _updateMainLogic: ->
            if @_bot.canFight() then @_updateWithFightLogic() else @_updateNoFightLogic()

        _updateWithFightLogic: () ->
            @_updateReturnToHome()
            @_regenerate()
            @_updateVision()
            return

        _updateReturnToHome: () ->
            if @_bot.getHomePosition()? && @active then @_returnToHome()

        _returnToHome: () -> @_bot.returnSlow()

        _regenerate: () ->
            if @canRegenerateInFreeMode
                @_createRegenTimer() unless @_regenTimer?
                @battler.regenerateAllonFree() if @_updateAndCheckRegenTimer()

        _createRegenTimer: () ->
            @_regenTimer = new Game_TimerABS()
            @_regenTimer.start 180

        _updateAndCheckRegenTimer: () ->
            @_regenTimer.update()
            if @_regenTimer.isReady()
                @_regenTimer.reset()
                return true
            else
                return false

        _updateVision: () ->
            target = AlphaABS.AILogicManager.getTargetsInRange @_bot
            if target? then @_onSeeTarget target else @_updateVisionForAlly()

        _onSeeTarget: (target) -> @_bot.changeStateToBattle target

        _updateVisionForAlly: () ->
            if @canSearchAlly
                ally = AlphaABS.AILogicManager.getAlliesInRange @_bot
                if ally? then @_onSeeAlly ally

        _onSeeAlly: (ally) -> @_bot.changeStateToSearch ally

        _updateNoFightLogic: () ->
           target = AlphaABS.AILogicManager.getTargetsInRange @_bot
           if target? then @_onSeeTargetInNoFightMode target else @_regenerate()

        _onSeeTargetInNoFightMode: (target) -> @_bot.runAwayFromTarget(target) if @canEscapeInBattle

        onStateStarted: () -> @_regenTimer?.reset()

    AlphaABS.register AIStateFree
    return
# ■ END AIStateFree.coffee
#---------------------------------------------------------------------------
