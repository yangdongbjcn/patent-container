$(window).load(function(){
	gf_cookie_login();

	new YdMenuActive().initMenu("node_search");

	g_var.q_url_params = yd_url_get_params('node_search.php');

	var t_string = yd_url_decode(g_var.q_url_params[0]);
	g_var.q_url_json = new YdUrlJson().TransStringToJson(t_string);

	
	$('#search_btn').click(function(){
		// 关键词、发明人、申请人
		var t_input = $('#search_input').val();
		if (t_input == ''){
			alert('请输入搜索词！');
			exit();
		}

		tf_search(t_input);

	});/*click function*/
});

function tf_search(p_input) {
	
	var p_url = g_var.g_server_patent_data + 'Search/api_patent_search';

	var p_data = g_var.q_url_json;
	p_data['keyword'] = p_input;
	p_data['user_id'] = g_var.u_eng_name;
		// t_applicant: p_input,
		// t_inventor: p_input,
		// t_type: t_type,
		// t_legalstate: t_legalstate,
		// t_legalvalid: t_legalvalid,

	p_callback = function(data, status){
		$('#show_search_result').removeClass('invisible');
		t_data = JSON.parse(data);
		g_var.q_searchresult = gf_show_search_result(t_data);
	}
	$.post(p_url, p_data, p_callback);
}
