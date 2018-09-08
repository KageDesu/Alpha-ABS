do ->
    #@[INTERFACE]
    Interface_AIBotABSMoving =
        stay: ->

        moveTypeTowardPlayer: ->
            @moveToPoint $gamePlayer unless @isNearThePlayerX()

        isNearThePlayerX: ->
            @isNearThePointX $gamePlayer

        isNearThePointX: (point) ->
            try
                sx = Math.abs(@deltaXFrom point.x)
                sy = Math.abs(@deltaYFrom point.y)
                return (sx + sy) < 1
            catch
                return false

        returnSlow: ->

        returnFast: ->

        _escapeFromTarget: (target) ->
            return unless target?
            @_performEscapeFromTarget target unless @isMoving()
            return

        _performEscapeFromTarget: (target) ->
            escapeRange = 2
            distance = AlphaABS.UTILS.distanceTo this, target
            if distance < escapeRange
                @moveFromPoint target
                @turnTowardTarget()
            else if distance > (escapeRange + 1)
                @moveTowardCharacter target
            else
                @turnTowardTarget()

        turnTowardTarget: ->
            target = @target()
            @turnTowardCharacter target if target?

        runAwayFromTarget: (target) ->
            return unless target?
            @_performRunAwayFromTarget target unless @isMoving()

        _performRunAwayFromTarget: (target) ->
            realRange = @_absParams.viewRadius / 2
            escapeRange = if realRange >= 2 then realRange else 2
            distance = AlphaABS.UTILS.distanceTo this, target
            if distance < escapeRange
                @_applyAproachSpeed()
                @moveFromPoint target
            else
                @changeStateToFree()

        _applyAproachSpeed: ->
        

        startPursuitTarget: ->

        moveTypeTowardTarget: ->
            target = this.target()
            if target?
                @moveToPoint target unless @isNearThePointX target

        moveToAlly: ->
            if !@isMoving() and !@_absParams.behavior.noMove
                if @_absParams.allyToSearch?
                    @moveToPoint @_absParams.allyToSearch
                else
                    @changeStateToFree()

    AlphaABS.LIBS.Interface_AIBotABSMoving = Interface_AIBotABSMoving
    return