import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'libs/dto/user.dto';
import * as argon from 'argon2';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async signup(userData: SignUpDto) {
    const { name, password, email } = userData;
    const hash = await argon.hash(password);
    await this.userRepository.create({ name, hash, email });
  }
}
