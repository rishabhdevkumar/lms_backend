import { ModuleService } from './module.service';
export declare class ModuleController {
    private readonly moduleService;
    constructor(moduleService: ModuleService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
    update(body: any): Promise<any>;
    search(body: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}
