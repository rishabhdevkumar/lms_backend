"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleUserStatusDto = exports.ChangeUserStatusDto = exports.UpdatePasswordSelfDto = exports.UpdateUserDto = exports.UserAuthTokenResponseDto = exports.UserResponseDto = exports.AuthenticateUserDto = exports.AdminAddUserDto = exports.AddUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AddUserDto {
}
exports.AddUserDto = AddUserDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'STU001', description: 'Unique roll number of the user' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], AddUserDto.prototype, "roll_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Full name of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AddUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com', description: 'Email address of the user' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email address format' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AddUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Pass@1234',
        description: 'User password (at least 8 characters, one alphabet, one number, and one special character)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MaxLength)(200),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, {
        message: 'Password must contain at least 8 characters, one alphabet, one number and one special character',
    }),
    __metadata("design:type", String)
], AddUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '9876543210', description: '10-digit mobile phone number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9]{10}$/, { message: 'Phone number must contain exactly 10 digits' }),
    __metadata("design:type", String)
], AddUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'en', description: 'Preferred language code (e.g. en, hi)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], AddUserDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2000-01-15', description: 'Date of birth (YYYY-MM-DD)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddUserDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Male', enum: ['Male', 'Female', 'Other'], description: 'Gender' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Male', 'Female', 'Other'], { message: 'Gender must be Male, Female, or Other' }),
    __metadata("design:type", String)
], AddUserDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'student', enum: ['student', 'faculty', 'admin'], description: 'User role' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['student', 'faculty', 'admin'], { message: 'Role must be student, faculty, or admin' }),
    __metadata("design:type", String)
], AddUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Academic session ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddUserDto.prototype, "session_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Course ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddUserDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Semester ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddUserDto.prototype, "semester_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '123456789012', description: '12-digit Aadhar number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(12),
    __metadata("design:type", String)
], AddUserDto.prototype, "aadhar_no", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Robert Doe', description: "Father's full name" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AddUserDto.prototype, "father_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Jane Doe', description: "Mother's full name" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AddUserDto.prototype, "mother_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'CBSE', description: '10th Board name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AddUserDto.prototype, "board_10th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 500, description: 'Total marks in 10th' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddUserDto.prototype, "total_marks_10th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 85.5, description: 'Percentage in 10th' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddUserDto.prototype, "percentage_10th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'CBSE', description: '12th Board name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AddUserDto.prototype, "board_12th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 480, description: 'Total marks in 12th' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddUserDto.prototype, "total_marks_12th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 82.0, description: 'Percentage in 12th' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddUserDto.prototype, "percentage_12th", void 0);
class AdminAddUserDto {
}
exports.AdminAddUserDto = AdminAddUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'STU001', description: 'Unique roll number of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Roll number is required' }),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], AdminAddUserDto.prototype, "roll_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Full name of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AdminAddUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com', description: 'Email address of the user' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email address format' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AdminAddUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Pass@1234',
        description: 'User password (at least 8 characters, one alphabet, one number, and one special character)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MaxLength)(200),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, {
        message: 'Password must contain at least 8 characters, one alphabet, one number and one special character',
    }),
    __metadata("design:type", String)
], AdminAddUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9876543210', description: '10-digit mobile phone number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Phone number is required' }),
    (0, class_validator_1.Matches)(/^[0-9]{10}$/, { message: 'Phone number must contain exactly 10 digits' }),
    __metadata("design:type", String)
], AdminAddUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'en', description: 'Preferred language code (max 5 chars)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], AdminAddUserDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2000-01-15', description: 'Date of birth (YYYY-MM-DD)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminAddUserDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Male', enum: ['Male', 'Female', 'Other'], description: 'Gender' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Male', 'Female', 'Other'], { message: 'Gender must be Male, Female, or Other' }),
    __metadata("design:type", String)
], AdminAddUserDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'student', enum: ['student', 'faculty', 'admin'], description: 'User role' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['student', 'faculty', 'admin'], { message: 'Role must be student, faculty, or admin' }),
    __metadata("design:type", String)
], AdminAddUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Academic session ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AdminAddUserDto.prototype, "session_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Course ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AdminAddUserDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Semester ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AdminAddUserDto.prototype, "semester_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '123456789012', description: '12-digit Aadhar number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(12),
    __metadata("design:type", String)
], AdminAddUserDto.prototype, "aadhar_no", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Robert Doe', description: "Father's full name" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AdminAddUserDto.prototype, "father_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Jane Doe', description: "Mother's full name" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AdminAddUserDto.prototype, "mother_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'CBSE', description: '10th Board name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AdminAddUserDto.prototype, "board_10th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 500, description: 'Total marks obtained in 10th' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AdminAddUserDto.prototype, "total_marks_10th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 85.5, description: 'Percentage obtained in 10th' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AdminAddUserDto.prototype, "percentage_10th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'CBSE', description: '12th Board name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AdminAddUserDto.prototype, "board_12th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 480, description: 'Total marks obtained in 12th' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AdminAddUserDto.prototype, "total_marks_12th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 82.0, description: 'Percentage obtained in 12th' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AdminAddUserDto.prototype, "percentage_12th", void 0);
class AuthenticateUserDto {
}
exports.AuthenticateUserDto = AuthenticateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com', description: 'User email or roll number' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthenticateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pass@1234', description: 'User password' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthenticateUserDto.prototype, "password", void 0);
class UserResponseDto {
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Unique user identifier' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'STU001', description: 'User roll number' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "roll_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'User full name' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com', description: 'User email' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '9876543210', description: 'User phone number' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'admin', description: 'User role' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "role", void 0);
class UserAuthTokenResponseDto {
}
exports.UserAuthTokenResponseDto = UserAuthTokenResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT Authentication Bearer token' }),
    __metadata("design:type", String)
], UserAuthTokenResponseDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'admin', description: 'User role' }),
    __metadata("design:type", String)
], UserAuthTokenResponseDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => UserResponseDto, description: 'Authenticated user info' }),
    __metadata("design:type", UserResponseDto)
], UserAuthTokenResponseDto.prototype, "data", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'User ID to update' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'User ID is required' }),
    __metadata("design:type", Object)
], UpdateUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'STU001', description: 'Roll number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "roll_no", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'John Doe', description: 'Updated full name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'john.doe@example.com', description: 'Updated email address' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email address format' }),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Pass@1234',
        description: 'Updated password (at least 8 chars, one alphabet, one number, and one special character)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, {
        message: 'Password must contain at least 8 characters, one alphabet, one number and one special character',
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'en', description: 'Preferred language code (max 5 chars)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '9876543210', description: '10-digit mobile phone number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9]{10}$/, { message: 'Phone number must contain exactly 10 digits (0-9 only)' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2000-01-15', description: 'Date of birth (YYYY-MM-DD)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Male', enum: ['Male', 'Female', 'Other'], description: 'Gender' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Male', 'Female', 'Other'], { message: 'Gender must be Male, Female, or Other' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'student', enum: ['student', 'faculty', 'admin'], description: 'User role' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['student', 'faculty', 'admin'], { message: 'Role must be student, faculty, or admin' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Academic session ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "session_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Course ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Semester ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "semester_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '123456789012', description: '12-digit Aadhar number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(12),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "aadhar_no", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Robert Doe', description: "Father's full name" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "father_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Jane Doe', description: "Mother's full name" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "mother_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'CBSE', description: '10th Board name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "board_10th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 500, description: 'Total marks in 10th' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "total_marks_10th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 85.5, description: 'Percentage in 10th' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "percentage_10th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'CBSE', description: '12th Board name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "board_12th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 480, description: 'Total marks in 12th' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "total_marks_12th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 82.0, description: 'Percentage in 12th' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "percentage_12th", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Active', description: 'User status (Active, Inactive, Deactive, Pending)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "status", void 0);
class UpdatePasswordSelfDto {
}
exports.UpdatePasswordSelfDto = UpdatePasswordSelfDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Optional user ID (extracted automatically from JWT token if logged in)' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePasswordSelfDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Optional user ID alias' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePasswordSelfDto.prototype, "uid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Pass@1234',
        description: 'New password (at least 8 characters, one alphabet, one number, and one special character)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, {
        message: 'Password must contain at least 8 characters, one alphabet, one number and one special character',
    }),
    __metadata("design:type", String)
], UpdatePasswordSelfDto.prototype, "password", void 0);
class ChangeUserStatusDto {
}
exports.ChangeUserStatusDto = ChangeUserStatusDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'User ID' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ChangeUserStatusDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'User ID alias' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ChangeUserStatusDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Active', description: 'User status (Active, Inactive, Deactive, Pending)' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ChangeUserStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Active status (1 = Active, 0 = Locked/Deactive)' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ChangeUserStatusDto.prototype, "is_active", void 0);
class ToggleUserStatusDto extends ChangeUserStatusDto {
}
exports.ToggleUserStatusDto = ToggleUserStatusDto;
//# sourceMappingURL=users.dto.js.map