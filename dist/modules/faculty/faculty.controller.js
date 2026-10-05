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
exports.FacultyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const faculty_service_1 = require("./faculty.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let FacultyController = class FacultyController {
    constructor(facultyService) {
        this.facultyService = facultyService;
    }
    async add(body) {
        return this.facultyService.add(body);
    }
    async getAll() {
        return this.facultyService.getAll();
    }
    async search(body) {
        return this.facultyService.search(body);
    }
    async update(body) {
        return this.facultyService.update(body);
    }
    async authenticate(body) {
        return this.facultyService.authenticate(body);
    }
    async count() {
        return this.facultyService.count();
    }
    async getSelf(user) {
        return this.facultyService.getSelf(user?.id);
    }
    async delete(id) {
        return this.facultyService.delete(id);
    }
};
exports.FacultyController = FacultyController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add a new faculty member' }),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FacultyController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all faculty members' }),
    (0, common_1.Post)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FacultyController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search faculty members' }),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FacultyController.prototype, "search", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update faculty details' }),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FacultyController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Authenticate faculty member' }),
    (0, common_1.Post)('authenticate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FacultyController.prototype, "authenticate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get total faculty count' }),
    (0, common_1.Post)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FacultyController.prototype, "count", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get logged in faculty profile' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('get_self'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FacultyController.prototype, "getSelf", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete faculty member by ID' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacultyController.prototype, "delete", null);
exports.FacultyController = FacultyController = __decorate([
    (0, swagger_1.ApiTags)('Faculty'),
    (0, common_1.Controller)('faculty'),
    __metadata("design:paramtypes", [faculty_service_1.FacultyService])
], FacultyController);
//# sourceMappingURL=faculty.controller.js.map