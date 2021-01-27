<?php
include('before.php');
?>		

<link href='<?php echo $g_yd_patent_data ?>node_view/content.css' rel='stylesheet'>
<script src='<?php echo $g_yd_patent_data ?>node_view/content.js'></script>
<?php
	include('node_view/content.php');
?>

<div id='show_search_result' class='invisible'>
<?php
	include('search_result.php');
?>
</div>

<?php
include('../../info/includes/menu_right.php');
include('after.php');
?>		
       
