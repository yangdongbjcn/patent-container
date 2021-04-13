<?php

	$t_url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	
	$g_web = getParent($t_url, 'web') . '/';
	$g_yd = $g_web . 'yd/';

	$g_yd_about = $g_yd . 'about/';
	$g_yd__yangdong = $g_yd_about . 'yangdong/';

	
	$g_yd_info = $g_yd . 'info/';
	$g_yd__includes = $g_yd_info . 'includes/';
	$g_yd__pages = $g_yd_info . 'pages/';
	$g_yd__resources = $g_yd_info . 'resources/';
	$g_yd__container = $g_yd_info . 'yd_container/';
	$g_yd__data = $g_yd_info . 'yd_data/';

	
	$g_yd_patent = $g_yd . 'patent/';
	$g_yd__analysis = $g_yd_patent . 'analysis/';
	$g_yd__chart = $g_yd_patent . 'chart/';
	$g_yd__database = $g_yd_patent  . 'database/';

	
	$g_yd_science = $g_yd . 'science/';
	$g_yd__hybrid_ai = $g_yd_science . 'hybrid_ai/';

	
	$g_yd_think = $g_yd . 'think/';
	$g_yd__way = $g_yd_think . 'way/';
	$g_yd__mind = $g_yd_think . 'mind/';

	
	$g_yd_world = $g_yd . 'world/';
	$g_yd__map = $g_yd_world . 'map/';


	$g_bjzx = $g_web . 'bjzx/';
	$g_bjzx_dj = $g_bjzx . 'dj/';


	$g_dxb = $g_web . 'dxb/';
	$g_dxb_info = $g_dxb . 'info/';
	$g_dxb_training = $g_dxb . 'training/';
	$g_dxb_daily = $g_dxb . 'daily/';
	$g_dxb_dj = $g_dxb . 'dj/';

	
	function getParent($t_url, $t_key) {
		while(basename($t_url) != $t_key) {
		  $t_url = dirname($t_url);
		}
		return $t_url;
	}

	$g_rela_yd2_2_chart = '../../../' . 'patent/chart/';
?>