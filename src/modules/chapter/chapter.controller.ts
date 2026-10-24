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
} from '@nestjs/swagger';
import { ChapterService } from './chapter.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import {
  AddChapterDto,
  UpdateChapterDto,
  SearchChapterDto,
  ToggleChapterStatusDto,
  ChapterResponseDto,
} from './dto/chapter.dto';

@ApiTags('Chapter')
@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @ApiOperation({ summary: 'Add a new chapter' })
  @ApiBody({ type: AddChapterDto })
  @ApiResponse({ status: 201, description: 'Chapter added successfully' })
  @Post(['', 'add'])
  async add(@Body() body: AddChapterDto) {
    return this.chapterService.add(body);
  }

  @ApiOperation({ summary: 'Get all active chapters' })
  @ApiResponse({ status: 200, description: 'List of all active chapters', type: [ChapterResponseDto] })
  @Get(['', 'getall'])
  async getAll() {
    return this.chapterService.getAll();
  }

  @Post('getall')
  async getAllPost() {
    return this.chapterService.getAll();
  }

  @ApiOperation({ summary: 'Update an existing chapter' })
  @ApiBody({ type: UpdateChapterDto })
  @ApiResponse({ status: 200, description: 'Chapter updated successfully' })
  @Put(['', 'update'])
  async update(@Body() body: UpdateChapterDto) {
    return this.chapterService.update(body);
  }

  @Post('update')
  async updatePost(@Body() body: UpdateChapterDto) {
    return this.chapterService.update(body);
  }

  @ApiOperation({ summary: 'Update chapter by ID parameter' })
  @ApiParam({ name: 'id', description: 'Chapter ID', example: 1 })
  @ApiBody({ type: UpdateChapterDto })
  @ApiResponse({ status: 200, description: 'Chapter updated successfully' })
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() body: UpdateChapterDto) {
    if (id && !body.id) {
      body.id = Number(id);
    }
    return this.chapterService.update(body);
  }

  @Post(':id/update')
  async updateByIdPost(@Param('id') id: string, @Body() body: UpdateChapterDto) {
    if (id && !body.id) {
      body.id = Number(id);
    }
    return this.chapterService.update(body);
  }

  @ApiOperation({ summary: 'Search active chapters with pagination and filters' })
  @ApiBody({ type: SearchChapterDto })
  @ApiResponse({ status: 200, description: 'Filtered list of chapters' })
  @Post('search')
  async search(@Body() body: SearchChapterDto) {
    return this.chapterService.search(body);
  }

  @ApiOperation({ summary: 'Search active chapters with query parameters' })
  @ApiResponse({ status: 200, description: 'Filtered list of chapters' })
  @Get('search')
  async searchGet(@Query() query: SearchChapterDto) {
    return this.chapterService.search(query);
  }

  @ApiOperation({ summary: 'Get chapter by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Chapter ID' })
  @ApiResponse({ status: 200, description: 'Chapter details', type: ChapterResponseDto })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.chapterService.getById(id);
  }

  @ApiOperation({ summary: 'Deactivate / Soft-delete a chapter' })
  @ApiParam({ name: 'id', description: 'Chapter ID to deactivate', example: 1 })
  @ApiResponse({ status: 200, description: 'Chapter deactivated successfully' })
  @Post(['delete/:id', ':id/delete'])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.chapterService.delete(id);
  }

  @ApiOperation({ summary: 'Get active chapters by subject ID' })
  @ApiParam({ name: 'subjectId', example: 1, description: 'Subject ID' })
  @ApiResponse({ status: 200, description: 'List of chapters for specified subject' })
  @Get(['subject/:subjectId', 'by_subject/:subjectId'])
  async getBySubjectGet(@Param('subjectId') subjectId: string) {
    return this.chapterService.getBySubject(subjectId);
  }

  @ApiOperation({ summary: 'Get active chapters by subject ID (POST body)' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['subject_id'],
      properties: {
        subject_id: { type: 'number', example: 1 },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'List of chapters for specified subject' })
  @Post(['get_by_subject', 'by_subject'])
  async getBySubjectPost(@Body() body: { subject_id: number }) {
    return this.chapterService.getBySubject(body.subject_id);
  }

  @ApiOperation({ summary: 'Toggle chapter active status (1 for active, 0 for inactive)' })
  @ApiBody({ type: ToggleChapterStatusDto })
  @ApiResponse({ status: 200, description: 'Chapter status toggled successfully' })
  @Post(['toggle_status', 'status'])
  @Patch('status')
  async toggleStatus(@Body() body: ToggleChapterStatusDto) {
    return this.chapterService.toggleStatus(body);
  }
}
