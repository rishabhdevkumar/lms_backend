import { DatabaseService } from '../../database/database.service';
export declare class FacultyService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(f: any): Promise<any>;
    getAll(): Promise<any>;
    search(s: any): Promise<any>;
    update(s: any): Promise<any>;
    authenticate(f: any): Promise<any>;
    count(): Promise<{
        ok: boolean;
        total_faculty: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        total_faculty?: undefined;
    }>;
    getSelf(fid: any): Promise<{
        ok: boolean;
        user: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        user: {};
    }>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}
