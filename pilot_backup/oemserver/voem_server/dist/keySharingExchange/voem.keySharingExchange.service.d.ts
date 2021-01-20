export declare class VoemKeySharingExchangeService {
    constructor();
    createSharedKey(keyId: string, sharingSession: object, keyCreationRequest: string): Promise<void>;
    signSharedKey(sharingSession: object, keySigingRequest: string): Promise<void>;
    importSharedKey(keyId: string, sharingSessoin: object, importRequest: string): Promise<void>;
}
