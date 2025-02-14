'use strict';

import { TokenPayload } from '../types';
import config from '../config';
import jwt from 'jsonwebtoken';

export async function __validateAuthToken(
  token: string
): Promise<TokenPayload> {
  return new Promise(function (resolve, reject) {
    jwt.verify(
      token,
      Buffer.from(config.auth.secret || "", 'base64'),
      { ignoreNotBefore: true },
      function (err, payload) {
        if (err) reject(new Error('AuthorizationExpired'));
        resolve(payload as TokenPayload);
      }
    );
  });
}

export async function __generateAuthToken(
  payload: TokenPayload
): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      Buffer.from(config.auth.secret || "", "base64"),
      {
        audience: config.app.name,
        issuer: config.app.name,
      },
      (err, token) => {
        if (err) reject(err);
        else resolve(token as string);
      }
    );
  });
}


export async function __generateToken(payload: TokenPayload): Promise<string> {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      payload,
      Buffer.from(config.auth.secret || "", 'base64'),
      {
        audience: config.app.name,
        issuer: config.app.name
      },
      function (err, token) {
        if (err) reject(err);
        resolve(token as string);
      }
    );
  });
}

export default {
  __validateAuthToken,
  __generateAuthToken,
  __generateToken
};
