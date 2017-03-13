var bindEvent = function(argument) {
	var control = document.querySelector('.control-group');
	var rootDiv = document.querySelector('#root');
	control.addEventListener('click',(e)=>{
		if (e.target.id === 'pretraverse') {
			pretraverse.call(null,rootDiv);
		}else if (e.target.id === 'intraverse') {
			intraverse.call(null,rootDiv);
		}else {
			posttraverse.call(null,rootDiv);
		}
	})
}

async function pretraverse(node){
	if (node) {
		node.style.background = 'blue';
		await sleep(500);
		node.style.background = 'white';
		await pretraverse(node.firstElementChild);
		await pretraverse(node.lastElementChild);
	}
}

async function intraverse(node) {
	if (node) {
		await intraverse(node.firstElementChild);
		{
			node.style.background = 'blue';
			await sleep(500);
			node.style.background = 'white';
		}
		await intraverse(node.lastElementChild);
	}
}

async function posttraverse(node) {
	if (node) {
		await posttraverse(node.firstElementChild);
		await posttraverse(node.lastElementChild);
		
		node.style.background = 'blue';
		await sleep(500);
		node.style.background = 'white';
		
	}
}

function sleep(ms) {
	// body...
	return new Promise((resolve,reject)=>{setTimeout(resolve,ms)})
}

bindEvent();