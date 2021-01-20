import { HttpService, HttpException, Logger, HttpCode, Headers, Res, Body, Post, Get, Controller } from '@nestjs/common';
import { ApiTags, ApiParam, ApiHeader, ApiBody , ApiOperation, ApiProperty } from '@nestjs/swagger';  
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { VoemManageKeyService } from './voem.manageKey.service'
import * as swaggerObj from './entity/voem.manageKey.swagger.object'

@ApiTags('manageKey')
@Controller('manageKey')
export class VoemManageKeyController {
    constructor(
        private readonly manageKeyService : VoemManageKeyService,
    ){} 
 
    @Post('V2FKeyTerminated')
    @ApiOperation({ summary : 'To request friend key termination from Vehicle'})
    @ApiHeader({
        name        : 'x-requestid',  
        description : '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9', 
        example     : '550a501552eedde2cd410b94c77bb58a0e8327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    })
    @ApiBody({type:swaggerObj.V2FKeyTerminated})
    @HttpCode(200)
    async V2FKeyTerminated(
        @Headers('x-requestid') requestId: string,
        @Body('ownerKeyId')  ownerKeyId  : string,  // Terminate 할 Friend Key Id의 Owner Device의 Key Id
        @Body('friendKeyId') friendKeyId : string,  // Terminate 할 Friend Key Id
        @Body('status')      status      : number,
        @Res() res
    ){    
        //V2FKeyTerminated 요청이 들어옴을 알리는 로그
        await this.manageKeyService.V2FKeyTerminatedStartLogger(requestId, ownerKeyId, friendKeyId, status);

        let keyStatus      = 10;
        Logger.log('[V2FKeyTerminated API] 1. friendKeyId(' + friendKeyId + ')의 상태 조회'); 
        let result         = await this.manageKeyService.vehicleKeyTerminated(friendKeyId, keyStatus);
        if(result['code'] != '1'){
            // 터미테이트 실패!
            Logger.error('[V2FKeyTerminated API] => friendKeyId(' + friendKeyId + ')의 키 상태가 ' + result['code'] + '로 활성화 되어 있지 않으므로 키 종료 실패'); 
            throw new HttpException('The key cannot be terminated since that is not activated', 531);
        }  
        Logger.log('[V2FKeyTerminated API] => friendKeyId(' + friendKeyId + ')의 키 상태가 ' + result['code'] + '로 활성화 되어 있으므로, VOEM(KTS)서버에서 해당 키 상태를 Terminated로 변경'); 

        Logger.log('[V2FKeyTerminated API] 2. friendKeyId(' + friendKeyId + ')를 통해 friend Device OEM Server의 Url 조회');
        let friendDoemUrl  = await this.manageKeyService.getDKUrlInfo(friendKeyId);
        Logger.log('[V2FKeyTerminated API] => 조회된 friendKeyId(' + friendKeyId + ')의 friend Device OEM Server의 Url : ' + friendDoemUrl);
        let action         = 'TERMINATED'; 
        let vehicleOemId   = 'Genesis'; 
        // Device OEM Server에 manageKey 요청 
        Logger.log('[V2FKeyTerminated API] 3. friendKeyId(' + friendKeyId + ')의 삭제 요청을 Friend Device OEM Server(' + friendDoemUrl + ')로 전달');
        let manageKeyResult = await this.manageKeyService.manageKeyToDoemServer(ownerKeyId, 
                                                                                action, 
                                                                                "TERMINATE_ATTESTATION", 
                                                                                null, 
                                                                                "serverRemoteTerminationRequest", 
                                                                                "vehicleOEMProprietaryData", 
                                                                                vehicleOemId, 
                                                                                friendDoemUrl);
        if(manageKeyResult.statusCode != '200'){
            Logger.error('[V2FKeyTerminated API] 4.Friend Device OEM으로 부터 200응답이 안옴.. 전달받은 상태코드 : ' + manageKeyResult.statusCode);
            throw new HttpException('[V2FKeyTerminated API] 4.Friend Device OEM으로 부터 200응답이 안옴.. 전달받은 상태코드 : ' + manageKeyResult.statusCode, 444);
        }else{
            Logger.log('=============================================================================='); 
            Logger.log('[V2FKeyTerminated API] 4.응답으로 전달한 데이터'); 
            let x_timestamp : string = new Date().getTime().toString(); 
            res.set('x-timestamp', x_timestamp);
            res.set('x-vehicle-oemid', vehicleOemId);
            res.set('x-responseId', requestId);
            res.send(manageKeyResult); 
            Logger.log('==============================================================================');  
        }     
    }

    @Post('manageKey')
    @ApiHeader({
        name        : 'x-requestid',  
        description : '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9', 
        example     : '550a501552eedde2cd410b94c77bb58a0e8327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    })
    @ApiHeader({
        name        : 'x-device-oemid',
        description : 'owner_device_oem',
    })
    @ApiBody({type:swaggerObj.ManageKey})
    @HttpCode(200)
    async manageKey(
        @Headers('x-requestid')                 requestId: string, 
        @Headers('x-device-oemid')              deviceOemId: string, 
        @Body('keyID')                          keyId: string,
        @Body('action')                         action: string,
        @Body('terminationAttestation')         terminationAttestation: string,
        @Body('deviceRemoteTerminationRequest') deviceRemoteTerminationRequest: object,
        @Body('serverRemoteTerminationRequest') serverRemoteTerminationRequest: string,
        @Body('vehicleOEMProprietaryData')      vehicleOEMProprietaryData: string,
        @Res() res
    ){ 
        //managekey 요청이 들어옴을 알리는 로그
        await this.manageKeyService.managekeyStartLogger(requestId, deviceOemId, keyId, action);

        // 1. 데이터베이스에서 KeyID를 통해 Digital Key가 있는지 조회
        // 만일 있으면 manageKey API 절차 진행, 아니면.. 에러 던지자
        // 에러코드 : 

        // KeyID가 등록되어 있으면..manageKey 과정을 진행한다.
        // 
        //
        switch(action){
            case 'TERMINATE' : {
                let requestId    = await crypto.randomBytes(40).toString('hex');
                let vehicleOemId = 'Genesis';
                let eventType    = '';
                let eventData    = '';
                let responseHeader = {'responseHeader':{'statusCode':'200'}}
                res.set('x-responseId', requestId);  
                res.set('x-vehicle-oemId', 'Genesis'); 
                res.send(responseHeader); 
                let result = await this.manageKeyService.manageKey(requestId, vehicleOemId, keyId, eventType, eventData); // terminate 로직..
                return result;
            } 
 
        } 
    }
}
