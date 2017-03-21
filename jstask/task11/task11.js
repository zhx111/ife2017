var util = {
	calLen:function(value){
		var len = value.replace(/[^\x00-\xff]/g,"AB").length;
		return len;
	},
	testPassword:function(value){
		var pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,14}$/;
		return pattern.test(value);
	},
	testPhone:function(value){
		var pattern = /^1[0-9]{10}$/;
		return pattern.test(value);
	},
	testEmail:function(value){
		var pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		return pattern.test(value);
	}

}

const view = {
	formEl:document.querySelector('form'),
	submitEl:document.querySelector('button'),
	inputEl:document.querySelectorAll('input'),
	passwordEl:document.querySelector('#password')
}

var nodeQue = [];

for (let i = 0; i < view.inputEl.length; i++) {
	view.inputEl[i].addEventListener('focus',(e)=>{
		if (e.target.nodeName === 'INPUT') {
			if (nodeQue.length < 2) {
				nodeQue.push(e.target);
			} else{
				nodeQue.shift();
				nodeQue.push(e.target);
			}
			nodeQue[0].nextElementSibling.style.display = 'none';
			e.target.nextElementSibling.style.display = 'block';
			e.target.nextElementSibling.nextElementSibling.style.display = 'none';
			e.target.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none';
		}
	});
	view.inputEl[i].addEventListener('blur',(e)=>{
		var type = e.target.parentNode.id;
		var value = e.target.value;
		var result = verify(value,type);
		changeNode(e.target,result);
	});
}

function verify(value,type) {
	
	if (!value) {
		return false;
	}else {
		if (type === 'user-name') {
			var len = util.calLen(value);
			if (len<4 || len>16) {
				return false;
			}else{
				return true;
			}
		}else if (type === 'user-password') {
			return util.testPassword(value);

		}else if (type === 'user-password-verify') {
			var passwordValue = view.passwordEl.value;
			if (passwordValue) {
				if (value === passwordValue) {
					return true;
				}
			}else {
				return false;
			}
		}else if (type === 'user-email') {
			return util.testEmail(value);

		}else if (type === 'user-phone') {
			return util.testPhone(value);
		}
	}
}

function changeNode(node,result){
	if (result === true) {
		node.classList.remove('error');
		node.classList.add('success');
		node.nextElementSibling.style.display = 'none';
		if (nodeQue.length === 1 ) {
			nodeQue[0].nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'block';
		}else {
			nodeQue[1].nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'block';
		}
	}else{
		node.classList.remove('success');
		node.classList.add('error');
		node.nextElementSibling.style.display = 'none';
		if (nodeQue.length === 1 ) {
			nodeQue[0].nextElementSibling.nextElementSibling.style.display = 'block';
		}else {
			nodeQue[1].nextElementSibling.nextElementSibling.style.display = 'block';
		}
		
	}
}

view.submitEl.addEventListener('click',(e)=>{
	e.preventDefault();
	var input = view.inputEl;
	var count = 0;
	for (var i = 0; i < input.length; i++) {
		var className = input[i].getAttribute('class');
		if(input[i].getAttribute('class').indexOf('success') !== -1){
			count++;
		}
	}
	console.log(count);
	if (count === 5) {
		alert('提交成功！');
		view.formEl.submit();
	}else{
		alert('提交失败');
	}
});




