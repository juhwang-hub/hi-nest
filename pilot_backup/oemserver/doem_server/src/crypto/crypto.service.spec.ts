import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';
import * as crypto from 'crypto';
import { async } from 'rxjs';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });
 

  // CCC Digital Key Release 2.0 17.11.2 Encryption Process
	// 1. Generate sender's ephemeral EC keypair on named curve ephemeral for the message. secp256r1 and its OID 1.2.840.10045.3.1.7
	// 2. Using recipient's encryption public key and the ephemeral private key, generate the shared secret using Elliptic Curve Diffie-Hellman key agreement algorithm with OID 1.3.132.1.12.
	// 3. Derive the symmetric key as described in Key Derivation Function (see Section 17.11.4)
	// 4. Derive the initialization vector for symmetric encryption as described in initialization vector derivation (see Section 17.11.6)
	// 5. Encrypt data using all 128 bits of the derived symmetric key, using AES–128 id-aes128-GCM with its OID 2.16.840.1.101.3.4.1.6, with no-padding, the initialization vector and no associated authentication data. The 16 bytes GCM authentication tag shall be ap-pended to the cipher text.
  it('should encrypt decrypt as 2.0 spec', async () => {
    // Sender Key Agreement Key
    const senderPrivateKeyHex = "53994c02ca9f6d1afbda1742f43d3c17dedfaf3367727208fe9ccc50a33824a0";
    // 0x04|x|y
    const senderPublicKeyHex = "0474542541492424edc34f33ba94e61bf718f33ca393d1bf0816f156e4a266873f59564aad1a95c9fd8971b527171784e390d9137d037fe2ae30490b1ed1d73aa3";
    // Receiver Key Agreement Key
    const recvPrivateKeyHex = "6c300cac339b4c7084e34175e2e6f5e1d1b135d158bd578c2b1af870facaef17";
   // const recvPrivateKeyHex = "6c300cac339b4c7084e34175e2e6f5e1d1b135d158bd578c2b1af870facaef11";
    const recvPublicKeyHex = "04ad2d126c3f8f85bf5796f6ab849b57a35133fed491eced0254ed6a1169d9281f98018f1aa71d222874d72f47b0b28d84dacb8801b96e815c06f1151210cc7090";
   // const recvPublicKeyHex = "04ad2d126c3f8f85bf5796f6ab849b57a35133fed491eced0254ed6a1169d9281f98018f1aa71d222874d72f47b0b28d84dacb8801b96e815c06f1151210cc7090";
    const recvPublicKeyHashHex = "ac0095a2121357c69d64213137973222d9873bc80dbcc6ea044d6db3ec5bfbcb";
    const testMsg = '{ "id": "Hello", "value": "World" }';

    // console.log(crypto.getCurves());
    let ecdhCtx = crypto.createECDH('prime256v1'); // prime256v1 is secp256r1
		ecdhCtx.setPrivateKey(senderPrivateKeyHex, 'hex');

		// step 2.
    let sharedSecret = ecdhCtx.computeSecret(recvPublicKeyHex, 'hex', 'hex');
    expect(sharedSecret == 'a6c3021dc18ad03959768250e872818585264fbdd1b6de6ed32a7eb16f19f858').toBeTruthy();

    // step 3
    let sharedInfo = senderPublicKeyHex + recvPublicKeyHex;
    //console.log(sharedInfo);
    expect(sharedInfo == '0474542541492424edc34f33ba94e61b' +
                          'f718f33ca393d1bf0816f156e4a26687' +
                          '3f59564aad1a95c9fd8971b527171784' +
                          'e390d9137d037fe2ae30490b1ed1d73a' +
                          'a304ad2d126c3f8f85bf5796f6ab849b' +
                          '57a35133fed491eced0254ed6a1169d9' +
                          '281f98018f1aa71d222874d72f47b0b2' +
                          '8d84dacb8801b96e815c06f1151210cc7090').toBeTruthy();

    let shaHash = crypto.createHash('sha256');
    let counter = Buffer.from('00000001', 'hex');
    let keyingMaterial = shaHash.update(Buffer.concat([Buffer.from(sharedSecret, 'hex') , counter , Buffer.from(sharedInfo, 'hex')])).digest();
   
    expect(keyingMaterial.toString('hex') == '58a5f8b53ff010a62eb2e98303f7d2d088b35fa8b758797777dbafa81df3bc9f').toBeTruthy();
    let encryptionkey = keyingMaterial.slice(0,16);
    expect(encryptionkey.toString('hex') == '58a5f8b53ff010a62eb2e98303f7d2d0').toBeTruthy();
    let iv = keyingMaterial.slice(16,32);
    expect(iv.toString('hex') == '88b35fa8b758797777dbafa81df3bc9f').toBeTruthy();
    let aesGcm = crypto.createCipheriv('aes-128-gcm', encryptionkey, iv);
    let encrypted = aesGcm.update(testMsg);
    encrypted = Buffer.concat([encrypted, aesGcm.final()]);
    encrypted = Buffer.concat([encrypted, aesGcm.getAuthTag()]);
    expect(encrypted.toString('hex') == '46e9fbeb564e5eba68c094da08172bac8299bd268749763224dea8a59313d548963dafbc3dcc7ea206646edeb4469e5d6eed38').toBeTruthy();
  
    // decrypt
    ecdhCtx = crypto.createECDH('prime256v1'); // prime256v1 is secp256r1
		ecdhCtx.setPrivateKey(recvPrivateKeyHex, 'hex');

		// step 2.
    sharedSecret = ecdhCtx.computeSecret(senderPublicKeyHex, 'hex', 'hex');
    expect(sharedSecret == 'a6c3021dc18ad03959768250e872818585264fbdd1b6de6ed32a7eb16f19f858').toBeTruthy();

    // step 3
    sharedInfo = senderPublicKeyHex + recvPublicKeyHex;
    //console.log(sharedInfo);
    expect(sharedInfo == '0474542541492424edc34f33ba94e61b' +
                          'f718f33ca393d1bf0816f156e4a26687' +
                          '3f59564aad1a95c9fd8971b527171784' +
                          'e390d9137d037fe2ae30490b1ed1d73a' +
                          'a304ad2d126c3f8f85bf5796f6ab849b' +
                          '57a35133fed491eced0254ed6a1169d9' +
                          '281f98018f1aa71d222874d72f47b0b2' +
                          '8d84dacb8801b96e815c06f1151210cc7090').toBeTruthy();

    shaHash = crypto.createHash('sha256');
    counter = Buffer.from('00000001', 'hex');
    keyingMaterial = shaHash.update(Buffer.concat([Buffer.from(sharedSecret, 'hex') , counter , Buffer.from(sharedInfo, 'hex')])).digest();
   
    expect(keyingMaterial.toString('hex') == '58a5f8b53ff010a62eb2e98303f7d2d088b35fa8b758797777dbafa81df3bc9f').toBeTruthy();
    encryptionkey = keyingMaterial.slice(0,16);
    expect(encryptionkey.toString('hex') == '58a5f8b53ff010a62eb2e98303f7d2d0').toBeTruthy();
    iv = keyingMaterial.slice(16,32);
    expect(iv.toString('hex') == '88b35fa8b758797777dbafa81df3bc9f').toBeTruthy();
    let decihperGcm = crypto.createDecipheriv('aes-128-gcm', encryptionkey, iv);

    decihperGcm.setAuthTag(encrypted.slice(encrypted.length - 16, encrypted.length));
    
    let decrypted = decihperGcm.update(encrypted.slice(0, encrypted.length -16));
    decrypted = Buffer.concat([decrypted, decihperGcm.final()]);
    
    expect(decrypted.toString('utf8') == '{ "id": "Hello", "value": "World" }').toBeTruthy(); 
  });

  // it('should encrypt decrypt using crypto service', async () => {
  //   const testMsg = '{ "id": "Hello", "value": "World" }';
  //   let ecdhCtx = crypto.createECDH('prime256v1');
  //   ecdhCtx.generateKeys();
  //   let [encrypted, ephePubKey] = await service.encrypt(ecdhCtx.getPublicKey(), Buffer.from(testMsg));
  //   let decrypted = await service.decrypt(ecdhCtx.getPrivateKey(), ecdhCtx.getPublicKey(), ephePubKey, encrypted);
  //   expect(decrypted.toString() == testMsg).toBeTruthy();
  // });

  it('genVerifier Test', async () => {
    const password = Buffer.from('pleaseletmein');
    const salt     = Buffer.from('yellowsubmarines');
    let resultString = await service.genVerifier(password, salt, 32768, 8, 1);
    let result = JSON.parse(resultString);
    expect(result.w0   === 'e433ab43428320b24fab82f915d1db114acd72f8a4bf4fbf3c712b94bcc2f013');
    expect(result.L    === '04ff69eb6086938b3cce2c9e64dcacea1a925918e75e8c17948d316322d370123f69132aed7398919e6e6614f7627b0a54060c5a8c0d93d2754166ab10fea6a8ff');
    expect(result.salt === Buffer.from('yellowsubmarines'));
  }); 

//////////////////////////////////
// Cert Chain Verification Test
//////////////////////////////////

/*
  1. PemCert verification Test
*/

  it('certificate Pem verification Test', async () => { 
    let rootCert = "-----BEGIN CERTIFICATE-----" +
    "MIIBUTCB96ADAgECAgEEMAoGCCqGSM49BAMCMCExCzAJBgNVBAYTAlVTMRIwEAYD" +
    "VQQKDAlBdXRvQ3J5cHQwHhcNMTMwNTA0MjM1OTU5WhcNMjIwNTA0MjM1OTU5WjAh" +
    "MQswCQYDVQQGEwJVUzESMBAGA1UECgwJQXV0b0NyeXB0MFkwEwYHKoZIzj0CAQYI" +
    "KoZIzj0DAQcDQgAEeMwRFhw/imVCaHJejc9dZj+LvMd/J572ItGxgHhNLQNOqauq" +
    "oxUGoscaobUloMI3ulBkv+1KyLJYgmP5UR3nMqMgMB4wDwYDVR0TAQH/BAUwAwEB" +
    "/zALBgNVHQ8EBAMCBsAwCgYIKoZIzj0EAwIDSQAwRgIhAK7rSe/C7XR3/21eJ3JM" +
    "ZxxenyhvPaVp6Ftewi4j6xpAAiEA6Tz0ImnaPD47a6KHdhswajwDLLBFFA5Pddlr" +
    "cJkYCRs=" +
    "-----END CERTIFICATE-----";
    let cert = "-----BEGIN CERTIFICATE-----" +
    "MIIBTTCB86ADAgECAgEFMAoGCCqGSM49BAMCMCExCzAJBgNVBAYTAlVTMRIwEAYD" +
    "VQQKDAlBdXRvQ3J5cHQwHhcNMTMwNTA0MjM1OTU5WhcNMjIwNTA0MjM1OTU5WjAd" +
    "MQswCQYDVQQGEwJVUzEOMAwGA1UECgwFUGVudGEwWTATBgcqhkjOPQIBBggqhkjO" +
    "PQMBBwNCAAQd87arIig6yz4v1BnKzJW+TBPWVzevbOa4/G5fOQN9GRiAppodcVuA" +
    "7U1TD/wXr0oOLqmFID7otNkVw5+ocM7RoyAwHjAPBgNVHRMBAf8EBTADAQH/MAsG" +
    "A1UdDwQEAwIGwDAKBggqhkjOPQQDAgNJADBGAiEAxrz37FoLRvWyAlL1Oc+Cg87v" +
    "88B1Aym7rcWQGxZg7uwCIQCnQ3Asq/jC/vGf0bChx367z/3nsMtmM2qWt8UbubHQ" +
    "jQ==" +
    "-----END CERTIFICATE-----";
    let result1 = await service.verifyCert(cert, rootCert);
    let result2 = await service.verifyCert(rootCert, rootCert);
    let result3 = await service.verifyCert(cert, cert);
    expect(result1   === true);
    expect(result2   === true);
    expect(result3   === false);
     
  }); 

  /*
    2. DerCert verification Test
  */ 
  it('certificate Pem verification Test', async () => {
    let upperCert = "3082020d308201b4a003020102020101300a06082a8648ce3d" + 
    "0403023052310b3009060355040613024b5231123010060355040a0c094175746f" + 
    "437279707431143012060355040b0c0b4d6f62696c697479526e44311930170603" +
    "5504030c1050494c4f542e44657669636552434132301e170d3230303732323031" +
    "333235375a170d3330303732323031333235375a3052310b300906035504061302" +
    "4b5231123010060355040a0c094175746f437279707431143012060355040b0c0b" +
    "4d6f62696c697479526e443119301706035504030c1050494c4f542e4465766963" +
    "65524341323059301306072a8648ce3d020106082a8648ce3d0301070342000425" +
    "7046e96bbc14a1055ac99cbfae8ecb95c8672a440ba9636e524cc41f4b8e5f5232" +
    "44b4bc30ad810b812a4f4d957a2e3fc808c0f40cc284338cc9fde4967e4da37b30" +
    "79301f0603551d230418301680144cdb48003524e6f4ddb6aa0d08c817e8a10237" +
    "8c301d0603551d0e041604144cdb48003524e6f4ddb6aa0d08c817e8a102378c30" +
    "16060a2b0601040182c46905090101ff04053003020103300e0603551d0f0101ff" +
    "040403020106300f0603551d130101ff040530030101ff300a06082a8648ce3d04" +
    "030203470030440220057b8d04cf31ca5ab3751780fc68004f1b327d665a8b409a" +
    "be67e0508a57174d0220513ba9393ab8d296c01bc8a94a91cf937e1dc34747957a" +
    "6233f040c0f8b9ad6a";
    let lowerCert = "308202793082021ea003020102020102300a06082a8648ce3d" +
    "0403023052310b3009060355040613024b5231123010060355040a0c094175746f" +
    "437279707431143012060355040b0c0b4d6f62696c697479526e44311930170603" +
    "5504030c1050494c4f542e44657669636552434132301e170d3230303732323031" +
    "333630365a170d3330303732323031333630365a305c310b300906035504061302" +
    "4b5231123010060355040a0c094175746f437279707431143012060355040b0c0b" +
    "4d6f62696c697479526e443123302106035504030c1a494e53542e4155544f2e38" +
    "3836413635394330454642363436333059301306072a8648ce3d020106082a8648" +
    "ce3d0301070342000466cb8914f3b187759d6793a55da38f72f73248d0ca10ff94" +
    "acd77df9a8eb23b90df9f7c26e3ffaed3805219be12371af682957f7f6d58f879d" +
    "31af6bcd152831a381da3081d7307a0603551d230473307180144cdb48003524e6" +
    "f4ddb6aa0d08c817e8a102378ca156a4543052310b3009060355040613024b5231" +
    "123010060355040a0c094175746f437279707431143012060355040b0c0b4d6f62" +
    "696c697479526e443119301706035504030c1050494c4f542e4465766963655243" +
    "4132820101301d0603551d0e041604149dc1b2a9254364d54ffcb25cc357b08c6b" +
    "ae9bf13016060a2b0601040182c46905080101ff04053003020103300e0603551d" +
    "0f0101ff04040302010630120603551d130101ff040830060101ff020100300a06" +
    "082a8648ce3d04030203490030460221009e2a0830eec833592fe7dfb5fca0fb91" +
    "a2e6df3176283af30a23fbbb85bf12a7022100c866207876ab584e8fd6f1947c74" +
    "c2e795e4f205f5cf79c93c5b1ae9ca195bfe";
    let result1 = await service.verifyDerCert(lowerCert, upperCert);
    let result2 = await service.verifyDerCert(upperCert, upperCert);
    let result3 = await service.verifyDerCert(lowerCert, lowerCert);
    expect(result1   === true);
    expect(result2   === true);
    expect(result3   === false);
  });
});

 