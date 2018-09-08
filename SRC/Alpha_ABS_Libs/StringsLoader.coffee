do ->
  class StringsLoader
    constructor: (@_parameters) ->

    loadAllStrings: (object) ->
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

  AlphaABS.register StringsLoader

  return
