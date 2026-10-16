import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional, MaxLength, IsIn } from 'class-validator';

export class AddBatchDto {
  @ApiProperty({ example: 1, description: 'Course ID' })
  @IsNotEmpty()
  @IsNumber()
  course_id: number;

  @ApiProperty({ example: 6, description: 'Faculty / Instructor User ID' })
  @IsNotEmpty()
  @IsNumber()
  users_id: number;

  @ApiPropertyOptional({ example: '2026-11-01', description: 'Batch start date (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  start_date?: string;

  @ApiPropertyOptional({ example: '2026-12-01', description: 'Batch end date (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  end_date?: string;

  @ApiPropertyOptional({ example: '10:00:00', description: 'Batch start time (HH:mm:ss)' })
  @IsOptional()
  @IsString()
  start_time?: string;

  @ApiPropertyOptional({ example: '12:00:00', description: 'Batch end time (HH:mm:ss)' })
  @IsOptional()
  @IsString()
  end_time?: string;

  @ApiPropertyOptional({ example: 'Lab 101', description: 'Room / Class designation' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  room?: string;

  @ApiPropertyOptional({ example: 'upcoming', enum: ['active', 'upcoming', 'completed'], description: 'Initial batch status' })
  @IsOptional()
  @IsString()
  @IsIn(['active', 'upcoming', 'completed'])
  status?: string;
}

export class UpdateBatchDto {
  @ApiProperty({ example: 1, description: 'Batch ID' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiPropertyOptional({ example: 'BAT001', description: 'Batch Code' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  batch_code?: string;

  @ApiProperty({ example: 1, description: 'Course ID' })
  @IsNotEmpty()
  @IsNumber()
  course_id: number;

  @ApiProperty({ example: 6, description: 'Faculty / Instructor User ID' })
  @IsNotEmpty()
  @IsNumber()
  users_id: number;

  @ApiPropertyOptional({ example: '2026-11-01', description: 'Batch start date (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  start_date?: string;

  @ApiPropertyOptional({ example: '2026-12-01', description: 'Batch end date (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  end_date?: string;

  @ApiPropertyOptional({ example: '10:00:00', description: 'Batch start time (HH:mm:ss)' })
  @IsOptional()
  @IsString()
  start_time?: string;

  @ApiPropertyOptional({ example: '12:00:00', description: 'Batch end time (HH:mm:ss)' })
  @IsOptional()
  @IsString()
  end_time?: string;

  @ApiPropertyOptional({ example: 'Lab 102', description: 'Room / Class designation' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  room?: string;

  @ApiProperty({ example: 'active', enum: ['active', 'upcoming', 'completed'], description: 'Batch status' })
  @IsNotEmpty()
  @IsString()
  @IsIn(['active', 'upcoming', 'completed'])
  status: string;
}

export class EnrollStudentDto {
  @ApiProperty({ example: 1, description: 'Batch ID' })
  @IsNotEmpty()
  @IsNumber()
  batch_id: number;

  @ApiProperty({ example: 2, description: 'Student User ID' })
  @IsNotEmpty()
  @IsNumber()
  users_id: number;
}

export class RemoveStudentDto {
  @ApiProperty({ example: 1, description: 'Batch ID' })
  @IsNotEmpty()
  @IsNumber()
  batch_id: number;

  @ApiProperty({ example: 2, description: 'Student User ID' })
  @IsNotEmpty()
  @IsNumber()
  users_id: number;
}
