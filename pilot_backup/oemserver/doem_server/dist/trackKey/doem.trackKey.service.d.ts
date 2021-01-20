import { HttpService } from '@nestjs/common';
export declare class DoemTrackKeyService {
    private http;
    constructor(http: HttpService);
    checkParamsValidity(requestId: string, deviceOemId: string, encryptionCertChain: Array<String>, encryptionVersion: string, keyID: string, keyType: string, deviceType: string, accountIDHash: string): Promise<void>;
    trackKeyStartLogger(requestId: string, deviceOemId: string, encryptionCertChain: Array<String>, encryptionVersion: string, keyID: string, keyType: string, deviceType: string, accountIDHash: string, keyData: string): Promise<void>;
    trackKeySecondLogger(resultStr: string): Promise<void>;
    trackKeyFinalLogger(keyID: string, resultStr: string): Promise<void>;
    trackKeyHttpRequest(url: string, requestId: string, deviceOemId: string, encryptionCertChain: Array<String>, encryptionVersion: string, keyID: string, keyType: string, deviceType: string, accountIDHash: string, keyData: string): Promise<import("axios").AxiosResponse<any>>;
}
