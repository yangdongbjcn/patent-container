<?php

	$t_url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	
	$g_yd = getParent($t_url, 'yd') . '/';

	$g_yd_common = $g_yd . 'info/';
	$g_yd__resources = $g_yd_common . 'resources/';
	$g_yd__includes = $g_yd_common . 'includes/';
	$g_library = $g_yd_common . 'yd_container/';
	$g_yd__jsondb = $g_yd_common . 'yd_data/';

	$g_yd_patent = $g_yd . 'patent/';
	$g_yd__analysis = $g_yd_patent . 'analysis/';
	$g_yd__chart = $g_yd_patent . 'chart/';
	$g_yd_patent_data = $g_yd_patent  . 'container/';
	
	$g_yd_world = $g_yd . 'world/';

	$g_yd_about = $g_yd . 'about/';
	$g_yd__yangdong = $g_yd_about . 'yangdong/';
	$g_yd__pc = $g_yd_about . 'patentcontainer/';
	$g_yd__zlrq = $g_yd_about . 'zlrq/';

	$g_yd__way = $g_yd . 'way/';
	$g_yd__speak = $g_yd__way . 'speak/';
	$g_yd__mind = $g_yd . 'mind/';

	$g_yd_study = $g_yd . 'science/';
	$g_yd__hybrid_ai = $g_yd_study . 'hybrid_ai/';

	$g_yd_think = $g_yd . 'think/';
	$g_yd__class = $g_yd_think . 'class/';
	
	function getParent($t_url, $t_key) {
		while(basename($t_url) != $t_key) {
		  $t_url = dirname($t_url);
		}
		return $t_url;
	}

	$g_rela_yd2_2_chart = '../../../' . 'patent/chart/';
?>