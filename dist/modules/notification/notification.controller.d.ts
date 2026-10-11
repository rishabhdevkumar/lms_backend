import { NotificationService } from './notification.service';
import { AddNotificationDto, UpdateNotificationDto, MarkAsReadDto, MarkAllAsReadDto } from './dto/notification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    add(dto: AddNotificationDto): Promise<any>;
    getAll(): Promise<any>;
    getById(id: number): Promise<any>;
    getByUserId(userId: number): Promise<any>;
    markAsRead(body: MarkAsReadDto): Promise<any>;
    markAllAsRead(body: MarkAllAsReadDto): Promise<any>;
    update(dto: UpdateNotificationDto): Promise<any>;
    delete(id: number): Promise<any>;
}
