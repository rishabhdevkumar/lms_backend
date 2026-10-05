import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.categoryService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.categoryService.getAll();
  }

  @Post('update')
  async update(@Body() body: any) {
    return this.categoryService.update(body);
  }

  @Post('search')
  async search(@Body() body: any) {
    return this.categoryService.search(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
