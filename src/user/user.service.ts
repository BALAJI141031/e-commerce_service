import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { SignUpDto } from 'libs/dto/user.dto';
import * as argon from 'argon2';
import { UserRepository } from './user.repository';
import { sendEmail } from 'libs/comms/email';
import { generateOTP } from 'libs/utils/constant.methods';
import { OtpRepository } from './otp.repository';
import { TokenService } from 'src/auth/authToken.service';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly otpRepository: OtpRepository,
    private readonly tokenService: TokenService,
  ) {}
  async signup(userData: SignUpDto) {
    try {
      const { name, password, email } = userData;
      const hash = await argon.hash(password);
      const user = await this.userRepository.create({
        name,
        passwordHash: hash,
        email,
      });

      const otp = generateOTP();
      await this.otpRepository.create(otp, user?.id);
      sendEmail({
        to: email,
        subject: 'Verification Code',
        text: 'Please use the verification code below to complete the sign up.',
        strongText: otp,
      });
      return { name, email, status: 'OTP Sent Successfully' };
    } catch (err) {
      throw new HttpException(
        'Failed To Create User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async verifyOtp(email: string, otpCode: string) {
    const savedOtp = await this.otpRepository.get(email, otpCode);
    if (savedOtp) {
      this.otpRepository.delete(savedOtp.id);
      this.userRepository.updateByEmail(email, { verified: true });
      // auth tokens need to send
      return await this.tokenService.getTokens(email);
    } else {
      throw new BadRequestException('Invalid Code');
    }
  }
}
