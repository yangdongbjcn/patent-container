$(document).ready(function(){ 

	var t_row = ['提高操作可靠性',	'提高操作效率',	'提高操作速度',	'提高操作准确性',	'提高数据保持可靠性'];
	$('#row01').val(new YdList().init(t_row).toString());

	var t_col = ['整体架构','沟道区','存储结构','通孔'];
	$('#col01').val(new YdList().init(t_col).toStringLines());	

	var t_matrix = [[3,	4,	13,	20,	1],
					[4,	3,	15,	24,	2],
					[2,	1,	12,	14,	1],
					[4,	2,	14,	16,	0]];

	$('#mat01').val(new YdMat().init(t_matrix).toString());
	g_param_size.set_param(15);

	$('#chart_button').click(function(){
		var row01 = ydbj_get_row('#row01');
		var col01 = ydbj_get_col('#col01');
		var mat01 = ydbj_get_mat('#mat01');

		var p_url = g_var.g_server_chart + '/DataTransform/apiFrameToScatterSeries';
		var p_data = {
			keys: row01,
			index: col01,
			rows: mat01
		};
		p_callback = function(data, status){
			var mat02 = JSON.parse(data);

			t_size = parseFloat(g_param_size.get_param());
			t_font = parseFloat(g_param_font.get_param());

			YdEcharts().plotBubble3(mat02, 'chart_div', t_size, t_font);
		};
		$.post(p_url, p_data, p_callback);
	});/*click function*/
		
});


