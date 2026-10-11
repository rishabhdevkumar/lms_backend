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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notification_service_1 = require("./notification.service");
const notification_dto_1 = require("./dto/notification.dto");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async add(dto) {
        return this.notificationService.add(dto);
    }
    async getAll() {
        return this.notificationService.getAll();
    }
    async getById(id) {
        return this.notificationService.getById(id);
    }
    async getByUserId(userId) {
        return this.notificationService.getByUserId(userId);
    }
    async markAsRead(body) {
        return this.notificationService.markAsRead(body.id);
    }
    async markAllAsRead(body) {
        return this.notificationService.markAllAsRead(body.user_id);
    }
    async update(dto) {
        return this.notificationService.update(dto);
    }
    async delete(id) {
        return this.notificationService.delete(id);
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add a new notification' }),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.AddNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all notifications' }),
    (0, common_1.Post)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get notification by ID' }),
    (0, common_1.Post)('getbyid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get notifications by User ID' }),
    (0, common_1.Post)('getbyuserid/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getByUserId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Mark single notification as read' }),
    (0, common_1.Post)('mark-as-read'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.MarkAsReadDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAsRead", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Mark all notifications as read for a user' }),
    (0, common_1.Post)('mark-all-as-read'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.MarkAllAsReadDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAllAsRead", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update notification details' }),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.UpdateNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a notification' }),
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "delete", null);
exports.NotificationController = NotificationController = __decorate([
    (0, swagger_1.ApiTags)('Notification'),
    (0, common_1.Controller)('notification'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map