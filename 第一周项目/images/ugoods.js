var page_now = 1;
var cpage_now = 1;
var ac = 1;
var isf = 0;
var mouseX = 0;
var mouseY = 0;
var maxLeft = 0;
var maxTop = 0;
var markLeft = 0;
var markTop = 0;
var perX = 0;
var perY = 0;
var bigLeft = 0;
var bigTop = 0;
var k_s = 1;
var lurl = window.location.href;
var jtop = $("#tabW").offset().top;
var ta = $("#tabW");
var nb = $("#number");
var $g_li = $("#g_pp li");
var $g_bb = $("#g_ptab").find(".g_pa");
var $msk = $("#zmark");
var $zbg = $("#zbig");
var $zob = $("#zomb");
var wpl = $("#wrap").length;
function cadd() {
    var n_b = parseInt(nb.val());
    if (!isNaN(n_b)) {
        if (n_b > 0) {
            nb.attr("value", n_b + 1);
            changePrice()
        }
    } else {
        nb.attr("value", 1);
        changePrice()
    }
}
function cdec() {
    var n_b = parseInt(nb.val());
    if (!isNaN(n_b)) {
        if (n_b > 1) {
            nb.attr("value", n_b - 1);
            changePrice()
        }
    } else {
        nb.attr("value", 1);
        changePrice()
    }
}
function ck_number(str) {
    var re = /^(\+|-)?\d+$/;
    return re.test(str)
}
function rcg(obj) {
    var i = obj.value;
    if (i < 0 || !ck_number(i)) {
        obj.value = 1
    } else {
        nb.val(i)
    }
}
nb.change(function () {
    changePrice()
});
function changePrice() {
    var attrs = getSelectedAttributes(document.forms['ECS_FORMBUY']);
    var qty = nb.val();
    if (ck_number(qty) && qty > 0) {
        //if (qty > 50) {
        //    nb.attr("value", "50");
        //    qty = 50
        //}
    } else {
        nb.attr("value", "1");
        qty = 1
    }
    $.get('/goods.php?act=price&id=' + goodsid + '&attr=' + attrs + '&number=' + qty, function (res) {
        if (res.err_msg.length > 0) {
            alert(res.err_msg);
            return false
        }
        $("#ECS_RANKPRICE_m").text(res.result);
        if ($('#ECS_GOODS_AMOUNT').length > 0) {
            $('#ECS_GOODS_AMOUNT').text(res.result)
        }
        if (res.sku.length > 0) {
            $("#ECS_GOODS_SKU").text(res.sku)
        }
    }, 'JSON')
}
function updateEndTime() {
    var date = new Date();
    var time = date.getTime() / 1000;
    var g = $("#gloot");
    var endTime = g.attr("end");
    var lag = (endTime - time);
    if (lag > 0) {
        var second = Math.floor(lag % 60);
        var minite = Math.floor((lag / 60) % 60);
        var hour = Math.floor((lag / 3600) % 24);
        var day = Math.floor((lag / 3600) / 24);
        g.html("抢购中：<b>" + day + "</b>天<b>" + hour + "</b>时<b>" + minite + "</b>分<b>" + second + "</b>秒&nbsp;&nbsp;(不支持使用红包)")
    } else {
        g.html("抢购已经结束！");
    }
    setTimeout("updateEndTime()", 1000);
}
$(window).scroll(function () {
    var s = $(window).scrollTop() - jtop;
    if ($(document).scrollTop() > jtop) {
        if (isIE6) {
            ta.css({position: "absolute", top: s});
        } else {
            if (isf == 0) {
                ta.css({position: "fixed", top: 0});
            }
        }
        if (isf == 0) {
            $("#gr").show();
        }
        isf = 1;
    } else {
        if (isf == 1) {
            ta.css({position: "relative", top: 0});
            $("#gr").hide();
        }
        isf = 0;
    }
    return false;
});
function qwToCart() {
    ac = 0;
    var e = $("#gimg").offset().left;
    var t = $("#qcar").offset().left;
    var h = t - e;
    n = parseInt($("#qcar").text()) + parseInt(nb.val());
    $("#gimg").append('<img src="' + $("#thumg").attr("src") + '" id="temp" style="position:absolute;top:1px;left:1px;z-index:1000;" />');
    params = {top: "-130px", left: h, opacity: 0.5, height: 20};
    $("#temp").stop(true, true).animate(params, 500, function () {
        $("#temp").remove();
        $("#qcar").text(n);
        qu_car = 1;
        ac = 1;
        tishi();
    });
}
function tishi() {
    $.get("/flow.php?step=show_cart&t=" + new Date().valueOf(), function (result) {
        $("#g_cts").html(result);
        $("#tishi").fadeIn(200)
    })
}
function closeT() {
    $("#tishi").fadeOut(200)
}
function tobuy(gid) {
    if (wpl > 0 && $("#wrap .hover").length < 1) {
        gopen(1);
        return
    }
    if (ac != 1) {
        return
    }
    addToCart(gid, 0, 0, 1)
}
function fbuy(gid) {
    if (wpl > 0 && $("#wrap .hover").length < 1) {
        gopen(0);
        return
    }
    addToCart(gid, 0, 0, 0)
}
function gopen(i) {
    k_s = i;
    $("#wrapg").html($("#wrap").html());
    $("#pbox").show();
    $("#mask").show();
}
$("#wrapg").delegate(".catt a", "click", function () {
    var mp = $(this).find("input");
    var ck = mp.attr("name");
    var ci = mp.attr("id");
    $(this).parent(".catt").find("a").removeClass("hover");
    $("#wrap .catt input[name=" + ck + "][type=radio]").prop("checked", false);
    $("#wrap #" + ci).prop("checked", true);
    $(this).addClass("hover");
});
function shux() {
    var spec_arr = new Array();
    var formBuy = document.forms['ECS_FORMBUY'];
    spec_arr = getSelectedAttributes(formBuy);
    if (spec_arr == "") {
        alert("请选择产品属性！");
        return false;
    }
    pclose();
    if (k_s == 1) {
        addToCart(goodsid, 0, 0, 1);
    } else {
        addToCart(goodsid, 0, 0, 0);
    }
}
function gpage(p) {
    var ctop = $("#comment").offset().top;
    $.get('/goods.php', {act: 'comment', id: goodsid, page: p}, function (data) {
        if (data.code == 0) {
            $("#pager a").removeClass("on").eq(p).addClass("on");
            $("#wpl").html(data.data);
            page_now = data.page;
            if ($(document).scrollTop() > ctop) {
                $("html,body").animate({scrollTop: ctop}, 300)
            }
        }
    }, 'JSON')
}
function ppage() {
    if (page_now > 1) {
        k = page_now - 1;
        gpage(k)
    }
}
function npage() {
    if (page_now < ppage_t) {
        k = page_now + 1;
        gpage(k)
    }
}
if ($("#taoc").length > 0) {
    $("#taoc li").eq(0).addClass("on");
    $("#tac .tc_box").eq(0).show();
    $("#taoc li").each(function (i) {
        $(this).mouseenter(function () {
            $(this).addClass("on").siblings("li").removeClass("on");
            $("#tac .tc_box").eq(i).show().siblings(".tc_box").hide()
        })
    })
}
if ($("#gloot").length >= 1) {
    updateEndTime()
}
$("#wrap .catt a").click(function () {
    var mo = $(this).find("input");
    var ck = mo.attr("name");
    $(this).parent(".catt").find("a").removeClass("hover");
    $(".catt input[name=" + ck + "][type=radio]").prop("checked", false);
    mo.prop("checked", true);
    $(this).addClass("hover")
});
$("#tabbar li").click(function () {
    var d = $(this).attr("rel");
    $(this).addClass("on").siblings("li").removeClass("on");
    $("#" + d).show()
});
function updataMark() {
    if (markLeft < 0) {
        markLeft = 0;
    } else if (markLeft > maxLeft) {
        markLeft = maxLeft;
    }
    if (markTop < 0) {
        markTop = 0;
    } else if (markTop > maxTop) {
        markTop = maxTop;
    }
    perX = markLeft / 280;
    perY = markTop / 420;
    bigLeft = -perX * 200;
    bigTop = -perY * 250;
    $msk.css({"left": markLeft, "top": markTop, "display": "block"});
}
function updataBig() {
    $zob.css("display", "block");
    $zbg.css({"display": "block", "left": bigLeft, "top": bigTop});
}
function cancle() {
    $zob.css({"display": "none"});
    $msk.css({"display": "none"});
}
function imgMouseMove(event) {
    var $this = $(this);
    mouseX = event.pageX - $this.offset().left - 60;
    mouseY = event.pageY - $this.offset().top - 60;
    maxLeft = 160;
    maxTop = 300;
    markLeft = mouseX;
    markTop = mouseY;
    updataMark();
    updataBig();
}
$("#zom").bind("mousemove", imgMouseMove).bind("mouseleave", cancle);
$("#thumbs li").mouseenter(function () {
    var s = $(this).find("img").attr("data-s")
    var b = $(this).find("img").attr("data-src");
    $(this).addClass("on").siblings("li").removeClass("on");
    $("#thumg").attr("src", s);
    $("#thumr").attr("src", b);
    /*var zimg=new Image();
     zimg.src=b;
     zimg.onload=function(){alert("大图加载完毕");}*/
});
$g_li.each(function (index) {
    $(this).mouseenter(function () {
        $(this).addClass("on").siblings("li").removeClass("on");
        $g_bb.hide().eq(index).show();
    });
});

var Validator = {
    isMobile: function (a) {
        return this.test(a, /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/);
    },
    isPhone: function (a) {
        return this.test(a, /^[0-9]{3,4}\-[0-9]{7,8}$/);
    },
    isEmpty: function (a) {
        return !jQuery.isEmptyObject(a);
    },
    test: function (a, b) {
        a = a.nodeType == 1 ? a.value : a;
        return new RegExp(b).test(a);
    }
};
/*login*/
$("#loginform").bind("submit", function () {
    var a = $("#username").val();
    var b = $("#password").val();
    if (a.length < 2 || a.length > 30) {
        alert("请准确填写登录帐号,2-30位之间");
        $("#username").focus();
        return false;
    }
    if (b.length < 5 || b.length > 30) {
        alert("请准确填写登录密码,5-30位之间");
        $("#password").focus();
        return false;
    }
    $.ajax({
        url: '/user.php',
        type: 'POST',
        data: {act: "ajax_login", username: a, password: b},
        dataType: 'TEXT',
        success: function (result) {
            if (result == 1) {
                window.location.href = lurl;
            } else {
                alert("您输入的用户名或密码有误，请重新输入！");
            }
        }
    });
    return false;
});
$("#denglu").delegate(".rtext", "keyup", function () {
    var a = $(this).val();
    var s = $(this).parent().find("label");
    if (a == "") {
        s.show();
    } else {
        s.hide();
    }
});
$("#zhuce").delegate(".rtext", "keyup", function () {
    var a = $(this).val();
    var s = $(this).parent().find("label");
    if (a == "") {
        s.show();
    } else {
        s.hide();
    }
});
/*regist*/
$("#registform").bind("submit", function () {
    var a = $("#mobile_phone").val();
    var b = $("#tpas").val();
    var c = $("#cpas").val();
    if (a.length < 4 || !Validator.isMobile(a)) {
        alert("请输入正确的手机号码");
        $("#mobile_phone").focus();
        return false;
    }
    if (a.length < 5 || a.length > 30) {
        alert("请准确填写登录密码,5-30位之间");
        $("#tpas").focus();
        return false;
    }
    if (b != c) {
        alert("两次输入密码不一致，请重新输入");
        $("#cpas").focus();
        return false;
    }
    $.ajax({
        url: '/user.php',
        type: 'POST',
        data: {act: "ajax_regist", username: a, password: b},
        dataType: 'text',
        success: function (result) {
            if (result == 1) {
                window.location.href = lurl;
            } else {
                alert("您的输入有错，请重新输入！");
            }
        }
    });
    return false;
});
$("#registform").delegate("#mobile_phone", "blur", function () {
    var a = $(this).val();
    if (a.length < 10 || !Validator.isMobile(a)) {
        return false;
    }
    $.ajax({
        url: '/user.php?act=check_phone&mobile_phone=' + a,
        type: 'GET',
        dataType: 'text',
        success: function (res) {
            if (res != "y") {
                $("#t_ts").show();
            } else {
                $("#t_ts").hide();
            }
        }
    });
});
function slog() {
    $("#denglu").toggle();
    $("#zhuce").hide();
}
function sreg() {
    $("#zhuce").toggle();
    $("#denglu").hide();
}