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
exports.SemesterController = void 0;
const common_1 = require("@nestjs/common");
const semester_service_1 = require("./semester.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
let SemesterController = class SemesterController {
    constructor(semesterService) {
        this.semesterService = semesterService;
    }
    async add(body) {
        return this.semesterService.add(body);
    }
    async getAll() {
        return this.semesterService.getAll();
    }
    async update(body) {
        return this.semesterService.update(body);
    }
    async search(body) {
        return this.semesterService.search(body);
    }
    async delete(id) {
        return this.semesterService.delete(id);
    }
};
exports.SemesterController = SemesterController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SemesterController.prototype, "add", null);
__decorate([
    (0, common_1.Post)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SemesterController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SemesterController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SemesterController.prototype, "search", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SemesterController.prototype, "delete", null);
exports.SemesterController = SemesterController = __decorate([
    (0, common_1.Controller)('semester'),
    __metadata("design:paramtypes", [semester_service_1.SemesterService])
], SemesterController);
//# sourceMappingURL=semester.controller.js.map