var UUIDList = require("./UUIDList.json");

var ServiceUUID = UUIDList.TemperatureHumidityService.UUID;
var HumidityUUID = UUIDList.TemperatureHumidityService.Characteristic.Humidity;
var TemperatureUUID = UUIDList.TemperatureHumidityService.Characteristic.Temperature;

function TemperatureHumidityService(){
}

TemperatureHumidityService.prototype.readHumidityValue = function(callback){
	this.readDataCharacteristic(ServiceUUID , HumidityUUID , function(error , data){
		if(error){
			return callback(error);
		}
		this.parseHumidity(data , function(value){
			callback(null , value);
		}.bind(this));
	}.bind(this));
};

TemperatureHumidityService.prototype.readTemperatureValue = function(callback){
	this.readDataCharacteristic(ServiceUUID , TemperatureUUID , function(error , data){
		if(error){
			return callback(error);
		}
		this.parseTemperature(data , function(value){
			callback(null , value);
		}.bind(this));
	}.bind(this));
};

TemperatureHumidityService.prototype.onHumidityValueChange = function(data){
	this.parseHumidity(data , function(value){
		this.emit("HumidityValueChange" , value);
	}.bind(this));
};

TemperatureHumidityService.prototype.onTemperatureValueChange = function(data){
	this.parseTemperature(data , function(value){
		this.emit("TemperatureValueChange" , value);
	}.bind(this));
};

TemperatureHumidityService.prototype.parseHumidity = function(data , callback){
	var value = data.readFloatLE(0);
	callback(value);
};

TemperatureHumidityService.prototype.parseTemperature = function(data , callback){
	var value = data.readFloatLE(0);
	callback(value);
};

TemperatureHumidityService.prototype.notifyHumidity = function(callback){
	this.onHumidityValueChangeBinded = this.onHumidityValueChange.bind(this);
	this.notifyCharacteristic(ServiceUUID , HumidityUUID , true , this.onHumidityValueChangeBinded , callback);
};

TemperatureHumidityService.prototype.notifyTemperature = function(callback){
	this.onTemperatureValueChangeBinded = this.onTemperatureValueChange.bind(this);
	this.notifyCharacteristic(ServiceUUID , TemperatureUUID , true , this.onTemperatureValueChangeBinded , callback);
};

module.exports = TemperatureHumidityService;
