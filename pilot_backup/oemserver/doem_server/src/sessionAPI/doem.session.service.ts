import { Injectable, Logger, HttpException, HttpService} from '@nestjs/common'; 
import { objectExpression } from '@babel/types';
import * as node_gcm from 'node-gcm';

@Injectable()
export class DoemSessionService {
    constructor(
    ){}  

    async generateSharingSessionStartLogger(
        requestId : string,
        deviceOemId : string,
        KeyId : string
    ){
        Logger.log('==================================================================');
        Logger.log('===     [Device OEM Server] generateSharingSession API 요청됨     ==');
        Logger.log('==================================================================');
        Logger.log('[     전달받은 요청     ]');
		Logger.log('x-requestid           : ' + requestId);
        Logger.log('x-device-oemid        : ' + deviceOemId);
        Logger.log('KeyId                 : ' + KeyId)
		Logger.log('==============================================================================');
    }

    async redeemSharingSessionStartLogger(
        sharingSession : string,
        friendDeviceHandle : string,
    ){
        Logger.log('==================================================================');
        Logger.log('===      [Device OEM Server] redeemSharingSession API 요청됨      ==');
        Logger.log('==================================================================');
        Logger.log("sharingSession : " + sharingSession);
        Logger.log("friendDeviceHandle : " + friendDeviceHandle);   
        Logger.log('[redeemSharingSession API] redeemSharingSession API가 Device에서 호출됨')
    }

    async eventNotificationStartLogger(
        requestId : string,
        vehicleOemId : string,
        ownerKeyId : string,
        eventType : string,
        eventData,
    ){
        Logger.log('==================================================================');
        Logger.log('===       [Device OEM Server] EventNotification API 요청됨       ==');
        Logger.log('==================================================================');
        Logger.log('[EventNotification API] EventNotification 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
        Logger.log('requestId    : ' + requestId);
        Logger.log('VehicleOemId : ' + vehicleOemId);
        Logger.log('keyID        : ' + ownerKeyId);
        Logger.log('eventType    : ' + eventType);
        Logger.log('eventData    : ' + eventData);
    }

    async createSharedKey(keyAction: string, x_timestamp:string, voemDomain:string, requestId:string, deviceOemId:string, keyID:string, sharingSession:string, keyCreationRequest:string){
        Logger.log('==================================================================');
        Logger.log('===    [Device OEM Server] createSharedKey API 요청됨    ==');
        Logger.log('==================================================================');
        Logger.log('[createSharedKey API] createSharedKey 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
        Logger.log('keyID              : ' + keyID);
        Logger.log('x_timestamp        : ' + x_timestamp);
        Logger.log('requestId          : ' + requestId);
        Logger.log('deviceOemId        : ' + deviceOemId);
        Logger.log('sharingSession     : ' + sharingSession);
        Logger.log('keyCreationRequest : ' + keyCreationRequest);
        Logger.log('Voem URL           : ' + voemDomain + '/session/keySharingExchange');
        Logger.log('==================================================================');
        let http = new HttpService(); 
        let data:object = {'keyAction':keyAction, 'keyID':keyID, 'sharingSession':sharingSession, 'keyCreationRequest':keyCreationRequest}; 
        let httpPostResult = await http.post(voemDomain + '/session/keySharingExchange', data, 
        { 
            headers: {
                'x-timestamp'    : x_timestamp,
                'x-requestid'    : requestId,
                'x-device-oemid' : deviceOemId 
            },
            method: 'POST',
            data:null
        }).toPromise()
        .catch(e => {
            Logger.error('[keySharingExchange API] Vehicle OEM 으로의 keySharingExchange 요청 실패');
            Logger.error(e);
            throw new HttpException(e, 567);
        });
        Logger.log('==================================================================');
        Logger.log('=== [Device OEM Server] createSharedKey API 요청됨===');
        Logger.log('==================================================================');
        return httpPostResult.data;
    }

    async signSharedKey(keyAction: string, x_timestamp:string, voemDomain:string, requestId:string, deviceOemId:string, sharingSession:string, keyCreationRequest:string){ 
        Logger.log('==================================================================');
        Logger.log('===    [Device OEM Server] signSharedKey API 요청됨    ==');
        Logger.log('==================================================================');
        Logger.log('[signSharedKey API] signSharedKey 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
        Logger.log('x_timestamp        : ' + x_timestamp);
        Logger.log('requestId          : ' + requestId);
        Logger.log('deviceOemId        : ' + deviceOemId);
        Logger.log('sharingSession     : ' + sharingSession);
        Logger.log('keyCreationRequest : ' + keyCreationRequest);
        Logger.log('Voem URL           : ' + voemDomain + '/session/keySharingExchange');
        Logger.log('==================================================================');
        let http = new HttpService(); 
        let data:object = {'keyAction':keyAction, 'sharingSession':sharingSession, 'keyCreationRequest':keyCreationRequest};
        let httpPostResult = await http.post(voemDomain + '/session/keySharingExchange', data, 
        { 
            headers: {
                'x-timestamp'    : x_timestamp,
                'x-requestid'    : requestId,
                'x-device-oemid' : deviceOemId 
            },
            method: 'POST',
            data:null
        }).toPromise()
        .catch(e => {
            Logger.error('[keySharingExchange API] Vehicle OEM 으로의 keySharingExchange 요청 실패');
            Logger.error(e);
            throw new HttpException(e, 567);
        });
        return httpPostResult.data;
    }

    async importSharedKey(keyAction: string, x_timestamp:string, voemDomain:string, requestId:string, deviceOemId:string, keyID:string, sharingSession:string, keyCreationRequest:string){
        Logger.log('==================================================================');
        Logger.log('===    [Device OEM Server] importSharedKey API 요청됨    ==');
        Logger.log('==================================================================');
        Logger.log('[keySharingExchange API] importSharedKey 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
        Logger.log('keyID              : ' + keyID);
        Logger.log('x_timestamp        : ' + x_timestamp);
        Logger.log('requestId          : ' + requestId);
        Logger.log('deviceOemId        : ' + deviceOemId);
        Logger.log('sharingSession     : ' + sharingSession);
        Logger.log('keyCreationRequest : ' + keyCreationRequest);
        Logger.log('Voem URL           : ' + voemDomain + '/session/keySharingExchange');
        Logger.log('==================================================================');
        let http = new HttpService(); 
        let data:object = {'keyAction':keyAction, 'keyID':keyID, 'sharingSession':sharingSession, 'keyCreationRequest':keyCreationRequest}; 
        let httpPostResult = await http.post(voemDomain + '/session/keySharingExchange', data, 
        { 
            headers: {
                'x-timestamp'    : x_timestamp,
                'x-requestid'    : requestId,
                'x-device-oemid' : deviceOemId 
            },
            method: 'POST',
            data:null
        }).toPromise()
        .catch(e => {
            Logger.error('[keySharingExchange API] Vehicle OEM 으로의 keySharingExchange 요청 실패 ');
            Logger.error(e);
            throw new HttpException(e, 567);
        });
        return httpPostResult.data;
    }

    async fcmPushService(
        serverKey : string,
        regToken  : string,
        pushData  : string
    ){
        let sender  = new node_gcm.Sender(serverKey);
        let regTokenArr = [regToken];
        let message = new node_gcm.Message({
            data: { key1: pushData }
        })
        let resultObj = {};
        
        sender.send(message, { registrationTokens: regTokenArr }, function (err, response) {
            if (err) {
                Logger.error(err);
                resultObj['code'] = '-1';
                resultObj['data'] = err;
            }else{
                Logger.log(response);
                resultObj['code'] = '-1';
                resultObj['data'] = response;
            }   
            return resultObj;
        });
    }
    async slackPushService(
        channelName         : string,
        userName            : string, 
        text                : string,
        icon_emoji          : string,
        pushCreateTime      : string,
        friend_handle       : string,
    ){
        let http = new HttpService();
        // 'channel':'#ccc','username':'webhookbot','text':'real test! ccc project [' + new Date() + ']', 'icon_emoji':'ghost'
        // friend_handle : T01CV0JF23V/B01CUUEVBAN/1tWxIMkhNx5Q45EYZ70LNhPn
        let data = {'channel':channelName,'username':userName,'text':'[' + pushCreateTime + '] ' + text, 'icon_emoji':icon_emoji};
        let httpResult = await http.post('https://hooks.slack.com/services/' + friend_handle, data, 
        {
            headers : {
                'Content-Type' : 'urlencode'
            },
            method:'POST', 
			data:null
        }).toPromise()
        .catch( e => { 
			Logger.error('[createSharedKey API] 2. Vehicle OEM Server에서 createSharedKey API를 Device OEM Server로 호출 실패');
            throw new HttpException( e, 555 );
        });
    }
}
