function Yd_box(){
  this.layers = [];
  this.names = [];
  this.keys = [];
  this.mats = [];
}
Yd_box.prototype = {
  // 输入
  initLayersNamesKeysMats: function(layers, names, keys, mats){
    if(mats.length != layers.length){
      debugger;
    }
    this.layers = layers;
    this.names = names;
    this.keys = keys;
    this.mats = mats;

    return this;
  },
  
  // 输出
  isEmpty: function() {
    if (this.mats.length == 0) {
      return true;
    }else{
      return false;
    }
  },
  len1: function() {
    return this.mats.length;
  },
  len2: function() {
    if (this.len1()) {
      return this.mats[0].length;  
    }else{
      return 0;
    }    
  },
  len3: function() {
    if (this.len2()) {
      return this.mats[0][0].length;  
    }else{
      return 0;
    }    
  }
  
};
