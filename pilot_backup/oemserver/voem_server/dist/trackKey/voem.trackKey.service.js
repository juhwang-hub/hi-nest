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
exports.VoemVerifierInfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const voem_trackKey_entity_1 = require("./entity/voem.trackKey.entity");
const crypto_service_1 = require("../crypto/crypto.service");
let VoemVerifierInfoService = class VoemVerifierInfoService {
    constructor(userRepository, rootOemRepository, voemVehicleInfoRepository, OwnerKeyInfoRepository, voemDigitalKeyInfoRepository, voemRootOEMServerInfoRepository) {
        this.userRepository = userRepository;
        this.rootOemRepository = rootOemRepository;
        this.voemVehicleInfoRepository = voemVehicleInfoRepository;
        this.OwnerKeyInfoRepository = OwnerKeyInfoRepository;
        this.voemDigitalKeyInfoRepository = voemDigitalKeyInfoRepository;
        this.voemRootOEMServerInfoRepository = voemRootOEMServerInfoRepository;
    }
    async getAllUsers() {
        return await this.userRepository.find();
    }
    async checkVerifier(voem_user_id) {
        let result = await this.userRepository
            .createQueryBuilder()
            .select('t.exist_verifier')
            .from(voem_trackKey_entity_1.VoemVerifierInfo, 't')
            .where('t.voem_user_id = :id', { id: voem_user_id })
            .getOne();
        return result;
    }
    async getVerifierLoggerExist(voemVehicleId, requestId, res) {
        common_1.Logger.log('[getVerifier API] 2. 해당 ID ' + voemVehicleId + '(으)로 등록된 verifier DB조회');
        let result = await this.getVerifier(voemVehicleId);
        let jsonResult = result[0];
        jsonResult['result'] = "E00201";
        common_1.Logger.log('[getVerifier API] => 조회된 ' + voemVehicleId + ' 의 첫 번째 Verifier : ' + result[0].first_verifier.substr(0, 20) + '...');
        common_1.Logger.log('[getVerifier API] => 조회된 ' + voemVehicleId + ' 의 두 번째 Verifier : ' + result[0].second_verifier.substr(0, 20) + '...');
        common_1.Logger.log('[getVerifier API] => 조회된 ' + voemVehicleId + ' 의 Salt            : ' + result[0].salt);
        res.setHeader('x-responseId', requestId);
        res.send(jsonResult);
        common_1.Logger.log('[getVerifier API] 3. 차량에 해당 ID로 등록된 verifier 차량에 전달 완료');
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('전달한 응답 : ' + JSON.stringify(result[0]).substr(0, 50) + '...');
        common_1.Logger.log('==============================================================================');
    }
    async getVerifierLoggerNotExist(voemVehicleId, requestId, res) {
        common_1.Logger.log('[getVerifier API] 2. 해당 ID ' + voemVehicleId + ' 로 등록된 Identifier 가 존재하지 않음');
        let result = { "result": "E00202" };
        res.setHeader('x-responseId', requestId);
        res.send(result);
        common_1.Logger.log('[getVerifier API] 2. 차량에 (해당 ID ' + voemVehicleId + ' 로 등록된 Identifier 가 존재하지 않음) 응답 전송완료');
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('전달한 응답 : ' + JSON.stringify(result).substr(0, 50) + '...');
        common_1.Logger.log('==============================================================================');
    }
    async getVerifier(voem_user_id) {
        let result = await this.userRepository
            .createQueryBuilder()
            .select(['t.first_verifier', 't.second_verifier', 't.salt'])
            .from(voem_trackKey_entity_1.VoemVerifierInfo, 't')
            .where('t.voem_user_id = :id', { id: voem_user_id })
            .getMany();
        return result;
    }
    async insertVerifierDB(voem_user_id, exist_verifier, first_verifier, second_verifier, salt, password) {
        let testdb = new voem_trackKey_entity_1.VoemVerifierInfo();
        testdb.voem_user_id = voem_user_id;
        testdb.exist_verifier = exist_verifier;
        testdb.first_verifier = first_verifier;
        testdb.second_verifier = second_verifier;
        testdb.salt = salt;
        testdb.password = password;
        await this.userRepository.insert(testdb).catch(error => {
            console.log(error);
        });
    }
    async updateVerifierDB(voem_user_id, exist_verifier, first_verifier, second_verifier, salt, password) {
        let testdb = new voem_trackKey_entity_1.VoemVerifierInfo();
        testdb.voem_user_id = voem_user_id;
        testdb.exist_verifier = exist_verifier;
        testdb.first_verifier = first_verifier;
        testdb.second_verifier = second_verifier;
        testdb.salt = salt;
        testdb.password = password;
        await typeorm_2.getConnection()
            .createQueryBuilder()
            .update(voem_trackKey_entity_1.VoemVerifierInfo)
            .set({
            exist_verifier: 'true',
            first_verifier: first_verifier,
            second_verifier: second_verifier,
            salt: salt,
            password: password
        })
            .where("voem_user_id = :id", { id: voem_user_id })
            .execute();
    }
    async insertRootOEMInfoDB(root_oem_id, root_oem_cert, root_oem_url) {
        let RootOEMServerInfodb = new voem_trackKey_entity_1.RootOEMServerInfo();
        RootOEMServerInfodb.root_oem_id = root_oem_id;
        RootOEMServerInfodb.root_oem_cert = root_oem_cert;
        RootOEMServerInfodb.root_oem_url = root_oem_url;
        await this.voemRootOEMServerInfoRepository.insert(RootOEMServerInfodb).catch(error => {
            common_1.Logger.error(error);
        });
    }
    async getRootOEMInfo(root_oem_id) {
        let result = await this.voemRootOEMServerInfoRepository
            .createQueryBuilder()
            .select('t.root_oem_cert')
            .from(voem_trackKey_entity_1.RootOEMServerInfo, 't')
            .where('t.root_oem_id = :id', { id: root_oem_id })
            .getOne();
        return result;
    }
    async getDeviceOemInfo(key_id) {
        let result = await this.voemDigitalKeyInfoRepository
            .createQueryBuilder()
            .select('t.device_oem')
            .from(voem_trackKey_entity_1.DigitalKeyInfo, 't')
            .where('t.key_id = :id', { id: key_id })
            .getOne();
        return result.device_oem;
    }
    async getRootOemUrl(root_oem_id) {
        let result = await this.voemDigitalKeyInfoRepository
            .createQueryBuilder()
            .select('t.root_oem_url')
            .from(voem_trackKey_entity_1.RootOEMServerInfo, 't')
            .where('t.root_oem_id = :id', { id: root_oem_id })
            .getOne();
        return result.root_oem_url;
    }
    async vehicleInfoInsertDB(vehicle_id, vehicle_pk, vehicle_enc_pk, vehicle_sig_cert, vehicle_enc_cert, vehicle_brand, vehicle_model) {
        let voemVehicleInfo = new voem_trackKey_entity_1.VoemVehicleInfo();
        voemVehicleInfo.vehicle_id = vehicle_id;
        voemVehicleInfo.vehicle_pk = vehicle_pk;
        voemVehicleInfo.vehicle_enc_pk = vehicle_enc_pk;
        voemVehicleInfo.vehicle_sig_cert = vehicle_sig_cert;
        voemVehicleInfo.vehicle_enc_cert = vehicle_enc_cert;
        voemVehicleInfo.vehicle_brand = vehicle_brand;
        voemVehicleInfo.vehicle_model = vehicle_model;
        await this.voemVehicleInfoRepository.insert(voemVehicleInfo).catch(error => {
        });
    }
    async getVehicleInfo(vehicle_id) {
        let result = await this.voemVehicleInfoRepository
            .createQueryBuilder()
            .select('t')
            .from(voem_trackKey_entity_1.VoemVehicleInfo, 't')
            .where('t.vehicle_id = :id', { id: vehicle_id })
            .getOne();
        return result;
    }
    async getDKInfo(key_id) {
        let result = await this.voemDigitalKeyInfoRepository
            .createQueryBuilder()
            .select('t')
            .from(voem_trackKey_entity_1.OwnerKeyInfo, 't')
            .where('t.key_id = :id', { id: key_id })
            .getOne();
        return result;
    }
    async insertDKinfo(key_id, vehicle_id, key_status, device_oem, owner_device_key, digital_key_PK, key_type, device_type, accountIdHash, ICA_Cert, DK_Cert, device_enc_PK, device_enc_PK_version, key_Valid_From, key_Valid_To, shared_keys, sharable_keys, sharing_password_required) {
        let ownerKeyInfo = new voem_trackKey_entity_1.OwnerKeyInfo();
        ownerKeyInfo.key_id = key_id;
        ownerKeyInfo.vehicle_id = vehicle_id;
        ownerKeyInfo.key_status = key_status;
        ownerKeyInfo.device_oem = device_oem;
        ownerKeyInfo.owner_device_key = owner_device_key;
        ownerKeyInfo.digital_key_PK = digital_key_PK;
        ownerKeyInfo.key_type = key_type;
        ownerKeyInfo.device_type = device_type;
        ownerKeyInfo.accountIdHash = accountIdHash;
        ownerKeyInfo.ICA_Cert = ICA_Cert;
        ownerKeyInfo.DK_Cert = DK_Cert;
        ownerKeyInfo.device_enc_PK = device_enc_PK;
        ownerKeyInfo.device_enc_PK_version = device_enc_PK_version;
        ownerKeyInfo.key_Valid_From = key_Valid_From;
        ownerKeyInfo.key_Valid_To = key_Valid_To;
        ownerKeyInfo.shared_keys = shared_keys;
        ownerKeyInfo.sharable_keys = sharable_keys;
        ownerKeyInfo.sharing_password_required = sharing_password_required;
        await this.voemDigitalKeyInfoRepository.insert(ownerKeyInfo).catch(error => {
        });
    }
    async generateVerifierHeadParam(requestId, voemUserId, password_str) {
        if (!requestId) {
            common_1.Logger.error('[generateVerifier API error] no x-requestId Parameter');
            throw new common_1.HttpException('no x-requestId Parameter', 501);
        }
        if (!voemUserId) {
            common_1.Logger.error('[generateVerifier API error] no voemUserId');
            throw new common_1.HttpException('no voemUserId', 502);
        }
        if (!password_str) {
            common_1.Logger.error('[generateVerifier API error] no password');
            throw new common_1.HttpException('no password', 503);
        }
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[generateVerifier API]          GenerateVerifier API Test 		');
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('x-requestid           : ' + requestId);
        common_1.Logger.log('x-voem-vehicleid      : ' + voemUserId);
        common_1.Logger.log('password              : ' + password_str);
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[generateVerifier API] 1. 해당 UserId인 ' + voemUserId + ' 에 대응하는 Verifier 가 있는지 확인 [데이터베이스 조회]');
    }
    async generateVerifierTailParam(resultObj) {
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('전달한 응답 : ' + JSON.stringify(resultObj));
        common_1.Logger.log('==============================================================================');
    }
    async IfVerifierExistAndSame(voemUserId, requestId, res) {
        common_1.Logger.log('[generateVerifier API] 2. 해당 UserId인 ' + voemUserId + ' 에 대응하는 Verifier가 생성되어 있음');
        let resultObj = { 'result': 'E00102' };
        res.set('x-responseId', requestId);
        res.send(resultObj);
        common_1.Logger.log('[generateVerifier API] 3. 단말에 응답 전송 완료');
        await this.generateVerifierTailParam(resultObj);
    }
    async IfVerifierDoesNotExist(voemUserId, password, salt, salt_str, password_str, res, requestId) {
        common_1.Logger.log('[generateVerifier API] 2. 해당 UserId인 ' + voemUserId + ' 에 대응하는 Verifier 가 존재하지 않음');
        let resultString = await new crypto_service_1.CryptoService().genVerifier(password, salt, 32768, 8, 1);
        let resultJSON = JSON.parse(resultString);
        common_1.Logger.log('[generateVerifier API] => 해당 UserId인 ' + voemUserId + ' 에 대응하는 Verifier 생성 [Scrypt]');
        await this.updateVerifierDB(voemUserId, 'true', resultJSON.w0, resultJSON.L, salt_str, password_str);
        common_1.Logger.log('[generateVerifier API] => 해당 UserId인 ' + voemUserId + ' 에 대응하는 Verifier 데이터베이스에 저장 완료');
        common_1.Logger.log('[generateVerifier API] 3. 해당 UserId인 ' + voemUserId + ' 에 대응하는 Verifier 새로 생성 후 저장 완료');
        let resultObj = { 'result': 'E00101' };
        res.set('x-responseId', requestId);
        res.send(resultObj);
        common_1.Logger.log('[generateVerifier API] 4. 단말에 응답 전송 완료');
        await this.generateVerifierTailParam(resultObj);
    }
    async IfVerifierDifferent(voemUserId, requestId, res) {
        common_1.Logger.log('[generateVerifier API] 2. 해당 UserId인 ' + voemUserId + ' (이)가 존재하지 않음');
        let resultObj = { 'result': 'E00103' };
        res.set('x-responseId', requestId);
        res.send(resultObj);
        common_1.Logger.log('[generateVerifier API] 4. 단말에 응답 전송 완료');
        await this.generateVerifierTailParam(resultObj);
    }
    async getVerifierHeadParam(requestId, voemVehicleId) {
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[generateVerifier API]          GetVerifier API Test 		');
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('x-requestid           : ' + requestId);
        common_1.Logger.log('x-voem-vehicleid      : ' + voemVehicleId);
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[getVerifier API] 1. 해당 ID로 등록된 verifier 가 존재하는지 확인');
    }
    async checkParamsValidity(requestId, deviceOemId, encryptionCertChain, encryptionVersion, keyID, keyType, deviceType, accountIDHash) {
        if (!requestId) {
            common_1.Logger.error('[trackKey API] 필수 파라미터인 x-requestId 가 없습니다.');
            throw new common_1.HttpException('no x-requestId Parameter', 500);
        }
        if (!deviceOemId) {
            common_1.Logger.error('[trackKey API] 필수 파라미터인 x-device-oemId 가 없습니다.');
            throw new common_1.HttpException('no x-device-oemId Parameter', 500);
        }
        if (!encryptionCertChain) {
            common_1.Logger.error('[trackKey API] 필수 파라미터인 encryptionCertChain 가 없습니다.');
            throw new common_1.HttpException('no encryptionCertChain Parameter', 500);
        }
        if (!encryptionVersion) {
            common_1.Logger.error('[trackKey API] 필수 파라미터인 encryptionVersion 가 없습니다.');
            throw new common_1.HttpException('no encryptionVersion Parameter', 500);
        }
        if (!keyID) {
            common_1.Logger.error('[trackKey API] 필수 파라미터인 keyID 가 없습니다.');
            throw new common_1.HttpException('no keyID Parameter', 500);
        }
        if (!keyType) {
            common_1.Logger.error('[trackKey API] 필수 파라미터인 keyType 가 없습니다.');
            throw new common_1.HttpException('no keyType Parameter', 500);
        }
        if (!deviceType) {
            common_1.Logger.error('[trackKey API] 필수 파라미터인 deviceType 가 없습니다.');
            throw new common_1.HttpException('no deviceType Parameter', 500);
        }
        if (!accountIDHash) {
            common_1.Logger.error('[trackKey API] 필수 파라미터인 accountIDHash 가 없습니다.');
            throw new common_1.HttpException('no accountIDHash Parameter', 500);
        }
    }
    async trackKeyStartLogger(requestId, deviceOemId, encryptionCertChain, encryptionVersion, keyID, keyType, deviceType, accountIDHash, keyData) {
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[DOEM trackKey API] Key ID가 ' + keyID + ' 인 단말에서 요청 들어옴  ');
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('x-requestid         : ' + requestId);
        common_1.Logger.log('x-device-oemid      : ' + deviceOemId);
        common_1.Logger.log('encryptionCertChain : ' + encryptionCertChain.toString().substr(0, 30) + '...');
        common_1.Logger.log('encryptionVersion   : ' + encryptionVersion);
        common_1.Logger.log('keyID               : ' + keyID);
        common_1.Logger.log('keyType             : ' + keyType);
        common_1.Logger.log('deviceType          : ' + deviceType);
        common_1.Logger.log('accountIDHash       : ' + accountIDHash);
        common_1.Logger.log('keyData             : ' + keyData.substr(0, 30) + '...');
        common_1.Logger.log('==============================================================================');
    }
    async IfOwnerKeyExist(keyID, resultObj, requestId, res) {
        common_1.Logger.log('[trackKey API] => (Owner Key 조회) 해당 Key ID (' + keyID + ')가 존재하여 Key Tracking 데이터 조회 시작');
        common_1.Logger.log('[trackKey API] 3. 해당 Key ID (' + keyID + ')에 대응하는 uiBundleSmaple 데이터 생성');
        let uiBundleSample = await this.uiSampleGenerator("3045022017B5FBBCF2F475F15C85E78A519530792211CC4", resultObj.key_Valid_From, resultObj.key_Valid_To, resultObj.shared_keys, resultObj.sharable_keys, "35E3406EFDA511E88EB2F2801F1B9FD1");
        let vehicle_id = resultObj.vehicle_id;
        common_1.Logger.log('[trackKey API] 4. (Owner Key 조회) 해당 Vehicle ID (' + vehicle_id + ')로 차량 정보 조회');
        let vehicle_info = await this.getVehicleInfo(vehicle_id);
        common_1.Logger.log('[trackKey API] => 해당 Vehicle Id ' + vehicle_id + '에 대응하는 Vehicle Brand : ' + vehicle_info.vehicle_brand);
        common_1.Logger.log('[trackKey API] => 해당 Vehicle Id ' + vehicle_id + '에 대응하는 Vehicle Model : ' + vehicle_info.vehicle_model);
        let resultDataObj = {
            'uiBundle': uiBundleSample,
            'brand': vehicle_info.vehicle_brand,
            'model': vehicle_info.vehicle_model
        };
        resultDataObj['result_type'] = "0";
        res.set('x-responseId', requestId);
        res.send(resultDataObj);
        common_1.Logger.log('[trackKey API] 5. (Owner Key 조회) 해당 Key ID (' + keyID + ')로 Key Tracking 데이터 조회 완료');
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('전달한 응답 : ' + JSON.stringify(resultDataObj).substr(0, 50) + '...');
        common_1.Logger.log('==============================================================================');
    }
    async uiSampleGenerator(ktsSignature, validTimeFrom, validTimeTo, sharedKeys, sharableKeys, uiIentifier) {
        let uiBundleSample = {
            'ktsSignature': ktsSignature,
            "keyValidFrom": validTimeFrom,
            "keyValidTo": validTimeTo,
            "sharedKeys": sharedKeys,
            "shareableKeys": sharableKeys,
            "uiIdentifier": uiIentifier,
            "sharingPasswordRequired": "false",
            "entitlement": {
                "value": 0,
                "description": "full",
                "longDescription": "full access and drive capabilities"
            },
            "supportedEntitlements": {
                "entitlements": [
                    {
                        "value": 0,
                        "description": "full",
                        "longDescription": "full access and drive capabilities"
                    },
                    {
                        "value": 1,
                        "description": "accessOnly",
                        "longDescription": "only vehicle access , no drive capability"
                    },
                    {
                        "value": 2,
                        "description": "accessAndDriveRestricted",
                        "longDescription": "access and drive with restrictions"
                    },
                    {
                        "value": 3,
                        "description": "vehicleDelivery",
                        "longDescription": "vehicle delivery profile"
                    },
                    {
                        "value": 4,
                        "description": "valet",
                        "longDescription": "valet parking key"
                    },
                    {
                        "value": 5,
                        "description": "vehicleService",
                        "longDescription": "service key"
                    },
                    {
                        "value": 6,
                        "description": "custom entitlement description",
                        "longDescription": "custom entitlement long description"
                    }
                ]
            }
        };
        return uiBundleSample;
    }
};
VoemVerifierInfoService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(voem_trackKey_entity_1.VoemVerifierInfo)),
    __param(1, typeorm_1.InjectRepository(voem_trackKey_entity_1.RootOEMInfo)),
    __param(2, typeorm_1.InjectRepository(voem_trackKey_entity_1.VoemVehicleInfo)),
    __param(3, typeorm_1.InjectRepository(voem_trackKey_entity_1.OwnerKeyInfo)),
    __param(4, typeorm_1.InjectRepository(voem_trackKey_entity_1.DigitalKeyInfo)),
    __param(5, typeorm_1.InjectRepository(voem_trackKey_entity_1.RootOEMServerInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VoemVerifierInfoService);
exports.VoemVerifierInfoService = VoemVerifierInfoService;
//# sourceMappingURL=voem.trackKey.service.js.map