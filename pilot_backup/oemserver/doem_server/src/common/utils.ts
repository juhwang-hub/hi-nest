export class Utils {
	static b64ToBin(b64:string) : Buffer {
		return new Buffer(b64, 'base64' ) ;
	}

	static pemToBin(b64:string) : Buffer {
		const splitPEM = b64.split(`-----END CERTIFICATE-----`).map(el => {
			return el ? el.replace('-----BEGIN CERTIFICATE-----', '') : undefined
		}).filter(Boolean)
	
		const certBuf = splitPEM.map(el => el && this.b64ToBin(el)).filter(Boolean);
		let mergedBuf = Buffer.concat(certBuf);
		return mergedBuf;
	
	}
}
