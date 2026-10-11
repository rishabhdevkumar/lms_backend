import { DatabaseService } from '../../database/database.service';
import { AddNotificationDto, UpdateNotificationDto } from './dto/notification.dto';
export declare class NotificationService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(dto: AddNotificationDto): Promise<any>;
    getAll(): Promise<any>;
    getById(id: number): Promise<any>;
    getByUserId(userId: number): Promise<any>;
    markAsRead(id: number): Promise<any>;
    markAllAsRead(userId: number): Promise<any>;
    update(dto: UpdateNotificationDto): Promise<any>;
    delete(id: number): Promise<any>;
}
