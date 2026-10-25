import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetSyllabusByCourseSemesterDto {
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
}
