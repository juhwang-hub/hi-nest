export declare class DoemSessionService {
    constructor();
    generateSharingSessionStartLogger(requestId: string, deviceOemId: string, KeyId: string): Promise<void>;
    redeemSharingSessionStartLogger(sharingSession: string, friendDeviceHandle: string): Promise<void>;
    eventNotificationStartLogger(requestId: string, vehicleOemId: string, ownerKeyId: string, eventType: string, eventData: any): Promise<void>;
    createSharedKey(keyAction: string, x_timestamp: string, voemDomain: string, requestId: string, deviceOemId: string, keyID: string, sharingSession: string, keyCreationRequest: string): Promise<any>;
    signSharedKey(keyAction: string, x_timestamp: string, voemDomain: string, requestId: string, deviceOemId: string, sharingSession: string, keyCreationRequest: string): Promise<any>;
    importSharedKey(keyAction: string, x_timestamp: string, voemDomain: string, requestId: string, deviceOemId: string, keyID: string, sharingSession: string, keyCreationRequest: string): Promise<any>;
    fcmPushService(serverKey: string, regToken: string, pushData: string): Promise<void>;
    slackPushService(channelName: string, userName: string, text: string, icon_emoji: string, pushCreateTime: string, friend_handle: string): Promise<void>;
}
