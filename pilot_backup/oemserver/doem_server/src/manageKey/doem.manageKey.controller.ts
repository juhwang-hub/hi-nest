import { HttpCode, Headers, Res, Controller, Body, Post, Logger } from '@nestjs/common';
import { DoemManageKeySrevice } from './doem.menageKey.service';
import { ApiTags, ApiParam, ApiHeader, ApiBody , ApiOperation, ApiProperty } from '@nestjs/swagger';  
import * as swaggerObj from './entity/doem.manageKey.swagger.object';

@ApiTags('manageKey')
@Controller('manageKey')
export class DoemManageKeyController{
    constructor(
        private readonly manageKeyService : DoemManageKeySrevice,
    ){}

    @Post('manageKey')
    @ApiHeader({
        name        : 'x-requestid',  
        description : '327482bbba6c5996750e17da3cb3337c09d2230f6c3d9', 
        example     : '550a501552eedde2cd410b94c77bb58a0e8327482bbba6c5996750e17da3cb3337c09d2230f6c3d9',
    })
    @ApiHeader({
        name        : 'x-vehicle-oemId',
        description : 'Genesis',
    })
    @HttpCode(200)
    async manageKey(
        @Headers('x-requestid')                 requestId: string,
        @Headers('x-vehicle-oemId')             vehicleOemId: string,
        @Headers('x-timestamp')                 x_timestamp: string,
        @Body('keyID')                          keyID: string,
        @Body('action')                         action: string,
        @Body('terminationAttestation')         terminationAttestation: string,
        @Body('deviceRemoteTerminationRequest') deviceRemoteTerminationRequest: string,
        @Body('serverRemoteTerminationRequest') serverRemoteTerminationRequest: string,
        @Body('vehicleOEMProprietaryData')      vehicleOEMProprietaryData: string,
        @Res() res
    )
    {   
        //manageKey 요청이 들어옴을 알리는 로그
        await this.manageKeyService.manageKeyStartLogger(keyID, vehicleOemId, x_timestamp, action);

        let responseHeader = {'statusCode':'200'};
        let serverKey = 'AAAACwfFCAs:APA91bHC5MQzHy16DQblnPLe-U6IWz06st9k-HbCQ20MpcUoK3XVSUgQ90fBI9e-6cZOYsOir3JHXXeZdK7B7aRnhgw9fNjgmgmUeRV0Mu4aQ9xK12ft5ec76QVXT4rw_4LW1b17kU9F';
        let regToken  = ['c4iC-v1ZTMKwH8oZGeybVJ:APA91bHcjGv-jgziN4Ip76U54YsWT8169e1ydWuhVOEcAZY2ZXhxlikZdR4VMzfGGUp428tRWcSmy3g5v96NrJPHNJnOU7XNbiXcPzAqGYbCLpCV0kz3L9s0zS9Ja-zno9zBfyrSN9Lu'];
        let pushData  = 'Owner 에 의해 키 종료 요청이 도착했습니다.';
        res.set('x-device-oemid', 'friend_device_oem');
        res.set('x-responseId', requestId);
        res.send(responseHeader); 
        Logger.log('=============================================================================='); 
        Logger.log('Device에 Key 삭제 관련 데이터 전송 : '); 
        let fcmPushService = await this.manageKeyService.fcmPushService(serverKey, regToken[0], pushData);
        Logger.log('==============================================================================');  
         
        return fcmPushService;
    }
}