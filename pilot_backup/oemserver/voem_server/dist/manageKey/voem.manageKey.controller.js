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
exports.VoemManageKeyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crypto = require("crypto");
const voem_manageKey_service_1 = require("./voem.manageKey.service");
const swaggerObj = require("./entity/voem.manageKey.swagger.object");
let VoemManageKeyController = class VoemManageKeyController {
    constructor(manageKeyService) {
        this.manageKeyService = manageKeyService;
    }
    async V2FKeyTerminated(requestId, ownerKeyId, friendKeyId, status, res) {
        common_1.Logger.error('test!!!!!!!!!!!!!!');
        await this.manageKeyService.V2FKeyTerminatedStartLogger(requestId, ownerKeyId, friendKeyId, status);
        let keyStatus = 10;
        common_1.Logger.log('[V2FKeyTerminated API] 1. friendKeyId(' + friendKeyId + ')의 상태 조회');
        let result = await this.manageKeyService.vehicleKeyTerminated(friendKeyId, keyStatus);
        if (result['code'] != '1') {
            common_1.Logger.error('[V2FKeyTerminated API] => friendKeyId(' + friendKeyId + ')의 키 상태가 ' + result['code'] + '로 활성화 되어 있지 않으므로 키 종료 실패');
            throw new common_1.HttpException('The key cannot be terminated since that is not activated', 531);
        }
        common_1.Logger.log('[V2FKeyTerminated API] => friendKeyId(' + friendKeyId + ')의 키 상태가 ' + result['code'] + '로 활성화 되어 있으므로, VOEM(KTS)서버에서 해당 키 상태를 Terminated로 변경');
        common_1.Logger.log('[V2FKeyTerminated API] 2. friendKeyId(' + friendKeyId + ')를 통해 friend Device OEM Server의 Url 조회');
        let friendDoemUrl = await this.manageKeyService.getDKUrlInfo(friendKeyId);
        common_1.Logger.log('[V2FKeyTerminated API] => 조회된 friendKeyId(' + friendKeyId + ')의 friend Device OEM Server의 Url : ' + friendDoemUrl);
        let action = 'TERMINATED';
        let vehicleOemId = 'Genesis';
        common_1.Logger.log('[V2FKeyTerminated API] 3. friendKeyId(' + friendKeyId + ')의 삭제 요청을 Friend Device OEM Server(' + friendDoemUrl + ')로 전달');
        let manageKeyResult = await this.manageKeyService.manageKeyToDoemServer(ownerKeyId, action, "TERMINATE_ATTESTATION", null, "serverRemoteTerminationRequest", "vehicleOEMProprietaryData", vehicleOemId, friendDoemUrl);
        if (manageKeyResult.statusCode != '200') {
            common_1.Logger.error('[V2FKeyTerminated API] 4.Friend Device OEM으로 부터 200응답이 안옴.. 전달받은 상태코드 : ' + manageKeyResult.statusCode);
            throw new common_1.HttpException('[V2FKeyTerminated API] 4.Friend Device OEM으로 부터 200응답이 안옴.. 전달받은 상태코드 : ' + manageKeyResult.statusCode, 444);
        }
        else {
            common_1.Logger.log('==============================================================================');
            common_1.Logger.log('[V2FKeyTerminated API] 4.응답으로 전달한 데이터');
            let x_timestamp = new Date().getTime().toString();
            res.set('x-timestamp', x_timestamp);
            res.set('x-vehicle-oemid', vehicleOemId);
            res.set('x-responseId', requestId);
            res.send(manageKeyResult);
            common_1.Logger.log('==============================================================================');
        }
    }
    async manageKey(requestId, deviceOemId, keyId, action, terminationAttestation, deviceRemoteTerminationRequest, serverRemoteTerminationRequest, vehicleOEMProprietaryData, res) {
        common_1.Logger.error('test!!!!!!!!!!!!!!');
        await this.manageKeyService.managekeyStartLogger(requestId, deviceOemId, keyId, action);
        switch (action) {
            case 'TERMINATE': {
                let requestId = await crypto.randomBytes(40).toString('hex');
                let vehicleOemId = 'Genesis';
                let eventType = '';
                let eventData = '';
                let responseHeader = { 'responseHeader': { 'statusCode': '200' } };
                res.set('x-responseId', requestId);
                res.set('x-vehicle-oemId', 'Genesis');
                res.send(responseHeader);
                let result = await this.manageKeyService.manageKey(requestId, vehicleOemId, keyId, eventType, eventData);
                return result;
            }
        }
    }
};
__decorate([
    common_1.Post('V2FKeyTerminated'),
    swagger_1.ApiOperation({ summary: 'To request friend key termination from Vehicle' }),
    swagger_1.ApiHeader({
        name: 'x-requestid',
        description: '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
        example: '550a501552eedde2cd410b94c77bb58a0e8327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    }),
    swagger_1.ApiBody({ type: swaggerObj.V2FKeyTerminated }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Body('ownerKeyId')),
    __param(2, common_1.Body('friendKeyId')),
    __param(3, common_1.Body('status')),
    __param(4, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], VoemManageKeyController.prototype, "V2FKeyTerminated", null);
__decorate([
    common_1.Post('manageKey'),
    swagger_1.ApiHeader({
        name: 'x-requestid',
        description: '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
        example: '550a501552eedde2cd410b94c77bb58a0e8327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    }),
    swagger_1.ApiHeader({
        name: 'x-device-oemid',
        description: 'owner_device_oem',
    }),
    swagger_1.ApiBody({ type: swaggerObj.ManageKey }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Headers('x-device-oemid')),
    __param(2, common_1.Body('keyID')),
    __param(3, common_1.Body('action')),
    __param(4, common_1.Body('terminationAttestation')),
    __param(5, common_1.Body('deviceRemoteTerminationRequest')),
    __param(6, common_1.Body('serverRemoteTerminationRequest')),
    __param(7, common_1.Body('vehicleOEMProprietaryData')),
    __param(8, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], VoemManageKeyController.prototype, "manageKey", null);
VoemManageKeyController = __decorate([
    swagger_1.ApiTags('manageKey'),
    common_1.Controller('manageKey'),
    __metadata("design:paramtypes", [voem_manageKey_service_1.VoemManageKeyService])
], VoemManageKeyController);
exports.VoemManageKeyController = VoemManageKeyController;
//# sourceMappingURL=voem.manageKey.controller.js.map