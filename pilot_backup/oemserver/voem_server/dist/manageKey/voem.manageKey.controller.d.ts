import { VoemManageKeyService } from './voem.manageKey.service';
export declare class VoemManageKeyController {
    private readonly manageKeyService;
    constructor(manageKeyService: VoemManageKeyService);
    V2FKeyTerminated(requestId: string, ownerKeyId: string, friendKeyId: string, status: number, res: any): Promise<void>;
    manageKey(requestId: string, deviceOemId: string, keyId: string, action: string, terminationAttestation: string, deviceRemoteTerminationRequest: object, serverRemoteTerminationRequest: string, vehicleOEMProprietaryData: string, res: any): Promise<any>;
}
