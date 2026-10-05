import { DatabaseService } from '../../database/database.service';
export declare class SubjectService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(sub: any): Promise<any>;
    getAll(): Promise<any>;
    update(sub: any): Promise<{
        ok: boolean;
        msg: string;
        result?: undefined;
    } | {
        ok: boolean;
        result: any;
        msg?: undefined;
    }>;
    search(c: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}
