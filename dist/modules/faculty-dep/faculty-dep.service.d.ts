import { DatabaseService } from '../../database/database.service';
export declare class FacultyDepService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(dep: any): Promise<any>;
    getAll(): Promise<any>;
}
