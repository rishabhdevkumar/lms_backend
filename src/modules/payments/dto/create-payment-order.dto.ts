import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePaymentOrderDto {
  @ApiProperty({ example: 1, description: 'Student User ID' })
  @IsNotEmpty()
  @IsNumber()
  users_id: number;

  @ApiProperty({ example: 1, description: 'Course ID to purchase' })
  @IsNotEmpty()
  @IsNumber()
  course_id: number;

  @ApiProperty({ example: 4999.00, description: 'Amount in INR (e.g. 4999.00)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiPropertyOptional({ example: 'INR', default: 'INR', description: 'Currency code' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ example: 'receipt_course_1_user_2', description: 'Optional custom receipt identifier' })
  @IsOptional()
  @IsString()
  receipt?: string;

  @ApiPropertyOptional({ example: { batch_id: 1, student_name: 'John Doe' }, description: 'Additional notes or metadata' })
  @IsOptional()
  notes?: Record<string, any>;
}
