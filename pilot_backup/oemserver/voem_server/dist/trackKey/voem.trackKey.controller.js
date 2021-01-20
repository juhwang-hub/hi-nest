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
exports.VoemVerifierInfoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const voem_trackKey_service_1 = require("./voem.trackKey.service");
const crypto_service_1 = require("../crypto/crypto.service");
const common_2 = require("@nestjs/common");
const swaggerObj = require("./entity/voem.trackKey.swagger.object");
let VoemVerifierInfoController = class VoemVerifierInfoController {
    constructor(vService, vCrypto) {
        this.vService = vService;
        this.vCrypto = vCrypto;
    }
    async genVerifier(requestId, voemUserId, password_str, res) {
        await this.vService.generateVerifierHeadParam(requestId, voemUserId, password_str);
        let salt_str = 'yellowsubmarines';
        let password = Buffer.from(password_str);
        let salt = Buffer.from(salt_str);
        let checkList = await this.vService.checkVerifier(voemUserId);
        if (!checkList || checkList == undefined) {
            await this.vService.insertVerifierDB(voemUserId, 'false', '', '', '', '');
        }
        checkList = await this.vService.checkVerifier(voemUserId);
        if (checkList && checkList.exist_verifier) {
            if (checkList.exist_verifier == 'true') {
                common_2.Logger.error('20210120 수정');
                await this.vService.IfVerifierExistAndSame(voemUserId, requestId, res);
            }
            else {
                common_2.Logger.error('20210120 수정');
                await this.vService.IfVerifierDoesNotExist(voemUserId, password, salt, salt_str, password_str, res, requestId);
            }
        }
        else {
            common_2.Logger.error('20210120 수정');
            await this.vService.IfVerifierDifferent(voemUserId, requestId, res);
        }
    }
    async getVerifier(requestId, voemVehicleId, req, res) {
        await this.vService.getVerifierHeadParam(requestId, voemVehicleId);
        let resultObj = await this.vService.checkVerifier(voemVehicleId);
        if (resultObj) {
            await this.vService.getVerifierLoggerExist(voemVehicleId, requestId, res);
        }
        else {
            await this.vService.getVerifierLoggerNotExist(voemVehicleId, requestId, res);
        }
    }
    async trackKey(requestId, deviceOemId, encryptionCertChain, encryptionVersion, keyID, keyType, deviceType, accountIDHash, keyData, res) {
        await this.vService.trackKeyStartLogger(requestId, deviceOemId, encryptionCertChain, encryptionVersion, keyID, keyType, deviceType, accountIDHash, keyData);
        await this.vService.checkParamsValidity(requestId, deviceOemId, encryptionCertChain, encryptionVersion, keyID, keyType, deviceType, accountIDHash);
        common_2.Logger.log('[trackKey API] KeyType : ' + keyType);
        common_2.Logger.log('[trackKey API] 1. encryptionCertChain 검증 실시');
        encryptionCertChain = [
            '3082020d308201b4a003020102020101300a06082a8648ce3d0403023052310b3009060355040613024b5231123010060355040a0c094175746f437279707431143012060355040b0c0b4d6f62696c697479526e443119301706035504030c1050494c4f542e44657669636552434132301e170d3230303732323031333235375a170d3330303732323031333235375a3052310b3009060355040613024b5231123010060355040a0c094175746f437279707431143012060355040b0c0b4d6f62696c697479526e443119301706035504030c1050494c4f542e446576696365524341323059301306072a8648ce3d020106082a8648ce3d03010703420004257046e96bbc14a1055ac99cbfae8ecb95c8672a440ba9636e524cc41f4b8e5f523244b4bc30ad810b812a4f4d957a2e3fc808c0f40cc284338cc9fde4967e4da37b3079301f0603551d230418301680144cdb48003524e6f4ddb6aa0d08c817e8a102378c301d0603551d0e041604144cdb48003524e6f4ddb6aa0d08c817e8a102378c3016060a2b0601040182c46905090101ff04053003020103300e0603551d0f0101ff040403020106300f0603551d130101ff040530030101ff300a06082a8648ce3d04030203470030440220057b8d04cf31ca5ab3751780fc68004f1b327d665a8b409abe67e0508a57174d0220513ba9393ab8d296c01bc8a94a91cf937e1dc34747957a6233f040c0f8b9ad6a',
            '308202793082021ea003020102020102300a06082a8648ce3d0403023052310b3009060355040613024b5231123010060355040a0c094175746f437279707431143012060355040b0c0b4d6f62696c697479526e443119301706035504030c1050494c4f542e44657669636552434132301e170d3230303732323031333630365a170d3330303732323031333630365a305c310b3009060355040613024b5231123010060355040a0c094175746f437279707431143012060355040b0c0b4d6f62696c697479526e443123302106035504030c1a494e53542e4155544f2e383836413635394330454642363436333059301306072a8648ce3d020106082a8648ce3d0301070342000466cb8914f3b187759d6793a55da38f72f73248d0ca10ff94acd77df9a8eb23b90df9f7c26e3ffaed3805219be12371af682957f7f6d58f879d31af6bcd152831a381da3081d7307a0603551d230473307180144cdb48003524e6f4ddb6aa0d08c817e8a102378ca156a4543052310b3009060355040613024b5231123010060355040a0c094175746f437279707431143012060355040b0c0b4d6f62696c697479526e443119301706035504030c1050494c4f542e44657669636552434132820101301d0603551d0e041604149dc1b2a9254364d54ffcb25cc357b08c6bae9bf13016060a2b0601040182c46905080101ff04053003020103300e0603551d0f0101ff04040302010630120603551d130101ff040830060101ff020100300a06082a8648ce3d04030203490030460221009e2a0830eec833592fe7dfb5fca0fb91a2e6df3176283af30a23fbbb85bf12a7022100c866207876ab584e8fd6f1947c74c2e795e4f205f5cf79c93c5b1ae9ca195bfe',
            '308202a73082024da003020102020600e8d4a51011300a06082a8648ce3d040302305c310b3009060355040613024b5231123010060355040a0c094175746f437279707431143012060355040b0c0b4d6f62696c697479526e443123302106035504030c1a494e53542e4155544f2e38383641363539433045464236343633301e170d3230303732313135303030305a170d3330303732303134353935395a3020311e301c06035504030c15454e434b2e383436413634363335394330454643363059301306072a8648ce3d020106082a8648ce3d0301070342000449f02700b7dd679ff878eb51f5f7cfe077353f9ef2131e39ac94ea97a17404cc2d940db733c7807540a72edbf26969c949ee4d99a39c82e4854b3b41ea3da1e4a382013530820131307a0603551d230473307180149dc1b2a9254364d54ffcb25cc357b08c6bae9bf1a156a4543052310b3009060355040613024b5231123010060355040a0c094175746f437279707431143012060355040b0c0b4d6f62696c697479526e443119301706035504030c1050494c4f542e44657669636552434132820102301d0603551d0e04160414a1306c8cb51c40468fd4b8ab612215303a55f141300e0603551d0f0101ff04040302041030200603551d11041930178215454e434b2e3834364136343633353943304546433630540603551d1f044d304b3049a047a04586432f636e3d64705f4438726275637432546b69716d552d6a413165435a6770302c6f753d4d6f62696c697479526e442c6f3d4175746f43727970742c633d4b522e63726c300c0603551d130101ff04023000300a06082a8648ce3d0403020348003045022100979281d329ae88f17af2a980e4e0c1e0e43c94afc55743a68a19735173680d750220399daf59234c44fd550ccd891dfb9a803aff4ed4a7702058aec14f5058dd2d14'
        ];
        for (var i = 0; i < encryptionCertChain.length; i++) {
            var result = true;
            if (i == 0) {
                result = await this.vCrypto.verifyDerCert(encryptionCertChain[0], encryptionCertChain[0]);
            }
            else {
                result = await this.vCrypto.verifyDerCert(encryptionCertChain[i], encryptionCertChain[i - 1]);
            }
            if (result == false) {
                common_2.Logger.error('[trackKey API] encryptionCertChain 체인 검증 실패');
                throw new common_1.HttpException('[trackKey API] encryptionCertChain Verification Failed', 498);
                break;
            }
        }
        common_2.Logger.log('[trackKey API] 2. Vehicle OEM Server에 KeyId에 대응하는 디지털 키 정보가 저장되어 있는지 확인 [데이터베이스 조회]');
        let resultObj = await this.vService.getDKInfo(keyID);
        if (resultObj) {
            if (keyType == 'OWNER') {
                common_2.Logger.error('20210120 수정');
                await this.vService.IfOwnerKeyExist(keyID, resultObj, requestId, res);
            }
        }
        else if (keyType == 'OWNER') {
            common_2.Logger.log('[trackKey API] => 해당 Key ID (' + keyID + ')가 존재하지 않으므로 Owner Key 등록 시작');
            let recipientSK = '53a3a4dd9b9cfc7360d3b35d238f27df671c13d85aeff53e9d49588f17676e0f';
            let recipientPK = '04eae30354337c7938312f96fd03c450b5180b5f3136394129d973a9aa6e3ad984df446e599e50a1b372944d6515fa8007ee5acebbe33e19fe0bd2aec8f7ff652f';
            let encryptedData = JSON.parse(keyData);
            let dataBuff = Buffer.from(encryptedData.data, 'base64');
            let data = dataBuff.toString('ascii');
            common_2.Logger.log('[trackKey API] 4. Device로부터 전달받은 암호화된 KeyData 복호화');
            let decryptedData = await this.vCrypto.decryptEncData(recipientSK, recipientPK, encryptedData.ephemeralPublicKey.toString('hex'), encryptedData.publicKeyHash.toString('hex'), data);
            let jsonObj = JSON.parse(decryptedData.toString());
            if (jsonObj.version == 'failed') {
                common_2.Logger.error('[Track Key] The KeyData is not valid- Decryption is failed');
                throw new common_1.HttpException('[Track Key] The KeyData is not valid- Decryption is failed', 498);
            }
            common_2.Logger.log('[trackKey API] 5. 복호화한 keyData에서 DeviceICA Cert와 DKCert를 추출');
            let DeviceICACert = jsonObj.ICACert;
            let DKCert = jsonObj.DKCert;
            common_2.Logger.log('[trackKey API] 6. Device Root OEM 인증서를 DB에서 조회 (Using doem Id)');
            let device_oem_cert = await this.vService.getRootOEMInfo(deviceOemId);
            if (device_oem_cert == undefined) {
                common_2.Logger.error('[Track Key] The device OEM Id is invalid');
                throw new common_1.HttpException('The device OEM Id is invalid', 499);
            }
            common_2.Logger.log('[trackKey API] 7. Device의 DER 인증서 체인 검증');
            let result1 = await this.vCrypto.verifyDerCert(DeviceICACert, device_oem_cert.root_oem_cert);
            if (!result1) {
                common_2.Logger.error('[trackKey API] Device OEM Root 인증서에서 Device ICA 인증서를 인증할 수 없습니다.');
                throw new common_1.HttpException('chain verification is failed', 494);
            }
            let result2 = await this.vCrypto.verifyDerCert(DKCert, DeviceICACert);
            if (!result2) {
                common_2.Logger.error('[trackKey API] Device ICA 인증서에서 Digital Key 인증서를 인증할 수 없습니다.');
                throw new common_1.HttpException('chain verification is failed', 494);
            }
            common_2.Logger.log('[trackKey API] => Device의 DER 인증서 체인 검증 성공 [OEM Root Cert => ICA Cert => DK Cert]');
            common_2.Logger.log('[trackKey API] 8. 체인 검증 성공 시 Owner Key Request의 각 필드들을 추출');
            let temp = await this.vCrypto.getDerCertPubKey(DKCert);
            let validTime = await this.vCrypto.getDerCertValidTime(jsonObj.DKCert);
            let vehicle_id = jsonObj.VehicleID;
            await this.vService.insertDKinfo(keyID, vehicle_id, 1, deviceOemId, keyID, temp.pubKeyHex, keyType, deviceType, accountIDHash, DeviceICACert, DKCert, encryptedData.ephemeralPublicKey.toString('hex'), encryptedData.version, validTime.keyValidFrom, validTime.keyValildTo, "3", "5", "false").then(function (result) {
                common_2.Logger.log('[trackKey API] => 데이터베이스에 Digital Key 데이터베이스에 저장 성공');
            }).catch(function (error) {
                common_2.Logger.error('[trackKey API] 데이터베이스에 Digital Key 데이터베이스에 저장 실패');
                throw new common_1.HttpException(error, 400);
            });
            let uiBundleSample = await this.vService.uiSampleGenerator("3045022017B00D20D47E8624C851473602A02BFCD4F4C0DB02C2FA1A4A1E56A9530019CE289D4", validTime.keyValidFrom, validTime.keyValildTo, "3", "7", "35E3406EFDA511E88EB2F2801F1B9FD1");
            common_2.Logger.log('[trackKey API] 9. 암호화된 uiBundle과 DK에 있는 Vehicle Identifier를 통해 차량의 brand와 model을 응답으로 리턴함');
            common_2.Logger.log('[trackKey API] => 해당 Key Id ' + keyID + ' 에 대응하는 Vehicle id : ' + vehicle_id);
            let vehicle_info = await this.vService.getVehicleInfo(vehicle_id);
            common_2.Logger.log('[trackKey API] => 해당 Vehicle Id ' + vehicle_id + '에 대응하는 Vehicle Brand : ' + vehicle_info.vehicle_brand);
            common_2.Logger.log('[trackKey API] => 해당 Vehicle Id ' + vehicle_id + '에 대응하는 Vehicle Model : ' + vehicle_info.vehicle_model);
            let resultDataObj = {
                'uiBundle': uiBundleSample,
                'brand': vehicle_info.vehicle_brand,
                'model': vehicle_info.vehicle_model
            };
            resultDataObj['result_type'] = "1";
            res.set('x-responseId', requestId);
            res.send(resultDataObj);
            common_2.Logger.log('[trackKey API] 10. 해당 Key ID (' + keyID + ')가 Owner Key 등록 완료');
            common_2.Logger.log('==============================================================================');
            common_2.Logger.log('전달한 응답 : ' + JSON.stringify(resultDataObj).substr(0, 50) + '...');
            common_2.Logger.log('==============================================================================');
        }
        else if (keyType == 'SHARED') {
            common_2.Logger.log('[trackKey API] => 해당 Key ID (friend_digital_key_id_sample)가 존재하지 않으므로 Friend Key 등록 시작');
            let recipientSK = '53a3a4dd9b9cfc7360d3b35d238f27df671c13d85aeff53e9d49588f17676e0f';
            let recipientPK = '04eae30354337c7938312f96fd03c450b5180b5f3136394129d973a9aa6e3ad984df446e599e50a1b372944d6515fa8007ee5acebbe33e19fe0bd2aec8f7ff652f';
            common_2.Logger.error('20210120 수정');
            let encryptedData = JSON.parse(keyData);
            let dataBuff = Buffer.from(encryptedData.data, 'base64');
            let data = dataBuff.toString('ascii');
            common_2.Logger.log('[trackKey API] 4. Device로부터 전달받은 암호화된 KeyData 복호화');
            let decryptedData = await this.vCrypto.decryptEncData(recipientSK, recipientPK, encryptedData.ephemeralPublicKey.toString('hex'), encryptedData.publicKeyHash.toString('hex'), data);
            let jsonObj = JSON.parse(decryptedData.toString());
            if (jsonObj.version == 'failed') {
                common_2.Logger.error('[Track Key] The KeyData is not valid- Decryption is failed');
                throw new common_1.HttpException('[Track Key] The KeyData is not valid- Decryption is failed', 498);
            }
            common_2.Logger.log('[trackKey API] 5. 복호화한 keyData에서 DeviceICA Cert와 DKCert를 추출');
            let DeviceICACert = jsonObj.ICACert;
            let DKCert = jsonObj.DKCert;
            common_2.Logger.log('[trackKey API] 6. Device Root OEM 인증서를 DB에서 조회 (Using doem Id)');
            let device_oem_cert = await this.vService.getRootOEMInfo(deviceOemId);
            if (device_oem_cert == undefined) {
                common_2.Logger.error('[Track Key] The device OEM Id is invalid');
                throw new common_1.HttpException('The device OEM Id is invalid', 499);
            }
            common_2.Logger.log('[trackKey API] 7. Device의 DER 인증서 체인 검증');
            let result1 = await this.vCrypto.verifyDerCert(DeviceICACert, device_oem_cert.root_oem_cert);
            if (!result1) {
                common_2.Logger.error('[trackKey API] Device OEM Root 인증서에서 Device ICA 인증서를 인증할 수 없습니다.');
                throw new common_1.HttpException('chain verification is failed', 494);
            }
            let result2 = await this.vCrypto.verifyDerCert(DKCert, DeviceICACert);
            if (!result2) {
                common_2.Logger.error('[trackKey API] Device ICA 인증서에서 Digital Key 인증서를 인증할 수 없습니다.');
                throw new common_1.HttpException('chain verification is failed', 494);
            }
            common_2.Logger.log('[trackKey API] => Device의 DER 인증서 체인 검증 성공 [OEM Root Cert => ICA Cert => DK Cert]');
            common_2.Logger.log('[trackKey API] 8. 체인 검증 성공 시 Friend Key Request의 각 필드들을 추출');
            let temp = await this.vCrypto.getDerCertPubKey(DKCert);
            let validTime = await this.vCrypto.getDerCertValidTime(jsonObj.DKCert);
            let vehicle_id = jsonObj.VehicleID;
            await this.vService.insertDKinfo('friend_digital_key_id_sample', vehicle_id, 1, deviceOemId, keyID, temp.pubKeyHex, keyType, deviceType, accountIDHash, DeviceICACert, DKCert, encryptedData.ephemeralPublicKey.toString('hex'), encryptedData.version, validTime.keyValidFrom, validTime.keyValildTo, "3", "5", "false").then(function (result) {
                common_2.Logger.log('[trackKey API] => 데이터베이스에 Digital Key 데이터베이스에 저장 성공');
            }).catch(function (error) {
                common_2.Logger.error('[trackKey API] 데이터베이스에 Digital Key 데이터베이스에 저장 실패');
                throw new common_1.HttpException(error, 400);
            });
            let uiBundleSample = await this.vService.uiSampleGenerator("3045022017B00D20D47E8624C851473602A02BFCD4F4C0DB02C2FA1A4A1E56A9530019CE289D4", validTime.keyValidFrom, validTime.keyValildTo, "3", "7", "35E3406EFDA511E88EB2F2801F1B9FD1");
            common_2.Logger.log('[trackKey API] 9. 암호화된 uiBundle과 DK에 있는 Vehicle Identifier를 통해 차량의 brand와 model을 응답으로 리턴함');
            common_2.Logger.log('[trackKey API] => 해당 Key Id ' + keyID + ' 에 대응하는 Vehicle id : ' + vehicle_id);
            let vehicle_info = await this.vService.getVehicleInfo(vehicle_id);
            common_2.Logger.log('[trackKey API] => 해당 Vehicle Id ' + vehicle_id + '에 대응하는 Vehicle Brand : ' + vehicle_info.vehicle_brand);
            common_2.Logger.log('[trackKey API] => 해당 Vehicle Id ' + vehicle_id + '에 대응하는 Vehicle Model : ' + vehicle_info.vehicle_model);
            let resultDataObj = {
                'uiBundle': uiBundleSample,
                'eventType': 'SHARED_KEY_ADDED',
                'eventData': '',
                'brand': vehicle_info.vehicle_brand,
                'model': vehicle_info.vehicle_model
            };
            resultDataObj['result_type'] = "1";
            res.set('x-responseId', requestId);
            res.send(resultDataObj);
            common_2.Logger.log('[trackKey API] 10. 해당 Key ID (' + keyID + ')가 Friend Key 등록 완료');
            common_2.Logger.log('==============================================================================');
            common_2.Logger.log('전달한 응답 : ' + JSON.stringify(resultDataObj).substr(0, 50) + '...');
            common_2.Logger.log('==============================================================================');
            let friendKeyId = 'friend_digital_key_id_sample';
            let http = new common_1.HttpService();
            let ownerKeyId = await this.vService.getDeviceOemInfo(keyID);
            let ownerDeviceOemInfoUrl = await this.vService.getRootOemUrl(ownerKeyId);
            let eventData = new Map();
            eventData.set('status', 'Active');
            eventData.set('keyValidFrom', validTime.keyValidFrom);
            eventData.set('keyValidTo', validTime.keyValildTo);
            eventData.set('reason', 'Shared key added');
            let eventNotificationData = { 'keyID': '', 'eventType': 'SHARED_KEY_ADDED', 'eventData': eventData };
            let vehicleOemId = 'Genesis';
            let x_timestamp = new Date().getTime();
            common_2.Logger.log(ownerDeviceOemInfoUrl + '/session/eventNotification');
            let httpPostResult = await http.post(ownerDeviceOemInfoUrl + '/session/eventNotification', eventNotificationData, {
                headers: {
                    'x-timestamp': x_timestamp,
                    'x-requestid': requestId,
                    'x-vehicle-oemid': vehicleOemId,
                },
                method: 'POST',
                data: null
            }).toPromise()
                .catch(e => {
                common_2.Logger.error('[trackKey API] Owner Device Server로 eventNotification API 요청 실패');
                common_2.Logger.error(e);
                throw new common_1.HttpException(e, 567);
            });
            common_2.Logger.log('=======================================================================');
            common_2.Logger.log('=== [trackKey API] Owner Device Server로 eventNotification API 요청됨 ===');
            common_2.Logger.log('=======================================================================');
            return httpPostResult.data;
        }
    }
};
__decorate([
    common_1.Post('generateVerifier'),
    swagger_1.ApiOperation({ summary: 'The owner device can request to generate the verifier using this API' }),
    swagger_1.ApiHeader({
        name: 'x-requestid',
        description: '550a501552eedde2cd410b94c77bb58a0e8327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    }),
    swagger_1.ApiBody({ type: swaggerObj.GenerateVerifierWithSwagger }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Body('x-voem-UserId')),
    __param(2, common_1.Body('password')),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], VoemVerifierInfoController.prototype, "genVerifier", null);
__decorate([
    common_1.Post('getVerifier'),
    swagger_1.ApiOperation({ summary: 'The vehicle can request the verifier using this API' }),
    swagger_1.ApiHeader({
        name: 'x-requestid',
        description: '550a501552eedde2cd410b94c77bb58a0e8327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    }),
    swagger_1.ApiBody({ type: swaggerObj.GetVerifierWithSwagger }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Body('x-voem-vehicleid')),
    __param(2, common_1.Req()),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], VoemVerifierInfoController.prototype, "getVerifier", null);
__decorate([
    common_1.Post('trackKey'),
    swagger_1.ApiOperation({ summary: 'This is a generic API offered by the Vehicle OEM Server to track a Digital Key. <br> If trackKey is called for a keyID that is already registered, the API call shall be successful and return with a usual response. ' }),
    swagger_1.ApiHeader({
        name: 'x-requestid',
        description: '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
        example: '550a501552eedde2cd410b94c77bb58a0e8327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    }),
    swagger_1.ApiHeader({
        name: 'x-device-oemid',
        description: 'owner_device_oem',
        example: 'owner_device_oem',
    }),
    swagger_1.ApiBody({ type: swaggerObj.TrackKeyWithSwagger }),
    common_1.HttpCode(200),
    __param(0, common_1.Headers('x-requestid')),
    __param(1, common_1.Headers('x-device-oemid')),
    __param(2, common_1.Body('encryptionCertChain')),
    __param(3, common_1.Body('encryptionVersion')),
    __param(4, common_1.Body('keyID')),
    __param(5, common_1.Body('keyType')),
    __param(6, common_1.Body('deviceType')),
    __param(7, common_1.Body('accountIDHash')),
    __param(8, common_1.Body('keyData')),
    __param(9, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], VoemVerifierInfoController.prototype, "trackKey", null);
VoemVerifierInfoController = __decorate([
    swagger_1.ApiTags('trackKey'),
    common_1.Controller('trackKey'),
    __metadata("design:paramtypes", [voem_trackKey_service_1.VoemVerifierInfoService,
        crypto_service_1.CryptoService])
], VoemVerifierInfoController);
exports.VoemVerifierInfoController = VoemVerifierInfoController;
//# sourceMappingURL=voem.trackKey.controller.js.map