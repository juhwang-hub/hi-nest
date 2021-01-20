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
exports.DoemTrackKeyService = void 0;
const common_1 = require("@nestjs/common");
let DoemTrackKeyService = class DoemTrackKeyService {
    constructor(http) {
        this.http = http;
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
    async trackKeySecondLogger(resultStr) {
        common_1.Logger.log('[trackKey API] 2. 해당 Vehicle OEM Server로부터 성공적으로 응답 전달 받음');
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('단말에 전달한 응답 : ' + JSON.stringify(resultStr).substr(0, 50) + '...');
        common_1.Logger.log('==============================================================================');
    }
    async trackKeyFinalLogger(keyID, resultStr) {
        common_1.Logger.log('[trackKey API] 3. 해당 Key ID (' + keyID + ')로 Vehicle OEM Server에 Track Key 요청 성공');
        common_1.Logger.log('==============================================================================');
        common_1.Logger.log('단말에 전달한 응답 : ' + JSON.stringify(resultStr).substr(0, 50) + '...');
        common_1.Logger.log('==============================================================================');
    }
    async trackKeyHttpRequest(url, requestId, deviceOemId, encryptionCertChain, encryptionVersion, keyID, keyType, deviceType, accountIDHash, keyData) {
        let data = {
            'encryptionCertChain': encryptionCertChain,
            'encryptionVersion': encryptionVersion,
            'keyID': keyID,
            'keyType': keyType,
            'deviceType': deviceType,
            'accountIDHash': accountIDHash,
            'keyData': keyData
        };
        common_1.Logger.log('[trackKey API] 1. 해당 Key ID (' + keyID + ')로 단말에서 전달받은 데이터 그대로 Vehice OEM Server에 데이터 전달');
        return await this.http.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-requestid': requestId,
                'x-device-oemid': deviceOemId
            },
            method: 'POST',
            data: null
        })
            .toPromise()
            .catch(e => {
            common_1.Logger.error('[trackKey API] 2. 해당 Key ID (' + keyID + ')로 Vehicle OEM Server에 track Key 요청 실패');
            throw new common_1.HttpException(e, 555);
        });
    }
};
DoemTrackKeyService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], DoemTrackKeyService);
exports.DoemTrackKeyService = DoemTrackKeyService;
//# sourceMappingURL=doem.trackKey.service.js.map