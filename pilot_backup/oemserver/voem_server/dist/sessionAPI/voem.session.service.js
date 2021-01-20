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
exports.VoemSessionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const voem_session_entity_1 = require("./entity/voem.session.entity");
const voem_trackKey_entity_1 = require("../trackKey/entity/voem.trackKey.entity");
let VoemSessionService = class VoemSessionService {
    constructor(voemSessionRepository, voemOwnerKeyRepository, voemRootOemInfoRepository, voemRootOEMServerInfoRepository) {
        this.voemSessionRepository = voemSessionRepository;
        this.voemOwnerKeyRepository = voemOwnerKeyRepository;
        this.voemRootOemInfoRepository = voemRootOemInfoRepository;
        this.voemRootOEMServerInfoRepository = voemRootOEMServerInfoRepository;
    }
    async generateSharingSessionStartLogger(requestId, deviceOemId, ownerKeyId) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===    [Vehicle OEM Server] generateSharingSession API 요청됨    ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[generateSharingSession API] GenerateSharingSession 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('x-requestid           : ' + requestId);
        common_1.Logger.log('x-device-oemid        : ' + deviceOemId);
        common_1.Logger.log('KeyId                 : ' + ownerKeyId);
        common_1.Logger.log('==============================================================================');
    }
    async redeemSharingSessionStartLogger(sharingSession, friendDeviceHandle) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===     [Vehicle OEM Server] redeemSharingSession API 요청됨     ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[redeemSharingSession API] redeemSharingSession 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('sharingSession     : ' + sharingSession);
        common_1.Logger.log('friendDeviceHandle : ' + friendDeviceHandle);
        common_1.Logger.log('==============================================================================');
    }
    async cancelSharingSessionStartLogger(requestId, sharingSession) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===    [Vehicle OEM Server] cancelSharingSession API 요청됨    ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[cancelSharingSession API] cancelSharingSession 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('x-requestid     : ' + requestId);
        common_1.Logger.log('sharingSession  : ' + sharingSession);
        common_1.Logger.log('==============================================================================');
    }
    async eventNotificationStartLogger(ownerKeyId, eventType, eventData) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===    [Vehicle OEM Server] eventNotification API 요청됨    ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[eventNotification API] eventNotification 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('keyId        : ' + ownerKeyId);
        common_1.Logger.log('eventType    : ' + eventType);
        common_1.Logger.log('eventData    : ' + eventData);
        common_1.Logger.log('==============================================================================');
    }
    async keySharingExchangeStartLogger(requestId, deviceOemId, keyAction, keyID) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===    [Vehicle OEM Server] keySharingExchange API 요청됨    ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[keySharingExchange API] keySharingExchange 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('requestId           : ' + requestId);
        common_1.Logger.log('deviceOemId         : ' + deviceOemId);
        common_1.Logger.log('keyAction           : ' + keyAction);
        common_1.Logger.log('keyID               : ' + keyID);
        common_1.Logger.log('==============================================================================');
    }
    async selectSessionDB(sessionId) {
        let result = await this.voemSessionRepository
            .createQueryBuilder()
            .select(['t.owner_key_id', 't.owner_doem_url', 't.friend_doem_url'])
            .from(voem_session_entity_1.VoemSessionInfo, 't')
            .where('t.session_id = :id', { id: sessionId })
            .getMany();
        return result;
    }
    async selectOEMUrl(doemId) {
        let result = await this.voemRootOEMServerInfoRepository
            .createQueryBuilder()
            .select('t.root_oem_url')
            .from(voem_trackKey_entity_1.RootOEMServerInfo, 't')
            .where('t.root_oem_id = :id', { id: doemId })
            .getOne();
        return result;
    }
    async checkValidity(keyId) {
        let result = await this.voemOwnerKeyRepository
            .createQueryBuilder()
            .select('t.key_status')
            .from(voem_trackKey_entity_1.DigitalKeyInfo, 't')
            .where('t.key_id = :id', { id: keyId })
            .getOne();
        return result.key_status;
    }
    async insertSessionDB(sessionId, ownerKeyId, doemId, date, session_period_minutes, session_status) {
        let sessionDB = new voem_session_entity_1.VoemSessionInfo();
        sessionDB.session_id = sessionId;
        sessionDB.owner_key_id = ownerKeyId;
        sessionDB.owner_doem_url = doemId;
        sessionDB.session_creation_date = date;
        sessionDB.friend_doem_url = '';
        sessionDB.friend_device_handle = '';
        sessionDB.session_period_minutes = session_period_minutes;
        sessionDB.session_status = session_status;
        let result = await this.voemSessionRepository.insert(sessionDB).catch(error => {
            common_1.Logger.error(error);
            return '0';
        });
        return '1';
    }
    async updateFriendDoemUrlDB(sessionId, foemUrl, friendDeviceHandle) {
        let queryResult = await typeorm_1.getConnection()
            .createQueryBuilder()
            .update(voem_session_entity_1.VoemSessionInfo)
            .set({ friend_doem_url: foemUrl, friend_device_handle: friendDeviceHandle })
            .where("session_id = :id", { id: sessionId })
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
    async cancleSessionDB(sessionId) {
        let queryResult = await typeorm_1.getConnection()
            .createQueryBuilder()
            .update(voem_session_entity_1.VoemSessionInfo)
            .set({ session_status: 'CANCLED' })
            .where("session_id = :id", { id: sessionId })
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
    async deleteSessionDB(sessionId) {
        let result = await typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(voem_session_entity_1.VoemSessionInfo)
            .where("session_id = :id", { id: sessionId })
            .execute();
        if (result.affected == 1) {
            return '1';
        }
        else {
            return '0';
        }
    }
    async sessionValidityCheck(sessionId, nowDate) {
        let result = await this.voemSessionRepository
            .createQueryBuilder()
            .select(['t.session_status', 't.session_creation_date', 't.session_period_minutes'])
            .from(voem_session_entity_1.VoemSessionInfo, 't')
            .where('t.session_id = :id', { id: sessionId })
            .getMany();
        let resultObj = result[0];
        common_1.Logger.log(JSON.stringify(result));
        if (resultObj.session_status != 'VALID') {
            common_1.Logger.error('session 상태[' + resultObj.session_status + ']가 VALID가 아닙니다.');
            return false;
        }
        let tempDate = resultObj.session_creation_date;
        let tempPeriod = resultObj.session_period_minutes;
        let resultDate = tempDate.getTime() + tempPeriod * 60000;
        let convertedNowDate = nowDate.getTime();
        common_1.Logger.log('디비시간 : ' + resultDate);
        common_1.Logger.log('현재시간 : ' + convertedNowDate);
        if (resultDate < convertedNowDate) {
            common_1.Logger.error('session 유효기간이 지났습니다.');
            return false;
        }
        common_1.Logger.log('세션 상태    : ' + resultObj.session_status);
        common_1.Logger.log('세션 생성날짜 : ' + resultObj.session_creation_date);
        common_1.Logger.log('세션 유효기간 : ' + resultObj.session_period_minutes);
        common_1.Logger.log('하하        : ' + (resultDate > convertedNowDate));
        return true;
    }
    async selectOwnerKeyInfo(keyId) {
        let result = await this.voemOwnerKeyRepository
            .createQueryBuilder()
            .select('t')
            .from(voem_trackKey_entity_1.DigitalKeyInfo, 't')
            .where('t.key_id = :id', { id: keyId })
            .getMany();
        ;
        return result;
    }
    async makeEventNotificationData(server, ownerKeyInfoObj) {
        let keyValidFrom = ownerKeyInfoObj['key_Valid_From'];
        let keyValidTo = ownerKeyInfoObj['key_Valid_To'];
        let reason = '';
        let sharedKeys = '';
        let shareableKeys = '';
        let remoteTerminationRequest = '';
        let resumeAttestation = '';
        let encryptedData = '';
        let keyCreationRequest = '';
        let keySigningRequest = '';
        let importRequest = '';
        let sharingSession = null;
        let supportedEntitlements = '';
    }
    async createSharedKey(vehicleOemId, x_timestamp, requestId, keyID, sharingSession, keyCreationRequest) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===    [Vehicle OEM Server] createSharedKey API 요청됨    ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[keySharingExchange API] createSharedKey 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('x_timestamp           : ' + x_timestamp);
        common_1.Logger.log('requestId             : ' + requestId);
        common_1.Logger.log('keyID                 : ' + keyID);
        common_1.Logger.log('sharingSession        : ' + JSON.stringify(sharingSession));
        common_1.Logger.log('keyCreationRequest    : ' + keyCreationRequest);
        common_1.Logger.log('==============================================================================');
        let resultObj = {};
        if (!sharingSession['sessionID']) {
            common_1.Logger.error('[keySharingExchange API] 전달받은 세션에서 세션 아이디가 존재 하지 않음');
            resultObj['code'] = '-1';
        }
        let sessionId = sharingSession['sessionID'];
        let selectSessionUsingID = await this.selectSessionDB(sessionId);
        if (!selectSessionUsingID) {
            common_1.Logger.error('[keySharingExchange API] 해당 세션 아이디 ' + sessionId + ' 가 세션 데이터베이스에 존재 하지 않음');
            resultObj['code'] = '-2';
        }
        let selectObj = selectSessionUsingID[0];
        common_1.Logger.log('[keySharingExchange API] Session ID 데이터베이스에서 owner Key Id 조회');
        let selectOidResult = selectObj.owner_key_id;
        common_1.Logger.log('[keySharingExchange API] 전달받은 key Id와 Session ID 데이터베이스에서 조회한 owner Key Id 일치 여부 확인');
        if (keyID != selectOidResult) {
            common_1.Logger.error('[keySharingExchange API] 전달받은 key Id와 Session ID 데이터베이스에서 조회한 owner Key Id 일치 하지않음');
            resultObj['code'] = '-3';
        }
        else {
            common_1.Logger.log('[keySharingExchange API] 전달받은 key Id와 Session ID 데이터베이스에서 조회한 owner Key Id 일치함');
            resultObj['code'] = '1';
        }
        let fdoemUrl = selectObj.friend_doem_url;
        let data = { 'keyID': keyID, 'eventType': 'CREATE_SHARED_KEY', 'eventData': keyCreationRequest };
        let http = new common_1.HttpService();
        common_1.Logger.log('[keySharingExchange API] 조회한 Friend OEM Server의 URL : ' + fdoemUrl + '/session/eventNotification 로 EventNotification API 호출');
        let httpPostResult = await http.post(fdoemUrl + '/session/eventNotification', data, {
            headers: {
                'Content-Type': 'application/json',
                'x-requestid': requestId,
                'x-vehicle-oemId': vehicleOemId
            },
            method: 'POST',
            data: null
        }).toPromise()
            .catch(e => {
            common_1.Logger.error('[keySharingExchange API] Vehicle OEM Server에서 eventNotification API를 Device OEM Server로 호출 실패');
            throw new common_1.HttpException(e, 555);
        });
        common_1.Logger.log('[keySharingExchange API] Friend Device Server에서 eventNotification 응답 잘 받음');
        resultObj['responseHeader'] = { 'responseHeader': { 'statusCode': 200 } };
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[keySharingExchange API] 전달한 응답 : ' + JSON.stringify(resultObj['responseHeader']));
        common_1.Logger.log('==============================================================================');
        return resultObj;
    }
    async sendCreateSharedKey(requestId, selectResult, res) {
        res.set('x-vehicle-oemId', 'Genesis');
        res.set('x-responseId', requestId);
        common_1.Logger.log('[keySharingExchange API] Owmer Device Server에서 createSharedKey 전달 : responseHeader 전송');
        res.send(selectResult['responseHeader']);
        common_1.Logger.log('================================================================================');
        common_1.Logger.log('[keySharingExchange API] 전달한 responseHeader : ' + JSON.stringify(selectResult['responseHeader']));
        common_1.Logger.log('================================================================================');
    }
    async signSharedKey(vehicleOemId, x_timestamp, requestId, sharingSession, keySigningRequest) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===    [Vehicle OEM Server] signSharedKey API 요청됨    ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[keySharingExchange API] signSharedKey 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('x_timestamp           : ' + x_timestamp);
        common_1.Logger.log('requestId             : ' + requestId);
        common_1.Logger.log('sharingSession        : ' + JSON.stringify(sharingSession));
        common_1.Logger.log('keyCreationRequest    : ' + keySigningRequest);
        common_1.Logger.log('==============================================================================');
        let resultObj = {};
        if (!sharingSession['sessionID']) {
            common_1.Logger.error('[keySharingExchange API] 전달받은 세션에서 세션 아이디가 존재 하지 않음');
            throw new common_1.HttpException('[keySharingExchange API] 전달받은 세션에서 세션 아이디가 존재 하지 않음', 295);
        }
        let sessionId = sharingSession['sessionID'];
        let selectSessionUsingID = await this.selectSessionDB(sessionId);
        if (!selectSessionUsingID) {
            common_1.Logger.error('[keySharingExchange API] 해당 세션 아이디 ' + sessionId + ' 가 세션 데이터베이스에 존재 하지 않음');
            throw new common_1.HttpException('[keySharingExchange API] 해당 세션 아이디 ' + sessionId + ' 가 세션 데이터베이스에 존재 하지 않음', 395);
        }
        let selectObj = selectSessionUsingID[0];
        common_1.Logger.log('[keySharingExchange API] Session ID 데이터베이스에서 owner Key Id 조회');
        common_1.Logger.log('[keySharingExchange API] => 조회된 세션 값 : ' + JSON.stringify(selectObj));
        let ownerKeyId = selectObj.owner_key_id;
        let ownerDoemUrl = selectObj.owner_doem_url;
        let data = { 'keyID': ownerKeyId, 'eventType': 'SIGN_SHARED_KEY', 'eventData': keySigningRequest };
        let http = new common_1.HttpService();
        let httpPostResult = await http.post(ownerDoemUrl + '/session/eventNotification', data, {
            headers: {
                'Content-Type': 'application/json',
                'x-requestid': requestId,
                'x-vehicle-oemId': vehicleOemId
            },
            method: 'POST',
            data: null
        }).toPromise()
            .catch(e => {
            common_1.Logger.error('[keySharingExchange API] Vehicle OEM Server에서 createSharedKey API를 Device OEM Server로 호출 실패');
            throw new common_1.HttpException(e, 555);
        });
        resultObj['responseHeader'] = { 'responseHeader': { 'statusCode': 200 } };
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[keySharingExchange API] 전달한 응답 : ' + JSON.stringify(resultObj['responseHeader']));
        common_1.Logger.log('==============================================================================');
        return resultObj;
    }
    async sendSignSharedKey(requestId, selectResult, res) {
        res.set('x-vehicle-oemId', 'Genesis');
        res.set('x-responseId', requestId);
        common_1.Logger.log('[keySharingExchange API] Owmer Device Server에서 signSharedKey 전달 : responseHeader 전송');
        res.send(selectResult['responseHeader']);
        common_1.Logger.log('================================================================================');
        common_1.Logger.log('[keySharingExchange API] 전달한 responseHeader : ' + JSON.stringify(selectResult['responseHeader']));
        common_1.Logger.log('================================================================================');
    }
    async importSharedKey(vehicleOemId, x_timestamp, requestId, keyID, sharingSession, importRequest) {
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('===    [Vehicle OEM Server] importSharedKey API 요청됨    ==');
        common_1.Logger.log('==================================================================');
        common_1.Logger.log('[keySharingExchange API] importSharedKey 요청 들어옴');
        common_1.Logger.log('[     전달받은 요청     ]');
        common_1.Logger.log('x_timestamp           : ' + x_timestamp);
        common_1.Logger.log('requestId             : ' + requestId);
        common_1.Logger.log('keyID                 : ' + keyID);
        common_1.Logger.log('sharingSession        : ' + JSON.stringify(sharingSession));
        common_1.Logger.log('keyCreationRequest    : ' + importRequest);
        common_1.Logger.log('==============================================================================');
        let resultObj = {};
        if (!sharingSession['sessionID']) {
            common_1.Logger.error('[keySharingExchange API] 전달받은 세션에서 세션 아이디가 존재 하지 않음');
            resultObj['code'] = '-1';
        }
        let sessionId = sharingSession['sessionID'];
        let selectSessionUsingID = await this.selectSessionDB(sessionId);
        if (!selectSessionUsingID) {
            common_1.Logger.error('[keySharingExchange API] 해당 세션 아이디 ' + sessionId + ' 가 세션 데이터베이스에 존재 하지 않음');
            resultObj['code'] = '-2';
        }
        let selectObj = selectSessionUsingID[0];
        common_1.Logger.log('[createSharedKey API] Session ID 데이터베이스에서 owner Key Id 조회');
        common_1.Logger.log('[keySharingExchange API] => 조회된 세션 값 : ' + JSON.stringify(selectObj));
        let selectOidResult = selectObj.owner_key_id;
        common_1.Logger.log('[createSharedKey API] 전달받은 key Id와 Session ID 데이터베이스에서 조회한 owner Key Id 일치 여부 확인');
        if (keyID != selectOidResult) {
            common_1.Logger.error('[keySharingExchange API] 전달받은 key Id와 Session ID 데이터베이스에서 조회한 owner Key Id 일치 하지않음');
            resultObj['code'] = '-3';
        }
        else {
            common_1.Logger.log('[keySharingExchange API] 전달받은 key Id와 Session ID 데이터베이스에서 조회한 owner Key Id 일치함');
            resultObj['code'] = '1';
        }
        let fdoemUrl = selectObj.friend_doem_url;
        let data = { 'keyID': keyID, 'eventType': 'IMPORT_SHARED_KEY', 'eventData': importRequest };
        let http = new common_1.HttpService();
        common_1.Logger.log('[keySharingExchange API] 조회한 Friend OEM Server의 URL : ' + fdoemUrl + '/session/eventNotification 로 EventNotification API 호출');
        let httpPostResult = await http.post(fdoemUrl + '/session/eventNotification', data, {
            headers: {
                'Content-Type': 'application/json',
                'x-requestid': requestId,
                'x-vehicle-oemId': vehicleOemId
            },
            method: 'POST',
            data: null
        }).toPromise()
            .catch(e => {
            common_1.Logger.error('[createSharedKey API] 2. Vehicle OEM Server에서 createSharedKey API를 Device OEM Server로 호출 실패');
            throw new common_1.HttpException(e, 555);
        });
        resultObj['responseHeader'] = { 'responseHeader': { 'statusCode': 200 } };
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('[keySharingExchange API] 전달한 응답 : ' + JSON.stringify(resultObj['responseHeader']));
        common_1.Logger.log('==============================================================================');
        return resultObj;
    }
    async sendImportsharedKey(requestId, selectResult, res) {
        res.set('x-vehicle-oemId', 'Genesis');
        res.set('x-responseId', requestId);
        common_1.Logger.log('[keySharingExchange API] Owmer Device Server에서 importSharedKey 전달 : responseHeader 전송');
        res.send(selectResult['responseHeader']);
        common_1.Logger.log('================================================================================');
        common_1.Logger.log('[keySharingExchange API] 전달한 responseHeader : ' + JSON.stringify(selectResult['responseHeader']));
        common_1.Logger.log('================================================================================');
    }
};
VoemSessionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(voem_session_entity_1.VoemSessionInfo)),
    __param(1, typeorm_2.InjectRepository(voem_trackKey_entity_1.DigitalKeyInfo)),
    __param(2, typeorm_2.InjectRepository(voem_trackKey_entity_1.RootOEMInfo)),
    __param(3, typeorm_2.InjectRepository(voem_trackKey_entity_1.RootOEMServerInfo)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], VoemSessionService);
exports.VoemSessionService = VoemSessionService;
//# sourceMappingURL=voem.session.service.js.map