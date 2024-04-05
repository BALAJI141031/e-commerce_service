import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({ data });
  }
  async update(userId: string, data: Prisma.UserUpdateInput) {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }
  async updateByEmail(email: string, data: Prisma.UserUpdateInput) {
    await this.prismaService.user.update({
      where: {
        email,
      },
      data,
    });
  }
  async getUserByEmail(email: string, select: Prisma.UserSelect) {
    const resp = await this.prismaService.user.findFirstOrThrow({
      where: { email },
      select,
    });
    return resp;
  }
  async getUserById(id: string, select: Prisma.UserSelect) {
    const resp = await this.prismaService.user.findFirstOrThrow({
      where: { id },
      select,
    });
    return resp;
  }
}
