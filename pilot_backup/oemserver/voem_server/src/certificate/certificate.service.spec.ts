import { Test, TestingModule } from '@nestjs/testing';
import { CertificateService } from './certificate.service';
import { ACCert, CertType } from '../common/accert';
import * as fs from 'fs';
const pkijs = require('pkijs');

describe('CertificateService', () => {
  let service: CertificateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertificateService],
    }).compile();

    service = module.get<CertificateService>(CertificateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should import der format certificate', () => {
    let certdata : Buffer = fs.readFileSync('test/sample_cert/cert.der');
    let cert = service.importCertificate(certdata);
    expect(cert.rawCert).toBeTruthy();
  });

  it('should import PEM format certificate', () => {
    const sampleCertPem = `-----BEGIN CERTIFICATE-----
    MIIBtjCCAVugAwIBAgIBATAKBggqhkjOPQQDAjAeMRwwCQYDVQQGEwJSVTAPBgNV
    BAMeCABUAGUAcwB0MB4XDTE5MDEzMTE1MDAwMFoXDTIyMDEzMTE1MDAwMFowHjEc
    MAkGA1UEBhMCUlUwDwYDVQQDHggAVABlAHMAdDBZMBMGByqGSM49AgEGCCqGSM49
    AwEHA0IABKW4cZ6FNoeTAauclwfH+DafHlhdfnCDRTxHHaygoxnsxNzKDvUOTbpD
    NC7CVwf//JH9dxwWnklw6EJVvpfT3U+jgYkwgYYwEgYDVR0TAQH/BAgwBgEB/wIB
    AzALBgNVHQ8EBAMCAAYwYwYDVR0lBFwwWgYEVR0lAAYIKwYBBQUHAwEGCCsGAQUF
    BwMCBggrBgEFBQcDAwYIKwYBBQUHAwQGCCsGAQUFBwMIBggrBgEFBQcDCQYKKwYB
    BAGCNwoDAQYKKwYBBAGCNwoDBDAKBggqhkjOPQQDAgNJADBGAiEAyZfqFGq0WJWk
    2q/79CsJmidYK/gffwwY4lI+oK+RXL0CIQCk6yu68+5YNLdq5ZcSNdUSbWdCiwcP
    JK4yWk1ejrWIzw==
    -----END CERTIFICATE-----`;

    let cert = service.importCertificate(sampleCertPem);
    expect(cert).toBeTruthy();
  });

  it('should fill SubjectCommonName of EncryptionKeyCertificate', () => {
    let accert = new ACCert();
    accert.certType = CertType.EncryptionKey;
    service.fillSubjectCommonName(accert);
    let tv = accert.rawCert.subject.typesAndValues;
    console.log(tv);
    expect(accert.rawCert.subject.toJSON()).toBeTruthy();
    expect(accert.getSubjectCommonName()).toBeTruthy();
  });
});
