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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const student_service_1 = require("./student.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    async quickAdd(body) {
        return this.studentService.quickAdd(body);
    }
    async add(body) {
        return this.studentService.add(body);
    }
    async authenticate(body) {
        return this.studentService.authenticate(body);
    }
    async getAll() {
        return this.studentService.getAll();
    }
    async details(id) {
        return this.studentService.details(id);
    }
    async update(body) {
        return this.studentService.update(body);
    }
    async search(body) {
        return this.studentService.search(body);
    }
    async updateLanguage(body) {
        return this.studentService.updateLanguage(body);
    }
    async updateEmail(body) {
        return this.studentService.updateEmail(body);
    }
    async updatePassword(body) {
        return this.studentService.updatePassword(body);
    }
    async count() {
        return this.studentService.count();
    }
    async getNextId() {
        return this.studentService.getNextId();
    }
    async getNextRollNo() {
        return this.studentService.getNextRollNo();
    }
    async getSelf(user) {
        return this.studentService.getSelf(user?.id);
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Quick add student' }),
    (0, common_1.Post)('quick_add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "quickAdd", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Full add student' }),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Authenticate student and return JWT token' }),
    (0, common_1.Post)('authenticate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "authenticate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all students' }),
    (0, common_1.Post)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get student details by ID' }),
    (0, common_1.Post)('details/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "details", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update student information' }),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search students' }),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "search", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update student language preference' }),
    (0, common_1.Post)('update_language'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "updateLanguage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update student email' }),
    (0, common_1.Post)('update_email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "updateEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update student password' }),
    (0, common_1.Post)('update_password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "updatePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get total student count' }),
    (0, common_1.Post)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "count", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get next available student ID' }),
    (0, common_1.Post)('getnextid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getNextId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get next available student roll number' }),
    (0, common_1.Post)('getnextrollno'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getNextRollNo", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get logged in student profile' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('get_self'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getSelf", null);
exports.StudentController = StudentController = __decorate([
    (0, swagger_1.ApiTags)('Student'),
    (0, common_1.Controller)('student'),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map