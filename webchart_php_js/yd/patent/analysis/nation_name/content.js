$(document).ready(function(){

	var str2 = '土耳其';
	$('#search_text2').val(str2);
	$('#result_text2').val('');
	
	$('#submit2').click(function(){
		var name = $('#search_text2').val();
		var names = [name];
		var codes = new YdPosition().translateToEnglish(names);
		$('#result_text2').val(codes);
	});/*click function*/
		
});



