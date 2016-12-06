var UUIDList = require("../UUIDList.json");

var ServiceUUID = UUIDList.AccelerationService.UUID;
var MeasurementUUID = UUIDList.AccelerationService.Characteristic.Measurement;

function AccelerationService(){
}

AccelerationService.prototype.readAccelerationValue = function(callback){
	this.readDataCharacteristic(ServiceUUID , MeasurementUUID , function(error , data){
		if(error){
			return callback(error);
		}
		this.parseAcceleration(data , function(values){
			callback(null , values);
		}.bind(this));
	}.bind(this));
};

AccelerationService.prototype.onAccelerationValueChange = function(data){
	this.parseAcceleration(data , function(values){
		this.emit("AccelerationValueChange" , values);
	}.bind(this));
};

AccelerationService.prototype.parseAcceleration = function(data , callback){
	let x = data.readFloatLE(0);
	let y = data.readFloatLE(4);
	let z = data.readFloatLE(8);

	let values = {"x" : x , "y" : y , "z" : z};
	callback(values);
};

AccelerationService.prototype.notifyAcceleration = function(callback){
	this.onAccelerationValueChangeBinded = this.onAccelerationValueChange.bind(this);
	this.notifyCharacteristic(ServiceUUID , MeasurementUUID , true , this.onAccelerationValueChangeBinded , callback);
};

AccelerationService.prototype.unnotifyAcceleration = function(callback){
	this.notifyCharacteristic(ServiceUUID , MeasurementUUID , false , this.onAccelerationValueChangeBinded , callback);
};

module.exports = AccelerationService;
