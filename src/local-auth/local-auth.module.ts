import { Module } from '@nestjs/common';
import { LocalAuthController } from './local-auth.controller';
import { LocalAuthCore } from './local-auth.core';
import { LocalAuthService } from './local-auth.service';

@Module({
  providers: [LocalAuthService, LocalAuthCore],
  controllers: [LocalAuthController],
})
export class LocalAuthModule {}
