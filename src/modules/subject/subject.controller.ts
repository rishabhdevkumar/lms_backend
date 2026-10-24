import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { SubjectService } from './subject.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import {
  AddSubjectDto,
  UpdateSubjectDto,
  SearchSubjectDto,
  ToggleSubjectStatusDto,
  GetByCourseSemesterDto,
  SubjectResponseDto,
} from './dto/subject.dto';

@ApiTags('Subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiOperation({ summary: 'Add a new subject' })
  @ApiBody({ type: AddSubjectDto })
  @ApiResponse({ status: 201, description: 'Subject added successfully' })
  @Post(['', 'add'])
  async add(@Body() body: AddSubjectDto) {
    return this.subjectService.add(body);
  }

  @ApiOperation({ summary: 'Get all active subjects' })
  @ApiResponse({ status: 200, description: 'List of all active subjects', type: [SubjectResponseDto] })
  @Get(['', 'getall'])
  async getAll() {
    return this.subjectService.getAll();
  }

  @Post('getall')
  async getAllPost() {
    return this.subjectService.getAll();
  }

  @ApiOperation({ summary: 'Update an existing subject' })
  @ApiBody({ type: UpdateSubjectDto })
  @ApiResponse({ status: 200, description: 'Subject updated successfully' })
  @Put(['', 'update'])
  async update(@Body() body: UpdateSubjectDto) {
    return this.subjectService.update(body);
  }

  @Post('update')
  async updatePost(@Body() body: UpdateSubjectDto) {
    return this.subjectService.update(body);
  }

  @ApiOperation({ summary: 'Update subject by ID parameter' })
  @ApiParam({ name: 'id', description: 'Subject ID', example: 1 })
  @ApiBody({ type: UpdateSubjectDto })
  @ApiResponse({ status: 200, description: 'Subject updated successfully' })
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() body: UpdateSubjectDto) {
    if (id && !body.id) {
      body.id = Number(id);
    }
    return this.subjectService.update(body);
  }

  @Post(':id/update')
  async updateByIdPost(@Param('id') id: string, @Body() body: UpdateSubjectDto) {
    if (id && !body.id) {
      body.id = Number(id);
    }
    return this.subjectService.update(body);
  }

  @ApiOperation({ summary: 'Search active subjects with pagination and filters' })
  @ApiBody({ type: SearchSubjectDto })
  @ApiResponse({ status: 200, description: 'Filtered list of subjects' })
  @Post('search')
  async search(@Body() body: SearchSubjectDto) {
    return this.subjectService.search(body);
  }

  @ApiOperation({ summary: 'Search active subjects with query parameters' })
  @ApiResponse({ status: 200, description: 'Filtered list of subjects' })
  @Get('search')
  async searchGet(@Query() query: SearchSubjectDto) {
    return this.subjectService.search(query);
  }

  @ApiOperation({ summary: 'Deactivate / Soft-delete a subject' })
  @ApiParam({ name: 'id', description: 'Subject ID to deactivate', example: 1 })
  @ApiResponse({ status: 200, description: 'Subject deactivated successfully' })
  @Post(['delete/:id', ':id/delete'])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.subjectService.delete(id);
  }

  @ApiOperation({ summary: 'Get subjects by course ID and semester ID' })
  @ApiParam({ name: 'courseId', example: 1, description: 'Course ID' })
  @ApiParam({ name: 'semesterId', example: 1, description: 'Semester ID' })
  @ApiResponse({ status: 200, description: 'List of subjects in specified course and semester' })
  @Get('course/:courseId/semester/:semesterId')
  async getByCourseSemesterGet(
    @Param('courseId') courseId: string,
    @Param('semesterId') semesterId: string,
  ) {
    return this.subjectService.getByCourseSemester(courseId, semesterId);
  }

  @ApiOperation({ summary: 'Get subjects by course ID and semester ID (POST body)' })
  @ApiBody({ type: GetByCourseSemesterDto })
  @ApiResponse({ status: 200, description: 'List of subjects in specified course and semester' })
  @Post(['get_by_course_semester', 'by_course_semester'])
  async getByCourseSemester(@Body() body: GetByCourseSemesterDto) {
    return this.subjectService.getByCourseSemester(body.course_id, body.semester_id);
  }

  @ApiOperation({ summary: 'Toggle subject active status (1 for active, 0 for inactive)' })
  @ApiBody({ type: ToggleSubjectStatusDto })
  @ApiResponse({ status: 200, description: 'Subject status toggled successfully' })
  @Post(['toggle_status', 'status'])
  @Patch('status')
  async toggleStatus(@Body() body: ToggleSubjectStatusDto) {
    return this.subjectService.toggleStatus(body);
  }

  @ApiOperation({ summary: 'Get chapter count for all subjects or a specific subject' })
  @ApiQuery({ name: 'subject_id', required: false, description: 'Optional Subject ID filter', example: 1 })
  @ApiResponse({ status: 200, description: 'Chapter count per subject' })
  @Get(['chapter_count', 'chapter_count/:id'])
  async getChapterCount(@Param('id') paramId?: string, @Query('subject_id') queryId?: string) {
    const id = paramId || queryId;
    return this.subjectService.getChapterCount(id);
  }

  @ApiOperation({ summary: 'Get chapter count for all subjects or a specific subject (POST body)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        subject_id: { type: 'number', example: 1 },
      },
    },
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Chapter count per subject' })
  @Post('chapter_count')
  async getChapterCountPost(@Body() body?: { subject_id?: number }) {
    return this.subjectService.getChapterCount(body?.subject_id);
  }
}
