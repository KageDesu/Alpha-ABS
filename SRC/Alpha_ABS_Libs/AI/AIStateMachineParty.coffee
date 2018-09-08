#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AIStateMachineParty.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class AIStateMachineParty extends AlphaABS.LIBS.AIStateMachine
        constructor: () ->
            super()
            @_freeStateLogic = new AlphaABS.LIBS.AIStateFreeParty()
            @_returnStateLogic = new AlphaABS.LIBS.AIStateReturnParty()
            @_battleStateLogic = new AlphaABS.LIBS.AIStateBattleParty()

    AlphaABS.register AIStateMachineParty
    return
# ■ END AIStateMachineParty.coffee
#---------------------------------------------------------------------------
