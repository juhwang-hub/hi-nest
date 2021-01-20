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
exports.keySharingExchange = exports.EventNotification = exports.CancelSharingSession = exports.RedeemSharingSession = exports.GenerateSharingSession = void 0;
const swagger_1 = require("@nestjs/swagger");
class GenerateSharingSession {
}
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'KeyId',
        description: 'Generation Shared Session API Test <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        default: 'owner_digital_key_id_sample',
        example: 'owner_digital_key_id_sample'
    }),
    __metadata("design:type", String)
], GenerateSharingSession.prototype, "KeyId", void 0);
exports.GenerateSharingSession = GenerateSharingSession;
class RedeemSharingSession {
}
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'sharingSession',
        description: 'The object of the sharing session <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        default: '{}'
    }),
    __metadata("design:type", String)
], RedeemSharingSession.prototype, "sharingSession", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        description: 'the object of the friendDeviceHandle <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        title: 'friendDeviceHandle'
    }),
    __metadata("design:type", String)
], RedeemSharingSession.prototype, "friendDeviceHandle", void 0);
exports.RedeemSharingSession = RedeemSharingSession;
class CancelSharingSession {
}
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'sharingSession',
        description: 'The object of the sharing session <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        default: '13455143253333343542245c4de36'
    }),
    __metadata("design:type", String)
], CancelSharingSession.prototype, "sharingSession", void 0);
exports.CancelSharingSession = CancelSharingSession;
class EventNotification {
}
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        description: 'The object of the sharing session <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        title: 'KeyId'
    }),
    __metadata("design:type", String)
], EventNotification.prototype, "KeyId", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        description: 'The object of the sharing session <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        title: 'eventType'
    }),
    __metadata("design:type", String)
], EventNotification.prototype, "eventType", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        description: 'The object of the sharing session <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        title: 'eventData'
    }),
    __metadata("design:type", String)
], EventNotification.prototype, "eventData", void 0);
exports.EventNotification = EventNotification;
class keySharingExchange {
}
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'keyAction',
        description: 'KeyAction <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        default: 'importRequest',
        example: 'importRequest'
    }),
    __metadata("design:type", String)
], keySharingExchange.prototype, "keyAction", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'KeyId',
        description: 'The object of the sharing session <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        default: '13455143253333343542245c4de36',
        example: 'owner_digital_key_id_sample'
    }),
    __metadata("design:type", String)
], keySharingExchange.prototype, "KeyId", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'keyCreationRequest',
        description: 'The object of the sharing session <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        default: 'CREATE_SHARED_KEY',
        example: '7F3159F621560CBD2D33ADFF5E1BE4F7566760CBD2D33ADFF55E201A030820145A00302010202083A0751A60622A86E1BE4FF621560CBD2D33A'
    }),
    __metadata("design:type", String)
], keySharingExchange.prototype, "keyCreationRequest", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'keySigningRequest',
        description: 'The object of the sharing session <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        default: 'keySigningRequest',
        example: '7F3659F621560CBD2D33ADFF5E1BE4F7566760CBD2D33ADFF55E201A030820145A00302010202083A0751A60622A86E1BE4FF621560CBD2D33A'
    }),
    __metadata("design:type", String)
], keySharingExchange.prototype, "keySigningRequest", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'importRequest',
        description: 'The object of the sharing session <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        default: 'importRequest',
        example: '7F3259F621560CBD2D33ADFF5E1BE4F7566760CBD2D33ADFF55E201A030820145A00302010202083A0751A60622A86E1BE4FF621560CBD2D33A'
    }),
    __metadata("design:type", String)
], keySharingExchange.prototype, "importRequest", void 0);
exports.keySharingExchange = keySharingExchange;
//# sourceMappingURL=voem.session.swagger.object.js.map