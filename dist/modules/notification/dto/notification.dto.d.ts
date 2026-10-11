export declare class AddNotificationDto {
    user_id: number;
    title: string;
    message: string;
    type?: string;
}
export declare class UpdateNotificationDto {
    id: number;
    title: string;
    message: string;
    type?: string;
}
export declare class MarkAsReadDto {
    id: number;
}
export declare class MarkAllAsReadDto {
    user_id: number;
}
