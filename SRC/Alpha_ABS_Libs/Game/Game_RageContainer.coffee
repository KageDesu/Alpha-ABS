#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_RageContainer.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class RageContainer
        constructor: () ->
            @clear()

        clear: ->
            @rageDict = {}
            @targets = []

        addDealer: (who) ->
            @makeDamageBy 0, who if who?

        makeDamageBy: (damage, byWho) ->
            index = @targets.indexOf byWho
            if index > 0
                @rageDict[index] += damage
            else
                @targets.push byWho
                @rageDict[@targets.length - 1] = damage

        getHigherDealer: ->
            try
                arr = @_getArrayOfDmg()
                if arr.length > 1
                    max1 = arr.max()
                    max2 = arr.delete max1
                            .max()
                    return @_getDealerByDmg max1 if max1 > (max2 * 3)
            catch error
                console.error error
            return null

        _getArrayOfDmg: ->
            return Object.keys @rageDict
                    .map ((v) -> return @rageDict[v]).bind this

        _getDealerByDmg: (dmg) ->
            for key, value of @rageDict
                return @targets[key] if value is dmg

    AlphaABS.register RageContainer
    return
# ■ END Game_RageContainer.coffee
#---------------------------------------------------------------------------
