var UUIDList = require("./UUIDList.json");

var ServiceUUID = UUIDList.AccelerationService.Service;
var XAxisCharacteristic = UUIDList.AccelerationService.XAxisCharacteristic;
var YAxisCharacteristic = UUIDList.AccelerationService.YAxisCharacteristic;
var ZAxisCharacteristic = UUIDList.AccelerationService.ZAxisCharacteristic;

function AccelerationService(){

}

AccelerationService.prototype.readXAxisAcceleration = function(callback){
	this.readDataCharacteristic(ServiceUUID , XAxisCharacteristic , function(error , data){
		if(error){
			return callback(error);
		}
		this.parseAccelerationData(data , function(x){
			callback(x);
		}.bind(this));
	}.bind(this));
};

AccelerationService.prototype.parseAccelerationData = function(data , callback){
	var x = data.readDoubleLE();
	callback(x);
};
