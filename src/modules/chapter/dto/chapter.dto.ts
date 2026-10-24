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

export class AddChapterDto {
  @ApiPropertyOptional({ example: 1, description: 'Course ID (optional, auto-resolved from subject if omitted)' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'course_id must be a number' })
  course_id: number;

  @ApiPropertyOptional({ example: 1, description: 'Semester ID (optional, auto-resolved from subject if omitted)' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'semester_id must be a number' })
  semester_id: number;

  @ApiProperty({ example: 1, description: 'Subject ID' })
  @IsNotEmpty({ message: 'subject_id is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'subject_id must be a number' })
  subject_id: number;

  @ApiProperty({ example: 'Differential Calculus', description: 'Chapter Name (required, max 255 chars)' })
  @IsNotEmpty({ message: 'chapter_name is required' })
  @IsString()
  @MaxLength(255)
  chapter_name: string;

  @ApiPropertyOptional({ example: 'Diff Calc', description: 'Short Name (optional, max 45 chars)' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  short_name?: string;
}

export class UpdateChapterDto {
  @ApiProperty({ example: 1, description: 'Chapter ID to update' })
  @IsNotEmpty({ message: 'id is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'id must be a number' })
  id: number;

  @ApiPropertyOptional({ example: 1, description: 'Course ID (optional, auto-resolved from subject if omitted)' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'course_id must be a number' })
  course_id: number;

  @ApiPropertyOptional({ example: 1, description: 'Semester ID (optional, auto-resolved from subject if omitted)' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'semester_id must be a number' })
  semester_id?: number;

  @ApiProperty({ example: 1, description: 'Subject ID' })
  @IsNotEmpty({ message: 'subject_id is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'subject_id must be a number' })
  subject_id: number;

  @ApiProperty({ example: 'Differential Calculus', description: 'Chapter Name (required, max 255 chars)' })
  @IsNotEmpty({ message: 'chapter_name is required' })
  @IsString()
  @MaxLength(255)
  chapter_name: string;

  @ApiPropertyOptional({ example: 'Diff Calc', description: 'Short Name (optional, max 45 chars)' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  short_name?: string;
}

export class SearchChapterDto {
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

  @ApiPropertyOptional({ example: 1, description: 'Filter by Subject ID' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  subject_id?: number;

  @ApiPropertyOptional({ example: 'Calculus', description: 'Search term in Chapter Name' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  chapter_name?: string;

  @ApiPropertyOptional({ example: 'Diff', description: 'Search term in Short Name' })
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

export class ToggleChapterStatusDto {
  @ApiProperty({ example: 1, description: 'Chapter ID' })
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

export class ChapterResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  course_id: number;

  @ApiProperty({ example: 1 })
  semester_id: number;

  @ApiProperty({ example: 1 })
  subject_id: number;

  @ApiProperty({ example: 'Differential Calculus' })
  chapter_name: string;

  @ApiProperty({ example: 'Diff Calc' })
  short_name: string;

  @ApiPropertyOptional({ example: 1 })
  is_active?: number;
}
