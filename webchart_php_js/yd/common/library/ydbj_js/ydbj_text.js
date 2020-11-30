function ydbjtext_trans_line_to_comma(t_input) {
	// // 替换空格，有些tab会被用户用空格代替
	// var regSpace = new RegExp(" ", "g");
	// t_input = t_input.replace(regSpace, "");

	// 替换回车，有些只有\n，没有\r
	var regReturn = new RegExp("\r\n", "g");
	t_input = t_input.replace(regReturn, ",");
	var regReturn2 = new RegExp("\n", "g");
	t_input = t_input.replace(regReturn2, ",");

	// 替换分号，有些只有\n，没有\r
	var regReturn = new RegExp(";", "g");
	t_input = t_input.replace(regReturn, ",");

	// 去掉最后的逗号（空行）
	if (t_input[t_input.length - 1] === ",") {
		t_input = t_input.substr(0, t_input.length-1);
	}

	return t_input;
}

function ydbjtext_trans_comma_to_line(t_input) {
	// 替换逗号，为回车
	var regReturn = new RegExp(",", "g");
	t_input = t_input.replace(regReturn,"\r\n" );

	return t_input;
}

function ydbjtext_trans_to_array_by_comma(t_string) {
	return t_string.split(",");
}

function ydbjtext_trans_to_array_by_space(t_string) {
	return t_string.split(/\t+/);
}


function ydbj_get_row(element_id_string) {
	var t_input = $(element_id_string).val();

	if (t_input == ''){
		alert('请输入一行数据');
		exit();
	}

	var t_array = ydbjtext_trans_to_array_by_space(t_input);

	return t_array;
}


function ydbj_get_col(element_id_string) {
	var t_input = $(element_id_string).val();

	if (t_input == ''){
		alert('请输入一列数据');
		exit();
	}

	t_input = ydbjtext_trans_line_to_comma(t_input);

	var t_array = ydbjtext_trans_to_array_by_comma(t_input);

	return t_array;
}

function ydbj_get_mat(element_id_string) {
	
	var t_input = $(element_id_string).val();

	if (t_input == ''){
		alert('请从EXCEL拷贝数据');
		exit();
	}

	t_input = ydbjtext_trans_line_to_comma(t_input);

	var t_array = ydbjtext_trans_to_array_by_comma(t_input);

	var t_matrix = new Array();

	for(var i=0; i<t_array.length; i++) {
		var t1 = ydbjtext_trans_to_array_by_space(t_array[i]);
		t_matrix.push(t1);
	}
	return t_matrix;
}


function ydbjtext_encode_blank(text_string) {
    // return text_string.replace(/\s/gi,"__" );
    return escape(text_string);
}

function ydbjtext_decode_blank(text_string) {
    // return text_string.replace(/--/gi," " );
    return unescape(text_string);
}

function ydbjtext_decode_utf(utf_string) {
	return decodeURIComponent(escape(utf_string));
}

function ydbjtext_encode_uri(utf_string) {
	// IE 解析URL上的字符
	return encodeURIComponent(utf_string);
}

function ydbjtext_decode_uri(utf_string) {
	// Chrome 解析URL上的字符
	return decodeURIComponent(utf_string);
}
