/**
 * Created by Administrator on 2016/9/28.
 */
$(".top-left").mousemove(function(e){
    //console.log(1)
    var x = e.clientX - $(this).offset().left - $(".top-left1").width()/2;
    var y = e.clientY - $(this).offset().top - $(".top-left1").height()/2;
    if(x<0){
        x=0
    }
    if(y<0){
        y=0
    }
    if(x>$(this).width()-$(".top-left1").width()){
        x=$(this).width()-$(".top-left1").width()
    }
    if(y>$(this).height()-$(".top-left1").height()){
        y=$(this).height()-$(".top-left1").height()
    }
    $(".top-left1").css({
        top:y,
        left:x
    })
    $(".top2 img").css({
        left:-2*x,
        top:-2*y
    })
}).mouseenter(function(){
    $(".top2").css({
        display:"block"
    })
    $(".top-left1").css({
        display:"block"
    })
}).mouseleave(function(){
    $(".top2").css({
        display:"none"
    })
    $(".top-left1").css({
        display:"none"
    })
})
$(".top1 ul>li").mouseenter(function(){
    // alert(1)
    $(".top2").html($(this).html())
    $(".top-left").html($(this).html()+"<div class=\"top-left1\"></div>")
})