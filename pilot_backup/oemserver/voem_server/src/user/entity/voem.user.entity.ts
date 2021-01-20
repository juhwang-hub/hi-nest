import { Entity, Column, PrimaryColumn, Index, CreateDateColumn, Timestamp } from 'typeorm';

@Entity('voem_user_info_table')
export class VoemUserInfo {
    @PrimaryColumn({length : 128, nullable : false})
    voem_user_id : string; // vehicle oem 의 사용자 id
 
    @Column({length : 60, nullable : false})
    email : string;  // email

    @Column({length : 20, nullable : false})
    name : string;  // 이름 여부 

    @Column({length : 20, nullable : false})
    phonenumber : string;  // 휴대폰 번호 

    @Column({length : 64, nullable : false})
    password_salt : string;  // 비밀번호를 위한 쏘올트!

    @Column({length : 100, nullable : false})
    hashed_password : string;  // 해시된 비밀번호 (SHA256) 

    @Column()
    date : Date;  // 가입일

    @Column({length : 10})
    zip_code : string;  // 우편번호

    @Column({length : 100})
    basic_address : string;  // 기본 집주소

    @Column({length : 100})
    detail_address : string;  // 상세 집주소
 
    @Column()
    passwordDate : Date;  // 패스워드 변경일

    @Column({length : 128})
    vehicle_id_1 : string  // 첫 번째 차량 ID
 
    @Column({length : 128})
    vehicle_id_2 : string  // 두 번째 차량 ID

    @Column({length : 128})
    vehicle_id_3 : string  // 세 번째 차량 ID
}