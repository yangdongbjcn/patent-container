$(window).load(function(){
	gf_cookie_login();

	new YdMenuActive().initMenu("patent_search");

	$('#search_btn').click(function(){
		var t_input = $('#search_input').val();
		if (t_input == ''){
			alert('请输入搜索词！');
			exit();
		}

		g_var.q_url_json = {'path':'', 'user_id': g_var.u_eng_name, 'keyword': yd_url_encode(t_input)};

		tf_search(g_var.q_url_json);

	});/*click function*/
});

function tf_search(p_json) {
	
	var p_url = g_var.g_server_patent_data + 'Search/api_patent_search';

	var p_data = p_json;

	p_callback = function(data, status){
		$('#show_search_result').removeClass('invisible');
		t_data = JSON.parse(data);
		g_var.q_searchresult = gf_show_search_result(t_data);
	}
	$.post(p_url, p_data, p_callback);
}
