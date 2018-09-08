#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AIStateBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class AIStateBase
        constructor: () ->
            @_bot = null
            @_log = null
            @_init()

        _init: -> #EMPTY

        update: (bot) ->
            return unless @_setup(bot)
            @_updateMainLogic()
            @_bot = null

        _setup: (bot) ->
            return false unless bot?
            @_bot = bot
            return @_setupMain()

        _updateMainLogic: -> #EMPTY
        _setupMain: -> return true
        onStateStarted: -> #EMPTY

        log: (text) ->
            try
                return unless DEV?
                @_createLog() if @_log == null
                @_log.p "#{ @_bot.aiName} : #{text}" if @_bot?
            catch
                return

        _createLog: ->
            try
                @_log = new KDCore.DevLog this.constructor.name
                @_log.setColor KDCore.Color.FromHex('#00BD43')
            catch
                return

    AlphaABS.register AIStateBase
    return
# ■ END AIStateBase.coffee
#---------------------------------------------------------------------------
