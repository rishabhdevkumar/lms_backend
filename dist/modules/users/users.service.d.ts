import { DatabaseService } from '../../database/database.service';
import { AddUserDto, AuthenticateUserDto, UpdateUserDto } from './dto/users.dto';
export declare class UsersService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(dto: AddUserDto): Promise<any>;
    authenticate(body: AuthenticateUserDto): Promise<any>;
    getAll(): Promise<any>;
    update(dto: UpdateUserDto): Promise<any>;
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
}
