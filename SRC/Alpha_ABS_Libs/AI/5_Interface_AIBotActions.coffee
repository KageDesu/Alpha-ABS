do ->
    #@[INTERFACE]
    Interface_AIBotActions =
        interruptCast: ->
           action = @currentAction()
           if @isCasting()
             @LOG.p 'Cast intterupt'
             action.resetCast()
           return

        _makeActions: ->
            return if @isCasting()
            @battler().makeActions()

            actions = @battler()._actions.filter(((action) ->
                skill = @battler().skillABS_byAction(action)
                target = @target()
                if skill
                    target = if skill.isNeedTarget() then @target() else self
                AlphaABS.BattleManagerABS.canUseABSSkillNow(this, target, skill) and
                    AlphaABS.LIBS.AILogicManager.isUsableABSSkill skill
            ).bind(this))

            if actions.length > 0
                @_setForceAction actions.first()
            else
                @_setCurrentAction @battler().action(0)
            return
        
        _setForceAction: (action) ->
            @_absParams.currentAction = @battler().skillABS_byAction(action)
            @_stateMachine.switchActionStateToAction()
            return
        
        _setCurrentAction: (action) ->
            skill = @battler().skillABS_byAction action
            if @_absParams.currentAction != skill
                @_absParams.currentAction = skill
                if @_absParams.currentAction
                    @_stateMachine.switchActionStateToPrepare()
                else
                if @behaviorModel().escapeOnBattle
                    @_stateMachine.switchActionStateToEscape()
                else
                    @_stateMachine.switchActionStateToWait()
            return

        _performAction: ->
            currentAction = @currentAction()
            @LOG.p 'Perform! ' + currentAction.skill().name
            process = AlphaABS.BattleManagerABS.battleProcess()
            if currentAction.isVectorType()
                action = @battler().action(0)
                process.startPostBattleAction this, @target(), action, currentAction
            else
                if currentAction.isNeedTarget()
                    process.performBattleAction this, @target()
                else
                    process.performBattleAction this, this
            @battler().performCurrentAction()
            @_absParams.currentAction.playStartSound @toPoint()
            @_stateMachine.switchActionStateToPrepare()
            return

        checkActionCommonEvent: ->
            @startCommonEvent @currentAction().cEonStart
            return

    AlphaABS.LIBS.Interface_AIBotActions = Interface_AIBotActions
    return