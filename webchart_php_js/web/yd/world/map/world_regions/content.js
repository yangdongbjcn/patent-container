$(document).ready(function(){ 
 
	var t_col = ['China','United States','Japan','EPO','Korea'];
	$('#col01').val(new Yd_list().init(t_col).toStringLines());

	t_col = ['177','142','102','81','47'];
	$('#col02').val(new Yd_list().init(t_col).toStringLines());

	$('#chart_button').click(function(){	
		
		var col01 = yd_text_input_col('#col01');
		var col02 = yd_text_input_col('#col02');

		var t_max = $('#max_value').val() - 0,
	    	t_min = $('#min_value').val() - 0,
	    	t_size = $('#scatter_size').val() - 0,
	    	t_font = $('#font_size').val() - 0;


		comp_world_regions(col01, col02, t_max, t_min, t_size, t_font);
		
	});/*click function*/
		
});
