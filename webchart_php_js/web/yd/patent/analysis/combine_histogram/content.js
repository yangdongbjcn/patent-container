$(document).ready(function(){

	var str='\
qualcomm	221\n\
阿里巴巴公司	199\n\
alibaba	193\n\
sony	139\n\
accenture global | gsc secrypt	119\n\
bank of america	107\n\
区块链控股有限公司	86\n\
nchain holdings	84\n\
腾讯科技	79\n\
杭州复杂美科技有限公司	74\n\
中国平安保险集团股份有限公司	73\n\
the toronto dominion bank	69\n\
coinplug	63\n\
众安信息技术服务有限公司	57\n\
深圳市网心科技有限公司	57\n\
百度在线网络技术	55\n\
scr technologies	54\n\
zymeworks	53\n\
索尼公司	45\n\
international business machines	44\n\
wal mart apollo	44\n\
杭州云象网络技术有限公司	42\n\
fuji photo film	39\n\
accenture global	35\n\
tran bao	35\n\
深圳前海微众银行股份有限公司	35\n\
siemens aktiengesellschaft	34\n\
安地卡及巴布达商区块链控股有限公司	32\n\
tencent	30\n\
傲为信息技术江苏有限公司	29\n\
northwestern university	27\n\
madisetti vijay k	26\n\
metaphysics	26\n\
salesforce com	26\n\
konecranes global	25\n\
pricewaterhousecoopers aarata | ＰｗＣあらた有限責任監査法人	25\n\
intel	24\n\
尚维斯	24\n\
深圳市步云科技有限公司	24\n\
huawei technologies	21\n\
中思博安科技北京有限公司	21\n\
中国科学院	20\n\
上海点融信息科技有限责任公司	19\n\
英特尔	19\n\
';

	$('#mat1').val(str);

	var str2='\
402 technologies\n\
accenture global\n\
accenture global | gsc secrypt\n\
adp\n\
alecson feld australia\n\
alibaba\n\
alphapoint\n\
american express\n\
bank of america\n\
ben ari adi\n\
bext holdings\n\
bizmodeline\n\
black gold coin\n\
british telecomm\n\
broadcom\n\
bundesdruckerei\n\
capital one service\n\
castor pollux holdings sarl\n\
chicago mercantile exchange\n\
chronicled\n\
cisco technology\n\
clause\n\
cloudminds shenzhen robotics systems\n\
cognitive scale\n\
coinplug\n\
dell\n\
digital asset switzerland\n\
dragonchain\n\
ebay\n\
eight plus ventures\n\
enrico maim\n\
ericsson\n\
financial risk organisation\n\
fmr\n\
fuji photo film\n\
fujitsu\n\
general electric\n\
hewlett packard\n\
hitachi\n\
honeywell\n\
huawei technologies\n\
identitii\n\
industry university cooperation foundation sogang \n\
infobank\n\
inmentis\n\
innogy innovation\n\
intel\n\
international business machines\n\
jpmorganchase bank n a\n\
kochava\n\
konecranes global\n\
madisetti vijay k\n\
maim enrico\n\
mastercard international\n\
mcafee\n\
mckesson financial holding\n\
metaphysics\n\
microsoft\n\
middle chart\n\
mocana\n\
monegraph\n\
monetago\n\
monticello enterprises\n\
myomega systems\n\
nasdaq\n\
nchain holdings\n\
nec\n\
nec laboratories europe\n\
netspective communications\n\
nokia\n\
nomura research institute\n\
northern trust\n\
northwestern university\n\
oracle\n\
panasonic\n\
paypal\n\
ping an technology shenzhen\n\
pricewaterhousecoopers aarata | ＰｗＣあらた有限責任監査法人\n\
qualcomm\n\
r3\n\
radware\n\
responsible gold operations\n\
rivetz\n\
royal bank of canada\n\
rwe power aktiengesellschaft\n\
salesforce com\n\
samsung electronics\n\
samsung sds\n\
sap\n\
scr technologies\n\
sensoriant\n\
shapeshift\n\
shenzhen launch tech\n\
siemens aktiengesellschaft\n\
sony\n\
strong force tx portfolio 2018\n\
swfl\n\
telefonica\n\
templum\n\
tencent\n\
the toronto dominion bank\n\
thomson reuters\n\
tran bao\n\
transactive grid\n\
united services automobile association\n\
uvue\n\
verizon\n\
visa\n\
wal mart apollo\n\
wal mart stores\n\
wells fargo bank n a\n\
workday\n\
zymeworks\n\
阿里巴巴公司\n\
埃森哲全球服务股份有限公司\n\
安地卡及巴布达商区块链控股有限公司\n\
傲为信息技术江苏有限公司\n\
百度在线网络技术\n\
北方信托公司\n\
北京阿尔山金融科技有限公司\n\
北京艾摩瑞策科技有限公司\n\
北京工商大学\n\
北京工业大学\n\
北京海益同展信息科技有限公司\n\
北京航空航天大学\n\
北京金山软件有限公司\n\
北京京东世纪贸易有限公司\n\
北京欧链科技有限公司\n\
北京奇虎科技有限公司\n\
北京瑞卓喜投科技发展有限公司\n\
北京物资学院\n\
北京芯际科技有限公司\n\
北京邮电大学\n\
北京云知科技有限公司\n\
布比北京网络技术有限公司\n\
成都高新信息技术研究院\n\
成都链一网络科技有限公司\n\
触信厦门智能科技有限公司\n\
达闼科技成都有限公司\n\
邓迪\n\
电子科技大学\n\
杜伯仁\n\
佛山市高明曦逻科技有限公司\n\
佛山伊苏巨森科技有限公司\n\
福建工程学院\n\
福建省农村信用社联合社\n\
复旦大学\n\
富邦金融控股股份有限公司 | 现代财富控股有限公司\n\
富士通株式会社\n\
广东工业大学\n\
广东网金控股股份有限公司\n\
广州大学\n\
国际商业机器公司\n\
国家电网有限公司\n\
海联金汇科技股份有限公司\n\
杭州复杂美科技有限公司\n\
杭州基尔区块链科技有限公司\n\
杭州秘猿科技有限公司\n\
杭州趣链科技有限公司\n\
杭州云象网络技术有限公司\n\
合肥达朴汇联科技有限公司\n\
合肥维天运通信息科技股份有限公司\n\
赫普科技发展北京有限公司\n\
恒宝股份有限公司\n\
横琴密达科技有限责任公司\n\
湖南大学\n\
华北电力大学\n\
华为技术有限公司\n\
华中科技大学\n\
济南浪潮高新科技投资发展有限公司\n\
暨南大学\n\
江苏华信区块链产业研究院有限公司\n\
江苏荣泽信息科技股份有限公司\n\
江苏通付盾科技有限公司\n\
江西理工大学\n\
京东方\n\
鲸链科技股份有限公司\n\
矩阵元技术深圳有限公司\n\
夸克链科技深圳有限公司\n\
浪潮集团有限公司\n\
孟江华\n\
咪咕文化科技有限公司\n\
南京邮电大学\n\
诺基亚\n\
莆田市烛火信息技术有限公司\n\
钱德君\n\
清华大学\n\
区块链控股有限公司\n\
全链通有限公司\n\
厦门快商通信息技术有限公司\n\
山东爱城市网信息技术有限公司\n\
陕西医链区块链集团有限公司\n\
上海保险交易所股份有限公司\n\
上海策赢网络科技有限公司\n\
上海点融信息科技有限责任公司\n\
上海交通大学\n\
上海唯链信息科技有限公司\n\
尚维斯\n\
深圳大学\n\
深圳前海达闼云端智能科技有限公司\n\
深圳前海微众银行股份有限公司\n\
深圳前海益链网络科技有限公司\n\
深圳市安思科电子科技有限公司\n\
深圳市贝优通新能源技术开发有限公司\n\
深圳市步云科技有限公司\n\
深圳市轱辘车联数据技术有限公司\n\
深圳市轱辘汽车维修技术有限公司\n\
深圳市玖品空气净化科技有限公司\n\
深圳市乐业科技有限公司\n\
深圳市雷凌广通技术研发有限公司\n\
深圳市奈士迪技术研发有限公司\n\
深圳市网心科技有限公司\n\
深圳市祥云万维科技有限公司\n\
深圳市晓控通信科技有限公司\n\
深圳市有钱科技有限公司\n\
深圳市元征科技股份有限公司\n\
深圳市中科智诚科技有限公司\n\
深圳正品创想科技有限公司\n\
深圳智乾区块链科技有限公司\n\
石更箭数据科技上海有限公司\n\
硕网资讯股份有限公司\n\
四川大学\n\
四川长虹电器股份有限公司\n\
苏宁易购集团股份有限公司\n\
苏州达家迎信息技术有限公司\n\
苏州酷外文化传媒有限公司\n\
索尼公司\n\
泰康保险集团股份有限公司\n\
腾讯科技\n\
天津米游科技有限公司\n\
网易\n\
维萨美国股份有限公司\n\
温州市图盛科技有限公司 | 国家电网有限公司\n\
武汉大学\n\
武汉凤链科技有限公司\n\
物数上海信息科技有限公司\n\
西安电子科技大学\n\
西门子公司\n\
现代财富控股有限公司\n\
湘潭大学\n\
迅鳐成都科技有限公司\n\
英特尔\n\
远光软件股份有限公司\n\
浙江大学\n\
浙江工商大学\n\
中钞信用卡产业发展有限公司\n\
中国电信集团有限公司\n\
中国电子科技集团有限公司\n\
中国工商银行\n\
中国航天科工集团有限公司\n\
中国科学院\n\
中国联合网络通信集团有限公司\n\
中国南方电网有限责任公司\n\
中国平安保险集团股份有限公司\n\
中国人民银行数字货币研究所\n\
中国银行\n\
中国银联股份有限公司\n\
中链科技有限公司\n\
中山大学\n\
中思博安科技北京有限公司\n\
中兴通讯股份有限公司\n\
众安信息技术服务有限公司\n\
重庆小雨点小额贷款有限公司\n\
重庆邮电大学\n\
卓尔智联武汉研究院有限公司\n\
';

	$('#index1').val(str2);

	$('#result_text').val('');
	$('#submit').click(function(){
		var p_url = g_var.g_server_text + 'TextLines/apiCombineHistogram';
		var p_data = {
			text: $('#mat1').val(),
			index: $('#index1').val()
		};
		p_callback = function(data, status){
			var regReturn = new RegExp('rrrrnnnn', "g");
			t_data = data.replace(regReturn,"\r\n" );
			$('#result_text').val(t_data);
		};
		$.post(p_url, p_data, p_callback);
	});/*click function*/


});