$(document).ready(function(){

	var str = '土耳其\n\
德国';

	$('#input_text').val(str);
	$('#result_text1').val('');
	$('#result_text2').val('');
	
	$('#submit').click(function(){
		var name_text = $('#input_text').val();
		var names = new YdText().init(name_text).toArrayByEnter();

		var codes = new YdPosition().getNationCode(names);
		$('#result_text1').val(codes);

		var en_names = new YdPosition().getEnName(names);
		$('#result_text2').val(en_names);
	});/*click function*/
		
});
