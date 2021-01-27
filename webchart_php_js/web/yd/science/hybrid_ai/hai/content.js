
function getBaseOption() {

	g_var.q_time_line = Object.keys(g_var.q_map_lines);

	var serie1 = new YdMap('world').name('原创').get();
	var serie2 = new YdScatter().name('基础理论').get();
	var serie3 = new YdScatter().name('共性关键技术').get();
	var serie4 = new YdScatter().name('支撑平台').get();
	var serie5 = {type: 'bar'};
	
	var t_series = [serie1, serie2, serie3, serie4, serie5];
	// var t_series = [serie1, serie2, serie3, serie4];

	g_var.q_map_origin_names = ['美国','日本','中国','韩国','德国'];
	g_var.q_map_branch_names = ['原创','基础理论','共性关键技术','支撑平台'];
	var legend1 = new YdLegend().init().names(g_var.q_map_origin_names).get();
	var legend2 = new YdLegend().init('left').names(g_var.q_map_branch_names).get();
	var t_legend = [legend1, legend2];

	g_var.q_map_baseoption = new YdOption().bgColor('#404a59').tooltipMouse()
    	.visualMapPieces()
    	.att('geo', new YdGeo('world').T('5%').B('30%').get())
    	.timeline(g_var.q_time_line).series(t_series).legend(t_legend)
    	.xAxisEmpty().yAxisEmpty().grid('10%','10%', '70%','10%').get(); 
}

function getOption() {
	var f_get_dict = function(map_lines) {
		var t_dict = new Yd_mat().init(map_lines).toDataPivot(2, 1).get();
		return t_dict;
	}

	var f_get_stat = function(x) {
		return new Yd_list().init(x).sum();
	};

	var t_frame_dict = g_var.q_map_lines;
	var t_names = Object.keys(t_frame_dict);
	var t_dicts = [];
    for (var i = 0; i < t_names.length; i++) {
      var idx = t_names[i];
      var dict = f_get_dict(t_frame_dict[idx]);
      t_dicts.push(dict);
    }
    var t_yeardest_frame = new Yd_frame().initNamesDictsAndComplete(t_names, t_dicts);

	var t_stat = t_yeardest_frame.sumClists(f_get_stat);
	var t_destsum_dict = t_stat.sortIndex();

	var t_keys = t_destsum_dict.getKeys().get();
	var t_index = t_destsum_dict.getSortIndex();

	var t_dest_num = 20;
	g_var.q_map_dest_names = new Yd_list().init(t_keys).trunc(t_dest_num).get();

	var t_destyear_frame = t_yeardest_frame.Transpose().reIndexAndTrunc(t_index, t_dest_num);

	var t_map_series = {};

	for(var i = 0; i < g_var.q_time_line.length; i ++) {
		var time_index = g_var.q_time_line[i];
		time_index = String(time_index);
		
	    t_map_series[time_index] = [];
		if(g_var.q_map_region[time_index]){
			var t_serie = new YdMapTimeline(g_var.q_map_region[time_index],'原创').get();
			t_map_series[time_index].push(t_serie);	
		}

		let f_symbol_size = function(p_value) {
			var min_px = 10;
			var max_px = 40;
			var min_value = 0;
			var max_value = 1;
			var new_value = (p_value - min_value) / (max_value - min_value) * (max_px - min_px) + min_px;
	        return new_value;
	    };
		if(g_var.q_map_scatter1[time_index]){
			let scatter_data = YdMapOps().ScatterCoord(g_var.q_map_scatter1[time_index]);
	        let scatter_serie = new YdScatterSize(scatter_data, f_symbol_size, 'rect', [-25,30], '#6600CC').name('基础理论').get();
			t_map_series[time_index].push(scatter_serie);
		}
		if(g_var.q_map_scatter2[time_index]){
			let scatter_data = YdMapOps().ScatterCoord(g_var.q_map_scatter2[time_index]);
	        let scatter_serie = new YdScatterSize(scatter_data, f_symbol_size, 'diamond', [0,30], '#33FF33').name('共性关键技术').get();
			t_map_series[time_index].push(scatter_serie);
		}
	    if(g_var.q_map_scatter3[time_index]){
	        let scatter_data = YdMapOps().ScatterCoord(g_var.q_map_scatter3[time_index]);
	        let scatter_serie = new YdScatterSize(scatter_data, f_symbol_size, 'circle', [25,30], '#ddb926').name('支撑平台').get();
	        t_map_series[time_index].push(scatter_serie);
	    }

		var t_map_lines = g_var.q_map_lines[time_index];
		var t_lines_coords = YdMapOps().LinesCoords(t_map_lines);
		var t_lines_start = YdMapOps().LinesStart(t_map_lines);

		var t_lines_series = YdMapOps().LinesSeries(t_lines_start, t_lines_coords);
		t_map_series[time_index] = t_map_series[time_index].concat(t_lines_series);

		var t_data = t_destyear_frame.getClist(time_index).sortIndex().get();

	    var t_dict = new Yd_dict().initKeysValues(['name', 'type', 'data'], ['top 20', 'bar', t_data]).get();
		t_map_series[time_index] = t_map_series[time_index].concat([t_dict]);

	}

	g_var.q_map_options = [];

	for(var i = 0; i < g_var.q_time_line.length; i ++) {
		var time_index = g_var.q_time_line[i];
		time_index = String(time_index);

		g_var.q_map_options.push({
			xAxis: {
				type: 'category',
				data: g_var.q_map_dest_names,
				axisLabel: {
		        	interval: 0,
		        	color: '#fff',
		        	rotate: 45,
		        },
			},
			yAxis: {
				axisLabel: {
					color: '#fff',
				}
			},
			series:t_map_series[time_index],
		}
		);
	}

}

$(document).ready(function(){
	p_url = g_var.g_server_chart + '/ChartData/apiEmpty';
	p_data = {
	};
	p_callback = function(data, status){
		getBaseOption();
		getOption();
	}
	$.ajax({
		async: false,
		type: "post",
		url: p_url,
		data: p_data,
		datatype: 'json',
		success: p_callback,
	});

	var map_chart = echarts.init(document.getElementById('map_div'));

	map_chart.setOption(
		{
			baseOption: g_var.q_map_baseoption
		});
	map_chart.setOption(
		{
			options: g_var.q_map_options,
			xAxis: {
				data: g_var.q_map_origin_names,
				type: 'category',
			},
		});

    map_chart.on('click',function(param){
        var series_name = param.seriesName;
        var series_type = param.seriesType;
        var nation_name = param.name;
        if (series_type == 'map') {
            
    		f_timeChart2(nation_name);

    		f_timeChart4(nation_name);
        }
        if (series_type == 'scatter') {
            if ((series_name == '基础理论')) {
	            // window.open(g_var.g_yd__hybrid_ai + 'theory.php' + '/' + nation_name);
	        }
	        if ((series_name == '共性关键技术')) {
	            // window.open(g_var.g_yd__hybrid_ai + 'tech.php' + '/' + nation_name);
	        }
	        if ((series_name == '支撑平台')) {
	            // window.open(g_var.g_yd__hybrid_ai + 'platform.php' + '/' + nation_name);
	        }
        }
        if (series_type == 'lines') {
            var data_value = param.value;
            var line_start = data_value[0];
            var line_end = data_value[1];
            var line_num = data_value[2];
            // window.open(g_var.g_yd__hybrid_ai + 'hai_compare.php' + '/' + line_start + '/' + line_end);KL
            // window.open(g_var.g_yd__hybrid_ai + 'chinamap.php','newwindow','height=400,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no, location=no, status=no')
        }
    });

    map_chart.on('dblclick',function(param){
        var series_name = param.seriesName;
        var series_type = param.seriesType;
        var nation_name = param.name;
        nation_name = new YdPosition().getCnName([nation_name])[0];
        if (series_type == 'map') {
            // if (nation_name == 'China') {
	        //     window.open(g_var.g_yd__hybrid_ai + 'chinamap.php');
	        // }else{
        		window.open(g_var.g_yd__hybrid_ai + 'hai_dest.php' + '/' + nation_name);
	        // }
        }
        if (series_type == 'scatter') {
            if ((series_name == '基础理论')) {
	            window.open(g_var.g_yd__hybrid_ai + 'hai_theory.php');
	        }
	        if ((series_name == '共性关键技术')) {
	            window.open(g_var.g_yd__hybrid_ai + 'hai_tech.php');
	        }
	        if ((series_name == '支撑平台')) {
	            window.open(g_var.g_yd__hybrid_ai + 'hai_platform.php');
	        }
        }
        if (series_type == 'lines') {
            var data_value = param.value;
            var line_start = data_value[0];
            var line_end = data_value[1];
            var line_num = data_value[2];
            window.open(g_var.g_yd__hybrid_ai + 'hai_dest.php' + '/' + line_end, '_blank');
		}
    });

    f_timeChart();
    f_timeChart3();
});

function f_timeChart() {
	g_var.q_map_cn_names = new YdPosition().getEnName(g_var.q_map_origin_names);

	var f_get_dict = function(map_region) {
		var map_nations = g_var.q_map_cn_names;
		var series_names = map_nations.concat('其他');

		var stat = [];
		var s = new Yd_frame().initDicts(map_region).getClist('value').toNumber().sum();
		for (var i = 0; i < map_nations.length; i++) {
			var t_name = map_nations[i];
			var t_find = new Yd_frame().initDicts(map_region).filterValue('name', [t_name]).getDicts();
			if (t_find.length > 0) {
				var t_json = t_find[0];
				stat.push(t_json['value']);
			}
		}
		var t_left = s - new Yd_list().init(stat).toNumber().sum();
		stat.push(t_left);

		var t_dict = new Yd_dict().initKeysValues(series_names, stat).get();
		return t_dict;
	}

	var t_frame_dict = g_var.q_map_region;
	var t_names = Object.keys(t_frame_dict);
	var t_dicts = [];
    for (var i = 0; i < t_names.length; i++) {
      var idx = t_names[i];
      var dict = f_get_dict(t_frame_dict[idx]);
      t_dicts.push(dict);
    }
    var t_frame = new Yd_frame().initNamesDicts(t_names, t_dicts);
	

	var control_id = 'region_time_div';
	var t_option = new YdOption().initFrameBar(t_frame.getNames().get(), t_frame.getKeys().get(), t_frame.getClists().get(), 'bar', true).title('年度原创趋势').get();
    var time1_chart = new YdChart().init(control_id).option(t_option).get();

	time1_chart.on('dblclick',function(param){
		var x = 0;
		var series_name = param.seriesName;
		series_name = new YdPosition().getCnName([series_name])[0];

		window.open(g_var.g_yd__hybrid_ai + 'hai_origin.php' + '/' + series_name);

	});
}

function f_timeChart2(nation_name) {

	g_var.q_map_origin_name = nation_name;

	var f_get_dict = function(map_region) {
		var nation_name = g_var.q_map_origin_name;

		let t_map = 0;
		var t_find = new Yd_frame().initDicts(map_region).filterValue('name', [nation_name]).getDicts();
		if (t_find.length > 0) {
			var t_json = t_find[0];
			t_map = t_json['value'];
		}

		var t_dict = new Yd_dict().initKeysValues([nation_name], [t_map]).get();
		return t_dict;
	}

	var t_frame_dict = g_var.q_map_region;
	var t_names = Object.keys(t_frame_dict);
	var t_dicts = [];
    for (var i = 0; i < t_names.length; i++) {
      var idx = t_names[i];
      var dict = f_get_dict(t_frame_dict[idx]);
      t_dicts.push(dict);
    }
    var t_frame = new Yd_frame().initNamesDicts(t_names, t_dicts);
	
	var control_id = 'region_time_div2';
	var t_option = new YdOption().initFrameBar(t_frame.getNames().get(), t_frame.getKeys().get(), t_frame.getClists().get(), 'bar', true).title(nation_name+'年度原创趋势').get();
    var time2_chart = new YdChart().init(control_id).option(t_option).get();

	time2_chart.on('dblclick',function(param){
		var x = 0;
		var series_name = param.seriesName;
		series_name = new YdPosition().getCnName([series_name])[0];

		window.open(g_var.g_yd__hybrid_ai + 'hai_origin.php' + '/' + series_name);

	});
}

function f_timeChart3() {

	var f_get_dict = function(map_lines) {
		var t_map_names = g_var.q_map_origin_names;

		var stat = new Yd_mat().init(map_lines).getClist(0).toHistogram(t_map_names);
		return stat;
	}

	var t_frame_dict = g_var.q_map_lines;
	var t_names = Object.keys(t_frame_dict);
	var t_dicts = [];
    for (var i = 0; i < t_names.length; i++) {
      var idx = t_names[i];
      var dict = f_get_dict(t_frame_dict[idx]);
      t_dicts.push(dict);
    }
    var t_frame = new Yd_frame().initNamesDicts(t_names, t_dicts);
	
	var control_id = 'dest_num_div';
	var t_option = new YdOption().initFrameBar(t_frame.getNames().get(), t_frame.getKeys().get(), t_frame.getClists().get(), 'bar', true).title('年度布局国数量').get();
    var time3_chart = new YdChart().init(control_id).option(t_option).get();

	time3_chart.on('dblclick',function(param){
		var x = 0;
		var series_name = param.seriesName;

		window.open(g_var.g_yd__hybrid_ai + 'hai_dest.php' + '/' + series_name);

	});
}

function f_timeChart4(nation_name) {

	g_var.q_map_cn_name = new YdPosition().getCnName([nation_name])[0];

	var f_get_dict = function(map_lines) {
		var t_map_names = g_var.q_map_origin_names;
		var t_map_name = g_var.q_map_cn_name;

		var t_find = new Yd_mat().init(map_lines).filterValue(2, [t_map_name]).get();
		var t_mat = new Yd_mat().init(t_find).getSomeClists([0,1]);

		var stat = t_mat.toCdict(0, 1).get();

		return stat;
	}

	var t_frame_dict = g_var.q_map_lines;
	var t_names = Object.keys(t_frame_dict);
	var t_dicts = [];
    for (var i = 0; i < t_names.length; i++) {
      var idx = t_names[i];
      var dict = f_get_dict(t_frame_dict[idx]);
      t_dicts.push(dict);
    }
    t_frame = new Yd_frame().initNamesDictsAndComplete(t_names, t_dicts);
	
	var control_id = 'dest_num_div2';
	var t_option = new YdOption().initFrameBar(t_frame.getNames().get(), t_frame.getKeys().get(), t_frame.getClists().get(), 'bar', true).title(g_var.q_map_cn_name+'被布局数量').get();
    var time4_chart = new YdChart().init(control_id).option(t_option).get();

	time4_chart.on('dblclick',function(param){
		var x = 0;
		var series_name = param.seriesName;

		window.open(g_var.g_yd__hybrid_ai + 'hai_compare.php' + '/' + g_var.q_map_cn_name + '/' + series_name);

	});

}