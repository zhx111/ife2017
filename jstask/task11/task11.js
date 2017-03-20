var util = {
	calLen:function(value){
		var len = value.replace(/[^\x00-\xff]/g,"AB").length;
		return len;
	}
}

const view = {
	inputEl:document.querySelectorAll('input')
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

		}else if (type === 'user-password-verify') {

		}else if (type === 'email') {

		}else if (type === 'phone') {

		}
	}
}

function changeNode(node,result){
	if (result === true) {
		node.classList.remove('error');
		node.classList.add('success');
		console.log(nodeQue);
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




