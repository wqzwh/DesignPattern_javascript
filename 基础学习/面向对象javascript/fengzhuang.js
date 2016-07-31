var myObj=(function(){
	var _name='sven'; //私有变量
	return {
		getName:function(){
			return _name;
		}
	}
})();
console.log(myObj.getName());//sevn
console.log(myObj._name);//undefined