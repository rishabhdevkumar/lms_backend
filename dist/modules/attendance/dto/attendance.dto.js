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
exports.GetAttendanceByDateDto = exports.UpdateAttendanceDto = exports.BulkMarkAttendanceDto = exports.StudentAttendanceItemDto = exports.AddAttendanceDto = exports.ATTENDANCE_STATUSES = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
exports.ATTENDANCE_STATUSES = ['present', 'absent', 'late', 'excused'];
class AddAttendanceDto {
}
exports.AddAttendanceDto = AddAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Academic / Class Session ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddAttendanceDto.prototype, "session_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Student User ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddAttendanceDto.prototype, "users_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'present',
        enum: exports.ATTENDANCE_STATUSES,
        description: 'Attendance status: present, absent, late, or excused',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(exports.ATTENDANCE_STATUSES, {
        message: 'status must be one of: present, absent, late, excused',
    }),
    __metadata("design:type", String)
], AddAttendanceDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, description: 'Faculty or Admin User ID who is marking the attendance' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddAttendanceDto.prototype, "marked_by", void 0);
class StudentAttendanceItemDto {
}
exports.StudentAttendanceItemDto = StudentAttendanceItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Student User ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], StudentAttendanceItemDto.prototype, "users_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'present',
        enum: exports.ATTENDANCE_STATUSES,
        description: 'Attendance status',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(exports.ATTENDANCE_STATUSES),
    __metadata("design:type", String)
], StudentAttendanceItemDto.prototype, "status", void 0);
class BulkMarkAttendanceDto {
}
exports.BulkMarkAttendanceDto = BulkMarkAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Session ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BulkMarkAttendanceDto.prototype, "session_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, description: 'Faculty or Admin User ID marking attendance' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BulkMarkAttendanceDto.prototype, "marked_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [StudentAttendanceItemDto],
        description: 'List of students and their attendance status',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StudentAttendanceItemDto),
    __metadata("design:type", Array)
], BulkMarkAttendanceDto.prototype, "attendances", void 0);
class UpdateAttendanceDto {
}
exports.UpdateAttendanceDto = UpdateAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Attendance Record ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAttendanceDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'present',
        enum: exports.ATTENDANCE_STATUSES,
        description: 'Updated attendance status: present, absent, late, or excused',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(exports.ATTENDANCE_STATUSES),
    __metadata("design:type", String)
], UpdateAttendanceDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, description: 'Faculty or Admin User ID updating the attendance' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAttendanceDto.prototype, "marked_by", void 0);
class GetAttendanceByDateDto {
}
exports.GetAttendanceByDateDto = GetAttendanceByDateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-10-16', description: 'Date in YYYY-MM-DD format' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetAttendanceByDateDto.prototype, "date", void 0);
//# sourceMappingURL=attendance.dto.js.map