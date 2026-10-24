export declare class AddChapterDto {
    course_id: number;
    semester_id: number;
    subject_id: number;
    chapter_name: string;
    short_name?: string;
}
export declare class UpdateChapterDto {
    id: number;
    course_id: number;
    semester_id?: number;
    subject_id: number;
    chapter_name: string;
    short_name?: string;
}
export declare class SearchChapterDto {
    course_id?: number;
    semester_id?: number;
    subject_id?: number;
    chapter_name?: string;
    short_name?: string;
    rc?: number;
    page?: number;
}
export declare class ToggleChapterStatusDto {
    id: number;
    is_active: number;
}
export declare class ChapterResponseDto {
    id: number;
    course_id: number;
    semester_id: number;
    subject_id: number;
    chapter_name: string;
    short_name: string;
    is_active?: number;
}
