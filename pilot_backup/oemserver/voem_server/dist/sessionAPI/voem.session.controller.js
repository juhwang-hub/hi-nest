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
exports.VoemSessionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const voem_session_service_1 = require("./voem.session.service");
const crypto = require("crypto");
const swaggerObj = require("./entity/voem.session.swagger.object");
let VoemSessionController = class VoemSessionController {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    async generateSharingSession(requestId, deviceOemId, ownerKeyId, res) {
        common_1.Logger.error('test!!!!!!!!!!!!!!!!!');
        await this.sessionService.generateSharingSessionStartLogger(requestId, deviceOemId, ownerKeyId);
        let sessoinId = await crypto.randomBytes(40).toString('hex');
        common_1.Logger.log('[generateSharingSession API] 40Bytes의 Random Session ID 생성 : ' + sessoinId);
        common_1.Logger.log('[generateSharingSession API] Owner Device의 device OEM Id를 통하여 root_oem_info_table에서 Owner Device 도메인 주소 가져옴');
        let doemUrlObj = await this.sessionService.selectOEMUrl(deviceOemId);
        if (!doemUrlObj) {
            common_1.Logger.error('[redeemSharingSession API] Owner Device OEM ID가 등록되어 있지 않음');
            throw new common_1.HttpException('[redeemSharingSession API] Device OEM ID의 유효성을 확인해 주세요.', 444);
        }
        let doemUrl = doemUrlObj.root_oem_url;
        common_1.Logger.log('[generateSharingSession API] 데이터베이스의 voem_session_info 테이블에 세션 정보[sessionId, ownerKeyId, doemUrl] 저장');
        common_1.Logger.log('[generateSharingSession API] => sessionId : ' + sessoinId);
        common_1.Logger.log('[generateSharingSession API] => ownerKeyId: ' + ownerKeyId);
        common_1.Logger.log('[generateSharingSession API] => doemUrl   : ' + doemUrl);
        let createSession = await this.sessionService.insertSessionDB(sessoinId, ownerKeyId, doemUrl, new Date(), 30, 'VALID');
        if (createSession != '1') {
            new common_1.HttpException('Error!', 331);
        }
        common_1.Logger.log('[generateSharingSession API] createSession : ' + createSession);
        let sharingSession = {
            'sessionID': sessoinId,
            'vehicleOEMUrl': 'http://localhost:3000'
        };
        common_1.Logger.log('[generateSharingSession API] sharingSession : ' + sharingSession);
        res.set('x-responseId', requestId);
        res.set('x-vehicle-oemId', 'Genesis');
        res.send(sharingSession);
        common_1.Logger.log('[generateSharingSession API] generate Session API 응답 전송 완료');
    }
    async redeemSharingSession(requestId, deviceOemId, sharingSession, friendDeviceHandle, res) {
        common_1.Logger.error('test!!!!!!!!!!!!!!!!!!!!!');
        await this.sessionService.redeemSharingSessionStartLogger(sharingSession, friendDeviceHandle);
        let sessionObj = JSON.parse(sharingSession);
        let sessionID = sessionObj['sessionID'];
        common_1.Logger.log('[redeemSharingSession API] Device OEM Id 정보를 사용하여 Device OEM URL을 획득');
        let foemUrlObj = await this.sessionService.selectOEMUrl(deviceOemId);
        if (!foemUrlObj) {
            common_1.Logger.error('[redeemSharingSession API] Friend Device OEM ID가 등록되어 있지 않음');
            throw new common_1.HttpException('Device OEM ID의 유효성을 확인해 주세요.', 444);
        }
        common_1.Logger.log('[redeemSharingSession API] Device OEM Url과 friendDeviceHandle 정보를 Session DB에 업데이트 저장');
        let doemUrl = foemUrlObj.root_oem_url;
        common_1.Logger.log('[redeemSharingSession API] => doemUrl : ' + doemUrl);
        let selectResult = await this.sessionService.updateFriendDoemUrlDB(sessionID, doemUrl, friendDeviceHandle);
        let responseHeader = {};
        if (selectResult == '1') {
            responseHeader['statusCode'] = 200;
            common_1.Logger.log('[redeemSharingSession API] Update DB is Successed!');
        }
        else {
            responseHeader['statusCode'] = 445;
            common_1.Logger.log('[redeemSharingSession API] Update DB is Failed!');
        }
        res.set('x-responseId', requestId);
        res.set('x-vehicle-oemId', 'Genesis');
        res.send(responseHeader);
        let selectSessionDB = await this.sessionService.selectSessionDB(sessionID);
        if (!selectSessionDB) {
            throw new common_1.HttpException('Wowwowowowowwoo !!', 444);
        }
        let OwnerObject = selectSessionDB[0];
        let data = { 'keyID': OwnerObject.owner_key_id, 'eventType': 'SHARING_INITIATED', 'eventData': sharingSession };
        common_1.Logger.log('[redeemSharingSession API] Owner Device Server에 보낼 데이터 : ' + JSON.stringify(data));
        let http = new common_1.HttpService();
        common_1.Logger.log(OwnerObject.owner_doem_url + '/session/eventNotification');
        let result = await http.post(OwnerObject.owner_doem_url + '/session/eventNotification', data, {
            headers: {
                'Content-Type': 'application/json',
                'x-requestid': '',
                'x-vehicle-oemId': 'Genesis'
            },
            method: 'POST',
            data: null
        }).toPromise()
            .catch(e => {
            common_1.Logger.error('[redeemSharingSession API] 해당 Key ID  로 Vehicle OEM Server에 eventNotification 요청 실패');
            throw new common_1.HttpException(e, 555);
        });
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('전달한 응답(ResultCode[Success:200]) : ' + result.data.statusCode);
        common_1.Logger.log('==============================================================================');
    }
    async cancelSharingSession(requestId, sharingSession, res) {
        common_1.Logger.error('test!!!!!!!!!!!!!!!');
        await this.sessionService.cancelSharingSessionStartLogger(requestId, sharingSession);
        let sessionObj = JSON.parse(sharingSession);
        let sessionID = sessionObj['sessionID'];
        let selectResult = await this.sessionService.cancleSessionDB(sessionID);
        let responseHeader = {};
        if (selectResult) {
            responseHeader['statusCode'] = 200;
        }
        else {
            responseHeader['statusCode'] = 445;
        }
        res.set('x-responseId', requestId);
        res.set('x-vehicle-oemId', 'Genesis');
        res.send(responseHeader);
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('전달한 응답 : ' + JSON.stringify(responseHeader));
        common_1.Logger.log('==============================================================================');
    }
    async eventNotification(requestId, ownerKeyId, eventType, eventData, res) {
        common_1.Logger.error('test!!!!!!!!!!!');
        await this.sessionService.eventNotificationStartLogger(ownerKeyId, eventType, eventData);
        let responseHeader = {};
        if (true) {
            responseHeader['statusCode'] = 200;
        }
        else {
            responseHeader['statusCode'] = 445;
        }
        res.set('x-responseId', requestId);
        res.set('x-vehicle-oemId', 'Genesis');
        res.send(responseHeader);
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('전달한 응답 : ' + JSON.stringify(responseHeader));
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[eventNotification API] Success ');
    }
    async healthCheck() {
        common_1.Logger.log('Health Check API 가 호출되었음.');
        common_1.Logger.log('호출된 시간 : ' + new Date());
    }
    async keySharingExchange(requestId, deviceOemId, keyAction, keyID, sharingSession, keyCreationRequest, keySigningRequest, importRequest, res) {
        common_1.Logger.error('test!!!!!!!!!!!!!!!!!');
        await this.sessionService.keySharingExchangeStartLogger(requestId, deviceOemId, keyAction, keyID);
        let sessionValidity = await this.sessionService.sessionValidityCheck(JSON.parse(sharingSession).sessionID, new Date());
        if (sessionValidity != true) {
            common_1.Logger.error('[keySharingExchange API] session이 유효하지 않습니다.');
            throw new common_1.HttpException('[keySharingExchange API] session이 유효하지 않습니다.', 441);
        }
        if (keyAction == 'CREATE_SHARED_KEY') {
            let x_vehicle_oemId = 'Genesis';
            let x_timestamp = new Date().getTime().toString();
            common_1.Logger.log('[keySharingExchange API] CREATE_SHARED_KEY 요청 들어옴');
            let selectResult = await this.sessionService.createSharedKey(x_vehicle_oemId, x_timestamp, requestId, keyID, JSON.parse(sharingSession), keyCreationRequest);
            if (!selectResult) {
                common_1.Logger.error('먼가 문제있음');
                throw new common_1.HttpException('Error', 444);
            }
            await this.sessionService.sendCreateSharedKey(requestId, selectResult, res);
        }
        else if (keyAction == 'SIGN_SHARED_KEY') {
            common_1.Logger.log('[keySharingExchange API] SIGN_SHARED_KEY 요청 들어옴');
            let x_vehicle_oemId = 'Genesis';
            let x_timestamp = new Date().getTime().toString();
            let selectResult = await this.sessionService.signSharedKey(x_vehicle_oemId, x_timestamp, requestId, JSON.parse(sharingSession), keySigningRequest);
            await this.sessionService.sendSignSharedKey(requestId, selectResult, res);
        }
        else if (keyAction == 'IMPORT_SHARED_KEY') {
            let x_vehicle_oemId = 'Genesis';
            common_1.Logger.log('[keySharingExchange API] IMPORT_SHARED_KEY 요청 들어옴');
            let x_timestamp = new Date().getTime().toString();
            let selectResult = await this.sessionService.importSharedKey(x_vehicle_oemId, x_timestamp, requestId, keyID, JSON.parse(sharingSession), importRequest);
            await this.sessionService.sendImportsharedKey(requestId, selectResult, res);
        }
        else {
        }
    }
    async checkValidity(keyId) {
        let result = await this.sessionService.checkValidity(keyId);
        if (result == 1) {
            return 'valid';
        }
        else {
            return 'Invalid';
        }
    }
};
__decorate([
    common_1.Post('generateSharingSession'),
    swagger_1.ApiOperation({ summary: ' The owner device initiates a sharing process on the Vehicle OEM Server through the Device OEM Server' }),
    swagger_1.ApiParam({
        name: 'x-requestid',
        type: 'string',
        description: '550a501552eedde2cd410b94c77bb58a0e8327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    }),
    swagger_1.ApiParam({
        name: 'x-device-oemid',
        type: 'string',
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
], VoemSessionController.prototype, "generateSharingSession", null);
__decorate([
    common_1.Post('redeemSharingSession'),
    swagger_1.ApiOperation({ summary: 'A friend device can reach out to the Vehicle OEM Server through the friend Device OEM Server to redeem a sharing session created and sent to the friend device by the owner device.' }),
    swagger_1.ApiBody({ type: swaggerObj.RedeemSharingSession }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Headers('x-device-oemid')),
    __param(2, common_1.Body('sharingSession')),
    __param(3, common_1.Body('friendDeviceHandle')),
    __param(4, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], VoemSessionController.prototype, "redeemSharingSession", null);
__decorate([
    common_1.Post('cancelSharingSession'),
    swagger_1.ApiOperation({ summary: '[Optional] owner or friend Device OEM Server to cancel a created sharing session' }),
    swagger_1.ApiBody({ type: swaggerObj.CancelSharingSession }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Body('sharingSession')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], VoemSessionController.prototype, "cancelSharingSession", null);
__decorate([
    common_1.Post('eventNotification'),
    swagger_1.ApiOperation({ summary: 'This is a generic API offered by the Device OEM Server and the Vehicle OEM Server to communicate different events on a Digital Key' }),
    swagger_1.ApiBody({ type: swaggerObj.EventNotification }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Body('KeyId')),
    __param(2, common_1.Body('eventType')),
    __param(3, common_1.Body('eventData')),
    __param(4, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], VoemSessionController.prototype, "eventNotification", null);
__decorate([
    common_1.Get('healthcheck'),
    swagger_1.ApiOperation({ summary: 'This is a generic API offered by the Device OEM Server and the Vehicle OEM Server to determine the availability of the corresponding server. This API does not require any headers.' }),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VoemSessionController.prototype, "healthCheck", null);
__decorate([
    common_1.Post('keySharingExchange'),
    common_1.HttpCode(200),
    swagger_1.ApiOperation({ summary: ' The owner device sends a keyCreationRequest, keySigningRequest, or importRequest for a friend device to create a shared key' }),
    swagger_1.ApiBody({ type: swaggerObj.keySharingExchange }),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Headers('x-device-oemid')),
    __param(2, common_1.Body('keyAction')),
    __param(3, common_1.Body('keyID')),
    __param(4, common_1.Body('sharingSession')),
    __param(5, common_1.Body('keyCreationRequest')),
    __param(6, common_1.Body('keySigningRequest')),
    __param(7, common_1.Body('importRequest')),
    __param(8, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], VoemSessionController.prototype, "keySharingExchange", null);
__decorate([
    common_1.Get('checkKeyValidity'),
    __param(0, common_1.Headers('keyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoemSessionController.prototype, "checkValidity", null);
VoemSessionController = __decorate([
    swagger_1.ApiTags('session'),
    common_1.Controller('session'),
    __metadata("design:paramtypes", [voem_session_service_1.VoemSessionService])
], VoemSessionController);
exports.VoemSessionController = VoemSessionController;
//# sourceMappingURL=voem.session.controller.js.map