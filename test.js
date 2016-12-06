var async = require("async");
var sensingMouse = require("./index");

sensingMouse.discover((sensingMouse) => {
	console.log("Discover : " + sensingMouse);

	sensingMouse.once("disconnect" , () => {
		console.log("Disconnect");
		process.exit(0);
	});

	sensingMouse.on("AccelerationValueChange" , (values) => {
		console.log("Change		X = " + values["x"]);
		console.log("Change		Y = " + values["y"]);
		console.log("Change		Z = " + values["z"]);
	});

	sensingMouse.on("AM2321ValueChange" , (values) => {
		console.log("Change		Temperature = " + values["temperature"]);
		console.log("Change		Humidity = " + values["humidity"]);
	});

	sensingMouse.on("HeartRateValueChange" , (value) => {
		console.log("Change		HeartRate = " + value);
	});

	async.series([
		function(callback){
			sensingMouse.connectAndSetUp(callback);
		} ,
		function(callback){
			sensingMouse.readAccelerationValue((error , values) => {
				console.log("Change		X = " + values.x);
				console.log("Change		Y = " + values.y);
				console.log("Change		Z = " + values.z);
			});
			callback();
		} ,
		function(callback){
			sensingMouse.notifyAcceleration((error) => {
				console.log("notify Acceleration" + error);
			});
			callback();
		} ,
		function(callback){
			sensingMouse.notifyAM2321((error) => {
				console.log("notify AM2321" + error);
			});
			callback();
		},
		function(callback){
			sensingMouse.notifyHeartRate((error) => {
				console.log("Notify HeartRate");
			});
			callback();
		},
		function(callback){
			sensingMouse.readHeartRateSensorLocation(function(error , location){
				console.log("Location = " + location);
			});
			callback();
		}
	]);
});
