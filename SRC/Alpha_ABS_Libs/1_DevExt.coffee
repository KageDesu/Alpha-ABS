#╒═════════════════════════════════════════════════════════════════════════╛
# ■ DevExt.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    __TMP_LOG__ = null
    String::LOG = ->
        if (__TMP_LOG__ == null)
            __TMP_LOG__ = new KDCore.DevLog("TMP")
            __TMP_LOG__.setColors Color.WHITE, Color.BLACK.getLightestColor(20)
        __TMP_LOG__.p(@)
        return

    Number::LOG = -> @.toString().LOG()

    Array::LOG = -> @.toString().LOG()

    Boolean::LOG = -> @.toString().LOG()

    String::P = -> @.LOG()

    String::p = (additionText) ->
        if additionText?
            str = @ + " : " + additionText
            str.LOG()
        else
            @.LOG()
        

    return

__tObject = null
# ■ END DevExt.coffee
#---------------------------------------------------------------------------