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
    await this.prismaService.userCategoryPreference.findMany({
      skip,
      take: pageSize,
      where: {
        email,
      },
      include: {
        category: true,
      },
    });
  }
  async delete(id: number) {
    return await this.prismaService.oTP.delete({ where: { id } });
  }
}
