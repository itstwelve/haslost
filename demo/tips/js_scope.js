var f = function () {
	var scope = 'f0';
	function ff () {
		var scope = 'f1';
		function fff () {
			console.log(scope); // 输出 f1 
		};
		fff();
	};
	ff();
}; 
f(); 