var t_url = location.href.split('web/yd');

var g_var = {}; 

g_var.g_web_father = t_url[0];

g_var.g_yd_father = g_var.g_web_father + 'web/';

g_var.g_yd = g_var.g_yd_father + 'yd/';

g_var.g_yd_common = g_var.g_yd + 'info/';
g_var.g_yd__resources = g_var.g_yd_common + 'resources/';
g_var.g_yd__echarts_map = g_var.g_yd__resources + 'echarts_map/';
g_var.g_yd_echarts_world = g_var.g_yd__echarts_map;
g_var.g_yd_echarts_china = g_var.g_yd_echarts_world + 'china/';


g_var.g_yd_study = g_var.g_yd + 'science/';
g_var.g_yd__hybrid_ai = g_var.g_yd_study + 'hybrid_ai/';

g_var.g_yd_patent = g_var.g_yd + 'patent/';
g_var.g_yd_patent_data = g_var.g_yd_patent + 'container/';


g_var.g_server = g_var.g_web_father + 'server/';
g_var.g_server_text = g_var.g_server + 'yangdong_ci/index.php/yd/text/';
g_var.g_server_chart = g_var.g_server + 'yangdong_ci/index.php/yd/chart/';

g_var.g_server_patent_data = g_var.g_server + 'yangdong_ci/index.php/yd/patent/';

g_var.g_data_training = g_var.g_server + 'yangdong_ci/index.php/training/';