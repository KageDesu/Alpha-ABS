#╒═════════════════════════════════════════════════════════════════════════╛
# ■ SlowUpdateManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
#@[GLOBAL DEFINITION]

SlowUpdateManager = -> throw new Error 'Static class'

SlowUpdateManager.init = ->
    @_threadOwners = []
    @_threadObjects = []
    @_threadTimers = []

SlowUpdateManager.register = (objectId, object, time) ->
    unless SlowUpdateManager._getOwnerIndex(objectId) >= 0
        @_threadOwners.push objectId
        @_threadObjects.push object
        object.activateSlowUpdate()
    
    #"REGISTER".p(objectId)

    index = SlowUpdateManager._getOwnerIndex(objectId)
    clearInterval @_threadTimers[index]

    thread = setInterval (timeout = ->
            index = SlowUpdateManager._getOwnerIndex(objectId)
            if SlowUpdateManager._threadObjects[index]?
                SlowUpdateManager._threadObjects[index].slowUpdate()
            return
        ), time
    @_threadTimers[index] = thread
    return
    
SlowUpdateManager._getOwnerIndex = (owner) ->
    return @_threadOwners.indexOf owner


SlowUpdateManager.clear = (objectId) ->
    #"CLEAR".p(objectId)
    index = SlowUpdateManager._getOwnerIndex(objectId)
    if index >= 0
        clearInterval @_threadTimers[index]
        @_threadTimers[index] = null
        @_threadOwners[index] = null
        @_threadObjects[index] = null
        @_threadObjects.delete null
        @_threadOwners.delete null
        @_threadTimers.delete null
    return

SlowUpdateManager.clearAll = ->
    @_threadOwners.forEach((id) -> SlowUpdateManager.clear(id))
    @_threadOwners = []
    @_threadObjects = []
    @_threadTimers = []
    return

# ■ END SlowUpdateManager.coffee
#---------------------------------------------------------------------------