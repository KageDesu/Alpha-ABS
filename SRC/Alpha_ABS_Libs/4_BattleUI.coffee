#/////////////////////////////////////////////////////////////////////////////
#╒═══════════════════════════════════════════════════════════════════════════╛
# ■ BattleUI.coffee
#╒═══════════════════════════════════════════════════════════════════════════╛
#/////////////////////////////////////////////////////////////////////////////
do ->

    BattleUI = () -> throw new Error("This is a static class")

    AlphaABS.register BattleUI

    BattleUI.init = () ->
        @_ui = null
        return

    BattleUI.setUI = (ui) ->
        @_ui = ui
        return

    BattleUI.initNewSession = () -> @_ui?.initABS()

    BattleUI.isUI = () -> @_ui?

    BattleUI.getUI = () -> @_ui

    BattleUI.showTarget = (target) -> @_ui?.showTarget(target) #Nullable

    BattleUI.alertNotInDuringBattle = () -> @alert AlphaABS.SYSTEM.STRING_ALERT_NOINBATTLE

    BattleUI.alert = (message) ->
        @_ui?.addPopUp AlphaABS.PopInfoManagerABS.ALERT message if message

    BattleUI.pushItemOnPanel = (item) ->
        @_pushOnPanel "item", item if item?

    BattleUI._pushOnPanel = (symbol, object) ->
        @_ui?.pushOnItemPanel symbol, object if object

    BattleUI.refreshWeaponCircle = () -> @_ui?.weapCircleRefresh()

    BattleUI.refresh = () -> @_ui?.refresh()

    BattleUI.pushExpOnPanel = (expCount) ->
        @_pushOnPanel "exp", expCount

    BattleUI.refreshWeaponIconAt = (index) ->
        @_getControlPanel()?.refreshWeaponIconAt index if index?

    BattleUI._getControlPanel = () -> @_ui?.controlPanel()

    BattleUI.showUI = () ->
        if @_ui?
            @_ui.setShowUI true
            @_ui.show()
        return

    BattleUI.hideUI = () ->
        if @_ui?
            @_ui.setShowUI false
            @_ui.hide()
        return

    BattleUI.refreshPlayerFace = () -> @_ui?.refreshFace()

    BattleUI.pushGoldOnPanel = (goldCount) ->
        @_pushOnPanel "gold", goldCount

    BattleUI.requestFreeMode = () -> @_ui?.needFree()

    BattleUI.moveWeaponCircle = (x, y) ->
        @_getWeaponCircle()?.move x, y if x? and y?

    BattleUI._getWeaponCircle = () -> @_ui?.weapCircle()

    BattleUI.terminate = () -> @_ui?.terminate()

    BattleUI.isWeaponCircleTouchedAny = () ->
        cl = @_getWeaponCircle()
        return false unless cl?
        return cl.isOpen() and cl.isTouchedAny()

    BattleUI.isTouched = () ->
        @_ui?.isTouched()

    BattleUI.addPopUpForPlayer = (item) ->
        @_ui?.addPopUpUser item if item

    BattleUI.addPopUpForTarget = (target, item) ->
        if target and item
            @_ui?.addPopUpTarget target, item

    BattleUI.isVisible = () ->
        return @_ui.isVisible() if @_ui?
        false

    BattleUI.openWeaponCircle = () ->
        circle = @_getWeaponCircle()
        if circle?
            circle.open() unless circle.isOpen()
        return

    BattleUI.closeWeaponCircle = () ->
        circle = @_getWeaponCircle()
        if circle?
            circle.close() if circle.isOpen()
        return

    BattleUI.isWeaponCircleOpen = () ->
        @_getWeaponCircle()?.isOpen()

    BattleUI.selectOnControlPanel = (index) ->
        @_getControlPanel()?.selectItemAt index, true if index?

    BattleUI.diselectOnControlPanel = (index) ->
        @_getControlPanel()?.selectItemAt index, false if index?

    BattleUI.disableOnControlPanel = (index) ->
        @_getControlPanel()?.disableItemAt(index, true) if index?

    BattleUI.enableOnControlPanel = (index) ->
        @_getControlPanel()?.disableItemAt(index, false) if index?

    BattleUI.changeRotateIconToMouse = () ->
        @_getControlPanel()?.setIconAt(3, AlphaABS.DATA.IMG.IconToMouse.bitmap)

    BattleUI.changeRotateIconToTarget = () ->
        @_getControlPanel()?.setIconAt(3, AlphaABS.DATA.IMG.IconToTarget.bitmap)

    BattleUI.touchOnSkillPanel = (index) ->
        @_ui?.touchSkillAt index if index?

    BattleUI.touchOnControlPanel = (index) ->
        @_getControlPanel()?.touchItemAt index if index?

    BattleUI.touchOnWeaponCircle = (index) ->
        @_getWeaponCircle()?.click index if index?

    BattleUI.isUIFree = () ->
        @_ui?.isFree()

    AlphaABS.BattleUI = BattleUI

    return

# ■ END BattleUI.coffee
#-----------------------------------------------------------------------------
#/////////////////////////////////////////////////////////////////////////////
