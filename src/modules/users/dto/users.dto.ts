import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MaxLength, Matches, IsOptional, IsEnum } from 'class-validator';

export class AddUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the user' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    example: 'Pass@1234',
    description: 'User password (at least 8 characters, one alphabet, one number, and one special character)',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @Matches(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, {
    message: 'Password must contain at least 8 characters, one alphabet, one number and one special character',
  })
  password: string;

  @ApiPropertyOptional({ example: 'student', enum: ['student', 'faculty', 'admin'], description: 'User role' })
  @IsOptional()
  @IsEnum(['student', 'faculty', 'admin'], { message: 'Role must be student, faculty, or admin' })
  role?: string;
}

export class AuthenticateUserDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'User email or roll number' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'Pass@1234', description: 'User password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserResponseDto {
  @ApiProperty({ example: '1', description: 'Unique user identifier' })
  id: string;

  @ApiProperty({ example: 'STU001', description: 'User roll number' })
  roll_no: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
  email: string;
}

export class UserAuthTokenResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT Authentication Bearer token' })
  token: string;

  @ApiProperty({ type: () => UserResponseDto, description: 'Authenticated user info' })
  data: UserResponseDto;
}

export class UpdateUserDto {
  @ApiProperty({ example: 1, description: 'User ID to update' })
  @IsNotEmpty()
  id: string | number;

  @ApiPropertyOptional({ example: 'John Doe', description: 'Updated full name' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ example: 'john.doe@example.com', description: 'Updated email address' })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @ApiPropertyOptional({ example: 'Pass@1234', description: 'Updated password' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  password?: string;

  @ApiPropertyOptional({ example: '9876543210', description: '10-digit mobile phone number' })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must contain exactly 10 digits' })
  phone?: string;
}
