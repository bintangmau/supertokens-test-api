import { Injectable } from "@nestjs/common";
import { emailPasswordSignIn as stSignIn } from "supertokens-node/recipe/thirdpartyemailpassword";

@Injectable()
export class LocalAuthService {

  async login(
    email: string,
    password: string
  ) {
    let response: any = await stSignIn(
      email,
      password,
    );

    return response;
  }

}