import { HttpModule, Module, HttpService} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdkController } from './adk/adk.controller'; 
import { CryptoService } from './crypto/crypto.service';
import { CredentialService } from './credential/credential.service';
import { CertificateService } from './certificate/certificate.service'; 

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { VoemVerifierInfoModule } from './trackKey/voem.trackKey.module'; 
import { VoemSessionInfoModule } from './sessionAPI/voem.session.module'  

import { VoemManageKeyInfoModule } from './manageKey/voem.manageKey.module'
// @Module({
//   imports: [],
//   controllers: [AppController, AdkController],
//   providers: [AppService, TrackKeyService, CryptoService, CredentialService, CertificateService],
// })
 
// export class AppModule {}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 8800,
      username: 'root',
      password: 'docker',
      database: 'ccc',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
    // ,LogCredentialVerificationModule,
    , HttpModule
    , VoemVerifierInfoModule
    , VoemSessionInfoModule  
    , VoemManageKeyInfoModule
  ],
  controllers: [AppController, AdkController],
  providers: [AppService, CryptoService, CredentialService, CertificateService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
    // let obj = new LogCredentialVerificationModule();
    // let log = obj.getLog();
    
    // connection.manager.save(log)
    // .then(res => {
    //   console.log("===========================================");
    //   console.log("save success!!!!", res.model_name)
    //   console.log("===========================================");
    // }).catch(error => console.log(error))
  }
}