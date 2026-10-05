import { ModuleTablesService } from './module-tables.service';
export declare class ModuleTablesController {
    private readonly moduleTablesService;
    constructor(moduleTablesService: ModuleTablesService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
    update(body: any): Promise<any>;
    search(body: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}
