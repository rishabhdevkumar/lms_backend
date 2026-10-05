import { Controller, Post, Body } from '@nestjs/common';
import { UniversityService } from './university.service';

@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.universityService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.universityService.getAll();
  }
}
