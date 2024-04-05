import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}
  async getTokens(email: string): Promise<any> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: email,
      },
      { secret: this.config.get<string>('AT_SECRET'), expiresIn: 15 * 60 },
    );
    return { accessToken };
  }
}
