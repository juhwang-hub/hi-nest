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
exports.DoemManageKeyController = void 0;
const common_1 = require("@nestjs/common");
const doem_menageKey_service_1 = require("./doem.menageKey.service");
const swagger_1 = require("@nestjs/swagger");
let DoemManageKeyController = class DoemManageKeyController {
    constructor(manageKeyService) {
        this.manageKeyService = manageKeyService;
    }
    async manageKey(requestId, vehicleOemId, x_timestamp, keyID, action, terminationAttestation, deviceRemoteTerminationRequest, serverRemoteTerminationRequest, vehicleOEMProprietaryData, res) {
        common_1.Logger.error('test!!!!!!!!!!!');
        await this.manageKeyService.manageKeyStartLogger(keyID, vehicleOemId, x_timestamp, action);
        let responseHeader = { 'statusCode': '200' };
        let serverKey = 'AAAACwfFCAs:APA91bHC5MQzHy16DQblnPLe-U6IWz06st9k-HbCQ20MpcUoK3XVSUgQ90fBI9e-6cZOYsOir3JHXXeZdK7B7aRnhgw9fNjgmgmUeRV0Mu4aQ9xK12ft5ec76QVXT4rw_4LW1b17kU9F';
        let regToken = ['c4iC-v1ZTMKwH8oZGeybVJ:APA91bHcjGv-jgziN4Ip76U54YsWT8169e1ydWuhVOEcAZY2ZXhxlikZdR4VMzfGGUp428tRWcSmy3g5v96NrJPHNJnOU7XNbiXcPzAqGYbCLpCV0kz3L9s0zS9Ja-zno9zBfyrSN9Lu'];
        let pushData = 'Owner 에 의해 키 종료 요청이 도착했습니다.';
        res.set('x-device-oemid', 'friend_device_oem');
        res.set('x-responseId', requestId);
        res.send(responseHeader);
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('Device에 Key 삭제 관련 데이터 전송 : ');
        let fcmPushService = await this.manageKeyService.fcmPushService(serverKey, regToken[0], pushData);
        common_1.Logger.log('==============================================================================');
        return fcmPushService;
    }
};
__decorate([
    common_1.Post('manageKey'),
    swagger_1.ApiHeader({
        name: 'x-requestid',
        description: '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
        example: '550a501552eedde2cd410b94c77bb58a0e8327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    }),
    swagger_1.ApiHeader({
        name: 'x-vehicle-oemId',
        description: 'Genesis',
    }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Headers('x-vehicle-oemId')),
    __param(2, common_1.Headers('x-timestamp')),
    __param(3, common_1.Body('keyID')),
    __param(4, common_1.Body('action')),
    __param(5, common_1.Body('terminationAttestation')),
    __param(6, common_1.Body('deviceRemoteTerminationRequest')),
    __param(7, common_1.Body('serverRemoteTerminationRequest')),
    __param(8, common_1.Body('vehicleOEMProprietaryData')),
    __param(9, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], DoemManageKeyController.prototype, "manageKey", null);
DoemManageKeyController = __decorate([
    swagger_1.ApiTags('manageKey'),
    common_1.Controller('manageKey'),
    __metadata("design:paramtypes", [doem_menageKey_service_1.DoemManageKeySrevice])
], DoemManageKeyController);
exports.DoemManageKeyController = DoemManageKeyController;
//# sourceMappingURL=doem.manageKey.controller.js.map