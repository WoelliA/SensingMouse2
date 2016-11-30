var async = require("async");
var sensingMouse = require("./index");

sensingMouse.discover((sensingMouse) => {
	console.log("Discover : " + sensingMouse);

	sensingMouse.once("disconnect" , () => {
		console.log("Disconnect");
		process.exit(0);
	});

	sensingMouse.on("XAxisValueChange" , function(x){
		console.log("Change		X = " , x);
	});

	sensingMouse.on("YAxisValueChange" , function(y){
		console.log("Change		Y = " , y);
	});

	sensingMouse.on("ZAxisValueChange" , function(z){
		console.log("Change		Z = " , z);
	});

	async.series([
		function(callback){
			sensingMouse.connectAndSetUp(callback);
		} ,
		function(callback){
			sensingMouse.notifyXAxis(function(error){
				console.log("X = " + error);
			});
			callback();
		} ,
		function(callback){
			sensingMouse.notifyYAxis(function(error){
				console.log("Y = " + error);
			});
			callback();
		} ,
		function(callback){
			sensingMouse.notifyZAxis(function(error){
				console.log("Z = " + error);
			});
			callback();
		} ,
		function(callback){
			sensingMouse.readXAxisValue(function(error , x){
				console.log("x = " , x);
				callback();
			});
		}
	]);
});
