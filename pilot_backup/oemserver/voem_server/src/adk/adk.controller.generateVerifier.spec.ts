import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AdkController } from './adk.controller';
import { INestApplication } from '@nestjs/common';

describe('Adk Controller POST generateVerifier', () => {
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
  // genenrateVerifier TEST
  ////////////////////////////////////////////////////////////////////////////////////
  it(`param check will be successful`, () => {
    return request(app.getHttpServer())
      .post('/adk/generateVerifier')
      .set('x-requestId' , '80BCCEF8F59127A6D1BB5CFEB534D95') 
      .type('json')
      .send({
        "x-voem-UserId" : "autocrypt123"
      })
      .expect(200)
      .expect('pleaseletmein');
  });

  it(`param check will be failed with empty body`, () => {
    return request(app.getHttpServer())
      .post('/adk/generateVerifier')
      .set('x-requestId' , '80BCCEF8F59127A6D1BB5CFEB534D95') 
      .type('json')
      .send({ 
      })
      .expect(500);
  }); 
   
  
  

  afterAll(async () => {
    await app.close();
  });

});
