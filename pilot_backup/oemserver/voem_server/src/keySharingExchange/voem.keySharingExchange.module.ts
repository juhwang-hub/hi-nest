import { Module } from '@nestjs/common';
import { VoemKeySharingExchangeController } from './voem.keySharingExchange.controller'
import { VoemKeySharingExchangeService } from './voem.keySharingExchange.service'
import { VoemSessionService } from '../sessionAPI/voem.session.service' 
@Module({
    controllers: [VoemKeySharingExchangeController],
    providers: [VoemSessionService, VoemKeySharingExchangeService],
})

export class VoemKeySharingExchangeModule {
    constructor(){}
}