import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.chapterService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.chapterService.getAll();
  }

  @Post('update')
  async update(@Body() body: any) {
    return this.chapterService.update(body);
  }

  @Post('search')
  async search(@Body() body: any) {
    return this.chapterService.search(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.chapterService.delete(id);
  }

  @Post('get_by_id/:id')
  async getById(@Param('id') id: string) {
    return this.chapterService.getById(id);
  }
}
