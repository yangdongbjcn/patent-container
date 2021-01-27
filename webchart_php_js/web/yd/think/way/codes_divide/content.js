var setting = {	};

var zNodes =[
	{ name:"DREAM", open:true,
		children: [
			{ name:"DESIGN",
				children: [
					{ name:"Logo"},
					{ name:"Film"},
					{ name:"Home"}
				]},
			{ name:"autodriving",
				children: [
					{ name:"Baidu"},
					{ name:"Waymo"},
					{ name:"Lidar"},
					{ name:"Tesla"},
					{ name:"V2X"}
				]},
			{ name:"Web",
				children: [
					{ name:"DXB"},
					{ name:"Patent"},
					{ name:"way"},
					{ name:"WX"}
				]},
			{ name:"Map", isParent:true},
			{ name:"AIKIDO", isParent:true},
			{ name:"Write", isParent:true}
		]},
	{ name:"LIFE", 
		children: [
			{ name:"EXERCISE", isParent:true},
			{ name:"FAMILY", isParent:true},
			{ name:"HEALTH", isParent:true},
			{ name:"HOUSE", isParent:true},
			{ name:"INDOOR", isParent:true},
			{ name:"OUTDOOR", isParent:true},
			{ name:"TRAVEL", isParent:true},
			{ name:"VA", isParent:true}
		]},
	{ name:"THINK", 
		children: [
			{ name:"BELIEF", isParent:true},
			{ name:"WORLD", isParent:true},
			{ name:"军事", isParent:true},
			{ name:"经济", isParent:true},
			{ name:"历史", isParent:true},
			{ name:"法律", isParent:true},
			{ name:"建筑", isParent:true},
			{ name:"科学", isParent:true}
		]},
	{ name:"WORK", 
		children: [
			{ name:"CAREER", isParent:true},
			{ name:"PATENT", isParent:true},
			{ name:"STUDY", isParent:true}
		]}
];

$(document).ready(function(){

	$.fn.zTree.init($("#treeDemo"), setting, zNodes);

});