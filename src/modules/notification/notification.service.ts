import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { AddNotificationDto, UpdateNotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(dto: AddNotificationDto) {
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
    } catch (error: any) {
      this.logger.error('Error adding notification:', error);
      return { ok: false, msg: 'An error occurred while creating notification', error: error.message };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_notification_getall()', []);
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error fetching all notifications:', error);
      return [];
    }
  }

  async getById(id: number) {
    if (!id) {
      return { ok: false, msg: 'Notification ID is required' };
    }
    try {
      const data = await this.db.execute('CALL sp_notification_get_by_id(?)', [Number(id)]);
      return data[0]?.[0] || null;
    } catch (error: any) {
      this.logger.error('Error fetching notification by id:', error);
      return null;
    }
  }

  async getByUserId(userId: number) {
    if (!userId) {
      return { ok: false, msg: 'User ID is required' };
    }
    try {
      const data = await this.db.execute('CALL sp_notification_get_by_user_id(?)', [Number(userId)]);
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error fetching notifications by user id:', error);
      return [];
    }
  }

  async markAsRead(id: number) {
    if (!id) {
      return { ok: false, msg: 'Notification ID is required' };
    }
    try {
      const data = await this.db.execute('CALL sp_notification_mark_as_read(?)', [Number(id)]);
      return data[0]?.[0] || { ok: true, msg: 'Notification marked as read' };
    } catch (error: any) {
      this.logger.error('Error marking notification as read:', error);
      return { ok: false, msg: 'Failed to mark notification as read' };
    }
  }

  async markAllAsRead(userId: number) {
    if (!userId) {
      return { ok: false, msg: 'User ID is required' };
    }
    try {
      const data = await this.db.execute('CALL sp_notification_mark_all_as_read(?)', [Number(userId)]);
      return data[0]?.[0] || { ok: true, msg: 'All notifications marked as read' };
    } catch (error: any) {
      this.logger.error('Error marking all notifications as read:', error);
      return { ok: false, msg: 'Failed to mark all notifications as read' };
    }
  }

  async update(dto: UpdateNotificationDto) {
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
    } catch (error: any) {
      this.logger.error('Error updating notification:', error);
      return { ok: false, msg: 'Failed to update notification' };
    }
  }

  async delete(id: number) {
    if (!id) {
      return { ok: false, msg: 'Notification ID is required' };
    }
    try {
      const data = await this.db.execute('CALL sp_notification_delete(?)', [Number(id)]);
      return data[0]?.[0] || { ok: true, msg: 'Notification deleted successfully' };
    } catch (error: any) {
      this.logger.error('Error deleting notification:', error);
      return { ok: false, msg: 'Failed to delete notification' };
    }
  }
}
