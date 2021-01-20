import { Test, TestingModule } from '@nestjs/testing';
import { KeyConfiguration } from './keyConfiguration';
import * as moment from 'moment'

describe('KeyConfiguration', () => {

  it('keyConfiguratin create ', () => {
	let keyConf = new KeyConfiguration("Jane's Phone", 0, "2021-02-19T23:05:17.462Z", "2021-02-19T23:05:17.462Z");
	//console.log(keyConf);
	expect(keyConf).toBeTruthy();
	keyConf = new KeyConfiguration("Jane's Phone", 0, moment().toISOString(), "2021-02-19T23:05:17.462Z");
	//console.log(keyConf);
    expect(keyConf).toBeTruthy();
  });

});
