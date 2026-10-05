import { Controller, Post, Body } from '@nestjs/common';
import { TimetableService } from './timetable.service';

@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.timetableService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.timetableService.getAll();
  }
}
