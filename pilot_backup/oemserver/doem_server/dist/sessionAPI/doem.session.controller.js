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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoemSessionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swaggerObj = require("./entity/doem.session.swagger.object");
const doem_session_service_1 = require("./doem.session.service");
const crypto = require("crypto");
let DoemSessionController = class DoemSessionController {
    constructor(sessionService, http) {
        this.sessionService = sessionService;
        this.http = http;
    }
    async generateSharingSession(requestId, deviceOemId, KeyId, res) {
        common_1.Logger.error('test!!!!!!!');
        await this.sessionService.generateSharingSessionStartLogger(requestId, deviceOemId, KeyId);
        let data = { 'KeyId': KeyId };
        let result = await this.http.post('http://localhost:3000/session/generateSharingSession', data, {
            headers: {
                'Content-Type': 'application/json',
                'x-requestid': requestId,
                'x-device-oemid': deviceOemId
            },
            method: 'POST',
            data: null
        }).toPromise()
            .catch(e => {
            common_1.Logger.error('[generateSharingSession API] 2. 해당 Key ID  로 Vehicle OEM Server에 generateSharingSession 요청 실패');
            throw new common_1.HttpException(e, 555);
        });
        res.set('x-responseId', requestId);
        res.send(result.data);
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[generateSharingSession API] => Vehicle OEM Server에 ' + result.data + ' 정보 전달');
        common_1.Logger.log('[generateSharingSession API] 2. 해당 Key ID  로 Vehicle OEM Server에 generateSharingSession 요청 성공');
        common_1.Logger.log('==============================================================================');
    }
    async redeemSharingSession(requestId, sharingSession, friendDeviceHandle, res) {
        common_1.Logger.error('test!!');
        await this.sessionService.redeemSharingSessionStartLogger(sharingSession, friendDeviceHandle);
        let data = { 'sharingSession': sharingSession, 'friendDeviceHandle': friendDeviceHandle };
        let result = await this.http.post('http://localhost:3000/session/redeemSharingSession', data, {
            headers: {
                'Content-Type': 'application/json',
                'x-requestid': requestId,
                'x-device-oemid': 'friend_device_oem'
            },
            method: 'POST',
            data: null
        }).toPromise()
            .catch(e => {
            common_1.Logger.error('[redeemSharingSession API] 2. 해당 Key ID  로 Device OEM Server에 redeemSharingSession 요청 실패');
            throw new common_1.HttpException(e, 555);
        });
        res.set('x-responseId', requestId);
        res.send(result.data);
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[generateSharingSession API] => Vehicle OEM Server에 ' + result.data + ' 정보 전달');
        common_1.Logger.log('[redeemSharingSession API] 2. 해당 Key ID  로 Device OEM Server에 redeemSharingSession 요청 성공');
        common_1.Logger.log('==============================================================================');
    }
    async cancelSharingSession(requestId, sharingSession, res) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===     [Device OEM Server] Cancel Sharing Session API 요청됨     ==');
        common_1.Logger.log('==================================================================');
        let data = { 'sharingSession': sharingSession };
        let result = await this.http.post('http://localhost:3000/session/cancelSharingSession', data, {
            headers: {
                'Content-Type': 'application/json',
                'x-requestid': requestId,
                'x-device-oemid': 'LG Service'
            },
            method: 'POST',
            data: null
        }).toPromise()
            .catch(e => {
            common_1.Logger.error('[cancelSharingSession API] 2. 해당 Key ID  로 Vehicle OEM Server에 cancelSharingSession 요청 실패');
            throw new common_1.HttpException(e, 555);
        });
        res.set('x-responseId', requestId);
        res.send(result.data);
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('전달한 데이터 : ' + result.data);
        common_1.Logger.log('==============================================================================');
    }
    async eventNotification(requestId, vehicleOemId, ownerKeyId, eventType, eventData, res) {
        common_1.Logger.error('test!!!!!!');
        await this.sessionService.eventNotificationStartLogger(requestId, vehicleOemId, ownerKeyId, eventType, eventData);
        let responseHeader = {};
        if (true) {
            responseHeader['statusCode'] = 200;
        }
        else {
            responseHeader['statusCode'] = 445;
        }
        let serverKey = 'AAAACwfFCAs:APA91bHC5MQzHy16DQblnPLe-U6IWz06st9k-HbCQ20MpcUoK3XVSUgQ90fBI9e-6cZOYsOir3JHXXeZdK7B7aRnhgw9fNjgmgmUeRV0Mu4aQ9xK12ft5ec76QVXT4rw_4LW1b17kU9F';
        let regToken = ['c4iC-v1ZTMKwH8oZGeybVJ:APA91bHcjGv-jgziN4Ip76U54YsWT8169e1ydWuhVOEcAZY2ZXhxlikZdR4VMzfGGUp428tRWcSmy3g5v96NrJPHNJnOU7XNbiXcPzAqGYbCLpCV0kz3L9s0zS9Ja-zno9zBfyrSN9Lu'];
        switch (eventType) {
            case "CREATE_SHARED_KEY": {
                let result = await this.sessionService.fcmPushService(serverKey, regToken[0], '[Friend Device] CREATE_SHARED_KEY 요청');
                break;
            }
            case "SIGN_SHARED_KEY": {
                let result = await this.sessionService.fcmPushService(serverKey, regToken[0], '[Owner Device] SIGN_SHARED_KEY 요청');
                break;
            }
            case "IMPORT_SHARED_KEY": {
                let result = await this.sessionService.fcmPushService(serverKey, regToken[0], '[Friend Device] IMPORT_SHARED_KEY 요청');
                break;
            }
            case "SHARED_KEY_ADDED": {
                let result = await this.sessionService.fcmPushService(serverKey, regToken[0], '[Owner Device] 공유 비밀키 생성 완료');
                break;
            }
            case "SHARING_INITIATED": {
                let result = await this.sessionService.fcmPushService(serverKey, regToken[0], '[Owner Device] Friend Device와 세션 연동 완료!');
                break;
            }
            case "TERMINATED": {
                let result = await this.sessionService.fcmPushService(serverKey, regToken[0], '[Friend Device] Key Terminate Request');
                break;
            }
        }
        res.set('x-responseId', requestId);
        res.set('x-device-oemId', 'Genesis');
        res.send(responseHeader);
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('전달한 응답 : ' + JSON.stringify(responseHeader));
        common_1.Logger.log('==============================================================================');
    }
    async keySharingExchange(requestId, keyAction, keyID, sharingSession, keyCreationRequest, keySigingRequest, importRequest, res) {
        if (keyAction == 'CREATE_SHARED_KEY') {
            let voem_id = 'http://localhost:3000';
            let x_timestamp = new Date().getTime().toString();
            let requestId = await crypto.randomBytes(40).toString('hex');
            let deviceOemId = 'owner_device_oem';
            let selectResult = await this.sessionService.createSharedKey(keyAction, x_timestamp, voem_id, requestId, deviceOemId, keyID, sharingSession, keyCreationRequest);
            res.set('x-vehicle-oemId', 'Genesis');
            res.set('x-responseId', requestId);
            common_1.Logger.log('[keySharingExchange API] Vehicle OEM Server로부터 전달받은 응답 ' + JSON.stringify(selectResult));
            res.send(selectResult);
        }
        else if (keyAction == 'SIGN_SHARED_KEY') {
            let voem_id = 'http://localhost:3000';
            let x_timestamp = new Date().getTime().toString();
            let requestId = await crypto.randomBytes(40).toString('hex');
            let deviceOemId = 'owner_device_oem';
            let selectResult = await this.sessionService.signSharedKey(keyAction, x_timestamp, voem_id, requestId, deviceOemId, sharingSession, keyCreationRequest);
            res.set('x-vehicle-oemId', 'Genesis');
            res.set('x-responseId', requestId);
            common_1.Logger.log('[keySharingExchange API] Vehicle OEM Server로부터 전달받은 응답 ' + JSON.stringify(selectResult));
            res.send(selectResult);
        }
        else if (keyAction == 'IMPORT_SHARED_KEY') {
            let voem_id = 'http://localhost:3000';
            let x_timestamp = new Date().getTime().toString();
            let requestId = await crypto.randomBytes(40).toString('hex');
            let deviceOemId = 'owner_device_oem';
            let selectResult = await this.sessionService.importSharedKey(keyAction, x_timestamp, voem_id, requestId, deviceOemId, keyID, sharingSession, keyCreationRequest);
            res.set('x-vehicle-oemId', 'Genesis');
            res.set('x-responseId', requestId);
            common_1.Logger.log('[keySharingExchange API] Vehicle OEM Server로부터 전달받은 응답 ' + JSON.stringify(selectResult));
            res.send(selectResult);
        }
        else {
            throw new common_1.HttpException('', 412);
        }
    }
    async testGCM() {
        let serverKey = 'AAAACwfFCAs:APA91bHC5MQzHy16DQblnPLe-U6IWz06st9k-HbCQ20MpcUoK3XVSUgQ90fBI9e-6cZOYsOir3JHXXeZdK7B7aRnhgw9fNjgmgmUeRV0Mu4aQ9xK12ft5ec76QVXT4rw_4LW1b17kU9F';
        let regToken = ['c4iC-v1ZTMKwH8oZGeybVJ:APA91bHcjGv-jgziN4Ip76U54YsWT8169e1ydWuhVOEcAZY2ZXhxlikZdR4VMzfGGUp428tRWcSmy3g5v96NrJPHNJnOU7XNbiXcPzAqGYbCLpCV0kz3L9s0zS9Ja-zno9zBfyrSN9Lu'];
        let result = await this.sessionService.fcmPushService(serverKey, regToken[0], '[Key Sharing Invitation] https://autocrypt.io/v1/ccc/hVOEcAZY2ZXhxlikZdR4VMzfG/jgmgmUeRV0');
        return result;
    }
};
__decorate([
    common_1.Post('generateSharingSession'),
    swagger_1.ApiOperation({ summary: ' The owner device initiates a sharing process on the Vehicle OEM Server through the Device OEM Server' }),
    swagger_1.ApiHeader({
        name: 'x-requestid',
        description: '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
        example: '550a501552eedde2cd410b94c77bb58a0e8327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    }),
    swagger_1.ApiHeader({
        name: 'x-device-oemid',
        description: 'owner_device_oem',
        example: 'owner_device_oem',
    }),
    swagger_1.ApiBody({ type: swaggerObj.GenerateSharingSession }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Headers('x-device-oemid')),
    __param(2, common_1.Body('KeyId')),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], DoemSessionController.prototype, "generateSharingSession", null);
__decorate([
    common_1.Post('redeemSharingSession'),
    swagger_1.ApiOperation({ summary: 'A friend device can reach out to the Vehicle OEM Server through the friend Device OEM Server to redeem a sharing session created and sent to the friend device by the owner device.' }),
    swagger_1.ApiHeader({
        name: 'x-requestid',
        description: '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    }),
    swagger_1.ApiBody({ type: swaggerObj.RedeemSharingSession }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Body('sharingSession')),
    __param(2, common_1.Body('friendDeviceHandle')),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], DoemSessionController.prototype, "redeemSharingSession", null);
__decorate([
    common_1.Post('cancelSharingSession'),
    swagger_1.ApiOperation({ summary: '[Optional] owner or friend Device OEM Server to cancel a created sharing session' }),
    swagger_1.ApiHeader({
        name: 'x-requestid',
        description: '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    }),
    swagger_1.ApiBody({ type: swaggerObj.CancelSharingSession }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Body('sharingSession')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], DoemSessionController.prototype, "cancelSharingSession", null);
__decorate([
    common_1.Post('eventNotification'),
    swagger_1.ApiOperation({ summary: 'This is a generic API offered by the Device OEM Server and the Vehicle OEM Server to communicate different events on a Digital Key' }),
    swagger_1.ApiBody({ type: swaggerObj.EventNotification }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Headers('x-vehicle-oemId')),
    __param(2, common_1.Body('keyID')),
    __param(3, common_1.Body('eventType')),
    __param(4, common_1.Body('eventData')),
    __param(5, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], DoemSessionController.prototype, "eventNotification", null);
__decorate([
    common_1.Post('keySharingExchange'),
    swagger_1.ApiOperation({ summary: '[Optional] owner or friend Device OEM Server to cancel a created sharing session' }),
    swagger_1.ApiHeader({
        name: 'x-requestid',
        description: '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    }),
    swagger_1.ApiBody({ type: swaggerObj.CreateSharedKey }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Body('keyAction')),
    __param(2, common_1.Body('keyID')),
    __param(3, common_1.Body('sharingSession')),
    __param(4, common_1.Body('keyCreationRequest')),
    __param(5, common_1.Body('keySigingRequest')),
    __param(6, common_1.Body('importRequest')),
    __param(7, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], DoemSessionController.prototype, "keySharingExchange", null);
__decorate([
    common_1.Get('invite'),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DoemSessionController.prototype, "testGCM", null);
DoemSessionController = __decorate([
    swagger_1.ApiTags('session'),
    common_1.Controller('session'),
    __metadata("design:paramtypes", [doem_session_service_1.DoemSessionService,
        common_1.HttpService])
], DoemSessionController);
exports.DoemSessionController = DoemSessionController;
//# sourceMappingURL=doem.session.controller.js.map