<?php
include('../../basepath.php');
include('../../info/includes/begin.php');
include('../../info/includes/menu_top.php');
// include('../../info/includes/menu_left.php');
?>

<link href='hai/content.css' rel='stylesheet'>

<script src='<?php echo $g_yd__resources ?>echarts_map/china.js'></script>
<script src='<?php echo $g_yd__resources ?>echarts_map/world.js'></script>

<?php
include('hai_data.php');
?> 

<script src='hai/content.js'></script>

<?php
include('hai/content.php');
?> 

<?php
// include('../../info/includes/menu_right.php');
include('../../info/includes/footer.php');
include('../../info/includes/end.php');
?>		
