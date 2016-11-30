var UUIDList = require("./UUIDList.json");

var ServiceUUID = UUIDList.AccelerationService.UUID;
var XAxisCharacteristic = UUIDList.AccelerationService.Characteristic.XAxis;
var YAxisCharacteristic = UUIDList.AccelerationService.Characteristic.YAxis;
var ZAxisCharacteristic = UUIDList.AccelerationService.Characteristic.ZAxis;

function AccelerationService(){
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

AccelerationService.prototype.readYAxisValue = function(callback){
	this.readDataCharacteristic(ServiceUUID , YAxisCharacteristic , function(error , data){
		if(error){
			return callback(error);
		}
		this.parseValue(data , function(y){
			callback(null , y);
		}.bind(this));
	}.bind(this));
};

AccelerationService.prototype.readZAxisValue = function(callback){
	this.readDataCharacteristic(ServiceUUID , ZAxisCharacteristic , function(error , data){
		if(error){
			return callback(error);
		}
		this.parseValue(data , function(z){
			callback(null , z);
		}.bind(this));
	}.bind(this));
};

AccelerationService.prototype.onXAxisValueChange = function(data){
	this.parseValue(data , function(x){
		this.emit("XAxisValueChange" , x);
	}.bind(this));
};

AccelerationService.prototype.onYAxisValueChange = function(data){
	this.parseValue(data , function(y){
		this.emit("YAxisValueChange" , y);
	}.bind(this));
};

AccelerationService.prototype.onZAxisValueChange = function(data){
	this.parseValue(data , function(z){
		this.emit("ZAxisValueChange" , z);
	}.bind(this));
};

AccelerationService.prototype.parseValue = function(data , callback){
	var value = data.readDoubleLE(0);
	callback(value);
};

AccelerationService.prototype.notifyXAxis = function(callback){
	this.onXAxisValueChangeBinded = this.onXAxisValueChange.bind(this);
	this.notifyCharacteristic(ServiceUUID , XAxisCharacteristic , true , this.onXAxisValueChangeBinded , callback);
};

AccelerationService.prototype.unnotifyXAxis = function(callback){
	this.notifyCharacteristic(ServiceUUID , XAxisCharacteristic , false , this.onXAxisValueChangeBinded , callback);
};

AccelerationService.prototype.notifyYAxis = function(callback){
	this.onYAxisValueChangeBinded = this.onYAxisValueChange.bind(this);
	this.notifyCharacteristic(ServiceUUID , YAxisCharacteristic , true , this.onYAxisValueChangeBinded , callback);
};

AccelerationService.prototype.unnotifyYAxis = function(callback){
	this.notifyCharacteristic(ServiceUUID , YAxisCharacteristic , false , this.onYAxisValueChangeBinded , callback);
};

AccelerationService.prototype.notifyZAxis = function(callback){
	this.onZAxisValueChangeBinded = this.onZAxisValueChange.bind(this);
	this.notifyCharacteristic(ServiceUUID , ZAxisCharacteristic , true , this.onZAxisValueChangeBinded , callback);
};

AccelerationService.prototype.unnotifyZAxis = function(callback){
	this.notifyCharacteristic(ServiceUUID , ZAxisCharacteristic , false , this.onZAxisValueChangeBinded , callback);
};

module.exports = AccelerationService;
