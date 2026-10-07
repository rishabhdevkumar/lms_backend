export declare class QuickAddStudentDto {
    name: string;
    email: string;
    password: string;
}
export declare class AuthenticateStudentDto {
    roll_no?: string;
    email?: string;
    password: string;
}
export declare class StudentResponseDto {
    id: string;
    name: string;
    email: string;
    rollNo?: string;
}
export declare class AuthTokenResponseDto {
    token: string;
    user: StudentResponseDto;
}
