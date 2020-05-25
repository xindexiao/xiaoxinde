window.onload = function(){
	function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); return null;
    }
	var id = getUrlParam('id');
	$.ajax({
		url:"cardDeta.json",
		type:"get",
		dataType:'text',
		jsonpCallback: "jsonpCallback",
		 data:{
            "id":id,
            
        },
		success:function (data){
			let _data = [
				{'id':1,'uid':'刘晓军','order_id':'123','status':'1','all_money':'121','pay_money':'100','amount':'120','creat_date':'2020-5-24','pay_date':'2020-5-25'},
				{'id':2,'uid':'刘晓军','order_id':'124','status':'0','all_money':'121','pay_money':'100','amount':'120','creat_date':'2020-5-24','pay_date':'2020-5-25'},
				{'id':3,'uid':'刘晓军','order_id':'125','status':'1','all_money':'121','pay_money':'100','amount':'120','creat_date':'2020-5-24','pay_date':'2020-5-25'}
				]
			let str;
			for(let i = 0;i<_data.length;i++){
				if(_data[i].id == id){
					str = _data[i]
				}
			}
			let html = `<tr>
			    <td>${str.uid}</td>
			    <td>${str.order_id}</td>
			    <td>${str.status}</td>
			    <td>${str.all_money}</td>
			    <td>${str.pay_money}</td>
			    <td>${str.amount}</td>
			    <td>${str.creat_date}</td>
			    <td>${str.pay_date}</td>
			  </tr>`
			$('#table').append(html)
			switch(id){
				case '1':
				$('h3')[0].innerHTML = '水卡表'
				break;
				case '2':
				$('h3')[0].innerHTML ='电卡表'
				break;
				case '3':
				$('h3')[0].innerHTML = '汽卡表' 
				break;
				default:
			}
			console.log(str)
		},
		error:function(data){
			console.log(data)
		}
	})
	
	$('button').click(function(){
		window.location = 'login.html'
	})
}