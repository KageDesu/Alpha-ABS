function Game_SkillManagerABS() {
  this.initialize.apply(this, arguments);
}
(function () {
  //Game_SkillManagerABS
  //------------------------------------------------------------------------------

  Game_SkillManagerABS.prototype.initialize = function () {
    this._skillsABS = [];
    this._requestRefresh();
  };

  Game_SkillManagerABS.prototype.all = function () {
    return this._skillsABS;
  };

  Game_SkillManagerABS.prototype.remove = function (objId, isItem) {
    for (var i = 0; i < this._skillsABS.length; i++) {
      var item = this._skillsABS[i];
      if (isItem) {
        if (item.skillId == objId && item.isItem()) {
          this._skillsABS.splice(i, 1);
          this._requestRefresh();
          break;
        }
      } else {
        if (item.skillId == objId && !item.isItem()) {
          this._skillsABS.splice(i, 1);
          this._requestRefresh();
          break;
        }
      }
    }
  };

  Game_SkillManagerABS.prototype.push = function (objId, isItem) {
    var item = new Game_SkillABS(objId, isItem);
    if (!item.hasError()) {
      this._skillsABS.push(item);
      this._requestRefresh();
    }
  };

  Game_SkillManagerABS.prototype.update = function () {
    this._skillsABS.forEach(function (item) {
      item.update();
    });
  };

  Game_SkillManagerABS.prototype.skills = function () {
    if (this._needRefreshSkills) {
      this._skills = [];
      for (var i = 0; i < this._skillsABS.length; i++) {
        var item = this._skillsABS[i];
        if (!item.isItem()) {
          this._skills.push(item);
        }
      }
      this._needRefreshSkills = false;
    }
    return this._skills;
  };

  Game_SkillManagerABS.prototype.items = function () {
    if (this._needRefreshItems) {
      this._items = [];
      for (var i = 0; i < this._skillsABS.length; i++) {
        var item = this._skillsABS[i];
        if (item.isItem()) {
          this._items.push(item);
        }
      }
      this._needRefreshItems = false;
    }
    return this._items;
  };

  Game_SkillManagerABS.prototype.skillById = function (id) {
    for (var i = 0; i < this._skillsABS.length; i++) {
      var item = this._skillsABS[i];
      if (item.skillId == id && !item.isItem()) {
        return item;
      }
    }
    return null;
  };

  Game_SkillManagerABS.prototype.itemById = function (id) {
    for (var i = 0; i < this._skillsABS.length; i++) {
      var item = this._skillsABS[i];
      if (item.skillId == id && item.isItem()) {
        return item;
      }
    }
    return null;
  };

  //PRIVATE

  Game_SkillManagerABS.prototype._requestRefresh = function () {
    this._needRefreshSkills = true;
    this._needRefreshItems = true;
  };

  //END Game_SkillManagerABS
  //------------------------------------------------------------------------------

})();