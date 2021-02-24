$(document).ready(function(){

	var str = 'TR\n\
DE';

	$('#input_text').val(str);
	$('#result_text1').val('');
	$('#result_text2').val('');
	
	$('#submit').click(function(){
		var code_text = $('#input_text').val();
		var codes = new YdText().init(code_text).toArrayByEnter();

		var en_names = new YdPosition().getNationEnNameByCode(codes);
		$('#result_text1').val(en_names);

		var names = new YdPosition().getNationNameByCode(codes);
		$('#result_text2').val(names);
	});/*click function*/
		
});



