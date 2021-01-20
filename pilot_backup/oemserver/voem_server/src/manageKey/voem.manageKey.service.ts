import { Injectable, Logger, HttpException, HttpService} from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { DigitalKeyInfo, OwnerKeyInfo, RootOEMInfo, RootOEMServerInfo } from '../trackKey/entity/voem.trackKey.entity'

@Injectable()
export class VoemManageKeyService {
    constructor(
        @InjectRepository(OwnerKeyInfo)
        private readonly voemDKInfoRepository : Repository<DigitalKeyInfo>,

        @InjectRepository(RootOEMInfo)
        private readonly voemRootOemInfoRepository : Repository<RootOEMInfo>,

        @InjectRepository(DigitalKeyInfo)
        private readonly voemDigitalKeyInfoRepository : Repository<DigitalKeyInfo>,

        @InjectRepository(RootOEMServerInfo)
        private readonly voemRootOEMServerInfoRepository : Repository<RootOEMServerInfo>,
    ){}
    
    async getOwnerKeyInfoFromFriendKeyId(){

    }

    async V2FKeyTerminatedStartLogger(
        requestId : string,
        ownerKeyId : string,
        friendKeyId : string,
        status : number
    ){
        Logger.log('=============================================================================='); 
        Logger.log('===       [Vehicle OEM Server] V2FKeyTerminated API 요청됨       ==');
        Logger.log('=============================================================================='); 
        Logger.log('[V2FKeyTerminated API] V2FKeyTerminated 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
        Logger.log('requestId              : ' + requestId)
        Logger.log('ownerKeyId             : ' + ownerKeyId);
        Logger.log('friendKeyId            : ' + friendKeyId); 
        Logger.log('status                 : ' + status); 
        Logger.log('=============================================================================='); 
    }

    async managekeyStartLogger(
        requestId : string,
        deviceOemId : string,
        keyId : string,
        action : string
    ){
        Logger.log('==================================================================');
        Logger.log('===           [Vehicle OEM Server] manageKey API 요청됨           ==');
        Logger.log('==================================================================');
        Logger.log('[manageKey API] manageKey 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
		Logger.log('x-requestid           : ' + requestId);
        Logger.log('x-device-oemid        : ' + deviceOemId);
        Logger.log('KeyId                 : ' + keyId);
        Logger.log('action                : ' + action);
        Logger.log('==============================================================================');
    }


    async getDKUrlInfo(
        keyId : string
    ){  
        /**
         * Owner Key Info에서 해당 키에 대응하는 Device OEM Id 정보 획득
         */
        let root_oem_id = await this.voemDigitalKeyInfoRepository
                    .createQueryBuilder()
                    .select('t.device_oem')
                    .from(DigitalKeyInfo, 't')
                    .where('t.key_id = :id', {id:keyId})
                    .getOne()
        
        /**
         * Root OEM Info에서 Device OEM Id에 대응하는 Root OEM Url 정보 획득
         */
        let result = await this.voemDigitalKeyInfoRepository
                    .createQueryBuilder()
                    .select('t.root_oem_url')
                    .from(RootOEMServerInfo, 't')
                    .where('t.root_oem_id = :id', {id:root_oem_id})
                    .getOne() 
        return result.root_oem_url
    }

    async getKeyStatus(
        keyId : string
    ){
        let result = await this.voemDigitalKeyInfoRepository
                    .createQueryBuilder()
                    .select('t.key_status')
                    .from(DigitalKeyInfo, 't')
                    .where('t.key_id = :id', {id:keyId})
                    .getOne();
        return result.key_status;
    }

    async updateKeyStatus(
        keyId  : string,
        key_status : number
    ){
        let queryResult = await getConnection()
            .createQueryBuilder()
            .update(DigitalKeyInfo)
            .set({ key_status : key_status})
            .where("key_id = :id", { id: keyId })
            .execute(); 
        let result; 
        if(queryResult['affected'] == 1){
            result = '1';
        }else{
            result = '-1';
        }
        return result;
    }

    async vehicleKeyTerminated(
        keyId : string,
        key_status : number
    ){
        let keyStatus = await this.getKeyStatus(keyId);
        let result = {};
        if(keyStatus != 1){
            Logger.error('The key is not activated');
            result['code'] = '-1';
            return result;
        } 
        // Register key as "terminated in vehicle" in KTS
        let updateResult = await this.updateKeyStatus(keyId, key_status);
        if(updateResult != '1'){
            Logger.error('termination process is failed');
            result['code'] = '-2';
            return result;
        }
        result['code'] = '1';
        return result;
    }

    async manageKeyToDoemServer(
        keyId                           : string,
        action                          : string,
        terminationAttestation          : string, 
        deviceRemoteTerminationRequest  : object,
        serverRemoteTerminationRequest  : string,
        vehicleOEMProprietaryData       : string, 
        vehicleOemId                    : string,
        deviceOEMUrl                    : string,
    ){
        let http        = new HttpService();
        let x_timestamp = new Date().getTime();
        let requestId   = await crypto.randomBytes(40).toString('hex');
        let data = {'keyID':keyId, 'action':action,'serverRemoteTerminationRequest':serverRemoteTerminationRequest};
        let httpResult = await http.post(deviceOEMUrl + '/manageKey/manageKey', data, {
            headers: {
                'x-timestamp'     : x_timestamp,
                'x-requestid'     : requestId,
                'x-vehicle-oemId' : vehicleOemId 
            },
            method: 'POST',
            data:null
        }).toPromise()
        .catch(e => {
            Logger.error('[manageKey API] Device OEM 으로의 manageKey 요청 실패');
            Logger.error(e);
            throw new HttpException(e, 567);
        });
        return httpResult.data;
    }

    async manageKey(
        requestId       : string,
        vehicleOemId    : string,
        keyId           : string,
        eventType       : string,
        eventData 
    ){

        let http        = new HttpService();
        let x_timestamp = new Date().getTime();
        // let requestId   = await crypto.randomBytes(40).toString('hex');
        eventType = 'TERMINATED';
        eventData = '13455143253333343542245c4de36a';
        let data = {'keyID':keyId, 'eventType':eventType, 'eventData':eventData};
        let httpResult  = await http.post('http://localhost:4000/session/eventNotification', data, {
            headers : {
                'x-timestamp'     : x_timestamp,
                'x-requestid'     : requestId,
                'x-vehicle-oemId' : vehicleOemId 
            },
            method: 'POST',
            data:null
        }).toPromise()
        .catch(e => {
            Logger.error('[eventNotification API] Device OEM 으로의 eventNotification 요청 실패');
            Logger.error(e);
            throw new HttpException(e, 567);
        });
        return httpResult.data;
    }


    async terminateKey(
        keyId : string,
    ){
        let result = await this.getKeyStatus(keyId);
        if(result != 1){

        }


    }
}