"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let CredentialService = class CredentialService {
    constructor() {
        this.keyStorage = new Map();
        this.ecdhCtx = crypto.createECDH('prime256v1');
    }
    generateKeyPair() {
        this.ecdhCtx.generateKeys();
        let shaHash = crypto.createHash('sha256');
        let keyId = shaHash.update(this.ecdhCtx.getPublicKey()).digest().slice(0, 8);
        let keyPair = {
            privateKey: this.ecdhCtx.getPrivateKey(),
            publicKey: this.ecdhCtx.getPublicKey(),
            keyId
        };
        this.keyStorage.set(keyId, keyPair);
        return keyId;
    }
    getPublicKey(keyId) {
        return this.keyStorage.get(keyId).publicKey;
    }
    getPrivateKey(keyId) {
        return this.keyStorage.get(keyId).privateKey;
    }
};
CredentialService = __decorate([
    common_1.Injectable()
], CredentialService);
exports.CredentialService = CredentialService;
//# sourceMappingURL=credential.service.js.map