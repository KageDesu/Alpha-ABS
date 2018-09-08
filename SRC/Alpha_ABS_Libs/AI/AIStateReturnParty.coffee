#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AIStateReturnParty.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class AIStateReturnParty extends AlphaABS.LIBS.AIStateReturn
        _updateReturnMode: ->
            if @_bot.isSlowReturn()
                @_bot.returnSlow()
            else
                @_bot.returnFast()

    AlphaABS.register AIStateReturnParty
    return
# ■ END AIStateReturnParty.coffee
#---------------------------------------------------------------------------