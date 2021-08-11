function Yd_dict(){
  // var this.dict;
  // var this.sortindex;
}
Yd_dict.prototype = {
  // 输入
  init: function(dict){
    this.keys = Object.keys(dict);
    this.values = Object.values(dict);

    // this.dict = dict;
    return this;
  },
  initKeysValues: function(keys, values) {
    this.keys = keys;
    this.values = values;

    // this.dict = this.CombineKeysValues(keys, values);
    return this;
  },
  CombineKeysValues: function(keys, values) {
    var dict = {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = values[i];
        dict[key] = value;
    }
    return dict;
  },
  initByHist: function(list) {
    
    return this;
  },
  merge: function(new_dict){
      
    return this;
  },
  push: function(new_key, new_value) {
      
    return this;
  },
  unshift: function(new_key, new_value){
      
    return this;
  },

  // 输出
  get: function() {
    var dict = this.CombineKeysValues(this.keys, this.values);
    return dict;
  },
  isEmpty: function() {
    if (this.keys.length == 0) {
      return true;
    }else{
      return false;
    }
  },  
  len: function() {
    return this.keys.length;
  },
  getValue: function(key) {
    var index = this.keys.indexOf(key);
    return this.values[index];
  },
  getSomeValues: function(keys) {
    var new_list = new Array();
    for(var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = this.getValue(key);
      new_list.push(value);
    }
    return new_list;
  },
  getKeys: function(){
    return new Yd_list().init(this.keys);
  },
  getValues: function(){
    return new Yd_list().init(this.values);
  },
  getPartDict: function(keys) {
    var new_list = new Array();
    var t_values = this.values;
    for (var i = 0; i < keys.length; i++) {
      var index = keys[i];
      var value = t_values[index];
      new_list[index] = value;
    }
    return new_list;
  },

  // 判断
  has: function(value){
    var t_values = this.values;
    var t_index = t_values.indexOf(value);
    if ( t_index == -1 ) {
        return false;
    }else{
        return true;
    }
  },
  hasKey: function(key){
    var t_keys = this.keys;
    var t_index = t_keys.indexOf(value);
    if ( t_index == -1 ) {
        return false;
    }else{
        return true;
    }
  },
  
  // 改变
  iterFunc: function(f_filter){
    

    return this;
  },
  filterFunc: function(f_filter){
    var new_keys = new Array();
    var new_values = new Array();
    for (var i = 0; i < this.len(); i++) {
      var key = this.keys[i];
      var value = this.values[i];
      if(f_filter(key, value)){
        new_keys.push(key);
        new_values.push(value);
      }
    }
    return new Yd_dict().initKeysValues(new_keys, new_values);
  },
  cloneItem: function(key) {
      

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
  reIndex: function(p_index){
    
    return this;
  },
  trunc: function(num){
    this.keys = this.getKeys().trunc(num).get();
    this.values = this.getValues().trunc(num).get();
    return this;
  },

  // 排序
  sortIndex: function() {
    this.sortindex = new Yd_list().init1N(this.values.length).get();
    yd_array_merge_sort(this.values, this.sortindex);
    this.keys = new Yd_list().init(this.keys).reIndex(this.sortindex).get();
    return this;
  },
  getSortIndex: function(){
    return this.sortindex;
  },
  
  // 转换输出
  clone: function() {
    if (!this.isEmpty()) {
      var t_keys = this.getKeys().clone().get();
      var t_values = this.getValues().clone().get();
      return new Yd_dict().initKeysValues(t_keys, t_values);
    }else{
      return new Yd_dict().initKeysValues({}, {});
    }     
  },
  toGroup: function() {
    
  }
  
};