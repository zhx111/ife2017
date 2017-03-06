var util = {
	split:function(text){
		var reg = /\n\r|,|，|、|\s|\t/
		return text.split(reg);
	},
	format:function(value){
		value = value.map((item,index)=>{
			return '<p>'+item+'</p>';
		});
		return value.reduce((prev,cur)=>{
			return prev+cur;
		});
	}
}

const view = {
	textareaEl:document.getElementById('write'),
	searchEl:document.getElementById('search'),
	contentEl:document.getElementById('content'),
	searchButtonEl:document.getElementById('searchButton')
}



view.searchButtonEl.addEventListener('click',function(){
	if (!model.write) {
		alert('请输入内容！');
	}
	if (!model.search) {
		alert('请输入查找内容！')
	}
	var data = util.split(model.write);
	var searchReg = new RegExp(model.search,'gi');
	data = data.map((item,index)=>{
		if(item.match(searchReg)){
			var search = model.search;
			var length = search.length;
			var index = item.indexOf(search);
			return  item.substring(0,index) + '<em>' + search + '</em>' + item.substring(index+length,item.length);
		}else {
			return item;
		}
	});
	view.contentEl.innerHTML = util.format(data);	
})

function Model(write,search){
	this.write = write;
	this.search = search;
}

//视图输入的数据和Model绑定
Model.prototype.bind = function(view) {
	view.textareaEl.addEventListener('change',function(e){
		this.write = e.target.value;
	}.bind(this));
	view.searchEl.addEventListener('change',function(e){
		this.search = e.target.value;
	}.bind(this));
}
//利用set和get实现数据双向绑定
Object.defineProperty(Model.prototype,'write',{
	set:function(write){
		view.textareaEl.value = write;
	},
	get:function(){
		return view.textareaEl.value;
	}
});

Object.defineProperty(Model.prototype,'search',{
	set:function(search){
		view.searchEl.value = search;
	},
	get:function(){
		return view.searchEl.value;
	}
});

var model = new Model('','');
model.bind(view);