$(window).load(function(){
	gf_cookie_login();

	$('#id_search_filter_show').click(function(){
		if (document.getElementById('id_search_filter').style.display != 'inline')
            document.getElementById('id_search_filter').style.display = 'inline';
        else
            document.getElementById('id_search_filter').style.display = 'none';

	});
});

function gf_search_get_isAgain() {
	var t_isAgain = document.getElementById('isAgain').checked;
	return t_isAgain;
}

function gf_search_get_lib() {
	/*lib*/
	var t_lib = '';
	if (document.getElementById('CN').checked== true)
		t_lib = 'CN';
	if (document.getElementById('EN').checked== true)
	{
		if ( t_lib == '')
			t_lib = 'EN';
		else 
			t_lib += ',EN';
	}
	return t_lib;
}

function gf_search_get_type() {
	/*type*/
	var t_type = '';
	if (document.getElementById('发明授权').checked== true)
		t_type = '发明授权';
	if (document.getElementById('发明申请').checked== true)
	{
		if ( t_type == '')
			t_type = '发明申请';
		else 
			t_type += ',发明申请';
	}
	if (document.getElementById('实用新型').checked== true)
	{
		if ( t_type == '')
			t_type = '实用新型';
		else 
			t_type += ',实用新型';
	}
	if (document.getElementById('外观设计').checked== true)
	{
		if ( t_type == '')
			t_type = '外观设计';
		else 
			t_type += ',外观设计';
	}
	return t_type;
}

function gf_search_get_legalstate() {
	/*legalstate*/
	var t_legalstate = '';
	if (document.getElementById('公开').checked== true)
		t_legalstate = '公开';
	if (document.getElementById('授权').checked== true)
	{
		if ( t_legalstate == '')
			t_legalstate = '授权';
		else 
			t_legalstate += ',授权';
	}
	if (document.getElementById('驳回').checked== true)
	{
		if ( t_legalstate == '')
			t_legalstate = '驳回';
		else 
			t_legalstate += ',驳回';
	}
	if (document.getElementById('撤回').checked== true)
	{
		if ( t_legalstate == '')
			t_legalstate = '撤回';
		else 
			t_legalstate += ',撤回';
	}
	return t_legalstate;
}

function gf_search_get_legalvalid() {
	/*legalvalid*/
	var t_legalvalid = '';
	if (document.getElementById('审中').checked== true)
		t_legalvalid = '审中';
	if (document.getElementById('有效').checked== true)
	{
		if ( t_legalvalid == '')
			t_legalvalid = '有效';
		else 
			t_legalvalid += ',有效';
	}
	if (document.getElementById('失效').checked== true)
	{
		if ( t_legalvalid == '')
			t_legalvalid = '失效';
		else 
			t_legalvalid += ',失效';
	}
	return t_legalvalid;
}
