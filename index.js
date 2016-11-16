var NobleDevice = require("noble-device");

var UUIDList = require("./UUIDList.json");

var SensingMouse = function(peripheral){
	NobleDevice.call(this, peripheral);
};

SensingMouse.SCAN_UUIDS = [UUIDList["AdvertisementService"]];


NobleDevice.Util.inherits(SensingMouse, NobleDevice);
