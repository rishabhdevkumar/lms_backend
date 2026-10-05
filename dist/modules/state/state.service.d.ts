import { DatabaseService } from '../../database/database.service';
export declare class StateService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(s: any): Promise<any>;
    getAll(): Promise<any>;
    search(s: any): Promise<any>;
    update(s: any): Promise<any>;
    delete(s: any): Promise<any>;
}
