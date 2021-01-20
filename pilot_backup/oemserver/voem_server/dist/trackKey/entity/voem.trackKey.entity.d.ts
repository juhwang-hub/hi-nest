export declare class VoemUserInfo {
    voem_user_id: string;
    email: string;
    name: string;
    phonenumber: string;
    password_salt: string;
    hashed_password: string;
    date: Date;
    zip_code: string;
    basic_address: string;
    detail_address: string;
    passwordDate: Date;
    vehicle_id_1: string;
    vehicle_id_2: string;
    vehicle_id_3: string;
}
export declare class VoemVerifierInfo {
    voem_user_id: string;
    exist_verifier: string;
    first_verifier: string;
    second_verifier: string;
    salt: string;
    password: string;
}
export declare class RootOEMInfo {
    root_oem_id: string;
    root_oem_cert: string;
    root_oem_url: string;
}
export declare class RootOEMServerInfo {
    root_oem_id: string;
    root_oem_cert: string;
    root_oem_url: string;
}
export declare class VoemVehicleInfo {
    vehicle_id: string;
    vehicle_pk: string;
    vehicle_enc_pk: string;
    vehicle_sig_cert: string;
    vehicle_enc_cert: string;
    vehicle_brand: string;
    vehicle_model: string;
}
export declare class DigitalKeyInfo {
    key_id: string;
    key_status: number;
    device_oem: string;
    owner_device_key: string;
    vehicle_id: string;
    digital_key_PK: string;
    key_type: string;
    device_type: string;
    accountIdHash: string;
    ICA_Cert: string;
    DK_Cert: string;
    device_enc_PK: string;
    device_enc_PK_version: string;
    key_Valid_From: string;
    key_Valid_To: string;
    shared_keys: string;
    sharable_keys: string;
    sharing_password_required: string;
}
export declare class OwnerKeyInfo {
    key_id: string;
    key_status: number;
    device_oem: string;
    owner_device_key: string;
    vehicle_id: string;
    digital_key_PK: string;
    key_type: string;
    device_type: string;
    accountIdHash: string;
    ICA_Cert: string;
    DK_Cert: string;
    device_enc_PK: string;
    device_enc_PK_version: string;
    key_Valid_From: string;
    key_Valid_To: string;
    shared_keys: string;
    sharable_keys: string;
    sharing_password_required: string;
}
