export declare class AddSubjectDto {
    course_id: number;
    semester_id: number;
    subject_code?: string;
    subject_name: string;
    short_name?: string;
}
export declare class UpdateSubjectDto {
    id: number;
    course_id: number;
    semester_id: number;
    subject_code?: string;
    subject_name: string;
    short_name?: string;
}
export declare class SearchSubjectDto {
    course_id?: number;
    semester_id?: number;
    subject_name?: string;
    short_name?: string;
    rc?: number;
    page?: number;
}
export declare class ToggleSubjectStatusDto {
    id: number;
    is_active: number;
}
export declare class GetByCourseSemesterDto {
    course_id: number;
    semester_id: number;
}
export declare class SubjectResponseDto {
    id: number;
    course_id: number;
    semester_id: number;
    subject_code: string;
    subject_name: string;
    short_name: string;
    is_active: number;
}
