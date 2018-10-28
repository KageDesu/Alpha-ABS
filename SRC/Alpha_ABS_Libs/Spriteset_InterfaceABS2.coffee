#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_InterfaceABS2.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    #@[CLASS PART]
    #@[CLASS IMPL ONLY]

    Spriteset_InterfaceABS = AlphaABS.LIBS.Spriteset_InterfaceABS

    Spriteset_InterfaceABS::_createFirearmBar = ->
        this.spriteFirearmBar = new AlphaABS.LIBS.UIObject_FirearmPanel()

    Spriteset_InterfaceABS::_createFirearmContainer = ->
        firearmCtn = new AlphaABS.LIBS.UIObject_Container(0, 0, 280, 20)
        firearmCtn.addUI this.spriteFirearmBar
        firearmCtn.setText("Weapon panel", true)
        firearmCtn.x = KDCore.SDK.toCX(firearmCtn.width)
        firearmCtn.y = @_layerSkillPanel.y - firearmCtn.height - 10
        firearmCtn.addVisButtton()
        @_setupWithParameters(firearmCtn, "get_UIE_PlayerFirearm")
        @_moveElements.push(['weaponPanel', firearmCtn])

    Spriteset_InterfaceABS::_setupWithParameters = (item, parametersMethod) ->
        if AlphaABS.Parameters.isLoaded()
            try
                parameters = do AlphaABS.Parameters[parametersMethod]
                @_setPosFromParameters(item, parameters) if parameters.Position
                @addChild item if parameters.Visible
            catch e
                    AlphaABS.error(e,
                        " while load plugin parameters for component " + parametersMethod)
        else
            @addChild item
        return

    Spriteset_InterfaceABS::_setPosFromParameters = (item, parameters) ->
        pX = parameters.Position.X
        pY = parameters.Position.Y
        item.x = pX if pX
        item.y = pY if pY
        return

    return
# ■ END Spriteset_InterfaceABS2.coffee
#---------------------------------------------------------------------------