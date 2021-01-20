import { HttpService, Injectable, Logger, HttpException} from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, getConnection, Connection } from 'typeorm';
 
// import { stringLiteral } from '@babel/types';
 
 
@Injectable()
export class DoemTrackKeyService {
    constructor(  
		private http: HttpService, 
	) {}   
    public async checkParamsValidity(
        requestId           : string,
        deviceOemId         : string,
        encryptionCertChain : Array<String>,
        encryptionVersion   : string,
        keyID               : string,
        keyType             : string,
        deviceType          : string,
        accountIDHash       : string 
    ){
        if(!requestId) {  
			Logger.error('[trackKey API] 필수 파라미터인 x-requestId 가 없습니다.');
			throw new HttpException( 'no x-requestId Parameter', 500);
		}
		if(!deviceOemId) {
			Logger.error('[trackKey API] 필수 파라미터인 x-device-oemId 가 없습니다.'); 
			throw new HttpException( 'no x-device-oemId Parameter', 500);
		}
		if(!encryptionCertChain) {
			Logger.error('[trackKey API] 필수 파라미터인 encryptionCertChain 가 없습니다.'); 
			throw new HttpException( 'no encryptionCertChain Parameter', 500);
		}
		if(!encryptionVersion) {
			Logger.error('[trackKey API] 필수 파라미터인 encryptionVersion 가 없습니다.'); 
			throw new HttpException( 'no encryptionVersion Parameter', 500);
		}
		if(!keyID) {
			Logger.error('[trackKey API] 필수 파라미터인 keyID 가 없습니다.'); 
			throw new HttpException( 'no keyID Parameter', 500);
		}
		if(!keyType) {
			Logger.error('[trackKey API] 필수 파라미터인 keyType 가 없습니다.'); 
			throw new HttpException( 'no keyType Parameter', 500);
		}
		if(!deviceType) {
			Logger.error('[trackKey API] 필수 파라미터인 deviceType 가 없습니다.'); 
			throw new HttpException( 'no deviceType Parameter', 500);
		}
		if(!accountIDHash) {
			Logger.error('[trackKey API] 필수 파라미터인 accountIDHash 가 없습니다.'); 
			throw new HttpException( 'no accountIDHash Parameter', 500);
		}
    }

    public async trackKeyStartLogger(
        requestId           : string,
        deviceOemId         : string,
        encryptionCertChain : Array<String>,
        encryptionVersion   : string,
        keyID               : string,
        keyType             : string,
        deviceType          : string,
        accountIDHash       : string,
        keyData             : string 
    ){
        Logger.log('=============================================================================='); 
		Logger.log('[DOEM trackKey API] Key ID가 ' + keyID + ' 인 단말에서 요청 들어옴  '); 
		Logger.log('=============================================================================='); 
		Logger.log('[     전달받은 요청     ]');
		Logger.log('x-requestid         : ' + requestId);
		Logger.log('x-device-oemid      : ' + deviceOemId);
		Logger.log('encryptionCertChain : ' + encryptionCertChain.toString().substr(0, 30) + '...');
		Logger.log('encryptionVersion   : ' + encryptionVersion);
		Logger.log('keyID               : ' + keyID);
		Logger.log('keyType             : ' + keyType);
		Logger.log('deviceType          : ' + deviceType);
		Logger.log('accountIDHash       : ' + accountIDHash);
		Logger.log('keyData             : ' + keyData.substr(0, 30) + '...');
		Logger.log('==============================================================================')
    }

    public async trackKeySecondLogger(
        resultStr : string
    ){
        Logger.log('[trackKey API] 2. 해당 Vehicle OEM Server로부터 성공적으로 응답 전달 받음');
		Logger.log('==============================================================================');
		Logger.log('단말에 전달한 응답 : ' + JSON.stringify(resultStr).substr(0, 50) + '...');
		Logger.log('==============================================================================');
    }

    public async trackKeyFinalLogger(
        keyID       : string,
        resultStr   : string
    ){
        Logger.log('[trackKey API] 3. 해당 Key ID (' + keyID + ')로 Vehicle OEM Server에 Track Key 요청 성공');
		Logger.log('==============================================================================');
		Logger.log('단말에 전달한 응답 : ' + JSON.stringify(resultStr).substr(0, 50) + '...');
		Logger.log('==============================================================================');
    }

    public async trackKeyHttpRequest(
        url                 : string,
        requestId           : string,
        deviceOemId         : string,
        encryptionCertChain : Array<String>,
        encryptionVersion   : string,
        keyID               : string,
        keyType             : string,
        deviceType          : string,
        accountIDHash       : string,
        keyData             : string 
    ){ 
        let data = {
			'encryptionCertChain' : encryptionCertChain,
			'encryptionVersion'   : encryptionVersion,
			'keyID' 			  : keyID,
			'keyType' 			  : keyType,
			'deviceType' 		  : deviceType,
			'accountIDHash' 	  : accountIDHash,
			'keyData' 			  : keyData
		}; 
        Logger.log('[trackKey API] 1. 해당 Key ID (' + keyID + ')로 단말에서 전달받은 데이터 그대로 Vehice OEM Server에 데이터 전달');
        return await this.http.post( url, data,
        { 
			headers: { 
				'Content-Type'  : 'application/json',
				'x-requestid'   : requestId,
				'x-device-oemid': deviceOemId
			}, 
			method:'POST', 
			data:null 
		} )
        .toPromise()
        .catch( e => { 
			Logger.error('[trackKey API] 2. 해당 Key ID (' + keyID + ')로 Vehicle OEM Server에 track Key 요청 실패');
            throw new HttpException( e, 555 );
		} );  
    }
}