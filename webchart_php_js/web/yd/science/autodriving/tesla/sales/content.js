$(document).ready(function(){ 

	f_sales_year();

	f_sales_season();	
});

function f_sales_year() {
	var t_data = jsondb_autodriving_tesla_sales;
	var t_keys = t_data.keys;
	var t_index = t_data.index;
	var t_rows = t_data.rows;

	// $('#p_keys').val(new Yd_list().init(t_keys).toString());
	// $('#p_index').val(new Yd_list().init(t_index).toStringLines());	
	// $('#p_rows').val(new Yd_mat().init(t_rows).toString());

	$('#chart_button').click(function(){
		var inv_index = t_keys;
		var inv_keys = t_index;
		var p_rows = t_rows;

		var inv_rows = new Yd_mat().init(p_rows).Transpose().get();

		var t_size = 0.1;
		var t_font = 12;

		comp_bar_chart(inv_rows, inv_keys, inv_index, t_size, t_font);
	});/*click function*/
}

function f_sales_season() {
	var t_data = jsondb_autodriving_tesla_sales_season;
	var t_keys = t_data.keys;
	var t_index = t_data.index;
	var t_rows = t_data.rows;

	$('#chart_button2').click(function(){
		var inv_index = t_keys;
		var inv_keys = t_index;
		var p_rows = t_rows;

		var inv_rows = new Yd_mat().init(p_rows).Transpose().get();

		var t_size = 0.1;
		var t_font = 12;

		comp_bar_chart(inv_rows, inv_keys, inv_index, t_size, t_font);
	});/*click function*/
}
