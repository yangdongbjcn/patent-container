$(document).ready(function(){

	var str='序号  FRQ     TREM                            \n\
	1     1       2017AA0000                     \n\
	2     1       2017AA0001                    \n\
	3     1       2017AA0002                     \n\
	4     1       2017AA0003';

	$('#input_text').val(str);
	$('#col_key').val('CN');

	$('#result_text').val('');
	
	$('#submit').click(function(){
		var p_url = g_var.gs_yd_text + '/TextLines/apiTextMatchDWPI';
		var p_data = {
			text: $('#input_text').val()
		};
		p_callback = function(data, status){
			// var t_data = JSON.parse(data);
			var regReturn = new RegExp('rrrrnnnn', "g");
			t_data = data.replace(regReturn,"\r\n" );
			$('#result_text').val(t_data);
			// alert(data);
		};
		$.post(p_url, p_data, p_callback);
	});/*click function*/
		
});

