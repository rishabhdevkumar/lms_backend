import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsIn, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export const ATTENDANCE_STATUSES = ['present', 'absent', 'late', 'excused'] as const;
export type AttendanceStatus = typeof ATTENDANCE_STATUSES[number];

export class AddAttendanceDto {
  @ApiProperty({ example: 1, description: 'Academic / Class Session ID' })
  @IsNotEmpty()
  @IsNumber()
  session_id: number;

  @ApiProperty({ example: 2, description: 'Student User ID' })
  @IsNotEmpty()
  @IsNumber()
  users_id: number;

  @ApiProperty({
    example: 'present',
    enum: ATTENDANCE_STATUSES,
    description: 'Attendance status: present, absent, late, or excused',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(ATTENDANCE_STATUSES, {
    message: 'status must be one of: present, absent, late, excused',
  })
  status: string;

  @ApiProperty({ example: 6, description: 'Faculty or Admin User ID who is marking the attendance' })
  @IsNotEmpty()
  @IsNumber()
  marked_by: number;
}

export class StudentAttendanceItemDto {
  @ApiProperty({ example: 2, description: 'Student User ID' })
  @IsNotEmpty()
  @IsNumber()
  users_id: number;

  @ApiProperty({
    example: 'present',
    enum: ATTENDANCE_STATUSES,
    description: 'Attendance status',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(ATTENDANCE_STATUSES)
  status: string;
}

export class BulkMarkAttendanceDto {
  @ApiProperty({ example: 1, description: 'Session ID' })
  @IsNotEmpty()
  @IsNumber()
  session_id: number;

  @ApiProperty({ example: 6, description: 'Faculty or Admin User ID marking attendance' })
  @IsNotEmpty()
  @IsNumber()
  marked_by: number;

  @ApiProperty({
    type: [StudentAttendanceItemDto],
    description: 'List of students and their attendance status',
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentAttendanceItemDto)
  attendances: StudentAttendanceItemDto[];
}

export class UpdateAttendanceDto {
  @ApiProperty({ example: 1, description: 'Attendance Record ID' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'present',
    enum: ATTENDANCE_STATUSES,
    description: 'Updated attendance status: present, absent, late, or excused',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(ATTENDANCE_STATUSES)
  status: string;

  @ApiProperty({ example: 6, description: 'Faculty or Admin User ID updating the attendance' })
  @IsNotEmpty()
  @IsNumber()
  marked_by: number;
}

export class GetAttendanceByDateDto {
  @ApiProperty({ example: '2026-10-16', description: 'Date in YYYY-MM-DD format' })
  @IsNotEmpty()
  @IsString()
  date: string;
}
