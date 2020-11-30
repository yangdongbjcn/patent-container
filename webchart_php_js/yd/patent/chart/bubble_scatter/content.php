<div class='row'>	
	<div class='col-sm-3'>数据名
	</div> <!-- end col-md -->

	<div class='col-sm-3'>X分量
		<?php
		include('param_x.php');
		?>
	</div> <!-- end col-md -->

	<div class='col-sm-3'>Y分量
		<?php
		include('param_y.php');
		?>
	</div> <!-- end col-md -->

	<div class='col-sm-3'>气泡大小
	</div> <!-- end col-md -->
</div> <!-- end row -->

<div class='row ydbj_layout_margin_top_s'>	
	<div class='col-sm-3'>
		<textarea id='col00' class='form-control' rows='25'></textarea>
	</div> <!-- end col-md -->

	<div class='col-sm-3'>
		<textarea id='col01' class='form-control' rows='25'></textarea>
	</div> <!-- end col-md -->

	<div class='col-sm-3'>
		<textarea id='col02' class='form-control' rows='25'></textarea>
	</div> <!-- end col-md -->

	<div class='col-sm-3'>
		<textarea id='col03' class='form-control' rows='25'></textarea>
	</div> <!-- end col-md -->
</div> <!-- end row -->

<div class='row ydbj_layout_margin_top_s'>

	<div class='col-sm-6'>
		<?php
		include('param_color.php');
		?>
	</div> <!-- end col-md -->

	<div class='col-sm-6'>
		<?php
		include('param_bg.php');
		?>
	</div> <!-- end col-md -->

</div> <!-- end row -->

<div class='row'>

	<div class='col-sm-6'>
		<?php
		include('param_size.php');
		?>
	</div> <!-- end col-md -->

	<div class='col-sm-6'>
		<?php
		include('param_font.php');
		?>
	</div> <!-- end col-md -->

</div> <!-- end row -->

<div class='row'>	 
	<a class='btn btn-success ydbj_layout_center ydbj_layout_width_xs' id='chart_button'>
		气泡散点图
	</a>
</div> <!-- end row -->

<div class='row'>
	<div id='chart_div'>
	</div>
</div> <!-- end row -->