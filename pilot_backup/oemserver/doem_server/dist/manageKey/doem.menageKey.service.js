"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoemManageKeySrevice = void 0;
const common_1 = require("@nestjs/common");
const node_gcm = require("node-gcm");
let DoemManageKeySrevice = class DoemManageKeySrevice {
    constructor() { }
    async manageKeyStartLogger(keyID, vehicleOemId, x_timestamp, action) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===    [Device OEM Server] manageKey API 요청됨    ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[manageKey API] manageKey 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('keyId              : ' + keyID);
        common_1.Logger.log('x-vehicle-oemId    : ' + vehicleOemId);
        common_1.Logger.log('x-timestamp        : ' + x_timestamp);
        common_1.Logger.log('action             : ' + action);
        common_1.Logger.log('==============================================================================');
    }
    async fcmPushService(serverKey, regToken, pushData) {
        let sender = new node_gcm.Sender(serverKey);
        let regTokenArr = [regToken];
        let message = new node_gcm.Message({
            data: { key1: pushData }
        });
        let resultObj = {};
        sender.send(message, { registrationTokens: regTokenArr }, function (err, response) {
            if (err) {
                common_1.Logger.error(err);
                resultObj['code'] = '-1';
                resultObj['data'] = err;
            }
            else {
                common_1.Logger.log(response);
                resultObj['code'] = '-1';
                resultObj['data'] = response;
            }
            return resultObj;
        });
    }
};
DoemManageKeySrevice = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], DoemManageKeySrevice);
exports.DoemManageKeySrevice = DoemManageKeySrevice;
//# sourceMappingURL=doem.menageKey.service.js.map