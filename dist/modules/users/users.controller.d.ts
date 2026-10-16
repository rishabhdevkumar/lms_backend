import { UsersService } from './users.service';
import { AddUserDto, AuthenticateUserDto, UpdateUserDto, ChangeUserStatusDto, UpdatePasswordSelfDto } from './dto/users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    add(body: AddUserDto): Promise<any>;
    authenticate(body: AuthenticateUserDto): Promise<any>;
    getAll(): Promise<any>;
    updateRoot(body: UpdateUserDto): Promise<any>;
    update(body: UpdateUserDto, paramId?: string): Promise<any>;
    changeStatus(body: ChangeUserStatusDto): Promise<{
        ok: boolean;
        msg: string;
        status?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        msg: string;
        status: string;
        error?: undefined;
    } | {
        ok: boolean;
        msg: string;
        error: any;
        status?: undefined;
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
    updatePasswordSelf(user: any, body: UpdatePasswordSelfDto): Promise<any>;
}
