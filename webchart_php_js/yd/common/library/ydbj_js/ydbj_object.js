if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

      var result = [];

      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop);
      }

      if (hasDontEnumBug) {
        for (var i=0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
        }
      }
      return result;
    }
  })()
};

var ydbj_object_keys = function(input_object){
    if (input_object == undefined){
      debugger;
    }
    var t_arr = Object.keys(input_object);
    for(var i = 0; i < t_arr.length; i++) {
        var t_item = t_arr[i];
        if ($.isNumeric(t_item)) {
            t_arr[i] = t_item - 0;
        }
    }
	return t_arr.sort();
}

Object.values = function(input_object){
	var return_array = new Array();

    var t_keys = Object.keys(input_object);
    for (var i = 0; i < t_keys.length; i++) {
        var t_key = t_keys[i];
        var t_value = input_object[t_key];
        return_array.push(t_value);
    }

	return return_array;
}

Array.max = function(array){
	return Math.max.apply(Math, array);
}

Array.min = function(array){
	return Math.min.apply(Math, array);
}

Array.unique = function(array){
	var new_array = [];
	for(var i=0; i<array.length;i++){
		if(new_array.indexOf(array[i]) == -1) {
			new_array.push(array[i]);
		}
	}
	return new_array;
}
　 
// 判断变量是否为数组
function ydbjarray_is(arr) {
    return ({}).toString.call(arr).match(/^\[[^\s]+\s*([^\s]+)\]$/)[1] == 'Array';
}

function ydbjarray_merge_sort(arr, key, order) {
    if (!ydbjarray_is(arr)) return [];
    var key = ydbjarray_is(key) ? key : [];
    // 对数组arr做若干次合并：数组arr的总长度为len，将它分为若干个长度为gap的子数组；
    // 将"每2个相邻的子数组" 进行合并排序。
    // len = 数组的长度，gap = 子数组的长度
    function mergeGroups(arr, len, gap) {
        // 对arr[0..len)做一趟归并排序
        // 将"每2个相邻的子数组"进行合并排序
        for (var i = 0; i + 2 * gap - 1 < len; i += gap * 2) {
            merge(arr, i, i + gap - 1, i + 2 * gap - 1);  // 归并长度为len的两个相邻子数组
        }
        // 注意：
        // 若i ≤ len - 1且i + gap - 1 ≥ len - 1时，则剩余一个子数组轮空，无须归并
        // 若i + gap - 1 < len - 1，则剩余一个子数组没有配对
        // 将该子数组合并到已排序的数组中
        if (i + gap - 1 < len - 1) {                              // 尚有两个子文件，其中后一个长度小于len - 1
            merge(arr, i, i + gap - 1, len - 1);           // 归并最后两个子数组
        }        
    }
    // 核心排序过程
    function merge(arr, start, mid, end) {
        var i = start;      // 第1个有序区的索引，遍历区间是：arr数组中的[start..mid]
        var j = mid + 1;    // 第2个有序区的索引，遍历区间是：arr数组中的[mid + 1..end]
        var aTmp  = [];     // 汇总2个有序区临时数组
        var kTmp  = [];
        var isAsc = (order + '').toLowerCase() !== 'desc';
        /* 排序过程开始 */
        while (i <= mid && j <= end) {   // 遍历2个有序区，当该while循环终止时，2个有序区必然有1个已经遍历并排序完毕
            if ((!isAsc && arr[i] <= arr[j]) || (isAsc && arr[i] >= arr[j])) {  // 并逐个从2个有序区分别取1个数进行比较，将较小的数存到临时数组aTmp中
                aTmp.push(arr[i]);
                kTmp.push(key[i++]);
            } else {
                aTmp.push(arr[j]);
                kTmp.push(key[j++]);
            }
        }
        // 将剩余有序区的剩余元素添加到临时数组aTmp中
        while (i <= mid) {
            aTmp.push(arr[i]);
            kTmp.push(key[i++]);
        }
        while (j <= end) {
            aTmp.push(arr[j]);
            kTmp.push(key[j++]);
        }
　　　　　　  /*排序过程结束*/
        var len = aTmp.length, k;
        // 此时，aTmp数组是经过排序后的有序数列，然后将其重新整合到数组arr中
        for (k = 0; k < len; k++) {  
            arr[start + k] = aTmp[k];
            key[start + k] = kTmp[k];
        }
    }
    // 归并排序(从下往上)
    return (function (arr) {
        // 采用自底向上的方法，对arr[0..len)进行二路归并排序
        var len = arr.length;
        if (len <= 0) return arr;
        for (var i = 1; i < len; i *= 2) {   // 共log2(len - 1)趟归并
            mergeGroups(arr, len, i);        // 有序段长度 ≥ len时终止
        }
    })(arr);
}

///////////////////////////////////////////////////////////
//
//      YdObject, YdMultiple
//
///////////////////////////////////////////////////////////

var YdObject = function() {
    this.dict = {};
};

YdObject.prototype = {
    constructor: YdObject,
    set: function(value) {
        this.dict = value;
        return this;
    },
    get: function() {
        return this.dict;
    },
    att: function(key, value) {
        this.dict[key] = value;
        return this;
    },
    getAtt: function(key) {
        return this.dict[key];
    },
    conc: function(part_dict) {
        for (var key in part_dict) {
            this.dict[key] = part_dict[key];
        }
        return this;
    },
    name: function(value) {
        var key = 'name';
        this.att(key, value);
        return this;
    },
    data: function(value) {
        var key = 'data';
        this.att(key, value);
        return this;
    },
    type: function(value) {
        var key = 'type';
        this.att(key, value);
        return this;
    },
};

var YdMultiple = function() {
    this.list = [];
};

YdMultiple.prototype = {
    constructor: YdMultiple,
    set: function(value) {
        this.list = value;
        return this;
    },
    get: function() {
        return this.list;
    },
    att: function(key, value) {
        for (var i = this.list.length - 1; i >= 0; i--) {
            this.list[i][key] = value;
        }
        return this;
    },
    name: function(value) {
        for (var i = this.list.length - 1; i >= 0; i--) {
            this.list[i].name = value;
        }
        return this;
    },
    data: function(value) {
        for (var i = this.list.length - 1; i >= 0; i--) {
            this.list[i].data = value;
        }
        return this;
    },
    type: function(value) {
        for (var i = this.list.length - 1; i >= 0; i--) {
            this.list[i].type = value;
        }
        return this;
    },
};