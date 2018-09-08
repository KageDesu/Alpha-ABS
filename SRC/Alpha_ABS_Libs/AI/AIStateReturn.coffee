#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AIStateReturn.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class AIStateReturn extends AlphaABS.LIBS.AIStateBase
        _updateMainLogic: ->
            return @_bot.onReturnEnd() unless @_bot.getHomePosition()?
            return @_bot.onReturnEnd() if @_bot.isNotReturn()
            @_updateReturnMode()

        _updateReturnMode: ->
            if @_bot.isSlowReturn()
                @_bot.onReturnEnd()
                @_bot.returnSlow()
            else
                @_bot.returnFast()


    AlphaABS.register AIStateReturn
    return
# ■ END AIStateReturn.coffee
#---------------------------------------------------------------------------