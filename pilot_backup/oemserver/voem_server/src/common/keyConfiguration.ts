import * as moment from 'moment';

// CCC Digital Key Release 2.0 17.8.13
export class KeyConfiguration {
	public friendlyName : string; // The friendly friend's name to be displayed to the user, max length 30
	public rights : Number; // Integer indicating which access profile the shared key has. max length 16
	public keyValidFrom : string; // Key validity start date. Time should be specified in UTC ISO-8601 Format yyyy-MM-dd'T'HH:mm:ss.SSSZ. max length 32
	public keyValidTo : string; // Key validity end date. Time should be specified in UTC ISO-8601 Format yyyy-MM-dd'T'HH:mm:ss.SSSZ. max length 32

	public validFrom : moment.Moment;
	public validTo : moment.Moment;

	constructor(friendlyName: string, rights: Number, keyValidFrom: string , keyValidTo: string) {
		if (friendlyName.length > 30) {
			throw('to long friendlyName, it should not be longer than 30');
		}
		this.friendlyName = friendlyName;
		this.rights = rights;
		this.keyValidFrom = keyValidFrom;
		this.keyValidTo = keyValidTo;
		this.validFrom =  moment(keyValidFrom);
		this.validTo = moment(keyValidTo);
	}
}