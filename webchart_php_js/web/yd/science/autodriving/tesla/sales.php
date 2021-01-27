<?php 
	include('before.php');
?>

	<script type="text/javascript" src="<?php echo $g_yd__jsondb ?>autodriving/tesla/sales.js"></script>
	<script type="text/javascript" src="<?php echo $g_yd__jsondb ?>autodriving/tesla/sales_season.js"></script>


	<link rel="stylesheet" href="sales/content.css">
	<script type="text/javascript" src="sales/content.js"></script>
<?php
	include("sales/content.php");
?>



	<link rel='stylesheet' href='<?php echo $g_yd__chart ?>bar_chart/comp.css'>
	<script type='text/javascript' src='<?php echo $g_yd__chart ?>bar_chart/comp.js'></script>
<?php
	include($g_rela_yd2_2_chart . 'bar_chart/comp.php');
?>



<?php 
	include('after.php');
?>