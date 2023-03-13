import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import * as SuperTokensConfig from './config';
import { LocalAuthModule } from './local-auth/local-auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule.forRoot({
      // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: SuperTokensConfig.connectionUri,
      // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
      appInfo: SuperTokensConfig.appInfo,
    }),
    UsersModule,
    LocalAuthModule,
    PrismaModule,
  ]
})
export class AppModule {}
