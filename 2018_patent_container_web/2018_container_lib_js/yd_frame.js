function Yd_frame(){
  this.names = [];
  this.keys = [];
  this.lists = [];
}
Yd_frame.prototype = {
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
    var new_keys = new Yd_list().init(all_keys).bldUnique().get();

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
    this.keys = this.GetKeysFromDicts(dicts);
    this.lists = this.GetListsFromDicts(dicts);
    var len = this.lists.length;
    this.names = new Yd_list().init1N(len).get();
    return this;
  },

  // 输出
  getNamesDicts: function(){
    return this.GetFrameFromNamesKeysLists(this.names, this.keys, this.lists);
  },
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
    if (this.len()) {
      return this.lists[0].length;  
    }else{
      return 0;
    }    
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
  getSumDictByClist: function() {
    var t_keys = this.keys;
    var t_json = {};
    for (var i = 0; i < t_keys.length; i++) {
        var t_key = t_keys[i];
        var t_col = this.bldClist(t_key).get();
        var t_stat = new Yd_list().init(t_col).getSum();
        t_json[t_key] = t_stat;
    }
    return t_json;
  },

  bldKeys: function(){
    return new Yd_list().init(this.keys);
  },
  
  bldNames: function() {
    return new Yd_list().init(this.names);
  },
  
  bldLists: function() {
    return new Yd_mat().init(this.lists);
  },
  bldList: function(p_name) {
    var t_index = this.names.indexOf(p_name);
    var t_row = this.lists[t_index];
    return new Yd_list().init(t_row);
  },
  bldClists: function() {
    return new Yd_mat().init(this.lists).bldTranspose();
  },
  bldClist: function(p_key) {
    var t_index = this.keys.indexOf(p_key);
    var t_column = new Array();
    for(var i=0; i< this.lists.length; i++) {
        var t_value = this.lists[i][t_index];
        t_column.push(t_value);
    }
    return new Yd_list().init(t_column);
  },
  bldTranspose: function() {
    var t_keys = this.keys;
    var t_names = this.names;
    var t_lists = this.lists;

    var new_keys = new Yd_list().init(t_names).bldClone().get();
    var new_names = new Yd_list().init(t_keys).bldClone().get();
    var new_mat = new Yd_mat().init(t_lists).bldClone().bldTranspose().get();
    var new_frame = new Yd_frame().initNamesKeysLists(new_names, new_keys, new_mat);
    return new_frame;
  },
  bldTrunc: function(p_num) {
    var t_keys = this.keys;
    var t_names = this.names;
    var t_lists = this.lists;

    var new_mat = new Yd_mat().init(t_lists).toTrunc(p_num).get();
    var new_names = new Yd_list().init(t_names).bldTrunc(p_num).get();
    var new_keys = new Yd_list().init(t_keys).bldClone().get();
    return new Yd_frame().initNamesKeysLists(new_names, new_keys, new_mat);
  },
  bldReindexNamesAndTrunc: function(p_index, p_num) {
    var t_keys = this.keys;
    var t_names = this.names;
    var t_lists = this.lists;

    var new_mat = new Yd_mat().init(t_lists).toReindex(p_index).toTrunc(p_num).get();
    var new_names = new Yd_list().init(t_names).bldReindex(p_index).bldTrunc(p_num).get();
    var new_keys = new Yd_list().init(t_keys).bldClone().get();
    return new Yd_frame().initNamesKeysLists(new_names, new_keys, new_mat);
  },
  bldReindexKeysAndTrunc: function(p_index, p_num) {
    var t_keys = this.keys;
    var t_names = this.names;
    var t_lists = this.lists;

    var new_mat = new Yd_mat().init(t_lists).bldTranspose().toReindex(p_index).toTrunc(p_num).bldTranspose().get();
    var new_keys = new Yd_list().init(t_keys).bldReindex(p_index).bldTrunc(p_num).get();
    var new_names = new Yd_list().init(t_names).bldClone().get();
    return new Yd_frame().initNamesKeysLists(new_names, new_keys, new_mat);
  },
  bldSortKeysSumAndTrunc: function(p_num) {
    var t_sum_dict = this.getSumDictByClist();
    var t_sum_dict_sorted = new Yd_dict().init(t_sum_dict).toSortIndex();

    var t_dest_sorted = t_sum_dict_sorted.bldKeys().get();
    var t_index_sorted = t_sum_dict_sorted.getSortIndex();

    var t_destyear_frame = this.bldReindexKeysAndTrunc(t_index_sorted, p_num);
    return t_destyear_frame;
  },
  bldClone: function() {
    if (!this.getIsEmpty()) {
      var new_lists = new Yd_mat().init(this.lists).bldClone().get();
      var new_names = new Yd_list().init(this.names).bldClone().get();
      var new_keys = new Yd_list().init(this.keys).bldClone().get();
      return new Yd_frame().initNamesKeysLists(new_names, new_keys, new_lists);
    }else{
      return new Yd_frame();
    }            
  },
  bldScatter: function(){
    // key, names, value
    var t_names = this.names;
    var t_lists = this.lists;
    var t_keys = this.keys;
    var i, j, this_list, 
        node = new Array(), 
        scatter_data = new Array();

     for(i=0; i<t_lists.length; i++) {
        this_list = t_lists[i];
        for(j=0; j<this_list.length; j++) {
           node = [ t_keys[j],
                    t_names[i],
                    this_list[j]];
           scatter_data.push(node);
        }
     }
     return new Yd_mat().init(scatter_data);
  },
  bldMapScatterEcharts: function(match_key, replace_key, concat_after) {
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
  bldChinaMapScatterEcharts: function(match_key, replace_key, concat_after) {
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
      var t_list = new Yd_dict().init(t_dict).bldValues().get();
      t_lists.push(t_list);
    }
    return t_lists;
  },
  GetDictsFromFrame: function(frame){
    return Object.values(frame);
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
  }
};

