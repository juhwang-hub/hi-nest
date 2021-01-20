import { HttpService, HttpException, Param, Logger, HttpCode, Headers, Res, Controller, Body, Post, Get } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBody , ApiOperation, ApiProperty } from '@nestjs/swagger';  
import { VoemSessionService } from './voem.session.service';
import * as crypto from 'crypto';
import * as swaggerObj from './entity/voem.session.swagger.object'; 


@ApiTags('session')
@Controller('session')
export class VoemSessionController {
    constructor(   
        private readonly sessionService : VoemSessionService,  
	) {}   
    @Post('generateSharingSession')
    @ApiOperation({ summary: ' The owner device initiates a sharing process on the Vehicle OEM Server through the Device OEM Server' })
    @ApiParam({
        name        : 'x-requestid',
        type        : 'string',
        description : '550a501552eedde2cd410b94c77bb58a0e8327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
      })
    @ApiParam({
        name        : 'x-device-oemid',
        type        : 'string',
        example     : 'owner_device_oem',
    })
    @ApiBody({type:swaggerObj.GenerateSharingSession}) 
    @HttpCode(200)
    async generateSharingSession(
        @Headers('x-requestid') requestId: string, 
        @Headers('x-device-oemid') deviceOemId: string, 
        @Body('KeyId')    ownerKeyId: string,
        @Res() res
    ){    
        //generateSharingSession 요청이 들어옴을 알리는 로그
        await this.sessionService.generateSharingSessionStartLogger (requestId, deviceOemId, ownerKeyId);

        // sessionId 랜덤하게 생성 (랜덤 40바이트)
        let sessoinId = await crypto.randomBytes(40).toString('hex');
        Logger.log('[generateSharingSession API] 40Bytes의 Random Session ID 생성 : ' + sessoinId);
        Logger.log('[generateSharingSession API] Owner Device의 device OEM Id를 통하여 root_oem_info_table에서 Owner Device 도메인 주소 가져옴');
        let doemUrlObj = await this.sessionService.selectOEMUrl(deviceOemId); 
        if(!doemUrlObj){
            Logger.error('[redeemSharingSession API] Owner Device OEM ID가 등록되어 있지 않음');
            throw new HttpException('[redeemSharingSession API] Device OEM ID의 유효성을 확인해 주세요.', 444);
        }
        let doemUrl = doemUrlObj.root_oem_url;
        Logger.log('[generateSharingSession API] 데이터베이스의 voem_session_info 테이블에 세션 정보[sessionId, ownerKeyId, doemUrl] 저장');
        Logger.log('[generateSharingSession API] => sessionId : ' + sessoinId);
        Logger.log('[generateSharingSession API] => ownerKeyId: ' + ownerKeyId);
        Logger.log('[generateSharingSession API] => doemUrl   : ' + doemUrl);
        let createSession = await this.sessionService.insertSessionDB(sessoinId, ownerKeyId, doemUrl, new Date(), 30, 'VALID');
        
        if(createSession != '1'){
            new HttpException('Error!', 331);
        } 
        Logger.log('[generateSharingSession API] createSession : ' + createSession); 
        let sharingSession = {
            'sessionID': sessoinId,
            'vehicleOEMUrl' : 'http://localhost:3000'
        };
        Logger.log('[generateSharingSession API] sharingSession : ' + sharingSession); 
        res.set('x-responseId', requestId);  
        res.set('x-vehicle-oemId', 'Genesis'); 
        res.send(sharingSession);  
        Logger.log('[generateSharingSession API] generate Session API 응답 전송 완료');
    } 
 

    @Post('redeemSharingSession')
    @ApiOperation({ summary: 'A friend device can reach out to the Vehicle OEM Server through the friend Device OEM Server to redeem a sharing session created and sent to the friend device by the owner device.' })
    @ApiBody({type:swaggerObj.RedeemSharingSession})
    @HttpCode(200)
    public async redeemSharingSession(
        @Headers('x-requestid') requestId: string, 
        @Headers('x-device-oemid') deviceOemId: string, 
        @Body('sharingSession') sharingSession: string,
        @Body('friendDeviceHandle') friendDeviceHandle: string,
        @Res() res
    ){   
        //redeemSharingSession 요청이 들어옴을 알리는 로그
        await this.sessionService.redeemSharingSessionStartLogger (sharingSession, friendDeviceHandle);

        let sessionObj = JSON.parse(sharingSession);
        let sessionID = sessionObj['sessionID'];  

        // Device OEM Id 정보를 사용하여 Device OEM URL을 획득
        Logger.log('[redeemSharingSession API] Device OEM Id 정보를 사용하여 Device OEM URL을 획득');
        let foemUrlObj = await this.sessionService.selectOEMUrl(deviceOemId);
        if(!foemUrlObj){
            Logger.error('[redeemSharingSession API] Friend Device OEM ID가 등록되어 있지 않음');
            throw new HttpException('Device OEM ID의 유효성을 확인해 주세요.', 444);
        }
        Logger.log('[redeemSharingSession API] Device OEM Url과 friendDeviceHandle 정보를 Session DB에 업데이트 저장'); 
        let doemUrl = foemUrlObj.root_oem_url; 
        Logger.log('[redeemSharingSession API] => doemUrl : ' + doemUrl);
        let selectResult = await this.sessionService.updateFriendDoemUrlDB(sessionID, doemUrl, friendDeviceHandle); 
        let responseHeader = {};
        if(selectResult == '1'){
            responseHeader['statusCode'] = 200;
            Logger.log('[redeemSharingSession API] Update DB is Successed!');
        }else{
            responseHeader['statusCode'] = 445;
            Logger.log('[redeemSharingSession API] Update DB is Failed!');
        }
        res.set('x-responseId', requestId);  
        res.set('x-vehicle-oemId', 'Genesis'); 
        res.send(responseHeader);   
        
        let selectSessionDB = await this.sessionService.selectSessionDB(sessionID); 
        if(!selectSessionDB){
            throw new HttpException('Wowwowowowowwoo !!', 444);
        }
        let OwnerObject   = selectSessionDB[0]; 
        let data = {'keyID':OwnerObject.owner_key_id, 'eventType':'SHARING_INITIATED', 'eventData':sharingSession};
        Logger.log('[redeemSharingSession API] Owner Device Server에 보낼 데이터 : ' +  JSON.stringify(data));
        let http = new HttpService();
        Logger.log(OwnerObject.owner_doem_url + '/session/eventNotification');
        let result = await http.post(OwnerObject.owner_doem_url + '/session/eventNotification', data, 
            { 
                headers: { 
                    'Content-Type'  : 'application/json',
                    'x-requestid'   : '', //requestId,
                    'x-vehicle-oemId': 'Genesis'
                }, 
                method:'POST', 
                data:null 
            }).toPromise()
            .catch( e => { 
                Logger.error('[redeemSharingSession API] 해당 Key ID  로 Vehicle OEM Server에 eventNotification 요청 실패');
                throw new HttpException( e, 555 );
            });
            Logger.log('=============================================================================='); 
            Logger.log('전달한 응답(ResultCode[Success:200]) : ' + result.data.statusCode); 
            Logger.log('==============================================================================');  
    }

    
    @Post('cancelSharingSession')
    @ApiOperation({ summary: '[Optional] owner or friend Device OEM Server to cancel a created sharing session' })
    @ApiBody({type:swaggerObj.CancelSharingSession})
    @HttpCode(200)
    public async cancelSharingSession(
        @Headers('x-requestid') requestId: string, 
        @Body('sharingSession') sharingSession: string, 
        @Res() res
    ){   
        //cancelSharingSession 요청이 들어옴을 알리는 로그.
        await this.sessionService.cancelSharingSessionStartLogger(requestId, sharingSession);

        let sessionObj = JSON.parse(sharingSession);
        let sessionID = sessionObj['sessionID'];  
        let selectResult = await this.sessionService.cancleSessionDB(sessionID);
        let responseHeader = {};
        if(selectResult){
            responseHeader['statusCode'] = 200;
        }else{
            responseHeader['statusCode'] = 445;
        }
        res.set('x-responseId', requestId);  
        res.set('x-vehicle-oemId', 'Genesis'); 
        res.send(responseHeader);  
        Logger.log('=============================================================================='); 
        Logger.log('전달한 응답 : ' + JSON.stringify(responseHeader)); 
        Logger.log('=============================================================================='); 
    }

    @Post('eventNotification')
    @ApiOperation({ summary: 'This is a generic API offered by the Device OEM Server and the Vehicle OEM Server to communicate different events on a Digital Key'})
    @ApiBody({type:swaggerObj.EventNotification})
    @HttpCode(200)
    public async eventNotification(
        @Headers('x-requestid') requestId: string, 
        @Body('KeyId')        ownerKeyId: string,
        @Body('eventType')    eventType: string,
        @Body('eventData')    eventData: object,
        @Res() res
    ){
        //eventNotification 요청이 전송됨을 알리는 로그.
        await this.sessionService.eventNotificationStartLogger(ownerKeyId, eventType, eventData);

        let responseHeader = {};
        if(true){
            responseHeader['statusCode'] = 200;
        }else{
            responseHeader['statusCode'] = 445;
        }
        res.set('x-responseId', requestId);  
        res.set('x-vehicle-oemId', 'Genesis'); 
        res.send(responseHeader);  
        Logger.log('=============================================================================='); 
        Logger.log('전달한 응답 : ' + JSON.stringify(responseHeader)); 
        Logger.log('=============================================================================='); 
        Logger.log('[eventNotification API] Success '); 
    }
    /*
        서버 상태 체크 API
        서버 상태에 이상이 없으면 응답코드 200 리턴
        헤더 필요 없음
        * This is a generic API offered by the Device OEM Server and the Vehicle OEM Server 
        to deter-mine the availability of the corresponding server. 
        This API does not require any headers.
    */
    @Get('healthcheck')
    @ApiOperation({ summary: 'This is a generic API offered by the Device OEM Server and the Vehicle OEM Server to determine the availability of the corresponding server. This API does not require any headers.' })
    @HttpCode(200)
    public async healthCheck(){
        Logger.log('Health Check API 가 호출되었음.');
        Logger.log('호출된 시간 : ' + new Date());
    }

    @Post('keySharingExchange')
    @HttpCode(200)
    @ApiOperation({ summary: ' The owner device sends a keyCreationRequest, keySigningRequest, or importRequest for a friend device to create a shared key' })
    @ApiBody({type:swaggerObj.keySharingExchange})
    async keySharingExchange(
        @Headers('x-requestid')     requestId: string, 
        @Headers('x-device-oemid')  deviceOemId: string, 
        @Body('keyAction')          keyAction: string,
        @Body('keyID')              keyID: string,
        @Body('sharingSession')     sharingSession: string,
        @Body('keyCreationRequest') keyCreationRequest: string,
        @Body('keySigningRequest')   keySigningRequest: string,
        @Body('importRequest')      importRequest: string,
        @Res() res 
    ){
        //keySharingExchange 요청이 들어옴을 알리는 로그
        await this.sessionService.keySharingExchangeStartLogger(requestId, deviceOemId, keyAction, keyID);
 
        // 세션 올바름 체크
        let sessionValidity = await this.sessionService.sessionValidityCheck(JSON.parse(sharingSession).sessionID, new Date());
        if(sessionValidity != true){
            Logger.error('[keySharingExchange API] session이 유효하지 않습니다.');
            throw new HttpException('[keySharingExchange API] session이 유효하지 않습니다.', 441);
        }
        if(keyAction == 'CREATE_SHARED_KEY'){ 
           let x_vehicle_oemId : string = 'Genesis';
           let x_timestamp : string = new Date().getTime().toString();
           Logger.log('[keySharingExchange API] CREATE_SHARED_KEY 요청 들어옴');
           let selectResult = await this.sessionService.createSharedKey(x_vehicle_oemId, x_timestamp, requestId, keyID, JSON.parse(sharingSession), keyCreationRequest);
            if(!selectResult){
                Logger.error('먼가 문제있음');
                throw new HttpException('Error', 444);
            } 
            // 세션이 올바를 경우 Owner Device server에서 createSharedKey와 responseHeader 전달
            await this.sessionService.sendCreateSharedKey(requestId, selectResult, res);

       }else if(keyAction == 'SIGN_SHARED_KEY'){
            Logger.log('[keySharingExchange API] SIGN_SHARED_KEY 요청 들어옴'); 
            let x_vehicle_oemId : string = 'Genesis';
            let x_timestamp : string = new Date().getTime().toString();
            let selectResult = await this.sessionService.signSharedKey(x_vehicle_oemId, x_timestamp, requestId, JSON.parse(sharingSession), keySigningRequest); 
            // Owner Device server에서 signSharedKey와 responseHeader 전달
            await this.sessionService.sendSignSharedKey(requestId, selectResult, res);

       }else if(keyAction == 'IMPORT_SHARED_KEY'){ 
            let x_vehicle_oemId : string = 'Genesis';
            Logger.log('[keySharingExchange API] IMPORT_SHARED_KEY 요청 들어옴');
            let x_timestamp : string = new Date().getTime().toString();
            let selectResult = await this.sessionService.importSharedKey(x_vehicle_oemId, x_timestamp, requestId, keyID, JSON.parse(sharingSession), importRequest); 
            // Owner Device server에서 importSharedKey와 responseHeader 전달
            await this.sessionService.sendImportsharedKey(requestId, selectResult, res);

       }else{

       } 
    } 
    
    @Get('checkKeyValidity')
    async checkValidity(
        @Headers('keyId') keyId: string,
    ){
        let result = await this.sessionService.checkValidity(keyId);
        if(result == 1) {
            return 'valid';
        }else{
            return 'Invalid';
        }
    }
    // @Get('test')
    // async testFunction(){
    //     let http = new HttpService();
    //     let data = {'channel':'#ccc','username':'webhookbot','text':'real test! ccc project [' + new Date() + ']', 'icon_emoji':'ghost'};
    //     let httpResult = await http.post('https://hooks.slack.com/services/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', data, 
    //     {
    //         headers : {
    //             'Content-Type' : 'urlencode'
    //         },
    //         method:'POST', 
	// 		data:null
    //     }).toPromise()
    //     .catch( e => { 
	// 		Logger.error('[createSharedKey API] 2. Vehicle OEM Server에서 createSharedKey API를 Device OEM Server로 호출 실패');
    //         throw new HttpException( e, 555 );
    //     });
    // }
}