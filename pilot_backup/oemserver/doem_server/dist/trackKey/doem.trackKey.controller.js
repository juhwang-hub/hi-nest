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
exports.DoemTrackKeyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const doem_trackKey_service_1 = require("./doem.trackKey.service");
const swaggerObj = require("./entity/doem.trackKey.swagger.object");
let DoemTrackKeyController = class DoemTrackKeyController {
    constructor(doemTrackKeyService) {
        this.doemTrackKeyService = doemTrackKeyService;
    }
    async trackKey(requestId, deviceOemId, encryptionCertChain, encryptionVersion, keyID, keyType, deviceType, accountIDHash, keyData, res) {
        await this.doemTrackKeyService.trackKeyStartLogger(requestId, deviceOemId, encryptionCertChain, encryptionVersion, keyID, keyType, deviceType, accountIDHash, keyData);
        await this.doemTrackKeyService.checkParamsValidity(requestId, deviceOemId, encryptionCertChain, encryptionVersion, keyID, keyType, deviceType, accountIDHash);
        let result = await this.doemTrackKeyService.trackKeyHttpRequest('http://localhost:3000/trackKey/trackKey', requestId, deviceOemId, encryptionCertChain, encryptionVersion, keyID, keyType, deviceType, accountIDHash, keyData);
        let resultStr = result.data;
        await this.doemTrackKeyService.trackKeySecondLogger(resultStr);
        res.set('x-responseId', requestId);
        res.send(resultStr);
        await this.doemTrackKeyService.trackKeyFinalLogger(keyID, resultStr);
    }
};
__decorate([
    common_1.Post('trackKey'),
    swagger_1.ApiOperation({ summary: 'This is a generic API offered by the Vehicle OEM Server to track a Digital Key. <br> If trackKey is called for a keyID that is already registered, the API call shall be successful and return with a usual response. ' }),
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
    swagger_1.ApiBody({ type: swaggerObj.TrackKeyWithSwagger }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Headers('x-device-oemid')),
    __param(2, common_1.Body('encryptionCertChain')),
    __param(3, common_1.Body('encryptionVersion')),
    __param(4, common_1.Body('keyID')),
    __param(5, common_1.Body('keyType')),
    __param(6, common_1.Body('deviceType')),
    __param(7, common_1.Body('accountIDHash')),
    __param(8, common_1.Body('keyData')),
    __param(9, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], DoemTrackKeyController.prototype, "trackKey", null);
DoemTrackKeyController = __decorate([
    swagger_1.ApiTags('trackKey'),
    common_1.Controller('trackKey'),
    __metadata("design:paramtypes", [doem_trackKey_service_1.DoemTrackKeyService])
], DoemTrackKeyController);
exports.DoemTrackKeyController = DoemTrackKeyController;
//# sourceMappingURL=doem.trackKey.controller.js.map