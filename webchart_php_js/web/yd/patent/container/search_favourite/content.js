$(window).load(function(){
	gf_cookie_login();

	new YdMenuActive().initMenu("search_favourite");

	tf_datatables();
	
	$("#a_table_refresh").click( function() {
		tf_datatables();
	} );

	// 取消收藏
    $('#div_table tbody').on('click', 'td.class_table_ops_delete', function () {
        p_url = g_var.g_server_patent_data + 'Search/api_del_favourite';

		p_data = {
			id: g_var.u_eng_name, 
			pub_num: this.parentNode.children[0].textContent
		};

		p_callback = function(data, status){
			var t_data = JSON.parse(data);
			alert(t_data.message);
			tf_datatables();
		}

		$.post(p_url, p_data, p_callback);
    } );
});

function tf_datatables() {
	var p_url = g_var.g_server_patent_data + 'Search/api_get_favourite';

	var p_data = {
		id: g_var.u_eng_name
	};

    var l_data;

	var p_callback = function(data, status){
        l_data = JSON.parse(data);
    };
    $.ajax({
        async: false,
        type: "post",
        url: p_url,
        data: p_data,
        datatype: 'json',
        success: p_callback,
    });

    $('#div_table').DataTable({
        destroy: true,
        data: l_data,
        columns: [
        {
            "data": "t_pub_num"
        },{
        	"data": null,
            "defaultContent": '删',
            "class": 'class_table_ops_delete',
            "orderable": false
        }]
	    , "columnDefs": [
	    {
    		"render": function(data, type, row, meta) {
                var file_name = 'CN201127036Y';
                var file_url = g_var.g_yd__resources + 'file/download/' + row.t_pub_num + '.pdf';
                return '<a href="' + file_url + '" target="_blank">' + row.t_pub_num + '</a>';
        	},
        	"targets": 0
        }]
        ,pageLength: 100
		,searching: false
		,paging: false
    });
}
