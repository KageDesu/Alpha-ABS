Game_AI2Bot = () ->
    @initialize.apply this, arguments
    return

do ->
    Game_AI2Bot.prototype = Object.create Game_Follower.prototype
    Game_AI2Bot::constructor = Game_AI2Bot

    PLATFORM.SDK.applyInterface Game_AI2Bot, AlphaABS.LIBS.Interface_AIBot
    PLATFORM.SDK.applyInterface Game_AI2Bot, AlphaABS.LIBS.Interface_AIBotABS
    PLATFORM.SDK.applyInterface Game_AI2Bot, AlphaABS.LIBS.Interface_AIBotABSEvents
    PLATFORM.SDK.applyInterface Game_AI2Bot, AlphaABS.LIBS.Interface_AIBotActions
    PLATFORM.SDK.applyInterface Game_AI2Bot, AlphaABS.LIBS.Interface_AIBotABSMoving

    Game_AI2Bot::initialize = (index) ->
        Game_Follower.prototype.initialize.call this, index
        @initializeABS()
        @reInitABS index

    Game_AI2Bot::reInitABS = (index) ->
        @_absParams.battler = $gameParty.members()[index]
        if @_absParams.battler?
            @_stateMachine = new AlphaABS.LIBS.AIStateMachineParty()
            @_absParams.partyIndex = index
            #@_absParams.partyActorId = @_absParams.battler.actorId()
            @aiName =  @_absParams.battler.name()
            @LOG.setColors Color.BLUE, Color.BLACK.getLightestColor(225)
            @LOG.p("AI inited " + @aiName)
            @_absParams.motion = null
            @_absParams.deactivatedByDead = false
            @_absParams.behavior.loadAlly()
            @pursuitTarget = false
            @setThrough false
            @_createSlowUpdateThread()
        else
            @_deactivate()

    Game_AI2Bot::_createSlowUpdateThread = ->
            @_slowUpdateThread = setInterval(@slowUpdate.bind(@), 500)

    #?NEW
    Game_AI2Bot::slowUpdate = ->
        try
            return unless AlphaABS.isABS()
            return unless @inActive()
            @checkCollisionWithPlayer()
            @checkCollisionWithParty()
        catch e
            console.error e
        
    #?NEW
    Game_AI2Bot::refreshABS = ->
        clearInterval @_slowUpdateThread
        @_createSlowUpdateThread()
        @changeStateToFree()
        @refreshABSMotion()

    #?OVER Super
    Game_AI2Bot::onGameSave = ->
        Game_AIBot::onGameSave.call @
        clearInterval @_slowUpdateThread
    
    #?OVER Super
    Game_AI2Bot::onGameLoad = ->
        Game_AIBot::onGameLoad.call @
        clearInterval @_slowUpdateThread
        @_createSlowUpdateThread()
        @refreshABSMotion()

    Game_AI2Bot::stopABS = () ->
        @_deactivate()
        if @_absParams.battler?
            @_absParams.battler.stopABS()
            @_absParams.battler = null
        @refreshABSMotion()
    
    #OVER Super
    Game_AI2Bot::chaseCharacter = (character) -> #*EMPTY

    Game_AI2Bot::partyActorIndexId = () ->
        @battler().actorId() if @battler()?

    #OVER Super
    Game_AI2Bot::update = () ->
        Game_Character::update.call @
        #TODO: MoveSpeed и directionFix не должно быть как у Game_Player если в бою
        @setTransparent($gamePlayer.isTransparent())
        @_updateABS()
        @_updateDeadState()

    Game_AI2Bot::getHomePosition = () ->
        unless @isNearThePlayerX()
            return $gamePlayer.toPoint()
        else
            return null

    #OVER I
    Game_AI2Bot::_updateABS = () ->
        if @inActive()
            @battler().updateABS()
            @_stateMachine.update this
            @_performPursuitTarget() if @pursuitTarget
        #else
        #    @_deactivate()

    Game_AI2Bot::_performPursuitTarget = () ->
        @_absParams.useAStar = true
        unless @isMoving()
            @moveTypeTowardTarget()
            #@turnTowardCharacter @target()

    __super_deactivate = Game_AI2Bot::_deactivate
    Game_AI2Bot::_deactivate = ->
        __super_deactivate.call @
        @hideHpBarABS()
        @refreshABSMotion()
        SlowUpdateManager.clear @_absParams.partyIndex + 900

    #NEW
    Game_AI2Bot::checkCollisionWithPlayer = () -> @checkCollisionWith $gamePlayer unless @inBattle()

    #NEW
    Game_AI2Bot::checkCollisionWith = (other) ->
        me = @.toPoint()
        pl = other.toPoint()
        if me.x == pl.x and me.y == pl.y
            @moveFromPoint other unless @isMoving()

    #NEW
    Game_AI2Bot::checkCollisionWithParty = () ->
        @checkCollisionWithPartyMember other for other in $gameParty.membersABS() if @inBattle()
        return

    #NEW
    Game_AI2Bot::checkCollisionWithPartyMember = (member) ->
        @checkCollisionWith member if member.inBattle() and member != @

    #NEW
    Game_AI2Bot::_updateDeadState = () ->
        if @_absParams.deactivatedByDead and @isAlive()
            @_absParams.deactivatedByDead = false
            @requestMotion 'none'
            @initABS()

    #OVER I
    Game_AI2Bot::initABS = () ->
        if @_absParams.battler?
            @battler().initABS()
            SlowUpdateManager.register(900 + @_absParams.partyIndex, @_stateMachine, 300)
            @_absParams.active = true
            @showHpBarABS() if @isNeedHpBarShow()
            @refreshABSMotion()
            @changeStateToFree()


    #OVER I
    Game_AI2Bot::startCommonEvent = (commonEventId) ->
        if commonEventId? > 0
            $gameTemp.reserveCommonEvent commonEventId if $dataCommonEvents[commonEventId]?

    #OVER I
    Game_AI2Bot::createNewHomePoint = -> #*EMPTY

    #OVER I
    Game_AI2Bot::onReturnEnd = ->
        @LOG.p 'return END'
        @_absParams.active = true
        @_onBattleEnd() if @inBattle()

    Game_AI2Bot::onSwitchToReturnState = ->
        @_resetTarget()
        @LOG.p 'Return'

    Game_AI2Bot::onSwitchToSearchState = ->
        @LOG.p 'Curious! I\'am searching...'
        @requestBalloon 2 unless @behaviorModel().noEmote

    __interface_method_onSwitchToFreeState = Game_AI2Bot::onSwitchToFreeState
    Game_AI2Bot::onSwitchToFreeState = ->
        __interface_method_onSwitchToFreeState.call this
        @pursuitTarget = false
        @_absParams.useAStar = false

    #OVER I
    Game_AI2Bot::startPursuitTarget = ->
        @LOG.p 'Start pursuit'
        @pursuitTarget = true

    #OVER I
    Game_AI2Bot::returnSlow = ->
        @_performReturnToPartyLeader()
        @onReturnEnd() unless @getHomePosition()?

    #NEW
    Game_AI2Bot::_performReturnToPartyLeader = ->
            @moveTypeTowardPlayer() unless @isMoving()

    #OVER I
    Game_AI2Bot::isNearThePointX = (point) ->
        try
            sx = Math.abs(@deltaXFrom point.x)
            sy = Math.abs(@deltaYFrom point.y)
            if @inBattle()
                return (sx + sy) < 1
            else
                return (sx + sy) < (1 + @_absParams.partyIndex)
        catch
            return false

    #OVER I
    Game_AI2Bot::stay = ->
        @pursuitTarget = false

    #OVER I
    Game_AI2Bot::changeStateToFree = ->
        if $gamePlayer.inBattle() and $gamePlayer.target()?
            @changeStateToBattle $gamePlayer.target()
        else
            @_stateMachine.switchStateToFree this
        
    __interface_method_setTarget = Game_AI2Bot::setTarget
    Game_AI2Bot::setTarget = (target) ->
        if target instanceof Game_AI2Bot
            @_resetTarget()
        else
            __interface_method_setTarget.call this, target

    #OVER I
    Game_AI2Bot::onSwitchToDeadState = ->
        @_absParams.allyToSearch = null
        @stay()
        @_deactivate()
        @requestMotion 'sleep'
        @_absParams.deactivatedByDead = true
        return

    #NEW
    Game_AI2Bot::requestMotion = (motion) -> @_absParams.motion = motion

    #NEW
    Game_AI2Bot::isMotionRequested = -> return @_absParams.motion?
    
    #NEW
    Game_AI2Bot::motionType = -> return @_absParams.motion

    #NEW
    Game_AI2Bot::clearMotion = -> @_absParams.motion = null

    __interface_method_performAction = Game_AI2Bot::_performAction
    Game_AI2Bot::_performAction = ->
        __interface_method_performAction.call this
        @battler().performAttack() if @battler().action(0).isAttack()
        return

    #$[OVER I]
    Game_AI2Bot::isNeedHpBarShow = ->
        Game_AIBot::isNeedHpBarShow.call @

    #$[OVER I]
    Game_AI2Bot::selectOnMap = (isSelect) ->
        Game_AIBot::selectOnMap.call @, isSelect

    Game_AI2Bot::refreshABSMotion =  ->
        if @_absParams.absMotion?
            @_absParams.absMotion.clearMotion()
            @_absParams.absMotion = null
        return unless @battler()
        if @battler().isHasABSMotion()
            @_absParams.absMotion = new AlphaABS.LIBS.ABSMotion()
            skill = @battler()._firstBattleABSSkill()
            @_absParams.absMotion.setMotion(skill.motion, skill.motionOffset, this)
            @_absParams.absMotion.applyMotionIdle()

    Game_AI2Bot::inABSMotion = -> @battler()? and @_absParams.absMotion?

    Game_AI2Bot::_updateABSMotion = ->
        return unless @inABSMotion()
        if @battler().isNeedABSMotionRefresh()
            @refreshABSMotion()
            @battler().onABSMotionRefresh()

        if @battler().isNeedABSMotionAction()
            @battler().onABSMotionActionDone()
            @_absParams.absMotion.applyMotionAction() if @_absParams.absMotion?

    Game_AI2Bot::refreshABSMotionState  = (toState) ->
        return unless @inABSMotion()
        if toState == true
            @_absParams.absMotion.applyMotionState()
        else
            @_absParams.absMotion.applyMotionIdle()

    return