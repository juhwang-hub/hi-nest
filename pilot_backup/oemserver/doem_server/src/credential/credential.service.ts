// manage ecc secp256r1 key 
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

type KeyId = Buffer;
interface KeyPair {
	privateKey : Buffer;
	publicKey : Buffer;
	keyId : Buffer;
}

@Injectable()
export class CredentialService {
	private keyStorage  = new Map<KeyId, KeyPair>();
	private ecdhCtx = crypto.createECDH('prime256v1');

	public generateKeyPair() : KeyId {
		this.ecdhCtx.generateKeys();
		let shaHash = crypto.createHash('sha256');
		let keyId = shaHash.update(this.ecdhCtx.getPublicKey()).digest().slice(0,8);
		let keyPair = {
			privateKey : this.ecdhCtx.getPrivateKey(), 
			publicKey:this.ecdhCtx.getPublicKey(), 
			keyId
		};
		this.keyStorage.set(keyId, keyPair);
		return keyId;
	}

	public getPublicKey(keyId:KeyId) : Buffer {
		return this.keyStorage.get(keyId).publicKey;
	}

	public getPrivateKey(keyId:KeyId) : Buffer {
		return this.keyStorage.get(keyId).privateKey;
	}
}
