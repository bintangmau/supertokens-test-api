import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';
import { middleware } from 'supertokens-node/framework/express';
import { AuthPath } from './enums/auth-path.enum';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);
  supertokensMiddleware: any;

  constructor(
    private readonly usersService: UsersService
  ) {
    this.supertokensMiddleware = middleware();
  }

  async use(req: any, res: any, next: NextFunction) {
    let apiPath = req.params ? req.params['0'] : null;
    
    if(apiPath === AuthPath.SIGN_UP || apiPath === AuthPath.SIGN_IN) {
      let payload: any[] = req.body ? req.body.formFields : {};
      let payloadObj: any = {
        email: null,
        password: null,
        username: null
      };
      for(let formField of payload) {
        payloadObj[formField['id']] = formField.value;
      }
      
      let email = payloadObj.email;
      let password = payloadObj.password;;
      let username = payloadObj.username;
      
      let userSt = await this.usersService.getUserFromST(email);
      let userId = userSt ? userSt.id : null;
      let user: User;
      if(userId) {
        user = await this.usersService.findOne({
          authUserId: userId
        });
      } else {
        user = await this.usersService.findOne({
          email
        });
      }
      if(!user) {
        this.logger.log(`User ${email} not exist. Registering ...`);
        const saltRounds = 10;
        let hashed = await bcrypt.hash(password, saltRounds);
        let created: Prisma.UserCreateInput = {
          email,
          password: hashed,
          username,
          authUserId: null,
        };
        if(userId) {
          created.authUserId = userId;
        }
        await this.usersService.create(created);
        this.logger.log(`User ${email} register successfully`);
        return this.supertokensMiddleware(req, res, next);
      }


    }
    
    return this.supertokensMiddleware(req, res, next);
  }
}
