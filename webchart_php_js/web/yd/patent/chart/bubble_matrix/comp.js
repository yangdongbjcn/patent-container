function comp_bubble_matrix(p_rows, p_keys, p_index, t_size, t_font) {
	// var p_url = g_var.g_server_chart + '/DataTransform/apiFrameToScatterMat';
	// var p_data = {
	// 	keys: p_keys,
	// 	index: p_index,
	// 	rows: p_rows
	// };
	// var l_data;
	// p_callback = function(data, status){
	// 	var mat02 = JSON.parse(data);

	// 	l_data = mat02;
	// };
	// $.ajax({
	// 	async: false,
	// 	type: "post",
	// 	url: p_url,
	// 	data: p_data,
	// 	datatype: 'json',
	// 	success: p_callback,
	// });

	
	var l_data = [];
	var t_frame = new Yd_frame().initNamesKeysLists(p_index, p_keys, p_rows);
	var t_names = t_frame.getNames().get();
	var t_lists = t_frame.getLists().get();
	var t_keys = t_frame.getKeys().get();
	for (var i = 0; i < t_names.length; i++) {
		var t_name = t_names[i];
		var t_list = t_lists[i];
		var list_frame = new Yd_frame().initNamesKeysLists([t_name], t_keys, [t_list]);
		var t_mat = list_frame.toScatter().cloneClist(2).get();
		l_data.push(t_mat);
	}

	
	var control_id = 'chart_div';
    var t_option = new YdOption().initScatterBubble(l_data, t_size, t_font).get();
    var time1_chart = new YdChart().init(control_id).option(t_option).get();
}