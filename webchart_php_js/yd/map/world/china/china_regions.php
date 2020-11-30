<?php
	include('../../../basepath.php');	 
	include('../../../common/includes/begin.php');
	include('../../../common/includes/menu_top.php');
	include('../../../common/includes/menu_left.php'); 
?>
	<script src='<?php echo $g_yd__resources ?>echarts_map/china.js'></script>
	
	<link rel='stylesheet' href='china_regions/content.css'>
	<script type='text/javascript' src='china_regions/content.js'></script>
<?php
	include('china_regions/content.php');
	include('../../../common/includes/menu_right.php');
	include('../../../common/includes/footer.php'); 
	include('../../../common/includes/end.php');
?>
