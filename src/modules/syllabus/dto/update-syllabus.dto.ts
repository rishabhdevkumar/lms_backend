import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSyllabusDto {
  @ApiProperty({ example: 1, description: 'Syllabus ID to update' })
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

  @ApiProperty({
    example: 'Data Structures and Algorithms Syllabus',
    description: 'Syllabus Name (min 3, max 100 chars)',
  })
  @IsNotEmpty({ message: 'syllabus_name is required' })
  @IsString()
  @MinLength(3, { message: 'syllabus_name must be at least 3 characters' })
  @MaxLength(100, { message: 'syllabus_name must not exceed 100 characters' })
  syllabus_name: string;

  @ApiProperty({
    example: 'Unit 1: Arrays & Linked Lists. Unit 2: Stacks & Queues...',
    description: 'Syllabus content/description',
  })
  @IsNotEmpty({ message: 'syllabus content is required' })
  @IsString()
  syllabus: string;

  @ApiPropertyOptional({
    example: 'uploads/syllabus/dsa_syllabus.pdf',
    description: 'URL or path to Syllabus PDF (optional)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'syllabus_pdf path must not exceed 500 characters' })
  syllabus_pdf?: string;
}
