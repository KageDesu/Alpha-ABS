#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AILogicManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    AILogicManager = () -> throw new Error("This is a static class")

    AILogicManager.getTargetsInRange = (bot) ->
        try
            return null unless AlphaABS.isABS()
            all = AILogicManager.getAllInRange bot
            if all.length > 0
                (enemy for enemy in all when !enemy.isAlly(bot)).first()
            else
             return null
        catch
            return null

    AILogicManager.getAllInRange = (bot) ->
        try
            return [] unless AlphaABS.isABS()
            all = $gameTroop.membersABS().concat [$gamePlayer]
            all = all.concat $gameParty.membersABS()
            inRange = AlphaABS.UTILS.inRadius(bot, bot.behaviorModel().viewRadius, all)
            inRange = inRange.filter (item) -> AlphaABS.BattleManagerABS.isValidTarget item
            if !bot.behaviorModel().ignoreObstacles
                return inRange.filter (item) ->
                    AlphaABS.BattleManagerABS.checkLineOfSight bot.toPoint(), item.toPoint()
            else
                return inRange
        catch
            return []

    AILogicManager.getAlliesInRange = (bot) ->
        try
            return null unless AlphaABS.isABS()
            all = AILogicManager.getAllInRange bot
            if all.length > 0
                (ally for ally in all when ally.isAlly(bot) and ally.inBattle()).first()
            else
             return null
        catch
            return null

    AILogicManager.targetInVisibleRange = (bot) ->
        target = bot?.target()
        return false unless target?.inActive()
        view = bot.behaviorModel().viewRadius
        distance = AlphaABS.UTILS.distanceTo bot, target
        return distance < view


    AILogicManager.inOutReturnRange = (bot) ->
        home = bot?.getHomePosition()
        return false unless home?
        returnDistance = bot.behaviorModel().returnRadius
        distance = AlphaABS.UTILS.distanceTo bot, home
        return distance > returnDistance

    AILogicManager.canUseActionNow = (bot) ->
        action = bot?.currentAction()
        if action? then AlphaABS.BattleManagerABS.canUseSkillByTimer action else false

    AILogicManager.inActionRange = (bot) ->
        action = bot?.currentAction()
        if action?
            target = bot.target()
            return AlphaABS.BattleManagerABS.canUseSkillByRange bot, target, action if target
        return false

    AILogicManager.isUsableABSSkill = (absSkill, isEnemy) ->
        return AILogicManager.isUsableABSSkillForEnemy(absSkill) if isEnemy is true
        return AILogicManager.isUsableABSSkillForAlly(absSkill)

    AILogicManager.isUsableABSSkillForEnemy = (absSkill) ->
        return false if absSkill.isZoneType()
        return false if absSkill.isRadiusType()
        return false if absSkill.isNeedAmmo()
        return false if absSkill.isVectorTypeR()
        return false if absSkill.isFirearm()
        true

    AILogicManager.isUsableABSSkillForAlly = (absSkill) ->
        return false if absSkill.isZoneType()
        return false if absSkill.isRadiusType()
        return false if absSkill.isVectorTypeR()
        return false if absSkill.isFirearm()
        #TODO: Firearm for ally
        true

    AlphaABS.register AILogicManager
    AlphaABS.LIBS.AILogicManager = AILogicManager
    AlphaABS.AILogicManager = AILogicManager
    return
# ■ END AILogicManager.coffee
#---------------------------------------------------------------------------
