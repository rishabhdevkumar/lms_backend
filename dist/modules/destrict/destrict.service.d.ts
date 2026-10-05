import { DatabaseService } from '../../database/database.service';
export declare class DestrictService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(d: any): Promise<any>;
    getAll(): Promise<any>;
    search(s: any): Promise<any>;
    update(s: any): Promise<any>;
    delete(s: any): Promise<any>;
}
