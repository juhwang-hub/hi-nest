import { Param, Logger, HttpCode, Headers, Res, Controller, Body, Post, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';  
// import { VoemKeySharingExchangeService } from './voem.keySharingExchange.service'

@ApiTags('keySharingExchange')
@Controller('keySharingExchange')
export class VoemKeySharingExchangeController {
    constructor(
        // private readonly vService : VoemKeySharingExchangeService,
    ){}
    @Post('keySharingExchange')
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
        
    }

    // @Get('test')
    // @HttpCode(200)
    // async test(){
    //     let keyId = '1345514325333334354245cbde36';
    //     let sharingSession = {'sessionID':'a709c454e26463b1ef9c0d582efd1c927c4a30700466a8c902bceb9a39aad0a3535d1418e65807d3', 'vehicleOEMUrl':'http://localhost:3000'};
    //     let keyCreationRequest = '';
    //     let result = await this.vService.createSharedKey(keyId, sharingSession, keyCreationRequest);
    //     console.log(result);
    // }
}