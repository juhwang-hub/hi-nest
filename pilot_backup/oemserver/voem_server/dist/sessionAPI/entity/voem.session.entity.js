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
exports.VoemSessionInfo = void 0;
const typeorm_1 = require("typeorm");
let VoemSessionInfo = class VoemSessionInfo {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], VoemSessionInfo.prototype, "session_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VoemSessionInfo.prototype, "owner_key_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VoemSessionInfo.prototype, "owner_doem_url", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VoemSessionInfo.prototype, "friend_doem_url", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VoemSessionInfo.prototype, "friend_device_handle", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], VoemSessionInfo.prototype, "session_creation_date", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], VoemSessionInfo.prototype, "session_period_minutes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VoemSessionInfo.prototype, "session_status", void 0);
VoemSessionInfo = __decorate([
    typeorm_1.Entity('voem_session_info')
], VoemSessionInfo);
exports.VoemSessionInfo = VoemSessionInfo;
//# sourceMappingURL=voem.session.entity.js.map