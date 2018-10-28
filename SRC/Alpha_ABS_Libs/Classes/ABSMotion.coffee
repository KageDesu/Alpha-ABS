#╒═════════════════════════════════════════════════════════════════════════╛
# ■ ABSMotion.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    class ABSMotion
        constructor: () ->

        setMotion: (name, offset, character) ->
            @_character = character
            @_charName =  character._characterName
            @_charIndex =  character._characterIndex
            @_motionName = @_createName(name)
            @_yOffset = offset
            @_loadMotion()

        _createName: (name) -> "zmotion_" + @_charName + "_" + @_charIndex + "_" + name

        _loadMotion: -> ImageManager.loadCharacter(@_motionName)

        getOffset: -> @_yOffset

        setLooping: -> @isLoop = true

        applyMotionIdle: () ->
            @_state = 'idle'
            @character()._characterName = @_motionName
            @character()._characterIndex = 0

        applyMotionState: () ->
            @_state = 'state'
            @character()._characterName = @_motionName
            @character()._characterIndex = 4

        applyMotionAction: () ->
            @applyMotionState() unless @inState()
            @_state = 'action'
            @character().updatePattern()
            
        motionPattern: (pattern) ->
            return 2 if @inAction()
            return pattern % 2

        onActionDone: () -> @_state = 'state'
            
        inAction: () -> @_state == 'action'

        inState: () -> @_state == 'state'

        character: () -> @_character

        clearMotion: () ->
            # * Возвращяет обычную графику персонажу
            @character()._characterName = @_charName
            @character()._characterIndex = @_charIndex
        
    AlphaABS.register ABSMotion
    return
# ■ END ABSMotion.coffee
#---------------------------------------------------------------------------