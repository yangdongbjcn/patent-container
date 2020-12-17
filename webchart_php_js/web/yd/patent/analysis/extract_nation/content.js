$(document).ready(function(){

	var str='序号  FRQ     TREM                           \n\
1     12062   US                             \n\
2     14804   CN                             \n\
3     2534    KR                             \n\
4     5661    WO                             \n\
5     723     AU                             \n\
6     768     CA                             \n\
7     6741    DE                             \n\
8     4597    EP                             \n\
9     8857    JP                             \n\
10    116     SG                             \n\
11    512     BR                             \n\
12    462     MX                             \n\
13    533     IN                             \n\
14    658     FR                             \n\
15    847     GB                             \n\
16    594     RU                             \n\
17    328     ES                             \n\
18    46      FI                             \n\
19    42      NO                             \n\
20    268     SE                             \n\
序号  FRQ     TREM                           \n\
21    12      DK                             \n\
22    4       SK                             \n\
23    95      ZA                             \n\
24    39      NL                             \n\
25    129     IT                             \n\
26    17      BE                             \n\
27    6       PT                             \n\
28    14      HU                             \n\
29    10      CZ                             \n\
30    277     TW                             \n\
31    13      NZ                             \n\
32    72      HK                             \n\
33    8       TH                             \n\
34    40      IL                             \n\
35    39      ID                             \n\
36    8       PL                             \n\
37    28      AT                             \n\
38    37      SU                             \n\
39    25      CH                             \n\
40    3       RO                             \n\
序号  FRQ     TREM                           \n\
41    6       KZ                             \n\
42    6       EA                             \n\
43    8       TR                             \n\
44    4       AR                             \n\
45    8       MY                             \n\
46    1       GC                             \n\
47    17      VN                             \n\
48    16      PH                             \n\
49    12      DD                             \n\
50    1       MD                             \n\
51    3       RD                             \n\
52    1       LU                             \n\
53    1       IE ';

	$('#search_text3').val(str);
	$('#result_text3').val('');
	$('#submit3').click(function(){
		var p_url = g_var.g_server_text + 'TextLines/apiTextMatchNumNation';
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



