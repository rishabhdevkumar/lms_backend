import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateCourseDetailDto } from './create-course-detail.dto';

export class UpdateCourseDetailDto extends PartialType(CreateCourseDetailDto) {
  @ApiPropertyOptional({ example: 1, description: 'Course Detail Record ID' })
  @IsOptional()
  @IsNumber()
  id?: number;
}

export class UpdateCourseDetailStatusDto {
  @ApiPropertyOptional({ example: 1, description: 'Course Detail Record ID' })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiPropertyOptional({ example: true, description: 'Active status' })
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
}
