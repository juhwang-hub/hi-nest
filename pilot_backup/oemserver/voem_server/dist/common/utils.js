"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    static b64ToBin(b64) {
        return new Buffer(b64, 'base64');
    }
    static pemToBin(b64) {
        const splitPEM = b64.split(`-----END CERTIFICATE-----`).map(el => {
            return el ? el.replace('-----BEGIN CERTIFICATE-----', '') : undefined;
        }).filter(Boolean);
        const certBuf = splitPEM.map(el => el && this.b64ToBin(el)).filter(Boolean);
        let mergedBuf = Buffer.concat(certBuf);
        return mergedBuf;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map