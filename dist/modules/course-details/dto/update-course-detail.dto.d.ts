import { CreateCourseDetailDto } from './create-course-detail.dto';
declare const UpdateCourseDetailDto_base: import("@nestjs/common").Type<Partial<CreateCourseDetailDto>>;
export declare class UpdateCourseDetailDto extends UpdateCourseDetailDto_base {
    id?: number;
}
export declare class UpdateCourseDetailStatusDto {
    id?: number;
    is_active: boolean;
}
export {};
