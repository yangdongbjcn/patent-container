<?php
include('before.php');
?>		


<link href='<?php echo $g_yd_patent_data ?>node_search/content.css' rel='stylesheet'>
<script src='<?php echo $g_yd_patent_data ?>node_search/content.js'></script>
<?php
	include('node_search/content.php');
?>


<div id='show_search_result' class='invisible'>
<?php
	include('search_result.php');
?>
</div>

<?php
include('menu_right_patent_set.php');
include('after.php');
?>		
