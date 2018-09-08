#╒═════════════════════════════════════════════════════════════════════════╛
# ■ UI_SelectCircleFW.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class UI_SelectCircleFW extends AlphaABS.LIBS.UI_SelectCircle
        constructor: (@battler, @callHandler) ->
            super(AlphaABS.DATA.IMG.circleSegment.bitmap, false, 24)
            @refresh()
            @_setHelpers()
            @addClickListener(0, (-> @callHandler 0).bind @)
            @addClickListener(1, (-> @callHandler 1).bind @)
            @addClickListener(2, (-> @callHandler 2).bind @)
            @addClickListener(3, (-> @callHandler 3).bind @)
            
        refresh: ->
            @setIcons @battler.getFavWeapIcons()
            index = 0
            @enableAllSegments()
            @battler.ABSParams().favoriteWeapons.forEach(((i) ->
                if i?
                    weap = $dataWeapons[i]
                    @disableSegment(index) unless $gameParty.hasItem(weap, true)
                    @disableSegment(index) if @battler.hasWeapon weap
                index++
            ).bind @)
            return

        _setHelpers: ->
            x = AlphaABS.LIBS.IKey
            @setHelper x.convertIKeyToLetter(x.SC_W()).toUpperCase(), 0
            @setHelper x.convertIKeyToLetter(x.SC_D()).toUpperCase(), 1
            @setHelper x.convertIKeyToLetter(x.SC_S()).toUpperCase(), 2
            @setHelper x.convertIKeyToLetter(x.SC_A()).toUpperCase(), 3

        isTouchedAny: ->
            if @visible == true
                return @_inputs.some((i) -> return i.isButtonTouched())
            else
                return false
       
    AlphaABS.register UI_SelectCircleFW
    return
# ■ END UI_SelectCircleFW.coffee
#---------------------------------------------------------------------------