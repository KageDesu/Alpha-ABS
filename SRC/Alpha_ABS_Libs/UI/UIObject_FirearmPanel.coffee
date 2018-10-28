#╒═════════════════════════════════════════════════════════════════════════╛
# ■ UIObject_FirearmPanel.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class UIObject_FirearmPanel extends Sprite

        Color = KDCore.Color

        @WIDTH = 280
        @HEIGHT = 20
        @FILL = Color.GREEN.reAlpha(200).HEX
        @ALERT = Color.RED.reAlpha(200).HEX
        @BLACK = Color.BLACK.reAlpha(200).HEX

        constructor: () ->
            super()
            do @_createGlowFilter
            do @_createGauge
            do @_createWeaponNameText
            do @_createAmmoInfo
            do @refresh

        _createGlowFilter: ->
            @glow = new Sprite(new Bitmap(UIObject_FirearmPanel.WIDTH,
                                            UIObject_FirearmPanel.HEIGHT))
            @glow.bitmap.fillAll Color.GREEN
            @glow.filters = [
                new PIXI.filters.GlowFilter(4, 4, 0, 0xFF0000, 0.5)
            ]
            @glow.visible = false
            @addChild @glow

        _createGauge: ->
            @gauge = new AlphaABS.LIBS.UI_Gauge(UIObject_FirearmPanel.WIDTH,
                UIObject_FirearmPanel.HEIGHT)
            @gauge.setGaugeColors(UIObject_FirearmPanel.FILL, UIObject_FirearmPanel.BLACK)
            @gauge.setBackgroundColor(Color.BLACK.HEX)
            @gauge.setValue(0)
            @gauge.setMaxValue(100)
            @gauge.opacity = 140
            @addChild @gauge

        _createWeaponNameText: ->
            @weapText = new Sprite(new Bitmap(60, UIObject_FirearmPanel.HEIGHT))
            colorB = Color.BLACK.reAlpha(180)
            @weapText.bitmap.gradientFillRect(0, 0, 60, UIObject_FirearmPanel.HEIGHT,
                colorB.CSS, Color.NONE.CSS, false)
            @addChild @weapText

        _createAmmoInfo: ->
            @ammoInfo = new Sprite()
            @ammoInfo.move(UIObject_FirearmPanel.WIDTH - 100, 4)
            
            @ammoIcon = new Sprite(new Bitmap(16, 16))
            @ammoIcon.move(0, -2)
            @ammoInfo.addChild @ammoIcon

            @ammoCount = new Sprite(new Bitmap(30, UIObject_FirearmPanel.HEIGHT))
            @ammoCount.move(10, 0)
            @ammoInfo.addChild @ammoCount

            @addChild @ammoInfo

            @charges = new Sprite(new Bitmap(30, UIObject_FirearmPanel.HEIGHT))
            @charges.move(UIObject_FirearmPanel.WIDTH - 40, 4)
            @addChild @charges

        refresh: () ->
            return unless $gamePlayer.battler()
            try
                weapData = $gamePlayer.battler().weapons()[0]
                @_drawWeaponText(weapData.name) if weapData?
                @_absSkill = $gamePlayer.battler()._firstBattleABSSkill()
                if @_absSkill? and @_absSkill.isFirearm()
                    @_drawWeaponInfo()
                else
                    @hide()
            catch e
                AlphaABS.error(e, 'while refresh FirearmPanel')
                @hide()

        _drawWeaponText: (text) ->
            @weapText.bitmap.clear()
            @weapText.bitmap.fontSize = 12
            @weapText.bitmap.drawText(text, 0, 10, 60, 1, 'center')

        _drawWeaponInfo: ->
            ammoItem = $dataItems[@_absSkill.ammo]
            return unless ammoItem?
            @_drawIcon ammoItem.iconIndex
            @_drawAmmoCount $gameParty.numItems ammoItem
            @_drawChargesCount @_absSkill._currentStack, @_absSkill.stack

        _drawIcon: (index) ->
            @ammoIcon.bitmap.clear()
            @ammoIcon.bitmap.drawIcon(0, 0, index, 14)

        _drawAmmoCount: (count) ->
            @ammoCount.bitmap.clear()
            @ammoCount.bitmap.fontSize = 12
            @ammoCount.bitmap.textColor = Color.WHITE.CSS
            @ammoCount.bitmap.textColor = Color.RED.CSS if count == 0
            @ammoCount.bitmap.drawText(count, 0, 5, 30, 1, 'center')

        _drawChargesCount: (current, max) ->
            @charges.bitmap.clear()
            @charges.bitmap.fontSize = 12
            @charges.bitmap.textColor = Color.WHITE.CSS
            @charges.bitmap.textColor = Color.RED.CSS if current == 0
            current = 0 unless current?
            text = current.toString() + '/' + max.toString()
            @charges.bitmap.drawText(text, 0, 5, 30, 1, 'center')

        hide: () -> @visible = false

        show: () -> @visible = true

        isTouched: () ->
            try
                return false if @visible == false
                point = new AlphaABS.UTILS.PointX(TouchInput.x, TouchInput.y)
                isTouch = AlphaABS.UTILS.SMath.inRect(point, @_getRectangle())
            catch
                return false

        _getRectangle: ->
            new Rectangle(AlphaABS.UTILS.toGlobalCoord(@, 'x'),
                AlphaABS.UTILS.toGlobalCoord(@, 'y'), @gauge.width, @gauge.height)

        update: ->
            super()
            return if @visible == false
            if TouchInput.isLongPressed() and @isTouched()
                $gamePlayer.battler()?.reloadFirearm()
                @_pulse(0x00FF00)
                TouchInput.clear()
            @gauge.setMaxValue(@_absSkill.timer.getMaxValue())
            if AlphaABS.BattleManagerABS.canUseSkillByAmmo(@_absSkill)
                @gauge.setGaugeColors(UIObject_FirearmPanel.FILL, UIObject_FirearmPanel.BLACK)
                @gauge.setValue(@_absSkill.timer.getValue())
                if @_absSkill.timer.getMaxValue() == @_absSkill.timer.getValue()
                    @gauge.setValue(0)
                    @refresh()
            else
                @_drawChargesCount @_absSkill._currentStack, @_absSkill.stack
                @gauge.setGaugeColors(UIObject_FirearmPanel.ALERT, UIObject_FirearmPanel.BLACK)
                @gauge.setValue(@_absSkill.timer.getMaxValue())

        _pulse: (color) ->
            @glow.filters[0].color = color
            @glow.opacity = 0
            @glow.visible = true
            gl = @glow
            up = true
            thread32 = setTimeout (tFunc = ->
                gl.opacity += 30 if up is true
                up = false if gl.opacity >= 255
                gl.opacity -= 60 if up is false
                setTimeout(tFunc, 100) if gl.opacity > 0
            ), 100

    AlphaABS.register UIObject_FirearmPanel
    return
# ■ END UIObject_FirearmPanel.coffee
#---------------------------------------------------------------------------