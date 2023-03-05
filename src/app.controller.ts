import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/sessioninfo')
  @UseGuards(new AuthGuard())
  getSessionInformation(@Session() session: SessionContainer): any {
    return {
      sessionHandle: session.getHandle(),
      userId: session.getUserId(),
      accessTokenPayload: session.getAccessTokenPayload(),
    };
  }

  @Post('generateToken')
  async generateToken(@Body() body: any) {
    let token = await this.appService.generateToken(body);
    return { accessToken: token };
  }

  @Post('verifyToken')
 async verifyToken(@Body() body: any) {
    return await this.appService.verifyToken(body.accessToken);
  }

  getUserInfo() {
    // let userInfo = 
  }
}
