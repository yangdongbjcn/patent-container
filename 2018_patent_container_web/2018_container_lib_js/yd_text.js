function Yd_text(){
} 
Yd_text.prototype = {
  init: function(p_text){
      this.text = p_text;
      return this;
  },
  trim: function() {
    // this.text = this.text.trim();
    // 20210219, IE下不支持trim、使用replace代替
    this.text = this.text.replace(/^\s+|\s+$/g,'');
    return this;
  },
  removeSpace: function() {
  	var t_reg = new RegExp(" ", "g");
	  this.text = this.text.replace(t_reg, "");
    return this;
  },
  replace: function(p_origin, p_replace) {
  	var t_reg = new RegExp(p_origin, "g");
	 this.text = this.text.replace(t_reg, p_replace);
	 return this;
  },
  getHaving: function(p_match) {
    var t_reg = new RegExp(p_match);
    var result = this.text.match(t_reg);
    return result;
  },
  replaceEnter: function(p_replace) {
  	var t_reg = new RegExp("\r\n", "g");
	  this.text = this.text.replace(t_reg, p_replace);
	  var t_reg2 = new RegExp("\n", "g");
	  this.text = this.text.replace(t_reg2, p_replace);
    return this;
  },
  tailRemove: function(p_char) {
    var t_input = this.text;
    if (t_input[t_input.length - 1] === p_char) {
      t_input = t_input.substr(0, t_input.length-1);
    }
    this.text = t_input;
    return this;
  },
  get: function() {
    return this.text;
  },
  toArray: function(t_sep) {
    return this.text.split(t_sep);
  },
  toArrayByTab: function() {
  	var t_sep = /\t+/;
    return this.text.split(t_sep);
  },
  toArrayByEnter: function() {
    var sep = 'rrrrnnnn';
    this.replaceEnter(sep);
    return this.toArray(sep);
  },
  toLines: function(t_sep) {
    var p_replace = '\n';
    var t_reg = new RegExp(t_sep, "g");
    this.text = this.text.replace(t_reg, p_replace);
    return this.text;
  }
};

function yd_text_input_row(element_id_string) {
	var t_input = $(element_id_string).val();

	if (t_input == ''){
		alert('请输入一行数据');
		exit();
	}

	var t_array = new Yd_text().init(t_input).toArrayByTab();

	return t_array;
}


function yd_text_input_col(element_id_string) {
	var t_input = $(element_id_string).val();

	if (t_input == ''){
		alert('请输入一列数据');
		exit();
	}

	t_input = new Yd_text().init(t_input).replaceEnter(',').trim().get();

	var t_array = new Yd_text().init(t_input).toArray(',');

	return t_array;
}

function yd_text_input_mat(element_id_string) {
	
	var t_input = $(element_id_string).val();

	if (t_input == ''){
		alert('请从EXCEL拷贝数据');
		exit();
	}

	var t_array = new Yd_text().init(t_input).toArrayByEnter();

	var t_matrix = new Array();

	for(var i=0; i<t_array.length; i++) {
    var item = t_array[i];
		var t1 = new Yd_text().init(item).toArrayByTab();
		t_matrix.push(t1);
	}
	return t_matrix;
}

function yd_url_encode(utf_string) {
	// return encodeURIComponent(utf_string);
	return encodeURI(utf_string);
}

function yd_url_decode(utf_string) {
	// return decodeURIComponent(utf_string);
	return decodeURI(utf_string);
}

function yd_url_encode_b64(utf_string) {
  return btoa(encodeURIComponent(utf_string));
}

function yd_url_decode_b64(utf_string) {
  return decodeURIComponent(atob(utf_string));
}

function YdUrlJson(){
}
YdUrlJson.prototype = {
  init: function(){
      this.json = {};
      return this;
  },
  TransJsonToString: function(p_json) {
    var t_string = JSON.stringify(p_json);
    return t_string;
  },
  TransStringToJson: function(p_string) {
    var t_json = JSON.parse(p_string);
    return t_json;
  },
  get: function() {
    return this.json;
  }
};
