import { VoemVerifierInfo, RootOEMInfo, VoemVehicleInfo, OwnerKeyInfo } from './entity/voem.trackKey.entity';
export declare class VoemVerifierInfoModule {
    instance: VoemVerifierInfo;
    constructor();
    checkExistance(): string;
}
export declare class RootOEMInfoMudule {
    instance: RootOEMInfo;
    constructor();
}
export declare class VoemVehicleInfoModule {
    instance: VoemVehicleInfo;
    constructor();
}
export declare class OwnerKeyInfoModule {
    instance: OwnerKeyInfo;
    constructor();
}
