$(document).ready(function(){
	gf_cookie_login();

	g_var.q_url_params = yd_url_get_params('applicant_brief.php');

	tf_count2();
});


function tf_count2() {

	var t_appli = yd_url_decode(g_var.q_url_params[0]);
	
	var p_url = g_var.g_server_patent_data + 'Search/api_node_brief_applicant';

	var p_data = {
		't_applicant_std': t_appli
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

    var t_div;

    var t_brief_fields = ['t_pub_num', 't_appli_date', 't_legal_valid', 't_fam_num', 't_tech_feature_num', 't_cite_patent_num', 't_cited_patent_num'];

    for (var i = 0; i < t_brief_fields.length; i++) {
    	var t_brief_field = t_brief_fields[i];
    	var t_dicts = new Yd_box().GetFrameByCombineLayers(l_data[t_brief_field]);
		var t_frame = new Yd_frame().initDicts(t_dicts);

		t_div = new YdHtml().init().addChartDiv(t_brief_field).get();
		$("#chart_div2").append($(t_div));

		var control_id = t_brief_field;
		var clist_name = t_brief_field;
		var title_name = t_brief_field;
		var t_names = t_frame.getClist(clist_name).get();
		var t_values = t_frame.getClist('new_count').get();
	    var t_option = new YdOption().initFrameBar(t_names, ['数量'], [t_values], 'bar', false).title(title_name).get();
	    var time1_chart = new YdChart().init(control_id).option(t_option).get();
    }

}

