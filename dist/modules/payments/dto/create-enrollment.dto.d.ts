export declare class CreateEnrollmentDto {
    users_id: number;
    course_id: number;
    payment_status?: string;
}
export declare class UpdateEnrollmentStatusDto {
    id: number;
    payment_status: string;
}
export declare class CheckEnrollmentDto {
    users_id: number;
    course_id: number;
}
