import { UsersService } from './users.service';
import { AddUserDto, AuthenticateUserDto, UpdateUserDto } from './dto/users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    add(body: AddUserDto): Promise<any>;
    authenticate(body: AuthenticateUserDto): Promise<any>;
    getAll(): Promise<any>;
    updateRoot(body: UpdateUserDto): Promise<any>;
    update(body: UpdateUserDto, paramId?: string): Promise<any>;
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
}
