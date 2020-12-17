g_var.u_eng_name = yd_cookie_get('u_eng_name');

function gf_cookie_login(){
    if (! g_var.u_eng_name) {
        window.location.href = g_var.g_yd_common + 'user_login.php';
    }
}