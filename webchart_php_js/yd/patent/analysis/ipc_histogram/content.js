$(document).ready(function(){

var str4='\
IPC分类号\n\
G06F16/242\n\
H04W12/02\n\
H04W24/02\n\
H04L29/08\n\
H04W36/00\n\
H04L29/12\n\
G06F3/06\n\
H04L12/26\n\
H04W64/00\n\
H04L29/06\n\
G06F17/30\n\
G06F17/30\n\
H04W24/00\n\
H04W24/02\n\
H04L29/06\n\
H04L29/08\n\
H04W4/14\n\
H04L1/00\n\
H04L12/24\n\
H04W36/00\n\
';

	$('#search_text3').val(str4);
	$('#result_text3').val('');
	$('#submit3').click(function(){
		var p_url = g_var.g_server_text + 'TextLines/apiIpcHistogram';
		var p_data = {
			text: $('#search_text3').val()
		};
		p_callback = function(data, status){
			// var t_data = JSON.parse(data);
			var regReturn = new RegExp('rrnn', "g");
			t_data = data.replace(regReturn,"\r\n" );
			$('#result_text3').val(t_data);
			// alert(data);
		};
		$.post(p_url, p_data, p_callback);
	});/*click function*/
});



