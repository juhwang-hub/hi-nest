const pkijs = require('pkijs');
const _ = require('lodash');

export enum CertType {
	SERootCA,
	SERoot,
	DeviceOemCA,
	InstanceCA,
	VehicleOemCA,
	Vehicle,
	EncryptionKey,
	EndPoint
}

export class ACCert {
	certType : CertType;
	rawCert: typeof pkijs.Certificate;
	public constructor() {
		this.rawCert = new pkijs.Certificate();
	}

	public getSubjectCommonName() : string {
		let tv = this.rawCert.subject.typesAndValues;
		const commonNameValue = _.find(tv, {'type' : '2.5.4.3'});
		const commonName = commonNameValue.value.valueBlock.value;
		console.log(commonName);
		return commonName;
	}
}
