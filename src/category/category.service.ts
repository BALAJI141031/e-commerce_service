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
      const resp = await this.categoryRepository.get(email, +pageNo, +pageSize);
      console.log(resp, '-------------------->');
      return resp;
    } catch (error) {
      console.log(error);
      throw 'error occurred';
    }
  }
  async addPreferences(preferences: string[], email: string) {
    try {
      const preferencesWithEmail = preferences.map((categoryId) => ({
        categoryId,
        email,
      }));
      return await this.categoryRepository.addPreferences(preferencesWithEmail);
    } catch (error) {
      throw error;
    }
  }
}
