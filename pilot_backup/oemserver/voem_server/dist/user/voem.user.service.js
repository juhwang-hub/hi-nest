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
exports.VoemUserInfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const voem_user_entity_1 = require("./entity/voem.user.entity");
const typeorm_2 = require("typeorm");
const crypto = require("crypto");
let VoemUserInfoService = class VoemUserInfoService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async checkIdRedundancy(userId) {
    }
    async checkEmail(email) {
    }
    async createUserInfo(voem_user_id, email, phonenumber, password_salt, hashed_password, zip_code, basic_address, detail_address, passwordDate, vehicle_id_1, vehicle_id_2, vehicle_id_3) {
    }
    async checkUserValidity(userId, userPwd) {
        let result = await this.userRepository
            .createQueryBuilder()
            .select(['t.password_salt, t.hashed_password'])
            .from(voem_user_entity_1.VoemUserInfo, 't')
            .where('t.voem_user_id', { id: userId })
            .getMany();
        if (!result) {
        }
        let passwdSalt = '';
        let hashed_password = '';
        let calculatedPwd = crypto.createHash('sha256').update(passwdSalt + userPwd).digest('base64');
        if (calculatedPwd == hashed_password) {
        }
        else {
        }
    }
};
VoemUserInfoService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(voem_user_entity_1.VoemUserInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VoemUserInfoService);
exports.VoemUserInfoService = VoemUserInfoService;
//# sourceMappingURL=voem.user.service.js.map