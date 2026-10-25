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
exports.SyllabusController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const syllabus_service_1 = require("./syllabus.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const dto_1 = require("./dto");
let SyllabusController = class SyllabusController {
    constructor(syllabusService) {
        this.syllabusService = syllabusService;
    }
    async add(body) {
        return this.syllabusService.add(body);
    }
    async getAll() {
        return this.syllabusService.getAll();
    }
    async getAllPost() {
        return this.syllabusService.getAll();
    }
    async update(body) {
        return this.syllabusService.update(body);
    }
    async search(body) {
        return this.syllabusService.search(body);
    }
    async getByCourseSemester(body) {
        return this.syllabusService.getByCourseSemester(body.course_id, body.semester_id);
    }
    async delete(id) {
        return this.syllabusService.delete(id);
    }
};
exports.SyllabusController = SyllabusController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add a new syllabus' }),
    (0, swagger_1.ApiBody)({ type: dto_1.AddSyllabusDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Syllabus added successfully' }),
    (0, common_1.Post)(['', 'add']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AddSyllabusDto]),
    __metadata("design:returntype", Promise)
], SyllabusController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all active syllabi' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all active syllabi', type: [dto_1.SyllabusResponseDto] }),
    (0, common_1.Get)(['', 'getall']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SyllabusController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SyllabusController.prototype, "getAllPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing syllabus' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateSyllabusDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Syllabus updated successfully' }),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateSyllabusDto]),
    __metadata("design:returntype", Promise)
], SyllabusController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search syllabi with filters and pagination' }),
    (0, swagger_1.ApiBody)({ type: dto_1.SearchSyllabusDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Search results for syllabus' }),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SearchSyllabusDto]),
    __metadata("design:returntype", Promise)
], SyllabusController.prototype, "search", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get syllabus by Course ID and Semester ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.GetSyllabusByCourseSemesterDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Syllabus by course and semester' }),
    (0, common_1.Post)('course-semester'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GetSyllabusByCourseSemesterDto]),
    __metadata("design:returntype", Promise)
], SyllabusController.prototype, "getByCourseSemester", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete (soft-delete) a syllabus by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Syllabus ID' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SyllabusController.prototype, "delete", null);
exports.SyllabusController = SyllabusController = __decorate([
    (0, swagger_1.ApiTags)('Syllabus'),
    (0, common_1.Controller)('syllabus'),
    __metadata("design:paramtypes", [syllabus_service_1.SyllabusService])
], SyllabusController);
//# sourceMappingURL=syllabus.controller.js.map