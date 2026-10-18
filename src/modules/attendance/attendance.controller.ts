import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import {
  AddAttendanceDto,
  BulkMarkAttendanceDto,
  UpdateAttendanceDto,
  GetAttendanceByDateDto,
} from './dto/attendance.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @ApiOperation({ summary: 'Mark attendance for a student' })
  @ApiResponse({ status: 201, description: 'Attendance marked successfully' })
  @Post(['', 'add', 'mark'])
  async add(@Body() dto: AddAttendanceDto) {
    return this.attendanceService.add(dto);
  }

  @ApiOperation({ summary: 'Bulk mark attendance for multiple students' })
  @ApiResponse({ status: 201, description: 'Bulk attendance marked' })
  @Post('bulk-add')
  async bulkAdd(@Body() dto: BulkMarkAttendanceDto) {
    return this.attendanceService.bulkAdd(dto);
  }

  @ApiOperation({ summary: 'Get all attendance records' })
  @ApiResponse({ status: 200, description: 'List of all attendance records' })
  @Get(['', 'getall'])
  @Post('getall')
  async getAll() {
    return this.attendanceService.getAll();
  }

  @ApiOperation({ summary: 'Get attendance record by ID' })
  @ApiParam({ name: 'id', description: 'Attendance ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Attendance details' })
  @Get('getbyid/:id')
  @Post('getbyid/:id')
  async getById(@Param('id') id: number) {
    return this.attendanceService.getById(id);
  }

  @ApiOperation({ summary: 'Update attendance record' })
  @ApiResponse({ status: 200, description: 'Attendance updated successfully' })
  @Put('update')
  @Post('update')
  async update(@Body() dto: UpdateAttendanceDto) {
    return this.attendanceService.update(dto);
  }

  @ApiOperation({ summary: 'Get all attendance records for a specific session' })
  @ApiParam({ name: 'id', description: 'Session ID', example: 1 })
  @ApiResponse({ status: 200, description: 'List of attendance in the session' })
  @Get(['session/:id', 'getby-session/:id'])
  @Post(['session/:id', 'getby-session/:id'])
  async getBySession(@Param('id') id: number) {
    return this.attendanceService.getBySession(id);
  }

  @ApiOperation({ summary: 'Get attendance history for a specific student' })
  @ApiParam({ name: 'id', description: 'Student User ID', example: 2 })
  @ApiResponse({ status: 200, description: 'Student attendance history' })
  @Get(['student/:id', 'getby-student/:id'])
  @Post(['student/:id', 'getby-student/:id'])
  async getByStudent(@Param('id') id: number) {
    return this.attendanceService.getByStudent(id);
  }

  @ApiOperation({ summary: 'Get attendance records for a specific batch' })
  @ApiParam({ name: 'id', description: 'Batch ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Attendance records for the batch' })
  @Get(['batch/:id', 'getby-batch/:id'])
  @Post(['batch/:id', 'getby-batch/:id'])
  async getByBatch(@Param('id') id: number) {
    return this.attendanceService.getByBatch(id);
  }

  @ApiOperation({ summary: 'Get attendance records by date (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Attendance on specified date' })
  @Post('date')
  async getByDate(@Body() dto: GetAttendanceByDateDto) {
    return this.attendanceService.getByDate(dto.date);
  }

  @ApiOperation({ summary: 'Get attendance records by date param (YYYY-MM-DD)' })
  @ApiParam({ name: 'date', description: 'Date in YYYY-MM-DD format', example: '2026-10-16' })
  @Get('date/:date')
  async getByDateParam(@Param('date') date: string) {
    return this.attendanceService.getByDate(date);
  }

  @ApiOperation({ summary: 'Get student attendance percentage and statistics' })
  @ApiParam({ name: 'id', description: 'Student User ID', example: 2 })
  @ApiResponse({ status: 200, description: 'Student attendance percentage and statistics' })
  @Get(['percentage/:id', 'getpercentage/:id'])
  @Post(['percentage/:id', 'getpercentage/:id'])
  async getPercentage(@Param('id') id: number) {
    return this.attendanceService.getPercentage(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete an attendance record by ID' })
  @ApiParam({ name: 'id', description: 'Attendance ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Attendance record deleted' })
  @Delete(':id')
  @Post('delete/:id')
  async delete(@Param('id') id: number) {
    return this.attendanceService.delete(id);
  }
}
