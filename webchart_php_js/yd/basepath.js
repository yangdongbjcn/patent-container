var t_url = location.href.split('yd');

var g_var = {}; 
g_var.g_yd_father = t_url[0];

g_var.g_yd = g_var.g_yd_father + 'yd/';

g_var.g_yd_common = g_var.g_yd + 'common/';
g_var.g_yd__resources = g_var.g_yd_common + 'resources/';
g_var.g_yd__echarts_map = g_var.g_yd__resources + 'echarts_map/';
g_var.g_yd__world = g_var.g_yd__echarts_map;
g_var.g_yd__china = g_var.g_yd__world + 'china/';

g_var.g_server = g_var.g_yd_father + 'server/';
g_var.g_server_text = g_var.g_server + 'container/index.php/text/';
g_var.g_server_chart = g_var.g_server + 'container/index.php/chart/';

// g_var.g_data = g_var.g_yd_father + 'data/';
// g_var.g_data_text = g_var.g_data + 'dxb/index.php/text/';