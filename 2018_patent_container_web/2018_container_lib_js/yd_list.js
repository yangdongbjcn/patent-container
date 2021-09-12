 function Yd_list(){
    // var this.list;
    // var this.sortindex;
}
Yd_list.prototype = {
  // 输入
  init: function(list){
      this.list = list;
      return this;
  },
  init1N: function(len) {
    this.list = []; 
    for (var i = 0; i < len; i++) {
      this.list.push(i);
    }
    return this;
  },
  initMN: function(m, n) {
    this.list = []; 
    for (var i = m; i <= n; i++) {
      this.list.push(i);
    }
    return this;
  },
  
  // 输出
  get: function() {
    return this.list;
  },
  getValue: function(index) {
      return this.list[index];
  },
  getSomeValues: function(index_array) {
    var new_list = new Array();
    for(var i = 0; i < index_array.length; i++) {
      var index = index_array[i];
      var value = this.list[index];
      new_list.push(value);
    }
    return new_list;
  },
  getValueByFind: function(value){
    return this.list.indexOf(value);
  },
  getIsHaving: function(value){
    var t_index = this.list.indexOf(value);
    if ( t_index == -1 ) {
        return false;
    }else{
        return true;
    }
  },
  getLen: function() {
    return this.list.length;
  },
  getMax: function(){
    return Math.max.apply(Math, this.list);
  },
  getMin: function(){
    return Math.min.apply(Math, this.list);
  },
  getSum: function() {
      var s = 0;
      for (var i=0; i<this.getLen(); i++) {
        s += this.list[i];
      }
      return s;
  },
  getAverage: function() {
      var average = this.sum() / this.getLen();
      return average;
  },
  getDict: function(index_array) {
    if(this.getLen() != index_array.length){
      debugger;
    }
    var dict = {};
    for (var i = 0; i < this.getLen(); i++) {
      var index = index_array[i];
      var value = this.list[i];
      dict[index] = value;
    }
    return dict;
  },
  getString: function(sep){
    var sep = sep || '\t';
    return this.list.join(sep);
  },
  getStringLines: function(){
      return this.list.join('\r\n');
  },
  getHistogram: function(p_value){
    var p_input = this.list;
    var t_length = p_value.length;
    var t_hist = new Array(t_length);
    var i;
    for(i=0; i<t_length; i++){
      t_hist[p_value[i]] = 0;
    }
    for(i=0; i<p_input.length; i++){
      var item = p_input[i];
      var t_in = new Yd_list().init(p_value).getIsHaving(item);
      if (t_in) {
        t_hist[item] = t_hist[item] + 1;
      }
    }
    return t_hist;
  },
  getUniqueHistogram: function(){
    var t_values = this.bldUnique().get();
    var t_hist = this.getHistogram(t_values);
    return t_hist;
  },

  // 输出Yd类
  bldClone: function() {
    var new_list = new Array();
    if (this.list == undefined){
      debugger;
    }
    for (var i = 0; i < this.list.length; i++) {
      var value = this.list[i];
      new_list.push(value);
    }
    return new Yd_list().init(new_list);
  },
  bldFlip: function() {
    this.toNumber();

    var new_list = [];
    for (var i = 0; i < this.getLen(); i++) {
      new_list.push(0);
    }
    for (var i = 0; i < this.getLen(); i++) {
      var t_index = this.list[i];
      new_list[t_index] = i;
    }
    return new Yd_list().init(new_list);
  },
  bldAccum: function() {
    this.toNumber();

    var new_list = this.bldClone();

    var t_sum = 0;
    for (var i = 0; i < new_list.getLen(); i++) {
      var item = new_list.list[i];
      t_sum = t_sum + item;
      new_list.list[i] = t_sum;
    }
    return new_list;
  },
  bldReindex: function(p_index){
    var new_list = new Array();
    for (var i = 0; i < p_index.length; i++) {
      var t_index = p_index[i];
      var t_item = this.list[t_index];
      new_list.push(t_item);
    }
    return new Yd_list().init(new_list);
  },
  bldTrunc: function(len) {
    if (len >= this.list.length) {
      return this;
    }
    var new_list = this.init(this.get()).bldClone().get();
    new_list.splice(len, new_list.length - len + 1);
    return new Yd_list().init(new_list);
  },
  bldUnique: function(){
    var new_array = [];
    for(var i=0; i<this.list.length;i++){
      if(new_array.indexOf(this.list[i]) == -1) {
        new_array.push(this.list[i]);
      }
    }
    return new Yd_list().init(new_array);
  },
  

  // 改变
  toIter: function(f_filter){
    var f_filter = f_filter || function(x){return x;};
    for(var i=0; i<this.list.length; i++) {
      this.list[i] = f_filter(this.list[i]);
    }
    return this;
  },
  toFilterByFunc: function(f_filter){
    var f_filter = f_filter || function(x){return true;};
    this.list = this.list.filter(f_filter);
    return this;
  },
  toFilterByValues: function(value_array){
    var t_array = new Yd_list().init(value_array);
    var new_list = new Array();
    for(var i=0; i<this.list.length; i++) {
      var item = this.list[i];
      if ( t_array.has(item)){
        new_list.push(item);
      }
    }
    this.list = new_list;
    return this;
  },
  toDelete: function(value_array) {
    function f_filter(value) {
      return value_array.indexOf(value) === -1; 
    }
    return this.toFilterByFunc(f_filter);
  },
  toCloneItem: function(index) {
      // -1 表示最后，0表示不删除
      this.list.splice(-1, 0, this.list[index]);
      return this;
  },
  toSortIndex: function() {
    this.sortindex = new Yd_list().init([]).init1N(this.list.length).get();
    yd_array_merge_sort(this.list, this.sortindex); 
    return this;
  },
  getSortIndex: function(){
    return this.sortindex;
  },
  toNumber: function(){
      for(var j=0; j<this.list.length; j++){
          var value = this.list[j];
          if( !isNaN( value ) )
          {
             this.list[j] = value - 0;
          }
      }
      return this;
  }
};

// 判断变量是否为数组
function yd_array_is(arr) {
    return ({}).toString.call(arr).match(/^\[[^\s]+\s*([^\s]+)\]$/)[1] == 'Array';
}

function yd_array_merge_sort(arr, p_key, p_order) {
    if (!yd_array_is(arr)) return [];
    var p_key = yd_array_is(p_key) ? p_key : [];
    // 对数组arr做若干次合并：数组arr的总长度为len，将它分为若干个长度为gap的子数组；
    // 将"每2个相邻的子数组" 进行合并排序。
    // len = 数组的长度，gap = 子数组的长度
    function tf_merge_groups(arr, len, gap) {
        // 对arr[0..len)做一趟归并排序
        // 将"每2个相邻的子数组"进行合并排序
        for (var i = 0; i + 2 * gap - 1 < len; i += gap * 2) {
            tf_merge(arr, i, i + gap - 1, i + 2 * gap - 1);  // 归并长度为len的两个相邻子数组
        }
        // 注意：
        // 若i ≤ len - 1且i + gap - 1 ≥ len - 1时，则剩余一个子数组轮空，无须归并
        // 若i + gap - 1 < len - 1，则剩余一个子数组没有配对
        // 将该子数组合并到已排序的数组中
        if (i + gap - 1 < len - 1) {                              // 尚有两个子文件，其中后一个长度小于len - 1
            tf_merge(arr, i, i + gap - 1, len - 1);           // 归并最后两个子数组
        }        
    }
    // 核心排序过程
    function tf_merge(arr, start, mid, end) {
        var i = start;      // 第1个有序区的索引，遍历区间是：arr数组中的[start..mid]
        var j = mid + 1;    // 第2个有序区的索引，遍历区间是：arr数组中的[mid + 1..end]
        var aTmp  = [];     // 汇总2个有序区临时数组
        var kTmp  = [];
        var isAsc = (p_order + '').toLowerCase() !== 'desc';
        /* 排序过程开始 */
        while (i <= mid && j <= end) {   // 遍历2个有序区，当该while循环终止时，2个有序区必然有1个已经遍历并排序完毕
            if ((!isAsc && arr[i] <= arr[j]) || (isAsc && arr[i] >= arr[j])) {  // 并逐个从2个有序区分别取1个数进行比较，将较小的数存到临时数组aTmp中
                aTmp.push(arr[i]);
                kTmp.push(p_key[i++]);
            } else {
                aTmp.push(arr[j]);
                kTmp.push(p_key[j++]);
            }
        }
        // 将剩余有序区的剩余元素添加到临时数组aTmp中
        while (i <= mid) {
            aTmp.push(arr[i]);
            kTmp.push(p_key[i++]);
        }
        while (j <= end) {
            aTmp.push(arr[j]);
            kTmp.push(p_key[j++]);
        }
　　　　　　  /*排序过程结束*/
        var len = aTmp.length, k;
        // 此时，aTmp数组是经过排序后的有序数列，然后将其重新整合到数组arr中
        for (k = 0; k < len; k++) {  
            arr[start + k] = aTmp[k];
            p_key[start + k] = kTmp[k];
        }
    }
    // 归并排序(从下往上)
    return (function (arr) {
        // 采用自底向上的方法，对arr[0..len)进行二路归并排序
        var len = arr.length;
        if (len <= 0) return arr;
        for (var i = 1; i < len; i *= 2) {   // 共log2(len - 1)趟归并
            tf_merge_groups(arr, len, i);        // 有序段长度 ≥ len时终止
        }
    })(arr);
}
