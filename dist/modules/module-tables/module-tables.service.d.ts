import { DatabaseService } from '../../database/database.service';
export declare class ModuleTablesService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(t: any): Promise<any>;
    getAll(): Promise<any>;
    update(m: any): Promise<any>;
    search(m: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}
