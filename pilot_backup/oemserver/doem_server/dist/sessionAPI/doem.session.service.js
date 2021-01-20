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
exports.DoemSessionService = void 0;
const common_1 = require("@nestjs/common");
const node_gcm = require("node-gcm");
let DoemSessionService = class DoemSessionService {
    constructor() { }
    async generateSharingSessionStartLogger(requestId, deviceOemId, KeyId) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===     [Device OEM Server] generateSharingSession API 요청됨     ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('x-requestid           : ' + requestId);
        common_1.Logger.log('x-device-oemid        : ' + deviceOemId);
        common_1.Logger.log('KeyId                 : ' + KeyId);
        common_1.Logger.log('==============================================================================');
    }
    async redeemSharingSessionStartLogger(sharingSession, friendDeviceHandle) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===      [Device OEM Server] redeemSharingSession API 요청됨      ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log("sharingSession : " + sharingSession);
        common_1.Logger.log("friendDeviceHandle : " + friendDeviceHandle);
        common_1.Logger.log('[redeemSharingSession API] redeemSharingSession API가 Device에서 호출됨');
    }
    async eventNotificationStartLogger(requestId, vehicleOemId, ownerKeyId, eventType, eventData) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===       [Device OEM Server] EventNotification API 요청됨       ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[EventNotification API] EventNotification 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('requestId    : ' + requestId);
        common_1.Logger.log('VehicleOemId : ' + vehicleOemId);
        common_1.Logger.log('keyID        : ' + ownerKeyId);
        common_1.Logger.log('eventType    : ' + eventType);
        common_1.Logger.log('eventData    : ' + eventData);
    }
    async createSharedKey(keyAction, x_timestamp, voemDomain, requestId, deviceOemId, keyID, sharingSession, keyCreationRequest) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===    [Device OEM Server] createSharedKey API 요청됨    ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[createSharedKey API] createSharedKey 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('keyID              : ' + keyID);
        common_1.Logger.log('x_timestamp        : ' + x_timestamp);
        common_1.Logger.log('requestId          : ' + requestId);
        common_1.Logger.log('deviceOemId        : ' + deviceOemId);
        common_1.Logger.log('sharingSession     : ' + sharingSession);
        common_1.Logger.log('keyCreationRequest : ' + keyCreationRequest);
        common_1.Logger.log('Voem URL           : ' + voemDomain + '/session/keySharingExchange');
        common_1.Logger.log('==================================================================');
        let http = new common_1.HttpService();
        let data = { 'keyAction': keyAction, 'keyID': keyID, 'sharingSession': sharingSession, 'keyCreationRequest': keyCreationRequest };
        let httpPostResult = await http.post(voemDomain + '/session/keySharingExchange', data, {
            headers: {
                'x-timestamp': x_timestamp,
                'x-requestid': requestId,
                'x-device-oemid': deviceOemId
            },
            method: 'POST',
            data: null
        }).toPromise()
            .catch(e => {
            common_1.Logger.error('[keySharingExchange API] Vehicle OEM 으로의 keySharingExchange 요청 실패');
            common_1.Logger.error(e);
            throw new common_1.HttpException(e, 567);
        });
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('=== [Device OEM Server] createSharedKey API 요청됨===');
        common_1.Logger.log('==================================================================');
        return httpPostResult.data;
    }
    async signSharedKey(keyAction, x_timestamp, voemDomain, requestId, deviceOemId, sharingSession, keyCreationRequest) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===    [Device OEM Server] signSharedKey API 요청됨    ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[signSharedKey API] signSharedKey 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('x_timestamp        : ' + x_timestamp);
        common_1.Logger.log('requestId          : ' + requestId);
        common_1.Logger.log('deviceOemId        : ' + deviceOemId);
        common_1.Logger.log('sharingSession     : ' + sharingSession);
        common_1.Logger.log('keyCreationRequest : ' + keyCreationRequest);
        common_1.Logger.log('Voem URL           : ' + voemDomain + '/session/keySharingExchange');
        common_1.Logger.log('==================================================================');
        let http = new common_1.HttpService();
        let data = { 'keyAction': keyAction, 'sharingSession': sharingSession, 'keyCreationRequest': keyCreationRequest };
        let httpPostResult = await http.post(voemDomain + '/session/keySharingExchange', data, {
            headers: {
                'x-timestamp': x_timestamp,
                'x-requestid': requestId,
                'x-device-oemid': deviceOemId
            },
            method: 'POST',
            data: null
        }).toPromise()
            .catch(e => {
            common_1.Logger.error('[keySharingExchange API] Vehicle OEM 으로의 keySharingExchange 요청 실패');
            common_1.Logger.error(e);
            throw new common_1.HttpException(e, 567);
        });
        return httpPostResult.data;
    }
    async importSharedKey(keyAction, x_timestamp, voemDomain, requestId, deviceOemId, keyID, sharingSession, keyCreationRequest) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===    [Device OEM Server] importSharedKey API 요청됨    ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[keySharingExchange API] importSharedKey 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('keyID              : ' + keyID);
        common_1.Logger.log('x_timestamp        : ' + x_timestamp);
        common_1.Logger.log('requestId          : ' + requestId);
        common_1.Logger.log('deviceOemId        : ' + deviceOemId);
        common_1.Logger.log('sharingSession     : ' + sharingSession);
        common_1.Logger.log('keyCreationRequest : ' + keyCreationRequest);
        common_1.Logger.log('Voem URL           : ' + voemDomain + '/session/keySharingExchange');
        common_1.Logger.log('==================================================================');
        let http = new common_1.HttpService();
        let data = { 'keyAction': keyAction, 'keyID': keyID, 'sharingSession': sharingSession, 'keyCreationRequest': keyCreationRequest };
        let httpPostResult = await http.post(voemDomain + '/session/keySharingExchange', data, {
            headers: {
                'x-timestamp': x_timestamp,
                'x-requestid': requestId,
                'x-device-oemid': deviceOemId
            },
            method: 'POST',
            data: null
        }).toPromise()
            .catch(e => {
            common_1.Logger.error('[keySharingExchange API] Vehicle OEM 으로의 keySharingExchange 요청 실패 ');
            common_1.Logger.error(e);
            throw new common_1.HttpException(e, 567);
        });
        return httpPostResult.data;
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
    async slackPushService(channelName, userName, text, icon_emoji, pushCreateTime, friend_handle) {
        let http = new common_1.HttpService();
        let data = { 'channel': channelName, 'username': userName, 'text': '[' + pushCreateTime + '] ' + text, 'icon_emoji': icon_emoji };
        let httpResult = await http.post('https://hooks.slack.com/services/' + friend_handle, data, {
            headers: {
                'Content-Type': 'urlencode'
            },
            method: 'POST',
            data: null
        }).toPromise()
            .catch(e => {
            common_1.Logger.error('[createSharedKey API] 2. Vehicle OEM Server에서 createSharedKey API를 Device OEM Server로 호출 실패');
            throw new common_1.HttpException(e, 555);
        });
    }
};
DoemSessionService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], DoemSessionService);
exports.DoemSessionService = DoemSessionService;
//# sourceMappingURL=doem.session.service.js.map