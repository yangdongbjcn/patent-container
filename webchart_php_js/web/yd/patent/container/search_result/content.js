
function gf_show_search_result(t_data) {

 	var control_id = "search_result_table";
    var column_dict = {
    	't_appli_date': '申请日',
		't_appli_num': '申请号',
		't_pub_date': '公开日',
		't_pub_num': '公开号',
		't_title': '标题',
		't_applicant_std': '标准化申请人',
		't_inventor': '发明人',
		't_ipc': '分类',
        "caozuo1": "操作"
    };

    var column_defs = [];
    var tf_render_function = function(data, type, row, meta) {
		                var file_name = data;//'CN201127036Y';
		                var file_url = g_var.g_yd__resources + 'file/download/' + file_name + '.pdf';
		                return '<a href="' + file_url + '" target="_blank">' + data + '</a>';
		            };
	column_defs = new YdColumnDefs().init().addColumnDef(3, 'render', tf_render_function).get();

    var complex_column = {
    	"t_title": {'class': 't_title_class'},
    	"t_pub_num": {'class': 't_pub_num_class'},
    	"t_applicant_std": {'class': 't_applicant_std_class'},
    	"caozuo1":{
	                "class":          't_favorites_class',
	                "orderable":      false,
	                "defaultContent": '收藏'
	            }
    };

    var t_dt = new YdDataTables();
    var option = t_dt.buildOption(t_data, column_dict, column_defs, complex_column);
    t_dt.showTable(option, control_id, column_dict);


    // 点击展开摘要和权利要求
    $('#search_result_table tbody').on('click', 'td.t_title_class', function () {
        //alert("x");
        var t_tr = $(this).closest('tr');
        var t_row = g_var.q_searchresult.row( t_tr );
        if ( t_row.child.isShown() ) {
            // This row is already open - close it
            t_row.child.hide();
            t_tr.removeClass('shown');
        }
        else {
            // Open this row
            var t_row_data = t_row.data();
            var t_row_html = dt_format( t_row_data );
            t_row.child( t_row_html ).show();
            t_tr.addClass('shown');
        }
    } );

    // 点击展开标准化申请人
    $('#search_result_table tbody').on('click', 'td.t_applicant_std_class', function () {
        var t_json = g_var.q_url_json;
        t_json['t_applicant_std'] = this.parentNode.children[5].textContent;

        var t_string = new YdUrlJson().TransJsonToString(t_json);
		var p_url = g_var.g_yd_patent_data + 'patent_view.php/' + t_string;
        window.location.href = p_url;
    } );

    // 点击收藏
    $('#search_result_table tbody').on('click', 'td.t_favorites_class', function () {
        p_url = g_var.g_server_patent_data + 'Search/api_add_favourite';

		p_data = {
			id: g_var.u_eng_name, 
			pub_num: this.parentNode.children[3].textContent
		};

		p_callback = function(data, status){
			alert(data.message);
		}

		$.ajax({
			url: p_url,
			async: false,
			type: 'POST',
			data: p_data,
			success: p_callback,
			dataType: 'json'
		});
    } );

    return g_var.q_searchresult;
}

function dt_format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="7" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr class="abstract-control">'+
            '<td>摘要：</td>'+
            '<td>'+d.t_abstract+'</td>'+
        '</tr>'+
        '<tr class="claim1-control">'+
            '<td>权利要求1：</td>'+
            '<td>'+d.t_first_claim+'</td>'+
        '</tr>'+
    '</table>';
}