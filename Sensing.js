var async = require("async");
var sensingMouse = require("./index");
var csv = require('csv');
var csvWriter = require('csv-write-stream');
var fs = require('fs');
var format = require('date-format');
var writer = csvWriter({
    sendHeaders: false,
    separator: ';'
});


sensingMouse.discover((sensingMouse) => {
    console.log("Discover : " + sensingMouse);

    sensingMouse.once("disconnect",
        () => {
            console.log("Disconnect");

            process.exit(0);
        });

    writer.pipe(fs.createWriteStream('Acc.csv', { flags: 'a' }));
    sensingMouse.on("AccelerationValueChange",
        (values) => {
            console.log(values);
            let timeStamp = format('yyyy:MM:dd:hh:mm:ss.SSS', new Date());
            values["ts"] = timeStamp;
            writer.write(values);

        });

    writer.pipe(fs.createWriteStream('TempHum.csv', { flags: 'a' }));
    sensingMouse.on("AM2321ValueChange",
        (values) => {
            console.log(values);
            let timeStamp = format('yyyy:MM:dd:hh:mm:ss.SSS', new Date());
            values["ts"] = timeStamp;
            writer.write(values);
        });

    writer.pipe(fs.createWriteStream('HR.csv', { flags: 'a' }));
    sensingMouse.on("HeartRateValueChange",
        (values) => {
            console.log(values);
            let timeStamp = format('yyyy:MM:dd:hh:mm:ss.SSS', new Date());
            values["ts"] = timeStamp;
            writer.write(values);
        });

    writer.pipe(fs.createWriteStream('GripForce.csv', { flags: 'a' }));
    sensingMouse.on("GripForceValueChange",
        (values) => {
            console.log(values);
            let timeStamp = format('yyyy:MM:dd:hh:mm:ss.SSS', new Date());
            values["ts"] = timeStamp;
            writer.write(values);
        });

    writer.pipe(fs.createWriteStream('ClickForce.csv', { flags: 'a' }));
    sensingMouse.on("ClickForceValueChange",
        (values) => {
            console.log(values);
            let timeStamp = format('yyyy:MM:dd:hh:mm:ss.SSS', new Date());
            values["ts"] = timeStamp;
            writer.write(values);
        });

    writer.pipe(fs.createWriteStream('GSR.csv', { flags: 'a' }));
    sensingMouse.on("GSRValueChange",
        (values) => {
            console.log(values);
            let timeStamp = format('yyyy:MM:dd:hh:mm:ss.SSS', new Date());
            values["ts"] = timeStamp;
            writer.write(values);
        });


   //writeValues = function (values, fileName) {
   //    let timeStamp = format('yyyy:MM:dd:hh:mm:ss.SSS', new Date());
   //    var writer = csvWriter({
   //         sendHeaders: false,
   //         separator: ';'
   //    });
   //     this.fileName = fileName;
   //     writer.pipe(fs.createWriteStream(fileName, { flags: 'a' }));   
   //     values["ts"] = timeStamp;
   //     writer.write(values);
   // };


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








    //sensingMouse.on("ClickForceValueChange",
    //    (values) => {
    //        csvFile.pipe(fs.createWriteStream('ClickForce.csv'));
    //        writer.write(values);
    //        writer.end();
    //        console.log("ClickRight" + values["ClickForceRight"]);
    //        console.log("Clickleft" + values["ClickForceLeft"]);
    //    });

   //sensingMouse.on("HeartRateValueChange",
    //    (values) => {
    //        console.log(values);
    //        var fileName = 'HR.csv';
    //        writeValues(values, fileName);

    //    });