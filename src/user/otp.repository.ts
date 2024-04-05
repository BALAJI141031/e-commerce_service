import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OtpRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: Prisma.OTPCreateInput) {
    return await this.prismaService.oTP.create({ data });
  }
}
