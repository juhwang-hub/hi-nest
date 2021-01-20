import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoemSessionInfo } from './entity/voem.session.entity';
import { DigitalKeyInfo, OwnerKeyInfo, RootOEMInfo, RootOEMServerInfo } from '../trackKey/entity/voem.trackKey.entity'
import { VoemSessionController } from './voem.session.controller';
import { VoemSessionService } from './voem.session.service';
@Module({
    imports : [TypeOrmModule.forFeature([RootOEMServerInfo]), TypeOrmModule.forFeature([VoemSessionInfo]), TypeOrmModule.forFeature([DigitalKeyInfo]), TypeOrmModule.forFeature([RootOEMInfo])],
    controllers: [VoemSessionController],
    providers: [VoemSessionService],
})

export class VoemSessionInfoModule {
    public instance : VoemSessionInfo;
    constructor(){
        this.instance = new VoemSessionInfo(); 
    }
} 

export class VoemOwnerKeyInfoModule {
    public instance : OwnerKeyInfo;
    constructor(){
        this.instance = new OwnerKeyInfo(); 
    }
}