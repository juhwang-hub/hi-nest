import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AdkController } from './adk.controller';
import { INestApplication } from '@nestjs/common';

describe('Adk Controller POST trackKey', () => {
  let app: INestApplication;
  let controller: AdkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdkController],
    }).compile();

    controller = module.get<AdkController>(AdkController);

    app = module.createNestApplication();
    await app.init();
  });
   
  ////////////////////////////////////////////////////////////////////////////////////
  // Track Key TEST
  ////////////////////////////////////////////////////////////////////////////////////
  it(`param check will be successful`, () => {
    return request(app.getHttpServer())
      .post('/adk/trackKey')
      .set('x-requestId' , '80BCCEF8F59127A6D1BB5CFEB534D95')
      .set('x-device-oemId' , 'device OEM A')
      .type('json')
      .send({
        "encryptionCertChain" : [ "483729239...475C864E4F" , "48372949AB93C...826E23564F" ], 
        "encryptionVersion" : "ECIES_v1", 
        "keyID" : "394858302023",
        "keyType" : "OWNER | SHARED",
        "deviceType" : "PHONE", 
        "accountIDHash" : "C8645830202EFEB53427A6D75F15C85E78A5195307E2351858349AB9" , 
        "keyData" : { 
          "version" : "ECIES_v1", 
          "ephemeralPublicKey" : "04613197827d91806d630bc4adff44686b012316eb03825f2d6587ffd58d32f17 4522ada80cc93679e1a316dc0729ebf8172fd41f0c0c1bdda01126f1a6186b2a18008",
          "publicKeyHash" : "d6e3bbc95bf11d533677a1aa052d7caef29fd76a02e43e3609579966168d7d1219",
          "data" : "5GRH7/ecb85HFsTalxn3IdeT7ARtfFZn2AuMft1p...IkcchjFBLJTGm9qvJtxK24 /3EdWob+iFS9FwHeKSjq8MxdNgQ1rj4fq6CzQfY8O9"
        }
      })
      .expect(200);
  });

  it(`x-requestId header missing will checked`, () => {
    return request(app.getHttpServer())
      .post('/adk/trackKey')
      .set('x-device-oemId' , 'device OEM A')
      .type('json')
      .send({
        "encryptionCertChain" : [ "483729239...475C864E4F" , "48372949AB93C...826E23564F" ], 
        "encryptionVersion" : "ECIES_v1", 
        "keyID" : "394858302023",
        "keyType" : "OWNER | SHARED",
        "deviceType" : "PHONE", 
        "accountIDHash" : "C8645830202EFEB53427A6D75F15C85E78A5195307E2351858349AB9" , 
        "keyData" : { 
          "version" : "ECIES_v1", 
          "ephemeralPublicKey" : "04613197827d91806d630bc4adff44686b012316eb03825f2d6587ffd58d32f17 4522ada80cc93679e1a316dc0729ebf8172fd41f0c0c1bdda01126f1a6186b2a18008",
          "publicKeyHash" : "d6e3bbc95bf11d533677a1aa052d7caef29fd76a02e43e3609579966168d7d1219",
          "data" : "5GRH7/ecb85HFsTalxn3IdeT7ARtfFZn2AuMft1p...IkcchjFBLJTGm9qvJtxK24 /3EdWob+iFS9FwHeKSjq8MxdNgQ1rj4fq6CzQfY8O9"
        }
      })
      .expect(500);
  });

  it(`x-device-oemId header missing will be checked`, () => {
    return request(app.getHttpServer())
      .post('/adk/trackKey')
      .set('x-requestId' , '80BCCEF8F59127A6D1BB5CFEB534D95')
      .type('json')
      .send({
        "encryptionCertChain" : [ "483729239...475C864E4F" , "48372949AB93C...826E23564F" ], 
        "encryptionVersion" : "ECIES_v1", 
        "keyID" : "394858302023",
        "keyType" : "OWNER | SHARED",
        "deviceType" : "PHONE", 
        "accountIDHash" : "C8645830202EFEB53427A6D75F15C85E78A5195307E2351858349AB9" , 
        "keyData" : { 
          "version" : "ECIES_v1", 
          "ephemeralPublicKey" : "04613197827d91806d630bc4adff44686b012316eb03825f2d6587ffd58d32f17 4522ada80cc93679e1a316dc0729ebf8172fd41f0c0c1bdda01126f1a6186b2a18008",
          "publicKeyHash" : "d6e3bbc95bf11d533677a1aa052d7caef29fd76a02e43e3609579966168d7d1219",
          "data" : "5GRH7/ecb85HFsTalxn3IdeT7ARtfFZn2AuMft1p...IkcchjFBLJTGm9qvJtxK24 /3EdWob+iFS9FwHeKSjq8MxdNgQ1rj4fq6CzQfY8O9"
        }
      })
      .expect(500);
  });

  it(`encryptionCertChain json body field missing will be checked`, () => {
    return request(app.getHttpServer())
      .post('/adk/trackKey')
      .set('x-requestId' , '80BCCEF8F59127A6D1BB5CFEB534D95')
      .set('x-device-oemId' , 'device OEM A')
      .type('json')
      .send({
        "encryptionVersion" : "ECIES_v1", 
        "keyID" : "394858302023",
        "keyType" : "OWNER | SHARED",
        "deviceType" : "PHONE", 
        "accountIDHash" : "C8645830202EFEB53427A6D75F15C85E78A5195307E2351858349AB9" , 
        "keyData" : { 
          "version" : "ECIES_v1", 
          "ephemeralPublicKey" : "04613197827d91806d630bc4adff44686b012316eb03825f2d6587ffd58d32f17 4522ada80cc93679e1a316dc0729ebf8172fd41f0c0c1bdda01126f1a6186b2a18008",
          "publicKeyHash" : "d6e3bbc95bf11d533677a1aa052d7caef29fd76a02e43e3609579966168d7d1219",
          "data" : "5GRH7/ecb85HFsTalxn3IdeT7ARtfFZn2AuMft1p...IkcchjFBLJTGm9qvJtxK24 /3EdWob+iFS9FwHeKSjq8MxdNgQ1rj4fq6CzQfY8O9"
        }
      })
      .expect(500);
  });

  it(`encryptionVersion json body field missing will be checked`, () => {
    return request(app.getHttpServer())
      .post('/adk/trackKey')
      .set('x-requestId' , '80BCCEF8F59127A6D1BB5CFEB534D95')
      .set('x-device-oemId' , 'device OEM A')
      .type('json')
      .send({
        "encryptionCertChain" : [ "483729239...475C864E4F" , "48372949AB93C...826E23564F" ], 
        "keyID" : "394858302023",
        "keyType" : "OWNER | SHARED",
        "deviceType" : "PHONE", 
        "accountIDHash" : "C8645830202EFEB53427A6D75F15C85E78A5195307E2351858349AB9" , 
        "keyData" : { 
          "version" : "ECIES_v1", 
          "ephemeralPublicKey" : "04613197827d91806d630bc4adff44686b012316eb03825f2d6587ffd58d32f17 4522ada80cc93679e1a316dc0729ebf8172fd41f0c0c1bdda01126f1a6186b2a18008",
          "publicKeyHash" : "d6e3bbc95bf11d533677a1aa052d7caef29fd76a02e43e3609579966168d7d1219",
          "data" : "5GRH7/ecb85HFsTalxn3IdeT7ARtfFZn2AuMft1p...IkcchjFBLJTGm9qvJtxK24 /3EdWob+iFS9FwHeKSjq8MxdNgQ1rj4fq6CzQfY8O9"
        }
      })
      .expect(500);
  });

  it(`keyId json body field missing will be checked`, () => {
    return request(app.getHttpServer())
      .post('/adk/trackKey')
      .set('x-requestId' , '80BCCEF8F59127A6D1BB5CFEB534D95')
      .set('x-device-oemId' , 'device OEM A')
      .type('json')
      .send({
        "encryptionCertChain" : [ "483729239...475C864E4F" , "48372949AB93C...826E23564F" ], 
        "encryptionVersion" : "ECIES_v1", 
        "keyType" : "OWNER | SHARED",
        "deviceType" : "PHONE", 
        "accountIDHash" : "C8645830202EFEB53427A6D75F15C85E78A5195307E2351858349AB9" , 
        "keyData" : { 
          "version" : "ECIES_v1", 
          "ephemeralPublicKey" : "04613197827d91806d630bc4adff44686b012316eb03825f2d6587ffd58d32f17 4522ada80cc93679e1a316dc0729ebf8172fd41f0c0c1bdda01126f1a6186b2a18008",
          "publicKeyHash" : "d6e3bbc95bf11d533677a1aa052d7caef29fd76a02e43e3609579966168d7d1219",
          "data" : "5GRH7/ecb85HFsTalxn3IdeT7ARtfFZn2AuMft1p...IkcchjFBLJTGm9qvJtxK24 /3EdWob+iFS9FwHeKSjq8MxdNgQ1rj4fq6CzQfY8O9"
        }
      })
      .expect(500);
  });

  it(`keyType json body field missing will be checked`, () => {
    return request(app.getHttpServer())
      .post('/adk/trackKey')
      .set('x-requestId' , '80BCCEF8F59127A6D1BB5CFEB534D95')
      .set('x-device-oemId' , 'device OEM A')
      .type('json')
      .send({
        "encryptionCertChain" : [ "483729239...475C864E4F" , "48372949AB93C...826E23564F" ], 
        "encryptionVersion" : "ECIES_v1", 
        "keyID" : "394858302023",
        "deviceType" : "PHONE", 
        "accountIDHash" : "C8645830202EFEB53427A6D75F15C85E78A5195307E2351858349AB9" , 
        "keyData" : { 
          "version" : "ECIES_v1", 
          "ephemeralPublicKey" : "04613197827d91806d630bc4adff44686b012316eb03825f2d6587ffd58d32f17 4522ada80cc93679e1a316dc0729ebf8172fd41f0c0c1bdda01126f1a6186b2a18008",
          "publicKeyHash" : "d6e3bbc95bf11d533677a1aa052d7caef29fd76a02e43e3609579966168d7d1219",
          "data" : "5GRH7/ecb85HFsTalxn3IdeT7ARtfFZn2AuMft1p...IkcchjFBLJTGm9qvJtxK24 /3EdWob+iFS9FwHeKSjq8MxdNgQ1rj4fq6CzQfY8O9"
        }
      })
      .expect(500);
  });

  it(`device type json body field missing will be checked`, () => {
    return request(app.getHttpServer())
      .post('/adk/trackKey')
      .set('x-requestId' , '80BCCEF8F59127A6D1BB5CFEB534D95')
      .set('x-device-oemId' , 'device OEM A')
      .type('json')
      .send({
        "encryptionCertChain" : [ "483729239...475C864E4F" , "48372949AB93C...826E23564F" ], 
        "encryptionVersion" : "ECIES_v1", 
        "keyID" : "394858302023",
        "keyType" : "OWNER | SHARED",
        "accountIDHash" : "C8645830202EFEB53427A6D75F15C85E78A5195307E2351858349AB9" , 
        "keyData" : { 
          "version" : "ECIES_v1", 
          "ephemeralPublicKey" : "04613197827d91806d630bc4adff44686b012316eb03825f2d6587ffd58d32f17 4522ada80cc93679e1a316dc0729ebf8172fd41f0c0c1bdda01126f1a6186b2a18008",
          "publicKeyHash" : "d6e3bbc95bf11d533677a1aa052d7caef29fd76a02e43e3609579966168d7d1219",
          "data" : "5GRH7/ecb85HFsTalxn3IdeT7ARtfFZn2AuMft1p...IkcchjFBLJTGm9qvJtxK24 /3EdWob+iFS9FwHeKSjq8MxdNgQ1rj4fq6CzQfY8O9"
        }
      })
      .expect(500);
  });

  it(`accountIDHash json body field missing will be checked`, () => {
    return request(app.getHttpServer())
      .post('/adk/trackKey')
      .set('x-requestId' , '80BCCEF8F59127A6D1BB5CFEB534D95')
      .set('x-device-oemId' , 'device OEM A')
      .type('json')
      .send({
        "encryptionCertChain" : [ "483729239...475C864E4F" , "48372949AB93C...826E23564F" ], 
        "encryptionVersion" : "ECIES_v1", 
        "keyID" : "394858302023",
        "keyType" : "OWNER | SHARED",
        "deviceType" : "PHONE", 
        "keyData" : { 
          "version" : "ECIES_v1", 
          "ephemeralPublicKey" : "04613197827d91806d630bc4adff44686b012316eb03825f2d6587ffd58d32f17 4522ada80cc93679e1a316dc0729ebf8172fd41f0c0c1bdda01126f1a6186b2a18008",
          "publicKeyHash" : "d6e3bbc95bf11d533677a1aa052d7caef29fd76a02e43e3609579966168d7d1219",
          "data" : "5GRH7/ecb85HFsTalxn3IdeT7ARtfFZn2AuMft1p...IkcchjFBLJTGm9qvJtxK24 /3EdWob+iFS9FwHeKSjq8MxdNgQ1rj4fq6CzQfY8O9"
        }
      })
      .expect(500);
  });

  it(`keyData json body field missing will be checked`, () => {
    return request(app.getHttpServer())
      .post('/adk/trackKey')
      .set('x-requestId' , '80BCCEF8F59127A6D1BB5CFEB534D95')
      .set('x-device-oemId' , 'device OEM A')
      .type('json')
      .send({
        "encryptionCertChain" : [ "483729239...475C864E4F" , "48372949AB93C...826E23564F" ], 
        "encryptionVersion" : "ECIES_v1", 
        "keyID" : "394858302023",
        "keyType" : "OWNER | SHARED",
        "deviceType" : "PHONE", 
        "accountIDHash" : "C8645830202EFEB53427A6D75F15C85E78A5195307E2351858349AB9" 
      })
      .expect(500);
  });

  afterAll(async () => {
    await app.close();
  });

});
