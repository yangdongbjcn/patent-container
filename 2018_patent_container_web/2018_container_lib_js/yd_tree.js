
function YdTreePath(){
    // var this.path;
}
YdTreePath.prototype = {
  init: function(path){
    this.path = path;
    return this;
  },
  get: function(){
    return this.path;
  },
  initFromNames: function(excel_names){
    var split_matrix = f_tree_names_split(excel_names);
    //name用于节点显示,value用于搜索，形如“输入设备-位移输入设备-触摸屏-电磁触摸屏”
    var json_tree = {"name":"root", "value":"","datas":""};
    var cur_node = {};

    cur_node = json_tree;
    var cur_level = 0;
    var cur_node_name_array = f_tree_get_cur_level_data(split_matrix, cur_level);
    f_tree_recursive_build(split_matrix, cur_node, cur_level, cur_node_name_array);
    f_tree_recursive_set_value(json_tree.datas,"");

    this.path = json_tree;

    return this;
  }
};

function f_tree_names_split(excel_names){
  var split_num_array = new Array();
  
  var split_matrix_temp = new Array();
  var split_matrix = new Array();

  for(var excel_i=0; excel_i<excel_names.length; excel_i++){
    // 处理每个excel_name
    var excel_name = excel_names[excel_i];

    // 将 “智能终端-手机-手机软件”分割为数组“智能终端”、“手机”、“手机软件”
    var split_array = excel_name.split('-');
    split_matrix_temp[excel_i] = split_array;

    split_num_array[excel_i] = split_array.length;
  }

  var split_num_max = Math.max.apply(null, split_num_array);

  for (var excel_i=0; excel_i<split_matrix_temp.length; excel_i++) {
    split_matrix[excel_i] = new Array(split_num_max);

    for(var split_i=0; split_i<split_num_array[excel_i]; split_i++) {
      split_matrix[excel_i][split_i] = split_matrix_temp[excel_i][split_i];
    }

    for (var undef_i=split_num_array[excel_i]; undef_i<split_num_max; undef_i++) {
      split_matrix[excel_i][undef_i] = "";
    }
  }

  return split_matrix;
}


function f_tree_get_cur_level_data(array_2d, cur_level){
  if (cur_level >= array_2d[0].length) {
    return [];
  }

  row_num_1d = array_2d.length;
  row_num_2d = array_2d[0].length;

  var return_row = new Array(row_num_1d);

  for(index_i=0; index_i<row_num_1d; index_i++){
    return_row[index_i] = array_2d[index_i][cur_level];
  }

  return return_row;
}


function f_tree_recursive_build(split_matrix, cur_node, cur_level, cur_node_name_array) {
  var cur_node_name_unique = f_tree_array_unique(cur_node_name_array);
  if (cur_node_name_unique[0] == "") {
    // [""]这种情况
    return;
  }
  if (cur_node_name_unique.length>0) {
    cur_node.datas = new Array();
    
    for (var node_i=0; node_i<cur_node_name_unique.length; node_i++){
      cur_node.datas[node_i] = {};
      cur_node.datas[node_i]["name"] = cur_node_name_unique[node_i];
      cur_node.datas[node_i]["datas"] = "";

      var param_cur_node_name_array = f_tree_get_next_level_data(split_matrix, cur_level, cur_node_name_unique[node_i]);
      var param_cur_node = cur_node.datas[node_i];
      var param_cur_level = cur_level + 1;

      f_tree_recursive_build(split_matrix, param_cur_node, param_cur_level, param_cur_node_name_array);
    }
  }
}


//遍历jsontree，给每一个节点附上value
function f_tree_recursive_set_value(datas,value){
  for(var data in datas){
    datas[data].value=value+datas[data].name;
    //如果有子节点
    if(datas[data].datas.length>0){
      f_tree_recursive_set_value(datas[data].datas,datas[data].value+"-");
    }
  }
}


function f_tree_array_unique(array_input){
  var res = [];
  var json = {};
  for (var i=0; i<array_input.length; i++){
    if(! json[array_input[i]]){
      res.push(array_input[i]);
      json[array_input[i]] = 1;
    }
  }
  return res;
};


function f_tree_get_next_level_data(array_2d, father_level, father_name) {
  var children_level = father_level + 1;
  if (children_level >= array_2d[0].length) {
    return [];
  }
  var father_row = f_tree_get_cur_level_data(array_2d, father_level);
  var cur_index = f_tree_get_index(father_row, father_name);

  var children_row = f_tree_get_cur_level_data(array_2d, children_level);
  var cur_children = f_tree_get_values(children_row, cur_index);
  return cur_children;
}


function f_tree_get_index(array_1d, father_name) {
  var index_array = new Array();
  for (var i=0; i<array_1d.length; i++) {
    if (array_1d[i] == father_name){
      index_array.push(i);  
    }   
  }
  return index_array;
}

function f_tree_get_values(array_1d, index_array){
  if (index_array == []) {
    return [];
  }
  if (Math.max.apply(null, index_array) >= array_1d.length) {
    return [];
  }

  var return_array = new Array(index_array.length);

  for (var index_i=0; index_i<index_array.length; index_i++) {
    return_array[index_i] = array_1d[index_array[index_i]];
  }

  return return_array;
}


function Yd_tree(){
  this.superior;
  this.members = [];
  this.names = [];
  this.keys = [];
  this.listss = [];
}
Yd_tree.prototype = {
  // constructor: Yd_tree,
  // 输入
  init: function(suporior, members, names, keys, listss){
    this.suporior = suporior;
    this.members = members;
    this.names = names;
    this.keys = keys;
    this.listss = listss;

    return this;
  },
  

  // 输出
  getTree: function(){
    
  },
  isEmpty: function() {
    if (this.listss.length == 0) {
      return true;
    }else{
      return false;
    }
  },
  len: function() {
    return this.listss.length;
  },
  len2: function() {
    if (this.len()) {
      return this.listss[0].length;  
    }else{
      return 0;
    }    
  },
  len2: function() {
    if (this.len2()) {
      return this.listss[0][0].length;  
    }else{
      return 0;
    }    
  }
  
};
