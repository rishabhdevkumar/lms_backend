import { DatabaseService } from '../../database/database.service';
export declare class ModuleService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(mo: any): Promise<any>;
    getAll(): Promise<any>;
    update(mo: any): Promise<any>;
    search(mo: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}
