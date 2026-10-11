import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { AddNotificationDto, UpdateNotificationDto, MarkAsReadDto, MarkAllAsReadDto } from './dto/notification.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Add a new notification' })
  @Post('add')
  async add(@Body() dto: AddNotificationDto) {
    return this.notificationService.add(dto);
  }

  @ApiOperation({ summary: 'Get all notifications' })
  @Post('getall')
  async getAll() {
    return this.notificationService.getAll();
  }

  @ApiOperation({ summary: 'Get notification by ID' })
  @Post('getbyid/:id')
  async getById(@Param('id') id: number) {
    return this.notificationService.getById(id);
  }

  @ApiOperation({ summary: 'Get notifications by User ID' })
  @Post('getbyuserid/:userId')
  async getByUserId(@Param('userId') userId: number) {
    return this.notificationService.getByUserId(userId);
  }

  @ApiOperation({ summary: 'Mark single notification as read' })
  @Post('mark-as-read')
  async markAsRead(@Body() body: MarkAsReadDto) {
    return this.notificationService.markAsRead(body.id);
  }

  @ApiOperation({ summary: 'Mark all notifications as read for a user' })
  @Post('mark-all-as-read')
  async markAllAsRead(@Body() body: MarkAllAsReadDto) {
    return this.notificationService.markAllAsRead(body.user_id);
  }

  @ApiOperation({ summary: 'Update notification details' })
  @Post('update')
  async update(@Body() dto: UpdateNotificationDto) {
    return this.notificationService.update(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a notification' })
  @Post('delete/:id')
  async delete(@Param('id') id: number) {
    return this.notificationService.delete(id);
  }
}
