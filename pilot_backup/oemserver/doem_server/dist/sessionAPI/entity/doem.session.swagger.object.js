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
exports.CreateSharedKey = exports.EventNotification = exports.CancelSharingSession = exports.RedeemSharingSession = exports.GenerateSharingSession = void 0;
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
        example: '{"sessionID":""}'
    }),
    __metadata("design:type", String)
], RedeemSharingSession.prototype, "sharingSession", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'friendDeviceHandle',
        description: 'the object of the friendDeviceHandle <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        example: 'c4iC-v1ZTMKwH8oZGeybVJ:APA91bHcjGv-jgziN4Ip76U54YsWT8169e1ydWuhVOEcAZY2ZXhxlikZdR4VMzfGGUp428tRWcSmy3g5v96NrJPHNJnOU7XNbiXcPzAqGYbCLpCV0kz3L9s0zS9Ja-zno9zBfyrSN9Lu'
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
        example: '{"sessionID":""}'
    }),
    __metadata("design:type", String)
], CancelSharingSession.prototype, "sharingSession", void 0);
exports.CancelSharingSession = CancelSharingSession;
class EventNotification {
}
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'KeyId',
        description: 'The object of the sharing session <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        example: ''
    }),
    __metadata("design:type", String)
], EventNotification.prototype, "KeyId", void 0);
__decorate([
    swagger_1.ApiProperty({
        title: 'eventType',
        type: () => String,
        description: 'The object of the sharing session <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        example: ''
    }),
    __metadata("design:type", String)
], EventNotification.prototype, "eventType", void 0);
__decorate([
    swagger_1.ApiProperty({
        title: 'eventData',
        type: () => String,
        description: 'The object of the sharing session <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        example: ''
    }),
    __metadata("design:type", String)
], EventNotification.prototype, "eventData", void 0);
exports.EventNotification = EventNotification;
class CreateSharedKey {
}
__decorate([
    swagger_1.ApiProperty({
        title: 'KeyAction',
        type: () => String,
        description: 'Generation Shared Session API Test <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        example: 'CREATE_SHARED_KEY, SIGN_SHARED_KEY, IMPORT_SHARED_KEY'
    }),
    __metadata("design:type", Object)
], CreateSharedKey.prototype, "keyAction", void 0);
__decorate([
    swagger_1.ApiProperty({
        title: 'KeyId',
        type: () => String,
        description: 'Generation Shared Session API Test <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        example: 'owner_digital_key_id_sample'
    }),
    __metadata("design:type", Object)
], CreateSharedKey.prototype, "keyID", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: () => String,
        title: 'sharingSession',
        description: 'The object of the sharing session <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        example: '{"sessionID":""}'
    }),
    __metadata("design:type", String)
], CreateSharedKey.prototype, "sharingSession", void 0);
__decorate([
    swagger_1.ApiProperty({
        title: 'keyCreationRequest',
        type: () => String,
        description: 'Generation Shared Session API Test <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        example: '7F3159F621560CBD2D33ADFF5E1BE4F7566760CBD2D33ADFF55E201A030820145A00302010202083A0751A60622AF621560CBD2D30145A'
    }),
    __metadata("design:type", Object)
], CreateSharedKey.prototype, "keyCreationRequest", void 0);
__decorate([
    swagger_1.ApiProperty({
        title: 'keySigingRequest',
        type: () => String,
        description: 'Generation Shared Session API Test <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        example: '7F3659F621560CBD2D33ADFF5E1BE4F7566760CBD2D33ADFF55E201A030820145A0030201083A0751A60622A86E1BE4FF621563ADFF55E201A0'
    }),
    __metadata("design:type", Object)
], CreateSharedKey.prototype, "keySigingRequest", void 0);
__decorate([
    swagger_1.ApiProperty({
        title: 'importRequest',
        type: () => String,
        description: 'Generation Shared Session API Test <br />'
            + '@Max Length(bytes) : 128 <br />'
            + '@Description       : The Key Identifier <br />'
            + '@Required          : Mandatory',
        example: '7F3259F621560CBD2D33ADFF5E1BE4F7566760CBD2D33ADFF55E201A030820145A00302010202083A0751A60622A86E1BE4FF621560CBD760CBD2D33'
    }),
    __metadata("design:type", Object)
], CreateSharedKey.prototype, "importRequest", void 0);
exports.CreateSharedKey = CreateSharedKey;
//# sourceMappingURL=doem.session.swagger.object.js.map