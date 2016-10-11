var qu_car=1;
var vh=$(window).height();
var vw=$(window).width();
var page_h=document.domain;
var isIE6=navigator.appVersion.indexOf("MSIE 6")>-1;
var pez="top=100,left=100,width=735,height=402,location=yes,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no";
(function(a){a.fn.Qlazyload=function(b,c){if(this.length){var d,e,f=a.extend({type:null,offsetParent:null,source:"src2",threshold:100},b||{}),g=this,h=function(a){for(var b=a.scrollLeft,c=a.scrollTop,d=a.offsetWidth,e=a.offsetHeight;a.offsetParent;)b+=a.offsetLeft,c+=a.offsetTop,a=a.offsetParent;return{left:b,top:c,width:d,height:e}},i=function(){var a=document.documentElement,b=document.body,c=window.pageXOffset?window.pageXOffset:a.scrollLeft||b.scrollLeft,d=window.pageYOffset?window.pageYOffset:a.scrollTop||b.scrollTop,e=a.clientWidth,f=a.clientHeight;return{left:c,top:d,width:e,height:f}},j=function(a,b){var c,d,e,g,h,i,j=f.threshold?parseInt(f.threshold):0;return c=a.left+a.width/2,d=b.left+b.width/2,e=a.top+a.height/2,g=b.top+b.height/2,h=(a.width+b.width)/2,i=(a.height+b.height)/2,Math.abs(c-d)<h+j&&Math.abs(e-g)<i+j},k=function(a,b,d){a&&(d.attr("src",b).removeAttr(f.source),c&&c(b,d))},l=function(b,d,e){if(b){var g=a("#"+d);g.html(e.val()).removeAttr(f.source),e.remove(),c&&c(d,e)}},m=function(a,b,d){a&&(d.removeAttr(f.source),c&&c(b,d))},n=function(){e=i(),g=g.filter(function(){return a(this).attr(f.source)}),a.each(g,function(){var b=a(this).attr(f.source);if(b){var c=f.offsetParent?h(a(f.offsetParent).get(0)):e,d=h(this),g=j(c,d);switch(f.type){case"image":k(g,b,a(this));break;case"textarea":l(g,b,a(this));break;case"module":m(g,b,a(this))}}})},o=function(){g.length>0&&(clearTimeout(d),d=setTimeout(function(){n()},10))};n(),f.offsetParent?a(f.offsetParent).bind("scroll",function(){o()}):a(window).bind("scroll",function(){o()}).bind("reset",function(){o()})}}})(jQuery);
(function($){
	var ajax = $.ajax;
	var pendingRequests = {};
	var synced = [];
	var syncedData = [];
	$.ajax = function(settings) {
		settings = jQuery.extend(settings, jQuery.extend({}, jQuery.ajaxSettings, settings));
		var port = settings.port;
		switch(settings.mode) {
		case "abort": 
		if(pendingRequests[port]){pendingRequests[port].abort();}
		return pendingRequests[port] = ajax.apply(this, arguments);
		}
		return ajax.apply(this, arguments);
	};
})(jQuery);
function setCookie(name, value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
}
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
}
function jieshou(a){var curl="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAxNDY5Nl8xMjk0MTVfNDAwMDkxNzE4OF8yXw";window.open(curl,'在线客服',pez)}
function addcollect(){var a = "http://www.pinjiu.com/",b = "品酒网";document.all?window.external.AddFavorite(a, b):window.sidebar && window.sidebar.addPanel ? window.sidebar.addPanel(b,a,""):alert("对不起，您的浏览器不支持此操作!请您使用菜单栏或Ctrl+D收藏本站");}
function scheck(obj) {
    var w = obj.keywords.value;
    if (w == "" || w == null) {
        alert("请输入关键字!");
        return false
    }
}
function updateC() {
    if (qu_car == 1) {
        $.ajax({
            url: '/flow.php?step=show_cart_info',
            type: 'GET',
            dataType: 'html',
            beforeSend: function() {
                $("#acar").html("<p class='alC lh35'>加载中，请稍后...</p>")
            },
            success: function(data) {
                $("#acar").html(data);
                qu_car = 0
            }
        })
    }
}
function gotop() {
    $('html,body').stop().animate({
        scrollTop: '0px'
    },
    600)
}
function obj2str(o){
    var r = [];
    if (typeof o == "string") {
        return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    }
    if (typeof o == "undefined") {
        return "undefined";
    }
    if (typeof o == "object") {
        if (o === null) {
            return "null";
        } else if (!o.sort) {
            for (var i in o) {
                if (i != "toJSONString") {
                    r.push("\"" + i + "\"" + ":" + obj2str(o[i]));
                }
            }
            r = "{" + r.join() + "}";
        } else {
            for (var i = 0; i < o.length; i++) r.push(obj2str(o[i]));
            r = "[" + r.join() + "]";
        }
        return r;
    }
    return o.toString();
}
function sendHashMail() {
    $.ajax({
        url: '/user.php?act=send_hash_mail',
        type: 'GET',
        dataType: 'json',
        error: function() {
            alert('Error')
        },
        success: function(data) {
            alert(data.message)
        }
    });
}
function getSelectedAttributes(formBuy) {
    var spec_arr = new Array();
    var j = 0;
    for (i = 0; i < formBuy.elements.length; i++) {
        var prefix = formBuy.elements[i].name.substr(0, 5);
        if (prefix == 'spec_' && (((formBuy.elements[i].type == 'radio' || formBuy.elements[i].type == 'checkbox') && formBuy.elements[i].checked) || formBuy.elements[i].tagName == 'SELECT')) {
            spec_arr[j] = formBuy.elements[i].value;
            j++
        }
    }
    return spec_arr
}
function addToCart(goodsId, parentId, one, isgo) {
    var goods = new Object();
    var spec_arr = new Array();
    var fittings_arr = new Array();
    var number = 1;
    var formBuy = document.forms['ECS_FORMBUY'];
    var quick = 0;
    if (formBuy) {
        spec_arr = getSelectedAttributes(formBuy);
        if (formBuy.elements['number']) {
            number = formBuy.elements['number'].value
        }
        quick = 1
    }
    goods.quick = quick;
    goods.spec = spec_arr;
    goods.goods_id = goodsId;
    goods.number = number;
    goods.isgo = (isgo) ? "1": "0";
    goods.parent = (typeof(parentId) == "undefined") ? 0: parseInt(parentId);
    $.post('/flow.php', {
        step: 'add_to_cart',
        one: one,
        goods: obj2str(goods)
    },
    function(res) {
        if (res.error > 0) {
            if (res.error == 2) {
                if (confirm(res.message)) {
                    alert("对不起该商品缺货，敬请等待...")
                }
            } else if (res.error == 6) {
                alert("请选择商品规格")
            } else {
                alert(res.message)
            }
        } else {
            if (isgo) {
                qwToCart()
            } else {
                cart_url = '/flow.php?step=checkout';
                location.href = cart_url
            }
        }
    },
    'JSON');
}
function pclose() {
    $("#pbox").hide();
    $("#mask").hide();
}
function addPackageToCart(packageId) {
    var package_info = new Object();
    var number = 1;
    package_info.package_id = packageId;
    package_info.number = number;
    $.post('/flow.php', {
        step: 'add_package_to_cart',
        package_info: obj2str(package_info)
    },
    function(result) {
        if (result.error > 0) {
            if (result.error == 2) {
                if (confirm(result.message)) {
                    location.href = '/user.php?act=add_booking&id=' + result.goods_id;
                }
            } else {
                alert(result.message);
            }
        }
        else {
            var cart_url = '/flow.php?step=checkout';
            location.href = cart_url;
        }
    },
    'JSON');
}
function lgout() {
    $.get('/user.php', {
        act: 'ajax_logout'
    },
    function(data) {
        if (data == "TRUE") {
            location.reload();
        }
    },
    'TEXT');
}
function adfav(goodsId){
	$.ajax({
        url: '/user.php?act=collect&id='+goodsId,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            alert(data.message)
        }
    });
}
function ie6fix() {
	var sctop = $(window).scrollTop();
    var wh = $(window).height() - 370;
    $("#fixed").css("top",wh+sctop);
}
$(function(){
var yvv = $("#keywords");
    $("#mob").hover(function() {
        $(this).find(".im").show()
    },
    function() {
        $(this).find(".im").hide()
    });
    $("#search").hover(function() {
        var yvvs = yvv.val();
        if (yvvs == "商品名称/货号") {
            yvv.attr("value", "");
        }
    },
    function() {
        var yvvs = yvv.val();
        if (yvvs == ""){
            yvv.attr("value", "商品名称/货号")
        }
    });
yvv.bind("keyup", 
    function(e) {
        var v = $(this).val().replace(/(^\s*)|(\s*$)/g,"");
        if (v == "") {
            $("#r_id").hide();
            return false
        }
        if (e.keyCode == 40 || e.keyCode == 38) {
            return false
        }
        var t = setTimeout(function() {
            $.ajax({
                url: '/search.php?act=q&w=' + v,
                type: 'GET',
                dataType: 'html',
                success: function(data) {
                    if (data != "") {
                        $("#r_id").show().html(data)
                    } else {
                        $("#r_id").hide()
                    }
                },
                mode:'abort'
            })
        },
        500)
    }).bind("blur", 
    function() {
        var h = setTimeout(function() {
            $("#r_id").hide()
        },
        500)
    });
    $("#tcar").hover(function() {
        $(this).addClass("hv");
        updateC()
    },
    function() {
        $(this).removeClass("hv")
    });
    $("#lnav li").hover(function() {
        $(this).addClass("on");
    },
    function() {
        $(this).removeClass("on")
    });
    $("#tul li.nbt").hover(function() {
        $(this).addClass("on")
    },
    function() {
        $(this).removeClass("on")
    });
    $("#sao").hover(function() {
        $(this).addClass("on")
    },
    function() {
        $(this).removeClass("on")
    });
    $("#fnav").hover(function() {
        $("#lnav").show()
    },
    function() {
        $("#lnav").hide()
    });
    $("img[src2]").Qlazyload({
        type: "image"
    });
    if (isIE6) {
        document.execCommand("BackgroundImageCache", false, true);
    }
    var fl = $("#fixed").length;
    $(window).scroll(function(){
        if(fl>0&&isIE6) {
            ie6fix();
        }
    });
});