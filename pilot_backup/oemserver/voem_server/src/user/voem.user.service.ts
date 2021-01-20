import { Injectable, Logger, HttpException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoemUserInfo } from './entity/voem.user.entity'
import { Repository, getConnection, Connection } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class VoemUserInfoService {
    constructor(
        @InjectRepository(VoemUserInfo)
        private readonly userRepository : Repository<VoemUserInfo>,
    ){}
    

    async checkIdRedundancy(userId : string){

    }

    async checkEmail(email : string){
        
    }


    async createUserInfo(
        voem_user_id    : string,  // vehicle oem 의 사용자 id
        email           : string,  // email
        phonenumber     : string,  // 휴대폰 번호
        password_salt   : string,  // 패스워드 쏘올트
        hashed_password : string,  // 해쉬된 패스워드 (SHA256)
        // date : Date
        zip_code        : string,  // Zip 코드
        basic_address   : string,  // 기본 집주소
        detail_address  : string,  // 상세 집주소
        passwordDate    : Date,    // 패스워드 변경일
        vehicle_id_1    : string,  // 첫 번째 차량 ID
        vehicle_id_2    : string,  // 두 번째 차량 ID
        vehicle_id_3    : string,  // 세 번째 차량 ID
    ){
        
    }




    async checkUserValidity(userId : string, userPwd : string){ 
        let result = await this.userRepository
                    .createQueryBuilder()
                    .select(['t.password_salt, t.hashed_password'])
                    .from(VoemUserInfo, 't')
                    .where('t.voem_user_id', {id:userId})
                    .getMany()
        
        if(!result){
            // 해당 id는 없는 아이뒤
        }
        let passwdSalt = '';
        let hashed_password = '';
        let calculatedPwd = crypto.createHash('sha256').update(passwdSalt + userPwd).digest('base64');
        if(calculatedPwd == hashed_password){
            // 패스워드 일치
        }else{
            // 패스워드 불일치
        }
    }
}