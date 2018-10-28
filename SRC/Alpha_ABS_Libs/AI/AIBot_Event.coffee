do ->
    Game_AIBot::start = ->
        if @inActive() and this != AlphaABS.BattleManagerABS.getPlayerTarget()
            AlphaABS.BattleManagerABS.setPlayerTarget this
            @LOG.p 'Selected ' + @event().name
        Game_Event::start.call this
        return

    Game_AIBot::update = ->
        isMoving = @isMoving()
        Game_Event::update.call this
        @_updateNonmoving isMoving unless @isMoving()
        @_updateABS()
        @_updateRevive()
        return

    Game_AIBot::_checkActiveState = ->
        try
            return if @isErased()
            list = @list()
            i = 0
            while i < list.length
                item = list[i]
                comment = ""
                comment = item.parameters[0] if item.code == 108
                if comment.indexOf('<noActive') >= 0
                    regex = /<noActive\s?:\s?(.+?)>/
                    match = regex.exec(comment)
                    if match && SDK.checkSwitch match[1]
                        @_absParams.activateSwitch = match[1]
                        return false
                i++
        catch e
            AlphaABS.error e, ' while checking active state'
        true

    Game_AIBot::_checkDieSwitch = ->
        key = [
            $gameMap.mapId()
            @eventId()
            AlphaABS.Parameters.get_EnemyDeadSwitch()
        ]
        if $gameSelfSwitches.value(key) == true
            if @behaviorModel().reviveTime == 0
                @_deactivate()
                @_restoreDeadData()
            else
                $gameSelfSwitches.setValue key, false
        return

    Game_AIBot::_restoreDeadData = ->
        try
            data = $gamePlayer.getABSMapData $gameMap.mapId(), @eventId()
            return unless data?
            "RESTORE DATA FOR".p(@eventId())
            @locate(data.x, data.y)
            @_absParams.looted = data.isLooted
        catch e
            console.error e

    Game_AIBot::list = ->
        if @_absParams.reservedCommonEvent?
            temp = @_absParams.reservedCommonEvent
            @_absParams.reservedCommonEvent = null
            return temp
        else
            Game_Event::list.call this

    _alias_Game_Event_updateSelfMovement = Game_Event::updateSelfMovement
    Game_AIBot::updateSelfMovement = ->
        if @inBattle()
            if !@_locked and @isNearTheScreen() and @checkStop(@stopCountThreshold())
                if @_moveType == 7
                    @moveTypeTowardTarget()
                    return
        _alias_Game_Event_updateSelfMovement.call this, arguments
        return

    Game_AIBot::isErased = -> @_erased == true

    Game_AIBot::_changeEventToDeadState = ->
        key = [
            $gameMap.mapId()
            @eventId()
            AlphaABS.Parameters.get_EnemyDeadSwitch()
        ]
        $gameSelfSwitches.setValue key, true
        @_originalDirection = -1
        @_originalPattern = -1
        @_storeDeadData()

    Game_AIBot::_storeDeadData = ->
        if @behaviorModel().reviveTime == 0
            "STORE ENEMY DATA".p(@eventId())
            $gamePlayer.setNewABSMapData({
                mapId: $gameMap.mapId(),
                enemyId: @eventId(),
                x: @x,
                y: @y,
                isLooted: @_absParams.looted
            })

    return
