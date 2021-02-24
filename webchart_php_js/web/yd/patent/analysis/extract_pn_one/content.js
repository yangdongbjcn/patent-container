$(document).ready(function(){

	var str='序号  FRQ     TREM                            \n\
	1     1       CN106275061                     \n\
	2     1       CN106275061B                    \n\
	3     1       CN106347449                     \n\
	4     1       CN106347449B';

	$('#input_text').val(str);
	$('#input_keys').val('CN');
	$('#result_text').val('');

	$('#submit').click(function(){
		var p_url = g_var.gs_yd_text + '/TextLines/apiTextMatchPnOne';
		var p_data = {
			text: $('#input_text').val(),
			key: $('#input_keys').val()
		};
		p_callback = function(data, status){
			var regReturn = new RegExp('rrrrnnnn', "g");
			t_data = data.replace(regReturn,"\r\n" );
			$('#result_text').val(t_data);
		};
		$.post(p_url, p_data, p_callback);
	});/*click function*/
});