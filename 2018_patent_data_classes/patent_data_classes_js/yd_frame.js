function Yd_frame(){
  this.names = [];
  this.keys = [];
  this.lists = [];
}
Yd_frame.prototype = {
  // constructor: Yd_frame,
  // 输入
  initNamesKeysLists: function(names, keys, lists){
    if(lists.length != names.length){
      debugger;
    }

    this.keys = keys;
    this.names = names;
    this.lists = lists;

    return this;
  },
  initMatNamesKeysLists: function(mat){
    // 默认第一列是names，第一行是keys，剩下的是lists

    return this;
  },
  initFrame: function(frame){
    this.keys = this.GetKeysFromFrame(frame);
    this.lists = this.GetListsFromFrame(frame);
    this.names = this.GetNamesFromFrame(frame);

    return this;
  },
  initNamesDicts: function(names, dicts){
    if(dicts.length != names.length){
      debugger;
    }
    this.names = names;
    this.keys = this.GetKeysFromDicts(dicts);
    this.lists = this.GetListsFromDicts(dicts);

    return this;
  },
  initNamesDictsAndComplete: function(names, dicts, default_value){
    var default_value = default_value || 0;

    if(dicts.length != names.length){
      debugger;
    }

    var all_keys = [];
    for (var i = 0; i < dicts.length; i++) {
      var t_keys = Object.keys(dicts[i]);
      all_keys = all_keys.concat(t_keys);
    }
    var new_keys = new Yd_list().init(all_keys).unique().get();

    var new_dicts = [];

    for(var i=0; i< dicts.length; i++) {
        var old_dict = dicts[i];
        var new_dict = {};
        for(var j=0; j < new_keys.length; j++) {
            var t_key = new_keys[j];
            var t_value = old_dict[t_key];
            if (t_value) {
                new_dict[t_key] = t_value;
            }else {
                new_dict[t_key] = default_value;
            }
        }
        new_dicts.push(new_dict);
    }

    return new Yd_frame().initNamesDicts(names, new_dicts);
  },
  initKeysClists: function(keys, clists){
    var lists = new Yd_mat().init(clists).Transpose().get();
    this.initKeysLists(keys, lists);
    return this;
  },

  // 无names 输入
  setNames: function(names) {
    this.names = names;
    return this;
  },
  initKeysLists: function(keys, lists){
    var len = lists.length;
    var names = new Yd_list().init1N(len).get();
    this.initNamesKeysLists(names, keys, lists);
    return this;
  },
  initMatKeysLists: function(mat){
    // 默认第一行是keys，剩下的是lists

    return this;
  },
  initDicts: function(dicts){
    var len = dicts.length;
    var names = new Yd_list().init1N(len).get();
    this.initNamesDicts(names, dicts);
    return this;
  },
  initCdicts: function(cdicts){
    keys = Object.keys(cdicts);
    clists = Object.values(cdicts);
    return this.initKeysClists(keys, clists);
  },

  // push 输入
  merge: function(new_frame){
      
      return this;
  },
  pushKeyClist: function(key, col) {
    // 未验证
    if(col.length != this.lists.length){
      debugger;
    }
    this.keys.push(key);
    for(var i=0; i< this.lists.length; i++) {
        this.lists[i].push(col[i]);
    }
    return this;
  },
  pushKeyClistOfSameValue: function(key, value) {
    // 未验证
    if(col.length != this.lists.length){
      debugger;
    }
    this.keys.push(key);
    for(var i=0; i< this.lists.length; i++) {
        this.lists[i].push(value);
    }
    return this;
  },
  pushNameList: function(new_index, new_row) {
      
    return this;
  },


  // 输出
  getFrame: function(){
    return this.GetFrameFromNamesKeysLists(this.names, this.keys, this.lists);
  },
  isEmpty: function() {
    if (this.lists.length == 0) {
      return true;
    }else{
      return false;
    }
  },
  len: function() {
    return this.lists.length;
  },
  len2: function() {
    if (this.len()) {
      return this.lists[0].length;  
    }else{
      return 0;
    }    
  },
  getKeys: function(){
    return new Yd_list().init(this.keys);
  },
  
  getNames: function() {
    return new Yd_list().init(this.names);
  },
  
  getLists: function() {
    return new Yd_mat().init(this.lists);
  },
  
  getClists: function() {
    return new Yd_mat().init(this.lists).Transpose();
  },

  getNamesLists: function() {
    var t_lists = this.lists;
    var t_names = this.names;
    if(t_lists.length != t_names.length){
        debugger;
      }
    var names_lists = {};
    for (var i = 0; i < t_lists.length; i++) {
      var t_list = t_lists[i];
      var t_idx = t_names[i];
      names_lists[t_idx] = t_list;
    }
    return names_lists;
  },
  getDicts: function(){
    return this.GetDictsFromKeysLists(this.keys, this.lists);
  },
  
  getClist: function(p_key) {
    var index = this.keys.indexOf(p_key);
    var column = new Array();
    for(var i=0; i< this.lists.length; i++) {
        var value = this.lists[i][index];
        column.push(value);
    }
    return new Yd_list().init(column);
  },
  // updateClist: function(p_key, p_clist) {
  //   var index = this.keys.indexOf(p_key);
  //   var column = new Array();
  //   for(var i=0; i< this.lists.length; i++) {
  //       var value = this.lists[i][index];
  //       column.push(value);
  //   }
  //   return new Yd_list().init(column);
  // },
  getKeysClists: function() {
    
  },
  getCdicts: function(){
    
  },  
  Transpose: function() {
    var t_keys = this.keys;
    var t_index = this.names;
    var t_lists = this.lists;

    var new_keys = new Yd_list().init(t_index).clone().get();
    var new_index = new Yd_list().init(t_keys).clone().get();
    var new_mat = new Yd_mat().init(t_lists).clone().Transpose().get();
    var new_frame = new Yd_frame().initNamesKeysLists(new_index, new_keys, new_mat);
    return new_frame;
  },

  // 改变
  filterValue: function(key, value_array) {
    var index = this.keys.indexOf(key);
    var list;
    var new_lists = [];
    var name;
    var new_names = [];
    var t_array = new Yd_list().init(value_array);
    for(var i=0; i< this.lists.length; i++) {
        if ( t_array.has(this.lists[i][index])){
            list = new Yd_list().init(this.lists[i]).clone().get();
            new_lists.push(list);
            name = this.names[i];
            new_names.push(name);
        }
    }
    this.lists = new_lists;
    this.names = new_names;
    return this;
  },
  iterFunc: function(f_filter){
   

    return this;
  },
  iterMatFunc: function(f_filter){
   

    return this;
  },
  iterListFunc: function(f_filter){
    for (var i = 0; i < this.lists.length; i++) {
      var t_list = this.lists[i];
      this.lists[i] = f_filter(t_list);
    }
    return this;
  },
  iterClistFunc: function(f_filter){
    this.lists = new Yd_mat().init(this.lists).iterClistFunc(f_filter).get();
    return this;
  },
  trunc: function(p_num) {
    var t_keys = this.keys;
    var t_index = this.names;
    var t_lists = this.lists;

    var new_mat = new Yd_mat().init(t_lists).trunc(p_num).get();
    var new_index = new Yd_list().init(t_index).trunc(p_num).get();
    var new_keys = new Yd_list().init(t_keys).clone().get();
    return new Yd_frame().initNamesKeysLists(new_index, new_keys, new_mat);
  },
  reIndexAndTrunc: function(p_index, p_num) {
    var t_keys = this.keys;
    var t_index = this.names;
    var t_lists = this.lists;

    var new_mat = new Yd_mat().init(t_lists).reIndex(p_index).trunc(p_num).get();
    var new_index = new Yd_list().init(t_index).reIndex(p_index).trunc(p_num).get();
    var new_keys = new Yd_list().init(t_keys).clone().get();
    return new Yd_frame().initNamesKeysLists(new_index, new_keys, new_mat);
  },
  
  // 数字
  sumClists: function(f_stat) {
    var t_keys = this.keys;
    var t_json = {};
    for (var i = 0; i < t_keys.length; i++) {
        var t_key = t_keys[i];
        var t_col = this.getClist(t_key).get();
        var t_stat = f_stat(t_col);
        t_json[t_key] = t_stat;
    }
    return new Yd_dict().init(t_json);
  },

  // 转换输出
  clone: function() {
    if (!this.isEmpty()) {
      var new_lists = new Yd_mat().init(this.lists).clone().get();
      var new_names = new Yd_list().init(this.names).clone().get();
      var new_keys = new Yd_list().init(this.keys).clone().get();
      return new Yd_frame().initNamesKeysLists(new_names, new_keys, new_lists);
    }else{
      return new Yd_frame();
    }            
  }, 
  toScatter: function(){
    // key, names, value
    var t_index = this.names;
    var t_lists = this.lists;
    var t_keys = this.keys;
    var i, j, this_list, 
        node = new Array(), 
        scatter_data = new Array();

     for(i=0; i<t_lists.length; i++) {
        this_list = t_lists[i];
        for(j=0; j<this_list.length; j++) {
           node = [ t_keys[j],
                    t_index[i],
                    this_list[j]];
           scatter_data.push(node);
        }
     }
     return new Yd_mat().init(scatter_data);
  },
  toGroup: function(col_key) {
    t_lists_group = {};
    t_names_group = {};

    var t_lists = this.lists;
    var t_names = this.names;
    var t_keys = this.keys;

    var t_uniques = this.getClist(col_key).unique().get();
    for(i=0; i<t_uniques.length; i++) {
      var this_unique = t_uniques[i];
      t_lists_group[this_unique] = new Array();
      t_names_group[this_unique] = new Array();
    }

    var t_clist = this.getClist(col_key).get();
    for(i=0; i<t_clist.length; i++) {
      var this_item = t_clist[i]; 
      var this_list = t_lists[i];
      var this_name = t_names[i];
      t_lists_group[this_item].push(this_list);
      t_names_group[this_item].push(this_name);
    }

    var t_frame_group = {};
    for(var key in t_lists_group) {
      var value = t_lists_group[key];
      var names = t_names_group[key];
      t_frame_group[key] = new Yd_frame().initNamesKeysLists(names, t_keys, value);
    }   

    return t_frame_group;
  },  
  
  // 其他
  GetKeysFromFrame: function(frame){
    var t_values = Object.values(frame);
    return Object.keys(t_values[0]);        
  },
  GetKeysFromDicts: function(dicts){
    return Object.keys(dicts[0]);         
  },
  GetNamesFromFrame: function(frame) {
    return Object.keys(frame);
  },
  GetListsFromFrame: function(frame) {
    var t_values = Object.values(frame);
    return this.GetListsFromDicts(t_values);
  },
  GetListsFromDicts: function(dicts) {
    var t_values = dicts;
    var t_lists = [];
    for (var i = 0; i < t_values.length; i++) {
      var t_dict = t_values[i];
      var t_list = new Yd_dict().init(t_dict).getValues().get();
      t_lists.push(t_list);
    }
    return t_lists;
  },
  GetDictsFromFrame: function(frame){
    return Object.values(frame);
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
  GetFrameFromNamesKeysLists: function(names, keys, lists){
    if(lists.length != names.length){
      debugger;
    }
    var frame = {};
    for (var i = 0; i < names.length; i++) {
      var idx = names[i];
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
      frame[idx] = dict;
    }

    return frame;
  },

  echartsGenMapScatter: function(match_key, replace_key, concat_after) {
    var dicts = this.GetDictsFromKeysLists(this.keys, this.lists);
    var names = this.names;
    for(var i=0; i< dicts.length; i++) {
        var this_list = dicts[i];

        var dict_key = this_list[match_key];
        var dict_value = new YdPosition().getPositionByEnglish([dict_key])[0];
        if (dict_value) {
            if (concat_after){
              dicts[i][replace_key] = dicts[i][replace_key].concat(dict_value); 
            }else{
              dicts[i][replace_key] = dict_value.concat(dicts[i][replace_key]); 
            }
        }
    }
    return new Yd_frame().initNamesDicts(names, dicts);
  },
  echartsGenChinaMapScatter: function(match_key, replace_key, concat_after) {
    var dicts = this.GetDictsFromKeysLists(this.keys, this.lists);
    var names = this.names;
    for(var i=0; i< dicts.length; i++) {
        var this_list = dicts[i];

        var dict_key = this_list[match_key];
        var dict_value = new YdChinaPosition().getChinaPosition([dict_key])[0];
        if (dict_value) {
            if (concat_after){
              dicts[i][replace_key] = dicts[i][replace_key].concat(dict_value); 
            }else{
              dicts[i][replace_key] = dict_value.concat(dicts[i][replace_key]); 
            }
        }
    }
    return new Yd_frame().initNamesDicts(names, dicts);
  }
};
