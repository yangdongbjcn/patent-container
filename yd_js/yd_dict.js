function Yd_dict(){
    // var this.dict;
    // var this.sortindex;
}
Yd_dict.prototype = {
  // 输入
  init: function(dict){
    this.dict = dict;
    return this;
  },
  initKeysValues: function(keys, values) {
    this.dict = {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = values[i];
        this.dict[key] = value;
    }
    return this;
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
    return this.dict;
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
  getValue: function(key) {
      return this.dict[key];
  },
  getSomeValues: function(keys) {
      var new_list = new Array();
      for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = this.dict[key];
        new_list.push(value);
      }
      return new_list;
  },
  getKeys: function(){
    return new Yd_list().init(Object.keys(this.dict));
  },
  getValues: function(){
    return new Yd_list().init(Object.values(this.dict));
  },
  getPartDict: function(keys) {
    var new_list = new Array();
    var t_list = this.getValues().get();
    for (var i = 0; i < keys.length; i++) {
      var index = keys[i];
      var value = t_list[index];
      new_list[index] = value;
    }
    return new_list;
  },

  // 判断
  has: function(value){
      var t_values = Object.values(this.dict);
      var t_index = t_values.indexOf(value);
      if ( t_index == -1 ) {
          return false;
      }else{
          return true;
      }
  },
  hasKey: function(key){
      var t_keys = Object.keys(this.dict);
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
   

      return this;
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
    this.sortIndex();
    var t_keys = this.getSortKeys().trunc(num).get();
    var t_list = this.getSortValues().trunc(num).get();
    var t_trunc = new Yd_dict().initKeysValues(t_keys, t_list);
    return t_trunc;
  },

  // 排序
  sortIndex: function() {
    var t_list = this.getValues().clone().get();
    this.sortindex = new Yd_list().init1N(t_list.length).get();
    yd_array_merge_sort(t_list, this.sortindex);
    return this;
  },
  getSortIndex: function(){
    return this.sortindex;
  },
  getSortKeys: function(){
    return new Yd_list().init(Object.keys(this.dict)).reIndex(this.sortindex);
  },
  getSortValues: function(){
    return new Yd_list().init(Object.values(this.dict)).reIndex(this.sortindex);
  },

  // 转换输出
  clone: function() {
      if (!this.isEmpty()) {
        var new_dict = new Object();
        var t_keys = this.getKeys().get();
        for (var i = 0; i < t_keys.length; i++) {
          var key = t_keys[i];
          var value = this.dict[key];
          new_dict[key] = value;
        }
        return new Yd_dict().init(new_dict);
      }else{
        return new Yd_dict().init({});
      }              
  }
  
};