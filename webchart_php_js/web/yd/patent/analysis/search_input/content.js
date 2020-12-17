$(document).ready(function(){

	$('#search_text').val('((脑机 or 脑控 or 脑信号 or 脑电信号 or 脑皮层信号 or 脑皮层电信号) and (接口 or 协作) and (学习 or 知识 or 决策 or 演化 or 演进 or 混合 or 共生)) not (电脑控制 or 电脑信号)');

	$('#result_text').val('');
	$('#submit').click(function(){
		var p_url = g_var.g_server_text + '/SearchInput/apiFormatSearchInput';
		var p_data = {
			text: $('#search_text').val()
		};
		p_callback = function(data, status){
			// var t_data = JSON.parse(data);
			var regReturn = new RegExp('rrrrnnnn', "g");
			data = data.replace(regReturn,"\r\n" );
			$('#result_text').val(data);
			// alert(data);
		};
		$.post(p_url, p_data, p_callback);
	});/*click function*/
		
});
