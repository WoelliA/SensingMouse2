var UUIDList = require("../UUIDList.json");
var SensorLocation = require("./HeartRateSensorLocation.json");

var ServiceUUID = UUIDList.HeartRateService.UUID;
var MeasurementUUID = UUIDList.HeartRateService.Characteristic.Measurement;
var LocationUUID = UUIDList.HeartRateService.Characteristic.Location;

function HeartRateService(){
}

HeartRateService.prototype.readHeartRate = function(callback){
	this.readDataCharacteristic(ServiceUUID , MeasurementUUID , function(error , data){
		if(error){
			return callback(error);
		}
		this.parseMesurement(data , function(value){
			callback(null , value);
		}.bind(this));
	}.bind(this));
};

HeartRateService.prototype.readHeartRateSensorLocation = function(callback){
	this.readDataCharacteristic(ServiceUUID , LocationUUID , function(error , data){
		if(error){
			return callback(error);
		}
		this.parseLocation(data , function(value){
			callback(null , value);
		}.bind(this));
	}.bind(this));
};

HeartRateService.prototype.onHeartRateValueChange = function(data){
	this.parseHeartRate(data , function(value){
		this.emit("HeartRateValueChange" , value);
	}.bind(this));
};

HeartRateService.prototype.parseHeartRate = function(data , callback){
	let heartRate = 0;
	let flags = data.readUInt8(0);
	if (flags & 0x01) {
		heartRate = data.readUInt16LE(1);
	} else {
		heartRate = data.readUInt8(1);
	}
	callback(heartRate);
};

HeartRateService.prototype.parseLocation = function(data , callback){
	var locationNum = data.readUInt8();
	var locationName;
	Object.keys(SensorLocation).forEach(function(key){
		if(locationNum === SensorLocation[key]){
			locationName = key;
		}
	});
	callback(locationName);
};

HeartRateService.prototype.notifyHeartRate = function(callback){
	this.onHumidityValueChangeBinded = this.onHeartRateValueChange.bind(this);
	this.notifyCharacteristic(ServiceUUID , MeasurementUUID , true , this.onHumidityValueChangeBinded , callback);
};

module.exports = HeartRateService;
