var UUIDList = require("../UUIDList.json");

var ServiceUUID = UUIDList.AM2321Service.UUID;
var HumidityUUID = UUIDList.AM2321Service.Characteristic.Humidity;
var TemperatureUUID = UUIDList.AM2321Service.Characteristic.Temperature;

function AM2321Service(){
}

AM2321Service.prototype.readHumidityValue = function(callback){
	this.readDataCharacteristic(ServiceUUID , HumidityUUID , function(error , data){
		if(error){
			return callback(error);
		}
		this.parseHumidity(data , function(value){
			callback(null , value);
		}.bind(this));
	}.bind(this));
};

AM2321Service.prototype.readTemperatureValue = function(callback){
	this.readDataCharacteristic(ServiceUUID , TemperatureUUID , function(error , data){
		if(error){
			return callback(error);
		}
		this.parseTemperature(data , function(value){
			callback(null , value);
		}.bind(this));
	}.bind(this));
};

AM2321Service.prototype.onHumidityValueChange = function(data){
	this.parseHumidity(data , function(value){
		this.emit("HumidityValueChange" , value);
	}.bind(this));
};

AM2321Service.prototype.onTemperatureValueChange = function(data){
	this.parseTemperature(data , function(value){
		this.emit("TemperatureValueChange" , value);
	}.bind(this));
};

AM2321Service.prototype.parseHumidity = function(data , callback){
	var value = data.readFloatLE(0);
	callback(value);
};

AM2321Service.prototype.parseTemperature = function(data , callback){
	var value = data.readFloatLE(0);
	callback(value);
};

AM2321Service.prototype.notifyHumidity = function(callback){
	this.onHumidityValueChangeBinded = this.onHumidityValueChange.bind(this);
	this.notifyCharacteristic(ServiceUUID , HumidityUUID , true , this.onHumidityValueChangeBinded , callback);
};

AM2321Service.prototype.notifyTemperature = function(callback){
	this.onTemperatureValueChangeBinded = this.onTemperatureValueChange.bind(this);
	this.notifyCharacteristic(ServiceUUID , TemperatureUUID , true , this.onTemperatureValueChangeBinded , callback);
};

module.exports = AM2321Service;
