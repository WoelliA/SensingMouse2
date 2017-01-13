var UUIDList = require("../UUIDList.json");

var ServiceUUID = UUIDList.GripForceService.UUIDList;
var MeasurementUUID = UUIDList.GripForceService.Characteristic.Measurement;

function GripForceService() {
}

GripForceService.prototype.onGripForceValueChange = function (data) {
    this.parseGripForce(data, function (values) {
        this.emit("GripForceValueChange", values);
    }.bind(this));
};

GripForceService.prototype.parseGripForce = function (data, callback) {
    let gripForceLeft = data.readFloatLE(0);
    let gripForceRight = data.readFloatLE(4);

    let values = { "GripForceLeft": gripForceLeft, "GripForceRight": gripForceRight };
    callback(values);
};

GripForceService.prototype.notifyGripForce = function (callback) {
    this.onGripForceValueChangeBinded = this.onGripForceValueChange.bind(this);
    this.notifyCharacteristic(ServiceUUID, MeasurementUUID, true, this.onGripForceValueChangeBinded, callback);
};

module.exports = GripForceService;