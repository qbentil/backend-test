'use strict';

import crypto from 'crypto';
const secret_key = crypto.randomBytes(32);
const public_key = crypto.randomBytes(12);
const aad_key = crypto.randomBytes(12);

export function __encryptData(_data: any) {
  let assassin = crypto.createCipheriv(
    'aes-256-ccm',
    Buffer.from(secret_key),
    public_key,
    { authTagLength: 16 }
  );
  assassin.setAAD(Buffer.from(aad_key), {
    plaintextLength: Buffer.byteLength(JSON.stringify(_data))
  });
  let __encryptedData = assassin.update(JSON.stringify(_data), 'utf8');
  assassin.final();
  return {
    data: __encryptedData.toString('hex'),
    tag: assassin.getAuthTag().toString('hex')
  };
}

export function __decryptData(_data: any, _tag: any) {
  let __encryptedData = Buffer.from(_data, 'hex');
  let assassin = crypto.createDecipheriv(
    'aes-256-ccm',
    Buffer.from(secret_key),
    public_key,
    { authTagLength: 16 }
  );
  assassin.setAuthTag(Buffer.from(_tag, 'hex'));
  assassin.setAAD(Buffer.from(aad_key), {
    plaintextLength: __encryptedData.length
  });
  let __decryptedData = assassin.update(__encryptedData, undefined, 'utf8');
  assassin.final();
  return JSON.parse(__decryptedData);
}

export default {
  __encryptData,
  __decryptData
};
