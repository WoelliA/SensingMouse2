var UUIDList = require("../UUIDList.json");

var ServiceUUID = UUIDList.AM2321Service.UUID;
var MeasurementUUID = UUIDList.AM2321Service.Characteristic.Measurement;

function AM2321Service(){
}

AM2321Service.prototype.readAM2321 = function(callback){
	this.readDataCharacteristic(ServiceUUID , MeasurementUUID , function(error , data){
		if(error){
			return callback(error);
		}
		this.parseAM2321(data , function(values){
			callback(null , values);
		}.bind(this));
	}.bind(this));
};

AM2321Service.prototype.onAM2321ValueChange = function(data){
	this.parseAM2321(data , function(values){
		this.emit("AM2321ValueChange" , values);
	}.bind(this));
};

AM2321Service.prototype.parseAM2321 = function(data , callback){
	let temperature = data.readFloatLE(0);
	let humidity = data.readFloatLE(4);

	let values = {"temperature" : temperature , "humidity" : humidity};
	callback(values);
};

AM2321Service.prototype.notifyAM2321 = function(callback){
	this.onAM2321ValueChangeBinded = this.onAM2321ValueChange.bind(this);
	this.notifyCharacteristic(ServiceUUID , MeasurementUUID , true , this.onAM2321ValueChangeBinded , callback);
};

module.exports = AM2321Service;
