$(window).load(function(){ 
	g_var.q_url_params = yd_url_get_params('patent_view.php');

	var t_string = yd_url_decode(g_var.q_url_params[0]);
	g_var.q_url_json = new YdUrlJson().TransStringToJson(t_string);
	g_var.q_url_json['user_id'] = g_var.u_eng_name;

	var t_json = g_var.q_url_json;
	
	var l_length = 5000;
	var l_begin = 1;
	var l_end = l_begin + l_length - 1;
	$('#pagi_cur').text(l_begin + ' - ' + l_end);
	tf_node_search(t_json, l_begin, l_end);

	$('#pagi_pre').click(function(){
		l_begin = tf_get_pre_num(l_begin, l_length);
		l_end = l_begin + l_length - 1;
		$('#pagi_cur').text(l_begin + ' - ' + l_end);
		tf_node_search(t_json, l_begin, l_end);
	});/*click function*/

	$('#pagi_post').click(function(){
		l_begin = tf_get_post_num(l_begin, l_length);
		l_end = l_begin + l_length - 1;
		$('#pagi_cur').text(l_begin + ' - ' + l_end);
		tf_node_search(t_json, l_begin, l_end);
	});/*click function*/
});

function tf_node_search(p_json, p_begin, p_end){
	var p_url = g_var.g_server_patent_data + 'Search/api_patent_search';
	p_url = p_url + '/' + p_begin + '/' + p_end;

	var p_data = p_json;

	p_callback = function(data, status){
        $('#show_search_result').removeClass('invisible');
        gf_show_search_result(JSON.parse(data));
    }
    
	$.post(p_url, p_data, p_callback);
}

function tf_get_pre_num(p_begin, p_length) {
	var new_begin = p_begin - p_length;
	if (new_begin < 0) {
		new_begin = 1;
	}
	return new_begin;
}

function tf_get_post_num(p_begin, p_length) {
	var new_begin = p_begin + p_length;
	return new_begin;
}