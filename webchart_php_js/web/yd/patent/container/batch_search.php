<?php
include('before.php');
?>		


<link href='batch_search/content.css' rel='stylesheet'>
<script src='batch_search/content.js'></script>
<?php
	include('batch_search/content.php');
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
