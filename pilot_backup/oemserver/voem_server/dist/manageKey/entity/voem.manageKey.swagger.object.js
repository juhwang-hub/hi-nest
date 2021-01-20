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
exports.ManageKey = exports.V2FKeyTerminated = void 0;
const swagger_1 = require("@nestjs/swagger");
class V2FKeyTerminated {
}
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'ownerKeyId',
        description: '',
        example: 'owner_digital_key_id_sample',
    }),
    __metadata("design:type", Object)
], V2FKeyTerminated.prototype, "ownerKeyId", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'friendKeyId',
        description: '',
        example: 'friend_digital_key_id_sample',
    }),
    __metadata("design:type", Object)
], V2FKeyTerminated.prototype, "friendKeyId", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'status',
        description: '',
        example: 'TERMINATED',
    }),
    __metadata("design:type", Object)
], V2FKeyTerminated.prototype, "status", void 0);
exports.V2FKeyTerminated = V2FKeyTerminated;
class ManageKey {
}
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'keyId',
        description: '',
        example: 'friend_digital_key_id_sample',
    }),
    __metadata("design:type", Object)
], ManageKey.prototype, "keyID", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'action',
        description: '',
        example: 'TERMINATE',
    }),
    __metadata("design:type", Object)
], ManageKey.prototype, "action", void 0);
exports.ManageKey = ManageKey;
//# sourceMappingURL=voem.manageKey.swagger.object.js.map