import { HttpCode, Headers, Res, HttpException, Param, Controller, Body, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'; 

@ApiTags('user')
@Controller('user')
export class VoemUserController {
    constructor(){}

    
    @Post('/login')
    async userLogin(
        @Headers('x-requestid') requestId: string, 
        @Body('voemUserId')     voemUserId: string,
        @Body('voemUserPwd')    voemUserPwd: string,
		@Res() res
    ){
            
    }
}