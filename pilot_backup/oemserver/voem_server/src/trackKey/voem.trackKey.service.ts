import { Injectable, Logger, HttpException, Res} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, Connection } from 'typeorm';

import { DigitalKeyInfo, VoemVerifierInfo, RootOEMServerInfo, RootOEMInfo, VoemVehicleInfo, OwnerKeyInfo, VoemUserInfo } from './entity/voem.trackKey.entity'
import { stringLiteral } from '@babel/types';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class VoemVerifierInfoService {
    constructor(
        @InjectRepository(VoemVerifierInfo)
        private readonly userRepository : Repository<VoemVerifierInfo>,

        @InjectRepository(RootOEMInfo)
        private readonly rootOemRepository : Repository<RootOEMInfo>,

        @InjectRepository(VoemVehicleInfo)
        private readonly voemVehicleInfoRepository : Repository<VoemVehicleInfo>,

        @InjectRepository(OwnerKeyInfo)
        private readonly OwnerKeyInfoRepository : Repository<OwnerKeyInfo>,
         
        @InjectRepository(DigitalKeyInfo)
        private readonly voemDigitalKeyInfoRepository : Repository<DigitalKeyInfo>,

        @InjectRepository(RootOEMServerInfo)
        private readonly voemRootOEMServerInfoRepository : Repository<RootOEMServerInfo>,
        
    ) {} 
     
    async getAllUsers(): Promise<VoemVerifierInfo[]> {
        return await this.userRepository.find();
    }  
    async checkVerifier(voem_user_id: string) 
    { 
        // let queryStr = 'SELECT exist_verifier FROM voem_verifier_info_table WHERE voem_user_id ="' + voem_user_id + '"';
        // return await this.userRepository.query(queryStr);   
         
        let result = await this.userRepository
        // return await getConnection()
                .createQueryBuilder()
                .select('t.exist_verifier')
                .from(VoemVerifierInfo ,'t')
                .where('t.voem_user_id = :id', {id: voem_user_id})
                .getOne();  
        return result
    }
    
    async getVerifierLoggerExist(
        voemVehicleId : string,
        requestId : string,
        res,
    ){
        Logger.log('[getVerifier API] 2. 해당 ID ' + voemVehicleId + '(으)로 등록된 verifier DB조회');  
			let result = await this.getVerifier(voemVehicleId);
			let jsonResult = result[0];
			jsonResult['result'] = "E00201"; 
			Logger.log('[getVerifier API] => 조회된 ' + voemVehicleId + ' 의 첫 번째 Verifier : ' + result[0].first_verifier.substr(0, 20) + '...');  
			Logger.log('[getVerifier API] => 조회된 ' + voemVehicleId + ' 의 두 번째 Verifier : ' + result[0].second_verifier.substr(0, 20)+ '...');  
			Logger.log('[getVerifier API] => 조회된 ' + voemVehicleId + ' 의 Salt            : ' + result[0].salt);  
			 
			res.setHeader('x-responseId', requestId); 
            res.send(jsonResult);	
            
            Logger.log('[getVerifier API] 3. 차량에 해당 ID로 등록된 verifier 차량에 전달 완료');
            Logger.log('==============================================================================');
            Logger.log('전달한 응답 : ' + JSON.stringify(result[0]).substr(0, 50) + '...');
            Logger.log('==============================================================================');
			
    }

    async getVerifierLoggerNotExist(
        voemVehicleId : string,
        requestId : string,
        res,
    ){
        Logger.log('[getVerifier API] 2. 해당 ID ' + voemVehicleId + ' 로 등록된 Identifier 가 존재하지 않음');  
			let result = {"result" : "E00202"};
			// if(!requestId) {
			// 	requestId = 'test';
			// }
			res.setHeader('x-responseId', requestId);
			res.send(result);

			Logger.log('[getVerifier API] 2. 차량에 (해당 ID ' + voemVehicleId + ' 로 등록된 Identifier 가 존재하지 않음) 응답 전송완료');
			Logger.log('==============================================================================');
			Logger.log('전달한 응답 : ' + JSON.stringify(result).substr(0, 50) + '...');
			Logger.log('==============================================================================');
    }

    async getVerifier(voem_user_id: string){
        let result = await this.userRepository
                .createQueryBuilder()
                .select(['t.first_verifier', 't.second_verifier', 't.salt'])  
                .from(VoemVerifierInfo ,'t')
                .where('t.voem_user_id = :id', {id: voem_user_id})
                .getMany();  
        return result
    }
    async insertVerifierDB(
            voem_user_id : string,
            exist_verifier : string,
            first_verifier : string,
            second_verifier : string,
            salt : string,
            password : string
        ) {
        let testdb = new VoemVerifierInfo();
        testdb.voem_user_id = voem_user_id;
        testdb.exist_verifier =  exist_verifier;
        testdb.first_verifier = first_verifier;
        testdb.second_verifier = second_verifier;
        testdb.salt = salt;
        testdb.password = password; 
        await this.userRepository.insert(testdb).catch(error => {
            console.log(error);
        })
    }

    async updateVerifierDB(
        voem_user_id : string,
            exist_verifier : string,
            first_verifier : string,
            second_verifier : string,
            salt : string,
            password : string
    ) {
        let testdb = new VoemVerifierInfo();
        testdb.voem_user_id = voem_user_id;
        testdb.exist_verifier =  exist_verifier;
        testdb.first_verifier = first_verifier;
        testdb.second_verifier = second_verifier;
        testdb.salt = salt;
        testdb.password = password;
        await getConnection()
            .createQueryBuilder()
            .update(VoemVerifierInfo)
            .set({
                exist_verifier : 'true',
                first_verifier : first_verifier,
                second_verifier : second_verifier,
                salt : salt,
                password : password
            })
            .where("voem_user_id = :id", {id:voem_user_id})
            .execute()
    }

    async insertRootOEMInfoDB(
        root_oem_id   : string,
        root_oem_cert : string, 
        root_oem_url  : string,
    ) {
    let RootOEMServerInfodb = new RootOEMServerInfo();
    RootOEMServerInfodb.root_oem_id   = root_oem_id;
    RootOEMServerInfodb.root_oem_cert = root_oem_cert; 
    RootOEMServerInfodb.root_oem_url  = root_oem_url;
    await this.voemRootOEMServerInfoRepository.insert(RootOEMServerInfodb).catch(error => {
        Logger.error(error);
    })
    }

    async getRootOEMInfo(root_oem_id: string) 
    {  
        let result = await this.voemRootOEMServerInfoRepository
        // return await getConnection()
                .createQueryBuilder()
                .select('t.root_oem_cert')
                .from(RootOEMServerInfo ,'t')
                .where('t.root_oem_id = :id', {id: root_oem_id})
                .getOne();  
        return result
    }

    async getDeviceOemInfo(key_id : string) {
        let result = await this.voemDigitalKeyInfoRepository
                .createQueryBuilder()
                .select('t.device_oem')
                .from(DigitalKeyInfo, 't')
                .where('t.key_id = :id', {id: key_id})
                .getOne();
        return result.device_oem;
    }

    async getRootOemUrl(root_oem_id : string) {
        let result = await this.voemDigitalKeyInfoRepository
                .createQueryBuilder()
                .select('t.root_oem_url')
                .from(RootOEMServerInfo, 't')
                .where('t.root_oem_id = :id', {id: root_oem_id})
                .getOne();
        return result.root_oem_url;
    }

    async vehicleInfoInsertDB(
        vehicle_id : string,
        vehicle_pk : string,
        vehicle_enc_pk : string,
        vehicle_sig_cert : string,
        vehicle_enc_cert : string,
        vehicle_brand : string,
        vehicle_model : string
    )
    {
        let voemVehicleInfo = new VoemVehicleInfo();
        voemVehicleInfo.vehicle_id = vehicle_id;
        voemVehicleInfo.vehicle_pk = vehicle_pk;
        voemVehicleInfo.vehicle_enc_pk = vehicle_enc_pk;
        voemVehicleInfo.vehicle_sig_cert = vehicle_sig_cert;
        voemVehicleInfo.vehicle_enc_cert = vehicle_enc_cert;
        voemVehicleInfo.vehicle_brand = vehicle_brand;
        voemVehicleInfo.vehicle_model = vehicle_model;
        await this.voemVehicleInfoRepository.insert(voemVehicleInfo).catch(error => {
            // console.log(error);
        })
    }  
    // , t.vehicle_enc_pk, t.vehicle_sig_cert, t.vehicle_enc_cert, t.vehicle_brand, t.vehicle_model

    async getVehicleInfo(vehicle_id: string) 
    {  
        let result = await this.voemVehicleInfoRepository
        // return await getConnection()
                .createQueryBuilder()
                .select('t')
                .from(VoemVehicleInfo ,'t')
                .where('t.vehicle_id = :id', {id: vehicle_id})
                // .getOne(); 
                .getOne(); 
        return result
    }

    async getDKInfo(key_id: string) 
    {  
        let result = await this.voemDigitalKeyInfoRepository 
                .createQueryBuilder()
                .select('t')
                .from(OwnerKeyInfo ,'t')
                .where('t.key_id = :id', {id: key_id}) 
                .getOne(); 
        return result
    }

    async insertDKinfo(
        key_id : string,
        vehicle_id : string,
        key_status : number,
        device_oem : string,
        owner_device_key : string,
        digital_key_PK : string, 
        key_type : string, 
        device_type : string, 
        accountIdHash : string, 
        ICA_Cert : string, 
        DK_Cert : string, 
        device_enc_PK : string, 
        device_enc_PK_version : string, 
        key_Valid_From : string, 
        key_Valid_To : string, 
        shared_keys : string, 
        sharable_keys : string, 
        sharing_password_required : string
    ) {
        let ownerKeyInfo = new OwnerKeyInfo();
        ownerKeyInfo.key_id             = key_id;
        ownerKeyInfo.vehicle_id         = vehicle_id;
        ownerKeyInfo.key_status         = key_status;
        ownerKeyInfo.device_oem         = device_oem;
        ownerKeyInfo.owner_device_key   = owner_device_key;
        ownerKeyInfo.digital_key_PK     = digital_key_PK;
        ownerKeyInfo.key_type           = key_type;
        ownerKeyInfo.device_type        = device_type;
        ownerKeyInfo.accountIdHash      = accountIdHash;
        ownerKeyInfo.ICA_Cert           = ICA_Cert;
        ownerKeyInfo.DK_Cert            = DK_Cert;
        ownerKeyInfo.device_enc_PK      = device_enc_PK;
        ownerKeyInfo.device_enc_PK_version = device_enc_PK_version;
        ownerKeyInfo.key_Valid_From     = key_Valid_From;
        ownerKeyInfo.key_Valid_To       = key_Valid_To;
        ownerKeyInfo.shared_keys        = shared_keys;
        ownerKeyInfo.sharable_keys      = sharable_keys;
        ownerKeyInfo.sharing_password_required = sharing_password_required;
        await this.voemDigitalKeyInfoRepository.insert(ownerKeyInfo).catch(error => {
            // Logger.error(error.sqlMessage);
        })
    }
    //////////////////////////////////////
    // Logger 관련 서비스 
    //////////////////////////////////////
    // 1-1. Generate Verifier 관련
    public async generateVerifierHeadParam(
        requestId    : string,
        voemUserId   : string,
        password_str : string,
    ){
        if(!requestId) { 
            Logger.error('[generateVerifier API error] no x-requestId Parameter');
            throw new HttpException( 'no x-requestId Parameter', 501);
        }
        if(!voemUserId) { 
            Logger.error('[generateVerifier API error] no voemUserId');
            throw new HttpException( 'no voemUserId', 502);
        }   
        if(!password_str) {
            Logger.error('[generateVerifier API error] no password'); 
            throw new HttpException( 'no password', 503);
        }  
         
        Logger.log('=============================================================================='); 
        Logger.log('[generateVerifier API]          GenerateVerifier API Test 		'); 
        Logger.log('==============================================================================');
        Logger.log('[     전달받은 요청     ]');
        Logger.log('x-requestid           : ' + requestId);
        Logger.log('x-voem-vehicleid      : ' + voemUserId);
        Logger.log('password              : ' + password_str);
        Logger.log('=============================================================================='); 
        Logger.log('[generateVerifier API] 1. 해당 UserId인 ' + voemUserId + ' 에 대응하는 Verifier 가 있는지 확인 [데이터베이스 조회]'); 
    }

    // 1-2. Generate Verfier 관련  
    public async generateVerifierTailParam(
        resultObj : object,
    ){
        Logger.log('==============================================================================');
		Logger.log('전달한 응답 : ' + JSON.stringify(resultObj));
		Logger.log('==============================================================================');
    }

    public async IfVerifierExistAndSame (
        voemUserId : string,
        requestId : string,
        res,
    ){
        Logger.log('[generateVerifier API] 2. 해당 UserId인 ' + voemUserId + ' 에 대응하는 Verifier가 생성되어 있음'); 
        let resultObj = {'result': 'E00102'};
        res.set('x-responseId', requestId); 
        res.send(resultObj);
        Logger.log('[generateVerifier API] 3. 단말에 응답 전송 완료'); 
        await this.generateVerifierTailParam(resultObj); 
    }
    

    public async IfVerifierDoesNotExist(
        voemUserId      : string,
        password        : Buffer,
        salt            : Buffer,
        salt_str        : string,
        password_str    : string,
        res,
        requestId       : string,
    ) {
        Logger.log('[generateVerifier API] 2. 해당 UserId인 ' + voemUserId + ' 에 대응하는 Verifier 가 존재하지 않음');    
		let resultString = await new CryptoService().genVerifier(password, salt, 32768, 8, 1); 
		let resultJSON = JSON.parse(resultString);    
		Logger.log('[generateVerifier API] => 해당 UserId인 ' + voemUserId + ' 에 대응하는 Verifier 생성 [Scrypt]'); 
		await this.updateVerifierDB(voemUserId, 'true', resultJSON.w0, resultJSON.L, salt_str, password_str);
		Logger.log('[generateVerifier API] => 해당 UserId인 ' + voemUserId + ' 에 대응하는 Verifier 데이터베이스에 저장 완료');
		Logger.log('[generateVerifier API] 3. 해당 UserId인 ' + voemUserId + ' 에 대응하는 Verifier 새로 생성 후 저장 완료');
		// response용 json 객체
		let resultObj = {'result': 'E00101'};
        res.set('x-responseId', requestId); 
		res.send(resultObj);
		Logger.log('[generateVerifier API] 4. 단말에 응답 전송 완료');
		await this.generateVerifierTailParam(resultObj); 
    }

    public async IfVerifierDifferent(
        voemUserId : string,
        requestId : string,
        res,
    ){
        Logger.log('[generateVerifier API] 2. 해당 UserId인 ' + voemUserId + ' (이)가 존재하지 않음');  
        // response용 json 객체
        let resultObj = {'result':'E00103'};
        res.set('x-responseId', requestId);
        res.send(resultObj);	 
        Logger.log('[generateVerifier API] 4. 단말에 응답 전송 완료');
        await this.generateVerifierTailParam(resultObj); 
    }


    // 2-1. Get Verifier 관련
    public async getVerifierHeadParam(
        requestId     : string,
        voemVehicleId : string,
    ){
        Logger.log('=============================================================================='); 
		Logger.log('[generateVerifier API]          GetVerifier API Test 		'); 
		Logger.log('=============================================================================='); 
		Logger.log('[     전달받은 요청     ]');
		Logger.log('x-requestid           : ' + requestId);
		Logger.log('x-voem-vehicleid      : ' + voemVehicleId);
		Logger.log('==============================================================================');
		Logger.log('[getVerifier API] 1. 해당 ID로 등록된 verifier 가 존재하는지 확인');
    }
     
     
     
    // 1. Track Key 관련
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

    public async IfOwnerKeyExist(
        keyID : string,
        resultObj : DigitalKeyInfo,
        requestId : string,
        res,
    ){
        Logger.log('[trackKey API] => (Owner Key 조회) 해당 Key ID (' + keyID + ')가 존재하여 Key Tracking 데이터 조회 시작'); 
        // 데이터베이스 조회 후 uiBundleSample 데이터 생성
        Logger.log('[trackKey API] 3. 해당 Key ID (' + keyID + ')에 대응하는 uiBundleSmaple 데이터 생성');
        
        
        let uiBundleSample = await this.uiSampleGenerator(
            "3045022017B5FBBCF2F475F15C85E78A519530792211CC4",
            resultObj.key_Valid_From,
            resultObj.key_Valid_To,
            resultObj.shared_keys,
            resultObj.sharable_keys,
            "35E3406EFDA511E88EB2F2801F1B9FD1"
        );
         
        let vehicle_id = resultObj.vehicle_id;
        Logger.log('[trackKey API] 4. (Owner Key 조회) 해당 Vehicle ID (' + vehicle_id + ')로 차량 정보 조회');
        let vehicle_info = await this.getVehicleInfo(vehicle_id); 
        Logger.log('[trackKey API] => 해당 Vehicle Id ' + vehicle_id + '에 대응하는 Vehicle Brand : ' + vehicle_info.vehicle_brand); 
        Logger.log('[trackKey API] => 해당 Vehicle Id ' + vehicle_id + '에 대응하는 Vehicle Model : ' + vehicle_info.vehicle_model); 
        let resultDataObj = {
            'uiBundle'  : uiBundleSample,
            // 'eventType' : '', // 현재는 Shared key는 고려하지 않으므로 생략함 (optional)
            // 'eventData' : '', // 현재는 Shared key는 고려하지 않으므로 생략함 (optional)
            'brand'     : vehicle_info.vehicle_brand,
            'model'		: vehicle_info.vehicle_model 
        }; 
        resultDataObj['result_type'] = "0";
        res.set('x-responseId', requestId);  
        res.send(resultDataObj); 
        Logger.log('[trackKey API] 5. (Owner Key 조회) 해당 Key ID (' + keyID + ')로 Key Tracking 데이터 조회 완료'); 
        Logger.log('==============================================================================');
        Logger.log('전달한 응답 : ' + JSON.stringify(resultDataObj).substr(0, 50) + '...');
        Logger.log('==============================================================================');
    }


    ///////////////////////////////
    // UI Sample 
    //////////////////////////////
    public async uiSampleGenerator(
        ktsSignature  : string,
        validTimeFrom : string,
        validTimeTo   : string,
        sharedKeys    : string,
        sharableKeys  : string,
        uiIentifier 
    ){
        let uiBundleSample = {
            'ktsSignature' : ktsSignature,
            "keyValidFrom" : validTimeFrom, // "2019-03-06T18:00:49.239Z"
             "keyValidTo" : validTimeTo, // "2022-03-05T18:00:49.239Z"
             "sharedKeys" : sharedKeys,
             "shareableKeys" : sharableKeys,
             "uiIdentifier" : uiIentifier,
            "sharingPasswordRequired" : "false",
            "entitlement" : {
            "value" : 0,
            "description" : "full",
            "longDescription" : "full access and drive capabilities"
            },
            "supportedEntitlements" : {
                "entitlements" : [
                    {
                        "value" : 0,
                        "description" : "full",
                        "longDescription" : "full access and drive capabilities"
                    },
                    {
                        "value" : 1,
                        "description" : "accessOnly",
                        "longDescription" : "only vehicle access , no drive capability"
                    },
                    {
                        "value" : 2,
                        "description" : "accessAndDriveRestricted",
                        "longDescription" : "access and drive with restrictions"
                    },
                    {
                        "value" : 3,
                        "description" : "vehicleDelivery",
                        "longDescription" : "vehicle delivery profile"
                    },
                    {
                        "value" : 4,
                        "description" : "valet",
                        "longDescription" : "valet parking key"
                    },
                    {
                        "value" : 5,
                        "description" : "vehicleService",
                        "longDescription" : "service key"
                    },
                    {
                        "value" : 6,
                        "description" : "custom entitlement description",
                        "longDescription" : "custom entitlement long description"
                    }
                ]
            }
        }
        return uiBundleSample;
    }

}