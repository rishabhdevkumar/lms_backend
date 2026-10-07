export declare class AddUserDto {
    name: string;
    email: string;
    password: string;
    role?: string;
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
}
export declare class UserAuthTokenResponseDto {
    token: string;
    data: UserResponseDto;
}
export declare class UpdateUserDto {
    id: string | number;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
}
