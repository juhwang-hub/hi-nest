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
exports.VoemUserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let VoemUserController = class VoemUserController {
    constructor() { }
    async userLogin(requestId, voemUserId, voemUserPwd, res) {
    }
};
__decorate([
    common_1.Post('/login'),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Body('voemUserId')),
    __param(2, common_1.Body('voemUserPwd')),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], VoemUserController.prototype, "userLogin", null);
VoemUserController = __decorate([
    swagger_1.ApiTags('user'),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [])
], VoemUserController);
exports.VoemUserController = VoemUserController;
//# sourceMappingURL=voem.user.controller.js.map