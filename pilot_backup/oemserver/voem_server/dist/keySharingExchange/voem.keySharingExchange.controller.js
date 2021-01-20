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
exports.VoemKeySharingExchangeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let VoemKeySharingExchangeController = class VoemKeySharingExchangeController {
    constructor() { }
    async keySharingExchange(requestId, keyAction, keyID, sharingSession, keyCreationRequest, keySigingRequest, importRequest, res) {
    }
};
__decorate([
    common_1.Post('keySharingExchange'),
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
], VoemKeySharingExchangeController.prototype, "keySharingExchange", null);
VoemKeySharingExchangeController = __decorate([
    swagger_1.ApiTags('keySharingExchange'),
    common_1.Controller('keySharingExchange'),
    __metadata("design:paramtypes", [])
], VoemKeySharingExchangeController);
exports.VoemKeySharingExchangeController = VoemKeySharingExchangeController;
//# sourceMappingURL=voem.keySharingExchange.controller.js.map