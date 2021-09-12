
///////////////////////////////////////////////////////////
//
//      YdPosition
//
///////////////////////////////////////////////////////////
var YdChinaPosition = function() {
    YdObject.call(this);
    this.china_position_dict = this.getPositionDict('china');
};

YdChinaPosition.prototype = new YdObject();
YdChinaPosition.prototype.getPositionDict = function(mapName) {
    var position = {};
    var mapFeatures = echarts.getMap(mapName).geoJson.features;
    // IE8 不支持 forEach
    // mapFeatures.forEach(function(v) {
    //     // 地区名称
    //     var name = v.properties.name;
    //     // 地区经纬度
    //     position[name] = v.properties.cp;
    // });
    for (var i = mapFeatures.length - 1; i >= 0; i--) {
        var v = mapFeatures[i];
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        position[name] = v.properties.cp;
    }
    return position;
};
YdChinaPosition.prototype.getChinaPosition = function(names) {
    var position_dict = this.china_position_dict;

    var return_array = [];
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        
        var position = position_dict[name];
        return_array.push(position);
    }
    return return_array;
};

var YdPosition = function() {
    YdObject.call(this);
    this.world_position = [
        ["19.809499", "41.389924", "阿尔巴尼亚", "Albania", "AL"],
        ["3.058874", "36.755571", "阿尔及利亚", "Algeria", "DZ"],
        ["69.132386", "34.739287", "阿富汗", "Afghanistan", "AF"],
        ["-64.388276", "-31.379492", "阿根廷", "Argentina", "AR"],
        ["54.662609", "24.390891", "阿联酋", "United Arab Emirates", "AE"],
        ["58.405562", "23.587133", "阿曼", "Oman", "OM"],
        ["49.867851", "40.409897", "阿塞拜疆", "Azerbaijan", "OM"],
        ["31.236287", "30.045171", "埃及", "Egypt", "EG"],
        ["38.753839", "8.986474", "埃塞俄比亚", "Ethiopia", "EG"],
        ["-6.259735", "53.350324", "爱尔兰", "Ireland", "IE"],
        ["24.75379", "59.439569", "爱沙尼亚", "Estonia", "EE"],
        ["13.285773", "-8.748538", "安哥拉", "Angola", "AO"],
        ["16.373532", "48.209137", "奥地利", "Austria", "AT"],
        ["137.708144", "-25.328065", "澳大利亚", "Australia", "AU"],
        ["-59.37", "13.06", "巴巴多斯", "Barbados ", "BB"],
        ["147.27892", "-9.465948", "巴布亚新几内亚", "Papua New Guinea", "PG"],
        ["-73.562575", "40.655271", "巴哈马", "Bahamas", "BS"],
        ["73.076186", "33.714975", "巴基斯坦", "Pakistan", "PK"],
        ["-57.576213", "-25.260342", "巴拉圭", "Paraguay", "PY"],
        ["-79.401974", "9.102657", "巴拿马", "Panama", "PA"],
        ["-47.888777", "-15.791724", "巴西", "Brazil", "BR"],
        ["27.564451", "53.975825", "白俄罗斯", "Belarus", "BY"],
        ["-86.054972", "40.038827", "百慕大群岛", "Bermuda", "BM"],
        ["23.318705", "42.69792", "保加利亚", "Bulgaria", "BG"],
        ["2.626232", "6.499347", "贝宁", "Benin", "BJ"],
        ["4.19", "52.05", "比荷卢经济联盟", "Union Economique Benelux", "BX"],
        ["4.342799", "50.85052", "比利时", "Belgium", "BE"],
        ["-21.859781", "64.099918", "冰岛", "Iceland", "IS"],
        ["18.26", "43.52", "波黑", "Bosnia and Herz.", "BA"],
        ["21.021333", "52.232842", "波兰", "Poland", "PL"],
        ["-78.332036", "22.082519", "玻利维亚", "Bolivia", "BO"],
        ["12.849472", "-4.571506", "伯利兹", "Belize", "BZ"],
        ["25.967078", "-24.62583", "博茨瓦纳", "Botswana", "BW"],
        ["89.647324", "27.476933", "不丹", "Bhutan", "BT"],
        ["-1.521672", "12.375667", "布基纳法索", "Burkina Faso", "BF"],
        ["29.21", "-3.22", "布隆迪", "Burundi", "BI"],
        ["125.760512", "39.041685", "朝鲜", "Dem. Rep. Korea", "KP"],
        ["8.736346", "3.749414", "赤道几内亚", "Eq. Guinea", "GQ"],
        ["12.431735", "55.665973", "丹麦", "Denmark", "DK"],
        ["13.40498", "52.521199", "德国", "Germany", "DE"],
        ["125.564669", "-8.549475", "东帝汶", "East Timor", "TP"],
        ["1.244889", "6.219695", "多哥", "Togo", "TG"],
        ["-80.245123", "22.580836", "多米尼加", "Dominican Rep.", "DO"],
        ["-61.23", "15.18", "多米尼克", "Dominica", "DM"],
        ["37.621612", "55.758257", "俄罗斯", "Russia", "RU"],
        ["-78.467263", "-0.179206", "厄瓜多尔", "Ecuador", "EC"],
        ["38.925716", "15.324804", "厄立特里亚", "Eritrea", "ER"],
        ["2.333696", "48.865244", "法国", "France", "FR"],
        ["12.354722", "7.369722", "非洲地区工业产权组织", "ARIPO", "AP"],
        ["12.354722", "7.369722", "非洲知识产权组织", "OAPI", "OA"],
        ["120.985715", "14.603576", "菲律宾", "Philippines", "PH"],
        ["178.450079", "-18.122335", "斐济", "Fiji", "FJ"],
        ["24.935506", "60.173495", "芬兰", "Finland", "FI"],
        ["-17.33", "14.45", "佛得角", "Cape Verde", "CV"],
        ["-16.582383", "13.457299", "冈比亚", "Gambia", "GM"],
        ["15.240923", "-4.263634", "刚果", "Congo", "CG"],
        ["-74.074104", "4.715315", "哥伦比亚", "Colombia", "CO"],
        ["-90.871819", "14.023867", "哥斯达黎加", "Costa Rica", "CR"],
        ["-51.573608", "64.213084", "格陵兰", "Greenland", "GL"],
        ["44.827351", "41.71589", "格鲁吉亚", "Georgia", "GE"],
        ["-82.366883", "23.119708", "古巴", "Cuba", "CU"],
        ["-58.140752", "6.803865", "圭亚那", "Guyana", "GY"],
        ["71.470572", "51.160655", "哈萨克斯坦", "Kazakhstan", "KZ"],
        ["-72.307002", "18.595629", "海地", "Haiti", "HT"],
        ["46.672152", "24.714184", "海湾阿拉伯国家合作委员会", "GCC", "GC"],
        ["126.986407", "37.536804", "韩国", "Korea", "KR"],
        ["4.89354", "52.370649", "荷兰", "Netherlands", "NL"],
        ["19.261583", "42.435497", "黑山", "Montenegro", "AN"],
        ["-87.253756", "14.044503", "洪都拉斯", "Honduras", "HN"],
        ["172.54", "1.25", "基里巴斯", "Kiribati", "KI"],
        ["43.146919", "11.573827", "吉布提", "Djibouti", "DJ"],
        ["74.569345", "42.874887", "吉尔吉斯斯坦", "Kyrgyzstan", "KG"],
        ["-13.577316", "9.644511", "几内亚", "Guinea", "GN"],
        ["-15.619766", "11.885767", "几内亚比绍", "Guinea-Bissau", "GW"],
        ["-109.404347", "60.638178", "加拿大", "Canada", "CA"],
        ["-0.188114", "5.604581", "加纳", "Ghana", "GH"],
        ["9.495768", "0.436579", "加蓬", "Gabon", "GA"],
        ["104.891769", "11.545102", "柬埔寨", "Cambodia", "KH"],
        ["14.437258", "50.078142", "捷克", "Czech", "CZ"],
        ["14.437258", "50.078142", "捷克斯洛伐克", "Czechoslovakia", ""],
        ["31.033189", "-17.824573", "津巴布韦", "Zimbabwe", "ZW"],
        ["11.502655", "3.852758", "喀麦隆", "Cameroon", "CM"],
        ["51.531551", "25.286355", "卡塔尔", "Qatar", "QA"],
        ["21.163778", "42.663444", "科索沃", "Kosovo", ""],
        ["-5.255454", "6.826119", "科特迪瓦", "C?te d'Ivoire", "CI"],
        ["47.977439", "29.376031", "科威特", "Kuwait", "KW"],
        ["15.974196", "45.812166", "克罗地亚", "Croatia", "HR"],
        ["36.820997", "-1.291346", "肯尼亚", "Kenya", "KE"],
        ["24.105101", "56.949378", "拉脱维亚", "Latvia", "LV"],
        ["29.085487", "-29.04088", "莱索托", "Lesotho", "LS"],
        ["102.632451", "17.975794", "老挝", "Lao PDR", "LA"],
        ["35.500052", "33.89439", "黎巴嫩", "Lebanon", "LB"],
        ["25.279069", "54.687457", "立陶宛", "Lithuania", "LT"],
        ["-10.761016", "6.291152", "利比里亚", "Liberia", "LR"],
        ["13.19135", "32.887237", "利比亚", "Libya", "LY"],
        ["9.31", "47.09", "列支敦士登", "Liechtenstein", "LI"],
        ["6.131308", "49.613029", "卢森堡", "Luxembourg", "LU"],
        ["30.102346", "-1.969667", "卢旺达", "Rwanda", "RW"],
        ["51.531551", "25.286355", "罗马尼亚", "Romania", "RO"],
        ["47.508608", "-18.867016", "马达加斯加", "Madagascar", "MG"],
        ["73.5", "4。2", "马尔代夫", "Maldives", "MV"],
        ["14.37", "35.98", "马耳他", "Malta", "MT"],
        ["33.774057", "-13.961542", "马拉维", "Malawi", "MW"],
        ["101.681865", "3.136134", "马来西亚", "Malaysia", "MY"],
        ["-8.003581", "12.640388", "马里", "Mali", "ML"],
        ["57.5", "20", "毛里求斯", "Mauritius", "MU"],
        ["21.427289", "41.997997", "北马其顿", "North Macedonia", "MK"],
        ["-15.964452", "18.0745", "毛里塔尼亚", "Mauritania", "MR"],
        ["-101.4359", "39.4629", "美国", "United States", "US"],
        ["106.908677", "47.915632", "蒙古", "Mongolia", "MN"],
        ["90.410568", "23.813179", "孟加拉国", "Bangladesh", "BD"],
        ["-77.042548", "-12.044223", "秘鲁", "Peru", "PE"],
        ["96.077119", "19.763943", "缅甸", "Myanmar", "MM"],
        ["13.40498", "52.521199", "民主德国", "Germany DDR", ""],
        ["15.2495", "-4.422756", "民主刚果", "Dem. Rep. Congo", "CD"],
        ["28.858505", "47.012344", "摩尔多瓦", "Moldova", "MD"],
        ["-6.862605", "33.977609", "摩洛哥", "Morocco", "MA"],
        ["7.25", "43.4", "摩纳哥", "Monaco", "MC"],
        ["32.602247", "-25.890353", "莫桑比克", "Mozambique", "MZ"],
        ["-99.134543", "19.433793", "墨西哥", "Mexico", "MX"],
        ["17.034567", "-22.555179", "纳米比亚", "Namibia", "NA"],
        ["18.480216", "-33.873348", "南非", "South Africa", "ZA"],
        ["18.423339", "43.796617", "南斯拉夫", "Yugoslavia", "YU"],
        ["166.56", "0.32", "瑙鲁", "Nauru", "NR"],
        ["10.451526", "51.165691", "欧盟内部市场协调局", "OHIM", "EM"],
        ["31.586576", "4.891962", "南苏丹", "S. Sudan", ""],
        ["85.320511", "27.711", "尼泊尔", "Nepal", "NP"],
        ["-86.236749", "12.115559", "尼加拉瓜", "Nicaragua", "NI"],
        ["2.118056", "13.516354", "尼日尔", "Niger", "NE"],
        ["7.459498", "9.126437", "尼日利亚", "Nigeria", "NG"],
        ["4.89354", "52.370649", "挪威", "Norway", "NO"],
        ["37.621612", "55.758257", "欧亚专利局", "EAPO", "EA"],
        ["10.451526", "51.165691", "欧洲专利局", "EPO", "EP"],
        ["-9.161365", "38.768409", "葡萄牙", "Portugal", "PT"],
        ["116.8564", "65.067703", "苏联", "CCCP", ""],
        ["139.713657", "35.707004", "日本", "Japan", "JP"],
        ["18.058376", "59.327783", "瑞典", "Sweden", "SE"],
        ["7.44716", "46.950139", "瑞士", "Switzerland", "CH"],
        ["-89.22758", "13.692121", "萨尔瓦多", "El Salvador", "SV"],
        ["-170.4", "14.15", "萨摩亚", "Samoa", "WS"],
        ["20.446144", "44.786894", "塞尔维亚", "Serbia", ""],
        ["-13.233425", "8.466744", "塞拉利昂", "Sierra Leone", "SL"],
        ["-17.367747", "14.764454", "塞内加尔", "Senegal", "SN"],
        ["33.380264", "35.183442", "塞浦路斯", "Cyprus", "CY"],
        ["55.28", "-4.4", "塞舌尔", "Seychelles", "SC"],
        ["46.672152", "24.714184", "沙特阿拉伯", "Saudi Arabia", "SA"],
        ["6.43", "0.2", "圣多美和普林西比", "Sao Tome and Principe", "ST"],
        ["12.28", "43.55", "圣马力诺", "San Marino", "SM"],
        ["8.227512", "46.818188", "世界知识产权组织", "WIPO", "WO"],
        ["79.865104", "6.909415", "斯里兰卡", "Sri Lanka", "LK"],
        ["17.099623", "48.141697", "斯洛伐克", "Slovakia", "SK"],
        ["14.31", "46.03", "斯洛文尼亚", "Slovenia", "SI"],
        ["31.134648", "-26.292261", "斯威士兰", "Swaziland", "SZ"],
        ["32.560519", "15.501806", "苏丹", "Sudan", "SD"],
        ["-55.206128", "5.853474", "苏里南", "Suriname", "SR"],
        ["159.981803", "-9.43537", "所罗门群岛", "Solomon Is.", "SB"],
        ["45.317204", "2.047013", "索马里", "Somalia", "SO"],
        ["68.788383", "38.572383", "塔吉克斯坦", "Tajikistan", "TJ"],
        ["100.451117", "13.724061", "泰国", "Thailand", "TH"],
        ["35.698823", "-6.211186", "坦桑尼亚", "Tanzania", "TZ"],
        ["-175.12", "-21.07", "汤加", "Tonga", "TO"],
        ["10.208651", "36.866028", "特里尼达和多巴哥", "Trinidad and Tobago", "TT"],
        ["32.853705", "39.941552", "突尼斯", "Tunisia", "TN"],
        ["58.338576", "38.057635", "土耳其", "Turkey", "TR"],
        ["179.13", "-8.31", "图瓦卢", "Tuvalu", "TV"],
        ["168.327477", "-17.730243", "土库曼斯坦", "Turkmenistan", "TM"],
        ["168.19", "-17.44", "瓦努阿图", "Vanuatu", "VU"],
        ["-90.543513", "14.649067", "危地马拉", "Guatemala", "GT"],
        ["-66.90346", "10.492688", "委内瑞拉", "Venezuela", "VE"],
        ["114.951828", "4.948475", "文莱", "Brunei", "BN"],
        ["32.581738", "0.352894", "乌干达", "Uganda", "UG"],
        ["30.512697", "50.452995", "乌克兰", "Ukraine", "UA"],
        ["-56.163094", "-34.893771", "乌拉圭", "Uruguay", "UY"],
        ["69.247259", "41.313586", "乌兹别克斯坦", "Uzbekistan", "UZ"],
        ["-3.703414", "40.419467", "西班牙", "Spain", "ES"],
        ["-13.233061", "27.246935", "西撒哈拉", "W. Sahara", "EH"],
        ["23.72821", "37.9846", "希腊", "Greece", "GR"],
        ["103.51", "1.18", "新加坡", "Singapore", "SG"],
        ["174.761827", "-41.291661", "新西兰", "New Zealand", "NZ"],
        ["19.04196", "47.498109", "匈牙利", "Hungary", "HU"],
        ["36.274228", "33.521994", "叙利亚", "Syria", "SY"],
        ["140.433549", "-36.466221", "牙买加", "Jamaica", "JM"],
        ["44.31", "40.1", "亚美尼亚", "Armenia", "AM"],
        ["44.188624", "15.375985", "也门", "Yemen", "YE"],
        ["44.363655", "33.314606", "伊拉克", "Iraq", "IQ"],
        ["51.388399", "35.6899", "伊朗", "Iran", "IR"],
        ["35.21141", "31.77102", "以色列", "Israel", "IL"],
        ["12.491267", "41.904612", "意大利", "Italy", "IT"],
        ["77.206503", "28.62928", "印度", "India", "IN"],
        ["106.870937", "-6.240893", "印度尼西亚", "Indonesia", "ID"],
        ["-0.130058", "51.508604", "英国", "United Kingdom", "GB"],
        ["35.927003", "31.946341", "约旦", "Jordan", "JO"],
        ["105.699615", "20.973967", "越南", "Vietnam", "VN"],
        ["28.321954", "-15.376648", "赞比亚", "Zambia", "ZM"],
        ["15.058995", "12.144253", "乍得", "Chad", "TD"],
        ["-70.693344", "19.48165", "智利", "Chile", "CL"],
        ["18.557903", "4.396116", "中非共和国", "Central African Republic", "CF"],
        ["108.97", "34.27", "中国", "China", "CN"],
        ["121.5365", "25.0192", "中国台湾", "Taiwan", "TW"],
        ["113.52", "22.9", "中国香港", "Hong Kong", "HK"],
        ["113.5", "22.2", "中国澳门", "Macao", "MO"],
        ["4.342799", "50.85052", "欧洲", "Europe Union", "EU"],
        ["-66.6", "18.27", "波多黎各", "Puerto Rico", "PR"],
        ["50.36", "26.12", "巴林", "Bahrain", "BH"]
    ];
    this.world_position_mat = new Yd_mat().init(this.world_position);
};

YdPosition.prototype = new YdObject();
YdPosition.prototype.getPosition = function(names) {
    var return_array = [];
    var cn_names = this.world_position_mat.bldClist(2).get();
    var longtitudes = this.world_position_mat.bldClist(0).get();
    var latitudes = this.world_position_mat.bldClist(1).get();
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var index = cn_names.indexOf(name);

        if (index == -1) {
          return_array.push(null);
          continue;         
        }

        var longtitude = longtitudes[index];
        var latitude = latitudes[index];
        return_array.push([longtitude, latitude]);
    }
    return return_array;
};
YdPosition.prototype.getPositionByEnglish = function(names) {
    var return_array = [];
    var en_names = this.world_position_mat.bldClist(3).get();
    var longtitudes = this.world_position_mat.bldClist(0).get();
    var latitudes = this.world_position_mat.bldClist(1).get();
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var index = en_names.indexOf(name);

        if (index == -1) {
          return_array.push(null);
          continue;           
        }

        var longtitude = longtitudes[index];
        var latitude = latitudes[index];
        return_array.push([longtitude, latitude]);
    }
    return return_array;
};
YdPosition.prototype.getCnNames = function() {
    var cn_names = this.world_position_mat.bldClist(2).get();
    return cn_names;
};
YdPosition.prototype.getCnName = function(names) {
    var return_array = [];
    var cn_names = this.world_position_mat.bldClist(2).get();
    var en_names = this.world_position_mat.bldClist(3).get();
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var index = en_names.indexOf(name);

        if (index == -1) {
          return_array.push(null); 
          continue;          
        }

        var new_name = cn_names[index];
        return_array.push(new_name);
    }
    return return_array;
};
YdPosition.prototype.getEnName = function(names) {
    var return_array = [];
    var cn_names = this.world_position_mat.bldClist(2).get();
    var en_names = this.world_position_mat.bldClist(3).get();
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var index = cn_names.indexOf(name);

        if (index == -1) {
          return_array.push(null);
          continue;         
        }

        var new_name = en_names[index];
        return_array.push(new_name);
    }
    return return_array;
};
YdPosition.prototype.getNationCodes = function() {
    var cn_names = this.world_position_mat.bldClist(4).get();
    return cn_names;
};
YdPosition.prototype.getMainNationCodes = function() {
    var cn_names = ['AR','EG','IE','AT','AU','PK','BR','PG','BX','BE','IS','BA','PL','DK','DE','RU','FR','AP','OA','PH','FI','KZ','GC','KR','NL','CA','CZ','MY','US','ZA','EM','NO','EA','EP','PT','JP','SE','CH','WO','TH','TR','ES','GR','SG','NZ','HU','IL','IT','IN','ID','GB','VM','CN',"HK","TW"];
    return cn_names;
};
YdPosition.prototype.getNationCode = function(names) {
    var return_array = [];
    var cn_names = this.world_position_mat.bldClist(2).get();
    var all_codes = this.world_position_mat.bldClist(4).get();
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var index = cn_names.indexOf(name);

        if (index == -1) {
          return_array.push(null); 
          continue;          
        }

        var new_name = all_codes[index];
        return_array.push(new_name);
    }
    return return_array;
};
YdPosition.prototype.getNationNameByCode = function(codes) {
    var return_array = [];
    var cn_names = this.world_position_mat.bldClist(2).get();
    var all_codes = this.world_position_mat.bldClist(4).get();
    for (var i = 0; i < codes.length; i++) {
        var code = codes[i];
        var index = all_codes.indexOf(code);

        if (index == -1) {
          return_array.push(null); 
          continue;          
        }

        var new_name = cn_names[index];
        return_array.push(new_name);
    }
    return return_array;
};
YdPosition.prototype.getNationEnNameByCode = function(codes) {
    var return_array = [];
    var en_names = this.world_position_mat.bldClist(3).get();
    var all_codes = this.world_position_mat.bldClist(4).get();
    for (var i = 0; i < codes.length; i++) {
        var code = codes[i];
        var index = all_codes.indexOf(code);

        if (index == -1) {
          return_array.push(null); 
          continue;          
        }

        var new_name = en_names[index];
        return_array.push(new_name);
    }
    return return_array;
};
YdPosition.prototype.getNationCodeByEnglish = function(names) {
    var return_array = [];
    var en_names = this.world_position_mat.bldClist(3).get();
    var all_codes = this.world_position_mat.bldClist(4).get();
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var index = en_names.indexOf(name);

        if (index == -1) {
          return_array.push(null);
          continue;          
        }

        var new_name = all_codes[index];
        return_array.push(new_name);
    }
    return return_array;
};


///////////////////////////////////////////////////////////
//
//      YdMap
//
///////////////////////////////////////////////////////////

var YdMap = function(map_name) {
    YdObject.call(this);
    var geo_index = 0;
    this.dict = {
        type: 'map',
        map: map_name,
        geoIndex: geo_index,
        selectedMode: 'multiple',
        roam: false,
        itemStyle: {
            normal: new YdMapColor().get(),
            emphasis: new YdMapColor().emp().get()
        },
        animation: false
    };
};
YdMap.prototype = new YdObject();
YdMap.prototype.geoIndex = function(value) {
    this.att('geoIndex', value);
    return this;
};

var YdMapTimeline = function(p_data, p_name) {
    var p_name = p_name || '';
    YdObject.call(this);
    this.dict = {
        type: 'map',
        name: p_name,
        data: p_data
    };
};
YdMapTimeline.prototype = new YdObject();

var YdMapColor = function(p_map_name) {
    this.dict = {
        areaColor: '#323c48',
        borderColor: '#3B5077',
        // borderColor: '#323c48'
    };
    return this;
};
YdMapColor.prototype = new YdObject();
YdMapColor.prototype.areaColor = function(value) {
    this.dict.areaColor = value;
    return this;
};
YdMapColor.prototype.borderColor = function(value) {
    this.dict.borderColor = value;
    return this;
};
YdMapColor.prototype.emp = function(value) {
    this.areaColor('#2B91B7');
    // this.areaColor('#323c48');
    return this;
};

///////////////////////////////////////////////////////////
//
//      YdGeo
//
///////////////////////////////////////////////////////////


var YdGeo = function(p_map_name) {
    this.dict = {
        show: true,
        map: p_map_name,
        // label: {
        //     normal: {
        //         show: false
        //     },
        //     emphasis: {
        //         show: false,
        //     }
        // },
        roam: false,
        itemStyle: {
            normal: new YdMapColor().get(),
            emphasis: new YdMapColor().emp().get()
        },
        // center: [115.97, 29.71],
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto'
    };
    return this;
};
YdGeo.prototype = new YdObject();
YdGeo.prototype.TBLR = function(value) {
    this.att('left', value.left);
    this.att('right', value.right);
    this.att('top', value.top);
    this.att('bottom', value.bottom);
    return this;
};
YdGeo.prototype.TB = function(value) {
    this.att('top', value.top);
    this.att('bottom', value.bottom);
    return this;
};
YdGeo.prototype.LR = function(value) {
    this.att('left', value.left);
    this.att('right', value.right);
    return this;
};
YdGeo.prototype.T = function(value) {
    this.att('top', value);
    return this;
};
YdGeo.prototype.B = function(value) {
    this.att('bottom', value);
    return this;
};
YdGeo.prototype.L = function(value) {
    this.att('left', value);
    return this;
};
YdGeo.prototype.R = function(value) {
    this.att('right', value);
    return this;
};
YdGeo.prototype.color = function(value) {
    this.dict.itemStyle.normal.areaColor = value;
    return this;
};
YdGeo.prototype.colorEmp = function(value) {
    this.dict.itemStyle.emphasis.areaColor = value;
    return this;
};
YdGeo.prototype.hide = function() {
    this.dict.itemStyle.normal.borderColor = this.dict.itemStyle.normal.areaColor;
    this.dict.itemStyle.emphasis.areaColor = this.dict.itemStyle.normal.areaColor;
    this.dict.itemStyle.emphasis.borderColor = this.dict.itemStyle.normal.areaColor;
    return this;
};

///////////////////////////////////////////////////////////
//
//      YdScatter
//
///////////////////////////////////////////////////////////

var YdScatter = function() {
    YdObject.call(this);
    this.dict = {
        type: 'scatter',
        coordinateSystem: 'geo'
    };  
};
YdScatter.prototype = new YdObject();

var YdScatterSize = function(p_data, f_size, p_type, p_offset, p_color, p_opacity) {YdObject.call(this);
    var p_opacity = p_opacity || 1;
    this.dict = {
        // name: '点',
        type: 'scatter',
        coordinateSystem: 'geo',
        
        symbol: p_type, // 显示红色水滴
        symbolSize: function(p_value) {
            return f_size(p_value[2]);
        },
        itemStyle: {
            normal: {
                color: p_color, //标志颜色
                opacity: p_opacity
            }
        },
        // zlevel: 6,
        data: p_data,
        symbolOffset: p_offset
    }; 
};
YdScatterSize.prototype = new YdObject();
YdScatterSize.prototype.label = function(p_value_pos, p_position, p_fontSize, p_offset) {
    var p_value_pos = p_value_pos || 2;
    var p_position = p_position || 'inside';
    var p_fontSize = p_fontSize || 20;
    var p_offset = p_offset || [0, 0];

    // this.dict.label.normal.show = true;
    var f_formatter = function (param) {
        return param.value[p_value_pos];
    };
    var p_color = '#fff';
    this.dict.label = new YdLabel(f_formatter, p_color, p_fontSize, p_position, p_offset).get();
    return this;
};

var YdScatterVisualMap = function(p_data, p_size, p_type, p_offset, p_opacity) {YdObject.call(this);
    var p_opacity = p_opacity || 1;
    this.dict = {
        // name: '点',
        type: 'scatter',
        coordinateSystem: 'geo',
        
        symbol: p_type, // 显示红色水滴
        symbolSize: function(p_value) {
            return p_size;
        },
        itemStyle: {
            normal: {
                opacity: p_opacity
            }
        },
        // zlevel: 6,
        data: p_data,
        symbolOffset: p_offset,
        // visualMap: true
    }; 
};
YdScatterVisualMap.prototype = new YdObject();
YdScatterVisualMap.prototype.label = function(p_position, p_offset, p_fontSize) {
    var p_fontSize = p_fontSize || 20;
    var p_position = p_position || 'inside';
    var p_offset = p_offset || [0, 0];

    // this.dict.label.normal.show = true;
    var f_formatter = function (param) {
        return param.value[3];
    };
    var p_color = '#fff';
    this.dict.label = new YdLabel(f_formatter, p_color, p_fontSize, p_position, p_offset).get();
    return this;
};

///////////////////////////////////////////////////////////
//
//      YdChartCurves
//
///////////////////////////////////////////////////////////


var YdChartCurvesEffect = function() {
    YdObject.call(this);
    this.dict = {
        show: true,
        period: 4, //箭头指向速度，值越小速度越快
        trailLength: 0.21, //特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: "circle", //箭头图标
        symbolSize: 5 //图标大小，宽度
    };  
};
YdChartCurvesEffect.prototype = new YdObject();

var YdChartCurvesStyle = function() {
    YdObject.call(this);
    this.dict = {
        width: 2,   //线的宽度
        opacity: 0.6,
        curveness: 0.55,
        color: '#eee'
    };  
};
YdChartCurvesStyle.prototype = new YdObject();


var YdChartCurves = function() {
    YdObject.call(this);
    this.effect = new YdChartCurvesEffect();
    this.normal_os_applStyle = new YdChartCurvesStyle();

    var f_formatter = f_formatter || function(param){
        var str = '';
        var f_last_char = function(p_string) {
            var char = p_string.charAt(p_string.length - 1);
            return char;
        }
        var char = f_last_char(param.seriesId);
        // if (param.dataIndex == 0) {
        // if (param.seriesIndex == 0) {
        if ((char == '0') && (param.dataIndex == 0)) {
            str = param.seriesName;
        }
        return str;
    };
    var p_color = '#0033FF';
    var p_position = 'start';
    var p_fontSize = 20;
    this.label = new YdLabel(f_formatter, p_color, p_position, p_fontSize);

    this.dict = {
        coordinateSystem: "geo",
        geoIndex: 0,
        type: "lines",
        zlevel: 10,
        effect: this.effect.get(),
        lineStyle: {
            normal: this.normal_os_applStyle.get()
        },
        label: this.label.get(),
        data: []
    };  
};
YdChartCurves.prototype = new YdObject();
YdChartCurves.prototype.constructor = YdChartCurves;
YdChartCurves.prototype.period = function(value) {
    this.effect.att('period', value);
    return this;
};
YdChartCurves.prototype.trailLength = function(value) {
    this.effect.att('trailLength', value);
    return this;
};
YdChartCurves.prototype.symbolSize = function(value) {
    // this.dict.effect.symbolSize = value;
    this.effect.att('symbolSize', value);
    return this;
};
YdChartCurves.prototype.color = function(value) {
    // this.dict.lineStyle.normal.color = value;
    this.normal_os_applStyle.att('color', value);
    return this;
};
YdChartCurves.prototype.widthPixel = function(value) {
    // this.dict.lineStyle.normal.width = value;
    this.normal_os_applStyle.att('width', value);
    return this;
};
YdChartCurves.prototype.width = function(value) {
    var f_os_appl_s_width = function(p_value) {
        var min_px = 1;
        var max_px = 10;
        var min_value = 0;
        var max_value = 1;
        var new_value = (p_value - min_value) / (max_value - min_value) * (max_px - min_px) + min_px;
        return new_value;
    };
    var t_width = f_os_appl_s_width(value);
    this.normal_os_applStyle.att('width', t_width);
    return this;
};
YdChartCurves.prototype.opacity = function(value) {
    // this.dict.lineStyle.normal.opacity = value;
    this.normal_os_applStyle.att('opacity', value);
    return this;
};
YdChartCurves.prototype.curveness = function(value) {
    // this.dict.lineStyle.normal.curveness = value;
    this.normal_os_applStyle.att('curveness', value);
    return this;
};
YdChartCurves.prototype.label_show = function(value) {
    this.label.att('show', value);
    return this;
};
YdChartCurves.prototype.label_fontSize = function(value) {
    // this.dict.label.fontSize = value;
    this.label.att('fontSize', value);
    return this;
};
YdChartCurves.prototype.arrow = function() {
    this.dict.symbol = 'arrow';
    this.dict.symbolSize = this.normal_os_applStyle.getAtt('width') * 5;
    // this.dict.symbolOffset = [0, '50%'];
    return this;
};


///////////////////////////////////////////////////////////
//
//      YdMapOps
//
///////////////////////////////////////////////////////////


function YdMapOps(){
    return {
        GetScatterDicts: function (p_dicts) {
            var t_dicts = [];
            for (var i = 0; i < p_dicts.length; i++) {
                var names = [p_dicts[i].name];
                var geoCoord = new YdPosition().getPosition(names)[0];
                if (geoCoord) {
                    t_dicts.push({
                        name: p_dicts[i].name,
                        // value: geoCoord.concat(p_dicts[i].value)
                        value: geoCoord.concat([p_dicts[i].value, p_dicts[i].name])     // 值，国家名字 20191211
                    });
                }
            }
            return t_dicts;
        },
        GetLineDicts: function(p_os_appl_mat){
            var t_os_appl_dicts = [];
            for (var i = 0; i < p_os_appl_mat.length; i++) {
                var t_os_appl_list = p_os_appl_mat[i];
                var t_from_coord = new YdPosition().getPosition([t_os_appl_list[0]])[0];
                var t_to_coord = new YdPosition().getPosition([t_os_appl_list[2]])[0];
                if (t_from_coord && t_to_coord) {
                    t_os_appl_dicts.push({
                        coords: [t_from_coord, t_to_coord],
                        value: [t_os_appl_list[0], t_os_appl_list[2], t_os_appl_list[1]],
                        // value: '向' + t_os_appl_list[2] + '布局专利' + t_os_appl_list[1] + '件'
                    });
                }else{
                    debugger;
                }
            }

            // 分组依据
            var t_from_list = new Yd_mat().init(p_os_appl_mat).bldClist(0).get();


            if(t_from_list.length != t_os_appl_dicts.length){
                debugger;
            }

            // 分组
            var t_from_dicts_dict = {};
            for (var i = 0; i < t_from_list.length; i++) {
                var t_name = t_from_list[i];
                t_from_dicts_dict[t_name] = [];
            }

            for (var i = 0; i < t_from_list.length; i++) {
                var t_name = t_from_list[i];
                t_from_dicts_dict[t_name].push(t_os_appl_dicts[i]); 
            }


            // 各组变成各个serie
            var t_series = [];
            t_color_map = new YdColors().getWorldColors();

            for (var t_name in t_from_dicts_dict) {
                
                var t_serie = new YdChartCurves().widthPixel(5).opacity(0.03).curveness(0.15)
                            .att('data',t_from_dicts_dict[t_name]).color(t_color_map[t_name]).att('polyline', false)
                            .att('name',t_name).get();
                t_series.push(t_serie);
            }

            return t_series;
        }
    };
}
