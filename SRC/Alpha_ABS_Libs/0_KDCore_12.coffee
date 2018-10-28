#╒═════════════════════════════════════════════════════════════════════════╛
# ■ KDCore.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
#![THIS LIBRARY ONLY FOR ALPHA ABS with MV < 1.6.1 SUPPORT]
KDCore = KDCore || {}
KDCore.Version = '1.2A'
KDCore.LIBS = {}
KDCore.register = (library) -> @LIBS[library.name] = library

do ->
    #Array Extension
    #------------------------------------------------------------------------------
    Array::delete = ->
        what = undefined
        a = arguments
        L = a.length
        ax = undefined
        while L and @length
            what = a[--L]
            while (ax = @indexOf(what)) != -1
                @splice ax, 1
        this

    Array::include = (value) -> @indexOf(value) != -1

    #?[FOR 1.5.1]
    Array::includes = (value) -> @include value

    Array::max = -> Math.max.apply null, this

    Array::min = -> Math.min.apply null, this

    Array::sample = ->
        return [] if @length == 0
        @[SDK.rand(0, @length - 1)]

    Array::first = -> @[0]

    Array::last = -> @[@length - 1]

    Array::shuffle = ->
        n = @length
        while n > 1
            n--
            k = SDK.rand(0, n + 1)
            v = @[k]
            @[k] = @[n]
            @[n] = v
        return

    Array::count = -> @length

    #Number Extension
    #------------------------------------------------------------------------------
    Number::do = (method) -> SDK.times @, method

    Number::clamp = (min, max) -> Math.min Math.max(this, min), max

    #Sprite Extension
    #------------------------------------------------------------------------------
    Sprite::moveToCenter = (dx, dy) ->
        dx = SDK.check(dx, 0)
        dy = SDK.check(dy, 0)
        @move(-@bitmap.width / 2 + dx, -@bitmap.height / 2 + dy)

    Sprite::setStaticAnchor = (floatX, floatY) ->
        @x -= Math.round(@width * floatX)
        @y -= Math.round(@height * floatY)
        return

    Sprite::moveToParentCenter = () ->
        return unless @parent
        @move(@parent.width / 2, @parent.height / 2)

    #Bitmap Extension
    #------------------------------------------------------------------------------
    Bitmap::fillAll = (color) -> @fillRect(0, 0, @width, @height, color.CSS)

    Bitmap::drawIcon = (x, y, icon, size) ->
        size = SDK.check(size, 32)
        bitmap = null
        if icon instanceof Bitmap
            bitmap = icon
        else
            bitmap = BitmapSrc.LoadFromIconIndex(icon).bitmap
        @drawOnMe bitmap, x, y, size, size

    Bitmap::drawOnMe = (bitmap, x, y, sw, sh) ->
        x = SDK.check(x, 0)
        y = SDK.check(y, 0)
        sw = SDK.check(sw, 0)
        sh = SDK.check(sh, 0)
        sw = bitmap.width if sw <= 0
        sh = bitmap.height if sh <= 0
        @blt bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh
        return

    Bitmap::drawTextFull = (text, position) ->
        position = SDK.check(position, 'center')
        @drawText text, 0, 0, @width, @height, position

    #SDK
    #------------------------------------------------------------------------------
    SDK = ->
        throw new Error('This is a static class')
        return

    SDK.rand = (min, max) ->
        Math.round(Math.random() * (max - min)) + min

    SDK.setConstantToObject = (object, constantName, constantValue) ->
        object[constantName] = constantValue
        Object.freeze object[constantName] if typeof object[constantName] == 'object'
        Object.defineProperty object, constantName, { writable: false }
        return

    SDK.convertBitmapToBase64Data = (bitmap) -> bitmap._canvas.toDataURL 'image/png'

    SDK.times = (times, method) ->
        i = 0
        while i < times
            method i
            i++

    SDK.toGlobalCoord = (layer, coordSymbol) ->
        coordSymbol = SDK.check(coordSymbol, 'x')
        t = layer[coordSymbol]
        node = layer
        while node
            t -= node[coordSymbol]
            node = node.parent
        return (t * -1) + layer[coordSymbol]

    SDK.isInt = (n) -> Number(n) == n and n % 1 == 0
    SDK.isFloat = (n) -> Number(n) == n and n % 1 != 0

    SDK.check = (value, defaultValue) ->
        if defaultValue == undefined or defaultValue == null
            defaultValue = true
        if value == undefined or value == null
            defaultValue
        else
            value

    SDK.checkSwitch = (switchValue) ->
        return true if switchValue in ['A', 'B', 'C', 'D']
        return false

    #For compability with PLATFORM
    SDK.setConstant = (object, name, value) ->
        SDK.setConstantToObject object, name, value

    #Color
    #------------------------------------------------------------------------------
    class Color
        constructor: (@r, @g , @b , @a) ->
            @r = SDK.check(@r, 255)
            @g = SDK.check(@g, 255)
            @b = SDK.check(@b, 255)
            @a = SDK.check(@a, 255)

        getLightestColor: (lightLevel) ->
            bf = 0.3 * @R + 0.59 * @G + 0.11 * @B
            p = 0
            newColor = [0, 0, 0, 0]
            if bf - lightLevel >= 0
                if bf >= 0
                    p = Math.abs(bf - lightLevel) / lightLevel
                newColor = @ARR.map((c) ->
                    c - (p * c)
                )
            else
                if bf >= 0
                    p = (lightLevel - bf) / (255 - bf)
                newColor = @ARR.map((c) ->
                        [
                            (255 - c) * p + c
                            255
                        ].min()
                    )
            return new Color newColor[0], newColor[1], newColor[2], newColor[3]

        clone: -> @reAlpha @a

        reAlpha: (newAlpha) -> return new Color @r, @g, @b, newAlpha || 255

        @AddConstantColor: (name, color) ->
            color.toHex()
            color.toArray()
            color.toCSS()
            SDK.setConstantToObject Color, name, color
            return

        toHex: ->
            return @_colorHex if @_colorHex?
            r = Math.floor(@r).toString(16).padZero(2)
            g = Math.floor(@g).toString(16).padZero(2)
            b = Math.floor(@b).toString(16).padZero(2)
            @_colorHex = '#' + r + g + b

        toArray: ->
            return @_colorArray if @_colorArray?
            @_colorArray = [@r, @g, @b, @a]

        toCSS: ->
            return @_colorCss if @_colorCss?
            nr = Math.round(@r)
            ng = Math.round(@g)
            nb = Math.round(@b)
            na = @a / 255
            @_colorCss = "rgba(#{nr},#{ng},#{nb},#{na})"

        @Random: ->
            a = SDK.rand(1, 254)
            b = SDK.rand(1, 254)
            c = SDK.rand(1, 254)
            new Color(a, b, c, 255)

        @FromHex: (hexString) ->
            result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString)
            color = null
            if result?
                color =
                    r: parseInt(result[1], 16)
                    g: parseInt(result[2], 16)
                    b: parseInt(result[3], 16)
            if color?
                new Color color.r, color.g, color.b, 255
            else
                return Color.NONE


    Object.defineProperties Color.prototype,
        R:
            get: -> @r
            configurable: true
        G:
            get: -> @g
            configurable: true
        B:
            get: -> @b
            configurable: true
        A:
            get: -> @a
            configurable: true
        ARR:
            get: -> @toArray()
            configurable: true
        CSS:
            get: -> @toCSS()
            configurable: true
        HEX:
            get: -> @toHex()
            configurable: true

    Color.AddConstantColor 'NONE', new Color(0, 0, 0, 0)
    Color.AddConstantColor 'BLACK', new Color(0, 0, 0 , 255)
    Color.AddConstantColor 'WHITE', new Color(255, 255, 255, 255)
    Color.AddConstantColor 'RED', new Color(255, 0, 0, 255)
    Color.AddConstantColor 'GREEN', new Color(0, 255, 0, 255)
    Color.AddConstantColor 'BLUE', new Color(0, 0, 255, 255)
    Color.AddConstantColor 'AQUA', new Color(128, 255, 255, 255)
    Color.AddConstantColor 'MAGENTA', new Color(128, 0, 128, 255)
    Color.AddConstantColor 'YELLOW', new Color(255, 255, 0, 255)
    Color.AddConstantColor 'ORANGE', new Color(255, 128, 0, 255)

    #DevLog
    #------------------------------------------------------------------------------
    __TMP_LOGS__ = []
    class DevLog
        constructor: (@prefix) ->
            @prefix = SDK.check(@prefix, "")
            @_isShow = typeof DEV != 'undefined'
            @_color = Color.BLACK
            @_backColor = Color.WHITE
            __TMP_LOGS__.push @

        on: ->
            @_isShow = true
            @
        
        off: ->
            @_isShow = false
            @

        applyRandomColors: ->
            @applyRandomWithoutBackgroundColors()
            @setBackColor Color.Random()
            @

        applyRandomWithoutBackgroundColors: ->
            @setColor Color.Random()
            @

        setColor: (color) ->
            @_color = color
            @

        setBackColor: (backColor) ->
            @_backColor = backColor
            @

        applyLibraryColors: ->
            @setColors new Color(22, 120, 138, 0), Color.BLACK
            @

        setColors: (color, backColor) ->
            @setColor color
            @setBackColor backColor
            @

        applyExtensionColors: ->
            @setColors new Color(22 , 143 , 137, 0), Color.BLACK.getLightestColor(60)
            @

        applyWarningColors: ->
            @setColors Color.ORANGE, Color.BLACK.getLightestColor(100)
            @

        p: (text) ->
            return unless @_isShow
            console.log("") unless text?
            @_printText text
            return
        
        _printText: (text) ->
            text = @prefix + " : " + text
            if @_isUsingColor()
                @_printTextWithColors text
            else
                console.log text

        _isUsingColor: () ->
            @_color != Color.BLACK or @_backColor != Color.WHITE

        _printTextWithColors: (text) ->
            args = ['%c' + text, "color: #{@_color.HEX} ; background: #{@_backColor.HEX};"]
            window.console.log.apply console, args

        @CreateForLib: (library) ->
            dlog = new DevLog(library.name)
            dlog.applyLibraryColors()
            dlog

        @EnableAllLogs: () ->
            __TMP_LOGS__.forEach((log) -> log.on())

    #BitmapSrc
    #------------------------------------------------------------------------------
    class BitmapSrc
        constructor: ->
            @bitmap = null
        
        @CACHE = {}

        @LoadFromIconIndex: (iconIndex) ->
            bs = new BitmapSrc()
            unless BitmapSrc.CACHE[iconIndex]?
                iconset = ImageManager.loadSystem 'IconSet'
                pw = Window_Base._iconWidth
                ph = Window_Base._iconHeight
                sx = iconIndex % 16 * pw
                sy = Math.floor(iconIndex / 16) * ph
                icon_bitmap = new Bitmap(pw, ph)
                icon_bitmap.addLoadListener ->
                    icon_bitmap.blt iconset, sx, sy, pw, ph, 0, 0
                    return
                BitmapSrc.CACHE[iconIndex] = icon_bitmap
            bs.bitmap = BitmapSrc.CACHE[iconIndex]
            return bs

        @LoadFromImageFolder: (filename) ->
            bs = new BitmapSrc()
            bs.bitmap = ImageManager.loadPicture filename
            return bs

        @LoadFromBase64: (data, name) ->
            bs = new BitmapSrc()
            if name?
                if BitmapSrc.CACHE[name]?
                    bs.bitmap = BitmapSrc.CACHE[name]
                else
                   BitmapSrc.CACHE[name] = Bitmap.load data
                   bs.bitmap = BitmapSrc.CACHE[name]
            else
                bs.bitmap = Bitmap.load data
            return bs

        @LoadFromMemory: (symbol) ->
            bs = new BitmapSrc()
            if BitmapSrc.CACHE[symbol]?
                bs.bitmap = BitmapSrc.CACHE[symbol]
            else
                bs.bitmap = ImageManager.loadEmptyBitmap()
            return bs

    #ParametersManager
    #------------------------------------------------------------------------------
    PluginManager.getPluginParametersByRoot = (rootName) ->
        for property of @_parameters
            if @_parameters.hasOwnProperty property
                pluginParameters = @_parameters[property]
                if PluginManager.isPluginParametersContentKey(pluginParameters, rootName)
                    return pluginParameters
        PluginManager.parameters rootName

    PluginManager.isPluginParametersContentKey = (pluginParameters, key) ->
        pluginParameters[key] != undefined

    class ParametersManager
        constructor: (@pluginName) ->
            @_cache = {}
            @_parameters = PluginManager.getPluginParametersByRoot @pluginName

        isLoaded: ->
            @_parameters? && @_parameters.hasOwnProperty @pluginName
        
        isHasParameter: (name) -> @_parameters[name]?

        getString: (name) -> @_parameters[name]

        convertField: (object, fieldName) ->
            try
                object[fieldName] = JSON.parse(object[fieldName] or 'false')
            catch e
                console.error 'Error while convert field ' + e.name
                object[fieldName] = false
            return object

        convertImage: (object, fieldName) ->
            object[fieldName] = @loadImage(object[fieldName])

        loadImage: (filename, smooth) ->
            try
                if filename
                    path = filename.split('/')
                    filename = path.last()
                    path = path.first() + '/'
                    return ImageManager.loadBitmap 'img/' + path, filename, 0, smooth or true
                else
                    return ImageManager.loadEmptyBitmap()
            catch e
                console.error e
                return ImageManager.loadEmptyBitmap()
            
        getFromCacheOrInit: (name, func) ->
            unless @isInCache(name)
                if func?
                    object = func.call @
                    @putInCache name, object
            @getFromCache name

        isInCache: (name) ->
            @_cache.hasOwnProperty name

        putInCache: (name, object) -> @_cache[name] = object

        getFromCache: (name) -> @_cache[name]

        getNumber: (name) ->
            number = @getObject(name)
            return number if SDK.isInt(number)
            0

        getObject: (name) ->
            if @isHasParameter(name)
                JSON.parse @getString(name) or '{}'
            else
                {}

        getBoolean: (name) ->
            if @isHasParameter(name)
                JSON.parse @getString(name) or false
            else
                false

    #StringsLoader
    #------------------------------------------------------------------------------
    class StringsLoader
        constructor: (@_parameters) ->

        loadAllStringsToObject: (object) ->
            strings = @_collect object
            @_writeNewString object, strings
            return

        _collect: (object) ->
            properties = Object.getOwnPropertyNames object
            strings = properties.filter (item) -> item.includes "STRING_"
            return strings

        _writeNewString: (object, strings) ->
            for string in strings
                @_setStringFromPluginParametersToObject object, string
            return

        _setStringFromPluginParametersToObject: (object, stringName) ->
            newValue = @_parameters[stringName]
            object[stringName] = newValue if newValue
            return

    #EXTENSION TO GLOBAL
    #------------------------------------------------------------------------------
    KDCore.SDK = SDK
    KDCore.Color = Color
    KDCore.DevLog = DevLog
    KDCore.BitmapSrc = BitmapSrc
    KDCore.ParametersManager = ParametersManager
    KDCore.StringsLoader = StringsLoader

    return

# ■ END KDCore.coffee
#---------------------------------------------------------------------------