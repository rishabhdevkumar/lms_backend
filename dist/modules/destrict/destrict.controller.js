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
exports.DestrictController = void 0;
const common_1 = require("@nestjs/common");
const destrict_service_1 = require("./destrict.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
let DestrictController = class DestrictController {
    constructor(destrictService) {
        this.destrictService = destrictService;
    }
    async add(body) {
        return this.destrictService.add(body);
    }
    async getAll() {
        return this.destrictService.getAll();
    }
    async search(body) {
        return this.destrictService.search(body);
    }
    async update(body) {
        return this.destrictService.update(body);
    }
    async deleteBody(body) {
        return this.destrictService.delete(body);
    }
    async deleteParam(id) {
        return this.destrictService.delete(id);
    }
};
exports.DestrictController = DestrictController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DestrictController.prototype, "add", null);
__decorate([
    (0, common_1.Post)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DestrictController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DestrictController.prototype, "search", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DestrictController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DestrictController.prototype, "deleteBody", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DestrictController.prototype, "deleteParam", null);
exports.DestrictController = DestrictController = __decorate([
    (0, common_1.Controller)('destrict'),
    __metadata("design:paramtypes", [destrict_service_1.DestrictService])
], DestrictController);
//# sourceMappingURL=destrict.controller.js.map