import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class QuickAddStudentDto {
  @ApiPropertyOptional({ example: 'John Doe', description: 'Full name of the student' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'john.doe@example.com', description: 'Email address of the student' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: '+1234567890', description: 'Contact phone number' })
  @IsString()
  @IsOptional()
  phone?: string;
}

export class AuthenticateStudentDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'Registered student email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'secret123', description: 'Account password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class StudentResponseDto {
  @ApiProperty({ example: '101', description: 'Unique student identifier' })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'Student full name' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Student email' })
  email: string;

  @ApiPropertyOptional({ example: 'R-2026-001', description: 'Student roll number' })
  rollNo?: string;
}

export class AuthTokenResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT Authentication Bearer token' })
  token: string;

  @ApiProperty({ type: () => StudentResponseDto, description: 'Authenticated student info' })
  user: StudentResponseDto;
}
