import { DatabaseService } from '../../database/database.service';
export declare class TimetableService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(a: any): Promise<any>;
    getAll(): Promise<any>;
}
