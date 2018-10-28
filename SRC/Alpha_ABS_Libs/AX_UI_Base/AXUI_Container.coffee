#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AXUI_Container.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class Container extends Sprite
        constructor: (size) ->
            super(new Bitmap(size, size))
            @size = size
            @items = []
            @orientation = "horizontal"
            @placePoint = "rigth"
            @itemsCount = 1
            @spacing = 0
            @move(100, 100)

        #?{PUBLIC}
        setItemsCount: (itemsCount) ->
            @itemsCount = itemsCount
            @_refreshMain()

        _refreshMain: ->
            s = @_getSize() * @itemsCount
            @bitmap = new Bitmap(s, s)
            @_rearrange()
            @_refreshPlace()

        _getSize: -> return (@size + @spacing)

        #?{PUBLIC}
        setSpacing: (spacing) ->
            @spacing = spacing
            @_refreshMain()

        #?{PUBLIC}
        addChild: (sprite) ->
            @_createItem(sprite)
            @_rearrange()
            @_refreshPlace()

        _createItem: (sprite) ->
            @_reCreatePlacer sprite.visible
            @items.push sprite
            @_placer.addChild sprite

        _reCreatePlacer: (isNew) ->
            super.removeChild(@_placer) if @_placer?
            visLen = @_visItemsLength()
            visLen += 1 if isNew == true
            s = @_getSize() * visLen
            s -= @spacing
            @_placer = new Sprite(new Bitmap(s, s))
            super.addChild @_placer
            pl  = @_placer
            @items.forEach (item) ->
                pl.addChild(item) if item.visible == true
            return

        _visItemsLength: ->
            count = 0
            for i in [0...@items.length]
                count++ if @items[i].visible == true
            return count

        _rearrange: ->
            return unless @_placer?
            @_placer.children[0]?.x = 0
            @_placer.children[0]?.y = 0
            if @isVertical()
                @_rearrangeVertical()
            else
                @_rearrangeHorizontal()

        _rearrangeVertical: ->
            items = @_placer.children
            s = @_getSize()
            for i in [1...items.length]
                items[i].y = (items[0].y) + (s * i)

        _rearrangeHorizontal: ->
            items = @_placer.children
            s = @_getSize()
            for i in [1...items.length]
                items[i].x = (items[0].x) + (s * i)

        _refreshPlace: ->
            return unless @_placer?
            if @isVertical()
                @_refreshPlaceVertical()
            else
                @_refreshPlaceHorizontal()

        _refreshPlaceVertical: ->
            if @placePoint == "center"
                @_placer.y = @height / 2
                @_placer.y = @_placer.y - (@_placer.height / 2)

            if @placePoint == "left"
                @_placer.y = @height
                @_placer.y = @_placer.y - @_placer.height

        _refreshPlaceHorizontal: ->
            if @placePoint == "center"
                @_placer.x = @width / 2
                @_placer.x = @_placer.x - (@_placer.width / 2)

            if @placePoint == "left"
                @_placer.x = @width
                @_placer.x = @_placer.x - @_placer.width

        #?{PUBLIC}
        refresh: ->
            @_reCreatePlacer false
            @_rearrange()
            @_refreshPlace()

        #?{PUBLIC}
        setHorizontal: ->
            @orientation = "horizontal"
            do @_rearrange
            do @_refreshPlace

        #?{PUBLIC}
        isHorizontal: -> @orientation == "horizontal"

        #?{PUBLIC}
        setVertical: ->
            @orientation = "vertical"
            do @_rearrange
            do @_refreshPlace
        
        #?{PUBLIC}
        isVertical: -> @isHorizontal() == false
        
        #?{PUBLIC}
        setPivotToCenter: ->
            @placePoint = "center"
            @_refreshPlace()
        
        #?{PUBLIC}
        setPivotToLeft: ->
            @placePoint = "left"
            @_refreshPlace()
        
        #?{PUBLIC}
        setPivotToRight: ->
            @placePoint = "right"
            @_refreshPlace()

    AXUI.register Container
    return
# ■ END AXUI_Container.coffee
#---------------------------------------------------------------------------