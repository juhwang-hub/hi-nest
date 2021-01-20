"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyConfiguration = void 0;
const moment = require("moment");
class KeyConfiguration {
    constructor(friendlyName, rights, keyValidFrom, keyValidTo) {
        if (friendlyName.length > 30) {
            throw ('to long friendlyName, it should not be longer than 30');
        }
        this.friendlyName = friendlyName;
        this.rights = rights;
        this.keyValidFrom = keyValidFrom;
        this.keyValidTo = keyValidTo;
        this.validFrom = moment(keyValidFrom);
        this.validTo = moment(keyValidTo);
    }
}
exports.KeyConfiguration = KeyConfiguration;
//# sourceMappingURL=keyConfiguration.js.map