#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AIStateBattleParty.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class AIStateBattleParty extends AlphaABS.LIBS.AIStateBattle

        _setupMain: ->
            return true

        _updateMainLogic: ->
            @log @_actionState
            unless @_checkTarget()
                @_bot.changeStateToFree()
            else
                @_bot._makeActions()
                @_updateBattleStates()
            return

        _applyBattleActionState: ->

        _updateApproachState: ->
            "BOT MISSING".p() unless @_bot 
            @_bot.changeStateToReturn() if AlphaABS.LIBS.AILogicManager.inOutReturnRange @_bot

        _updatePrepareActionState: ->
            @_bot.checkActionCommonEvent()
            if  AlphaABS.LIBS.AILogicManager.canUseActionNow @_bot
                @_prepareActionForNow()
            else
                unless AlphaABS.LIBS.AILogicManager.inOutReturnRange @_bot
                    @changeActionStateTo "approach"

        _prepareActionForNow: ->
            if AlphaABS.LIBS.AILogicManager.inActionRange @_bot
                @changeActionStateTo "action"
            else
                @log "Target away to action, try approach"
                @changeActionStateTo "approach"

        _updateWaitState: ->
            @changeActionStateTo "approach"
            isAgressive = @_bot.behaviorModel().agressive
            if isAgressive
               @changeActionStateTo "approach"
            else
                if AlphaABS.LIBS.AILogicManager.targetInVisibleRange @_bot
                   @_checkPartyLeaderState()
                else
                    @_bot.changeStateToFree()
        
        #NEW
        _checkPartyLeaderState: ->
            return unless $gamePlayer.inActive()
            if $gamePlayer.inBattle()
                if @_bot.target() == $gamePlayer.target()
                    @changeActionStateTo "approach"
                    return
            @_bot.changeStateToReturn()

    AlphaABS.register AIStateBattleParty
    return
# ■ END AIStateBattleParty.coffee
#---------------------------------------------------------------------------
