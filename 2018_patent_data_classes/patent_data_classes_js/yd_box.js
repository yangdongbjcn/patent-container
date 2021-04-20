function Yd_box(){
  this.layers = [];
  this.names = [];
  this.keys = [];
  this.listss = [];
}
Yd_box.prototype = {
  // constructor: Yd_box,
  // 输入
  initLayersNamesKeysLists: function(layers, names, keys, listss){
    if(listss.length != layers.length){
      debugger;
    }
    this.layers = layers;
    this.names = names;
    this.keys = keys;
    this.listss = listss;

    return this;
  },
  initBox: function(p_box){
    var result = this.GetLayersamesKeysListssFromBox(p_box);
    this.layers = result['layers'];
    this.names = result['names'];
    this.keys = result['keys'];
    this.listss = result['listss'];

    return this;
  },
  
  // 输出
  getBox: function(){
    return this.GetBoxFromLayersNamesKeysLists(this.layers, this.names, this.keys, this.listss);
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
  len3: function() {
    if (this.len2()) {
      return this.listss[0][0].length;  
    }else{
      return 0;
    }    
  },
  
  // 其他
  GetLayersamesKeysListssFromBox: function(p_box){
    var result = {};
    result['layers'] = Object.keys(p_box);
    result['listss'] = [];
    var t_frames = Object.values(p_box);
    for (var i = 0; i < t_frames.length; i++) {
      var t_frame = t_frames[i];
      var t1 = new Yd_frame().initFrame(t_frame);
      var t_names = t1.getNames().get();
      var t_keys = t1.getKeys().get();
      var t_lists = t1.getLists().get();
      result['listss'].push(t_lists);
    }
    result['names'] = t_names;
    result['keys'] = t_keys;
    result['names'] = t_names;
    return result;        
  },
  

  GetBoxFromLayersNamesKeysLists: function(layers, names, keys, listss){
    

  },

  GetFrameByCombineLayers: function(p_box){
    var t_layers = Object.keys(p_box);
    var t_frames = Object.values(p_box);

    var result_frame = [];
    for (var i = 0; i < t_frames.length; i++) {
      var t_frame = t_frames[i];
      result_frame = result_frame.concat(t_frame);
    }

    return result_frame;
  },
  
};
