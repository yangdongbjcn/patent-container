$(document).ready(function(){ 
 
	var t_col = ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆','广东','广西','海南','台湾','香港','澳门'];
	$('#col01').val(new Yd_list().init(t_col).toStringLines());

	t_col = ['177','42','102','81','47','67','82','66','24','92','114','109','116','91','119','137','116','114','91','125','62','83','9','80','56','10','18','67','123','59','14','0','0','0'];
	$('#col02').val(new Yd_list().init(t_col).toStringLines());

	$('#chart_button').click(function(){
		var t_map_name = 'china';
		
		var col01 = yd_text_input_col('#col01');
		var col02 = yd_text_input_col('#col02');

		var p_url = g_var.g_server_chart + '/DataTransform/apiKeysColsToDictRows';
		var p_data = {
			keys: ['name', 'value'],
			cols: [col01, col02],
		};
		p_callback = function(data, status){
			g_var.q_map_region = JSON.parse(data);
		};
		$.ajax({
			async: false,
			type: "post",
			url: p_url,
			data: p_data,
			datatype: 'json',
			success: p_callback,
		});

		var t_position = new Yd_frame().initDicts(g_var.q_map_region).clone().getDicts();

		t_position = new Yd_frame().initDicts(t_position)
			.echartsGenChinaMapScatter('name', 'value', false).getDicts();
		
		var series = Array();

		var serie1 = new YdMap(t_map_name).data(g_var.q_map_region).name('区域').get();
		
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
		
		var t_option = new YdOption().bgColor('#ffffff')
			.att('geo', new YdGeo(t_map_name).get())
			.visualMap(t_min, t_max).series(series).get();
		
		new YdChart().init('map_div').option(t_option).get();

		
	});/*click function*/
		
});
