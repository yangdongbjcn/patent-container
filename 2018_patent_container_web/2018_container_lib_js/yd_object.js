// 20210219, IE8不支持indexOf
// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {

    var k;

    // 1. Let o be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var o = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of o with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = o.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = fromIndex | 0;

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of o with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of o with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in o && o[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}


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

// var yd_object_keys = function(input_object){
//     if (input_object == undefined){
//       debugger;
//     }
//     var t_arr = Object.keys(input_object);
//     for(var i = 0; i < t_arr.length; i++) {
//         var t_item = t_arr[i];
//         if ($.isNumeric(t_item)) {
//             t_arr[i] = t_item - 0;
//         }
//     }
// 	return t_arr.sort();
// }

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
    }
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
    }
};