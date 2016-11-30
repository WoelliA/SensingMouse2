var NobleDevice = require("noble-device");

var AccelerationService = require("./AccelerationService.js");
var AM2321Service = require("./AM2321Service.js");

var UUIDList = require("./UUIDList.json");

var SensingMouse = function(peripheral){
	NobleDevice.call(this , peripheral);
};

SensingMouse.SCAN_UUIDS = [UUIDList.AdvertisementService.UUID];

NobleDevice.Util.inherits(SensingMouse, NobleDevice);
NobleDevice.Util.mixin(SensingMouse , NobleDevice.DeviceInformationService);
NobleDevice.Util.mixin(SensingMouse , AccelerationService);
NobleDevice.Util.mixin(SensingMouse , AM2321Service);

module.exports = SensingMouse;
