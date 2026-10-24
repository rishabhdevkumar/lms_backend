import { DatabaseService } from '../../database/database.service';
import { AddUserDto, AdminAddUserDto, AuthenticateUserDto, UpdateUserDto, ChangeUserStatusDto } from './dto/users.dto';
export declare class UsersService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    private parseSpResponse;
    add(dto: AddUserDto | AdminAddUserDto): Promise<{
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
    adminAdd(dto: AdminAddUserDto): Promise<{
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
    toggleStatus(dto: ChangeUserStatusDto | {
        id?: any;
        user_id?: any;
        is_active?: any;
        status?: any;
    }): Promise<{
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
    changeStatus(id: any, statusOrIsActive: any): Promise<{
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
    } | {
        ok: boolean;
        success: number;
        msg: string;
        message: string;
        status: string;
    } | {
        ok: boolean;
        success: number;
        msg: any;
        message: any;
        status?: undefined;
    }>;
    update(dto: UpdateUserDto): Promise<{
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
    details(userId: string): Promise<{
        ok: boolean;
        data: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        data?: undefined;
    }>;
    getSelf(userId: any): Promise<{
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
    updatePasswordSelf(userId: any, password: string): Promise<{
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
