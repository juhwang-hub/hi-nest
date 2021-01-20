import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { VoemManageKeyController } from './voem.manageKey.controller'
import { VoemManageKeyService } from './voem.manageKey.service'
import { DigitalKeyInfo ,OwnerKeyInfo, RootOEMInfo, RootOEMServerInfo } from '../trackKey/entity/voem.trackKey.entity'

@Module({
    imports : [TypeOrmModule.forFeature([RootOEMServerInfo]), TypeOrmModule.forFeature([DigitalKeyInfo]), TypeOrmModule.forFeature([OwnerKeyInfo]), TypeOrmModule.forFeature([RootOEMInfo])],
    controllers: [VoemManageKeyController],
    providers  : [VoemManageKeyService],
})

export class VoemManageKeyInfoModule {
    public instance : OwnerKeyInfo;
    constructor(){
        this.instance = new OwnerKeyInfo();
    }
}

export class VoemRootOEMInfoMudle {
    public instance : RootOEMInfo;
    constructor(){
        this.instance = new RootOEMInfo();
    }
}