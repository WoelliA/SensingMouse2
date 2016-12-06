var NobleDevice = require("noble-device");

var AccelerationService = require("./Service/AccelerationService.js");
var AM2321Service = require("./Service/AM2321Service.js");
var HeartRateService = require("./Service/HeartRateService.js");

var UUIDList = require("./UUIDList.json");

var SensingMouse = function(peripheral){
	NobleDevice.call(this , peripheral);
};

SensingMouse.SCAN_UUIDS = [UUIDList.AdvertisementService.UUID];

NobleDevice.Util.inherits(SensingMouse, NobleDevice);
NobleDevice.Util.mixin(SensingMouse , NobleDevice.DeviceInformationService);
NobleDevice.Util.mixin(SensingMouse , AccelerationService);
NobleDevice.Util.mixin(SensingMouse , AM2321Service);
NobleDevice.Util.mixin(SensingMouse , HeartRateService);

module.exports = SensingMouse;
