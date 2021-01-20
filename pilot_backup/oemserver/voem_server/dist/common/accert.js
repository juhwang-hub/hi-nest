"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCert = exports.CertType = void 0;
const pkijs = require('pkijs');
const _ = require('lodash');
var CertType;
(function (CertType) {
    CertType[CertType["SERootCA"] = 0] = "SERootCA";
    CertType[CertType["SERoot"] = 1] = "SERoot";
    CertType[CertType["DeviceOemCA"] = 2] = "DeviceOemCA";
    CertType[CertType["InstanceCA"] = 3] = "InstanceCA";
    CertType[CertType["VehicleOemCA"] = 4] = "VehicleOemCA";
    CertType[CertType["Vehicle"] = 5] = "Vehicle";
    CertType[CertType["EncryptionKey"] = 6] = "EncryptionKey";
    CertType[CertType["EndPoint"] = 7] = "EndPoint";
})(CertType = exports.CertType || (exports.CertType = {}));
class ACCert {
    constructor() {
        this.rawCert = new pkijs.Certificate();
    }
    getSubjectCommonName() {
        let tv = this.rawCert.subject.typesAndValues;
        const commonNameValue = _.find(tv, { 'type': '2.5.4.3' });
        const commonName = commonNameValue.value.valueBlock.value;
        console.log(commonName);
        return commonName;
    }
}
exports.ACCert = ACCert;
//# sourceMappingURL=accert.js.map