$(document).ready(function(){

	var str='\
2002	1\n\
2003	0\n\
2004	1\n\
2005	4\n\
2006	11\n\
2007	19\n\
2008	6\n\
2009	25\n\
2010	18\n\
2011	28\n\
2012	52\n\
2013	37\n\
2014	37\n\
2015	38\n\
2016	44\n\
2017	34\n\
2018	4\n\
2019	2\n\
\n\
2002	1\n\
2003	0\n\
2004	1\n\
2005	4\n\
2006	11\n\
2007	19\n\
2008	6\n\
2009	25\n\
2010	18\n\
2011	28\n\
2012	52\n\
2013	37\n\
2014	37\n\
2015	38\n\
2016	44\n\
2017	34\n\
2018	4\n\
2019	2\n\
';

	$('#search_text').val(str);

	$('#result_text').val('');
	$('#submit').click(function(){
		var p_url = g_var.g_server_text + 'TextLines/apiAddHistogram';
		var p_data = {
			text: $('#search_text').val()
		};
		p_callback = function(data, status){
			var regReturn = new RegExp('rrrrnnnn', "g");
			t_data = data.replace(regReturn,"\r\n" );
			$('#result_text').val(t_data);
		};
		$.post(p_url, p_data, p_callback);
	});/*click function*/


});