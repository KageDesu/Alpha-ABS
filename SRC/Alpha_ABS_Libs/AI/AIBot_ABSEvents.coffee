do ->
    Game_AIBot::onActionOnMe = (who) ->
        if !@inBattle() and @canFight()
            @LOG.p 'I\'am attacked!!!'
            @changeStateToBattle who
        if !@isAlive() and @inActive()
            try
                @gainExpProcess who
            catch e
                console.error e
            @loot() if AlphaABS.Parameters.get_AutoLootEnemiesState() == true
            @startCommonEvent @behaviorModel().cEonDeath
        if @inBattle() and @canFight()
            @_performRageCalculation who if @canRage()
        if @_checkCanShowByParameters()
            @showHpBarABS() unless @ABSParams().selected
            setTimeout (=>
                try
                    @hideHpBarABS() unless @ABSParams().selected == true
                catch

                ), 1000
        return

    Game_AIBot::gainExpProcess = (whoKill) ->
        return if whoKill.battler().isEnemy()
        exp = @battler().exp()
        if AlphaABS.Parameters.isLoaded()
            expMode = AlphaABS.Parameters.get_PartyExpMode()
            if expMode != 0
                $gameParty.gainExpForAllABS exp, expMode == 2
                return
        whoKill.battler().gainExp exp

    Game_AIBot::onReturnEnd = ->
        @_absParams.active = true
        @_onBattleEnd()
        @initABS()
        @showHpBarABS() if @isNeedHpBarShow()
        @refreshABSMotion()
        return

    Game_AIBot::onSwitchToFreeState = ->
        @LOG.p 'In free state'
        @clearTarget()
        @_restoreMoveData()
        @_moveSpeed += @battler().ABSParams().moveSpeedUpKoef
        return

    Game_AIBot::onSwitchToReturnState = ->
        #@_deactivate()
        if AlphaABS.BattleManagerABS.getPlayerTarget() == this
                AlphaABS.BattleManagerABS.setPlayerTarget null
        @_absParams.active = false
        @_resetTarget()
        @_stateMachine.deactivate() if @_stateMachine?
        @refreshABSMotion()
        @LOG.p 'Return to ' + @getHomePosition().toString()
        return

    Game_AIBot::onSwitchToSearchState = ->
        @_restoreMoveData()
        @LOG.p 'Curious! I\'am searching...'
        @requestBalloon 2 unless @behaviorModel().noEmote
        return

    Game_AIBot::onSwitchToDeadState = ->
        @_absParams.allyToSearch = null
        @_moveType = 0
        if @inABSMotion()
            @_absParams.absMotion.clearMotion()
            @_absParams.absMotion = null
        @_changeEventToDeadState()
        @refresh()
        @_deactivate()
        return

    return

