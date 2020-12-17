$(document).ready(function(){

	$('#qrcode_button_ie').click(function(){
		var qrcode_text = $('#qrcode_text').val();
		$('#qrcode_div').qrcode({
			render: 'table',
			width: 400,
			height:400,
			text: qrcode_text
			});
	});/*click function*/

	$('#qrcode_button').click(function(){
		var qrcode_text = $('#qrcode_text').val();
		$('#qrcode_div').qrcode(qrcode_text);
	});/*click function*/
		
});

