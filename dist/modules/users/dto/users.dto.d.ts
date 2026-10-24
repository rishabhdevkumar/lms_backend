export declare class AddUserDto {
    roll_no?: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    language?: string;
    dob?: string;
    gender?: string;
    role?: string;
    session_id?: number;
    course_id?: number;
    semester_id?: number;
    aadhar_no?: string;
    father_name?: string;
    mother_name?: string;
    board_10th?: string;
    total_marks_10th?: number;
    percentage_10th?: number;
    board_12th?: string;
    total_marks_12th?: number;
    percentage_12th?: number;
}
export declare class AdminAddUserDto {
    roll_no: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    language?: string;
    dob?: string;
    gender?: string;
    role?: string;
    session_id?: number;
    course_id?: number;
    semester_id?: number;
    aadhar_no?: string;
    father_name?: string;
    mother_name?: string;
    board_10th?: string;
    total_marks_10th?: number;
    percentage_10th?: number;
    board_12th?: string;
    total_marks_12th?: number;
    percentage_12th?: number;
}
export declare class AuthenticateUserDto {
    email: string;
    password: string;
}
export declare class UserResponseDto {
    id: string;
    roll_no: string;
    name: string;
    email: string;
    phone?: string;
    role?: string;
}
export declare class UserAuthTokenResponseDto {
    token: string;
    role?: string;
    data: UserResponseDto;
}
export declare class UpdateUserDto {
    id: string | number;
    roll_no?: string;
    name?: string;
    email?: string;
    password?: string;
    language?: string;
    phone?: string;
    dob?: string;
    gender?: string;
    role?: string;
    session_id?: number;
    course_id?: number;
    semester_id?: number;
    aadhar_no?: string;
    father_name?: string;
    mother_name?: string;
    board_10th?: string;
    total_marks_10th?: number;
    percentage_10th?: number;
    board_12th?: string;
    total_marks_12th?: number;
    percentage_12th?: number;
    status?: string;
}
export declare class UpdatePasswordSelfDto {
    id?: number | string;
    uid?: number | string;
    password: string;
}
export declare class ChangeUserStatusDto {
    id?: string | number;
    user_id?: string | number;
    status?: string;
    is_active?: number | boolean;
}
export declare class ToggleUserStatusDto extends ChangeUserStatusDto {
}
