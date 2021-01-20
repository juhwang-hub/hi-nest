import { Injectable , Logger } from '@nestjs/common';
import * as crypto from "crypto";
import * as fs from 'fs';
import { isNull } from 'util';
import { stringLiteral } from '@babel/types';
import * as rs from 'jsrsasign';

@Injectable()
export class CryptoService {
	///////////////////////////////////////////////////
	// 				  ECIES암복호화 API 		       //
	///////////////////////////////////////////////////
	// CCC Digital Key Release 2.0 17.11.2 Encryption Process
	// 1. Generate sender's ephemeral EC keypair on named curve ephemeral for the message. secp256r1 and its OID 1.2.840.10045.3.1.7
	// 2. Using recipient's encryption public key and the ephemeral private key, generate the shared secret using Elliptic Curve Diffie-Hellman key agreement algorithm with OID 1.3.132.1.12.
	// 3. Derive the symmetric key as described in Key Derivation Function (see Section 17.11.4)
	// 4. Derive the initialization vector for symmetric encryption as described in initialization vector derivation (see Section 17.11.6)
	// 5. Encrypt data using all 128 bits of the derived symmetric key, using AES–128 id-aes128-GCM with its OID 2.16.840.1.101.3.4.1.6, with no-padding, the initialization vector and no associated authentication data. The 16 bytes GCM authentication tag shall be ap-pended to the cipher text.
	public async encrypt(recvPubKey: Buffer, msg: Buffer): Promise<[Buffer, Buffer, Buffer]> {
		let ecdhCtx = crypto.createECDH('prime256v1'); // prime256v1 is secp256r1
		let senderPubKey = ecdhCtx.generateKeys();
	
		// step 2.
		let sharedSecret = ecdhCtx.computeSecret(recvPubKey);
	
		// step 3
		let sharedInfo = senderPubKey.toString('hex') + recvPubKey.toString('hex');
	
		let shaHash = crypto.createHash('sha256');
		let counter = Buffer.from('00000001', 'hex');
		let keyingMaterial = shaHash.update(Buffer.concat([sharedSecret , counter , Buffer.from(sharedInfo, 'hex')])).digest();
		let encryptionkey = keyingMaterial.slice(0,16);
		let iv = keyingMaterial.slice(16,32);
		let aesGcm = crypto.createCipheriv('aes-128-gcm', encryptionkey, iv);
		let encrypted = aesGcm.update(msg);
		encrypted = Buffer.concat([encrypted, aesGcm.final()]);
		encrypted = Buffer.concat([encrypted, aesGcm.getAuthTag()]);
		shaHash = crypto.createHash('sha256');
		let PKFingerprint = shaHash.update(recvPubKey).digest();
		return [encrypted, PKFingerprint, senderPubKey];
	}

	public async decrypt(recvPrivKey: Buffer, recvPubKey:Buffer, senderPubKey: Buffer, encrypted:Buffer): Promise<Buffer> {
		let ecdhCtx = crypto.createECDH('prime256v1'); // prime256v1 is secp256r1
		ecdhCtx.setPrivateKey(recvPrivKey); 
		// step 2.
    	let sharedSecret = ecdhCtx.computeSecret(senderPubKey); 
    	// step 3
    	let sharedInfo = senderPubKey.toString('hex') + recvPubKey.toString('hex');
    	let shaHash = crypto.createHash('sha256');
		let counter = Buffer.from('00000001', 'hex'); 
    	let keyingMaterial = shaHash.update(Buffer.concat([sharedSecret , counter , Buffer.from(sharedInfo, 'hex')])).digest(); 
    	let encryptionkey = keyingMaterial.slice(0,16);
    	let iv = keyingMaterial.slice(16,32);
		let decihperGcm = crypto.createDecipheriv('aes-128-gcm', encryptionkey, iv);

		decihperGcm.setAuthTag(encrypted.slice(encrypted.length - 16, encrypted.length));
		let decrypted = decihperGcm.update(encrypted.slice(0, encrypted.length -16));
    	decrypted = Buffer.concat([decrypted, decihperGcm.final()]);
		return decrypted;
	}

	public async decryptEncData(recvPrivKey: string, recvPubKey:string, senderPubKey: string, PKFingerprint : string, encrypted:string) : Promise<string> {
		// 1. check fingerprint
		let shaHash = crypto.createHash('sha256');
		let hashedReciptPK = shaHash.update(Buffer.from(recvPubKey, 'hex')).digest();  
		if(PKFingerprint != hashedReciptPK.toString('hex')){ 
			console.log('여긴안오지?');
			return 'fail';
		}
		// 값이 일치하면 복호화 진행   
		let decrypted : string;
		await this.decrypt(Buffer.from(recvPrivKey, 'hex'), Buffer.from(recvPubKey, 'hex'), Buffer.from(senderPubKey, 'hex'), Buffer.from(encrypted, 'hex')).then(function(resolvedData){
			decrypted = resolvedData.toString();
		}).catch(function(error){
			Logger.error("[EncData decryption] : The decryption process is failed");
			console.log(error);
			let obj = {'version':'failed'};
			decrypted = JSON.stringify(obj);
		});  
		return  decrypted;
	}
  // recvPubKey: Buffer, msg: Buffer
	async createEncDataContainer(recvPubKey : string, senderPubKey : string, msg : string): Promise<string> { 
		let recvPubKeyBuffer = Buffer.from(recvPubKey, 'hex');
		let msgBuffer		 = Buffer.from(msg);
		let encryptObj 		 = await this.encrypt(recvPubKeyBuffer, msgBuffer); 
		let shaHash = crypto.createHash('sha256');
		let publicKeyHash 	 = shaHash.update(Buffer.concat([Buffer.from(senderPubKey, 'hex'), Buffer.from(recvPubKey, 'hex')])).digest();
		shaHash = crypto.createHash('sha256');
		publicKeyHash = shaHash.update(Buffer.from(recvPubKey, 'hex')).digest();  
		let result = {'version':'ECIES_v1', 'ephemeralPublicKey': encryptObj[2].toString('hex'), 'publicKeyHash' : publicKeyHash.toString('hex'), 'data': encryptObj[0].toString('hex')};
		let resultString = JSON.stringify(result); 
		return resultString;
	}

	
	///////////////////////////////////////////////////
	// 			   	Verifier 생성 API     			  //
	///////////////////////////////////////////////////
	public async genVerifier(recvPassword: Buffer, recvSalt:Buffer, recv_N:number, recv_r:number, recv_p:number) { 
		// if maxmem is smaller than N * r* p, then scryptSync will return an error
		let derivedKey = await crypto.scryptSync(recvPassword, recvSalt, 80, { N:recv_N, r:recv_r, p:recv_p, maxmem : 1024 * 1024 * 1024}); 
		let z0_bn      = BigInt('0x' + derivedKey.subarray(0, 40).toString('hex'));
		let z1_bn      = BigInt('0x' + derivedKey.subarray(40, 80).toString('hex'));
		let n_1        = BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632550"); 
		let w0_bn      = z0_bn % n_1 + BigInt(1);
		let w1_bn      = z1_bn % n_1 + BigInt(1);  
		let ecdhCtx    = crypto.createECDH('prime256v1'); 
		ecdhCtx.setPrivateKey(Buffer.from(w1_bn.toString(16), 'hex'));
		let w0         = w0_bn.toString(16);
		let L          = ecdhCtx.getPublicKey().toString('hex'); 
		let resultJSON = {"w0":w0, "L":L, "salt":recvSalt};
		let result     = JSON.stringify(resultJSON);
		return result;
	} 

	///////////////////////////////////////////////////
	// 				인증서 체인 관련 API				 //
	///////////////////////////////////////////////////
	/*
		CertificateVerification(PemCert)
	*/
	public async verifyCert(cert, issuerCert) : Promise<boolean> { 
         let parentCert = new rs.X509();
         parentCert.readCertPEM(issuerCert);
         let rootPK = await parentCert.getPublicKey();

         let subCert = new rs.X509();
         subCert.readCertPEM(cert);
         let verifyResult = await subCert.verifySignature(rootPK);
  
        return verifyResult;
	}
	
	/*
		CertificateVerification(Der Encoded Cert)
	*/
	public async verifyDerCert(cert, issuerCert) : Promise<boolean> {
		let parentCert = new rs.X509();
         parentCert.readCertHex(issuerCert);
         let rootPK = await parentCert.getPublicKey();

         let subCert = new rs.X509();
         subCert.readCertHex(cert);
		 let verifyResult = await subCert.verifySignature(rootPK); 
		 return verifyResult;
	}


	public async getValidTime(cert) {
		let certificate = new rs.X509();
		certificate.readCertPEM(cert);
		let keyValidFrom = certificate.getNotBefore(); 
		let keyValidFrom2 = '20' 
						+ keyValidFrom.substring(0,2) + '-' 
						+ keyValidFrom.substring(2,4) + '-' 
						+ keyValidFrom.substring(4,6) + 'T' 
						+ keyValidFrom.substring(6,8) + ':' 
						+ keyValidFrom.substring(8,10) + ':' 
						+ keyValidFrom.substring(10,12) + ':' 
						+ keyValidFrom.substring(12)
		let keyValildTo  = certificate.getNotAfter();
		let keyValidTo2 = '20'
						+ keyValildTo.substring(0,2) + '-' 
						+ keyValildTo.substring(2,4) + '-' 
						+ keyValildTo.substring(4,6) + 'T' 
						+ keyValildTo.substring(6,8) + ':' 
						+ keyValildTo.substring(8,10) + ':' 
						+ keyValildTo.substring(10,12) + ':' 
						+ keyValildTo.substring(12)
		let result = {'keyValidFrom': keyValidFrom2, 'keyValildTo' : keyValidTo2};
		return result;
	}

	public async getDerCertValidTime(cert) {
		let certificate = new rs.X509();
		certificate.readCertHex(cert);
		let keyValidFrom = certificate.getNotBefore(); 
		let keyValidFrom2 = '20' 
						+ keyValidFrom.substring(0,2) + '-' 
						+ keyValidFrom.substring(2,4) + '-' 
						+ keyValidFrom.substring(4,6) + 'T' 
						+ keyValidFrom.substring(6,8) + ':' 
						+ keyValidFrom.substring(8,10) + ':' 
						+ keyValidFrom.substring(10,12) + ':' 
						+ keyValidFrom.substring(12)
		let keyValildTo  = certificate.getNotAfter();
		let keyValidTo2 = '20'
						+ keyValildTo.substring(0,2) + '-' 
						+ keyValildTo.substring(2,4) + '-' 
						+ keyValildTo.substring(4,6) + 'T' 
						+ keyValildTo.substring(6,8) + ':' 
						+ keyValildTo.substring(8,10) + ':' 
						+ keyValildTo.substring(10,12) + ':' 
						+ keyValildTo.substring(12)
		let result = {'keyValidFrom': keyValidFrom2, 'keyValildTo' : keyValidTo2};
		return result;
	}
	 
	public async getPubKey(cert){
		let certificate = new rs.X509();
		certificate.readCertPEM(cert);
		let pubKey = certificate.getPublicKey();

		return pubKey;
	}
	public async getDerCertPubKey(cert){
		let certificate = new rs.X509();
		certificate.readCertHex(cert);
		let pubKey = certificate.getPublicKey();

		return pubKey;
	}
	///////////////////////////////////////////////////
	// 				ECDSA 전자서명 관련 API  			//
	//      		ECDSA with SHA256                //
	/////////////////////////////////////////////////// 
	public async doSign(msg : string, privKey : string) : Promise<string> {
		let ec = new rs.crypto.ECDSA({'curve': 'secp256r1'});
		let hash = rs.crypto.Util.sha256(msg);
		let sigValue = ec.signHex(hash, privKey);
		let signature = rs.crypto.ECDSA.asn1SigToConcatSig(sigValue); 
		return signature; 
	}	

	public async doVerify(msg : string, sig : string, pubKey : string) : Promise<boolean>{
		let ec = new rs.crypto.ECDSA({'curve': 'secp256r1'});
		let hash = rs.crypto.Util.sha256(msg);
		let verValue = ec.verifyHex(hash, rs.crypto.ECDSA.biRSSigToASN1Sig(sig.substring(0,64), sig.substring(64,128)), pubKey); 
		return verValue;
	} 
}

	 	