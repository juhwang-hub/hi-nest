import { Injectable } from '@nestjs/common';
import { ACCert } from '../common/accert';
import * as asn1js from 'asn1js';
import { Utils } from '../common/utils';
const pkijs = require('pkijs');
// import AttributeTypeAndValue from 'pkijs/src/AttributeTypeAndValue';
// import BasicConstraints from 'pkijs/src/BasicConstraints';
// import Extension from 'pkijs/src/Extension';
import { CertType } from '../common/accert';
import * as crypto from 'crypto';

@Injectable()
export class CertificateService {
	public generateCertificate(ct:CertType) : ACCert {
		let accert = new ACCert();
		accert.rawCert = new pkijs.Certificate();

		switch(ct) {
			case CertType.DeviceOemCA: {
				break;
			}
			case CertType.VehicleOemCA: {
				break;
			}
			case CertType.Vehicle: {
				break;
			}
			default: {
				return null;
			}
		} 
		return null;
	}
	public generateCertificateCommon() : ACCert {
		let accert = new ACCert();
		accert.rawCert = new pkijs.Certificate();
		//region Creation of a new X.509 certificate
		accert.rawCert.serialNumber = new asn1js.Integer({ value: 1 });
		// accert.rawCert.issuer.typesAndValues.push(new AttributeTypeAndValue({
		// 	type: "2.5.4.6", // Country named
		// 	value: new asn1js.PrintableString({ value: "RU" })
		// }));
		accert.rawCert.issuer.typesAndValues.push(new pkijs.AttributeTypeAndValue({
			type: "2.5.4.3", // Common name
			value: new asn1js.PrintableString({ value: "Not Implemented" })
		}));
		// accert.rawCert.subject.typesAndValues.push(new AttributeTypeAndValue({
		// 	type: "2.5.4.6", // Country name
		// 	value: new asn1js.PrintableString({ value: "RU" })
		// }));
		accert.rawCert.subject.typesAndValues.push(new pkijs.AttributeTypeAndValue({
			type: "2.5.4.3", // Common name
			value: new asn1js.PrintableString({ value: "Test" })
		}));
	 
		accert.rawCert.notBefore.value = new Date(2013, 1, 1);
		accert.rawCert.notAfter.value = new Date(2016, 1, 1);
		accert.rawCert.extensions = []; // Extensions are not a part of certificate by default, it's an optional array
 
		//region "BasicConstraints" extension
		const basicConstr = new pkijs.BasicConstraints({
			cA: true,
			pathLenConstraint: 3
		});
	
		accert.rawCert.extensions.push(new pkijs.Extension({
			extnID: "2.5.29.19",
			critical: false,
			extnValue: basicConstr.toSchema().toBER(false),
			parsedValue: basicConstr // Parsed value for well-known extensions
		}));
		//endregion
	
		//region "KeyUsage" extension
		const bitArray = new ArrayBuffer(1);
		const bitView = new Uint8Array(bitArray);
	
		bitView[0] |= 0x02; // Key usage "cRLSign" flag
		bitView[0] |= 0x04; // Key usage "keyCertSign" flag
	
		const keyUsage = new asn1js.BitString({ valueHex: bitArray });
	
		accert.rawCert.extensions.push(new pkijs.Extension({
			extnID: "2.5.29.15",
			critical: false,
			extnValue: keyUsage.toBER(false),
			parsedValue: keyUsage // Parsed value for well-known extensions
		}));
		return accert;
	}

	public fillSubjectCommonName(accert:ACCert) : ACCert {
		let atav;

		switch(accert.certType) {
			case CertType.EncryptionKey: {
				const randomBytes = crypto.randomBytes(8);
				atav = new pkijs.AttributeTypeAndValue({
					type: "2.5.4.3", // Common name
					value: new asn1js.PrintableString({ value: 'ENCK.' + randomBytes.toString('hex') })
				});
				break;
			}
			default:
				atav = new pkijs.AttributeTypeAndValue({
					type: "2.5.4.3", // Common name
					value: new asn1js.PrintableString({ value: 'NotImplemented' })
				});
				break;
		}
		accert.rawCert.subject.typesAndValues.push(atav);
		return accert;
	}

	public importCertificate(certdata:Buffer|string) : ACCert {
		let accert : ACCert = new ACCert();
		if (typeof certdata == 'string' ) { // base64 encoding
			certdata = Utils.pemToBin(certdata);
		}
		const asn1 = asn1js.fromBER(certdata.buffer.slice(certdata.byteOffset, certdata.byteOffset + certdata.byteLength));
		const certificate = new pkijs.Certificate({ schema: asn1.result});
		accert.rawCert = certificate;
		return accert;
	}
}
