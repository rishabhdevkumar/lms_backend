import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ example: 1, description: 'Student User ID' })
  @IsNotEmpty()
  @IsNumber()
  users_id: number;

  @ApiProperty({ example: 1, description: 'Course ID' })
  @IsNotEmpty()
  @IsNumber()
  course_id: number;

  @ApiPropertyOptional({
    example: 'paid',
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
    description: 'Initial payment status for enrollment',
  })
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'paid', 'failed', 'refunded'])
  payment_status?: string;
}

export class UpdateEnrollmentStatusDto {
  @ApiProperty({ example: 1, description: 'Enrollment ID' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'paid',
    enum: ['pending', 'paid', 'failed', 'refunded'],
    description: 'Updated payment status',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['pending', 'paid', 'failed', 'refunded'])
  payment_status: string;
}

export class CheckEnrollmentDto {
  @ApiProperty({ example: 1, description: 'Student User ID' })
  @IsNotEmpty()
  @IsNumber()
  users_id: number;

  @ApiProperty({ example: 1, description: 'Course ID' })
  @IsNotEmpty()
  @IsNumber()
  course_id: number;
}
