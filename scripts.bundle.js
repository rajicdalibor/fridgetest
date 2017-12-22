
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(a,b){function c(b,d){var e,f;if("."!=b[0]&&"/"!=b[0])return a(b);if(d=d||"root",e=c.resolve(b),!e&&/\.json$/i.test(b))return a("./"+c.basename(b));if(f=c.cache[e],!f)try{return a(b)}catch(g){throw Error('failed to require "'+b+'" from '+d+"\n"+g.message+"\n"+g.stack)}return f.exports||(f.exports={},f.call(f.exports,f,f.exports,c.relative(e))),f.exports}c.cache={},c.basename=a("path").basename,c.resolve=function(b){var d,e,f,g;if("."!=b[0])return a.resolve(b);for(d="/"===b.slice(-1)?b:b+"/",e=[b,b+".js",d+"index.js",b+".json",d+"index.json"],f=0;g=e[f];f++)if(c.cache[g])return g},c.register=function(a,b){c.cache[a]=b},c.relative=function(a){function b(b){var d,e,f,g,h;if("."!=b[0])return c(b);for(d=a.split("/"),e=b.split("/"),d.pop(),f=0,g=e.length;g>f;f+=1)h=e[f],".."==h?d.pop():"."!=h&&d.push(h);return c(d.join("/"),a)}return b.resolve=c.resolve,b.cache=c.cache,b},c.register("./event-emitter.js",function(a,b,c){var d=c("events"),e=c("util");a.exports.makeEmitter=function(a){e.inherits(a,d)},a.exports.instantiateEmitter=function(a){d.call(a)}}),c.register("./wb-characteristic.js",function(a,b,c){function h(a,b,c){function h(a,b){var c=d.hexAsArray(b);n=new DataView(new Uint8Array(c).buffer),g.emit("characteristicvaluechanged",{target:g})}var g,j,k,l,m,n,o;e.instantiateEmitter(this),g=this,j=b,k=a,l=c,c.wbCharacteristic=this,m=new i(l.allProperties()),n=null,o=!1,Object.defineProperty(this,"uuid",{get:function(){return d.toWbUUID(l.uuid)}}),Object.defineProperty(this,"service",{get:function(){return k}}),Object.defineProperty(this,"properties",{get:function(){return m}}),Object.defineProperty(this,"value",{get:function(){return n}}),this.getDescriptor=function(a){var b=this;return d.errorLoggingPromise(function(c,e){var h,g=d.toVensiUUID(j.BluetoothUUID.getDescriptor(a));void 0===g?e("Unable to find descriptor with requested UUID "+a):(h=l.findDescriptor(g),h?c(new f(b,j,h)):e("Descriptor "+a+" not found"))})},this.getDescriptors=function(a){var b=this;return d.errorLoggingPromise(function(c,e){var i,k,m,g=l.getAllDescriptors(),h=Object.values(g);if(a)i=d.toVensiUUID(j.BluetoothUUID.getDescriptor(a)),h.indexOf(i)>-1?c([new f(b,j,i)]):e("Unable to find descriptor with requested UUID "+a);else{for(k=[],m=0;m<h.length;m++)k.push(new f(b,j,h[m]));c(k)}})},this.readValue=function(){return d.errorLoggingPromise(function(a,b){l.readValue({fulfill:function(b,c){var e=d.hexAsArray(c);a(new DataView(new Uint8Array(e).buffer))},reject:b})})},this.writeValue=function(a){return d.errorLoggingPromise(function(b,c){l.writeValue({fulfill:b,reject:c},d.arrayAsHex(Array.prototype.slice.call(a)))})},this.startNotifications=function(){var a=this;return d.errorLoggingPromise(function(b,c){return o?void c("Already notifying"):void l.enableNotifications({fulfill:function(d,e){e?(o=!0,d.on("valueChange",h),b(a)):c("Did not receive expected response from the gateway")},reject:c},!0)})},this.stopNotifications=function(){var a=this;return d.errorLoggingPromise(function(b,c){return o?void l.enableNotifications({fulfill:function(d,e){e?c("Did not receive expected response from the gateway"):(o=!1,d.removeListener("valueChange",h),b(a))},reject:c},!1):void c("Was not notifying")})},this.addEventListener=function(a,b){this.on(a,b)},this.removeEventListener=function(a,b){this.removeListener(a,b)}}function i(a){function b(a){return a.charAt(0).toUpperCase()+a.slice(1)}var c,d;for(c in g)wbPropName=g[c],d=b(wbPropName),"object"==typeof a[d]?this[wbPropName]=1==a[d].enabled:("reliableWrite"==wbPropName||"writableAuxiliaries"==wbPropName)&&(a.ExtendedProperties&&1===a.ExtendedProperties.enabled?(console.error("WB spec 5.4.1 section not fully implemented."),this[wbPropName]=!1):this[wbPropName]=!1)}var d=c("./util.js"),e=c("./event-emitter"),f=c("./wb-descriptor").BluetoothRemoteGATTDescriptor,g=["broadcast","read","writeWithoutResponse","write","notify","indicate","authenticatedSignedWrites","reliableWrite","writableAuxiliaries"];a.exports.BluetoothRemoteGATTCharacteristic=h,e.makeEmitter(h)}),c.register("./wb-server.js",function(a,b,c){function h(a,b,c,h,i){function n(){var c,a=l.getAllServices(),b=Object.keys(a);for(c=0;c<b.length;c++)"string"==typeof b[c]&&4==b[c].length&&(b[c]=parseInt(b[c],16));return i?e.getAllSupportedServices(k,b,i,h):e.getOptionalServices(k,b,h)}function o(a){var b=this;return d.errorLoggingPromise(function(c,e){var h,i,j,g=n();if(a)h=d.toVensiUUID(k.BluetoothUUID.getService(a)),g.indexOf(h)>-1?c([new f(b.device,k,h)]):e("Service "+a+" not found");else{for(i=[],j=0;j<g.length;j++)i.push(new f(b.device,k,g[j]));c(i)}})}function p(a){var b=this;return d.errorLoggingPromise(function(c,e){var h,g=d.toVensiUUID(k.BluetoothUUID.getService(a));-1!=n().indexOf(g)?void 0===g?e("Unable to find service with requested UUID "+a):(h=l.findService(g),h?c(new f(b.device,k,h)):(h=l.findService(a),h?(console.error("Hack alert: Fix VensiUUID "),c(new f(b.device,k,h))):e("Service "+a+" not found"))):e("Service not supported")})}var j,k,l,m;g.instantiateEmitter(this),j=this,k=b,l=c,m=!1,Object.defineProperty(this,"device",{get:function(){return a}}),Object.defineProperty(this,"connected",{get:function(){return m},set:function(a){m=a}}),j.connect=function(){var a=this;return new Promise(function(b,c){l.connect({fulfill:function(c){l=c,m=!0,b(a)},reject:c})})},j.disconnect=function(){var a=this;m&&l.disconnect(function(b){a.device.emit("gattserverdisconnected",{target:a}),d.removeNotificationListeners(b),a.device=null,m=!1})},j.getPrimaryService=p,j.getPrimaryServices=o}var d=c("./util.js"),e=c("./wb-filters"),f=c("./wb-service").BluetoothRemoteGATTService,g=c("./event-emitter");a.exports.BluetoothRemoteGATTServer=h,g.makeEmitter(h)}),c.register("./wb-advertisement.js",function(a,b,c){"use strict";var d=c("./util.js"),e=c("./activeScans").activeScans,f=c("./activeScans").scanningActive,g=function(a){var b=this;return Object.defineProperty(b,"device",{get:function(){return a._wbBluetoothDevice}}),Object.defineProperty(b,"uuids",{get:function(){return a.serviceUUIDs}}),Object.defineProperty(b,"name",{get:function(){return a.name}}),Object.defineProperty(b,"appearance",{get:function(){return void 0}}),Object.defineProperty(b,"txPower",{get:function(){return a.txPowerLevel}}),Object.defineProperty(b,"rssi",{get:function(){return a.rssi}}),Object.defineProperty(b,"manufacturerData",{get:function(){return d.mfrDataToMap(a)}}),Object.defineProperty(b,"serviceData",{get:function(){return void 0}}),b},h=function(a,b){var c=this,h=a.getGateway(),i=function(a){a.uuid==b.id&&b.emit("advertisementreceived",new g(a))};c.watchAdv=function(){return b.watchingAdvertisements=!0,d.errorLoggingPromise(function(a,b){h.scan({fulfill:function(){e.watchScan++,h.on("scan",i),a(void 0)},reject:b})})},c.unwatchAdv=function(){h.removeListener("scan",i),e.watchScan--,f()||h.stopScan(function(){console.log("scan stopped")}),b.watchingAdvertisements=!1}};a.exports.Advertisement=h,a.exports.BluetoothAdvertisingEvent=g}),c.register("./wb-service.js",function(a,b,c){function f(a,b,c){var f=this,g=b,i=c;Object.defineProperty(f,"uuid",{get:function(){return d.toWbUUID(i.uuid)}}),Object.defineProperty(f,"isPrimary",{get:function(){return!0}}),Object.defineProperty(f,"device",{get:function(){return f._device}}),f.getCharacteristic=function(a){var b=this;return d.errorLoggingPromise(function(c,f){var j,h=d.toVensiUUID(g.BluetoothUUID.getCharacteristic(a));void 0===h?f("Unable to find characteristic with requested UUID "+a):(j=i.findCharacteristic(h),j?c(new e(b,g,j)):(j=i.findCharacteristic(a),j?(console.error("Hack alert: Fix VensiUUID "),c(new e(b,g,j))):f("Characteristic "+a+" not found")))})},f.getCharacteristics=function(a){var b=this;return d.errorLoggingPromise(function(c,f){var k,l,m,n,h=i.getAllCharacteristics(),j=Object.values(h);if(a)k=d.toVensiUUID(g.BluetoothUUID.getService(a)),l=i.findCharacteristic(k),l?c([new e(b,g,l)]):f("Characteristic "+a+" not found");else{for(m=[],n=0;n<j.length;n++)m.push(new e(b,g,j[n]));c(m)}})},f.getIncludedService=function(){return d.errorLoggingPromise(function(a,b){b("Not implemented")})},f.getIncludedServices=function(){return d.errorLoggingPromise(function(a,b){b("Not implemented")})}}var d=c("./util.js"),e=c("./wb-characteristic").BluetoothRemoteGATTCharacteristic;a.exports.BluetoothRemoteGATTService=f}),c.register("./activeScans.js",function(a){var d={rdScan:0,watchScan:0,leScan:0},e=function(){return!(0==d.rdScan&&0==d.watchScan&&0==d.leScan)};a.exports.activeScans=d,a.exports.scanningActive=e}),c.register("./task.js",function(a){function d(a,b){var d,c=this;this.run=function(){b(),c.schedule()},this.schedule=function(){c.stop(),d=setInterval(b,a)},this.stop=function(){d&&clearTimeout(d)}}a.exports.RetryingTask=d}),c.register("./wb-errors.js",function(a){var d={INVALID_OPTIONS_ERROR_MESSAGE:"Either 'filters' should be present or 'acceptAllDevices' should be true, but not both.",INVALID_LESCAN_OPTIONS_ERROR_MESSAGE:"Either 'filters' should be present or 'acceptAllAdvertisements' should be true, but not both.",EMPTY_FILTER_ERROR_MESSAGE:"'filters' member must be non-empty to find any devices.",INVALID_MFR_DATA_FORMAT:"Invalid manufacturerData format",INVALID_SERVICE_DATA_FORMAT:"Invalid serviceData format",INVALID_NAME_ERROR_MESSAGE:"Invalid name format",INVALID_NAME_PREFIX_ERROR_MESSAGE:"Invalid name prefix"};a.exports.invalidServiceUUIDMessage=function(a){return"Invalid Service name: '"+a+"'. It must be a valid UUID alias (e.g. 0x1234), UUID (lowercase hex characters e.g. '00001234-0000-1000-8000-00805f9b34fb'), or recognized standard name from https://www.bluetooth.com/specifications/gatt/services e.g. 'alert_notification'."},a.exports.errors=d}),c.register("./build/staging/blueapp-wb/index.js",function(){}),c.register("./util.js",function(a){function e(a){return 8==a.indexOf(d)?0==a.indexOf("0000")?a.substring(4,8):a.substring(0,8):a}var d="-0000-1000-8000-00805F9B34FB";a.exports.toVensiUUID=function(a){switch(typeof a){case"string":return e(a.toUpperCase());case"number":return(+a).toString(16).toUpperCase();default:return void console.warn("Unable to convert uuid "+a+" to hex string")}},a.exports.toWbUUID=function(a){return a&&(a=a.toLowerCase()),a},a.exports.hexAsArray=function(a){var c,b=[];for(a.length%2==1&&(a="0"+a),c=0;c<a.length-1;c+=2)b.push(parseInt(a.substr(c,2),16));return b},a.exports.arrayAsHex=function(a){var c,d,b="";for(c in a)byte=a[c],d=(255&byte).toString(16),1==d.length&&(d="0"+d),b+=d;return b.toUpperCase()},a.exports.isHex=function(a){var b=/^[A-Fa-f0-9-x]+$/;return null!=(""+a).match(b)},a.exports.isLowercase=function(a){return a.toLowerCase()==a},a.exports.isEmpty=function(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0},a.exports.stringIsInteger=function(a){var b,c;return a=a.replace(/\b0+/g,""),b=parseInt(a),c=""+b,a===c},a.exports.uintArrayToString=function(a){var d,b=""+a,c=b.split(",");for(d=0;d<c.length;d++)1==c[d].length&&(c[d]="0"+c[d]);return c.join("")},a.exports.uncaughtError=function(a){console.error("Uncaught Error:",a,a.stack)},a.exports.gattIpRequestPromise=function(b){return new Promise(function(c,d){try{b(c,d)}catch(e){throw a.exports.uncaughtError(e),e}})},a.exports.errorLoggingPromise=function(b){return new Promise(function(c,d){try{b(c,d)}catch(e){a.exports.uncaughtError(e),d(e)}})},a.exports.gattIpPromiseObjectOnSuccess=function(a,b){return new Promise(function(c,d){try{b(),c(a)}catch(e){console.error("GattIP Error:",e,e.stack),d(e)}})},a.exports.mfrDataToMap=function(b){var e,f,g,h,c=new Map,d=b.getAllMfrData();for(e in d)d.hasOwnProperty(e)&&(f=a.exports.hexAsArray(d[e]),g=new DataView(new Uint8Array(f).buffer),h=parseInt(e,16),c.set(h,g));return c},a.exports.getUTF8Length=function(a){var c,d,b=0;for(c=0;c<a.length;c++)d=a.charCodeAt(c),128>d?b++:b+=d>127&&2048>d?2:3;return b},a.exports.objectKeysToArrayOfIntegers=function(a){var c,b=[];for(c in a)a.hasOwnProperty(c)&&b.push(""+parseInt(c,16));return b},a.exports.removeNotificationListeners=function(a){var c,d,e,b=a.getAllServices();for(c in b){d=b[c].getAllCharacteristics();for(e in d)d[e].wbCharacteristic&&(console.log("removing the listeners for characteristic :"+e),d[e].wbCharacteristic.removeAllListeners())}}}),c.register("./wb-device.js",function(a,b,c){function h(a,b,c,h){function o(a){i.gatt.connected=!1,d.removeNotificationListeners(a),i.emit("gattserverdisconnected",{target:i})}var i,j,k,l,m,n;e.instantiateEmitter(this),i=this,j=a,k=b,l=!1,m=new g(j,this),n=new f(i,a,b,c,h),i.addEventListener=function(a,b){this.on(a,b)},i.removeEventListener=function(a,b){this.removeListener(a,b)},k.once("disconnected",o),Object.defineProperty(this,"gatt",{get:function(){return n}}),Object.defineProperty(this,"name",{get:function(){return k.name}}),Object.defineProperty(this,"id",{get:function(){return k.uuid}}),Object.defineProperty(this,"watchingAdvertisements",{get:function(){return l},set:function(a){l=a}}),i.watchAdvertisements=m.watchAdv,i.unwatchAdvertisements=m.unwatchAdv}var d=c("./util.js"),e=c("./event-emitter"),f=c("./wb-server").BluetoothRemoteGATTServer,g=c("./wb-advertisement").Advertisement;a.exports.BluetoothDevice=h,e.makeEmitter(h)}),c.register("./filter-util.js",function(a,b,c){function e(a,b,c){var e,d=a.match(/.{1,2}/g);if(!(d.length>=b.length))return!1;for(e=0;e<b.length;e++)if((b[e]&c[e])!=(parseInt(d[e],16)&c[e]))return!1;return!0}var d=c("./util");a.exports.nameFilter=function(a,b){return a.name?a.name===b.name:!0},a.exports.namePrefixFilter=function(a,b){return a.namePrefix?b.name.indexOf(a.namePrefix)>-1:!0},a.exports.servicesFilter=function(a,b,c){var e,f,g;if(b.services){for(e=!0,f=0;f<b.services.length;f++)g=d.toVensiUUID(a.BluetoothUUID.getService(b.services[f])),-1===c.serviceUUIDs.indexOf(d.toVensiUUID(a.BluetoothUUID.getService(b.services[f])))&&(e=!1);return e}return!0},a.exports.manufacturerDataFilter=function(a,b){var c,f,g,h,i;if(a.manufacturerData){if(d.isEmpty(a.manufacturerData))return!1;c=b.getAllMfrData();for(f in a.manufacturerData)if(a.manufacturerData.hasOwnProperty(f)){for(g=parseInt(f,10).toString(16).toUpperCase(),h=g.length;4>h;h++)g="0"+g;if("string"!=typeof c[g])return!1;if(!d.isEmpty(a.manufacturerData[f])&&"mask"in a.manufacturerData[f]){if(0==e(c[g],a.manufacturerData[f].dataPrefix,a.manufacturerData[f].mask))return!1}else if(i=d.arrayAsHex(a.manufacturerData[f].dataPrefix),0!=c[g].indexOf(i))return!1}return!0}return!0},a.exports.serviceDataFilter=function(a,b){var c,e;if(a.serviceData){if(c=b.getAllSvcData(),d.isEmpty(a.serviceData))return!1;for(e in a.serviceData)if(a.serviceData.hasOwnProperty(e)){if(!c.hasOwnProperty(e))return!1;if(!d.isEmpty(a.serviceData[e]))return!1}return!0}return!0}}),c.register("./index.js",function(a,b,c){"use strict";function l(a){function s(){o&&(console.log("Retrying connection to gateway..."),o.close(),o=void 0),o=b.gattip=new d,o.BluetoothUUID=e.BluetoothUUID,o.once("onclose",function(){m.removeAllListeners("advertisementreceived"),l&&(console.log("Gateway socket closed. Scheduling retries..."),l.schedule()),n&&(n=!1,m.emit("availabilitychanged",{value:n})),o.removeAllListeners(),o.getGateway()&&o.getGateway().removeAllListeners()}),o.once("ready",function(){u(),n||(n=!0,m.emit("availabilitychanged",{value:n}))}),o.on("error",function(a){console.error("Service Error:",a.message),a.message&&a.message.indexOf("Gateway is not available")>=0||a.stack&&console.error("Error Stack:",a.stack)}),o.open(a)}function t(){l&&l.stop()}function u(){l&&(l.stop(),l.schedule())}var l,o,p,b=this,m=new i.EventEmitter,n=!1,q=c("./activeScans").activeScans,r=c("./activeScans").scanningActive;a.maintainSocketConnection===!0?(l=new j(15e3,s),l.run()):s(),this.getAvailability=new Promise(function(a){a(n)}),this.requestLEScan=function(a){var d,c=[];if(a||(a={filters:[]}),a.filters||(a.filters=[]),a.options||(a.options={}),"boolean"!=typeof a.options.keepRepeatedDevices&&(a.options.keepRepeatedDevices=!1),"boolean"!=typeof a.options.acceptAllAdvertisements&&(a.options.acceptAllAdvertisements=!1),"boolean"!=typeof a.keepRepeatedDevices&&(a.options.keepRepeatedDevices=!1),"boolean"!=typeof a.acceptAllAdvertisements&&(a.options.acceptAllAdvertisements=!1),a.filters&&a.filters.length>0)for(d=0;d<a.filters.length;d++)c.push(new g.BluetoothLEScanFilterInit(a.filters[d]));return new Promise(function(a){o.getGateway()?a(o.getGateway()):o.once("ready",function(b){a(b)})}).then(function(d){return new Promise(function(e,f){var i,g=h.validateFilters(o,c,a.options.acceptAllAdvertisements);return g.error?void f(new TypeError(g.message)):(i=g.isFiltering,d.once("scan",function(){t()}),p=new k(b,o,i,a,m),void p._handleScan(e,f))})})},this.requestDevice=function(b){var c,i,j,d=b.acceptAllDevices,e=b.optionalServices;if(b.filters&&b.filters.length>0)for(i=[],j=0;j<b.filters.length;j++)i.push(new g.BluetoothLEScanFilterInit(b.filters[j]));return new Promise(function(a){o.getGateway()?a(o.getGateway()):o.once("ready",function(b){a(b)})}).then(function(j){return new Promise(function(k,l){function p(b){var d,e;n?(e=g.filterScan(o,b,i),d=e.peripheral,c=e.filter):c=void 0,a.returnData?n?d&&a.returnData({peripheral:d}):a.returnData({peripheral:b}):n?d&&(j.removeListener("scan",p),u(d)):u(b)}function s(a){r()?k(a):j.stopScan({fulfill:function(){k(a)},reject:l})}function u(a){q.rdScan--,j.removeListener("scan",p),console.log("Found device ",a.name,JSON.stringify(b)),a._wbBluetoothDevice||(a._wbBluetoothDevice=new f(o,a,e,c)),c=void 0,s(a._wbBluetoothDevice)}function v(a){if(q.rdScan--,!r())try{j.stopScan(function(){console.log("Scan stopped")})}catch(b){console.error("Unable to stop scan. Rejecting with original message",a)}l(a)}var n,m=h.validateFilters(o,i,d,e);return m.error?void l(new TypeError(m.message)):(n=m.isFiltering,o.on("state",function(a){a||l("Bluetooth is off")}),void j.scan({fulfill:function(){t(),q.rdScan++,a.returnData&&a.returnData({select:u,reject:v}),j.on("scan",p)},reject:l}))})})},this.addEventListener=function(a,b){m.on(a,b)},this.removeEventListener=function(a,b){m.removeListener(a,b)}}var d=c("gatt-ip-js").GATTIP,e=c("./thirdparty"),f=c("./wb-device").BluetoothDevice,g=c("./wb-filters"),h=c("./filter-validation"),i=c("events"),j=c("./task").RetryingTask,k=c("./bluetooth-le-scan").BluetoothLEScan;a.exports.navigator=void 0,a.exports.init=function(a){a||(a={});var b={bluetooth:new l(a)};return a.token&&(b.bluetooth.referringDevice={dummy:"this is a dummy device",id:a.deviceUUID}),{navigator:b}}}),c.register("./wb-descriptor.js",function(a,b,c){function e(a,b,c){var j,k,e=this,g=a,h=c,i=null;Object.defineProperty(e,"uuid",{get:function(){return d.toWbUUID(h.uuid)}}),Object.defineProperty(e,"characteristic",{get:function(){return g}}),Object.defineProperty(e,"value",{get:function(){return i}}),j=function(){return d.errorLoggingPromise(function(a,b){h.readValue({fulfill:function(b,c){var e=d.hexAsArray(c);a(new DataView(new Uint8Array(e).buffer))},reject:b})})},k=function(a){return d.errorLoggingPromise(function(b,c){h.writeValue({fulfill:b,reject:c},d.arrayAsHex(Array.prototype.slice.call(a)))})}}var d=c("./util");a.exports.BluetoothRemoteGATTDescriptor=e}),c.register("./thirdparty.js",function(a){function e(a){a>>>=0;var b="0000000"+a.toString(16);return b=b.substr(-8),b+"-0000-1000-8000-00805f9b34fb"}function f(b){var c=a.exports.BluetoothUUID[b];return function(a){return"string"==typeof a&&(a=a.toLowerCase()),"number"==typeof a?e(a):d.test(a)?a:c.hasOwnProperty(a)?c[a]:!1}}var d=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;a.exports.BluetoothUUID={},a.exports.BluetoothUUID.canonicalUUID=e,a.exports.BluetoothUUID.service={alert_notification:e(6161),automation_io:e(6165),battery_service:e(6159),blood_pressure:e(6160),body_composition:e(6171),bond_management:e(6174),continuous_glucose_monitoring:e(6175),current_time:e(6149),cycling_power:e(6168),cycling_speed_and_cadence:e(6166),device_information:e(6154),environmental_sensing:e(6170),generic_access:e(6144),generic_attribute:e(6145),glucose:e(6152),health_thermometer:e(6153),heart_rate:e(6157),human_interface_device:e(6162),immediate_alert:e(6146),indoor_positioning:e(6177),internet_protocol_support:e(6176),link_loss:e(6147),location_and_navigation:e(6169),next_dst_change:e(6151),phone_alert_status:e(6158),pulse_oximeter:e(6178),reference_time_update:e(6150),running_speed_and_cadence:e(6164),scan_parameters:e(6163),tx_power:e(6148),user_data:e(6172),weight_scale:e(6173)},a.exports.BluetoothUUID.characteristic={aerobic_heart_rate_lower_limit:e(10878),aerobic_heart_rate_upper_limit:e(10884),aerobic_threshold:e(10879),age:e(10880),aggregate:e(10842),alert_category_id:e(10819),alert_category_id_bit_mask:e(10818),alert_level:e(10758),alert_notification_control_point:e(10820),alert_status:e(10815),altitude:e(10931),anaerobic_heart_rate_lower_limit:e(10881),anaerobic_heart_rate_upper_limit:e(10882),anaerobic_threshold:e(10883),analog:e(10840),apparent_wind_direction:e(10867),apparent_wind_speed:e(10866),"gap.appearance":e(10753),barometric_pressure_trend:e(10915),battery_level:e(10777),blood_pressure_feature:e(10825),blood_pressure_measurement:e(10805),body_composition_feature:e(10907),body_composition_measurement:e(10908),body_sensor_location:e(10808),bond_management_control_point:e(10916),bond_management_feature:e(10917),boot_keyboard_input_report:e(10786),boot_keyboard_output_report:e(10802),boot_mouse_input_report:e(10803),"gap.central_address_resolution_support":e(10918),cgm_feature:e(10920),cgm_measurement:e(10919),cgm_session_run_time:e(10923),cgm_session_start_time:e(10922),cgm_specific_ops_control_point:e(10924),cgm_status:e(10921),csc_feature:e(10844),csc_measurement:e(10843),current_time:e(10795),cycling_power_control_point:e(10854),cycling_power_feature:e(10853),cycling_power_measurement:e(10851),cycling_power_vector:e(10852),database_change_increment:e(10905),date_of_birth:e(10885),date_of_threshold_assessment:e(10886),date_time:e(10760),day_date_time:e(10762),day_of_week:e(10761),descriptor_value_changed:e(10877),"gap.device_name":e(10752),dew_point:e(10875),digital:e(10838),dst_offset:e(10765),elevation:e(10860),email_address:e(10887),exact_time_256:e(10764),fat_burn_heart_rate_lower_limit:e(10888),fat_burn_heart_rate_upper_limit:e(10889),firmware_revision_string:e(10790),first_name:e(10890),five_zone_heart_rate_limits:e(10891),floor_number:e(10930),gender:e(10892),glucose_feature:e(10833),glucose_measurement:e(10776),glucose_measurement_context:e(10804),gust_factor:e(10868),hardware_revision_string:e(10791),heart_rate_control_point:e(10809),heart_rate_max:e(10893),heart_rate_measurement:e(10807),heat_index:e(10874),height:e(10894),hid_control_point:e(10828),hid_information:e(10826),hip_circumference:e(10895),humidity:e(10863),"ieee_11073-20601_regulatory_certification_data_list":e(10794),indoor_positioning_configuration:e(10925),intermediate_blood_pressure:e(10806),intermediate_temperature:e(10782),irradiance:e(10871),language:e(10914),last_name:e(10896),latitude:e(10926),ln_control_point:e(10859),ln_feature:e(10858),"local_east_coordinate.xml":e(10929),local_north_coordinate:e(10928),local_time_information:e(10767),location_and_speed:e(10855),location_name:e(10933),longitude:e(10927),magnetic_declination:e(10796),magnetic_flux_density_2D:e(10912),magnetic_flux_density_3D:e(10913),manufacturer_name_string:e(10793),maximum_recommended_heart_rate:e(10897),measurement_interval:e(10785),model_number_string:e(10788),navigation:e(10856),new_alert:e(10822),"gap.peripheral_preferred_connection_parameters":e(10756),"gap.peripheral_privacy_flag":e(10754),plx_continuous_measurement:e(10847),plx_features:e(10848),plx_spot_check_measurement:e(10846),pnp_id:e(10832),pollen_concentration:e(10869),position_quality:e(10857),pressure:e(10861),protocol_mode:e(10830),rainfall:e(10872),"gap.reconnection_address":e(10755),record_access_control_point:e(10834),reference_time_information:e(10772),report:e(10829),report_map:e(10827),resting_heart_rate:e(10898),ringer_control_point:e(10816),ringer_setting:e(10817),rsc_feature:e(10836),rsc_measurement:e(10835),sc_control_point:e(10837),scan_interval_window:e(10831),scan_refresh:e(10801),sensor_location:e(10845),serial_number_string:e(10789),"gatt.service_changed":e(10757),software_revision_string:e(10792),sport_type_for_aerobic_and_anaerobic_thresholds:e(10899),supported_new_alert_category:e(10823),supported_unread_alert_category:e(10824),system_id:e(10787),temperature:e(10862),temperature_measurement:e(10780),temperature_type:e(10781),three_zone_heart_rate_limits:e(10900),time_accuracy:e(10770),time_source:e(10771),time_update_control_point:e(10774),time_update_state:e(10775),time_with_dst:e(10769),time_zone:e(10766),true_wind_direction:e(10865),true_wind_speed:e(10864),two_zone_heart_rate_limit:e(10901),tx_power_level:e(10759),uncertainty:e(10932),unread_alert_status:e(10821),user_control_point:e(10911),user_index:e(10906),uv_index:e(10870),vo2_max:e(10902),waist_circumference:e(10903),weight:e(10904),weight_measurement:e(10909),weight_scale_feature:e(10910),wind_chill:e(10873)},a.exports.BluetoothUUID.descriptor={"gatt.characteristic_extended_properties":e(10496),"gatt.characteristic_user_description":e(10497),"gatt.client_characteristic_configuration":e(10498),"gatt.server_characteristic_configuration":e(10499),"gatt.characteristic_presentation_format":e(10500),"gatt.characteristic_aggregate_format":e(10501),valid_range:e(10502),external_report_reference:e(10503),report_reference:e(10504),value_trigger_setting:e(10506),es_configuration:e(10507),es_measurement:e(10508),es_trigger_setting:e(10509)},a.exports.BluetoothUUID.getService=f("service"),a.exports.BluetoothUUID.getCharacteristic=f("characteristic"),a.exports.BluetoothUUID.getDescriptor=f("descriptor")}),c.register("./filter-validation.js",function(a,b,c){function g(a,b){var c=!0;return"string"==typeof b?d.isHex(b)?d.isLowercase(b)||(c=!1):d.toVensiUUID(a.BluetoothUUID.getService(b))||(c=!1):"number"!=typeof b&&(c=!1),c}function h(a){for(var b in a.manufacturerData)if(a.manufacturerData.hasOwnProperty(b)){if(!(d.stringIsInteger(b)&&void 0!=b&&b>0&&65535>b))return!1;if("object"!=typeof a.manufacturerData[b]||!(d.isEmpty(a.manufacturerData[b])||"dataPrefix"in a.manufacturerData[b]))return!1;if("dataPrefix"in a.manufacturerData[b]){if(a.manufacturerData[b].dataPrefix instanceof Uint8Array==0)return!1;if("mask"in a.manufacturerData[b]){if(a.manufacturerData[b].mask instanceof Uint8Array==0)return!1;if(a.manufacturerData[b].dataPrefix.byteLength!=a.manufacturerData[b].mask.byteLength)return!1}}}return!0}function i(a){for(var b in a.serviceData)if(a.serviceData.hasOwnProperty(b)&&!d.isEmpty(a.serviceData[b]))return!1;return!0}function j(a,b){var d,f,c={};if(0!=b.length){for(d=0;d<b.length;d++)if(f=b[d],!g(a,f))return c={error:!0,message:e.invalidServiceUUIDMessage(f)}}else c={error:!0,message:"Illegal filter object"};return c}function k(a){return"object"!=typeof a.manufacturerData||d.isEmpty(a.manufacturerData)||!h(a)?{error:!0,message:f.INVALID_MFR_DATA_FORMAT}:{}}function l(a){return"object"!=typeof a.serviceData||d.isEmpty(a.serviceData)||!i(a)?{error:!0,message:f.INVALID_SERVICE_DATA_FORMAT}:{}}function m(a){return"string"!=typeof a.name||d.getUTF8Length(a.name)>248?{error:!0,message:f.INVALID_NAME_ERROR_MESSAGE}:{}}function n(a){return 0==a.namePrefix.length||"string"!=typeof a.namePrefix||d.getUTF8Length(a.namePrefix)>248?{error:!0,message:f.INVALID_NAME_PREFIX_ERROR_MESSAGE}:{}}function o(a,b,c){return a&&a.length>0&&b?c?{error:!0,message:f.INVALID_OPTIONS_ERROR_MESSAGE}:{error:!0,message:f.INVALID_LESCAN_OPTIONS_ERROR_MESSAGE}:a&&0!=a.length||!b?a||b?{error:!1,isFiltering:!0}:c?{error:!0,message:f.INVALID_OPTIONS_ERROR_MESSAGE}:{error:!0,message:f.INVALID_LESCAN_OPTIONS_ERROR_MESSAGE}:{error:!1,isFiltering:!1}}var d=c("./util"),e=c("./wb-errors"),f=c("./wb-errors").errors;a.exports.validateFilters=function(a,b,c,d){var g,h,i,p,q,e=4==arguments.length,f=o(b,c,e);if(f.error)return f;if(f.isFiltering)for(g=0;g<b.length;g++){h=b[g];for(i in h)if(h.hasOwnProperty(i)&&void 0!=h[i]){switch(i){case"services":p=j(a,h.services);break;case"name":p=m(h);break;case"namePrefix":p=n(h);break;case"manufacturerData":p=k(h);break;case"serviceData":p=l(h);break;default:p={error:!0,message:"Illegal filter object"}}if(p.error)return p}}return d&&(q=j(a,d),q.error)?q:f}}),c.register("./wb-filters.js",function(a,b,c){function f(a,b,c){var f,g,h,i,e=[];for(f=0;f<c.length;f++)for(g=d.toVensiUUID(a.BluetoothUUID.getService(c[f])),h=0;h<b.length;h++)i=d.toVensiUUID(a.BluetoothUUID.getService(b[h])),g==i&&-1==e.indexOf(i)&&e.push(i);return e}var d=c("./util"),e=c("./filter-util"),g=function(a,b,c){return c.hasOwnProperty("services")&&void 0!=c.services&&c.services.length>0?f(a,c.services,b):[]};a.exports.getOptionalServices=function(a,b,c){return c&&c.length>0?f(a,c,b):[]},a.exports.getAllSupportedServices=function(b,c,d,e){var f=[],h=g(b,c,d),i=a.exports.getOptionalServices(b,c,e);return f=h.concat(i)},a.exports.filterScan=function(a,b,c){var d,f,g,h,i,j;for(b.advdata&&b.advdata.serviceUUIDs.length>0?b.serviceUUIDs=b.advdata.serviceUUIDs:b.serviceUUIDs=b.getAllAdvertisedServiceUUIDs(),d=0;d<c.length;d++)if(f=e.nameFilter(c[d],b),g=e.namePrefixFilter(c[d],b),h=e.servicesFilter(a,c[d],b),i=e.manufacturerDataFilter(c[d],b),j=e.serviceDataFilter(c[d],b),f&&g&&h&&i&&j)return{peripheral:b,filter:c[d]};return!1},a.exports.BluetoothLEScanFilterInit=function(a){var c,b=this;b.services=void 0,b.name=void 0,b.namePrefix=void 0,b.manufacturerData=void 0,b.serviceData=void 0;for(c in a)if(a.hasOwnProperty(c)){if(!(c in b))throw Error("Illegal filter property");b[c]=a[c]}return this}}),c.register("./bluetooth-le-scan.js",function(a,b,c){var e=(c("./util.js"),c("./wb-device").BluetoothDevice),f=c("./wb-filters"),g=c("./wb-advertisement"),h=c("./activeScans").activeScans,i=c("./activeScans").scanningActive,j=function(a,b,c,d,j){function r(a){var d;d=c?f.filterScan(b,a,k.filters).peripheral:a,d&&(d._wbBluetoothDevice||(d._wbBluetoothDevice=new e(b,d)),j.emit("advertisementreceived",new g.BluetoothAdvertisingEvent(d)))}var k=this,l=!1,m=d.filters,n=d.keepRepeatedDevices,o=d.acceptAllAdvertisements,p=b.getGateway();Object.defineProperty(k,"active",{get:function(){return l}}),Object.defineProperty(k,"filters",{get:function(){return m}}),Object.defineProperty(k,"keepRepeatedDevices",{get:function(){return n}}),Object.defineProperty(k,"acceptAllAdvertisements",{get:function(){return o}}),k.stop=function(){h.leScan--,l=!1,p.removeListener("scan",r),i()||p.stopScan(function(){console.log("Scan stopped")})},k._close=function(){h.leScan--,l=!1,p.removeListener("scan",r)},k._handleScan=function(a,b){p.scan({fulfill:function(){a(k),l=!0,h.leScan++,p.on("scan",r)},reject:b})}};a.exports.BluetoothLEScan=j}),b.exports=c("./index.js")}(require,module);

},{}],2:[function(require,module,exports){
const nodeUtil = require('util');
const EventEmitter = require('events').EventEmitter;
const util = require('./util');

function BluVolt(bluetooth) {
    EventEmitter.call(this);
    const self = this;
    this.scan = () => {
        const options = {
            filters: [{
                manufacturerData: {
                    0x02F4: {
                        dataPrefix: new Uint8Array([
                            0xBA, 0xC1, // Major/Minor.
                            0x02, // Device ID = BluVolt
                        ])
                    }
                }
            }]
        };

        bluetooth.requestLEScan(options)
            .then(() => {
                bluetooth.addEventListener('advertisementreceived', event => {
                    const data = event.manufacturerData.get(0x02F4);
                    const hexData = util.toHex(data);
                    const dataType = data.getUint8(3);
                    if (dataType !== 0x02) {
                        console.error("Unable to parse BluVolt data");
                        return;
                    }
                    const voltage = data.getFloat32(4);
                    const doorOpened = (voltage < 0.5);

                    //console.log(event.device.uuid, hexData);
                    self.emit('data', {
                        id: event.device.id,
                        doorOpened : doorOpened
                    });
                });
            })
            .catch(error => {
                self.emit("disconnected", error);
                setTimeout(self.scan, 1000);

            });
    };
    this.stop = _ => {

    };

    this.connect = _ => {

    };

    bluetooth.addEventListener('availabilitychanged', function (e) {
        console.log("GW Available BluVolt:", e.value);
        if (e.value === false) {
            self.emit('disconnected', "BluVolt Gateway link lost");
        } else {
            setTimeout(self.scan, 1000);
        }
    });
}

nodeUtil.inherits(BluVolt, EventEmitter);
module.exports.BluVolt = BluVolt;

},{"./util":8,"events":"events","util":"util"}],3:[function(require,module,exports){
(function (process){
const SmartFridge = require('./smartfridge').SmartFridge;

let debug = false;

module.exports.createConfig = environment => {
    /*
    // TODO: Maybe add device filters in the future

    let filters = [
        '1D024122-1AD6-11E7-A812-917503ABFEF1', // door: 0-10V virtual peripheral. The same for each gateway. Used for testing to simulate data
        '00:0B:57:0C:17:ED', // shelf: Visible Things 1
        'CB:74:84:11:83:C8', // shelf: Smart Shelf 1
        'F0:C7:7F:1C:7F:25', // meter: Smart Meter 1
        'E0:E5:CF:8E:13:49', // meter: Smart Meter 2
        'E0:E5:CF:8D:AF:80', // meter: Smart Meter 3
    ];
    */
    const config = {
        url: "wss://proxy.blueapp.io",
        /* IMX-90ED@prd  */ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6MTI0MTUwMjI3LCJnYXRld2F5SWQiOjU2NDYyNjAyMSwiaXNHYXRld2F5IjpmYWxzZSwiZmlsdGVyU2NhbiI6ZmFsc2UsImlhdCI6MTUxMzgwMjcwNiwiZXhwIjoxNTIxMDAyNzA2fQ.AImFBkxsr7-9JkqEaTElLO2-rMIRKTfl4zBJTFu-NmE',
        /* IMX-90E7@prd  */ //token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6MTI0MTUwMjI3LCJnYXRld2F5SWQiOjQyNTQzMjg1MiwiaXNHYXRld2F5IjpmYWxzZSwiZmlsdGVyU2NhbiI6ZmFsc2UsImlhdCI6MTUxMzgwMjc2OCwiZXhwIjoxNTIxMDAyNzY4fQ.w-6RzgKMMTdKviJaYU5u_izvmr0knNm9D34Vwmy5Ans',
        fridgeDevices: {
            //bulb: true,
            meter: true,
            door: true,
            shelf: true
        },
        maintainSocketConnection: true
    };

    if (!environment) {
        if (process.env['ENV']) {
            environment = process.env['ENV'];
        } else {
            environment = 'prd';
        }
    }

// For development at Chicago office:
    if (environment === 'dev') {
        debug = true;

        config.url = "wss://dev-proxy.blueapp.io";
        config.token = /* NIX@dev  */ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6NDQ4MjA2NDcwLCJnYXRld2F5SWQiOjI0Mzc1NDQ4NCwiaXNHYXRld2F5IjpmYWxzZSwiZmlsdGVyU2NhbiI6ZmFsc2UsImlhdCI6MTUxMjY3NzA5MCwiZXhwIjoxNTE5ODc3MDkwfQ.r11fWw0nH_RRA8AQ8YSiYzoTs_Ci_WTLpxCXlWIYKWo';
    }
    if (environment === 'dev' || typeof window === 'object') {
        config.fridgeDevices.bulb = true;
    }
    return config;
};

module.exports.createSmartFridge = config => {
    if (!config) {
        config = module.exports.createConfig();
    }

    const smartFridge = new SmartFridge(config);

    if (process.env['CUSTOM']) {
        if (config.fridgeDevices.bulb) {
            smartFridge.setBulbColor("#000000");
        }
    }
///////////////////////////////////////////////////////////////////

    smartFridge.on('error', err => {
        console.error(">>> SmartShelf Service Error:", err);
    });

    smartFridge.on('shelfData', data => {
        console.log(
            "S:",
            "id:", data.id,
            (debug ? "" : "raw: " + data.hexData),
            "temp:", data.tempC,
            "humidity:", data.humidityRh,
            "weight:", data.weightLbs,
            "battery:", data.battery
        );
    });

    smartFridge.on('scaleData', data => {
        console.log(
            "S:",
            "id:", data.id,
            (debug ? "" : "raw: " + data.hexData),
            "weight:", data.weightLbs
        );
    });

    smartFridge.on('doorData', data => {
        console.log(
            "D:",
            "id:", data.id,
            (debug ? "" : "raw: " + data.hexData),
            "doorOpened:", data.doorOpened
        );
    });

    smartFridge.on('powerData', data => {
        console.log(
            "P:",
            "id:", data.id,
            "powerMilliWatts:", data.powerConsumptionMilliWatts
        );
    });

    smartFridge.on('bulbData', data => {
        console.log(
            "B:",
            "id:", data.id,
            "color:", data.color
        );
    });

    return smartFridge;
};

if (process.env['CUSTOM']) {
    // override for development testing
    //config.fridgeDevices = {shelf:true};
    //config.trace = true;

    const config = module.exports.createConfig('dev');
    module.exports.createSmartFridge(config);
}

  if(typeof window === 'object'){
    window.createConfig = module.exports.createConfig;
    window.createSmartFridge = module.exports.createSmartFridge;
  }

}).call(this,require('_process'))
},{"./smartfridge":6,"_process":26}],4:[function(require,module,exports){
const util = require('util');
const EventEmitter = require('events').EventEmitter;

const CANDLE_SERVICE_UUID = 0xFF0D;

/* Custom Bluetooth Characteristic UUIDs */

const CANDLE_COLOR_UUID = 0xFFFC;


function PlayBulb(bluetooth, intervalMs) {
    EventEmitter.call(this);
    const self = this;
    let idleToggle = false; // vary the value a bit to maintain connection
    let rgb;
    let pollTask;

    this.setRgb = newRgb => {
        rgb = new Uint8Array([0, newRgb.r, newRgb.g, newRgb.b]);
    };

    const connect = pollIntervalMs => {
        let connectedTime = new Date().getTime();
        self.lightColorCharacteristic = undefined;
        self.powerStatus = undefined;

        console.log("Connecting to PlayBulb..");
        if (!pollIntervalMs) {
            pollIntervalMs = 9000;
        }
        const options = {
            filters: [{services: [CANDLE_SERVICE_UUID]}]
        };

        let device;
        return bluetooth.requestDevice(options)
            .then(_device => {
                device = _device;
                console.log("Device connected");
                connectedTime = new Date().getTime();
                return device.gatt.connect();
            })
            .then(server => {
                return server.getPrimaryService(CANDLE_SERVICE_UUID);
            })
            .then(service => {
                return service.getCharacteristic(CANDLE_COLOR_UUID);
            })
            .then(characteristic => {
                function communicationTask() {
                    try {
                        if (!device.gatt.connected) {
                            return;
                        }
                        self.setRgb = newRgb => {
                            rgb = new Uint8Array([0, newRgb.r, newRgb.g, newRgb.b]);
                            if (!device.gatt.connected) {
                                return;
                            }
                            characteristic.writeValue(rgb)
                                .catch(error => {
                                    if (device.gatt.connected) {
                                        console.warn("Characteristic Write Error");
                                        self.emit("disconnected", error);
                                        setTimeout(connect, 1000);
                                    }
                                });
                        };

                        characteristic.readValue()
                            .then(data => {
                                if (!device.gatt.connected) {
                                    return;
                                }
                                data = data.buffer ? data : new DataView(data);
                                if (data.byteLength < 4) {
                                    console.error("PlayBulb data view has less bytes than expected. Lost connection?...");
                                    return;
                                }
                                var color = {
                                    r: data.getUint8(1),
                                    g: data.getUint8(2),
                                    b: data.getUint8(3)
                                };
                                self.emit('data', {
                                    id: device.id,
                                    color: color
                                })

                            })
                            .catch(error => {
                                if (device.gatt.connected) {
                                    console.warn("Characteristic Read Error");
                                    self.emit("disconnected", error);
                                    setTimeout(connect, 1000);
                                }
                            });
                        if (rgb) {
                            let writeVal = rgb;
                            idleToggle = !idleToggle;
                            if (idleToggle) {
                                const offset = writeVal[1] < 2 ? 2 : -2;
                                writeVal = new Uint8Array(rgb);
                                writeVal[1] += offset;
                            }
                            // These writes will keep the connection up
                            characteristic.writeValue(writeVal)
                                .then(_ => {
                                    //console.log("Wrote", writeVal);
                                })
                                .catch(error => {
                                    if (device.gatt.connected) {
                                        console.warn("Characteristic Write Error");
                                        self.emit("disconnected", error);
                                        setTimeout(connect, 1000);

                                    }
                                });
                        }
                    } catch (e) {
                        self.emit("disconnected", e);
                        setTimeout(connect, 1000);
                    }
                }

                communicationTask();
                pollTask = setInterval(communicationTask, pollIntervalMs);
                device.once("gattserverdisconnected", function (event) {
                    console.log("Device", event.target.name, "disconnected");
                    clearTimeout(pollTask);
                    self.emit("disconnected", event.target);
                    setTimeout(connect, 1000);
                });

            })
            .catch(error => {
                const msg = error.message;
                if (msg && (msg.indexOf('Device could not be connected') >= 0 || msg.indexOf('evice is disconnected while discovering services') >= 0)) {
                    console.warn("PlayBulb: BT Could not connect.");
                } else {
                    console.warn("PlayBulb: BT Error", error);
                }
                setTimeout(connect, 10);
            });
    };
    this.stop = _ => {
        //bluetooth.gattip.close();
        if (pollTask) {
            clearTimeout(pollTask);
            pollTask = undefined;
        }
    };
    bluetooth.addEventListener('availabilitychanged', function (e) {
        console.log("GW Available PlayBulb:", e.value);
        if (e.value === false) {
            self.stop();
            self.emit('disconnected', 'PlayBulb Gateway link lost');
        } else {
            setTimeout(connect, 10);
        }
    });
}

util.inherits(PlayBulb, EventEmitter);
module.exports.PlayBulb = PlayBulb;
},{"events":"events","util":"util"}],5:[function(require,module,exports){
const nodeUtil = require('util');
const EventEmitter = require('events').EventEmitter;

const REVOGI_SERVICE_UUID = 0xFFF0;

/* Custom Bluetooth Characteristic UUIDs */

const INFO_CHAR_UUID = 0xFFF1;
const WRITE_CHAR_UUID = 0xFFF3;
const NOTIFY_CHAR_UUID = 0xFFF4;


function RevogiSmartMeter(bluetooth, intervalMs) {
    EventEmitter.call(this);
    const self = this;
    let idleToggle = false; // vary the value a bit to maintain connection
    let pollTask;


    const connect = pollIntervalMs => {
        let connectedTime = new Date().getTime();
        self.lightColorCharacteristic = undefined;
        self.powerStatus = undefined;

        console.log("Connecting to Revogi Smart Meter..");
        if (!pollIntervalMs) {
            pollIntervalMs = 3000;
        }
        const options = {
            filters: [{
                services: [REVOGI_SERVICE_UUID],
                manufacturerData: {0x0101: {}}
            }]
        };

        let device;
        let service;
        let infoChar;
        return bluetooth.requestDevice(options)
            .then(_device => {
                device = _device;
                console.log("Device connected");
                connectedTime = new Date().getTime();
                return device.gatt.connect();
            })
            .then(server => {
                return server.getPrimaryService(REVOGI_SERVICE_UUID);
            })
            .then(_service => {
                service = _service;
                return service.getCharacteristic(INFO_CHAR_UUID);
            })
            .then(characteristic => {
                infoChar = characteristic;
                return service.getCharacteristic(NOTIFY_CHAR_UUID);
            })
            .then(characteristic => {
                characteristic.startNotifications();
                characteristic.addEventListener('characteristicvaluechanged', event => {
                    let value = event.target.value;
                    if (value.getUint32(0) === 0x0f0f0400) {
                        self.emit('data', {
                            id: device.id,
                            powerConsumptionMilliWatts: value.getUint32(6)
                        })
                    }
                });
            })
            .then(() => {
                return service.getCharacteristic(WRITE_CHAR_UUID);
            })
            .then(() => {
                return service.getCharacteristic(WRITE_CHAR_UUID);
            })
            .then((characteristic) => {
                function pollValue() {
                    try {
                        if (!device.gatt.connected) {
                            return;
                        }
                        // These writes will keep the connection up
                        idleToggle = !idleToggle;
                        characteristic.writeValue(new Uint8Array(
                            [0x0F, 0x05, 0x04, 0x00, 0x00, 0x00, 0x05, 0xFF, idleToggle ? 0x7F : 0xFF]))
                            .then(_ => {
                                //console.log("Wrote. Toggle=", idleToggle);
                            })
                            .then(
                                infoChar.readValue()
                                    .then(value => {
                                        //const hexData = util.toHex(value);

                                        //console.log("Read info char get status", hexData);
                                    })
                                    .catch(error => {
                                        if (device.gatt.connected) {
                                            console.warn("Characteristic Read Error");
                                            self.emit("disconnected", error);
                                        }
                                    })
                            )
                            .catch(error => {
                                if (device.gatt.connected) {
                                    console.warn("Characteristic Write Error");
                                    self.emit("disconnected", error);
                                    setTimeout(connect, 1000);
                                }
                            });
                    } catch (e) {
                        self.emit("disconnected", e);
                        setTimeout(connect, 1000);
                    }
                }

                pollValue();
                pollTask = setInterval(pollValue, pollIntervalMs);
                device.once("gattserverdisconnected", function (event) {
                    console.log("Device", event.target.name, "disconnected");
                    clearTimeout(pollTask);
                    self.emit("disconnected", event.target);
                    setTimeout(connect, 1000);
                });
            })
            .catch(error => {
                const msg = error.message;
                if (msg && (msg.indexOf('Device could not be connected') >= 0 || msg.indexOf('evice is disconnected while discovering services') >= 0)) {
                    console.warn("Revogi Smart Meter: BT Could not connect");
                } else {
                    console.warn("Revogi Smart Meter: BT Error", error);
                    self.emit("error", error)
                }
                setTimeout(connect, 10);
            });
    };
    this.stop = _ => {
        if (pollTask) {
            clearTimeout(pollTask);
            pollTask = undefined;
        }
    };
    bluetooth.addEventListener('availabilitychanged', function (e) {
        console.log("GW Available Revogi Smart Meter:", e.value);
        if (e.value === false) {
            self.stop();
            self.emit('disconnected', 'Revogi Gateway link lost');
        } else {
            setTimeout(connect, 10);
        }
    });
}

nodeUtil.inherits(RevogiSmartMeter, EventEmitter);
module.exports.RevogiSmartMeter = RevogiSmartMeter;
},{"events":"events","util":"util"}],6:[function(require,module,exports){
const util = require('util');
const EventEmitter = require('events').EventEmitter;

const utilFunctions = require('./util');
const PlayBulb = require('./playbulb-smart-bulb').PlayBulb;
const RevogiSmartMeter = require('./revogi-smart-meter').RevogiSmartMeter;
const BluVolt = require('./bluvolt').BluVolt;
const SmartShelf = require('./smartshelf').SmartShelf;

//const VisibleThings = require('./visible-things').VisibleThings;

function createWb(_config, extras) {
    let config = _config;
    if (extras) {
        config = {};
        Object.assign(_config, extras);
    }

    config.maintainSocketConnection = true;
    const bawb = require('./blueapp-wb').init(config);
    return bawb.navigator.bluetooth;
}

function SmartFridge(config) {
    EventEmitter.call(this);
    const self = this;
    if (!config) {
        config = {};
    }
    if (!config.token) {
        console.error("Token missing");
    }
    if (!config.url) {
        console.error("URL missing");
    }
    if (!config.fridgeDevices) {
        config.fridgeDevices = {};
    }

    function handleDeivce(device, devName) {
        //const device = createFunc();
        device.on('error', error => {
            device.removeAllListeners();
            device.stop();
            setTimeout(_ => {handleDeivce(device, devName);}, 3000);
            console.error(devName + " Error: ", error.message);
            self.emit('error', error)
        });
        device.on('data', event => {
            self.emit(devName + 'Data', event);
        });
        device.once('disconnected', error => {
            console.log(devName + ' Disconnected.');
            device.removeAllListeners();
            device.stop();
            setTimeout(_ => {
                handleDeivce(device, devName)
            }, 1000);
        });
        return device;
    }

    let smartBulb;
    if (true === config.fridgeDevices.bulb) {
        smartBulb = handleDeivce(new PlayBulb(createWb(config)), 'bulb');
    }
    if (true === config.fridgeDevices.meter) {
        handleDeivce(new RevogiSmartMeter(createWb(config)), 'power');
    }
    if (true === config.fridgeDevices.door) {
        handleDeivce(new BluVolt(createWb(config)), 'door');
    }
    if (true === config.fridgeDevices.shelf) {
//        handleDeivce(new VisibleThings(createWb(config)), 'shelf');
        handleDeivce(new SmartShelf(createWb(config)), 'shelf');
    }

    this.setBulbColor = (color) => {
        let rgb;
        if (typeof color === 'string') {
            if (color.startsWith('#')) {
                color = color.substring(1);
            }
            const rgbArr = utilFunctions.hexAsArray(color);
            rgb  = {
                r: rgbArr[0],
                g: rgbArr[1],
                b: rgbArr[2],
            }
        } else {
            rgb = color;
        }
        smartBulb.setRgb(rgb);
    }
}

util.inherits(SmartFridge, EventEmitter);

module.exports.SmartFridge = SmartFridge;

},{"./blueapp-wb":1,"./bluvolt":2,"./playbulb-smart-bulb":4,"./revogi-smart-meter":5,"./smartshelf":7,"./util":8,"events":"events","util":"util"}],7:[function(require,module,exports){
const nodeUtil = require('util');
const EventEmitter = require('events').EventEmitter;
const util = require('./util');

let simulatedBatteryChargeLastReport = 100;
let simulatedBatteryCharge = {};

function SmartShelf(bluetooth) {
    EventEmitter.call(this);
    const self = this;
    this.scan = () => {
        const options = {
            filters: [{
                manufacturerData: {
                    0x02F4: {
                        dataPrefix: new Uint8Array([
                            0xBA, 0xC1, // Major/Minor.
                            0x01, // Device ID = SmartShelf
                        ])
                    }
                }
            }]
        };

        bluetooth.requestLEScan(options)
            .then(() => {
                bluetooth.addEventListener('advertisementreceived', event => {
                    let data = event.manufacturerData.get(0x02F4);
                    const hexData = util.toHex(data);
                    function cutFront(dataView, nBytes) {
                        return new DataView(data.buffer.slice(nBytes, data.buffer.byteLength));
                    }
                    data = cutFront(data, 3);
                    let weightLbs  = -1.0;
                    let tempC  = -200.0;
                    while (data.buffer.byteLength > 0) {
                        const dataType = data.getUint8(0);
                        data = cutFront(data, 1);
                        let bytesConsumed = data.buffer.byteLength;
                        switch (dataType) {
                            case 0x01: // weight
                                const weightData = data.getUint16(0);
                                //const weightData = 0x3FFF;
                                const weightKg =  weightData * 10.0 / (Math.pow(2, 14));
                                weightLbs = weightData === 0x3FFF ? -1.0 : weightKg * 2.2046226;
                                bytesConsumed = 2;
                                break;
                            case 0x04: // temp
                                const tempData = data.getUint16(0);
                                tempC = tempData >> 2;
                                if ((tempData & 0x8000) > 0) {
                                    // negative value
                                    tempC = tempC ^ 0x3FFF;
                                }
                                tempC = tempC  * 0.03125;
                                bytesConsumed = 2;
                                break;
                            default:
                                console.warn("SmartShelf: Unknown data type encountered", dataType);
                                data = cutFront(data, data.buffer.byteLength); // vause loop to bail
                                break;
                        }
                        data = cutFront(data, bytesConsumed);
                    }
                    if (!simulatedBatteryCharge[event.device.id]) {
                        simulatedBatteryCharge[event.device.id] = simulatedBatteryChargeLastReport;
                        simulatedBatteryChargeLastReport = simulatedBatteryChargeLastReport -21;
                        if (simulatedBatteryChargeLastReport < 50) {
                            simulatedBatteryChargeLastReport = 50;
                        }
                    }
                    self.emit('data', {
                        id: event.device.id,
                        weightLbs: weightLbs.toFixed(4),
                        tempC: (tempC).toFixed(4),
                        humidityRh: Math.abs(Math.sin(Math.PI / (tempC % 100)) * 100.0).toFixed(1),
                        battery: simulatedBatteryCharge[event.device.id]
                    });
                });
            })
            .catch(error => {
                self.emit("disconnected", error);
                setTimeout(self.scan, 1000);

            });
    };
    this.stop = _ => {

    };

    this.connect = _ => {

    };

    bluetooth.addEventListener('availabilitychanged', function (e) {
        console.log("GW Available SmartShelf:", e.value);
        if (e.value === false) {
            self.emit('disconnected', "SmartShelf Gateway link lost");
        } else {
            setTimeout(self.scan, 1000);
        }
    });
}

nodeUtil.inherits(SmartShelf, EventEmitter);
module.exports.SmartShelf = SmartShelf;

},{"./util":8,"events":"events","util":"util"}],8:[function(require,module,exports){
module.exports.toHex = (data) => {
    const arrData = new Uint8Array(data.buffer);
    let hexData = '';
    for (let i = 0; i < arrData.length; i++) {
        let hex = arrData[i].toString(16);
        if (hex.length === 1) {
            hex = '0' + hex;
        }
        hexData = hexData + hex;
    }
    return hexData;
};
module.exports.hexAsArray = (hex) => {
    const bytes = [];
    for (let i = 0; i < hex.length - 1; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
};
},{}],9:[function(require,module,exports){

},{}],10:[function(require,module,exports){
var C = require("./lib/constants.js").C;
var helper = require('./lib/message-helper');
var ee = require("./lib/event-emitter");
var Descriptor = require("./descriptor").Descriptor;

// TODO: Errors if not connected
function Characteristic(service, uuid, props) {
    ee.instantiateEmitter(this);
    var self = this;
    var peripheral = service.peripheral();
    var gattip = peripheral.gattip();
    var descriptors = {};
    var properties = {};

    helper.requireUUID('Characteristic', 'uuid', uuid);
    this.uuid = uuid;
    if (!props) {
        props = {};
    }
    properties = props;
    this.type = 'c';

    //this.value = undefined;
    this.isNotifying = false;

    this.gattip = function () {
        return gattip;
    };
    this.peripheral = function () {
        return peripheral;
    };
    this.service = function () {
        return service;
    };
    this.getAllDescriptors = function () {
        return descriptors;
    };
    this.findDescriptor = function (uuid) {
        return descriptors[uuid];
    };
    this.addDescriptorWithUUID = function (descriptorUUID) {
        var descriptor = new Descriptor(self, descriptorUUID);
        return descriptors[descriptorUUID] = descriptor;
    };
    this.addDescriptor = function (descriptor) {
        return descriptors[descriptor.uuid] = descriptor;
    };
    // TODO: Explain properties
    this.hasProperty = function (type) {
        return (properties[type] && properties[type].enabled);
    };
    this.setProperty = function (type, value) {
        return (properties[type] = value);
    };
    this.allProperties = function () {
        return properties;
    };


    // REQUESTS =================================================

    this.readValue = function (callback) {
        var params = helper.populateParams(self);
        gattip.request(C.kGetCharacteristicValue, params, callback, function (params) {
            helper.requireFields('Value', params, [C.kValue], []);
            self.value = params[C.kValue];
            gattip.fulfill(callback, self, self.value);
        });
    };

    this.writeValue = function (callback, value) {
        helper.requireHexValue('writeValue', 'value', value);
        var params = helper.populateParams(self);
        params[C.kValue] = value;
        gattip.request(C.kWriteCharacteristicValue, params, callback, function (params) {
            self.value = value;
            gattip.fulfill(callback, self);
        });
    };

    this.enableNotifications = function (callback, isNotifying) {
        helper.requireBooleanValue('enableNotifications', 'isNotifying', isNotifying);
        var params = helper.populateParams(self);
        params[C.kIsNotifying] = isNotifying;
        gattip.request(C.kSetValueNotification, params, callback, function (params) {
            self.isNotifying = isNotifying;
            gattip.fulfill(callback, self, isNotifying);
        });
    };


    // INDICATIONS ==============================================

    this.handleValueNotification = function (params) {
        self.value = params[C.kValue];
        self.emit('valueChange', self, self.value);
    };


    // SERVER RESPONSES/INDICATIONS  ============================

    this.respondToReadRequest = function (cookie, value) {
        helper.requireHexValue('respondToReadRequest', 'value', value);
        var params = helper.populateParams(self);
        params[C.kValue] = value;
        cookie.result = C.kGetCharacteristicValue;
        gattip.respond(cookie, params);
    };

    this.respondToWriteRequest = function (cookie) {
        var params = helper.populateParams(self);
        cookie.result = C.kWriteCharacteristicValue;
        gattip.respond(cookie, params);
    };

    this.respondToChangeNotification = function (cookie, isNotifying) {
        var params = helper.populateParams(self);
        helper.requireBooleanValue('respondToChangeNotification', 'value', isNotifying);
        params[C.kIsNotifying] = isNotifying;
        this.isNotifying = isNotifying;
        cookie.result = C.kSetValueNotification;
        gattip.respond(cookie, params);
    };

    this.indicateValueChange = function (value) {
        helper.requireHexValue('writeValue', 'value', value);
        var params = helper.populateParams(self);
        params[C.kValue] = value;
        gattip.sendIndications(C.kSetValueNotification, params);
    };

}
ee.makeEmitter(Characteristic);

module.exports.Characteristic = Characteristic;

},{"./descriptor":11,"./lib/constants.js":15,"./lib/event-emitter":16,"./lib/message-helper":19}],11:[function(require,module,exports){
var C = require("./lib/constants.js").C;
var helper = require('./lib/message-helper');

// TODO: Errors if not connected
function Descriptor(characteristic, uuid) {
    var self = this;
    var service = characteristic.service();
    var peripheral = service.peripheral();
    var gattip = peripheral.gattip();

    helper.requireUUID('Descriptor', 'uuid', uuid);
    this.uuid = uuid;
    this.type = 'd';

    //this.value = undefined;
    this.characteristic = function () {
        return characteristic;
    };
    this.service = function () {
        return service;
    };
    this.peripheral = function () {
        return peripheral;
    };
    this.gattip = function () {
        return gattip;
    };

    // REQUESTS =================================================

    this.readValue = function (callback) {
        var params = helper.populateParams(self);
        gattip.request(C.kGetDescriptorValue, params, callback, function (params) {
            helper.requireFields('readValue', params, [C.kValue], []);
            self.value = params[C.kValue];
            gattip.fulfill(callback, self, self.value);
        });
    };

    //TODO: Nake sure it's not longer than 20 bytes
    this.writeValue = function (callback, value) {
        var params = helper.populateParams(self);
        helper.requireHexValue('writeValue', 'value', value);
        gattip.request(C.kWriteDescriptorValue, params, callback, function (params) {
            self.value = value;
            gattip.fulfill(callback, self);
        });
    };


    // SERVER RESPONSES/INDICATIONS  ============================

    this.respondToReadRequest = function (cookie, value) {
        var params = helper.populateParams(self);
        helper.requireHexValue('respondToReadRequest', 'value', value);
        params[C.kValue] = value;
        gattip.respond(cookie, params);
    };

    this.respondToWriteRequest = function (cookie) {
        var params = helper.populateParams(self);
        gattip.respond(cookie, params);
    };
}


module.exports.Descriptor = Descriptor;


},{"./lib/constants.js":15,"./lib/message-helper":19}],12:[function(require,module,exports){
//TODO: Review which ones application errorrs, which ones are internal (gateway protocol not understood oro something went wrong) and which ones are errors from Gateway/Bluetooth

module.exports.ApplicationError = function (message) {
    this.message = "Application Error:" + message;
    Error.captureStackTrace(this, module.exports.ApplicationError);

};

module.exports.InternalError = function (message) {
    this.message = "Application Error:" + message;
    Error.captureStackTrace(this, module.exports.InternalError);
};

module.exports.GatewayError = function (params) {
    if (typeof params == 'object') {
        this.message = "Gateway Error:";
        if (params.message) {
            this.message += " " + params.message;
        }
        if (params.code) {
            this.message += " Code:" + params.code;
        }
        if (0 == this.message.length) {
            this.message = "Unknown Gateway Error"
        }
    } else {
        this.message = params;
    }
    Error.captureStackTrace(this, module.exports.GatewayError);
};

},{}],13:[function(require,module,exports){
var C = require('./lib/constants').C;
var helper = require('./lib/message-helper');
var Peripheral = require('./peripheral').Peripheral;
var Stream = require('./stream').Stream;
var InternalError = require('./errors').InternalError;
var ApplicationError = require('./errors').ApplicationError;
var ee = require("./lib/event-emitter");
var GatewayError = require("./errors").GatewayError;

function Gateway(gattip, scanFilters) {
    ee.instantiateEmitter(this);
    var self = this;
    var peripherals = {};
    var objectsByObjectId = {};

    this.isScanning = false;

    this.isPoweredOn = function () {
        return self.state == C.kPoweredOn;
    };

    // REQUESTS =================================================
    this._authenticate = function (callback, token, version) {
        var params = {};
        params[C.kDeviceAccessToken] = token;
        params[C.kGetVersionInfo] = version;
        gattip.request(C.kOpen, params, callback, function (params) {
            if (params && params.isAuthenticated === false) {
                gattip.reject(callback, new GatewayError("Authentication failed"))
            } else {
                gattip.fulfill(callback, self);
            }
        });
    };

    this.scan = function (callback, scanOptions) {
        var params = {};
        if (scanOptions) {
            if ('boolean' == typeof scanOptions.scanDuplicates) {
                params[C.kScanOptionAllowDuplicatesKey] = scanOptions.scanDuplicates;
            }
            if ('object' == typeof scanOptions.services) {
                params[C.kServiceUUIDs] = scanOptions.services;
            }
        }

        gattip.request(C.kScanForPeripherals, params, callback, function (params) {
            self.isScanning = true;
            gattip.fulfill(callback, self);
        });
    };

    // TODO: Unregister all on scan event handlers
    this.stopScan = function (callback) {
        gattip.request(C.kStopScanning, {}, callback, function (params) {
            self.isScanning = false;
            gattip.fulfill(callback, self);
        });
    };

    this.centralState = function (callback) {
        var params = {};

        gattip.request(C.kCentralState, {}, callback, function (params) {
            self.state = params[C.kState];
            gattip.fulfill(callback, self);
        });
    };

    this.configure = function (callback, pwrAlert, centralID) {
        var params = {};
        if (typeof pwrAlert != 'undefined') {
            params[C.kShowPowerAlert] = pwrAlert;
        }
        if (typeof centralID != 'undefined') {
            params[C.kIdentifierKey] = centralID;
        }

        gattip.request(C.kConfigure, {}, callback, function (params) {
            gattip.fulfill(callback, self);
        });
    };

    this.openStream = function (callback, streamPath, options) {
        var params = {};
        if (!options) {
            options = {};
        }
        if (typeof options.speed == 'number') {
            params[C.kSpeed] = options.speed;
        }
        if (typeof options.force == 'boolean') {
            params[C.kForce] = options.force;
        }
        var streamObjectId = params[C.kObjectId] = streamPath;
        helper.requireFields('objectId', params, [C.kObjectId]);

        gattip.request(C.kOpenStream, params, callback, function (params) {
            if (typeof params[C.kObjectId] == "string") {
                // if the response contains a new object ID, replace it
                streamObjectId = params[C.kObjectId];
            }
            var stream = new Stream(this, streamObjectId);
            objectsByObjectId[streamObjectId] = stream;
            gattip.fulfill(callback, stream);
        });
    };
    //
    this.closeStream = function (callback, objectId) {
        var params = {};
        var streamObjectId = params[C.kObjectId] = objectId;
        helper.requireFields('objectId', params, [C.kObjectId]);

        gattip.request(C.kCloseStream, params, callback, function (params) {
            var stream = objectsByObjectId[streamObjectId];
            delete objectsByObjectId[streamObjectId];
            gattip.fulfill(callback, stream);
        });
    };
    //

    this.handleScanIndication = function(params) {
        var peripheralUUID = params[C.kPeripheralUUID];
        if (!peripheralUUID) {
            throw new InternalError('Peripheral UUID is not availabvle');
        }
        if (scanFilters && scanFilters.uuids) {
            for (var i = 0; i < scanFilters.uuids.length; i++) {
                var uuid = scanFilters.uuids[i];
                if (uuid && uuid.length) {
                    if (uuid != peripheralUUID) {
                        return;
                    }
                }
            }
        }

        var peripheral = self.getPeripheral(peripheralUUID);
        if (!peripheral) {
            peripheral = self.addPeripheral(new Peripheral(
                gattip,
                peripheralUUID,
                params[C.kPeripheralName],
                params[C.kRSSIkey],
                params[C.kCBAdvertisementDataTxPowerLevel],
                params[C.kCBAdvertisementDataIsConnectable],
                params[C.kCBAdvertisementDataServiceUUIDsKey],
                params[C.kCBAdvertisementDataManufacturerDataKey],
                params[C.kCBAdvertisementDataServiceDataKey],
                params[C.kAdvertisementDataKey],
                params[C.kScanRecord])
            );
        } else {
            peripheral._updateFromScanData(
                params[C.kPeripheralName],
                params[C.kRSSIkey],
                params[C.kCBAdvertisementDataTxPowerLevel],
                params[C.kCBAdvertisementDataIsConnectable],
                params[C.kCBAdvertisementDataServiceUUIDsKey],
                params[C.kCBAdvertisementDataManufacturerDataKey],
                params[C.kCBAdvertisementDataServiceDataKey],
                params[C.kAdvertisementDataKey],
                params[C.kScanRecord]
            );
        }
        self.emit('scan', peripheral);

    };

    // PERIPHERAL MANAGEMENT ETC. ======================================

    this.addPeripheralWithValues = function (uuid, name, RSSI, txPwr, serviceUUIDs, mfrData, scvData, connectable) {
        if (!uuid) {
            throw new InternalError('Attempting to add an empty peripheral');
        }
        var peripheral = self.addPeripheral(new Peripheral(gattip, uuid, name, RSSI, txPwr, connectable, serviceUUIDs, mfrData, scvData));
        peripherals[uuid] = peripheral;
        return peripheral;
    };

    this.addPeripheral = function (peripheral) {
        if (!peripheral || !peripheral.uuid) {
            throw new InternalError('Attempting to add an empty peripheral');
        }
        peripherals[peripheral.uuid] = peripheral;
        return peripheral;
    };
    this.addStream = function (objectId) {
        var stream  =new Stream(this, objectId);
        objectsByObjectId[objectId] = stream;
        return stream;
    };

    this.removePeripheral = function (peripheral) {
        if (!peripheral || !peripheral.uuid) {
            throw new InternalError('Attempting to remove an empty peripheral');
        }
        delete peripherals[peripheral.uuid];
    };

    this.getPeripheral = function (peripheralUUID) {
        return peripherals[peripheralUUID];
    };

    this.getObject = function (objectId) {
        return objectsByObjectId[objectId];
    };
    this.removeObject = function (objectId) {
        delete objectsByObjectId[objectId];
    };

    this.getPeripheralOrDie = function (peripheralUUID) {
        var peripheral = peripherals[peripheralUUID];
        if (!peripheral) {
            throw new InternalError('Unable to find peripheral with UUID ' + peripheralUUID);
        }
        return peripheral;
    };

    this.getObjects = function(type, peripheralUUID, serviceUUID, characteristicUUID, descriptorUUID) {
        var resultObj = {};
        resultObj.peripheral = peripherals[peripheralUUID];
        if (resultObj.peripheral) {
            if (type === 'p') {
                return resultObj;
            }
            resultObj.service = resultObj.peripheral.findService(serviceUUID);
            if (resultObj.service) {
                if (type === 's') {
                    return resultObj;
                }
                resultObj.characteristic = resultObj.service.findCharacteristic(characteristicUUID);
                if (resultObj.characteristic) {
                    if (type === 'c') {
                        return resultObj;
                    }
                    resultObj.descriptor = resultObj.characteristic.findDescriptor(descriptorUUID);
                    if (resultObj.descriptor) {
                        if (type === 'd') {
                            return resultObj;
                        } else {
                            throw new InternalError('_getObjects: Argument "type" is required');
                        }
                    } else {
                        throw new ApplicationError('Descriptor "'+ descriptorUUID + '" not found in the service table');
                    }
                } else {
                    throw new ApplicationError('Characteristic "'+ characteristicUUID + '" not found in the service table');
                }
            } else {
                throw new ApplicationError('Service "'+ serviceUUID + '" not found in the service table');
            }
        } else {
            throw new ApplicationError('Peripheral with id '+ peripheralUUID + ' not found');
        }
    };


    this.getObjectsFromMessage = function(type, params) {
        if (!params) {
            throw new InternalError("Message parameters are missing");
        }
        try {
            return self.getObjects(type, params[C.kPeripheralUUID], params[C.kServiceUUID], params[C.kCharacteristicUUID], params[C.kDescriptorUUID] );
        } catch (error) {
            throw new InternalError(error.message, error.detail);
        }
    };

    this.close = function () {
        for (var pIdx in Object.keys(peripherals)) {
            if (peripherals.hasOwnProperty(pIdx)) {
                var p = peripherals[pIdx];
                p.removeAllListeners();
                p.removeAllChildListenersAndFlush();

            }
        }
        peripherals = {};
        self.removeAllListeners();
    };

}
ee.makeEmitter(Gateway);
module.exports.Gateway = Gateway;

},{"./errors":12,"./lib/constants":15,"./lib/event-emitter":16,"./lib/message-helper":19,"./peripheral":23,"./stream":25}],14:[function(require,module,exports){
var ee = require("./lib/event-emitter");
var InternalError = require("./errors").InternalError;
var ApplicationError = require("./errors").ApplicationError;
var GatewayError = require("./errors").GatewayError;
var MessageHandler = require("./lib/message-handler").MessageHandler;
var MessageProcessor = require('./lib/message-processor').MessageProcessor;
var Gateway = require("./gateway").Gateway;
var helper = require('./lib/message-helper');
var ServerMessageHandler = require("./lib/server-message-handler").ServerMessageHandler;

var NODE_CLIENT_SOCKET_CONFIG = {
    keepalive:true,
    dropConnectionOnKeepaliveTimeout:true,
    keepaliveInterval:10000, // ping every 10 seconds
    keepaliveGracePeriod:10000 // time out if pong is not received after 10 seconds
};

function GATTIP() {
    ee.instantiateEmitter(this);


    this.traceEnabled = false;
    var self = this;
    var stream;
    var processor;
    var mh;
    var smh;
    var gateway;
    this.getGateway = function() {
        return gateway;
    };

    this.traceMessage = function(message, prefix) {
        if (self.traceEnabled) {
            if ('object' == typeof message) {
                message = JSON.stringify(message);
            }
            console.log(prefix? prefix : "", message);
        }
    };

    function sendError(err) {
        self.emit('error', err);
    }

    this.getServerMessageHandler = function() {
        if(!smh) {
            sendError(new GatewayError("Server Message Handler is not Ready"));
        }
        return smh;
    };

    /** callback handling helpers */
    this.fulfill = function (cb, arg1, arg2, arg3, arg4, arg5) {
        if (typeof cb == 'object' && typeof cb.fulfill == 'function') {
            cb.fulfill(arg1, arg2, arg3, arg4, arg5);
        } else if (typeof cb == 'function') {
            cb(arg1, arg2, arg3, arg4, arg5);
        } // else no callback needed.
    };
    this.reject = function (cb, error) {
        if (typeof cb == 'object' && typeof cb.reject == 'function') {
            cb.reject(error);
        } else {
            sendError(error);
        }
    };

    function guardedProcessMessage(doParse, message, handlerFunc) {
        try {
            if (doParse) {
                message = JSON.parse(message);
            }
            handlerFunc(message);
        } catch (error) {
            sendError(error);
        }
    }

    /**
     * Opens a connection to the gateway, given the configuration parameters
     * @param config
     *  url: WebSocket URL to open. This or stream is required to issue an open()
     *  stream: Stream object implementing send() and close(), onMessage()
     */
    this.open = function (config) {
        var gw = new Gateway(this, config.scanFilters);
        processor = new MessageProcessor(this);
        mh = new MessageHandler(this, gw);
        smh = new ServerMessageHandler(this, gw);

        function waitReady(config) {
            if (config.isServer) {
                processor.on('request', function (message) {
                    self.traceMessage(message, '<req:');
                    guardedProcessMessage(false, message, smh.processMessage);
                });
                processor.on('indication', function (message) {
                    sendError(new ApplicationError("Received an indication on a server stream:" + JSON.stringify(message)));
                });
                gateway = gw;
                self.emit('ready', gw);
            } else if (config.isPassThrough) {
                emitGateway();
            } else {
                gw.configure(function () {
                    gw.centralState(function () {
                        if (!gw.isPoweredOn()) {
                            console.log('Bluetooth not power on :(');
                            self.emit('state', gw.isPoweredOn());
                            var statePoll = setInterval(function() {
                                gw.centralState(function () {
                                    if (gw.isPoweredOn()) {
                                        self.emit('state', gw.isPoweredOn());
                                        clearInterval(statePoll);
                                        emitGateway();
                                    }
                                });
                            },500);
                        }else if(gw.isPoweredOn()){
                            emitGateway();
                        }
                    });
                });
            }
        }

        function emitGateway(){
            processor.on('indication', function (message) {
                self.traceMessage(message, '<ind:');
                guardedProcessMessage(false, message, mh.handleIndication)
            });
            processor.on('request', function (message) {
                sendError(new InternalError("Received a request on a client stream:" +  JSON.stringify(message)));
            });
            gateway = gw;
            self.emit('ready', gw);
        }

        function doOpen(config) {
            if (config.token) {
                gw._authenticate(function () {
                    waitReady(config);
                }, config.token,
                config.version);
            } else {
                waitReady(config);
            }
        }

        if (config.trace === true) {
            self.traceEnabled = true;
        }
        if (config.url) {
            var WebSocket;
            if (typeof window == 'object') {
                WebSocket = window.WebSocket;
            } else {
                WebSocket = require('websocket').w3cwebsocket;                
            }
            stream = new WebSocket(config.url, undefined, undefined, undefined, undefined, NODE_CLIENT_SOCKET_CONFIG);            
            stream.onopen = function () {
                doOpen(config);
            };
            stream.onclose = function (error) {
                stream = undefined;
                self.emit('onclose', error);
                setTimeout(self.close, 100);

            };
            stream.onerror = function (error) {
                self.emit('onerror', error);
            };

        } else if (config.stream) {
            stream = config.stream;
            doOpen(config);
        } else {
            throw new ApplicationError("URL or stream implementing a socket interface is required");
        }

        stream.onmessage = function (streamMessage) {
            guardedProcessMessage(true, streamMessage.data, processor.onMessageReceived);
        };

        function onProcessedResponse(message, ctxt) {
            self.traceMessage(message, '<rsp:');
            try {
                if (message.error) {
                    self.reject(ctxt.cb, new GatewayError(message.error));
                } else {
                    if (ctxt.handler) {
                        // handler is responsible to fulfill
                        ctxt.handler(message.params);
                    } else {
                        self.fulfill(ctxt.cb);
                    }
                }
            } catch (error) {
                self.reject(ctxt.cb, error);
            }
        }

        processor.on('response', onProcessedResponse);

        processor.on('error', function (error) {
            self.emit('error', error);
        });
    };

    this.close = function () {
        self.removeAllListeners();
        if (stream) {
            stream.close();
        }
        if (processor) {
            processor.flushRequests();
            processor.removeAllListeners();
        }
        if (gateway) {
            gateway.close();
        }
    };

    this.flushRequests = function (filter) {
        processor.flushRequests(filter);
    };

    // AKA socket (as opposed to gattip stream)
    this.getCommunicationStream = function () {
        return stream;
    };


    // INTERNAL ONLY

    this.request = function (method, params, userCb, handler) {
        var ctxt = mh.createUserContext(method, params, userCb, handler);
        var msg = ctxt.originalMessage;
        processor.register(msg, ctxt);
        self.traceMessage(msg, '>req:');
        if (stream) {
            stream.send(JSON.stringify(msg));
        } else {
            self.reject(userCb, new GatewayError("Stream closed"));
        }
    };

    this.respond = function (cookie, params) {
        var msg = mh.wrapResponse(cookie, params);
        self.traceMessage(msg, '>rsp:');
        if (stream) {
            stream.send(JSON.stringify(msg));
        } else {
            throw new GatewayError("Stream closed");
        }
    };

    this.sendIndications = function (result, params){
        var msg = {
            params: params,
            jsonrpc: "2.0"
        };
        msg.result = result;
        msg.params = params;
        self.traceMessage(msg, '>rsp:');
        if (stream) {
            stream.send(JSON.stringify(msg));
        } else {
            throw new GatewayError("Stream closed");
        }
    };

    this.sendError = function (msg) {
        msg.jsonrpc = "2.0";
        self.traceMessage(msg, '>rsp:');
        if (stream) {
            stream.send(JSON.stringify(msg));
        } else {
            throw new GatewayError("Stream closed");
        }
    };
}


ee.makeEmitter(GATTIP);
module.exports.GATTIP = GATTIP;

},{"./errors":12,"./gateway":13,"./lib/event-emitter":16,"./lib/message-handler":18,"./lib/message-helper":19,"./lib/message-processor":20,"./lib/server-message-handler":21,"websocket":9}],15:[function(require,module,exports){
var C = {
    // TODO: When we are done, clean up all unsupported constancts

    // make default timeout a tad longer than whatever the longest gateway timeout may be
    // client should pass adequate timeouts
    DEFAULT_MESSAGE_TIMEOUT_MS: 61000,
    MAX_PENDING_MESSAGES: 200, // maximum number of pending requests (in message-processor)
    NUM_CONNECT_ATTEMPTS: 3,

    /* BEGIN new constants with gattip 2.0 */
    kMessageId                  : "id",
    kSessionId                  : "session_id",
    kObjectId                   : "oid",

    kAuthenticate               : 'aut',
    kOpen                       : 'opn',
    kDeviceAccessToken          : 'dat',
    kGetVersionInfo             : 'vif',
    kOpenStream                 : 'ops',
    kCloseStream                : 'cls',
    kStreamClosedIndication     : 'cis',
    kWriteStreamData            : 'wsd',
    kStreamDataIndication       : 'sdi',

    kVal                        : 'val',
    kSpeed                      : 'spd',
    kForce                      : 'frc',

    /* END new constants with gattip 2.0 */
    kError: "error",
    kCode: "code",
    kMessageField: "message",
    kMethod:'method',
    kResult: "result",
    kIdField: "id",
    kConfigure: "aa",
    kScanForPeripherals: "ab",
    kStopScanning: "ac",
    kConnect: "ad",
    kDisconnect: "ae",
    kCentralState: "af",
    kGetConnectedPeripherals: "ag",
    kGetPerhipheralsWithServices: "ah",
    kGetPerhipheralsWithIdentifiers: "ai",
    kGetServices: "ak",
    kGetIncludedServices: "al",
    kGetCharacteristics: "am",
    kGetDescriptors: "an",
    kGetCharacteristicValue: "ao",
    kGetDescriptorValue: "ap",
    kWriteCharacteristicValue: "aq",
    kWriteDescriptorValue: "ar",
    kSetValueNotification: "as",
    kGetPeripheralState: "at",
    kGetRSSI: "au",
    kInvalidatedServices: "av",
    kPeripheralNameUpdate: "aw",
    kMessage: "zz",
    kCentralUUID: "ba",
    kPeripheralUUID: "bb",
    kPeripheralName: "bc",
    kPeripheralUUIDs: "bd",
    kServiceUUID: "be",
    kServiceUUIDs: "bf",
    kPeripherals: "bg",
    kIncludedServiceUUIDs: "bh",
    kCharacteristicUUID: "bi",
    kCharacteristicUUIDs: "bj",
    kDescriptorUUID: "bk",
    kServices: "bl",
    kCharacteristics: "bm",
    kDescriptors: "bn",
    kProperties: "bo",
    kValue: "bp",
    kState: "bq",
    kStateInfo: "br",
    kStateField: "bs",
    kWriteType: "bt",
    kRSSIkey: "bu",
    kIsPrimaryKey: "bv",
    kIsBroadcasted: "bw",
    kIsNotifying: "bx",
    kShowPowerAlert: "by",
    kIdentifierKey: "bz",
    kScanOptionAllowDuplicatesKey: "b0",
    kScanOptionSolicitedServiceUUIDs: "b1",
    kAdvertisementDataKey: "b2",
    kCBAdvertisementDataManufacturerDataKey: "mfr",
    kCBAdvertisementDataServiceUUIDsKey: "suu",
    kCBAdvertisementDataServiceDataKey: "sdt",
    kCBAdvertisementDataOverflowServiceUUIDsKey: "b6",
    kCBAdvertisementDataSolicitedServiceUUIDsKey: "b7",
    kCBAdvertisementDataIsConnectable: "cbl",
    kCBAdvertisementDataTxPowerLevel: "txp",
    kPeripheralBtAddress: "c1",
    kRawAdvertisementData: "c2",
    kScanRecord: "c3",
    kCBCentralManagerRestoredStatePeripheralsKey: "da",
    kCBCentralManagerRestoredStateScanServicesKey: "db",
    kWriteWithResponse: "cc",
    kWriteWithoutResponse: "cd",
    kNotifyOnConnection: "ce",
    kNotifyOnDisconnection: "cf",
    kNotifyOnNotification: "cg",
    kDisconnected: "ch",
    kConnecting: "ci",
    kConnected: "cj",
    kUnknown: "ck",
    kResetting: "cl",
    kUnsupported: "cm",
    kUnauthorized: "cn",
    kPoweredOff: "co",
    kPoweredOn: "cp",
    kErrorPeripheralNotFound: "-32001",
    kErrorServiceNotFound: "-32002",
    kErrorCharacteristicNotFound: "-32003",
    kErrorDescriptorNotFound: "-32004",
    kErrorPeripheralStateIsNotValid: "-32005",
    kErrorNoServiceSpecified: "-32006",
    kErrorNoPeripheralIdentiferSpecified: "-32007",
    kErrorStateRestorationNotValid: "-32008",
    kInvalidRequest: "-32600",
    kMethodNotFound: "-32601",
    kInvalidParams: "-32602",
    kError32603: "-32603",
    kParseError: "-32700",
    kGAP_ADTYPE_FLAGS: "01",
    kGAP_ADTYPE_INCOMPLETE_16BIT_SERVICEUUID: "02",
    kGAP_ADTYPE_COMPLETE_16BIT_SERVICEUUID: "03",
    kGAP_ADTYPE_INCOMPLETE_32BIT_SERVICEUUID: "04",
    kGAP_ADTYPE_COMPLETE_32BIT_SERVICEUUID: "05",
    kGAP_ADTYPE_INCOMPLETE_128BIT_SERVICEUUID: "06",
    kGAP_ADTYPE_COMPLETE_128BIT_SERVICEUUID: "07",
    kGAP_ADTYPE_POWER_LEVEL: "0A",
    kGAP_ADTYPE_MANUFACTURER_SPECIFIC: "FF",
    kGAP_ADTYPE_16BIT_SERVICE_DATA: "16",
    id: 1,
    authenticate: 'authenticate',
    AllProperties: ["Broadcast", "Read", "WriteWithoutResponse", "Write", "Notify", "Indicate", "AuthenticatedSignedWrites", "ExtendedProperties", "NotifyEncryptionRequired", "IndicateEncryptionRequired"]
};

module.exports.C = C;

},{}],16:[function(require,module,exports){
/**

 Example code:

 function MyEmitter() {
    module.exports.instantiateEmitter(this);

}
 module.exports.makeEmitter(MyEmitter);

 const myEmitter = new MyEmitter();
 myEmitter.on('event', function (arg) {
    console.log('an event occurred!', arg);
});
 myEmitter.emit('event', 'foo');
 */


var EventEmitter = require('events');
var util = require('util'); // this is node util
module.exports.makeEmitter = function (contructor) {
    util.inherits(contructor, EventEmitter);
};
module.exports.instantiateEmitter = function (object) {
    EventEmitter.call(object);
};


},{"events":"events","util":"util"}],17:[function(require,module,exports){
var C = require('./constants').C;
function getDiscoverable(advdata, advArray) {
    var discoverableDataLength = parseInt(advArray[0], 16);
    if (parseInt(advArray[2], 16) >= 1) {
        advdata.connectable = "true";
    } else
        advdata.connectable = "false";
    advArray.splice(0, discoverableDataLength + 1);
}

function getTXLevel(advdata, advArray) {
    var txlevelDataLength = parseInt(advArray[0], 16);
    advdata.txPowerLevel = parseInt(advArray[2]);
    advArray.splice(0, txlevelDataLength + 1);
}

function getManufacturerData(advdata, advArray) {
    var manufacturerDataLength = parseInt(advArray[0], 16);
    if (manufacturerDataLength > 2) {
        var mfrKey = advArray[3] + advArray[2];
        var mfrData = '';
        for (var k = 4; k <= manufacturerDataLength; k++) {
            mfrData += advArray[k];
        }
        advdata.manufacturerData[mfrKey] = mfrData;
    }
    advArray.splice(0, manufacturerDataLength + 1);
}

function getServiceUUIDs(advdata, advArray) {
    var service16bitDataLength = parseInt(advArray[0], 16);
    var reverse16bitUUID = '';
    for (var i = service16bitDataLength; i >= 2; i--) {
        reverse16bitUUID += advArray[i];
    }
    advdata.serviceUUIDs = reverse16bitUUID;
    advArray.splice(0, service16bitDataLength + 1);
}

function get128bitServiceUUIDs(advdata, advArray) {
    var service128bitDataLength = parseInt(advArray[0], 16);
    var reverse128bitUUID = '';
    for (var i = service128bitDataLength; i >= 2; i--) {
        reverse128bitUUID += advArray[i];
        if (i == 14 || i == 12 || i == 10 || i == 8) {
            reverse128bitUUID += "-";
        }
    }
    advdata.serviceUUIDs = reverse128bitUUID;
    advArray.splice(0, service128bitDataLength + 1);
}

function getServiceData(advdata, advArray) {
    var serviceDataLength = parseInt(advArray[0], 16);
    var eddystoneServiceUUID = '';
    for (var i = 3; i >= 2; i--) {
        eddystoneServiceUUID += advArray[i];
    }
    if (eddystoneServiceUUID == 'FEAA') {
        if (parseInt(advArray[4], 16) === 0) {
            getUID(advdata);
        } else if (parseInt(advArray[4], 16) == 16) {
            getURL(advdata);
        } else if (parseInt(advArray[4], 16) == 32) {
            getTLM(advdata);
        }
    }
    advArray.splice(0, serviceDataLength + 1);
}

function getUID(advdata, advArray) {
    advdata.frameType = 'UID';
    advdata.nameSpace = '';
    advdata.instanceID = '';
    advdata.txPowerLevel = parseInt(advArray[5], 16);
    for (var i = 6; i < 16; i++) {
        advdata.nameSpace += advArray[i];
    }
    for (var j = 16; j < 22; j++) {
        advdata.instanceID += advArray[j];
    }
    advdata.reserved = advArray[22];
    advdata.reserved += advArray[23];
}

function getURL(advdata, advArray) {
    advdata.frameType = 'URL';
    advdata.txPowerLevel = parseInt(advArray[5]);
    for (var protocol in C.AllProtocols) {
        if (advArray[6] == protocol)
            advdata.url = C.AllProtocols[protocol];
    }
    for (var i = 7; i < advArrayLength; i++) {
        advdata.url += String.fromCharCode(parseInt(advArray[i], 16));
    }
    for (var domain in C.AllDomains) {
        if (advArray[advArrayLength] == domain)
            advdata.url += C.AllDomains[domain];
    }
}

function getTLM(advdata, advArray) {
    advdata.frameType = 'TLM';
    advdata.advPacketCount = '';
    advdata.timeInterval = '';
    advdata.batteryVoltage = '';
    advdata.eddyVersion = parseInt(advArray[5], 16);
    for (var i = 6; i < 8; i++) {
        advdata.batteryVoltage += advArray[i];
    }
    advdata.batteryVoltage = parseInt(advdata.batteryVoltage, 16);
    advdata.temperature = Math.ceil(parseInt(advArray[8], 16));
    advdata.temperature += '.';
    var temp = Math.ceil(((1 / 256) * parseInt(advArray[9], 16)));
    if (temp.length > 2)
        advdata.temperature += temp.toString().substring(0, 2);
    else
        advdata.temperature += temp;
    for (var j = 10; j < 14; j++) {
        advdata.advPacketCount += advArray[j];
    }
    advdata.advPacketCount = parseInt(advdata.advPacketCount, 16);
    for (var k = 14; k < 18; k++) {
        advdata.timeInterval += advArray[k];
    }
    advdata.timeInterval = Math.ceil(parseInt(advdata.timeInterval, 16) * 0.1);
    advdata.timePeriod = '';
    if (advdata.timeInterval >= 60) {
        var days = Math.floor(advdata.timeInterval / 86400);
        if (days > 0) {
            advdata.timePeriod += days < 10 ? days + 'day ' : days + 'days ';
            advdata.timeInterval -= days * 24 * 60 * 60;
        }
        var hours = Math.floor(advdata.timeInterval / 3600);
        if (hours > 0) {
            advdata.timePeriod += hours < 10 ? '0' + hours + ':' : hours + ':';
            advdata.timeInterval -= hours * 60 * 60;
        } else
            advdata.timePeriod += '00:';
        var min = Math.floor(advdata.timeInterval / 60);
        if (min > 0) {
            advdata.timePeriod += min < 10 ? '0' + min + ':' : min + ':';
            advdata.timeInterval -= min * 60;
            advdata.timePeriod += advdata.timeInterval < 10 ? '0' + advdata.timeInterval : advdata.timeInterval;
            advdata.timePeriod += ' secs';
            advdata.timeInterval = 0;
        } else {
            advdata.timePeriod += '00:' + advdata.timeInterval;
            advdata.timeInterval = 0;
        }
    } else if (advdata.timeInterval > 0 && advdata.timeInterval < 60) {
        advdata.timePeriod += advdata.timeInterval < 10 ? '00:00:0' + advdata.timeInterval : '00:00:' + advdata.timeInterval;
        advdata.timePeriod += ' secs';
    }
}

module.exports.parseAdvArray = function (peripheral, rawAdvertisingData) {
    if (!peripheral.advdata) {
        peripheral.advdata = {};
    }
    var advdata = peripheral.advdata;
    if(!advdata.manufacturerData){
        advdata.manufacturerData = {};
    }
    if(!advdata.serviceUUIDs){
        advdata.serviceUUIDs = [];
    }
    if (!rawAdvertisingData) {
        return [];
    }
    var advArray = [];
    if (rawAdvertisingData.length % 2 === 0) {
        for (var i = 0; i < rawAdvertisingData.length; i = i + 2) {
            advArray[i / 2] = rawAdvertisingData.charAt(i) + rawAdvertisingData.charAt(i + 1);
        }
    } else {
        for (var j = 0; j < rawAdvertisingData.length; j++) {
            advArray[j] = rawAdvertisingData.charAt(2 * j) + rawAdvertisingData.charAt(2 * j + 1);
        }
    }

    do {
        var type = advArray[1];
        if (type == C.kGAP_ADTYPE_FLAGS) {
            getDiscoverable(advdata, advArray);
        } else if (type == C.kGAP_ADTYPE_POWER_LEVEL) {
            getTXLevel(advdata, advArray);
        } else if (type == C.kGAP_ADTYPE_INCOMPLETE_16BIT_SERVICEUUID || type == C.kGAP_ADTYPE_COMPLETE_16BIT_SERVICEUUID) {
            getServiceUUIDs(advdata, advArray);
        } else if (type == C.kGAP_ADTYPE_INCOMPLETE_32BIT_SERVICEUUID || type == C.kGAP_ADTYPE_COMPLETE_32BIT_SERVICEUUID) {
            getServiceUUIDs(advdata, advArray);
        } else if (type == C.kGAP_ADTYPE_INCOMPLETE_128BIT_SERVICEUUID || type == C.kGAP_ADTYPE_COMPLETE_128BIT_SERVICEUUID) {
            get128bitServiceUUIDs(advdata, advArray);
        } else if (type == C.kGAP_ADTYPE_MANUFACTURER_SPECIFIC) {
            getManufacturerData(advdata, advArray);
        } else if (type == C.kGAP_ADTYPE_16BIT_SERVICE_DATA) {
            getServiceData(advdata, advArray);
        } else if (type == "00") {
            advArray.splice(0, 1);
        } else {
            var advArrayLength = parseInt(advArray[0], 16);
            advArray.splice(0, advArrayLength + 1);
        }
        if (advArray.length === 0) {
            break;
        }
    } while (true);
};
},{"./constants":15}],18:[function(require,module,exports){
var C = require('./constants').C;
var helper = require('./message-helper');
var InternalError = require('./../errors').InternalError;
var ApplicationError = require('./../errors').ApplicationError;

module.exports.MessageHandler = function (gattip, gateway) {
    var self = this;

    this.createUserContext = function (method, params, userCallback, handler) {
        var mesg = {
            method: method,
            params: params,
            jsonrpc: "2.0"
        };
        return {originalMessage: mesg, cb:userCallback, handler:handler};
    };
    this.wrapResponse = function (cookie, params) {
        var mesg = {
            params: params,
            jsonrpc: "2.0"
        };
        helper.requireAndPopulateFieldsFromCookie('wrapResponse', cookie, mesg);
        // console.log('Wrote', JSON.stringify(params));
        return mesg;
    };

    this.handleIndication = function (response) {
        if (response.error) {
            throw new ApplicationError(JSON.stringify(response));
        }

        var params = response.params;
        switch (response.result) {
            case C.kScanForPeripherals:
                var peripheral = gateway.handleScanIndication(params);
                break;
            case C.kDisconnect:
                (function () {
                    helper.requireFields('Disconnect indication', params, [C.kPeripheralUUID]);
                    var peripheral = gateway.getPeripheral(params[C.kPeripheralUUID]);
                    if (peripheral) {
                        peripheral.handleDisconnectIndication(peripheral);
                    } else {
                        console.warn("Received disconnect indication for an unknown peripheral with UUID", params[C.kPeripheralUUID]);
                    }
                })();
                break;
            case C.kSetValueNotification:
                (function () {
                    helper.requireFields('Disconnect indication', params, [C.kPeripheralUUID]);
                    var peripheral = gateway.getPeripheral(params[C.kPeripheralUUID]);
                    if (peripheral) {
                        helper.requireFields('Value notification', params, [C.kPeripheralUUID, C.kServiceUUID, C.kCharacteristicUUID, C.kValue]);
                        var objs = gateway.getObjectsFromMessage('c', response.params);
                        objs.characteristic.handleValueNotification(params);
                    } else {
                        console.warn("Received value notification for an unknown peripheral with UUID", params[C.kPeripheralUUID]);
                    }
                })();
                break;
            case C.kStreamDataIndication:
                (function () {
                    helper.requireFields('Object ID for stream data', params, [C.kObjectId]);
                    var stream = gateway.getObject(params[C.kObjectId]);
                    if (stream) {
                        stream.handleDataIndication(params);
                    } else {
                        console.warn("Received stream data indication for unknown stream", params[C.kObjectId]);
                    }
                })();
                break;
            case C.kStreamClosedIndication:
                (function () {
                    helper.requireFields('Object ID for stream close', params, [C.kObjectId]);
                    var stream = gateway.getObject(params[C.kObjectId]);
                    if (stream) {
                        stream.handleDataIndication(params);
                    } else {
                        console.warn("Received stream closed indication for unknown stream", params[C.kObjectId]);
                    }
                })();
                break;
            default:
                (function () {
                    throw new InternalError('Unknown indication received from the gateway:', JSON.stringify(response));
                })();
                break;
        }
    };
};
},{"./../errors":12,"./constants":15,"./message-helper":19}],19:[function(require,module,exports){
var C = require('./constants').C;
var constantNames = {};
var InternalError = require('./../errors').InternalError;
var ApplicationError = require('./../errors').ApplicationError;

for (var name in C) {
    //noinspection JSUnfilteredForInLoop
    var code = C[name];
    //noinspection JSUnfilteredForInLoop
    if (name.indexOf('k') == 0) {
        //noinspection JSUnfilteredForInLoop
        name = name.substring(1, name.length);
        constantNames[code] = name;
    }
}

module.exports.isEmpty = function (obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
};

module.exports.arrayAsHex = function (array, pretty) {
    var ret = (pretty ? '0x' : '');
    for (var i in array) {
        //noinspection JSUnfilteredForInLoop
        var value = (array[i] & 0xFF).toString(16);
        if (value.length == 1) {
            value = '0' + value;
        }
        ret += value;
    }
    return ret;
};

function recursiveToString(obj) {
    var ret = '';
    if (typeof obj == 'object') {
        if (Array.isArray(obj)) {
            var val = '';
            for (var i in obj) {
                if (0 != i) {
                    ret += ' ,';
                }
                ret += obj[i];
            }
        }
        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                var value = obj[name];
                var constantName = constantNames[name];
                if (!constantName) {
                    constantName = name;
                }
                if ('object' == typeof value) {
                    if (Array.isArray(value)) {
                        ret += ' ' + constantName + ':[' + recursiveToString(value) + ']';
                    } else {
                        ret += ' ' + constantName + ':{' + recursiveToString(value) + '}';
                    }
                } else {
                    ret += ' ' + constantName + '=' + value;
                }
            }
        }
    }
    return ret;
}

module.exports.toString = function (message) {
    return recursiveToString(message.params).trim();
};

/**
 * Just a meaningful name because the requireFields function can handle
 */
module.exports.requireAndAssignParameters = function (callDescription, object, fields, values) {
    module.exports.requireFields(callDescription + " call parameters ", object, fields, values);
};


module.exports.requireBooleanValue = function (description, parameterName, value) {
    if (typeof value != 'boolean') {
        throw new ApplicationError(description + ' missing parameter ' + parameterName);
    }
};
module.exports.requireHexValue = function (description, parameterName, value) {
    if (typeof value != 'string') {
        throw new ApplicationError(description + ' missing parameter ' + parameterName);
    }
    if (value.length > 0 && (value.length % 2 != 0 || !(/^[0-9a-fA-F]+$/.test(value)))) {
        throw new ApplicationError(description + ' value ' + parameterName + ' is not a valid hex string');
    }
};
module.exports.requireUUID = function (description, parameterName, value) {
    if (typeof value != 'string') {
        throw new ApplicationError(description + ' missing parameter ' + parameterName);
    }
    if (value.length < 4 ||!(/^[0-9A-F-]+$/.test(value))) {
        throw new ApplicationError(description + ' value ' + parameterName + ' is not a valid UUID');
    }
};
module.exports.requireHexValues = function (description, parameterNames, hexValues) {
    var missingFields = [];
    if (!Array.isArray(parameterNames) || !Array.isArray(hexValues)) {
        throw new InternalError("Illegal use of requireHexValues");
    }
    for (var i = 0; i < parameterNames.length; i++) {
        var pName = parameterNames[i];
        var value = hexValues[i];

        if (typeof value != 'string' || value.length < 2 || value.length % 2 != 0 || !/^#[0-9A-F]$/i.test(value)) {
            missingFields.push(pName);
        }
    }

    if (missingFields) {
        throw new ApplicationError(description + ' missing parameters ' + missingFields);
    }
};

module.exports.requireFields = function (description, object, fields, defaultsOrValues) {
    var missingFields = [];
    if (!defaultsOrValues) {
        defaultsOrValues = {};
    }
    if (!object) {
        throw new InternalError(description + 'Object is undefined');
    }
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        if (typeof object[field] == undefined) {
            if (typeof defaultsOrValues[i] == undefined) {
                missingFields.push(fields);
            } else {
                object[field] = defaultsOrValues[i];
            }
        }
    }
    if (missingFields.length) {
        throw new InternalError(description + ' missing ' + missingFields);
    }
};

module.exports.requireAndPopulateFieldsFromCookie = function (callDescription, cookie, message) {
    if (!cookie) {
        throw new ApplicationError('Error: "' + callDescription + ' is missing the cookie');
    }
    if (!cookie.original.id) {
        throw new ApplicationError('Error: "' + callDescription + ' is missing the cookie ID');
    }
    if (!cookie.original.session_id) {
        throw new ApplicationError('Error: "' + callDescription + ' is missing the cookie session ID');
    }
    if (!cookie.original.method) {
        throw new ApplicationError('Error: "' + callDescription + ' is missing the cookie request');
    }

    message[C.kMessageId] = cookie.original.id;
    message[C.kSessionId] = cookie.original.session_id;
    message.result = cookie.result;
};

module.exports.populateParams = function (serviceTableObject, params) {
    if (!params) {
        params = {};
    }
    if (!serviceTableObject) {
        throw new InternalError('populateParams: service object is undefined');
    }

    var p;
    var s;
    var c;
    var d;
    var remainingParts = 23132;
    switch (serviceTableObject.type) {
        case 'd':
            remainingParts = 4;
            d = serviceTableObject;
            break;
        case 'c':
            remainingParts = 3;
            c = serviceTableObject;
            break;
        case 's':
            remainingParts = 2;
            s = serviceTableObject;
            break;
        case 'p':
            remainingParts = 1;
            p = serviceTableObject;
            break;
        default:
            throw new InternalError('type must be one of: "s", "c" or "d"');
            break;
    }

    function storeField(field, obj) {
        remainingParts--;
        var uuid = obj.uuid;
        if (!uuid) {
            throw new InternalError('UUID for object of type "' + obj.type + '" is missing');
        }
        params[field] = uuid;
    }

    if (d) {
        storeField(C.kDescriptorUUID, d);
        c = d.characteristic();
    }
    if (c) {
        storeField(C.kCharacteristicUUID, c);
        s = c.service();
    }
    if (s) {
        storeField(C.kServiceUUID, s);
        p = c.peripheral();
    }
    if (p) {
        storeField(C.kPeripheralUUID, p);
    }
    if (remainingParts != 0) {
        throw new InternalError('Expected ' + remainingParts + ' more parts when constructing params of ' + serviceTableObject.type);
    }
    return params;
};


},{"./../errors":12,"./constants":15}],20:[function(require,module,exports){
var ee = require('./event-emitter');
var C = require('./constants').C;
var ApplicationError = require('./../errors').ApplicationError;

var id = 1;

var hackAlert1Sent = false;
var hackAlert2Sent = false;

function MessageContext(processor, msg, userContext, timeoutMs) {
    this.msg = msg;
    this.userContext = userContext;
    if ('undefined' == typeof msg.id) {
        msg.id = Number(id++).toString();
    }
    this.id = msg.id;
    if (!timeoutMs) {
        timeoutMs = C.DEFAULT_MESSAGE_TIMEOUT_MS;
    }
    var self = this;
    this.timeout = setTimeout(function () {
            delete self.timeout;
            console.warn("Timeout occurred for message", JSON.stringify(msg));
            processor.emit('error', new ApplicationError("Timed out : "+ JSON.stringify(msg)), self.userContext.cb);
        },
        timeoutMs
    );

}

function MessageProcessor() {
    ee.instantiateEmitter(this);
    var self = this;
    var pendingMessages = {};


    /**
     *     Registers a message with ID and callback into the message queue so that we can correspond it when we get the callback and and then invoke the callback
     * @param msg Message to send
     * @param userContext an arbitrary context that will be stored and returned when the response is received
     * @param timeoutMs Optional timeout for the message response to be received
     * @returns {*}
     */
    this.register = function (msg, userContext, timeoutMs) {
        if (Object.keys(pendingMessages).length > C.MAX_PENDING_MESSAGES) {
            throw new ApplicationError("Message queue is full", msg);
        }
        var entry = new MessageContext(self, msg, userContext, timeoutMs);
        pendingMessages[entry.id] = entry;
        return entry.msg;
    };

    this.hasMessage = function (msgId) {
        var entry = pendingMessages['' + msgId];
        return !!entry;
    };

    this.onMessageReceived = function (msg) {
        var entry;
        if (msg.params && msg.params.id) {
            console.warn("HACK ALERT: ID is in params!?!");
            msg.id = msg.params.id;
        }
        if (msg.id) {
            entry = pendingMessages['' + msg.id];
        }
        if (!entry) {
            if (!msg.id) {
                if (msg.result == C.kMessage) {
                    if (!hackAlert1Sent) {
                        hackAlert1Sent = true;
                        console.warn("HACK ALERT: Hacking the authenticate message");
                    }
                    msg.id = '1';
                    entry = pendingMessages['1'];
                } else {
                    self.emit('indication', msg);
                    return;
                }
            } else {
                if (msg.result == C.kScanForPeripherals && msg.params && msg.params.bb) {
                    if (!hackAlert2Sent) {
                        hackAlert2Sent = true;
                        console.warn("HACK ALERT: Scan response has an ID");
                    }
                    self.emit('indication', msg);
                    return;
                }
                self.emit('request', msg);
                return;
            }
        }
        if (entry.timeout) {
            clearTimeout(entry.timeout);
        }
        delete pendingMessages[msg.id];
        self.emit('response', msg, entry.userContext, entry.msg);
    };
    this.flushRequests = function (filter) {
        for (var i in pendingMessages) {
            if (pendingMessages.hasOwnProperty(i)) {
                var entry = pendingMessages[i];
                // if filter is not passed, or if filter invocation returns true
                if (!filter || filter(entry.userContext)) {
                    if (entry.timeout) {
                        clearTimeout(entry.timeout);
                    }
                    delete pendingMessages[i];
                }
            }
        }
    }
}

ee.makeEmitter(MessageProcessor);
module.exports.MessageProcessor = MessageProcessor;

},{"./../errors":12,"./constants":15,"./event-emitter":16}],21:[function(require,module,exports){
var C = require('./constants.js').C;
var ee = require('./event-emitter');
var helper = require('./message-helper');

function ServerMessageHandler(gattip, gateway) {
    ee.instantiateEmitter(this);
    var self = this;

    this.processMessage = function (message) {
        var obj;

        if ((typeof message === 'undefined') || (!message)) {
            console.warn("Got unknown message from client", mesg.data);
            return;
        }

        if (message.error) {
            console.warn('Error in the Request', mesg.error);
            return;
        }

        // MESSAGE IS VALID

        if (message.result && ( (message.result == C.kMessage) || (message.result == C.kAuthenticate) ) ){
            var authenticated = false;
            if (!message.error && typeof message.params == 'object' && message.params[C.kAuthenticate] === true) {
                authenticated = true;
            }
            self.emit('authenticated', authenticated);
            return;
        }

        if (message.method && message.method == C.kAuthenticate) {
            // this is so that clients can talk to us directly, bypassing the proxy. If someone has access to the port, they should authenticate?
            console.log("Client requested to authenticate with us. Allowing the client");
            var params = {};
            params[C.kAuthenticate] = true;
            var response = {};
            response.result = C.kAuthenticate;
            response.params = params;
            response[C.kIdField] = message[C.kIdField];
            response = JSON.stringify(response);
            self.send(response);
            return;
        }

        // TODO work out some more invalid message cases....

        var cookie = {original:message};
        var p = message.params;

        function getObject() {
            var objId = p[C.kObjectId];
            var retObj;
            if (typeof objId != 'string') {
                self.sendErrorResponse(cookie, 400, 'Object ID is required');
                throw new Error('Object ID is required');
            }

            retObj = gateway.getObject(objId);
            if (typeof retObj != 'object') {
                self.sendErrorResponse(cookie, 404, 'Object with ID ' +  objId + ' not found');
                throw new Error('Object with ID ' +  objId + ' not found');
            }
            return retObj;
        }
        function getObjects(type) {
            var peripheralUUID = p[C.kPeripheralUUID];
            var resultObj = {};

            resultObj.peripheral = gateway.getPeripheral(peripheralUUID);
            if (resultObj.peripheral && resultObj.peripheral.uuid) {
                if (type === 'p') {
                    return resultObj;
                }
                var serviceUUID = p[C.kServiceUUID];
                resultObj.service = resultObj.peripheral.findService(serviceUUID);
                if (resultObj.service && resultObj.service.uuid) {
                    if (type === 's') {
                        return resultObj;
                    }
                    var characteristicUUID = p[C.kCharacteristicUUID];
                    resultObj.characteristic = resultObj.service.findCharacteristic(characteristicUUID);
                    if (resultObj.characteristic && resultObj.characteristic.uuid) {
                        if (type === 'c') {
                            return resultObj;
                        }
                        var descriptorUUID = p[C.kDescriptorUUID];
                        resultObj.descriptor = resultObj.characteristic.findDescriptor(descriptorUUID);
                        if (resultObj.descriptor && resultObj.descriptor.uuid) {
                            return resultObj;
                        } else {
                            self.sendErrorResponse(cookie, 404, 'Descriptor not found in the service database');
                            throw new Error('Descriptor not found');
                        }
                    } else {
                        self.sendErrorResponse(cookie, 404, 'Characteristic not found in the service database');
                        throw new Error('Characteristic not found');
                    }
                } else {
                    self.sendErrorResponse(cookie, 404, 'Service not found in the service database');
                    throw new Error('Service not found');
                }
            } else {
                self.sendErrorResponse(cookie, 404, 'Peripheral not found in the service database');
                throw new Error('Peripheral not found');
            }
        }

        switch (message.method) {
            case C.kConfigure:
                self.emit('configure', cookie, p[C.kShowPowerAlert], p[C.kIdentifierKey]);
                break;
            case C.kScanForPeripherals:
                self.emit('scan', cookie, p[C.kScanOptionAllowDuplicatesKey], p[C.kServiceUUIDs]);
                break;
            case C.kStopScanning:
                self.emit('stopScan', cookie);
                break;
            case C.kCentralState:
                self.emit('getCentralState', cookie);
                break;
            case C.kConnect:
                try {
                    obj = getObjects('p');
                    self.emit('connect', cookie, obj.peripheral.uuid);
                } catch (ex) {
                    console.error(ex);
                }
                break;
            case C.kDisconnect:
                try {
                    obj = getObjects('p');
                    self.emit('disconnect', cookie, obj.peripheral.uuid);
                } catch (ex) {
                    console.error(ex);
                }
                break;
            case C.kGetCharacteristicValue:
                try {
                    obj = getObjects('c', cookie);
                    self.emit('readCharacteristic', cookie, obj.peripheral.uuid, obj.service.uuid, obj.characteristic.uuid);
                } catch (ex) {
                    console.error(ex);
                }
                break;
            case C.kWriteCharacteristicValue:
                try {
                    obj = getObjects('c', cookie);
                    self.emit('writeCharacteristic', cookie, obj.peripheral.uuid, obj.service.uuid, obj.characteristic.uuid, p[C.kValue]);
                } catch (ex) {
                    console.error(ex);
                }
                break;
            case C.kSetValueNotification:
                try {
                    obj = getObjects('c', cookie);
                    self.emit('enableNotifications', cookie, obj.peripheral.uuid, obj.service.uuid, obj.characteristic.uuid, p[C.kIsNotifying]);
                } catch (ex) {
                    console.error(ex);
                }
                break;
            case C.kGetDescriptorValue:
                try {
                    obj = getObjects('d', cookie);
                    self.emit('readDescriptor', cookie, obj.peripheral.uuid, obj.service.uuid, obj.characteristic.uuid, obj.descriptor.uuid);
                } catch (ex) {
                    console.error(ex);
                }
                break;
            case C.kWriteDescriptorValue:
                try {
                    obj = getObjects('d', cookie);
                    self.emit('writeDescriptor', cookie, obj.peripheral.uuid, obj.service.uuid, obj.characteristic.uuid, obj.descriptor.uuid, message.params[C.kValue]);
                } catch (ex) {
                    console.error(ex);
                }
                break;
            case C.kOpenStream:
                try {
                    self.emit('openStream', cookie, p[C.kObjectId], {speed:p[C.kSpeed], force:p[C.kForce]});
                } catch (ex) {
                    console.error(ex);
                }
                break;
            case C.kCloseStream:
                try {
                    obj = getObject();
                    self.emit('closeStream', cookie, obj);
                } catch (ex) {
                    console.error(ex);
                }
                break;
            case C.kWriteStreamData:
                try {
                    obj = getObject();
                    self.emit('writeStreamData', cookie, obj, p[C.kVal]);
                } catch (ex) {
                    console.error(ex);
                }
                break;

            default:
                console.log('invalid request: ' + message.method);
                self.sendErrorResponse(cookie, C.kInvalidRequest, 'Request not handled by server');
                return;
        }
    };

    self.sendErrorResponse = function (cookie, errorId, errMessage) {
        var mesg = {}, error = {};
        error[C.kCode] = errorId;
        error[C.kMessageField] = errMessage;
        mesg[C.kError] = error;
        if(cookie && cookie.original) {
            mesg.result = cookie.original.method
            mesg[C.kMessageId] = cookie.original.id;
            mesg[C.kSessionId] = cookie.original.session_id;
        }
        gattip.sendError(mesg);
    };

    self.configureResponse = function (cookie) {
        cookie.result = C.kConfigure;
        gattip.respond(cookie, {});
    };

    self.centralStateResponse = function (cookie, state) {
        var params = {};
        params[C.kState] = state;
        cookie.result = C.kCentralState;
        gattip.respond(cookie, params);
    };

    self.stopScanResponse = function (cookie) {
        cookie.result = C.kStopScanning;
        gattip.respond(cookie, {});
    };

    self.disconnectResponse = function (cookie, peripheral) {
        var params = {};
        params[C.kPeripheralUUID] = peripheral.uuid;
        params[C.kPeripheralName] = peripheral.name;

        cookie.result = C.kDisconnect;
        gattip.respond(cookie, params);
    };

    self.disconnectIndication = function (peripheral) {
        var params = {};
        params[C.kPeripheralUUID] = peripheral.uuid;
        params[C.kPeripheralName] = peripheral.name;

        gattip.sendIndications(C.kDisconnect, params);
    };

    self.scanResponse = function(cookie) {
        cookie.result = C.kScanForPeripherals;
        gattip.respond(cookie, {});
    };

    self.scanIndication = function(uuid, name, rssi, txPwr, serviceUUIDs, mfrData, svcData, isConnectable) {
        var params = {};
        var manufactData;
        var serviceData;

        if (!helper.isEmpty(mfrData)) {
            manufactData = {};
            for (var mk in mfrData) {
                if (mfrData.hasOwnProperty(mk)) {
                    var mkey = mk.toUpperCase();
                    var mData = mfrData[mk];
                    if ("string" === typeof mData) {
                        // this is a scan indication from proxy with existing peripheral
                        manufactData[mkey] = mData.toUpperCase();
                    } else {
                        // better be an array
                        manufactData[mkey] = helper.arrayAsHex(mData).toUpperCase();
                    }
                }
            }
        }
        if (!helper.isEmpty(svcData)) {
            serviceData = {};
            for (var sk in svcData) {
                if (svcData.hasOwnProperty(sk)) {
                    var skey = sk.toUpperCase();
                    var sData = svcData[sk];
                    if ("string" === typeof sData) {
                        serviceData[skey] = sData.toUpperCase();
                    } else {
                        // better be an array
                        serviceData[skey] = helper.arrayAsHex(sData).toUpperCase();
                    }
                }
            }
        }

        params[C.kPeripheralName] = name;
        params[C.kPeripheralUUID] = uuid;
        params[C.kRSSIkey] = rssi;
        params[C.kCBAdvertisementDataTxPowerLevel] = txPwr;
        params[C.kCBAdvertisementDataIsConnectable] = isConnectable;
        params[C.kCBAdvertisementDataServiceUUIDsKey] = ((serviceUUIDs && serviceUUIDs.length > 0) ? serviceUUIDs : undefined);
        params[C.kCBAdvertisementDataManufacturerDataKey] = manufactData;
        params[C.kCBAdvertisementDataServiceDataKey] = serviceData;

        gattip.sendIndications(C.kScanForPeripherals, params);
    };

    self.openStreamResponse = function (cookie, streamObjectId) {
        var params = {};
        params[C.kObjectId] = streamObjectId;
        cookie.result = C.kOpenStream;
        gattip.respond(cookie, params);
    };

    self.closeStreamResponse = function (cookie, streamObjectId) {
        var params = {};
        params[C.kObjectId] = streamObjectId;
        cookie.result = C.kCloseStream;
        gattip.respond(cookie, params);
    };

}

/* The following define the flags that are valid with the SecurityProperties */
this.GATM_SECURITY_PROPERTIES_NO_SECURITY = 0x00000000;
this.GATM_SECURITY_PROPERTIES_UNAUTHENTICATED_ENCRYPTION_WRITE = 0x00000001;
this.GATM_SECURITY_PROPERTIES_AUTHENTICATED_ENCRYPTION_WRITE = 0x00000002;
this.GATM_SECURITY_PROPERTIES_UNAUTHENTICATED_ENCRYPTION_READ = 0x00000004;
this.GATM_SECURITY_PROPERTIES_AUTHENTICATED_ENCRYPTION_READ = 0x00000008;
this.GATM_SECURITY_PROPERTIES_UNAUTHENTICATED_SIGNED_WRITES = 0x00000010;
this.GATM_SECURITY_PROPERTIES_AUTHENTICATED_SIGNED_WRITES = 0x00000020;

/* The following define the flags that are valid with the CharacteristicProperties */
this.GATM_CHARACTERISTIC_PROPERTIES_BROADCAST = 0x00000001;
this.GATM_CHARACTERISTIC_PROPERTIES_READ = 0x00000002;
this.GATM_CHARACTERISTIC_PROPERTIES_WRITE_WO_RESP = 0x00000004;
this.GATM_CHARACTERISTIC_PROPERTIES_WRITE = 0x00000008;
this.GATM_CHARACTERISTIC_PROPERTIES_NOTIFY = 0x00000010;
this.GATM_CHARACTERISTIC_PROPERTIES_INDICATE = 0x00000020;
this.GATM_CHARACTERISTIC_PROPERTIES_AUTHENTICATED_SIGNED_WRITES = 0x00000040;
this.GATM_CHARACTERISTIC_PROPERTIES_EXT_PROPERTIES = 0x00000080;

/* The following define the flags that are valid with the DescriptorProperties */
this.GATM_DESCRIPTOR_PROPERTIES_READ = 0x00000001;
this.GATM_DESCRIPTOR_PROPERTIES_WRITE = 0x00000002;

ee.makeEmitter(ServerMessageHandler);
module.exports.ServerMessageHandler = ServerMessageHandler;

},{"./constants.js":15,"./event-emitter":16,"./message-helper":19}],22:[function(require,module,exports){
var C = require('./constants').C;
var Service = require('./../service').Service;
var Characteristic = require('./../characteristic').Characteristic;
var Descriptor = require('./../descriptor').Descriptor;

function parseDescriptorFromScanResponse(characteristic, params) {
    var duuid = params[C.kDescriptorUUID];

    var descriptor = characteristic.findDescriptor(duuid);
    if (!descriptor) {
        descriptor = new Descriptor(characteristic, duuid);
        characteristic.addDescriptor(descriptor);
    }

    descriptor.value = params[C.kValue];
}
function parseCharacteristicFromScanResponse(service, params) {
    var cuuid = params[C.kCharacteristicUUID];

    var characteristic = service.findCharacteristic(cuuid);
    if (!characteristic) {
        characteristic = new Characteristic(service, cuuid);
        service.addCharacteristic(characteristic);
    }

    characteristic.value = params[C.kValue];

    var cprops = params[C.kProperties];

    if (typeof cprops === 'object') {
        for (var flag in cprops) {
            characteristic.setProperty(
                flag,
                {
                    enabled: cprops[flag].enabled,
                    name: cprops[flag].name
                }
            );
        }
    } else {
        for (var apindex in C.AllProperties) {
            characteristic.setProperty(
                [C.AllProperties[apindex]],
                {
                    enabled: (cprops >> apindex) & 1,
                    name: C.AllProperties[apindex]
                }
            );
        }
    }
    characteristic.isNotifying = false;

    var descriptors = params[C.kDescriptors];
    if (descriptors) {
        for (var didx in descriptors) {
            var dparams = descriptors[didx];
            parseDescriptorFromScanResponse(characteristic, dparams);
        }
    }


}
function parseServiceFromScanResponse(peripheral, params) {
    var suuid = params[C.kServiceUUID];
    var service = peripheral.findService(suuid);
    if (!service) {
        service = new Service(peripheral, suuid);
        peripheral.addService(service);
    }

    var characteristics = params[C.kCharacteristics];
    if (characteristics) {
        for (var cidx in characteristics) {
            var cparams = characteristics[cidx];
            parseCharacteristicFromScanResponse(service, cparams);
        }
    }
}

module.exports.parseServiceRecord = function(peripheral, params) {
    var services = params[C.kServices];
    if (services) {
        for (var sidx in services) {
            var sparams = services[sidx];
            parseServiceFromScanResponse(peripheral, sparams)
        }
    }
};

//Parse the peripheral object & get the service DB.
function getDescriptorJsonFromCharacteristicObject(myCharacteristic) {
    var descriptor_db = {};

    if (myCharacteristic && myCharacteristic.getAllDescriptors()) {
        for (var uuid in myCharacteristic.getAllDescriptors()) {
            var temp_descriptor = {};
            temp_descriptor[C.kDescriptorUUID] = uuid;
            temp_descriptor[C.kValue] = myCharacteristic.findDescriptor(uuid).value;
            temp_descriptor[C.kProperties] = myCharacteristic.findDescriptor(uuid).properties;
            temp_descriptor[C.kIsNotifying] = myCharacteristic.findDescriptor(uuid).isNotifying;

            descriptor_db[uuid] = temp_descriptor;
        }
    }

    return descriptor_db;
}
function getCharacteristicJsonFromServiceObject(myService) {
    var characteristic_db = {};

    if (myService && myService.getAllCharacteristics()) {
        for (var uuid in myService.getAllCharacteristics()) {
            var temp_characteristic = {};
            temp_characteristic[C.kCharacteristicUUID] = uuid;
            temp_characteristic[C.kValue] = myService.findCharacteristic(uuid).value;
            temp_characteristic[C.kProperties] = myService.findCharacteristic(uuid).allProperties();
            temp_characteristic[C.kIsNotifying] = myService.findCharacteristic(uuid).isNotifying;
            temp_characteristic[C.kDescriptors] = getDescriptorJsonFromCharacteristicObject(myService.findCharacteristic(uuid));

            characteristic_db[uuid] = temp_characteristic;
        }
    }

    return characteristic_db;
}

module.exports.getServiceJsonFromPeripheralObject = function(myPeripheral) {
    var service_db = {};

    if (myPeripheral && myPeripheral.getAllServices()) {
        for (var uuid in myPeripheral.getAllServices()) {
            var temp_service = {};
            temp_service[C.kServiceUUID] = uuid;
            temp_service[C.kIsPrimaryKey] = myPeripheral.findService(uuid).isPrimary;
            temp_service[C.kCharacteristics] = getCharacteristicJsonFromServiceObject(myPeripheral.findService(uuid));

            service_db[uuid] = temp_service;
        }
    }

    return service_db;
};


},{"./../characteristic":10,"./../descriptor":11,"./../service":24,"./constants":15}],23:[function(require,module,exports){
var C = require('./lib/constants.js').C;
var helper = require('./lib/message-helper');
var advDataParser = require('./lib/message-advdata-parser');
var ee = require("./lib/event-emitter");
var serviceTable = require("./lib/service-table");
var Service = require("./service").Service;

function pushUnique(array, item) {
    if (array.indexOf(item) == -1) {
        array.push(item);
        return true;
    }
    return false;
}


// TODO: Errors if not connected
function Peripheral(gattip, uuid, name, rssi, txPwr, connectable, serviceUuids, mfrData, svcData) {
    ee.instantiateEmitter(this);
    var self = this;
    this.type = 'p';
    this.uuid = uuid;
    this.isConnected = false;
    var services = {};
    var manufacturerData = {};
    var serviceData = {};
    var serviceUUIDs = [];
    // constructor continues below
    this._updateFromScanData = function (name, rssi, txPwr, connectable, serviceUuids, mfrData, svcData, addata, scanData) {
        this.name = name;
        this.rssi = rssi;
        this.txPowerLevel = txPwr;
        this.connectable = connectable;
        var advertisementData = addata;
        var scanData = scanData;

        if (mfrData) {
            for (var mfrId in mfrData) {
                //TODO: Once we have 2.0, then we can remove toUpperCase()
                //noinspection JSUnfilteredForInLoop
                var id = mfrId.toUpperCase();
                //noinspection JSUnfilteredForInLoop
                manufacturerData[id] = mfrData[mfrId].toUpperCase();
            }
        }
        if (svcData) {
            for (var serUUID in svcData) {
                //noinspection JSUnfilteredForInLoop
                serviceData[serUUID] = svcData[serUUID];
            }
        }
        if (serviceUuids) {
            for (var sidx = 0; sidx < serviceUuids.length; sidx++) {
                pushUnique(serviceUUIDs, serviceUuids[sidx]);
            }
        }
        if (addata) {
            advDataParser.parseAdvArray(self, addata.c2);
            if(self.advdata.connectable){
                self.connectable = self.advdata.connectable === 'true';
            }
            if(self.advdata.txPowerLevel){
                this.txPowerLevel = self.advdata.txPowerLevel;
            }
            if(self.advdata.manufacturerData && !helper.isEmpty(self.advdata.manufacturerData)){
                for(var mfrKey in self.advdata.manufacturerData){
                    //noinspection JSUnfilteredForInLoop
                    var mKey = mfrKey.toUpperCase();
                    //noinspection JSUnfilteredForInLoop
                    manufacturerData[mKey] = self.advdata.manufacturerData[mfrKey].toUpperCase();
                }
            }
            // Thinking that always will get only one service UUID from the adv data.
            if(self.advdata.serviceUUIDs && self.advdata.serviceUUIDs.length > 0){
                pushUnique(serviceUUIDs, self.advdata.serviceUUIDs);
            }
        }

    };
    this.findService = function (uuid) {
        return services[uuid];
    };
    this.getMfrData = function (mfrId) {
        // id as hex string
        return manufacturerData[mfrId];
    };
    this.getSvcData = function (svcId) {
        // id as hex string
        return serviceData[svcId];
    };
    this.hasAdvertisedServiceUUID = function (serviceUUID) {
        return (serviceUUIDs.indexOf(serviceUUID) >= 0);
    };
    this.getAllServices = function () {
        return services;
    };
    this.getAllMfrData = function () {
        return manufacturerData;
    };
    this.getAllSvcData = function () {
        return serviceData;
    };
    this.getAllAdvertisedServiceUUIDs = function () {
        return serviceUUIDs;
    };
    this.addServiceWithUUID = function (serviceUUID) {
        var service = new Service(self, serviceUUID);
        return services[serviceUUID] = service;
    };
    this.addService = function (service) {
        return services[service.uuid] = service;
    };
    this.gattip = function () {
        return gattip;
    };


    // SERVER RESPONSES/INDICATIONS  ============================

    this.connectOnce = function (callback) {
        // TODO: Error if already connected
        var params = helper.populateParams(self);
        gattip.request(C.kConnect, params, callback, function (params) {
            serviceTable.parseServiceRecord(self, params);
            self.isConnected = true;
            gattip.fulfill(callback, self);
        });
    };


    /**
     * Attempts to connect to the peripheral
     * @param callback
     * @param config Optional object with numConnectAttempts. This value defaults to 3,
     * but may change to 1 in the future
     */
    this.connect = function (callback, config) {
        // TODO: Error if already connected

        var fullfillCb = (typeof callback == 'object' ? callback.fulfill : callback);

        var tries = C.NUM_CONNECT_ATTEMPTS;

        if (config && typeof config.numConnectAttempts == 'number') {
            tries = config.numConnectAttempts;
        }
        function tryConnect(error) {
            if (error) {
                console.log("Failed to connect. Error was", error, "Attempting", tries, "more times");
            }
            tries--;
            if (tries >= 0) {
                self.connectOnce({fulfill: fullfillCb, reject: tryConnect});
            } else {
                gattip.reject(callback, error)
            }
        }

        tryConnect();
    };

    this.disconnect = function (callback) {
        // TODO: Error if not connected
        var params = helper.populateParams(self);
        gattip.request(C.kDisconnect, params, callback, function (params) {
            self.isConnected = false;
            self.removeAllChildListenersAndFlush();
            gattip.fulfill(callback, self);
        });
    };

    this.respondToConnectRequest = function (cookie) {
        var peripheral_db = {};
        peripheral_db[C.kPeripheralUUID] = this.uuid;
        peripheral_db[C.kPeripheralName] = this.name;

        var service_db;
        service_db = serviceTable.getServiceJsonFromPeripheralObject(this);
        peripheral_db[C.kServices] = service_db;

        cookie.result = C.kConnect;
        gattip.respond(cookie, peripheral_db);
    };

    this.handleDisconnectIndication = function () {
        self.isConnected = false;
        self.emit('disconnected', self);
        self.removeAllChildListenersAndFlush();
    };

    this.removeAllChildListenersAndFlush = function () {
        gattip.flushRequests(function (context) {
            if (uuid && context && context.originalMessage && context.originalMessage.params) {
                return context.originalMessage.params[C.kPeripheralUUID] === uuid;
            } else {
                return false;
            }
        });
        for (var sid in services) {
            if (services.hasOwnProperty(sid)) {
                var s = services[sid];
                var characteristics = s.getAllCharacteristics();
                for (var cid in characteristics) {
                    if (characteristics.hasOwnProperty(cid)) {
                        var c = characteristics[cid];
                        c.removeAllListeners();
                    }
                }
            }
        }
        services = {};
    };

    this._updateFromScanData(name, rssi, txPwr, connectable, serviceUuids, mfrData, svcData);
}

ee.makeEmitter(Peripheral);

module.exports.Peripheral = Peripheral;

},{"./lib/constants.js":15,"./lib/event-emitter":16,"./lib/message-advdata-parser":17,"./lib/message-helper":19,"./lib/service-table":22,"./service":24}],24:[function(require,module,exports){
var helper = require('./lib/message-helper');
var Characteristic = require('./characteristic').Characteristic;

function Service(peripheral, uuid) {
    var self = this;
    var gattip = peripheral.gattip();
    var characteristics = {};

    helper.requireUUID('Service', 'uuid', uuid);
    this.uuid = uuid;
    this.type = 's';

    this.isPrimary = true; //TODO: read from remote
    // TODO: this.includedServices = {};

    this.peripheral = function () {
        return peripheral;
    };
    this.gattip = function () {
        return gattip;
    };
    this.getAllCharacteristics = function () {
        return characteristics;
    };
    this.findCharacteristic = function (uuid) {
        return characteristics[uuid];
    };
    this.addCharacteristicWithUUID = function (characteristicUUID, properties) {
        var characteristic = new Characteristic(self, characteristicUUID, properties);
        return characteristics[characteristicUUID] = characteristic;
    };

    this.addCharacteristic = function (characteristic) {
        characteristics[characteristic.uuid] = characteristic;
    };
}

exports.Service = Service;


},{"./characteristic":10,"./lib/message-helper":19}],25:[function(require,module,exports){
var C = require('./lib/constants.js').C;
var helper = require('./lib/message-helper');
var advDataParser = require('./lib/message-advdata-parser');
var ee = require("./lib/event-emitter");
var serviceTable = require("./lib/service-table");
var Service = require("./service").Service;


function Stream(gattip, objectId) {
    ee.instantiateEmitter(this);
    var self = this;

    this._objectId = objectId;

    this.getObjectId = function () {
        return self._objectId;
    };


    // REQUESTS =================================================

    this.writeData = function (callback, data) {
        helper.requireHexValue('writeData', 'data', data);
        var params = {};
        params[C.kObjectId] = self._objectId;
        params[C.kVal] = data;
        gattip.request(C.kWriteStreamData, params, callback, function (params) {
            gattip.fulfill(callback, self);
        });
    };

    this.closeStream = function (callback) {
        var params = {};
        params[C.kObjectId] = self._objectId;
        gattip.request(C.kCloseStream, params, callback, function (params) {
            gattip.fulfill(callback, self);
        });
    };
    // INDICATIONS ==============================================

    this.handleDataIndication = function (params) {
        self.emit('streamData', self, params[C.kValue]);
    };

    this.handleClosedIndication = function (params) {
        self.emit('streamClosed', self);
    };

    // SERVER RESPONSES/INDICATIONS  ============================

    this.indicateStreamData = function (data) {
        helper.requireHexValue('indicateStreamData', 'data', data);
        var params = {};
        params[C.kObjectId] = self._objectId;
        params[C.kVal] = data;
        gattip.sendIndications(C.kStreamDataIndication, params);
    };

    this.writeDataResponse = function (cookie) {
        var params = {};
        params[C.kObjectId] = self._objectId;
        cookie.result = C.kWriteStreamData;
        gattip.respond(cookie, params);
    };

    this.closeStreamResponse = function(cookie){
        var params = {};
        params[C.kObjectId] = self._objectId;
        cookie.result = C.kCloseStream;
        gattip.respond(cookie, params);
    };
}

ee.makeEmitter(Stream);

module.exports.Stream = Stream;




},{"./lib/constants.js":15,"./lib/event-emitter":16,"./lib/message-advdata-parser":17,"./lib/message-helper":19,"./lib/service-table":22,"./service":24}],26:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],27:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],28:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],"events":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],"gatt-ip-js":[function(require,module,exports){
module.exports.GATTIP = require('./gattip').GATTIP;
module.exports.C = require('./lib/constants').C;

},{"./gattip":14,"./lib/constants":15}],"path":[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":26}],"util":[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":28,"_process":26,"inherits":27}]},{},[3]);

/**
 * @category  html5 widgets
 * @package   Kelly
 * @author    Rubchuk Vladimir <torrenttvi@gmail.com>
 * @copyright 2015-2017 Rubchuk Vladimir
 * @license   GPLv3
 * @version   1.16
 *
 * Usage example :
 *
 *   new KellyColorPicker({place : 'color-picker'});
 *
 * ToDo :
 * 
 * Add switch color in colorsavers button (analog of X button in Photoshop)
 *
 **/

/**
 * Create color picker
 * @param {Array} cfg
 * @returns {KellyColorPicker}
 */

function KellyColorPicker(cfg) {
    var PI = Math.PI;

    var svFig; // current method SV figure object

    var changeCursor = true;

    var svCursor = new Object;
    svCursor.radius = 4;

    var canvas = false;
    var ctx = false;

    var method = 'quad';
    var alpha = false;          // is alpha slider enabled
    var drag = false;
    var cursorAnimReady = true; // sets by requestAnimationFrame to limit FPS on events like mousemove etc. when draging 

    var events = new Array();
    var userEvents = new Array();

    var canvasHelper = document.createElement("canvas");
    var canvasHelperCtx = false; // used if needed to copy image data throw ctx.drawImage for save alpha channel
    var rendered = false;        // is colorpicker rendered (without side alpha bar and cursors, rendered image stores in canvasHelperData
    var canvasHelperData = null; // rendered interface without cursors and without alpha slider [wheelBlockSize x wheelBlockSize]

    var input = false;

    // used by updateInput() function if not overloaded by user event
    var inputColor = true;     // update input color according to picker
    var inputFormat = 'mixed'; // text format of colorpicker color displayed in input element | values : mixed | hex | rgba

    var popup = new Object;    // popup block for input
    popup.tag = false;         // Dom element if popup is enabled
    popup.margin = 6;          // margin from input in pixels

    // container, or canvas element
    var place = false;
    var handler = this;

    var basePadding = 2;

    var padding;
    var wheelBlockSize = 200;
    var center;

    // current color
    var hsv;
    var rgb;
    var hex = '#000000';
    var a = 1;

    var resizeWith = false;

    var colorSavers = new Array();

    var styleSwitch = false; // change method from square to triangle
    var svFigsPool = new Array(); // if we have button for switch method, better store already created figure object to buffer

    // style switch from triange to quad and backwards
    function initStyleSwitch() {

        styleSwitch = new Object;
        styleSwitch.size;
        styleSwitch.sizePercentage = 10;
        styleSwitch.position;
        styleSwitch.paddingY = 4;
        styleSwitch.paddingX = 4;
        styleSwitch.imageData = new Array();
        styleSwitch.lineWidth = 2;
        styleSwitch.color = '#c1ebf5';

        styleSwitch.updateSize = function () {
            this.size = parseInt(wheelBlockSize - (wheelBlockSize / 100) * (100 - this.sizePercentage));

            if (this.size < 16)
                this.size = 16;

            this.position = {x: this.paddingX, y: this.paddingY};
        }

        styleSwitch.draw = function () {

            if (this.imageData[method]) {
                ctx.putImageData(this.imageData[method], this.position.x, this.position.y);
                return;
            }

            var rgb = hexToRgb(this.color);

            canvasHelper.width = this.size;
            canvasHelper.height = this.size;

            canvasHelperCtx.clearRect(0, 0, this.size, this.size);
            canvasHelperCtx.beginPath();

            var switchFig = 'triangle';
            if (method == 'triangle')
                switchFig = 'quad';

            canvasHelperCtx.beginPath();

            if (this.size < 35) {
                var circleRadiusMain = canvasHelper.width / 2;
                var circleRadius = circleRadiusMain;
            } else {

                var circleRadiusMain = (canvasHelper.width / 2) - this.lineWidth;

                canvasHelperCtx.arc(this.size / 2, this.size / 2, circleRadiusMain, 0, PI * 2);
                canvasHelperCtx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
                canvasHelperCtx.lineWidth = this.lineWidth;
                canvasHelperCtx.stroke();

                var circleRadius = circleRadiusMain - 6;
                canvasHelperCtx.closePath();
                canvasHelperCtx.beginPath();
                canvasHelperCtx.arc(this.size / 2, this.size / 2, circleRadius, 0, PI * 2);
                canvasHelperCtx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
                canvasHelperCtx.lineWidth = this.lineWidth;
                canvasHelperCtx.stroke();
                canvasHelperCtx.closePath();
            }

            canvasHelperCtx.beginPath();
            var svmSize;

            if (switchFig == 'quad') {
                var workDiametr = (circleRadius * 2) - 4; // may be some paddings here
                svmSize = Math.floor(workDiametr / Math.sqrt(2));
                var padding = (this.size - svmSize) / 2;
                var svmPos = {x: padding + svmSize, y: padding + svmSize / 2}; // start middle point
                svmPos.y = svmPos.y - (svmSize / 2);
                canvasHelperCtx.moveTo(svmPos.x, svmPos.y); // right top
                canvasHelperCtx.lineTo(svmPos.x - svmSize, svmPos.y);  // left tp
                canvasHelperCtx.lineTo(svmPos.x - svmSize, svmPos.y + svmSize); // left bottom
                canvasHelperCtx.lineTo(svmPos.x, svmPos.y + svmSize); // right bottom

            } else {
                svmSize = Math.floor((2 * circleRadius - 4) * Math.sin(toRadians(60))); // side size
                var svmPos = {x: circleRadius * 2 + (circleRadiusMain - circleRadius), y: this.size / 2}; // start middle point
                var h = ((Math.sqrt(3) / 2) * svmSize);
                canvasHelperCtx.moveTo(svmPos.x, svmPos.y);
                canvasHelperCtx.lineTo(svmPos.x - h, svmPos.y - (svmSize / 2)); // top 
                canvasHelperCtx.lineTo(svmPos.x - h, svmPos.y + (svmSize / 2)); // bottom
                canvasHelperCtx.lineTo(svmPos.x, svmPos.y);
            }

            canvasHelperCtx.lineTo(svmPos.x, svmPos.y);


            canvasHelperCtx.fillStyle = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 1)';
            canvasHelperCtx.fill();
            canvasHelperCtx.lineWidth = this.lineWidth;
            canvasHelperCtx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
            canvasHelperCtx.stroke();
            canvasHelperCtx.closePath();


            this.imageData[method] = canvasHelperCtx.getImageData(0, 0, canvasHelper.width, canvasHelper.width);
            ctx.drawImage(canvasHelper, this.position.x, this.position.y);

        }

        styleSwitch.isDotIn = function (dot) {
            if (
                    dot.x >= this.position.x && dot.x <= this.position.x + this.size &&
                    dot.y >= this.position.y && dot.y <= this.position.y + this.size
                    ) {
                return true;
            }

            //if (Math.pow(this.position.x - dot.x, 2) + Math.pow(this.position.y - dot.y, 2) < Math.pow(this.outerRadius, 2)) {
            //	return true;
            //}			

            return false;
        }
    }

    // triangle colorsavers for left and right side
    function initColorSaver(align, selected, color) {

        if (!selected)
            selected = false;
        else
            selected = true;

        var colorSaver = new Object;
        colorSaver.width; // size of side of triangle
        colorSaver.widthPercentage = 22;

        colorSaver.imageData = null; // last rendered colorsaver image
        colorSaver.align = align;
        colorSaver.selected = selected; // current color
        colorSaver.color = '#ffffff'; // hex color
        colorSaver.position; // top point of triangle
        colorSaver.paddingY = -4;
        colorSaver.paddingX = 4;
        colorSaver.lineWidth = 1;
        colorSaver.selectSize = 4;

        if (align == 'right') {
            colorSaver.paddingX = colorSaver.paddingX * -1;
        }

        if (colorSaver.selected) {
            colorSaver.color = hex;
        }

        if (color) {
            colorSaver.color = color;
        }

        colorSaver.updateSize = function () {
            this.width = parseInt(wheelBlockSize - (wheelBlockSize / 100) * (100 - this.widthPercentage));

            // start render point in global canvas coords
            if (this.align == 'left') {
                this.position = {x: 0, y: wheelBlockSize - this.width};
            } else if (this.align == 'right') {
                this.position = {x: wheelBlockSize - this.width, y: wheelBlockSize - this.width};
            }
        }

        // calc triangle area (same method as for triangle sv figure)
        colorSaver.calcS = function (p) {
            return Math.abs((p[1].x - p[0].x) * (p[2].y - p[0].y) - (p[2].x - p[0].x) * (p[1].y - p[0].y)) / 2;
        }

        colorSaver.isDotIn = function (dot) {

            var path = new Array();

            if (this.align == 'left') {
                path[0] = {x: this.position.x, y: this.position.y}; // top 
                path[1] = {x: this.position.x, y: this.position.y + this.width}; // bottom left
                path[2] = {x: this.position.x + this.width, y: this.position.y + this.width}; // bottom right
            } else {
                path[0] = {x: this.position.x + this.width, y: this.position.y}; // top 
                path[1] = {x: path[0].x, y: path[0].y + this.width}; // bottom right
                path[2] = {x: path[0].x - this.width, y: this.position.y + this.width}; // bottom left				
            }

            for (var i = 0; i <= path.length - 1; ++i)
            {
                path[i].x += this.paddingX;
                path[i].y += this.paddingY;
            }

            var selfS = this.calcS(path);

            var t = [
                {x: path[0].x, y: path[0].y},
                {x: path[1].x, y: path[1].y},
                {x: dot.x, y: dot.y}
            ];

            var s = this.calcS(t);
            t[1] = {x: path[2].x, y: path[2].y};
            s += this.calcS(t);
            t[0] = {x: path[1].x, y: path[1].y};
            s += this.calcS(t);

            if (Math.ceil(s) == Math.ceil(selfS))
                return true;
            else
                return false;
        }

        colorSaver.draw = function () {

            canvasHelper.width = this.width;
            canvasHelper.height = this.width;

            canvasHelperCtx.clearRect(0, 0, this.width, this.width);
            canvasHelperCtx.beginPath();

            if (this.align == 'left') {
                canvasHelperCtx.moveTo(this.lineWidth / 2, this.width - this.lineWidth);
                canvasHelperCtx.lineTo(this.width, this.width - this.lineWidth);
                canvasHelperCtx.lineTo(this.lineWidth, this.lineWidth);
                canvasHelperCtx.lineTo(this.lineWidth, this.width - this.lineWidth);
            }

            if (this.align == 'right') {
                canvasHelperCtx.moveTo(this.lineWidth / 2, this.width - this.lineWidth);
                canvasHelperCtx.lineTo(this.width - this.lineWidth, this.width - this.lineWidth);
                canvasHelperCtx.lineTo(this.width - this.lineWidth, this.lineWidth);
                canvasHelperCtx.lineTo(this.lineWidth, this.width - this.lineWidth);
            }

            if (this.selected) {

                // start draw addition inner figure

                canvasHelperCtx.fillStyle = 'rgba(255,255,255, 1)';
                canvasHelperCtx.fill();

                canvasHelperCtx.strokeStyle = 'rgba(0, 0, 0, 1)';
                canvasHelperCtx.stroke();
                canvasHelperCtx.closePath();
                canvasHelperCtx.beginPath();

                canvasHelperCtx.lineWidth = this.lineWidth;

                if (this.align == 'left') {
                    canvasHelperCtx.moveTo(this.selectSize, this.width - this.selectSize);
                    canvasHelperCtx.lineTo(this.width - this.selectSize * 2, this.width - this.selectSize);
                    canvasHelperCtx.lineTo(this.selectSize, this.selectSize * 2);
                    canvasHelperCtx.lineTo(this.selectSize, this.width - this.selectSize);
                }

                if (this.align == 'right') {

                    canvasHelperCtx.moveTo(this.selectSize * 2, this.width - this.selectSize);
                    canvasHelperCtx.lineTo(this.width - this.selectSize, this.width - this.selectSize);
                    canvasHelperCtx.lineTo(this.width - this.selectSize, this.selectSize * 2);
                    canvasHelperCtx.lineTo(this.selectSize * 2, this.width - this.selectSize);
                }
            }

            var rgb = hexToRgb(this.color);
            canvasHelperCtx.fillStyle = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 1)';
            canvasHelperCtx.fill();
            canvasHelperCtx.strokeStyle = 'rgba(0, 0, 0, 1)';
            canvasHelperCtx.stroke();

            this.imageData = canvasHelperCtx.getImageData(0, 0, this.width, this.width);
            ctx.drawImage(canvasHelper, this.position.x + this.paddingX, this.position.y + this.paddingY);

        }

        var colorSaverKey = colorSavers.length;
        colorSavers[colorSaverKey] = colorSaver;
    }

    var wheel = new Object;
    wheel.width = 18;
    wheel.imageData = null; // rendered wheel image data
    wheel.innerRadius;
    wheel.startAngle = 0; // 150
    wheel.outerRadius;
    wheel.outerStrokeStyle = 'rgba(0,0,0,0.2)';
    wheel.innerStrokeStyle = 'rgba(0,0,0,0.2)';
    wheel.pos; // updates in updateSize() | center point; wheel cursor \ hsv quad \ hsv triangle positioned relative that point
    wheel.draw = function () {

        // put rendered data

        if (this.imageData) {
            ctx.putImageData(this.imageData, 0, 0);
        } else {
            var hAngle = this.startAngle;
            for (var angle = 0; angle <= 360; angle++) {

                var startAngle = toRadians(angle - 2);
                var endAngle = toRadians(angle);

                ctx.beginPath();
                ctx.moveTo(center, center);
                ctx.arc(center, center, this.outerRadius, startAngle, endAngle, false);
                ctx.closePath();

                var targetRgb = hsvToRgb(hAngle / 360, 1, 1);
                ctx.fillStyle = 'rgb(' + targetRgb.r + ', ' + targetRgb.g + ', ' + targetRgb.b + ')';
                //ctx.fillStyle = 'hsl('+hAngle+', 100%, 50%)';
                ctx.fill();

                hAngle++;
                if (hAngle >= 360)
                    hAngle = 0;
            }

            ctx.globalCompositeOperation = "destination-out"; // cut out color wheel inside by circle next
            ctx.beginPath();
            ctx.arc(center, center, this.innerRadius, 0, PI * 2);

            ctx.fill();

            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = this.innerStrokeStyle; // 'rgba(0,0,0,0.2)';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();

            // wheel border
            ctx.beginPath();
            ctx.arc(center, center, this.outerRadius, 0, PI * 2);
            ctx.strokeStyle = this.outerStrokeStyle;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();

            this.imageData = ctx.getImageData(0, 0, wheelBlockSize, wheelBlockSize);
        }

    };

    wheel.isDotIn = function (dot) {
        // is dot in circle
        if (Math.pow(this.pos.x - dot.x, 2) + Math.pow(this.pos.y - dot.y, 2) < Math.pow(this.outerRadius, 2)) {
            if (Math.pow(this.pos.x - dot.x, 2) + Math.pow(this.pos.y - dot.y, 2) > Math.pow(this.innerRadius, 2)) {
                return true;
            }
        }
        return false;
    };

    var wheelCursor = new Object;
    wheelCursor.lineWeight = 2;
    wheelCursor.height = 4;
    wheelCursor.paddingX = 2; // padding from sides of wheel
    wheelCursor.path; // rotatePath2 --- поворот по старой функции, в фигуре не приплюсован центр

    var alphaSlider = new Object;
    alphaSlider.width = 18;
    alphaSlider.padding = 4;
    alphaSlider.outerStrokeStyle = 'rgba(0,0,0,0.2)';
    alphaSlider.innerStrokeStyle = 'rgba(0,0,0,0.2)';
    alphaSlider.height;
    alphaSlider.pos; // left top corner position
    alphaSlider.updateSize = function () {
        this.pos = {x: wheelBlockSize + alphaSlider.padding, y: alphaSlider.padding};
        this.height = wheelBlockSize - alphaSlider.padding * 2;
    };

    alphaSlider.draw = function () {
        var alphaGrd = ctx.createLinearGradient(0, 0, 0, this.height);
        alphaGrd.addColorStop(0, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',1)');
        alphaGrd.addColorStop(1, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0)');

        ctx.beginPath();
        ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.fillStyle = alphaGrd;
        ctx.fill();

        ctx.strokeStyle = 'rgba(0,0,0, 0.2)';
        ctx.lineWidth = 2;

        ctx.stroke();
        ctx.closePath();
    };

    alphaSlider.dotToAlpha = function (dot) {
        return 1 - Math.abs(this.pos.y - dot.y) / this.height;
    };

    alphaSlider.alphaToDot = function (alpha) {
        return {
            x: 0,
            y: this.height - (this.height * alpha)
        };
    };

    alphaSlider.limitDotPosition = function (dot) {
        var y = dot.y;

        if (y < this.pos.y) {
            y = this.pos.y;
        }

        if (y > this.pos.y + this.height) {
            y = this.pos.y + this.height;
        }

        return {x: this.pos.x, y: y};
    };

    alphaSlider.isDotIn = function (dot) {
        if (dot.x < this.pos.x ||
                dot.x > this.pos.x + alphaSlider.width ||
                dot.y < this.pos.y ||
                dot.y > this.pos.y + this.height) {
            return false;
        }
        return true;
    };

    // svCursorMouse - для устройств с мышкой, генератор указателя в зависимости от активной области
    // todo on very very small sv when set by hex, cursor may be go out of bonds
    var svCursorMouse = new Object;

    svCursorMouse.svCursorData = null;
    svCursorMouse.stCursor = null; // cursor before replace
    svCursorMouse.curType = 0; // if > 0 cursor switched by KellyColorPicker to custom
    svCursorMouse.size = 16;

    svCursorMouse.initSvCursor = function () {
        if (!canvas)
            return false;
        var el = document.body;

        this.curType = 1;

        if (!this.stCursor)
            this.stCursor = el.style.cursor;
        if (!this.stCursor)
            this.stCursor = 'auto';

        if (this.svCursorData) {
            el.style.cursor = this.svCursorData;
            return true;
        }

        if (!canvasHelper)
            return false;

        // create canvas on 2 pixels bigger for Opera that cut image 
        var canvasSize = this.size + 2;

        canvasHelper.width = canvasSize;
        canvasHelper.height = canvasSize;

        canvasHelperCtx.clearRect(0, 0, this.size, this.size);
        canvasHelperCtx.strokeStyle = 'rgba(255, 255, 255, 1)';

        canvasHelperCtx.beginPath();
        canvasHelperCtx.lineWidth = 2;
        canvasHelperCtx.arc(canvasSize / 2, canvasSize / 2, this.size / 2, 0, PI * 2);

        canvasHelperCtx.stroke();
        canvasHelperCtx.closePath();

        var offset = canvasSize; //if (input.value.indexOf(curImageData) !== -1)
        var curImageData = canvasHelper.toDataURL();

        this.svCursorData = 'url(' + curImageData + ') ' + offset / 2 + ' ' + offset / 2 + ', auto';

        if (!this.svCursorData)
            return false;

        el.style.cursor = this.svCursorData;
        if (el.style.cursor.indexOf(curImageData) === -1) { // for autist IE (Edge also), that not support data-uri for cursor -_-
            this.svCursorData = 'crosshair';
            el.style.cursor = 'crosshair';
        }
        return true;
    };

    svCursorMouse.initStandartCursor = function () {
        if (!this.stCursor)
            return;
        svCursorMouse.curType = 0;
        document.body.style.cursor = this.stCursor;
    };

    svCursorMouse.updateCursor = function (newDot) {
        if (!changeCursor)
            return;

        if (KellyColorPicker.cursorLock)
            return;

        if (svFig.isDotIn(newDot)) {
            svCursorMouse.initSvCursor();
        } else {
            svCursorMouse.initStandartCursor();
        }
    };

    // updateinput

    function constructor(cfg) {
        var criticalError = '', placeName = '';

        // save non-camelased old style options compatibility

        if (cfg.alpha_slider !== undefined) {
            cfg.alphaSlider = cfg.alpha_slider;
        }

        if (cfg.input_color !== undefined) {
            cfg.inputColor = cfg.input_color;
        }

        if (cfg.input_format !== undefined) {
            cfg.inputFormat = cfg.input_format;
        }

        // config apply

        if (cfg.input && typeof cfg.input !== 'object') {
            cfg.input = document.getElementById(cfg.input);
            input = cfg.input;
            // if (!cfg.input) log += '| "input" (' + inputName + ') not not found';
        } else if (typeof cfg.input === 'object') {
            input = cfg.input;
        }

        if (cfg.changeCursor !== undefined) {
            changeCursor = cfg.changeCursor;
        }

        if (cfg.alpha !== undefined) {
            a = cfg.alpha;
        }

        if (cfg.alphaSlider !== undefined) {
            alpha = cfg.alphaSlider;
        }

        if (cfg.inputColor !== undefined) {
            inputColor = cfg.inputColor;
        }

        if (cfg.inputFormat !== undefined) {
            inputFormat = cfg.inputFormat;
        }

        if (cfg.userEvents)
            userEvents = cfg.userEvents;

        if (cfg.place && typeof cfg.place !== 'object') {
            placeName = cfg.place;
            cfg.place = document.getElementById(cfg.place);
        }

        if (cfg.resizeWith) {

            if (typeof cfg.resizeWith !== 'object')
                cfg.resizeWith = document.getElementById(cfg.resizeWith);

            resizeWith = cfg.resizeWith;

            if (resizeWith) {
                var newSize = getSizeByElement(resizeWith);
                if (newSize)
                    cfg.size = getSizeByElement(resizeWith);

                addEventListner(window, "resize", function (e) {
                    return handler.syncSize(e);
                }, 'canvas_');
            }
        }

        if (cfg.place) {
            place = cfg.place;
        } else if (input) {

            popup.tag = document.createElement('div');
            popup.tag.className = "popup-kelly-color";

            if (!cfg.popupClass) {

                popup.tag.className = "popup-kelly-color";

                popup.tag.style.position = 'absolute';
                popup.tag.style.bottom = '0px';
                popup.tag.style.left = '0px';
                popup.tag.style.display = 'none';
                popup.tag.style.backgroundColor = '#e1e1e1';
                popup.tag.style.border = "1px solid #bfbfbf";
                popup.tag.style.boxShadow = "7px 7px 14px -3px rgba(0,0,0,0.24)";
                popup.tag.style.borderTopLeftRadius = '4px';
                popup.tag.style.borderTopRightRadius = '4px';
                popup.tag.style.borderBottomLeftRadius = '4px';
                popup.tag.style.borderBottomRightRadius = '4px';
                popup.tag.style.padding = "12px";
                popup.tag.style.boxSizing = "content-box";

            } else {
                popup.tag.className = cfg.inputClassName;
            }

            place = popup.tag;

            var body = document.getElementsByTagName('body')[0];
            body.appendChild(popup.tag);

            addEventListner(input, "click", function (e) {
                return handler.popUpShow(e);
            }, 'popup_');

        } // attach directly to input by popup
        else
            criticalError += '| "place" (' + placeName + ') not not found';

        if (cfg.size && cfg.size > 0) {
            wheelBlockSize = cfg.size;
        }

        // hex default #000000
        var colorData = false;

        if (cfg.color) {
            colorData = readColorData(cfg.color);
        } else if (input && input.value) {
            colorData = readColorData(input.value);
        }

        if (colorData) {
            hex = colorData.h;
            if (alpha)
                a = colorData.a;
        }

        //if (hex.charAt(0) == '#') hex = hex.slice(1);
        //if (hex.length == 3) hex = hex + hex;
        //if (hex.length !== 6) hex = '#000000';

        if (cfg.method && (cfg.method == 'triangle' || cfg.method == 'quad'))
            method = cfg.method;

        if (!initCanvas()) {
            criticalError += ' | cant init canvas context';
        }

        if (criticalError) {
            if (typeof console !== 'undefined')
                console.log('KellyColorPicker : ' + criticalError);
            return;
        }

        if (method == 'quad')
            svFig = getSvFigureQuad();
        if (method == 'triangle')
            svFig = getSvFigureTriangle();

        if (input) {
            var inputEdit = function (e) {
                var e = e || window.event;
                if (!e.target) {
                    e.target = e.srcElement;
                }
                handler.setColorByHex(e.target.value, true);
            };

            addEventListner(input, "click", inputEdit, 'input_edit_');
            addEventListner(input, "change", inputEdit, 'input_edit_');
            addEventListner(input, "keyup", inputEdit, 'input_edit_');
            addEventListner(input, "keypress", inputEdit, 'input_edit_');
        }

        if (cfg.colorSaver) {
            initColorSaver('left', true);
            initColorSaver('right');
        }

        if (cfg.methodSwitch) {
            initStyleSwitch();
        }

        enableEvents();

        updateSize();
        handler.setColorByHex(false); // update color info and first draw
    }

    // may be zero in some cases / check before applay

    function getSizeByElement(el) {

        var sizeInfo = el.getBoundingClientRect();
        var size = 0;
        var sizeReduse = 0;
        if (alpha) {
            sizeReduse = alphaSlider.width + alphaSlider.padding * 2;
        }

        if (sizeInfo.width > sizeInfo.height)
            size = sizeInfo.height;
        if (sizeInfo.height > sizeInfo.width)
            size = sizeInfo.width;

        size = parseInt(size);

        if (alpha) {

            size -= sizeReduse;
        }

        if (size <= 0) {
            return false;
        }

        return size;
    }

    // Read color value from string cString in rgb \ rgba \ hex format 
    // falseOnFail = false - return default color #000000 on fail

    function readColorData(cString, falseOnFail) {
        var alpha = 1;
        var h = false;

        cString = cString.trim(cString);
        if (cString.length <= 7) { // hex color
            if (cString.charAt(0) == '#')
                cString = cString.slice(1);

            if (cString.length == 3)
                h = cString + cString;
            else if (cString.length == 6)
                h = cString;

            //if (h && !h.match(/^#([0-9A-F]){3}$|^#([0-9A-F]){6}$/img)) h = false;			

        } else if (cString.substring(0, 3) == 'rgb') {
            var rgba = cString.split(",");

            if (rgba.length >= 3 && rgba.length <= 4) {
                rgba[0] = rgba[0].replace("rgba(", "");
                rgba[0] = rgba[0].replace("rgb(", "");

                var rgb = {r: parseInt(rgba[0]), g: parseInt(rgba[1]), b: parseInt(rgba[2])};

                if (rgb.r <= 255 && rgb.g <= 255 && rgb.b <= 255) {

                    h = rgbToHex(rgb);

                    if (rgba.length == 4) {
                        alpha = parseFloat(rgba[3]);
                        if (!alpha || alpha < 0)
                            alpha = 0;
                        if (alpha > 1)
                            alpha = 1;
                    }
                }
            }
        }

        if (h === false && falseOnFail)
            return false;
        if (h === false)
            h = '000000';

        if (h.charAt(0) != '#')
            h = '#' + h;
        return {h: h, a: alpha};
    }

    function getSvFigureQuad() {

        if (svFigsPool['quad'])
            return svFigsPool['quad'];

        var quad = new Object;
        quad.size;
        quad.padding = 2;
        quad.path; // крайние точки фигуры на координатной плоскости
        quad.imageData = null; // rendered quad image data
        // перезаписывается существующий, чтобы не вызывать утечек памяти, обнуляя прошлый
        // тк UInt8ClampedArray генерируемый createImageData стандартными способами не
        // во всех браузерах выгружается сразу

        quad.dotToSv = function (dot) {
            return {
                s: Math.abs(this.path[3].x - dot.x) / this.size,
                v: Math.abs(this.path[3].y - dot.y) / this.size
            };
        };

        quad.svToDot = function (sv) {
            var quadX = this.path[0].x;
            var quadY = this.path[0].y;

            var svError = 0.02;
            if (wheelBlockSize < 150) {
                svError = 0.07;
            } else if (wheelBlockSize < 100) {
                svError = 0.16;
            }

            for (var y = 0; y < this.size; y++) {
                for (var x = 0; x < this.size; x++) {
                    var dot = {x: x + quadX, y: y + quadY};
                    var targetSv = this.dotToSv(dot);
                    var es = Math.abs(targetSv.s - sv.s), ev = Math.abs(targetSv.v - sv.v);

                    if (es < svError && ev < svError) {
                        return dot;
                    }
                }
            }

            return {x: 0, y: 0};
        };

        quad.limitDotPosition = function (dot) {
            var x = dot.x;
            var y = dot.y;

            if (x < this.path[0].x) {
                x = this.path[0].x;
            }

            if (x > this.path[0].x + this.size) {
                x = this.path[0].x + this.size;
            }

            if (y < this.path[0].y) {
                y = this.path[0].y;
            }

            if (y > this.path[0].y + this.size) {
                y = this.path[0].y + this.size;
            }

            return {x: x, y: y};
        };

        quad.draw = function () {
            if (!this.imageData)
                this.imageData = ctx.createImageData(this.size, this.size);
            var i = 0;

            var quadX = this.path[0].x;
            var quadY = this.path[0].y;

            for (var y = 0; y < this.size; y++) {
                for (var x = 0; x < this.size; x++) {
                    var dot = {x: x + quadX, y: y + quadY};

                    var sv = this.dotToSv(dot);
                    var targetRgb = hsvToRgb(hsv.h, sv.s, sv.v);
                    this.imageData.data[i + 0] = targetRgb.r;
                    this.imageData.data[i + 1] = targetRgb.g;
                    this.imageData.data[i + 2] = targetRgb.b;
                    this.imageData.data[i + 3] = 255;
                    i += 4;
                }
            }

            ctx.putImageData(this.imageData, quadX, quadY);

            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0,0,0, 0.2)';
            ctx.lineWidth = 2;
            for (var i = 0; i <= this.path.length - 1; ++i)
            {
                if (i == 0)
                    ctx.moveTo(this.path[i].x, this.path[i].y);
                else
                    ctx.lineTo(this.path[i].x, this.path[i].y);
            }

            ctx.stroke();

            ctx.closePath();
        };

        quad.updateSize = function () {
            var workD = (wheel.innerRadius * 2) - wheelCursor.paddingX * 2 - this.padding * 2;

            // исходя из формулы диагонали квадрата, узнаем длинну стороны на основании доступного диаметра
            this.size = Math.floor(workD / Math.sqrt(2));

            this.path = new Array();

            // находим верхнюю левую точку и от нее задаем остальные координаты
            this.path[0] = {x: -1 * (this.size / 2), y: -1 * (this.size / 2)};
            this.path[1] = {x: this.path[0].x + this.size, y: this.path[0].y};
            this.path[2] = {x: this.path[1].x, y: this.path[1].y + this.size};
            this.path[3] = {x: this.path[2].x - this.size, y: this.path[2].y};
            this.path[4] = {x: this.path[0].x, y: this.path[0].y};

            for (var i = 0; i <= this.path.length - 1; ++i) {
                this.path[i].x += wheel.pos.x;
                this.path[i].y += wheel.pos.y;
            }
        }

        quad.isDotIn = function (dot) {
            if (dot.x < this.path[0].x ||
                    dot.x > this.path[0].x + this.size ||
                    dot.y < this.path[0].y ||
                    dot.y > this.path[0].y + this.size) {
                return false;
            }
            return true;
        };

        svFigsPool['quad'] = quad;
        return quad;
    }

    function getSvFigureTriangle() {

        if (svFigsPool['triangle'])
            return svFigsPool['triangle'];

        var triangle = new Object;
        triangle.size; // сторона равностороннего треугольника
        triangle.padding = 2;
        triangle.path;
        triangle.imageData = null; // rendered triangle image data
        triangle.followWheel = true;
        triangle.s;
        triangle.sOnTop = false;
        triangle.outerRadius;

        triangle.limitDotPosition = function (dot) {
            var x = dot.x;
            var y = dot.y;

            var slopeToCtr;
            var maxX = this.path[0].x;
            var minX = this.path[2].x;
            var finalX = x;
            var finalY = y;

            finalX = Math.min(Math.max(minX, finalX), maxX);
            var slope = ((this.path[0].y - this.path[1].y) / (this.path[0].x - this.path[1].x));
            var minY = Math.ceil((this.path[1].y + (slope * (finalX - this.path[1].x))));
            slope = ((this.path[0].y - this.path[2].y) / (this.path[0].x - this.path[2].x));
            var maxY = Math.floor((this.path[2].y + (slope * (finalX - this.path[2].x))));

            if (x < minX) {
                slopeToCtr = ((wheel.pos.y - y) / (wheel.pos.x - x));
                finalY = y;
            }

            finalY = Math.min(Math.max(minY, finalY), maxY);
            return {x: finalX, y: finalY};
        };

        triangle.svToDot = function (sv) {
            var svError = 0.02;
            if (wheelBlockSize < 150) {
                svError = 0.07;
            } else if (wheelBlockSize < 100) {
                svError = 0.16;
            }

            for (var y = 0; y < this.size; y++) {
                for (var x = 0; x < this.size; x++) {
                    var dot = {x: this.path[1].x + x, y: this.path[1].y + y};
                    if (svFig.isDotIn(dot)) {
                        var targetSv = this.dotToSv(dot);
                        var es = Math.abs(targetSv.s - sv.s), ev = Math.abs(targetSv.v - sv.v);

                        if (es < svError && ev < svError) {
                            return dot;
                        }
                    }
                }
            }

            return {
                x: 0,
                y: 0
            };
        };

        triangle.draw = function () {
            // no buffer

            if (!this.imageData)
                this.imageData = canvasHelperCtx.createImageData(this.size, this.size);

            canvasHelper.width = this.size;
            canvasHelper.height = this.size;

            var trX = this.path[1].x;
            var trY = this.path[1].y;
            var i = 0;
            for (var y = 0; y < this.size; y++) {
                for (var x = 0; x < this.size; x++) {
                    var dot = {x: this.path[1].x + x, y: this.path[1].y + y};
                    if (!svFig.isDotIn(dot)) {
                        this.imageData.data[i + 0] = 0;
                        this.imageData.data[i + 1] = 0;
                        this.imageData.data[i + 2] = 0;
                        this.imageData.data[i + 3] = 0;
                    } else {
                        var sv = this.dotToSv(dot);
                        var targetRgb = hsvToRgb(hsv.h, sv.s, sv.v);

                        this.imageData.data[i + 0] = targetRgb.r;
                        this.imageData.data[i + 1] = targetRgb.g;
                        this.imageData.data[i + 2] = targetRgb.b;
                        this.imageData.data[i + 3] = 255;
                    }

                    i += 4;
                }
            }

            canvasHelperCtx.putImageData(this.imageData, 0, 0);
            ctx.drawImage(canvasHelper, trX, trY); // draw with save overlaps transparent things , not direct putImageData that rewrite all pixels

            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.lineWidth = 2;
            var trianglePath = this.path; //rotatePath(triangle.path, hsv.h * 360);
            for (var i = 0; i <= trianglePath.length - 1; ++i)
            {
                if (i == 0)
                    ctx.moveTo(trianglePath[i].x, trianglePath[i].y);
                else
                    ctx.lineTo(trianglePath[i].x, trianglePath[i].y);
            }

            ctx.stroke();
            ctx.closePath();
        };

        triangle.calcS = function (p) {
            return Math.abs((p[1].x - p[0].x) * (p[2].y - p[0].y) - (p[2].x - p[0].x) * (p[1].y - p[0].y)) / 2;
        };

        triangle.dotToSv = function (dot) {
            var p = getP({x: dot.x, y: dot.y}, this.vol);
            var len = getLen(p, this.vol[0]);

            // dirty tricks? replace output to interpolation and lerp in future
            if (len < 1)
                len = Math.floor(len);
            if (len > this.h - 1)
                len = this.h;

            var vol = len / (this.h);

            var angle = Math.abs(getAngle(dot, this.sSide));
            if (angle < 30)
                angle = 30;
            angle -= 30;
            angle = 60 - angle;
            angle = angle / 60; // - saturation from one angle

            return {s: angle, v: vol};
        };

        triangle.isDotIn = function (dot) {
            var t = [
                {x: this.path[0].x, y: this.path[0].y},
                {x: this.path[1].x, y: this.path[1].y},
                {x: dot.x, y: dot.y}
            ];

            var s = this.calcS(t);
            t[1] = {x: this.path[2].x, y: this.path[2].y};
            s += this.calcS(t);
            t[0] = {x: this.path[1].x, y: this.path[1].y};
            s += this.calcS(t);

            if (Math.ceil(s) == Math.ceil(this.s))
                return true;
            else
                return false;
        };

        triangle.updateSize = function () {
            // из формулы высоты равностороннего треугольника
            this.outerRadius = wheel.innerRadius - wheelCursor.paddingX - this.padding;
            // из теоремы синусов треугольника
            this.size = Math.floor((2 * this.outerRadius) * Math.sin(toRadians(60)));

            var h = ((Math.sqrt(3) / 2) * this.size);
            this.h = ((Math.sqrt(3) / 2) * this.size);

            this.path = new Array();
            this.path[0] = {x: this.outerRadius, y: 0}; // middle point - h
            this.path[1] = {x: this.path[0].x - h, y: -1 * (this.size / 2)}; // upper - s
            this.path[2] = {x: this.path[1].x, y: this.size / 2}; // bottom - v
            this.path[3] = {x: this.path[0].x, y: this.path[0].y}; // to begin

            for (var i = 0; i <= this.path.length - 1; ++i) {
                this.path[i].x += wheel.pos.x;
                this.path[i].y += wheel.pos.y;
            }

            this.vol = new Array();


            this.s = this.calcS(this.path);
            if (this.sOnTop) {
                var middle = getMiddlePoint(this.path[0], this.path[2]);

                this.vol[0] = {x: this.path[1].x, y: this.path[1].y};
                this.vol[1] = {x: middle.x, y: middle.y};

                this.sSide = this.path[1];
            } else {
                var middle = getMiddlePoint(this.path[0], this.path[1]);

                this.vol[0] = {x: this.path[2].x, y: this.path[2].y};
                this.vol[1] = {x: middle.x, y: middle.y};

                this.sSide = this.path[2];
            }
        };

        svFigsPool['triangle'] = triangle;
        return triangle;
    }

    // prefix - for multiple event functions for one object
    function addEventListner(object, event, callback, prefix) {
        if (typeof object !== 'object') {
            object = document.getElementById(object);
        }

        if (!object)
            return false;
        if (!prefix)
            prefix = '';

        events[prefix + event] = callback;

        if (!object.addEventListener) {
            object.attachEvent('on' + event, events[prefix + event]);
        } else {
            object.addEventListener(event, events[prefix + event]);
        }

        return true;
    }

    function removeEventListener(object, event, prefix) {
        if (typeof object !== 'object') {
            object = document.getElementById(object);
        }

        // console.log('remove :  : ' + Object.keys(events).length);
        if (!object)
            return false;
        if (!prefix)
            prefix = '';

        if (!events[prefix + event])
            return false;

        if (!object.removeEventListener) {
            object.detachEvent('on' + event, events[prefix + event]);
        } else {
            object.removeEventListener(event, events[prefix + event]);
        }

        events[prefix + event] = null;
        return true;
    }

    // [converters]
    // Read more about HSV color model :
    // https://ru.wikipedia.org/wiki/HSV_%28%F6%E2%E5%F2%EE%E2%E0%FF_%EC%EE%E4%E5%EB%FC%29
    // source of converter hsv functions
    // http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c

    function hsvToRgb(h, s, v) {
        var r, g, b, i, f, p, q, t;

        if (h && s === undefined && v === undefined) {
            s = h.s, v = h.v, h = h.h;
        }

        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }

        return {
            r: Math.floor(r * 255),
            g: Math.floor(g * 255),
            b: Math.floor(b * 255)
        };
    }

    function rgbToHsv(r, g, b) {
        if (r && g === undefined && b === undefined) {
            g = r.g, b = r.b, r = r.r;
        }

        r = r / 255, g = g / 255, b = b / 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max == 0 ? 0 : d / max;

        if (max == min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return {h: h, s: s, v: v};
    }

    function hexToRgb(hex) {
        var dec = parseInt(hex.charAt(0) == '#' ? hex.slice(1) : hex, 16);
        return {r: dec >> 16, g: dec >> 8 & 255, b: dec & 255};
    }

    function rgbToHex(color) {
        var componentToHex = function (c) {
            var hex = c.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };

        return "#" + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
    }

    function toRadians(i) {
        return i * (PI / 180);
    }

    // [converters - end]

    function getLen(point1, point2) {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    }

    function getMiddlePoint(point1, point2) {
        return {x: (point1.x + point2.x) / 2, y: (point1.y + point2.y) / 2};
    }

    // перпендикуляр от точки

    function getP(point1, line1) {
        var l = (line1[0].x - line1[1].x) * (line1[0].x - line1[1].x) + (line1[0].y - line1[1].y) * (line1[0].y - line1[1].y);
        var pr = (point1.x - line1[0].x) * (line1[1].x - line1[0].x) + (point1.y - line1[0].y) * (line1[1].y - line1[0].y);
        var pt = true;
        var cf = pr / l;

        if (cf < 0) {
            cf = 0;
            pt = false;
        }
        if (cf > 1) {
            cf = 1;
            pt = false;
        }

        return {
            x: line1[0].x + cf * (line1[1].x - line1[0].x),
            y: line1[0].y + cf * (line1[1].y - line1[0].y),
            pt: pt
        };
    }

    // translate360 = true  270
    //            180 --- from.x.y --- 0
    //                      90

    function getAngle(point, from, translate360) {
        if (!from)
            from = {x: 0, y: 0};

        var distX = point.x - from.x;
        var distY = point.y - from.y;

        var a = Math.atan2(distY, distX) * 180 / (PI);
        if (translate360 && a < 0)
            a = 360 + a;

        return a;
    }

    // поворот фигуры относительно точки
    function rotatePath2(points, angle) {
        angle = toRadians(angle);
        var newPoints = new Array();

        for (var i = 0; i <= points.length - 1; ++i)
        {
            newPoints[i] = {
                x: points[i].x * Math.cos(angle) - points[i].y * Math.sin(angle),
                y: points[i].x * Math.sin(angle) + points[i].y * Math.cos(angle)
            };
        }

        return newPoints;
    }

    function updateSize() {
        padding = basePadding + wheelCursor.paddingX;

        rendered = false;
        wheel.imageData = null;

        center = wheelBlockSize / 2;
        wheel.pos = {x: center, y: center};

        wheel.outerRadius = center - padding;
        wheel.innerRadius = wheel.outerRadius - wheel.width;

        // объект относительно начала координат
        wheelCursor.path = [
            {x: wheel.innerRadius - wheelCursor.paddingX, y: wheelCursor.height * -1},
            {x: wheel.outerRadius + wheelCursor.paddingX, y: wheelCursor.height * -1},
            {x: wheel.outerRadius + wheelCursor.paddingX, y: wheelCursor.height},
            {x: wheel.innerRadius - wheelCursor.paddingX, y: wheelCursor.height},
            {x: wheel.innerRadius - wheelCursor.paddingX, y: wheelCursor.height * -1}
        ];

        var width = wheelBlockSize;
        if (alpha)
            width += alphaSlider.width + alphaSlider.padding * 2;

        if (place.tagName != 'CANVAS') {
            place.style.width = width + 'px';
            place.style.height = wheelBlockSize + 'px';
        }

        canvas.width = width;
        canvas.height = wheelBlockSize;

        for (var i = 0; i <= colorSavers.length - 1; ++i)
        {
            colorSavers[i].updateSize();
        }

        if (styleSwitch) {

            styleSwitch.imageData['triangle'] = null;
            styleSwitch.imageData['quad'] = null;

            styleSwitch.updateSize();
        }

        svFig.updateSize();
        if (alpha)
            alphaSlider.updateSize();
    }

    // updates input after color changes (manualEnter = true if value entered from input, not from widget)
    // if manualEnter = true - save original text in input, else set input value in configurated format
    // if user event 'updateinput' is setted and return false - prevent default updateInput behavior

    function updateInput(manualEnter) {
        if (!input)
            return;

        if (userEvents["updateinput"]) {
            var callback = userEvents["updateinput"];
            if (!callback(handler, input, manualEnter))
                return;
        }

        var rgba = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + a.toFixed(2) + ')';

        if (!manualEnter) {
            if (a < 1 && inputFormat === 'mixed') {
                input.value = rgba;
            } else {
                if (inputFormat === 'hex' || inputFormat === 'mixed')
                    input.value = hex;
                else
                    input.value = rgba;
            }
        }

        if (inputColor) {
            if (hsv.v < 0.5) {
                input.style.color = "#FFF";
            } else {
                input.style.color = "#000";
            }

            input.style.background = rgba;
        }
    }

    function initCanvas() {
        if (!place)
            return false;
        if (place.tagName != 'CANVAS') {
            canvas = document.createElement('CANVAS');
            place.appendChild(canvas);
        } else {
            canvas = place;
        }

        // code for IE browsers
        if (typeof window.G_vmlCanvasManager != 'undefined') {
            canvas = window.G_vmlCanvasManager.initElement(canvas);
            canvasHelper = window.G_vmlCanvasManager.initElement(canvasHelper);
        }

        if (!!(canvas.getContext && canvas.getContext('2d'))) {
            ctx = canvas.getContext("2d");
            canvasHelperCtx = canvasHelper.getContext("2d");
            return true;
        } else
            return false;
    }

    // temp events until wait mouse click or touch
    function enableEvents() {
        addEventListner(canvas, "mousedown", function (e) {
            handler.mouseDownEvent(e);
        }, 'wait_action_');
        addEventListner(canvas, "touchstart", function (e) {
            handler.mouseDownEvent(e);
        }, 'wait_action_');
        addEventListner(canvas, "mouseout", function (e) {
            handler.mouseOutEvent(e);
        }, 'wait_action_');
        addEventListner(window, "touchmove", function (e) {
            handler.touchMoveEvent(e);
        }, 'wait_action_');
        addEventListner(canvas, "mousemove", function (e) {
            handler.mouseMoveRest(e);
        }, 'wait_action_');
    }

    // mouse detect canvas events

    function disableEvents() {
        removeEventListener(canvas, "mousedown", 'wait_action_');
        removeEventListener(canvas, "touchstart", 'wait_action_');
        removeEventListener(canvas, "mouseout", 'wait_action_');
        removeEventListener(window, "touchmove", 'wait_action_');
        removeEventListener(canvas, "mousemove", 'wait_action_');
    }

    function getEventDot(e) {
            
        e = e || window.event;
        var x, y;
        var scrollX = document.body.scrollLeft + document.documentElement.scrollLeft;
        var scrollY = document.body.scrollTop + document.documentElement.scrollTop;

        if (event.type == 'touchend') {
        
            x = e.changedTouches[0].clientX + scrollX;
            y = e.changedTouches[0].clientY + scrollY;
            
        } else if (event.type == 'touchmove' || e.touches) {
        
            x = e.touches[0].clientX + scrollX;
            y = e.touches[0].clientY + scrollY;
            
        } else {
            // e.pageX e.pageY e.x e.y bad for cross-browser
            x = e.clientX + scrollX;
            y = e.clientY + scrollY;
        }

        // set point to local coordinates
        
        var rect = canvas.getBoundingClientRect();
        x -= rect.left + scrollX;
        y -= rect.top + scrollY;

        return {x: x, y: y};
    }

    function selectColorSaver(key) {

        // disable current selection
        var previouseSelect = false;
        for (var i = 0; i <= colorSavers.length - 1; ++i)
        {
            if (colorSavers[i].selected)
                previouseSelect = i;
            colorSavers[i].selected = false;
        }

        // select new 
        var select = false;
        for (var i = 0; i <= colorSavers.length - 1; ++i)
        {
            if (i == key) {
                colorSavers[i].selected = true;
                handler.setColorByHex(colorSavers[i].color);
                select = true;
                break;
            }
        }

        if (select && userEvents["selectcolorsaver"]) {
            var callback = userEvents["selectcolorsaver"];
            callback(handler, colorSavers[key]);
        }

        if (!select && previouseSelect !== false) {
            colorSavers[previouseSelect].selected = true;
        }

        return select;
    }

    function updateColorSavers() {

        for (var i = 0; i <= colorSavers.length - 1; ++i)
        {
            if (colorSavers[i].selected)
                colorSavers[i].color = hex;
        }

    }

    function drawColorSavers() {
        if (colorSavers.length) {
            for (var i = 0; i <= colorSavers.length - 1; ++i)
            {
                colorSavers[i].draw();
            }
        }
    }

    // вывод интерфейса без курсоров
    // поддерживается буферизация todo добавить буферизацию color saver элементов
    // вынести буфер альфа слайдера отдельно от колеса и sv блока

    function drawColorPicker() {
        if (!ctx)
            return false;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // put buffered data
        if (rendered) {
            ctx.putImageData(canvasHelperData, 0, 0);
            drawColorSavers();
            return true;
        }

        // форма кольца может измениться только при изменении размеров виджета
        wheel.draw();
        svFig.draw();

        if (alpha)
            alphaSlider.draw();

        drawColorSavers();
        if (styleSwitch)
            styleSwitch.draw();

        // поместить текущее отрисованное изображение кольца + sv селектора в буфер
        // notice :
        // при перемещении курсора кольца сохранять буфер все изображение бессмысленно - sv блок постоянно обновляется, поэтому
        // сохраняем уже на событии выхода из процесса перемещения

        if (!drag) {
            //wheelBlockSize
            canvasHelperData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            rendered = true;
        }
        return true;
    }

    function draw() {
        if (!drawColorPicker()) {
            return false;
        }

        var curAngle = hsv.h * 360 - wheel.startAngle;

        // cursors

        if (alpha) {
            ctx.beginPath();
            var cursorHeight = 2;
            var cursorPaddingX = 2;
            var pointY = alphaSlider.height * (1 - a);
            ctx.rect(alphaSlider.pos.x - cursorPaddingX, alphaSlider.padding + pointY - cursorHeight / 2, alphaSlider.width + cursorPaddingX * 2, cursorHeight);
            ctx.strokeStyle = 'rgba(0,0,0, 0.8)';
            ctx.lineWidth = 2;

            ctx.stroke();
            ctx.closePath();
        }

        ctx.beginPath();

        var wheelCursorPath = rotatePath2(wheelCursor.path, curAngle, {x: wheel.pos.x, y: wheel.pos.y});
        for (var i = 0; i <= wheelCursorPath.length - 1; ++i)
        {
            wheelCursorPath[i].x += wheel.pos.x;
            wheelCursorPath[i].y += wheel.pos.y;
            if (i == 0)
                ctx.moveTo(wheelCursorPath[i].x, wheelCursorPath[i].y);
            else
                ctx.lineTo(wheelCursorPath[i].x, wheelCursorPath[i].y);
        }

        ctx.strokeStyle = 'rgba(0,0,0,0.8)';
        ctx.lineWidth = wheelCursor.lineWeight;
        ctx.stroke();
        ctx.closePath();

        // sv cursor
        if (hsv.v > 0.5 && hsv.s < 0.5)
            ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        else
            ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        //ctx.strokeStyle='rgba(255,255, 255, 1)';

        //document.getElementById('test3').value = 'h' + hsv.h.toFixed(2) + ' s'  + hsv.s.toFixed(2) + ' v'  + hsv.v.toFixed(2)

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.arc(hsv.x, hsv.y, svCursor.radius, 0, PI * 2);


        ctx.stroke();
        ctx.closePath();

        return false;
    }

    this.popUpClose = function (e) {
        if (popup.tag === false)
            return;

        if (e) {
            // todo check when select color and then unpress button out of bounds
            if (e.target == input || e.target == canvas)
                return false;
            if (e.target == popup.tag)
                return false;
        }

        popup.tag.style.display = 'none';
        if (KellyColorPicker.activePopUp == handler)
            KellyColorPicker.activePopUp = false;
    }

    // if 'popupshow' user event is setted and return false - prevent show popup default behavior

    this.popUpShow = function (e) {
        if (popup.tag === false)
            return;

        if (userEvents["popupshow"]) {
            var callback = userEvents["popupshow"];
            if (!callback(handler, e))
                return;
        }

        // include once 
        if (!KellyColorPicker.popupEventsInclude) {
            addEventListner(document, "click", function (e) {
                if (KellyColorPicker.activePopUp)
                    return KellyColorPicker.activePopUp.popUpClose(e);
                else
                    return false;
            }, 'popup_close_');
            addEventListner(window, "resize", function (e) {
                if (KellyColorPicker.activePopUp)
                    return KellyColorPicker.activePopUp.popUpShow(e);
            }, 'popup_resize_');
            KellyColorPicker.popupEventsInclude = true;
        }

        if (KellyColorPicker.activePopUp) {
            KellyColorPicker.activePopUp.popUpClose(false);
        }

        var topMargin = handler.getCanvas().width;

        var alpha = handler.getAlphaFig();
        if (alpha) {
            topMargin -= alpha.width + alpha.padding;
        }

        var paddingPopup = parseInt(popup.tag.style.paddingBottom) + parseInt(popup.tag.style.paddingTop);
        if (paddingPopup <= 0) {
            paddingPopup = 0;
        }

        var viewportOffset = input.getBoundingClientRect();
        var top = viewportOffset.top + (window.scrollY || window.pageYOffset || document.body.scrollTop) - paddingPopup;
        var left = viewportOffset.left + (window.scrollX || window.pageXOffset || document.body.scrollLeft);
        var padding = 6;

        popup.tag.style.top = (top - topMargin - popup.margin) + 'px';
        popup.tag.style.left = left + 'px';
        popup.tag.style.display = 'block';

        KellyColorPicker.activePopUp = handler;
        return false;
    }

    this.setHueByDot = function (dot) {
        var angle = getAngle(dot, wheel.pos) + wheel.startAngle;
        if (angle < 0)
            angle = 360 + angle;

        hsv.h = angle / 360;

        rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
        hex = rgbToHex(rgb);

        updateColorSavers();

        if (userEvents["change"]) {
            var callback = userEvents["change"];
            callback(handler);
        }

        updateInput();

        rendered = false;
        draw();
    };

    this.setColorForColorSaver = function (cString, align) {
        var colorData = readColorData(cString, true);
        if (!colorData)
            return;

        var colorSaver = handler.getColorSaver(align);
        if (colorSaver.selected) {
            this.setColorByHex(cString, false);
        } else {
            colorSaver.color = colorData.h;
            draw();
        }

        return true;
    };

    // update color with redraw canvas and update input hex value
    // now support rgba \ rgb string format input

    this.setColorByHex = function (inputHex, manualEnter) {

        if (!manualEnter)
            manualEnter = false;
        var inputAlpha = a;

        if (inputHex !== false) {

            if (!inputHex || !inputHex.length)
                return;

            var colorData = readColorData(inputHex, true);
            if (!colorData)
                return;

            inputHex = colorData.h;
            if (alpha)
                inputAlpha = colorData.a;

        } else
            inputHex = hex;

        if (alpha && inputHex == hex && rendered && inputAlpha != a) {
            a = inputAlpha;

            draw(); // slider always redraws in current even if part of canvas buffered
            return;
        }

        if (hex && inputHex == hex && rendered)
            return;

        // set and redraw all

        a = inputAlpha;
        rgb = hexToRgb(inputHex);
        hex = inputHex;
        hsv = rgbToHsv(rgb);

        var dot = svFig.svToDot(hsv);
        hsv.x = dot.x;
        hsv.y = dot.y;

        rendered = false;
        updateColorSavers();
        draw();

        if (userEvents["change"]) {
            var callback = userEvents["change"];
            callback(handler);
        }

        updateInput(manualEnter);
    };

    this.setAlphaByDot = function (dot) {
        a = alphaSlider.dotToAlpha(dot);

        if (userEvents["change"]) {
            var callback = userEvents["change"];
            callback(handler);
        }

        updateInput();
        draw();
    };

    this.setAlpha = function (alpha) {
        a = alpha;
        updateInput();
        draw();
    };

    this.setColorByDot = function (dot) {
        var sv = svFig.dotToSv(dot);

        hsv.s = sv.s;
        hsv.v = sv.v;
        hsv.x = dot.x;
        hsv.y = dot.y;

        if (hsv.s > 1)
            hsv.s = 1;
        if (hsv.s < 0)
            hsv.s = 0;
        if (hsv.v > 1)
            hsv.v = 1;
        if (hsv.v < 0)
            hsv.v = 0;

        rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
        hex = rgbToHex(rgb);

        updateColorSavers();

        if (userEvents["change"]) {
            var callback = userEvents["change"];
            callback(handler);
        }

        updateInput();
        draw();
    };

    this.mouseOutEvent = function (e) {
        if (svCursorMouse.curType > 0 && !KellyColorPicker.cursorLock) {
            svCursorMouse.initStandartCursor();
        }
    };

    // перемещение указателя по canvas в режиме покоя
    this.mouseMoveRest = function (e) {
        if (drag)
            return;

        if (!cursorAnimReady) {
            return;
        }

        cursorAnimReady = false;
        var newDot = getEventDot(e);
        svCursorMouse.updateCursor(newDot);
        requestAnimationFrame(function () {
            cursorAnimReady = true;
        });

        if (userEvents["mousemoverest"]) {
            var callback = userEvents["mousemoverest"];
            callback(e, handler, newDot);
        }
    };

    // to prevent scroll by touches while change color
    // в FireFox под андройд есть "фича" которая скрывает или раскрывает тулбар адресной строки при движении пальцем
    // отключить её можно только через опцию about:config browser.chrome.dynamictoolbar

    this.touchMoveEvent = function (e) {
        if (drag) { // todo check number of touches to ignore zoom action
            event.preventDefault();
        }
    };

    // маршрутизатор событий нажатий на элементы
    this.mouseDownEvent = function (event) {
        event.preventDefault();

        var move, up = false;
        var newDot = getEventDot(event);
        // console.log('mouseDownEvent : cur : ' + newDot.x + ' | ' + newDot.y);

        if (wheel.isDotIn(newDot)) {
            drag = 'wheel';
            handler.setHueByDot(newDot);

            move = function (e) {
                handler.wheelMouseMove(e, newDot);
            };
            up = function (e) {
                KellyColorPicker.cursorLock = false;
                handler.wheelMouseUp(e, newDot);
            };

        } else if (svFig.isDotIn(newDot)) {
            drag = 'sv';
            handler.setColorByDot(newDot);

            move = function (e) {
                handler.svMouseMove(e, newDot);
            };
            up = function (e) {
                KellyColorPicker.cursorLock = false;
                handler.svMouseUp(e, newDot);
            };
        } else if (alpha && alphaSlider.isDotIn(newDot)) {
            drag = 'alpha';
            handler.setAlphaByDot(newDot);

            move = function (e) {
                handler.alphaMouseMove(e, newDot);
            };
            up = function (e) {
                KellyColorPicker.cursorLock = false;
                handler.alphaMouseUp(e, newDot);
            };
        } else if (styleSwitch && styleSwitch.isDotIn(newDot)) {
            handler.setMethod();
        } else if (colorSavers.length) { // here all items with post check of dot in

            for (var i = 0; i <= colorSavers.length - 1; ++i)
            {
                if (colorSavers[i].isDotIn(newDot)) {
                    selectColorSaver(i);
                    break;
                }
            }
        }

        if (move && up) {
            disableEvents();
            KellyColorPicker.cursorLock = handler;
            addEventListner(document, "mouseup", up, 'action_process_');
            addEventListner(document, "mousemove", move, 'action_process_');
            addEventListner(document, "touchend", up, 'action_process_');
            addEventListner(document, "touchmove", move, 'action_process_');
        }
    };

    this.wheelMouseMove = function (event, dot) {
        event.preventDefault();

        if (!drag)
            return;

        if (!cursorAnimReady) {
            return;
        }
        cursorAnimReady = false;
        var newDot = getEventDot(event);

        // console.log('wheelMouseMove : start : ' + dot.x + ' | ' + dot.y + ' cur : ' + newDot.x + ' | ' + newDot.y);
        requestAnimationFrame(function () {
            cursorAnimReady = true;
        });
        //setTimeout(function() {cursorAnimReady = true;}, 1000/30);

        handler.setHueByDot(newDot);

        if (userEvents["mousemoveh"]) {
            var callback = userEvents["mousemoveh"];
            callback(event, handler, newDot);
        }
    };

    this.wheelMouseUp = function (event, dot) {
        event.preventDefault();
        if (!drag)
            return;
        //console.log('wheelMouseUp : start : ' + dot.x + ' | ' + dot.y);

        removeEventListener(document, "mouseup", 'action_process_');
        removeEventListener(document, "mousemove", 'action_process_');
        removeEventListener(document, "touchend", 'action_process_');
        removeEventListener(document, "touchmove", 'action_process_');

        enableEvents();
        drag = false;

        rendered = false;
        draw();

        var newDot = getEventDot(event);
        svCursorMouse.updateCursor(newDot);

        if (userEvents["mouseuph"]) {
            var callback = userEvents["mouseuph"];
            callback(event, handler, newDot);
        }
    };

    this.alphaMouseMove = function (event, dot) {
        event.preventDefault();
        if (!drag)
            return;

        if (!cursorAnimReady) {
            return;
        }

        cursorAnimReady = false;
        var newDot = getEventDot(event);

        // console.log('svMouseMove : start : ' + dot.x + ' | ' + dot.y + ' cur : ' + newDot.x + ' | ' + newDot.y);

        newDot = alphaSlider.limitDotPosition(newDot);

        requestAnimationFrame(function () {
            cursorAnimReady = true;
        });
        //setTimeout(function() {cursorAnimReady = true;}, 1000/30);

        handler.setAlphaByDot(newDot);

        if (userEvents["mousemovealpha"]) {
            var callback = userEvents["mousemovealpha"];
            callback(event, handler, newDot);
        }
    };

    this.alphaMouseUp = function (event, dot) {
        event.preventDefault();
        if (!drag)
            return;

        removeEventListener(document, "mouseup", 'action_process_');
        removeEventListener(document, "mousemove", 'action_process_');
        removeEventListener(document, "touchend", 'action_process_');
        removeEventListener(document, "touchmove", 'action_process_');

        enableEvents();
        drag = false;

        var newDot = getEventDot(event);
        svCursorMouse.updateCursor(newDot);

        if (userEvents["mouseupalpha"]) {
            var callback = userEvents["mouseupalpha"];
            callback(event, handler, newDot);
        }
    };

    this.svMouseMove = function (event, dot) {
        event.preventDefault();
        if (!drag)
            return;

        if (!cursorAnimReady) {
            return;
        }

        cursorAnimReady = false;
        var newDot = getEventDot(event);

        // console.log('svMouseMove : start : ' + dot.x + ' | ' + dot.y + ' cur : ' + newDot.x + ' | ' + newDot.y);

        newDot = svFig.limitDotPosition(newDot);

        requestAnimationFrame(function () {
            cursorAnimReady = true;
        });
        //setTimeout(function() {cursorAnimReady = true;}, 1000/30);

        handler.setColorByDot(newDot);

        if (userEvents["mousemovesv"]) {
            var callback = userEvents["mousemovesv"];
            callback(event, handler, newDot);
        }
    };

    this.svMouseUp = function (event, dot) {
        event.preventDefault();
        if (!drag)
            return;

        // console.log('svMouseUp : start : ' + dot.x + ' | ' + dot.y);

        removeEventListener(document, "mouseup", 'action_process_');
        removeEventListener(document, "mousemove", 'action_process_');
        removeEventListener(document, "touchend", 'action_process_');
        removeEventListener(document, "touchmove", 'action_process_');

        enableEvents();
        drag = false;

        var newDot = getEventDot(event);
        svCursorMouse.updateCursor(newDot);
        
        // todo 
        // split cached data for sv + h wheel and slider, so we can redraw alpha slider without performanse lost in svMouseMove
        
        if (alpha) {
            rendered = false;
            draw();
        }
        
        if (userEvents["mouseupsv"]) {
            var callback = userEvents["mouseupsv"];
            callback(event, handler, newDot);
        }
    };

    this.addUserEvent = function (event, callback) {
        userEvents[event] = callback;
        return true;
    };

    this.removeUserEvent = function (event) {
        if (!userEvents[event])
            return false;
        userEvents[event] = null;
        return true;
    };

    // для кастомизации отображения элементов виджета

    this.getCanvas = function () {
        if (!ctx)
            return false;
        return canvas;
    };

    this.getCtx = function () {
        if (!ctx)
            return false;
        return ctx;
    };

    this.getInput = function () {
        return input;
    };
    this.getSvFig = function () {
        return svFig;
    };
    this.getSvFigCursor = function () {
        return svCursor;
    };

    this.getWheel = function () {
        return wheel;
    };
    this.getWheelCursor = function () {
        return wheelCursor;
    };

    this.getCurColorHsv = function () {
        return hsv;
    };
    this.getCurColorRgb = function () {
        return rgb;
    };
    this.getCurColorHex = function () {
        return hex;
    };
    this.getCurColorRgba = function () {
        return {r: rgb.r, g: rgb.g, b: rgb.b, a: a};
    };
    this.getCurAlpha = function () {
        return a;
    };
    this.getAlphaFig = function () {
        if (alpha)
            return alphaSlider;
        else
            return false;
    }

    this.getPopup = function () {
        return popup;
    };
    this.getSize = function () {
        return wheelBlockSize;
    };

    // if align not setted get selected
    this.getColorSaver = function (align) {
        for (var i = 0; i <= colorSavers.length - 1; ++i)
        {
            if ((!align && colorSavers[i].selected) || colorSavers[i].align == align) {
                colorSavers[i].rgb = hexToRgb(colorSavers[i].color);
                colorSavers[i].hsv = rgbToHsv(colorSavers[i].rgb.r, colorSavers[i].rgb.g, colorSavers[i].rgb.b);
                return colorSavers[i];
            }
        }
    };

    this.setColorSaver = function (align) {

        if (!align)
            return false;

        for (var i = 0; i <= colorSavers.length - 1; ++i)
        {
            if (colorSavers[i].align == align) {
                selectColorSaver(i);
                return colorSavers[i];
            }
        }
    }

    this.updateView = function (dropBuffer) {
        if (!ctx)
            return false;

        if (dropBuffer) {
            wheel.imageData = null;
            svFig.imageData = null;
            canvasHelperData = null;
        }

        rendered = false;
        updateSize();
        draw();
        return true;
    };

    // resize canvas, with all data \ full refresh view
    // if size same as current and refresh variable setted to true - refresh current view anyway
    // othervise exit with return true

    this.resize = function (size, refresh) {
        if (!ctx)
            return false;
        if (size == wheelBlockSize && !refresh)
            return true;

        rendered = false;
        wheel.imageData = null;
        svFig.imageData = null;
        canvasHelperData = null;
        wheelBlockSize = size;
        updateSize();

        handler.setColorByHex(false);
        return false;
    };

    this.syncSize = function (e) {

        if (!resizeWith)
            return false;

        var newSize = getSizeByElement(resizeWith);
        if (newSize)
            handler.resize(newSize);
        return false;
    }

    this.setMethod = function (newMethod) {
        if (!newMethod) {
            newMethod = 'triangle';
            if (method == 'triangle')
                newMethod = 'quad';
        }

        if (newMethod == method)
            return false;
        if (method != 'quad' && method != 'triangle')
            return false;

        method = newMethod;

        if (method == 'quad')
            svFig = getSvFigureQuad();
        if (method == 'triangle')
            svFig = getSvFigureTriangle();

        handler.resize(wheelBlockSize, true);

        if (userEvents["setmethod"]) {
            var callback = userEvents["setmethod"];
            callback(handler, method);
        }

        return true;
    }

    // restore color of input ? 

    this.destroy = function () {
        if (!handler) {
            return false;
        }

        if (svCursorMouse.curType > 0) {
            KellyColorPicker.cursorLock = false;
            svCursorMouse.initStandartCursor();
        }

        if (drag) {
            removeEventListener(document, "mouseup", 'action_process_');
            removeEventListener(document, "mousemove", 'action_process_');
            removeEventListener(document, "touchend", 'action_process_');
            removeEventListener(document, "touchmove", 'action_process_');

            drag = false;
        }

        if (popup.tag) {
            removeEventListener(input, "click", "popup_");
        }

        if (input) {
            removeEventListener(input, "click", 'input_edit_');
            removeEventListener(input, "change", 'input_edit_');
            removeEventListener(input, "keyup", 'input_edit_');
            removeEventListener(input, "keypress", 'input_edit_');
        }

        // remove popup close and resize events if this picker include them erlier
        if (KellyColorPicker.popupEventsInclude && events['popup_close_click']) {
            if (KellyColorPicker.activePopUp)
                KellyColorPicker.activePopUp.popUpClose(false);

            removeEventListener(document, "click", 'popup_close_');
            removeEventListener(window, "resize", 'popup_resize_');

            KellyColorPicker.popupEventsInclude = false;
        }

        wheel.imageData = null;
        svFig.imageData = null;
        canvasHelperData = null;
        canvasHelper = null;

        if (place && place.parentNode) {
            place.parentNode.removeChild(place);
        }

        if (resizeWith) {
            removeEventListener(window, "resize", 'canvas_');
        }

        disableEvents(); // remove canvas events		

        // debug test for check is all events removed 
        // for (var key in events) {
        // 	console.log('key : ' +  key + ' data ' + events[key]);
        // }

        handler = null;
    };

    constructor(cfg);
}

window.KellyColorPicker = KellyColorPicker;

/* static methods */

/**
 * Тригер для объектов KellyColorPicker, чтобы не сбрасывали стиль курсора при наведении если уже идет выбор цвета
 * Notice : при выходе курсора за границы текущего canvas, событие неизвестного объекта всегда может сбросить изображение курсора
 */

KellyColorPicker.cursorLock = false; // можно указывать handler объекта
KellyColorPicker.activePopUp = false;
KellyColorPicker.popupEventsInclude = false; // include events for document and window once for all elements

KellyColorPicker.attachToInputByClass = function (className, cfg) {

    var colorPickers = new Array();
    var inputs = document.getElementsByClassName(className);


    for (var i = 0; i < inputs.length; i++) {

        if (cfg)
            cfg.input = inputs[i];
        else
            cfg = {input: inputs[i], size: 150};

        colorPickers.push(new KellyColorPicker(cfg));
    }

    return colorPickers;
};

// KellyColorPicker.dragTrigger = false;
