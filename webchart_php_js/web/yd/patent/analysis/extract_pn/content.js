$(document).ready(function(){

	var str='序号  FRQ     TREM                            \n\
	1     1       CN106275061                     \n\
	2     1       CN106275061B                    \n\
	3     1       CN106347449                     \n\
	4     1       CN106347449B';

	$('#search_text').val(str);
	$('#col_key').val('CN');

	$('#result_text').val('');

	$('#submit2').click(function(){
		var p_url = g_var.g_server_text + '/TextLines/apiTextMatchPN';
		var p_data = {
			text: $('#search_text').val()
		};
		p_callback = function(data, status){
			// var t_data = JSON.parse(data);
			var regReturn = new RegExp('rrrrnnnn', "g");
			t_data = data.replace(regReturn,"\r\n" );
			$('#result_text2').val(t_data);
			// alert(data);
		};
		$.post(p_url, p_data, p_callback);
	});/*click function*/
		
});
