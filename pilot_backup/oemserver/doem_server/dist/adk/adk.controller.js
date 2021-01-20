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
exports.AdkController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
let AdkController = class AdkController {
    async genVerifier(requestId, voemUserId, res) {
        if (!requestId) {
            throw new common_1.HttpException('no x-requestId Parameter', 500);
        }
        if (!voemUserId) {
            throw new common_1.HttpException('no voemUserId', 500);
        }
        let password_str = 'pleaseletmein';
        let salt_str = 'yellowsubmarines';
        res.set('x-responseId', requestId);
        res.send(password_str);
        return password_str;
    }
    trackKey(requestId, deviceOemId, encryptionCertChain, encryptionVersion, keyID, keyType, deviceType, accountIDHash, keyData) {
        if (!requestId) {
            throw new common_1.HttpException('no x-requestId Parameter', 500);
        }
        if (!deviceOemId) {
            throw new common_1.HttpException('no x-device-oemId Parameter', 500);
        }
        if (!encryptionCertChain) {
            throw new common_1.HttpException('no encryptionCertChain Parameter', 500);
        }
        if (!encryptionVersion) {
            throw new common_1.HttpException('no encryptionVersion Parameter', 500);
        }
        if (!keyID) {
            throw new common_1.HttpException('no keyID Parameter', 500);
        }
        if (!keyType) {
            throw new common_1.HttpException('no keyType Parameter', 500);
        }
        if (!deviceType) {
            throw new common_1.HttpException('no deviceType Parameter', 500);
        }
        if (!accountIDHash) {
            throw new common_1.HttpException('no accountIDHash Parameter', 500);
        }
        if (!keyData) {
            throw new common_1.HttpException('no keyData Parameter', 500);
        }
        return 'trackKey';
    }
    manageKey() {
        return 'manageKey';
    }
    generateSharingSession() {
        return 'generateSharingSession';
    }
    redeemSharingSession() {
        return 'redeemSharingSession';
    }
    cancelSharingSession() {
        return 'cancelSharingSession';
    }
    createSharedKey() {
        return 'createSharedKey';
    }
    signSharedKey() {
        return 'signSharedKey';
    }
    importSharedKey() {
        return 'importSharedKey';
    }
    eventNotification() {
        return 'eventNotification';
    }
    Healthcheck() {
        return 'Healthcheck';
    }
    importImmobilizerToken() {
        return 'importImmobilizerToken';
    }
};
__decorate([
    common_1.Post('generateVerifier'),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Body('x-voem-UserId')),
    __param(2, common_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AdkController.prototype, "genVerifier", null);
__decorate([
    common_1.Post('trackKey'),
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", String)
], AdkController.prototype, "trackKey", null);
__decorate([
    common_1.Post('manageKey'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AdkController.prototype, "manageKey", null);
__decorate([
    common_1.Post('generateSharingSession'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AdkController.prototype, "generateSharingSession", null);
__decorate([
    common_1.Post('redeemSharingSession'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AdkController.prototype, "redeemSharingSession", null);
__decorate([
    common_1.Post('cancelSharingSession'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AdkController.prototype, "cancelSharingSession", null);
__decorate([
    common_1.Post('createSharedKey'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AdkController.prototype, "createSharedKey", null);
__decorate([
    common_1.Post('signSharedKey'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AdkController.prototype, "signSharedKey", null);
__decorate([
    common_1.Post('importSharedKey'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AdkController.prototype, "importSharedKey", null);
__decorate([
    common_1.Post('eventNotification'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AdkController.prototype, "eventNotification", null);
__decorate([
    common_1.Get('Healthcheck'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AdkController.prototype, "Healthcheck", null);
__decorate([
    common_1.Post('importImmobilizerToken'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AdkController.prototype, "importImmobilizerToken", null);
AdkController = __decorate([
    swagger_1.ApiTags('adk'),
    common_1.Controller('adk')
], AdkController);
exports.AdkController = AdkController;
//# sourceMappingURL=adk.controller.js.map