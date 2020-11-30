function ydbjPageSetCookie(cookie_name, json_var)
{
    // var json_var = JSON.stringify(json_var); //字符串带着两端的引号
    var cookie_string = cookie_name + '=' + escape(json_var); 
    // var cookie_string = cookie_name + '=' + json_var;
    
    var d = new Date();
    d.setMonth(d.getMonth()+1);
    d = d.toGMTString();
    cookie_string += ';' + 'expires=' + d;
    
    //20180606--cookie路径，全网站通用
    cookie_string += ';' + 'path=/';
    
    document.cookie = cookie_string;
};
            

function ydbjPageGetCookie(name){
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg);
    if (arr)
        return unescape(arr[2]);
    else
        return null;
}


function ydbjPageParams(page_name)
{
    param_array = new Array();

    var t_site = location.href;
    var t_split = t_site.split(page_name);
    var t_split_after = t_split[1];

    if (t_split_after) {
        // 20190508 YDBJ
        var label = '#';
        var t_split_label = t_split_after.split(label);
        var t_split_after = t_split_label[0];
    }

    if (t_split_after) {
        var param_array = t_split_after.split('/');
        param_array.splice(0, 1);
    }
    
    return param_array;
};

function YdbjMenuActive(){
    // var __id;
    // var __menu_id;
    return {
        init: function(id){
            this.id = id;
            this.menu_id = 'left_' + this.id;
        },
        getId: function(){
            return this.id;
        },
        getMenuLeftId: function() {
            return this.menu_id;
        },
        activeMenuLeft: function() {
            $('#' + this.menu_id).addClass('active');
        },
        initMenu: function(id){
            this.init(id);
            this.activeMenuLeft();
        }
    };
}

function YdbjDataTables(){
    return {
        generateColumns: function(p_list){
            var columns = new Array();
            for (var i in p_list) {
                var item = p_list[i];
                var obj = {};
                obj.data = item;
                columns.push(obj);
            }
            return columns;
        },
        generateBasicOption: function() {
            var option = {
                destroy: true
                ,pageLength: 100
                ,searching: false
                ,paging: false
                ,ordering: true
            };
            return option;
        },
        generateOption: function(p_list) {
            var columns = this.generateColumns(p_list);
            var option = this.generateBasicOption();
            option.columns = columns;
            return option;
        },
        initTableHeaderList: function(p_list){
            this.header_list = p_list;
        },
        getTableHeaderList: function(){
            return this.header_list;
        },
        initTableHeader: function(control_id, p_list){
            var selector = '#' + control_id + ' thead tr';
            // for (var i = p_list.length - 1; i >= 0; i--){
            for (var i = 0; i <= p_list.length - 1; i++){
                var item = p_list[i];
                var th = '<th>' + item + '</th>';
                $(selector).append(th);
            }
        },
        initDataTables: function(p_list){
            this.option = this.generateOption(p_list);
        },
        getOption: function(){
            return this.option;
        },
        setOption: function(option) {
            this.option = option;
        },
        showTable: function(t_data, control_id, dt_list, header_list, column_defs, filter_func) {
            var filter_func = filter_func || function(x){return x;};
            var option = this.generateOption(dt_list);
            option.columnDefs = column_defs;
            this.initTableHeader(control_id, header_list);

            option.data = t_data;
            t_data = filter_func(t_data);
            $('#' + control_id).DataTable(option);
        },
        showTableAjax: function(p_url, p_data, control_id, dt_list, header_list, column_defs, filter_func) {
            var filter_func = filter_func || function(x){return x;};
            var option = this.generateOption(dt_list);
            option.columnDefs = column_defs;
            this.initTableHeader(control_id, header_list);

            var p_callback = function(data, status){
                var t_data = JSON.parse(data);
                option.data = t_data;
                t_data = filter_func(t_data);
                $('#' + control_id).DataTable(option);
            };
            $.post(p_url, p_data, p_callback);
        },
        
    };
}




