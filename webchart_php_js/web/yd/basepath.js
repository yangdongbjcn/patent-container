var t_url = location.href.split('yd');

var g_var = {}; 
g_var.g_yd_father = t_url[0];

g_var.g_yd = g_var.g_yd_father + 'yd/';

g_var.g_yd_common = g_var.g_yd + 'info/';
g_var.g_yd__resources = g_var.g_yd_common + 'resources/';
g_var.g_yd__echarts_map = g_var.g_yd__resources + 'echarts_map/';
g_var.g_yd_echarts_world = g_var.g_yd__echarts_map;
g_var.g_yd_echarts_china = g_var.g_yd_echarts_world + 'china/';


g_var.g_yd_study = g_var.g_yd + 'study/';
g_var.g_yd__hybrid_ai = g_var.g_yd_study + 'hybrid_ai/';

g_var.g_yd_patent = g_var.g_yd + 'patent/';
g_var.g_yd_patent_data = g_var.g_yd_patent + 'container/';


t_url = location.href.split('web');
g_var.g_web_father = t_url[0];

g_var.g_server = g_var.g_web_father + 'server/';
g_var.g_server_text = g_var.g_server + 'yangdong_ci/index.php/text/';
g_var.g_server_chart = g_var.g_server + 'yangdong_ci/index.php/chart/';
g_var.g_server_yd_class = g_var.g_server + 'yangdong_ci/index.php/yd_class/Yd_Class_Ctrl/';

g_var.g_server_patent_data = g_var.g_server + 'yangdong_ci/index.php/patent/';

g_var.g_data_training = g_var.g_server + 'yangdong_ci/index.php/training/';