import { Logger, HttpService, HttpException, HttpCode, Headers, Res, Controller, Body, Post, Get } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBody , ApiOperation, ApiProperty, ApiHeader } from '@nestjs/swagger';  
import * as swaggerObj from './entity/doem.session.swagger.object'; 
import { DoemSessionService } from './doem.session.service';
import * as crypto from 'crypto';
import * as node_gcm from 'node-gcm';

@ApiTags('session')
@Controller('session')
export class DoemSessionController {
    constructor(  
        private readonly sessionService: DoemSessionService,
		private http: HttpService, 
	) {}   
    @Post('generateSharingSession')
    @ApiOperation({ summary: ' The owner device initiates a sharing process on the Vehicle OEM Server through the Device OEM Server' })
    // @ApiParam({
    //     name        : 'x-requestid',
    //     type        : 'string',
    //     example     : '550a501552eedde2cd410b94c77bb58a0e8327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    //   })
    @ApiHeader({
        name        : 'x-requestid',  
        description : '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9', 
        example     : '550a501552eedde2cd410b94c77bb58a0e8327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    })
    @ApiHeader({
        name        : 'x-device-oemid',
        description : 'owner_device_oem',
        example     : 'owner_device_oem',
    })
    @ApiBody( {type:swaggerObj.GenerateSharingSession})
    @HttpCode(200)
    async generateSharingSession(
        @Headers('x-requestid') requestId: string,
        @Headers('x-device-oemid') deviceOemId: string,
        @Body('KeyId')    KeyId: string,
        @Res() res
    ){  
        //generateSharingSession 요청이 들어옴을 알리는 로그.
        await this.sessionService.generateSharingSessionStartLogger(requestId, deviceOemId, KeyId);

        let data = {'KeyId' : KeyId};
        let result = await this.http.post('http://localhost:3000/session/generateSharingSession', data, 
        { 
            headers: { 
				'Content-Type'  : 'application/json',
				'x-requestid'   : requestId,
				'x-device-oemid': deviceOemId
			}, 
			method:'POST', 
			data:null 
        }).toPromise()
        .catch( e => { 
			Logger.error('[generateSharingSession API] 2. 해당 Key ID  로 Vehicle OEM Server에 generateSharingSession 요청 실패');
            throw new HttpException( e, 555 );
        } ); 
        res.set('x-responseId', requestId);  
        res.send(result.data);   
        Logger.log('=============================================================================='); 
        Logger.log('[generateSharingSession API] => Vehicle OEM Server에 ' + result.data + ' 정보 전달'); 
        Logger.log('[generateSharingSession API] 2. 해당 Key ID  로 Vehicle OEM Server에 generateSharingSession 요청 성공');
        Logger.log('=============================================================================='); 
    } 

    @Post('redeemSharingSession')
    @ApiOperation({ summary: 'A friend device can reach out to the Vehicle OEM Server through the friend Device OEM Server to redeem a sharing session created and sent to the friend device by the owner device.' })
    @ApiHeader({
        name        : 'x-requestid',  
        description : '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9', 
    }) 
    @ApiBody( {type:swaggerObj.RedeemSharingSession})
    @HttpCode(200)
    public async redeemSharingSession(
        @Headers('x-requestid') requestId: string,  
        @Body('sharingSession') sharingSession: string,
        @Body('friendDeviceHandle') friendDeviceHandle: string,
        @Res() res
    ){
        //redeemSharingSession 요청이 들어옴을 알리는 로그
        await this.sessionService.redeemSharingSessionStartLogger(sharingSession, friendDeviceHandle);

        let data = {'sharingSession':sharingSession, 'friendDeviceHandle':friendDeviceHandle};
        let result = await this.http.post('http://localhost:3000/session/redeemSharingSession', data, 
        { 
            headers: { 
                'Content-Type'  : 'application/json',
                'x-requestid'   : requestId,
                'x-device-oemid': 'friend_device_oem'
            }, 
            method:'POST', 
            data:null 
        }).toPromise()
        .catch( e => { 
            Logger.error('[redeemSharingSession API] 2. 해당 Key ID  로 Device OEM Server에 redeemSharingSession 요청 실패');
            throw new HttpException( e, 555 );
        } ); 
        res.set('x-responseId', requestId);  
        res.send(result.data); 
        Logger.log('=============================================================================='); 
        Logger.log('[generateSharingSession API] => Vehicle OEM Server에 ' + result.data + ' 정보 전달');
        Logger.log('[redeemSharingSession API] 2. 해당 Key ID  로 Device OEM Server에 redeemSharingSession 요청 성공');
        Logger.log('=============================================================================='); 
    }

    

    @Post('cancelSharingSession')
    @ApiOperation({ summary: '[Optional] owner or friend Device OEM Server to cancel a created sharing session' })
    @ApiHeader({
        name        : 'x-requestid',  
        description : '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9', 
    }) 
    @ApiBody( {type:swaggerObj.CancelSharingSession})
    @HttpCode(200)
    public async cancelSharingSession(
        @Headers('x-requestid') requestId: string, 
        @Body('sharingSession') sharingSession: string, 
        @Res() res
    ){  
        Logger.log('==================================================================');
        Logger.log('===     [Device OEM Server] Cancel Sharing Session API 요청됨     ==');
        Logger.log('=================================================================='); 
        let data = {'sharingSession': sharingSession};
        let result = await this.http.post('http://localhost:3000/session/cancelSharingSession', data, 
        { 
            headers: { 
				'Content-Type'  : 'application/json',
				'x-requestid'   : requestId,
				'x-device-oemid': 'LG Service'
			}, 
			method:'POST', 
			data:null 
        }).toPromise()
        .catch( e => { 
			Logger.error('[cancelSharingSession API] 2. 해당 Key ID  로 Vehicle OEM Server에 cancelSharingSession 요청 실패');
            throw new HttpException( e, 555 );
        } ); 
        res.set('x-responseId', requestId);  
        res.send(result.data);
        Logger.log('=============================================================================='); 
        Logger.log('전달한 데이터 : ' + result.data); 
        Logger.log('=============================================================================='); 
    }

    @Post('eventNotification')
    @ApiOperation({ summary: 'This is a generic API offered by the Device OEM Server and the Vehicle OEM Server to communicate different events on a Digital Key'})
    @ApiBody( {type:swaggerObj.EventNotification})
    @HttpCode(200)
    public async eventNotification(
        @Headers('x-requestid') requestId: string, 
        @Headers('x-vehicle-oemId') vehicleOemId: string,
        @Body('keyID')        ownerKeyId: string,
        @Body('eventType')    eventType: string,
        @Body('eventData')    eventData,
        @Res() res
    ){
        //eventNotification 요청이 들어옴을 알리는 로그
        await this.sessionService.eventNotificationStartLogger(requestId, vehicleOemId, ownerKeyId, eventType, eventData);

        let responseHeader = {};
        if(true){
            responseHeader['statusCode'] = 200;
        }else{
            responseHeader['statusCode'] = 445;
        }

        let serverKey = 'AAAACwfFCAs:APA91bHC5MQzHy16DQblnPLe-U6IWz06st9k-HbCQ20MpcUoK3XVSUgQ90fBI9e-6cZOYsOir3JHXXeZdK7B7aRnhgw9fNjgmgmUeRV0Mu4aQ9xK12ft5ec76QVXT4rw_4LW1b17kU9F';
        let regToken  = ['c4iC-v1ZTMKwH8oZGeybVJ:APA91bHcjGv-jgziN4Ip76U54YsWT8169e1ydWuhVOEcAZY2ZXhxlikZdR4VMzfGGUp428tRWcSmy3g5v96NrJPHNJnOU7XNbiXcPzAqGYbCLpCV0kz3L9s0zS9Ja-zno9zBfyrSN9Lu'];


        // 분기처리
        switch(eventType){
            case "CREATE_SHARED_KEY" : {
                let result = await this.sessionService.fcmPushService(
                    serverKey, regToken[0], '[Friend Device] CREATE_SHARED_KEY 요청'
                );
                break;
            }
            case "SIGN_SHARED_KEY" : {
                let result = await this.sessionService.fcmPushService(
                    serverKey, regToken[0], '[Owner Device] SIGN_SHARED_KEY 요청'
                );
                break;
            }
            case "IMPORT_SHARED_KEY" : {
                let result = await this.sessionService.fcmPushService(
                    serverKey, regToken[0], '[Friend Device] IMPORT_SHARED_KEY 요청'
                );
                break;
            }

            case "SHARED_KEY_ADDED" : {
                let result = await this.sessionService.fcmPushService(
                    serverKey, regToken[0], '[Owner Device] 공유 비밀키 생성 완료'
                );
                break;
            } 

            case "SHARING_INITIATED" : {
                let result = await this.sessionService.fcmPushService(
                    serverKey, regToken[0], '[Owner Device] Friend Device와 세션 연동 완료!'
                );
                break;
            }
            case "TERMINATED" : {
                let result = await this.sessionService.fcmPushService(
                    serverKey, regToken[0], '[Friend Device] Key Terminate Request'
                );
                break;
            } 
        }
        res.set('x-responseId', requestId);  
        res.set('x-device-oemId', 'Genesis'); 
        res.send(responseHeader);  
        Logger.log('=============================================================================='); 
        Logger.log('전달한 응답 : ' + JSON.stringify(responseHeader)); 
        Logger.log('==============================================================================');
    }

    @Post('keySharingExchange') 
    @ApiOperation({ summary: '[Optional] owner or friend Device OEM Server to cancel a created sharing session' })
    @ApiHeader({
        name        : 'x-requestid',  
        description : '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9', 
    })
    @ApiBody( {type:swaggerObj.CreateSharedKey}) 
    @HttpCode(200)
    async keySharingExchange(
        @Headers('x-requestid')     requestId: string, 
        @Body('keyAction')          keyAction: string,
        @Body('keyID')              keyID: string,
        @Body('sharingSession')     sharingSession: string,
        @Body('keyCreationRequest') keyCreationRequest: string,
        @Body('keySigingRequest')   keySigingRequest: string,
        @Body('importRequest')      importRequest: string,
        @Res() res 
    ){
       if(keyAction == 'CREATE_SHARED_KEY'){ 
           let voem_id = 'http://localhost:3000';
           let x_timestamp : string = new Date().getTime().toString();
           let requestId : string = await crypto.randomBytes(40).toString('hex'); 
           let deviceOemId : string = 'owner_device_oem';
           let selectResult = await this.sessionService.createSharedKey(keyAction, x_timestamp, voem_id, requestId, deviceOemId, keyID, sharingSession, keyCreationRequest);
           res.set('x-vehicle-oemId', 'Genesis');
           res.set('x-responseId', requestId);
           Logger.log('[keySharingExchange API] Vehicle OEM Server로부터 전달받은 응답 ' + JSON.stringify(selectResult));
           res.send(selectResult);
           
       }else if(keyAction == 'SIGN_SHARED_KEY'){ 
            let voem_id = 'http://localhost:3000';
            let x_timestamp : string = new Date().getTime().toString();
            let requestId : string = await crypto.randomBytes(40).toString('hex');
            let deviceOemId : string = 'owner_device_oem';
            let selectResult = await this.sessionService.signSharedKey(keyAction, x_timestamp, voem_id, requestId, deviceOemId, sharingSession, keyCreationRequest);
            res.set('x-vehicle-oemId', 'Genesis');
            res.set('x-responseId', requestId);
            Logger.log('[keySharingExchange API] Vehicle OEM Server로부터 전달받은 응답 ' + JSON.stringify(selectResult));
            res.send(selectResult);

       }else if(keyAction == 'IMPORT_SHARED_KEY'){
            let voem_id = 'http://localhost:3000';
            let x_timestamp : string = new Date().getTime().toString();
            let requestId : string = await crypto.randomBytes(40).toString('hex');
            let deviceOemId : string = 'owner_device_oem';
            let selectResult = await this.sessionService.importSharedKey(keyAction, x_timestamp, voem_id, requestId, deviceOemId, keyID, sharingSession, keyCreationRequest);
            res.set('x-vehicle-oemId', 'Genesis');
            res.set('x-responseId', requestId);
            Logger.log('[keySharingExchange API] Vehicle OEM Server로부터 전달받은 응답 ' + JSON.stringify(selectResult));
            res.send(selectResult);
       }else{
            throw new HttpException('', 412);
       } 
    }

    @Get('invite')
    @HttpCode(200)
    async testGCM(){
        let serverKey = 'AAAACwfFCAs:APA91bHC5MQzHy16DQblnPLe-U6IWz06st9k-HbCQ20MpcUoK3XVSUgQ90fBI9e-6cZOYsOir3JHXXeZdK7B7aRnhgw9fNjgmgmUeRV0Mu4aQ9xK12ft5ec76QVXT4rw_4LW1b17kU9F';
        let regToken  = ['c4iC-v1ZTMKwH8oZGeybVJ:APA91bHcjGv-jgziN4Ip76U54YsWT8169e1ydWuhVOEcAZY2ZXhxlikZdR4VMzfGGUp428tRWcSmy3g5v96NrJPHNJnOU7XNbiXcPzAqGYbCLpCV0kz3L9s0zS9Ja-zno9zBfyrSN9Lu'];
        let result = await this.sessionService.fcmPushService(
            serverKey, regToken[0], '[Key Sharing Invitation] https://autocrypt.io/v1/ccc/hVOEcAZY2ZXhxlikZdR4VMzfG/jgmgmUeRV0'
        );
        return result;
    }
}