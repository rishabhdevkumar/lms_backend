import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('semester')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.semesterService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.semesterService.getAll();
  }

  @Post('update')
  async update(@Body() body: any) {
    return this.semesterService.update(body);
  }

  @Post('search')
  async search(@Body() body: any) {
    return this.semesterService.search(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.semesterService.delete(id);
  }
}
