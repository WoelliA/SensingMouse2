var SensingMouse = require("./index");

function onDiscover(SensingMouse){
	console.log("Name = " + SensingMouse.peripheral.advertisement.localName);
	console.log("UUIDs = " + SensingMouse.peripheral.advertisement.serviceUuids);
}

SensingMouse.discoverAll(onDiscover);
