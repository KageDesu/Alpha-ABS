#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AIStateBattle.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class AIStateBattle extends AlphaABS.LIBS.AIStateBase

        _init: ->
            @_newActionState = null
            @_actionState = null

        _setupMain: ->
            @isStayStill = @_bot.behaviorModel().noMove
            return true

        _updateMainLogic: ->
            if !@_checkTarget() or  @_checkNoMoveMode()
                @_bot.changeStateToFree()
            else
                @_bot._makeActions()
                @_updateBattleStates()
            return

        _checkTarget: -> AlphaABS.BattleManagerABS.isValidTarget @_bot.target()

        _checkNoMoveMode: ->
            unless  AlphaABS.LIBS.AILogicManager.targetInVisibleRange @_bot
               true if @isStayStill
            false

        _updateBattleStates: ->
            @_applyActionState() if  @_newActionState?
            switch @_actionState
                when "approach" then @_updateApproachState()
                when "prepareAction" then @_updatePrepareActionState()
                when "action" then @_updateBattleActionState()
                when "cast" then @_updateCastState()
                when "escape" then @_updateEscapeState()
                when "wait" then @_updateWaitState()
            return

        _applyActionState: ->
            @_actionState =  @_newActionState
            switch @_actionState
                when "approach" then @_applyApproachState()
                when "cast" then @_applyCastState()
                when "action" then @_applyBattleActionState()
                when "escape" then @_applyEscapeState()
                when "wait" then @_applyWaitState()
                #when "prepareAction" then #EMPTY
            @_newActionState = null

        _applyApproachState: ->
            @log "Apply Approach State"
            if @isStayStill
                @_stayAndTurn()
            else
                @_bot.startPursuitTarget()

        _stayAndTurn: ->
            @_bot.stay()
            @_bot.turnTowardTarget()

        _applyCastState: -> @_stayAndTurn()

        _applyBattleActionState: ->
            @_stayAndTurn()
            @_bot.createNewHomePoint()

        _applyEscapeState: ->
            @_bot.stay()
            @_bot._applyAproachSpeed()

        _applyWaitState: ->
            @_bot.stay()

        _updateApproachState: ->
            if @isStayStill
                @_stayAndTurn()
                unless AlphaABS.LIBS.AILogicManager.targetInVisibleRange @_bot
                    @_bot.changeStateToReturn()
            else
                @_bot.changeStateToReturn() if AlphaABS.LIBS.AILogicManager.inOutReturnRange @_bot

        _updatePrepareActionState: ->
            @_bot.checkActionCommonEvent()
            @_prepareActionForNow() if  AlphaABS.LIBS.AILogicManager.canUseActionNow @_bot

        _prepareActionForNow: ->
            if AlphaABS.LIBS.AILogicManager.inActionRange @_bot
                @changeActionStateTo "action"
            else
                @log "Target away to action, try approach"
                if @isStayStill
                    @log "Can't approach, (noMove == true)"
                    @_bot.turnTowardTarget()
                else
                    @changeActionStateTo "approach"

        changeActionStateTo: (newActionState) -> @_newActionState = newActionState

        _updateBattleActionState: ->
            @log "Try Perform Action"
            action = @_bot.currentAction()
            if action?.isNeedCast() then @_updateOnCastingAction action else @_bot._performAction()

        _updateOnCastingAction: (action) ->
            if action.isCasting() and action.isReady()
                @_bot._performAction()
            else
                @log "Start casting"
                action.startCast(@_bot.battler())
                @changeActionStateTo "cast"

        _updateCastState: ->
            @_bot.turnTowardTarget()
            action = @_bot.currentAction()
            if action? and action.isCasting()
                if AlphaABS.LIBS.AILogicManager.inActionRange @_bot
                    @changeActionStateTo "action" if action.isReady()
                else
                    @log "Casting intterupt, target too far"
                    action.resetCast()
                    @_onCastingComplete()
            else
               @_onCastingComplete()

        _onCastingComplete: ->
            @changeActionStateTo "prepareAction"

        _updateEscapeState: ->
            @_bot._escapeFromTarget @_bot.target()
            if @_bot.currentAction()?
                @changeActionStateTo "prepareAction"
            @_bot.changeStateToReturn() if  AlphaABS.LIBS.AILogicManager.inOutReturnRange @_bot

        _updateWaitState: ->
            isAgressive = @_bot.behaviorModel().agressive
            if isAgressive
                @changeActionStateTo "approach"
            else
                unless AlphaABS.LIBS.AILogicManager.targetInVisibleRange @_bot
                    @_bot.changeStateToFree()

        onStateStarted: -> @changeActionStateTo "approach"

    AlphaABS.register AIStateBattle
    return
# ■ END AIStateBattle.coffee
#---------------------------------------------------------------------------
