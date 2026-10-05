import { DatabaseService } from '../../database/database.service';
export declare class SemesterService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(c: any): Promise<any>;
    getAll(): Promise<any>;
    update(sem: any): Promise<{
        ok: boolean;
        msg: string;
        result?: undefined;
    } | {
        ok: boolean;
        result: any;
        msg?: undefined;
    }>;
    search(sem: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}
