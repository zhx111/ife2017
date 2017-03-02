//给按钮绑定事件
function handleButton() {
	var buttonGroup = document.querySelector('.button-group');
	buttonGroup.addEventListener('click',()=>{
		//获得点击的按钮并取得id和数字
		var target = event.target;
		var name = target.getAttribute('name');
		var type = target.id;
		var numberInput = document.getElementById('numberIn');
		var number = numberInput.value;
		//根据选取到的id对数队列进行操作,筛选数值；
		//为什么用Number()而不用parseInt呢？因为parseInt即使有字符串也转为字符串
		if (name === 'control') {
			number = Number(number);
			if(Number.isInteger(number) && number >= 10 && number <= 100){
				handleQueue(type,number);
			} else{
				alert('请输入10-100之间的整数');
			}
			numberInput.value = '';
		} else if (name === 'sort') {
			sort();
		}
	});
}

//处理数组队列，主要是增加队列和减少队列
function handleQueue(type,number){
	var queue = document.querySelector('.number-queue');
	if (queue.childElementCount < 60 && type.substr(-2,2) === 'in') {
		addItem(type,number,queue);
	} else {
		type.substr(-3,3) === 'out' ? deleteItem(type,queue) : alert('您添加的元素太多了');
	}
}

function addItem(type,number,node){
	var item = document.createElement('div');
	item.setAttribute('class','queue-item');
	item.innerHTML = number;
	item.style.height = setHeight(number,100,400) + 'px'; 
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
		if (event.target.nodeName === 'DIV' && event.target !== queue) {
			queue.removeChild(event.target);
		}
	});
}

function setHeight(number,range,totalHight){
	var totalHight = parseInt(totalHight);
	return totalHight * (number / range);

}

async function sort(solution){
	var queueChildList = Array.prototype.slice.call(document.querySelectorAll('.number-queue div'));
	console.log(queueChildList);
	//冒泡排序
	for (let i = 0; i < queueChildList.length; i++) {
		for (let j = 0; j < queueChildList.length-1; j++) {
			
				await sleep(500);
				if (parseInt(queueChildList[j].innerText)>parseInt(queueChildList[j+1].innerText)) {
				var temp;
				var temp = queueChildList[j];
				queueChildList[j] = queueChildList[j+1];
				queueChildList[j+1] = temp;
				swapSib(queueChildList[j],queueChildList[j+1]);
				}
			
		}
	}
}

//交换同级元素
function swapSib(a,b){
	if(a===b) return;
	var parent = a.parentNode;
	var an = a.nextElementSibling;
	var bn = b.nextElementSibling;
	if (an === b) {
		return parent.insertBefore(b,a);
	}else if (bn === a) {
		return parent.insertBefore(a,b);
	}else {
		return parent.insertBefore(a,b),parent.insertBefore(b,an);
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}


handleButton();
deleteSelf();


