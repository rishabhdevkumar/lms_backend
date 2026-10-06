export declare class QuickAddStudentDto {
    name?: string;
    email?: string;
    phone?: string;
}
export declare class AuthenticateStudentDto {
    email: string;
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
