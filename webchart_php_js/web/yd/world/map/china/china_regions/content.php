<div class='row'>
	<div class='col-sm-12'>
		<div class='well'>
	      <p>使用说明：</p>
		  <p>1. 火狐中可以右键图片，保存到本地。IE中请截屏。 </p> 
	    </div><!--/well-->
	</div>
</div>

<div class='row yd_layout_margin_top_s'>	
	<div class='col-sm-6'>省份
	</div> <!-- end col-md -->

	<div class='col-sm-6'>数值
	</div> <!-- end col-md -->
</div> <!-- end row -->

<div class='row yd_layout_margin_top_s'>
	<div class='col-sm-6'>
		<textarea id='col01' class='form-control' rows='15'></textarea>
	</div>
	<div class='col-sm-6'>
		<textarea id='col02' class='form-control' rows='15'></textarea>
	</div>
</div> <!-- end row -->


<div class='row yd_layout_margin_top_s'>	
	<div class='col-sm-3'>
		<div class='input-group'>
	    	<span class='input-group-addon'>最小值</span>
	    	<input id='min_value' class='form-control' value='0'></input>
	    </div>
	</div>
	<div class='col-sm-3'>
		<div class='input-group'>
	    	<span class='input-group-addon'>最大值</span>
	    	<input id='max_value' class='form-control' value='177'></input>
	    </div>
	</div>
	<div class='col-sm-3'>
		<div class='input-group'>
	    	<span class='input-group-addon'>气泡大小</span>
	    	<input id='scatter_size' class='form-control' value='0.5'></input>
	    </div>
	</div> 
	<div class='col-sm-3'>
		<div class='input-group'>
	    	<span class='input-group-addon'>字体大小</span>
	    	<input id='font_size' class='form-control' value='16'></input>
	    </div>
	</div> <!-- end col-md -->
</div> <!-- end row -->

<div class='row'>
		<a class='btn btn-success yd_layout_center yd_layout_margin_top_s yd_layout_width_xs' id='chart_button'>生成中国地图</a>		
</div> <!-- end row -->

<div class='row yd_layout_margin_top_s'>
	<div id='map_div'>
	</div>
</div> <!-- end row -->