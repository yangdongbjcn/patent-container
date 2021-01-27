g_var.q_url_params = yd_url_get_params('hai_compare.php');

g_var.q_map_name1 = yd_url_decode(g_var.q_url_params[0]);
g_var.q_map_name2 = yd_url_decode(g_var.q_url_params[1]);

if(g_var.q_map_name1 == 'undefined'){
  debugger;
}
if(g_var.q_map_name2 == 'undefined'){
  debugger;
}

function prepareData() {

	g_var.q_time_line = Object.keys(g_var.q_map_lines);

	// g_var.q_map_origin_names = ['美国','日本','中国','韩国','德国'];
	g_var.q_map_origin_names = [g_var.q_map_name1, g_var.q_map_name2];

	// g_var.q_map_branch_names = ['原创','基础理论','共性关键技术','支撑平台'];
	g_var.q_map_branch_names = ['原创'];

	for(var i = 0; i < g_var.q_time_line.length; i ++) {
		var time_index = g_var.q_time_line[i];
		time_index = String(time_index);

		var t_map_lines = g_var.q_map_lines[time_index];
		var t_map_lines_new = [];

		for(var j = 0; j < t_map_lines.length; j ++) {
			var t_map_line = t_map_lines[j];
			var t_name = t_map_line[0];
			var t_in = new Yd_list().init(g_var.q_map_origin_names).has(t_name);
            if (t_in) {
              t_map_lines_new.push(t_map_line);
            }
		}
		g_var.q_map_lines[time_index] = t_map_lines_new;
	}


}


function getBaseOption() {

	var serie1 = new YdMap('world').name('原创').get();

	var t_series = [serie1];

	var legend1 = new YdLegend().init().names(g_var.q_map_origin_names).get();
	var legend2 = new YdLegend().init('left').names(g_var.q_map_branch_names).get();
	var t_legend = [legend1, legend2];

	g_var.q_map_baseoption = new YdOption().bgColor('#404a59').tooltipMouse()
    	.visualMapPieces()
    	.att('geo', new YdGeo('world').TB('15%').get())
    	.timeline(g_var.q_time_line).series(t_series).legend(t_legend)
    	.get(); 
}

function getOption() {

	var t_map_series = {};

	for(var i = 0; i < g_var.q_time_line.length; i ++) {
		var time_index = g_var.q_time_line[i];
		time_index = String(time_index);
		
	    t_map_series[time_index] = [];
		if(g_var.q_map_region[time_index]){
			var t_serie = new YdMapTimeline(g_var.q_map_region[time_index],'原创').get();
			t_map_series[time_index].push(t_serie);		
		}

		var t_map_lines = g_var.q_map_lines[time_index];

		var t_lines_coords = YdMapOps().LinesCoords(t_map_lines);
		var t_lines_start = YdMapOps().LinesStart(t_map_lines);

		var t_lines_series = YdMapOps().LinesSeries(t_lines_start, t_lines_coords);
		t_map_series[time_index] = t_map_series[time_index].concat(t_lines_series);
	}

	g_var.q_map_options = [];

	for(var i = 0; i < g_var.q_time_line.length; i ++) {
		var time_index = g_var.q_time_line[i];
		time_index = String(time_index);

		g_var.q_map_options.push({
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
		prepareData();
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
        }
        
    });

    f_timeChart();
    f_timeChart1a();

    f_timeChart3();
    f_timeChart3a();

    f_bubbleChart();
    f_bubbleChart2();
});

function f_timeChart() {
	g_var.q_map_en_names = new YdPosition().getEnName(g_var.q_map_origin_names);

	var f_get_dict = function(map_region) {
		var map_nations = g_var.q_map_en_names;
		var series_names = map_nations.concat('其他');

		var stat = [];
		var s = new Yd_frame().initDicts(map_region).getClist('value').toNumber().sum();
		for (var i = 0; i < map_nations.length; i++) {
			var t_name = map_nations[i];
			var t_find = new Yd_frame().initDicts(map_region).filterValue('name', [t_name]).getDicts();
			if (t_find.length > 0) {
				var t_json = t_find[0];
				stat.push(t_json['value']);
			}else{
				stat[t_name] = 0;
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
    var t_chart = new YdChart().init(control_id).option(t_option);
}

function f_timeChart1a() {
	g_var.q_map_en_names = new YdPosition().getEnName(g_var.q_map_origin_names);

	var f_get_dict = function(map_region) {
		var map_nations = g_var.q_map_en_names;

		var stat = {};
		for (var i = 0; i < map_nations.length; i++) {
			var t_name = map_nations[i];
			var t_find = new Yd_frame().initDicts(map_region).filterValue('name', [t_name]).getDicts();
			if (t_find.length > 0) {
				var t_json = t_find[0];
				stat[t_name] = t_json['value'];
			}else{
				stat[t_name] = 0;
			}
		}
		return stat;
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
	
	var f_get_dict2 = function(year_list) {
		var t_list = year_list;
		var t_key0 = 0;

		var stat = [];
		stat[t_key0] = 0;
		for (var i = 1; i < t_list.length; i++) {
			if (t_list[i-1] == 0) {
				stat[i] = 0;
			}else{
				stat[i] = t_list[i] / t_list[i-1];
			}
		}
		return stat;
	}
	t_frame.iterClistFunc(f_get_dict2);

	var control_id = 'region_time_div1a';
	var t_option = new YdOption().initFrameBar(t_frame.getNames().get(), t_frame.getKeys().get(), t_frame.getClists().get(), 'line', false).title('年度原创同比增长率').get();
    var t_chart = new YdChart().init(control_id).option(t_option);
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
    var t_chart = new YdChart().init(control_id).option(t_option);
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
    var t_chart = new YdChart().init(control_id).option(t_option);
}

function f_timeChart3a() {

	var f_get_dict = function(map_lines) {
		var t_map_names = g_var.q_map_origin_names;

		var stat_nation_num = new Yd_mat().init(map_lines).getClist(0).toHistogram(t_map_names);

		var stat_patent_num = new Yd_mat().init(map_lines).toDataPivot(0, 1).get(); //.getClist(0).toHistogram(t_map_names);



		var t_dict = new Yd_dict().init(stat_patent_num);
		var t_list = t_dict.getValues().get();
		var t_keys = t_dict.getKeys().get();

		var stat = {};
		for (var i = 0; i < t_keys.length; i++) {
			var t_key = t_keys[i];
			var t_nation_num = stat_nation_num[t_key];
			if (t_nation_num == 0) {
				stat[t_key] = 0;
			}else{
				stat[t_key] = t_list[i] / t_nation_num;
			}
		}

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
    var t_frame = new Yd_frame().initNamesDictsAndComplete(t_names, t_dicts);

	var control_id = 'dest_num_div3a';
	var t_option = new YdOption().initFrameBar(t_frame.getNames().get(), t_frame.getKeys().get(), t_frame.getClists().get(), 'bar', true).title('年度一国平均申请量').get();
    var t_chart = new YdChart().init(control_id).option(t_option);
}

function f_bubbleChart() {

	var t_dest_num = 12;
	

	var f_get_dict = function(map_lines) {
		var t_map_names = [g_var.q_map_name1];

		var t_find = new Yd_mat().init(map_lines).filterValue(0, t_map_names).get();
		var stat = new Yd_mat().init(t_find).toCdict(2, 1).get();

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
    var t_yeardest_frame1 = new Yd_frame().initNamesDictsAndComplete(t_names, t_dicts);

	var f_get_stat = function(x) {
		return new Yd_list().init(x).sum();
	};
	var t_map_destsum_dict = t_yeardest_frame1.sumClists(f_get_stat).sortIndex();
	var t_keys = t_map_destsum_dict.getKeys().get();
	var t_index = t_map_destsum_dict.getSortIndex();
	var t_frame = t_yeardest_frame1.Transpose().reIndexAndTrunc(t_index, t_dest_num);

	var t_row = t_frame.getKeys().get();
	var t_col = t_frame.getNames().get();
	var t_matrix = t_frame.getLists().get();

	var p_url = g_var.g_server_chart + '/ChartData/apiFrameToScatterMat';
	var p_data = {
		keys: t_row,
		index: t_col,
		rows: t_matrix,
	};
	p_callback = function(data, status){
		var mat02 = JSON.parse(data);

		var control_id = 'bubble_div';
	    var t_option = new YdOption().initScatterBubble(mat02, 0.3, 12).title(g_var.q_map_name1+'布局数量').get();
	    var bubble_chart = new YdChart().init(control_id).option(t_option).get();
		bubble_chart.on('click',function(param){

	    });
	};
	$.post(p_url, p_data, p_callback);
}

function f_bubbleChart2() {

	var t_dest_num = 12;
	

	var f_get_dict = function(map_lines) {
		var t_map_names = [g_var.q_map_name2];

		var t_find = new Yd_mat().init(map_lines).filterValue(0, t_map_names).get();
		var stat = new Yd_mat().init(t_find).toCdict(2, 1).get();

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
    var t_yeardest_frame1 = new Yd_frame().initNamesDictsAndComplete(t_names, t_dicts);

	var f_get_stat = function(x) {
		return new Yd_list().init(x).sum();
	};
	var t_map_destsum_dict = t_yeardest_frame1.sumClists(f_get_stat).sortIndex();
	var t_keys = t_map_destsum_dict.getKeys().get();
	var t_index = t_map_destsum_dict.getSortIndex();
	var t_frame = t_yeardest_frame1.Transpose().reIndexAndTrunc(t_index, t_dest_num);

	var t_row = t_frame.getKeys().get();
	var t_col = t_frame.getNames().get();
	var t_matrix = t_frame.getLists().get();

	var p_url = g_var.g_server_chart + '/ChartData/apiFrameToScatterMat';
	var p_data = {
		keys: t_row,
		index: t_col,
		rows: t_matrix,
	};
	p_callback = function(data, status){
		var mat02 = JSON.parse(data);

		var control_id = 'bubble_div2';
	    var t_option = new YdOption().initScatterBubble(mat02, 0.3, 12).title(g_var.q_map_name2+'布局数量').get();
	    var bubble_chart = new YdChart().init(control_id).option(t_option).get();
		bubble_chart.on('click',function(param){

	    });
	};
	$.post(p_url, p_data, p_callback);
}