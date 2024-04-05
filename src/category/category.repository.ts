import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createMany(data: Prisma.CategoryCreateManyInput[]) {
    return await this.prismaService.category.createMany({ data });
  }
  async get(email: string, pageNo: number, pageSize: number) {
    const skip = (pageNo - 1) * pageSize;
    return await this.prismaService.category.findMany({
      skip,
      take: pageSize,
      include: {
        likedByUsers: {
          where: {
            email,
          },
        },
      },
    });
  }

  async addPreferences(data: { email: string; categoryId: string }[]) {
    return await this.prismaService.userCategoryPreference.createMany({ data });
  }
  async delete(id: number) {
    return await this.prismaService.oTP.delete({ where: { id } });
  }
}
