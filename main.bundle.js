webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div [hidden]=\"message == ''\" class=\"toaster\">\n  {{message}}\n</div>\n\n<div style=\"height: 100vh\" fxLayout=\"row\">\n  <div style=\"height: 100%; position: relative\" fxLayoutAlign=\"center center\" fxFlex=\"50\" fxLayout=\"row\">\n    <!--<div class=\"sliderGroup\" style=\"border: solid red\" fxLayout=\"column\" fxFlex=\"40\">-->\n    <div fxFlex=\"40\" style=\"height: 95%; width: 100%\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\n      <div fxFlex=\"30\" style=\"width: 70%; margin-top: 10%\">\n        <img class='image2' src=\"assets/bulb.png\">\n      </div>\n      <div fxFlex=\"10\" style=\"margin-top:20%\">\n        <mat-slide-toggle style=\"width: 100%\" [checked]=\"lightOn\"\n                          (change)=\"onLightSwitch()\"></mat-slide-toggle>\n      </div>\n      <div id=\"color\" style=\"width: 70%; height: 150px\"></div>\n\n      <!--<input id=\"color\" value=\"#54aedb\" style=\"width: 70%; height: 50px\">-->\n      <div id=\"colorPicker\" fxFlex=\"50\" style=\"margin-top: 15%;\">\n        <canvas id=\"picker\"></canvas>\n      </div>\n    </div>\n    <div style=\"height: 95%\">\n      <div class=\"img\" fxFlex style=\"position: relative\">\n        <div style=\"width: 18%; left: 40%; top:7%; height: 12%; position: absolute\" (click)=\"reloadPage()\"></div>\n        <div [hidden]=\"powerConsumption == undefined\"\n             style=\"width: 80%; top:20%;  margin-left: 10%; position: absolute; text-align: center; font-size: 14vh; color:white; font-family: 'Barlow Condensed', sans-serif;\">\n          {{powerConsumption}}\n        </div>\n        <div [hidden]=\"powerConsumption == undefined\"\n             style=\"width: 80%; top:37%;  margin-left: 10%; position: absolute; text-align: center; font-size: 4vh; color:white; font-family: 'Barlow Condensed', sans-serif;\">\n          Watts\n        </div>\n        <div></div>\n        <div [hidden]=\"!doorOpened\"\n             style=\"width: 40%; top:50%;  margin-left: 30%; position: absolute; text-align: center; font-size: 5vh; color:white; font-family: 'Barlow Condensed', sans-serif;\">\n          <img class=\"img\" src=\"assets/doorOpened.png\">\n        </div>\n        <img class=\"img\" src=\"assets/fridge.png\">\n      </div>\n    </div>\n  </div>\n  <div\n    style=\"height: 100%; overflow-y: scroll; font-family: 'Barlow Condensed', sans-serif; font-size: 2vh;\"\n    fxFlex=\"50\">\n\n    <div *ngFor=\"let shelf of shelves\" style=\"height: 25%;\" fxLayout=\"row\">\n      <!--<div style=\"width: 50px; height: 100%;\">-->\n        <!--<div [hidden]=\"!shelf.favImg\" style=\"height: 100%\">-->\n          <!--<img class='image2' style=\"cursor: pointer; width: 30px; height: 30px; position: relative;top: 50%;transform: translateY(-50%);\"-->\n               <!--src=\"{{shelf.favImg}}\"-->\n               <!--(click)=\"favToggle(shelf)\">-->\n        <!--</div>-->\n      <!--</div>-->\n      <div class=\"bckImg\" fxFlex=\"100\"\n           style=\"margin-top: 5px; margin-bottom: 5px; border-bottom: solid 1px #bdbdbd; padding-right: 10px; padding-left: 10px; position: relative\"\n           fxLayout=\"row\">\n        <div fxFlex=\"20\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\n          <!--<div fxFlex=\"70\" style=\"width: 70%; height: 70%; padding-top: 2rem\">-->\n            <!--<img class='image' src=\"../assets/id1.png\">-->\n          <!--</div>-->\n          <div [hidden]=\"!shelf.shelfID\" fxFlex=\"80\" class=\"idFont\" style=\"text-align: center\"\n               fxLayoutAlign=\"center center\">\n            {{shelf.shelfID}}\n          </div>\n        </div>\n        <!--<div fxFlex=\"20\" fxLayout=\"column\" fxLayoutAlign=\"center center\" style=\"height: 100%; border: 1px solid red\">-->\n          <!--<div fxFlex=\"70\" style=\"width: 70%; height: 70%;  padding-top: 2rem; position: relative; border: 1px solid green\">-->\n            <!--<img class='image' src=\"assets/weight.png\" style=\"border: 1px solid blue\">-->\n          <!--</div>-->\n          <!--<div fxFlex=\"30\" class=\"fonts\" style=\"text-align: center\" fxLayoutAlign=\"center center\">-->\n            <!--{{shelf.temperature}}-->\n            <!--<div [hidden]=\"!shelf.temperature\">F</div>-->\n            <!--<div [hidden]=\"shelf.temperature\">-&#45;&#45;</div>-->\n          <!--</div>-->\n        <!--</div>-->\n        <div fxFlex=\"20\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\n          <div fxFlex=\"70\" style=\"width: 70%; height: 70%; padding-top: 2rem; position: relative\">\n            <img class='image' src=\"{{shelf.tempImg}}\">\n          </div>\n          <div [hidden]=\"!shelf.weight\" fxFlex=\"30\" class=\"fonts\" style=\"text-align: center\"\n               fxLayoutAlign=\"center center\">\n            {{shelf.temperature}}\n            <div [hidden]=\"shelf.temperature == undefined\">&nbsp;F</div>\n            <div [hidden]=\"shelf.temperature != undefined\">---</div>\n          </div>\n        </div>\n        <div fxFlex=\"20\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\n          <div fxFlex=\"70\" style=\"width: 70%; height: 70%; padding-top: 2rem; position: relative\">\n            <img class='image' src=\"assets/weight.png\">\n          </div>\n          <div [hidden]=\"!shelf.weight\" fxFlex=\"30\" class=\"fonts\" style=\"text-align: center\"\n               fxLayoutAlign=\"center center\">\n            {{shelf.weight}}\n            <div [hidden]=\"shelf.weight == undefined\">&nbsp;lbs</div>\n            <div [hidden]=\"shelf.weight != undefined\">---</div>\n          </div>\n        </div>\n\n        <div fxFlex=\"20\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\n          <div fxFlex=\"70\" style=\"width: 70%; height: 70%; padding-top: 2rem; position: relative\">\n            <img class='image' src=\"assets/humidity.png\">\n          </div>\n          <div [hidden]=\"!shelf.humidity\" fxFlex=\"30\" class=\"fonts\" style=\"text-align: center;\"\n               fxLayoutAlign=\"center center\">\n            {{shelf.humidity}}\n            <div [hidden]=\"shelf.humidity == undefined\">&nbsp;% RH</div>\n            <div [hidden]=\"shelf.humidity != undefined\">---</div>\n          </div>\n        </div>\n\n        <div fxFlex=\"20\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\n          <div fxFlex=\"70\" style=\"width: 70%; height: 70%; padding-top: 3rem; position: relative\">\n            <img class='image' src=\"{{shelf.batteryImg}}\">\n          </div>\n          <div [hidden]=\"!shelf.battery\" fxFlex=\"30\" class=\"fonts\" style=\"text-align: center;\"\n               fxLayoutAlign=\"center center\">\n            {{shelf.battery}}\n            <div [hidden]=\"shelf.battery == undefined\">&nbsp;%</div>\n            <div [hidden]=\"shelf.battery != undefined\">---</div>\n          </div>\n        </div>\n\n      </div>\n\n    </div>\n\n\n  </div>\n</div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_util_service__ = __webpack_require__("../../../../../src/app/common/util.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__devices_fridge_service__ = __webpack_require__("../../../../../src/app/devices/fridge.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    function AppComponent(us, fs, http) {
        this.us = us;
        this.fs = fs;
        this.http = http;
        this.reloadPage = function () {
            window.location.reload();
        };
        // favToggle = function (shelf) {
        //   shelf.favorite = !shelf.favorite;
        //   shelf.favImg = this.us.getFavIconImg(shelf.favorite);
        //   this.shelves = this.us.sortAllDevices(this);
        // };
        // removeStoredShelf = function (shelf) {
        //   var storedArray = [];
        //   for (var i = 0; i < this.storedShelves.length; i++) {
        //     if (this.storedShelves[i].shelfID != shelf.shelfID) {
        //       storedArray.push(this.storedShelves[i].shelfID);
        //     } else {
        //       this.storedShelves.splice(i, 1);
        //     }
        //   }
        //   localStorage.setItem('storedShelves', JSON.stringify(storedArray));
        //   this.shelves = this.us.sortAllDevices(this);
        // };
        this.showMessage = function (message) {
            var _this = this;
            this.message = message;
            setTimeout(function () {
                _this.message = '';
            }, 3000);
        };
        // ipc: PROP INDICATION nfc.event =
        //   { status: 'readdone',
        //     data:
        //     { tech: 'V',
        //       uidtype: 'NFCID2',
        //       uid: '8D9E0703000007E0',
        //       hasndef: 'yes',
        //       ndefype: 'text',
        //       ndeftext: '{"blueapp":{"uuid":"d6:2a:38:bb:11:e5"}}',
        //       ndefraw: 'D1012B5402656E7B22626C7565617070223A7B2275756964223A2264363A32613A33383A62623A31313A6535227D7D' } }
        this.checkForNfcEvent = function () {
            var _this = this;
            this.http.get('localhost:3891/v1/events')
                .subscribe(function (res) {
                console.log(res);
                try {
                    var data = res.json();
                    console.log(data);
                    var events = data.events;
                    for (var i = 0; i < events.length; i++) {
                        if (events[i].type == "nfc.event") {
                            if (events[i].event.status == "readdone") {
                                if (events[i].event.data.hasOwnProperty('ndftext')) {
                                    var ndftext = events[i].event.data.ndftext;
                                    try {
                                        var ndfObj = JSON.parse(ndftext);
                                        if (ndfObj.hasOwnProperty('blueapp')) {
                                            var uuidObj = ndfObj.blueapp;
                                            if (uuidObj.hasOwnProperty('uuid')) {
                                                var uuid = uuidObj.uuid;
                                                var status = _this.us.updateNfcAddedDevice(_this, uuid);
                                                if (status == 'added') {
                                                    _this.showMessage("Added device " + uuid + " with NFC tag");
                                                }
                                                else {
                                                    _this.showMessage('Removed device ' + uuid + ' with NFC tag');
                                                }
                                            }
                                        }
                                    }
                                    catch (error) {
                                        console.warn('NFC parse error: ', error);
                                    }
                                }
                                // var uuid = events[i].event.data.uuid;
                            }
                        }
                    }
                }
                catch (err) {
                    console.warn('NFC error ', err);
                }
                _this.checkForNfcEvent();
            }, function (res) {
                console.log(res);
            });
        };
        this.onLightSwitch = function () {
            if (!this.lightOn) {
                this.lightOn = true;
                this.colorPicker.setColorByHex('#00ff01');
            }
            else {
                this.lightOn = false;
                this.colorPicker.setColorByHex('#000000');
            }
        };
        this.shelves = [];
        // this.storedShelves = [];
        this.lightOn = false;
        this.message = '';
        this.doorOpened = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        // Picking up url parameters
        var pl = /\+/g, // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g, decode = function (s) {
            return decodeURIComponent(s.replace(pl, ' '));
        }, query = window.location.search.substring(1), urlParams = {};
        var match;
        while (match = search.exec(query)) {
            urlParams[decode(match[1])] = decode(match[2]);
        }
        var config = {
            token: urlParams['token'],
            proxyUrl: urlParams['proxyUrl'],
            smartBulbUuid: urlParams['smartBulbUuid'],
            doorUuid: urlParams['doorUUID'],
            shelfUuid: urlParams['shelfUuid'],
            environment: urlParams['env']
        };
        if ('bluetooth' in navigator) {
            this.navigator = navigator;
        }
        if ('createSmartFridge' in window) {
            this.window = window;
        }
        // Importing color picker
        this.colorPicker = new this.window.KellyColorPicker({
            place: 'picker',
            input: 'color',
        });
        var colorDiv = document.getElementById('color');
        this.colorPicker.resize(window.innerWidth / 6.5);
        var powerSubject = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["a" /* Subject */]();
        var doorSubject = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["a" /* Subject */]();
        var bulbSubject = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["a" /* Subject */]();
        powerSubject.subscribe({
            next: function (value) {
                self.powerConsumption = value;
            }
        });
        doorSubject.subscribe({
            next: function (value) {
                self.doorOpened = value;
            }
        });
        // this.storedShelves = this.us.readStoredShelves();
        // this.us.sortAllDevices(this);
        localStorage.setItem('storedShelves', JSON.stringify(['83:C8', '11:E5', '13:49']));
        this.shelves = this.us.initStoredShelves();
        this.fs.fridgeServiceSubscription(this, config, powerSubject, doorSubject, bulbSubject);
        var addPickerUserEvent = function () {
            _this.colorPicker.addUserEvent('change', function (value) {
                var selectedColor = value.getCurColorHex();
                colorDiv.style.backgroundColor = selectedColor;
                bulbSubject.next(selectedColor);
            });
        };
        addPickerUserEvent();
        // if (config.token === "local"){
        console.log("It's a local server!");
        this.checkForNfcEvent();
        // }
        // if ((location.hostname === "localhost" || location.hostname === "127.0.0.1") && location.port === "4200"){
        //   console.log("It's a local server!");
        //   this.checkForNfcEvent();
        // }
        // setInterval(()=> {
        //   var status = this.us.updateNfcAddedDevice(this, "17:ED");
        //   if(status == 'added'){
        //     this.showMessage("Added device "+"17:ED"+" with NFC tag");
        //   } else {
        //     this.showMessage('Removed device '+"17:ED"+' with NFC tag');
        //   }
        //   // this.shelves = this.us.sortAllDevices(this);
        // },10000);
        // // Adding mock shelves
        // var fakeShelf1 = {
        //   'shelfID': this.us.sliceShelfUUID('AB:DC'),
        //   'battery': 28,
        //   'weight': 54.3,
        //   'temperature': this.us.celsiusToFahrenheit(2.11),
        //   'humidity': '13',
        //   'tempImg': this.us.getTempImgSrc(2.11),
        //   'batteryImg': this.us.getBatteryImgSrc(28),
        //   'favorite': false,
        //   'favImg': this.us.getFavIconImg(false)
        // };
        //
        // var fakeShelf2 = {
        //   'shelfID': this.us.sliceShelfUUID('1B:CS'),
        //   'battery': 98,
        //   'weight': 34.3,
        //   'temperature': this.us.celsiusToFahrenheit(-2.04),
        //   'humidity': '22',
        //   'tempImg': this.us.getTempImgSrc(-2.04),
        //   'batteryImg': this.us.getBatteryImgSrc(98),
        //   'favorite': false,
        //   'favImg': this.us.getFavIconImg(false)
        // };
        //
        // var fakeShelf3 = {
        //   'shelfID': this.us.sliceShelfUUID('TS:CW'),
        //   'battery': 11,
        //   'weight': 13.3,
        //   'temperature': this.us.celsiusToFahrenheit(22.11),
        //   'humidity': '65',
        //   'tempImg': this.us.getTempImgSrc(22.11),
        //   'batteryImg': this.us.getBatteryImgSrc(11),
        //   'favorite': false,
        //   'favImg': this.us.getFavIconImg(false)
        // };
        //
        // var fakeShelf4 = {
        //   'shelfID': this.us.sliceShelfUUID('BS:IU'),
        //   'battery': 44,
        //   'weight': 10.3,
        //   'temperature': this.us.celsiusToFahrenheit(1.11),
        //   'humidity': '87',
        //   'tempImg': this.us.getTempImgSrc(1.11),
        //   'batteryImg': this.us.getBatteryImgSrc(44),
        //   'favorite': false,
        //   'favImg': this.us.getFavIconImg(false)
        // };
        //
        // var fakeShelf5 = {
        //   'shelfID': this.us.sliceShelfUUID('F2:4G'),
        //   'battery': 66,
        //   'weight': 14.3,
        //   'temperature': this.us.celsiusToFahrenheit(7.7),
        //   'humidity': '32',
        //   'tempImg': this.us.getTempImgSrc(7.7),
        //   'batteryImg': this.us.getBatteryImgSrc(66),
        //   'favorite': false,
        //   'favImg': this.us.getFavIconImg(false)
        // };
        // var fakeShelves = [fakeShelf1, fakeShelf2, fakeShelf3, fakeShelf4, fakeShelf5 ];
        //
        // var i = 0;
        // var addShelves = setInterval(() => {
        //   if(i<5){
        //     this.us.updateShelves(this, fakeShelves[i]);
        //     i++;
        //   } else {
        //     clearInterval(addShelves);
        //   }
        // },4000);
        // var stored = ['11:E5','83:C8'];
        // localStorage.setItem('storedShelves', JSON.stringify(stored));
        // this.storedShelves = JSON.parse(localStorage.getItem("storedShelves"));
        // console.log(this.storedShelves);
        setInterval(function () {
        }, 100);
        // Door open/close test
        // this.doorOpened = false;
        // setInterval(() => {
        //   this.doorOpened = !this.doorOpened;
        // },2000);
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__common_util_service__["a" /* UtilService */],
            __WEBPACK_IMPORTED_MODULE_2__devices_fridge_service__["a" /* FridgeService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_util_service__ = __webpack_require__("../../../../../src/app/common/util.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__devices_fridge_service__ = __webpack_require__("../../../../../src/app/devices/fridge.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material_slider__ = __webpack_require__("../../../material/esm5/slider.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["H" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* JsonpModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["a" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["d" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__["a" /* FlexLayoutModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["b" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material_slider__["a" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["c" /* MatSlideToggleModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_6__common_util_service__["a" /* UtilService */], __WEBPACK_IMPORTED_MODULE_7__devices_fridge_service__["a" /* FridgeService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/common/util.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UtilService = (function () {
    function UtilService() {
        this.newShelf = function (event) {
            var shelfObj = {};
            if (event.weightLbs < 0) {
                shelfObj['weight'] = '---';
            }
            else {
                shelfObj['weight'] = Math.round(event.weightLbs * 100) / 100;
            }
            shelfObj['shelfID'] = this.sliceShelfUUID(event.id);
            shelfObj['raw'] = event.hexData;
            shelfObj['battery'] = event.battery;
            shelfObj['temperature'] = this.celsiusToFahrenheit(event.tempC);
            shelfObj['humidity'] = event.humidityRh;
            shelfObj['voltage'] = event.adcVoltage;
            shelfObj['tempImg'] = this.getTempImgSrc(event.tempC);
            shelfObj['batteryImg'] = this.getBatteryImgSrc(event.battery);
            // shelfObj['favImg'] = this.getFavIconImg(false);
            return shelfObj;
        };
        this.initStoredShelves = function () {
            var storedShelves = this.readStoredDevice("storedShelves");
            var storedShelvesArray = [];
            if (storedShelves && storedShelves.length > 0) {
                for (var i = 0; i < storedShelves.length; i++) {
                    var storedShelf = {};
                    storedShelf['shelfID'] = storedShelves[i];
                    storedShelf['saved'] = true;
                    storedShelf['favImg'] = "";
                    storedShelf['tempImg'] = "assets/temp-unknown.png";
                    storedShelf['batteryImg'] = "assets/battUnknown.png";
                    storedShelvesArray.push(storedShelf);
                }
            }
            storedShelvesArray.sort(UtilService_1.sortArrayByParameter("shelfID"));
            return storedShelvesArray;
        };
        this.updateShelves = function (obj, newShelf) {
            var shelfExists = false;
            var shelfId;
            for (var i = 0; i < obj.shelves.length; i++) {
                if (obj.shelves[i].shelfID == newShelf['shelfID']) {
                    shelfExists = true;
                    shelfId = i;
                }
            }
            if (shelfExists) {
                // if (obj.shelves[shelfId].saved) {
                //   UtilService.updateStoredShelf(obj, newShelf);
                // } else {
                obj.shelves[shelfId] = newShelf;
                // }
            }
            // } else {
            // newShelf['favorite'] = false;
            // obj.shelves.push(newShelf);
            // }
            // obj.shelves = this.sortAllDevices(obj);
        };
        this.updateNfcAddedDevice = function (obj, uuid) {
            var shelfExists = false;
            var shortID = this.sliceShelfUUID(uuid);
            var shelfArrayPosition;
            var status;
            var storedShelves = this.readStoredDevice("storedShelves");
            if (!storedShelves) {
                storedShelves = [];
            }
            if (storedShelves.length > 0) {
                for (var i = 0; i < storedShelves.length; i++) {
                    if (storedShelves[i] == shortID) {
                        shelfExists = true;
                        shelfArrayPosition = i;
                        break;
                    }
                }
            }
            if (shelfExists) {
                storedShelves.splice(shelfArrayPosition, 1);
                status = 'removed';
                for (var j = 0; j < obj.shelves.length; j++) {
                    if (obj.shelves[j].shelfID === shortID) {
                        obj.shelves.splice(j, 1);
                        break;
                    }
                }
            }
            else {
                storedShelves.push(shortID);
                var storedShelf = {};
                storedShelf['shelfID'] = storedShelves[i];
                storedShelf['saved'] = true;
                storedShelf['favImg'] = "";
                storedShelf['tempImg'] = "assets/temp-unknown.png";
                storedShelf['batteryImg'] = "assets/battUnknown.png";
                obj.shelves.push(storedShelf);
                status = 'added';
            }
            this.saveDevice("storedShelves", storedShelves);
            // obj.storedShelves = obj.shelves;
            obj.shelves.sort(UtilService_1.sortArrayByParameter("shelfID"));
            return status;
        };
        // static splitByFavorite = function (shelves) {
        //   var favArray = [];
        //   var notFavArray = [];
        //   for(var i=0; i<shelves.length; i++){
        //     if(!shelves[i].saved){
        //       if(shelves[i].favorite){
        //         favArray.push(shelves[i]);
        //       } else {
        //         notFavArray.push(shelves[i]);
        //       }
        //     }
        //   }
        //   favArray.sort(UtilService.sortArrayByParameter("shelfID"));
        //   notFavArray.sort(UtilService.sortArrayByParameter("shelfID"));
        //   return({fav: favArray, notFav: notFavArray});
        // };
        // sortAllDevices = function (obj) {
        //   var splittedByFavorite = UtilService.splitByFavorite(obj.shelves);
        //   var favoritesArray = splittedByFavorite.fav;
        //   var notFavoritesArray = splittedByFavorite.notFav;
        //  
        //   var notStoredShelves = favoritesArray.concat(notFavoritesArray);
        //   return obj.storedShelves.concat(notStoredShelves);
        //   return obj.storedShelves;
        // };
        // static updateStoredShelf(obj, newShelf){
        //   for (var i = 0; i < obj.storedShelves.length; i++) {
        //     if (obj.storedShelves[i].shelfID == newShelf.shelfID) {
        //       obj.storedShelves[i] = newShelf;
        //       obj.storedShelves[i].saved = true;
        //       obj.storedShelves[i].favImg = '';
        //     }
        //   }
        // }
        // getFavIconImg = function (favorite) {
        //   if(favorite){
        //     return "assets/favOn.png";
        //   } else if(!favorite){
        //     return "assets/favOff.png";
        //   }
        // };
        this.getTempImgSrc = function (temp) {
            if (temp < 0.5) {
                return "assets/temp-min.png";
            }
            else if (temp >= 0.5 && temp < 7.5) {
                return "assets/temp-normal.png";
            }
            else {
                return "assets/temp-max.png";
            }
        };
        this.getBatteryImgSrc = function (battery) {
            if (battery < 10) {
                return "assets/batt0.png";
            }
            else if (battery >= 10 && battery < 35) {
                return "assets/batt1.png";
            }
            else if (battery >= 35 && battery < 60) {
                return "assets/batt2.png";
            }
            else if (battery >= 60 && battery < 85) {
                return "assets/batt3.png";
            }
            else {
                return "assets/batt4.png";
            }
        };
        this.sliceShelfUUID = function (uuid) {
            var slicedId = uuid.slice(-5);
            if (slicedId.indexOf(':') == -1) {
                return slicedId.slice(-4);
            }
            else {
                return slicedId;
            }
        };
        this.celsiusToFahrenheit = function (tempC) {
            return Math.round(((tempC * 9) / 5 + 32) * 100) / 100;
        };
        this.readStoredDevice = function (deviceType) {
            return JSON.parse(localStorage.getItem(deviceType));
        };
        this.saveDevice = function (deviceType, data) {
            localStorage.setItem(deviceType, JSON.stringify(data));
        };
        this.rgbToHex = function (r, g, b) {
            return "#" + UtilService_1.componentToHex(r) + UtilService_1.componentToHex(g) + UtilService_1.componentToHex(b);
        };
    }
    UtilService_1 = UtilService;
    UtilService.sortArrayByParameter = function (property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    };
    UtilService.componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };
    UtilService = UtilService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], UtilService);
    return UtilService;
    var UtilService_1;
}());



/***/ }),

/***/ "../../../../../src/app/devices/fridge.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FridgeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_util_service__ = __webpack_require__("../../../../../src/app/common/util.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FridgeService = (function () {
    function FridgeService(us) {
        this.us = us;
        this.fridgeServiceSubscription = function (obj, urlConf, powerSubject, doorSubject, bulbSubject) {
            var _this = this;
            var debug = false;
            var config;
            if (urlConf.environment) {
                config = obj.window.createConfig(urlConf.environment);
            }
            else {
                config = obj.window.createConfig();
                if (urlConf.token) {
                    config.token = urlConf.token;
                }
                if (urlConf.proxyUrl) {
                    config.url = urlConf.proxyUrl;
                }
            }
            var smartFridge = obj.window.createSmartFridge(config);
            smartFridge.on('error', function (err) {
                console.error(">>> SmartShelf Service Error:", err);
            });
            smartFridge.on('shelfData', function (data) {
                var newShelf = _this.us.newShelf(data);
                _this.us.updateShelves(obj, newShelf);
            });
            smartFridge.on('scaleData', function (data) {
            });
            smartFridge.on('doorData', function (data) {
                doorSubject.next(data.doorOpened);
            });
            smartFridge.on('powerData', function (data) {
                powerSubject.next(Math.round(data.powerConsumptionMilliWatts / 1000 * 100) / 100);
            });
            smartFridge.on('bulbData', function (data) {
                var hexColor = _this.us.rgbToHex(data.color.r, data.color.g, data.color.b);
                obj.colorPicker.setColorByHex(hexColor);
                obj.lightOn = (hexColor != '#000000');
            });
            bulbSubject.subscribe({
                next: function (value) {
                    obj.lightOn = (value != '#000000');
                    smartFridge.setBulbColor(value);
                }
            });
        };
    }
    FridgeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__common_util_service__["a" /* UtilService */]])
    ], FridgeService);
    return FridgeService;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");





if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map