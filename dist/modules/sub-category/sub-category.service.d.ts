import { DatabaseService } from '../../database/database.service';
export declare class SubCategoryService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(c: any): Promise<any>;
    getAll(): Promise<any>;
    update(u: any): Promise<any>;
    search(c: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}
