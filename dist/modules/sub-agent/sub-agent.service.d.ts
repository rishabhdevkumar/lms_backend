import { DatabaseService } from '../../database/database.service';
export declare class SubAgentService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    addSubAgent(sub: any): Promise<any>;
    getAll(): Promise<any>;
}
