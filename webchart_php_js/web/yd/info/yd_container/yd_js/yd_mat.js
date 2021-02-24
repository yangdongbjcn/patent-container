function Yd_mat(){
    // var this.lists;
}
Yd_mat.prototype = {
  // constructor: Yd_mat,
  // 输入
  init: function(lists){
    this.lists = lists;
    return this;
  },
  merge: function(new_mat){
      
      return this;
  },
  push: function(new_list){
      this.lists.push(new_list);
      return this;
  },
  pushClist: function(new_list){
      
      
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
    return this.lists;
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
    var len;
    if (this.len() == 0){
      len = 0;
    }else{
      len = this.lists[0].length;
    }
    return len;
  },
  getSomeLists: function(row_num_array) {
    var lists = new Array();
    for(var i=0; i<row_num_array.length; i++) {
      lists.push(this.lists[i]);
    }
    return new Yd_mat().init(lists);
  },
  getClist: function(col_no) {
    var column = new Array();
    for(var i=0; i<this.lists.length; i++) {
      column.push(this.lists[i][col_no]);
    }
    return new Yd_list().init(column);
  },
  getSomeClists: function(col_num_array) {
      var lists = new Array();
      for(var i=0; i<this.lists.length; i++) {
          var list = new Yd_list().init(this.lists[i]).getSomeValues(col_num_array);
          lists.push(list);
      }
      return new Yd_mat().init(lists);
  },
  updateClist: function(col_no, new_clist) {
    if (new_clist.length != this.len()) {
      debugger;
    }
    for(var i=0; i<this.len(); i++) {
        this.lists[i][col_no] = new_clist[i];
    }
    return this;
  },
  Transpose: function() {
    var new_mat = new Array();
    var col_num = this.len2();
    for(var j=0; j<col_num; j++){
       var new_array = new Array();
       new_mat.push(new_array);
    }
    for(var j=0; j<this.lists.length; j++){
       for(var i=0; i<this.lists[j].length; i++){
          var value = this.lists[j][i];
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
  iterListFunc: function(f_filter){
    for (var i = 0; i < this.lists.length; i++) {
      var t_list = this.lists[i];
      this.lists[i] = f_filter(t_list);
    }
    return this;
  },
  iterClistFunc: function(f_filter){
    for (var i = 0; i < this.len2(); i++) {
      var t_clist = this.getClist(i).get();
      var new_clist = f_filter(t_clist);
      this.updateClist(i, new_clist);
    }
    return this;
  },
  filterFunc: function(f_filter){
   

      return this;
  },
  filterValue: function(col_no, t_values) {
      var list;
      var lists = [];
      var t_array = new Yd_list().init(t_values);
      for(var i=0; i< this.lists.length; i++) {
          if ( t_array.has(this.lists[i][col_no])){
              list = new Yd_dict().init(this.lists[i]).clone().get();
              lists.push(list);
          }
      }
      return new Yd_mat().init(lists);
  },
  cloneList: function(row_num) {
      

      return this;
  },
  cloneClist: function(col_no){
    for (var i = 0; i < this.lists.length; i++) {
      var list = this.lists[i];
      new Yd_list().init(list).cloneItem(col_no);
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
      var t_item = this.lists[t_index];
      var new_item = new Yd_list().init(t_item).clone().get();
      new_mat.push(new_item);
    }
    this.lists = new_mat;
    return this;
  },
  trunc: function(len) {
    if (len >= this.len()) {
      return this;
    }
    // var new_mat = this.init(this.get()).clone().get();
    // new_mat.splice(len, new_mat.length - len + 1);
    // return new Yd_mat().init(new_mat);
    this.lists.splice(len, this.len() - len + 1);
    return this;
  },
  formatClist: function(col_no, format_string) {
    for (var i = 0; i < this.lists.length; i++) {
      var item = this.lists[i][col_no];
      var new_item;
      if (format_string == 'string') {
        new_item = String(item);
      }
      if (format_string == 'number') {
        new_item = Number(item);
      }
      this.lists[i][col_no] = new_item;
    }
    return this;
  },

  // 排序
  sortIndex: function(col_no) {
    var new_col = this.getClist(col_no).get();
    this.sortindex = new Yd_list().init1N(new_col.length).get();
    yd_array_merge_sort(new_col, this.sortindex); 
    this.lists = new Yd_mat().init(this.lists).reIndex(this.sortindex).get();
    return this;
  },
  getSortIndex: function(){
    return this.sortindex;
  },

  // 数字
  toNumber: function(){
      for(var j=0; j<this.lists.length; j++){
         for(var i=0; i<this.lists[j].length; i++){
            var value = this.lists[j][i];
            if( !isNaN( value ) )
            {
               this.lists[j][i] = value - 0;
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
    for (var i = 0; i < this.lists.length; i++) {
      var new_list = new Yd_list().init(this.lists[i]).clone().get();
      new_mat.push(new_list);
    }
    return new Yd_mat().init(new_mat);
  }, 
  complete: function(col_no, complete_list, default_value) {
    var default_value = default_value || 0;
    var t_clist = this.getClist(col_no).get();

    var new_mat = new Array();
    for (var i = 0; i < complete_list.length; i++) {
      var this_item = complete_list[i];
      var t_index = t_clist.indexOf(this_item);
      if (t_index != -1) {
        var new_list = new Yd_list().init(this.lists[t_index]).clone().get();
      }else{
        var new_list = new Yd_list().init([this_item, default_value]).get();
      }
      new_mat.push(new_list);
    }
    return new Yd_mat().init(new_mat);
  },
  toCdict: function(key_col_num, value_col_num){
    var t_keys = this.getClist(key_col_num).get();
    var t_values = this.getClist(value_col_num).get();
    return new Yd_dict().initKeysValues(t_keys, t_values);
  },
  toDataPivot: function(key_col_num, value_col_num){
    var dict = {};
    var t_keys = this.getClist(key_col_num).get();
    var t_values = this.getClist(value_col_num).get();
    var key_unique = new Yd_list().init(t_keys).unique().get();

    for(var j=0; j<key_unique.length; j++){
        var t_key = key_unique[j];
        dict[t_key] = 0.0;
    }

    for(var j=0; j<t_keys.length; j++){
        var t_key = t_keys[j];
        var t_value = parseFloat(t_values[j]);
        dict[t_key] = dict[t_key] + t_value;
    }
    return new Yd_dict().init(dict);
  },
  toDicts: function(keys){
    if(this.len2() != keys.length){
      debugger;
    }
    var dicts = [];
    for(var j=0; j<this.lists.length; j++){
      var dict = new Yd_list().init(this.lists[j]).toDict(keys);
      dicts.push(dict);
    }
    return dicts;
  },
  toString: function(sep) {
    var sep = sep || '\t';
    var lists = this.lists;
    var t_array = new Array();
    for(var i=0; i<lists.length; i++){
      var list = lists[i];
      var t_string = new Yd_list().init(list).toString(sep);
      t_array.push(t_string);
    }
    return new Yd_list().init(t_array).toStringLines();
  },
  toGroup: function(col_no) {
    var t_lists_group = {};

    var t_lists = this.lists;

    var t_uniques = this.getClist(col_no).unique().get();
    for(i=0; i<t_uniques.length; i++) {
      var this_unique = t_uniques[i];
      t_lists_group[this_unique] = new Array();
    }

    var t_clist = this.getClist(col_no).get();
    for(i=0; i<t_clist.length; i++) {
      var this_item = t_clist[i]; 
      var this_list = t_lists[i];
      t_lists_group[this_item].push(this_list);
    }

    var t_mat_group = {};
    for(var key in t_lists_group) {
      var value = t_lists_group[key];
      t_mat_group[key] = new Yd_mat().init(value);
    }   

    return t_mat_group;
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