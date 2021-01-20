import { Injectable, Logger, HttpException, HttpService} from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VoemSessionInfo } from './entity/voem.session.entity'
import { DigitalKeyInfo, OwnerKeyInfo, RootOEMInfo, RootOEMServerInfo } from '../trackKey/entity/voem.trackKey.entity'


@Injectable()
export class VoemSessionService {
    constructor(
        @InjectRepository(VoemSessionInfo)
        private readonly voemSessionRepository  : Repository<VoemSessionInfo>,

        @InjectRepository(DigitalKeyInfo)
        private readonly voemOwnerKeyRepository : Repository<DigitalKeyInfo>,

        @InjectRepository(RootOEMInfo)
        private readonly voemRootOemInfoRepository : Repository<RootOEMInfo>,
        
        @InjectRepository(RootOEMServerInfo)
        private readonly voemRootOEMServerInfoRepository : Repository<RootOEMServerInfo>,
    ){}
     

    async generateSharingSessionStartLogger(
        requestId : string,
        deviceOemId : string,
        ownerKeyId : string
    ){
        Logger.log('==================================================================');
        Logger.log('===    [Vehicle OEM Server] generateSharingSession API 요청됨    ==');
        Logger.log('==================================================================');
        Logger.log('[generateSharingSession API] GenerateSharingSession 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
		Logger.log('x-requestid           : ' + requestId);
        Logger.log('x-device-oemid        : ' + deviceOemId);
        Logger.log('KeyId                 : ' + ownerKeyId)
        Logger.log('=============================================================================='); 
    }

    async redeemSharingSessionStartLogger(
        sharingSession : string,
        friendDeviceHandle : string
    ){
        Logger.log('==================================================================');
        Logger.log('===     [Vehicle OEM Server] redeemSharingSession API 요청됨     ==');
        Logger.log('==================================================================');
        Logger.log('[redeemSharingSession API] redeemSharingSession 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
        Logger.log('sharingSession     : ' + sharingSession); 
        Logger.log('friendDeviceHandle : ' + friendDeviceHandle); 
        Logger.log('==============================================================================');
    }

    async cancelSharingSessionStartLogger(
        requestId : string,
        sharingSession : string
    ){
        Logger.log('==================================================================');
        Logger.log('===    [Vehicle OEM Server] cancelSharingSession API 요청됨    ==');
        Logger.log('==================================================================');
        Logger.log('[cancelSharingSession API] cancelSharingSession 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
		Logger.log('x-requestid     : ' + requestId);
        Logger.log('sharingSession  : ' + sharingSession); 
		Logger.log('=============================================================================='); 
    }

    async eventNotificationStartLogger(
        ownerKeyId : string,
        eventType : string,
        eventData : object
    ){
        Logger.log('==================================================================');
        Logger.log('===    [Vehicle OEM Server] eventNotification API 요청됨    ==');
        Logger.log('==================================================================');
        Logger.log('[eventNotification API] eventNotification 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
        Logger.log('keyId        : ' + ownerKeyId)
        Logger.log('eventType    : ' + eventType);
        Logger.log('eventData    : ' + eventData); 
        Logger.log('=============================================================================='); 
    }

     async keySharingExchangeStartLogger(
        requestId : string,
        deviceOemId : string,
        keyAction : string,
        keyID : string
     ){
        Logger.log('==================================================================');
        Logger.log('===    [Vehicle OEM Server] keySharingExchange API 요청됨    ==');
        Logger.log('==================================================================');
        Logger.log('[keySharingExchange API] keySharingExchange 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
        Logger.log('requestId           : ' + requestId);
        Logger.log('deviceOemId         : ' + deviceOemId);
        Logger.log('keyAction           : ' + keyAction);
        Logger.log('keyID               : ' + keyID); 
        Logger.log('=============================================================================='); 
     }
      


    async selectSessionDB(sessionId  : string){
        let result = await this.voemSessionRepository
                    .createQueryBuilder()
                    // .select('t.owner_key_id')
                    .select(['t.owner_key_id', 't.owner_doem_url', 't.friend_doem_url'])
                    .from(VoemSessionInfo, 't')
                    .where('t.session_id = :id', {id: sessionId})
                    .getMany();
        return result;
    }
    
    async selectOEMUrl(doemId : string) {
        let result = await this.voemRootOEMServerInfoRepository
                    .createQueryBuilder()
                    .select('t.root_oem_url')
                    .from(RootOEMServerInfo, 't')
                    .where('t.root_oem_id = :id', {id: doemId})
                    .getOne(); 
        return result;
    }


    async checkValidity(keyId : string) {
        let result = await this.voemOwnerKeyRepository
                    .createQueryBuilder()
                    .select('t.key_status')
                    .from(DigitalKeyInfo, 't')
                    .where('t.key_id = :id', {id: keyId})
                    .getOne(); 
        return result.key_status;
    }


    async insertSessionDB(sessionId  : string, ownerKeyId : string, doemId : string, date: Date, session_period_minutes : number, session_status : string){
            let sessionDB = new VoemSessionInfo();
            sessionDB.session_id                = sessionId;
            sessionDB.owner_key_id              = ownerKeyId;
            sessionDB.owner_doem_url            = doemId;
            sessionDB.session_creation_date     = date;
            sessionDB.friend_doem_url           = '';
            sessionDB.friend_device_handle      = '';
            sessionDB.session_period_minutes    = session_period_minutes;
            sessionDB.session_status            = session_status;
            let result = await this.voemSessionRepository.insert(sessionDB).catch(error => {
                Logger.error(error);
                return '0';
        }) 
        return '1';
    }

    async updateFriendDoemUrlDB(sessionId : string, foemUrl : string, friendDeviceHandle : string) {
        let queryResult = await getConnection()
            .createQueryBuilder()
            .update(VoemSessionInfo)
            .set({ friend_doem_url: foemUrl, friend_device_handle : friendDeviceHandle})
            .where("session_id = :id", { id: sessionId })
            .execute(); 
        let result; 
        if(queryResult['affected'] == 1){
            result = '1';
        }else{
            result = '-1';
        }
        return result;
    }

    async cancleSessionDB(sessionId : string){
        let queryResult = await getConnection()
            .createQueryBuilder()
            .update(VoemSessionInfo)
            .set({session_status: 'CANCLED'})
            .where("session_id = :id", { id: sessionId })
            .execute();
            let result; 
        if(queryResult['affected'] == 1){
            result = '1';
        }else{
            result = '-1';
        }
        return result;
    }

    async deleteSessionDB(sessionId : string){ 
        let result = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(VoemSessionInfo)
            .where("session_id = :id", { id: sessionId })
            .execute(); 
        if(result.affected == 1) { 
            return '1';
        }else{ 
            return '0';
        }
    }

    async sessionValidityCheck(sessionId : string, nowDate : Date) : Promise<boolean> { 
        let result = await this.voemSessionRepository
        .createQueryBuilder()
        // .select('t.owner_key_id')
        .select(['t.session_status','t.session_creation_date', 't.session_period_minutes'])
        .from(VoemSessionInfo, 't')
        .where('t.session_id = :id', {id: sessionId})
        .getMany();
        let resultObj           = result[0];
        Logger.log(JSON.stringify(result));
        if(resultObj.session_status != 'VALID'){
            Logger.error('session 상태[' + resultObj.session_status +']가 VALID가 아닙니다.');
            return false;
        }
        let tempDate            = resultObj.session_creation_date;
        let tempPeriod          = resultObj.session_period_minutes;
        let resultDate          = tempDate.getTime() + tempPeriod*60000;
        let convertedNowDate    = nowDate.getTime();
        Logger.log('디비시간 : ' + resultDate);
        Logger.log('현재시간 : ' + convertedNowDate);
        if(resultDate < convertedNowDate){
            Logger.error('session 유효기간이 지났습니다.');
            return false;
        }
        Logger.log('세션 상태    : ' + resultObj.session_status);
        Logger.log('세션 생성날짜 : ' + resultObj.session_creation_date);
        Logger.log('세션 유효기간 : ' + resultObj.session_period_minutes);
        Logger.log('하하        : ' + (resultDate > convertedNowDate));
        return true;
    }

    async selectOwnerKeyInfo(keyId : string){
        let result = await this.voemOwnerKeyRepository
                    .createQueryBuilder()
                    .select('t')
                    .from(DigitalKeyInfo, 't')
                    .where('t.key_id = :id', {id: keyId})
                    .getMany();;
        return result;
    }
    /*
      server : ODEM, FDEM (Owner Dem, Friend Dem) 으로 나뉨
    */
    async makeEventNotificationData(server: string, ownerKeyInfoObj : object){
        let keyValidFrom             = ownerKeyInfoObj['key_Valid_From']; // Mandatory
        let keyValidTo               = ownerKeyInfoObj['key_Valid_To'];   // Mandatory
        let reason                   = '';   // Mandatory
        let sharedKeys               = '';   // Conditional. Not required for eventNotifications to friend Device OEM Server
        let shareableKeys            = '';   // Conditional. Not required for eventNotifications to friend Device OEM Server
        let remoteTerminationRequest = '';   // Conditional. Required only for eventNotification of TERMINATED event
        let resumeAttestation        = '';   // Conditional. Required only for eventNotification, eventType RESUMING
        let encryptedData            = '';   // Conditional. Required if eventNotification is sent to owner Device OEM Serverand if it contains shared key information
        let keyCreationRequest       = '';   // Conditional. Required for CREATE_SHARED_KEY event
        let keySigningRequest        = '';   // Conditional. Required for SIGN_SHARED_KEY event
        let importRequest            = '';   // Conditional. Required for IMPORT_SHARED_KEY event
        let sharingSession           = null; // Conditional. Required for SHARING_INITIATED, CREATE_SHARED_KEY and SIGN_SHARED_KEY event
        let supportedEntitlements    = '';   // Conditional. Required if entitlements are updated in Vehicle OEM Server and vehicle
    } 

    async createSharedKey(vehicleOemId : string, x_timestamp:string, requestId : string, keyID : string, sharingSession: object, keyCreationRequest : string){ 
        Logger.log('==================================================================');
        Logger.log('===    [Vehicle OEM Server] createSharedKey API 요청됨    ==');
        Logger.log('==================================================================');
        Logger.log('[keySharingExchange API] createSharedKey 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
        Logger.log('x_timestamp           : ' + x_timestamp);
        Logger.log('requestId             : ' + requestId)
        Logger.log('keyID                 : ' + keyID);
        Logger.log('sharingSession        : ' + JSON.stringify(sharingSession)); 
        Logger.log('keyCreationRequest    : ' + keyCreationRequest);  
        Logger.log('=============================================================================='); 
        // 1. 전달받은 Session 객체에서 Session ID 추출 후, 해당 ID가 데이터베이스에 저장되어 있는지 확인 
        let resultObj = {};  
        if(!sharingSession['sessionID']){
            Logger.error('[keySharingExchange API] 전달받은 세션에서 세션 아이디가 존재 하지 않음');
            resultObj['code'] = '-1'; 
        }
        let sessionId = sharingSession['sessionID'];
        let selectSessionUsingID = await this.selectSessionDB(sessionId); 
        if(!selectSessionUsingID){
            Logger.error('[keySharingExchange API] 해당 세션 아이디 ' + sessionId + ' 가 세션 데이터베이스에 존재 하지 않음');
            resultObj['code'] = '-2'; 
        }
        let selectObj = selectSessionUsingID[0];
        Logger.log('[keySharingExchange API] Session ID 데이터베이스에서 owner Key Id 조회'); 
        let selectOidResult = selectObj.owner_key_id;  
        Logger.log('[keySharingExchange API] 전달받은 key Id와 Session ID 데이터베이스에서 조회한 owner Key Id 일치 여부 확인');
        if(keyID != selectOidResult){ 
            Logger.error('[keySharingExchange API] 전달받은 key Id와 Session ID 데이터베이스에서 조회한 owner Key Id 일치 하지않음');
            resultObj['code'] = '-3'; 
        }else{
            Logger.log('[keySharingExchange API] 전달받은 key Id와 Session ID 데이터베이스에서 조회한 owner Key Id 일치함');
            resultObj['code'] = '1';  
        }  
        /*
         * Friend Device Server에 EventNotificatoin API 호출
         */
        let fdoemUrl = selectObj.friend_doem_url; // Friend Device Server의 URL을 획득
        let data = {'keyID':keyID, 'eventType':'CREATE_SHARED_KEY', 'eventData':keyCreationRequest};
        let http = new HttpService(); 
        Logger.log('[keySharingExchange API] 조회한 Friend OEM Server의 URL : ' + fdoemUrl + '/session/eventNotification 로 EventNotification API 호출');
        let httpPostResult = await http.post(fdoemUrl + '/session/eventNotification', data, 
        { 
            headers: { 
				'Content-Type'  : 'application/json',
				'x-requestid'   : requestId,
				'x-vehicle-oemId': vehicleOemId
			}, 
			method:'POST', 
			data:null 
        }).toPromise()
        .catch( e => { 
			Logger.error('[keySharingExchange API] Vehicle OEM Server에서 eventNotification API를 Device OEM Server로 호출 실패');
            throw new HttpException( e, 555 );
        } ); 
        Logger.log('[keySharingExchange API] Friend Device Server에서 eventNotification 응답 잘 받음'); 
        resultObj['responseHeader'] = {'responseHeader':{'statusCode':200}};  
        Logger.log('=============================================================================='); 
        Logger.log('[keySharingExchange API] 전달한 응답 : ' + JSON.stringify(resultObj['responseHeader'])); 
        Logger.log('==============================================================================');
        return resultObj;
    }   

    async sendCreateSharedKey (
        requestId : string,
        selectResult : {},
        res,
    ){
        res.set('x-vehicle-oemId', 'Genesis');
        res.set('x-responseId', requestId);
        Logger.log('[keySharingExchange API] Owmer Device Server에서 createSharedKey 전달 : responseHeader 전송');
        res.send(selectResult['responseHeader']); 
        Logger.log('================================================================================');
        Logger.log('[keySharingExchange API] 전달한 responseHeader : ' + JSON.stringify(selectResult['responseHeader']));
        Logger.log('================================================================================');
    }

    /*
        Description : Sign shared key for cross- platform key sharing
        Reason for key action to be triggered
        When friend sends keySign-ingRequest for owner device, this notification is sent from Vehicle OEM Server to owner Device OEM Server.
    */
    async signSharedKey(vehicleOemId : string, x_timestamp:string, requestId : string, sharingSession : object, keySigningRequest : string) {
        Logger.log('==================================================================');
        Logger.log('===    [Vehicle OEM Server] signSharedKey API 요청됨    ==');
        Logger.log('==================================================================');
        Logger.log('[keySharingExchange API] signSharedKey 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
        Logger.log('x_timestamp           : ' + x_timestamp);
        Logger.log('requestId             : ' + requestId) 
        Logger.log('sharingSession        : ' + JSON.stringify(sharingSession)); 
        Logger.log('keyCreationRequest    : ' + keySigningRequest);  
        Logger.log('=============================================================================='); 
        /**
         * 1. SharingSession ID Check
         * 전달받은 SharingSessionID
         */
        // 1. SharingSession ID Validity Check  
        let resultObj = {};       
        if(!sharingSession['sessionID']){
            Logger.error('[keySharingExchange API] 전달받은 세션에서 세션 아이디가 존재 하지 않음');
            throw new HttpException('[keySharingExchange API] 전달받은 세션에서 세션 아이디가 존재 하지 않음', 295);
        }
        let sessionId = sharingSession['sessionID'];
        let selectSessionUsingID = await this.selectSessionDB(sessionId); 
        if(!selectSessionUsingID){
            Logger.error('[keySharingExchange API] 해당 세션 아이디 ' + sessionId + ' 가 세션 데이터베이스에 존재 하지 않음');
            throw new HttpException('[keySharingExchange API] 해당 세션 아이디 ' + sessionId + ' 가 세션 데이터베이스에 존재 하지 않음', 395);
        }
        // 2. Owner Key ID 조회
        let selectObj = selectSessionUsingID[0];
        Logger.log('[keySharingExchange API] Session ID 데이터베이스에서 owner Key Id 조회'); 
        Logger.log('[keySharingExchange API] => 조회된 세션 값 : ' + JSON.stringify(selectObj)); 
        let ownerKeyId = selectObj.owner_key_id; 
        /**
         * Owner Device Server에 EventNotificatoin API 호출
         */
        let ownerDoemUrl = selectObj.owner_doem_url;
        let data = {'keyID':ownerKeyId, 'eventType':'SIGN_SHARED_KEY', 'eventData':keySigningRequest};
        let http = new HttpService();
        let httpPostResult = await http.post(ownerDoemUrl + '/session/eventNotification', data, 
        { 
            headers: { 
				'Content-Type'  : 'application/json',
				'x-requestid'   : requestId,
				'x-vehicle-oemId': vehicleOemId
			}, 
			method:'POST', 
			data:null 
        }).toPromise()
        .catch( e => { 
			Logger.error('[keySharingExchange API] Vehicle OEM Server에서 createSharedKey API를 Device OEM Server로 호출 실패');
            throw new HttpException( e, 555 );
        } );  
        resultObj['responseHeader'] = {'responseHeader':{'statusCode':200}};  
        Logger.log('=============================================================================='); 
        Logger.log('[keySharingExchange API] 전달한 응답 : ' + JSON.stringify(resultObj['responseHeader'])); 
        Logger.log('==============================================================================');
        return resultObj;
    }

    async sendSignSharedKey(
        requestId : string,
        selectResult : {},
        res,
    ){
        res.set('x-vehicle-oemId', 'Genesis');
        res.set('x-responseId', requestId);
        Logger.log('[keySharingExchange API] Owmer Device Server에서 signSharedKey 전달 : responseHeader 전송');
        res.send(selectResult['responseHeader']);
        Logger.log('================================================================================');
        Logger.log('[keySharingExchange API] 전달한 responseHeader : ' + JSON.stringify(selectResult['responseHeader']));
        Logger.log('================================================================================');
    }

    /*
        Description : Import shared key for cross-platform key sharing
        Reason for key action to be triggered
        When owner sends keySign-ingRequest for friend device, this notification is sent from Vehicle OEM Server to friend Device OEM Server.
    */ 
    async importSharedKey(vehicleOemId : string, x_timestamp:string, requestId : string, keyID : string, sharingSession : object, importRequest : string) {
        Logger.log('==================================================================');
        Logger.log('===    [Vehicle OEM Server] importSharedKey API 요청됨    ==');
        Logger.log('==================================================================');
        Logger.log('[keySharingExchange API] importSharedKey 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
        Logger.log('x_timestamp           : ' + x_timestamp);
        Logger.log('requestId             : ' + requestId)
        Logger.log('keyID                 : ' + keyID);
        Logger.log('sharingSession        : ' + JSON.stringify(sharingSession)); 
        Logger.log('keyCreationRequest    : ' + importRequest);  
        Logger.log('=============================================================================='); 
        // 전달받은 Session 객체에서 Session ID 추출 후, 해당 ID가 데이터베이스에 저장되어 있는지 확인
        let resultObj = {}; 
         // 1. SharingSession ID Validity Check  
        if(!sharingSession['sessionID']){
            Logger.error('[keySharingExchange API] 전달받은 세션에서 세션 아이디가 존재 하지 않음');
            resultObj['code'] = '-1'; 
        }
        let sessionId = sharingSession['sessionID'];
        let selectSessionUsingID = await this.selectSessionDB(sessionId); 
        if(!selectSessionUsingID){
            Logger.error('[keySharingExchange API] 해당 세션 아이디 ' + sessionId + ' 가 세션 데이터베이스에 존재 하지 않음');
            resultObj['code'] = '-2'; 
        }
        let selectObj = selectSessionUsingID[0];
        Logger.log('[createSharedKey API] Session ID 데이터베이스에서 owner Key Id 조회'); 
        Logger.log('[keySharingExchange API] => 조회된 세션 값 : ' + JSON.stringify(selectObj));  
        let selectOidResult = selectObj.owner_key_id;  
        Logger.log('[createSharedKey API] 전달받은 key Id와 Session ID 데이터베이스에서 조회한 owner Key Id 일치 여부 확인');
        if(keyID != selectOidResult){ 
            Logger.error('[keySharingExchange API] 전달받은 key Id와 Session ID 데이터베이스에서 조회한 owner Key Id 일치 하지않음');
            resultObj['code'] = '-3'; 
        }else{
            Logger.log('[keySharingExchange API] 전달받은 key Id와 Session ID 데이터베이스에서 조회한 owner Key Id 일치함');
            resultObj['code'] = '1';  
        }  
        /*
         * Friend Device Server에 EventNotificatoin API 호출
         */
        let fdoemUrl = selectObj.friend_doem_url; // Friend Device Server의 URL을 획득
        let data = {'keyID':keyID, 'eventType':'IMPORT_SHARED_KEY', 'eventData':importRequest};
        let http = new HttpService(); 
        Logger.log('[keySharingExchange API] 조회한 Friend OEM Server의 URL : ' + fdoemUrl + '/session/eventNotification 로 EventNotification API 호출');
        let httpPostResult = await http.post(fdoemUrl + '/session/eventNotification', data, 
        { 
            headers: { 
				'Content-Type'  : 'application/json',
				'x-requestid'   : requestId,
				'x-vehicle-oemId': vehicleOemId
			}, 
			method:'POST', 
			data:null 
        }).toPromise()
        .catch( e => { 
			Logger.error('[createSharedKey API] 2. Vehicle OEM Server에서 createSharedKey API를 Device OEM Server로 호출 실패');
            throw new HttpException( e, 555 );
        } ); 
        resultObj['responseHeader'] = {'responseHeader':{'statusCode':200}}; 
        Logger.log('=============================================================================='); 
        Logger.log('[keySharingExchange API] 전달한 응답 : ' + JSON.stringify(resultObj['responseHeader'])); 
        Logger.log('==============================================================================');
        return resultObj;
    }

    async sendImportsharedKey(
        requestId       : string,
        selectResult    : {},
        res,
    ){
        res.set('x-vehicle-oemId', 'Genesis');
        res.set('x-responseId', requestId);
        Logger.log('[keySharingExchange API] Owmer Device Server에서 importSharedKey 전달 : responseHeader 전송');
        res.send(selectResult['responseHeader']); 
        Logger.log('================================================================================');
        Logger.log('[keySharingExchange API] 전달한 responseHeader : ' + JSON.stringify(selectResult['responseHeader']));
        Logger.log('================================================================================');
    }
}