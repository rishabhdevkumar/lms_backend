import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SyllabusService } from './syllabus.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('syllabus')
export class SyllabusController {
  constructor(private readonly syllabusService: SyllabusService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.syllabusService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.syllabusService.getAll();
  }

  @Post('update')
  async update(@Body() body: any) {
    return this.syllabusService.update(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.syllabusService.delete(id);
  }
}
