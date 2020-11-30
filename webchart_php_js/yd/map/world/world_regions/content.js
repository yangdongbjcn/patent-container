$(document).ready(function(){ 
 
	var t_col = ['China','United States','Japan','Germany','Korea','United Kingdom'];
	$('#col01').val(new YdList().init(t_col).toStringLines());

	t_col = ['177','142','102','81','47','36'];
	$('#col02').val(new YdList().init(t_col).toStringLines());

	$('#chart_button').click(function(){		
		var t_map_name = 'world';
		
		var col01 = ydbj_get_col('#col01');
		var col02 = ydbj_get_col('#col02');

		var p_url = g_var.g_server_chart + '/DataTransform/apiKeysColsToDictRows';
		var p_data = {
			keys: ['name', 'value'],
			cols: [col01, col02],
		};
		p_callback = function(data, status){
			g_var.map_region = JSON.parse(data);
		};
		$.ajax({
			async: false,
			type: "post",
			url: p_url,
			data: p_data,
			datatype: 'json',
			success: p_callback,
		});

		var t_position = new YdFrame().initDictRows(g_var.map_region).clone().getDictRows();

		var t_world_position = new YdPosition().getWorldPositionDictEnglish();
		t_position = new YdFrame().initDictRows(t_position)
			.matchConcatKeyDict('name', 'value', t_world_position, false).getDictRows();
		
		var series = Array();

		var serie1 = new YdMap(t_map_name).data(g_var.map_region).name('区域').get();
		
		var f_symbol_size = function(p_value) {
			var t_max = $('#max_value').val() - 0,
		    	t_min = $('#min_value').val() - 0,
		    	t_size = $('#scatter_size').val() - 0;

			var maxSize2Pin = 100,
			    minSize2Pin = 30;
            var a = (maxSize2Pin - minSize2Pin) / (t_max - t_min);
            var b = minSize2Pin + a * (p_value - t_min);
            var c = b * t_size;
            return c;
		}

		var t_font = $('#font_size').val() - 0;
		var serie3 = new YdScatterSize(t_position, f_symbol_size, 'pin', [0,0], '#F62157').label(2, 'inside', t_font).name('水滴').get();

		series = series.concat(serie1, serie3);

		var t_max = $('#max_value').val() - 0,
		    t_min = $('#min_value').val() - 0; 
		var ydbj_option = new YdOption().bgColor('#ffffff')
			.att('geo', new YdGeo(t_map_name).get())
			.visualMap(t_min, t_max).series(series);
		
		YdEcharts().initChart('map_div').set(ydbj_option.get());

		
	});/*click function*/
		
});
