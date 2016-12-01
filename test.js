var async = require("async");
var sensingMouse = require("./index");

sensingMouse.discover((sensingMouse) => {
	console.log("Discover : " + sensingMouse);

	sensingMouse.once("disconnect" , () => {
		console.log("Disconnect");
		process.exit(0);
	});

	sensingMouse.on("XAxisValueChange" , function(x){
		console.log("Change		X = " + x);
	});

	sensingMouse.on("YAxisValueChange" , function(y){
		console.log("Change		Y = " + y);
	});

	sensingMouse.on("ZAxisValueChange" , function(z){
		console.log("Change		Z = " + z);
	});

	sensingMouse.on("TemperatureValueChange" , function(value){
		console.log("Change		Temperature = " + value);
	});

	sensingMouse.on("HumidityValueChange" , function(value){
		console.log("Change		Humidity = " + value);
	});

	sensingMouse.on("HeartRateValueChange" , function(value){
		console.log("Change		HeartRate = " + value);
	});

	async.series([
		function(callback){
			sensingMouse.connectAndSetUp(callback);
		} ,
		function(callback){
			sensingMouse.notifyXAxis(function(error){
				console.log("error = " + error);
			});
			callback();
		} ,
		/*
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
			sensingMouse.notifyTemperature(function(error){
				console.log("Temperature = " + error);
			});
			callback();
		} ,
		function(callback){
			sensingMouse.notifyHumidity(function(error){
				console.log("Humidity = " + error);
			});
			callback();
		} ,
		*/
		function(callback){
			sensingMouse.readHeartRateSensorLocation(function(error , location){
				console.log("Location = " + location);
			});
			callback();
		} ,
		function(callback){
			sensingMouse.notifyHeartRate((error) => {
				console.log("HeartRate = " + error);
			});
			callback();
		}
	]);
});
