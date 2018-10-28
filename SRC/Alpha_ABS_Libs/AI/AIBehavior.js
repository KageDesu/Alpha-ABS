(function () {
  var LOG = new PLATFORM.DevLog("Game_AIBehavior");
  //Game_AIBehavior
  //------------------------------------------------------------------------------
  /* jshint -W104 */
  class Game_AIBehavior {
    constructor() {}

    loadEnemy(ai) {
      var templateIndex = 0;
      var enemyObject = $dataEnemies[ai._absParams.enemyId];
      if (enemyObject.meta.ABS) {
        var newTemplateIndex = parseInt(t.meta.ABS);
        if (newTemplateIndex > 0)
          templateIndex = newTemplateIndex;
      }
      this._loadParamsBase(templateIndex);
      this._readEnemyData(ai._absParams.enemyId);
      this._readEventData(ai);
      this._checkParams();
    }

    _loadParamsBase(templateIndex) {
      if (templateIndex >= Game_AIBehavior.TEMPLATES.length) {
        templateIndex = 0;
      }
      var template = Game_AIBehavior.TEMPLATES[templateIndex];
      Game_AIBehavior.PARAMS.forEach(function (p) {
        if (template[p])
          this[p] = template[p];
        else
          this[p] = 0;
      }.bind(this));
    }

    _readEnemyData(enemyId) {
      var t = $dataEnemies[enemyId];
      Game_AIBehavior.PARAMS.forEach(function (p) {
        if (t.meta[p]) {
          this[p] = parseInt(t.meta[p]);
          LOG.p("AI override Enemy param : " + p + " new value " + this[p]);
        }
      }.bind(this));
    }

    _readEventData(gameEvent) {
      var t = gameEvent.page().list;
      for (var i = 0; i < t.length; i++) {
        var item = t[i];
        if (item.code == 108) {
          var comment = item.parameters[0];
          Game_AIBehavior.PARAMS.forEach(function (p) {
            if (comment.indexOf("<" + p) >= 0) {
              var t2 = new RegExp("<" + p + "\\s?:\\s?(.+?)>", "i");
              var match = t2.exec(comment);
              if (match) {
                this[p] = parseInt(match[1]);
                LOG.p("AI override Event param : " + p + " new value " + this[p]);
              }
            }

          }.bind(this));
        }
      }
    }

    _checkParams() {
      if (this.slow == 1)
        this.slow = true;
    }

    loadAlly() {
      this._loadParamsBase(1);
      this._checkParams();
    }
  }

  AlphaABS.register(Game_AIBehavior);

  SDK.setConstant(Game_AIBehavior, 'TEMPLATES', //YOU CAN ADD YOU OWN TEMPLATE, but DON'T MODIFY EXIST ZERO TEMPLATE!!!
    [{ //Zero template
        viewRadius: 5, //Насколько клеток игровой карты видит АИ
        returnRadius: 12, //На сколько клеток может макисимум убежать от последней позиции, где сражался
        escapeOnBattle: false, //Будет ли убегать во время битвы когда нет доступных действий
        canSearch: true, //Слышит ли что происходит вокруг (реакция на битву рядом (в зоне viewRadius))
        noFight: false, //Не будет сражаться вообще
        reviveTime: 0, //Через сколько возродится (секунды)
        regen: true, //Регенерация
        slow: false, //Медленный в бою
        agressive: true, //Агрессивный (всегда догоняет)
        noMove: false, //Не может двигаться в бою
        noEmote: false, //Не показывает эмоции
        cEonStart: 0, //Common Event ID when start battle (see player)
        cEonEnd: 0, //Common Event ID when stop battle (after start)
        cEonDeath: 0, //Common Event ID when Death
        returnType: 0, //Тип возвращения (0 - быстрый, 1 - обычный, 2 - стоит на месте)
        teamId: 1, //Команда
        rage: true, //Может агрится
        ignoreObstacles: false, //Игнорирует регионы препядствий (видит сквозь стены)
        heavy: false, //Нельзя сдвинуь импульсом (1 - нельзя, 0 - можно)
        showHP: false, //Показывать полоску здоровья над врагом всегда (0 - нет, 1 - да)
        motion: false
      }, //END Zero template
      { //Template for Ally
        viewRadius: 5,
        returnRadius: 12,
        escapeOnBattle: false,
        canSearch: true,
        noFight: false,
        agressive: true,
        noMove: false,
        noEmote: true,
        cEonStart: 0,
        cEonEnd: 0,
        cEonDeath: 0,
        returnType: 1,
        teamId: 0,
        rage: false,
        ignoreObstacles: false,
        heavy: false,
        showHP: false,
        motion: false
      }
    ]
  );

  SDK.setConstant(Game_AIBehavior, 'PARAMS', ['viewRadius', 'returnRadius', 'escapeOnBattle',
    'canSearch', 'noFight', 'reviveTime', 'regen', 'slow', 'agressive',
    'noMove', 'noEmote', 'cEonStart', 'cEonDeath', 'cEonEnd', 'returnType',
    'teamId', 'rage', 'ignoreObstacles', 'heavy', 'showHP', 'motion', 'motionOffset'
  ]);

  //END Game_AIBehavior
  //------------------------------------------------------------------------------

})();