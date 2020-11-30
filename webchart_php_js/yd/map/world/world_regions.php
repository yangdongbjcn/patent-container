<?php
	include('before.php');
?>
	<script src='<?php echo $g_yd__resources ?>echarts_map/world.js'></script>
	
	<link rel='stylesheet' href='world_regions/content.css'>
	<script type='text/javascript' src='world_regions/content.js'></script>
<?php
	include('world_regions/content.php');
?>
<?php 
	include('after.php');
?>