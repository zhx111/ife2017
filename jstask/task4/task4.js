//给按钮绑定事件
function handleButton() {
	var buttonGroup = document.querySelector('.button-group');
	buttonGroup.addEventListener('click',()=>{
		//获得点击的按钮并取得id和数字
		var target = event.target;
		var type = target.id;
		var number = document.getElementById('numberIn').value;
		//根据选取到的id对数队列进行操作；
		if(number){
			handleQueue(type,number);
		}
	});
}

//处理数组队列，主要是增加队列和减少队列
function handleQueue(type,number){
	var queue = document.querySelector('.number-queue');
	type.substr(-2,2) === 'in' ? addItem(type,number,queue) : deleteItem(type,queue);
}

function addItem(type,number,node){
	var item = document.createElement('span');
	item.setAttribute('class','queue-item');
	item.innerHTML = number;
	type === 'leftin' ? node.insertBefore(item,node.firstElementChild) : node.appendChild(item);
}

function deleteItem(type,node){
	var number;
	if (node.firstElementChild) {
		type === 'leftout'? number=node.removeChild(node.firstElementChild) : number=node.removeChild(node.lastElementChild);
		alert("您删除的是："+number.innerText);
	}
	
}

function deleteSelf(){
	var queue = document.querySelector('.number-queue');
	queue.addEventListener('click',(event)=>{
		if (event.target.nodeName === 'SPAN' && event.target.nodeType === 1) {
			queue.removeChild(event.target);
		}
	});
}


handleButton();
deleteSelf();


