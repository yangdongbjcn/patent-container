$(document).ready(function(){
	gf_cookie_login();

	new YdMenuActive().initMenu("search_brief");

	g_var.q_url_params = yd_url_get_params('search_brief.php');
	var t_history_id = g_var.q_url_params[0];

    var p_url = g_var.g_server_patent_data + 'Search/api_load_search';
	p_data = {'h_id': t_history_id};	//2018-6-6 cpy id=2

	p_callback = function(data, status){
		// alert('Data: ' + data + ', status: ' + status);
		var t_data = JSON.parse(data);

		var t_col, t_hist;

		t_col = new Yd_frame().initDicts(t_data).getClist('t_pub_num').get();
		t_hist = yd_patent_hist_type(t_col);
		var t_option = new YdOption().initFrameBar(Object.keys(t_hist), [''], [Object.values(t_hist)], 'bar', true).title('专利类型').get();
		new YdChart().init('analysis_patent_type').option(t_option).get();
		
		t_col = new Yd_frame().initDicts(t_data).getClist('t_appli_date').get();
		t_hist = yd_patent_hist_year(t_col);
		var t_option = new YdOption().initFrameBar(Object.keys(t_hist), [''], [Object.values(t_hist)], 'line', true).title('申请年度趋势').get();
		new YdChart().init('analysis_patent_year').option(t_option).get();

		t_col = new Yd_frame().initDicts(t_data).getClist('t_pub_num').get();
		t_hist = yd_patent_hist_region(t_col);
		var t_option = new YdOption().initFrameBar(Object.keys(t_hist), [''], [Object.values(t_hist)], 'bar', true).title('区域布局').get();
		new YdChart().init('analysis_patent_region').option(t_option).get();

		t_col = new Yd_frame().initDicts(t_data).getClist('t_legal_valid').get();
		t_hist = yd_patent_hist_law(t_col);
		var t_option = new YdOption().initFrameBar(Object.keys(t_hist), [''], [Object.values(t_hist)], 'bar', true).title('专利状态').get();
		new YdChart().init('analysis_patent_status').option(t_option).get();
		
	 	t_col = new Yd_frame().initDicts(t_data).getClist('t_applicant_std').get();
		t_hist = yd_patent_hist_first_applicant(t_col, 5);
		var t_option = new YdOption().initFrameBar(Object.keys(t_hist), [''], [Object.values(t_hist)], 'bar', false).title('申请人').get();
		new YdChart().init('analysis_patent_applicant').option(t_option).get();
		
		t_col = new Yd_frame().initDicts(t_data).getClist('t_inventor').get();
		t_hist = yd_patent_hist_first_applicant(t_col, 5);
		var t_option = new YdOption().initFrameBar(Object.keys(t_hist), [''], [Object.values(t_hist)], 'bar', false).title('发明人').get();
		new YdChart().init('analysis_patent_inventor').option(t_option).get();
	
	}
	$.post(p_url, p_data, p_callback);

});
