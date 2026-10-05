import { DatabaseService } from '../../database/database.service';
export declare class SessionService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(c: any): Promise<any>;
    getAll(): Promise<any>;
    update(se: any): Promise<{
        ok: boolean;
        msg: string;
        result?: undefined;
    } | {
        ok: boolean;
        result: any;
        msg?: undefined;
    }>;
    search(s: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}
