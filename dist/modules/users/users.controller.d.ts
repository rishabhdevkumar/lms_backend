import { UsersService } from './users.service';
import { AddUserDto, AdminAddUserDto, AuthenticateUserDto, UpdateUserDto, ChangeUserStatusDto, UpdatePasswordSelfDto } from './dto/users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    add(body: AddUserDto): Promise<{
        ok: boolean;
        success?: number;
        msg: string;
        message?: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    adminAdd(body: AdminAddUserDto): Promise<{
        ok: boolean;
        success?: number;
        msg: string;
        message?: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    authenticate(body: AuthenticateUserDto): Promise<any>;
    getAll(): Promise<any>;
    updateRoot(body: UpdateUserDto): Promise<{
        ok: boolean;
        success?: number;
        msg: string;
        message?: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    update(body: UpdateUserDto, paramId?: string): Promise<{
        ok: boolean;
        success?: number;
        msg: string;
        message?: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    changeStatus(body: ChangeUserStatusDto, paramId?: string): Promise<{
        ok: boolean;
        success?: number;
        msg: string;
        message?: string;
        data?: any;
    } | {
        ok: boolean;
        success: number;
        msg: string;
        message: string;
        error: any;
    }>;
    details(id: string): Promise<{
        ok: boolean;
        data: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        data?: undefined;
    }>;
    getSelf(user: any): Promise<{
        ok: boolean;
        user: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        user?: undefined;
    } | {
        ok: boolean;
        msg: string;
        user: {};
    }>;
    updatePasswordSelf(user: any, body: UpdatePasswordSelfDto): Promise<{
        ok: boolean;
        success?: number;
        msg: string;
        message?: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
}
