var t_url = location.href.split('web/');

var g_var = {}; 

g_var.g_web_father = t_url[0];

g_var.g_web = g_var.g_web_father + 'web/';

g_var.g_yd = g_var.g_web + 'yd/';


g_var.g_yd_info = g_var.g_yd + 'info/';

g_var.g_yd__resources = g_var.g_yd_info + 'resources/';
g_var.g_yd__echarts_map = g_var.g_yd__resources + 'echarts_map/';
g_var.g_yd__echarts_world = g_var.g_yd__echarts_map;
g_var.g_yd__echarts_china = g_var.g_yd__echarts_world + 'china/';

g_var.g_yd__pages = g_var.g_yd_info + 'pages/';


g_var.g_yd_patent = g_var.g_yd + 'patent/';
g_var.g_yd__analysis = g_var.g_yd_patent + 'analysis/';
g_var.g_yd__database = g_var.g_yd_patent + 'database/';


g_var.g_yd_science = g_var.g_yd + 'science/';
g_var.g_yd__hybrid_ai = g_var.g_yd_science + 'hybrid_ai/';

g_var.g_dxb = g_var.g_web + 'dxb/'; 

g_var.g_dxb_info = g_var.g_dxb + 'info/';
g_var.g_dxb_training = g_var.g_dxb + 'training/';
g_var.g_dxb_daily = g_var.g_dxb + 'daily/';
g_var.g_dxb_dj = g_var.g_dxb + 'dj/';


g_var.gs_server = g_var.g_web_father + 'server/yangdong_ci/index.php/';

g_var.gs_yd = g_var.gs_server + 'yd/';
g_var.gs_yd_text = g_var.gs_yd + 'text/';
g_var.gs_yd_chart = g_var.gs_yd + 'chart/';
g_var.gs_yd_patent = g_var.gs_yd + 'patent/';

g_var.gs_dxb = g_var.gs_server + 'dxb/training/';

g_var.gs_dxb_dj = 'http://10.77.59.161:8080/pecc/exam/';

g_var.g_bjzx = g_var.g_web + 'bjzx/';
g_var.g_bjzx_dj = g_var.g_bjzx + 'dj/';

g_var.gs_bjzx = g_var.gs_server + 'bjzx/';