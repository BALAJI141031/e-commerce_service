import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async addCategory() {
    const categoryData = [];
    for (let i = 0; i < 101; i++) {
      const category = faker.vehicle.vehicle();
      categoryData.push({ name: category });
    }
    if (categoryData.length) {
      await this.categoryRepository.createMany(categoryData);
    }
  }
  async get(email: string, pageNo: number, pageSize: number) {
    try {
      return await this.categoryRepository.get(email, pageNo, pageSize);
    } catch (error) {
      // throw
    }
  }
}
