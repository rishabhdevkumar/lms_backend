import { DestrictService } from './destrict.service';
export declare class DestrictController {
    private readonly destrictService;
    constructor(destrictService: DestrictService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
    search(body: any): Promise<any>;
    update(body: any): Promise<any>;
    deleteBody(body: any): Promise<any>;
    deleteParam(id: string): Promise<any>;
}
