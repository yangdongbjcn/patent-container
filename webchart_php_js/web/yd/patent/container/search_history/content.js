$(window).load(function(){
	gf_cookie_login();

	new YdMenuActive().initMenu("search_history");

	tf_datatables();
	
	$("#a_table_refresh").click( function() {
		tf_datatables();
	} );

	// 取消收藏
    $('#div_table tbody').on('click', 'td.class_table_ops_delete', function () {
        p_url = g_var.g_server_patent_data + 'Search/api_del_favourite';

		p_data = {
			id: g_var.u_eng_name, 
			pub_num: this.parentNode.children[0].textContent
		};

		p_callback = function(data, status){
			var t_data = JSON.parse(data);
			alert(t_data.message);
			tf_datatables();
		}

		$.post(p_url, p_data, p_callback);
    } );
});

function tf_datatables() {
	var p_url = g_var.g_server_patent_data + 'Search/api_get_search_history';

	var p_data = {
		id: g_var.u_eng_name
	};

    var l_data;

	var p_callback = function(data, status){
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

    var control_id = "div_table";

    var column_dict = {
    	"h_id": 'ID',
        "h_search_input": '检索式',
        "caozuo1": "浏览",
        "caozuo2": "统计",
    };
    
    var base_href1 = g_var.g_yd_patent_data + 'patent_view.php'; 
    var base_href2 = g_var.g_yd_patent_data + 'search_brief.php';
    var column_defs = new YdColumnDefs().init()
        .addButton(2, "浏览", base_href1, ["h_search_input"])
        .addButton(3, "统计", base_href2, ["h_id"]).get();

    var t_dt = new YdDataTables();
    var option = t_dt.buildOption(l_data, column_dict, column_defs);
    t_dt.showTable(option, control_id, column_dict);

}
