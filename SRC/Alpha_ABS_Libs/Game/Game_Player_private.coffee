#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player_private.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[CLASS PART]
    #@[CLASS IMPL ONLY]

    #@[DEFINES]
    _ = Game_Player::
    BattleUI = AlphaABS.BattleUI

    _._onAttackClick = ->
        if @_absParams.autoAttackMode
            @turnTowardCharacter(@target())
            return
        if @isNoTargetAttackMode() == true
            @_onNoTargetAttackClick()
        else
            @_onAutoAttackClick()

    _._onNoTargetAttackClick = ->
        BattleUI.touchOnControlPanel 0
        @_performNoTargetAction()
    
    _._performNoTargetAction = ->
        try
            return unless @_checkNoTargetAction()
            @_prepareNoTargetAction()
            absSkill = @battler().skillABS_attack()
            if absSkill.isVectorType()
                this._absParams.currentAction = absSkill
                target = this._findEndPointForVectorSkill()
                proc = AlphaABS.BattleManagerABS.battleProcess()
                proc.startPostBattleAction(@, target, @.battler().action(0), absSkill)
                @_completeNoTargetAction []
            else
                targets = @_findTargetForNoTargetAction $gameTroop.membersABS()
                @_completeNoTargetAction targets
            return
        catch e
            AlphaABS.error e, 'while perfrom attack'

    _._checkNoTargetAction = ->
        absSkill = @battler().skillABS_attack()
        if absSkill.isFirearm() and absSkill.isNeedReloadStack()
            @battler().reloadFirearm()
            return false
        return false unless absSkill.isReady()
        return false unless @_absParams.state == 'free'
        return false unless AlphaABS.BattleManagerABS.canUseABSSkillNow(@, null, absSkill)
        return true

    _._prepareNoTargetAction = ->
        b = @battler()
        b.makeActions()
        b.action(0).setAttack()

    #TODO:  Поиск целей вынести в отдельный класс
    _._findTargetForNoTargetAction = (members) ->
        finalTargets = []
        absSkill = @battler().skillABS_attack()
        if absSkill.isSimpleNoTarget()
            if absSkill.range == 1
                finalTargets = @_findTargetsForSimpleNoTargetWeapon members
            else
                targets = @_findTargetsForPierceNoTargetWeapon members
                if targets.length <= 1
                    finalTargets = targets
                else
                    nearest = @_findNearestTarget(targets)
                    finalTargets = [nearest] if nearest?
        else if absSkill.isPierce()
            finalTargets = @_findTargetsForPierceNoTargetWeapon members
            if absSkill.pierce > 1 # * Ограниченное количество пробиваний
                finalTargets = finalTargets.slice 0, absSkill.pierce
        else if absSkill.isSwing()
            finalTargets = @_findTargetsForSwingNoTargetWeapon members
        return finalTargets

    _._findTargetsForSimpleNoTargetWeapon = (members) ->
        targets = []
        absSkill = @battler().skillABS_attack()
        inRadius = AlphaABS.UTILS.inRadius(@, absSkill.range + 1, members)
        if inRadius.length > 0
            inRadius.forEach (member) ->
                return unless member?
                return unless member.isAlive()
                return unless member.inActive()
                targets[0] = member if AlphaABS.UTILS.inFront($gamePlayer, member)
        targets

    _._findTargetsForPierceNoTargetWeapon = (members) ->
        targets = []
        absSkill = @battler().skillABS_attack()
        inRadius = AlphaABS.UTILS.inRadius(@, absSkill.range + 1, members)
        if inRadius.length > 0
            inRadius.forEach (member) ->
                return unless member?
                return unless member.isAlive()
                return unless member.inActive()
                targets.push member if AlphaABS.UTILS.inDirectionHard($gamePlayer, member)
        targets

    _._findTargetsForSwingNoTargetWeapon = (members) ->
        targets = []
        absSkill = @battler().skillABS_attack()
        inRadius = AlphaABS.UTILS.inRadius(@, absSkill.range + 2, members)
        if inRadius.length > 0
            inRadius.forEach (member) ->
                return unless member?
                return unless member.isAlive()
                return unless member.inActive()
                targets.push(member) if AlphaABS.UTILS.inFront($gamePlayer, member)
                targets.push(member) if AlphaABS.UTILS.isFrontNeighbor($gamePlayer, member)
        targets

    _._findNearestTarget = (members) ->
        return null if members.length == 0
        nearest = members.first()
        dist = AlphaABS.UTILS.distanceTo($gamePlayer, nearest)
        members.forEach (member) ->
                return unless member?
                return unless member.isAlive()
                return unless member.inActive()
                newDist = AlphaABS.UTILS.distanceTo($gamePlayer, member)
                if newDist < dist
                    dist = newDist
                    nearest = member
        nearest

    _._completeNoTargetAction = (targets) ->
        b = @battler()
        bProcess = AlphaABS.LIBS.BattleManagerABS.battleProcess()
        if (targets.length > 0)
            for i in [0...targets.length]
                bProcess.performBattleAction(this, targets[i])
        b.performCurrentAction()
        b.performAttack()
        b.skillABS_attack().playStartSound(null)
        @onBattleStart() unless @inBattle()
        if targets? and targets.length > 0
            AlphaABS.BattleManagerABS.setPlayerTarget(targets[0]) if targets[0] isnt @target()
        return

    _._onAutoAttackClick = ->
        if @_turnAutoAttack()
            BattleUI.touchOnControlPanel 0
            BattleUI.selectOnControlPanel 0
        else
            BattleUI.diselectOnControlPanel 0
            BattleUI.disableOnControlPanel 0 unless this.target()?
        return

    _._onMouseAttackOnTarget = ->
        return unless @_checkNoTargetAction()
        t = @target()
        @turnTowardCharacter t
        absSkill = @battler().skillABS_attack()
        inRadius = AlphaABS.UTILS.inRadius(@, absSkill.range + 1, [t])
        if inRadius.length > 0
            @_performNoTargetAction()
            AlphaABS.BattleManagerABS.setPlayerTarget(t) if t isnt @target()
        return

    _._isRangeToTargetGood = ->
        return false unless @battler()?
        absSkill = @battler().skillABS_attack()
        return true unless @target()?
        d = AlphaABS.UTILS.distanceTo(@, @target())
        if absSkill.range >= d
            return AlphaABS.UTILS.inDirectionHard(@, @target())
        return false

    #TODO: Пока это всё в предварительном варианте, так что будут отдельные функции для поиска и определения целей для ABS:1

    _._findEndPointForVectorSkill = ->
        absSkill = this._absParams.currentAction
        return AlphaABS.UTILS.getEndPointFromCharToRange(@, absSkill.range)

    return
# ■ END Game_Player_private.coffee
#---------------------------------------------------------------------------