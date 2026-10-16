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
exports.BatchesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const batches_service_1 = require("./batches.service");
const batches_dto_1 = require("./dto/batches.dto");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
let BatchesController = class BatchesController {
    constructor(batchesService) {
        this.batchesService = batchesService;
    }
    async add(dto) {
        return this.batchesService.add(dto);
    }
    async getAll() {
        return this.batchesService.getAll();
    }
    async getById(id) {
        return this.batchesService.getById(id);
    }
    async update(dto) {
        return this.batchesService.update(dto);
    }
    async delete(id) {
        return this.batchesService.delete(id);
    }
    async enrollStudent(dto) {
        return this.batchesService.enrollStudent(dto);
    }
    async removeStudent(dto) {
        return this.batchesService.removeStudent(dto);
    }
    async getStudents(id) {
        return this.batchesService.getStudents(id);
    }
};
exports.BatchesController = BatchesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new batch' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Batch created successfully' }),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [batches_dto_1.AddBatchDto]),
    __metadata("design:returntype", Promise)
], BatchesController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all batches with course and instructor info' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all batches' }),
    (0, common_1.Post)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BatchesController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get batch by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Batch details' }),
    (0, common_1.Post)('getbyid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BatchesController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update batch details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Batch updated successfully' }),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [batches_dto_1.UpdateBatchDto]),
    __metadata("design:returntype", Promise)
], BatchesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a batch (cannot delete if students are enrolled)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Batch deleted successfully' }),
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BatchesController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Enroll a student into a batch' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Student enrolled successfully' }),
    (0, common_1.Post)('enroll-student'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [batches_dto_1.EnrollStudentDto]),
    __metadata("design:returntype", Promise)
], BatchesController.prototype, "enrollStudent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove a student from a batch' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student removed successfully' }),
    (0, common_1.Post)('remove-student'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [batches_dto_1.RemoveStudentDto]),
    __metadata("design:returntype", Promise)
], BatchesController.prototype, "removeStudent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all enrolled students for a specific batch' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of students in the batch' }),
    (0, common_1.Post)('students/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BatchesController.prototype, "getStudents", null);
exports.BatchesController = BatchesController = __decorate([
    (0, swagger_1.ApiTags)('Batches'),
    (0, common_1.Controller)('batches'),
    __metadata("design:paramtypes", [batches_service_1.BatchesService])
], BatchesController);
//# sourceMappingURL=batches.controller.js.map