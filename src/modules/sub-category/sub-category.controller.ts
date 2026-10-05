import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('sub_category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.subCategoryService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.subCategoryService.getAll();
  }

  @Post('update')
  async update(@Body() body: any) {
    return this.subCategoryService.update(body);
  }

  @Post('search')
  async search(@Body() body: any) {
    return this.subCategoryService.search(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.subCategoryService.delete(id);
  }
}
