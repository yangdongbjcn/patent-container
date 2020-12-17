$(document).ready(function(){

	var str4='\
year	sales	production\n\
2013	22442	34851\n\
2014	31655	35000\n\
2015	50658	51095\n\
2016	76297	83922\n\
2017	103181	101027\n\
2018	245162	254530\n\
2019	367200	365194';

	$('#search_text3').val(str4);
	$('#result_text3').val('');
	$('#submit3').click(function(){
		var p_url = g_var.g_server_text + 'TextLines/apiTextMatToJson';
		var p_data = {
			text: $('#search_text3').val()
		};
		p_callback = function(data, status){
			// var t_data = JSON.parse(data);
			var regReturn = new RegExp('rrrrnnnn', "g");
			t_data = data.replace(regReturn,"\r\n" );
			$('#result_text3').val(t_data);
			// alert(data);
		};
		$.post(p_url, p_data, p_callback);
	});/*click function*/
});



