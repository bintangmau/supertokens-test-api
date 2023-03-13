import { Controller, Post, Req, UseGuards, Get, Body } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Session } from 'src/auth/session.decorator';
import { LocalAuthService } from "./local-auth.service";

@Controller('local-auth')
export class LocalAuthController {
  
  constructor(
    private readonly localAuthService: LocalAuthService
  ) {}

  @Post('test-verify')
  @UseGuards(new AuthGuard())
  async testVerify(@Req() req: any) {
    let session = req.session;
    return session;
  }

  @Post('signin')
  async signIn(@Body() body: any) {
    return await this.localAuthService.login(
      body.email,
      body.password
    );
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
}