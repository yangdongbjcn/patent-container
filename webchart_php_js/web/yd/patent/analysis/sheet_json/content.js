$(document).ready(function(){

	var str='\
year	sales	production\n\
2013	22442	34851\n\
2014	31655	35000\n\
2015	50658	51095\n\
2016	76297	83922\n\
2017	103181	101027\n\
2018	245162	254530\n\
2019	367200	365194';

	$('#input_text').val(str);
	$('#result_text').val('');

	$('#submit').click(function(){
		var p_url = g_var.gs_yd_text + 'TextLines/apiTextMatToJson';
		var p_data = {
			text: $('#input_text').val()
		};
		p_callback = function(data, status){
			var regReturn = new RegExp('rrrrnnnn', "g");
			t_data = data.replace(regReturn,"\r\n" );
			$('#result_text').val(t_data);
		};
		$.post(p_url, p_data, p_callback);
	});/*click function*/
});