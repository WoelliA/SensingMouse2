var async = require("async");
var sensingMouse = require("./index");
var csv = require("csv");
var fs = require("fs");
var format = require("date-format");

const MouseIDList = require("./MouseID.json");
if(process.argv.length === 3){
	var MouseNum = process.argv[2];
	var MouseID = MouseIDList[MouseNum];
}
console.log(MouseID);
if(typeof MouseID === "undefined"){
	process.exit(1);
}

const stringifierAcc = csv.stringify();
const accelerationWS = fs.createWriteStream("Acceleration_" + MouseNum + format("_yyyy_MM_dd_hh_mm_ss_SSS", new Date()) + ".csv", {encoding: "utf-8"});
stringifierAcc.pipe(accelerationWS);

const stringifierAM2321 = csv.stringify();
const AM2321WS = fs.createWriteStream("TemperatureHumidity_" + MouseNum + format("_yyyy_MM_dd_hh_mm_ss_SSS", new Date()) + ".csv", {encoding: "utf-8"});
stringifierAM2321.pipe(AM2321WS);

const stringifierClick = csv.stringify();
const clickWS = fs.createWriteStream("ClickForce_" + MouseNum + format("_yyyy_MM_dd_hh_mm_ss_SSS", new Date()) + ".csv", {encoding: "utf-8"});
stringifierClick.pipe(clickWS);

const stringifierGrip = csv.stringify();
const gripWS = fs.createWriteStream("GripForce_" + MouseNum + format("_yyyy_MM_dd_hh_mm_ss_SSS", new Date()) + ".csv", {encoding: "utf-8"});
stringifierGrip.pipe(gripWS);

const stringifierGSR = csv.stringify();
const GSRWS = fs.createWriteStream("GSR_" + MouseNum + format("_yyyy_MM_dd_hh_mm_ss_SSS", new Date()) + ".csv", {encoding: "utf-8"});
stringifierGSR.pipe(GSRWS);

const stringifierHR = csv.stringify();
const HRWS = fs.createWriteStream("HeartRate_" + MouseNum + format("_yyyy_MM_dd_hh_mm_ss_SSS", new Date()) + ".csv", {encoding: "utf-8"});
stringifierHR.pipe(HRWS);

sensingMouse.discoverById(MouseID , (sensingMouse) => {
	console.log("Discover : " + sensingMouse);

	sensingMouse.once("disconnect",
		() => {
			console.log("Disconnect");

			process.exit(0);
		});

	sensingMouse.on("AccelerationValueChange",
		(values) => {
			let timeStamp = format('yyyy:MM:dd:hh:mm:ss.SSS', new Date());
			values["ts"] = timeStamp;
			stringifierAcc.write(values);
			console.log(values);
		});

	sensingMouse.on("AM2321ValueChange",
		(values) => {
			let timeStamp = format('yyyy:MM:dd:hh:mm:ss.SSS', new Date());
			values["ts"] = timeStamp;
			stringifierAM2321.write(values);
		});

	sensingMouse.on("HeartRateValueChange",
		(values) => {
			let timeStamp = format('yyyy:MM:dd:hh:mm:ss.SSS', new Date());
			values["ts"] = timeStamp;
			stringifierHR.write(values);
		});

	sensingMouse.on("GripForceValueChange",
		(values) => {
			let timeStamp = format('yyyy:MM:dd:hh:mm:ss.SSS', new Date());
			values["ts"] = timeStamp;
			stringifierGrip.write(values);
		});

	sensingMouse.on("ClickForceValueChange",
		(values) => {
			let timeStamp = format('yyyy:MM:dd:hh:mm:ss.SSS', new Date());
			values["ts"] = timeStamp;
			stringifierClick.write(values);
		});

	sensingMouse.on("GSRValueChange",
		(values) => {
			let timeStamp = format('yyyy:MM:dd:hh:mm:ss.SSS', new Date());
			values["ts"] = timeStamp;
			stringifierGSR.write(values);
		});

	async.series([
		function(callback) {
			sensingMouse.connectAndSetUp(callback);
		},
		function(callback) {
			sensingMouse.notifyAcceleration((error) => {
				console.log("notify Acceleration" + error);
			});
			callback();
		},
		function(callback) {
			sensingMouse.notifyAM2321((error) => {
				console.log("notify AM2321" + error);
			});
			callback();
		},

		function(callback) {
			sensingMouse.notifyHeartRate((error) => {
				console.log("Notify HeartRate");
			});
			callback();
		},

		function(callback) {
			sensingMouse.notifyClickForce((error) =>  {
			console.log("Notify ClickForce");
			});
			callback();
		},
		function(callback) {
			sensingMouse.notifyGripForce((error) => {
				console.log("Notify GripForce");
			});
			callback();
		},

		function(callback) {
			sensingMouse.notifyGSR((error) => {
				console.log("Notify GSR");
			});
			callback();
		}
	]);
});
