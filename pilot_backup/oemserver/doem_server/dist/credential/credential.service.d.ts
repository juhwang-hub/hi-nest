/// <reference types="node" />
declare type KeyId = Buffer;
export declare class CredentialService {
    private keyStorage;
    private ecdhCtx;
    generateKeyPair(): KeyId;
    getPublicKey(keyId: KeyId): Buffer;
    getPrivateKey(keyId: KeyId): Buffer;
}
export {};
