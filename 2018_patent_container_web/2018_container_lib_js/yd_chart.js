
///////////////////////////////////////////////////////////
//
//      YdLabel, YdSerie, YdLegend
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
        offset: p_offset
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
        color: p_color
    };
    return this;
};


var YdSerie = function() {
    YdObject.call(this);
    this.dict = {
    };  
};
YdSerie.prototype = new YdObject();
YdSerie.prototype.init = function(value) {
    this.dict = value;
    return this;
};
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
YdSerie.prototype.itemColor = function(value) {
    this.dict.itemStyle = {
        color: value
    };
    return this;
};

var YdLegend = function() {
    YdObject.call(this);
};
YdLegend.prototype = new YdObject();
YdLegend.prototype.init = function(p_left, p_top, p_color) {
    var p_left = p_left || 'right';
    var p_top = p_top || 'middle';
    var p_color = p_color || '#fff';
    this.legend = {
        type: 'scroll',
        orient: 'vertical',
        left: p_left,
        top: p_top,
        textStyle: {
            color: p_color,
            fontSize: 16
        }
    };
    return this;
};
YdLegend.prototype.names = function(p_names) {
    var f_gen_legend_data = function(os_appl_s_start) {
        var t_legend_data = [];
        for(var i in os_appl_s_start) {
            var t_name = os_appl_s_start[i];
            t_legend_data.push({name: t_name});
        }
        return t_legend_data;
    };
    var p_legend_data = f_gen_legend_data(p_names);
    this.legend.data = p_legend_data;
    return this;
};
YdLegend.prototype.get = function() {
    return this.legend;
};



///////////////////////////////////////////////////////////
//
//      YdOption, YdColors, YdChart
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
        scale: true
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
            rotate: p_rotate
        },
        data: value
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
        data: value
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
        bottom: bottom
    };
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
            color: ['#50a3ba', '#eac736','#d94e5d']
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
        {min: 1, max: 20}
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
            }
        }
    };
    return this;
};
YdOption.prototype.initFrameBar = function(p_names, p_keys, p_clists, map_type, is_stack) {
    // p_names = [2013, 2014, 2015]
    // p_keys = ['sales', 'products'];
    // p_clists = [[500, 600, 700], [550, 650, 750]];

    // 使用示例
    // var control_id = 'div_patentnum_year_regions';
    // var t_option = new YdOption().initFrameBar(t_frame.getNames().get(), t_frame.bldKeys().get(), t_frame.getClists().get(), 'bar', true).title('年度原创趋势').get();
    // var time1_chart = new YdChart().init(control_id).option(t_option).get();

    var map_type = map_type || 'bar';
    var is_stack = is_stack || false;
    if (p_keys.length != p_clists.length) {
        debugger;
    }

    var t_lists = [];
    if (is_stack){
        var stack_name = 'one';
        for (var i = p_keys.length - 1; i >= 0; i--) {
            var t_list = [p_keys[i], map_type, p_clists[i], stack_name];
            t_lists.push(t_list);
        }
        var t_keys = ['name', 'type', 'data', 'stack'];
    }else{
        for (var i = p_keys.length - 1; i >= 0; i--) {
            var t_list = [p_keys[i], map_type, p_clists[i]];
            t_lists.push(t_list);
        }
        var t_keys = ['name', 'type', 'data'];
        
    }
    
    var t_series = new Yd_mat().init(t_lists).getDicts(t_keys);
    var legend = new YdLegend().init('right', 'middle', '#000').get();
    this.xAxis(p_names, 'category', 90).yAxis(null).series(t_series).legend(legend);
    return this;
};
YdOption.prototype.initScatterBubble = function(p_scatter_mat, bubble_size, bubble_font, bubble_color, x_axis, y_axis) {
    var bubble_color = bubble_color || new YdColors().getColors();
    var x_axis = x_axis || 'category';
    var y_axis = y_axis || 'category';
    // p_scatter_mat = [[["技术效果1", "技术手段1", 3, 3], ["技术效果2", "技术手段1", 3, 3]],[["技术效果1", "技术手段2", 3, 3], ["技术效果2", "技术手段2", 3, 3]]];
    // 使用示例
    // var control_id = 'chart_div';
    // var t_option = new YdOption().initScatterBubble(l_data, t_size, t_font).get();
    // var time1_chart = new YdChart().init(control_id).option(t_option).get();
    
    var series = Array();
    for(var i=0; i<p_scatter_mat.length; i++) {
        var item = p_scatter_mat[i];
        var p_color = bubble_color[i];

        var serie = new YdSerie().name(i).data(item)
            .type('scatter').symbolSize(bubble_size).label(bubble_font).itemColor(p_color).get();

        series.push(serie);
    }

    this.xAxisType(x_axis).yAxisType(y_axis).series(series);
    return this;
};

var YdChart = function() {
    YdObject.call(this);
    // this.chart
};
YdChart.prototype = new YdObject();
YdChart.prototype.init = function(control_id) {
    this.chart = echarts.init(document.getElementById(control_id));
    return this;
};
YdChart.prototype.get = function() {
    return this.chart;
};
YdChart.prototype.option = function(p_option) {
    this.chart.setOption(p_option);
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
    var cn_names = new YdPosition().getCnNames();
    var positions = new YdPosition().getPosition(cn_names);

    for (var i = 0; i < cn_names.length; i++) {
        var k = cn_names[i]
        var value = positions[i];
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

