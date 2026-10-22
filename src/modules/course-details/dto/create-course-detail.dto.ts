import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateCourseDetailDto {
  @ApiProperty({ example: 1, description: 'Associated Course ID' })
  @IsNotEmpty()
  @IsNumber()
  course_id: number;

  @ApiProperty({ example: 'Web Development', description: 'Course category' })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    example: 'Complete Full-Stack Web Development Bootcamp',
    description: 'Course title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: 'Learn HTML, CSS, JavaScript, Node.js, and Angular from scratch.',
    description: 'Detailed description of the course',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/images/course-banner.jpg',
    description: 'URL or path to course thumbnail image',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    example: 'Bestseller',
    description: 'Badges text (e.g. Bestseller, Trending, New)',
  })
  @IsOptional()
  @IsString()
  badges_text?: string;

  @ApiPropertyOptional({
    example: 45,
    default: 0,
    description: 'Total duration in hours',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  duration_hours?: number;

  @ApiPropertyOptional({
    example: 120,
    default: 0,
    description: 'Total number of lessons',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  total_lessons?: number;

  @ApiProperty({ example: 4999.0, description: 'Course price in INR' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    example: 1,
    default: 0,
    description: 'Display order index for listing',
  })
  @IsOptional()
  @IsNumber()
  display_order?: number;

  @ApiPropertyOptional({
    example: true,
    default: true,
    description: 'Whether the course is active/published',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
