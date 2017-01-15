var UUIDList = require("../UUIDList.json");

var ServiceUUID = UUIDList.GSRService.UUID;
var MeasurementUUID = UUIDList.GSRService.Characteristic.Measurement;

function GSRService() {
}

GSRService.prototype.onGSRValueChange = function (data) {
    this.parseGSR(data, function (values) {
        this.emit("GSRValueChange", values);
    }.bind(this));
};

GSRService.prototype.parseGSR = function (data, callback) {
    let gsr = data.readFloatLE(0);

    let values = { "GSR": gsr };
    callback(values);
};

GSRService.prototype.notifyGSR = function (callback) {
    this.onGSRValueChangeBinded = this.onGSRValueChange.bind(this);
    this.notifyCharacteristic(ServiceUUID, MeasurementUUID, true, this.onGSRValueChangeBinded, callback);
};

module.exports = GSRService;