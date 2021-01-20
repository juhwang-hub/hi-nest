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
exports.VoemUserInfo = void 0;
const typeorm_1 = require("typeorm");
let VoemUserInfo = class VoemUserInfo {
};
__decorate([
    typeorm_1.PrimaryColumn({ length: 128, nullable: false }),
    __metadata("design:type", String)
], VoemUserInfo.prototype, "voem_user_id", void 0);
__decorate([
    typeorm_1.Column({ length: 60, nullable: false }),
    __metadata("design:type", String)
], VoemUserInfo.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ length: 20, nullable: false }),
    __metadata("design:type", String)
], VoemUserInfo.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 20, nullable: false }),
    __metadata("design:type", String)
], VoemUserInfo.prototype, "phonenumber", void 0);
__decorate([
    typeorm_1.Column({ length: 64, nullable: false }),
    __metadata("design:type", String)
], VoemUserInfo.prototype, "password_salt", void 0);
__decorate([
    typeorm_1.Column({ length: 100, nullable: false }),
    __metadata("design:type", String)
], VoemUserInfo.prototype, "hashed_password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], VoemUserInfo.prototype, "date", void 0);
__decorate([
    typeorm_1.Column({ length: 10 }),
    __metadata("design:type", String)
], VoemUserInfo.prototype, "zip_code", void 0);
__decorate([
    typeorm_1.Column({ length: 100 }),
    __metadata("design:type", String)
], VoemUserInfo.prototype, "basic_address", void 0);
__decorate([
    typeorm_1.Column({ length: 100 }),
    __metadata("design:type", String)
], VoemUserInfo.prototype, "detail_address", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], VoemUserInfo.prototype, "passwordDate", void 0);
__decorate([
    typeorm_1.Column({ length: 128 }),
    __metadata("design:type", String)
], VoemUserInfo.prototype, "vehicle_id_1", void 0);
__decorate([
    typeorm_1.Column({ length: 128 }),
    __metadata("design:type", String)
], VoemUserInfo.prototype, "vehicle_id_2", void 0);
__decorate([
    typeorm_1.Column({ length: 128 }),
    __metadata("design:type", String)
], VoemUserInfo.prototype, "vehicle_id_3", void 0);
VoemUserInfo = __decorate([
    typeorm_1.Entity('voem_user_info_table')
], VoemUserInfo);
exports.VoemUserInfo = VoemUserInfo;
//# sourceMappingURL=voem.user.entity.js.map