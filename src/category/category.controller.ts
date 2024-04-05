import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('')
  async addCategory() {
    return await this.categoryService.addCategory();
  }

  @Get('')
  async get(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.categoryService.get(
      'balajiab09@gmail.com',
      pageNo,
      pageSize,
    );
  }
  @Post('preferences')
  async addPreferences(@Body() body: { preferences: string[] }) {
    return await this.categoryService.addPreferences(
      body.preferences,
      'balajiab09@gmail.com',
    );
  }
}
