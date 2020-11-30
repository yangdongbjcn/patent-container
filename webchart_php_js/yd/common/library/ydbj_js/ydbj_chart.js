



///////////////////////////////////////////////////////////
//
//      YdLabel, YdSerie, YdBar
//
///////////////////////////////////////////////////////////

var YdLabel = function(f_formatter, p_color, p_fontSize, p_position, p_offset) {
    var p_fontSize = p_fontSize || 12;
    var p_position = p_position || 'inside';
    var f_formatter = f_formatter || function(param){
        return param.data[3];
    };
    var p_color = p_color || '#222222';
    var p_offset = p_offset || [0, 0];
    YdObject.call(this);
    this.dict = {
        show: true,
        formatter: f_formatter,
        position: p_position,
        fontSize: p_fontSize,
        color: p_color,
        offset: p_offset,
    };  
};
YdLabel.prototype = new YdObject();
YdLabel.prototype.emp = function(f_formatter, p_color, p_fontSize, p_position) {
    var p_fontSize = p_fontSize || 16;
    var p_position = p_position || 'top';
    var f_formatter = f_formatter || function(param){
        return param.data[3];
    };
    var p_color = p_color || '#000000';
    this.dict.emphasis = {
        show: true,
        formatter: f_formatter,
        position: p_position,
        fontSize: p_fontSize,
        color: p_color,
    };
    return this;
};


var YdSerie = function() {
    YdObject.call(this);
    this.dict = {
    };  
};
YdSerie.prototype = new YdObject();

YdSerie.prototype.symbolSize = function(value) {
    this.dict.symbolSize = function (data) {
        return Math.sqrt(data[2]) * value;
    };
    return this;
};
YdSerie.prototype.label = function(p_fontSize, p_position) {
    var f_formatter = f_formatter || function(param){
        return param.data[3];
    };
    var f_formatter2 = function (param) {
        return param.data[3] + ', 数量' + param.data[2];
    };
    var p_color = p_color || '#222222';
    var p_color2 = p_color || '#000000';
    this.dict.label = new YdLabel(f_formatter, p_color, p_fontSize, p_position)
                            .emp(f_formatter2, p_color2).get();
    return this;
};
// chrome
YdSerie.prototype.itemStyle = function(value) {
    this.dict.itemStyle = {
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
            offset: 0,color: value
        }, {
            offset: 1,color: value
        }])
    };
    return this;
};



var YdBar = function(p_title, p_type, p_data) {
    var p_type = p_type || 'bar';
    var p_data = p_data || [];
    YdObject.call(this);
    this.dict = {
        title: p_title,
        type: 'bar',
        tooltip: {
            show: false
        },
        label: {
            normal: {
                show: true,
                position: 'right',
                textStyle: {
                    color: '#000'
                }
            }
        },
        data: [],
    };
    return this;
};
YdBar.prototype = new YdObject();

var YdMultipleBar = function(rows, serie_names, map_type, item_color) {
    YdMultiple.call(this);
    var keys = ['name', 'type', 'data', 'stack', 'itemStyle'];
    var stack_name = 'one';
    var series_rows = [];
    var item_style = {color: item_color};
    for (var i = 0; i < rows.length; i++) {
        series_rows.push([serie_names[i], map_type, rows[i], stack_name, item_style]);
    }
    this.list = new YdFrame().initKeysMat(keys, series_rows).getDictRows();
};
YdMultipleBar.prototype = new YdMultiple();



///////////////////////////////////////////////////////////
//
//      YdOption, YdLegend, YdEcharts, YdMapOps
//
///////////////////////////////////////////////////////////

var YdOption = function() {
    YdObject.call(this);
    this.dict = {
    };  
};
YdOption.prototype = new YdObject();


YdOption.prototype.tooltip = function(trueFalse) {
    this.dict.tooltip = {show: trueFalse};
    return this;
};
YdOption.prototype.tooltipMouse = function() {
    this.dict.tooltip = {
        trigger: 'item',
        triggerOn: 'mousemove', // mousemove | click
        alwaysShowContent: 'true',
        formatter: function (param) {
            var value = param.value;
            return param.seriesName + '<br/>' + param.name + ' : ' + value;
        }
    };
    return this;
};
YdOption.prototype.legend = function(value) {
    this.dict.legend = value;
    return this;
};
YdOption.prototype.title = function(title_text) {
    this.dict.title = {text: title_text};
    return this;
};
YdOption.prototype.xAxisEmpty = function() {
    this.dict.xAxis = {};
    return this;
};
YdOption.prototype.yAxisEmpty = function() {
    this.dict.yAxis = {};
    return this;
};
YdOption.prototype.xAxisType = function(value) {
    this.dict.xAxis = {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        type: value,
        scale: true,
        axisLabel: {
            interval: 0 
        }
    };
    return this;
};
YdOption.prototype.yAxisType = function(value) {
    this.dict.yAxis = {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        type: value,
        scale: true,
    };
    return this;
};
YdOption.prototype.xAxis = function(value, p_type, p_rotate) {
    var p_type = p_type || 'category';
    var p_rotate = p_rotate || 0;
    this.dict.xAxis = {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        type: p_type,
        scale: true,
        axisLabel: {
            interval: 0,
            rotate: p_rotate,
        },
        data: value,
    };
    return this;
};
YdOption.prototype.yAxis = function(value, p_type) {
    var p_type = p_type || 'value';
    this.dict.yAxis = {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        type: p_type,
        scale: true,
        data: value,
    };
    return this;
};
YdOption.prototype.animation = function(trueFalse) {
    this.dict.animation = trueFalse;
    return this;
};
YdOption.prototype.series = function(value) {
    this.dict.series = value;
    return this;
};
YdOption.prototype.grid = function(left, right, top, bottom) {
    this.dict.grid = { show: true,
        left: left,
        right: right,
        top: top,
        bottom: bottom,
    };
    return this;
};

YdOption.prototype.backgroundColor = function(value) {
    this.dict.backgroundColor = new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
            offset: 0, color: value
        }, {
            offset: 1, color: value
        }]);
    return this;
};
YdOption.prototype.bgColor = function(value) {
    this.dict.backgroundColor = value;
    return this;
};
YdOption.prototype.visualMap = function(p_min, p_max) {
    var p_series_index = 0;
    this.dict.visualMap = {
        show: true, 
        min: p_min,
        max: p_max,
        left: 'left', 
        top: 'bottom',
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: true,
        inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
           // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            color: ['#50a3ba', '#eac736','#d94e5d'],
        },
        seriesIndex: [p_series_index],  // 把地图区域的数据放在第一个Series
    };
    return this;
};
YdOption.prototype.visualMapPieces = function(p_series_index, p_pieces) {
    var p_pieces = p_pieces || [
        {min: 5000},
        {min: 1000, max: 5000},
        {min: 500, max: 1000},
        {min: 200, max: 500},
        {min: 100, max: 200},
        {min: 20, max: 100},
        {min: 1, max: 20},
        // {value: 123, label: '123（自定义特殊颜色）', color: 'grey'},
        // {min: 5, max: 5, label: '5（自定义特殊颜色）', color: 'black'},
        // {max: 5},
    ];
    var p_series_index = p_series_index || 'all';
    // var p_series_index = p_series_index || [0];
    this.dict.visualMap = {
        type: 'piecewise',
        pieces: p_pieces,
        // color: ['#E0022B', '#E09107', '#A3E00B'],
        color: ['#d94e5d', '#eac736', '#50a3ba'],
        outOfRange: {
            color: '#323c48'    // 上述范围之外的值，也就是数值为0的，显示地图底色
        },
        textStyle: {
            color: '#aaa'
        },
        seriesIndex: p_series_index, // 20191216
    };
    return this;
};

YdOption.prototype.timeline = function(p_timeline) {
    this.dict.timeline = {
        axisType: 'category',
        data: p_timeline,   
        playInterval: 2000, // 播放的快慢
        symbolSize: 10,
        loop: true,
        autoPlay: true, // 是否自动播放
        label: {
            color: '#aaa'
        },
        controlStyle: {
            showNextBtn: true,
            showPrevBtn: true,
            showPlayBtn: true,
            normal: {
                color: '#666',
                borderColor: '#666'
            },
            emphasis: {
                color: '#aaa',
                borderColor: '#aaa'
            },
        }
    };
    return this;
};

var YdColors = function() {
    YdObject.call(this);
    this.colors = Array('#D15FEE','#228B22','#FFA500','#7B68EE','#EE7942','#CDC9A5', '#967BB6','#E75480','#436EEE','#32CD32','#EEEE00','#FFC125');
};
YdColors.prototype = new YdObject();
YdColors.prototype.getColors = function() {
    return this.colors;
};
YdColors.prototype.getWorldColors = function() {
    var world_color = {};
    var world_position = new YdPosition().getWorldPositionDict();

    for(var k in world_position) {
        var value = world_position[k];
        var str = '#';
        str = str + t_to_string16(value[0]);
        str = str + t_to_string16(value[1]);
        str = str + t_to_string16((value[0]+value[1])/2);
        world_color[k] = str;
    }

    function t_to_string16(input_num) {
        var num = parseInt(Math.abs(input_num));
        var str0 = num.toString(16);
        if (str0.length == 1){
            str0 = '0' + str0;
        }
        return str0;
    }

    world_color['美国'] = '#33CCFF';
    world_color['德国'] = '#FFCC00';
    world_color['日本'] = '#FFFF33'; //'#EEEEEE';
    world_color['韩国'] = '#0033FF';
    world_color['中国'] = '#CC3300';
    world_color['欧洲'] = '#33FF33';

    return world_color;
};


function YdLegend(){
    return {
        init: function() {
        	this.legend = {};
			return this;    
        },
        set: function() {
        	this.legend = value;
        	return this;
        },
        get: function() {
        	return this.legend;
        },
        att: function(key, value) {
        	this.legend.key = value;
        	return this;
        },
        initLegend: function(p_data, p_left, p_top, p_color) {
            var p_left = p_left || 'right';
            var p_top = p_top || 'middle';
            var p_color = p_color || '#fff';
        	this.legend = {
	        	type: 'scroll',
		    	orient: 'vertical',
		    	data: p_data,
		    	left: p_left,
		    	top: p_top,
		    	textStyle: {
		    		color: p_color,
		    		fontSize: 16
		    	}
	        };
	        return this;
    	},    
    };
}


function YdEcharts(){
    return {
        
        initChart: function(control_id) {
			this.chart = echarts.init(document.getElementById(control_id));
			return this;
        },
        set: function(option) {
        	this.chart.setOption(option);
        	return this;
        },
        plotBar: function(control_id, x_axis, t_series, legend_names, title_text) {
            var filter_func = filter_func || function(x){return x;};

            var legend = YdLegend().initLegend(legend_names, 'right', 'middle', '#000').get();
            var legends = [legend];
            
			var t_option = new YdOption().tooltip(false).title(title_text)
				.xAxis(x_axis, 'category', 90).yAxis(null).series(t_series).legend(legends).get();
			
    		this.initChart(control_id);
    		this.set(t_option);
    		return this.chart;
        },
        framePlotBar2: function(control_id, dict_rows, map_type, serie_names, title_text) {
            var ydbjFrame = new YdFrame().initDictRows(dict_rows);
            var x_axis = ydbjFrame.getKeys().get();
            var rows = ydbjFrame.getMat().get();
            return this.matPlotBar2(control_id, x_axis, rows, map_type, serie_names, title_text);
        },
        matPlotBar2: function(control_id, x_axis, rows, map_type, serie_names, title_text) {
            var keys = ['name', 'type', 'data'];
            var series_rows = [];
            for (var i = 0; i < rows.length; i++) {
                series_rows.push([serie_names[i], map_type, rows[i]]);
            }
            var t_series = new YdFrame().initKeysMat(keys, series_rows).getDictRows();
            return this.plotBar(control_id, x_axis, t_series, serie_names, title_text);
        },
        framePlotBar: function(control_id, dict_rows, map_type, serie_names, title_text) {
        	var ydbjFrame = new YdFrame().initDictRows(dict_rows);
        	var x_axis = ydbjFrame.getKeys().get();
        	var rows = ydbjFrame.getMat().get();
        	return this.matPlotBar(control_id, x_axis, rows, map_type, serie_names, title_text);
        },
   		matPlotBar: function(control_id, x_axis, rows, map_type, serie_names, title_text) {
			var keys = ['name', 'type', 'data', 'stack'];
		    var stack_name = 'one';
		    var series_rows = [];
			for (var i = 0; i < rows.length; i++) {
   				series_rows.push([serie_names[i], map_type, rows[i], stack_name]);
   			}
		    var t_series = new YdFrame().initKeysMat(keys, series_rows).getDictRows();
			return this.plotBar(control_id, x_axis, t_series, serie_names, title_text);
        },
        histPlotBar: function(control_id, x_axis, p_data, title_text) {
            var t_hist = new YdList().init(p_data).toHistogram(x_axis);

            var keys = ['name', 'type', 'data'];
		    var map_type = 'bar';
		    var rows = [ ['直方图', map_type, Object.values(t_hist)] ];
		    var t_series = new YdFrame().initKeysMat(keys, rows).getDictRows();

		    var t_option = new YdOption().tooltip(false).title(title_text).xAxis(x_axis).yAxis(null).series(t_series).get();
			
    		this.initChart(control_id);
    		this.set(t_option);
    		return this.chart;
        },
        dictPlotBar: function(p_dict, control_id, map_type, title_text) {
			var keys = ['name', 'type', 'data'];
		    // var map_type = 'bar';
		    var rows = [ ['图', map_type, Object.values(p_dict)] ];
		    var t_series = new YdFrame().initKeysMat(keys, rows).getDictRows();

		    var t_option = new YdOption().tooltip(false).title(title_text).xAxis(Object.keys(p_dict)).yAxis(null).series(t_series).get();
			
			this.initChart(control_id);
			this.set(t_option);
			return this.chart;
        },
        dictPlotPie: function(p_dict, control_id, map_type, title_text) {
			var keys = ['name', 'type', 'data'];
		    // var map_type = 'pie';
		    var rows = [ ['图', map_type, this.TransDictToPie(p_dict)] ];
		    var t_series = new YdFrame().initKeysMat(keys, rows).getDictRows();
			
			// sort
			t_series = t_series.sort(function (a, b) { return a.value - b.value; });
		    
		    var t_option = new YdOption().tooltip(false).title(title_text).xAxis(Object.keys(p_dict)).yAxis(null).series(t_series).get();
			
			this.initChart(control_id);
			this.set(t_option);
			return this.chart;
        },
        dictPlotRing: function(p_dict, control_id, map_type, title_text) {
			var keys = ['name', 'type', 'data'];
		    // var map_type = 'pie';
		    var rows = [ ['图', map_type, this.TransDictToPie(p_dict)] ];
		    var t_series = new YdFrame().initKeysMat(keys, rows).addKeyValue('radius', ['50%', '70%']).getDictRows();
			
			// sort
			t_series = t_series.sort(function (a, b) { return a.value - b.value; });
		    
		    var t_option = new YdOption().tooltip(false).title(title_text).xAxis(Object.keys(p_dict)).yAxis(null).series(t_series).get();
			
			this.initChart(control_id);
			this.set(t_option);
			return this.chart;
        },
        TransDictToPie: function(p_data){
			var t_keys = Object.keys(p_data);
			var t_values = Object.values(p_data);
			var pie_array = new Array();

			for(var i=0; i<t_keys.length; i++) {
				var t_object = {};
				t_object['name'] = t_keys[i];
				t_object['value'] = t_values[i];

				pie_array.push(t_object);
			}
			return pie_array;
		},
		plotBubbleIE: function(p_data, control_id, x_axis, y_axis, bubble_size, bubble_font) {
			var t_series = new YdSerie().name('显示').data(p_data)
				.type('scatter').symbolSize(bubble_size).label(bubble_font).get();


			var t_option = new YdOption()
				.title('').xAxisType(x_axis).yAxisType(y_axis)
				.series([t_series]).get();

			this.initChart(control_id);
    		this.set(t_option);
    		return this.chart;
		},
		plotBubble: function(p_data, control_id, x_axis, y_axis, bubble_size, bubble_font, bubble_color, bubble_bgcolor) {

			var t_series = new YdSerie().name('显示').data(p_data)
				.type('scatter').symbolSize(bubble_size).label(bubble_font).itemStyle(bubble_color).get();

			var t_option = new YdOption().backgroundColor(bubble_bgcolor)
				.title('').xAxisType(x_axis).yAxisType(y_axis)
				.series([t_series])
				.get();

			this.initChart(control_id);
    		this.set(t_option);
    		return this.chart;
		},
		plotBubble2: function(p_data, control_id, bubble_size, bubble_font, bubble_bgcolor) {

			var t_series0 = new YdSerie().name('显示1').data(p_data[0])
				.type('scatter').symbolSize(bubble_size).label(bubble_font, 'left').itemStyle('rgb(129, 227, 238)').get();
			var t_series1 = new YdSerie().name('显示2').data(p_data[1])
				.type('scatter').symbolSize(bubble_size).label(bubble_font, 'right').itemStyle('rgb(25, 183, 207)').get();
			var t_series2 = new YdSerie().name('显示3').data(p_data[2])
				.type('scatter').symbolSize(bubble_size).label(bubble_font, 'left').itemStyle('rgb(129, 227, 238)').get();

			
			var t_option = new YdOption().backgroundColor(bubble_bgcolor)
				.title('').xAxisType('category').yAxisType('category')
				.series([t_series0, t_series1, t_series2])
				.get();

			this.initChart(control_id);
    		this.set(t_option);
    		return this.chart;
		},
		plotBubble3: function(p_data, control_id, bubble_size, bubble_font, bubble_bgcolor, p_title) {
            var p_title = p_title || '';
            var bubble_bgcolor = bubble_bgcolor || '#ffffff';
			var series = Array();
		  	var p_colors = new YdColors().getColors();
			for(var i=0; i<p_data.length; i++) {
				var item = p_data[i];
				var p_color = p_colors[i];

				var serie = new YdSerie().name(i).data(item)
					.type('scatter').symbolSize(bubble_size).label(bubble_font).itemStyle(p_color).get();

				series.push(serie);
			}

			var t_option = new YdOption().backgroundColor(bubble_bgcolor)
				.title(p_title).xAxisType('category').yAxisType('category')
				.series(series)
				.get();

			this.initChart(control_id);
    		this.set(t_option);
    		return this.chart;
		},
    };
}
