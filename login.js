window.onload = function(){
	$('.login').click(function(){
		let phoneReg = /^1[345789]\d{9}$/;
		let emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		let account = $("[name='account']")[0].value
		let pwd = $("[name='pwd']")[0].value
		let email = '';
		let phone = '';
		if(!$("[name='account']")[0].value){
			alert('请输入账号')
			return
		}
		if(phoneReg.test(account)){
			phone = account
		}else if(emailReg.test(account)){
			email = account
		}else{
			alert('请输入正确的账号')
			return
		}
		if(!pwd){
			alert('请输入密码')
		}
		$.ajax({
			url:"login.json",
			type:"get",
			dataType:'text',
			jsonpCallback: "jsonpCallback",
			 data:{
                "id": 'lxj',
                "name": '刘晓军',
                'sex':'男',
                'phone':phone,
                'email':email,
                'password':pwd
            },
			success:function (data){
				if(data.code = 200){
					window.location = 'cardList.html'
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	})
}