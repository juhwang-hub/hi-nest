import * as moment from 'moment';
export declare class KeyConfiguration {
    friendlyName: string;
    rights: Number;
    keyValidFrom: string;
    keyValidTo: string;
    validFrom: moment.Moment;
    validTo: moment.Moment;
    constructor(friendlyName: string, rights: Number, keyValidFrom: string, keyValidTo: string);
}
