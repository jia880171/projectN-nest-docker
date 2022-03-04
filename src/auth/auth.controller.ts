import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { QueryFailedExceptionFilter } from 'src/filters/typeOrmError.filter';
import { AuthGuard } from '@nestjs/passport';
import { Req } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UseFilters(QueryFailedExceptionFilter)
  sighUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.singIn(authCredentialDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard('myJwt'))
  test2(@Req() req) {
    console.log('======req: ', req);
  }
}
