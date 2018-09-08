#╒═════════════════════════════════════════════════════════════════════════╛
# ■ UI_Circle.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class UI_Circle extends Sprite
        constructor: (@segmentBitmap, @iconSize) ->
            super(new Bitmap(200, 200))
            @iconSize = SDK.check(@iconSize, 36)
            @_initParameters()
            @_createSegments()
            @_moveSegments @_maxRadius()
            @_postConfigurate()
    
        _initParameters: ->
            @anchor.x = 0.5
            @anchor.y = 0.5

        _createSegments: () ->
            @_segments = []
            @_icons = []
            @_helpers = []
            @_inputs = []

            @_createSegment(0, 0)
            @_createSegment(1, Math.PI / 2)
            @_createSegment(2, Math.PI)
            @_createSegment(3, -Math.PI / 2)

            @_segments.forEach(((segment) -> @addChild(segment)).bind @)

            @_configurateSegmentsElements()
            @_createInputZones()
        
        _createSegment: (index, rotation) ->
            rotation = SDK.check(rotation, 0)
            segment = @_createSegmentElement(rotation)
            icon = @_createIconForSegment(rotation)
            helper = @_createHelperForSegment()
            helper.rotation = -rotation if index == 2 #down text upwards
            segment.addChild icon
            segment.addChild helper
            @_segments[index] = segment
            @_icons[index] = icon
            @_helpers[index] = helper
            return
            
        _createSegmentElement: (rotation) ->
            rotation = SDK.check(rotation, 0)
            segment = new Sprite()
            segment.bitmap = @segmentBitmap
            segment.anchor.x = 0.5
            segment.anchor.y = 0.5
            segment.rotation = rotation
            return segment

        _createIconForSegment: (rotation) ->
            rotation = SDK.check(rotation, 0)
            icon = new Sprite(new Bitmap(@iconSize, @iconSize))
            icon.anchor.x = 0.5
            icon.anchor.y = 0.5
            icon.rotation = -rotation
            return icon

        _createHelperForSegment: ->
            help = new Sprite(new Bitmap(@segmentBitmap.width, @segmentBitmap.height))
            help.anchor.x = 0.5
            help.anchor.y = 0.5
            return help

        _configurateSegmentsElements: ->
            dy = -@segmentBitmap.height
            @_helpers.forEach((item) -> item.move(0, dy))
            @_icons.forEach((item) -> item.move(0, -5))
        
        _createInputZones: ->
            raduis = @_maxRadius()
            top = new Sprite_Button()
            top.bitmap = new Bitmap(@segmentBitmap.width, @segmentBitmap.height)
            top.moveToCenter(0, -raduis)
            @_inputs.push top

            right = new Sprite_Button()
            right.bitmap = new Bitmap(@segmentBitmap.height, @segmentBitmap.width)
            right.moveToCenter(raduis, 0)
            @_inputs.push right

            down = new Sprite_Button()
            down.bitmap = top.bitmap
            down.moveToCenter(0, raduis)
            @_inputs.push down

            left = new Sprite_Button()
            left.bitmap = right.bitmap
            left.moveToCenter(-raduis, 0)
            @_inputs.push left

            @_inputs.forEach(((item) -> @addChild(item)).bind @)

        _moveSegments: (radius) ->
            radius = @_maxRadius() unless radius?
            @_segments[0].move(0, -radius) #TOP
            @_segments[2].move(0, radius) #DOWN
            @_segments[3].move(-radius, 0) #LEFT
            @_segments[1].move(radius, 0) #RIGHT

        _maxRadius: -> Math.floor(@segmentBitmap.height / 4 + @segmentBitmap.width / 2)

        _minRadius: -> Math.floor(@segmentBitmap.width / 2)

        _postConfigurate: -> #EMPTY

    KDCore.register(UI_Circle) if window.KDCore != undefined
    return
# ■ END UI_Circle.coffee
#---------------------------------------------------------------------------