$(function() {
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
	$.get("json/aside.json", function(data) {
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

	//aside right
	$(".positn>p>a").mouseenter(function(e) {
		$(this).stop().animate({
			"paddingLeft": "10px"
		}, 400);
	});
	$(".positn>p>a").mouseleave(function(e) {
		$(this).stop().animate({
			"paddingLeft": "0px"
		}, 400);
	});

	//lunbo
	var index = 0;
	var timeId;
	var Play = function() {
		$(".lunbo>a").stop().fadeOut(600);
		$(".lunbo>a").eq(index).stop().fadeIn(600);
		$(".lunbo_back>ul>li").removeClass("active");
		$(".lunbo_back>ul>li").eq(index).addClass("active");
	}
	$.get("json/lunbo.json", function(data) {
		var html = "";
		var html2 = "";
		$.each(data, function(i, o) {
			html += "<a href=\"" + o.targetSrc + "\"><img src=\"" + o.imgSrc + "\"/></a>";
			html2 += "<li>" + (i + 1) + "</li>";
		});
		$(".lunbo").html(html);
		$(".lunbo_back>ul").html(html2);
		//按钮进入事件

		$(".lunbo>a").eq(0).show();
		$(".lunbo_back>ul>li").eq(0).addClass("active");

		$(".lunbo_back>ul>li").mouseover(function(e) {
			index = $(this).index();
			Play();
		});

		//实现轮播
		function autoPlay() {
			timeId = setInterval(function() {
				index++;
				//console.log($("lunbo_back>ul>li").length);
				if(index < 0) {
					index = 4;
				}
				if(index > 4) {
					index = 0;
				}
				Play();
			}, 3000);
		}
		$(".lunbo").mouseenter(function() {
			clearInterval(timeId);
		});
		$(".lunbo").mouseleave(function() {
			autoPlay();
		});
		autoPlay();
	});

	//倒计时
	var data1 = new Date("2016/11/5 23:23:23").getTime();
	//console.log(data1);
	var getTime = function() {
		var data2 = new Date().getTime();
		var time = data1 - data2;
		var seconds = parseInt(time / 1000);
		var second = seconds % 60;
		var minutes = parseInt(seconds / 60);
		var hours = parseInt(minutes / 60);
		var minute = minutes % 60;
		var days = parseInt(hours / 24);
		var hour = hours % 24;
		$(".yel").eq(0).html(days);
		$(".yel").eq(1).html(hour);
		$(".yel").eq(2).html(minute);
		$(".yel").eq(3).html(second);
	}
	setInterval(function() {
		getTime();
	}, 1000);

	//hot-tabShow
	$.get("json/hot.json", function(data) {
		var html = "";
		var div = $("<div></div>");
		$.each(data, function(i, o) {
			var html2 = "";
			for(var j = 0; j < o.length; j++) {
				html2 += "<dl>" +
					"<dt><a href=\"###\"><img src=\"" + o[j].imgSrc + "\"/></a></dt>" +
					"<dd class=\"d_top\"><a href=\"###\">" + o[j].d1 + "</a></dd>" +
					"<dd class=\"d_center\"><i>￥" + o[j].I + "元</i><span>￥" + o[j].span + "元</span></dd>" +
					"<dd class=\"d_bottom\">售出：" + o[j].d3 + "<span>好评：" + o[j].d3Span + "</span></dd>" +
					"</dl>";
			}
			html += "<div class=\"tabShow\">" + html2 + "</div>";
		});
		div.html(html);
		$(div).appendTo(".hot_right");
		$(".tabShow").eq(0).show();

		$(".hot_right>ul>li").mouseenter(function() {
			var liIndex = $(this).index();
			$(".hot_right>ul>li").removeClass("active");
			$(this).addClass("active");
			$(".tabShow").hide();
			$(".tabShow").eq(liIndex).show();
		});
	});

	//like
	$.get("json/like.json", function(data) {
		var length = data.length;
		var index = 0;
		setTimeout(function() {
			$(".change").click();
		}, 1);
		$(".change").click(function() {
			var arr = [];
			var html = "";
			for(var j = 0; j < length; j++) {
				index = parseInt(Math.random() * length);
				if(arr.indexOf(index) == -1) {
					arr.push(index);
				}
				if(arr.length > 3) {
					//console.log(arr);
					break;
				}
			}
			for(var n = 0; n < arr.length; n++) {
				html += "<dl>" +
					"<dt><a href=\"###\"><img src=\"" + data[arr[n]].img + "\"/></a></dt>" +
					"<dd>" +
					"<p><a href=\"###\">" + data[arr[n]].name + "</a></p>" +
					"<p>类型：" + data[arr[n]].style + "</p>" +
					"<p>产地：" + data[arr[n]].from + "</p>" +
					"<p>品种：" + data[arr[n]].kinds + "</p>" +
					"<p><strong>￥" + data[arr[n]].strong + "</strong><span>￥" + data[arr[n]].span + "</span></p>" +
					"</dd>" +
					"</dl>";
			}
			$(".likeOne").html(html);
		});
	});

	//1F
	$.get("json/floor1.json", function(data) {
		$.each(data, function(i, o) {
			var html1 = "";
			var CenterTopHtml = "";
			var CenterBottomHtml = "";
			var bottomHtml = "";
			var rightHtml = "";
			var spanBtn = "";
			//left-pics
			for(var n = 0; n < o.left.length; n++) {
				html1 += "<li><a href=\"###\"><img src=\"" + o.left[n] + "\"/></a></li>";
				spanBtn += "<span></span>";
			}
			//center-top
			for(var m = 0; m < o.center_top.length; m++) {
				CenterTopHtml += "<dl class=\"redWine_dl\">" +
					"<dt>" +
					"<a href=\"###\"><img src=\"" + o.center_top[m].img + "\"/></a>" +
					"<p></p>" +
					"</dt>" +
					"<dd><a href=\"###\">" + o.center_top[m].name + "</a></dd>" +
					"<dd><strong>￥" + o.center_top[m].strong + "</strong><span>￥" + o.center_top[m].span + "</span></dd>" +
					"</dl>";
				//center-bottom
				CenterBottomHtml += "<dl class=\"redWine_dl2\">" +
					"<dt><a href=\"###\"><img src=\"" + o.center_bottom[m].img + "\"/></a></dt>" +
					"<dd><a href=\"###\">" +
					"<i>" + o.center_bottom[m].name + "</i>" +
					"<strong>￥" + o.center_bottom[m].strong + "</strong>" +
					"</a></dd>" +
					"</dl>";
			}

			//right
			for(var j = 0; j < o.right.length; j++) {
				rightHtml += "<li>" +
					"<p class=\"num\">" + (j + 1) + "</p>" +
					"<a href=\"###\" class=\"right_a\">" +
					"<img src=\"" + o.right[j].img + "\"/>" +
					"<p>" + o.right[j].name + "</p>" +
					"<em>销售： <i>" + o.right[j].sale + "</i></em>" +
					"<strong>￥" + o.right[j].strong + "</strong><span>￥" + o.right[j].span + "</span>" +
					"</a>" +
					"</li>";
			}

			//bottom
			for(var k = 0; k < o.bottom.length; k++) {
				bottomHtml += "<a href=\"###\"><img src=\"" + o.bottom[k] + "\"/></a>";
			}
			if(i == 0) {
				$(".floor2>.redWine_left>ul").html(html1);
				$(".floor2>.redWine_left>.btn_n").html(spanBtn);
				$(".floor2>.redWine_center").html(CenterTopHtml + CenterBottomHtml);
				$(".floor2>.redWine_right>ul").html(rightHtml);
				$(".floor2>.redWine_bottom").html(bottomHtml);
			} else {
				$(".floor3>.redWine_left>ul").html(html1);
				$(".floor3>.redWine_left>.btn_n").html(spanBtn);
				$(".floor3>.redWine_center").html(CenterTopHtml + CenterBottomHtml);
				$(".floor3>.redWine_right>ul").html(rightHtml);
				$(".floor3>.redWine_bottom").html(bottomHtml);
			}
		});

		//left btn-event
		$(".btn_n>span").eq(0).addClass("active");
		$(".floor3>.redWine_left>.btn_n>span").eq(0).addClass("active");
		var btn2 = $(".floor3>.redWine_left>.btn_n>span");
		var btn1 = $(".floor2>.redWine_left>.btn_n>span");
		var redWine_left2 = $(".floor3>.redWine_left>ul");
		var redWine_left1 = $(".floor2>.redWine_left>ul");
		var rightUl2 = $(".floor3>.redWine_right>ul");
		var rightUl1 = $(".floor2>.redWine_right>ul");
		var index1 = 0;
		var index2 = 0;

		/*var play1 = function(btn, ul) {
			$(".btn_n>span").removeClass("active");
			$(".btn_n>span").eq(index1).addClass("active");
			$(".redWine_left>ul").stop().animate({
				left: -index1 * 190
			}, 400);
		}*/
        var play1 = function(btn, redWine, indexs) {
				btn.removeClass("active");
				btn.eq(indexs).addClass("active");
				redWine.stop().animate({
					left: -indexs * 190
				}, 400);
			}
        
        var timeId1;
			var timeId2;

			function autoPlay1() {
				timeId1 = setInterval(function() {
					index1++;
					if(index1 > 1) {
						index1 = 0;
					}
					if(index1 < 0) {
						index1 = 1;
					}
					play1(btn1, redWine_left1, index1);
				}, 3000);
			}

			function autoPlay2() {
				timeId2 = setInterval(function() {
					index2++;
					if(index2 > 1) {
						index2 = 0;
					}
					if(index2 < 0) {
						index2 = 1;
					}
					play1(btn2, redWine_left2, index2);
				}, 3000);
			}
			autoPlay1();
			autoPlay2();
			redWine_left1.mouseenter(function() {
				clearInterval(timeId1);
			});
			redWine_left1.mouseleave(function() {
				autoPlay1();
			});
			redWine_left2.mouseenter(function() {
				clearInterval(timeId2);
			});
			redWine_left2.mouseleave(function() {
				autoPlay2();
			});
		var getChage = function(btn, redWine, ul, indexs) {
			btn.mouseenter(function() {
				indexs = $(this).index();
				play1(btn, redWine, indexs);
			});
			//console.log(redWine);
			
			//center-top
			$(".redWine_dl").mouseenter(function() {
				$(this).children(0).children(0).children().css("opacity", "0.5");
			});
			$(".redWine_dl").mouseleave(function() {
				$(this).children(0).children(0).children().css("opacity", "1");
			});

			//1F-right
			ul.children().eq(0).addClass("active");
			ul.children().mouseenter(function() {
				ul.children().removeClass("active");
				$(this).addClass("active");
			});
		}
		getChage(btn1, redWine_left1, rightUl1, index1);
		getChage(btn2, redWine_left2, rightUl2, index2);
	});
   
    //4F
    $.get("json/floor4.json",function(data){
    	//title
    	var hHtml = "";
    	//center-dl
    	var dlHtml = "";
    	//right
    	var rightHtml = "";
    	 $.each(data,function(i,o){
    	 	var liHtml = "";
    	 	for(var j=0;j<o.taste.length;j++){
    	 		liHtml += "<li>"+o.taste[j]+"</li>";
    	 	}
    	 	 hHtml += o.title
        			+"<ul class=\"right\">"
        			   + liHtml
        			+"</ul>";
        			//console.log(o.taste.length);
           
            //center
    	 for(var n=0;n<o.dl.length;n++){
    	 	dlHtml += "<dl>"
        				+"<dt><a href=\"###\"><img src=\""+o.dl[n].img+"\"/></a></dt>"
        				+"<dd>"
        					+"<p><a href=\"###\">"+o.dl[n].name+"</a></p>"
        				    +"<span><i>"+o.dl[n].i+":</i>"+o.dl[n].span+"</span>"
        				+"</dd>"
        			+"</dl>";
    	 }
    	 
    	 //right
    	 for(var m=0;m<o.rightUl.length;m++){
    	 	var sHtml = "";
    	 	for(var s=0;s<o.rightUl[m].length;s++){
    	 		sHtml += "<li><a href=\"###\">"+o.rightUl[m][s]+"</a></li>";
    	 	}
    	 	rightHtml += "<ul>" + sHtml +"</ul>";
    	 }
    	 });
    	 
    	 $(".tast>h4").html(hHtml);
    	 $(".tast_left").html(dlHtml);
    	 $(".tast_right").html(rightHtml);
    	 
    	 //bind-event
    	 $(".tast_right>ul").eq(0).show();
    	 $(".right>li").eq(0).addClass("active");
    	 $(".right").mouseover(function(e){
    	 	 $(".right>li").removeClass("active");
    	 	 var index = $(e.target).index();
    	 	 $(e.target).addClass("active");
    	 	 $(".tast_right>ul").hide();
    	 	 $(".tast_right>ul").eq(index).show();
    	 });
    });
    
    $.get("json/friendLink.json",function(data){
    	var htmlI = "";
    	var htmlA = "";
    	$.each(data,function(i,o){
    		if(i==0){
    			htmlI = "<i style=\"color:#999; font-weight:bold; margin-right:4px\">"+o+"：</i>";
    		}else{
    			htmlA += "<a href=\"###\">"+o+"</a>";
    		}
    	});
    	$(".friendLink").html(htmlI+htmlA);
    });
    
    $(".rightSide>li:last").click(function(){
    	$("body").animate({
    		scrollTop:0
    	},400);
    });
});