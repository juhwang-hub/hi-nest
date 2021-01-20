declare const pkijs: any;
export declare enum CertType {
    SERootCA = 0,
    SERoot = 1,
    DeviceOemCA = 2,
    InstanceCA = 3,
    VehicleOemCA = 4,
    Vehicle = 5,
    EncryptionKey = 6,
    EndPoint = 7
}
export declare class ACCert {
    certType: CertType;
    rawCert: typeof pkijs.Certificate;
    constructor();
    getSubjectCommonName(): string;
}
export {};
