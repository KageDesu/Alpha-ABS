#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AIStateFreeParty.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class AIStateFreeParty extends AlphaABS.LIBS.AIStateFree

        _init: -> #EMPTY

        _setupMain: ->
            try
                model = @_bot.behaviorModel()
                @canSearchAlly = model.canSearch
                @canEscapeInBattle = model.escapeOnBattle
                @active = @_bot.inActive()
                @battler = @_bot.battler()
                return true
            catch error
                console.error error
                return false

        _updateMainLogic: ->
            @_updateWithFightLogic()

        _updateWithFightLogic: () ->
            @_updateReturnToHome()
            @_updateVision()
            return

        _returnToHome: () -> @_bot.returnSlow()

        _updateVision: () ->
            target = AlphaABS.LIBS.AILogicManager.getTargetsInRange @_bot
            if target? then @_onSeeTarget target else @_updateVisionForAlly()

        _onSeeTarget: (target) ->
            if @_bot.behaviorModel().agressive
                @_bot.changeStateToBattle target
            else
                playerState = ($gamePlayer.inBattle() and $gamePlayer.target() == target)
                @_bot.changeStateToBattle target if playerState

        _updateVisionForAlly: () ->
            if @canSearchAlly
                ally = AlphaABS.LIBS.AILogicManager.getAlliesInRange @_bot
                if ally? then @_onSeeAlly ally

        _onSeeAlly: (ally) -> @_bot.changeStateToSearch ally if ally.inBattle()

    AlphaABS.register AIStateFreeParty
    return
# ■ END AIStateFreeParty.coffee
#---------------------------------------------------------------------------
