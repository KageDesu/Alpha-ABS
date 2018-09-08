do ->
    Game_AIBot::_storeMoveData = ->
       @_absParams.moveData = {}
       @_absParams.moveData.moveSpeed = @_moveSpeed
       @_absParams.moveData.moveType = @_moveType
       @_absParams.moveData.moveFrequency = @_moveFrequency
       return

    Game_AIBot::_resetMoveData = ->
        @_moveSpeed = @_absParams.moveData.moveSpeed
        @stay()
        return

    Game_AIBot::stay = ->
        @_moveType = 0
        try
            @_moveFrequency = @_absParams.moveData.moveFrequency
        catch
            return


    Game_AIBot::returnSlow = -> @_performReturnToHome() unless @isMoving()

    Game_AIBot::_performReturnToHome = ->
        home = @getHomePosition()
        direction = @findDirectionTo home.x, home.y
        if direction > 0
            @moveStraight direction
        else
            @LOG.p 'AI : I\'am return to Home!'
            @_absParams.myHomePosition = null
            @onReturnEnd()
            @_restoreMoveData()
        return

    Game_AIBot::_restoreMoveData = ->
        @_moveSpeed = @_absParams.moveData.moveSpeed
        @_moveType = @_absParams.moveData.moveType
        @_moveFrequency = @_absParams.moveData.moveFrequency
        return

    Game_AIBot::returnFast = -> @_performReturnToHome()

    Game_AIBot::_applyAproachSpeed = ->
        @_moveFrequency = @_absParams.moveData.moveFrequency + 2 if @behaviorModel().slow != true
        return

    Game_AIBot::_updateNonmoving = (wasMoving) ->
        unless $gameMap.isEventRunning()
            if wasMoving and !@isMoveRouteForcing()
                @battler().onWalk()
        return

    Game_AIBot::startPursuitTarget = () ->
        #"START PURSUIT".LOG()
        @_applyAproachSpeed()
        @_moveType = 7

    Game_AIBot::moveTypeTowardTarget = ->
        target = this.target()
        #"MOVE TO TARGET".LOG()
        if target?
            @moveToPoint target unless @isNearThePointX target

    Game_AIBot::moveToAlly = ->
        if !@isMoving() and !@_absParams.behavior.noMove
            if @_absParams.allyToSearch?
                @moveToPoint @_absParams.allyToSearch
            else
                @changeStateToFree()

    Game_AIBot::turnTowardCharacter = (character) ->
        try
            Game_Character.prototype.turnTowardCharacter.call this, character
        catch
            return

    return
