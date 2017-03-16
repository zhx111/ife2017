var util = {
	calLen:function(value){
		var len = value.replace(/[^\x00-\xff]/g,"AB").length;
		return len;
	}
}


const view = {
	inputEl:document.querySelector('#name'),
	verifyButton:document.querySelector('#verify'),
	desTextEl:document.querySelector('#describe')
}

view.verifyButton.addEventListener('click',(e)=>{
	var value = view.inputEl.value;
	if (value) {
		var len = util.calLen(value);
		if (len<4 || len>16) {
			view.desTextEl.innerHTML = '您输入的长度不正确！';
		}else{
			view.desTextEl.innerHTML = '名称格式正确！';
		}
	}else{
		view.desTextEl.innerHTML = '姓名不能为空！'
	}
});

view.inputEl.addEventListener('focus',()=>{
	view.desTextEl.innerHTML = '必填，长度为4-16个字符'
});

