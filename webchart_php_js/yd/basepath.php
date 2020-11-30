<?php

	$t_url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	
	$g_yd = getParent($t_url, 'yd') . '/';

	$g_yd_common = $g_yd . 'common/';
	$g_yd__resources = $g_yd_common . 'resources/';
	$g_yd__includes = $g_yd_common . 'includes/';
	$g_library = $g_yd_common . 'library/';

	$g_yd_patent = $g_yd . 'patent/';
	$g_yd__analysis = $g_yd_patent . 'analysis/';
	$g_yd__chart = $g_yd_patent . 'chart/';
	
	$g_yd_map = $g_yd . 'map/';

	$g_yd_about = $g_yd . 'about/';
	$g_yd__yangdong = $g_yd_about . 'yangdong/';
	$g_yd__pc = $g_yd_about . 'patentcontainer/';
	$g_yd__zlrq = $g_yd_about . 'zlrq/';

	function getParent($t_url, $t_key) {
		while(basename($t_url) != $t_key) {
		  $t_url = dirname($t_url);
		}
		return $t_url;
	}
?>