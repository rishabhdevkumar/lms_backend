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
exports.ChapterResponseDto = exports.ToggleChapterStatusDto = exports.SearchChapterDto = exports.UpdateChapterDto = exports.AddChapterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AddChapterDto {
}
exports.AddChapterDto = AddChapterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Course ID (optional, auto-resolved from subject if omitted)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'course_id must be a number' }),
    __metadata("design:type", Number)
], AddChapterDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Semester ID (optional, auto-resolved from subject if omitted)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'semester_id must be a number' }),
    __metadata("design:type", Number)
], AddChapterDto.prototype, "semester_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Subject ID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'subject_id is required' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'subject_id must be a number' }),
    __metadata("design:type", Number)
], AddChapterDto.prototype, "subject_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Differential Calculus', description: 'Chapter Name (required, max 255 chars)' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'chapter_name is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], AddChapterDto.prototype, "chapter_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Diff Calc', description: 'Short Name (optional, max 45 chars)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], AddChapterDto.prototype, "short_name", void 0);
class UpdateChapterDto {
}
exports.UpdateChapterDto = UpdateChapterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Chapter ID to update' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'id is required' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'id must be a number' }),
    __metadata("design:type", Number)
], UpdateChapterDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Course ID (optional, auto-resolved from subject if omitted)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'course_id must be a number' }),
    __metadata("design:type", Number)
], UpdateChapterDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Semester ID (optional, auto-resolved from subject if omitted)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'semester_id must be a number' }),
    __metadata("design:type", Number)
], UpdateChapterDto.prototype, "semester_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Subject ID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'subject_id is required' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'subject_id must be a number' }),
    __metadata("design:type", Number)
], UpdateChapterDto.prototype, "subject_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Differential Calculus', description: 'Chapter Name (required, max 255 chars)' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'chapter_name is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UpdateChapterDto.prototype, "chapter_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Diff Calc', description: 'Short Name (optional, max 45 chars)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], UpdateChapterDto.prototype, "short_name", void 0);
class SearchChapterDto {
}
exports.SearchChapterDto = SearchChapterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Filter by Course ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchChapterDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Filter by Semester ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchChapterDto.prototype, "semester_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Filter by Subject ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchChapterDto.prototype, "subject_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Calculus', description: 'Search term in Chapter Name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], SearchChapterDto.prototype, "chapter_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Diff', description: 'Search term in Short Name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], SearchChapterDto.prototype, "short_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, default: 10, description: 'Record count per page' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], SearchChapterDto.prototype, "rc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, default: 1, description: 'Page number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], SearchChapterDto.prototype, "page", void 0);
class ToggleChapterStatusDto {
}
exports.ToggleChapterStatusDto = ToggleChapterStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Chapter ID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'id is required' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ToggleChapterStatusDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, enum: [0, 1], description: 'Status: 1 for active, 0 for inactive' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'is_active is required' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsIn)([0, 1], { message: 'is_active must be 0 (inactive) or 1 (active)' }),
    __metadata("design:type", Number)
], ToggleChapterStatusDto.prototype, "is_active", void 0);
class ChapterResponseDto {
}
exports.ChapterResponseDto = ChapterResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ChapterResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ChapterResponseDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ChapterResponseDto.prototype, "semester_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ChapterResponseDto.prototype, "subject_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Differential Calculus' }),
    __metadata("design:type", String)
], ChapterResponseDto.prototype, "chapter_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Diff Calc' }),
    __metadata("design:type", String)
], ChapterResponseDto.prototype, "short_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], ChapterResponseDto.prototype, "is_active", void 0);
//# sourceMappingURL=chapter.dto.js.map