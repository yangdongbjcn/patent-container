$(window).load(function(){
	gf_cookie_login();

	new YdMenuActive().initMenu("tree_view");

	var t_tree_nodes = f_get_tree_nodes();
	f_show_tree_nodes(t_tree_nodes);
	
});
//定义一个全局变量以便在右侧搜索时使用
var cur_navroute="";

function f_get_tree_nodes(){
	var p_url = g_var.g_server_patent_data + 'Search/api_node_names';
	var l_data;
	var p_callback = function(data, status){
        l_data = data;
    };
	$.ajax({
        async: false,
        type: "post",
        url: p_url,
        dataType: 'json',
        success: p_callback,
    });

    return l_data;
}

function f_show_tree_nodes(excel_names){
	if (excel_names.length > 0){
		// 获取到了导航树
		var json_tree = new YdTreePath().initFromNames(excel_names).get();

		var json_string = JSON.stringify(json_tree);

		var str_tree = f_gen_tree_html(json_tree.datas);

		$("#div_treelist").append($(str_tree));	

		$("#div_treelist li:has(ul)").addClass("parent_li").find("> span").attr("title", "Collapse this branch");

		$("#div_treelist li.parent_li > span").on('click', function(e) {

		    var children = $(this).parent("li.parent_li").find(" > ul > li");

		    if (children.is(":visible")) {

		        children.hide("fast");

		        $(this).attr("title", "Expand this branch").find(" > i").addClass("glyphicon-zoom-in").removeClass("glyphicon-zoom-out");

		    } else {

		        children.show("fast");

		        $(this).attr("title", "Collapse this branch").find(" > i").addClass("glyphicon-zoom-out").removeClass("glyphicon-zoom-in");

		    }

		    e.stopPropagation();

		});
	}
}


function f_gen_tree_html(datas){
	var str_begin = "<ul>";
	var str_end = "</ul>";
	
	for(var data in datas){
		//如果有子节点，递归添加子节点
		if(datas[data].datas.length>0){
			var str_leaf = "<li><span class='btn btn-default btn-transparent'><i class='glyphicon glyphicon-zoom-out'></i>" + datas[data].name + "</span>"; 
			str_leaf = str_leaf + f_gen_str_ops(datas[data].value);
			str_begin = str_begin + str_leaf + f_gen_tree_html(datas[data].datas);
		}
		//如果该节点没有子节点，则直接将该节点li以及数据传入添加到父节点中
		else{
			var str_leaf = "<li><span class='btn btn-default btn-transparent'>" + datas[data].name + "</span></span>";
			str_leaf = str_leaf + f_gen_str_ops(datas[data].value);
			str_begin = str_begin + str_leaf;
		}
	}
	return (str_begin + str_end);
}

function f_gen_str_ops(p_value) {
	var str_ops = new YdHtml().init().addSpace(1).addAClickHtml('f_click_node_view(this)', '浏览', {value: p_value})
				.addSpace(1).addAClickHtml('f_click_node_search(this)', '搜索', {value: p_value})
				.addSpace(1).addAClickHtml('f_click_node_brief(this)', '节点统计', {value: p_value})
				.addSpace(1).addAClickHtml('f_click_applicant_date(this)', '申请人年份', {value: p_value})
				.addSpace(1).addAClickHtml('f_click_applicant_region(this)', '申请人区域', {value: p_value}).get();
	return str_ops;
};


function f_click_node_view(obj){
	var t_path = $(obj).attr("value");
	t_path = yd_url_encode(t_path);
	var p_url = g_var.g_yd_patent_data + 'node_view.php/' + t_path;
	window.location.href = p_url;
}


function f_click_node_search(obj){
	var t_path = $(obj).attr("value");
	t_path = yd_url_encode(t_path);
	var t_json = {'path': t_path};
	var t_string = new YdUrlJson().TransJsonToString(t_json);
	var p_url = g_var.g_yd_patent_data + 'node_search.php/' + t_string;
	window.location.href = p_url;
}

function f_click_node_brief(obj){
	var t_path = $(obj).attr("value");
	t_path = yd_url_encode(t_path);
	var p_url = g_var.g_yd_patent_data + 'node_brief_data.php/' + t_path;
	window.location.href = p_url;
}

function f_click_applicant_date(obj){
	var t_path = $(obj).attr("value");
	t_path = yd_url_encode(t_path);
	var p_url = g_var.g_yd_patent_data + 'applicant_date.php/' + t_path;
	window.location.href = p_url;
}

function f_click_applicant_region(obj){
	var t_path = $(obj).attr("value");
	t_path = yd_url_encode(t_path);
	var p_url = g_var.g_yd_patent_data + 'applicant_region.php/' + t_path;
	window.location.href = p_url;
}