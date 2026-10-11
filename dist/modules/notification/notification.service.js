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
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let NotificationService = NotificationService_1 = class NotificationService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(NotificationService_1.name);
    }
    async add(dto) {
        if (!dto.user_id || !dto.title || !dto.message) {
            return { ok: false, msg: 'user_id, title, and message are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_notification_add(?, ?, ?, ?)', [
                dto.user_id,
                dto.title,
                dto.message,
                dto.type || 'info',
            ]);
            return result[0]?.[0] || { ok: true, msg: 'Notification created successfully' };
        }
        catch (error) {
            this.logger.error('Error adding notification:', error);
            return { ok: false, msg: 'An error occurred while creating notification', error: error.message };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_notification_getall()', []);
            return data[0] || [];
        }
        catch (error) {
            this.logger.error('Error fetching all notifications:', error);
            return [];
        }
    }
    async getById(id) {
        if (!id) {
            return { ok: false, msg: 'Notification ID is required' };
        }
        try {
            const data = await this.db.execute('CALL sp_notification_get_by_id(?)', [Number(id)]);
            return data[0]?.[0] || null;
        }
        catch (error) {
            this.logger.error('Error fetching notification by id:', error);
            return null;
        }
    }
    async getByUserId(userId) {
        if (!userId) {
            return { ok: false, msg: 'User ID is required' };
        }
        try {
            const data = await this.db.execute('CALL sp_notification_get_by_user_id(?)', [Number(userId)]);
            return data[0] || [];
        }
        catch (error) {
            this.logger.error('Error fetching notifications by user id:', error);
            return [];
        }
    }
    async markAsRead(id) {
        if (!id) {
            return { ok: false, msg: 'Notification ID is required' };
        }
        try {
            const data = await this.db.execute('CALL sp_notification_mark_as_read(?)', [Number(id)]);
            return data[0]?.[0] || { ok: true, msg: 'Notification marked as read' };
        }
        catch (error) {
            this.logger.error('Error marking notification as read:', error);
            return { ok: false, msg: 'Failed to mark notification as read' };
        }
    }
    async markAllAsRead(userId) {
        if (!userId) {
            return { ok: false, msg: 'User ID is required' };
        }
        try {
            const data = await this.db.execute('CALL sp_notification_mark_all_as_read(?)', [Number(userId)]);
            return data[0]?.[0] || { ok: true, msg: 'All notifications marked as read' };
        }
        catch (error) {
            this.logger.error('Error marking all notifications as read:', error);
            return { ok: false, msg: 'Failed to mark all notifications as read' };
        }
    }
    async update(dto) {
        if (!dto.id || !dto.title || !dto.message) {
            return { ok: false, msg: 'id, title, and message are required' };
        }
        try {
            const data = await this.db.execute('CALL sp_notification_update(?, ?, ?, ?)', [
                dto.id,
                dto.title,
                dto.message,
                dto.type || 'info',
            ]);
            return data[0]?.[0] || { ok: true, msg: 'Notification updated successfully' };
        }
        catch (error) {
            this.logger.error('Error updating notification:', error);
            return { ok: false, msg: 'Failed to update notification' };
        }
    }
    async delete(id) {
        if (!id) {
            return { ok: false, msg: 'Notification ID is required' };
        }
        try {
            const data = await this.db.execute('CALL sp_notification_delete(?)', [Number(id)]);
            return data[0]?.[0] || { ok: true, msg: 'Notification deleted successfully' };
        }
        catch (error) {
            this.logger.error('Error deleting notification:', error);
            return { ok: false, msg: 'Failed to delete notification' };
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map