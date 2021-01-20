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
exports.VoemManageKeyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const crypto = require("crypto");
const voem_trackKey_entity_1 = require("../trackKey/entity/voem.trackKey.entity");
let VoemManageKeyService = class VoemManageKeyService {
    constructor(voemDKInfoRepository, voemRootOemInfoRepository, voemDigitalKeyInfoRepository, voemRootOEMServerInfoRepository) {
        this.voemDKInfoRepository = voemDKInfoRepository;
        this.voemRootOemInfoRepository = voemRootOemInfoRepository;
        this.voemDigitalKeyInfoRepository = voemDigitalKeyInfoRepository;
        this.voemRootOEMServerInfoRepository = voemRootOEMServerInfoRepository;
    }
    async getOwnerKeyInfoFromFriendKeyId() {
    }
    async V2FKeyTerminatedStartLogger(requestId, ownerKeyId, friendKeyId, status) {
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('===       [Vehicle OEM Server] V2FKeyTerminated API 요청됨       ==');
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[V2FKeyTerminated API] V2FKeyTerminated 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('requestId              : ' + requestId);
        common_1.Logger.log('ownerKeyId             : ' + ownerKeyId);
        common_1.Logger.log('friendKeyId            : ' + friendKeyId);
        common_1.Logger.log('status                 : ' + status);
        common_1.Logger.log('==============================================================================');
    }
    async managekeyStartLogger(requestId, deviceOemId, keyId, action) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===           [Vehicle OEM Server] manageKey API 요청됨           ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[manageKey API] manageKey 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('x-requestid           : ' + requestId);
        common_1.Logger.log('x-device-oemid        : ' + deviceOemId);
        common_1.Logger.log('KeyId                 : ' + keyId);
        common_1.Logger.log('action                : ' + action);
        common_1.Logger.log('==============================================================================');
    }
    async getDKUrlInfo(keyId) {
        let root_oem_id = await this.voemDigitalKeyInfoRepository
            .createQueryBuilder()
            .select('t.device_oem')
            .from(voem_trackKey_entity_1.DigitalKeyInfo, 't')
            .where('t.key_id = :id', { id: keyId })
            .getOne();
        let result = await this.voemDigitalKeyInfoRepository
            .createQueryBuilder()
            .select('t.root_oem_url')
            .from(voem_trackKey_entity_1.RootOEMServerInfo, 't')
            .where('t.root_oem_id = :id', { id: root_oem_id })
            .getOne();
        return result.root_oem_url;
    }
    async getKeyStatus(keyId) {
        let result = await this.voemDigitalKeyInfoRepository
            .createQueryBuilder()
            .select('t.key_status')
            .from(voem_trackKey_entity_1.DigitalKeyInfo, 't')
            .where('t.key_id = :id', { id: keyId })
            .getOne();
        return result.key_status;
    }
    async updateKeyStatus(keyId, key_status) {
        let queryResult = await typeorm_1.getConnection()
            .createQueryBuilder()
            .update(voem_trackKey_entity_1.DigitalKeyInfo)
            .set({ key_status: key_status })
            .where("key_id = :id", { id: keyId })
            .execute();
        let result;
        if (queryResult['affected'] == 1) {
            result = '1';
        }
        else {
            result = '-1';
        }
        return result;
    }
    async vehicleKeyTerminated(keyId, key_status) {
        let keyStatus = await this.getKeyStatus(keyId);
        let result = {};
        if (keyStatus != 1) {
            common_1.Logger.error('The key is not activated');
            result['code'] = '-1';
            return result;
        }
        let updateResult = await this.updateKeyStatus(keyId, key_status);
        if (updateResult != '1') {
            common_1.Logger.error('termination process is failed');
            result['code'] = '-2';
            return result;
        }
        result['code'] = '1';
        return result;
    }
    async manageKeyToDoemServer(keyId, action, terminationAttestation, deviceRemoteTerminationRequest, serverRemoteTerminationRequest, vehicleOEMProprietaryData, vehicleOemId, deviceOEMUrl) {
        let http = new common_1.HttpService();
        let x_timestamp = new Date().getTime();
        let requestId = await crypto.randomBytes(40).toString('hex');
        let data = { 'keyID': keyId, 'action': action, 'serverRemoteTerminationRequest': serverRemoteTerminationRequest };
        let httpResult = await http.post(deviceOEMUrl + '/manageKey/manageKey', data, {
            headers: {
                'x-timestamp': x_timestamp,
                'x-requestid': requestId,
                'x-vehicle-oemId': vehicleOemId
            },
            method: 'POST',
            data: null
        }).toPromise()
            .catch(e => {
            common_1.Logger.error('[manageKey API] Device OEM 으로의 manageKey 요청 실패');
            common_1.Logger.error(e);
            throw new common_1.HttpException(e, 567);
        });
        return httpResult.data;
    }
    async manageKey(requestId, vehicleOemId, keyId, eventType, eventData) {
        let http = new common_1.HttpService();
        let x_timestamp = new Date().getTime();
        eventType = 'TERMINATED';
        eventData = '13455143253333343542245c4de36a';
        let data = { 'keyID': keyId, 'eventType': eventType, 'eventData': eventData };
        let httpResult = await http.post('http://localhost:4000/session/eventNotification', data, {
            headers: {
                'x-timestamp': x_timestamp,
                'x-requestid': requestId,
                'x-vehicle-oemId': vehicleOemId
            },
            method: 'POST',
            data: null
        }).toPromise()
            .catch(e => {
            common_1.Logger.error('[eventNotification API] Device OEM 으로의 eventNotification 요청 실패');
            common_1.Logger.error(e);
            throw new common_1.HttpException(e, 567);
        });
        return httpResult.data;
    }
    async terminateKey(keyId) {
        let result = await this.getKeyStatus(keyId);
        if (result != 1) {
        }
    }
};
VoemManageKeyService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(voem_trackKey_entity_1.OwnerKeyInfo)),
    __param(1, typeorm_2.InjectRepository(voem_trackKey_entity_1.RootOEMInfo)),
    __param(2, typeorm_2.InjectRepository(voem_trackKey_entity_1.DigitalKeyInfo)),
    __param(3, typeorm_2.InjectRepository(voem_trackKey_entity_1.RootOEMServerInfo)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], VoemManageKeyService);
exports.VoemManageKeyService = VoemManageKeyService;
//# sourceMappingURL=voem.manageKey.service.js.map