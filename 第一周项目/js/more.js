$(function(){
	$.get("../json/html0201.json",function(data){
		var html = "";
		$.each(data,function(i,o){
			for(var j=0;j<o.one.length;j++){
				var spanHtml = "";
				if(o.one[j].position){
					if(o.one[j].position=="新品"){
						spanHtml = "<u></u>";
					}else if(o.one[j].position=="热销"){
						spanHtml = "<u class=\"hotGoods\"></u>";
					}else{
						spanHtml = "<u class=\"countGoods\"></u>";
					}
				}else{
					spanHtml = "";
				}
				
				html += "<dl>"
					+"<dt>"
					    +"<a href=\"###\"><img src=\""+o.one[j].img+"\"/></a>"
					    + spanHtml
					+"</dt>"
					+"<dd>"
						+"<p><strong>￥"+o.one[j].strong+"</strong><i>￥"+o.one[j].span+"</i></p>"
						+"<p>"
							+"<a href=\"###\">"+o.one[j].name+"</a>"
						+"</p>"
					+"</dd>"
					+"<dd>"
						+"<span>销售:<i>"+o.one[j].sale+"</i></span>"
						+"<span>评论：<em>"+o.one[j].num+"</em></span>"
						+"<span></span>"
					+"</dd>"
				+"</dl>";
			}
		});
		$(".show_items").html(html);
	});
	
	
	//bind-event
	var flagIn = true;
	$(".showOrder>li").click(function(){
		if(flagIn){
			$(".showOrder>li").removeClass()
		    $(this).addClass("up");
		    flagIn = false;
		    //$(this).children().attr("href","more.html");
		    //location.href = "more.html";
		    
		}else{
			$(".showOrder>li").removeClass()
			$(this).addClass("down");
			flagIn = true;
		}
	});
	  
	 //Hsearch
	 $(".search_items").click(function(e){
	 	 if($(e.target).get(0).tagName=="A"){
	 	 	 var txt = $(e.target).html();
	 	 	 $(".pContent").html(txt);
	 	 	 //$(".search_items>ul>li>a").removeClass("active");
	 	 	 $(e.target).parent().parent().children().children().removeClass("active");
	 	 	 $(".hSearch li>a :not(:first)").removeClass("active");
	 	 	 $(e.target).addClass("active");
	 	 }
	 });
});
