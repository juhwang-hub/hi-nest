import { Repository } from 'typeorm';
import { DigitalKeyInfo, RootOEMInfo, RootOEMServerInfo } from '../trackKey/entity/voem.trackKey.entity';
export declare class VoemManageKeyService {
    private readonly voemDKInfoRepository;
    private readonly voemRootOemInfoRepository;
    private readonly voemDigitalKeyInfoRepository;
    private readonly voemRootOEMServerInfoRepository;
    constructor(voemDKInfoRepository: Repository<DigitalKeyInfo>, voemRootOemInfoRepository: Repository<RootOEMInfo>, voemDigitalKeyInfoRepository: Repository<DigitalKeyInfo>, voemRootOEMServerInfoRepository: Repository<RootOEMServerInfo>);
    getOwnerKeyInfoFromFriendKeyId(): Promise<void>;
    V2FKeyTerminatedStartLogger(requestId: string, ownerKeyId: string, friendKeyId: string, status: number): Promise<void>;
    managekeyStartLogger(requestId: string, deviceOemId: string, keyId: string, action: string): Promise<void>;
    getDKUrlInfo(keyId: string): Promise<string>;
    getKeyStatus(keyId: string): Promise<number>;
    updateKeyStatus(keyId: string, key_status: number): Promise<any>;
    vehicleKeyTerminated(keyId: string, key_status: number): Promise<{}>;
    manageKeyToDoemServer(keyId: string, action: string, terminationAttestation: string, deviceRemoteTerminationRequest: object, serverRemoteTerminationRequest: string, vehicleOEMProprietaryData: string, vehicleOemId: string, deviceOEMUrl: string): Promise<any>;
    manageKey(requestId: string, vehicleOemId: string, keyId: string, eventType: string, eventData: any): Promise<any>;
    terminateKey(keyId: string): Promise<void>;
}
