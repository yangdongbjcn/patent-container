// 20210223--登陆之后默认的跳转界面
t_url_after_login = g_var.g_yd__analysis;

$(document).ready(function(){
	$('#submit').click(function(){
		var p_url = g_var.gs_dxb + 'user/api_submit_login';
		
		var t_name = $('#u_eng_name').val();
		var t_password = $('#u_psd').val();

		var p_data = {
			u_eng_name: t_name,
			u_psd: t_password
		};

		p_callback = function(data, status){
			var user = JSON.parse(data);

			if (user['u_eng_name']){
				location.href = t_url_after_login;
			} else {
				alert('登录错误');
			}

		};
		$.post(p_url, p_data, p_callback);
	});
});
