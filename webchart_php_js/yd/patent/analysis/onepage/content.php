<h2>专利分析一页通</h2>
<form class='form-horizontal'>
	<fieldset>
		<div>
			<table class='table table-bordered'>
				<thead>			
					<tr>
						<th width="30%">类别</td>
						<th width="70%">国别</td>
					</tr>
				</thead> 
				<tbody>	
					<tr>
						<td width="30%">多行提取，数字+国别，排序</td>
						<td width="70%"><a href="extract_nation.php">extract_nation.php</a></td>
					</tr>
					<tr>
						<td width="30%">多行提取，指定国别</td>
						<td width="70%"><a href="extract_nation_some.php">extract_nation_some.php</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</fieldset>
</form>
<form class='form-horizontal'>
	<fieldset>
		<div>
			<table class='table table-bordered'>  
				<thead>			
					<tr>
						<th width="30%">类别</td>
						<th width="70%">检索式</td>
					</tr>
				</thead> 
				<tbody>
					<tr>
						<td witdh="30%">前人检索式解析</td>
						<td width="70%"><a href="search_input.php">search_input.php</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</fieldset>
</form>
<form class='form-horizontal'>
	<fieldset>
		<div>
			<table class='table table-bordered'>
				<thead>			
					<tr>
						<th width="30%">类别</td>
						<th width="70%">申请人</td>
					</tr>
				</thead> 
				<tbody>
					<tr>
						<td witdh="30%">统计结果提取,提取申请人</td>
						<td width="70%"><a href="extract_applicant.php">extract_applicant.php</a></td>
					</tr>
					<tr>
						<td witdh="30%">统计结果提取,申请人标准化</td>
						<td width="70%"><a href="standard_applicant.php">standard_applicant.php</a></td>
					</tr>
					<tr>
						<td witdh="30%">检索批处理代码生成,申请人</td>
						<td width="70%"><a href="search_applicant.php">search_applicant.php</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</fieldset>
</form>
<form class='form-horizontal'>
	<fieldset>
		<div>
			<table class='table table-bordered'>
				<thead>			
					<tr>
						<th width="30%">类别</td>
						<th width="70%">公开号</td>
					</tr>
				</thead> 
				<tbody>
					<tr>
						<td witdh="30%">拷屏内容提取,提取公开号</td>
						<td width="70%"><a href="extract_pn.php">extract_pn.php</a></td>
					</tr>
					<tr>
						<td witdh="30%">拷屏内容提取,提取一国公开号</td>
						<td width="70%"><a href="extract_pn_one.php">extract_pn_one.php</a></td>
					</tr>
					<tr>
						<td witdh="30%">国别代码</td>
						<td width="70%"><a href="nation_code.php">nation_code.php</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</fieldset>
</form>
<form class='form-horizontal'>
	<fieldset>
		<div>
			<table class='table table-bordered'>
				<thead>			
					<tr>
						<th width="30%">类别</td>
						<th width="70%">DWPI入藏号</td>
					</tr>
				</thead> 
				<tbody>
					<tr>
						<td witdh="30%">拷屏内容提取,提取DWPI入藏号</td>
						<td width="70%"><a href="extract_dwpi.php">extract_dwpi.php</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</fieldset>
</form>
<form class='form-horizontal'>
	<fieldset>
		<div>
			<table class='table table-bordered'> 
				<thead>			
					<tr>
						<th width="30%">类别</td>
						<th width="70%">申请日</td>
					</tr>
				</thead> 
				<tbody>
					<tr>
						<td witdh="30%">统计结果提取,提取年份</td>
						<td width="70%"><a href="extract_year.php">extract_year.php</a></td>
					</tr>
					<tr>
						<td witdh="30%">统计结果提取,年度直方图（自动补齐）</td>
						<td width="70%"><a href="year_histogram.php">year_histogram.php</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</fieldset>
</form>
<form class='form-horizontal'>
	<fieldset>
		<div>
			<table class='table table-bordered'> 
				<thead>			
					<tr>
						<th width="30%">类别</td>
						<th width="70%">分类号</td>
					</tr>
				</thead> 
				<tbody>
					<tr>
						<td witdh="30%">提取主IPC</td>
						<td width="70%"><a href="extract_ipc.php">extract_ipc.php</a></td>
					</tr>
					<tr>
						<td witdh="30%">统计IPC</td>
						<td width="70%"><a href="ipc_histogram.php">ipc_histogram.php</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</fieldset>
</form>
<form class='form-horizontal'>
	<fieldset>
		<div>
			<table class='table table-bordered'>
				<thead>			
					<tr>
						<th width="30%">类别</td>
						<th width="70%">统计算法</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td witdh="30%">合并直方图</td>
						<td width="70%"><a href="add_histogram.php">add_histogram.php</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</fieldset>
</form>
<form class='form-horizontal'>
	<fieldset>
		<div>
			<table class='table table-bordered'> 
				<thead>			
					<tr>
						<th width="30%">类别</td>
						<th width="70%">画图算法</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td witdh="30%">气泡散点图</td>
						<td width="70%"><a href="<?php echo $g_yd__chart ?>bubble_scatter.php">bubble_scatter.php</a></td>
					</tr>
					<tr>
						<td witdh="30%">气泡矩阵图</td>
						<td width="70%"><a href="<?php echo $g_yd__chart ?>bubble_matrix.php">bubble_matrix.php</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</fieldset>
</form>
<form class='form-horizontal'>
	<fieldset>
		<div>
			<table class='table table-bordered'> 
				<thead>			
					<tr>
						<th width="30%">类别</td>
						<th width="70%">地图算法</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td witdh="30%">英文国名</td>
						<td width="70%"><a href="nation_name.php">nation_name.php</a></td>
					</tr>
					<tr>
						<td witdh="30%">世界地图</td>
						<td width="70%"><a href="<?php echo $g_yd_map ?>world">world_regions.php</a></td>
					</tr>
					<tr>
						<td witdh="30%">世界地图（技术流向图）</td>
						<td width="70%"><a href="<?php echo $g_yd_map ?>world/world_line.php">world_line.php</a></td>
					</tr>
					<tr>
						<td witdh="30%">中国地图</td>
						<td width="70%"><a href="<?php echo $g_yd_map ?>world/china">china_regions.php</a></td>
					</tr>
					<tr>
						<td witdh="30%">北京地图</td>
						<td width="70%"><a href="<?php echo $g_yd_map ?>world/china/beijing">beijing_regions.php</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</fieldset>
</form>