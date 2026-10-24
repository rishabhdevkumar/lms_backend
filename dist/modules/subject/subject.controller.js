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
exports.SubjectController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const subject_service_1 = require("./subject.service");
const subject_dto_1 = require("./dto/subject.dto");
let SubjectController = class SubjectController {
    constructor(subjectService) {
        this.subjectService = subjectService;
    }
    async add(body) {
        return this.subjectService.add(body);
    }
    async getAll() {
        return this.subjectService.getAll();
    }
    async getAllPost() {
        return this.subjectService.getAll();
    }
    async update(body) {
        return this.subjectService.update(body);
    }
    async updatePost(body) {
        return this.subjectService.update(body);
    }
    async updateById(id, body) {
        if (id && !body.id) {
            body.id = Number(id);
        }
        return this.subjectService.update(body);
    }
    async updateByIdPost(id, body) {
        if (id && !body.id) {
            body.id = Number(id);
        }
        return this.subjectService.update(body);
    }
    async search(body) {
        return this.subjectService.search(body);
    }
    async searchGet(query) {
        return this.subjectService.search(query);
    }
    async delete(id) {
        return this.subjectService.delete(id);
    }
    async getByCourseSemesterGet(courseId, semesterId) {
        return this.subjectService.getByCourseSemester(courseId, semesterId);
    }
    async getByCourseSemester(body) {
        return this.subjectService.getByCourseSemester(body.course_id, body.semester_id);
    }
    async toggleStatus(body) {
        return this.subjectService.toggleStatus(body);
    }
    async getChapterCount(paramId, queryId) {
        const id = paramId || queryId;
        return this.subjectService.getChapterCount(id);
    }
    async getChapterCountPost(body) {
        return this.subjectService.getChapterCount(body?.subject_id);
    }
};
exports.SubjectController = SubjectController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add a new subject' }),
    (0, swagger_1.ApiBody)({ type: subject_dto_1.AddSubjectDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Subject added successfully' }),
    (0, common_1.Post)(['', 'add']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subject_dto_1.AddSubjectDto]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all active subjects' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all active subjects', type: [subject_dto_1.SubjectResponseDto] }),
    (0, common_1.Get)(['', 'getall']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "getAllPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing subject' }),
    (0, swagger_1.ApiBody)({ type: subject_dto_1.UpdateSubjectDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subject updated successfully' }),
    (0, common_1.Put)(['', 'update']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subject_dto_1.UpdateSubjectDto]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subject_dto_1.UpdateSubjectDto]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "updatePost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update subject by ID parameter' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Subject ID', example: 1 }),
    (0, swagger_1.ApiBody)({ type: subject_dto_1.UpdateSubjectDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subject updated successfully' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subject_dto_1.UpdateSubjectDto]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "updateById", null);
__decorate([
    (0, common_1.Post)(':id/update'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subject_dto_1.UpdateSubjectDto]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "updateByIdPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search active subjects with pagination and filters' }),
    (0, swagger_1.ApiBody)({ type: subject_dto_1.SearchSubjectDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Filtered list of subjects' }),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subject_dto_1.SearchSubjectDto]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "search", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search active subjects with query parameters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Filtered list of subjects' }),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subject_dto_1.SearchSubjectDto]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "searchGet", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate / Soft-delete a subject' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Subject ID to deactivate', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subject deactivated successfully' }),
    (0, common_1.Post)(['delete/:id', ':id/delete']),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get subjects by course ID and semester ID' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', example: 1, description: 'Course ID' }),
    (0, swagger_1.ApiParam)({ name: 'semesterId', example: 1, description: 'Semester ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of subjects in specified course and semester' }),
    (0, common_1.Get)('course/:courseId/semester/:semesterId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('semesterId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "getByCourseSemesterGet", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get subjects by course ID and semester ID (POST body)' }),
    (0, swagger_1.ApiBody)({ type: subject_dto_1.GetByCourseSemesterDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of subjects in specified course and semester' }),
    (0, common_1.Post)(['get_by_course_semester', 'by_course_semester']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subject_dto_1.GetByCourseSemesterDto]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "getByCourseSemester", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Toggle subject active status (1 for active, 0 for inactive)' }),
    (0, swagger_1.ApiBody)({ type: subject_dto_1.ToggleSubjectStatusDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subject status toggled successfully' }),
    (0, common_1.Post)(['toggle_status', 'status']),
    (0, common_1.Patch)('status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subject_dto_1.ToggleSubjectStatusDto]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "toggleStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get chapter count for all subjects or a specific subject' }),
    (0, swagger_1.ApiQuery)({ name: 'subject_id', required: false, description: 'Optional Subject ID filter', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chapter count per subject' }),
    (0, common_1.Get)(['chapter_count', 'chapter_count/:id']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('subject_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "getChapterCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get chapter count for all subjects or a specific subject (POST body)' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                subject_id: { type: 'number', example: 1 },
            },
        },
        required: false,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chapter count per subject' }),
    (0, common_1.Post)('chapter_count'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "getChapterCountPost", null);
exports.SubjectController = SubjectController = __decorate([
    (0, swagger_1.ApiTags)('Subject'),
    (0, common_1.Controller)('subject'),
    __metadata("design:paramtypes", [subject_service_1.SubjectService])
], SubjectController);
//# sourceMappingURL=subject.controller.js.map