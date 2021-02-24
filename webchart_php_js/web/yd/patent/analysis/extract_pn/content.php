<div class='row'>
	<div class='col-sm-12'>
		<div class='well'>
	      <p>提取特定国别的公开号：</p>
	      <p>1. 输入文本来自于S系统的统计结果。  </p>
	      <p>2. 判断条件：公开号前两个字母是国别代码。  </p>
	    </div><!--/well-->
	</div>
</div>

<div class='row'> 
	<div class='col-sm-6'>
		<p>输入文本</p>
		<textarea id='input_text' class='form-control' rows='27'></textarea>
	</div>
	<div class='col-sm-6'>
		<p>输出文本</p>
		<textarea id='result_text' class='form-control' rows='27'></textarea>
	</div>
</div> <!-- end row -->


<div class='row'>	
	<div class='col-sm-12'>
		<div class='input-group yd_layout_margin_top_s'>
	    	<span class='input-group-addon'>查找</span>
	    	<input class='form-control' readonly="readonly" value='两个字母开头加任意数字的字符串'></input>
	    	<span class='input-group-btn'>
	    		<button class="btn btn-warning" type='button' id='submit'>正则抽取</button>
	    	</span>
	    </div>
	</div>
</div>