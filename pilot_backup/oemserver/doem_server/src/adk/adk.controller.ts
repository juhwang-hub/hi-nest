import { Controller, Post, Get, Body, Headers, HttpCode, HttpException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'; 
import * as fs from 'fs'; 
import { CryptoService } from '../crypto/crypto.service';
import {Header} from "@nestjs/common";
import {Res} from "@nestjs/common";
// import { AdkService }  from './adk.service';
// import { VoemVerifierInfo } from './entity/voem_verifier_info.entity';
import { Repository } from 'typeorm';

@ApiTags('adk')
@Controller('adk')
export class AdkController {  
	// constructor(private readonly adkService: AdkService) {}

	@Post('generateVerifier') 
	@HttpCode(200)   
	async genVerifier(
		@Headers('x-requestid') requestId: string,
		@Body('x-voem-UserId') voemUserId: string, 
		@Res() res
	)
	{
		if(!requestId) {
			throw new HttpException( 'no x-requestId Parameter', 500);
		}
		if(!voemUserId) {
			throw new HttpException( 'no voemUserId', 500);
		}
		 
		// if(fs.existsSync(voemUserId + '.txt')){
		// 	throw new HttpException( 'Verifier is already extists', 488);
		// }     
				  
		// let checkList = await this.service.checkVerifier('testid5');
		// 	console.log(checkList);
			 
			   
			let password_str = 'pleaseletmein';
			let salt_str 	 = 'yellowsubmarines'; 
			res.set('x-responseId', requestId);
			res.send(password_str);
		return password_str;
	}
	@Post('trackKey')
	@HttpCode(200)
	trackKey(
		@Headers('x-requestid') requestId: string,
		@Headers('x-device-oemid') deviceOemId: string,
		@Body('encryptionCertChain') encryptionCertChain: string,
		@Body('encryptionVersion') encryptionVersion: string,
		@Body('keyID') keyID: string,
		@Body('keyType') keyType: string,
		@Body('deviceType') deviceType: string,
		@Body('accountIDHash') accountIDHash: string,
		@Body('keyData') keyData: string
		) : string 
	{
		if(!requestId) {
			throw new HttpException( 'no x-requestId Parameter', 500);
		}
		if(!deviceOemId) {
			throw new HttpException( 'no x-device-oemId Parameter', 500);
		}
		if(!encryptionCertChain) {
			throw new HttpException( 'no encryptionCertChain Parameter', 500);
		}
		if(!encryptionVersion) {
			throw new HttpException( 'no encryptionVersion Parameter', 500);
		}
		if(!keyID) {
			throw new HttpException( 'no keyID Parameter', 500);
		}
		if(!keyType) {
			throw new HttpException( 'no keyType Parameter', 500);
		}
		if(!deviceType) {
			throw new HttpException( 'no deviceType Parameter', 500);
		}
		if(!accountIDHash) {
			throw new HttpException( 'no accountIDHash Parameter', 500);
		}
		// Since Key Data is optional
		if(!keyData) {
			throw new HttpException( 'no keyData Parameter', 500);
		}
		return 'trackKey';
	} 

	@Post('manageKey')
	manageKey(): string {
		return 'manageKey';
	}
	@Post('generateSharingSession')
	generateSharingSession(): string {
		return 'generateSharingSession';
	}
	@Post('redeemSharingSession')
	redeemSharingSession(): string {
		return 'redeemSharingSession';
	}
	@Post('cancelSharingSession')
	cancelSharingSession(): string {
		return 'cancelSharingSession';
	}
	@Post('createSharedKey')
	createSharedKey(): string {
		return 'createSharedKey';
	}
	@Post('signSharedKey')
	signSharedKey(): string {
		return 'signSharedKey';
	}
	@Post('importSharedKey')
	importSharedKey(): string {
		return 'importSharedKey';
	}
	@Post('eventNotification')
	eventNotification(): string {
		return 'eventNotification';
	}
	@Get('Healthcheck')
	Healthcheck(): string {
		return 'Healthcheck';
	}
	@Post('importImmobilizerToken')
	importImmobilizerToken(): string {
		return 'importImmobilizerToken';
	}
}
