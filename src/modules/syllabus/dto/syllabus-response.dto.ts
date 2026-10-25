import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SyllabusResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  course_id: number;

  @ApiPropertyOptional({ example: 'Computer Science & Engineering' })
  course_name?: string;

  @ApiProperty({ example: 1 })
  semester_id: number;

  @ApiPropertyOptional({ example: '1st Semester' })
  semester_name?: string;

  @ApiProperty({ example: 'Data Structures and Algorithms Syllabus' })
  syllabus_name: string;

  @ApiProperty({ example: 'Unit 1: Arrays...' })
  syllabus: string;

  @ApiPropertyOptional({ example: 'uploads/syllabus/dsa.pdf' })
  syllabus_pdf?: string;

  @ApiProperty({ example: 1 })
  is_active: number;
}
