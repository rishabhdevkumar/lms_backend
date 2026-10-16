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
exports.RemoveStudentDto = exports.EnrollStudentDto = exports.UpdateBatchDto = exports.AddBatchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AddBatchDto {
}
exports.AddBatchDto = AddBatchDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Course ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddBatchDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, description: 'Faculty / Instructor User ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddBatchDto.prototype, "users_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-11-01', description: 'Batch start date (YYYY-MM-DD)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddBatchDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-12-01', description: 'Batch end date (YYYY-MM-DD)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddBatchDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '10:00:00', description: 'Batch start time (HH:mm:ss)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddBatchDto.prototype, "start_time", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '12:00:00', description: 'Batch end time (HH:mm:ss)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddBatchDto.prototype, "end_time", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Lab 101', description: 'Room / Class designation' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], AddBatchDto.prototype, "room", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'upcoming', enum: ['active', 'upcoming', 'completed'], description: 'Initial batch status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['active', 'upcoming', 'completed']),
    __metadata("design:type", String)
], AddBatchDto.prototype, "status", void 0);
class UpdateBatchDto {
}
exports.UpdateBatchDto = UpdateBatchDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Batch ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateBatchDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'BAT001', description: 'Batch Code' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], UpdateBatchDto.prototype, "batch_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Course ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateBatchDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, description: 'Faculty / Instructor User ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateBatchDto.prototype, "users_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-11-01', description: 'Batch start date (YYYY-MM-DD)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBatchDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-12-01', description: 'Batch end date (YYYY-MM-DD)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBatchDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '10:00:00', description: 'Batch start time (HH:mm:ss)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBatchDto.prototype, "start_time", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '12:00:00', description: 'Batch end time (HH:mm:ss)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBatchDto.prototype, "end_time", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Lab 102', description: 'Room / Class designation' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], UpdateBatchDto.prototype, "room", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'active', enum: ['active', 'upcoming', 'completed'], description: 'Batch status' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['active', 'upcoming', 'completed']),
    __metadata("design:type", String)
], UpdateBatchDto.prototype, "status", void 0);
class EnrollStudentDto {
}
exports.EnrollStudentDto = EnrollStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Batch ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnrollStudentDto.prototype, "batch_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Student User ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnrollStudentDto.prototype, "users_id", void 0);
class RemoveStudentDto {
}
exports.RemoveStudentDto = RemoveStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Batch ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RemoveStudentDto.prototype, "batch_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Student User ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RemoveStudentDto.prototype, "users_id", void 0);
//# sourceMappingURL=batches.dto.js.map