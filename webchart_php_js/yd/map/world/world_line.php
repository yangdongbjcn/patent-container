<?php
	include('before.php');
?>
	<script src='<?php echo $g_yd__resources ?>echarts_map/world.js'></script>
	
	<link rel='stylesheet' href='world_line/content.css'>
	<script type='text/javascript' src='world_line/destData.js'></script>
	<script type='text/javascript' src='world_line/content.js'></script>
<?php
	include('world_line/content.php');
?>
<?php 
	include('after.php');
?>