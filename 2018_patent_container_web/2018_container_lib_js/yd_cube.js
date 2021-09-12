function Yd_cube(){
    // var this.listss;
}
Yd_cube.prototype = {
  // constructor: Yd_cube,
  // 输入
  init: function(listss){
    this.listss = listss;
    return this;
  },
  
  // 输出
  get: function() {
    return this.listss;
  },
  isEmpty: function() {
    if (this.listss.length == 0) {
      return true;
    }else{
      return false;
    }
  },
  len1: function() {
    return this.listss.length;
  },
  len2: function() {
    var len;
    if (this.len() == 0){
      len = 0;
    }else{
      len = this.listss[0].length;
    }
    return len;
  },
  len3: function() {
    var len;
    if (this.len2() == 0){
      len = 0;
    }else{
      len = this.listss[0][0].length;
    }
    return len;
  }
  
};
