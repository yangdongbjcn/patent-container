$(document).ready(function(){

	var str='\
最早优先权年	\n\
2018	\n\
2002	\n\
2001	\n\
2003	\n\
1990	\n\
2000	\n\
2008	\n\
2003	\n\
2013	\n\
2017	\n\
2019	\n\
2018	\n\
2014	\n\
2011	\n\
2001	\n\
1998	\n\
2001	\n\
2009	\n\
2008	\n\
2002	\n\
2018	\n\
2013	\n\
1994	\n\
1994	\n\
2012	\n\
2018	\n\
2010	\n\
2009	\n\
2008	\n\
2010	\n\
2011	\n\
1992	\n\
2008	\n\
2019	\n\
2015	\n\
2009	\n\
2006	\n\
2013	\n\
2014	\n\
1987	\n\
2004	\n\
2017	\n\
2002	\n\
1990	\n\
1998	\n\
1996	\n\
1983	\n\
1988	\n\
1982	\n\
2016	\n\
';

	$('#search_text').val(str);

	$('#result_text').val('');
	$('#submit').click(function(){
		var p_url = g_var.g_server_text + 'TextLines/apiGetYearHist';
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



