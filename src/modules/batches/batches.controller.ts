import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BatchesService } from './batches.service';
import { AddBatchDto, UpdateBatchDto, EnrollStudentDto, RemoveStudentDto } from './dto/batches.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Batches')
@Controller('batches')
export class BatchesController {
  constructor(private readonly batchesService: BatchesService) {}

  @ApiOperation({ summary: 'Create a new batch' })
  @ApiResponse({ status: 201, description: 'Batch created successfully' })
  @Post('add')
  async add(@Body() dto: AddBatchDto) {
    return this.batchesService.add(dto);
  }

  @ApiOperation({ summary: 'Get all batches with course and instructor info' })
  @ApiResponse({ status: 200, description: 'List of all batches' })
  @Post('getall')
  async getAll() {
    return this.batchesService.getAll();
  }

  @ApiOperation({ summary: 'Get batch by ID' })
  @ApiResponse({ status: 200, description: 'Batch details' })
  @Post('getbyid/:id')
  async getById(@Param('id') id: number) {
    return this.batchesService.getById(id);
  }

  @ApiOperation({ summary: 'Update batch details' })
  @ApiResponse({ status: 200, description: 'Batch updated successfully' })
  @Post('update')
  async update(@Body() dto: UpdateBatchDto) {
    return this.batchesService.update(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a batch (cannot delete if students are enrolled)' })
  @ApiResponse({ status: 200, description: 'Batch deleted successfully' })
  @Post('delete/:id')
  async delete(@Param('id') id: number) {
    return this.batchesService.delete(id);
  }

  @ApiOperation({ summary: 'Enroll a student into a batch' })
  @ApiResponse({ status: 201, description: 'Student enrolled successfully' })
  @Post('enroll-student')
  async enrollStudent(@Body() dto: EnrollStudentDto) {
    return this.batchesService.enrollStudent(dto);
  }

  @ApiOperation({ summary: 'Remove a student from a batch' })
  @ApiResponse({ status: 200, description: 'Student removed successfully' })
  @Post('remove-student')
  async removeStudent(@Body() dto: RemoveStudentDto) {
    return this.batchesService.removeStudent(dto);
  }

  @ApiOperation({ summary: 'Get all enrolled students for a specific batch' })
  @ApiResponse({ status: 200, description: 'List of students in the batch' })
  @Post('students/:id')
  async getStudents(@Param('id') id: number) {
    return this.batchesService.getStudents(id);
  }
}
