import { Injectable } from '@nestjs/common';
import jwt from "supertokens-node/recipe/jwt";
import { JwtHeader, SigningKeyCallback, verify } from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

@Injectable()
export class AppService {

  async generateToken(payload: any)  {
    let jwtResposne = await jwt.createJWT({
      ...payload,
      source: "microservice"
    });
    if (jwtResposne.status === "OK") {
      // Send JWT as Authorization header to M2
      return jwtResposne.jwt;
    }
    throw new Error("Unable to create JWT. Should never come here.")
  }

  verifyToken(accessToken: string) {
    return new Promise(function(resolve) {
      function getKey(header: JwtHeader, callback: SigningKeyCallback) {
        const client = jwksClient({
          jwksUri: 'http://localhost:3001/auth/jwt/jwks.json'
        });
        client.getSigningKey(header.kid, function (err, key) {
          var signingKey = key!.getPublicKey();
          callback(err, signingKey);
        });
      }
      verify(accessToken, getKey, {}, function (err, decoded) {
        return resolve(decoded);
      });
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
