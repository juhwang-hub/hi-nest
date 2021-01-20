import { Injectable, Logger, HttpException, HttpService} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, Connection } from 'typeorm';
import * as node_gcm from 'node-gcm';

@Injectable()
export class DoemManageKeySrevice {
    constructor(){}

    async manageKeyStartLogger(
        keyID : string,
        vehicleOemId : string,
        x_timestamp : string,
        action : string
    ){
        Logger.log('==================================================================');
        Logger.log('===    [Device OEM Server] manageKey API 요청됨    ==');
        Logger.log('==================================================================');
        Logger.log('[manageKey API] manageKey 요청 들어옴'); 
        Logger.log('[     전달받은 요청     ]');
        Logger.log('keyId              : ' + keyID)
        Logger.log('x-vehicle-oemId    : ' + vehicleOemId);
        Logger.log('x-timestamp        : ' + x_timestamp); 
        Logger.log('action             : ' + action); 
        Logger.log('=============================================================================='); 
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
}