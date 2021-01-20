"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const track_key_service_1 = require("./track-key/track-key.service");
const doem_trackKey_service_1 = require("./trackKey/doem.trackKey.service");
const crypto_service_1 = require("./crypto/crypto.service");
const doem_trackKey_controller_1 = require("./trackKey/doem.trackKey.controller");
const doem_session_controller_1 = require("./sessionAPI/doem.session.controller");
const doem_session_service_1 = require("./sessionAPI/doem.session.service");
const doem_manageKey_controller_1 = require("./manageKey/doem.manageKey.controller");
const doem_menageKey_service_1 = require("./manageKey/doem.menageKey.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule],
        controllers: [doem_manageKey_controller_1.DoemManageKeyController, doem_session_controller_1.DoemSessionController, doem_trackKey_controller_1.DoemTrackKeyController, app_controller_1.AppController],
        providers: [doem_menageKey_service_1.DoemManageKeySrevice, doem_session_service_1.DoemSessionService, doem_trackKey_service_1.DoemTrackKeyService, app_service_1.AppService, track_key_service_1.TrackKeyService, crypto_service_1.CryptoService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map