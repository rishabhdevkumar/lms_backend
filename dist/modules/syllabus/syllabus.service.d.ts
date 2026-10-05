import { DatabaseService } from '../../database/database.service';
export declare class SyllabusService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(c: any): Promise<any>;
    getAll(): Promise<any>;
    update(sy: any): Promise<{
        ok: boolean;
        msg: string;
        result?: undefined;
    } | {
        ok: boolean;
        result: any;
        msg?: undefined;
    }>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}
