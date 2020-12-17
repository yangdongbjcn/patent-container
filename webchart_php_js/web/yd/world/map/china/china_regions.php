<?php
	include('../../../basepath.php');	 
	include('../../../info/includes/begin.php');
	include('../../../info/includes/menu_top.php');
	include('../../../info/includes/menu_left.php'); 
?>
	<script src='<?php echo $g_yd__resources ?>echarts_map/china.js'></script>
	
	<link rel='stylesheet' href='china_regions/content.css'>
	<script type='text/javascript' src='china_regions/content.js'></script>
<?php
	include('china_regions/content.php');
	include('../../../info/includes/menu_right.php');
	include('../../../info/includes/footer.php'); 
	include('../../../info/includes/end.php');
?>
