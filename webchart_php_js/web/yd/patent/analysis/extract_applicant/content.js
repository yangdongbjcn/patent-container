$(document).ready(function(){

	var str='\
序号  FRQ     TREM                            	\n\
1     8       HARMAN INT IND                  	\n\
2     17      哈曼国际工业有限公司            	\n\
3     9       (HRMN  ) HARMAN INT IND INC     	\n\
4     117     GM GLOBAL TECH OPERATIONS LLC   	\n\
5     326     通用汽车环球科技运作有限责任    	\n\
              公司                            	\n\
6     99      (GENK  ) GM GLOBAL              	\n\
              TECHNOLOGIES OPERATIONS INC     	\n\
7     191     (GENK  ) GM GLOBAL              	\n\
              TECHNOLOGY OPERATIONS INC       	\n\
8     117     GM GLOBAL TECHNOLOGY            	\n\
              OPERATIONS LLC                  	\n\
9     1       UNIV JIANGNAN                   	\n\
10    2       江南大学                        	\n\
11    1       (UYJN  ) UNIV JIANGNAN          	\n\
12    1       JIANGNAN UNIVERSITY             	\n\
13    4       BEIJING INST SPECIALIZED        	\n\
              MACHINERY                       	\n\
14    10      北京特种机械研究所              	\n\
15    4       (BEIJ-N) BEIJING INST           	\n\
序号  FRQ     TREM                            	\n\
              SPECILIZED MACHINERY            	\n\
16    4       BEIJING INSTITUTE OF            	\n\
              SPECIALIZED MACHINERY           	\n\
17    227     FORD GLOBAL TECH LLC            	\n\
18    275     福特全球技术公司       	\n\
';

	$('#input_text').val(str);
	$('#result_text').val('');
	$('#submit').click(function(){
		var p_url = g_var.gs_yd_text + 'TextLines/apiFormatPa';
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



