"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateService = void 0;
const common_1 = require("@nestjs/common");
const accert_1 = require("../common/accert");
const asn1js = require("asn1js");
const utils_1 = require("../common/utils");
const pkijs = require('pkijs');
const accert_2 = require("../common/accert");
const crypto = require("crypto");
let CertificateService = class CertificateService {
    generateCertificate(ct) {
        let accert = new accert_1.ACCert();
        accert.rawCert = new pkijs.Certificate();
        switch (ct) {
            case accert_2.CertType.DeviceOemCA: {
                break;
            }
            case accert_2.CertType.VehicleOemCA: {
                break;
            }
            case accert_2.CertType.Vehicle: {
                break;
            }
            default: {
                return null;
            }
        }
        return null;
    }
    generateCertificateCommon() {
        let accert = new accert_1.ACCert();
        accert.rawCert = new pkijs.Certificate();
        accert.rawCert.serialNumber = new asn1js.Integer({ value: 1 });
        accert.rawCert.issuer.typesAndValues.push(new pkijs.AttributeTypeAndValue({
            type: "2.5.4.3",
            value: new asn1js.PrintableString({ value: "Not Implemented" })
        }));
        accert.rawCert.subject.typesAndValues.push(new pkijs.AttributeTypeAndValue({
            type: "2.5.4.3",
            value: new asn1js.PrintableString({ value: "Test" })
        }));
        accert.rawCert.notBefore.value = new Date(2013, 1, 1);
        accert.rawCert.notAfter.value = new Date(2016, 1, 1);
        accert.rawCert.extensions = [];
        const basicConstr = new pkijs.BasicConstraints({
            cA: true,
            pathLenConstraint: 3
        });
        accert.rawCert.extensions.push(new pkijs.Extension({
            extnID: "2.5.29.19",
            critical: false,
            extnValue: basicConstr.toSchema().toBER(false),
            parsedValue: basicConstr
        }));
        const bitArray = new ArrayBuffer(1);
        const bitView = new Uint8Array(bitArray);
        bitView[0] |= 0x02;
        bitView[0] |= 0x04;
        const keyUsage = new asn1js.BitString({ valueHex: bitArray });
        accert.rawCert.extensions.push(new pkijs.Extension({
            extnID: "2.5.29.15",
            critical: false,
            extnValue: keyUsage.toBER(false),
            parsedValue: keyUsage
        }));
        return accert;
    }
    fillSubjectCommonName(accert) {
        let atav;
        switch (accert.certType) {
            case accert_2.CertType.EncryptionKey: {
                const randomBytes = crypto.randomBytes(8);
                atav = new pkijs.AttributeTypeAndValue({
                    type: "2.5.4.3",
                    value: new asn1js.PrintableString({ value: 'ENCK.' + randomBytes.toString('hex') })
                });
                break;
            }
            default:
                atav = new pkijs.AttributeTypeAndValue({
                    type: "2.5.4.3",
                    value: new asn1js.PrintableString({ value: 'NotImplemented' })
                });
                break;
        }
        accert.rawCert.subject.typesAndValues.push(atav);
        return accert;
    }
    importCertificate(certdata) {
        let accert = new accert_1.ACCert();
        if (typeof certdata == 'string') {
            certdata = utils_1.Utils.pemToBin(certdata);
        }
        const asn1 = asn1js.fromBER(certdata.buffer.slice(certdata.byteOffset, certdata.byteOffset + certdata.byteLength));
        const certificate = new pkijs.Certificate({ schema: asn1.result });
        accert.rawCert = certificate;
        return accert;
    }
};
CertificateService = __decorate([
    common_1.Injectable()
], CertificateService);
exports.CertificateService = CertificateService;
//# sourceMappingURL=certificate.service.js.map