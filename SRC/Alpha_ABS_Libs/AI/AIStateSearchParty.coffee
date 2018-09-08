#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AIStateSearchParty.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
#! No used!
do ->
    class AIStateSearchParty extends AlphaABS.LIBS.AIStateSearch

        _updateMainLogic: ->
                if @_haveOneToSearch() then @_updateOnSearch()
                else @_bot.changeStateToFree()
                return

        _haveOneToSearch: () ->
            return @_bot.allyToSearch()?.inActive()

        _updateOnSearch: () ->
            target = AlphaABS.LIBS.AILogicManager.getTargetsInRange @_bot
            if target? then @_onSeeTarget target else @_updateAllySearch()

        _onSeeTarget: (target) ->
            @_bot.setAllyTarget null
            @_bot.changeStateToBattle target

        _updateAllySearch: ->
            @_bot.moveToAlly()
            @_bot.changeStateToFree() if @_bot.isNearThePointX @_bot.allyToSearch()

    AlphaABS.register AIStateSearchParty
    return

# ■ END AIStateSearchParty.coffee
#---------------------------------------------------------------------------
