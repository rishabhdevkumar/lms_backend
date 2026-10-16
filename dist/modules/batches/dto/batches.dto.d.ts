export declare class AddBatchDto {
    course_id: number;
    users_id: number;
    start_date?: string;
    end_date?: string;
    start_time?: string;
    end_time?: string;
    room?: string;
    status?: string;
}
export declare class UpdateBatchDto {
    id: number;
    batch_code?: string;
    course_id: number;
    users_id: number;
    start_date?: string;
    end_date?: string;
    start_time?: string;
    end_time?: string;
    room?: string;
    status: string;
}
export declare class EnrollStudentDto {
    batch_id: number;
    users_id: number;
}
export declare class RemoveStudentDto {
    batch_id: number;
    users_id: number;
}
