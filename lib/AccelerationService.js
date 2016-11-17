var UUIDList = require("./UUIDList.json");

var ServiceUUID = UUIDList.AccelerationService.UUID;
var XAxisCharacteristic = UUIDList.AccelerationService.Characteristic.XAxis;
var YAxisCharacteristic = UUIDList.AccelerationService.Characteristic.YAxis;
var ZAxisCharacteristic = UUIDList.AccelerationService.Characteristic.ZAxis;

function AccelerationService(){
	this.onXAxisValueChangeBinded = this.onXAxisValueChange.bind(this);
}

AccelerationService.prototype.readXAxisValue = function(callback){
	this.readDataCharacteristic(ServiceUUID , XAxisCharacteristic , function(error , data){
		if(error){
			return callback(error);
		}
		this.parseValue(data , function(x){
			callback(null , x);
		}.bind(this));
	}.bind(this));
};

AccelerationService.prototype.onXAxisValueChange = function(data){
	this.parseValue(data , function(x){
		this.emit("XAxisValueChange" , x);
	}.bind(this));
};

AccelerationService.prototype.notifyXAxis = function(data , callback){
	this.notifyCharacteristic(ServiceUUID , XAxisCharacteristic , true , this.onXAxisValueChangeBinded , callback);
};

AccelerationService.prototype.parseValue = function(data , callback){
	var x = data.readDoubleLE(0);
	callback(x);
};

module.exports = AccelerationService;
