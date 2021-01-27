function comp_world_regions(col01, col02, t_max, t_min, t_size, t_font) { 
	var p_url = g_var.g_server_chart + '/ChartData/apiKeysColsToDictRows';
	var p_data = {
		keys: ['name', 'value'],
		cols: [col01, col02],
	};
	var l_data;
	p_callback = function(data, status){
		l_data = JSON.parse(data);
	};
	$.ajax({
		async: false,
		type: "post",
		url: p_url,
		data: p_data,
		datatype: 'json',
		success: p_callback,
	});

	var t_position = new Yd_frame().initDicts(l_data)
		.echartsGenMapScatter('name', 'value', false).getDicts();
	
	var series = Array();
	
	var t_map_name = 'world';
	var serie1 = new YdMap(t_map_name).data(l_data).name('区域').get();
	
	var f_symbol_size = function(p_value) {
		
		var maxSize2Pin = 100,
		    minSize2Pin = 30;
        var a = (maxSize2Pin - minSize2Pin) / (t_max - t_min);
        var b = minSize2Pin + a * (p_value - t_min);
        var c = b * t_size;
        return c;
	}

	var serie3 = new YdScatterSize(t_position, f_symbol_size, 'pin', [0,0], '#F62157').label(2, 'inside', t_font).name('水滴').get();

	series = series.concat(serie1, serie3);

	var t_option = new YdOption().bgColor('#ffffff')
		.att('geo', new YdGeo(t_map_name).get())
		.visualMap(t_min, t_max).series(series).get();
	
	new YdChart().init('map_div').option(t_option).get();
}