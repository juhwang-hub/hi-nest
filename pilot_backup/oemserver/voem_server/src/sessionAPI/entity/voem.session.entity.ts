import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('voem_session_info')
export class VoemSessionInfo {
    @PrimaryColumn()
    session_id : string;   // Session ID
 
    @Column()
    owner_key_id : string; // Owner Key ID

    @Column()
    owner_doem_url : string // Friend Doem Url

    @Column()
    friend_doem_url : string // Friend Doem Url

    @Column()
    friend_device_handle : string // FriendDeviceHandle

    @CreateDateColumn()
    session_creation_date : Date  // session_creation_date

    @Column()
    session_period_minutes : number // session 주기

    @Column()
    session_status : string // session 상태 
}