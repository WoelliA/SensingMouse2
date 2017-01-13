var async = require("async");
var sensingMouse = require("./index");
var csv = require('csv');
var stringify = require('csv-stringify');
var csvWriter = require('csv-write-stream');
var fs = require('fs');

//stringifyer = stringify({ delimiter: ',' })


sensingMouse.discover((sensingMouse) => {
    console.log("Discover : " + sensingMouse);

    sensingMouse.once("disconnect",
        () => {
            console.log("Disconnect");

            process.exit(0);
        });

    sensingMouse.on("AccelerationValueChange",
        (values) => {
            let timeStamp = new Date();
            // values["timestamp"] = timeStamp.toISOString();
            var writer = csvWriter();
            writer.pipe(fs.createWriteStream('Acceleration.csv'));
            writer.write(values);
            writer.end();
            console.log("Change		X = " + values["x"]);
            console.log("Change		Y = " + values["y"]);
            console.log("Change		Z = " + values["z"]);
        });

    sensingMouse.on("AM2321ValueChange",
        (values) => {
            let timeStamp = new Date();
            // values["timestamp"] = timeStamp.toISOString();
            var writer = csvWriter();
            writer.pipe(fs.createWriteStream('TempHumidity.csv'));
            writer.write(values);
            writer.end();
            console.log("Change		Temperature = " + values["temperature"]);
            console.log("Change		Humidity = " + values["humidity"]);
        });

    sensingMouse.on("HeartRateValueChange",
        (value) => {
            let timeStamp = new Date();
            // values["timestamp"] = timeStamp.toISOString();
            var writer = csvWriter();
            writer.pipe(fs.createWriteStream('HeartRate.csv'));
            writer.write(value);
            writer.end();
            console.log("Change		HeartRate = " + value["HR"]);
        });

    sensingMouse.on("GripForceValueChange",
        (values) => {
            let timeStamp = new Date();
            // values["timestamp"] = timeStamp.toISOString();
            var writer = csvWriter();
            writer.pipe(fs.createWriteStream('GripForce.csv'));
            writer.write(values);
            writer.end();
            console.log(values["GripForceRight"]);
            console.log(values["GripForceLeft"]);
        });

    sensingMouse.on("ClickForceValueChange",
        (values) => {
            let timeStamp = new Date();
            //  values["timestamp"] = timeStamp.toISOString();
            var writer = csvWriter();
            writer.pipe(fs.createWriteStream('ClickForce.csv'));
            writer.write(values);
            writer.end();
        });

    sensingMouse.on("GSRValueChange",
        (values) => {
            let timeStamp = new Date();
            //   values["timestamp"] = timeStamp.toISOString();
            var writer = csvWriter();
            writer.pipe(fs.createWriteStream('GSR.csv'));
            writer.write(values);
            writer.end();
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
