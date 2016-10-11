$(function(){
	$(".txt").mouseenter(function() {
		$(".txt").val("");
	});
	$(".txt").mouseleave(function() {
		$(".txt").val("商品名称/货号");
	});
    $(".txt").focus(function() {
		$(this).addClass("active");
	});
	$(".txt").blur(function() {
		$(this).removeClass("active");
	});
	//shopcart
	$(".header_right").mouseenter(function() {
		$(this).addClass("active");
	});
	$(".header_right").mouseleave(function() {
		$(this).removeClass("active");
	});

	//aside侧边栏
	$.get("../json/aside.json", function(data) {
		var html = "";
		var picHtml = "";
		$.each(data, function(i, o) {
			var html1 = "";
			var html2 = "";
			for(var j = 0; j < o.kinds.length; j++) {
				html1 += "<a href=\"###\">" + o.kinds[j] + "</a>";
			}
			if(o.more) {
				for(var n = 0; n < o.more.length; n++) {
					var aHtml = "";
					var html4 = "";
					if(o.more[n].h4) {
						html4 = "<h4>" + o.more[n].h4 + "</h4>";
					} else {
						html4 = "<h3>" + o.more[n].h3 + "</h3>";
					}
					for(var m = 0; m < o.more[n].a.length; m++) {
						if(ManagerReg.redWine.test(o.more[n].a[m])) {
							Aclass = "red";
						} else {
							Aclass = "";
						}
						aHtml += "<a href=\"###\" class=" + Aclass + ">" + o.more[n].a[m] + "</a>";
					}
					html2 += html4 + aHtml;
				}
			} else {
				html2 = "";
			}
			html += "<li class=\"li" + i + "\">" +
				"<h3><a href=\"###\">" + o.name + "</a></h3>" +
				"<p>" + html1 + "</p>" +
				"<div class=\"shopContent\">" +
				html2 +
				"</div>" +
				"</li>";
		});
		$(".aside").html(html);
		//add  mouseenter
		$(".aside>li").mouseenter(function() {
			if($(this).index() != 0) {
				var index = $(this).index();
				$(".shopContent").css("display", "none");
				$(".shopContent").eq(index).css("display", "block");
			}
		});
		//add mouseleave
		$(".aside>li").mouseleave(function() {
			if($(this).index() != 0) {
				var index = $(this).index();
				$(".shopContent").eq(index).css("display", "none");
			}
		});
	});
	
	 $(".rightSide>li:last").click(function(){
    	$("body").animate({
    		scrollTop:0
    	},400);
    });
});
