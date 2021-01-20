"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const rs = require("jsrsasign");
let CryptoService = class CryptoService {
    async encrypt(recvPubKey, msg) {
        let ecdhCtx = crypto.createECDH('prime256v1');
        let senderPubKey = ecdhCtx.generateKeys();
        let sharedSecret = ecdhCtx.computeSecret(recvPubKey);
        let sharedInfo = senderPubKey.toString('hex') + recvPubKey.toString('hex');
        let shaHash = crypto.createHash('sha256');
        let counter = Buffer.from('00000001', 'hex');
        let keyingMaterial = shaHash.update(Buffer.concat([sharedSecret, counter, Buffer.from(sharedInfo, 'hex')])).digest();
        let encryptionkey = keyingMaterial.slice(0, 16);
        let iv = keyingMaterial.slice(16, 32);
        let aesGcm = crypto.createCipheriv('aes-128-gcm', encryptionkey, iv);
        let encrypted = aesGcm.update(msg);
        encrypted = Buffer.concat([encrypted, aesGcm.final()]);
        encrypted = Buffer.concat([encrypted, aesGcm.getAuthTag()]);
        shaHash = crypto.createHash('sha256');
        let PKFingerprint = shaHash.update(recvPubKey).digest();
        return [encrypted, PKFingerprint, senderPubKey];
    }
    async decrypt(recvPrivKey, recvPubKey, senderPubKey, encrypted) {
        let ecdhCtx = crypto.createECDH('prime256v1');
        ecdhCtx.setPrivateKey(recvPrivKey);
        let sharedSecret = ecdhCtx.computeSecret(senderPubKey);
        let sharedInfo = senderPubKey.toString('hex') + recvPubKey.toString('hex');
        let shaHash = crypto.createHash('sha256');
        let counter = Buffer.from('00000001', 'hex');
        let keyingMaterial = shaHash.update(Buffer.concat([sharedSecret, counter, Buffer.from(sharedInfo, 'hex')])).digest();
        let encryptionkey = keyingMaterial.slice(0, 16);
        let iv = keyingMaterial.slice(16, 32);
        let decihperGcm = crypto.createDecipheriv('aes-128-gcm', encryptionkey, iv);
        decihperGcm.setAuthTag(encrypted.slice(encrypted.length - 16, encrypted.length));
        let decrypted = decihperGcm.update(encrypted.slice(0, encrypted.length - 16));
        decrypted = Buffer.concat([decrypted, decihperGcm.final()]);
        return decrypted;
    }
    async decryptEncData(recvPrivKey, recvPubKey, senderPubKey, PKFingerprint, encrypted) {
        let shaHash = crypto.createHash('sha256');
        let hashedReciptPK = shaHash.update(Buffer.from(recvPubKey, 'hex')).digest();
        if (PKFingerprint != hashedReciptPK.toString('hex')) {
            console.log('여긴안오지?');
            return 'fail';
        }
        let decrypted;
        await this.decrypt(Buffer.from(recvPrivKey, 'hex'), Buffer.from(recvPubKey, 'hex'), Buffer.from(senderPubKey, 'hex'), Buffer.from(encrypted, 'hex')).then(function (resolvedData) {
            decrypted = resolvedData.toString();
        }).catch(function (error) {
            common_1.Logger.error("[EncData decryption] : The decryption process is failed");
            console.log(error);
            let obj = { 'version': 'failed' };
            decrypted = JSON.stringify(obj);
        });
        return decrypted;
    }
    async createEncDataContainer(recvPubKey, senderPubKey, msg) {
        let recvPubKeyBuffer = Buffer.from(recvPubKey, 'hex');
        let msgBuffer = Buffer.from(msg);
        let encryptObj = await this.encrypt(recvPubKeyBuffer, msgBuffer);
        let shaHash = crypto.createHash('sha256');
        let publicKeyHash = shaHash.update(Buffer.concat([Buffer.from(senderPubKey, 'hex'), Buffer.from(recvPubKey, 'hex')])).digest();
        shaHash = crypto.createHash('sha256');
        publicKeyHash = shaHash.update(Buffer.from(recvPubKey, 'hex')).digest();
        let result = { 'version': 'ECIES_v1', 'ephemeralPublicKey': encryptObj[2].toString('hex'), 'publicKeyHash': publicKeyHash.toString('hex'), 'data': encryptObj[0].toString('hex') };
        let resultString = JSON.stringify(result);
        return resultString;
    }
    async genVerifier(recvPassword, recvSalt, recv_N, recv_r, recv_p) {
        let derivedKey = await crypto.scryptSync(recvPassword, recvSalt, 80, { N: recv_N, r: recv_r, p: recv_p, maxmem: 1024 * 1024 * 1024 });
        let z0_bn = BigInt('0x' + derivedKey.subarray(0, 40).toString('hex'));
        let z1_bn = BigInt('0x' + derivedKey.subarray(40, 80).toString('hex'));
        let n_1 = BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632550");
        let w0_bn = z0_bn % n_1 + BigInt(1);
        let w1_bn = z1_bn % n_1 + BigInt(1);
        let ecdhCtx = crypto.createECDH('prime256v1');
        ecdhCtx.setPrivateKey(Buffer.from(w1_bn.toString(16), 'hex'));
        let w0 = w0_bn.toString(16);
        let L = ecdhCtx.getPublicKey().toString('hex');
        let resultJSON = { "w0": w0, "L": L, "salt": recvSalt };
        let result = JSON.stringify(resultJSON);
        return result;
    }
    async verifyCert(cert, issuerCert) {
        let parentCert = new rs.X509();
        parentCert.readCertPEM(issuerCert);
        let rootPK = await parentCert.getPublicKey();
        let subCert = new rs.X509();
        subCert.readCertPEM(cert);
        let verifyResult = await subCert.verifySignature(rootPK);
        return verifyResult;
    }
    async verifyDerCert(cert, issuerCert) {
        let parentCert = new rs.X509();
        parentCert.readCertHex(issuerCert);
        let rootPK = await parentCert.getPublicKey();
        let subCert = new rs.X509();
        subCert.readCertHex(cert);
        let verifyResult = await subCert.verifySignature(rootPK);
        return verifyResult;
    }
    async getValidTime(cert) {
        let certificate = new rs.X509();
        certificate.readCertPEM(cert);
        let keyValidFrom = certificate.getNotBefore();
        let keyValidFrom2 = '20'
            + keyValidFrom.substring(0, 2) + '-'
            + keyValidFrom.substring(2, 4) + '-'
            + keyValidFrom.substring(4, 6) + 'T'
            + keyValidFrom.substring(6, 8) + ':'
            + keyValidFrom.substring(8, 10) + ':'
            + keyValidFrom.substring(10, 12) + ':'
            + keyValidFrom.substring(12);
        let keyValildTo = certificate.getNotAfter();
        let keyValidTo2 = '20'
            + keyValildTo.substring(0, 2) + '-'
            + keyValildTo.substring(2, 4) + '-'
            + keyValildTo.substring(4, 6) + 'T'
            + keyValildTo.substring(6, 8) + ':'
            + keyValildTo.substring(8, 10) + ':'
            + keyValildTo.substring(10, 12) + ':'
            + keyValildTo.substring(12);
        let result = { 'keyValidFrom': keyValidFrom2, 'keyValildTo': keyValidTo2 };
        return result;
    }
    async getDerCertValidTime(cert) {
        let certificate = new rs.X509();
        certificate.readCertHex(cert);
        let keyValidFrom = certificate.getNotBefore();
        let keyValidFrom2 = '20'
            + keyValidFrom.substring(0, 2) + '-'
            + keyValidFrom.substring(2, 4) + '-'
            + keyValidFrom.substring(4, 6) + 'T'
            + keyValidFrom.substring(6, 8) + ':'
            + keyValidFrom.substring(8, 10) + ':'
            + keyValidFrom.substring(10, 12) + ':'
            + keyValidFrom.substring(12);
        let keyValildTo = certificate.getNotAfter();
        let keyValidTo2 = '20'
            + keyValildTo.substring(0, 2) + '-'
            + keyValildTo.substring(2, 4) + '-'
            + keyValildTo.substring(4, 6) + 'T'
            + keyValildTo.substring(6, 8) + ':'
            + keyValildTo.substring(8, 10) + ':'
            + keyValildTo.substring(10, 12) + ':'
            + keyValildTo.substring(12);
        let result = { 'keyValidFrom': keyValidFrom2, 'keyValildTo': keyValidTo2 };
        return result;
    }
    async getPubKey(cert) {
        let certificate = new rs.X509();
        certificate.readCertPEM(cert);
        let pubKey = certificate.getPublicKey();
        return pubKey;
    }
    async getDerCertPubKey(cert) {
        let certificate = new rs.X509();
        certificate.readCertHex(cert);
        let pubKey = certificate.getPublicKey();
        return pubKey;
    }
    async doSign(msg, privKey) {
        let ec = new rs.crypto.ECDSA({ 'curve': 'secp256r1' });
        let hash = rs.crypto.Util.sha256(msg);
        let sigValue = ec.signHex(hash, privKey);
        let signature = rs.crypto.ECDSA.asn1SigToConcatSig(sigValue);
        return signature;
    }
    async doVerify(msg, sig, pubKey) {
        let ec = new rs.crypto.ECDSA({ 'curve': 'secp256r1' });
        let hash = rs.crypto.Util.sha256(msg);
        let verValue = ec.verifyHex(hash, rs.crypto.ECDSA.biRSSigToASN1Sig(sig.substring(0, 64), sig.substring(64, 128)), pubKey);
        return verValue;
    }
};
CryptoService = __decorate([
    common_1.Injectable()
], CryptoService);
exports.CryptoService = CryptoService;
//# sourceMappingURL=crypto.service.js.map