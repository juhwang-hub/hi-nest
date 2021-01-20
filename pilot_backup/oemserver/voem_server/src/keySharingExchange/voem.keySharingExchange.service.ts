import { Injectable, Logger} from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VoemSessionService } from '../sessionAPI/voem.session.service'; 
@Injectable()
export class VoemKeySharingExchangeService {
    constructor( 
    ){}
    // async selectSessionDB(sessionId  : string){
    //     let result = await this.voemSessionRepository
    //                 .createQueryBuilder()
    //                 .select('t.owner_key_id')
    //                 .from(VoemSessionInfo, 't')
    //                 .where('t.session_id = :id', {id: sessionId})
    //                 .getOne();
    //     return result;
    // }
    /*
        Description : Create shared key for cross-platform key sharing
        Reason for key action to be triggered
        When owner sends keyCrea-tionRequest for friend device, this notification is sent from Vehicle OEM Server to friend Device OEM Server.
    */
    async createSharedKey(keyId : string, sharingSession: object, keyCreationRequest : string){
        // 1. SharingSession ID Check           
        // let result = await this.selectSessionDB(sharingSession['sessionID']);
        // if(keyId != result.owner_key_id){
        //     // If Key Id in Ses
        // }
        // return result;
    }   

    /*
        Description : Sign shared key for cross- platform key sharing
        Reason for key action to be triggered
        When friend sends keySign-ingRequest for owner device, this notification is sent from Vehicle OEM Server to owner Device OEM Server.
    */
    async signSharedKey(sharingSession : object, keySigingRequest : string) {

    }

    /*
        Description : Import shared key for cross-platform key sharing
        Reason for key action to be triggered
        When owner sends keySign-ingRequest for friend device, this notification is sent from Vehicle OEM Server to friend Device OEM Server.
    */
    async importSharedKey(keyId : string, sharingSessoin : object, importRequest : string) {

    } 
}