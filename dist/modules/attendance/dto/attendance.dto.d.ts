export declare const ATTENDANCE_STATUSES: readonly ["present", "absent", "late", "excused"];
export type AttendanceStatus = typeof ATTENDANCE_STATUSES[number];
export declare class AddAttendanceDto {
    session_id: number;
    users_id: number;
    status: string;
    marked_by: number;
}
export declare class StudentAttendanceItemDto {
    users_id: number;
    status: string;
}
export declare class BulkMarkAttendanceDto {
    session_id: number;
    marked_by: number;
    attendances: StudentAttendanceItemDto[];
}
export declare class UpdateAttendanceDto {
    id: number;
    status: string;
    marked_by: number;
}
export declare class GetAttendanceByDateDto {
    date: string;
}
