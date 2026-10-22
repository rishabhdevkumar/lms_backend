import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CourseDetailsService } from './course-details.service';
import {
  CreateCourseDetailDto,
  UpdateCourseDetailDto,
  UpdateCourseDetailStatusDto,
} from './dto';

@ApiTags('Course Details')
@Controller('course-details')
export class CourseDetailsController {
  constructor(private readonly courseDetailsService: CourseDetailsService) {}

  @ApiOperation({ summary: 'Add a new course detail record' })
  @ApiResponse({ status: 201, description: 'Course details successfully created' })
  @Post('add')
  create(@Body() dto: CreateCourseDetailDto) {
    return this.courseDetailsService.create(dto);
  }

  @ApiOperation({ summary: 'Get all course details' })
  @ApiResponse({ status: 200, description: 'List of all course details' })
  @Get('getall')
  getAll() {
    return this.courseDetailsService.getAll();
  }

  @ApiOperation({ summary: 'Get all course details (POST fallback)' })
  @ApiResponse({ status: 200, description: 'List of all course details' })
  @Post('getall')
  getAllPost() {
    return this.courseDetailsService.getAll();
  }

  @ApiOperation({ summary: 'Get all active/published course details' })
  @ApiResponse({ status: 200, description: 'List of active course details' })
  @Get('active')
  getActive() {
    return this.courseDetailsService.getActive();
  }

  @ApiOperation({ summary: 'Get course detail by course ID' })
  @ApiParam({ name: 'courseId', example: 1, description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'Course detail for specified course ID' })
  @Get('course/:courseId')
  getByCourseId(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.courseDetailsService.getByCourseId(courseId);
  }

  @ApiOperation({ summary: 'Get course detail by detail record ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Course detail ID' })
  @ApiResponse({ status: 200, description: 'Course detail record' })
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.courseDetailsService.getById(id);
  }

  @ApiOperation({ summary: 'Update course detail record' })
  @ApiResponse({ status: 200, description: 'Course detail updated successfully' })
  @Post('update')
  updatePost(@Body() dto: UpdateCourseDetailDto) {
    return this.courseDetailsService.update(dto.id, dto);
  }

  @ApiOperation({ summary: 'Update course detail by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Course detail record ID' })
  @ApiResponse({ status: 200, description: 'Course detail updated successfully' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCourseDetailDto,
  ) {
    return this.courseDetailsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Update course detail active status' })
  @ApiResponse({ status: 200, description: 'Course detail status updated successfully' })
  @Post('update-status')
  updateStatusPost(@Body() dto: UpdateCourseDetailStatusDto) {
    return this.courseDetailsService.updateStatus(dto.id, dto);
  }

  @ApiOperation({ summary: 'Update course detail active status by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Course detail record ID' })
  @ApiResponse({ status: 200, description: 'Course detail status updated successfully' })
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCourseDetailStatusDto,
  ) {
    return this.courseDetailsService.updateStatus(id, dto);
  }

  @ApiOperation({ summary: 'Delete course detail by ID (POST fallback)' })
  @ApiParam({ name: 'id', example: 1, description: 'Course detail record ID' })
  @ApiResponse({ status: 200, description: 'Course detail deleted successfully' })
  @Post('delete/:id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.courseDetailsService.delete(id);
  }

  @ApiOperation({ summary: 'Delete course detail by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Course detail record ID' })
  @ApiResponse({ status: 200, description: 'Course detail deleted successfully' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.courseDetailsService.delete(id);
  }
}
