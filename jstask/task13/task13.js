var event = new Event();

function Observer(data) {
	this.data = data;
	this.traverse(data);
	this.eventBus = event;
}

Observer.prototype.traverse = function(data) {
	//遍历data中所有的属性,使用Objects.keys而不使用for..in..的原因是因为避免遍历可继承的属性
	var keys = Object.keys(data);
	for (let key of keys) {
		//如果data某个属性是对象的，new一个观察者
		if (typeof data[key] === 'object') {
			new Observer(data[key]);
		}else {
			this.convert(data[key],key);
		}
	}
};

Observer.prototype.convert = function(value,key) {
	let _self = this;
	Object.defineProperty(this.data,key,{
		
		get:function(){
			console.log("你访问了:"+key);
			return value;
		},
		set:function(newValue){
			if (typeof newValue === 'object') {
				new Observer(newValue);
			}
			_self.eventBus.emit(key,newValue);
			value = newValue;
			console.log("你设置了"+key+"，新的值为"+newValue);
		}
	})
}

Observer.prototype.$watch = function(attr,callback){
	this.eventBus.on(attr,callback);
}

//事件
function Event(){
	this.events = {};
}

Event.prototype.on = function(attr,callback){
	if (this.events[attr]) {
		this.events[attr].push(callback);
	}else{
		this.events[attr] = [callback];
	}
}

Event.prototype.emit = function(attr,...args){
	if (this.events[attr]) {
		this.events[attr].forEach(function(item){
			item(...args);
		});
	}
	
}


let app1 = new Observer({
         name: 'youngwind',
         age: 25
 });

app1.$watch('age',function(age){
	console.log(`我的年纪变了，现在已经是：${age}岁了`);
});


