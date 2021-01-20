import { VoemSessionService } from './voem.session.service';
export declare class VoemSessionController {
    private readonly sessionService;
    constructor(sessionService: VoemSessionService);
    generateSharingSession(requestId: string, deviceOemId: string, ownerKeyId: string, res: any): Promise<void>;
    redeemSharingSession(requestId: string, deviceOemId: string, sharingSession: string, friendDeviceHandle: string, res: any): Promise<void>;
    cancelSharingSession(requestId: string, sharingSession: string, res: any): Promise<void>;
    eventNotification(requestId: string, ownerKeyId: string, eventType: string, eventData: object, res: any): Promise<void>;
    healthCheck(): Promise<void>;
    keySharingExchange(requestId: string, deviceOemId: string, keyAction: string, keyID: string, sharingSession: string, keyCreationRequest: string, keySigningRequest: string, importRequest: string, res: any): Promise<void>;
    checkValidity(keyId: string): Promise<"valid" | "Invalid">;
}
