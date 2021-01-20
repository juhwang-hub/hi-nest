import { HttpService } from '@nestjs/common';
import { DoemSessionService } from './doem.session.service';
export declare class DoemSessionController {
    private readonly sessionService;
    private http;
    constructor(sessionService: DoemSessionService, http: HttpService);
    generateSharingSession(requestId: string, deviceOemId: string, KeyId: string, res: any): Promise<void>;
    redeemSharingSession(requestId: string, sharingSession: string, friendDeviceHandle: string, res: any): Promise<void>;
    cancelSharingSession(requestId: string, sharingSession: string, res: any): Promise<void>;
    eventNotification(requestId: string, vehicleOemId: string, ownerKeyId: string, eventType: string, eventData: any, res: any): Promise<void>;
    keySharingExchange(requestId: string, keyAction: string, keyID: string, sharingSession: string, keyCreationRequest: string, keySigingRequest: string, importRequest: string, res: any): Promise<void>;
    testGCM(): Promise<void>;
}
