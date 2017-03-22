function Observer(data) {
	this.data = data;
	this.traverse(data);
}

Observer.prototype.traverse = function(data) {
	//遍历data中所有的属性,使用Objects.keys而不使用for..in..的原因是因为避免遍历可继承的属性
	var keys = Object.keys(data);
	for (let key of keys) {
		if (typeof data[key] === 'object') {
			new Observer(data[key]);
		}else {
			this.convert(data[key],key);
		}
	}
};

Observer.prototype.convert = function(value,key) {
	Object.defineProperty(this.data,key,{
		get:function(){
			console.log("你访问了:"+key);
			return value;
		},
		set:function(newValue){
			value = newValue;
			console.log("你设置了"+key+"，新的值为"+newValue);
		}
	})
}

let data = {
	user:{
		name:'xiaoming',
		sex:'male',
		address:{
			city:'nanjing'
		}
	},
	article:{
		title:'I am the king of world!',
		content:'you are best!'
	}
}

var app = new Observer(data);

let app1 = new Observer({
  name: 'youngwind',
  age: 25
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});
