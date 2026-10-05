import { DatabaseService } from '../../database/database.service';
export declare class BlockService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    addBlock(b: any): Promise<any>;
    getAll(): Promise<any>;
}
