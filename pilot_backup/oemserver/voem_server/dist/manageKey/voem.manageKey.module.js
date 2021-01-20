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
exports.VoemRootOEMInfoMudle = exports.VoemManageKeyInfoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const voem_manageKey_controller_1 = require("./voem.manageKey.controller");
const voem_manageKey_service_1 = require("./voem.manageKey.service");
const voem_trackKey_entity_1 = require("../trackKey/entity/voem.trackKey.entity");
let VoemManageKeyInfoModule = class VoemManageKeyInfoModule {
    constructor() {
        this.instance = new voem_trackKey_entity_1.OwnerKeyInfo();
    }
};
VoemManageKeyInfoModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([voem_trackKey_entity_1.RootOEMServerInfo]), typeorm_1.TypeOrmModule.forFeature([voem_trackKey_entity_1.DigitalKeyInfo]), typeorm_1.TypeOrmModule.forFeature([voem_trackKey_entity_1.OwnerKeyInfo]), typeorm_1.TypeOrmModule.forFeature([voem_trackKey_entity_1.RootOEMInfo])],
        controllers: [voem_manageKey_controller_1.VoemManageKeyController],
        providers: [voem_manageKey_service_1.VoemManageKeyService],
    }),
    __metadata("design:paramtypes", [])
], VoemManageKeyInfoModule);
exports.VoemManageKeyInfoModule = VoemManageKeyInfoModule;
class VoemRootOEMInfoMudle {
    constructor() {
        this.instance = new voem_trackKey_entity_1.RootOEMInfo();
    }
}
exports.VoemRootOEMInfoMudle = VoemRootOEMInfoMudle;
//# sourceMappingURL=voem.manageKey.module.js.map