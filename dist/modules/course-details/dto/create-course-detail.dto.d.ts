export declare class CreateCourseDetailDto {
    course_id: number;
    category: string;
    title: string;
    description?: string;
    image?: string;
    badges_text?: string;
    duration_hours?: number;
    total_lessons?: number;
    price: number;
    display_order?: number;
    is_active?: boolean;
}
