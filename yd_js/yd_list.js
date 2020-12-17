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
  merge: function(new_list){
      
      return this;
  },
  push: function(new_value) {
      
      return this;
  },
  unshift: function(new_value){
      
      return this;
  },

  // 输出
  get: function() {
    return this.list;
  },
  isEmpty: function() {
    if (this.len() == 0) {
      return true;
    }else{
      return false;
    }
  },
  len: function() {
    return this.list.length;
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

  // 判断
  has: function(value){
    var t_index = this.list.indexOf(value);
    if ( t_index == -1 ) {
        return false;
    }else{
        return true;
    }
  },
  getIndexByValue: function(value){
    return this.list.indexOf(value);
  },

  // 改变
  iterFunc: function(f_filter){
    var f_filter = f_filter || function(x){return x;};
    var new_list = new Array();
    for(var i=0; i<this.list.length; i++) {
      this.list[i] = f_filter(this.list[i]);
    }
    return this;
  },
  filterFunc: function(f_filter){
    var f_filter = f_filter || function(x){return true;};
    var new_list = this.list.filter(f_filter);
    // for(var i=0; i<this.list.length; i++) {
    //   var item = this.list[i];
    //   if (f_filter(item)){
    //     new_list.push(item);
    //   }
    // }
    return new Yd_list().init(new_list);
  },
  filterValue: function(value_array){
    var t_array = new Yd_list().init(value_array);
    for(var i=0; i<this.list.length; i++) {
      var item = this.list[i];
      if ( t_array.has(item)){
        new_list.push(item);
      }
    }
    return new Yd_list().init(new_list);
  },
  deleteValue: function(value_array) {
    function f_filter(value) {
      return value_array.indexOf(value) === -1; 
    }
    return this.filterFunc(f_filter);
  },
  cloneItem: function(index) {
      // -1 表示最后，0表示不删除
      this.list.splice(-1, 0, this.list[index]);
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
  flip: function() {
    this.format('number');

    var new_list = [];
    for (var i = 0; i < this.len(); i++) {
      new_list.push(0);
    }
    for (var i = 0; i < this.len(); i++) {
      var t_index = this.list[i];
      new_list[t_index] = i;
    }
    return new Yd_list().init(new_list);
  },
  accum: function() {
    this.format('number');

    var new_list = this.clone();

    var t_sum = 0;
    for (var i = 0; i < new_list.len(); i++) {
      var item = new_list.list[i];
      t_sum = t_sum + item;
      new_list.list[i] = t_sum;
    }
    return new_list;
  },
  reIndex: function(p_index){
    var new_list = new Array();
    for (var i = 0; i < p_index.length; i++) {
      var t_index = p_index[i];
      var t_item = this.list[t_index];
      new_list.push(t_item);
    }
    return new Yd_list().init(new_list);
  },
  trunc: function(len) {
    if (len >= this.list.length) {
      return this;
    }
    var new_list = this.init(this.get()).clone().get();
    new_list.splice(len, new_list.length - len + 1);
    return new Yd_list().init(new_list);
  },
  format: function(format_string) {
    for (var i = 0; i < this.list.length; i++) {
      var item = this.list[i];
      var new_item;
      if (format_string == 'string') {
        new_item = String(item);
      }
      if (format_string == 'number') {
        new_item = Number(item);
      }
      this.list[i] = new_item;
    }
    return this;
  },

  // 排序
  // asort: function() {
  //   var f_compare = function(value1, value2) {
  //         if (value1 < value2) {
  //             return -1;
  //         }else if(value1 > value2) {
  //             return 1;
  //         }else {
  //             return 0;
  //         }
  //     }
  //     this.list.sort(f_compare); 
  //   return this;
  // },
  sortIndex: function() {
    this.sortindex = new Yd_list().init([]).init1N(this.list.length).get();
    yd_array_merge_sort(this.list, this.sortindex); 
    return this;
  },
  getSortIndex: function(){
    return this.sortindex;
  },
  
  // 数字
  toNumber: function(){
      for(var j=0; j<this.list.length; j++){
          var value = this.list[j];
          if( !isNaN( value ) )
          {
             this.list[j] = value - 0;
          }
      }
      return this;
  },
  max: function(){
    return Math.max.apply(Math, this.list);
  },
  min: function(){
    return Math.min.apply(Math, this.list);
  },
  sum: function() {
      var s = 0;
      for (var i=0; i<this.len(); i++) {
        s += this.list[i];
      }
      return s;
  },
  average: function() {
      var average = this.sum() / this.len();
      return average;
  },

  // 转换输出
  clone: function() {
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
  toDict: function(index_array) {
    if(this.len() != index_array.length){
      debugger;
    }
    var dict = {};
    for (var i = 0; i < this.len(); i++) {
      var index = index_array[i];
      var value = this.list[i];
      dict[index] = value;
    }
    return dict;
  },
  toString: function(sep){
    var sep = sep || '\t';
    return this.list.join(sep);
  },
  toStringLines: function(){
      return this.list.join('\r\n');
  },
  unique: function(){
    var new_array = [];
    for(var i=0; i<this.list.length;i++){
      if(new_array.indexOf(this.list[i]) == -1) {
        new_array.push(this.list[i]);
      }
    }
    return new Yd_list().init(new_array);
  },
  toHistogram: function(p_value){
    var p_input = this.list;
    var t_length = p_value.length;
    var t_hist = new Array(t_length);
    var i;
    for(i=0; i<t_length; i++){
      t_hist[p_value[i]] = 0;
    }
    for(i=0; i<p_input.length; i++){
      var item = p_input[i];
      var t_in = new Yd_list().init(p_value).has(item);
      if (t_in) {
        t_hist[item] = t_hist[item] + 1;
      }
    }
    return t_hist;
  },
  toGroup: function() {
    // var fn = function(o) {
      
    // };
    // const groups = {};
    // this.list.forEach(function (o) {
    //     const group = JSON.stringify(fn(o));
    //     groups[group] = groups[group] || [];
    //     groups[group].push(o);
    // });
    // return groups;
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
