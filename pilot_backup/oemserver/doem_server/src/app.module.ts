import { HttpService, Module, HttpModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdkController } from './adk/adk.controller'; 
import { TrackKeyService } from './track-key/track-key.service';
import { DoemTrackKeyService } from './trackKey/doem.trackKey.service'
import { CryptoService } from './crypto/crypto.service';
import { CredentialService } from './credential/credential.service';
import { CertificateService } from './certificate/certificate.service';    
import { DoemTrackKeyController } from './trackKey/doem.trackKey.controller';
import { DoemSessionController } from './sessionAPI/doem.session.controller';  
import { DoemSessionService } from './sessionAPI/doem.session.service'
import { DoemManageKeyController } from './manageKey/doem.manageKey.controller'
import { DoemManageKeySrevice } from './manageKey/doem.menageKey.service'
@Module({
  imports: [HttpModule],
  controllers: [DoemManageKeyController, DoemSessionController, DoemTrackKeyController, AppController],
  providers: [DoemManageKeySrevice, DoemSessionService, DoemTrackKeyService, AppService, TrackKeyService, CryptoService],
})
  
export class AppModule {}