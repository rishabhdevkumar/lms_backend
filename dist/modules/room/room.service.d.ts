import { DatabaseService } from '../../database/database.service';
export declare class RoomService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(r: any): Promise<any>;
    getAll(): Promise<any>;
}
