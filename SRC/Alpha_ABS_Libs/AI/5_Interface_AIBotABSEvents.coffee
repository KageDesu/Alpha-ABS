do ->
    #@[INTERFACE]
    Interface_AIBotABSEvents =
        onTurnEnd: -> @battler().onTurnEnd() if @inBattle()

        onActionOnMe: (who) ->
            return unless @canFight()
            unless !@inBattle()
                @LOG.p 'I\'am attacked!!!'
                @changeStateToBattle who
            else
                @_performRageCalculation who if @canRage()

        _performRageCalculation: (who) ->
            result = @battler().result()
            if result.hpAffected and result.hpDamage > 0 and !result.drain
                @rageContainer().makeDamageBy result.hpDamage, who if who?
            @_selectNewTargetByRage()
            return
        
        _selectNewTargetByRage: ->
            candidate = @rageContainer().getHigherDealer()
            if candidate? and candidate != @target()
                @LOG.p 'New target ' + candidate.aiName
                @setTarget candidate #if in view range?
                #@requestBalloon 1 unless @behaviorModel().noEmote

        onGameSave: ->
            @_stateMachine.onGameSave() if @_stateMachine?

        onGameLoad: ->
            @LOG.p 'On Game Load'
            @_stateMachine.onGameLoad() if @_stateMachine?
            @battler().onGameLoad()
            return

        onSwitchToBattleState: -> @_onBattleStart()

        _onBattleStart: ->
            @requestBalloon 1 unless @behaviorModel().noEmote
            @battler().onBattleStart()
            @_absParams.inBattle = true
            @createNewHomePoint()
            @LOG.p 'Store home position: ' + @getHomePosition().toString() if @getHomePosition()?
            @startCommonEvent @behaviorModel().cEonStart
            @rageContainer().addDealer(@target()) if @canRage()
            return

        onReturnEnd: ->

        _onBattleEnd: ->
            @_absParams.inBattle = false
            @_absParams.allyToSearch = null
            @battler().onBattleEnd()
            @startCommonEvent @behaviorModel().cEonEnd
            @rageContainer().clear() if @canRage()
            @changeStateToFree()
            return

        onSwitchToFreeState: ->
            @LOG.p 'In free state'
            @clearTarget()
            return
        
        onSwitchToReturnState: ->

        onSwitchToSearchState: ->

        onSwitchToDeadState: ->

        onSwitchToStunState: ->
            @clearTarget()
            @stay()
            @LOG.p 'AI : I\'am stunned!'
            return

    AlphaABS.LIBS.Interface_AIBotABSEvents = Interface_AIBotABSEvents
    return