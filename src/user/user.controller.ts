import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from 'libs/dto/user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/signup')
  async signup(@Body() userData: SignUpDto) {
    return await this.userService.signup(userData);
  }
}
