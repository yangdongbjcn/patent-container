$(document).ready(function(){
	gf_cookie_login();

	g_var.q_url_params = yd_url_get_params('node_brief_data.php');

	$('#brief_btn').click(function(){
		tf_count1();

	});/*click function*/
});


function tf_count1() {
	var t_div;		

	var t_brief_fields = 't_appli_date, t_legal_valid, t_applicant_std, t_pub_num, t_fam_num, t_tech_feature_num, t_cite_patent_num, t_cited_patent_num';
	
	var t_path = yd_url_decode(g_var.q_url_params[0]);

	// var t_where_string = "t_pub_num like 'CN%' ";
	var t_where_string = $("select[name=brief_select]").val();
	
	var p_url = g_var.g_server_patent_data + 'Search/api_node_brief';

	var p_data = {
		'path': t_path,
		'brief_fields': t_brief_fields,
		'where_string': t_where_string
	};

	var l_data;

	p_callback = function(data, status){
		l_data = JSON.parse(data);
	}

	$.ajax({
        async: false,
        type: "post",
        url: p_url,
        data: p_data,
        datatype: 'json',
        success: p_callback,
    });

	for (var key in l_data) {

		t_div = new YdHtml().init().addTableDiv(key).get();
		$("#data_div").append($(t_div));

		var t_dicts = new Yd_box().GetFrameByCombineLayers(l_data[key]);
		var column_dict = {};
		column_dict[key] = key;
		column_dict['new_count'] = '统计';
		// column_dict['caozuo1'] = '分析';
		// column_dict['caozuo2'] = '分析';
		// var base_href1 = g_var.g_yd_patent_data + 'applicant_brief.php';
		// var base_href2 = g_var.g_yd_patent_data + 'patent_view.php';
		var column_defs = new YdColumnDefs().init()
	        // .addButton(2, "统计", base_href1, ["t_applicant_std"])
	        // .addButton(3, "浏览专利", base_href2, ["t_applicant_std"])
	        .get();
		tf_datatables(t_dicts, key, column_dict, column_defs);
    }

}

function tf_datatables(p_data, control_id, column_dict, column_defs) {
	
	var t_dt = new YdDataTables();
	var option = t_dt.buildOption(p_data, column_dict, column_defs);
	option.order = [1, 'desc'];
    t_dt.showTable(option, control_id, column_dict);

}
