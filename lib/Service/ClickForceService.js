var UUIDList = require("../UUIDList.json");

var ServiceUUID = UUIDList.ClickForceService.UUID;
var MeasurementUUID = UUIDList.ClickForceService.Characteristic.Measurement;

function ClickForceService() {
}

ClickForceService.prototype.onClickForceValueChange = function (data) {
    this.parseClickForce(data, function (values) {
        this.emit("ClickForceValueChange", values);
    }.bind(this));
};

ClickForceService.prototype.parseClickForce = function (data, callback) {
    let clickForceLeft = data.readFloatLE(0);
    let clickForceRigth = data.readFloatLE(4);

    let values = { "ClickForceLeft": clickForceLeft, "ClickForceRight": clickForceRigth };
    callback(values);
};

ClickForceService.prototype.notifyClickForce = function (callback) {
    this.onClickForceValueChangeBinded = this.onClickForceValueChange.bind(this);
    this.notifyCharacteristic(ServiceUUID, MeasurementUUID, true, this.onClickForceValueChangeBinded, callback);
};

module.exports = ClickForceService;