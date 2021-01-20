import { Test, TestingModule } from '@nestjs/testing';
import { CredentialService } from './credential.service';

describe('CredentialService', () => {
  let service: CredentialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CredentialService],
    }).compile();

    service = module.get<CredentialService>(CredentialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('generateKeyPair should create key', () => {
    let keyId = service.generateKeyPair();
    let pubKey = service.getPublicKey(keyId);
    expect(pubKey).toBeInstanceOf(Buffer);
    let privKey = service.getPrivateKey(keyId);
    expect(privKey).toBeInstanceOf(Buffer);
  });

});
