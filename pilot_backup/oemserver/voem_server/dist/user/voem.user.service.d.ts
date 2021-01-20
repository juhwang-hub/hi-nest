import { VoemUserInfo } from './entity/voem.user.entity';
import { Repository } from 'typeorm';
export declare class VoemUserInfoService {
    private readonly userRepository;
    constructor(userRepository: Repository<VoemUserInfo>);
    checkIdRedundancy(userId: string): Promise<void>;
    checkEmail(email: string): Promise<void>;
    createUserInfo(voem_user_id: string, email: string, phonenumber: string, password_salt: string, hashed_password: string, zip_code: string, basic_address: string, detail_address: string, passwordDate: Date, vehicle_id_1: string, vehicle_id_2: string, vehicle_id_3: string): Promise<void>;
    checkUserValidity(userId: string, userPwd: string): Promise<void>;
}
