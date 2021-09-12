function Yd_matbox(){
  this.layers = [];
  this.mats = [];
}
Yd_matbox.prototype = {
  // 输入
  initLayersMats: function(layers, mats){
    if(mats.length != layers.length){
      debugger;
    }
    this.layers = layers;
    this.mats = mats;

    return this;
  },
  initLayersMatsDict: function(layers_mats_dict){
    this.layers = Object.keys(layers_mats_dict);
    this.mats = Object.values(layers_mats_dict);

    return this;
  },
  bldFrameByFuncDict: function(f_get_dict){
    var t_dicts = [];
    for (var i = 0; i < this.layers.length; i++) {
      var idx = this.layers[i];
      var mat = this.mats[i];
      var dict = f_get_dict(mat);
      t_dicts.push(dict);
    }
    var t_yeardest_frame = new Yd_frame().initNamesDictsAndComplete(this.layers, t_dicts);
    return t_yeardest_frame;
  }  
};
