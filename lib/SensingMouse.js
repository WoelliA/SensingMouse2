var NobleDevice = require("noble-device");

var AccelerationService = require("./AccelerationService.js");

var UUIDList = require("./UUIDList.json");

var SensingMouse = function(peripheral){
	NobleDevice.call(this , peripheral);
};

SensingMouse.SCAN_UUIDS = [UUIDList.AdvertisementService.UUID];

NobleDevice.Util.inherits(SensingMouse, NobleDevice);
NobleDevice.Util.mixin(SensingMouse , NobleDevice.DeviceInformationService);
NobleDevice.Util.mixin(SensingMouse , AccelerationService);

module.exports = SensingMouse;
