export declare class GenerateSharingSession {
    KeyId: '';
}
export declare class RedeemSharingSession {
    sharingSession: '';
    friendDeviceHandle: '';
}
export declare class CancelSharingSession {
    sharingSession: '';
}
export declare class EventNotification {
    KeyId: '';
    eventType: '';
    eventData: '';
}
export declare class CreateSharedKey {
    keyAction: any;
    keyID: any;
    sharingSession: '';
    keyCreationRequest: any;
    keySigingRequest: any;
    importRequest: any;
}
