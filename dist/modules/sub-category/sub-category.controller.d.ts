import { SubCategoryService } from './sub-category.service';
export declare class SubCategoryController {
    private readonly subCategoryService;
    constructor(subCategoryService: SubCategoryService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
    update(body: any): Promise<any>;
    search(body: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}
