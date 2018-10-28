#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AIStateMachine.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class AIStateMachine
        constructor: (evId) ->
            @_bot = null
            @_state = ""
            @_freeStateLogic = new AlphaABS.LIBS.AIStateFree()
            @_searchStateLogic = new AlphaABS.LIBS.AIStateSearch()
            @_returnStateLogic = new AlphaABS.LIBS.AIStateReturn()
            @_battleStateLogic = new AlphaABS.LIBS.AIStateBattle()
            @_slowUpdateActive = false

        slowUpdate: () ->
            try
                return unless @_bot
                return unless AlphaABS.isABS()
                return unless @_bot.inActive()
                switch @_state
                    when "free" then @_updateOnFree()
                    when "search" then @_updateOnSearch()
                    when "return" then @_updateOnReturn()
                    when "battle" then @_updateOnBattle()
            catch e
                console.error e
    
        activateSlowUpdate: -> @_slowUpdateActive = true

        deactivate: ->

        onGameSave: ->
            @_bot = null

        onGameLoad: ->

        update: (bot) ->
            return unless @_setup bot
            if @_bot.inActive() then @_updateInActiveMode() unless @_checkDeadState()
            else
                @_updateInNoActiveMode()
            do @slowUpdate unless @_slowUpdateActive
            return

        _setup: (bot) ->
            @_bot = bot
            return false unless bot?
            @battler = @_bot.battler()
            return true

        _checkDeadState: () ->
            unless @battler.isAlive()
                @_changeStateTo "dead"
                return true
            return false

        _changeStateTo: (stateSymbol) ->
            @_state = stateSymbol
            switch @_state
                when "free" then @_onStateFree()
                when "battle" then @_onStateBattle()
                when "search" then @_onStateSearch()
                when "return" then @_onStateReturn()
                when "stun" then @_onStateStun()
                when "dead" then @_onStateDead()

        _onStateFree: () ->
            @_bot.onSwitchToFreeState()
            @_freeStateLogic.onStateStarted()

        _onStateBattle: () ->
            @_bot.onSwitchToBattleState()
            @_battleStateLogic.onStateStarted()

        _onStateSearch: () -> @_bot.onSwitchToSearchState()

        _onStateReturn: () -> @_bot.onSwitchToReturnState()

        _onStateStun: () -> @_bot.onSwitchToStunState()

        _onStateDead: () -> @_bot.onSwitchToDeadState()

        _updateInActiveMode: () ->
            @_checkStunState()
            @_updateStates()

        _checkStunState: () -> @_changeStateTo "stun" if !@battler.canMove() and !@inStunState()

        inStunState: () -> @_state == "stun"

        _updateStates: () ->
            switch @_state
                when "stun" then @_updateOnStun()

        _updateOnFree: () -> @_freeStateLogic.update(@_bot)

        _updateOnBattle: () -> @_battleStateLogic.update(@_bot)

        _updateOnSearch: () -> @_searchStateLogic.update(@_bot)

        _updateOnReturn: () -> @_returnStateLogic.update(@_bot)

        _updateOnStun: () -> @_changeStateTo "free" if @battler.canMove()

        _updateInNoActiveMode: () -> @_updateOnReturn() if @inReturnState()

        inReturnState: () -> @_state == "return"

        switchStateToFree: (bot) -> @_changeStateTo "free" if @_setup bot

        switchStateToBattle: (bot) -> @_changeStateTo "battle" if @_setup bot

        switchStateToSearch: (bot) -> @_changeStateTo "search" if @_setup bot

        switchStateToReturn: (bot) -> @_changeStateTo "return" if @_setup bot

        switchActionStateToAction: -> @_battleStateLogic.changeActionStateTo "action"

        switchActionStateToPrepare: -> @_battleStateLogic.changeActionStateTo "prepareAction"

        switchActionStateToEscape: -> @_battleStateLogic.changeActionStateTo "escape"

        switchActionStateToWait: -> @_battleStateLogic.changeActionStateTo "wait"


    AlphaABS.register AIStateMachine
    return
# ■ END AIStateMachine.coffee
#---------------------------------------------------------------------------
