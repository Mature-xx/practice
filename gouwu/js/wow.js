

$(function(){
    var index=0;
    var adTimer=null;
    var len=$(".jnImageroll div a").length;

	// 搜索框回车提示
	$('#inputSearch').keyup(function(e){
		if(e.which==13){
           alert('wow!');
		}
	});

	//大屏滚动
	$('.jnImageroll div a').mouseover(function(){
		  index=$(".jnImageroll div a").index(this);
          showImg(index);
	}).eq(0).mouseover();
        // 自动滚动
    $('.jnImageroll').hover(function(){
			if(adTimer){ 
				clearInterval(adTimer);
			}
		 },function(){
			adTimer = setInterval(function(){
			    showImg(index);
				index++;
				if(index==len){index=0;}
			} , 5000);
	}).trigger("mouseleave");

//鞋子滚动

   $("#jnBrandTab ul li a").click(function(){
   	  $(this).parent().addClass("chos")
   	                  .siblings().removeClass("chos");
   	   var idx=$("#jnBrandTab ul li a").index(this);
   	   showBrand(idx);
   	   return false;               
   }).eq(0).click();

 $("#jnBrandList ul li").each(function(index){
		var $img = $(this).find("img");
		var img_w = $img.width();
		var img_h = $img.height();
		var spanHtml = '<span style="position:absolute;top:0;left:5px;width:'+img_w+'px;height:'+img_h+'px;" class="imageMask"></span>';
		$(spanHtml).appendTo(this);
	});
 
 $("#jnBrandList").find(".imageMask").hover(function(){
 	$(this).toggleClass('imageOver');
 })

});

function showImg(index){
	var $rollimg=$('.jnImageroll');
	var $rolllist=$rollimg.find('div a');
	var newhref=$rolllist.eq(index).attr("href");
	$("#imageScroll").attr("href",newhref)
	                 .find("img").eq(index).stop(true,true).fadeIn()
	                 .siblings().fadeOut();
	$rolllist.removeClass("chos").css("opacity","0.7")
	         .eq(index).addClass("chos").css("opacity","1");                        
}

function showBrand(index){
	var $rollobj=$("#jnBrandList");
	var rollwidth=$rollobj.find("li").outerWidth();
	rollwidth=rollwidth*4;
	$rollobj.stop(true,false).animate({left: -rollwidth*index},1000);
}