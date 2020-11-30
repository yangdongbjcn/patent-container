function YdList(){
    // var this.list;
    // var this.sortindex;
}
YdList.prototype = {
  init: function(list){
      this.list = list;
      return this;
  },
  isEmpty: function() {
    if (this.list.length == 0) {
      return true;
    }else{
      return false;
    }
  },
  len: function() {
    return this.list.length;
  },
  get: function() {
    return this.list;
  },
  clone: function() {
    var new_list = new Array();
    if (this.list == undefined){
      debugger;
    }
    for (var i = 0; i < this.list.length; i++) {
      var value = this.list[i];
      new_list.push(value);
    }
    return new YdList().init(new_list);
  },
  toDict: function(keys) {
    if(this.len() != keys.length){
      debugger;
    }
    var dict = {};
    for (var i = 0; i < this.list.length; i++) {
      var key = keys[i];
      var value = this.list[i];
      dict[key] = value;
    }
    return new YdDict().init(dict);
  },


  toString: function(sep){
    var sep = sep || '\t';
    return this.list.join(sep);
  },
  toStringLines: function(){
      return this.list.join('\r\n');
  },
  toHistogram: function(p_value){
    var p_input = this.list;
    var t_length = p_value.length;
    var t_hist = new Array(t_length);
    var t_value;
    var i;
    for(i=0; i<p_value.length; i++){
      t_hist[p_value[i]] = 0;
    }
    for(i=0; i<p_input.length; i++){
      var t_in = new YdList().init(p_value).has(p_input[i]);
      if (t_in) {
        t_hist[p_input[i]] = t_hist[p_input[i]] + 1;
      }
    }
    return t_hist;
  },
  filter: function(f_filter){
    var f_filter = f_filter || function(x){return x;};
    for(var i=0; i<this.list.length; i++) {
        this.list[i] = f_filter(this.list[i]);
    }
    return this;
  },
  
  getItems: function(item_num_array) {
      var new_list = new Array();
      for (var i = 0; i < item_num_array.length; i++) {
        var index = item_num_array[i];
        var value = this.list[index];
        new_list.push(value);
      }
      return new_list;
  },
  
  cloneItem: function(item_num) {
      this.list.splice(item_num, 0, this.list[item_num]);
      return this;
  },
  toNumber: function(){
      for(var j=0; j<this.list.length; j++){
          var value = this.list[j];
          if( !isNaN( value ) )
          {
             this.list[j] = value - 0;
          }
      }
      return this;
  },
  sum: function() {
      var s = 0;
      for (var i=0; i<this.len(); i++) {
        s += this.list[i];
      }
      return s;
  },
  average: function() {
      var average = this.sum() / this.len();
      return average;
  },
  count: function(f_filter){
    var f_filter = f_filter || function(x){ if(x>0) {return true;} else {return false;} };
    var num = 0;
    for(var i=0; i<this.list.length; i++) {
        if (f_filter(this.list[i])) {
          num += 1;
        };
    }
    return num;
  },
  has: function(value){
      var t_index = this.list.indexOf(value);
      if ( t_index == -1 ) {
          return false;
      }else{
          return true;
      }
  },
  max: function(){
    return Math.max.apply(Math, this.list);
  },
  min: function(){
    return Math.min.apply(Math, this.list);
  },
  unique: function(){
    var new_array = [];
    for(var i=0; i<this.list.length;i++){
      if(new_array.indexOf(this.list[i]) == -1) {
        new_array.push(this.list[i]);
      }
    }
    return new YdList().init(new_array);
  },
  sort: function() {
    var f_compare = function(value1, value2) {
          if (value1 < value2) {
              return -1;
          }else if(value1 > value2) {
              return 1;
          }else {
              return 0;
          }
      }
      this.list.sort(f_compare); 
    return this;
  },
  gen: function(len) {
    this.list = []; 
    for (var i = 0; i < len; i++) {
      this.list.push(i);
    }
    return this;
  },
  sortIndex: function() {
    this.sortindex = new YdList().init([]).gen(this.list.length).get();
    ydbjarray_merge_sort(this.list, this.sortindex); 
    return this;
  },
  getSortIndex: function(){
    return this.sortindex;
  },
  reIndex: function(p_index){
    var new_list = new Array();
    for (var i = 0; i < p_index.length; i++) {
      var t_index = p_index[i];
      var t_item = this.list[t_index];
      new_list.push(t_item);
    }
    return new YdList().init(new_list);
  },
  trunc: function(len) {
    if (len >= this.list.length) {
      return this;
    }
    var new_list = this.init(this.get()).clone().get();
    new_list.splice(len, new_list.length - len + 1);
    return new YdList().init(new_list);
  },
};

function YdDict(){
    // var this.dict;
    // var this.keys;
    // var this.list;
}
YdDict.prototype = {
  init: function(dict){
    this.dict = dict;
    return this;
  },
  isEmpty: function() {
    if (Object.keys(this.dict).length == 0) {
      return true;
    }else{
      return false;
    }
  },
  len: function() {
    return Object.keys(this.dict).length;
  },
  get: function() {
    return this.dict;
  },
  clone: function() {
      if (!this.isEmpty()) {
        var new_dict = new Object();
        var t_keys = this.getKeys().get();
        for (var i = 0; i < t_keys.length; i++) {
          var key = t_keys[i];
          var value = this.dict[key];
          new_dict[key] = value;
        }
        return new YdDict().init(new_dict);
      }else{
        return new YdDict().init({});
      }              
  },
  initKeysList: function(keys, list) {
    this.dict = {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = list[i];
        this.dict[key] = value;
    }
    return this;
  },
  getKeys: function(){
    return new YdList().init(Object.keys(this.dict));
  },
  getList: function(){
    return new YdList().init(Object.values(this.dict));
  },
  setKeys: function(keys){
    var list = this.getList().get();
    return new YdDict().initKeysList(keys, list);
  },
  setList: function(list){
    var keys = this.getKeys().get();
    return new YdDict().initKeysList(keys, list);
  },
  toMat: function() {
    
  },
  toMat2: function() {
    var t_keys = this.getKeys().get();
    var t_list = this.getList().get();
    return new YdMat().init([t_keys, t_list]);
  },
  
  
  getItems: function(key_array) {
    var new_list = new Array();
    var t_list = this.getList().get();
    for (var i = 0; i < key_array.length; i++) {
      var index = key_array[i];
      var value = t_list[index];
      new_list[index] = value;
    }
    return new_list;
  },
  sortIndex: function() {
    var t_list = this.getList().clone().get();
    this.sortindex = new YdList().init([]).gen(t_list.length).get();
    ydbjarray_merge_sort(t_list, this.sortindex);
    return this;
  },
  getSortIndex: function(){
    return this.sortindex;
  },
  getSortKeys: function(){
    return new YdList().init(Object.keys(this.dict)).reIndex(this.sortindex);
  },
  getSortList: function(){
    return new YdList().init(Object.values(this.dict)).reIndex(this.sortindex);
  },
};

function YdMat(){
    // var this.mat;
}
YdMat.prototype = {
  constructor: YdMat,
  init: function(mat){
    this.mat = mat;
    return this;
  },
  isEmpty: function() {
    if (this.mat.length == 0) {
      return true;
    }else{
      return false;
    }
  },
  len: function() {
    return this.mat.length;
  },
  get: function() {
    return this.mat;
  },
  clone: function() {
    new_mat = new Array();
    for (var i = 0; i < this.mat.length; i++) {
      var new_list = new YdList().init(this.mat[i]).clone().get();
      new_mat.push(new_list);
    }
    var new_mat = new YdMat().init(new_mat);
    return new_mat;
  }, 
  complete: function(default_value) {
      
  },
  len2: function() {
    var len;
    if (this.len() == 0){
      len = 0;
    }else{
      len = this.mat[0].length;
    }
    return len;
  },
  T: function() {
    var new_mat = new Array();
    var col_num = this.len2();
    for(var j=0; j<col_num; j++){
       var new_array = new Array();
       new_mat.push(new_array);
    }
    for(var j=0; j<this.mat.length; j++){
       for(var i=0; i<this.mat[j].length; i++){
          var value = this.mat[j][i];
          try {
            new_mat[i].push(value);  
          }catch(error){
            debugger;
          }
          
       }
    }
    return new YdMat().init(new_mat);
  },
  toDict: function(key_col_num, value_col_num){
    var dict = {};
    var key_array = this.getCol(key_col_num).get();
    var value_array = this.getCol(value_col_num).get();

    for(var j=0; j<key_array.length; j++){
        var t_key = key_array[j];
        var t_value = value_array[j];
        dict[t_key] = t_value;
    }
    return new YdDict().init(dict);
  },
  toDataPivot: function(key_col_num, value_col_num){
    var dict = {};
    var key_array = this.getCol(key_col_num).get();
    var value_array = this.getCol(value_col_num).get();
    var key_unique = new YdList().init(key_array).unique().get();

    for(var j=0; j<key_unique.length; j++){
        var t_key = key_unique[j];
        dict[t_key] = 0;
    }

    for(var j=0; j<key_array.length; j++){
        var t_key = key_array[j];
        var t_value = value_array[j];
        dict[t_key] = dict[t_key] + t_value;
    }
    return new YdDict().init(dict);
  },
  toJsonRows: function(keys){
    if(this.len2() != keys.length){
      debugger;
    }
    var dict_rows = [];
    for(var j=0; j<this.mat.length; j++){
      var dict = new YdList().init(this.mat[j]).toDict(keys).get();
      dict_rows.push(dict);
    }
    return dict_rows;
  },
  toFrame: function(keys, index){
    if(this.len2() != keys.length){
      debugger;
    }
    if(this.len() != index.length){
      debugger;
    }
    var frame = {};
    for(var j=0; j<this.mat.length; j++){
      var idx = index[j];
      var dict = new YdList().init(this.mat[j]).toDict(keys).get();
      frame[idx] = dict;
    }
    return new YdFrame().initDictRows(frame);
  },

  trunc: function(len) {
    if (len >= this.len()) {
      return this;
    }
    var new_mat = this.init(this.get()).clone().get();
    new_mat.splice(len, new_mat.length - len + 1);
    return new YdMat().init(new_mat);
  },
  trunc2: function(len) {
    
  },

  addList: function(new_list){
      this.mat.push(new_list);
      return this;
  },
  cloneCol: function(col_num){
    for (var i = 0; i < this.mat.length; i++) {
      var list = this.mat[i];
      new YdList().init(list).cloneItem(col_num);
    }
    return this;
  },
  getCol: function(col_num) {
      var column = new Array();
      for(var i=0; i< this.mat.length; i++) {
          var value = this.mat[i][col_num];
          column.push(value);
      }
      var ydbjRow = new YdList().init(column);
      return ydbjRow;
  },
  getCols: function(col_num_array) {
      var mat = new Array();
      for(var i=0; i< this.mat.length; i++) {
          var list = new YdList().init(this.mat[i]).getItems(col_num_array);
          mat.push(list);
      }
      return new YdMat().init(mat);
  },

  toNumber: function(){
      for(var j=0; j<this.mat.length; j++){
         for(var i=0; i<this.mat[j].length; i++){
            var value = this.mat[j][i];
            if( !isNaN( value ) )
            {
               this.mat[j][i] = value - 0;
            }
         }
      }
      return this;
  },
  
  
  
  toString: function() {
    var mat = this.mat;
    var t_array = new Array();
    for(var i=0; i<mat.length; i++){
      var list = mat[i];
      var t_string = new YdList().init(list).toString();
      t_array.push(t_string);
    }
    return new YdList().init(t_array).toStringLines();
  },
  
  
  
  matchConcatKeyDict: function(match_colnum, replace_colnum, dict_col, concat_after) {
    for(var i=0; i< this.mat.length; i++) {
        var this_row = this.mat[i];

        var dict_colnum = this_row[match_colnum];
        var dict_value = dict_col[dict_colnum];
        if (dict_value) {
            if (concat_after){
              this.mat[i][replace_colnum] = this.mat[i][replace_colnum].concat(dict_value); 
            }else{
              this.mat[i][replace_colnum] = dict_value.concat(this.mat[i][replace_colnum]); 
            }
        }
    }
    return this;
  },
  matchReplaceKeyDict: function(match_colnum, replace_colnum, dict_col) {
      for(var i=0; i< this.mat.length; i++) {
          var this_row = this.mat[i];
          var dict_colnum = this_row[match_colnum];
          var dict_value = dict_col[dict_colnum];
          if (dict_value) {
              this.mat[i][replace_colnum] = dict_value;
          }
      }
      return this;
  },
  replaceKeyCol: function(col_num, col) {
      for(var i=0; i< this.mat.length; i++) {
          this.mat[i][col_num] = col[i];
      }
      return this;
  },
  findRows: function(col_num, value_array) {
      var list;
      var mat = [];
      var t_array = new YdList().init(value_array);
      for(var i=0; i< this.mat.length; i++) {
          if ( t_array.has(this.mat[i][col_num])){
              list = new YdDict().init(this.mat[i]).clone().get();
              mat.push(list);
          }
      }
      return mat;
  },
  sortCol: function(col_num) {
    var new_col = this.getCol(col_num);
    this.sortindex = new YdList().init([]).gen(new_col.length).get();
    ydbjarray_merge_sort(new_col, this.sortindex); 
    this.mat = new YdMat().init(this.mat).reIndex(this.sortindex).get();
    return this;
  },
  getSortIndex: function(){
    return this.sortindex;
  },
  reIndex: function(p_index) {
    var new_mat = new Array();
    for (var i = 0; i < p_index.length; i++) {
      var t_index = p_index[i];
      var t_item = this.mat[t_index];
      var new_item = new YdList().init(t_item).clone().get();
      new_mat.push(new_item);
    }
    return new YdMat().init(new_mat);
  },

  csvToObject: function(csvString){
    var csvarry = csvString.split("\r\n");
    var datas = [];
    var headers = csvarry[0].split(",");
    for(var i = 1;i<csvarry.length;i++){
      var data = {};
      var temp = csvarry[i].split(",");
        for(var j = 0;j<temp.length;j++){
          data[headers[j]] = temp[j];
        }
      datas.push(data);
    }
    return datas;
  },

  readCSVFile: function(file_path, f_func) {
    var reader = new FileReader();
    reader.readAsText(file_path);
    reader.onload = function () {
      var data = this.csvToObject(this.result);
      // console.log(data);//data为csv转换后的对象
    }
  },
};

function YdFrame(){
    // var this.dict_rows;
    // var this.keys;
    // var this.mat;
    // var this.index;
}
YdFrame.prototype = {
  constructor: YdFrame,
  init: function(frame){
    this.frame = frame;

    this.dict_rows = this.getDictRows();
    this.keys = this.getKeys().get();
    this.index = this.getIndex().get();
    this.mat = this.getMat().get();
    return this;
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
  get: function(){
    return this.frame;
  },
  clone: function() {
    if (!this.isEmpty()) {
      var new_frame = {};
      var t_index = this.getIndex().get();
      for (var i = 0; i < t_index.length; i++) {
        var t_idx = t_index[i];
        var value = this.frame[t_idx];
        new_frame[t_idx] = new YdDict().init(value).clone().get();
      }
      return new YdFrame().init(new_frame);
    }else{
      return new YdFrame().init({});
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
    keys = new YdList().init(all_keys).unique().get();

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
    return new YdFrame().initDictRowsIndex(all_json_rows, index);
  },
  len2: function() {
    var t_values = Object.values(this.frame);
    return Object.keys(t_values[0]).length;
  },
  T: function() {
    var t_index = this.getIndex().get();
    var t_mat = this.getMat().get();
    var t_keys = this.getKeys().get();

    var new_keys = new YdList().init(t_index).clone().get();
    var new_index = new YdList().init(t_keys).clone().get();
    var new_mat = new YdMat().init(t_mat).clone().T().get();
    var new_frame = new YdFrame().initKeysMatIndex(new_keys, new_mat, new_index);
    return new_frame;
  },
  initDictRows: function(dict_rows){
    var len = dict_rows.length;
    var index = new YdList().init([]).gen(len).get();
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
    this.mat = this.getMat().get();
    return this;
  },
  initKeysMat: function(keys, mat){
    var len = mat.length;
    var index = new YdList().init([]).gen(len).get();
    this.initKeysMatIndex(keys, mat, index);
    return this;
  },
  initKeysCols: function(keys, cols){
    var mat = new YdMat().init(cols).T().get();
    this.initKeysMat(keys, mat);
    return this;
  },
  initDictCols: function(dict){
    keys = Object.keys(dict);
    cols = Object.values(dict);
    return this.initKeysCols(keys, cols);
  },
  initKeysMatIndex: function(keys, mat, index){
    if(mat.length != index.length){
      debugger;
    }
    this.frame = {};
    for (var i = 0; i < index.length; i++) {
      var idx = index[i];
      var list = mat[i];
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
    this.mat = this.getMat().get();
    return this;
  },
  initIndexDictFunc: function(index_dict, f_get_dict){
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
    this.mat = this.getMat().get();
    return this;
  },
  getKeys: function(){
    if (this.len() > 0) {
      var t_values = Object.values(this.frame);
      return new YdList().init(Object.keys(t_values[0]));
    }else{
      return new YdList().init([]);
    }          
  },
  getIndex: function() {
    return new YdList().init(Object.keys(this.frame));
  },
  getMat: function(key_name) {
    var t_values = Object.values(this.frame);
    var t_mat = [];
    for (var i = 0; i < t_values.length; i++) {
      var t_dict = t_values[i];
      var t_list = new YdDict().init(t_dict).getList().get();
      t_mat.push(t_list);
    }
    return new YdMat().init(t_mat);
  },
  getIndexDict: function() {
    return this.get();
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
      var t_list = new YdDict().init(t_dict).getList().get();
      index_rows[t_idx] = t_list;
    }
    return index_rows;
  },
  getDictRows: function(){
    return Object.values(this.frame);
  },
  getKeysDict: function() {
    
  },
  getDictCols: function(){
    
  },
  getCol: function(key_name) {
    var dict_rows = this.getDictRows();

    var column = new Array();
    for(var i=0; i< dict_rows.length; i++) {
        var value = dict_rows[i][key_name];
        column.push(value);
    }
    return new YdList().init(column);
  },
  setKeys: function(keys){

  },
  setDictRows: function(dict_rows){

  },
  setIndex: function(index) {

  },
  setMat: function(mat) {

  },
 
  toScatter: function(){
    var t_index = this.getIndex().get();
    var t_mat = this.getMat().get();
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
     return new YdMat().init(scatter_data);
  },
  
  getKeyStat: function(f_stat) {
    var t_keys = this.getKeys().get();
    var t_json = {};
    for (var i = 0; i < t_keys.length; i++) {
        var t_key = t_keys[i];
        var t_col = this.getCol(t_key).get();
        var t_stat = f_stat(t_col);
        t_json[t_key] = t_stat;
    }
    return new YdDict().init(t_json);
  },
  
  addKeyValue: function(key, value) {
    var dict_rows = this.getDictRows();
    var index = this.getIndex().get();
    for(var i=0; i< dict_rows.length; i++) {
        dict_rows[i][key] = value;
    }
    return new YdFrame().initDictRowsIndex(dict_rows, index);
  },
  addKeyCol: function(key, col) {
    var dict_rows = this.getDictRows();
    var index = this.getIndex().get();
    for(var i=0; i< dict_rows.length; i++) {
        dict_rows[i][key] = col[i];
    }
    return new YdFrame().initDictRowsIndex(dict_rows, index);
  },
  
  matchConcatKeyDict: function(match_key, replace_key, dict_col, concat_after) {
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
    return new YdFrame().initDictRowsIndex(dict_rows, index);
  },
  matchReplaceKeyDict: function(match_key, replace_key, dict_col) {
    var dict_rows = this.getDictRows();
    var index = this.getIndex().get();
    for(var i=0; i< dict_rows.length; i++) {
        var this_row = dict_rows[i];
        var dict_key = this_row[match_key];
        var dict_value = dict_col[dict_key];
        if (dict_value) {
            dict_rows[i][replace_key] = dict_value;
        }
    }
    return new YdFrame().initDictRowsIndex(dict_rows, index);
  },
  replaceKeyCol: function(key, col) {
    var dict_rows = this.getDictRows();
    var index = this.getIndex().get();
    for(var i=0; i < dict_rows.length; i++) {
        dict_rows[i][key] = col[i];
    }
    return new YdFrame().initDictRowsIndex(dict_rows, index);
  },
  findRows: function(key, value_array) {
    var dict_rows = this.getDictRows();
    var list;
    var mat = [];
    var t_array = new YdList().init(value_array);
    for(var i=0; i< dict_rows.length; i++) {
        if ( t_array.has(dict_rows[i][key])){
            list = new YdDict().init(dict_rows[i]).clone().get();
            mat.push(list);
        }
    }
    return mat;
  },
  sortCol: function(key) {
    
  },
  getSortIndex: function(){
    return this.sortindex;
  },
  truncIndex: function(p_index, p_num) {
    var t_index = this.getIndex().get();
    var t_mat = this.getMat().get();
    var t_keys = this.getKeys().get();

    var new_mat = new YdMat().init(t_mat).reIndex(p_index).trunc(p_num).get();
    var new_index = new YdList().init(t_index).reIndex(p_index).trunc(p_num).get();
    var new_keys = new YdList().init(t_keys).clone().get();
    return new YdFrame().initKeysMatIndex(new_keys, new_mat, new_index);
  },
};
