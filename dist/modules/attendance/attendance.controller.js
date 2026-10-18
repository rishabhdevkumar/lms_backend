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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const attendance_service_1 = require("./attendance.service");
const attendance_dto_1 = require("./dto/attendance.dto");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async add(dto) {
        return this.attendanceService.add(dto);
    }
    async bulkAdd(dto) {
        return this.attendanceService.bulkAdd(dto);
    }
    async getAll() {
        return this.attendanceService.getAll();
    }
    async getById(id) {
        return this.attendanceService.getById(id);
    }
    async update(dto) {
        return this.attendanceService.update(dto);
    }
    async getBySession(id) {
        return this.attendanceService.getBySession(id);
    }
    async getByStudent(id) {
        return this.attendanceService.getByStudent(id);
    }
    async getByBatch(id) {
        return this.attendanceService.getByBatch(id);
    }
    async getByDate(dto) {
        return this.attendanceService.getByDate(dto.date);
    }
    async getByDateParam(date) {
        return this.attendanceService.getByDate(date);
    }
    async getPercentage(id) {
        return this.attendanceService.getPercentage(id);
    }
    async delete(id) {
        return this.attendanceService.delete(id);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Mark attendance for a student' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Attendance marked successfully' }),
    (0, common_1.Post)(['', 'add', 'mark']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.AddAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Bulk mark attendance for multiple students' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Bulk attendance marked' }),
    (0, common_1.Post)('bulk-add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.BulkMarkAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "bulkAdd", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all attendance records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all attendance records' }),
    (0, common_1.Get)(['', 'getall']),
    (0, common_1.Post)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance record by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Attendance ID', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance details' }),
    (0, common_1.Get)('getbyid/:id'),
    (0, common_1.Post)('getbyid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update attendance record' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance updated successfully' }),
    (0, common_1.Put)('update'),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.UpdateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all attendance records for a specific session' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Session ID', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of attendance in the session' }),
    (0, common_1.Get)(['session/:id', 'getby-session/:id']),
    (0, common_1.Post)(['session/:id', 'getby-session/:id']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getBySession", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance history for a specific student' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Student User ID', example: 2 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student attendance history' }),
    (0, common_1.Get)(['student/:id', 'getby-student/:id']),
    (0, common_1.Post)(['student/:id', 'getby-student/:id']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getByStudent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance records for a specific batch' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Batch ID', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance records for the batch' }),
    (0, common_1.Get)(['batch/:id', 'getby-batch/:id']),
    (0, common_1.Post)(['batch/:id', 'getby-batch/:id']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getByBatch", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance records by date (YYYY-MM-DD)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance on specified date' }),
    (0, common_1.Post)('date'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.GetAttendanceByDateDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getByDate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance records by date param (YYYY-MM-DD)' }),
    (0, swagger_1.ApiParam)({ name: 'date', description: 'Date in YYYY-MM-DD format', example: '2026-10-16' }),
    (0, common_1.Get)('date/:date'),
    __param(0, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getByDateParam", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get student attendance percentage and statistics' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Student User ID', example: 2 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student attendance percentage and statistics' }),
    (0, common_1.Get)(['percentage/:id', 'getpercentage/:id']),
    (0, common_1.Post)(['percentage/:id', 'getpercentage/:id']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getPercentage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an attendance record by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Attendance ID', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance record deleted' }),
    (0, common_1.Delete)(':id'),
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "delete", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, swagger_1.ApiTags)('Attendance'),
    (0, common_1.Controller)('attendance'),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map