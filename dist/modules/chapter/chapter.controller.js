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
exports.ChapterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chapter_service_1 = require("./chapter.service");
const chapter_dto_1 = require("./dto/chapter.dto");
let ChapterController = class ChapterController {
    constructor(chapterService) {
        this.chapterService = chapterService;
    }
    async add(body) {
        return this.chapterService.add(body);
    }
    async getAll() {
        return this.chapterService.getAll();
    }
    async getAllPost() {
        return this.chapterService.getAll();
    }
    async update(body) {
        return this.chapterService.update(body);
    }
    async updatePost(body) {
        return this.chapterService.update(body);
    }
    async updateById(id, body) {
        if (id && !body.id) {
            body.id = Number(id);
        }
        return this.chapterService.update(body);
    }
    async updateByIdPost(id, body) {
        if (id && !body.id) {
            body.id = Number(id);
        }
        return this.chapterService.update(body);
    }
    async search(body) {
        return this.chapterService.search(body);
    }
    async searchGet(query) {
        return this.chapterService.search(query);
    }
    async getById(id) {
        return this.chapterService.getById(id);
    }
    async delete(id) {
        return this.chapterService.delete(id);
    }
    async getBySubjectGet(subjectId) {
        return this.chapterService.getBySubject(subjectId);
    }
    async getBySubjectPost(body) {
        return this.chapterService.getBySubject(body.subject_id);
    }
    async toggleStatus(body) {
        return this.chapterService.toggleStatus(body);
    }
};
exports.ChapterController = ChapterController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add a new chapter' }),
    (0, swagger_1.ApiBody)({ type: chapter_dto_1.AddChapterDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Chapter added successfully' }),
    (0, common_1.Post)(['', 'add']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chapter_dto_1.AddChapterDto]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all active chapters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all active chapters', type: [chapter_dto_1.ChapterResponseDto] }),
    (0, common_1.Get)(['', 'getall']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "getAllPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing chapter' }),
    (0, swagger_1.ApiBody)({ type: chapter_dto_1.UpdateChapterDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chapter updated successfully' }),
    (0, common_1.Put)(['', 'update']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chapter_dto_1.UpdateChapterDto]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chapter_dto_1.UpdateChapterDto]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "updatePost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update chapter by ID parameter' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Chapter ID', example: 1 }),
    (0, swagger_1.ApiBody)({ type: chapter_dto_1.UpdateChapterDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chapter updated successfully' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, chapter_dto_1.UpdateChapterDto]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "updateById", null);
__decorate([
    (0, common_1.Post)(':id/update'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, chapter_dto_1.UpdateChapterDto]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "updateByIdPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search active chapters with pagination and filters' }),
    (0, swagger_1.ApiBody)({ type: chapter_dto_1.SearchChapterDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Filtered list of chapters' }),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chapter_dto_1.SearchChapterDto]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "search", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search active chapters with query parameters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Filtered list of chapters' }),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chapter_dto_1.SearchChapterDto]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "searchGet", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get chapter by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, description: 'Chapter ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chapter details', type: chapter_dto_1.ChapterResponseDto }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate / Soft-delete a chapter' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Chapter ID to deactivate', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chapter deactivated successfully' }),
    (0, common_1.Post)(['delete/:id', ':id/delete']),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get active chapters by subject ID' }),
    (0, swagger_1.ApiParam)({ name: 'subjectId', example: 1, description: 'Subject ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of chapters for specified subject' }),
    (0, common_1.Get)(['subject/:subjectId', 'by_subject/:subjectId']),
    __param(0, (0, common_1.Param)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "getBySubjectGet", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get active chapters by subject ID (POST body)' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['subject_id'],
            properties: {
                subject_id: { type: 'number', example: 1 },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of chapters for specified subject' }),
    (0, common_1.Post)(['get_by_subject', 'by_subject']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "getBySubjectPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Toggle chapter active status (1 for active, 0 for inactive)' }),
    (0, swagger_1.ApiBody)({ type: chapter_dto_1.ToggleChapterStatusDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chapter status toggled successfully' }),
    (0, common_1.Post)(['toggle_status', 'status']),
    (0, common_1.Patch)('status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chapter_dto_1.ToggleChapterStatusDto]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "toggleStatus", null);
exports.ChapterController = ChapterController = __decorate([
    (0, swagger_1.ApiTags)('Chapter'),
    (0, common_1.Controller)('chapter'),
    __metadata("design:paramtypes", [chapter_service_1.ChapterService])
], ChapterController);
//# sourceMappingURL=chapter.controller.js.map