/// <reference types="node" />
import { ACCert } from '../common/accert';
import { CertType } from '../common/accert';
export declare class CertificateService {
    generateCertificate(ct: CertType): ACCert;
    generateCertificateCommon(): ACCert;
    fillSubjectCommonName(accert: ACCert): ACCert;
    importCertificate(certdata: Buffer | string): ACCert;
}
