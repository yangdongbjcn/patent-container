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

  // 输出
  get: function() {
    var dict = this.CombineKeysValues(this.keys, this.values);
    return dict;
  },
  getIsEmpty: function() {
    if (this.keys.length == 0) {
      return true;
    }else{
      return false;
    }
  },  
  getLen: function() {
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
  getIsHaving: function(value){
    var t_values = this.values;
    var t_index = t_values.indexOf(value);
    if ( t_index == -1 ) {
        return false;
    }else{
        return true;
    }
  },
  getIsHavingKey: function(key){
    var t_keys = this.keys;
    var t_index = t_keys.indexOf(value);
    if ( t_index == -1 ) {
        return false;
    }else{
        return true;
    }
  },
  

  // 输出Yd类
  bldKeys: function(){
    return new Yd_list().init(this.keys);
  },
  bldValues: function(){
    return new Yd_list().init(this.values);
  },
  bldTrunc: function(num){
    this.keys = this.bldKeys().bldTrunc(num).get();
    this.values = this.bldValues().bldTrunc(num).get();
    return this;
  },
  bldClone: function() {
    if (!this.getIsEmpty()) {
      var t_keys = this.bldKeys().bldClone().get();
      var t_values = this.bldValues().bldClone().get();
      return new Yd_dict().initKeysValues(t_keys, t_values);
    }else{
      return new Yd_dict().initKeysValues({}, {});
    }     
  },


  // 改变
  toFilterByFunc: function(f_filter){
    var new_keys = new Array();
    var new_values = new Array();
    for (var i = 0; i < this.getLen(); i++) {
      var key = this.keys[i];
      var value = this.values[i];
      if(f_filter(key, value)){
        new_keys.push(key);
        new_values.push(value);
      }
    }
    return new Yd_dict().initKeysValues(new_keys, new_values);
  },
  toSortIndex: function() {
    this.sortindex = new Yd_list().init1N(this.values.length).get();
    yd_array_merge_sort(this.values, this.sortindex);
    this.keys = new Yd_list().init(this.keys).bldReindex(this.sortindex).get();
    return this;
  },
  getSortIndex: function(){
    return this.sortindex;
  }
  
};