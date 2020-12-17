function comp_bar_chart(p_clists, p_names, p_keys, t_size, t_font) {
	var control_id = 'chart_div';

	var t_option = new YdOption().initFrameBar(p_names, p_keys, p_clists, 'bar', true).get();
    var t_chart = new YdChart().init(control_id).option(t_option);
}