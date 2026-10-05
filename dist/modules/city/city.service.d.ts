import { DatabaseService } from '../../database/database.service';
export declare class CityService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(c: any): Promise<any>;
    getAll(): Promise<any>;
    update(s: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}
