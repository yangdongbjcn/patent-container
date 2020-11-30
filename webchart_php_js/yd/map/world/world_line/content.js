
function getBaseOption() {

	var f_timeline = function(time_start, time_end) {
		var time_line = new Array();
		for(var year = time_start; year <= time_end; year++) {
			var time_index = year.toString();
			time_line.push(time_index);
		}
		return time_line;
	}
	g_var.time_start = 2019;
	g_var.time_end = 2019;
	g_var.time_line = f_timeline(g_var.time_start, g_var.time_end);

	var serie1 = new YdMap('world').name('原创').get();

	var t_series = [serie1];

	var f_gen_legend_data = function(lines_start) {
		var t_legend_data = [];
		for(var i in lines_start) {
			var t_name = lines_start[i];
			t_legend_data.push({name: t_name});
		}
		return t_legend_data;
	}
	
	g_var.map_baseoption = new YdOption().bgColor('#ffffff').tooltipMouse()
    	.att('geo', new YdGeo('world').T('15%').color('#CCCCCC').get())
    	.timeline(g_var.time_line).series(t_series)
    	.get(); 
}

function getOption() {
	g_var.world_position = new YdPosition().getWorldPositionDict();
	g_var.world_color = new YdColors().getWorldColors();

	g_var.map_lines_end = {};
	for(var year = g_var.time_start; year <= g_var.time_end; year++) {
		var time_index = year.toString();

		var t_map_lines = g_var.map_lines[time_index];
		var t_dict = new YdMat().init(t_map_lines).toDataPivot(2, 1).get();

		g_var.map_lines_end[time_index] = t_dict;
	}
	var f_stat = function(x) {
		return new YdList().init(x).sum();
	};

	g_var.map_yeardest_frame = new YdFrame().init(g_var.map_lines_end).complete(0);
	g_var.map_destsum_dict = g_var.map_yeardest_frame.getKeyStat(f_stat).sortIndex();

	var t_map_dest_sum = new YdDict().init(g_var.map_destsum_dict).sortIndex();
	var t_keys = t_map_dest_sum.getKeys().get();
	var t_index = t_map_dest_sum.getSortIndex();

	g_var.map_series = {};

	for(var year = g_var.time_start; year <= g_var.time_end; year++) {
		var time_index = year.toString();
		
	    g_var.map_series[time_index] = [];

		var t_map_lines = g_var.map_lines[time_index];
		var t_lines_coords = YdMapOps().LinesCoords(t_map_lines, g_var.world_position);
		var t_lines_start = YdMapOps().LinesStart(t_map_lines);

		var t_lines_series = YdMapOps().SeriesLines(t_lines_start, t_lines_coords, g_var.world_color, 1329);
		g_var.map_series[time_index] = g_var.map_series[time_index].concat(t_lines_series);

	}

	g_var.map_options = [];

	for(var year = g_var.time_start; year <= g_var.time_end; year++) {
		var time_index = year.toString();
		g_var.map_options.push({
			series:g_var.map_series[time_index],
		}
		);
	}

}

$(document).ready(function(){

	var t_col = ["美国","美国","美国","美国","美国","中国","中国","中国","中国","中国","韩国","韩国","韩国","韩国","韩国","日本","日本","日本","日本","日本","欧洲","欧洲","欧洲","欧洲","欧洲"];
	$('#col01').val(new YdList().init(t_col).toStringLines());
	var t_col = ["美国","中国","韩国","日本","欧洲","美国","中国","韩国","日本","欧洲","美国","中国","韩国","日本","欧洲","美国","中国","韩国","日本","欧洲","美国","中国","韩国","日本","欧洲"];
	$('#col02').val(new YdList().init(t_col).toStringLines());
	var t_col = ["1329","291","173","103","99","62","891","0","1","6","978","410","936","62","7","577","119","115","579","10","2","0","1","0","3"];
	$('#col03').val(new YdList().init(t_col).toStringLines());

	$('#chart_button').click(function(){		

		// var nameColor = "rgb(55, 75, 113)";
		// var name_fontFamily = '等线';
		// var subname_fontSize = 15;
		// var name_fontSize = 18;

		var t_map_name = 'china';
		
		var col01 = ydbj_get_col('#col01');
		var col02 = ydbj_get_col('#col02');
		var col03 = ydbj_get_col('#col03');

		var p_url = g_var.g_server_chart + '/DataTransform/apiColsToMat';
		var p_data = {
			cols: [col01, col03, col02],
		};
		p_callback = function(data, status){
			g_var.map_lines = {};
			g_var.map_lines['2019'] = JSON.parse(data);
		};
		$.ajax({
			async: false,
			type: "post",
			url: p_url,
			data: p_data,
			datatype: 'json',
			success: p_callback,
		});

		getBaseOption();
		getOption();

		var map_chart = echarts.init(document.getElementById('map_div'));

		map_chart.setOption(
			{
				baseOption: g_var.map_baseoption
			});
		map_chart.setOption(
			{
				options: g_var.map_options,
			});
		
	});/*click function*/

	

});
