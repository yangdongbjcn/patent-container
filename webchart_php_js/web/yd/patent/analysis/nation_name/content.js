$(document).ready(function(){

	var str2 = '土耳其\n\
德国';
	$('#search_text2').val(str2);
	$('#result_text2').val('');
	
	$('#submit2').click(function(){
		var name_text = $('#search_text2').val();
		var names = new YdText().init(name_text).toArrayByEnter();
		var en_names = new YdPosition().getEnName(names);
		$('#result_text2').val(en_names);

		var codes = new YdPosition().getNationCode(names);
		$('#result_text1').val(codes);
	});/*click function*/
		
});



