import { VoemVerifierInfoService } from './voem.trackKey.service';
import { CryptoService } from '../crypto/crypto.service';
export declare class VoemVerifierInfoController {
    private readonly vService;
    private readonly vCrypto;
    constructor(vService: VoemVerifierInfoService, vCrypto: CryptoService);
    genVerifier(requestId: string, voemUserId: string, password_str: string, res: any): Promise<void>;
    getVerifier(requestId: string, voemVehicleId: string, req: any, res: any): Promise<void>;
    trackKey(requestId: string, deviceOemId: string, encryptionCertChain: Array<String>, encryptionVersion: string, keyID: string, keyType: string, deviceType: string, accountIDHash: string, keyData: string, res: any): Promise<any>;
}
