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
exports.SubjectResponseDto = exports.GetByCourseSemesterDto = exports.ToggleSubjectStatusDto = exports.SearchSubjectDto = exports.UpdateSubjectDto = exports.AddSubjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AddSubjectDto {
}
exports.AddSubjectDto = AddSubjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Course ID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'course_id is required' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'course_id must be a number' }),
    __metadata("design:type", Number)
], AddSubjectDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Semester ID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'semester_id is required' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'semester_id must be a number' }),
    __metadata("design:type", Number)
], AddSubjectDto.prototype, "semester_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'SUB101', description: 'Subject Code (optional, max 45 chars)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], AddSubjectDto.prototype, "subject_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Engineering Mathematics', description: 'Subject Name (required, max 45 chars)' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'subject_name is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], AddSubjectDto.prototype, "subject_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'EM-1', description: 'Short Name (optional, max 45 chars)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], AddSubjectDto.prototype, "short_name", void 0);
class UpdateSubjectDto {
}
exports.UpdateSubjectDto = UpdateSubjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Subject ID to update' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'id is required' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'id must be a number' }),
    __metadata("design:type", Number)
], UpdateSubjectDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Course ID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'course_id is required' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'course_id must be a number' }),
    __metadata("design:type", Number)
], UpdateSubjectDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Semester ID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'semester_id is required' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'semester_id must be a number' }),
    __metadata("design:type", Number)
], UpdateSubjectDto.prototype, "semester_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'SUB101', description: 'Subject Code (optional, max 45 chars)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], UpdateSubjectDto.prototype, "subject_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Engineering Mathematics', description: 'Subject Name (required, max 45 chars)' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'subject_name is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], UpdateSubjectDto.prototype, "subject_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'EM-1', description: 'Short Name (optional, max 45 chars)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], UpdateSubjectDto.prototype, "short_name", void 0);
class SearchSubjectDto {
}
exports.SearchSubjectDto = SearchSubjectDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Filter by Course ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchSubjectDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Filter by Semester ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchSubjectDto.prototype, "semester_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Math', description: 'Search term in Subject Name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], SearchSubjectDto.prototype, "subject_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'EM', description: 'Search term in Short Name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], SearchSubjectDto.prototype, "short_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, default: 10, description: 'Record count per page' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], SearchSubjectDto.prototype, "rc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, default: 1, description: 'Page number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], SearchSubjectDto.prototype, "page", void 0);
class ToggleSubjectStatusDto {
}
exports.ToggleSubjectStatusDto = ToggleSubjectStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Subject ID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'id is required' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ToggleSubjectStatusDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, enum: [0, 1], description: 'Status: 1 for active, 0 for inactive' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'is_active is required' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsIn)([0, 1], { message: 'is_active must be 0 (inactive) or 1 (active)' }),
    __metadata("design:type", Number)
], ToggleSubjectStatusDto.prototype, "is_active", void 0);
class GetByCourseSemesterDto {
}
exports.GetByCourseSemesterDto = GetByCourseSemesterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Course ID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'course_id is required' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetByCourseSemesterDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Semester ID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'semester_id is required' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetByCourseSemesterDto.prototype, "semester_id", void 0);
class SubjectResponseDto {
}
exports.SubjectResponseDto = SubjectResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], SubjectResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], SubjectResponseDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], SubjectResponseDto.prototype, "semester_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SUB101' }),
    __metadata("design:type", String)
], SubjectResponseDto.prototype, "subject_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Engineering Mathematics' }),
    __metadata("design:type", String)
], SubjectResponseDto.prototype, "subject_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'EM-1' }),
    __metadata("design:type", String)
], SubjectResponseDto.prototype, "short_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], SubjectResponseDto.prototype, "is_active", void 0);
//# sourceMappingURL=subject.dto.js.map