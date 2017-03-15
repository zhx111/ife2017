function Tree(root){
	this.root = root;
	this.isAnimating = false;
	this.traQueue = [];
}

Tree.prototype.traverseDF = function(callback){
	(async function recurse(currentNode){
		var children = Array.from(currentNode.childNodes).filter((item)=>item.nodeType===1);
		for (var i = 0; i < children.length; i++) {
			await recurse.call(this,children[i]);
		}
		currentNode.style.background = 'blue';
		await sleep(500);
		currentNode.style.background = 'white';
		callback(currentNode);
	})(this.root);
}

Tree.prototype.traverseBF = function(callback){
	(async function recurse(currentNode){
		currentNode.style.background = 'blue';
		await sleep(500);
		currentNode.style.background = 'white';
		callback(currentNode);
		var children = Array.from(currentNode.childNodes).filter((item)=>item.nodeType===1);
		for (var i = 0; i < children.length; i++) {
			await recurse.call(this,children[i]);
		}
	})(this.root);
}



Tree.prototype.animate = function(){
	this.isAnimating = true;
	var arr = this.traQueue,
		ms = 500,
		count = 0,
		time = setInterval(()=>{
			count++;
			if (count<arr.length) {
				arr[count].style.background = 'blue';
				arr[count-1].style.background = 'white'
			}else{
				clearInterval(time);
				arr[count-1].style.background = 'white';
				this.isAnimating = false;
			}
		},ms);
}

Tree.prototype.contains = function(callback,traversal){
	traversal.call(this,callback);
}

const view = {
	rootEl:document.querySelector('#root'),
	controlEl:document.querySelector('.control-group'),
	searchText:document.querySelector('#searchText'),
	addValueEl:document.querySelector('#addValue')
}


var rootDiv = document.querySelector('#root');
var tree = new Tree(rootDiv);

view.controlEl.addEventListener('click',(e)=>{
		if (e.target.id === 'traverseBF') {
			tree.traverseBF(()=>{});
		}else if(e.target.id === 'traverseDF') {
			tree.traverseDF(()=>{});
		}else if(e.target.id === 'search'){
			var value = view.searchText.value;
			if (!value) {
				alert('请输入内容');
			}else {
				tree.contains(function(value,node){
					if (node.firstChild.nodeValue == value) {
						node.style.background = '#f51010';
					}
				}.bind(this,value),tree.traverseDF);
			}
		}else if (e.target.id === 'remove') {
			if(model.currentNode){
				model.currentNode.remove();
			}else{
				alert('请选择要删除的节点！');
			}
		}else if (e.target.id === 'add') {
			var value = view.addValueEl.value;
			if (value) {
				if (model.currentNode) {
					var node = document.createElement('div');
					node.setAttribute('class','node');
					node.innerText = value;
					model.currentNode.appendChild(node);
				}else {
					alert('请选择一个节点！');
				}
			}else{
				alert('请输入节点内容');
			}
		}
});


function Model(node){
	this.currentNode = node;
	this.clickNodeQueue = []; 
}

Model.prototype.bind = function(view){
	view.rootEl.addEventListener('click',(e)=>{
		this.currentNode = e.target;
		if (this.clickNodeQueue.length <= 1) {
			this.clickNodeQueue.push(this.currentNode); 
		} else  {
			this.clickNodeQueue.shift();
			this.clickNodeQueue.push(this.currentNode);
		}
		
		this.currentNode.style.background = 'green';
		if (this.clickNodeQueue.length > 1) {
			this.clickNodeQueue[0].style.background = 'white';
		}
	})
}

var model = new Model();
model.bind(view);


function sleep(ms) {
	return new Promise((resolve,reject)=>{setTimeout(resolve,ms)})
}
