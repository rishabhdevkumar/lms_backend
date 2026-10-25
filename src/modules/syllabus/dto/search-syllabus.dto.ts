import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SearchSyllabusDto {
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

  @ApiPropertyOptional({
    example: 'Data Structures',
    description: 'Search term in Syllabus Name',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  syllabus_name?: string;

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
