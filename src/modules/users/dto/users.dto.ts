import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  Matches,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddUserDto {
  @ApiPropertyOptional({ example: 'STU001', description: 'Unique roll number of the user' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  roll_no?: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the user' })
  @IsEmail({}, { message: 'Invalid email address format' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(100)
  email: string;

  @ApiProperty({
    example: 'Pass@1234',
    description: 'User password (at least 8 characters, one alphabet, one number, and one special character)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MaxLength(200)
  @Matches(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, {
    message: 'Password must contain at least 8 characters, one alphabet, one number and one special character',
  })
  password: string;

  @ApiPropertyOptional({ example: '9876543210', description: '10-digit mobile phone number' })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must contain exactly 10 digits' })
  phone?: string;

  @ApiPropertyOptional({ example: 'en', description: 'Preferred language code (e.g. en, hi)' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  language?: string;

  @ApiPropertyOptional({ example: '2000-01-15', description: 'Date of birth (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  dob?: string;

  @ApiPropertyOptional({ example: 'Male', enum: ['Male', 'Female', 'Other'], description: 'Gender' })
  @IsOptional()
  @IsEnum(['Male', 'Female', 'Other'], { message: 'Gender must be Male, Female, or Other' })
  gender?: string;

  @ApiPropertyOptional({ example: 'student', enum: ['student', 'faculty', 'admin'], description: 'User role' })
  @IsOptional()
  @IsEnum(['student', 'faculty', 'admin'], { message: 'Role must be student, faculty, or admin' })
  role?: string;

  @ApiPropertyOptional({ example: 1, description: 'Academic session ID' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  session_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'Course ID' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  course_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'Semester ID' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  semester_id?: number;

  @ApiPropertyOptional({ example: '123456789012', description: '12-digit Aadhar number' })
  @IsOptional()
  @IsString()
  @MaxLength(12)
  aadhar_no?: string;

  @ApiPropertyOptional({ example: 'Robert Doe', description: "Father's full name" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  father_name?: string;

  @ApiPropertyOptional({ example: 'Jane Doe', description: "Mother's full name" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  mother_name?: string;

  @ApiPropertyOptional({ example: 'CBSE', description: '10th Board name' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  board_10th?: string;

  @ApiPropertyOptional({ example: 500, description: 'Total marks in 10th' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  total_marks_10th?: number;

  @ApiPropertyOptional({ example: 85.5, description: 'Percentage in 10th' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  percentage_10th?: number;

  @ApiPropertyOptional({ example: 'CBSE', description: '12th Board name' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  board_12th?: string;

  @ApiPropertyOptional({ example: 480, description: 'Total marks in 12th' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  total_marks_12th?: number;

  @ApiPropertyOptional({ example: 82.0, description: 'Percentage in 12th' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  percentage_12th?: number;
}

export class AdminAddUserDto {
  @ApiProperty({ example: 'STU001', description: 'Unique roll number of the user' })
  @IsString()
  @IsNotEmpty({ message: 'Roll number is required' })
  @MaxLength(20)
  roll_no: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the user' })
  @IsEmail({}, { message: 'Invalid email address format' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(100)
  email: string;

  @ApiProperty({
    example: 'Pass@1234',
    description: 'User password (at least 8 characters, one alphabet, one number, and one special character)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MaxLength(200)
  @Matches(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, {
    message: 'Password must contain at least 8 characters, one alphabet, one number and one special character',
  })
  password: string;

  @ApiProperty({ example: '9876543210', description: '10-digit mobile phone number' })
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must contain exactly 10 digits' })
  phone: string;

  @ApiPropertyOptional({ example: 'en', description: 'Preferred language code (max 5 chars)' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  language?: string;

  @ApiPropertyOptional({ example: '2000-01-15', description: 'Date of birth (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  dob?: string;

  @ApiPropertyOptional({ example: 'Male', enum: ['Male', 'Female', 'Other'], description: 'Gender' })
  @IsOptional()
  @IsEnum(['Male', 'Female', 'Other'], { message: 'Gender must be Male, Female, or Other' })
  gender?: string;

  @ApiPropertyOptional({ example: 'student', enum: ['student', 'faculty', 'admin'], description: 'User role' })
  @IsOptional()
  @IsEnum(['student', 'faculty', 'admin'], { message: 'Role must be student, faculty, or admin' })
  role?: string;

  @ApiPropertyOptional({ example: 1, description: 'Academic session ID' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  session_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'Course ID' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  course_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'Semester ID' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  semester_id?: number;

  @ApiPropertyOptional({ example: '123456789012', description: '12-digit Aadhar number' })
  @IsOptional()
  @IsString()
  @MaxLength(12)
  aadhar_no?: string;

  @ApiPropertyOptional({ example: 'Robert Doe', description: "Father's full name" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  father_name?: string;

  @ApiPropertyOptional({ example: 'Jane Doe', description: "Mother's full name" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  mother_name?: string;

  @ApiPropertyOptional({ example: 'CBSE', description: '10th Board name' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  board_10th?: string;

  @ApiPropertyOptional({ example: 500, description: 'Total marks obtained in 10th' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  total_marks_10th?: number;

  @ApiPropertyOptional({ example: 85.5, description: 'Percentage obtained in 10th' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  percentage_10th?: number;

  @ApiPropertyOptional({ example: 'CBSE', description: '12th Board name' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  board_12th?: string;

  @ApiPropertyOptional({ example: 480, description: 'Total marks obtained in 12th' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  total_marks_12th?: number;

  @ApiPropertyOptional({ example: 82.0, description: 'Percentage obtained in 12th' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  percentage_12th?: number;
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

  @ApiPropertyOptional({ example: '9876543210', description: 'User phone number' })
  phone?: string;

  @ApiPropertyOptional({ example: 'admin', description: 'User role' })
  role?: string;
}

export class UserAuthTokenResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT Authentication Bearer token' })
  token: string;

  @ApiPropertyOptional({ example: 'admin', description: 'User role' })
  role?: string;

  @ApiProperty({ type: () => UserResponseDto, description: 'Authenticated user info' })
  data: UserResponseDto;
}

export class UpdateUserDto {
  @ApiProperty({ example: 1, description: 'User ID to update' })
  @IsNotEmpty({ message: 'User ID is required' })
  id: string | number;

  @ApiPropertyOptional({ example: 'STU001', description: 'Roll number' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  roll_no?: string;

  @ApiPropertyOptional({ example: 'John Doe', description: 'Updated full name' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ example: 'john.doe@example.com', description: 'Updated email address' })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address format' })
  @MaxLength(100)
  email?: string;

  @ApiPropertyOptional({
    example: 'Pass@1234',
    description: 'Updated password (at least 8 chars, one alphabet, one number, and one special character)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Matches(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, {
    message: 'Password must contain at least 8 characters, one alphabet, one number and one special character',
  })
  password?: string;

  @ApiPropertyOptional({ example: 'en', description: 'Preferred language code (max 5 chars)' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  language?: string;

  @ApiPropertyOptional({ example: '9876543210', description: '10-digit mobile phone number' })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must contain exactly 10 digits (0-9 only)' })
  phone?: string;

  @ApiPropertyOptional({ example: '2000-01-15', description: 'Date of birth (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  dob?: string;

  @ApiPropertyOptional({ example: 'Male', enum: ['Male', 'Female', 'Other'], description: 'Gender' })
  @IsOptional()
  @IsEnum(['Male', 'Female', 'Other'], { message: 'Gender must be Male, Female, or Other' })
  gender?: string;

  @ApiPropertyOptional({ example: 'student', enum: ['student', 'faculty', 'admin'], description: 'User role' })
  @IsOptional()
  @IsEnum(['student', 'faculty', 'admin'], { message: 'Role must be student, faculty, or admin' })
  role?: string;

  @ApiPropertyOptional({ example: 1, description: 'Academic session ID' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  session_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'Course ID' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  course_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'Semester ID' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  semester_id?: number;

  @ApiPropertyOptional({ example: '123456789012', description: '12-digit Aadhar number' })
  @IsOptional()
  @IsString()
  @MaxLength(12)
  aadhar_no?: string;

  @ApiPropertyOptional({ example: 'Robert Doe', description: "Father's full name" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  father_name?: string;

  @ApiPropertyOptional({ example: 'Jane Doe', description: "Mother's full name" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  mother_name?: string;

  @ApiPropertyOptional({ example: 'CBSE', description: '10th Board name' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  board_10th?: string;

  @ApiPropertyOptional({ example: 500, description: 'Total marks in 10th' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  total_marks_10th?: number;

  @ApiPropertyOptional({ example: 85.5, description: 'Percentage in 10th' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  percentage_10th?: number;

  @ApiPropertyOptional({ example: 'CBSE', description: '12th Board name' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  board_12th?: string;

  @ApiPropertyOptional({ example: 480, description: 'Total marks in 12th' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  total_marks_12th?: number;

  @ApiPropertyOptional({ example: 82.0, description: 'Percentage in 12th' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  percentage_12th?: number;

  @ApiPropertyOptional({ example: 'Active', description: 'User status (Active, Inactive, Deactive, Pending)' })
  @IsOptional()
  @IsString()
  status?: string;
}

export class UpdatePasswordSelfDto {
  @ApiPropertyOptional({ example: 1, description: 'Optional user ID (extracted automatically from JWT token if logged in)' })
  @IsOptional()
  id?: number | string;

  @ApiPropertyOptional({ example: 1, description: 'Optional user ID alias' })
  @IsOptional()
  uid?: number | string;

  @ApiProperty({
    example: 'Pass@1234',
    description: 'New password (at least 8 characters, one alphabet, one number, and one special character)',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @Matches(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, {
    message: 'Password must contain at least 8 characters, one alphabet, one number and one special character',
  })
  password: string;
}

export class ChangeUserStatusDto {
  @ApiPropertyOptional({ example: 1, description: 'User ID' })
  @IsOptional()
  id?: string | number;

  @ApiPropertyOptional({ example: 1, description: 'User ID alias' })
  @IsOptional()
  user_id?: string | number;

  @ApiPropertyOptional({ example: 'Active', description: 'User status (Active, Inactive, Deactive, Pending)' })
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ example: 1, description: 'Active status (1 = Active, 0 = Locked/Deactive)' })
  @IsOptional()
  is_active?: number | boolean;
}

export class ToggleUserStatusDto extends ChangeUserStatusDto {}

