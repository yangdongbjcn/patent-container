$(document).ready(function(){
	gf_cookie_login();

	g_var.q_url_params = yd_url_get_params('applicant_region.php');

	var t_brief_field = 't_pub_num';

	var t_dicts = tf_get_data(t_brief_field);

	var t_frame_group = tf_get_frame_group(t_dicts);

	var t_frame = tf_get_region_frame(t_frame_group);

	tf_show_frame(t_frame);

	$('#p_keys').val(t_frame.getKeys().toString());
	$('#p_index').val(t_frame.getNames().toStringLines());
	$('#p_rows').val(t_frame.getLists().toString());

});

function tf_get_data(t_brief_field) {
	var t_path = yd_url_decode(g_var.q_url_params[0]);
	
	var p_url = g_var.g_server_patent_data + 'Search/api_node_brief_applicant_region';

	var p_data = {
		'path': t_path,
		'brief_field': t_brief_field
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

    var t_dicts = new Yd_box().GetFrameByCombineLayers(l_data);

    return t_dicts;
}

function tf_get_frame_group(t_dicts) {

    var t_size_limit = 2;
	
	var t_frame_group = new Yd_frame().initDicts(t_dicts).toGroup('t_applicant_std');

	var f_filter = function(p_key, p_value){
		if (p_value.len() >= t_size_limit) {
			return true;
		}else{
			return false;
		}
	};

	var t_fg_dict = new Yd_dict().init(t_frame_group).filterFunc(f_filter);
	t_frame_group = t_fg_dict.get();

	return t_frame_group;
}

function tf_get_region_frame(t_frame_group) {

	// var t_keys = ['CN','US','EP','JP','KR'];
	// var t_keys = new YdPosition().getMainNationCodes();
	// var t_keys = gf_get_high_gdp_nation_codes();
	var t_keys = gf_get_high_gdp_per_capita_nation_codes();

	var t_lists = [];
	var t_names = [];

	for (var t_name in t_frame_group){
		if (t_name == '') continue;

		t_names.push(t_name);

		var t_frame = t_frame_group[t_name];

		
		var t_mat = t_frame.getLists().getSomeClists([1, 2]).formatClist(1, 'number').complete(0, t_keys);
		var t_values = t_mat.getClist(1).get();

		t_lists.push(t_values);
	}

	return new Yd_frame().initNamesKeysLists(t_names, t_keys, t_lists);
}

function tf_show_frame(t_frame) {
	var t_names = t_frame.getNames().get();
	var t_keys = t_frame.getKeys().get();
	var t_lists = t_frame.getLists().get();

	for (var i = 0; i < t_names.length; i++) {
		var t_name = t_names[i];
		var t_values = t_lists[i];
	
		if (t_name == '') continue;
		
		t_div = new YdHtml().init().addChartDiv(t_name).get();
		$("#chart_div2").append($(t_div));

		var control_id = t_name;
		var title_name = t_name;
	    var t_option = new YdOption().initFrameBar(t_keys, ['数量'], [t_values], 'bar', false).title(title_name).get();
	    var time1_chart = new YdChart().init(control_id).option(t_option).get();

	}
}


