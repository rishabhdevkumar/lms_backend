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
exports.AuthTokenResponseDto = exports.StudentResponseDto = exports.AuthenticateStudentDto = exports.QuickAddStudentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class QuickAddStudentDto {
}
exports.QuickAddStudentDto = QuickAddStudentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'John Doe', description: 'Full name of the student' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QuickAddStudentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'john.doe@example.com', description: 'Email address of the student' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QuickAddStudentDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+1234567890', description: 'Contact phone number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QuickAddStudentDto.prototype, "phone", void 0);
class AuthenticateStudentDto {
}
exports.AuthenticateStudentDto = AuthenticateStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com', description: 'Registered student email' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthenticateStudentDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'secret123', description: 'Account password' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthenticateStudentDto.prototype, "password", void 0);
class StudentResponseDto {
}
exports.StudentResponseDto = StudentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '101', description: 'Unique student identifier' }),
    __metadata("design:type", String)
], StudentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Student full name' }),
    __metadata("design:type", String)
], StudentResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com', description: 'Student email' }),
    __metadata("design:type", String)
], StudentResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'R-2026-001', description: 'Student roll number' }),
    __metadata("design:type", String)
], StudentResponseDto.prototype, "rollNo", void 0);
class AuthTokenResponseDto {
}
exports.AuthTokenResponseDto = AuthTokenResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT Authentication Bearer token' }),
    __metadata("design:type", String)
], AuthTokenResponseDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => StudentResponseDto, description: 'Authenticated student info' }),
    __metadata("design:type", StudentResponseDto)
], AuthTokenResponseDto.prototype, "user", void 0);
//# sourceMappingURL=student.dto.js.map