function Yd_frame(){
    // var this.dict_rows;
    // var this.keys;
    // var this.rows;
    // var this.index;
}
Yd_frame.prototype = {
  // constructor: Yd_frame,
  // 输入
  init: function(frame){
    this.frame = frame;

    this.dict_rows = this.getDictRows();
    this.keys = this.getKeys().get();
    this.index = this.getIndex().get();
    this.rows = this.getRows().get();
    return this;
  },
  setIndex: function(index) {
    this.index = index;
    return this;
  },
  initDictRows: function(dict_rows){
    var len = dict_rows.length;
    var index = new Yd_list().init1N(len).get();
    this.initDictRowsIndex(dict_rows, index);
    return this;
  },
  initDictRowsIndex: function(dict_rows, index){
    if(dict_rows.length != index.length){
      debugger;
    }
    this.frame = {};
    for (var i = 0; i < dict_rows.length; i++) {
      var dict = dict_rows[i];
      var idx = index[i];
      this.frame[idx] = dict;
    }

    this.dict_rows = this.getDictRows();
    this.keys = this.getKeys().get();
    this.index = this.getIndex().get();
    this.rows = this.getRows().get();
    return this;
  },
  initKeysRows: function(keys, rows){
    var len = rows.length;
    var index = new Yd_list().init1N(len).get();
    this.initIndexKeysRows(index, keys, rows);
    return this;
  },
  initKeysRowsMat: function(mat){
    // 默认第一行是keys，剩下的是rows

    return this;
  },
  initIndexKeysRows: function(index, keys, rows){
    if(rows.length != index.length){
      debugger;
    }
    this.frame = {};
    for (var i = 0; i < index.length; i++) {
      var idx = index[i];
      var list = rows[i];
      var dict = {};
      if(keys.length != list.length){
        debugger;
      }
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        var value = list[j];
        dict[key] = value;
      }
      this.frame[idx] = dict;
    }

    this.dict_rows = this.getDictRows();
    this.keys = this.getKeys().get();
    this.index = this.getIndex().get();
    this.rows = this.getRows().get();
    return this;
  },
  initIndexKeysRowsMat: function(mat){
    // 默认第一列是index，第一行是keys，剩下的是rows
    
    return this;
  },
  initKeysCols: function(keys, cols){
    var rows = new Yd_mat().init(cols).Transpose().get();
    this.initKeysRows(keys, rows);
    return this;
  },
  initDictCols: function(dict_cols){
    keys = Object.keys(dict_cols);
    cols = Object.values(dict_cols);
    return this.initKeysCols(keys, cols);
  },
  merge: function(new_frame){
      
      return this;
  },
  pushKeyCol: function(key, col) {
    var dict_rows = this.getDictRows();
    var index = this.getIndex().get();
    for(var i=0; i< dict_rows.length; i++) {
        dict_rows[i][key] = col[i];
    }
    return new Yd_frame().initDictRowsIndex(dict_rows, index);
  },
  pushKeyColOfSameValue: function(key, value) {
    var dict_rows = this.getDictRows();
    var index = this.getIndex().get();
    for(var i=0; i< dict_rows.length; i++) {
        dict_rows[i][key] = value;
    }
    return new Yd_frame().initDictRowsIndex(dict_rows, index);
  },
  pushIndexRow: function(new_index, new_row) {
      
    return this;
  },


  // 输出
  get: function(){
    return this.frame;
  },
  isEmpty: function() {
    if (Object.keys(this.frame).length == 0) {
      return true;
    }else{
      return false;
    }
  },
  len: function() {
    return Object.keys(this.frame).length;
  },
  len2: function() {
    var t_values = Object.values(this.frame);
    return Object.keys(t_values[0]).length;
  },
  getKeys: function(){
    if (this.len() > 0) {
      var t_values = Object.values(this.frame);
      return new Yd_list().init(Object.keys(t_values[0]));
    }else{
      return new Yd_list().init([]);
    }          
  },
  getIndex: function() {
    return new Yd_list().init(Object.keys(this.frame));
  },
  getRows: function() {
    var t_values = Object.values(this.frame);
    var t_mat = [];
    for (var i = 0; i < t_values.length; i++) {
      var t_dict = t_values[i];
      var t_list = new Yd_dict().init(t_dict).getValues().get();
      t_mat.push(t_list);
    }
    return new Yd_mat().init(t_mat);
  },
  getRow: function(p_index) {
      
  },
  getIndexRows: function() {
    var t_values = Object.values(this.frame);
    var t_index = this.getIndex().get();
    if(t_values.length != t_index.length){
        debugger;
      }
    var index_rows = {};
    for (var i = 0; i < t_values.length; i++) {
      var t_dict = t_values[i];
      var t_idx = t_index[i];
      var t_list = new Yd_dict().init(t_dict).getValues().get();
      index_rows[t_idx] = t_list;
    }
    return index_rows;
  },
  getDictRows: function(){
    return Object.values(this.frame);
  },
  getCol: function(p_key) {
    var dict_rows = this.getDictRows();

    var column = new Array();
    for(var i=0; i< dict_rows.length; i++) {
        var value = dict_rows[i][p_key];
        column.push(value);
    }
    return new Yd_list().init(column);
  },
  getKeysCols: function() {
    
  },
  getDictCols: function(){
    
  },  
  Transpose: function() {
    var t_index = this.getIndex().get();
    var t_mat = this.getRows().get();
    var t_keys = this.getKeys().get();

    var new_keys = new Yd_list().init(t_index).clone().get();
    var new_index = new Yd_list().init(t_keys).clone().get();
    var new_mat = new Yd_mat().init(t_mat).clone().Transpose().get();
    var new_frame = new Yd_frame().initIndexKeysRows(new_index, new_keys, new_mat);
    return new_frame;
  },

  // 改变
  filterValue: function(key, value_array) {
    var dict_rows = this.getDictRows();
    var list;
    var rows = [];
    var t_array = new Yd_list().init(value_array);
    for(var i=0; i< dict_rows.length; i++) {
        if ( t_array.has(dict_rows[i][key])){
            list = new Yd_dict().init(dict_rows[i]).clone().get();
            rows.push(list);
        }
    }
    return rows;
  },
  reIndexAndTrunc: function(p_index, p_num) {
    var t_index = this.getIndex().get();
    var t_mat = this.getRows().get();
    var t_keys = this.getKeys().get();

    var new_mat = new Yd_mat().init(t_mat).reIndex(p_index).trunc(p_num).get();
    var new_index = new Yd_list().init(t_index).reIndex(p_index).trunc(p_num).get();
    var new_keys = new Yd_list().init(t_keys).clone().get();
    return new Yd_frame().initIndexKeysRows(new_index, new_keys, new_mat);
  },
  
  // 数字
  sumAlongCol: function(f_stat) {
    var t_keys = this.getKeys().get();
    var t_json = {};
    for (var i = 0; i < t_keys.length; i++) {
        var t_key = t_keys[i];
        var t_col = this.getCol(t_key).get();
        var t_stat = f_stat(t_col);
        t_json[t_key] = t_stat;
    }
    return new Yd_dict().init(t_json);
  },

  // 转换输出
  clone: function() {
    if (!this.isEmpty()) {
      var new_frame = {};
      var t_index = this.getIndex().get();
      for (var i = 0; i < t_index.length; i++) {
        var t_idx = t_index[i];
        var value = this.frame[t_idx];
        new_frame[t_idx] = new Yd_dict().init(value).clone().get();
      }
      return new Yd_frame().init(new_frame);
    }else{
      return new Yd_frame().init({});
    }            
  }, 
  complete: function(default_value) {
    var dict_rows = this.getDictRows();
    var keys = this.getKeys().get();
    var index = this.getIndex().get();
    var all_keys = [];
    for (var i = 0; i < dict_rows.length; i++) {
      var t_keys = Object.keys(dict_rows[i]);
      all_keys = all_keys.concat(t_keys);
    }
    keys = new Yd_list().init(all_keys).unique().get();

    var all_json_rows = [];

    for(var i=0; i< dict_rows.length; i++) {
        var old_row = dict_rows[i];
        var new_list = {};
        for(var j=0; j < keys.length; j++) {
            var t_key = keys[j];
            var t_value = old_row[t_key];
            if (t_value) {
                new_list[t_key] = t_value;
            }else {
                new_list[t_key] = default_value;
            }
        }
        all_json_rows.push(new_list);
    }
    return new Yd_frame().initDictRowsIndex(all_json_rows, index);
  },
  toScatter: function(){
    // key, index, value
    var t_index = this.getIndex().get();
    var t_mat = this.getRows().get();
    var t_keys = this.getKeys().get();
    var i, j, this_row, 
        node = new Array(), 
        scatter_data = new Array();

     for(i=0; i<t_mat.length; i++) {
        this_row = t_mat[i];
        for(j=0; j<this_row.length; j++) {
           node = [ t_keys[j],
                    t_index[i],
                    this_row[j]];
           scatter_data.push(node);
        }
     }
     return new Yd_mat().init(scatter_data);
  }, 
  toJson: function(){
    
    
  },  
  
  // 其他
  echartsInitFromTimelineData: function(index_dict, f_get_dict){
    var index = Object.keys(index_dict);
    this.frame = {};
    for (var i = 0; i < index.length; i++) {
      var idx = index[i];
      var complex = index_dict[idx];
      
      var dict = f_get_dict(complex);
      this.frame[idx] = dict;
    }

    this.dict_rows = this.getDictRows();
    this.keys = this.getKeys().get();
    this.index = this.getIndex().get();
    this.rows = this.getRows().get();
    return this;
  },
  echartsGenMapScatter: function(match_key, replace_key, dict_col, concat_after) {
    var dict_rows = this.getDictRows();
    var index = this.getIndex().get();
    for(var i=0; i< dict_rows.length; i++) {
        var this_row = dict_rows[i];

        var dict_key = this_row[match_key];
        var dict_value = dict_col[dict_key];
        if (dict_value) {
            if (concat_after){
              dict_rows[i][replace_key] = dict_rows[i][replace_key].concat(dict_value); 
            }else{
              dict_rows[i][replace_key] = dict_value.concat(dict_rows[i][replace_key]); 
            }
            
        }
    }
    return new Yd_frame().initDictRowsIndex(dict_rows, index);
  }
};
