function Yd_sheet(){
  this.keys = [];
  this.lists = [];
}
Yd_sheet.prototype = {
  initKeysLists: function(keys, lists){
    this.keys = keys;
    this.lists = lists;

    return this;
  },
  initMatKeysLists: function(mat){
    // 默认第一行是keys，剩下的是lists

    return this;
  },
  initDicts: function(dicts){
    this.keys = this.GetKeysFromDicts(dicts);
    this.lists = this.GetListsFromDicts(dicts);
    return this;
  },
  GetKeysFromDicts: function(dicts){
    return Object.keys(dicts[0]);         
  },
  GetListsFromDicts: function(dicts) {
    var t_values = dicts;
    var t_lists = [];
    for (var i = 0; i < t_values.length; i++) {
      var t_dict = t_values[i];
      var t_list = new Yd_dict().init(t_dict).bldValues().get();
      t_lists.push(t_list);
    }
    return t_lists;
  },

  
  // 输出
  getIsEmpty: function() {
    if (this.lists.length == 0) {
      return true;
    }else{
      return false;
    }
  },
  getLen1: function() {
    return this.lists.length;
  },
  getLen2: function() {
    if (this.getLen1()) {
      return this.lists[0].length;  
    }else{
      return 0;
    }    
  },
  getDicts: function(){
    return this.GetDictsFromKeysLists(this.keys, this.lists);
  },
  GetDictsFromKeysLists: function(keys, lists){
    var dicts = [];
    for (var i = 0; i < lists.length; i++) {
      var list = lists[i];
      var dict = {};
      if(keys.length != list.length){
        debugger;
      }
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        var value = list[j];
        dict[key] = value;
      }
      dicts.push(dict);
    }

    return dicts;
  },

  // 
  bldKeys: function(){
    return new Yd_list().init(this.keys);
  },
  bldLists: function() {
    return new Yd_mat().init(this.lists);
  },
  
  bldClists: function() {
    return new Yd_mat().init(this.lists).bldTranspose();
  },
  bldClist: function(p_key) {
    var index = this.keys.indexOf(p_key);
    var column = new Array();
    for(var i=0; i< this.lists.length; i++) {
        var value = this.lists[i][index];
        column.push(value);
    }
    return new Yd_list().init(column);
  },
  bldTrunc: function(p_num) {
    var t_keys = this.keys;
    var t_lists = this.lists;

    var new_mat = new Yd_mat().init(t_lists).toTrunc(p_num).get();
    var new_keys = new Yd_list().init(t_keys).bldClone().get();
    return new Yd_sheet().initKeysLists(new_keys, new_mat);
  },
  bldClone: function() {
    if (!this.getIsEmpty()) {
      var new_lists = new Yd_mat().init(this.lists).bldClone().get();
      var new_keys = new Yd_list().init(this.keys).bldClone().get();
      return new Yd_sheet().initKeysLists(new_keys, new_lists);
    }else{
      return new Yd_sheet();
    }            
  },


  // 改变
  toIterListFunc: function(f_filter){
    for (var i = 0; i < this.lists.length; i++) {
      var t_list = this.lists[i];
      this.lists[i] = f_filter(t_list);
    }
    return this;
  },
  toIterClistFunc: function(f_filter){
    this.lists = new Yd_mat().init(this.lists).toIterClistFunc(f_filter).get();
    return this;
  },
  toFilterClistByValues: function(key, value_array) {
    var index = this.keys.indexOf(key);
    var list;
    var new_lists = [];
    var t_array = new Yd_list().init(value_array);
    for(var i=0; i< this.lists.length; i++) {
        if ( t_array.getIsHaving(this.lists[i][index])){
            list = new Yd_list().init(this.lists[i]).bldClone().get();
            new_lists.push(list);
        }
    }
    this.lists = new_lists;
    return this;
  }


  // 改变  
  // toPushKeyClist: function(key, col) {
  //   // 未验证
  //   if(col.length != this.lists.length){
  //     debugger;
  //   }
  //   this.keys.push(key);
  //   for(var i=0; i< this.lists.length; i++) {
  //       this.lists[i].push(col[i]);
  //   }
  //   return this;
  // },
  // toPushKeyClistOfSameValue: function(key, value) {
  //   // 未验证
  //   if(col.length != this.lists.length){
  //     debugger;
  //   }
  //   this.keys.push(key);
  //   for(var i=0; i< this.lists.length; i++) {
  //       this.lists[i].push(value);
  //   }
  //   return this;
  // },
};

