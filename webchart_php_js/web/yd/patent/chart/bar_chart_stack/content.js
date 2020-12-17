$(document).ready(function(){ 

	var t_col = ["production","sales"];

	var t_row = ["2013","2014","2015","2016","2017","2018","2019"];

	var t_matrix = [[22442,31655,50658,76297,103181,245162,367200],[-34851,-35000,-51095,-83922,-101027,-254530,-365194]];

	$('#p_keys').val(new Yd_list().init(t_row).toString());

	$('#p_index').val(new Yd_list().init(t_col).toStringLines());	

	$('#p_rows').val(new Yd_mat().init(t_matrix).toString());
	
	$('#chart_button').click(function(){
		var p_keys = yd_text_input_row('#p_keys');
		var p_index = yd_text_input_col('#p_index');
		var p_rows = yd_text_input_mat('#p_rows');

		var t_size = parseFloat(g_param_size.get_param());
		var t_font = parseFloat(g_param_font.get_param());

		comp_bar_chart(p_rows, p_keys, p_index, t_size, t_font);
	});/*click function*/
		
});


