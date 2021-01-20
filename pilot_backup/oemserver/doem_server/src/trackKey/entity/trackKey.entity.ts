import { Entity, Column, PrimaryColumn, Index, CreateDateColumn, Timestamp } from 'typeorm';


// @Entity('voem_user_info_table')
// export class VoemUserInfo {
//     @PrimaryColumn({length : 128, nullable : false})
//     voem_user_id : string; // vehicle oem 의 사용자 id

//     @Column({length : 60, nullable : false})
//     email : string;  // email

//     @Column({length : 20, nullable : false})
//     name : string;  // 이름 여부 

//     @Column({length : 20, nullable : false})
//     phonenumber : string;  // 휴대폰 번호 

//     @Column({length : 64, nullable : false})
//     password_salt : string;  // 비밀번호를 위한 쏘올트!

//     @Column({length : 100, nullable : false})
//     hashed_password : string;  // 해시된 비밀번호 (SHA256) 

//     @Column()
//     date : Date;  // 가입일

//     @Column({length : 10})
//     zip_code : string;  // 우편번호

//     @Column({length : 100})
//     basic_address : string;  // 기본 집주소

//     @Column({length : 100})
//     detail_address : string;  // 상세 집주소
 
//     @Column()
//     passwordDate : Date;  // 패스워드 변경일

//     @Column({length : 128})
//     vehicle_id_1 : string  // 첫 번째 차량 ID
 
//     @Column({length : 128})
//     vehicle_id_2 : string  // 두 번째 차량 ID

//     @Column({length : 128})
//     vehicle_id_3 : string  // 세 번째 차량 ID
// }

// @Entity('voem_verifier_info_table') 
// export class VoemVerifierInfo {
//     @PrimaryColumn({length : 128, nullable : false})
//     voem_user_id : string; // vehicle oem 의 사용자 id

//     @Column({length : 10, nullable : false})
//     exist_verifier : string;  // verifier 존재 여부

//     @Column({length : 128, nullable : false})
//     first_verifier : string;  // w0

//     @Column({length : 130, nullable : false})
//     second_verifier : string; // L

//     @Column({length : 32, nullable : false})
//     salt : string;  // 솔트

//     @Column({length : 128})
//     password : string // 비밀번호, 암호화 안된상태 (우선 Pilot에서만 저장)
// }

// ////// 
// @Entity('root_oem_info_table')
// export class RootOEMInfo {
//     @PrimaryColumn({length : 128, nullable : false})
//     root_oem_id : string;    // Root OEM Id
    
//     @Column({length : 2048, nullable : false})
//     root_oem_cert : string;  // Root OEM 인증서
// }
 

// @Entity('voem_vehicle_info_table')
// export class VoemVehicleInfo {
//     @PrimaryColumn({length : 128, nullable : false})
//     vehicle_id : string   // vehicle id
    
//     @Column({length : 130, nullable : false})
//     vehicle_pk : string   // vehicle sign pk

//     @Column({length : 130, nullable : false})
//     vehicle_enc_pk : string    // vehicle enc pk

//     @Column({length : 2048, nullable : false})
//     vehicle_sig_cert : string  // vehicle sign certification

//     @Column({length : 2048, nullable : false})
//     vehicle_enc_cert : string  // vehicle enc certification

//     @Column({length : 32, nullable : false})
//     vehicle_brand : string // vehicle brand

//     @Column({length : 32, nullable : false})
//     vehicle_model : string // vehicle model
// }

// @Entity('owner_key_info_table')
// export class OwnerKeyInfo {
//     @PrimaryColumn({length : 128, nullable : false})
//     key_id : string // key id

//     @Column({length : 128, nullable : false})
//     vehicle_id : string

//     @Column({length : 130, nullable : false})
//     digital_key_PK : string

//     @Column({length : 32, nullable : false})
//     key_type : string

//     @Column({length : 32, nullable : false})
//     device_type : string

//     @Column({length : 120, nullable : false})
//     accountIdHash : string

//     @Column({length : 2048, nullable : false})
//     ICA_Cert : string

//     @Column({length : 2048, nullable : false})
//     DK_Cert : string

//     @Column({length : 130, nullable : false})
//     device_enc_PK : string

//     @Column({length : 32, nullable : false})
//     device_enc_PK_version : string

//     @Column({length : 64, nullable : false})
//     key_Valid_From : string

//     @Column({length : 64, nullable : false})
//     key_Valid_To : string

//     @Column({length : 32, nullable : false})
//     shared_keys : string

//     @Column({length : 32, nullable : false})
//     sharable_keys : string

//     @Column({length : 32, nullable : false})
//     sharing_password_required : string
// }