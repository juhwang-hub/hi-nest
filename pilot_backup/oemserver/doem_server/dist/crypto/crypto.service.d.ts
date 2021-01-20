/// <reference types="node" />
export declare class CryptoService {
    encrypt(recvPubKey: Buffer, msg: Buffer): Promise<[Buffer, Buffer, Buffer]>;
    decrypt(recvPrivKey: Buffer, recvPubKey: Buffer, senderPubKey: Buffer, encrypted: Buffer): Promise<Buffer>;
    decryptEncData(recvPrivKey: string, recvPubKey: string, senderPubKey: string, PKFingerprint: string, encrypted: string): Promise<string>;
    createEncDataContainer(recvPubKey: string, senderPubKey: string, msg: string): Promise<string>;
    genVerifier(recvPassword: Buffer, recvSalt: Buffer, recv_N: number, recv_r: number, recv_p: number): Promise<string>;
    verifyCert(cert: any, issuerCert: any): Promise<boolean>;
    verifyDerCert(cert: any, issuerCert: any): Promise<boolean>;
    getValidTime(cert: any): Promise<{
        keyValidFrom: string;
        keyValildTo: string;
    }>;
    getDerCertValidTime(cert: any): Promise<{
        keyValidFrom: string;
        keyValildTo: string;
    }>;
    getPubKey(cert: any): Promise<any>;
    getDerCertPubKey(cert: any): Promise<any>;
    doSign(msg: string, privKey: string): Promise<string>;
    doVerify(msg: string, sig: string, pubKey: string): Promise<boolean>;
}
