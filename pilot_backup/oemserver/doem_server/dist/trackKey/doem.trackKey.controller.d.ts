import { DoemTrackKeyService } from './doem.trackKey.service';
export declare class DoemTrackKeyController {
    private doemTrackKeyService;
    constructor(doemTrackKeyService: DoemTrackKeyService);
    trackKey(requestId: string, deviceOemId: string, encryptionCertChain: Array<String>, encryptionVersion: string, keyID: string, keyType: string, deviceType: string, accountIDHash: string, keyData: string, res: any): Promise<void>;
}
