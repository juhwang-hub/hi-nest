/// <reference types="node" />
import { Repository } from 'typeorm';
import { DigitalKeyInfo, VoemVerifierInfo, RootOEMServerInfo, RootOEMInfo, VoemVehicleInfo, OwnerKeyInfo } from './entity/voem.trackKey.entity';
export declare class VoemVerifierInfoService {
    private readonly userRepository;
    private readonly rootOemRepository;
    private readonly voemVehicleInfoRepository;
    private readonly OwnerKeyInfoRepository;
    private readonly voemDigitalKeyInfoRepository;
    private readonly voemRootOEMServerInfoRepository;
    constructor(userRepository: Repository<VoemVerifierInfo>, rootOemRepository: Repository<RootOEMInfo>, voemVehicleInfoRepository: Repository<VoemVehicleInfo>, OwnerKeyInfoRepository: Repository<OwnerKeyInfo>, voemDigitalKeyInfoRepository: Repository<DigitalKeyInfo>, voemRootOEMServerInfoRepository: Repository<RootOEMServerInfo>);
    getAllUsers(): Promise<VoemVerifierInfo[]>;
    checkVerifier(voem_user_id: string): Promise<VoemVerifierInfo>;
    getVerifierLoggerExist(voemVehicleId: string, requestId: string, res: any): Promise<void>;
    getVerifierLoggerNotExist(voemVehicleId: string, requestId: string, res: any): Promise<void>;
    getVerifier(voem_user_id: string): Promise<VoemVerifierInfo[]>;
    insertVerifierDB(voem_user_id: string, exist_verifier: string, first_verifier: string, second_verifier: string, salt: string, password: string): Promise<void>;
    updateVerifierDB(voem_user_id: string, exist_verifier: string, first_verifier: string, second_verifier: string, salt: string, password: string): Promise<void>;
    insertRootOEMInfoDB(root_oem_id: string, root_oem_cert: string, root_oem_url: string): Promise<void>;
    getRootOEMInfo(root_oem_id: string): Promise<RootOEMServerInfo>;
    getDeviceOemInfo(key_id: string): Promise<string>;
    getRootOemUrl(root_oem_id: string): Promise<string>;
    vehicleInfoInsertDB(vehicle_id: string, vehicle_pk: string, vehicle_enc_pk: string, vehicle_sig_cert: string, vehicle_enc_cert: string, vehicle_brand: string, vehicle_model: string): Promise<void>;
    getVehicleInfo(vehicle_id: string): Promise<VoemVehicleInfo>;
    getDKInfo(key_id: string): Promise<OwnerKeyInfo>;
    insertDKinfo(key_id: string, vehicle_id: string, key_status: number, device_oem: string, owner_device_key: string, digital_key_PK: string, key_type: string, device_type: string, accountIdHash: string, ICA_Cert: string, DK_Cert: string, device_enc_PK: string, device_enc_PK_version: string, key_Valid_From: string, key_Valid_To: string, shared_keys: string, sharable_keys: string, sharing_password_required: string): Promise<void>;
    generateVerifierHeadParam(requestId: string, voemUserId: string, password_str: string): Promise<void>;
    generateVerifierTailParam(resultObj: object): Promise<void>;
    IfVerifierExistAndSame(voemUserId: string, requestId: string, res: any): Promise<void>;
    IfVerifierDoesNotExist(voemUserId: string, password: Buffer, salt: Buffer, salt_str: string, password_str: string, res: any, requestId: string): Promise<void>;
    IfVerifierDifferent(voemUserId: string, requestId: string, res: any): Promise<void>;
    getVerifierHeadParam(requestId: string, voemVehicleId: string): Promise<void>;
    checkParamsValidity(requestId: string, deviceOemId: string, encryptionCertChain: Array<String>, encryptionVersion: string, keyID: string, keyType: string, deviceType: string, accountIDHash: string): Promise<void>;
    trackKeyStartLogger(requestId: string, deviceOemId: string, encryptionCertChain: Array<String>, encryptionVersion: string, keyID: string, keyType: string, deviceType: string, accountIDHash: string, keyData: string): Promise<void>;
    IfOwnerKeyExist(keyID: string, resultObj: DigitalKeyInfo, requestId: string, res: any): Promise<void>;
    uiSampleGenerator(ktsSignature: string, validTimeFrom: string, validTimeTo: string, sharedKeys: string, sharableKeys: string, uiIentifier: any): Promise<{
        ktsSignature: string;
        keyValidFrom: string;
        keyValidTo: string;
        sharedKeys: string;
        shareableKeys: string;
        uiIdentifier: any;
        sharingPasswordRequired: string;
        entitlement: {
            value: number;
            description: string;
            longDescription: string;
        };
        supportedEntitlements: {
            entitlements: {
                value: number;
                description: string;
                longDescription: string;
            }[];
        };
    }>;
}
