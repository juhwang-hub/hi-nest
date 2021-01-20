export declare class AdkController {
    genVerifier(requestId: string, voemUserId: string, res: any): Promise<string>;
    trackKey(requestId: string, deviceOemId: string, encryptionCertChain: string, encryptionVersion: string, keyID: string, keyType: string, deviceType: string, accountIDHash: string, keyData: string): string;
    manageKey(): string;
    generateSharingSession(): string;
    redeemSharingSession(): string;
    cancelSharingSession(): string;
    createSharedKey(): string;
    signSharedKey(): string;
    importSharedKey(): string;
    eventNotification(): string;
    Healthcheck(): string;
    importImmobilizerToken(): string;
}
