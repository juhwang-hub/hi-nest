import { HttpCode, Headers, Res, Controller, Body, Post } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBody , ApiOperation, ApiProperty, ApiHeader } from '@nestjs/swagger'; 
import { DoemTrackKeyService } from './doem.trackKey.service'; 
import * as swaggerObj from './entity/doem.trackKey.swagger.object';

@ApiTags('trackKey')
@Controller('trackKey')
export class DoemTrackKeyController {
    constructor(  
		private doemTrackKeyService : DoemTrackKeyService
	) {}   
	 
	@Post('trackKey')
	@ApiOperation({ summary: 'This is a generic API offered by the Vehicle OEM Server to track a Digital Key. <br> If trackKey is called for a keyID that is already registered, the API call shall be successful and return with a usual response. ' })
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
	@ApiBody( {type:swaggerObj.TrackKeyWithSwagger})
	@HttpCode(200)
	async trackKey(
		@Headers('x-requestid') requestId: string,
		@Headers('x-device-oemid') deviceOemId: string, 
		@Body('encryptionCertChain') encryptionCertChain: Array<String>,
		@Body('encryptionVersion') encryptionVersion: string,
		@Body('keyID') keyID: string,
		@Body('keyType') keyType: string,
		@Body('deviceType') deviceType: string,
		@Body('accountIDHash') accountIDHash: string,
		@Body('keyData') keyData: string,
		@Res() res
		) 
	{	 
		/*
			TrackKey Start Logger (Debug용)
		*/
		await this.doemTrackKeyService.trackKeyStartLogger(requestId, deviceOemId, encryptionCertChain, encryptionVersion, keyID, keyType, deviceType, accountIDHash, keyData); 
		
		/*
			1. 전달받은 파라미터 정합성 판정 로직
		*/		
		await this.doemTrackKeyService.checkParamsValidity(requestId, deviceOemId, encryptionCertChain, encryptionVersion, keyID, keyType, deviceType, accountIDHash);
		 
	 
		/*
			2. 단말에서 들어온 요청을 바로 VOEM Server로 바이패스 해주는 로직   
		*/
		let result =  await this.doemTrackKeyService.trackKeyHttpRequest(
			'http://localhost:3000/trackKey/trackKey', 
			requestId, 
			deviceOemId, 
			encryptionCertChain, 
			encryptionVersion, 
			keyID, 
			keyType, 
			deviceType, 
			accountIDHash, 
			keyData);
		let resultStr = result.data; 

		/* 
			TrackKey Second Logger (Debug용)
		*/
		await this.doemTrackKeyService.trackKeySecondLogger(resultStr);

		/* 
			3. Vehicle OEM Server 로부터 전달받은 응답을 Device에 전달하는 로직
		*/
		res.set('x-responseId', requestId);  
		res.send(resultStr); 

		/*
			TrackKey Finall Logger (Debug용)
		*/
		await this.doemTrackKeyService.trackKeyFinalLogger(keyID, resultStr);
	} 
}  