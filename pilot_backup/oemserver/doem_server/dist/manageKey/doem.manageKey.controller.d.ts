import { DoemManageKeySrevice } from './doem.menageKey.service';
export declare class DoemManageKeyController {
    private readonly manageKeyService;
    constructor(manageKeyService: DoemManageKeySrevice);
    manageKey(requestId: string, vehicleOemId: string, x_timestamp: string, keyID: string, action: string, terminationAttestation: string, deviceRemoteTerminationRequest: string, serverRemoteTerminationRequest: string, vehicleOEMProprietaryData: string, res: any): Promise<void>;
}
