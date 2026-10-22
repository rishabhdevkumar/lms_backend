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
exports.CheckEnrollmentDto = exports.UpdateEnrollmentStatusDto = exports.CreateEnrollmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateEnrollmentDto {
}
exports.CreateEnrollmentDto = CreateEnrollmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Student User ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEnrollmentDto.prototype, "users_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Course ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEnrollmentDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'paid',
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending',
        description: 'Initial payment status for enrollment',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['pending', 'paid', 'failed', 'refunded']),
    __metadata("design:type", String)
], CreateEnrollmentDto.prototype, "payment_status", void 0);
class UpdateEnrollmentStatusDto {
}
exports.UpdateEnrollmentStatusDto = UpdateEnrollmentStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Enrollment ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateEnrollmentStatusDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'paid',
        enum: ['pending', 'paid', 'failed', 'refunded'],
        description: 'Updated payment status',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['pending', 'paid', 'failed', 'refunded']),
    __metadata("design:type", String)
], UpdateEnrollmentStatusDto.prototype, "payment_status", void 0);
class CheckEnrollmentDto {
}
exports.CheckEnrollmentDto = CheckEnrollmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Student User ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CheckEnrollmentDto.prototype, "users_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Course ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CheckEnrollmentDto.prototype, "course_id", void 0);
//# sourceMappingURL=create-enrollment.dto.js.map