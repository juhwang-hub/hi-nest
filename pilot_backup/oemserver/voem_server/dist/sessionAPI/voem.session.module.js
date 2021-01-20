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
exports.VoemOwnerKeyInfoModule = exports.VoemSessionInfoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const voem_session_entity_1 = require("./entity/voem.session.entity");
const voem_trackKey_entity_1 = require("../trackKey/entity/voem.trackKey.entity");
const voem_session_controller_1 = require("./voem.session.controller");
const voem_session_service_1 = require("./voem.session.service");
let VoemSessionInfoModule = class VoemSessionInfoModule {
    constructor() {
        this.instance = new voem_session_entity_1.VoemSessionInfo();
    }
};
VoemSessionInfoModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([voem_trackKey_entity_1.RootOEMServerInfo]), typeorm_1.TypeOrmModule.forFeature([voem_session_entity_1.VoemSessionInfo]), typeorm_1.TypeOrmModule.forFeature([voem_trackKey_entity_1.DigitalKeyInfo]), typeorm_1.TypeOrmModule.forFeature([voem_trackKey_entity_1.RootOEMInfo])],
        controllers: [voem_session_controller_1.VoemSessionController],
        providers: [voem_session_service_1.VoemSessionService],
    }),
    __metadata("design:paramtypes", [])
], VoemSessionInfoModule);
exports.VoemSessionInfoModule = VoemSessionInfoModule;
class VoemOwnerKeyInfoModule {
    constructor() {
        this.instance = new voem_trackKey_entity_1.OwnerKeyInfo();
    }
}
exports.VoemOwnerKeyInfoModule = VoemOwnerKeyInfoModule;
//# sourceMappingURL=voem.session.module.js.map