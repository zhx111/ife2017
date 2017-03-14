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



var rootDiv = document.querySelector('#root');
var tree = new Tree(rootDiv);

// var value = 'Demon';
// tree.contains(function(value,node){
// 	if (node.firstChild.nodeValue == value) {
// 		node.classList.add('find');
// 	}
// }.bind(this,value),tree.traverseDF);


var bindEvent = function(argument) {
	var control = document.querySelector('.control-group');
	control.addEventListener('click',(e)=>{
		if (e.target.id === 'traverseBF') {
			tree.traverseBF(()=>{});
		}else if(e.target.id === 'traverseDF') {
			tree.traverseDF(()=>{});
		}else if(e.target.id === 'search'){
			var value = document.querySelector('#searchText').value;
			if (!value) {
				alert('请输入内容');
			}else {
				tree.contains(function(value,node){
					if (node.firstChild.nodeValue == value) {
						node.style.background = '#f51010';
					}
				}.bind(this,value),tree.traverseDF);
			}
		}
	});

}

// async function traverseBF(node){
// 	if (node) {
// 		node.style.background = 'blue';
// 		await sleep(500);
// 		node.style.background = 'white';
// 		var children = Array.from(node.childNodes);
// 		children = children.filter((item)=>{
// 			return item.nodeType === 1;
// 		});
// 		for(let i =0 ;i < children.length ;i++){
// 			await pretraverse(children[i]);
// 		}
// 	}
// }

// async function traverseDF(node) {
// 	if (node) {
// 		var children = Array.from(node.childNodes);
// 		children = children.filter((item)=>{
// 			return item.nodeType === 1;
// 		});
// 		for(let i =0 ;i < children.length ;i++){
// 			await intraverse(children[i]);
// 		}
// 		node.style.background = 'blue';
// 		await sleep(500);
// 		node.style.background = 'white';
		
// 	}
// }


function sleep(ms) {
	// body...
	return new Promise((resolve,reject)=>{setTimeout(resolve,ms)})
}

bindEvent();