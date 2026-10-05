import { Controller, Post, Body } from '@nestjs/common';
import { FacultyDepService } from './faculty-dep.service';

@Controller('faculty_dep')
export class FacultyDepController {
  constructor(private readonly facultyDepService: FacultyDepService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.facultyDepService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.facultyDepService.getAll();
  }
}
