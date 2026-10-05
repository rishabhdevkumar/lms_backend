import { DatabaseService } from '../../database/database.service';
export declare class UniversityService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(u: any): Promise<any>;
    getAll(): Promise<any>;
}
