function Yd_mat(){
    // var this.lists;
}
Yd_mat.prototype = {
  // 输入
  init: function(lists){
    this.lists = lists;
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
  getLen1: function() {
    return this.lists.length;
  },
  getLen2: function() {
    var len1;
    if (this.getLen1() == 0){
      len1 = 0;
    }else{
      len1 = this.lists[0].length;
    }
    return len1;
  },
  getDicts: function(keys){
    if(this.getLen2() != keys.length){
      debugger;
    }
    var dicts = [];
    for(var j=0; j<this.lists.length; j++){
      var dict = new Yd_list().init(this.lists[j]).getDict(keys);
      dicts.push(dict);
    }
    return dicts;
  },
  getString: function(sep) {
    var sep = sep || '\t';
    var lists = this.lists;
    var t_array = new Array();
    for(var i=0; i<lists.length; i++){
      var list = lists[i];
      var t_string = new Yd_list().init(list).getString(sep);
      t_array.push(t_string);
    }
    return new Yd_list().init(t_array).getStringLines();
  },

  // 获取Yd类
  bldSomeLists: function(row_num_array) {
    var lists = new Array();
    for(var i=0; i<row_num_array.length; i++) {
      lists.push(this.lists[i]);
    }
    return new Yd_mat().init(lists);
  },
  bldClist: function(col_no) {
    var column = new Array();
    for(var i=0; i<this.lists.length; i++) {
      column.push(this.lists[i][col_no]);
    }
    return new Yd_list().init(column);
  },
  bldSomeClists: function(col_num_array) {
      var lists = new Array();
      for(var i=0; i<this.lists.length; i++) {
          var list = new Yd_list().init(this.lists[i]).getSomeValues(col_num_array);
          lists.push(list);
      }
      return new Yd_mat().init(lists);
  },
  bldTranspose: function() {
    var new_mat = new Array();
    var col_num = this.getLen2();
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
  bldSumClist: function() {
    var t_keys = this.keys;
    var t_json = {};
    for (var i = 0; i < t_keys.length; i++) {
        var t_key = t_keys[i];
        var t_col = this.bldClist(t_key).get();
        var t_stat = new Yd_list().init(t_col).getSum();
        t_json[t_key] = t_stat;
    }
    return new Yd_dict().init(t_json);
  },
  bldClone: function() {
    new_mat = new Array();
    for (var i = 0; i < this.lists.length; i++) {
      var new_list = new Yd_list().init(this.lists[i]).bldClone().get();
      new_mat.push(new_list);
    }
    return new Yd_mat().init(new_mat);
  },
  // bldComplete: function(col_no, complete_list, default_value) {
  //   var default_value = default_value || 0;
  //   var t_clist = this.bldClist(col_no).get();

  //   var new_mat = new Array();
  //   for (var i = 0; i < complete_list.length; i++) {
  //     var this_item = complete_list[i];
  //     var t_index = t_clist.indexOf(this_item);
  //     if (t_index != -1) {
  //       var new_list = new Yd_list().init(this.lists[t_index]).bldClone().get();
  //     }else{
  //       var new_list = new Yd_list().init([this_item, default_value]).get();
  //     }
  //     new_mat.push(new_list);
  //   }
  //   return new Yd_mat().init(new_mat);
  // },
  bldCdict: function(key_col_num, value_col_num){
    var t_keys = this.bldClist(key_col_num).get();
    var t_values = this.bldClist(value_col_num).get();
    return new Yd_dict().initKeysValues(t_keys, t_values);
  },
  //  bldGroup: function(col_no) {
  //   var t_lists_group = {};

  //   var t_lists = this.lists;

  //   var t_uniques = this.bldClist(col_no).unique().get();
  //   for(i=0; i<t_uniques.length; i++) {
  //     var this_unique = t_uniques[i];
  //     t_lists_group[this_unique] = new Array();
  //   }

  //   var t_clist = this.bldClist(col_no).get();
  //   for(i=0; i<t_clist.length; i++) {
  //     var this_item = t_clist[i]; 
  //     var this_list = t_lists[i];
  //     t_lists_group[this_item].push(this_list);
  //   }

  //   var t_mat_group = {};
  //   for(var key in t_lists_group) {
  //     var value = t_lists_group[key];
  //     t_mat_group[key] = new Yd_mat().init(value);
  //   }   

  //   return t_mat_group;
  // },
  bldDataPivot: function(key_col_num, value_col_num){
    var dict = {};
    var t_keys = this.bldClist(key_col_num).get();
    var t_values = this.bldClist(value_col_num).get();
    var key_unique = new Yd_list().init(t_keys).bldUnique().get();

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

  // 改变
  toUpdateClist: function(col_no, new_clist) {
    if (new_clist.length != this.getLen1()) {
      debugger;
    }
    for(var i=0; i<this.getLen1(); i++) {
        this.lists[i][col_no] = new_clist[i];
    }
    return this;
  },
  toPush: function(new_list){
      this.lists.push(new_list);
      return this;
  },
  toIterListFunc: function(f_filter){
    for (var i = 0; i < this.lists.length; i++) {
      var t_list = this.lists[i];
      this.lists[i] = f_filter(t_list);
    }
    return this;
  },
  toIterClistFunc: function(f_filter){
    for (var i = 0; i < this.getLen2(); i++) {
      var t_clist = this.bldClist(i).get();
      var new_clist = f_filter(t_clist);
      this.toUpdateClist(i, new_clist);
    }
    return this;
  },
  toCloneClist: function(col_no){
    for (var i = 0; i < this.lists.length; i++) {
      var list = this.lists[i];
      new Yd_list().init(list).toCloneItem(col_no);
    }
    return this;
  },
  toReindex: function(p_index) {
    var new_mat = new Array();
    for (var i = 0; i < p_index.length; i++) {
      var t_index = p_index[i];
      var t_item = this.lists[t_index];
      var new_item = new Yd_list().init(t_item).bldClone().get();
      new_mat.push(new_item);
    }
    this.lists = new_mat;
    return this;
  },
  toTrunc: function(len1) {
    if (len1 >= this.getLen1()) {
      return this;
    }
    this.lists.splice(len1, this.getLen1() - len1 + 1);
    return this;
  },
  toFormatClist: function(col_no, format_string) {
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
  toSortIndex: function(col_no) {
    var new_col = this.bldClist(col_no).get();
    this.sortindex = new Yd_list().init1N(new_col.length).get();
    yd_array_merge_sort(new_col, this.sortindex); 
    this.lists = new Yd_mat().init(this.lists).toReindex(this.sortindex).get();
    return this;
  },
  getSortIndex: function(){
    return this.sortindex;
  },
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
  toFilterClistByValues: function(col_no, t_values) {
      var list;
      var lists = [];
      var t_array = new Yd_list().init(t_values);
      for(var i=0; i< this.lists.length; i++) {
          if ( t_array.getIsHaving(this.lists[i][col_no])){
              list = new Yd_dict().init(this.lists[i]).bldClone().get();
              lists.push(list);
          }
      }
      this.lists = lists;
      return this;
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