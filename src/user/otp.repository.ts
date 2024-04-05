import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OtpRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(otpCode: string, userId: string) {
    return await this.prismaService.oTP.create({
      data: { otpCode, user: { connect: { id: userId } } },
    });
  }
  async get(email: string, otpCode: string) {
    return await this.prismaService.oTP.findFirst({
      where: { email, otpCode },
    });
  }

  async delete(id: number) {
    return await this.prismaService.oTP.delete({ where: { id } });
  }
}
