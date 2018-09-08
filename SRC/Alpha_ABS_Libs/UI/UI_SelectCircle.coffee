#╒═════════════════════════════════════════════════════════════════════════╛
# ■ UI_SelectCircle.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    UI_Circle = KDCore.LIBS.UI_Circle
    Color = KDCore.Color
    SDK = KDCore.SDK

    class UI_SelectCircle extends UI_Circle
        @COLOR_CLICK = new Color(98, 225, 236, 220)
        @COLOR_SELECT = new Color(164, 255, 164, 220)
        @COLOR_DISABLED = new Color(89, 89, 89, 120)
        @CLICK_TIME = 5

        constructor: (segmentBitmap, isOpen, iconSize) ->
            super(segmentBitmap, SDK.check(iconSize, 36))
            @_isOpen = SDK.check(isOpen, true)
            @opacity = 0 unless @_isOpen
        
        _initParameters: ->
            UI_Circle::_initParameters.call @
            @_clickedSegmentIndex = null
            @_selectedSegmentIndex = null
            @_isHelperVisible = false
            @_isAnimated = false
            @_clickTimer = new Game_TimerABS()
            @_newRadius = @_maxRadius()
            @_disabledIndexes = []
        
        isOpen: -> @_isOpen == true
        isClicked: -> @_clickedSegmentIndex != null
        isSelected: -> @_selectedSegmentIndex != null
        isAnimated: -> @_isAnimated == true
        isHelpersVisible: -> @_isHelperVisible == true

        showHelpers: -> @_isHelperVisible = true
        hideHelpers: -> @_isHelperVisible = false

        select: (index) ->
            @deselectAll()
            @_segments[index].setBlendColor(UI_SelectCircle.COLOR_SELECT.ARR)
            @_selectedSegmentIndex = index
    
        deselectAll: ->
            @_selectedSegmentIndex = null
            @_resetSegmentsColors()
        
        _resetSegmentsColors: ->
            @_resetSegmentColor segment for segment, index in @_segments when !@_disabledIndexes.includes(index)

        _resetSegmentColor: (segment) -> segment.setBlendColor(Color.NONE.ARR)

        click: (index) ->
            @deselectAll()
            @_clickTimer.start(UI_SelectCircle.CLICK_TIME)
            @_clickedSegmentIndex = index
            @_segments[index].setBlendColor(UI_SelectCircle.COLOR_CLICK.ARR)

        update: ->
            UI_Circle::update.call @
            @_updateClick() if @isClicked()
            @_updateHelpers()
            @_updateAnimation()
        
        _updateClick: ->
            @_clickTimer.update()
            if @_clickTimer.isReady()
                @_resetSegmentsColors()
                @_clickedSegmentIndex = null
        
        _updateHelpers: ->
            if !@isAnimated() and @isOpen() and @isHelpersVisible()
                @_showHelpers()
            else
                @_hideHelpers()

        _hideHelpers: ->
            @_helpers.forEach (item) -> item.visible = false
        
        _showHelpers: ->
            @_helpers.forEach (item) -> item.visible = true

        _updateAnimation: ->
            return unless @isAnimated()
            @_moveSegments @_newRadius
            if @isOpen()
                @_closeCircle()
            else
                @_openCircle()

        _closeCircle: ->
            minRadius = @_minRadius()
            @opacity -= 30 if @opacity > 30
            @_newRadius -= 2 if @_newRadius > minRadius
            if @_newRadius <= minRadius
                @_isOpen = false
                @_isAnimated = false
                @opacity = 0

        _openCircle: ->
            maxRadius = @_maxRadius()
            @opacity += 30 if @opacity <= 225
            @_newRadius += 2 if @_newRadius < maxRadius
            if @_newRadius >= maxRadius
                @_isOpen = true
                @_isAnimated = false
                @opacity = 255

        hideAllSegments: ->
            SDK.times 4, ((i) ->
                @hideSegment i
                return
                ).bind(this)
        
        hideSegment: (index) -> @_segments[index].visible = false

        showAllSegments: ->
            SDK.times 4, ((i) ->
                @showSegment i
                return
                ).bind(this)
        
        showSegment: (index) -> @_segments[index].visible = true

        disableAllSegments: ->
            SDK.times 4, ((i) ->
                @disableSegment i
                return
                ).bind(this)

        disableSegment: (index) ->
            @_segments[index].setBlendColor(UI_SelectCircle.COLOR_DISABLED.ARR)
            @_icons[index].setBlendColor(UI_SelectCircle.COLOR_DISABLED.ARR)
            @_disabledIndexes.push index

        enableAllSegments: ->
            SDK.times 4, ((i) ->
                @enableSegment i
                return
                ).bind(this)

        enableSegment: (index) ->
            @_disabledIndexes.delete index
            @_resetSegmentColor  @_segments[index]
            @_resetIconColor  @_icons[index]

        _resetIconColor: (icon) -> icon.setBlendColor(Color.NONE.ARR)

        resetAllSegments: () ->
            @showAllSegments()
            @deselectAll()
            @enableAllSegments()

        addClickListener: (index, method) -> @_inputs[index].setClickHandler method

        setIcons: (iconsArray) ->
            iconsArray.forEach @setIcon.bind(this)

        setIcon: (icon, index) ->
           @_drawIcon icon, index

        _drawIcon: (icon, index) ->
            @_icons[index].bitmap.clear() if icon == null
            if icon instanceof Bitmap
                @_icons[index].bitmap.drawOnMe icon, 0, 0, @iconSize, @iconSize
            else
                @_icons[index].bitmap.drawIcon 0, 0, icon, @iconSize

        setHelpers: (textArray) ->
            textArray.forEach @setHelper.bind @

        setHelper: (text, index) ->
            @_drawHelperText text, index

        _drawHelperText: (text, index) ->
            helper = @_helpers[index].bitmap
            helper.clear()
            helper.drawText text, 0, 0, helper.width, helper.height, 'center'

        open: ->
            return if @isOpen()
            @_changeOpenClose 0, @_minRadius()
    
        _changeOpenClose: (beginOpacity, newRadius) ->
            return if @isAnimated()
            @_newRadius = newRadius
            @_isAnimated = true

        close: ->
            return unless @isOpen()
            @_changeOpenClose 255, @_maxRadius()

        _setOpacity: (opacity) ->
            @opacity = opacity
            icon.opacity = opacity for icon in @_icons

    AlphaABS.register UI_SelectCircle
    return
# ■ END UI_SelectCircle.coffee
#---------------------------------------------------------------------------