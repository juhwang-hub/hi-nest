"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const adk_controller_1 = require("./adk/adk.controller");
const crypto_service_1 = require("./crypto/crypto.service");
const credential_service_1 = require("./credential/credential.service");
const certificate_service_1 = require("./certificate/certificate.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const voem_trackKey_module_1 = require("./trackKey/voem.trackKey.module");
const voem_session_module_1 = require("./sessionAPI/voem.session.module");
const voem_manageKey_module_1 = require("./manageKey/voem.manageKey.module");
let AppModule = class AppModule {
    constructor(connection) {
        this.connection = connection;
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: '127.0.0.1',
                port: 8800,
                username: 'root',
                password: 'docker',
                database: 'ccc',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            common_1.HttpModule,
            voem_trackKey_module_1.VoemVerifierInfoModule,
            voem_session_module_1.VoemSessionInfoModule,
            voem_manageKey_module_1.VoemManageKeyInfoModule
        ],
        controllers: [app_controller_1.AppController, adk_controller_1.AdkController],
        providers: [app_service_1.AppService, crypto_service_1.CryptoService, credential_service_1.CredentialService, certificate_service_1.CertificateService],
    }),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map