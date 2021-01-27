$(window).load(function(){
	new YdMenuActive().initMenu("batch_search");

	$("#batch_search_input").val('CN110580413\n\
CN110532343A\n\
CN110517045A');


	$('#batch_search_button').addClass('animated infinite pulse');
    $('#batch_search_button').mousedown(function(){
        $('#batch_search_button').removeClass('animated infinite pulse');
    });

	$("#batch_search_button").click(function(){
		p_url = g_var.g_server_patent_data + 'Search/api_batch_search';
		p_begin = 1;
		p_end = 100;
		p_url = p_url + '/' + p_begin + '/' + p_end;

		var t_input = $("#batch_search_input").val();
		if (t_input == ""){
			alert("请输入公开号")
			exit();
		}

		t_input = new YdText().init(t_input).replaceEnter(',').replace(/\s/, "").replace(",,", ",").tailRemove(',').get();

		p_data = {
			pub_nums: t_input
		};

		p_callback = function(data, status){
			t_data = JSON.parse(data);
			g_var.q_searchresult = gf_show_search_result(t_data);
			$('#show_search_result').removeClass('invisible');
		}
		$.post(p_url, p_data, p_callback);

	});/*click function*/
});
