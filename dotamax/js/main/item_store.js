/*
	created by ghost on 2016.4.7
 * 
 * */

var offset = 0,
	task_id = 0;
	listInit = false,
    itemStoreUrl = apiRootUrl + "api/bets/get_sell_eitem_list_data/",
    paramStr = _DOTAMAX.getUrlParam(window.location.href,true);
$.fn.loadData = function(config){
	task_id += 1;
	var c_task_id = task_id;
	config = config||{};
	var myDate = new Date(),
		time = new Date().getTime(),
		_this = this,
        limit = config.limit||16,
        isList = config.isList||false,
        url = config.url,
        paramStr = config.paramStr,
        pkey = config.pkey,
        render = config.render,
        callback = config.callback,
        extend = config.extend||false,
        //筛选参数
        item_name = config.item_name,
    	hero = config.hero,
    	rarity = config.rarity,
    	quality = config.quality,
    	steam_id = config.steam_id,
    	//排序参数
    	sort_by = config.sort_by||"",
    	sort_order = config.sort_order||"";
    loading();
    function loadHtml(data){
        var html = render({result:data});
		if(c_task_id==task_id){
			if(listInit){
				$(this).empty();
				$("#item-list-loading").hide();
			}
			html&&$(_this).append(html);
        	$("#loadMore .txt").show();
        	$("#loadMore .loading-circle").hide();
        	loadMoreFinished = true;
		}
    }
    function loading(){
        var paramArr = [];
        if(isList){
        	offset?paramArr.push("offset="+offset):false;
        	limit?paramArr.push('limit='+limit):false;
        	item_name?paramArr.push('item_name='+item_name):false;
            hero?paramArr.push('hero_img_name='+hero):false;
            rarity?paramArr.push('rarity='+rarity):false;
            quality?paramArr.push('quality='+quality):false;
            sort_by?paramArr.push('sort_by='+sort_by):false;
            sort_order?paramArr.push('sort_order='+sort_order):false;
        }
        pkey?paramArr.push('pkey='+pkey):false;
        paramStr?paramArr.push(paramStr):false;
        time?paramArr.push('time='+time):false;
        testSwitch&&console.log(url+(paramArr.length?'?'+paramArr.join("&"):''));
        $.post(url+(paramArr.length?'?'+paramArr.join("&"):''),function(json,status){
        	var data = json.result;
            if(isList)offset+=data.length||0;
        	if(extend)ajaxJson = json.result;
            loadHtml(data);
            $(".loading-main").fadeOut(300);
	        $(".layout-container").fadeIn(300);
	        $(".footer").show();
            if(data.length==0){//判断是否全部显示
                allShow = true;
                $("#loadMore .txt").html("已显示全部");
            }
            callback&&callback instanceof Function?callback():false;
        });
    }
}










