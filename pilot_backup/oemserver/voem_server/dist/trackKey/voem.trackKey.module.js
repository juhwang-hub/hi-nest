"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerKeyInfoModule = exports.VoemVehicleInfoModule = exports.RootOEMInfoMudule = exports.VoemVerifierInfoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const voem_trackKey_entity_1 = require("./entity/voem.trackKey.entity");
const voem_trackKey_controller_1 = require("./voem.trackKey.controller");
const voem_trackKey_service_1 = require("./voem.trackKey.service");
const crypto_service_1 = require("../crypto/crypto.service");
let VoemVerifierInfoModule = class VoemVerifierInfoModule {
    constructor() {
        this.instance = new voem_trackKey_entity_1.VoemVerifierInfo();
        this.instance.voem_user_id = 'test@autocypt.io';
        this.instance.exist_verifier = 'true';
        this.instance.first_verifier = 'e433ab43428320b24fab82f915d1db114'
            + 'acd72f8a4bf4fbf3c712b94bcc2f013';
        this.instance.second_verifier = '04'
            + 'ff69eb6086938b3cce2c9e64dcacea1a'
            + '925918e75e8c17948d316322d370123f'
            + '69132aed7398919e6e6614f7627b0a54'
            + '060c5a8c0d93d2754166ab10fea6a8ff';
        this.instance.salt = 'yellowsubmarines';
        this.instance.password = 'pleaseletmein';
    }
    checkExistance() {
        return this.instance.exist_verifier;
    }
};
VoemVerifierInfoModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([voem_trackKey_entity_1.RootOEMServerInfo]), typeorm_1.TypeOrmModule.forFeature([voem_trackKey_entity_1.DigitalKeyInfo]), typeorm_1.TypeOrmModule.forFeature([voem_trackKey_entity_1.VoemUserInfo]), typeorm_1.TypeOrmModule.forFeature([voem_trackKey_entity_1.VoemVerifierInfo]), typeorm_1.TypeOrmModule.forFeature([voem_trackKey_entity_1.RootOEMInfo]), typeorm_1.TypeOrmModule.forFeature([voem_trackKey_entity_1.VoemVehicleInfo]), typeorm_1.TypeOrmModule.forFeature([voem_trackKey_entity_1.OwnerKeyInfo])],
        controllers: [voem_trackKey_controller_1.VoemVerifierInfoController],
        providers: [voem_trackKey_service_1.VoemVerifierInfoService, crypto_service_1.CryptoService],
    }),
    __metadata("design:paramtypes", [])
], VoemVerifierInfoModule);
exports.VoemVerifierInfoModule = VoemVerifierInfoModule;
class RootOEMInfoMudule {
    constructor() {
        this.instance = new voem_trackKey_entity_1.RootOEMInfo();
        this.instance.root_oem_id = 'LG Electronics';
        this.instance.root_oem_cert = '3082020d308201b4a003020102020101300a06082a8648ce3d0403023052310b3009'
            + '060355040613024b5231123010060355040a0c094175746f4372797074311430120603'
            + '55040b0c0b4d6f62696c697479526e443119301706035504030c1050494c4f542e446'
            + '57669636552434132301e170d3230303732323031333235375a170d333030373232303'
            + '1333235375a3052310b3009060355040613024b5231123010060355040a0c0941757'
            + '46f437279707431143012060355040b0c0b4d6f62696c697479526e4431193017060355'
            + '04030c1050494c4f542e446576696365524341323059301306072a8648ce3d020106'
            + '082a8648ce3d03010703420004257046e96bbc14a1055ac99cbfae8ecb95c8672a440b'
            + 'a9636e524cc41f4b8e5f523244b4bc30ad810b812a4f4d957a2e3fc808c0f40cc284338c'
            + 'c9fde4967e4da37b3079301f0603551d230418301680144cdb48003524e6f4ddb6aa0d0'
            + '8c817e8a102378c301d0603551d0e041604144cdb48003524e6f4ddb6aa0d08c817e8a10'
            + '2378c3016060a2b0601040182c46905090101ff04053003020103300e0603551d0f0101f'
            + 'f040403020106300f0603551d130101ff040530030101ff300a06082a8648ce3d0403020'
            + '3470030440220057b8d04cf31ca5ab3751780fc68004f1b327d665a8b409abe67e0508a'
            + '57174d0220513ba9393ab8d296c01bc8a94a91cf937e1dc34747957a6233f040c0f8b9ad6a';
        this.instance.root_oem_url = 'http://localhost:4000';
    }
}
exports.RootOEMInfoMudule = RootOEMInfoMudule;
class VoemVehicleInfoModule {
    constructor() {
        this.instance.vehicle_id = '1A2A3A4A1B2B3B4B';
        this.instance.vehicle_pk = '04fc82dce62e386a2b9edf7261d06359f36f670bfc876b0f8f368e7369a9f7e0bed934b0a53becaf35a8c28b4b55b89a45faf674b3b66e95a9976328a477772c71';
        this.instance.vehicle_enc_pk = '04eae30354337c7938312f96fd03c450b5180b5f3136394129d973a9aa6e3ad984df446e599e50a1b372944d6515fa8007ee5acebbe33e19fe0bd2aec8f7ff652f';
        this.instance.vehicle_sig_cert = '-----BEGIN CERTIFICATE-----'
            + 'MIICqDCCAk6gAwIBAgIGAOjUpRALMAoGCCqGSM49BAMCMFMxCzAJBgNVBAYTAktS'
            + 'MRIwEAYDVQQKDAlBdXRvQ3J5cHQxFDASBgNVBAsMC01vYmlsaXR5Um5EMRowGAYD'
            + 'VQQDDBFQSUxPVC5WZWhpY2xlSUNBMTAeFw0yMDA3MTkxNTAwMDBaFw0zMDA1Mjkx'
            + 'NDU5NTlaMCoxKDAmBgNVBAMMH1YuQVVUTy5LUi5ETjA3LjFBMkEzQTRBMUIyQjNC'
            + 'NEIwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAT8gtzmLjhqK57fcmHQY1nzb2cL'
            + '/IdrD482jnNpqffgvtk0sKU77K81qMKLS1W4mkX69nSztm6VqZdjKKR3dyxxo4IB'
            + 'NTCCATEwewYDVR0jBHQwcoAU2Baon5MAH6kf1cJb7N1wG37AFVuhV6RVMFMxCzAJ'
            + 'BgNVBAYTAktSMRIwEAYDVQQKDAlBdXRvQ3J5cHQxFDASBgNVBAsMC01vYmlsaXR5'
            + 'Um5EMRowGAYDVQQDDBFQSUxPVC5WZWhpY2xlUkNBMYIBAjAdBgNVHQ4EFgQUG9oR'
            + 'KX0c0lHf72nbY1OrN7dbswkwDgYDVR0PAQH/BAQDAgeAMB8GA1UdEQQYMBaCFFZl'
            + 'aGljbGUgU2lnIEtleSBDZXJ0MFQGA1UdHwRNMEswSaBHoEWGQy9jbj1kcF9iODJZ'
            + 'b1ZSWVRsNkJGZW1tY3NTR1F3cDAsb3U9TW9iaWxpdHlSbkQsbz1BdXRvQ3J5cHQs'
            + 'Yz1LUi5jcmwwDAYDVR0TAQH/BAIwADAKBggqhkjOPQQDAgNIADBFAiEArYs5V66I'
            + 'na01eNljsVtr0Jm5BJiGTl5q8kwcdblBrjoCIDTJlm0u/6OiLNXJZD+uBsY+oZPf'
            + 'l8FBoZdB6rwaRcjg'
            + '-----END CERTIFICATE-----';
        this.instance.vehicle_enc_cert = '-----BEGIN CERTIFICATE-----'
            + 'MIICojCCAkigAwIBAgIGAOjUpRAMMAoGCCqGSM49BAMCMFMxCzAJBgNVBAYTAktS'
            + 'MRIwEAYDVQQKDAlBdXRvQ3J5cHQxFDASBgNVBAsMC01vYmlsaXR5Um5EMRowGAYD'
            + 'VQQDDBFQSUxPVC5WZWhpY2xlSUNBMTAeFw0yMDA3MTkxNTAwMDBaFw0zMDA1Mjkx'
            + 'NDU5NTlaMCAxHjAcBgNVBAMMFUVOQ0suODQ2QTY0NjM1OUMwRUZCOTBZMBMGByqG'
            + 'SM49AgEGCCqGSM49AwEHA0IABOrjA1QzfHk4MS+W/QPEULUYC18xNjlBKdlzqapu'
            + 'OtmE30RuWZ5QobNylE1lFfqAB+5azrvjPhn+C9KuyPf/ZS+jggE5MIIBNTB7BgNV'
            + 'HSMEdDBygBTYFqifkwAfqR/Vwlvs3XAbfsAVW6FXpFUwUzELMAkGA1UEBhMCS1Ix'
            + 'EjAQBgNVBAoMCUF1dG9DcnlwdDEUMBIGA1UECwwLTW9iaWxpdHlSbkQxGjAYBgNV'
            + 'BAMMEVBJTE9ULlZlaGljbGVSQ0ExggECMB0GA1UdDgQWBBTAEpkZYPM8o8dv3WIo'
            + 'x0tWolV5gDAOBgNVHQ8BAf8EBAMCBBAwIwYDVR0RBBwwGoIYVk9FTSBFbmNyeXB0'
            + 'aW9uIEtleSBDZXJ0MFQGA1UdHwRNMEswSaBHoEWGQy9jbj1kcF9iODJZb1ZSWVRs'
            + 'NkJGZW1tY3NTR1F3cDAsb3U9TW9iaWxpdHlSbkQsbz1BdXRvQ3J5cHQsYz1LUi5j'
            + 'cmwwDAYDVR0TAQH/BAIwADAKBggqhkjOPQQDAgNIADBFAiBsPbAwFASVKg51sndi'
            + 'hweq8WhkrFF4HXCIilQe8FA6YgIhAPEf3XhL95JofRQqCKczB9qrT/BsT5uWhCE2'
            + 'EzHfwBcI'
            + '-----END CERTIFICATE-----';
        this.instance.vehicle_brand = 'HYUNDAI';
        this.instance.vehicle_model = 'DN8';
    }
}
exports.VoemVehicleInfoModule = VoemVehicleInfoModule;
class OwnerKeyInfoModule {
    constructor() {
        this.instance.key_id = "";
        this.instance.key_status = 1;
        this.instance.device_oem = "";
        this.instance.owner_device_key = "";
        this.instance.vehicle_id = "";
        this.instance.digital_key_PK = "";
        this.instance.key_type = "";
        this.instance.device_type = "";
        this.instance.accountIdHash = "";
        this.instance.ICA_Cert = "";
        this.instance.DK_Cert = "";
        this.instance.device_enc_PK = "";
        this.instance.device_enc_PK_version = "";
        this.instance.key_Valid_From = "";
        this.instance.key_Valid_To = "";
        this.instance.shared_keys = "";
        this.instance.sharable_keys = "";
        this.instance.sharing_password_required = "";
    }
}
exports.OwnerKeyInfoModule = OwnerKeyInfoModule;
//# sourceMappingURL=voem.trackKey.module.js.map