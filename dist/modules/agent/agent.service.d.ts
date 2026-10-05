import { DatabaseService } from '../../database/database.service';
export declare class AgentService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    addAgent(ag: any): Promise<any>;
    getAll(): Promise<any>;
}
