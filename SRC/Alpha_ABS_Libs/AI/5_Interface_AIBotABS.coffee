do ->
    #@[INTERFACE]
    Interface_AIBotABS =
        initABS: ->
        
        _deactivate: ->
            if AlphaABS.BattleManagerABS.getPlayerTarget() == this
                AlphaABS.BattleManagerABS.setPlayerTarget null
            @_absParams.active = false
            @_resetTarget()
            @_stateMachine.deactivate() if @_stateMachine?
            return
        
        _resetTarget: ->
            @_absParams.target = null
            @_absParams.inBattle = false
            @interruptCast()
            return
        
        _updateABS: ->

        _checkFloorEffect: ->
            @battler().executeFloorDamage() if $gameMap.isDamageFloor(@x, @y)
            return
        
        startCommonEvent: (commonEventId) ->

        clearTarget: -> @setTarget null

        setTarget: (target) ->
            if AlphaABS.BattleManagerABS.isValidTarget(target)
                @_absParams.target = target
                $gamePlayer.refreshBattleState() if target == $gamePlayer
            else
                @_resetTarget()
            return
        
        createNewHomePoint: -> @_absParams.myHomePosition = new AlphaABS.UTILS.PointX this.x, this.y

        refreshBehavior: ->
            @clearTarget()
            @changeStateToFree()

    AlphaABS.LIBS.Interface_AIBotABS = Interface_AIBotABS
    return