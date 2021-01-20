export declare class DoemManageKeySrevice {
    constructor();
    manageKeyStartLogger(keyID: string, vehicleOemId: string, x_timestamp: string, action: string): Promise<void>;
    fcmPushService(serverKey: string, regToken: string, pushData: string): Promise<void>;
}
