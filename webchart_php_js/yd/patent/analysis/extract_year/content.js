$(document).ready(function(){

	var str2 = '\
序号  ALPHA   TREM                            \n\
1     2       1968                            \n\
2     4       1969                            \n\
3     2       1970                            \n\
4     4       1971                            \n\
5     6       1972                            \n\
6     3       1973                            \n\
7     12      1974                            \n\
8     16      1975                            \n\
9     5       1976                            \n\
10    9       1977                            \n\
11    11      1978                            \n\
12    12      1979                            \n\
13    19      1980                            \n\
14    7       1981                            \n\
15    9       1982                            \n\
16    7       1983                            \n\
17    11      1984                            \n\
18    9       1985                            \n\
19    10      1986                            \n\
20    13      1987                            \n\
序号  ALPHA   TREM                            \n\
21    14      1988                            \n\
22    15      1989                            \n\
23    15      1990                            \n\
24    10      1991                            \n\
25    21      1992                            \n\
26    12      1993                            \n\
27    8       1994                            \n\
28    21      1995                            \n\
29    13      1996                            \n\
30    26      1997                            \n\
31    23      1998                            \n\
32    57      1999                            \n\
33    45      2000                            \n\
34    19      2001                            \n\
35    60      2002                            \n\
36    81      2003                            \n\
37    110     2004                            \n\
38    151     2005                            \n\
39    138     2006                            \n\
40    149     2007                            \n\
序号  ALPHA   TREM                            \n\
41    152     2008                            \n\
42    251     2009                            \n\
43    279     2010                            \n\
44    352     2011                            \n\
45    311     2012                            \n\
46    306     2013                            \n\
47    250     2014                            \n\
48    303     2015                            \n\
49    293     2016                            \n\
50    330     2017                            \n\
51    13      2018 \n\
	';

	$('#search_text2').val(str2);

	$('#result_text2').val('');
	$('#submit2').click(function(){
		var p_url = g_var.g_server_text + 'TextLines/apiFormatYearHist';
		var p_data = {
			text: $('#search_text2').val()
		};
		p_callback = function(data, status){
			var regReturn = new RegExp('rrnn', "g");
			t_data = data.replace(regReturn,"\r\n" );
			$('#result_text2').val(t_data);
		};
		$.post(p_url, p_data, p_callback);
	});/*click function*/
		
});



