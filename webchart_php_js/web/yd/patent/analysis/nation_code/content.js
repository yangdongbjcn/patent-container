$(document).ready(function(){

	var str2 = 'TR\n\
DE';
	$('#search_text2').val(str2);
	$('#result_text2').val('');
	$('#result_text1').val('');
	
	$('#submit2').click(function(){
		var code_text = $('#search_text2').val();
		var codes = new YdText().init(code_text).toArrayByEnter();

		var names = new YdPosition().getNationNameByCode(codes);
		$('#result_text2').val(names);

		var en_names = new YdPosition().getNationEnNameByCode(codes);
		$('#result_text1').val(en_names);
	});/*click function*/
		
});



