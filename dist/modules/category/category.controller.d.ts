import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
    update(body: any): Promise<any>;
    search(body: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}
