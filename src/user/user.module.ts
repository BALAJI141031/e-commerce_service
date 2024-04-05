import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { OtpRepository } from './otp.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AtStrategy } from 'src/auth/auth.strategy';
import { TokenService } from 'src/auth/authToken.service';

@Module({
  imports: [JwtModule, PassportModule],
  providers: [
    UserService,
    UserRepository,
    OtpRepository,
    AtStrategy,
    ConfigService,
    TokenService,
  ],
  controllers: [UserController],
})
export class UserModule {}
