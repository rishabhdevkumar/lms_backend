import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.subjectService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.subjectService.getAll();
  }

  @Post('update')
  async update(@Body() body: any) {
    return this.subjectService.update(body);
  }

  @Post('search')
  async search(@Body() body: any) {
    return this.subjectService.search(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.subjectService.delete(id);
  }
}
