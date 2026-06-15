import { Controller, Post, Body, UseGuards, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService, TokenPair } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../entities/user.entity';
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  accessTokenCookieOptions,
  authCookieOptions,
  refreshTokenCookieOptions,
} from './cookie-options';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.register(dto);
    this.setAuthCookies(response, result);

    return result;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login and receive access + refresh tokens' })
  @ApiBody({ type: LoginDto })
  async login(@CurrentUser() user: User, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.login(user);
    this.setAuthCookies(response, result);

    return result;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Invalidate the current refresh token' })
  async logout(@CurrentUser('id') userId: string, @Res({ passthrough: true }) response: Response) {
    await this.authService.logout(userId);
    this.clearAuthCookies(response);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get new access + refresh tokens using refresh token' })
  async refresh(@CurrentUser() user: any, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.refreshTokens(user.sub, user.refreshToken);
    this.setAuthCookies(response, result);

    return result;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  getMe(@CurrentUser() user: User) {
    return user;
  }

  private setAuthCookies(response: Response, tokens: TokenPair) {
    response.cookie(ACCESS_TOKEN_COOKIE, tokens.accessToken, accessTokenCookieOptions);
    response.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, refreshTokenCookieOptions);
  }

  private clearAuthCookies(response: Response) {
    response.clearCookie(ACCESS_TOKEN_COOKIE, authCookieOptions);
    response.clearCookie(REFRESH_TOKEN_COOKIE, authCookieOptions);
  }
}
