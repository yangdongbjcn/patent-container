$(document).ready(function(){ 

	var t_row = ['提高操作可靠性',	'提高操作效率',	'提高操作速度',	'提高操作准确性',	'提高数据保持可靠性'];
	$('#p_keys').val(new Yd_list().init(t_row).toString());

	var t_col = ['整体架构','沟道区','存储结构','通孔'];
	$('#p_index').val(new Yd_list().init(t_col).toStringLines());	

	var t_matrix = [[3,	4,	13,	20,	1],
					[4,	3,	15,	24,	2],
					[2,	1,	12,	14,	1],
					[4,	2,	14,	16,	0]];

	$('#p_rows').val(new Yd_mat().init(t_matrix).toString());
	g_param_size.set_param(15);

	$('#submit').click(function(){
		var p_keys = yd_text_input_row('#p_keys');
		var p_index = yd_text_input_col('#p_index');
		var p_rows = yd_text_input_mat('#p_rows');

		var t_size = parseFloat(g_param_size.get_param());
		var t_font = parseFloat(g_param_font.get_param());

		comp_bubble_matrix(p_rows, p_keys, p_index, t_size, t_font);
	});/*click function*/
		
});


