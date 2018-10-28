#╒═════════════════════════════════════════════════════════════════════════╛
# ■ ABS_Input.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    #?[FROM ATBS]

    DefaultKeyConfig = ['w', 'd', 's', 'a',
        'e', 'q',
        'w', 'd', 's', 'a',
        '1', '2', '3', '4', '5', '6', '7', '8', 'r'
    ]

    UNSAFE = ['q', 'w', 'x', 'z', 'space']
    KEYS_RAW = []
    KEYS_GAME = []

    Input.KeyMapperPKD = {}
    Input.KeyMapperPKD[i] = String.fromCharCode(i) for i in [48..57] #Numbers
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase() for i in [65..90] #Letters Upper
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase() for i in [97..122] #Letters Lower (for key code events)

    alias_atbs_input_onKeyDown = Input._onKeyDown
    Input._onKeyDown = (event) ->
         alias_atbs_input_onKeyDown.call @, event
         return if Input.keyMapper[event.keyCode]
         Input._setStateWithMapperPKD event.keyCode
         return

    Input._setStateWithMapperPKD = (keyCode, state) ->
        state = SDK.check(state, true)
        symbol = Input.KeyMapperPKD[keyCode]
        @_currentState[symbol] = state if symbol?
        return

    alias_atbs_input_onKeyUp = Input._onKeyUp
    Input._onKeyUp = (event) ->
         alias_atbs_input_onKeyUp.call @, event
         return if Input.keyMapper[event.keyCode]
         Input._setStateWithMapperPKD event.keyCode, off
         return

    Input.isCancel = ->
        if Input.isGamepad()
            Input.isTriggered('pageup') #LB
        else
            Input.isTriggered('cancel') or TouchInput.isCancelled()


    IKey = -> throw new Error 'This is a static class'

    IKey.CP_W = -> KEYS_GAME[0]
    IKey.CP_D = -> KEYS_GAME[1]
    IKey.CP_S = -> KEYS_GAME[2]
    IKey.CP_A = -> KEYS_GAME[3]

    IKey.WC = -> KEYS_GAME[4]
    IKey.TS = -> KEYS_GAME[5]

    IKey.SC_W = -> KEYS_GAME[6]
    IKey.SC_D = -> KEYS_GAME[7]
    IKey.SC_S = -> KEYS_GAME[8]
    IKey.SC_A = -> KEYS_GAME[9]

    IKey.SP_1 = -> KEYS_GAME[10]
    IKey.SP_2 = -> KEYS_GAME[11]
    IKey.SP_3 = -> KEYS_GAME[12]
    IKey.SP_4 = -> KEYS_GAME[13]
    IKey.SP_5 = -> KEYS_GAME[14]
    IKey.SP_6 = -> KEYS_GAME[15]
    IKey.SP_7 = -> KEYS_GAME[16]
    IKey.SP_8 = -> KEYS_GAME[17]

    IKey.WR = -> KEYS_GAME[18]

    IKey.loadDefaultKeyConfig = () ->
        @loadKeyConfig DefaultKeyConfig.slice 0 #Clone

    IKey.loadKeyConfig = (keyBindingsArray) ->
        KEYS_RAW = keyBindingsArray
        for i in [0...KEYS_RAW.length]
            KEYS_GAME[i] = IKey.convertUnsafeSymbols KEYS_RAW[i] if KEYS_RAW[i]?
        return

    IKey.convertUnsafeSymbols = (symbol) ->
        symbol = symbol.toLowerCase()
        return symbol unless UNSAFE.include(symbol)
        return 'pageup' if symbol == 'q'
        return 'pagedown' if symbol == 'w'
        return 'escape' if symbol == 'x'
        return 'ok' if symbol == 'z'
        return 'ok' if symbol == 'space'

    IKey.convertIKeyToLetter = (symbol) ->
        return KEYS_RAW[0] if symbol == IKey.CP_W()
        return KEYS_RAW[1] if symbol == IKey.CP_D()
        return KEYS_RAW[2] if symbol == IKey.CP_S()
        return KEYS_RAW[3] if symbol == IKey.CP_A()

        return KEYS_RAW[4] if symbol == IKey.WC()
        return KEYS_RAW[5] if symbol == IKey.TS()

        return KEYS_RAW[6] if symbol == IKey.SC_W()
        return KEYS_RAW[7] if symbol == IKey.SC_D()
        return KEYS_RAW[8] if symbol == IKey.SC_S()
        return KEYS_RAW[9] if symbol == IKey.SC_A()

        return KEYS_RAW[10] if symbol == IKey.SP_1()
        return KEYS_RAW[11] if symbol == IKey.SP_2()
        return KEYS_RAW[12] if symbol == IKey.SP_3()
        return KEYS_RAW[13] if symbol == IKey.SP_4()
        return KEYS_RAW[14] if symbol == IKey.SP_5()
        return KEYS_RAW[15] if symbol == IKey.SP_6()
        return KEYS_RAW[16] if symbol == IKey.SP_7()
        return KEYS_RAW[17] if symbol == IKey.SP_8()

        return KEYS_RAW[18] if symbol == IKey.WR()
        return ""

    IKey.isTriggeredWeapCircleIndex = () ->
        return 0 if Input.isTriggered(IKey.SC_W())
        return 1 if Input.isTriggered(IKey.SC_D())
        return 2 if Input.isTriggered(IKey.SC_S())
        return 3 if Input.isTriggered(IKey.SC_A())
        return null

    IKey.isTriggeredSkillPanelIndex = () ->
        return 1 if Input.isTriggered(IKey.SP_1())
        return 2 if Input.isTriggered(IKey.SP_2())
        return 3 if Input.isTriggered(IKey.SP_3())
        return 4 if Input.isTriggered(IKey.SP_4())
        return 5 if Input.isTriggered(IKey.SP_5())
        return 6 if Input.isTriggered(IKey.SP_6())
        return 7 if Input.isTriggered(IKey.SP_7())
        return 8 if Input.isTriggered(IKey.SP_8())
        return null

    IKey.getGameRawKeys = -> return KEYS_RAW

    IKey.getGameKeyByIndex = (index) -> return KEYS_GAME[index]

    IKey.changeRawKey = (index, key) ->
        KEYS_RAW[index] = key
        KEYS_GAME[index] = @convertUnsafeSymbols(key)

    AlphaABS.register IKey
    AlphaABS.LIBS.IKey = IKey
    return
# ■ END ABS_Input.coffee
#---------------------------------------------------------------------------