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
exports.CourseDetailsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const course_details_service_1 = require("./course-details.service");
const dto_1 = require("./dto");
let CourseDetailsController = class CourseDetailsController {
    constructor(courseDetailsService) {
        this.courseDetailsService = courseDetailsService;
    }
    create(dto) {
        return this.courseDetailsService.create(dto);
    }
    getAll() {
        return this.courseDetailsService.getAll();
    }
    getAllPost() {
        return this.courseDetailsService.getAll();
    }
    getActive() {
        return this.courseDetailsService.getActive();
    }
    getByCourseId(courseId) {
        return this.courseDetailsService.getByCourseId(courseId);
    }
    getById(id) {
        return this.courseDetailsService.getById(id);
    }
    updatePost(dto) {
        return this.courseDetailsService.update(dto.id, dto);
    }
    update(id, dto) {
        return this.courseDetailsService.update(id, dto);
    }
    updateStatusPost(dto) {
        return this.courseDetailsService.updateStatus(dto.id, dto);
    }
    updateStatus(id, dto) {
        return this.courseDetailsService.updateStatus(id, dto);
    }
    deletePost(id) {
        return this.courseDetailsService.delete(id);
    }
    delete(id) {
        return this.courseDetailsService.delete(id);
    }
};
exports.CourseDetailsController = CourseDetailsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add a new course detail record' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Course details successfully created' }),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCourseDetailDto]),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all course details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all course details' }),
    (0, common_1.Get)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all course details (POST fallback)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all course details' }),
    (0, common_1.Post)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "getAllPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all active/published course details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of active course details' }),
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "getActive", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get course detail by course ID' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', example: 1, description: 'Course ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course detail for specified course ID' }),
    (0, common_1.Get)('course/:courseId'),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "getByCourseId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get course detail by detail record ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, description: 'Course detail ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course detail record' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update course detail record' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course detail updated successfully' }),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateCourseDetailDto]),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "updatePost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update course detail by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, description: 'Course detail record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course detail updated successfully' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateCourseDetailDto]),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update course detail active status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course detail status updated successfully' }),
    (0, common_1.Post)('update-status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateCourseDetailStatusDto]),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "updateStatusPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update course detail active status by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, description: 'Course detail record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course detail status updated successfully' }),
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateCourseDetailStatusDto]),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "updateStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete course detail by ID (POST fallback)' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, description: 'Course detail record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course detail deleted successfully' }),
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "deletePost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete course detail by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, description: 'Course detail record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course detail deleted successfully' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "delete", null);
exports.CourseDetailsController = CourseDetailsController = __decorate([
    (0, swagger_1.ApiTags)('Course Details'),
    (0, common_1.Controller)('course-details'),
    __metadata("design:paramtypes", [course_details_service_1.CourseDetailsService])
], CourseDetailsController);
//# sourceMappingURL=course-details.controller.js.map