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

	async.series([
		function(callback){
			sensingMouse.connectAndSetUp(callback);
		} ,

		function(callback){
			sensingMouse.readXAxisValue(function(error , x){
				console.log("x = " , x);
				callback();
			});
		} ,
		function(callback){
			sensingMouse.notifyXAxis(function(error){
				console.log(error);
			});
			callback();
		}
	]);
});
