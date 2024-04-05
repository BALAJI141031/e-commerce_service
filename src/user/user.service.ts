import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from 'libs/dto/user.dto';
import * as argon from 'argon2';
import { UserRepository } from './user.repository';
import { sendEmail } from 'libs/comms/email';
import { generateOTP } from 'libs/utils/constant.methods';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async signup(userData: SignUpDto) {
    try {
      const { name, password, email } = userData;
      const hash = await argon.hash(password);
      await this.userRepository.create({ name, passwordHash: hash, email });
      const otp = generateOTP();
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
}
