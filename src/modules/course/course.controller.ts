import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.courseService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.courseService.getAll();
  }

  @Post('update')
  async update(@Body() body: any) {
    return this.courseService.update(body);
  }

  @Post('search')
  async search(@Body() body: any) {
    return this.courseService.search(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
