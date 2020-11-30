$(document).ready(function(){

	var t_array = new Array('北京市',
							'天津市',
							'河北省',
							'山西省',
							'内蒙古自治区',
							'辽宁省',
							'吉林省',
							'黑龙江省',
							'上海市',
							'江苏省',
							'浙江省',
							'安徽省',
							'福建省',
							'江西省',
							'山东省',
							'河南省',
							'湖北省',
							'湖南省',
							'广东省',
							'广西壮族自治区',
							'海南省',
							'重庆市',
							'四川省',
							'贵州省',
							'云南省',
							'西藏自治区',
							'陕西省',
							'甘肃省',
							'青海省',
							'宁夏回族自治区',
							'新疆维吾尔自治区');
	initTextarea('#col00', t_array);
	t_array = new Array(2173,
						1562,
						7470,
						3682,
						2520,
						4378,
						2733,
						3799,
						2420,
						7999,
						5590,
						6196,
						3874,
						4592,
						9947,
						9532,
						5885,
						6822,
						10999,
						4838,
						917,
						3048,
						8262,
						3555,
						4771,
						331,
						3813,
						2610,
						593,
						675,
						2398);
	initTextarea('#col01', t_array);
	t_array = new Array(7943.89,
						12779.39,
						31750.02,
						14197.98,
						15080.01,
						6692.25,
						13923.2,
						10648.35,
						6755.88,
						49663.21,
						30276.07,
						27033.38,
						23237.35,
						19694.21,
						53322.94,
						40415.09,
						30011.65,
						28353.33,
						33303.64,
						18236.78,
						3890.45,
						16048.1,
						28811.95,
						13204,
						16119.4,
						1596.05,
						20825.25,
						9663.99,
						3528.05,
						3794.25,
						10287.53);
	initTextarea('#col02', t_array);
	t_array = new Array(25669.13,
						17885.39,
						32070.45,
						13050.41,
						18128.1,
						22246.9,
						14776.8,
						15386.09,
						28178.65,
						77388.28,
						47251.36,
						24407.62,
						28810.58,
						18499,
						68024.49,
						40471.79,
						32665.38,
						31551.37,
						80854.91,
						18317.64,
						4053.2,
						17740.59,
						32934.54,
						11776.73,
						14788.42,
						1151.41,
						19399.59,
						7200.37,
						2572.49,
						3168.59,
						9649.7);
	initTextarea('#col03', t_array);

	
	$('#chart_button').click(function(){
		var col01 = ydbj_get_col('#col01');
		var col02 = ydbj_get_col('#col02');
		var col03 = ydbj_get_col('#col03');
		var col00 = ydbj_get_col('#col00');

		var matrix01 = new Array();
		matrix01 = new YdMat().init(matrix01).addList(col01).addList(col02).addList(col03).addList(col00).T().toNumber().get();

		t_category_x =  g_param_x.get_param();
		t_category_y =  g_param_y.get_param();
		t_size = parseFloat(g_param_size.get_param());
		t_font = parseFloat(g_param_font.get_param());
		t_color = g_param_color.get_param();
		t_bgcolor = g_param_bg.get_param();

		YdEcharts().plotBubble(matrix01, 'chart_div', t_category_x, t_category_y, t_size, t_font, t_color, t_bgcolor);
	});/*click function*/
		
});

function initTextarea(element_id_string, value_array) {
	var value_string = value_array.join('\r\n');

    $(element_id_string).val(value_string);
}
