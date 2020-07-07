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

var yd_object_keys = function(input_object){
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
    },
};