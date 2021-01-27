$(document).ready(function(){ 
 
	var t_col = ['德胜门', '什刹海', '新街口', '展览路', '月坛', '金融街', '西长安街', '广安门外', '广安门内', '大栅栏', '陶然亭'];
	$('#col01').val(new Yd_list().init(t_col).toStringLines());

	t_col = ['17000', '1000', '5000', '20000', '25000', '30000', '18000', '2300', '20000', '16000', '28000'];
	$('#col02').val(new Yd_list().init(t_col).toStringLines());

	$('#chart_button').click(function(){
		var col01 = yd_text_input_col('#col01');
		var col02 = yd_text_input_col('#col02');

		var p_url = g_var.g_server_chart + '/ChartData/apiKeysColsToDictRows';
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

		$(function(){
			$.get(g_var.g_yd_echarts_china + 'beijing/xicheng.json',function(geoJson){
				var t_map_name = 'xicheng';

				echarts.registerMap(t_map_name,geoJson,{});

				var series = Array();

				var serie1 = new YdMap(t_map_name).data(g_var.q_map_region).name('区域').get();
		
				series = series.concat(serie1);

				var t_max = $('#max_value').val() - 0,
				    t_min = $('#min_value').val() - 0; 
				var t_option = new YdOption().bgColor('#ffffff')
					.att('geo', new YdGeo(t_map_name).get())
					.visualMap(t_min, t_max).series(series).get();
				
				new YdChart().init('map_div').option(t_option).get();
			});
		});

	});
		
});
