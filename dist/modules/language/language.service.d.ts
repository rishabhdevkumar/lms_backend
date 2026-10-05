import { DatabaseService } from '../../database/database.service';
export declare class LanguageService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    getAll(): Promise<any>;
    getActive(): Promise<{
        ok: boolean;
        languages: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        languages?: undefined;
    }>;
}
