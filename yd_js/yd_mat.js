function Yd_mat(){
    // var this.rows;
}
Yd_mat.prototype = {
  // constructor: Yd_mat,
  // 输入
  init: function(rows){
    this.rows = rows;
    return this;
  },
  initCols: function(cols){
    this.rows = cols;
    return this.Transpose();
  },
  merge: function(new_mat){
      
      return this;
  },
  push: function(new_list){
      this.rows.push(new_list);
      return this;
  },
  pushCol: function(new_list){
      
      
      return this;
  },
  unshift: function(new_list){
      
      return this;
  }, 
  initFromCsv: function(file_path, f_func) {
    var reader = new FileReader();
    reader.readAsText(file_path);
    reader.onload = function () {
      var data = tf_csv_to_object(this.result);
      // console.log(data);//data为csv转换后的对象
    }
  },


  // 输出
  get: function() {
    return this.rows;
  },
  isEmpty: function() {
    if (this.rows.length == 0) {
      return true;
    }else{
      return false;
    }
  },
  len: function() {
    return this.rows.length;
  },
  len2: function() {
    var len;
    if (this.len() == 0){
      len = 0;
    }else{
      len = this.rows[0].length;
    }
    return len;
  },
  getRow: function(row_num) {
      return new Yd_list().init(this.rows[row_num]);
  },
  getSomeRows: function(row_num_array) {
      var rows = new Array();
      for(var i=0; i< row_num_array; i++) {
          rows.push(this.rows[i]);
      }
      return new Yd_mat().init(rows);
  },
  getCol: function(col_num) {
      var column = new Array();
      for(var i=0; i< this.rows.length; i++) {
          var value = this.rows[i][col_num];
          column.push(value);
      }
      return new Yd_list().init(column);
  },
  getSomeCols: function(col_num_array) {
      var rows = new Array();
      for(var i=0; i< this.rows.length; i++) {
          var list = new Yd_list().init(this.rows[i]).getSomeValues(col_num_array);
          rows.push(list);
      }
      return new Yd_mat().init(rows);
  },
  getCols: function() {
      return this.Transpose().get();
  },
  Transpose: function() {
    var new_mat = new Array();
    var col_num = this.len2();
    for(var j=0; j<col_num; j++){
       var new_array = new Array();
       new_mat.push(new_array);
    }
    for(var j=0; j<this.rows.length; j++){
       for(var i=0; i<this.rows[j].length; i++){
          var value = this.rows[j][i];
          try {
            new_mat[i].push(value);  
          }catch(error){
            debugger;
          }
          
       }
    }
    return new Yd_mat().init(new_mat);
  },

  // 改变
  iterFunc: function(f_filter){
    

      return this;
  },
  filterFunc: function(f_filter){
   

      return this;
  },
  filterValue: function(col_num, value_array) {
      var list;
      var rows = [];
      var t_array = new Yd_list().init(value_array);
      for(var i=0; i< this.rows.length; i++) {
          if ( t_array.has(this.rows[i][col_num])){
              list = new Yd_dict().init(this.rows[i]).clone().get();
              rows.push(list);
          }
      }
      return rows;
  },
  cloneRow: function(row_num) {
      

      return this;
  },
  cloneCol: function(col_num){
    for (var i = 0; i < this.rows.length; i++) {
      var list = this.rows[i];
      new Yd_list().init(list).cloneItem(col_num);
    }
    return this;
  },
  pop: function() {
      
      return this;
  },
  shift: function() {
      
      return this;
  },
  slice: function(p_start, p_length) {
      
      return this;
  },
  reverse: function() {
      
      return this;
  },
  reIndex: function(p_index) {
    var new_mat = new Array();
    for (var i = 0; i < p_index.length; i++) {
      var t_index = p_index[i];
      var t_item = this.rows[t_index];
      var new_item = new Yd_list().init(t_item).clone().get();
      new_mat.push(new_item);
    }
    return new Yd_mat().init(new_mat);
  },
  trunc: function(len) {
    if (len >= this.len()) {
      return this;
    }
    var new_mat = this.init(this.get()).clone().get();
    new_mat.splice(len, new_mat.length - len + 1);
    return new Yd_mat().init(new_mat);
  },

  // 排序
  sortIndex: function(col_num) {
    var new_col = this.getCol(col_num);
    this.sortindex = new Yd_list().init1N(new_col.length).get();
    yd_array_merge_sort(new_col, this.sortindex); 
    this.rows = new Yd_mat().init(this.rows).reIndex(this.sortindex).get();
    return this;
  },
  getSortIndex: function(){
    return this.sortindex;
  },

  // 数字
  toNumber: function(){
      for(var j=0; j<this.rows.length; j++){
         for(var i=0; i<this.rows[j].length; i++){
            var value = this.rows[j][i];
            if( !isNaN( value ) )
            {
               this.rows[j][i] = value - 0;
            }
         }
      }
      return this;
  },
  max: function(){
      
  },
  min: function(){
      
  },
  sum: function() {
      
  },
  average: function() {
      
  },

  // 转换输出
  clone: function() {
    new_mat = new Array();
    for (var i = 0; i < this.rows.length; i++) {
      var new_list = new Yd_list().init(this.rows[i]).clone().get();
      new_mat.push(new_list);
    }
    var new_mat = new Yd_mat().init(new_mat);
    return new_mat;
  }, 
  complete: function(default_value) {
      
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
    return new Yd_dict().init(dict);
  },
  toDataPivot: function(key_col_num, value_col_num){
    var dict = {};
    var key_array = this.getCol(key_col_num).get();
    var value_array = this.getCol(value_col_num).get();
    var key_unique = new Yd_list().init(key_array).unique().get();

    for(var j=0; j<key_unique.length; j++){
        var t_key = key_unique[j];
        dict[t_key] = 0.0;
    }

    for(var j=0; j<key_array.length; j++){
        var t_key = key_array[j];
        var t_value = parseFloat(value_array[j]);
        dict[t_key] = dict[t_key] + t_value;
    }
    return new Yd_dict().init(dict);
  },
  toJsonRows: function(keys){
    if(this.len2() != keys.length){
      debugger;
    }
    var dict_rows = [];
    for(var j=0; j<this.rows.length; j++){
      var dict = new Yd_list().init(this.rows[j]).toDict(keys);
      dict_rows.push(dict);
    }
    return dict_rows;
  },
  toString: function(sep) {
    var sep = sep || '\t';
    var rows = this.rows;
    var t_array = new Array();
    for(var i=0; i<rows.length; i++){
      var list = rows[i];
      var t_string = new Yd_list().init(list).toString(sep);
      t_array.push(t_string);
    }
    return new Yd_list().init(t_array).toStringLines();
  }
};

function tf_csv_to_object(csvString){
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
};