function Yd_sheetbox(){
  this.layers = [];
  this.yd_sheets = [];
}
Yd_sheetbox.prototype = {
  // 输入
  initLayersDictsArray: function(layers, dicts_array){
    if(dicts_array.length != layers.length){
      debugger;
    }

    this.layers = layers;
    for (var i = 0; i < dicts_array.length; i++) {
      var dicts = dicts_array[i];
      var t_yd_sheet = new Yd_sheet().initDicts(dicts);
      this.yd_sheets.push(t_yd_sheet);
    }
    return this;
  }

};
