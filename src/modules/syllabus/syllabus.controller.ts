import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SyllabusService } from './syllabus.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import {
  AddSyllabusDto,
  UpdateSyllabusDto,
  SearchSyllabusDto,
  GetSyllabusByCourseSemesterDto,
  SyllabusResponseDto,
} from './dto';

@ApiTags('Syllabus')
@Controller('syllabus')
export class SyllabusController {
  constructor(private readonly syllabusService: SyllabusService) {}

  @ApiOperation({ summary: 'Add a new syllabus' })
  @ApiBody({ type: AddSyllabusDto })
  @ApiResponse({ status: 201, description: 'Syllabus added successfully' })
  @Post(['', 'add'])
  async add(@Body() body: AddSyllabusDto) {
    return this.syllabusService.add(body);
  }

  @ApiOperation({ summary: 'Get all active syllabi' })
  @ApiResponse({ status: 200, description: 'List of all active syllabi', type: [SyllabusResponseDto] })
  @Get(['', 'getall'])
  async getAll() {
    return this.syllabusService.getAll();
  }

  @Post('getall')
  async getAllPost() {
    return this.syllabusService.getAll();
  }

  @ApiOperation({ summary: 'Update an existing syllabus' })
  @ApiBody({ type: UpdateSyllabusDto })
  @ApiResponse({ status: 200, description: 'Syllabus updated successfully' })
  @Post('update')
  async update(@Body() body: UpdateSyllabusDto) {
    return this.syllabusService.update(body);
  }

  @ApiOperation({ summary: 'Search syllabi with filters and pagination' })
  @ApiBody({ type: SearchSyllabusDto })
  @ApiResponse({ status: 200, description: 'Search results for syllabus' })
  @Post('search')
  async search(@Body() body: SearchSyllabusDto) {
    return this.syllabusService.search(body);
  }

  @ApiOperation({ summary: 'Get syllabus by Course ID and Semester ID' })
  @ApiBody({ type: GetSyllabusByCourseSemesterDto })
  @ApiResponse({ status: 200, description: 'Syllabus by course and semester' })
  @Post('course-semester')
  async getByCourseSemester(@Body() body: GetSyllabusByCourseSemesterDto) {
    return this.syllabusService.getByCourseSemester(body.course_id, body.semester_id);
  }

  @ApiOperation({ summary: 'Delete (soft-delete) a syllabus by ID' })
  @ApiParam({ name: 'id', description: 'Syllabus ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.syllabusService.delete(id);
  }
}
