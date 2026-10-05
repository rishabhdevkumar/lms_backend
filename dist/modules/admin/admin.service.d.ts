import { DatabaseService } from '../../database/database.service';
export declare class AdminService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    addAdmin(body: any): Promise<any>;
    authenticate(body: any): Promise<any>;
    getAll(): Promise<any>;
}
