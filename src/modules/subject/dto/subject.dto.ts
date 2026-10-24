import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  MaxLength,
  Min,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddSubjectDto {
  @ApiProperty({ example: 1, description: 'Course ID' })
  @IsNotEmpty({ message: 'course_id is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'course_id must be a number' })
  course_id: number;

  @ApiProperty({ example: 1, description: 'Semester ID' })
  @IsNotEmpty({ message: 'semester_id is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'semester_id must be a number' })
  semester_id: number;

  @ApiPropertyOptional({ example: 'SUB101', description: 'Subject Code (optional, max 45 chars)' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  subject_code?: string;

  @ApiProperty({ example: 'Engineering Mathematics', description: 'Subject Name (required, max 45 chars)' })
  @IsNotEmpty({ message: 'subject_name is required' })
  @IsString()
  @MaxLength(45)
  subject_name: string;

  @ApiPropertyOptional({ example: 'EM-1', description: 'Short Name (optional, max 45 chars)' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  short_name?: string;
}

export class UpdateSubjectDto {
  @ApiProperty({ example: 1, description: 'Subject ID to update' })
  @IsNotEmpty({ message: 'id is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'id must be a number' })
  id: number;

  @ApiProperty({ example: 1, description: 'Course ID' })
  @IsNotEmpty({ message: 'course_id is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'course_id must be a number' })
  course_id: number;

  @ApiProperty({ example: 1, description: 'Semester ID' })
  @IsNotEmpty({ message: 'semester_id is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'semester_id must be a number' })
  semester_id: number;

  @ApiPropertyOptional({ example: 'SUB101', description: 'Subject Code (optional, max 45 chars)' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  subject_code?: string;

  @ApiProperty({ example: 'Engineering Mathematics', description: 'Subject Name (required, max 45 chars)' })
  @IsNotEmpty({ message: 'subject_name is required' })
  @IsString()
  @MaxLength(45)
  subject_name: string;

  @ApiPropertyOptional({ example: 'EM-1', description: 'Short Name (optional, max 45 chars)' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  short_name?: string;
}

export class SearchSubjectDto {
  @ApiPropertyOptional({ example: 1, description: 'Filter by Course ID' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  course_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'Filter by Semester ID' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  semester_id?: number;

  @ApiPropertyOptional({ example: 'Math', description: 'Search term in Subject Name' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  subject_name?: string;

  @ApiPropertyOptional({ example: 'EM', description: 'Search term in Short Name' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  short_name?: string;

  @ApiPropertyOptional({ example: 10, default: 10, description: 'Record count per page' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  rc?: number;

  @ApiPropertyOptional({ example: 1, default: 1, description: 'Page number' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;
}

export class ToggleSubjectStatusDto {
  @ApiProperty({ example: 1, description: 'Subject ID' })
  @IsNotEmpty({ message: 'id is required' })
  @Type(() => Number)
  @IsNumber()
  id: number;

  @ApiProperty({ example: 1, enum: [0, 1], description: 'Status: 1 for active, 0 for inactive' })
  @IsNotEmpty({ message: 'is_active is required' })
  @Type(() => Number)
  @IsIn([0, 1], { message: 'is_active must be 0 (inactive) or 1 (active)' })
  is_active: number;
}

export class GetByCourseSemesterDto {
  @ApiProperty({ example: 1, description: 'Course ID' })
  @IsNotEmpty({ message: 'course_id is required' })
  @Type(() => Number)
  @IsNumber()
  course_id: number;

  @ApiProperty({ example: 1, description: 'Semester ID' })
  @IsNotEmpty({ message: 'semester_id is required' })
  @Type(() => Number)
  @IsNumber()
  semester_id: number;
}

export class SubjectResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  course_id: number;

  @ApiProperty({ example: 1 })
  semester_id: number;

  @ApiProperty({ example: 'SUB101' })
  subject_code: string;

  @ApiProperty({ example: 'Engineering Mathematics' })
  subject_name: string;

  @ApiProperty({ example: 'EM-1' })
  short_name: string;

  @ApiProperty({ example: 1 })
  is_active: number;
}
