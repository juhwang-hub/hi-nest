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
exports.OwnerKeyInfo = exports.DigitalKeyInfo = exports.VoemVehicleInfo = exports.RootOEMServerInfo = exports.RootOEMInfo = exports.VoemVerifierInfo = exports.VoemUserInfo = void 0;
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
let VoemVerifierInfo = class VoemVerifierInfo {
};
__decorate([
    typeorm_1.PrimaryColumn({ length: 128, nullable: false }),
    __metadata("design:type", String)
], VoemVerifierInfo.prototype, "voem_user_id", void 0);
__decorate([
    typeorm_1.Column({ length: 10, nullable: false }),
    __metadata("design:type", String)
], VoemVerifierInfo.prototype, "exist_verifier", void 0);
__decorate([
    typeorm_1.Column({ length: 128, nullable: false }),
    __metadata("design:type", String)
], VoemVerifierInfo.prototype, "first_verifier", void 0);
__decorate([
    typeorm_1.Column({ length: 130, nullable: false }),
    __metadata("design:type", String)
], VoemVerifierInfo.prototype, "second_verifier", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], VoemVerifierInfo.prototype, "salt", void 0);
__decorate([
    typeorm_1.Column({ length: 128 }),
    __metadata("design:type", String)
], VoemVerifierInfo.prototype, "password", void 0);
VoemVerifierInfo = __decorate([
    typeorm_1.Entity('voem_verifier_info_table')
], VoemVerifierInfo);
exports.VoemVerifierInfo = VoemVerifierInfo;
let RootOEMInfo = class RootOEMInfo {
};
__decorate([
    typeorm_1.PrimaryColumn({ length: 128, nullable: false }),
    __metadata("design:type", String)
], RootOEMInfo.prototype, "root_oem_id", void 0);
__decorate([
    typeorm_1.Column({ length: 2048, nullable: false }),
    __metadata("design:type", String)
], RootOEMInfo.prototype, "root_oem_cert", void 0);
__decorate([
    typeorm_1.Column({ length: 128, nullable: false }),
    __metadata("design:type", String)
], RootOEMInfo.prototype, "root_oem_url", void 0);
RootOEMInfo = __decorate([
    typeorm_1.Entity('root_oem_info_table')
], RootOEMInfo);
exports.RootOEMInfo = RootOEMInfo;
let RootOEMServerInfo = class RootOEMServerInfo {
};
__decorate([
    typeorm_1.PrimaryColumn({ length: 128, nullable: false }),
    __metadata("design:type", String)
], RootOEMServerInfo.prototype, "root_oem_id", void 0);
__decorate([
    typeorm_1.Column({ length: 2048, nullable: false }),
    __metadata("design:type", String)
], RootOEMServerInfo.prototype, "root_oem_cert", void 0);
__decorate([
    typeorm_1.Column({ length: 128, nullable: false }),
    __metadata("design:type", String)
], RootOEMServerInfo.prototype, "root_oem_url", void 0);
RootOEMServerInfo = __decorate([
    typeorm_1.Entity('root_oem_server_info_table')
], RootOEMServerInfo);
exports.RootOEMServerInfo = RootOEMServerInfo;
let VoemVehicleInfo = class VoemVehicleInfo {
};
__decorate([
    typeorm_1.PrimaryColumn({ length: 128, nullable: false }),
    __metadata("design:type", String)
], VoemVehicleInfo.prototype, "vehicle_id", void 0);
__decorate([
    typeorm_1.Column({ length: 130, nullable: false }),
    __metadata("design:type", String)
], VoemVehicleInfo.prototype, "vehicle_pk", void 0);
__decorate([
    typeorm_1.Column({ length: 130, nullable: false }),
    __metadata("design:type", String)
], VoemVehicleInfo.prototype, "vehicle_enc_pk", void 0);
__decorate([
    typeorm_1.Column({ length: 2048, nullable: false }),
    __metadata("design:type", String)
], VoemVehicleInfo.prototype, "vehicle_sig_cert", void 0);
__decorate([
    typeorm_1.Column({ length: 2048, nullable: false }),
    __metadata("design:type", String)
], VoemVehicleInfo.prototype, "vehicle_enc_cert", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], VoemVehicleInfo.prototype, "vehicle_brand", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], VoemVehicleInfo.prototype, "vehicle_model", void 0);
VoemVehicleInfo = __decorate([
    typeorm_1.Entity('voem_vehicle_info_table')
], VoemVehicleInfo);
exports.VoemVehicleInfo = VoemVehicleInfo;
let DigitalKeyInfo = class DigitalKeyInfo {
};
__decorate([
    typeorm_1.PrimaryColumn({ length: 128, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "key_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], DigitalKeyInfo.prototype, "key_status", void 0);
__decorate([
    typeorm_1.Column({ length: 128, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "device_oem", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "owner_device_key", void 0);
__decorate([
    typeorm_1.Column({ length: 128, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "vehicle_id", void 0);
__decorate([
    typeorm_1.Column({ length: 130, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "digital_key_PK", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "key_type", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "device_type", void 0);
__decorate([
    typeorm_1.Column({ length: 120, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "accountIdHash", void 0);
__decorate([
    typeorm_1.Column({ length: 2048, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "ICA_Cert", void 0);
__decorate([
    typeorm_1.Column({ length: 2048, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "DK_Cert", void 0);
__decorate([
    typeorm_1.Column({ length: 130, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "device_enc_PK", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "device_enc_PK_version", void 0);
__decorate([
    typeorm_1.Column({ length: 64, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "key_Valid_From", void 0);
__decorate([
    typeorm_1.Column({ length: 64, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "key_Valid_To", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "shared_keys", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "sharable_keys", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], DigitalKeyInfo.prototype, "sharing_password_required", void 0);
DigitalKeyInfo = __decorate([
    typeorm_1.Entity('digital_key_info_table')
], DigitalKeyInfo);
exports.DigitalKeyInfo = DigitalKeyInfo;
let OwnerKeyInfo = class OwnerKeyInfo {
};
__decorate([
    typeorm_1.PrimaryColumn({ length: 128, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "key_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], OwnerKeyInfo.prototype, "key_status", void 0);
__decorate([
    typeorm_1.Column({ length: 128, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "device_oem", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "owner_device_key", void 0);
__decorate([
    typeorm_1.Column({ length: 128, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "vehicle_id", void 0);
__decorate([
    typeorm_1.Column({ length: 130, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "digital_key_PK", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "key_type", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "device_type", void 0);
__decorate([
    typeorm_1.Column({ length: 120, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "accountIdHash", void 0);
__decorate([
    typeorm_1.Column({ length: 2048, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "ICA_Cert", void 0);
__decorate([
    typeorm_1.Column({ length: 2048, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "DK_Cert", void 0);
__decorate([
    typeorm_1.Column({ length: 130, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "device_enc_PK", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "device_enc_PK_version", void 0);
__decorate([
    typeorm_1.Column({ length: 64, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "key_Valid_From", void 0);
__decorate([
    typeorm_1.Column({ length: 64, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "key_Valid_To", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "shared_keys", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "sharable_keys", void 0);
__decorate([
    typeorm_1.Column({ length: 32, nullable: false }),
    __metadata("design:type", String)
], OwnerKeyInfo.prototype, "sharing_password_required", void 0);
OwnerKeyInfo = __decorate([
    typeorm_1.Entity('owner_key_info_table')
], OwnerKeyInfo);
exports.OwnerKeyInfo = OwnerKeyInfo;
//# sourceMappingURL=voem.trackKey.entity.js.map